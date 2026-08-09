import 'server-only';
import { Resend } from 'resend';
import { DevisAccuse } from '@/emails/DevisAccuse';
import { DevisInterne } from '@/emails/DevisInterne';
import { site } from '@/config/site';
import type { DevisInput } from '@/lib/devis/schema';
import type { Lead, LeadAdapter } from './types';

/**
 * Adaptateur email (Resend). C'est la seule implémentation en V1 ;
 * `DESTINATION_LEADS` pointe vers la boîte commerciale.
 *
 * Variables d'environnement (provisionnées par l'intégration Vercel × Resend) :
 *   RESEND_API_KEY   — clé d'API
 *   LEADS_EMAIL_TO   — destinataire interne
 *   LEADS_EMAIL_FROM — expéditeur vérifié sur le domaine
 */

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export const emailAdapter: LeadAdapter = {
  nom: 'resend',

  async sendLead(lead: Lead) {
    const resend = client();
    const to = process.env.LEADS_EMAIL_TO;
    const from = process.env.LEADS_EMAIL_FROM;

    if (!resend || !to || !from) {
      throw new Error(
        'Configuration email incomplète : RESEND_API_KEY, LEADS_EMAIL_TO et LEADS_EMAIL_FROM sont requis.',
      );
    }

    if (lead.type === 'devis') {
      const donnees = lead.donnees as DevisInput;

      // 1. Notification interne détaillée.
      const interne = await resend.emails.send({
        from,
        to,
        replyTo: donnees.email,
        subject: `Devis — ${donnees.societe} (${donnees.codePostal})`,
        react: DevisInterne({
          lead: donnees,
          recu: lead.recu,
          origine: lead.source,
        }),
      });
      if (interne.error) throw new Error(interne.error.message);

      // 2. Accusé de réception client, avec plaquette si elle existe.
      const accuse = await resend.emails.send({
        from,
        to: donnees.email,
        subject: 'Votre demande de devis est bien arrivée',
        react: DevisAccuse({
          nom: donnees.nom,
          delaiHeures: site.delaiReponseHeuresOuvrees,
        }),
        attachments: site.plaquetteUrl
          ? [{ path: site.plaquetteUrl, filename: 'plaquette.pdf' }]
          : undefined,
      });
      if (accuse.error) throw new Error(accuse.error.message);
      return;
    }

    // Contact et candidature : notification interne simple.
    const texte = Object.entries(lead.donnees)
      .map(([cle, valeur]) => `${cle} : ${String(valeur)}`)
      .join('\n');

    const envoi = await resend.emails.send({
      from,
      to,
      subject: `${lead.type === 'contact' ? 'Message' : 'Candidature'} — ${site.nom}`,
      text: `${texte}\n\nReçu le ${lead.recu}`,
    });
    if (envoi.error) throw new Error(envoi.error.message);
  },
};
