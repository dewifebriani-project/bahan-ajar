# Panduan Slide & Lembar Praktikum Interaktif
## Bahan Ajar Digital · Universitas Tazkia · FEBI
### Mata Kuliah: SIA · ADA · BIV

> Dokumen ini adalah rujukan standar pembuatan dan perbaikan file HTML bahan ajar.
> Ikuti seluruh aturan ini agar setiap file konsisten dan bebas bug.
> __Terakhir diperbarui: September 2026 — berdasarkan audit menyeluruh P01–P03 SIA.__

---

## DAFTAR ISI
1. Struktur Folder & Nama File
2. Warna Hero Per Pertemuan Per Mata Kuliah
3. Struktur HTML Standar (Slide Teori)
4. Struktur HTML Standar (Lembar Praktikum)
5. Bug Wajib Diperiksa — Checklist Audit
6. Aturan Penulisan Konten HTML
7. Pola JavaScript Standar
8. Standar Kuis
9. Standar Konten untuk Mahasiswa Semester 3
10. Checklist Sebelum File Selesai

---

## 1. Struktur Folder & Nama File

```
New Bahan Ajar/
├── Sistem Informasi Akuntansi/
│   ├── RPS-SIA.html
│   ├── Pertemuan 01/
│   │   ├── Pertemuan-01.html          ← slide teori
│   │   └── Praktikum-01-AIS.html      ← lembar praktikum
│   ├── Pertemuan 02/
│   │   ├── Pertemuan-02.html
│   │   ├── Praktikum-02-AIS.html
│   │   └── dataset-coa-bmt-p02.csv
│   └── Pertemuan 03/
│       ├── Pertemuan-03.html
│       └── Praktikum-03-AIS.html
├── Applied Data Analytics/
│   ├── Pertemuan 01/ → Pertemuan-01-ADA.html · Praktikum-01-ADA.html
│   ├── Pertemuan 02/ → Pertemuan-02-ADA.html · Praktikum-02-ADA.html
│   └── Pertemuan 03/ → Pertemuan-03-ADA.html · Praktikum-03-ADA.html
└── Business Intelligence & Visualization/
    ├── RPS-BIV.html
    └── Pertemuan 01/ → Pertemuan-01-BIV.html · Praktikum-01-BIV.html
```

### Konvensi localStorage Key

| Mata Kuliah | Slide Teori | Lembar Praktikum |
|---|---|---|
| SIA | `tazkia-ais-p{XX}-v1` | `tazkia-ais-p{XX}-lab-v1` |
| ADA | `tazkia-ada-p{XX}-v1` | `tazkia-ada-p{XX}-lab-v1` |
| BIV | `tazkia-biv-p{XX}-v1` | `tazkia-biv-p{XX}-lab-v1` |

Contoh: SIA P02 → `tazkia-ais-p02-v1` dan `tazkia-ais-p02-lab-v1`

---

## 2. Warna Hero Per Pertemuan Per Mata Kuliah

### Sistem Informasi Akuntansi (SIA)

Warna aktual berdasarkan file yang sudah ada. Gunakan TEPAT nilai ini — jangan ubah:

