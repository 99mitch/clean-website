import { z } from 'zod';

export const contactFormSchema = z.object({
  nom: z.string().trim().min(2).max(120),
  societe: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.email().max(160),
  telephone: z.string().trim().max(30).optional().or(z.literal('')),
  sujet: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(4000),
  consentement: z.literal(true),
});

export const contactPayloadSchema = contactFormSchema.extend({
  societeWeb: z.string().max(0).optional().default(''),
  renderedAt: z.number().int().positive(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
