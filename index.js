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

    const zoomOverlay = document.createElement("div");
    zoomOverlay.className = "zoom-overlay";
    const zoomImage = document.createElement("img");
    zoomImage.className = "zoom-image";

    const images = document.querySelectorAll(config.selector);

    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        const {
          src: imageSrc,
          width: imageWidth,
          height: imageHeight,
        } = e.currentTarget;
        const currentScroll = window.pageYOffset;
        const { top, left: offsetLeft } =
          e.currentTarget.getBoundingClientRect();
        const offsetTop = top + currentScroll;

        image.classList.add("is-hidden");

        zoomOverlay.style.backgroundColor = config.background;
        // zoomOverlay.style.opacity = config.opacity;

        zoomImage.src = imageSrc;
        zoomImage.width = imageWidth;
        zoomImage.height = imageHeight;
        zoomImage.style.top = `${offsetTop}px`;
        zoomImage.style.left = `${offsetLeft}px`;

        document.body.appendChild(zoomOverlay);
        document.body.appendChild(zoomImage);

        setTimeout(() => {
          const maxZoomWidth = windowWidth - config.margin * 2;
          const maxZoomHeight = windowHeight - config.margin * 2;

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

          zoomImage.style.transform = `translate(${zoomLeftOffset}px, ${zoomTopOffset}px) scale(${zoomRatio})`;
        }, 50);
      });
    });

    zoomImage.addEventListener("click", closeZoom);
  });
}

window.addEventListener("scroll", closeZoom);

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