| No | Topik | `--meet-from` | `--meet-mid` | `--meet-to` | `--meet-acc` | `--meet-acc2` |
|---|---|---|---|---|---|---|
| __P01__ | Pengantar AIS | `#070F1C` | `#0C1D30` | `#112538` | `#D46020` | `#E88030` |
| __P02__ | Proses Bisnis & Data | `#070F1C` | `#0C1D30` | `#112538` | `#D46020` | `#E88030` |
| __P03__ | Enterprise Systems | `#051424` | `#0A243E` | `#103858` | `#1B7898` | `#2898C0` |
| P04 | Etika & Penipuan | `#280808` | `#601010` | `#A02020` | `#E07040` | `#F09060` |
| P05 | Pengendalian Internal | `#180828` | `#3A1060` | `#6030A0` | `#A060D0` | `#C080F0` |
| P06 | Siklus Pendapatan | `#080A28` | `#102060` | `#2848A8` | `#5090E0` | `#60A0F0` |
| P07 | Siklus Pengeluaran | `#201408` | `#503008` | `#886018` | `#C09030` | `#D4A040` |
| P08 | Siklus Produksi | `#081828` | `#142840` | `#243860` | `#508090` | `#60A0B0` |
| P09 | Siklus HR & Penggajian | `#180828` | `#3A1258` | `#602890` | `#9050C0` | `#A060D0` |
| P10 | GL & Pelaporan | `#062018` | `#0E4030` | `#185A44` | `#30A060` | `#40B878` |
| P11 | Teknologi & Infrastruktur | `#040810` | `#081420` | `#102030` | `#3878B0` | `#4090C0` |
| P12 | Pengembangan Sistem | `#200408` | `#500A18` | `#802030` | `#C05070` | `#E06080` |
| P13 | Audit SI | `#081408` | `#143018` | `#204828` | `#50A850` | `#60B860` |
| P14 | AIS Syariah & PSAK | `#181008` | `#402810` | `#604018` | `#B08030` | `#C09040` |
| P15 | Review & Persiapan UAS | `#0A0A14` | `#18182A` | `#202038` | `#7080B0` | `#8090C0` |
| P16 | Project Presentation | `#070F1C` | `#0C1D30` | `#200808` | `#E08040` | `#F09050` |

> __Catatan P02 vs P03 SIA:__ P02 menggunakan tema __navy/amber__ (sama dengan P01). P03 menggunakan tema __ocean blue__ yang berbeda. Jangan tertukar.

### Applied Data Analytics (ADA) & BIV
Warna di-set per file masing-masing. Baca `--meet-from/mid/to/acc` dari file sebelumnya di folder yang sama sebelum membuat file baru.

---

## 3. Struktur HTML Standar — Slide Teori

### Kerangka File (urutan elemen WAJIB)

```html
<title>Pertemuan X — Judul Topik</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/...Amiri...Source+Sans+3...">
<style>
  /* 1. CSS Variables (:root + dark mode) */
  /* 2. Topbar */
  /* 3. Hero */
  /* 4. Steps */
  /* 5. Body & Section cards */
  /* 6. Typography */
  /* 7. Callout, Def-box, Grid */
  /* 8. Quiz styles */
</style>

<!-- TOPBAR (sticky, z-index:100) -->
<!-- HERO (dengan hero-arch SVG DI DALAM .hero) -->
<!-- STEPS WRAP (sticky, top:52px) -->
<!-- BODY: sec0 ... sec6 (kuis) -->
<!-- COMPLETION BOX -->
<script>/* JS state machine */</script>
```

### CSS Kritis yang WAJIB Ada

```css
/* Locked section — JANGAN pakai display:none */
.sec.locked {
  opacity: .38;
  filter: grayscale(.45);
  pointer-events: none;
  user-select: none;
}
.quiz-sec.locked {
  opacity: .38;
  filter: grayscale(.45);
  pointer-events: none;
  user-select: none;
}

/* Steps bar — WAJIB sticky */
.steps-wrap {
  position: sticky;
  top: 52px;        /* 52px = tinggi topbar */
  z-index: 90;
  box-shadow: var(--shadow-sm);
}

/* Hero padding — arch wave di dalam hero */
.hero { padding: 38px 24px 0; }
.hero-inner { padding-bottom: 30px; }
.hero-arch { line-height: 0; margin-top: -1px; }
```

### Posisi `hero-arch` — WAJIB di dalam `.hero`

```html
<!-- BENAR -->
<div class="hero">
  <div class="hero-inner">...</div>
  <div class="hero-arch"><svg ...></svg></div>   ← di dalam .hero
</div>

<!-- SALAH — jangan taruh di luar -->
<div class="hero">...</div>
<div class="hero-arch">...</div>   ← SALAH
```

---

## 4. Struktur HTML Standar — Lembar Praktikum

### Perbedaan dari Slide Teori

| Elemen | Slide Teori | Lembar Praktikum |
|---|---|---|
| Jumlah seksi | 7 (6 seksi + kuis) | 6 langkah (TOTAL_STEPS = 6) |
| Progress key | `STORAGE_KEY` | `LAB_KEY` |
| Unlock function | `unlockNext(i)` | `completeStep(i)` |
| Komponen kuis | Ada MCQ + matching | Tidak ada kuis, ada challenge |
| `code-box` | Jarang | WAJIB ada, berisi template kode/query |

