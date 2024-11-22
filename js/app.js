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
});
