# PRD — Internal Request Hub

## 1. Ringkasan

Internal Request Hub adalah aplikasi web sederhana untuk menerima dan memantau permintaan internal terkait sistem:

1. Request Sistem Baru
2. Request Pengembangan Sistem
3. Error / Bug / Debugging

Requester mengisi formulir sesuai jenis kebutuhannya, menerima nomor tiket untuk melakukan pelacakan, dan tim engineer memperbarui status melalui dashboard internal. Seluruh data tiket disimpan di spreadsheet; aplikasi tidak menggunakan database.

Requester hanya melihat menu **Request** dan **Lacak**. Dashboard tidak menjadi menu requester dan hanya tersedia setelah login engineer.

## 2. Tujuan dan indikator keberhasilan

### Tujuan

- Memusatkan request internal agar tidak tercecer di chat pribadi.
- Memudahkan requester non-teknis melaporkan kebutuhan atau masalah tanpa istilah teknis.
- Memberi tim engineer satu dashboard untuk melihat dan memperbarui tiket.
- Memberi requester visibilitas atas progres tiketnya.

### Indikator keberhasilan

- Requester dapat memilih satu dari tiga jenis request sebelum melihat formulir.
- Formulir yang tampil hanya memuat field yang relevan dengan jenis request tersebut.
- Setiap submit yang valid membuat satu baris tiket di spreadsheet dan menghasilkan nomor tiket unik.
- Request baru memicu notifikasi WhatsApp setelah tiket berhasil dicatat.
- Requester dapat melihat status, pembaruan terakhir, dan ringkasan progres menggunakan nomor tiketnya.
- Engineer dapat memfilter, membuka, serta memperbarui status dan progres tiket dari dashboard.

## 3. Pengguna

| Pengguna | Kebutuhan utama |
| --- | --- |
| Requester internal | Mengirim request sederhana dan memantau progresnya. |
| Engineer / admin internal | Melihat request masuk, melakukan klasifikasi teknis, serta memperbarui status dan progres. |

## 4. Ruang lingkup

### Termasuk

- Halaman awal pemilihan jenis request.
- Tiga formulir dinamis sesuai kebutuhan.
- Validasi field wajib dan pesan submit berhasil/gagal.
- Pembuatan nomor tiket dan pencatatan seluruh data tiket ke spreadsheet.
- Pengiriman notifikasi WhatsApp untuk tiket baru.
- Halaman tracking requester berdasarkan nomor tiket.
- Dashboard internal untuk monitoring, filter sederhana, melihat detail, dan memperbarui data tiket.

### Tidak termasuk

- Database, ORM, atau migrasi database.
- Formulir teknis untuk requester seperti severity, environment, stack trace, endpoint, atau database.
- Sistem approval berjenjang, SLA, otomatisasi prioritas, AI, email, atau integrasi issue tracker lain.
- Chat/komentar dua arah, manajemen proyek, penugasan sprint, maupun estimasi pengerjaan.
- Notifikasi WhatsApp untuk setiap perubahan status; pada versi ini WhatsApp hanya wajib untuk tiket baru.

## 5. Alur pengguna

```text
Requester
  → memilih jenis request
  → mengisi formulir relevan
  → submit & validasi
  → tiket dicatat ke spreadsheet + nomor tiket dibuat
  → notifikasi tiket baru dikirim ke WhatsApp
  → requester melacak tiket dengan nomor tiket

Engineer / admin
  → membuka dashboard
  → melihat detail dan melakukan klasifikasi teknis internal bila diperlukan
  → memperbarui status dan ringkasan progres
  → perubahan disimpan ke spreadsheet
  → requester melihat pembaruan pada halaman tracking
```

## 6. Kebutuhan fungsional

### 6.1 Halaman pemilihan

Halaman pertama hanya menampilkan tiga pilihan berikut:

1. **Request Sistem Baru**
2. **Request Pengembangan Sistem**
3. **Error / Bug / Debugging**

Setelah requester memilih satu pilihan, aplikasi menampilkan formulir terkait. Requester tidak melihat field dari jenis request lain.

### 6.2 Form Request Sistem Baru

