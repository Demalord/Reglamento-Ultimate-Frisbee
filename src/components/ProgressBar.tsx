export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div className="progress">
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} de ${max}`}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">
        {value}/{max}
      </span>
    </div>
  )
}
