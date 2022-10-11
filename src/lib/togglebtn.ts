export function initToggleBtns() {
  let togglebtns = document.getElementsByClassName("toggle-btn");

  for (let i = 0; i < togglebtns.length; i++) {
    let togglebtn = togglebtns[i] as HTMLElement;

    togglebtn.addEventListener("click", () => {
      togglebtn.classList.toggle("show");
    });
  }
}

export function hideAllBtns() {
  let togglebtns = document.getElementsByClassName("toggle-btn");

  for (let i = 0; i < togglebtns.length; i++) {
    let togglebtn = togglebtns[i] as HTMLElement;

    togglebtn.classList.remove("show");
  }
}
