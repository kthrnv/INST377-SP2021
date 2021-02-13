function clickToMove() {
  const images = document.querySelectorAll("li");

  let i = 1;
  images.forEach((element) => {
    element.style.position = "relative";
    element.insertAdjacentHTML(
      "beforeend",
      `<span style="position:absolute;left:0;top:0">${i}</span>`
    );
    i++;
  });

  let width = 130;
  let imageCount = 3;

  let list = carousel.querySelector("ul");
  let listElems = carousel.querySelectorAll("li");

  let position = 0;

  carousel.querySelector(".prev").onclick = function () {
    // shift left
    position += width * imageCount;
    // can't move to the left too much, end of images
    position = Math.min(position, 0);
    list.style.marginLeft = position + "px";
  };

  carousel.querySelector(".next").onclick = function () {
    // shift right
    position -= width * imageCount;
    // can only shift the ribbbon for (total ribbon length - visible count) images
    position = Math.max(position, -width * (listElems.length - imageCount));
    list.style.marginLeft = position + "px";
  };
}

window.onload = clickToMove;
