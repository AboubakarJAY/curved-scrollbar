let page = document.querySelector("body") as HTMLElement;
let containerEl = document.querySelector(".container-el") as HTMLElement;
let scrollBar = document.querySelector(".scroll-bar") as HTMLElement;
let scrollPiste = document.querySelector(".scroll-piste") as HTMLElement;
let svgBar = document.getElementById("svg-bar")!;

for (let i = 0; i < Math.floor(window.innerHeight / 64); i++) {
  let gridContainer = document.createElement("div");
  gridContainer.className =
    "grid-container grid gap-[1px] grid-flow-col w-full";
  page.appendChild(gridContainer);
  for (let i = 0; i < 32; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "flex justify-center w-16 h-16 bg-white dark:bg-black"; // Ajoute les classes
    gridContainer.appendChild(gridItem);
  }
}

let positionLeft: number = containerEl.getBoundingClientRect().right;

scrollPiste.style.left = `${positionLeft}px`;

function scrollLoop() {
  let maxScroll = containerEl.scrollHeight - containerEl.clientHeight;
  let position = containerEl.scrollTop;
  let scrollRatio = position / maxScroll; // Valeur entre 0 et 1
  let yPos = position / 6;

  // Appliquer la courbure **seulement** proche du haut ou du bas
  let curveIntensity = 0;
  if (scrollRatio < 0.1) {
    // Proche du haut → courbure vers la gauche
    curveIntensity = -20 * (1 - scrollRatio * 10);
  } else if (scrollRatio > 0.9) {
    // Proche du bas → courbure vers la droite
    curveIntensity = 20 * ((scrollRatio - 0.9) * 10);
  }

  // 🔥 Mise à jour du `d` avec la courbure dynamique seulement en début et fin
  let newD = `M10 5 Q${10 + curveIntensity} 40, 10 75`;
  svgBar.setAttribute("d", newD);

  // 🔄 Mise à jour de la position de la barre de scroll
  scrollBar.style.top = `${yPos}px`;
  svgBar.setAttribute("transform", `translate(0, ${yPos})`);

  requestAnimationFrame(scrollLoop);
}

containerEl.addEventListener("scroll", scrollLoop);
