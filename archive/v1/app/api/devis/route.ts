import { NextResponse } from 'next/server';
import { MIN_FILL_MS, devisSchema } from '@/lib/devis/schema';
import { sendLead } from '@/lib/leads';
import { anonymiseIp, clientIp, rateLimit } from '@/lib/rate-limit';

/**
 * Réception du parcours devis (§7).
 * Revalidation Zod serveur, anti-spam sans captcha, diffusion vers
 * `DESTINATION_LEADS`. La redirection vers /devis/merci est faite côté client
 * après un 200 — page distincte, donc conversion mesurable.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip = clientIp(request);

  const limite = rateLimit(`devis:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!limite.ok) {
    return NextResponse.json(
      { erreur: 'trop_de_demandes' },
      { status: 429, headers: { 'Retry-After': String(limite.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ erreur: 'json_invalide' }, { status: 400 });
  }

  const parsed = devisSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { erreur: 'validation', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot : un humain ne remplit jamais ce champ.
  if (lead.societeWeb) {
    // On répond 200 pour ne pas renseigner le robot sur la détection.
    return NextResponse.json({ ok: true });
  }

  // Soumission trop rapide pour avoir été lue.
  if (Date.now() - lead.renderedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendLead({
      type: 'devis',
      recu: new Date().toISOString(),
      source: lead.origine ?? anonymiseIp(ip),
      donnees: lead,
    });
  } catch (error) {
    // Le détail part dans les logs de la fonction, jamais vers le client.
    console.error('[devis] échec de diffusion du lead', error);
    return NextResponse.json({ erreur: 'envoi_impossible' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
