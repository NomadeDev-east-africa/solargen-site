import type { ApplianceId, SiteType, AutonomyChoice } from "@/lib/estimator";

function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const CLIM_PATH = (
  <>
    <rect x="2.5" y="6" width="19" height="7" rx="2" />
    <path d="M6 13v2.5M10 13v3.5M14 13v2.5M18 13v3.5" />
    <path d="M6 9h.01M9 9h6" />
  </>
);

export function ClimIcon({ className }: { className?: string }) {
  return <Svg className={className}>{CLIM_PATH}</Svg>;
}

const APPLIANCE_PATHS: Record<ApplianceId, React.ReactNode> = {
  frigo: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="1.8" />
      <path d="M6 9.5h12" />
      <path d="M9 5.5v2M9 12v3.5" />
    </>
  ),
  congelateur: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="1.8" />
      <path d="M12 7v9M9 9.5l6 4M15 9.5l-6 4" />
    </>
  ),
  machineLaver: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="2.1" />
      <path d="M7 6.2h.01M10 6.2h.01" />
    </>
  ),
  ventilateur: (
    <>
      <circle cx="12" cy="12" r="1.8" />
      <path d="M12 10.3C12 6 15 3.5 17.5 4.3c2 .7 1.6 4-.5 5.7-1.3 1-3 1.3-5 .3Z" />
      <path d="M13.7 12c4.3 0 6.8 3 6 5.5-.7 2-4 1.6-5.7-.5-1-1.3-1.3-3-.3-5Z" />
      <path d="M10.3 12C6 12 3.5 9 4.3 6.5c.7-2 4-1.6 5.7.5 1 1.3 1.3 3 .3 5Z" />
      <path d="M12 21v-3" />
    </>
  ),
  tv: (
    <>
      <rect x="2.5" y="4.5" width="19" height="13" rx="2" />
      <path d="M8 21h8M12 17.5V21" />
    </>
  ),
  ordinateur: (
    <>
      <rect x="3.5" y="4" width="17" height="11" rx="1.8" />
      <path d="M2 19.5h20M9 15v2M15 15v2" />
    </>
  ),
  eclairage: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 2.5a6 6 0 0 1 3.4 10.9c-.7.5-1.4 1.4-1.4 2.6H10c0-1.2-.7-2.1-1.4-2.6A6 6 0 0 1 12 2.5Z" />
    </>
  ),
  pompe: (
    <>
      <circle cx="12" cy="13" r="7.2" />
      <path d="M12 8v5l3 2" />
      <path d="M12 2.5c1.6 1.8 2.4 3 2.4 4.2A2.4 2.4 0 0 1 12 9a2.4 2.4 0 0 1-2.4-2.3c0-1.2.8-2.4 2.4-4.2Z" />
    </>
  ),
  autre: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
};

export function ApplianceIcon({ id, className }: { id: ApplianceId; className?: string }) {
  return <Svg className={className}>{APPLIANCE_PATHS[id]}</Svg>;
}

const SITE_PATHS: Record<SiteType, React.ReactNode> = {
  maison: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  villa: (
    <>
      <path d="M3 12 9 6l4 3 4-4 4 4" />
      <path d="M5 12v8h14v-8" />
      <path d="M9 20v-4h3v4" />
    </>
  ),
  entreprise: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h.01M14 7h.01M9 11h.01M14 11h.01M9 15h.01M14 15h.01" />
    </>
  ),
  ferme: (
    <>
      <path d="M4 20V10l5-4 5 4v10" />
      <path d="M4 20h16M9 20v-5h3v5" />
      <circle cx="18" cy="8.5" r="3" />
      <path d="M18 5.5v-2" />
    </>
  ),
};

export function SiteIcon({ id, className }: { id: SiteType; className?: string }) {
  return <Svg className={className}>{SITE_PATHS[id]}</Svg>;
}

const AUTONOMY_PATHS: Record<AutonomyChoice, React.ReactNode> = {
  4: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  8: (
    <>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </>
  ),
  24: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21" />
      <path d="M12 7v5l3.5 3.5" />
    </>
  ),
  48: (
    <>
      <rect x="2" y="8" width="17" height="10" rx="2" />
      <path d="M19 11v4" />
      <path d="M6 12h2M11 12h2" />
    </>
  ),
};

export function AutonomyIcon({ id, className }: { id: AutonomyChoice; className?: string }) {
  return <Svg className={className}>{AUTONOMY_PATHS[id]}</Svg>;
}

const PHASE_PATHS: Record<"mono" | "tri", React.ReactNode> = {
  mono: (
    <>
      <path d="M3 12h4" />
      <path d="M9 12a9 6 0 0 0 12 0" />
      <path d="M21 12h-4" />
    </>
  ),
  tri: (
    <>
      <path d="M3 7h4M3 12h4M3 17h4" />
      <path d="M9 7a9 3 0 0 0 12 0" />
      <path d="M9 12a9 3 0 0 0 12 0" />
      <path d="M9 17a9 3 0 0 0 12 0" />
    </>
  ),
};

export function PhaseIcon({ id, className }: { id: "mono" | "tri"; className?: string }) {
  return <Svg className={className}>{PHASE_PATHS[id]}</Svg>;
}

export function AreaIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h4M3 15h4M17 3v4M17 17v4M21 9h-4M21 15h-4M9 3v4M15 3v4" />
    </Svg>
  );
}
