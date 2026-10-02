<div align="center">

  # 🌌 THE VOID
  
  **An interactive, physics-inspired audiovisual exploration of deep-space anomalies, quantum vacuum fluctuations, and cosmic null space.**

  [![Live Demo](https://img.shields.io/badge/Demo-the--void--v1.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://the-void-v1.vercel.app/)
  [![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.25-black?style=for-the-badge&logo=framer&logoColor=0055FF)](https://www.framer.com/motion/)

  <br />

  <p align="center">
    <a href="https://the-void-v1.vercel.app/"><strong>Explore Live Demo »</strong></a>
    <br />
    <br />
    <a href="#-overview">Overview</a> •
    <a href="#-visual-systems--physics-simulations">Visual Systems</a> •
    <a href="#-performance-engineering">Performance</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>

  <br />

  [![The Void Preview](https://raw.githubusercontent.com/hsemihaktas/My-assets/main/the-void/preview.webp)](https://the-void-v1.vercel.app/)

</div>

---

## 🛰️ Overview

> *"Beyond the event horizon, logic dissolves. Welcome to the null space where data becomes silence and silence becomes infinite."*

**The Void** is an experimental, highly immersive web experience inspired by astrophysics, deep-space cosmological structures, and quantum mechanics. Built with **Next.js 16**, **React 19**, **Framer Motion**, and hardware-accelerated **HTML5 Canvas** simulations, it translates theoretical cosmic phenomena into fluid, interactive mathematical graphics.

Visitors journey through celestial anomalies—from the gravitational event horizon to Boötes supervoid deprivation, quantum zero-point fluctuations, and relativistic time dilation warp tunnels.

---

## 🪐 Visual Systems & Physics Simulations

The application houses specialized mathematical and algorithmic rendering modules designed from scratch:

### 1. 🌐 Event Horizon & 3D Celestial Core (`HeroVisual.tsx`)
- **Spherical Fibonacci Distribution**: Generates up to 800 celestial particles distributed uniformly across a spherical manifold using the golden ratio spiral (`θ = 2.3999632 × i`).
- **Interactive 3D Orbital Projection**: Dynamic mouse parallax with 3-axis trigonometric rotations (`cos/sin` transformation matrices), breathing pulsation loops, and procedural turbulence noise.
- **Scroll-Driven Metamorphosis**: Continuously calculates scroll progress to smoothly interpolate particles from a coherent gravitational sphere into an expanding, scattered cosmic field.
- **Proximity-Based Constellation Mesh**: Dynamic spatial line renderer connecting adjacent nodes with distance-squared falloff alphas.

### 2. 〰️ Harmonic Signal Interference (`RippleSection.tsx` & `OrbitVisual.tsx`)
- **40-Layer Sinusoidal Waves**: Visualizes radio signal propagation and cosmic background frequencies across forty synchronized harmonic waveforms.
- **Modulated Phase Geometry**: Generates dynamic amplitude displacement with real-time frequency HUD telemetry (`0.00Hz`, `Origin: NULL`, `Duration: ∞`).

### 3. 🌀 Relativistic Time Dilation & Warp Tunnel (`DepthSection.tsx` & `WarpVisual.tsx`)
- **3D Perspective Starfield / Warp Drive**: Projects 100 high-velocity light-vectors through dynamic z-depth acceleration (`z -= speed`).
- **Screen-Blend Dissipation**: Features camera trail accumulation (`rgba(0, 0, 0, 0.3)`) and scroll-linked scale transformations simulating relativistic velocity effects.

### 4. 🔬 Void Knowledge Dossiers (`VoidKnowledgeSection.tsx` & `CosmicVisual.tsx`)
Three interactive scientific exhibits powered by dedicated canvas state engines:
- **The Great Nothing (Boötes Void)**: Simulates the 330-million-light-year supervoid with centrifugal particle deprivation.
- **Vacuum Energy & Quantum Fluctuations**: Renders virtual particle pair creation/annihilation based on quantum zero-point field theory.
- **The CMB Cold Spot**: Thermal microwave depletion visualizer tracking negative energy deviations (`-0.00015 K`).

### 5. 🌌 Cinematic Ambient Environment (`AmbientBackground.tsx` & `ParticleSystem.tsx`)
- **Analog Fractal Grain**: Procedural SVG fractal noise shader (`<feTurbulence>`) giving the void a tactile, analog cinematic texture.
- **Volumetric Glows**: Multi-layered, slow-cycling chromatic radial gradients with 25-second sinusoidal loops.
- **Floating Cosmic Dust**: Micro-matter particle field with screen boundary wrap-around and random brownian drift.

---

## ⚡ Performance Engineering

Rendering thousands of dynamic points, lines, and waves simultaneously in the browser requires strict performance discipline:

| Optimization | Technique | Impact |
| :--- | :--- | :--- |
| **Zero-GC Typed Buffers** | `Float32Array` contiguous memory buffers with fixed strides (`STRIDE = 9` / `6`) | Eliminates garbage collection spikes and micro-stutters during 60 FPS animation loops. |
| **Frustum / Viewport Culling** | Framer Motion `useInView` with margin offsets | Halts `requestAnimationFrame` render loops when canvas elements leave the screen, preserving CPU/GPU cycles. |
| **DPI Clamping** | `Math.min(window.devicePixelRatio, 2)` | Ensures crisp Retina display rendering while preventing fill-rate bottlenecks on 3x/4x mobile and 4K displays. |
| **Progressive Code Splitting** | Next.js `dynamic()` imports with custom height placeholders | Defers below-the-fold sections for near-instant First Contentful Paint (FCP). |
| **Pure CSS Grain** | SVG-filtered base64 repeating texture pattern | Hardware-composited grain overlay without running image decoders or heavy video assets. |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19.2.3](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion 12.25.0](https://www.framer.com/motion/)
- **Graphics Engine**: Native HTML5 Canvas 2D (Matrix projections, Trigonometric wavefields, Particle systems)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (`Inter`, `JetBrains Mono`)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```text
TheVoid/
├── app/
│   ├── globals.css           # Tailwind v4 import, scrollbars & root variables
│   ├── layout.tsx            # Root layout with Inter & JetBrains Mono fonts
│   └── page.tsx              # Main entry point with dynamic component imports
├── components/
│   ├── sections/
│   │   ├── DepthSection.tsx         # Time dilation warp tunnel section
│   │   ├── Footer.tsx               # Minimalist telemetry footer
│   │   ├── HeroSection.tsx          # Hero typography & scroll parallax
│   │   ├── RippleSection.tsx        # Signal interference & harmonic wave HUD
│   │   ├── VoidItem.tsx             # Interactive dossier card wrapper
│   │   └── VoidKnowledgeSection.tsx # Boötes, Quantum & Cold Spot modules
│   └── visuals/
│       ├── AmbientBackground.tsx    # SVG fractal film grain & ambient glows
│       ├── CosmicVisual.tsx         # Multi-mode scientific canvas engine
│       ├── HeroVisual.tsx           # 3D Fibonacci sphere & particle scatter
│       ├── OrbitVisual.tsx          # Multi-layer sinusoidal wavefield
│       ├── ParticleSystem.tsx       # Ambient floating space-dust canvas
│       └── WarpVisual.tsx           # Relativistic perspective star-tunnel
├── types.ts                  # Shared interfaces & SystemStatus enums
├── package.json              # Dependencies & scripts
└── next.config.ts            # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.18.0 or later recommended)
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hsemihaktas/TheVoid.git
   cd TheVoid
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server with Turbopack. |
| `npm run build` | Compiles an optimized production build. |
| `npm run start` | Serves the production build locally. |
| `npm run lint` | Runs ESLint to verify code quality. |

---

## 🌐 Live Deployment

The latest build of **The Void** is continuously deployed on Vercel:

🔗 **[https://the-void-v1.vercel.app/](https://the-void-v1.vercel.app/)**

---

## 👤 Author

**Semih Aktaş**
- GitHub: [@hsemihaktas](https://github.com/hsemihaktas)
- Project Repository: [hsemihaktas/TheVoid](https://github.com/hsemihaktas/TheVoid)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
