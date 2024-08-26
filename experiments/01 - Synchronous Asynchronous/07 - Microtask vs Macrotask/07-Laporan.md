# 07 - Microtask vs Macrotask

## 1. Identifikasi Problem

Pada JavaScript, pengelolaan tugas asynchronous dilakukan melalui event loop yang melibatkan dua jenis antrian tugas utama: Microtask dan Macrotask. Pemahaman yang jelas tentang bagaimana dan kapan tugas-tugas ini dieksekusi sangat penting untuk memastikan program berjalan dengan lancar dan sesuai harapan. Namun, seringkali terjadi kebingungan mengenai prioritas eksekusi antara Microtask dan Macrotask, serta bagaimana perbedaan ini dapat mempengaruhi hasil akhir dari program.

**Problem:** Bagaimana perbedaan antara Microtask dan Macrotask mempengaruhi urutan eksekusi dalam JavaScript, dan apa dampaknya terhadap perilaku program?

## 2. Deskripsi Problem

JavaScript adalah bahasa pemrograman single-threaded yang menggunakan event loop untuk menangani operasi asynchronous. Dalam event loop, ada dua jenis antrian utama untuk tugas asynchronous:

**- Microtask:** Tugas kecil dengan prioritas tinggi yang dieksekusi setelah semua tugas synchronous selesai dan sebelum tugas-tugas lain yang lebih besar (Macrotask) dijalankan. Contoh: Promise, process.nextTick.

**- Macrotask:** Tugas yang memiliki prioritas lebih rendah dibandingkan Microtask dan biasanya digunakan untuk operasi yang memerlukan waktu lebih lama atau menunggu input/output. Contoh: setTimeout, setInterval, event handler.

**Masalah yang Diidentifikasi:** Ketika program memiliki kombinasi Microtask dan Macrotask, urutan eksekusi dapat menjadi tidak terduga bagi pengembang yang tidak memahami mekanisme ini. Hal ini dapat menyebabkan perilaku program yang tidak diinginkan atau sulit dipahami.

## 3. Metodologi Experiment

Untuk memahami perbedaan dan dampak antara Microtask dan Macrotask, akan dilakukan eksperimen dengan langkah-langkah berikut:

    1. Merancang skenario tes yang melibatkan eksekusi tugas synchronous, Microtask, dan Macrotask.

    2. Menjalankan kode JavaScript dengan berbagai kombinasi Microtask dan Macrotask untuk mengamati urutan eksekusi.

    3. Mencatat hasil eksekusi dalam urutan yang terjadi.

    4. Menganalisis hasil untuk memahami bagaimana event loop memproses Microtask dan Macrotask dan dampaknya terhadap alur program.

## 4. Pelaksanaan Experiment

Kode dibawah ini berisikan Microtask, Macrotask, dan Synchronous sebagai parameter perbandingan :

    ```js
console.log("Start of Test"); // kode synchronous

setTimeout(() => {
    console.log("Macrotask - Tested")}); // Macrotask - asynchronous

let promiseTask = new Promise((resolve, reject) => {resolve();})

promiseTask.then(() => {
    console.log("Microtask - Tested")}); // Microtask - asynchronous

console.log("End of Test"); // kode synchronous
    ```

Langkah-Langkah Eksperimen:

    1. Eksekusi Kode Synchronous:

    - Cetak "Start".

    - Cetak "End".

    2. Penjadwalan Macrotask:

    setTimeout() dijadwalkan untuk mencetak "Macrotask - setTimeout" setelah 0 ms, masuk ke antrian Macrotask.

    3. Penjadwalan Microtask:

    Promise.resolve().then() dijadwalkan untuk mencetak "Microtask - Promise", masuk ke antrian Microtask.

    4. Pengamatan Urutan Eksekusi:

    Setelah kode synchronous selesai dieksekusi, Microtask dieksekusi terlebih dahulu, kemudian diikuti oleh Macrotask.

Hasil Uji Coba :

    ```js
Start
End
Microtask - Promise
Macrotask - setTimeout
    ```

## 5. Analisis Hasil Experiment

**Hasil Eksperimen menunjukkan bahwa:**

**- Kode synchronous (console.log('Start')** dan **console.log('End'))** dieksekusi terlebih dahulu, sesuai dengan sifat JavaScript yang single-threaded.

**- Microtask (Promise.resolve().then()):** Dieksekusi segera setelah semua kode synchronous selesai, tetapi sebelum Macrotask dijalankan. Ini menunjukkan bahwa Microtask memiliki prioritas lebih tinggi daripada Macrotask.

**- Macrotask (setTimeout()):** Dieksekusi terakhir, setelah semua Microtask selesai.

**Kesimpulan:**

- Microtask diprioritaskan di atas Macrotask oleh event loop, yang memungkinkan tugas-tugas kecil untuk diselesaikan sebelum Macrotask dijalankan.

- Urutan eksekusi yang dipengaruhi oleh Microtask dan Macrotask dapat mempengaruhi hasil akhir program. Misalnya, jika ada tugas penting yang bergantung pada penyelesaian Promise, maka tugas tersebut akan dijamin selesai sebelum Macrotask lainnya dieksekusi.

- Memahami perbedaan ini sangat penting untuk pengembang yang ingin mengontrol alur program dengan lebih presisi, terutama dalam konteks operasi asynchronous yang kompleks.
