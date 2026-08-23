/**
 * Emplacement réservé à une photo qui n'existe pas encore (§0 CLAUDE.md :
 * jamais d'image inventée). Trame en diagonale sur le fond mist, étiquette
 * monospace décrivant le visuel attendu — à remplacer par un `next/image`
 * dès que le client fournit la photo, sur le modèle de `/services`.
 */
export function PlaceholderImage({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`placeholder-photo relative flex items-center justify-center ${className}`}>
      <span className="relative z-10 border border-ink/25 bg-paper px-4 py-2 text-center font-mono text-13 uppercase tracking-[0.1em] text-slate">
        {label}
      </span>
    </div>
  );
}
