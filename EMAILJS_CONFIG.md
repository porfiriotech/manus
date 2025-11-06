# Configuração do EmailJS para Formulário de Contato

## 📧 Visão Geral

O formulário de contato do site está configurado para enviar emails através do **EmailJS**, um serviço gratuito que permite enviar emails diretamente do frontend sem necessidade de backend.

**Email de destino configurado:** `portaldamaceno@gmail.com`

---

## 🚀 Passo a Passo para Configuração

### 1. Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em **"Sign Up"** e crie uma conta gratuita
3. Confirme seu email

**Plano gratuito inclui:**
- 200 emails por mês
- Sem necessidade de cartão de crédito
- Suficiente para sites pequenos e médios

---

### 2. Adicionar Serviço de Email

1. No dashboard do EmailJS, vá em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor de email:
   - **Gmail** (recomendado para teste)
   - Outlook
   - Yahoo
   - Ou outro provedor SMTP

4. Para Gmail:
   - Clique em **"Connect Account"**
   - Faça login com a conta `portaldamaceno@gmail.com`
   - Autorize o EmailJS a enviar emails

5. Após conectar, copie o **Service ID** (exemplo: `service_abc123`)

---

### 3. Criar Template de Email

1. No dashboard, vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Configure o template com os seguintes campos:

**Subject (Assunto):**
```
Novo Contato do Site - {{from_name}}
```

**Content (Corpo do Email):**
```
Novo contato recebido através do formulário do site:

Nome: {{from_name}}
Celular: {{from_phone}}
Cidade: {{from_city}}
Candidato a: {{cargo}}

---
Este email foi enviado automaticamente através do formulário de contato do site Político Eleito.
```

**Settings (Configurações):**
- **From Name:** Político Eleito - Formulário de Contato
- **From Email:** (será o email conectado no serviço)
- **To Email:** `{{to_email}}` (deixe assim, será preenchido dinamicamente)
- **Reply To:** `{{reply_to}}` (deixe assim)

4. Clique em **"Save"**
5. Copie o **Template ID** (exemplo: `template_xyz789`)

---

### 4. Obter Public Key

1. No dashboard, vá em **"Account"** → **"General"**
2. Localize a seção **"Public Key"**
3. Copie a **Public Key** (exemplo: `abcdefghij1234567`)

---

### 5. Configurar Variáveis de Ambiente

Agora você precisa adicionar as credenciais ao projeto. Existem duas formas:

#### Opção A: Arquivo `.env` (Desenvolvimento Local)

1. Crie um arquivo `.env` na raiz do projeto:

```bash
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghij1234567
```

2. Substitua os valores pelos seus IDs copiados anteriormente

#### Opção B: Variáveis de Ambiente no Vercel (Produção)

1. Acesse o dashboard do Vercel
2. Vá no seu projeto → **Settings** → **Environment Variables**
3. Adicione as três variáveis:

