(() => {
  "use strict";

  const themePreferenceKey = "omega-forge.handbook.theme";
  const promptTemplates = new WeakMap();
  let currentTheme = readTheme()
    || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function readTheme() {
    try {
      const value = window.localStorage.getItem(themePreferenceKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(themePreferenceKey, theme);
    } catch {
      // The current choice still works when storage is unavailable.
    }
  }

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const willEnableLight = theme === "dark";
      button.setAttribute("aria-label", willEnableLight ? button.dataset.lightLabel : button.dataset.darkLabel);
      button.setAttribute("aria-pressed", String(theme === "dark"));
      const icon = button.querySelector("[data-theme-icon]");
      if (icon) icon.className = `ph-fill ph-${willEnableLight ? "sun" : "moon"}`;
    });

    saveTheme(theme);
  }

  function setupTabs(tablist) {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    function selectTab(tab, focus = false) {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(item.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectTab(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === undefined) return;
        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      });
    });
  }

  function setupPromptCard(card) {
    const preview = card.querySelector("[data-prompt-preview]");
    const inputs = Array.from(card.querySelectorAll("[data-prompt-input]"));
    const copyButton = card.querySelector("[data-copy]");
    const copyIcon = card.querySelector("[data-copy-icon]");
    const copyLabel = card.querySelector("[data-copy-text]");
    const status = card.querySelector("[data-copy-status]");
    if (!preview || !copyButton || !copyIcon || !copyLabel || !status) return;

    promptTemplates.set(card, preview.textContent.trim());
    let resetTimer;

    function updatePrompt() {
      let text = promptTemplates.get(card);
      const missing = [];

      inputs.forEach((input) => {
        const value = input.value.trim();
        if (value) text = text.replaceAll(input.dataset.placeholder, value);
        else missing.push(input.dataset.label);
      });

      preview.textContent = text;
      copyButton.disabled = missing.length > 0;
      copyButton.classList.remove("is-copied");
      copyIcon.className = "ph-bold ph-copy";
      copyLabel.textContent = copyButton.dataset.copyLabel;
      status.classList.remove("is-error");
      status.textContent = missing.length
        ? `${status.dataset.missingPrefix}${missing.join(status.dataset.missingJoin)}${status.dataset.missingSuffix}`
        : "";
    }

    inputs.forEach((input) => input.addEventListener("input", updatePrompt));
    updatePrompt();

    copyButton.addEventListener("click", async () => {
      const copied = await copyText(preview.textContent);
      window.clearTimeout(resetTimer);

      if (copied) {
        copyButton.classList.add("is-copied");
        copyIcon.className = "ph-bold ph-check";
        copyLabel.textContent = copyButton.dataset.copiedLabel;
        status.textContent = "";
      } else {
        status.classList.add("is-error");
        status.textContent = status.dataset.failed;
      }

      resetTimer = window.setTimeout(updatePrompt, 3500);
    });
  }

  function setupAccordion(details) {
    const summary = details.querySelector(":scope > summary");
    if (!summary) return;

    let animation = null;
    let isClosing = false;
    let isExpanding = false;

    function finish(open) {
      details.open = open;
      animation = null;
      isClosing = false;
      isExpanding = false;
      details.style.height = "";
      details.style.overflow = "";
    }

    function collapsedHeight() {
      const styles = window.getComputedStyle(details);
      return summary.offsetHeight
        + Number.parseFloat(styles.borderTopWidth)
        + Number.parseFloat(styles.borderBottomWidth);
    }

    function close() {
      isClosing = true;
      isExpanding = false;
      const startHeight = `${details.offsetHeight}px`;
      const endHeight = `${collapsedHeight()}px`;

      animation?.cancel();
      animation = details.animate(
        { height: [startHeight, endHeight] },
        { duration: 220, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
      );
      animation.onfinish = () => finish(false);
      animation.oncancel = () => { isClosing = false; };
    }

    function expand() {
      isExpanding = true;
      isClosing = false;
      const startHeight = `${details.offsetHeight}px`;
      details.open = true;
      const endHeight = `${details.offsetHeight}px`;

      animation?.cancel();
      animation = details.animate(
        { height: [startHeight, endHeight] },
        { duration: 240, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      );
      animation.onfinish = () => finish(true);
      animation.oncancel = () => { isExpanding = false; };
    }

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animation?.cancel();
        finish(!details.open);
        return;
      }

      details.style.overflow = "hidden";
      if (isClosing || !details.open) expand();
      else if (isExpanding || details.open) close();
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Use the browser's older copy method below.
      }
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    field.remove();
    return copied;
  }

  function updateActiveNavigation() {
    const activationLine = Math.min(160, window.innerHeight * 0.22);
    let active = "start";

    document.querySelectorAll("[data-nav-section]").forEach((section) => {
      if (section.getBoundingClientRect().top <= activationLine) active = section.dataset.navSection;
    });

    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      if (link.dataset.navLink === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  let navigationFrame;
  function scheduleNavigationUpdate() {
    if (navigationFrame) return;
    navigationFrame = window.requestAnimationFrame(() => {
      navigationFrame = null;
      updateActiveNavigation();
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));
  });

  document.querySelectorAll("[data-tablist]").forEach(setupTabs);
  document.querySelectorAll("[data-prompt-card]").forEach(setupPromptCard);
  document.querySelectorAll(".faq-list details").forEach(setupAccordion);
  window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
  window.addEventListener("resize", scheduleNavigationUpdate);

  applyTheme(currentTheme);
  updateActiveNavigation();
})();
