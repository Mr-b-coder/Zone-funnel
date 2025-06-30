/**
 * Handles navigation clicks for anchor links, providing smooth scrolling for on-page
 * links and hash-based navigation for switching between the main page and contact page.
 * 
 * @param e - The React MouseEvent from the anchor tag click.
 */
export const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (!href) return;

  // Handle navigating home via logo click or "Home" links.
  if (href === '#') {
    // Setting the hash to empty triggers the hashchange listener in App.tsx,
    // which correctly switches back to the main page content.
    window.location.hash = '';
    
    // We can still perform a smooth scroll to the top.
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }
  
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);
  
  // If the target element exists on the current page, scroll to it smoothly.
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    // This updates the URL without triggering a hashchange, preserving the smooth scroll.
    // The active link highlighting will update via the 'scroll' event listener.
    window.history.pushState(null, '', href);
  } else {
    // If the target element doesn't exist (e.g., clicking a section link from the contact page,
    // or clicking the "Contact" link from the main page), we set the hash directly. This will
    // trigger the 'hashchange' event listener in App.tsx to switch the page view.
    window.location.hash = href;
  }
};