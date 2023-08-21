document.addEventListener("DOMContentLoaded", () => {
  const components = document.querySelectorAll(".project-id");
  const dots = document.querySelectorAll(".dot");
  const componentCount = components.length;
  let currentComponent = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  function scrollToComponent(index) {
    window.scrollTo({
      top: components[index].offsetTop,
      left: 0,
      behavior: "smooth"
    });
  }

  function updateActiveDot() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentComponent);
    });
  }

  function handleScroll(event) {
    const direction = event.deltaY > 0 ? 1 : -1;
    currentComponent += direction;
    if (currentComponent < 0) {
      currentComponent = 0;
    } else if (currentComponent >= componentCount) {
      currentComponent = componentCount - 1;
    }
    scrollToComponent(currentComponent);
    updateActiveDot();
  }

  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    touchEndY = event.touches[0].clientY;
  }

  function handleTouchEnd() {
    const touchDistance = touchEndY - touchStartY;
    const direction = touchDistance > 0 ? 1 : -1;
    currentComponent += direction;
    if (currentComponent < 0) {
      currentComponent = 0;
    } else if (currentComponent >= componentCount) {
      currentComponent = componentCount - 1;
    }
    scrollToComponent(currentComponent);
    updateActiveDot();
  }

  // Listen for mouse wheel scrolling event
  window.addEventListener("wheel", handleScroll);

  // Listen for touch events
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("touchend", handleTouchEnd);

  // Listen for dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentComponent = index;
      scrollToComponent(currentComponent);
      updateActiveDot();
    });
  });
});
