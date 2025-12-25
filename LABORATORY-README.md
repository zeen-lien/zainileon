# 🧪 Laboratory Documentation

## Overview

Laboratory adalah area private yang dilindungi password. Hanya lo yang bisa akses untuk:
- Trading Journal
- Personal Notes
- Custom Tools
- Experiments

## Password Protection

### Default Password
```
felina201225
```

### Cara Ganti Password

1. **Generate SHA-256 Hash** dari password baru lo:
   - Buka: https://emn178.github.io/online-tools/sha256.html
   - Input password baru
   - Copy hash result

2. **Update di Code:**
   Edit file: `src/components/laboratory/LaboratoryLogin.jsx`
   
   Cari line:
   ```javascript
   const CORRECT_PASSWORD_HASH = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3';
   ```
   
   Ganti dengan hash baru lo:
   ```javascript
   const CORRECT_PASSWORD_HASH = 'YOUR_NEW_HASH_HERE';
   ```

3. **Save & Deploy**

## Security Features

### 1. Password Hashing
- Password di-hash pake SHA-256
- Ga ada plain text password di code
- Hash comparison di client-side

### 2. Session Management
- Auth status disimpen di localStorage
- Session expire setelah 24 jam
- Auto-logout kalau session expired

### 3. Limitations (Frontend Only)
⚠️ **Important:** Ini simple password protection di frontend. Bukan real authentication system.

**Pros:**
- Ga butuh backend
- Simple & cepat
- Cukup untuk private access

**Cons:**
- Password hash bisa dilihat di source code (tapi tetep aman karena ga bisa di-reverse)
- Orang yang tech-savvy bisa bypass (tapi effort-nya ga worth it)
- Ga ada user management

**Untuk Production:**
Kalau lo mau proper authentication, lo butuh backend (Firebase, Supabase, dll).

## Features

### Current (MVP)
- ✅ Password protection
- ✅ Session management (24h)
- ✅ Overview dashboard
- ✅ Tab navigation
- ✅ Logout functionality

### Coming Soon
- 🔜 Trading Journal (track trades)
- 🔜 Notes system (markdown support)
- 🔜 Position Size Calculator
- 🔜 Risk/Reward Calculator
- 🔜 Pip Calculator
- 🔜 Profit Calculator

## Usage

### Access Laboratory
1. Klik "Laboratory" di navbar
2. Input password
3. Klik "Access Laboratory"
4. Session valid 24 jam

### Logout
- Klik button "Logout" di dashboard
- Session cleared dari localStorage

### Session Expired
- Auto-logout setelah 24 jam
- Harus login lagi

## Development

### Add New Tab
Edit: `src/components/laboratory/LaboratoryDashboard.jsx`

```javascript
const tabs = [
  { id: 'new-tab', label: 'New Tab', icon: '🆕' },
  // ... existing tabs
];
```

Terus bikin component baru:
```javascript
function NewTabContent() {
  return (
    <div>Your content here</div>
  );
}
```

### Add New Tool
Edit tools array di `ToolsContent` component.

### Customize Dashboard
Edit `OverviewContent` component untuk stats & welcome message.

## Tips

### Remember Password
Simpen password lo di password manager (1Password, LastPass, dll).

### Share Access
Kalau mau share access, share password-nya aja. Tapi inget, siapa aja yang punya password bisa akses.

### Change Password Regularly
Good practice: ganti password tiap 3-6 bulan.

## Troubleshooting

### Lupa Password?
1. Check dokumentasi ini (default: `felina201225`)
2. Atau reset dengan generate hash baru

### Session Ga Expire?
Clear localStorage manual:
```javascript
localStorage.removeItem('lab_auth');
localStorage.removeItem('lab_auth_time');
```

### Password Ga Diterima?
- Check typo
- Check caps lock
- Try clear browser cache

---

**Security Note:** Ini simple protection untuk personal use. Jangan simpen data sensitive di sini kalau lo deploy public.