| Name | Value |
|------|-------|
| `VITE_EMAILJS_SERVICE_ID` | `service_abc123` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_xyz789` |
| `VITE_EMAILJS_PUBLIC_KEY` | `abcdefghij1234567` |

4. Clique em **"Save"**
5. Faça um novo deploy para aplicar as mudanças

---

## 🧪 Testar a Configuração

### Teste Local

1. Certifique-se de que o arquivo `.env` está configurado
2. Reinicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
3. Acesse o site e preencha o formulário de contato
4. Clique em **"Enviar Mensagem"**
5. Verifique se:
   - Aparece mensagem de sucesso
   - O email chega em `portaldamaceno@gmail.com`

### Teste em Produção

1. Após configurar as variáveis no Vercel e fazer deploy
2. Acesse o site em produção
3. Preencha e envie o formulário
4. Verifique o recebimento do email

---

## ⚠️ Comportamento Atual (Sem Configuração)

Se as credenciais do EmailJS **não estiverem configuradas**, o formulário irá:

1. Mostrar mensagem de erro: **"EmailJS não configurado. Por favor, configure as credenciais."**
2. Registrar erro no console do navegador
3. **NÃO enviar o email**
4. Os dados do formulário serão perdidos

**Importante:** Configure as credenciais o quanto antes para que o formulário funcione corretamente!

---

## 🔒 Segurança

### Boas Práticas

✅ **Faça:**
- Mantenha a Public Key pública (ela é segura para frontend)
- Use variáveis de ambiente para as credenciais
- Configure limite de taxa no dashboard do EmailJS
- Monitore o uso mensal no dashboard

❌ **Não faça:**
- Não commite o arquivo `.env` no Git (já está no `.gitignore`)
- Não exponha Service ID e Template ID em locais públicos (embora não sejam críticos)
- Não compartilhe sua senha do EmailJS

### Proteção Contra Spam

O EmailJS possui proteção integrada contra spam, mas você pode adicionar:

1. **reCAPTCHA** (opcional):
   - Adicione reCAPTCHA v3 ao formulário
   - Configure no EmailJS dashboard

2. **Rate Limiting** (já implementado):
   - O código já possui proteção básica
   - EmailJS limita automaticamente requisições

---

## 📊 Monitoramento

### Dashboard do EmailJS

Acesse regularmente o dashboard para:
- Ver quantos emails foram enviados
- Verificar taxa de sucesso/falha
- Monitorar limite mensal (200 emails no plano gratuito)
- Ver logs de erros

### Alertas

Configure alertas no EmailJS para:
- Quando atingir 80% do limite mensal
- Quando houver falhas no envio
- Quando a conta estiver próxima de expirar

---

## 🐛 Troubleshooting

### Problema: "EmailJS não configurado"

**Causa:** Variáveis de ambiente não configuradas

**Solução:**
1. Verifique se o arquivo `.env` existe
2. Confirme que as variáveis começam com `VITE_`
3. Reinicie o servidor de desenvolvimento

### Problema: Email não chega

**Possíveis causas:**
1. **Credenciais incorretas:** Verifique Service ID, Template ID e Public Key
2. **Serviço não conectado:** Reconecte o Gmail no dashboard do EmailJS
3. **Caixa de spam:** Verifique a pasta de spam de `portaldamaceno@gmail.com`
4. **Limite excedido:** Verifique se não ultrapassou 200 emails/mês

**Solução:**
1. Verifique os logs no console do navegador (F12)
2. Acesse o dashboard do EmailJS e veja os logs
3. Teste com um template simples primeiro

### Problema: Erro CORS

**Causa:** Domínio não autorizado no EmailJS

**Solução:**
1. No dashboard do EmailJS, vá em **Settings**
2. Adicione seu domínio na lista de **Allowed Origins**
3. Para desenvolvimento local, adicione: `http://localhost:3000`
4. Para produção, adicione: `https://seu-dominio.vercel.app`

---

## 💡 Dicas Adicionais

### Personalizar Email

Você pode personalizar o template para incluir:
- Logo da empresa
- Formatação HTML
- Links para redes sociais
- Assinatura automática

### Notificação Automática

Configure uma resposta automática para o usuário:
1. Crie um segundo template
2. Configure para enviar para `{{reply_to}}`
3. Adicione mensagem de agradecimento

### Upgrade do Plano

Se precisar de mais de 200 emails/mês:
- **Personal:** $7/mês - 1.000 emails
- **Professional:** $15/mês - 5.000 emails
- **Enterprise:** Customizado

---

## 📞 Suporte

- **Documentação oficial:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **FAQ:** [https://www.emailjs.com/docs/faq/](https://www.emailjs.com/docs/faq/)
- **Suporte:** support@emailjs.com

---

## ✅ Checklist de Configuração

- [ ] Criar conta no EmailJS
- [ ] Conectar serviço de email (Gmail)
- [ ] Criar template de email
- [ ] Copiar Service ID
- [ ] Copiar Template ID
- [ ] Copiar Public Key
- [ ] Configurar variáveis de ambiente (`.env` ou Vercel)
- [ ] Testar formulário localmente
- [ ] Fazer deploy e testar em produção
- [ ] Verificar recebimento do email em `portaldamaceno@gmail.com`
- [ ] Configurar alertas de limite mensal

---

**Última atualização:** Novembro de 2025  
**Autor:** Manus AI
