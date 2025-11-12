# 🎨 avecolor

A lightweight JavaScript + TypeScript utility to extract the **average (dominant)** color from any image — perfect for generating matching backgrounds, borders, or shadows automatically in your apps.

---

## 🚀 Features

- ⚡ Fast and simple — pure JavaScript, no dependencies
- 🎨 Supports **HEX** or **RGBA** formats
- 🧩 Optional settings: `opacity`, `skipWhite`, and `format`
- 🧠 Works with **React**, **Vanilla JS**, and **TypeScript**
- 🔒 Handles CORS and transparent pixels

---

![screenshot](/screenshot.jpg)

## 📦 Installation

Install via npm:

```bash
npm install avecolor
```

or via yarn:

```bash
yarn add avecolor
```

---

## 📘 Usage (JavaScript)

```js
import { getAverageColor } from "avecolor";

async function applyBackground() {
  const color = await getAverageColor("/images/example.jpg");

  document.body.style.backgroundColor = color;
}

applyBackground();
```

---

## ⚛️ Usage (React + TypeScript Example)

```tsx
// image card component
import { useEffect, useState } from "react";
import { getAverageColor } from "avecolor";

interface ImageCardProps {
  src: string;
  alt: string;
}
export default function ImageCard({ src, alt = "" }: ImageCardProps) {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    let isMounted = true;

    getAverageColor(src, { skipWhite: true, format: "hex" })
      .then((c) => isMounted && setColor(c))
      .catch((err) =>
        console.error(`Failed to get average color for ${src}:`, err)
      );
    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div
      style={{
        boxShadow: `0 8px 80px -4px ${color}`,
        transition: "box-shadow 0.3s ease",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <img
        style={{ width: "100%", height: "auto", display: "block" }}
        src={src}
        alt={alt}
      />
    </div>
  );
}
```

```tsx
// parent component
import ImageCard from "./components/ImageCard";
import photo1 from "./assets/image1.jpg";

<div className="max-w-100">
  <ImageCard src={photo1} alt="cover" />
</div>;
```

---

## 🧠 Options

| Option      | Type               | Default | Description                |
| ----------- | ------------------ | ------- | -------------------------- |
| `format`    | `"hex"` or `"rgb"` | `"hex"` | Output color format        |
| `opacity`   | `number`           | `1`     | Opacity from 0 → 1         |
| `skipWhite` | `boolean`          | `false` | Ignore nearly white pixels |

---

## 🧩 Example Outputs

```js
await getAverageColor("image.jpg");
// "#9e6df2"

await getAverageColor("image.jpg", { format: "rgb", opacity: 0.6 });
// "rgba(158, 109, 242, 0.6)"
```

---

## 🧱 Use Cases

- Auto-generate **backgrounds** that match images
- Create **themed cards** or **image shadows**
- Dynamic **UI color adaptation** (like Spotify or YouTube thumbnails)

---

## 🧰 TypeScript Support

Type definitions are included out of the box — no setup required.

```ts
import { getAverageColor } from "avecolor";
```

---

## 🏷️ Keywords

`color` · `average color` · `dominant color` · `image color` · `background generator` · `color extractor` · `react color util` · `style helper`

---

## 🧑‍💻 Author

**Milad Gharibi**  
[GitHub Profile](https://github.com/micodex)

---

## 📄 License

MIT License © 2025 Milad Gharibi - micodex
