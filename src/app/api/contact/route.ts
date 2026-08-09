import { NextResponse } from 'next/server';
import { contactPayloadSchema } from '@/lib/contact/schema';
import { MIN_FILL_MS } from '@/lib/devis/schema';
import { sendLead } from '@/lib/leads';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip = clientIp(request);

  const limite = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
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

  const parsed = contactPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ erreur: 'validation' }, { status: 400 });
  }

  const message = parsed.data;

  // Anti-spam : honeypot et délai minimal de remplissage (§7).
  if (message.societeWeb || Date.now() - message.renderedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendLead({
      type: 'contact',
      recu: new Date().toISOString(),
      donnees: {
        nom: message.nom,
        societe: message.societe || undefined,
        email: message.email,
        telephone: message.telephone || undefined,
        sujet: message.sujet,
        message: message.message,
      },
    });
  } catch (error) {
    console.error('[contact] échec de diffusion du message', error);
    return NextResponse.json({ erreur: 'envoi_impossible' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
