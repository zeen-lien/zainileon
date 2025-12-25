# Landing Page - Zaini Leon

Landing page personal dengan dark futuristic theme yang menampilkan portfolio dan informasi kontak.

## 🚀 Features

- ✨ Dark futuristic theme dengan animasi smooth
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Framer Motion animations
- ⚡ Optimized performance
- 🎯 Clean code dengan Indonesian naming conventions
- 📦 Ready untuk GitHub Pages deployment

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Testing:** Vitest + React Testing Library
- **Deployment:** GitHub Pages

## 📂 Project Structure

```
landing-page/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── sections/        # Page sections
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions & data
│   ├── styles/              # Global styles
│   ├── App.jsx
│   └── main.jsx
├── public/
└── dist/                    # Build output
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Development

Development server akan berjalan di `http://localhost:5173/landing-page/`

## 📦 Build & Deployment

### Build

```bash
npm run build
```

Output akan ada di folder `dist/`

### Deploy ke GitHub Pages

1. Push code ke GitHub repository
2. Enable GitHub Pages di repository settings
3. Set source ke "GitHub Actions"
4. GitHub Actions akan otomatis build dan deploy saat push ke main branch

Atau manual deploy:

```bash
npm run build
# Upload folder dist/ ke GitHub Pages
```

## 🎨 Customization

### Warna Theme

Edit `src/styles/global.css`:

```css
@theme {
  --color-latar-utama: #000000;
  --color-aksen-primer: #00d9ff;
  /* ... */
}
```

### Data Projects

Edit `src/utils/dataProyek.js`:

```javascript
export const DAFTAR_PROYEK = [
  {
    id: 'project-id',
    namaProyek: 'Project Name',
    deskripsi: 'Description',
    linkDemo: 'https://...',
    teknologi: ['React', 'Tailwind'],
  }
];
```

### Social Media

Edit `src/utils/dataSosialMedia.js`:

```javascript
export const DAFTAR_SOSIAL_MEDIA = [
  {
    platform: 'Instagram',
    username: '@username',
    link: 'https://...',
  }
];
```

## 📝 Code Conventions

- Semua variable dan function menggunakan Bahasa Indonesia
- Setiap function memiliki JSDoc comments
- Components menggunakan PascalCase
- Utilities menggunakan camelCase

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Zaini Leon**
- Instagram: [@zien_lien](https://www.instagram.com/zien_lien)
- GitHub: [@zeen-lien](https://github.com/zeen-lien)
- Telegram: [@zeenlien](https://t.me/zeenlien)

---

Built with ❤️ using React & Tailwind CSS