| Field | Wajib | Catatan |
| --- | --- | --- |
| Nama | Ya | Nama requester. |
| Divisi | Ya | Divisi requester. |
| Nama kebutuhan | Ya | Judul singkat kebutuhan sistem. |
| Masalah yang sedang terjadi | Ya | Penjelasan dengan bahasa bisnis/non-teknis. |
| Apa yang diharapkan | Ya | Hasil yang diinginkan. |
| Siapa yang akan menggunakan | Ya | Pengguna atau kelompok pengguna sistem. |
| Tingkat urgensi | Ya | Pilihan: Rendah, Sedang, Tinggi, Mendesak. |
| Deadline | Tidak | Diisi hanya bila ada. |
| Lampiran | Tidak | File atau tautan pendukung bila ada. |

### 6.3 Form Pengembangan Sistem Existing

| Field | Wajib | Catatan |
| --- | --- | --- |
| Nama | Ya | Nama requester. |
| Divisi | Ya | Divisi requester. |
| Pilih sistem | Ya | Dipilih dari daftar sistem yang dikelola. |
| Apa yang ingin ditambahkan/diubah | Ya | Penjelasan perubahan yang diinginkan. |
| Alasan perubahan | Ya | Alasan atau manfaat bisnis. |
| Tingkat urgensi | Ya | Pilihan: Rendah, Sedang, Tinggi, Mendesak. |
| Lampiran | Tidak | File atau tautan pendukung bila ada. |

### 6.4 Form Error / Bug / Debugging

Form ini memakai bahasa sederhana dan tidak meminta data teknis.

| Field | Wajib | Catatan |
| --- | --- | --- |
| Nama pelapor | Ya | Nama orang yang mengalami/melaporkan masalah. |
| Divisi | Ya | Divisi pelapor. |
| Sistem yang bermasalah | Ya | Sistem yang terdampak. |
| Apa yang terjadi? | Ya | Deskripsi masalah dengan bahasa biasa. |
| Sejak kapan? | Ya | Tanggal/waktu atau perkiraan sejak masalah muncul. |
| Apakah pekerjaan terhenti? | Ya | Pilihan: Tidak; Sebagian terganggu; Tidak bisa bekerja sama sekali. |
| Screenshot / video error | Tidak | Dianjurkan jika tersedia. |
| Keterangan tambahan | Tidak | Informasi pelengkap. |

Klasifikasi teknis, termasuk severity dan diagnosis, dilakukan oleh engineer setelah tiket masuk dan tidak ditampilkan sebagai kewajiban bagi requester.

### 6.5 Penyimpanan spreadsheet

- Spreadsheet adalah satu-satunya penyimpanan data tiket utama.
- Saat submit valid, sistem membuat nomor tiket unik dan waktu pembuatan, lalu menyimpan satu baris tiket.
- Data khusus setiap jenis request boleh disimpan pada kolom masing-masing agar mudah dibaca di dashboard.
- Kolom minimum bersama: nomor tiket, jenis request, waktu dibuat, nama, divisi, urgensi/dampak pekerjaan, status, ringkasan progres, pembaruan terakhir, lampiran, dan klasifikasi teknis internal.
- Lampiran tidak disimpan sebagai file biner di spreadsheet; spreadsheet hanya menyimpan tautan lampiran.

### 6.6 Notifikasi WhatsApp

Setelah tiket berhasil dicatat, sistem mengirim notifikasi melalui **Fonnte** ke nomor atau grup WhatsApp operasional yang telah ditentukan. Isi minimum notifikasi:

- Nomor tiket
- Jenis request
- Nama dan divisi requester
- Nama kebutuhan/sistem atau ringkasan masalah
- Urgensi atau dampak pekerjaan
- Tautan dashboard/detail tiket bila tersedia

Jika pengiriman WhatsApp gagal, tiket tetap tersimpan dan requester tetap menerima nomor tiket. Tiket tidak boleh dibuat ulang hanya untuk mengulangi notifikasi.

### 6.7 Dashboard internal

Dashboard disediakan untuk engineer/admin internal dan memuat:

