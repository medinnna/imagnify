const zoomOverlay = document.createElement('div')
zoomOverlay.className = 'zoom-overlay'
const zoomWrapper = document.createElement('div')
zoomWrapper.className = 'zoom-wrapper'
const zoomImage = document.createElement('img')
zoomImage.className = 'zoom-image'
let zoomImageClip
let currentScroll = window.pageYOffset

export default function imagnify(options) {
  const config = {
    selector: options?.selector || 'img[data-zoom]',
    background: options?.background || 'white',
    margin: Math.max(0, options?.margin ?? 50),
    opacity: Math.max(0, options?.opacity ?? 0.8),
  }
  const windowWidth = document.body.offsetWidth
  const windowHeight = window.innerHeight
  const images = document.querySelectorAll(config.selector)
  currentScroll = window.pageYOffset

  images.forEach((image) => {
    image.style.cursor = 'zoom-in'

    image.addEventListener('click', () => {
      const bodyHeight = document.body.scrollHeight
      const {
        src: imageSrc,
        width: imageWidth,
        height: imageHeight,
        naturalWidth: imageNaturalWidth,
        naturalHeight: imageNaturalHeight,
      } = image
      const { top, left: imageOffsetLeft } = image.getBoundingClientRect()
      const imageOffsetTop = top + currentScroll
      const imageFullSrc = image.dataset.zoom
      const imageAspectRatio = imageWidth / imageHeight
      const imageNaturalAspectRatio = imageNaturalWidth / imageNaturalHeight

      zoomOverlay.style.backgroundColor = config.background
      zoomWrapper.style.height = `${bodyHeight}px`

      zoomImage.src = imageFullSrc || imageSrc
      zoomImage.width =
        imageAspectRatio > imageNaturalAspectRatio
          ? imageWidth
          : imageWidth * (imageHeight / imageWidth) * imageNaturalAspectRatio
      zoomImage.height =
        imageAspectRatio < imageNaturalAspectRatio
          ? imageHeight
          : imageHeight *
            imageAspectRatio *
            (imageNaturalHeight / imageNaturalWidth)
      zoomImage.style.top = `${imageOffsetTop - (zoomImage.height - imageHeight) / 2}px`
      zoomImage.style.left = `${imageOffsetLeft - (zoomImage.width - imageWidth) / 2}px`
      zoomImageClip = `inset(${(zoomImage.height - imageHeight) / 2}px ${(zoomImage.width - imageWidth) / 2}px)`
      zoomImage.style.clipPath = zoomImageClip

      document.body.appendChild(zoomOverlay)
      document.body.appendChild(zoomWrapper)
      zoomWrapper.appendChild(zoomImage)

      zoomImage.onload = () => {
        const { top, left: imageOffsetLeft } = zoomImage.getBoundingClientRect()
        const imageOffsetTop = top + currentScroll
        const maxZoomWidth = windowWidth - config.margin * 2
        const maxZoomHeight = windowHeight - config.margin * 2

        const zoomRatio = Math.min(
          maxZoomHeight / zoomImage.height,
          maxZoomWidth / zoomImage.width
        )

        const zoomTopOffset =
          currentScroll +
          ((windowHeight - zoomImage.height * zoomRatio) / 2 - imageOffsetTop)
        const zoomLeftOffset =
          (windowWidth - zoomImage.width * zoomRatio) / 2 - imageOffsetLeft

        document.body.classList.add('zoom-active')
        image.classList.add('is-hidden')

        zoomOverlay.style.opacity = config.opacity

        zoomImage.style.opacity = 1
        zoomImage.style.transform = `translate(${zoomLeftOffset}px, ${zoomTopOffset}px) scale(${zoomRatio})`
        zoomImage.style.clipPath = `inset(0)`
      }
    })
  })

  zoomWrapper.addEventListener('click', closeZoom)

  window.addEventListener('scroll', () => {
    currentScroll = window.pageYOffset
    closeZoom()
  })
  window.addEventListener('resize', closeZoom)
}

function closeZoom() {
  const isZoomed = document.body.classList.contains('zoom-active')

  if (isZoomed) {
    document.body.classList.remove('zoom-active')
    zoomOverlay.style.opacity = 0
    zoomImage.style.transform = 'none'
    zoomImage.style.clipPath = zoomImageClip

    setTimeout(() => {
      zoomImage.remove()

      const zoomedImage = document.querySelector('[data-zoom].is-hidden')

      if (zoomedImage) {
        zoomedImage.classList.remove('is-hidden')
      }
    }, 400)
  }
}
