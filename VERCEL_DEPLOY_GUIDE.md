# Guia de Deploy no Vercel - Troubleshooting

## 📋 Resumo do Problema

Ao tentar fazer deploy de um projeto React + Vite no Vercel, encontramos o erro **"Command vite build exited with 127"**. Este guia documenta todos os problemas encontrados e as soluções aplicadas.

---

## 🔴 Problemas Identificados

### 1. **Vite em devDependencies**
**Erro:** `sh: line 1: vite: command not found`  
**Causa:** O Vercel executa `npm install --production` que não instala `devDependencies`

### 2. **Estrutura com pasta client/**
**Erro:** `The specified Root Directory "client" does not exist`  
**Causa:** Projeto tinha estrutura `client/`, `server/`, `shared/` mas o Vercel esperava arquivos na raiz

### 3. **Lockfile desatualizado**
**Erro:** `Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date`  
**Causa:** Mudanças no `package.json` sem regenerar o `pnpm-lock.yaml`

### 4. **Configurações desatualizadas**
**Erro:** Referências a pastas antigas em `tsconfig.json`, `vite.config.ts`  
**Causa:** Arquivos de configuração apontando para `client/src` em vez de `src/`

---

## ✅ Soluções Aplicadas (Passo a Passo)

### **Passo 1: Mover Vite para dependencies**

**Por quê:** O Vercel não instala `devDependencies` em produção.

**Como fazer:**

1. Abra `package.json`
2. Localize estas dependências em `devDependencies`:
   - `vite`
   - `@vitejs/plugin-react`
   - `@tailwindcss/vite`
   - `tailwindcss`
   - `autoprefixer`
   - `postcss`

3. Mova-as para `dependencies`:

```json
{
  "dependencies": {
    // ... outras dependências
    "vite": "^7.1.7",
    "@vitejs/plugin-react": "^5.0.4",
    "@tailwindcss/vite": "^4.1.3",
    "tailwindcss": "^4.1.14",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47"
  },
  "devDependencies": {
    // Remova as dependências acima daqui
  }
}
```

---

### **Passo 2: Reorganizar Estrutura do Projeto**

**Por quê:** O Vercel funciona melhor com estrutura padrão Vite (arquivos na raiz).

**Estrutura ANTES:**
```
projeto/
├── client/
│   ├── src/
│   ├── public/
│   └── index.html
├── server/
├── shared/
└── package.json
```

**Estrutura DEPOIS:**
```
projeto/
├── src/
├── public/
├── index.html
└── package.json
```

**Como fazer:**

```bash
# 1. Mover arquivos do client para raiz
cp -r client/* .
cp -r client/.* . 2>/dev/null || true

# 2. Remover pastas antigas
rm -rf client server shared drizzle
```

---

### **Passo 3: Atualizar tsconfig.json**

**Arquivo:** `tsconfig.json`

**ANTES:**
```json
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*"],
  "compilerOptions": {
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

**DEPOIS:**
```json
{
  "include": ["src/**/*"],
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### **Passo 4: Atualizar vite.config.ts**

**Arquivo:** `vite.config.ts`

**ANTES:**
```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
  },
});
```

**DEPOIS:**
```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: import.meta.dirname,
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
  },
});
```

---

### **Passo 5: Corrigir Imports**

**Arquivo:** `src/const.ts` (ou qualquer arquivo que importe de `@shared`)

**ANTES:**
```typescript
export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
```

**DEPOIS:**
```typescript
// Adicione as constantes diretamente
export const COOKIE_NAME = "auth_token";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
```

---

### **Passo 6: Simplificar Script de Build**

**Arquivo:** `package.json`

**ANTES:**
```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
  }
}
```

**DEPOIS:**
```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

---

### **Passo 7: Regenerar pnpm-lock.yaml**

**Por quê:** O lockfile precisa refletir as mudanças no `package.json`.

```bash
# Remover lockfile antigo
rm pnpm-lock.yaml

# Regenerar
pnpm install
```

---

### **Passo 8: Testar Build Local**

**Antes de fazer push**, teste se o build funciona:

```bash
pnpm build
```

**Resultado esperado:**
```
✓ 1678 modules transformed.
✓ built in 5.23s
```

---

### **Passo 9: Fazer Push para GitHub**

```bash
git add -A
git commit -m "Fix: Restructure for Vercel deployment"
git push origin main
```

---

### **Passo 10: Configurar Vercel**

**No painel do Vercel:**

1. **Settings → General → Root Directory**
   - Deixe **em branco** ou coloque **`.`**
   - Clique em **Save**

2. **Build & Development Settings**
   - Framework Preset: **Vite** (auto-detectado)
   - Build Command: `pnpm build` (auto-detectado)
   - Output Directory: `dist` (auto-detectado)
   - Install Command: `pnpm install` (auto-detectado)

3. **Fazer Redeploy**
   - Deployments → último deployment → 3 pontinhos → **Redeploy**

---

## 🎯 Checklist Rápido para Futuros Deploys

Antes de fazer deploy no Vercel, verifique:

- [ ] Vite está em `dependencies` (não `devDependencies`)
- [ ] Estrutura está na raiz (não em `client/`)
- [ ] `tsconfig.json` aponta para `src/**/*`
- [ ] `vite.config.ts` tem `root: import.meta.dirname`
- [ ] Script de build é apenas `vite build`
- [ ] `pnpm-lock.yaml` está atualizado
- [ ] Build local funciona (`pnpm build`)
- [ ] Root Directory no Vercel está vazio ou `.`

---

## 🔧 Comandos Úteis

```bash
# Testar build local
pnpm build

# Limpar e reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Verificar estrutura do projeto
ls -la

# Ver status do git
git status

# Fazer push forçado (use com cuidado)
git push origin main --force
```

---

## 📚 Referências

- [Vercel - Vite Deployment](https://vercel.com/docs/frameworks/vite)
- [Vite - Building for Production](https://vite.dev/guide/build.html)
- [PNPM - Lockfile](https://pnpm.io/git#lockfiles)

---

## 💡 Dicas Importantes

1. **Sempre teste o build localmente** antes de fazer push
2. **Mantenha o lockfile sincronizado** com package.json
3. **Use estrutura padrão** do framework para facilitar deploy
4. **Documente mudanças** para referência futura
5. **Verifique logs do Vercel** para identificar erros específicos

---

**Data de criação:** 06/11/2025  
**Última atualização:** 06/11/2025  
**Status:** ✅ Funcionando