### CSS Wajib untuk `.code-box`

```css
/* WAJIB: pre untuk jaga ASCII art dan indentasi */
.code-box {
  white-space: pre;          /* ← WAJIB, jangan pre-wrap */
  overflow-x: auto;          /* scroll horizontal untuk konten lebar */
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.55;
  background: #0A1420;
  color: #C8E8F8;
  border-radius: var(--rs);
  padding: 14px 16px;
}

/* Judul code-box — WAJIB white-space:normal agar tidak ikut pre */
.code-hd {
  white-space: normal;
}
```

### Escape Karakter HTML dalam `code-box`

Karakter berikut WAJIB di-escape di dalam `code-box` jika muncul dalam template/diagram ASCII:

| Karakter Asli | Ditulis Sebagai | Alasan |
|---|---|---|
| `<--` | `&lt;--` | `<--` dibaca browser sebagai awal komentar HTML `<!--` |
| `<nama>` | `&lt;nama&gt;` | Tag HTML terbuka |
| `&` | `&amp;` | Entity HTML |

Contoh ASCII yang sering bermasalah:
```html
<!-- SALAH — akan menghilang saat render -->
| Nasabah | <-- Dana Cair ----|

<!-- BENAR -->
| Nasabah | &lt;-- Dana Cair ----|
```

> __Aturan:__ `-->` (panah kanan) aman tidak perlu di-escape. `<--` (panah kiri) wajib di-escape.

---

## 5. Bug Wajib Diperiksa — Checklist Audit

Setiap kali membuat atau mengedit file HTML bahan ajar, periksa 7 poin ini:

### BUG-01: `.sec.locked` menggunakan `display:none`
- __Gejala:__ Seksi yang terkunci benar-benar menghilang dari halaman
- __Penyebab:__ `display:none` menyembunyikan elemen sepenuhnya
- __Fix:__ Ganti dengan `opacity:.38; filter:grayscale(.45); pointer-events:none; user-select:none`
- __Berlaku juga untuk:__ `.quiz-sec.locked`

### BUG-02: `.steps-wrap` tidak sticky
- __Gejala:__ Step indicator ikut scroll ke atas, hilang dari layar
- __Fix:__ Tambahkan `position:sticky; top:52px; z-index:90`

### BUG-03: `hero-arch` div berada di luar `.hero`
- __Gejala:__ Gelombang arch tampak jauh di bawah hero, atau ada gap putih antar hero dan konten
- __Fix:__ Pindahkan `<div class="hero-arch">` agar berada di dalam `<div class="hero">` sebelum tag penutup `</div>`

### BUG-04: `applyState()` hanya iterasi array `done`, bukan semua seksi
- __Gejala:__ Saat halaman di-reload, seksi yang seharusnya locked malah tampil terbuka
- __Fix:__ `applyState()` harus loop dari `0` sampai `TOTAL_SECS`, bukan iterasi `state.done`:

```javascript
// BENAR
function applyState() {
  for (let i = 0; i < TOTAL_SECS; i++) {
    const sec = document.getElementById('sec' + i);
    if (!sec) continue;
    if (state.done.includes(i)) {
      sec.classList.remove('locked');
      const isDone = (i < state.done.length - 1) || (state.done.length === TOTAL_SECS);
      sec.classList.toggle('done-sec', isDone);
    } else {
      if (!sec.classList.contains('locked')) sec.classList.add('locked');
      sec.classList.remove('done-sec');
    }
  }
  // ... restore MCQ dan matching ...
  updateProgress();
}
```

### BUG-05: `<--` dalam `code-box` tidak di-escape
- __Gejala:__ Isi `code-box` terpotong atau hilang di tengah diagram ASCII
- __Fix:__ Tulis `&lt;--` bukan `<--` di dalam tag HTML
- __Catatan:__ `-->` aman, hanya `<--` yang bermasalah

