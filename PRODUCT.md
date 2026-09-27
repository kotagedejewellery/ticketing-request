# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Requester internal yang perlu mengajukan sistem baru, perubahan sistem, atau melaporkan masalah tanpa istilah teknis.
- Engineer/admin internal yang meninjau, mengklasifikasikan secara teknis, dan memperbarui progres tiket.

## Product Purpose

Memusatkan request internal agar tidak tercecer di chat pribadi, memudahkan pelaporan non-teknis, dan memberi kedua pihak visibilitas progres tiket.

## Positioning

Hub request internal yang memisahkan formulir sederhana untuk requester dari klasifikasi teknis internal engineer, dengan tracking berbasis nomor tiket tanpa menambah database.

## Operating Context

Aplikasi web internal berbahasa Indonesia, digunakan di desktop maupun ponsel. Requester memilih salah satu dari tiga jenis request, mengirim tiket, lalu melacak progresnya. Engineer/admin memantau dan memperbarui data melalui dashboard internal.

## Capabilities and Constraints

- Tiga alur form: Request Sistem Baru, Request Pengembangan Sistem, dan Error / Bug / Debugging.
- Nomor tiket, validasi form, tracking requester, dashboard monitoring/filter/detail, serta pembaruan status dan ringkasan progres.
- Google Sheets adalah satu-satunya penyimpanan tiket, daftar sistem, dan user engineer; aplikasi tidak menggunakan database ataupun `localStorage` untuk data operasional.
- Notifikasi tiket baru dikirim melalui Fonnte setelah tiket tersimpan; kegagalan notifikasi tidak membatalkan tiket.
- Requester hanya memakai menu Request dan Lacak. Dashboard hanya tersedia untuk engineer yang login; admin dapat mengelola sistem form dan user engineer.
- Tidak menggunakan database. Requester tidak diwajibkan mengisi severity, environment, stack trace, endpoint, atau database.
- Keputusan yang masih terbuka: lokasi penyimpanan lampiran dan nomor/grup Fonnte tujuan operasional.

## Evidence on Hand

- PRD: `docs/PRD-ticketing-request.md`
- Scope dan cara menjalankan demo: `README.md`
- Keputusan implementasi awal: `tasks/plan.md`

## Product Principles

- Gunakan bahasa yang mudah dipahami requester non-teknis.
- Tampilkan hanya informasi dan tindakan yang relevan pada tiap alur request.
- Pisahkan progres yang aman dibagikan dari klasifikasi teknis internal.
- Jaga alur pengajuan, tracking, dan monitoring tetap sederhana.
- Jangan menambah layanan atau proses di luar keputusan yang disetujui.
