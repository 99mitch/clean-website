import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { errors, nav } from '@/copy/common';

export const metadata: Metadata = {
  title: errors.notFoundTitre,
  description: errors.notFoundTexte,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="py-20 sm:py-24 lg:py-32">
      <Container>
        <p className="eyebrow border-t-2 border-ink pt-3 text-slate">404</p>
        <h1 className="mt-8 max-w-[18ch] text-40 lg:text-64">{errors.notFoundTitre}</h1>
        <p className="measure mt-6 text-17 text-slate">{errors.notFoundTexte}</p>
        <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
          <ButtonLink href="/devis" variant="devis" size="lg">
            {nav.devis}
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            {errors.notFoundAction}
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            {errors.notFoundAccueil}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