### BUG-06: `.code-box` tanpa `white-space:pre`
- __Gejala:__ ASCII art dan indentasi kode hancur, baris wrap di tempat yang salah
- __Fix:__ Tambahkan `white-space:pre` pada `.code-box`. Jangan gunakan `pre-wrap` (menyebabkan `word-break` merusak diagram)

### BUG-07: Teks menggunakan format bintang markdown bukan `<em>HTML</em>`
- __Gejala:__ Tanda bintang terlihat langsung di halaman, teks tidak menjadi italic
- __Fix:__ Selalu gunakan `<em>teks</em>` — jangan pernah menulis teks di antara dua tanda bintang
- __Cara cek massal:__ Jalankan script Python berikut untuk fix semua file sekaligus:

```python
import re, glob

base = "/path/to/New Bahan Ajar"
for path in glob.glob(base + "/**/*.html", recursive=True):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    placeholders = {}
    counter = [0]
    def save_block(m):
        key = f'ZZPROTECTEDZZ{counter[0]}ZZ'
        placeholders[key] = m.group(0)
        counter[0] += 1
        return key
    content = re.sub(r'<style[^>]*>.*?</style>', save_block, content, flags=re.DOTALL|re.IGNORECASE)
    content = re.sub(r'<script[^>]*>.*?</script>', save_block, content, flags=re.DOTALL|re.IGNORECASE)
    new_content, n = re.subn(r'\*([^*\n<>]+)\*', r'<em>\1</em>', content)
    for key, value in placeholders.items():
        new_content = new_content.replace(key, value)
    if n > 0:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"FIXED ({n}) — {path}")
```

---

## 6. Aturan Penulisan Konten HTML

### Formatting Teks

| Format | Cara Benar | Cara Salah (DILARANG) |
|---|---|---|
| Italic | `<em>teks</em>` | tanda bintang kiri-teks-tanda bintang kanan |
| Bold | `<strong>teks</strong>` | dua tanda bintang kiri-teks-dua tanda bintang kanan |
| Kode inline | `<code>SELECT id FROM tabel</code>` | backtick markdown |
| Istilah asing | `<em>business events</em>` | tanda bintang di kiri dan kanan teks |

> __Penting:__ Tanda bintang tidak boleh digunakan sebagai formatting teks di HTML content. Pengecualian hanya di dalam blok `<style>` CSS (selector universal) dan `<script>` JavaScript (operator perkalian) — keduanya diproses oleh browser, bukan ditampilkan ke pengguna.

### Callout Types

```html
<!-- Informasi teknis / tips -->
<div class="callout info">...</div>

<!-- Peringatan / hal kritis -->
<div class="callout warn">...</div>

<!-- Nilai syariah / ayat / hadis -->
<div class="callout sya">...</div>

<!-- Studi kasus / contoh konkrit -->
<div class="callout case">
  <div class="case-label">LABEL KASUS</div>
  ...
</div>
```

### Standar Contoh Konteks Indonesia

Gunakan contoh dari konteks berikut (prioritas tinggi ke rendah):

| Prioritas | Konteks | Contoh Spesifik |
|---|---|---|
| 1 | Lembaga Keuangan Syariah | BMT Berkah Mandiri, BPRS Tazkia, Koperasi Syariah |
| 2 | Perusahaan Halal Indonesia | PT Halal Food Nusantara (HFN), produsen nugget bersertifikat |
| 3 | BUMN / Bank Nasional | BSI (Bank Syariah Indonesia), BRI, Pertamina |
| 4 | UMKM | Toko kelontong, warung makan, konveksi |
| 5 | Startup/Digital | Tokopedia, Shopee, platform fintech |

### Syariah Integration (Wajib di Setiap Pertemuan)

Setiap pertemuan wajib memiliki __Seksi Nilai Syariah__ yang mencakup:
- 1 ayat Al-Qur'an atau hadis yang relevan (lengkap: Arab + terjemah + referensi)
- 2 nilai/prinsip syariah dalam konteks topik
- Relevansi dengan regulasi (OJK, PSAK Syariah, AAOIFI, BPJPH)

---

## 7. Pola JavaScript Standar

### Slide Teori (`Pertemuan-XX.html`)

