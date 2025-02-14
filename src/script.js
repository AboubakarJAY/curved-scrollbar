"use strict";
let page = document.querySelector("body");
let containerEl = document.querySelector(".container-el");
let scrollBar = document.querySelector(".scroll-bar");
let scrollPiste = document.querySelector(".scroll-piste");
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
let positionLeft = containerEl.getBoundingClientRect().left;
scrollPiste.style.left = `${positionLeft + 365}px`;
function scrollLoop() {
    let position = containerEl.scrollTop;
    scrollBar.style.top = `${position / 6}px`;
    requestAnimationFrame(scrollLoop);
    console.log(containerEl.scrollTop);
}
containerEl.addEventListener("scroll", scrollLoop);
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const x = 200;
const y = 50;
const width = 200;
const height = 200;
const radius = 30;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x + width - radius, y);
ctx.arcTo(x + width, y, x + width, y + height, radius);
ctx.lineTo(x + width, y + height - radius);
ctx.strokeStyle = "orange";
ctx.lineCap = "round";
ctx.lineWidth = 8;
ctx.stroke();
