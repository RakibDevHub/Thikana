let currentHeaderHeight = 80;

export const setHeaderHeight = (height) => {
  currentHeaderHeight = height;
};

const SECTION_OFFSETS = {
  // Home page sections
  "hero": true,                    
  "features": true,                 
  "why-choose-us": true,            
  "services": true,                 
  "how-it-works": true,             
  "testimonials": true,             
  "faq": true,                      
  
  // Properties page sections
  "categories": true,                
  "portfolio": true,                 
  "works": true,                     
  "management": true,                 
  
  // Contact page sections
  "form": 40,                      
  "offices": true,  
  "map": 50,                    
  "hours": 100,                        
  "support": true,                    
  
  // About page sections
  "story": 30,                        
  "team": 30,                          
  "clients": true,                       
  "values": true,                        
};

export const scrollToSection = (sectionId, height = currentHeaderHeight) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  
  // Determine offset
  let offset = 0;
  
  if (SECTION_OFFSETS.hasOwnProperty(sectionId)) {
    const sectionOffset = SECTION_OFFSETS[sectionId];
    offset = typeof sectionOffset === 'number' ? sectionOffset : height;
  } else {
    offset = 0;
  }

  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

// Helper to check if a section has a custom offset
export const getSectionOffset = (sectionId) => {
  if (!SECTION_OFFSETS.hasOwnProperty(sectionId)) return 0;
  
  const offset = SECTION_OFFSETS[sectionId];
  return typeof offset === 'number' ? offset : currentHeaderHeight;
};