- Daftar tiket dengan nomor tiket, jenis, requester, divisi, ringkasan, urgensi/dampak, status, dan waktu pembaruan terakhir.
- Filter sederhana berdasarkan jenis request, status, divisi, dan urgensi/dampak.
- Ringkasan jumlah tiket per status.
- Halaman/detail tiket yang menampilkan seluruh data pengajuan dan tautan lampiran.
- Aksi untuk memperbarui status, ringkasan progres requester, klasifikasi teknis internal, dan data tiket yang diperlukan.

Admin juga dapat menambah serta mengaktifkan/nonaktifkan daftar sistem yang muncul pada form pengembangan/bug, dan mengelola user engineer (role serta status aktif). User engineer awal memiliki username `admin`; password awal berasal dari secret deployment, bukan source code.

Tidak diperlukan laporan analitik lanjutan atau fitur manajemen proyek pada versi ini.

### 6.8 Tracking requester

- Setelah submit, requester menerima nomor tiket unik.
- Halaman tracking menerima nomor tiket dan menampilkan jenis request, status, ringkasan progres yang dapat dibagikan, serta waktu pembaruan terakhir.
- Catatan teknis internal tidak ditampilkan kepada requester.

## 7. Status tiket dan aturan pembaruan

| Status | Arti |
| --- | --- |
| Baru | Tiket berhasil masuk dan belum ditinjau. |
| Ditinjau | Engineer/admin sedang memahami dan mengklasifikasikan request. |
| Menunggu Informasi | Requester perlu memberikan informasi tambahan. |
| Dijadwalkan | Request telah diterima dan menunggu/masuk jadwal pengerjaan. |
| Dikerjakan | Pengerjaan atau investigasi sedang berlangsung. |
| Selesai | Request atau perbaikan telah selesai. |
| Ditolak / Dibatalkan | Request tidak akan dikerjakan atau dibatalkan. |

Aturan:

- Setiap perubahan status wajib memperbarui waktu pembaruan terakhir.
- Engineer/admin menulis ringkasan progres singkat yang layak dilihat requester.
- Status awal semua tiket adalah **Baru**.
- Urgensi dari requester adalah masukan, bukan klasifikasi teknis final.
- Dampak pekerjaan pada form error menjadi bahan engineer dalam menetapkan prioritas internal.

## 8. Batasan dan prinsip implementasi

- Prioritaskan aplikasi web sederhana, satu alur submit, dan satu spreadsheet sebagai sumber data.
- Gunakan bahasa Indonesia yang mudah dipahami requester non-teknis.
- Form harus nyaman digunakan di ponsel maupun desktop.
- Validasi hanya pada field wajib dan format dasar; jangan membuat wizard atau aturan bisnis kompleks.
- Akses dashboard menggunakan sesi cookie HTTP-only. Login dibatasi untuk user engineer aktif yang tersimpan di spreadsheet; aksi manajemen sistem dan user hanya tersedia untuk role admin.
- Jangan menambah dependensi, layanan, atau proses baru kecuali diperlukan untuk spreadsheet, penyimpanan lampiran, dan notifikasi WhatsApp yang disetujui.

## 9. Keputusan yang perlu dikonfirmasi sebelum implementasi

1. Lokasi penyimpanan lampiran dan batas tipe/ukuran file; sistem hanya menyimpan tautannya di spreadsheet.
2. Nomor/grup WhatsApp tujuan Fonnte.
3. Apakah pelacakan berdasarkan nomor tiket saja sudah memadai untuk kebijakan internal.

## 10. Kriteria penerimaan versi pertama

- [ ] Halaman awal hanya berisi tiga jenis request yang ditentukan.
- [ ] Masing-masing jenis menampilkan persis field formulir pada bagian 6.2, 6.3, atau 6.4.
- [ ] Submit valid mencatat satu tiket unik ke spreadsheet tanpa database.
- [ ] Requester melihat nomor tiket setelah submit.
- [ ] Request baru menghasilkan notifikasi WhatsApp dengan informasi minimum.
- [ ] Dashboard dapat menampilkan, memfilter, melihat detail, dan memperbarui tiket.
- [ ] Pembaruan status/progres di dashboard terlihat pada halaman tracking requester.
- [ ] Requester tidak diwajibkan mengisi istilah atau detail teknis.
