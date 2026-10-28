export function DiscIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <ellipse cx="16" cy="17.5" rx="13" ry="7.5" fill="var(--pasto-2)" />
      <ellipse cx="16" cy="15.5" rx="13" ry="7.5" fill="var(--cono)" />
      <ellipse cx="16" cy="15.5" rx="7" ry="3.6" fill="none" stroke="var(--tinta)" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  )
}
