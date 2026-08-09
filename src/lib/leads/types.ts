import type { DevisInput } from '@/lib/devis/schema';

/**
 * Adaptateur de destination des leads (§11). Une implémentation email en V1 ;
 * ajouter un CRM = ajouter un adaptateur, sans toucher au parcours.
 */

export type Lead = {
  type: 'devis' | 'contact' | 'candidature';
  recu: string;
  /** Adresse IP tronquée — journalisation anti-abus, jamais l'IP complète. */
  source?: string;
  donnees: DevisInput | ContactLead | CandidatureLead;
};

export type ContactLead = {
  nom: string;
  societe?: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
};

export type CandidatureLead = {
  nom: string;
  email: string;
  telephone?: string;
  poste: string;
  message: string;
};

export interface LeadAdapter {
  readonly nom: string;
  sendLead(lead: Lead): Promise<void>;
}
