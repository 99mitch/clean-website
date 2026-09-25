'use client';

import { Button, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { errors, nav } from '@/copy/common';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-20 sm:py-24 lg:py-32">
      <Container>
        <h1 className="text-40 lg:text-64">{errors.genericTitre}</h1>
        <p className="measure mt-6 text-17 text-slate">{errors.genericTexte}</p>
        <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
          <Button onClick={reset} variant="ink" size="lg">
            {errors.genericAction}
          </Button>
          <ButtonLink href="/contact" variant="outline" size="lg">
            {nav.contact}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
