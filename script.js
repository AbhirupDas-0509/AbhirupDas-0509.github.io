const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.section-kicker, .section-heading-row, .value-strip, .timeline-item, .section-title-line, .expertise-card, .credentials-layout, .contact-panel');
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('visible'));
}

const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}
/* Rotate five featured skills at a time in the hero technology carousel */
(() => {
  const track = document.querySelector('#skill-carousel-items');
  if (!track) return;
  const category = document.querySelector('#skill-category');
  const count = document.querySelector('#skill-count');
  const label = document.querySelector('#skill-set-label');
  const progress = document.querySelector('.skill-carousel-bottom');
  const prev = document.querySelector('#skill-prev');
  const next = document.querySelector('#skill-next');
  const groups = [
    { title: 'AI & GENAI', label: 'Python · LLM frameworks · AI', items: [['Py','Python'],['⛓','LangChain'],['⌘','LangGraph'],['✴','Claude']] },
    { title: 'INTELLIGENT AUTOMATION', label: 'Enterprise automation platforms', items: [['U','UiPath'],['BP','Blue Prism'],['S','ServiceNow RPA'],['ϟ','Power Automate']] }
  ];
  let active = 0;
  let timer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function render() {
    const group = groups[active];
    category.textContent = group.title;
    count.textContent = `0${active + 1} / 0${groups.length}`;
    label.textContent = group.label;
    track.replaceChildren();
    group.items.forEach(([mark, name], index) => {
      const tile = document.createElement('div');
      tile.className = 'skill-tile';
      tile.style.animationDelay = `${index * 55}ms`;
      const icon = document.createElement('b');
      icon.textContent = mark;
      const caption = document.createElement('span');
      caption.textContent = name;
      tile.append(icon, caption);
      track.append(tile);
    });
    progress.classList.remove('is-running');
    void progress.offsetWidth;
    if (!reducedMotion) progress.classList.add('is-running');
  }
  function move(step) { active = (active + step + groups.length) % groups.length; render(); restart(); }
  function restart() { clearInterval(timer); if (!reducedMotion) timer = setInterval(() => move(1), 4800); }
  prev?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
  render();
  restart();
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearInterval(timer); else restart(); });
})();


