let currentHeaderHeight = 80;

export const setHeaderHeight = (height) => {
  currentHeaderHeight = height;
};

// Define which sections need header offset
const SECTIONS_NEEDING_OFFSET = [
  "hero",
  "categories",
  "portfolio",
  "works",
  "management",
  "form",
  "offices",
  "map",
  "hours",
  "support",
];

export const scrollToSection = (sectionId, height = currentHeaderHeight) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;

  // Only subtract header height for sections that need it
  const shouldOffset = SECTIONS_NEEDING_OFFSET.includes(sectionId);
  const offsetPosition =
    elementPosition + window.pageYOffset - (shouldOffset ? height : 0);

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
