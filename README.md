# Landing Page - Captação de Leads

Landing page em Next.js 14+ com formulário de captação de leads, validação completa, integração com API externa e **Google Tag Manager completo**.

## 🚀 Tecnologias

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (componentes UI)
- **React Hook Form** (gerenciamento de formulário)
- **Zod** (validação de schema)
- **libphonenumber-js** (validação de telefone brasileiro)
- **date-fns** (formatação de datas)
- **Google Tag Manager** (tracking e analytics)

## 📋 Funcionalidades

- ✅ Formulário completo de captação de leads
- ✅ Validação em tempo real com mensagens de erro específicas
- ✅ Validação de telefone brasileiro com normalização para E.164
- ✅ Date Picker para data de nascimento
- ✅ Captura automática de parâmetros UTM e tracking IDs (gclid, fbclid)
- ✅ Envio client-side via fetch para API externa
- ✅ Feedback visual com toast (sucesso/erro)
- ✅ Landing page responsiva com seções hero, benefícios e formulário
- ✅ **Google Tag Manager com GA4, Meta Pixel e Google Ads**
- ✅ **Enhanced Conversions com email e telefone**

## 🔧 Instalação

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:

Edite o arquivo `.env.local` e adicione suas credenciais:

```env
NEXT_PUBLIC_LEADS_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000)

## 📝 Campos do Formulário

Todos os campos são obrigatórios:

- **Nome**: Input de texto
- **E-mail**: Validação de formato de e-mail
- **Telefone**: Validação de número brasileiro, normalizado para E.164 (+5511999999999)
- **Cargo**: Input de texto
- **Data de Nascimento**: Date picker (deve ser anterior à data atual)
- **Mensagem**: Textarea

## 🔄 Fluxo de Envio

1. Validação client-side com Zod + React Hook Form
2. Captura de parâmetros UTM da URL
3. Normalização do telefone para formato E.164
4. Conversão da data de nascimento para meia-noite UTC (ISO)
5. POST para `https://lead-admin-backend.vercel.app/leads` com Authorization Bearer
6. **Disparo de eventos GTM (generate_lead e lead)**
7. Feedback visual (toast de sucesso ou erro)
8. Reset do formulário em caso de sucesso

## 📊 Google Tag Manager

### Eventos Implementados

#### 1. Page View (Automático)
```javascript
{
  event: 'page_view',
  page_title: 'Título',
  page_location: 'https://...',
  page_path: '/caminho'
}
```

#### 2. Generate Lead (GA4 + Google Ads)
```javascript
{
  event: 'generate_lead',
  lead_name: 'Nome',
  lead_email: 'email@exemplo.com',
  lead_phone: '+5511999999999',
  lead_position: 'Cargo',
  value: 100,
  currency: 'BRL',
  enhanced_conversion_data: {
    email: 'email@exemplo.com',
    phone_number: '+5511999999999'
  }
}
```

#### 3. Lead (Meta Pixel)
```javascript
{
  event: 'lead',
  lead_name: 'Nome',
  lead_email: 'email@exemplo.com',
  lead_phone: '+5511999999999'
}
```

### Tags Necessárias no GTM

1. **GA4 - Page View**: Event tag disparada em Window Loaded
2. **GA4 - Generate Lead**: Event tag disparada no evento `generate_lead`
3. **Meta - PageView**: Custom HTML disparada em Window Loaded
4. **Meta - Lead**: Custom HTML disparada no evento `lead`
5. **Google Ads - Conversion**: Conversion tag com Enhanced Conversions

📖 **Documentação completa**: Veja [GTM-SETUP.md](./GTM-SETUP.md) para instruções detalhadas de configuração no Google Tag Manager.

## 📦 Payload da API

```json
{
  "landingPageId": "9d449c6a-fabc-483c-8034-8d281d8d92ff",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "+5511999999999",
  "position": "Desenvolvedor",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "message": "Gostaria de saber mais sobre o produto",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "black-friday-2024",
  "utmTerm": "curso-programacao",
  "utmContent": "anuncio-a",
  "gclid": "TeSter-123",
  "fbclid": "IwAR123456"
}
```

## 🧪 Testando com UTM

Acesse a URL com parâmetros UTM para testar a captura:

```
http://localhost:3000?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=123
```

## 🏷️ Testando o GTM

1. Instale o [Tag Assistant](https://tagassistant.google.com/)
2. Acesse a landing page
3. Ative o Tag Assistant e clique em "Record"
4. Navegue pela página (verifica page_view)
5. Preencha e envie o formulário (verifica generate_lead e lead)
6. Verifique no Tag Assistant se todas as tags dispararam corretamente

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal com GTM
│   ├── page.tsx            # Landing page
│   └── globals.css         # Estilos globais
├── components/
│   ├── LeadForm.tsx        # Componente do formulário
│   ├── GoogleTagManager.tsx # Tracking de page_view
│   ├── GTMScript.tsx       # Scripts do GTM
│   └── ui/                 # Componentes shadcn/ui
├── lib/
│   ├── validation.ts       # Schema Zod
│   ├── phone.ts            # Validação e normalização de telefone
│   ├── utm.ts              # Captura de parâmetros UTM
│   ├── gtm.ts              # Funções de tracking GTM
│   ├── api.ts              # Função de envio para API
│   └── utils.ts            # Utilitários
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter (biome)
npm run format   # Formata código
```

## ⚠️ Observações Importantes

- A API Key deve estar configurada em `NEXT_PUBLIC_LEADS_API_KEY`
- O GTM ID deve estar configurado em `NEXT_PUBLIC_GTM_ID`
- O telefone deve ser brasileiro e válido (validado com libphonenumber-js)
- A data de nascimento não pode ser hoje ou futura
- O envio é feito direto do cliente (client-side) sem Server Actions
- Erros de CORS são capturados e exibidos ao usuário
- **Enhanced Conversions envia email e telefone automaticamente**
- Todos os eventos GTM incluem dados ricos para melhor análise

## 🎯 Diferenciais de Tracking

- ✅ Telefone normalizado em formato E.164 internacional
- ✅ Enhanced Conversions configurado com email e telefone
- ✅ Captura automática de UTM e Click IDs (gclid, fbclid)
- ✅ Valor monetário associado à conversão (R$ 100)
- ✅ Dados estruturados do lead (nome, cargo, mensagem)
- ✅ Compatível com GA4, Meta Pixel e Google Ads
- ✅ Page views automáticos em mudanças de rota

## 📄 Licença

Projeto de estudo - Todos os direitos reservados
