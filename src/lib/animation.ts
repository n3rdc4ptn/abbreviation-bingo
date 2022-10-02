export const animateCSS = (
  element: HTMLElement,
  animation: string,
  duration = "0.5s",
  prefix = "animate__"
) =>
  // We create a Promise and return it
  new Promise((resolve, _) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);
    element.style.setProperty("--animate-duration", duration);

    const handleAnimationEnd: EventListenerOrEventListenerObject = (event) => {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    };

    // When the animation ends, we clean the classes and resolve the Promise

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
