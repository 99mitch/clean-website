import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { devis as copy } from '@/copy/devis';
import type { DevisInput } from '@/lib/devis/schema';

function label(stepIndex: number, value: string): string {
  return (
    copy.steps[stepIndex].options.find((option) => option.value === value)
      ?.label ?? value
  );
}

/** Notification interne — tout ce qu'il faut pour rappeler sans rouvrir l'outil. */
export function DevisInterne({
  lead,
  recu,
  origine,
}: {
  lead: DevisInput;
  recu: string;
  origine?: string;
}) {
  const lignes: Array<[string, string]> = [
    ['Type de local', label(0, lead.typeLocal)],
    ['Surface', label(1, lead.surface)],
    ['Fréquence', label(2, lead.frequence)],
    ['Prestations', lead.prestations.map((p) => label(3, p)).join(', ')],
    ['Société', lead.societe],
    ['Contact', lead.nom],
    ['Email', lead.email],
    ['Téléphone', lead.telephone || '—'],
    ['Code postal', lead.codePostal],
    ['Reçu le', recu],
  ];
  if (origine) lignes.push(['Origine', origine]);

  return (
    <Html lang="fr">
      <Head />
      <Preview>{`Devis ${label(0, lead.typeLocal)} · ${label(1, lead.surface)} · ${lead.codePostal}`}</Preview>
      <Body style={{ backgroundColor: '#F1F4F7', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ backgroundColor: '#FFFFFF', padding: '32px', maxWidth: '640px' }}>
          <Heading style={{ fontSize: '20px', color: '#0A0E12', margin: 0 }}>
            Nouvelle demande de devis
          </Heading>
          <Hr style={{ borderColor: '#7A8794', opacity: 0.3, margin: '24px 0' }} />
          <Section>
            {lignes.map(([cle, valeur]) => (
              <Text key={cle} style={{ fontSize: '14px', color: '#0A0E12', margin: '0 0 10px' }}>
                <strong style={{ color: '#4A5765' }}>{cle} : </strong>
                {valeur}
              </Text>
            ))}
          </Section>
          {lead.message ? (
            <>
              <Hr style={{ borderColor: '#7A8794', opacity: 0.3, margin: '24px 0' }} />
              <Text style={{ fontSize: '14px', color: '#4A5765', margin: '0 0 8px' }}>
                <strong>Précisions</strong>
              </Text>
              <Text style={{ fontSize: '14px', color: '#0A0E12', whiteSpace: 'pre-wrap', margin: 0 }}>
                {lead.message}
              </Text>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}

export default DevisInterne;
