let currentHeaderHeight = 80;

export const setHeaderHeight = (height) => {
  currentHeaderHeight = height;
};

// Define which sections need header offset (usually just the first section)
const SECTIONS_NEEDING_OFFSET = ['hero', 'hero-section'];

export const scrollToSection = (sectionId, height = currentHeaderHeight) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  
  // Only subtract header height for sections that need it
  const shouldOffset = SECTIONS_NEEDING_OFFSET.includes(sectionId);
  const offsetPosition = elementPosition + window.pageYOffset - (shouldOffset ? height : 0);

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

// React Scroll version if you're using it
import { scroller } from 'react-scroll';

export const scrollToSectionWithReactScroll = (sectionId) => {
  const shouldOffset = SECTIONS_NEEDING_OFFSET.includes(sectionId);
  
  scroller.scrollTo(sectionId, {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset: shouldOffset ? -currentHeaderHeight : 0,
  });
};