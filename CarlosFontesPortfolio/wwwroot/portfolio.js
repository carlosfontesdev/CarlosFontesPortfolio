let observer;
let page;

export function initPortfolioPage() {
    disposePortfolioPage();

    page = document.querySelector("[data-portfolio-page]");
    if (!page) {
        return;
    }

    const links = Array.from(page.querySelectorAll("[data-section-link]"));
    const sections = Array.from(page.querySelectorAll("[data-section]"));

    observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
            return;
        }

        links.forEach((link) => {
            link.classList.toggle("active", link.dataset.sectionLink === visible.target.id);
        });
    }, {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7]
    });

    sections.forEach((section) => observer.observe(section));
}

export function disposePortfolioPage() {
    if (observer) {
        observer.disconnect();
        observer = undefined;
    }

    page = undefined;
}
