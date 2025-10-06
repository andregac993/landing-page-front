# Google Tag Manager - Configuração Completa

## 📊 Visão Geral

Este projeto implementa o Google Tag Manager (GTM) com tracking completo para:
- **Google Analytics 4 (GA4)**: page_view e generate_lead
- **Meta Pixel**: PageView e Lead  
- **Google Ads**: Conversão com Enhanced Conversions (email e telefone)

## 🔧 Configuração Inicial

### 1. Variáveis de Ambiente

Adicione no arquivo `.env.local`:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Substitua `GTM-XXXXXXX` pelo seu ID do Google Tag Manager.

## 📦 Estrutura de DataLayer

### Page View (Automático)

Disparado automaticamente em cada mudança de página:

```javascript
{
  event: 'page_view',
  page: '/caminho',
  page_title: 'Título da Página',
  page_location: 'https://seusite.com/caminho',
  page_path: '/caminho'
}
```

### Generate Lead (No envio do formulário)

Disparado quando o formulário é enviado com sucesso:

```javascript
{
  event: 'generate_lead',
  lead_name: 'João Silva',
  lead_email: 'joao@empresa.com',
  lead_phone: '+5511999999999',
  lead_position: 'Gerente de Marketing',
  lead_message: 'Gostaria de saber mais...',
  value: 100,
  currency: 'BRL',
  user_data: {
    email: 'joao@empresa.com',
    phone_number: '+5511999999999'
  },
  enhanced_conversion_data: {
    email: 'joao@empresa.com',
    phone_number: '+5511999999999'
  }
}
```

### Lead (Para Meta Pixel)

Evento adicional para o Meta Pixel:

```javascript
{
  event: 'lead',
  lead_name: 'João Silva',
  lead_email: 'joao@empresa.com',
  lead_phone: '+5511999999999',
  lead_position: 'Gerente de Marketing',
  lead_message: 'Gostaria de saber mais...'
}
```

## 🏷️ Configuração das Tags no GTM

### 1. Google Analytics 4

#### Tag: GA4 - Page View
- **Tipo**: Google Analytics: GA4 Event
- **Event Name**: page_view
- **Acionador**: Page View - Window Loaded
- **Parâmetros de Evento**:
  - `page_title`: {{Page Title}}
  - `page_location`: {{Page URL}}
  - `page_path`: {{Page Path}}

#### Tag: GA4 - Generate Lead
- **Tipo**: Google Analytics: GA4 Event
- **Event Name**: generate_lead
- **Acionador**: Custom Event = generate_lead
- **Parâmetros de Evento**:
  - `value`: {{DLV - value}}
  - `currency`: {{DLV - currency}}
  - `lead_email`: {{DLV - lead_email}}
  - `lead_phone`: {{DLV - lead_phone}}
  - `lead_name`: {{DLV - lead_name}}
  - `lead_position`: {{DLV - lead_position}}

### 2. Meta Pixel

#### Tag: Meta - PageView
- **Tipo**: Custom HTML
- **Acionador**: Page View - Window Loaded

```html
<script>
  fbq('track', 'PageView');
</script>
```

#### Tag: Meta - Lead
- **Tipo**: Custom HTML
- **Acionador**: Custom Event = lead

```html
<script>
  fbq('track', 'Lead', {
    content_name: {{DLV - lead_name}},
    content_category: {{DLV - lead_position}},
    value: 100,
    currency: 'BRL'
  });
</script>
```

### 3. Google Ads Conversion

#### Tag: Google Ads - Conversion com Enhanced Conversions
- **Tipo**: Google Ads Conversion Tracking
- **Conversion ID**: SEU_CONVERSION_ID
- **Conversion Label**: SEU_CONVERSION_LABEL
- **Acionador**: Custom Event = generate_lead

**Enhanced Conversions - Dados do Usuário**:
- **Email**: {{DLV - lead_email}}
- **Phone**: {{DLV - lead_phone}}

**Parâmetros de Conversão**:
- `value`: {{DLV - value}}
- `currency`: {{DLV - currency}}

## 📋 Variáveis Necessárias no GTM

### Variáveis da Camada de Dados (Data Layer Variables)

Crie as seguintes variáveis do tipo "Data Layer Variable":

1. **DLV - lead_email**
   - Data Layer Variable Name: `lead_email`

2. **DLV - lead_phone**
   - Data Layer Variable Name: `lead_phone`

3. **DLV - lead_name**
   - Data Layer Variable Name: `lead_name`

4. **DLV - lead_position**
   - Data Layer Variable Name: `lead_position`

