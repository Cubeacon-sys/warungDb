# Pusat Inventaris Warung

Aplikasi manajemen inventaris berbasis web yang dirancang untuk memantau stok, mengelola katalog produk, serta memberikan indikasi otomatis untuk produk dengan stok menipis. Dibuat untuk keperluan presentasi KIK (Kreativitas, Inovasi, dan Kewirausahaan).

---

## Fitur Utama

- Autentikasi Pengguna: Sistem autentikasi terintegrasi menggunakan Supabase Auth.
- Ringkasan Metrik: Pemantauan total jenis barang, total unit stok, dan jumlah barang dengan stok menipis (< 5 unit).
- Pengelolaan Data (CRUD):
  - Penambahan produk baru beserta rincian modal, harga jual, dan stok.
  - Pembaruan (edit) data produk secara langsung.
  - Penghapusan data produk dari katalog.
- Katalog Inventaris: Tampilan daftar barang terstruktur lengkap dengan format mata uang rupiah.

---

## Teknologi

- Frontend: React.js (Vite)
- Styling: Tailwind CSS
- Backend & Database: Supabase (PostgreSQL & Auth)

---

## Panduan Instalasi Lokal

### 1. Prasyarat
Pastikan Node.js dan npm sudah terinstal pada perangkat Anda.

### 2. Kloning Repositori
git clone https://github.com/USERNAME/NAMA_REPO.git
cd NAMA_REPO

### 3. Instal Dependensi
npm install

### 4. Konfigurasi Environment Variable
Buat file `.env.local` pada direktori utama project dan masukan kredensial Supabase Anda:

VITE_SUPABASE_URL=https://URL_SUPABASE_ANDA.supabase.co
VITE_SUPABASE_ANON_KEY=ANON_KEY_SUPABASE_ANDA

### 5. Jalankan Aplikasi
npm run dev

---

## Pengembang

Wisam Yassar Mahardika - KIK (Kreativitas, Inovasi, dan Kewirausahaan)