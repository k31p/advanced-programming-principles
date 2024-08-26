# 08 - Error Handling with Asycn/Await

## 1. Identifikasi Problem

Bagaimana cara menangani error dalam fungsi asynchronous yang menggunakan async/await di JavaScript?

## 2. Deskripsi Problem

Dalam JavaScript, operasi asynchronous seperti pemanggilan API atau pengolahan data biasanya memerlukan penanganan error yang efektif. Saat menggunakan `async/await`, error handling harus dilakukan dengan cara yang sesuai agar aplikasi dapat menangani error secara baik dan tidak mengalami crash atau perilaku tak terduga.

## 3. Metodologi Experiment

Untuk mengidentifikasi cara yang efektif dalam menangani error dengan `async/await`, eksperimen ini akan dilakukan dengan langkah-langkah berikut:

- Membuat fungsi asynchronous yang mengembalikan Promise.
- Menggunakan `await` untuk menangani hasil dari Promise.
- Menangani error dengan blok `try...catch` untuk memastikan error dapat ditangani dengan baik.
- Mengimplementasikan kode dengan contoh operasi yang mungkin gagal untuk mengamati bagaimana error di-handle.

## 4. Pelaksanaan Experiment

Conoth Kode:

```js
// Fungsi asynchronous yang dapat menghasilkan error
async function fetchData() {
  // Simulasi operasi asynchronous
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulasi error
      reject(new Error("Terjadi kesalahan saat mengambil data!"));
    }, 1000);
  });
}

// Fungsi utama untuk memanggil fetchData dan menangani error
async function main() {
  try {
    let result = await fetchData(); // Tunggu hingga fetchData selesai
    console.log(result); // Output data jika berhasil
  } catch (error) {
    // Tangani error jika fetchData gagal
    console.error("Error:", error.message);
  } finally {
    // Kode ini selalu dijalankan setelah try dan catch
    console.log("Blok finally dijalankan.");
  }
}

// Jalankan fungsi utama
main();
```

## 5. Analisis Hasil Experiment

Analisis:

- **Penggunaan `async/await`:** `await` digunakan untuk menunggu Promise dari fetchData hingga selesai. Ini membuat kode terlihat lebih bersih dan mirip dengan kode synchronous.
- **Penanganan Error:** Error dari Promise yang ditolak ditangani dengan blok `catch`, yang menangkap objek error dan mencetak pesan error ke konsol. Ini memastikan bahwa jika terjadi kesalahan, aplikasi tidak crash dan error ditangani dengan baik.
- **Blok `finally`:** Kode dalam blok `finally` dijalankan terlepas dari apakah error terjadi atau tidak, sehingga bisa digunakan untuk membersihkan atau mengeksekusi kode yang harus dilakukan setelah operasi selesai.
