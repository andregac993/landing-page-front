export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID !;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page: url,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};

export const trackLead = (data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'generate_lead',
      lead_name: data.name,
      lead_email: data.email,
      lead_phone: data.phone,
      lead_position: data.position,
      lead_message: data.message,
      value: data.value || 0,
      currency: 'BRL',
      user_data: {
        email: data.email,
        phone_number: data.phone,
      },
      enhanced_conversion_data: {
        email: data.email,
        phone_number: data.phone,
      }
    });

    window.dataLayer.push({
      event: 'lead',
      lead_name: data.name,
      lead_email: data.email,
      lead_phone: data.phone,
      lead_position: data.position,
      lead_message: data.message,
    });
  }
};

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}
