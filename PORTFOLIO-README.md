# 💼 Portfolio Documentation

## Cara Menambah Project Baru

### 1. Buka File Data Project
Edit file: `src/utils/dataProyek.js`

### 2. Tambah Project Baru di Array `DAFTAR_PROYEK`

```javascript
{
  id: 'project-id', // ID unik (lowercase, pakai dash)
  namaProyek: 'Nama Project',
  deskripsi: 'Deskripsi singkat (1-2 kalimat)',
  deskripsiPanjang: 'Deskripsi lengkap (opsional)',
  linkDemo: 'https://demo-url.com', // atau null jika ga ada
  linkGithub: 'https://github.com/username/repo',
  teknologi: ['Tech1', 'Tech2', 'Tech3'],
  kategori: 'web-app', // atau 'utility', 'library', dll
  status: 'live' // 'live', 'development', atau 'source-only'
}
```

### 3. Status Project

#### 🟢 **Live** (`status: 'live'`)
- Project sudah deploy dan bisa diakses
- Ada `linkDemo` yang valid
- Button: "Live Demo" + "GitHub"

#### 🟡 **In Development** (`status: 'development'`)
- Project masih dalam pengembangan
- Bisa ada `linkDemo` (staging) atau null
- Button: Conditional

#### 📦 **Source Code** (`status: 'source-only'`)
- Project belum/tidak deploy
- `linkDemo: null`
- Hanya ada source code di GitHub
- Button: "View Source" (GitHub only)

### 4. Kategori Project

Kategori yang udah ada:
- `web-app` - Web applications
- `utility` - Tools & utilities
- `library` - Libraries & frameworks
- `trading-tool` - Trading related tools
- `experimental` - Experimental projects
- `hardware` - Arduino, IoT, hardware projects

### 5. Teknologi

List teknologi yang lo pake. Contoh:
- Frontend: `React`, `Vue`, `JavaScript`, `HTML`, `CSS`
- Backend: `PHP`, `Node.js`, `Python`
- Tools: `API Integration`, `Maps API`, `Local Storage`
- Hardware: `Arduino`, `C++`, `IoT`
- Other: `Responsive Design`, `UI/UX`, `Data Analysis`

**Tips:** Maksimal 4 teknologi yang ditampilkan di card, sisanya jadi "+N"

### 6. Link Demo & GitHub

#### Kalau Project Deployed:
```javascript
linkDemo: 'https://username.github.io/project/',
linkGithub: 'https://github.com/username/project',
status: 'live'
```

#### Kalau Project Belum Deploy (PHP, Arduino, dll):
```javascript
linkDemo: null,
linkGithub: 'https://github.com/username/project',
status: 'source-only'
```

### 7. Save & Test

1. Save file `dataProyek.js`
2. Refresh browser
3. Buka `/portfolio`
4. Project baru langsung muncul

## Contoh Project Lengkap

### Live Project (Deployed)
```javascript
{
  id: 'my-awesome-app',
  namaProyek: 'My Awesome App',
  deskripsi: 'Aplikasi web keren dengan fitur X, Y, dan Z',
  deskripsiPanjang: 'Deskripsi lengkap tentang project ini...',
  linkDemo: 'https://username.github.io/my-awesome-app/',
  linkGithub: 'https://github.com/username/my-awesome-app',
  teknologi: ['React', 'Tailwind', 'Firebase', 'API'],
  kategori: 'web-app',
  status: 'live'
}
```

### Source Code Only (PHP/Backend)
```javascript
{
  id: 'php-cms',
  namaProyek: 'Custom CMS',
  deskripsi: 'Content Management System built with PHP and MySQL',
  deskripsiPanjang: 'Full-featured CMS dengan admin panel...',
  linkDemo: null, // Ga ada demo karena butuh PHP server
  linkGithub: 'https://github.com/username/php-cms',
  teknologi: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
  kategori: 'web-app',
  status: 'source-only'
}
```

### Hardware Project (Arduino)
```javascript
{
  id: 'smart-home',
  namaProyek: 'Smart Home System',
  deskripsi: 'IoT home automation dengan Arduino dan sensors',
  deskripsiPanjang: 'System untuk control lampu, suhu, dll...',
  linkDemo: null, // Hardware project ga bisa demo online
  linkGithub: 'https://github.com/username/smart-home',
  teknologi: ['Arduino', 'C++', 'IoT', 'Sensors'],
  kategori: 'hardware',
  status: 'source-only'
}
```

## Filter Teknologi

Filter otomatis generate dari semua teknologi yang ada di project. Ga perlu setup manual.

Contoh:
- Kalau ada project pake `React` → Filter "React" muncul
- Klik filter → Show only projects dengan teknologi itu

## Tips

### ID Best Practices
- Lowercase semua
- Pakai dash (-) bukan underscore
- Singkat tapi descriptive
- Contoh: `nonton-film`, `php-cms`, `smart-home`

### Deskripsi Best Practices
- Singkat: 1-2 kalimat (untuk card)
- Jelas: Jelasin apa yang project lo lakukan
- Menarik: Bikin orang pengen klik

### Teknologi Best Practices
- List 3-5 teknologi utama
- Prioritas: Yang paling penting duluan
- Konsisten: Pake nama yang sama (React bukan ReactJS)

## Troubleshooting

### Project ga muncul?
- Check ID unik (ga boleh duplikat)
- Check syntax JavaScript (comma, bracket)
- Lihat console browser untuk error

### Button ga bener?
- Kalau `linkDemo: null` → Cuma button "View Source"
- Kalau ada `linkDemo` → Button "Live Demo" + "GitHub"

### Status badge ga muncul?
- Check `status` value: `'live'`, `'development'`, atau `'source-only'`
- Harus string (pake quotes)

---

**Happy Building! 🚀**
