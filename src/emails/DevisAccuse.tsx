import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { site } from '@/config/site';

/**
 * Accusé de réception client (§7) : annonce un délai de réponse explicite
 * et joint la plaquette. Le délai n'apparaît que s'il a été validé (§0).
 */
export function DevisAccuse({
  nom,
  delaiHeures,
}: {
  nom: string;
  delaiHeures: number | null;
}) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Votre demande de devis est bien arrivée</Preview>
      <Body style={{ backgroundColor: '#F1F4F7', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ backgroundColor: '#FFFFFF', padding: '32px', maxWidth: '640px' }}>
          <Heading style={{ fontSize: '20px', color: '#0A0E12', margin: 0 }}>
            Votre demande est bien arrivée
          </Heading>

          <Text style={{ fontSize: '15px', color: '#0A0E12', lineHeight: 1.6 }}>
            Bonjour {nom},
          </Text>

          <Text style={{ fontSize: '15px', color: '#0A0E12', lineHeight: 1.6 }}>
            Nous avons bien reçu votre demande de devis. Elle est en cours
            d’analyse par notre équipe.
            {delaiHeures
              ? ` Vous recevrez notre réponse chiffrée sous ${delaiHeures} heures ouvrées.`
              : ''}
          </Text>

          <Hr style={{ borderColor: '#7A8794', opacity: 0.3, margin: '24px 0' }} />

          <Text style={{ fontSize: '15px', color: '#4A5765', lineHeight: 1.6 }}>
            <strong style={{ color: '#0A0E12' }}>Et ensuite</strong>
            <br />
            1. Nous relisons votre demande et préparons les questions manquantes.
            <br />
            2. Nous convenons d’une visite technique, ou d’un échange
            téléphonique si le périmètre est simple.
            <br />
            3. Vous recevez une proposition chiffrée avec le protocole détaillé.
          </Text>

          {site.telephone ? (
            <Text style={{ fontSize: '15px', color: '#4A5765', lineHeight: 1.6 }}>
              Une précision à ajouter&nbsp;? Répondez à cet email ou appelez-nous
              au{' '}
              <Link href={`tel:${site.telephone.replace(/[^\d+]/g, '')}`} style={{ color: '#1D6FE0' }}>
                {site.telephone}
              </Link>
              .
            </Text>
          ) : (
            <Text style={{ fontSize: '15px', color: '#4A5765', lineHeight: 1.6 }}>
              Une précision à ajouter&nbsp;? Il vous suffit de répondre à cet email.
            </Text>
          )}

          <Hr style={{ borderColor: '#7A8794', opacity: 0.3, margin: '24px 0' }} />

          <Text style={{ fontSize: '12px', color: '#7A8794' }}>
            {site.nom} — {site.baseline}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default DevisAccuse;