5. **DLV - lead_message**
   - Data Layer Variable Name: `lead_message`

6. **DLV - value**
   - Data Layer Variable Name: `value`

7. **DLV - currency**
   - Data Layer Variable Name: `currency`

8. **DLV - user_data**
   - Data Layer Variable Name: `user_data`

9. **DLV - enhanced_conversion_data**
   - Data Layer Variable Name: `enhanced_conversion_data`

### Acionadores (Triggers)

1. **Page View - Window Loaded**
   - Tipo: Window Loaded
   - Dispara em: All Window Loaded Events

2. **Custom Event - generate_lead**
   - Tipo: Custom Event
   - Event Name: `generate_lead`

3. **Custom Event - lead**
   - Tipo: Custom Event
   - Event Name: `lead`

## 🧪 Testando com Tag Assistant

### 1. Instalar Tag Assistant

1. Instale a extensão [Tag Assistant](https://tagassistant.google.com/)
2. Acesse sua landing page
3. Ative o Tag Assistant
4. Clique em "Record" para começar a gravação

### 2. Testar Page View

1. Recarregue a página
2. Verifique no Tag Assistant:
   - ✅ GTM Container carregado
   - ✅ GA4 Page View disparado
   - ✅ Meta PageView disparado

### 3. Testar Generate Lead

1. Preencha o formulário com dados válidos:
   - Nome: João Silva
   - Email: joao@teste.com
   - Telefone: (11) 99999-9999
   - Cargo: Gerente
   - Data de Nascimento: 01/01/1990
   - Mensagem: Teste

2. Clique em "Enviar"

3. Verifique no Tag Assistant:
   - ✅ Evento `generate_lead` disparado
   - ✅ Evento `lead` disparado
   - ✅ GA4 Generate Lead tag disparada
   - ✅ Meta Lead tag disparada
   - ✅ Google Ads Conversion tag disparada
   - ✅ Enhanced Conversion data presente (email e telefone)

### 4. Validação dos Dados

Verifique se os seguintes dados estão sendo enviados corretamente:

**GA4 Generate Lead:**
- value: 100
- currency: BRL
- lead_email: email do formulário
- lead_phone: telefone em formato E.164 (+5511999999999)
- lead_name: nome completo
- lead_position: cargo

**Meta Lead:**
- content_name: nome do lead
- content_category: cargo
- value: 100
- currency: BRL

**Google Ads Enhanced Conversions:**
- email: email do formulário
- phone_number: telefone em formato E.164
- value: 100
- currency: BRL

## 🎯 Enhanced Conversions - Detalhes

O projeto já envia automaticamente os dados necessários para Enhanced Conversions:

```javascript
enhanced_conversion_data: {
  email: 'joao@empresa.com',
  phone_number: '+5511999999999'
}

user_data: {
  email: 'joao@empresa.com',
  phone_number: '+5511999999999'
}
```

No GTM, basta configurar a tag do Google Ads para usar essas variáveis nas configurações de Enhanced Conversions.

## 📊 Dados Adicionais Enviados (Diferencial)

### Dados de UTM e Tracking

Automaticamente capturados da URL e enviados com o lead:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid` (Google Click ID)
- `fbclid` (Facebook Click ID)

### Dados do Formulário

- Nome completo
- Email (normalizado)
- Telefone (normalizado para E.164 com validação brasileira)
- Cargo/Posição
- Data de nascimento (ISO UTC)
- Mensagem

### Dados de Valor

- `value`: 100 (valor monetário da conversão)
- `currency`: 'BRL'

## 🔍 Debug no Console

Para verificar os eventos disparados, abra o console do navegador e digite:

```javascript
dataLayer
```

Você verá todos os eventos enviados para o GTM.

## ✅ Checklist de Implementação

- [x] GTM Script instalado no head
- [x] GTM Noscript instalado no body
- [x] Page View automático em mudanças de rota
- [x] Evento generate_lead no envio do formulário
- [x] Evento lead para Meta Pixel
- [x] Enhanced Conversion data (email e telefone)
- [x] Dados de UTM capturados
- [x] Telefone normalizado para E.164
- [x] Dados adicionais do lead (nome, cargo, mensagem)

## 🚀 Deploy

Após configurar o GTM ID no `.env.local`, faça o deploy:

```bash
npm run build
npm run start
```

Ou deploy na Vercel:

```bash
vercel --prod
```

Não esqueça de adicionar a variável `NEXT_PUBLIC_GTM_ID` nas configurações de ambiente da Vercel.