```javascript
const STORAGE_KEY = 'tazkia-ais-p{XX}-v1';  // ganti XX dengan nomor
const TOTAL_SECS = 7;                         // 6 seksi + 1 kuis = 7
const MCQ_ANSWERS = [/* indeks jawaban benar per soal */];
const MATCH_CORRECT = {/* termIdx: defIdx */};

let state = {
  done: [0],          // seksi 0 (tujuan) selalu terbuka di awal
  mcqSel: [null, null, null, null],
  matchPairs: {},
  submitted: false
};
```

### Lembar Praktikum (`Praktikum-XX-AIS.html`)

```javascript
const LAB_KEY = 'tazkia-ais-p{XX}-lab-v1';
const TOTAL_STEPS = 6;

let labState = {
  done: [0]           // langkah 0 selalu terbuka di awal
};
```

### `unlockNext()` dengan animasi

```javascript
function unlockNext(i) {
  if (!state.done.includes(i + 1)) {
    state.done.push(i + 1);
    saveState();
  }
  applyState();
  const next = document.getElementById('sec' + (i + 1));
  if (next) {
    next.classList.add('unlocking');
    setTimeout(() => next.classList.remove('unlocking'), 400);
    next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
```

### `updateProgress()` — sinkronisasi topbar dan step indicator

```javascript
function updateProgress() {
  const pct = Math.round((state.done.length / TOTAL_SECS) * 100);
  document.getElementById('topProg').style.width = pct + '%';
  document.getElementById('topPct').textContent = pct + '%';

  for (let i = 0; i < TOTAL_SECS; i++) {
    const st = document.getElementById('st' + i);
    const sc = document.getElementById('sc' + i);
    if (!st) continue;
    if (state.done.includes(i)) {
      st.className = 'step done' + (i === 6 ? ' quiz' : '');
      if (sc) sc.className = 'sconn done';
    } else if (i === state.done.length) {
      st.className = 'step active' + (i === 6 ? ' quiz' : '');
    } else {
      st.className = 'step' + (i === 6 ? ' quiz' : '');
    }
  }
}
```

---

## 8. Standar Kuis

### Struktur Kuis Standar
- __Jumlah soal:__ 4 MCQ + 1 Matching Game (5 pasang)
- __Ambang lulus:__ 75% (dokumen di `.quiz-hd-sub`)
- __Total skor:__ 9 poin (4 MCQ + 5 pasang matching)
- __Feedback:__ Setiap pilihan MCQ wajib punya `.opt-fb` penjelasan

### Tipe Kuis yang Tersedia

| Tipe | Cocok untuk | CSS Class |
|---|---|---|
| MCQ 4 pilihan | Definisi, konsep, identifikasi | `.q-item .options` |
| Matching klik-pasang | Istilah ↔ definisi, modul ↔ fungsi | `.match-container` |
| Skenario analitik | Kasus kontekstual, studi kasus | Embed dalam `.q-text` |
| True/False + alasan | Miskonsepsi umum | Modifikasi MCQ 2 pilihan |

### `MATCH_CORRECT` — cara mendefinisikan pasangan

```javascript
// Indeks mengacu ke urutan elemen di HTML (0-based)
// Term 0 (item kiri pertama) → Def 1 (item kanan kedua)
const MATCH_CORRECT = {
  0: 1,   // term ke-0 berpasangan dengan def ke-1
  1: 3,   // term ke-1 berpasangan dengan def ke-3
  2: 0,
  3: 4,
  4: 2
};
```

---

## 9. Standar Konten untuk Mahasiswa Semester 3

Mahasiswa S3 FEBI sudah selesai Pengantar Akuntansi 1–2 dan Pengantar TIK. Konten harus:

### Level Kognitif
- Seksi 1–2: __C2 (Pemahaman)__ — definisi, identifikasi, klasifikasi
- Seksi 3–4: __C3 (Aplikasi)__ — contoh konkrit, analisis kasus
- Seksi 5–6 + Kuis: __C3–C4 (Analisis)__ — membandingkan, mengevaluasi

