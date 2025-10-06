export function captureUTMParams() {
  if (typeof window === 'undefined') {
    return {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
      gclid: '',
      fbclid: ''
    };
  }

  const searchParams = new URLSearchParams(window.location.search);

  return {
    utmSource: searchParams.get('utm_source') || '',
    utmMedium: searchParams.get('utm_medium') || '',
    utmCampaign: searchParams.get('utm_campaign') || '',
    utmTerm: searchParams.get('utm_term') || '',
    utmContent: searchParams.get('utm_content') || '',
    gclid: searchParams.get('gclid') || '',
    fbclid: searchParams.get('fbclid') || ''
  };
}

