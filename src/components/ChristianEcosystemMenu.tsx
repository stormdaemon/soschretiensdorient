import { useState } from 'react';

const ECOSYSTEM_LINKS = [
  {
    id: 'irenee',
    label: 'Institut Irénée',
    shortLabel: 'Irénée',
    href: 'https://irenee-institut.org/',
  },
  {
    id: 'wikibible',
    label: 'WikiBible',
    shortLabel: 'WikiBible',
    href: 'https://wikibible.fr/',
  },
  {
    id: 'heavenradio',
    label: 'Heaven Radio',
    shortLabel: 'Heaven',
    href: 'https://heavenradio.fr/',
  },
  {
    id: 'mission',
    label: 'La Mission Catholique',
    shortLabel: 'Mission',
    href: 'https://www.lamissioncatholique.fr/',
  },
  {
    id: 'ultreia',
    label: 'Ultreia Event',
    shortLabel: 'Ultreia',
    href: 'https://ultreiaevent.com/',
  },
  {
    id: 'bapteme',
    label: 'Le Baptême Catholique',
    shortLabel: 'Baptême',
    href: 'https://lebaptemecatholique.fr/',
  },
] as const;

type EcosystemId = (typeof ECOSYSTEM_LINKS)[number]['id'];

function SiteGlyph({ id }: { id: EcosystemId }) {
  const common = 'currentColor';

  if (id === 'wikibible') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 5.5h7a3 3 0 0 1 3 3v10H9a2 2 0 0 1-2-2v-11Z" stroke={common} strokeWidth="1.7" />
        <path d="M10 9h4M10 12h4" stroke={common} strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'heavenradio') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 13a6 6 0 0 1 12 0M9 13a3 3 0 0 1 6 0" stroke={common} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 13v4M17 13v4M12 15v4" stroke={common} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'mission') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v18M6.5 8.5h11" stroke={common} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 19c2.5-2 4.8-3 7-3s4.5 1 7 3" stroke={common} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'ultreia') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3 2.2 6.1 6.3.2-5 3.9 1.8 6.3L12 16l-5.3 3.5 1.8-6.3-5-3.9 6.3-.2L12 3Z" stroke={common} strokeWidth="1.45" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === 'bapteme') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9Z" stroke={common} strokeWidth="1.65" />
        <path d="M9.5 14.5c1.4 1.2 3.6 1.2 5 0" stroke={common} strokeWidth="1.45" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16M7 9h10" stroke={common} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8" stroke={common} strokeWidth="1.35" />
    </svg>
  );
}

export function ChristianEcosystemMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="fixed left-3 top-1/2 z-40 -translate-y-1/2 max-md:bottom-4 max-md:left-4 max-md:top-auto max-md:translate-y-0">
      <div className="flex flex-col-reverse items-start gap-2 md:flex-col">
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-10 items-center gap-2 border border-red-200/30 bg-red-950/90 px-2.5 text-[0.68rem] font-black uppercase tracking-[0.08em] text-red-50 shadow-lg shadow-red-950/20 backdrop-blur md:hidden"
          aria-expanded={isOpen}
          aria-controls="christian-ecosystem-menu"
          aria-label={isOpen ? 'Fermer les sites amis' : 'Ouvrir les sites amis'}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full border border-red-100/35 text-red-100">
            <SiteGlyph id="irenee" />
          </span>
          Sites amis
        </button>

        <nav
          id="christian-ecosystem-menu"
          className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-2 md:flex`}
          aria-label="Sites amis de l'écosystème chrétien"
        >
          {ECOSYSTEM_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-11 items-center text-red-50 no-underline outline-none transition duration-200 hover:translate-x-1 focus-visible:translate-x-1"
              aria-label={`Ouvrir ${link.label}`}
            >
              <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-red-200/30 bg-red-950/90 text-red-100 shadow-lg shadow-red-950/20 ring-2 ring-black/10 backdrop-blur">
                <SiteGlyph id={link.id} />
              </span>
              <span className="-ml-2 flex h-8 min-w-[7.6rem] items-center border border-l-0 border-red-200/20 bg-red-950/80 pl-5 pr-5 text-[0.68rem] font-black uppercase tracking-[0.07em] shadow-md shadow-red-950/20 backdrop-blur [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%)] group-hover:border-red-100/30 group-hover:bg-red-900/90">
                <span className="max-w-[5.8rem] truncate">{link.shortLabel}</span>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
