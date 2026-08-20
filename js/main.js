(() => {
  const OFFER_URL = "https://dominatus830.online/d6PhXwY5?sub_id_1=1win.health";

  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const filters = document.querySelectorAll("[data-filter]");
  const slots = document.querySelectorAll(".slot-card");
  const revealItems = document.querySelectorAll(".section, .footer, .ticker");
  const offerLinks = document.querySelectorAll(".js-offer");

  /**
   * Binds all offer CTA links to the official 1WIN URL.
   */
  offerLinks.forEach((link) => {
    if (link.tagName === "A") {
      link.setAttribute("href", OFFER_URL);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer sponsored");
      return;
    }
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = OFFER_URL;
    });
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 20);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden");
      if (open) {
        mobileNav.removeAttribute("hidden");
      } else {
        mobileNav.setAttribute("hidden", "");
      }
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const value = filter.getAttribute("data-filter") || "all";
      filters.forEach((item) => item.classList.toggle("is-active", item === filter));
      slots.forEach((slot) => {
        const cat = slot.getAttribute("data-cat");
        const show = value === "all" || cat === value;
        slot.classList.toggle("is-hidden", !show);
      });
    });
  });

  revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
