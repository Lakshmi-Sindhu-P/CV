import * as React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { navSections, projects, profile } from '@/data/profile';

/**
 * ⌘K palette. This is the only React island that ships JS of substance;
 * everything else on the page is static HTML.
 */
export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const base = import.meta.env.BASE_URL;

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    const onRequest = () => setOpen(true);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('lsp:open-palette', onRequest);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('lsp:open-palette', onRequest);
    };
  }, []);

  const jump = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  const openLink = (href: string) => {
    setOpen(false);
    window.open(href, href.startsWith('mailto:') ? '_self' : '_blank', 'noopener');
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Jump to" description="Sections, projects and links">
      <CommandInput placeholder="Jump to a section, project or link…" />
      <CommandList>
        <CommandEmpty>Nothing here. Try “work”, “Spotify”, or “email”.</CommandEmpty>

        <CommandGroup heading="Sections">
          {navSections.map((section) => (
            <CommandItem key={section.id} value={`${section.label} ${section.id}`} onSelect={() => jump(section.id)}>
              <span>{section.label}</span>
              <CommandShortcut>{section.hint}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.id}
              value={`${project.index} ${project.title} ${project.context} ${project.stack.join(' ')}`}
              onSelect={() => jump('work')}
            >
              <span className="truncate">
                <span className="mr-2 text-[var(--color-text-placeholder)]">{project.index}</span>
                {project.title}
              </span>
              <CommandShortcut>{project.year}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Elsewhere">
          <CommandItem value="email contact mail" onSelect={() => openLink(`mailto:${profile.email}`)}>
            <span>Email me</span>
            <CommandShortcut>{profile.email}</CommandShortcut>
          </CommandItem>
          <CommandItem value="github code repositories" onSelect={() => openLink(profile.github)}>
            <span>GitHub</span>
            <CommandShortcut>Lakshmi-Sindhu-P</CommandShortcut>
          </CommandItem>
          <CommandItem value="linkedin profile" onSelect={() => openLink(profile.linkedin)}>
            <span>LinkedIn</span>
            <CommandShortcut>in/lakshmi-sindhu-p</CommandShortcut>
          </CommandItem>
          <CommandItem value="resume cv pdf download" onSelect={() => openLink(`${base}resume.pdf`)}>
            <span>Résumé (PDF)</span>
            <CommandShortcut>↗</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