### Koneksi Wajib ke Akuntansi Dasar
Mahasiswa sudah tahu Debit/Kredit. Setiap topik data/sistem __wajib__ terhubung ke jurnal:
- Tunjukkan bagaimana 1 transaksi bisnis → melewati proses AIS → menghasilkan entri jurnal berpasangan
- Gunakan kode akun dari dataset yang ada (contoh: `11101 Kas`, `21101 Simpanan Wadiah`)

### Topik Wajib per Pertemuan SIA

| Pertemuan | Konten Wajib | Konten Dilarang Dilewatkan |
|---|---|---|
| P02 | Siklus transaksi, CRUD, DFD, COA | Hubungan Subsidiary Ledger ↔ Control Account |
| P03 | ERP modul, Porter Value Chain, Halal SCM | Opsi ERP Indonesia (Accurate, Jurnal.id, Zahir) |
| P04+ | Sesuai RPS | Selalu ada: contoh BMT/BPRS + nilai syariah |

### ERP Indonesia — Selalu Cantumkan Alternatif Lokal
Jangan hanya menyebut SAP. Sertakan:

| Software | Segmen | Relevansi PKL |
|---|---|---|
| __Accurate Online__ | UKM Indonesia | Paling sering ditemukan saat PKL |
| __Jurnal.id (Mekari)__ | Startup & koperasi digital | Cloud-based, integrasi marketplace |
| __Zahir Accounting__ | UKM manufaktur | Modul persediaan kuat |
| __Odoo Community__ | Menengah, bisa dikustomisasi | Open-source, opsi syariah |
| __SAP S/4HANA__ | Perusahaan besar | Standar global, modul FI/CO |

---

## 10. Checklist Sebelum File Selesai

### Struktur & Layout
- [ ] Hero menggunakan warna pertemuan yang benar (lihat tabel § 2)
- [ ] `hero-arch` div berada __di dalam__ `.hero` (BUG-03)
- [ ] `.steps-wrap` memiliki `position:sticky; top:52px` (BUG-02)
- [ ] `.sec.locked` dan `.quiz-sec.locked` menggunakan `opacity` bukan `display:none` (BUG-01)
- [ ] Minimal 1 diagram visual (SVG atau CSS Grid) per slide

### JavaScript
- [ ] `applyState()` loop semua `TOTAL_SECS`, bukan iterasi `done` (BUG-04)
- [ ] `STORAGE_KEY` / `LAB_KEY` menggunakan format yang benar (lihat § 1)
- [ ] Progress bar topbar berfungsi saat reload
- [ ] Dark mode berfungsi (test dengan DevTools → Rendering → prefers-color-scheme: dark)

### Konten HTML
- [ ] Tidak ada format tanda bintang markdown — semua sudah `<em>HTML</em>` (BUG-07)
- [ ] Semua `<--` di dalam `code-box` sudah di-escape jadi `&lt;--` (BUG-05)
- [ ] `.code-box` memiliki `white-space:pre` (BUG-06)
- [ ] `.code-hd` memiliki `white-space:normal`
- [ ] Ada contoh dari konteks Indonesia (BMT, BPRS, perusahaan lokal)
- [ ] Ada seksi Nilai Syariah dengan ayat/hadis lengkap

### Kuis
- [ ] `MCQ_ANSWERS` dan `MATCH_CORRECT` sudah benar (verifikasi manual)
- [ ] Setiap pilihan MCQ punya feedback `.opt-fb`
- [ ] Ambang lulus 75% tercantum di `.quiz-hd-sub`
- [ ] Completion box muncul saat lulus kuis

---

## Riwayat Perubahan

| Tanggal | Perubahan |
|---|---|
| Sep 2026 | Versi pertama panduan |
| Sep 2026 | __Update besar:__ Tambah BUG-01 s/d BUG-07 dari audit P01–P03 SIA; tambah standar Praktikum; koreksi warna P02/P03; tambah § Konten S3; tambah tabel ERP Indonesia; tambah script Python fix asterisk; perluas cakupan ke ADA & BIV |

---

_Panduan ini mencakup semua temuan dari sesi audit September 2026 yang meliputi Pertemuan 01–03 SIA beserta lembar praktikumnya._
