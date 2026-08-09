import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PendingData } from '@/components/ui/PendingData';
import { Section } from '@/components/ui/Section';
import { site, telHref } from '@/config/site';
import { contactPage as copy } from '@/copy/pages';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: copy.meta.title,
  description: copy.meta.description,
  path: '/contact',
});

export default function ContactPage() {
  const tel = telHref();
  const fil = [
    { name: 'Accueil', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        titre={copy.titre}
        intro={copy.intro}
        breadcrumbs={fil}
      >
        <div className="mt-9">
          <ButtonLink href="/devis" variant="devis" size="lg">
            {copy.versDevis}
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-21">{copy.coordonneesTitre}</h2>
            <ul className="mt-6 space-y-5">
              <li>
                {tel ? (
                  <a
                    href={tel}
                    data-analytics="tel_click"
                    className="inline-flex min-h-11 items-center gap-3 text-17 text-navy hover:text-azure"
                  >
                    <Icon name="phone" size={20} />
                    {site.telephone}
                  </a>
                ) : (
                  <PendingData label="TELEPHONE" />
                )}
              </li>
              <li>
                {site.emailContact ? (
                  <a
                    href={`mailto:${site.emailContact}`}
                    className="inline-flex min-h-11 items-center gap-3 text-17 text-navy hover:text-azure"
                  >
                    <Icon name="mail" size={20} />
                    {site.emailContact}
                  </a>
                ) : (
                  <PendingData label="EMAIL_CONTACT" />
                )}
              </li>
              <li>
                {site.adresseSiege ? (
                  <address className="flex gap-3 not-italic text-17 text-slate">
                    <Icon name="pin" size={20} className="mt-1 shrink-0 text-navy" />
                    <span>
                      {site.adresseSiege.rue}
                      <br />
                      {site.adresseSiege.codePostal} {site.adresseSiege.ville}
                    </span>
                  </address>
                ) : (
                  <PendingData label="ADRESSE_SIEGE" />
                )}
              </li>
              <li>
                {site.zoneIntervention ? (
                  <p className="text-15 text-slate">{site.zoneIntervention}</p>
                ) : (
                  <PendingData label="ZONE_INTERVENTION" />
                )}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-21">{copy.formulaireTitre}</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumbLd(fil)} />
    </>
  );
}
