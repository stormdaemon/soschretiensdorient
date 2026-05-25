import { useState } from 'react';

const ECOSYSTEM_LINKS = [
  {
    id: 'irenee',
    label: 'Institut Irénée',
    shortLabel: 'Irénée',
    initials: 'IR',
    href: 'https://irenee-institut.org/',
  },
  {
    id: 'wikibible',
    label: 'WikiBible',
    shortLabel: 'WikiBible',
    initials: 'WB',
    href: 'https://wikibible.fr/',
  },
  {
    id: 'heavenradio',
    label: 'Heaven Radio',
    shortLabel: 'Heaven Radio',
    initials: 'HR',
    href: 'https://heavenradio.fr/',
  },
  {
    id: 'mission',
    label: 'La Mission Catholique',
    shortLabel: 'La Mission',
    initials: 'LM',
    href: 'https://www.lamissioncatholique.fr/',
  },
  {
    id: 'ultreia',
    label: 'Ultreia Event',
    shortLabel: 'Ultreia',
    initials: 'UE',
    href: 'https://ultreiaevent.com/',
  },
  {
    id: 'bapteme',
    label: 'Le Baptême Catholique',
    shortLabel: 'Baptême',
    initials: 'BC',
    href: 'https://lebaptemecatholique.fr/',
  },
] as const;

export function ChristianEcosystemMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="fixed bottom-4 left-3 z-40 sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2">
      <div className="flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 items-center gap-2 rounded-md border border-red-900/30 bg-slate-950/95 px-3 text-xs font-black uppercase tracking-[0.14em] text-amber-100 shadow-xl shadow-black/25 backdrop-blur sm:hidden"
          aria-expanded={isOpen}
          aria-controls="christian-ecosystem-menu"
        >
          Sites amis
          <span aria-hidden="true" className="text-base leading-none">
            {isOpen ? '-' : '+'}
          </span>
        </button>

        <nav
          id="christian-ecosystem-menu"
          className={`${isOpen ? 'flex' : 'hidden'} max-w-[calc(100vw-1.5rem)] flex-col gap-2 sm:flex`}
          aria-label="Sites amis de l'écosystème chrétien"
        >
          {ECOSYSTEM_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-12 items-center rounded-r-md border border-red-900/25 bg-slate-950/95 pr-3 text-amber-50 shadow-xl shadow-black/20 backdrop-blur transition duration-200 hover:translate-x-1 hover:border-amber-400/80 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              aria-label={`Ouvrir ${link.label}`}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-amber-400/70 bg-gradient-to-br from-amber-200 to-amber-600 text-[0.68rem] font-black text-slate-950 shadow-inner">
                {link.initials}
              </span>
              <span className="ml-2 max-w-[8.5rem] text-[0.72rem] font-black uppercase leading-tight tracking-[0.03em]">
                {link.shortLabel}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
