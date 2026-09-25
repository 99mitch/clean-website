import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/config/site';
import type { Photo } from '@/lib/photos';
import { fr } from '@/lib/typo';

/**
 * Image de partage (Open Graph / X / LinkedIn / messageries), 1200 × 630.
 *
 * Même grammaire que le site : fond abyss, filet plein, libellé monospace,
 * titre en Bricolage 800 et, quand la page en a une, la photo de la rubrique
 * sur la moitié droite, fondue dans le fond comme le hero d'accueil.
 * Générée au build (routes statiques) : aucun coût à la requête.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/** Largeur de la photo, calée à droite. */
const PHOTO_W = 520;

const C = {
  abyss: '#071320',
  cobalt: '#16467A',
  paper: '#F6F8FB',
  mist: '#E4EAF1',
};

const fonts = (async () => {
  const dir = join(process.cwd(), 'src/fonts/og');
  const [display, sans, mono] = await Promise.all([
    readFile(join(dir, 'BricolageGrotesque-800.ttf')),
    readFile(join(dir, 'InstrumentSans-400.ttf')),
    readFile(join(dir, 'IBMPlexMono-500.ttf')),
  ]);
  return [
    { name: 'Bricolage', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Instrument', data: sans, weight: 400 as const, style: 'normal' as const },
    { name: 'Plex', data: mono, weight: 500 as const, style: 'normal' as const },
  ];
})();

async function dataUri(publicPath: string): Promise<string> {
  const buffer = await readFile(join(process.cwd(), 'public', publicPath));
  const type = publicPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${type};base64,${buffer.toString('base64')}`;
}

/** Taille du titre selon sa longueur : deux à trois lignes, jamais tronqué. */
function titleSize(titre: string, avecPhoto: boolean): number {
  const n = titre.length;
  if (avecPhoto) return n > 40 ? 52 : n > 24 ? 60 : 68;
  return n > 60 ? 60 : n > 36 ? 72 : 84;
}

export async function renderOg({
  eyebrow,
  titre,
  sousTitre,
  photo,
}: {
  eyebrow: string;
  titre: string;
  sousTitre?: string;
  photo?: Photo;
}) {
  const photoSrc = photo ? await dataUri(photo.src) : null;
  const titreFr = fr(titre);
  const sousTitreFr = sousTitre ? fr(sousTitre) : null;
  const size = titleSize(titreFr, Boolean(photoSrc));
  const zone = `${site.localisation.ville} · ${site.zoneIntervention ?? site.localisation.region}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: C.abyss,
          color: C.paper,
          fontFamily: 'Instrument',
        }}
      >
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt=""
            width={PHOTO_W}
            height={630}
            style={{ position: 'absolute', right: 0, top: 0, width: PHOTO_W, height: 630, objectFit: 'cover' }}
          />
        ) : null}
        {photoSrc ? (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: PHOTO_W,
              height: 630,
              display: 'flex',
              backgroundImage: `linear-gradient(90deg, ${C.abyss} 0%, rgba(7,19,32,0.55) 30%, rgba(7,19,32,0) 65%)`,
            }}
          />
        ) : null}

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: photoSrc ? 1200 - PHOTO_W + 40 : 1200,
            height: '100%',
            padding: '56px 64px',
          }}
        >
          {/* Marque */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Plaque />
            <span style={{ fontFamily: 'Bricolage', fontSize: 34, letterSpacing: -2 }}>{site.nom}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                borderTop: `3px solid ${C.paper}`,
                paddingTop: 16,
                fontFamily: 'Plex',
                fontSize: 20,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'rgba(246,248,251,0.72)',
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                fontFamily: 'Bricolage',
                fontSize: size,
                lineHeight: 1.02,
                letterSpacing: -size * 0.045,
              }}
            >
              {titreFr}
            </div>
            {sousTitreFr ? (
              <div
                style={{
                  display: 'flex',
                  marginTop: 24,
                  fontSize: 27,
                  lineHeight: 1.35,
                  color: 'rgba(246,248,251,0.78)',
                  maxWidth: photoSrc ? 560 : 900,
                }}
              >
                {sousTitreFr}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Plex',
              fontSize: 19,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(246,248,251,0.72)',
            }}
          >
            <span>{zone}</span>
            {photoSrc ? null : <span>Devis chiffré en cinq questions</span>}
          </div>
        </div>

        {/* Réglette : le liseré cobalt qui ferme chaque bande du site. */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            display: 'flex',
            backgroundColor: C.cobalt,
          }}
        />
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts },
  );
}

/** La plaque terrazzo de l'icône, dessinée en boîtes (Satori ne lit pas de SVG externe). */
function Plaque() {
  const eclat = (left: number, top: number, d: number, opacity = 1) => (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: d,
        height: d,
        borderRadius: d,
        backgroundColor: C.paper,
        opacity,
      }}
    />
  );
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: 48,
        height: 48,
        borderRadius: 11,
        backgroundColor: C.cobalt,
      }}
    >
      {eclat(10, 10.5, 12)}
      {eclat(27, 25.5, 13.5)}
      {eclat(29.6, 9.4, 6.8, 0.72)}
      {eclat(10, 30.4, 8.3, 0.72)}
      {eclat(22.9, 22.1, 3.8, 0.5)}
    </div>
  );
}
