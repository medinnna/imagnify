![Hero](./hero.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@m.dev/imagnify" target="_blank">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/%40m.dev%2Fimagnify?color=%239a9a9a&style=for-the-badge">
  </a>
  <img alt="NPM License" src="https://img.shields.io/npm/l/%40m.dev%2Fimagnify?style=for-the-badge&color=%239a9a9a">
  <img alt="npm package minimized gzipped size" src="https://img.shields.io/bundlejs/size/%40m.dev%2Fimagnify?color=%239a9a9a&style=for-the-badge">
</p>

Imagnify is a simple and lightweight library to add zoom functionality to images.

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [License](#license)

## Features

- Lightweight and simple to use
- Set higher resolution image for zoom
- Zoom to original size maintaining aspect ratio
- Customizable styles
- Responsive

## Installation

##### NPM

```bash
npm install @m.dev/imagnify
```

##### CDN

```html
<!-- Bundle -->
<script src="https://unpkg.com/@m.dev/imagnify"></script>

<!-- Or core and style separately -->
<script src="https://unpkg.com/@m.dev/imagnify/core"></script>
<script src="https://unpkg.com/@m.dev/imagnify/style"></script>
```

## Usage

```js
import imagnify from '@m.dev/imagnify'

imagnify()
```

The default package is a bundle that includes the core and the style. If you need, you can import them separately.

```js
import imagnify from '@m.dev/imagnify/core'
import '@m.dev/imagnify/style'
```

Then, add `data-zoom` attribute to the images, unless another selector has been specified (see [options](#options)).

```html
<img src="image.jpg" data-zoom />
```

If you want to specify a higher resolution image for the zoom, you can set it as the value of the data-zoom attribute.

```html
<img src="image.jpg" data-zoom="image-hd.jpg" />
```

### Options

| Option     | Type   | Default     | Description                                                       |
| ---------- | ------ | ----------- | ----------------------------------------------------------------- |
| selector   | string | [data-zoom] | The selector for the images NodeList.                             |
| background | string | 'white'     | The background color for the overlay. Can be any valid CSS color. |
| margin     | number | 10          | The margin in pixels around the image.                            |
| opacity    | number | 0.8         | The opacity of the zoomed image. From 0 to 1.                     |

**Example:**

```js
imagnify({
  selector: '.zoom-image',
  background: '#000',
  margin: 25,
  opacity: 0.5,
})
```

## License

This project is licensed under the [GPL-3.0-or-later](https://github.com/medinnna/imagnify/blob/main/LICENSE) license.
