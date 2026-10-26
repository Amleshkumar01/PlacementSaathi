export function Logo({ light = false }: { light?: boolean }) {
  const gid = light ? "ps-logo-grad-light" : "ps-logo-grad";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${gid})`} />
        <path d="M6.5 13 16 8.5l9.5 4.5L16 17.5 6.5 13Z" fill="#fff" />
        <path d="M10.5 15.2v4.3c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.3L16 17.8l-5.5-2.6Z" fill="#fff" fillOpacity=".85" />
        <path d="M25.5 13v5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-brand-900"}`}>
        Placement<span className={light ? "text-brand-300" : "text-brand-600"}>Saathi</span>
      </span>
    </span>
  );
}
