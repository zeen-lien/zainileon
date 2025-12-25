/**
 * Data Blog Articles
 * Tambah artikel baru di array ini
 * 
 * Format:
 * - id: unique identifier
 * - slug: URL-friendly (untuk routing)
 * - judul: Judul artikel
 * - ringkasan: Deskripsi singkat
 * - konten: Isi artikel (bisa pake HTML atau plain text)
 * - tanggal: Format: "YYYY-MM-DD"
 * - kategori: Array kategori
 * - gambar: URL gambar cover (opsional)
 */

export const ARTIKEL_BLOG = [
  {
    id: 1,
    slug: "memulai-perjalanan-trading",
    judul: "Memulai Perjalanan Trading: Dari Nol hingga Konsisten",
    ringkasan: "Pengalaman dan pembelajaran selama menjalani trading di berbagai market. Tips untuk pemula yang ingin memulai.",
    konten: `
      <h2>Kenapa Gw Mulai Trading?</h2>
      <p>Trading bukan cuma soal cuan, tapi juga soal disiplin dan psikologi. Di artikel ini gw bakal share pengalaman gw dari awal sampe sekarang.</p>
      
      <h3>Market yang Gw Trade</h3>
      <ul>
        <li><strong>Forex</strong> - Pair major kayak EUR/USD, GBP/USD</li>
        <li><strong>Crypto</strong> - Bitcoin, Ethereum, altcoins</li>
        <li><strong>Index</strong> - US30, NAS100</li>
        <li><strong>Commodities</strong> - Gold, Oil</li>
      </ul>
      
      <h3>Lesson Learned</h3>
      <p>Yang paling penting: <strong>Risk Management</strong>. Ga peduli seberapa bagus strategy lo, kalau risk management berantakan, akun lo bakal MC.</p>
      
      <blockquote>
        "The goal of a successful trader is to make the best trades. Money is secondary." - Alexander Elder
      </blockquote>
      
      <h3>Tips untuk Pemula</h3>
      <ol>
        <li>Mulai dari demo account dulu</li>
        <li>Pelajari risk management sebelum strategy</li>
        <li>Journaling itu wajib</li>
        <li>Jangan FOMO</li>
        <li>Konsisten lebih penting dari profit besar</li>
      </ol>
    `,
    tanggal: "2024-12-20",
    kategori: ["Trading", "Personal"],
    gambar: null,
  },
  {
    id: 2,
    slug: "tech-stack-favorit-2024",
    judul: "Tech Stack Favorit Gw di 2024",
    ringkasan: "Tools dan teknologi yang gw pake untuk develop project-project gw. From frontend to deployment.",
    konten: `
      <h2>Frontend Development</h2>
      <p>Gw lebih fokus di frontend, dan ini tech stack yang gw pake:</p>
      
      <h3>Core Technologies</h3>
      <ul>
        <li><strong>React</strong> - Library utama untuk UI</li>
        <li><strong>Vite</strong> - Build tool yang super cepat</li>
        <li><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
        <li><strong>Framer Motion</strong> - Animasi yang smooth</li>
      </ul>
      
      <h3>State Management</h3>
      <p>Tergantung kompleksitas project:</p>
      <ul>
        <li>Simple: React Hooks (useState, useContext)</li>
        <li>Medium: Zustand</li>
        <li>Complex: Redux Toolkit</li>
      </ul>
      
      <h3>Deployment</h3>
      <ul>
        <li><strong>GitHub Pages</strong> - Static sites</li>
        <li><strong>Vercel</strong> - Next.js projects</li>
        <li><strong>Netlify</strong> - Alternative yang bagus</li>
      </ul>
      
      <h2>Why This Stack?</h2>
      <p>Gw pilih stack ini karena:</p>
      <ol>
        <li>Fast development</li>
        <li>Modern & maintainable</li>
        <li>Great developer experience</li>
        <li>Free deployment options</li>
      </ol>
    `,
    tanggal: "2024-12-18",
    kategori: ["Tech", "Frontend"],
    gambar: null,
  },
  {
    id: 3,
    slug: "dark-mode-aesthetic",
    judul: "Kenapa Gw Obsessed sama Dark Mode & Futuristic Design",
    ringkasan: "Filosofi di balik design choices gw. Dark theme bukan cuma soal aesthetic, tapi juga functionality.",
    konten: `
      <h2>Dark Mode is Not Just a Trend</h2>
      <p>Buat gw, dark mode bukan cuma ikut-ikutan trend. Ada alasan kuat kenapa gw prefer dark theme:</p>
      
      <h3>1. Eye Comfort</h3>
      <p>Coding berjam-jam di depan layar? Dark mode ngurangin eye strain, especially di malam hari.</p>
      
      <h3>2. Focus</h3>
      <p>Dark background bikin content jadi lebih stand out. Lo fokus ke yang penting.</p>
      
      <h3>3. Aesthetic</h3>
      <p>Kombinasi dark background dengan neon colors (cyan, purple) itu futuristic banget. Vibes-nya tech-forward.</p>
      
      <h2>Design Principles Gw</h2>
      <ul>
        <li><strong>Minimalism</strong> - Less is more</li>
        <li><strong>Contrast</strong> - High contrast untuk readability</li>
        <li><strong>Animation</strong> - Smooth transitions, ga berlebihan</li>
        <li><strong>Typography</strong> - Clean fonts (Inter, Space Grotesk)</li>
      </ul>
      
      <h2>Color Palette</h2>
      <p>Gw pake gradient cyan-purple karena:</p>
      <ul>
        <li>Cyan: Tech, modern, clean</li>
        <li>Purple: Creative, premium, mysterious</li>
        <li>Black: Elegant, timeless</li>
      </ul>
      
      <blockquote>
        "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
      </blockquote>
    `,
    tanggal: "2024-12-15",
    kategori: ["Design", "Personal"],
    gambar: null,
  },
  {
    id: 4,
    slug: "framer-motion-tips",
    judul: "Framer Motion: Bikin Animasi Web yang Smooth",
    ringkasan: "Tips dan tricks pake Framer Motion untuk animasi yang ga cuma bagus, tapi juga performant.",
    konten: `
      <h2>Kenapa Framer Motion?</h2>
      <p>Dari semua animation library yang gw coba, Framer Motion paling enak dipake. API-nya intuitive, performant, dan powerful.</p>
      
      <h3>Basic Animation</h3>
      <p>Contoh paling simple:</p>
      <code>
        &lt;motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        &gt;
          Content
        &lt;/motion.div&gt;
      </code>
      
      <h3>Tips Gw</h3>
      <ol>
        <li><strong>Variants</strong> - Bikin reusable animation states</li>
        <li><strong>Stagger</strong> - Animasi berurutan yang smooth</li>
        <li><strong>whileHover</strong> - Interactive hover effects</li>
        <li><strong>useScroll</strong> - Parallax & scroll-based animations</li>
      </ol>
      
      <h3>Performance Tips</h3>
      <ul>
        <li>Animate transform & opacity (GPU accelerated)</li>
        <li>Avoid animating width/height</li>
        <li>Use <code>layoutId</code> untuk shared element transitions</li>
        <li>Lazy load animations dengan <code>whileInView</code></li>
      </ul>
      
      <h2>Real World Example</h2>
      <p>Di landing page gw, semua section pake Framer Motion:</p>
      <ul>
        <li>Hero: Parallax scroll effect</li>
        <li>Cards: Stagger animation on load</li>
        <li>Buttons: Hover & tap animations</li>
        <li>Background: Animated particles</li>
      </ul>
      
      <blockquote>
        "Animation is not just decoration. It's communication." - Val Head
      </blockquote>
    `,
    tanggal: "2024-12-12",
    kategori: ["Tech", "Frontend", "Tutorial"],
    gambar: null,
  },
  {
    id: 5,
    slug: "trading-psychology",
    judul: "Trading Psychology: Mental Game yang Sering Dilupakan",
    ringkasan: "Skill teknikal itu penting, tapi mental game yang bikin lo survive di market jangka panjang.",
    konten: `
      <h2>Why Psychology Matters</h2>
      <p>Lo bisa punya strategy terbaik di dunia, tapi kalau mental lo ga kuat, lo bakal tetep loss. Trust me, gw udah ngalamin.</p>
      
      <h3>Common Psychological Traps</h3>
      
      <h4>1. FOMO (Fear of Missing Out)</h4>
      <p>Liat orang profit gede, langsung pengen ikutan. Ini jebakan paling umum. <strong>Solution:</strong> Stick to your plan, ga semua opportunity harus lo ambil.</p>
      
      <h4>2. Revenge Trading</h4>
      <p>Loss terus langsung pengen balas dendam ke market. Ini cara paling cepat buat MC. <strong>Solution:</strong> Take a break, review what went wrong.</p>
      
      <h4>3. Overconfidence</h4>
      <p>Win streak bikin lo merasa invincible. Mulai ambil risk lebih besar. <strong>Solution:</strong> Stay humble, market bisa humble-in lo kapan aja.</p>
      
      <h3>Mental Framework Gw</h3>
      <ol>
        <li><strong>Process over Results</strong> - Focus ke execution, bukan profit</li>
        <li><strong>Accept Losses</strong> - Loss itu bagian dari trading</li>
        <li><strong>Stay Disciplined</strong> - Follow your rules, no exceptions</li>
        <li><strong>Journal Everything</strong> - Track emotions, not just trades</li>
      </ol>
      
      <h3>Daily Routine</h3>
      <ul>
        <li>Morning: Review plan, check calendar</li>
        <li>Trading: Execute plan, no improvisation</li>
        <li>Evening: Journal trades & emotions</li>
        <li>Weekly: Review performance & adjust</li>
      </ul>
      
      <blockquote>
        "The market is a device for transferring money from the impatient to the patient." - Warren Buffett
      </blockquote>
    `,
    tanggal: "2024-12-10",
    kategori: ["Trading", "Personal"],
    gambar: null,
  },
  {
    id: 6,
    slug: "vite-vs-webpack",
    judul: "Vite vs Webpack: Kenapa Gw Switch ke Vite",
    ringkasan: "Perbandingan build tools dan kenapa Vite jadi pilihan utama gw untuk semua project baru.",
    konten: `
      <h2>The Problem with Webpack</h2>
      <p>Webpack powerful, tapi setup-nya ribet dan build time-nya lama. Especially untuk project besar.</p>
      
      <h3>Kenapa Vite?</h3>
      
      <h4>1. Lightning Fast</h4>
      <p>Dev server start dalam hitungan detik. HMR (Hot Module Replacement) instant. Ga ada waiting time.</p>
      
      <h4>2. Zero Config</h4>
      <p>Out of the box support untuk React, Vue, TypeScript. Ga perlu config ribet.</p>
      
      <h4>3. Modern</h4>
      <p>Built on top of esbuild & Rollup. Leverage native ES modules.</p>
      
      <h3>Performance Comparison</h3>
      <p>Project gw (medium size):</p>
      <ul>
        <li><strong>Webpack</strong> - Dev server: ~30s, Build: ~2min</li>
        <li><strong>Vite</strong> - Dev server: ~2s, Build: ~30s</li>
      </ul>
      
      <h3>Migration Tips</h3>
      <ol>
        <li>Install Vite & plugin React/Vue</li>
        <li>Move index.html ke root</li>
        <li>Update import paths (no more webpack aliases by default)</li>
        <li>Configure vite.config.js kalau perlu</li>
      </ol>
      
      <h3>Gotchas</h3>
      <ul>
        <li>CommonJS modules perlu di-convert</li>
        <li>Some webpack-specific features ga ada</li>
        <li>Plugin ecosystem masih growing</li>
      </ul>
      
      <h2>Verdict</h2>
      <p>Untuk project baru, gw selalu pake Vite. Developer experience-nya jauh lebih baik. Webpack masih relevan untuk legacy projects atau kalau lo butuh specific features.</p>
    `,
    tanggal: "2024-12-08",
    kategori: ["Tech", "Frontend", "Tools"],
    gambar: null,
  },
  {
    id: 7,
    slug: "risk-management-101",
    judul: "Risk Management 101: Foundation of Successful Trading",
    ringkasan: "Bukan strategy yang bikin lo profit konsisten, tapi risk management. Here's how to do it right.",
    konten: `
      <h2>The 1% Rule</h2>
      <p>Never risk more than 1-2% of your account per trade. Ini rule paling fundamental.</p>
      
      <h3>Why 1%?</h3>
      <p>Dengan 1% risk per trade, lo bisa loss 50x berturut-turut dan masih punya 50% account. Itu buffer yang cukup buat survive bad streak.</p>
      
      <h3>Position Sizing Formula</h3>
      <code>
        Position Size = (Account Size × Risk %) / Stop Loss in pips
      </code>
      
      <h4>Example:</h4>
      <ul>
        <li>Account: $10,000</li>
        <li>Risk: 1% = $100</li>
        <li>Stop Loss: 50 pips</li>
        <li>Position Size: $100 / 50 = $2 per pip</li>
      </ul>
      
      <h3>Risk-Reward Ratio</h3>
      <p>Minimum 1:2 RR. Artinya kalau lo risk $100, target profit minimal $200.</p>
      
      <h4>Why?</h4>
      <p>Dengan 1:2 RR, lo cuma perlu win rate 40% buat breakeven. Anything above that = profit.</p>
      
      <h3>Common Mistakes</h3>
      <ol>
        <li><strong>Moving Stop Loss</strong> - Jangan! Accept the loss</li>
        <li><strong>Averaging Down</strong> - Adding to losing position = disaster</li>
        <li><strong>Risking Too Much</strong> - "This is a sure trade" - No such thing</li>
        <li><strong>No Stop Loss</strong> - Recipe for blown account</li>
      </ol>
      
      <h3>Advanced: Kelly Criterion</h3>
      <p>Formula untuk optimal position sizing based on win rate & RR:</p>
      <code>
        Kelly % = (Win Rate × RR - Loss Rate) / RR
      </code>
      
      <blockquote>
        "Risk comes from not knowing what you're doing." - Warren Buffett
      </blockquote>
    `,
    tanggal: "2024-12-05",
    kategori: ["Trading", "Tutorial"],
    gambar: null,
  },
  {
    id: 8,
    slug: "tailwind-best-practices",
    judul: "Tailwind CSS Best Practices: Clean & Maintainable Code",
    ringkasan: "Tips untuk pake Tailwind tanpa bikin code lo jadi spaghetti. Keep it clean, keep it maintainable.",
    konten: `
      <h2>The Tailwind Way</h2>
      <p>Tailwind powerful, tapi kalau ga hati-hati, className lo bisa jadi super panjang dan susah dibaca.</p>
      
      <h3>1. Extract Components</h3>
      <p>Kalau lo pake className yang sama berulang kali, extract jadi component.</p>
      
      <h4>Bad:</h4>
      <code>
        &lt;button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"&gt;
      </code>
      
      <h4>Good:</h4>
      <code>
        &lt;Button variant="primary"&gt;
      </code>
      
      <h3>2. Use @apply Sparingly</h3>
      <p>@apply berguna, tapi jangan overuse. Utility-first is the point of Tailwind.</p>
      
      <h3>3. Organize Classes</h3>
      <p>Group classes by category:</p>
      <ol>
        <li>Layout (flex, grid, position)</li>
        <li>Spacing (margin, padding)</li>
        <li>Typography (font, text)</li>
        <li>Colors (bg, text, border)</li>
        <li>Effects (shadow, opacity)</li>
        <li>Transitions & animations</li>
      </ol>
      
      <h3>4. Custom Config</h3>
      <p>Extend tailwind.config.js dengan brand colors & spacing:</p>
      <code>
        theme: {
          extend: {
            colors: {
              'brand-primary': '#00d4ff',
              'brand-secondary': '#a855f7'
            }
          }
        }
      </code>
      
      <h3>5. Responsive Design</h3>
      <p>Mobile-first approach:</p>
      <code>
        className="text-sm md:text-base lg:text-lg"
      </code>
      
      <h3>Tools Gw Pake</h3>
      <ul>
        <li><strong>Tailwind CSS IntelliSense</strong> - VSCode extension</li>
        <li><strong>Prettier Plugin</strong> - Auto-sort classes</li>
        <li><strong>clsx/classnames</strong> - Conditional classes</li>
      </ul>
      
      <blockquote>
        "The best code is no code at all. The second best is code that's easy to delete." - Programming Wisdom
      </blockquote>
    `,
    tanggal: "2024-12-03",
    kategori: ["Tech", "Frontend", "Tutorial"],
    gambar: null,
  },
];

/**
 * Helper function untuk get artikel by slug
 */
export const getArtikelBySlug = (slug) => {
  return ARTIKEL_BLOG.find(artikel => artikel.slug === slug);
};

/**
 * Helper function untuk get artikel by kategori
 */
export const getArtikelByKategori = (kategori) => {
  return ARTIKEL_BLOG.filter(artikel => 
    artikel.kategori.includes(kategori)
  );
};

/**
 * Helper function untuk get semua kategori unik
 */
export const getAllKategori = () => {
  const kategoriSet = new Set();
  ARTIKEL_BLOG.forEach(artikel => {
    artikel.kategori.forEach(kat => kategoriSet.add(kat));
  });
  return Array.from(kategoriSet);
};
