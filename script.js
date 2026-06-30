// Загружаем хедер
fetch("header.html?v=" + Date.now())
  .then((res) => res.text())
  .then((html) => {
    const placeholder = document.getElementById("header-placeholder");
    placeholder.insertAdjacentHTML("afterend", html);
    placeholder.remove();

    // Тема
    const themeSwitch = document.getElementById("themeSwitch");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      if (themeSwitch) themeSwitch.checked = true;
    }

    if (themeSwitch) {
      themeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark", themeSwitch.checked);
        localStorage.setItem("theme", themeSwitch.checked ? "dark" : "light");
      });
    }

    // Бургер-меню
    const burgerBtn = document.getElementById("burgerBtn");

    // Вставляем мобильное меню прямо в body (вне .frame/.wrapper)
    const mobileMenuHTML = `
      <div class="mobile-menu" id="mobileMenu">
        <nav class="mobile-menu__nav">
          <a href="/index.html" class="mobile-menu__link link">Главная</a>
          <a href="index.html#portfolio" class="mobile-menu__link link">Портфолио</a>
          <a href="index.html#about" class="mobile-menu__link link">О себе</a>
        </nav>
        <a href="https://web.telegram.org/dstrizhak" target="_blank" class="btn btn--primary btn--large mobile-menu__tg-btn">Написать в telegram</a>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", mobileMenuHTML);

    const mobileMenu = document.getElementById("mobileMenu");

    if (burgerBtn && mobileMenu) {
      burgerBtn.addEventListener("click", () => {
        const isOpen = burgerBtn.classList.toggle("is-open");
        mobileMenu.classList.toggle("is-open", isOpen);
        burgerBtn.setAttribute("aria-expanded", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          burgerBtn.classList.remove("is-open");
          mobileMenu.classList.remove("is-open");
          burgerBtn.setAttribute("aria-expanded", false);
          document.body.style.overflow = "";
        });
      });
    }

    // Скрытие хедера при скролле
    let lastScroll = 0;
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("header--hidden");
      } else {
        header.classList.remove("header--hidden");
      }

      lastScroll = currentScroll;
    });
  });

// Загружаем футер — отдельно от хедера
fetch("/footer.html")
  .then((res) => res.text())
  .then((html) => {
    const placeholder = document.getElementById("footer-placeholder");
    placeholder.insertAdjacentHTML("afterend", html);
    placeholder.remove();
  });

// Табы и плеер
const tabs = document.querySelectorAll(".tabs__tab");
const panels = document.querySelectorAll(".tabs__panel");

if (document.getElementById("player")) {
  const player = new Plyr("#player", {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
    ],
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("tabs__tab--active"));
      panels.forEach((p) => p.classList.remove("tabs__panel--active"));

      tab.classList.add("tabs__tab--active");
      document
        .getElementById("tab-" + tab.dataset.tab)
        .classList.add("tabs__panel--active");

      if (tab.dataset.tab !== "video") {
        player.pause();
      }
    });
  });
}

document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      btn.classList.add('is-copied');
      setTimeout(() => {
        btn.classList.remove('is-copied');
      }, 1000);
    });
  });
});


const cursor = document.getElementById('customCursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('.case').forEach(card => {
  card.addEventListener('mouseenter', () => {
    cursor.classList.add('is-visible');
    document.body.style.cursor = 'none';
  });

  card.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
    document.body.style.cursor = '';
  });
});
