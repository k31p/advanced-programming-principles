# Blocking vs Non-blocking I/O Operations

## Tujuan

- Menjelaskan konsep umum blocking dan non-blocking I/O.
- Menjelaskan cara kerja blocking dan non-blocking I/O dalam konteks sistem operasi.
- Analisis implikasi hasil dalam skenario dunia nyata atau aplikasi praktis.

## Landsan Teori

**Input/Output (I/O) Operations** merujuk pada interaksi antara program komputer dengan sumber daya eksternal seperti file, jaringan, atau perangkat lainnya. Dalam konteks ini, fokusnya adalah pada operasi file.

**Synchronous** berarti bahwa operasi dilakukan satu per satu, dalam urutan yang ditentukan. Setiap operasi harus selesai sebelum operasi berikutnya dapat dimulai. Dalam konteks I/O, ini berarti program akan menunggu sampai operasi I/O selesai sebelum melanjutkan ke langkah berikutnya. **Blocking I/O** adalah tipe operasi I/O yang bekerja secara *Synchronous*. Ketika sebuah operasi I/O blocking terjadi, thread yang menjalankan operasi tersebut akan terblokir dan tidak bisa melanjutkan eksekusi hingga operasi selesai. Ini menyebabkan program harus menunggu, sehingga seluruh proses berjalan dalam urutan linier tanpa interupsi.

**Asynchronous** berarti operasi tidak harus menunggu satu sama lain selesai. Program dapat melanjutkan eksekusi sementara operasi I/O masih berjalan di latar belakang. Ketika operasi I/O selesai, hasilnya akan ditangani oleh mekanisme *callback*, *promise*, atau *async/await*. **Non-Blocking I/O** adalah tipe operasi I/O yang bekerja secara *Asynchronous*. Dalam operasi non-blocking, program tidak perlu menunggu operasi I/O selesai sebelum melanjutkan. Ini memungkinkan program untuk tetap responsif dan efisien, terutama saat menangani banyak operasi I/O sekaligus.

## Alat dan Bahan

**Visual Studio Code**  dan **Node.js**
Node.js adalah runtime yang dapat menjalankan JavaScript di luar browser. Node.js memiliki API bawaan yang mudah digunakan untuk eksperimen ini.

## Prosedur Kerja

Buat dua Script terpisah, satu untuk operasi I/O blocking dan satu untuk non-blocking.

JavaScript umumnya single-threaded dan asynchronous, sehingga operasi I/O blocking biasanya tidak umum dilakukan. Namun, fungsi blocking seperti `readFileSync` dari modul `fs` (File System) akan digunakan sebagai contoh.

**Blocking I/O:**

```javascript
const fs = require('fs');
console.time('Blocking I/O Time');

for (let i = 0; i < 10; i++) {
    console.time(`Read ${i + 1}`);
    const data = fs.readFileSync('largefile.txt', 'utf8');
    console.timeEnd(`Read ${i + 1}`);
    console.log(`Read ${i + 1}:`, data.length, 'characters');
}

console.timeEnd('Blocking I/O Time');
```

Pada kode ini, `fs.readFileSync` adalah operasi blocking. Program akan menunggu hingga file `largefile.txt` selesai dibaca sebelum melanjutkan ke baris kode berikutnya.

**Non-Blocking I/O:**

```javascript
const fs = require('fs');
console.time('Non-Blocking I/O Time');

for (let i = 0; i < 10; i++) {
    console.time(`Read ${i + 1}`);
    fs.readFile('largefile.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.timeEnd(`Read ${i + 1}`);
        console.log(`Read ${i + 1}:`, data.length, 'characters');
    });
}

console.timeEnd('Non-Blocking I/O Time');
```

Pada kode ini, `fs.readFile` adalah operasi non-blocking. Program akan melanjutkan eksekusi ke baris berikutnya tanpa menunggu pembacaan file selesai.

Simpan kedua contoh kode tersebut dalam file terpisah (blocking.js dan nonblocking.js).

