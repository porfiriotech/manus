# TODO - Político Eleito Demo

## Design e Estrutura
- [x] Configurar paleta de cores profissional (azul escuro, verde, branco)
- [x] Configurar tipografia moderna com Google Fonts
- [x] Criar componentes de layout (Header, Footer)
- [x] Implementar design responsivo mobile-first

## Páginas e Seções
- [x] Hero Section moderna com CTA forte
- [x] Seção Produtos e Serviços com cards interativos
- [x] Seção Cases de Sucesso com depoimentos e métricas
- [x] Seção Diferenciais com números e estatísticas
- [x] Seção Sobre Nós com equipe e credenciais
- [x] Formulário de Contato aprimorado com validação
- [x] Rodapé completo com links e informações

## Funcionalidades Interativas
- [ ] Calculadora de alcance de campanha
- [ ] Simulador de orçamento
- [x] Animações e microinterações
- [x] WhatsApp floating button
- [x] Scroll suave entre seções

## Conteúdo
- [x] Textos persuasivos e orientados a resultados
- [x] Imagens de alta qualidade
- [x] Ícones modernos (Lucide React)
- [x] Depoimentos de clientes
- [x] Métricas de sucesso nos cases

## Otimizações
- [x] SEO básico (meta tags)
- [x] Performance (lazy loading de imagens)
- [x] Acessibilidade (ARIA labels)

## Bugs e Correções
- [x] Corrigir aninhamento de tags <a> no Header (Link com <a> dentro)

## Nova Funcionalidade - Calculadora
- [x] Criar componente CampaignCalculator
- [x] Adicionar seção de calculadora na página Home
- [x] Implementar lógica de cálculo baseada em eleitores e serviços
- [x] Adicionar animações e feedback visual

## Correção do Erro 127 no Vercel
- [x] Mover Vite de devDependencies para dependencies
- [x] Verificar e corrigir configurações de build
- [ ] Testar deploy no Vercel

## Reorganização Completa para Deploy no Vercel
- [x] Criar nova branch limpa
- [x] Mover todos os arquivos de client/ para raiz
- [x] Remover pastas server/ e shared/
- [x] Atualizar tsconfig.json para nova estrutura
- [x] Atualizar vite.config.ts para nova estrutura
- [x] Garantir Vite em dependencies
- [x] Remover vercel.json (deixar Vercel detectar automaticamente)
- [x] Testar build local
- [x] Push e verificar deploy

## Ajustes Finais
- [x] Substituir logo pela logomarca real do Político Eleito
- [x] Adicionar "Versão DEMO - Desenvolvida por porfiriotech" no rodapé

## Novas Melhorias
- [x] Transformar seção de Produtos e Serviços em cards expansíveis (hover)
- [x] Modificar botão de orçamento para gerar texto e redirecionar para WhatsApp (55 62 98624-2185)
