const zoomOverlay = document.createElement("div");
zoomOverlay.className = "zoom-overlay";
const zoomImage = document.createElement("img");
zoomImage.className = "zoom-image";
let currentScroll = window.pageYOffset;

export function mdnZoom(options) {
  const config = {
    selector: options?.selector || "img[data-zoom]",
    background: options?.background || "white",
    margin: options?.margin || 50,
    opacity: options?.opacity || 0.5,
  };

  document.addEventListener("DOMContentLoaded", () => {
    const windowWidth = document.body.offsetWidth;
    const windowHeight = window.innerHeight;

    const images = document.querySelectorAll(config.selector);

    images.forEach((image) => {
      image.addEventListener("click", () => {
        const { src: imageSrc, width: imageWidth, height: imageHeight } = image;
        const { top, left: offsetLeft } = image.getBoundingClientRect();
        const offsetTop = top + currentScroll;

        zoomOverlay.style.backgroundColor = config.background;

        zoomImage.src = imageSrc;
        zoomImage.width = imageWidth;
        zoomImage.height = imageHeight;
        zoomImage.style.top = `${offsetTop}px`;
        zoomImage.style.left = `${offsetLeft}px`;

        document.body.appendChild(zoomOverlay);
        document.body.appendChild(zoomImage);

        zoomImage.onload = () => {
          const { top, left: offsetLeft } = image.getBoundingClientRect();
          const offsetTop = top + currentScroll;
          const maxZoomWidth = windowWidth - config.margin * 2;
          const maxZoomHeight = windowHeight - config.margin * 2;

          zoomImage.style.top = `${offsetTop}px`;
          zoomImage.style.left = `${offsetLeft}px`;

          const zoomRatio = Math.min(
            maxZoomHeight / imageHeight,
            maxZoomWidth / imageWidth
          );

          const zoomTopOffset =
            currentScroll +
            ((windowHeight - imageHeight * zoomRatio) / 2 - offsetTop);
          const zoomLeftOffset =
            (windowWidth - imageWidth * zoomRatio) / 2 - offsetLeft;

          document.body.classList.add("zoom-active");
          image.classList.add("is-hidden");

          zoomImage.style.opacity = 1;
          zoomImage.style.transform = `translate(${zoomLeftOffset}px, ${zoomTopOffset}px) scale(${zoomRatio})`;
        };
      });
    });

    zoomImage.addEventListener("click", closeZoom);
  });

  window.addEventListener("scroll", () => {
    currentScroll = window.pageYOffset;
    closeZoom();
  });
  window.addEventListener("resize", closeZoom);
}

function closeZoom() {
  const isZoomed = document.body.classList.contains("zoom-active");

  if (isZoomed) {
    document.body.classList.remove("zoom-active");
    zoomImage.style.transform = "none";

    setTimeout(() => {
      zoomImage.remove();

      const zoomedImage = document.querySelector("[data-zoom].is-hidden");

      if (zoomedImage) {
        zoomedImage.classList.remove("is-hidden");
      }
    }, 400);
  }
}
