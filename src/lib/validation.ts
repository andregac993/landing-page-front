import { z } from 'zod';
import { validateBrazilianPhone } from './phone';

export const leadFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório').refine(
    (value) => validateBrazilianPhone(value),
    'Telefone brasileiro inválido'
  ),
  position: z.string().min(1, 'Cargo é obrigatório'),
  dateOfBirth: z.date().refine(
    (date) => date < new Date(),
    'Data de nascimento deve ser anterior à data atual'
  ),
  message: z.string().min(1, 'Mensagem é obrigatória')
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

