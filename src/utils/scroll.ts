// Smoothly scrolls to a section; the fixed-header offset comes from `scroll-margin-top` in index.css
export const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', href);
  }
};
