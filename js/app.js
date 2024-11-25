document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".main-nav ul li a");
    const navbar = document.querySelector(".main-nav");
    const navbarHeight = navbar.offsetHeight;
  
    let currentActiveLink = null;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
  
            navLinks.forEach((link) => link.classList.remove("active"));
            const newActiveLink = [...navLinks].find(
              (link) => link.getAttribute("href") === `#${sectionId}`
            );
            if (newActiveLink) {
              newActiveLink.classList.add("active");
              currentActiveLink = newActiveLink;
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        if (currentActiveLink) {
          currentActiveLink.classList.remove("active");
        }
  
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
  
        let scrollOffset =
          targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
  
        if (targetId === "header") {
          scrollOffset -= 10;
        }
  
        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
  
        setTimeout(() => {
          link.classList.add("active");
          currentActiveLink = link;
        }, 500);
      });
    });
  
    // Add the scroll button functionality
    const scrollButton = document.getElementById("scroll-down-button");
    scrollButton.addEventListener("click", () => {
      const learnerSection = document.getElementById("learner");
      const scrollOffset =
        learnerSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
  
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    });
  });
  

gsap.registerPlugin(ScrollTrigger);

// Select all sections
const sections = document.querySelectorAll('.section');

sections.forEach((section, index) => {
  const direction = index % 2 === 0 ? -300 : 300; 

  gsap.fromTo(
    section,
    {
      opacity: 0,  
      x: direction, 
    },
    {
      opacity: 1,   
      x: 0,         
      duration: 0.5, 
      scrollTrigger: {
        trigger: section,            
        start: 'top 60%',           
        end: 'bottom 30%',            
        toggleActions: 'play none none reverse', 
        markers: false,               
      }
    }
  );
});


