
export function scrollToSection(id) {
  const scroll = () => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(scroll);
  });
}

