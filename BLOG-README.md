# 📝 Blog Documentation

## Cara Menambah Artikel Baru

### 1. Buka File Data Blog
Edit file: `src/data/dataBlog.js`

### 2. Tambah Artikel Baru di Array `ARTIKEL_BLOG`

```javascript
{
  id: 4, // ID unik (increment dari artikel terakhir)
  slug: "judul-artikel-url-friendly", // URL slug (lowercase, pakai dash)
  judul: "Judul Artikel Lo",
  ringkasan: "Deskripsi singkat artikel (1-2 kalimat)",
  konten: `
    <h2>Heading 2</h2>
    <p>Paragraf pertama...</p>
    
    <h3>Heading 3</h3>
    <p>Paragraf kedua...</p>
    
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
    
    <blockquote>
      "Quote keren di sini"
    </blockquote>
  `,
  tanggal: "2024-12-25", // Format: YYYY-MM-DD
  kategori: ["Tech", "Personal"], // Array kategori
  gambar: null, // URL gambar cover (opsional, bisa null)
}
```

### 3. Format Konten

Konten artikel support HTML tags:

#### Headings
```html
<h2>Main Section</h2>
<h3>Sub Section</h3>
```

#### Paragraf & Text
```html
<p>Paragraf biasa</p>
<strong>Bold text</strong>
<em>Italic text</em>
```

#### Lists
```html
<ul>
  <li>Unordered list item</li>
</ul>

<ol>
  <li>Ordered list item</li>
</ol>
```

#### Quotes
```html
<blockquote>
  "Quote atau highlight text"
</blockquote>
```

#### Links
```html
<a href="https://example.com">Link text</a>
```

#### Code
```html
<code>inline code</code>
```

### 4. Kategori

Kategori yang udah ada:
- `Tech` - Teknologi, programming, tools
- `Trading` - Trading, market analysis
- `Personal` - Personal thoughts, experiences
- `Design` - UI/UX, design principles
- `Frontend` - Frontend development specific

Lo bisa tambahin kategori baru, nanti otomatis muncul di filter.

### 5. Gambar Cover (Opsional)

Kalau mau tambahin gambar cover:
1. Simpen gambar di folder `public/blog/`
2. Update property `gambar`:
```javascript
gambar: "/blog/nama-gambar.jpg"
```

Atau pake URL external:
```javascript
gambar: "https://example.com/image.jpg"
```

### 6. Save & Test

1. Save file `dataBlog.js`
2. Refresh browser
3. Artikel baru langsung muncul di `/blog`

## Tips

### Slug Best Practices
- Lowercase semua
- Pakai dash (-) bukan underscore
- Singkat tapi descriptive
- Contoh: `memulai-trading`, `react-tips-2024`

### Konten Best Practices
- Pakai heading hierarchy (h2 → h3)
- Break paragraf jangan terlalu panjang
- Tambahin list untuk readability
- Quote untuk highlight poin penting

### Tanggal
- Format: `YYYY-MM-DD`
- Contoh: `2024-12-25`
- Artikel terbaru muncul duluan (sort by date)

## Contoh Artikel Lengkap

```javascript
{
  id: 4,
  slug: "tips-productive-coding",
  judul: "5 Tips Coding Lebih Produktif",
  ringkasan: "Cara-cara yang gw pake buat boost productivity pas coding. Simple tapi efektif.",
  konten: `
    <h2>Kenapa Productivity Penting?</h2>
    <p>Coding bukan cuma soal berapa banyak baris code yang lo tulis, tapi seberapa efektif lo solve problems.</p>
    
    <h3>1. Time Blocking</h3>
    <p>Alokasiin waktu spesifik untuk deep work. Gw biasanya:</p>
    <ul>
      <li>Morning: 2-3 jam deep focus coding</li>
      <li>Afternoon: Meetings & collaboration</li>
      <li>Evening: Learning & side projects</li>
    </ul>
    
    <h3>2. Keyboard Shortcuts</h3>
    <p>Master keyboard shortcuts IDE lo. Ini <strong>game changer</strong> banget.</p>
    
    <blockquote>
      "The best code is no code at all." - Jeff Atwood
    </blockquote>
    
    <h3>3. Break Time</h3>
    <p>Jangan lupa istirahat. Pomodoro technique works well:</p>
    <ol>
      <li>25 menit focus</li>
      <li>5 menit break</li>
      <li>Repeat 4x</li>
      <li>Long break 15-30 menit</li>
    </ol>
  `,
  tanggal: "2024-12-25",
  kategori: ["Tech", "Personal"],
  gambar: null,
}
```

## Troubleshooting

### Artikel ga muncul?
- Check ID unik (ga boleh duplikat)
- Check slug unik (ga boleh duplikat)
- Check format tanggal (YYYY-MM-DD)

### Styling konten ga bener?
- Pastiin HTML tags valid
- Check closing tags
- Lihat console browser untuk error

### Gambar ga muncul?
- Check path gambar bener
- Pastiin gambar ada di folder `public/`
- Try hard refresh (Ctrl+Shift+R)

---

**Happy Writing! 🚀**
