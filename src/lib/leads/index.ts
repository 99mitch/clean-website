import 'server-only';
import { emailAdapter } from './email';
import type { Lead, LeadAdapter } from './types';

export type { Lead, LeadAdapter, ContactLead, CandidatureLead } from './types';

/**
 * Destination des leads. V1 : email uniquement (§0 `DESTINATION_LEADS`).
 * Ajouter un CRM = pousser un adaptateur dans ce tableau (§11) ; le reste
 * du code n'a pas à changer.
 */
const adapters: LeadAdapter[] = [emailAdapter];

/**
 * Diffuse le lead vers toutes les destinations. Échoue si AUCUNE n'a abouti :
 * un lead perdu en silence est le pire scénario du projet.
 */
export async function sendLead(lead: Lead): Promise<void> {
  const resultats = await Promise.allSettled(
    adapters.map((adapter) => adapter.sendLead(lead)),
  );

  const echecs = resultats.filter((r) => r.status === 'rejected');
  if (echecs.length === adapters.length) {
    throw new AggregateError(
      echecs.map((r) => (r as PromiseRejectedResult).reason),
      'Aucune destination de lead n’a abouti.',
    );
  }
}
