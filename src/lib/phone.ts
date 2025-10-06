import { parsePhoneNumber } from 'libphonenumber-js';

export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 2) {
    return cleaned;
  }

  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }

  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}

export function validateBrazilianPhone(value: string): boolean {
  try {
    const phoneNumber = parsePhoneNumber(value, 'BR');
    return phoneNumber.isValid() && phoneNumber.country === 'BR';
  } catch {
    return false;
  }
}

export function normalizePhoneToE164(value: string): string {
  try {
    const phoneNumber = parsePhoneNumber(value, 'BR');
    return phoneNumber.format('E.164');
  } catch {
    return value;
  }
}