Jalankan kode-kode tersebut menggunakan perintah node blocking.js dan node nonblocking.js. Perhatikan urutan output di Console.

## Hasil Pengamatan

### Blocking I/O Output

```text
Read 1: 3.763ms
Read 1: 682290 characters
Read 2: 2.311ms
Read 2: 682290 characters
Read 3: 2.665ms
Read 3: 682290 characters
Read 4: 3.649ms
Read 4: 682290 characters
Read 5: 2.382ms
Read 5: 682290 characters
Read 6: 1.923ms
Read 6: 682290 characters
Read 7: 2.136ms
Read 7: 682290 characters
Read 8: 3.05ms
Read 8: 682290 characters
Read 9: 2.802ms
Read 9: 682290 characters
Read 10: 3.626ms
Read 10: 682290 characters
Blocking I/O Time: 43.705ms
```

Terlihat bahwa setiap file dibaca secara berurutan. Artinya, pembacaan file berikutnya dimulai hanya setelah pembacaan file sebelumnya selesai.

Waktu yang dihabiskan untuk membaca setiap file secara individu (seperti yang terlihat di Read 1: 3.763ms, Read 2: 2.311ms, dll.) bervariasi tetapi umumnya berada dalam rentang beberapa milidetik. Waktu total yang dihabiskan untuk melakukan semua pembacaan file secara blocking adalah 43.705ms. Ini menunjukkan bahwa setiap operasi pembacaan file menyebabkan penundaan sebelum operasi berikutnya dapat dimulai, sehingga total waktu menjadi cukup besar.

### Non-Blocking I/O Output

```text
Non-Blocking I/O Time: 1.905ms
Read 2: 15.263ms
Read 2: 682290 characters 
Read 3: 18.427ms
Read 3: 682290 characters 
Read 1: 21.703ms
Read 1: 682290 characters 
Read 4: 21.597ms
Read 4: 682290 characters 
Read 5: 22.957ms
Read 5: 682290 characters 
Read 6: 24.135ms
Read 6: 682290 characters 
Read 8: 25.379ms
Read 8: 682290 characters 
Read 10: 26.788ms
Read 10: 682290 characters
Read 7: 28.522ms
Read 7: 682290 characters 
Read 9: 29.874ms
Read 9: 682290 characters
```

Pada non-blocking I/O, setiap pembacaan file dimulai secara paralel, hampir bersamaan. Hal ini terlihat dari waktu yang lebih pendek antara satu pembacaan file dengan yang lain (Read 1: 21.703ms, Read 2: 15.263ms, dll.). Waktu total yang dihabiskan untuk semua pembacaan file secara non-blocking adalah 3.398ms, yang jauh lebih cepat dibandingkan dengan metode blocking. Ini karena operasi I/O tidak saling menunggu dan dilakukan secara bersamaan.

Waktu untuk setiap pembacaan file secara individu juga terbilang singkat, dan seperti yang terlihat, pembacaan file berlangsung hampir bersamaan.

## Pembahasan

### 1. Blocking I/O

Dalam operasi blocking I/O, ketika sebuah program meminta data dari sumber eksternal (seperti file, jaringan, atau database), program tersebut akan berhenti sejenak dan menunggu hingga data yang diminta selesai diterima sebelum melanjutkan eksekusi ke baris kode berikutnya. **Saat program melakukan operasi blocking, thread yang menjalankan kode tersebut "diblokir" atau "di-hold" sampai operasi selesai. Ini berarti CPU tidak bisa menjalankan instruksi lain pada thread tersebut sampai I/O selesai.** Misalkan program memanggil sebuah fungsi untuk membaca file. Dalam pendekatan blocking, program akan berhenti di titik ini sampai seluruh file selesai dibaca dari disk, lalu baru melanjutkan ke perintah berikutnya. Jika operasi pembacaan file memakan waktu lama (misalnya karena file besar atau disk lambat), program akan tetap "terhenti" selama waktu tersebut.

