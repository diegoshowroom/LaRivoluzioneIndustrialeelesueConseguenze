const updatePageBackgroundHeight = () => {
    document.body.style.setProperty(
        "--page-background-render-height",
        `${document.body.getBoundingClientRect().height}px`
    );
};

updatePageBackgroundHeight();
new ResizeObserver(updatePageBackgroundHeight).observe(document.body);

document.querySelectorAll(".menu-toggle").forEach((button) => {
    const navigation = document.getElementById(button.getAttribute("aria-controls"));

    if (!navigation) {
        return;
    }

    const closeMenu = () => {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Apri menu");
        navigation.classList.remove("is-open");
    };

    button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
        button.setAttribute("aria-label", isOpen ? "Apri menu" : "Chiudi menu");
        navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
            closeMenu();
            button.focus();
        }
    });
});
