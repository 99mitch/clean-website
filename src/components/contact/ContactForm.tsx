'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, TextArea } from '@/components/devis/Field';
import { Button } from '@/components/ui/Button';
import { contactPage as copy } from '@/copy/pages';
import { devis } from '@/copy/devis';
import { contactFormSchema, type ContactFormValues } from '@/lib/contact/schema';

export function ContactForm() {
  const renderedAt = useRef(0);
  const [etat, setEtat] = useState<'idle' | 'envoi' | 'ok' | 'erreur'>('idle');

  // Horodatage du rendu, base du contrôle anti-spam des 3 secondes (§7).
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      nom: '',
      societe: '',
      email: '',
      telephone: '',
      sujet: copy.sujets[0],
      message: '',
      consentement: undefined as unknown as true,
    },
  });

  const submit = async (values: ContactFormValues) => {
    setEtat('envoi');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          societeWeb: '',
          renderedAt: renderedAt.current,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setEtat('ok');
      form.reset();
    } catch {
      setEtat('erreur');
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    void form.handleSubmit(submit)(event);
  };

  if (etat === 'ok') {
    return (
      <p role="status" className="border-t-2 border-ink bg-mist/60 p-6 text-17">
        {copy.succes}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <Field
        id="contact-nom"
        label={copy.champs.nom}
        error={form.formState.errors.nom && devis.erreurs.requis}
      >
        {(props) => (
          <input type="text" autoComplete="name" {...props} {...form.register('nom')} />
        )}
      </Field>

      <Field id="contact-societe" label={copy.champs.societe} optionnel={copy.champs.optionnel}>
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
        id="contact-email"
        label={copy.champs.email}
        error={form.formState.errors.email && devis.erreurs.email}
      >
        {(props) => (
          <input type="email" autoComplete="email" {...props} {...form.register('email')} />
        )}
      </Field>

      <Field
        id="contact-telephone"
        label={copy.champs.telephone}
        optionnel={copy.champs.optionnel}
      >
        {(props) => (
          <input type="tel" autoComplete="tel" {...props} {...form.register('telephone')} />
        )}
      </Field>

      <div className="sm:col-span-2">
        <Field
          id="contact-sujet"
          label={copy.champs.sujet}
          error={form.formState.errors.sujet && devis.erreurs.requis}
        >
          {(props) => (
            <select {...props} {...form.register('sujet')}>
              {copy.sujets.map((sujet) => (
                <option key={sujet} value={sujet}>
                  {sujet}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field
          id="contact-message"
          label={copy.champs.message}
          error={form.formState.errors.message && devis.erreurs.requis}
        >
          {(props) => <TextArea rows={6} {...props} {...form.register('message')} />}
        </Field>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-15 text-slate">
          <input
            type="checkbox"
            className="mt-1 size-5 shrink-0 accent-cobalt"
            aria-invalid={form.formState.errors.consentement ? true : undefined}
            aria-describedby={
              form.formState.errors.consentement ? 'contact-consentement-error' : undefined
            }
            {...form.register('consentement')}
          />
          <span>{copy.champs.consentement}</span>
        </label>
        {form.formState.errors.consentement ? (
          <p id="contact-consentement-error" className="mt-2 text-13 font-medium text-[#B3261E]">
            {devis.erreurs.consentement}
          </p>
        ) : null}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="contact-societeWeb">{devis.champs.honeypot}</label>
        <input id="contact-societeWeb" name="societeWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {etat === 'erreur' ? (
        <p role="alert" className="sm:col-span-2 text-15 font-medium text-[#B3261E]">
          {copy.echec}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" variant="ink" size="lg" disabled={etat === 'envoi'}>
          {etat === 'envoi' ? copy.envoi : copy.envoyer}
        </Button>
      </div>
    </form>
  );
}
