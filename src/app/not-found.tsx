import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { errors } from '@/copy/common';

export default function NotFound() {
  return (
    <div className="py-24 lg:py-32">
      <Container>
        <p className="eyebrow text-slate">404</p>
        <h1 className="mt-5 text-40 lg:text-64">{errors.notFoundTitre}</h1>
        <p className="measure mt-6 text-17 text-slate">{errors.notFoundTexte}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href="/services" variant="ink" size="lg">
            {errors.notFoundAction}
          </ButtonLink>
          <ButtonLink href="/devis" variant="devis" size="lg">
            Demander un devis
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
