export const animateCSS = (
  element: HTMLElement,
  animation: string,
  prefix = "animate__"
) =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    if (node) {
      node.classList.add(`${prefix}animated`, animationName);

      const handleAnimationEnd: EventListenerOrEventListenerObject = (
        event
      ) => {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
      };

      // When the animation ends, we clean the classes and resolve the Promise

      node.addEventListener("animationend", handleAnimationEnd, { once: true });
    }
  });
