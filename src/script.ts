let page = document.querySelector("body") as HTMLElement;
let containerEl = document.querySelector(".container-el") as HTMLElement;
let scrollBar = document.querySelector(".scroll-bar") as HTMLElement;

for (let i = 0; i < Math.floor(window.innerHeight / 64); i++) {
  let gridContainer = document.createElement("div");
  gridContainer.className =
    "grid-container grid gap-[1px] grid-flow-col w-full";
  page.appendChild(gridContainer);
  for (let i = 0; i < 32; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "flex justify-center w-16 h-16 bg-white"; // Ajoute les classes
    gridContainer.appendChild(gridItem);
  }
}

function setTransform(xPos: number, yPos: number, el: HTMLElement): void {
  el.style.transform = `translate3d(0, ${yPos}px, 0)`;
}

let yScrollPosition: number;

function scrollLoop() {
  yScrollPosition = containerEl.scrollTop;
  setTransform(0, yScrollPosition, scrollBar);

  requestAnimationFrame(scrollLoop);
}
containerEl.addEventListener("scroll", scrollLoop);