Keuntungan:

- Sederhana untuk diimplementasikan dan dipahami karena urutan eksekusi yang linier dan prediktif.
- Cocok untuk operasi yang tidak memerlukan banyak operasi I/O atau dalam skenario di mana I/O sangat cepat.

Kelemahan:

- Tidak efisien dalam menangani operasi I/O yang memakan waktu lama atau banyak operasi I/O secara paralel, karena thread yang menjalankan kode tersebut terblokir dan tidak dapat melakukan tugas lain.

Dalam beberapa aplikasi di mana alur kerja sangat spesifik dan urutan operasi harus diikuti dengan tepat, Blocking I/O membantu menjaga konsistensi dan prediktabilitas. Aplikasi yang harus memproses data dalam urutan tertentu dan tidak boleh melanjutkan sebelum langkah sebelumnya mungkin diuntungkan dengan penggunaan Blocking I/O. Contohnya, Sebuah aplikasi backup data yang perlu memastikan bahwa satu file sepenuhnya di-backup sebelum melanjutkan ke file berikutnya.

Selama tahap pengembangan atau debugging, Blocking I/O seringkali lebih mudah diikuti dan di-debug karena urutan eksekusi yang linier dan prediktif. Ini membantu developer untuk dengan mudah melacak dan mengidentifikasi masalah karena setiap operasi dijalankan satu per satu.

### 2. Non-Blocking I/O

Dalam operasi non-blocking I/O, ketika sebuah program meminta data dari sumber eksternal, program tidak menunggu hasil tersebut untuk melanjutkan eksekusi. Sebaliknya, program akan segera melanjutkan ke baris kode berikutnya dan menunggu data tersebut selesai diambil dengan cara asinkron. Biasanya, operasi non-blocking menggunakan callback, promises, atau async/await untuk menangani data yang masuk setelah I/O selesai. **Artinya, eksekusi program tidak "terhenti", dan thread yang menjalankan kode tersebut bisa melakukan tugas lain sementara menunggu operasi I/O selesai.** Misalkan program memanggil sebuah fungsi untuk membaca file. Dalam pendekatan non-blocking, program akan memulai proses pembacaan file, tapi tidak akan menunggu hasilnya dan langsung melanjutkan ke perintah berikutnya. Saat file sudah siap dibaca, callback atau promise akan dieksekusi untuk menangani data tersebut.

Keuntungan:

- Lebih efisien untuk aplikasi yang membutuhkan penanganan banyak operasi I/O secara paralel, seperti server web yang harus menangani banyak permintaan dari klien secara bersamaan.
- Program tetap responsif dan mampu menjalankan tugas lain sembari menunggu operasi I/O selesai.

Kelemahan:

- Lebih kompleks untuk diimplementasikan, terutama untuk developer yang baru belajar, karena program tidak berjalan secara linier.
- Penggunaan callback atau promises bisa membuat kode menjadi lebih sulit dibaca dan dipelihara jika tidak ditulis dengan baik (misalnya, dalam kasus "callback hell").

Pada server web yang harus menangani ribuan permintaan secara bersamaan, blocking I/O akan menyebabkan penundaan besar, karena setiap permintaan harus menunggu operasi I/O sebelumnya selesai. Non-blocking I/O memungkinkan server menangani permintaan baru sementara menunggu data dari permintaan sebelumnya, sehingga lebih efisien.

## Kesimpulan

- Blocking I/O: Pada operasi I/O yang bersifat blocking, program akan menunggu sampai operasi I/O selesai sebelum melanjutkan ke baris kode berikutnya. Artinya, thread yang menjalankan kode tersebut akan "terhenti" sementara waktu.

- Non-Blocking I/O: Pada operasi I/O yang bersifat non-blocking, program tidak perlu menunggu operasi I/O selesai dan bisa langsung melanjutkan eksekusi ke baris kode berikutnya. Biasanya, ini dilakukan dengan menggunakan callback, promises, atau async/await.