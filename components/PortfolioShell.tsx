import Link from 'next/link';
import type { ReactNode } from 'react';

const Icon = ({ name, size = 17 }: { name: 'arrow'|'download'|'github'|'mail'|'external'|'chevron'|'layers'; size?: number }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  switch (name) {
    case 'arrow': return <svg {...common}><path d="M5 19 19 5M7 5h12v12" /></svg>;
    case 'download': return <svg {...common}><path d="M12 3v12m-5-5 5 5 5-5M4 17v3h16v-3" /></svg>;
    case 'github': return <svg {...common}><path d="M9 19c-4 1-4-2-6-2m12 4v-3.7c0-1 .1-1.5-.5-2 3.7-.4 6-2 6-6a4.7 4.7 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.3-.4-3.3 1.3a11.7 11.7 0 0 0-6 0C7.8 2.5 6.5 2.9 6.5 2.9a4.2 4.2 0 0 0-.1 3.2A4.7 4.7 0 0 0 5 9.3c0 4 2.3 5.6 6 6-.6.5-.6 1.1-.6 2V21" /></svg>;
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'external': return <svg {...common}><path d="M13 4h7v7m0-7-9 9M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></svg>;
    case 'layers': return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></svg>;
    default: return <svg {...common}><path d="m9 18 6-6-6-6"/></svg>;
  }
};
export { Icon };

export function SiteHeader() {
  return <header className="site-header"><div className="container nav-inner">
    <Link href="/" className="wordmark" aria-label="Rohit Shendurkar home"><span className="brand-shape">R<span>.</span></span><span>Rohit<span className="wordmark-muted"> / Shendurkar</span></span></Link>
    <nav aria-label="Main navigation" className="nav-links"><Link href="/#work">Work</Link><Link href="/#experience">Experience</Link><Link href="/#about">About</Link><Link href="/projects">Case studies</Link></nav>
    <a href="mailto:rohitshendurkar2017@gmail.com" className="nav-cta"><span>Let&apos;s talk</span><Icon name="arrow" size={15}/></a>
  </div></header>;
}
export function SiteFooter() {
  return <footer className="footer" id="contact"><div className="container"><div className="footer-top"><div><div className="eyebrow light"><span className="tiny-dot"/> START A CONVERSATION</div><h2>Building something<br/><em>interesting?</em></h2><p>I&apos;m open to software engineering opportunities and teams building thoughtful, useful products.</p><a className="btn btn-light" href="mailto:rohitshendurkar2017@gmail.com">Get in touch <Icon name="arrow"/></a></div><div className="footer-links"><div className="footer-links-label">FIND ME</div><a href="https://github.com/rohit200x" target="_blank" rel="noopener noreferrer">GitHub <Icon name="external"/></a><a href="mailto:rohitshendurkar2017@gmail.com">Email <Icon name="external"/></a><a href="/resume.pdf" download>Résumé <Icon name="download"/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Rohit Shendurkar</span><span>Designed as a living engineering notebook, not a collection of broken demo links.</span><a href="#top">Back to top ↑</a></div></div></footer>;
}
export function PageFrame({ children }: { children: ReactNode }) { return <div id="top"><SiteHeader/>{children}<SiteFooter/></div>; }
