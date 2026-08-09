'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button, ButtonLink } from '@/components/ui/Button';
import { site, telHref } from '@/config/site';
import { devis as copy } from '@/copy/devis';
import { track } from '@/lib/analytics';
import {
  TOTAL_STEPS,
  contactSchema,
  prestationsParTypeLocal,
  type DevisDraft,
  type Frequence,
  type Prestation,
  type Surface,
  type TypeLocal,
} from '@/lib/devis/schema';
import { ChoiceCard, Fieldset } from './ChoiceCard';
import { Field, TextArea } from './Field';

const STORAGE_KEY = 'devis-draft';

type ContactValues = z.infer<typeof contactSchema>;

export type DevisPrefill = {
  draft: DevisDraft;
  /** Étapes déjà renseignées par l'URL, donc sautées (§7). */
  skip: number[];
  origine?: string;
};

export function DevisWizard({ prefill }: { prefill: DevisPrefill }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [draft, setDraft] = useState<DevisDraft>(prefill.draft);
  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const renderedAt = useRef(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  const skipped = useMemo(() => new Set(prefill.skip), [prefill.skip]);

  /* ---- Réhydratation : sessionStorage puis ?step= (§7) ----------------
   * sessionStorage est un système externe, indisponible au rendu serveur :
   * la synchronisation ne peut donc se faire qu'après montage. L'effet ne
   * s'exécute qu'une fois, il n'y a pas de cascade de rendus.
   */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    renderedAt.current = Date.now();

    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as DevisDraft;
        setDraft((current) => ({ ...parsed, ...current }));
      }
    } catch {
      // Un sessionStorage indisponible ne doit pas bloquer le parcours.
    }

    const fromUrl = Number(searchParams.get('step'));
    const target =
      Number.isFinite(fromUrl) && fromUrl >= 1 && fromUrl <= TOTAL_STEPS
        ? fromUrl
        : firstOpenStep(prefill.draft, skipped);
    setStep(target);
  }, [prefill.draft, searchParams, skipped]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* ---- Persistance ---------------------------------------------------- */
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // idem
    }
  }, [draft]);

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.min(Math.max(target, 1), TOTAL_STEPS);
      setStep(clamped);
      setStepError(null);
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', String(clamped));
      router.replace(`/devis?${params.toString()}`, { scroll: false });
      track(`devis_step_${clamped as 1 | 2 | 3 | 4 | 5}`);
      // Le titre de l'étape reçoit le focus : la navigation clavier suit.
      window.requestAnimationFrame(() => headingRef.current?.focus());
    },
    [router, searchParams],
  );

  const next = useCallback(
    (from: number) => {
      let target = from + 1;
      while (target < TOTAL_STEPS && skipped.has(target)) target += 1;
      goTo(target);
    },
    [goTo, skipped],
  );

  const previous = useCallback(() => {
    let target = step - 1;
    while (target > 1 && skipped.has(target)) target -= 1;
    goTo(target);
  }, [goTo, skipped, step]);

  /* ---- Étape 05 : coordonnées ---------------------------------------- */
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      societe: '',
      nom: '',
      email: '',
      telephone: '',
      codePostal: '',
      message: '',
      consentement: undefined as unknown as true,
    },
  });

  const submit = async (values: ContactValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...draft,
          ...values,
          societeWeb: '',
          renderedAt: renderedAt.current,
          origine: prefill.origine,
        }),
      });

      if (!response.ok) throw new Error(String(response.status));

      track('devis_submit', {
        typeLocal: draft.typeLocal ?? '',
        frequence: draft.frequence ?? '',
      });
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // idem
      }
      router.push('/devis/merci');
    } catch {
      // Une erreur ne s'excuse pas, elle indique quoi faire (§7).
      setSubmitError(copy.erreurs.reseau);
      setSubmitting(false);
    }
  };

  // `handleSubmit` est construit au moment de l'événement, pas au rendu :
  // la lecture de `renderedAt` reste hors phase de rendu.
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    void form.handleSubmit(submit)(event);
  };

  const prestationsDisponibles = useMemo<Prestation[]>(
    () => prestationsParTypeLocal[draft.typeLocal ?? 'autre'],
    [draft.typeLocal],
  );

  const stepCopy = copy.steps[step - 1];
  const tel = telHref();

  return (
    <div>
      <StepProgress current={step} onJump={goTo} draft={draft} />

      {/* Annonce du changement d'étape (§10). */}
      <p aria-live="polite" className="sr-only">
        {copy.progression.etape(step, TOTAL_STEPS)} — {stepCopy.titre}
      </p>

      <div
        ref={headingRef}
        tabIndex={-1}
        className="mt-12 outline-none"
        key={step}
      >
        <p className="eyebrow mb-6 text-slate">
          <span className="text-azure">{stepCopy.numero}</span>
          <span aria-hidden="true"> · </span>
          {copy.progression.etape(step, TOTAL_STEPS)}
        </p>

        {step === 1 ? (
          <Fieldset
            legend={stepCopy.titre}
            aide={stepCopy.aide}
            error={stepError ?? undefined}
            errorId="step-error"
          >
            {copy.steps[0].options.map((option) => (
              <ChoiceCard
                key={option.value}
                type="radio"
                name="typeLocal"
                value={option.value}
                label={option.label}
                aide={option.aide}
                checked={draft.typeLocal === option.value}
                onChange={(value) => {
                  setDraft((d) => ({
                    ...d,
                    typeLocal: value as TypeLocal,
                    // Les prestations dépendent du type de local : on purge
                    // celles qui ne sont plus proposées.
                    prestations: d.prestations?.filter((p) =>
                      prestationsParTypeLocal[value as TypeLocal].includes(p),
                    ),
                  }));
                  next(1);
                }}
              />
            ))}
          </Fieldset>
        ) : null}

        {step === 2 ? (
          <Fieldset legend={stepCopy.titre} aide={stepCopy.aide}>
            {copy.steps[1].options.map((option) => (
              <ChoiceCard
                key={option.value}
                type="radio"
                name="surface"
                value={option.value}
                label={option.label}
                checked={draft.surface === option.value}
                onChange={(value) => {
                  setDraft((d) => ({ ...d, surface: value as Surface }));
                  next(2);
                }}
              />
            ))}
          </Fieldset>
        ) : null}

        {step === 3 ? (
          <Fieldset legend={stepCopy.titre} aide={stepCopy.aide}>
            {copy.steps[2].options.map((option) => (
              <ChoiceCard
                key={option.value}
                type="radio"
                name="frequence"
                value={option.value}
                label={option.label}
                checked={draft.frequence === option.value}
                onChange={(value) => {
                  setDraft((d) => ({ ...d, frequence: value as Frequence }));
                  next(3);
                }}
              />
            ))}
          </Fieldset>
        ) : null}

        {step === 4 ? (
          <>
            <Fieldset
              legend={stepCopy.titre}
              aide={stepCopy.aide}
              error={stepError ?? undefined}
              errorId="step-error"
            >
              {copy.steps[3]
                .options.filter((option) =>
                  prestationsDisponibles.includes(option.value as Prestation),
                )
                .map((option) => (
                  <ChoiceCard
                    key={option.value}
                    type="checkbox"
                    name="prestations"
                    value={option.value}
                    label={option.label}
                    aide={option.aide}
                    checked={
                      draft.prestations?.includes(option.value as Prestation) ??
                      false
                    }
                    describedBy={stepError ? 'step-error' : undefined}
                    onChange={(value, checked) =>
                      setDraft((d) => {
                        const current = new Set(d.prestations ?? []);
                        if (checked) current.add(value as Prestation);
                        else current.delete(value as Prestation);
                        return { ...d, prestations: [...current] };
                      })
                    }
                  />
                ))}
            </Fieldset>

            {/* Seule étape à choix multiple : elle a donc un bouton (§7). */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                variant="devis"
                size="lg"
                onClick={() => {
                  if (!draft.prestations || draft.prestations.length === 0) {
                    setStepError(copy.erreurs.prestations);
                    return;
                  }
                  next(4);
                }}
              >
                {copy.progression.suivant}
              </Button>
              <BackButton onClick={previous} />
            </div>
          </>
        ) : null}

        {step === 5 ? (
          <form onSubmit={onSubmit} noValidate>
            <h2 className="text-28 lg:text-40">{stepCopy.titre}</h2>
            <p className="mt-4 max-w-[52ch] text-17 text-slate">{stepCopy.aide}</p>

            <Recap draft={draft} onJump={goTo} />

            <div className="mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
              <Field
                id="societe"
                label={copy.champs.societe.label}
                error={form.formState.errors.societe && copy.erreurs.requis}
              >
                {(props) => (
                  <input
                    type="text"
                    autoComplete="organization"
                    {...props}
                    {...form.register('societe')}
                  />
                )}
              </Field>

              <Field
                id="nom"
                label={copy.champs.nom.label}
                error={form.formState.errors.nom && copy.erreurs.requis}
              >
                {(props) => (
                  <input
                    type="text"
                    autoComplete="name"
                    {...props}
                    {...form.register('nom')}
                  />
                )}
              </Field>

              <Field
                id="email"
                label={copy.champs.email.label}
                error={form.formState.errors.email && copy.erreurs.email}
              >
                {(props) => (
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    {...props}
                    {...form.register('email')}
                  />
                )}
              </Field>

              <Field
                id="telephone"
                label={copy.champs.telephone.label}
                optionnel={copy.champs.telephone.optionnel}
                aide={copy.champs.telephone.aide}
                error={form.formState.errors.telephone && copy.erreurs.telephone}
              >
                {(props) => (
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    {...props}
                    {...form.register('telephone')}
                  />
                )}
              </Field>

              <Field
                id="codePostal"
                label={copy.champs.codePostal.label}
                error={
                  form.formState.errors.codePostal && copy.erreurs.codePostal
                }
              >
                {(props) => (
                  <input
                    type="text"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength={5}
                    {...props}
                    {...form.register('codePostal')}
                  />
                )}
              </Field>

              <div className="sm:col-span-2">
                <Field
                  id="message"
                  label={copy.champs.message.label}
                  optionnel={copy.champs.message.optionnel}
                  aide={copy.champs.message.aide}
                >
                  {(props) => <TextArea {...props} {...form.register('message')} />}
                </Field>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-15 text-slate">
                  <input
                    type="checkbox"
                    className="mt-1 size-5 shrink-0 accent-navy"
                    aria-invalid={
                      form.formState.errors.consentement ? true : undefined
                    }
                    aria-describedby={
                      form.formState.errors.consentement
                        ? 'consentement-error'
                        : undefined
                    }
                    {...form.register('consentement')}
                  />
                  <span>{copy.champs.consentement}</span>
                </label>
                {form.formState.errors.consentement ? (
                  <p
                    id="consentement-error"
                    className="mt-2 text-13 font-medium text-[#B3261E]"
                  >
                    {copy.erreurs.consentement}
                  </p>
                ) : null}
              </div>

              {/* Honeypot — invisible pour l'humain, laissé au robot (§7). */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label htmlFor="societeWeb">{copy.champs.honeypot}</label>
                <input
                  id="societeWeb"
                  name="societeWeb"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            </div>

            {submitError ? (
              <div
                role="alert"
                className="mt-8 max-w-2xl rounded border border-[#B3261E]/40 bg-[#B3261E]/5 p-5"
              >
                <p className="text-17 font-medium text-ink">
                  {copy.erreurs.titre}
                </p>
                <p className="mt-2 text-15 text-slate">{submitError}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {tel ? (
                    <ButtonLink href={tel} variant="outline">
                      {site.telephone}
                    </ButtonLink>
                  ) : null}
                  {site.emailContact ? (
                    <ButtonLink
                      href={`mailto:${site.emailContact}`}
                      variant="outline"
                    >
                      {site.emailContact}
                    </ButtonLink>
                  ) : (
                    <ButtonLink href="/contact" variant="outline">
                      {copy.erreurs.reseauSecours}
                    </ButtonLink>
                  )}
                </div>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button type="submit" variant="devis" size="lg" disabled={submitting}>
                {submitting ? copy.progression.envoi : copy.progression.envoyer}
              </Button>
              <BackButton onClick={previous} />
            </div>
          </form>
        ) : null}

        {step > 1 && step < 4 ? (
          <div className="mt-10">
            <BackButton onClick={previous} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center text-15 text-slate underline underline-offset-4 hover:text-ink"
    >
      {copy.progression.retour}
    </button>
  );
}

/** Fil des étapes — soulignement bleu accent sur l'étape active (§6). */
function StepProgress({
  current,
  onJump,
  draft,
}: {
  current: number;
  onJump: (step: number) => void;
  draft: DevisDraft;
}) {
  return (
    <nav aria-label={copy.progression.label}>
      <ol className="flex flex-wrap gap-x-6 gap-y-2">
        {copy.steps.map((stepCopy, index) => {
          const number = index + 1;
          const isCurrent = number === current;
          const reachable = number < current || isAnswered(draft, number - 1);
          return (
            <li key={stepCopy.numero}>
              <button
                type="button"
                onClick={() => reachable && onJump(number)}
                disabled={!reachable}
                aria-current={isCurrent ? 'step' : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 pb-1 font-mono text-13 tracking-[0.08em] transition-colors duration-150 ${
                  isCurrent
                    ? 'border-azure text-ink'
                    : 'border-transparent text-slate'
                } ${reachable ? 'hover:text-ink' : 'cursor-not-allowed opacity-50'}`}
              >
                {stepCopy.numero}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Recap({
  draft,
  onJump,
}: {
  draft: DevisDraft;
  onJump: (step: number) => void;
}) {
  const lignes = [
    { step: 1, value: labelFor(0, draft.typeLocal) },
    { step: 2, value: labelFor(1, draft.surface) },
    { step: 3, value: labelFor(2, draft.frequence) },
    {
      step: 4,
      value: (draft.prestations ?? [])
        .map((p) => labelFor(3, p))
        .filter(Boolean)
        .join(', '),
    },
  ].filter((ligne) => ligne.value);

  if (lignes.length === 0) return null;

  return (
    <div className="mt-10 max-w-2xl rounded border border-steel/40 bg-frost p-5">
      <h3 className="eyebrow text-slate">{copy.recap.titre}</h3>
      <dl className="mt-4 space-y-3">
        {lignes.map((ligne) => (
          <div key={ligne.step} className="flex flex-wrap items-baseline gap-x-3">
            <dt className="font-mono text-13 text-slate">
              {copy.steps[ligne.step - 1].numero}
            </dt>
            <dd className="text-15 text-ink">{ligne.value}</dd>
            <button
              type="button"
              onClick={() => onJump(ligne.step)}
              className="ml-auto min-h-11 text-13 text-navy underline underline-offset-4 hover:text-azure"
            >
              {copy.recap.modifier}
            </button>
          </div>
        ))}
      </dl>
    </div>
  );
}

function labelFor(stepIndex: number, value?: string): string {
  if (!value) return '';
  return (
    copy.steps[stepIndex].options?.find((option) => option.value === value)
      ?.label ?? ''
  );
}

function isAnswered(draft: DevisDraft, step: number): boolean {
  if (step === 1) return Boolean(draft.typeLocal);
  if (step === 2) return Boolean(draft.surface);
  if (step === 3) return Boolean(draft.frequence);
  if (step === 4) return (draft.prestations?.length ?? 0) > 0;
  return step === 0;
}

function firstOpenStep(draft: DevisDraft, skipped: Set<number>): number {
  for (let step = 1; step <= TOTAL_STEPS; step += 1) {
    if (skipped.has(step)) continue;
    if (!isAnswered(draft, step)) return step;
  }
  return TOTAL_STEPS;
}


