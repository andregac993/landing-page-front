import { normalizePhoneToE164 } from './phone';

interface LeadPayload {
  landingPageId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  dateOfBirth: string;
  message: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
}

export async function postLead(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  dateOfBirth: Date;
  message: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.NEXT_PUBLIC_LEADS_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: 'Chave de API não configurada. Configure NEXT_PUBLIC_LEADS_API_KEY.'
    };
  }

  const dateOfBirthUTC = new Date(
    Date.UTC(
      data.dateOfBirth.getFullYear(),
      data.dateOfBirth.getMonth(),
      data.dateOfBirth.getDate(),
      0,
      0,
      0
    )
  ).toISOString();

  const payload: LeadPayload = {
    landingPageId: process.env.NEXT_PUBLIC_LP_ID!,
    name: data.name,
    email: data.email,
    phone: normalizePhoneToE164(data.phone),
    position: data.position,
    dateOfBirth: dateOfBirthUTC,
    message: data.message,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmTerm: data.utmTerm,
    utmContent: data.utmContent,
    gclid: data.gclid,
    fbclid: data.fbclid
  };

  try {
    const response = await fetch('https://lead-admin-backend.vercel.app/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMessage = 'Erro ao enviar lead';

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = `Erro ${response.status}: ${response.statusText}`;
      }

      console.error('Erro ao enviar lead:', errorMessage);
      return { success: false, error: errorMessage };
    }

    const result = await response.json();
    console.log('Lead enviado com sucesso:', result);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro de rede ou CORS:', errorMessage);
    return {
      success: false,
      error: 'Erro ao conectar com o servidor. Verifique sua conexão ou possível erro de CORS.'
    };
  }
}

