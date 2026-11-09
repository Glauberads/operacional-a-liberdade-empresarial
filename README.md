# Landing Page — Do Operacional à Liberdade Empresarial

Landing page institucional e de alta conversão para o e-book **“Do Operacional à Liberdade Empresarial”** (Como estruturar processos, desenvolver pessoas e crescer com controle financeiro).

Desenvolvida com **React**, **TypeScript**, **Vite** e design editorial sofisticado.

---

## 🚀 Como Executar Localmente

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Ambiente de Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173` no seu navegador.

### 3. Gerar Build de Produção
```bash
npm run build
```

### 4. Visualizar Build de Produção
```bash
npm run preview
```

---

## ⚙️ Configurações Comerciais e Checkout

Todos os links, identificação legal e parâmetros de venda estão centralizados em:
👉 `src/config/commercial.ts`

- **`CHECKOUT_URL`**: URL do checkout seguro externo.
- **`PRECO_EBOOK`**: Preço formatado (ex: `R$ 47,00` ou `R$ 97,00`).
- **`ENTREGA_TEXTO`**: Informações de envio/acesso do material digital.
- **`SUPORTE_URL`**: Canal de suporte ou atendimento.
- **`VENDEDOR_NOME`** / **`VENDEDOR_DOCUMENTO`**: Razão Social e CNPJ/CPF no rodapé.
- **`PRIVACIDADE_URL`** / **`TERMOS_URL`**: Links jurídicos externos.

> **Preservação de UTMs:** A aplicação preserva parâmetros de campanha (como `utm_source`, `utm_medium`, `utm_campaign`) e os encaminha automaticamente para o checkout através da API nativa `URLSearchParams`.

---

## 🎨 Paleta de Cores e Tipografia

- **Azul Profundo**: `#142B3C`
- **Dourado Discreto**: `#AE884B`
- **Branco Quente**: `#FAF9F6`
- **Cinza Secundário**: `#51616D`
- **Títulos**: *Playfair Display*
- **Textos e UI**: *Plus Jakarta Sans*

---

## 📄 Estrutura de Pastas

```
├── public/
│   ├── assets/
│   │   ├── ebook-cover.png                 # Capa oficial para mockup
│   │   ├── ebook-preview-modulo.png        # Prévia do Módulo 01
│   │   ├── ebook-preview-financeiro.png    # Prévia do Exemplo financeiro
│   │   └── ebook-preview-plano-90-dias.png # Prévia do Plano de 90 dias
│   ├── favicon.svg
│   └── Logo.png                            # Logo oficial "Liberdade Empresarial"
├── src/
│   ├── config/
│   │   └── commercial.ts                   # Centralizador de dados comerciais
│   ├── App.css                             # Estilos do layout e componentes
│   ├── App.tsx                             # Estrutura principal da landing page
│   ├── index.css                           # Variáveis globais e design system
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```
