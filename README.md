# Internal Request Hub

Aplikasi web sederhana untuk menerima, melacak, dan memantau request internal terkait sistem baru, pengembangan sistem, serta error/bug.

## Fitur versi ini

- Tiga formulir terpisah sesuai jenis request, dengan validasi Zod.
- Nomor tiket otomatis dan halaman tracking requester.
- Dashboard engineer: ringkasan status, filter, detail tiket, serta pembaruan status/progres.
- Requester hanya memiliki menu **Request** dan **Lacak**; dashboard berada di balik login engineer.
- Daftar sistem form dan user engineer dikelola admin melalui spreadsheet.
- Pemisahan informasi progres requester dari klasifikasi teknis internal.
- Google Sheets sebagai satu-satunya penyimpanan utama, tanpa database.
- Notifikasi tiket baru melalui Fonnte bila token dan target telah dikonfigurasi.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Konfigurasi production

1. Salin `.env.example` menjadi `.env.local`, lalu isi seluruh nilainya.
2. Aktifkan Google Sheets API pada Google Cloud project dan bagikan spreadsheet target kepada `GOOGLE_SERVICE_ACCOUNT_EMAIL` sebagai Editor.
3. Saat aplikasi pertama kali memuat user engineer, akun `admin` dibuat dengan password dari `INITIAL_ADMIN_PASSWORD`. Setelah itu admin dapat menambah, mengubah role, serta mengaktifkan/nonaktifkan user dari dashboard.
4. Isi `FONNTE_TOKEN` dan `FONNTE_TARGET` (nomor atau ID grup) untuk menerima notifikasi tiket baru.

Google Sheets akan membuat tab `Tickets`, `Systems`, dan `EngineerUsers` secara otomatis. Jangan pernah menyimpan token atau password di source code maupun melakukan commit pada `.env.local`.

## Perintah verifikasi

```bash
npm test
npm run lint
npm run build
```

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Zod, dan Vitest.

## Batas implementasi saat ini

Aplikasi memerlukan kredensial Google Sheets dan Fonnte sebelum dapat digunakan. Saat konfigurasi belum tersedia, request tidak akan disimpan; tidak ada fallback `localStorage` agar data tidak terpecah antarperangkat.

Lihat [PRD](docs/PRD-ticketing-request.md) dan [rencana implementasi](tasks/plan.md) untuk scope dan keputusan yang masih terbuka.
