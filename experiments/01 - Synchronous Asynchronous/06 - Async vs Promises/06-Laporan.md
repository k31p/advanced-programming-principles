# 06 - Async vs Promises

## 1. Identifikasi Problem

Pada dasarnya, Async/Await dan Promises adalah dua pendekatan untuk menangani operasi asynchronous di JavaScript. Keduanya memiliki kelebihan dan kekurangan tergantung pada kasus penggunaan. Identifikasi problem ini berfokus pada bagaimana perbedaan dalam cara penggunaan Async/Await dan Promises dapat memengaruhi efisiensi, kejelasan kode, dan penanganan error dalam program.

## 2. Deskripsi Problem

**Problem:** Perbedaan utama antara Async/Await dan Promises adalah dalam sintaks dan cara mereka mengelola operasi asynchronous. Async/Await sering dianggap lebih mudah dibaca dan ditulis, sementara Promises memberikan lebih banyak fleksibilitas dalam chaining (rantai) operasi asynchronous.

**Contoh Kasus:** Misalkan kita memiliki sebuah aplikasi yang harus melakukan beberapa operasi HTTP secara berurutan, seperti mengambil data pengguna, memprosesnya, dan menyimpan hasilnya. Pertanyaannya adalah: Apakah penggunaan Async/Await atau Promises lebih efisien dan lebih mudah dikelola?

## 3. Metodologi Experiment

Langkah-langkah

- Buat dua implementasi untuk menyelesaikan tugas yang sama, satu menggunakan Promises dan yang lain menggunakan Async/Await.
- Ukur dan bandingkan waktu eksekusi, kejelasan kode, dan kemudahan debugging untuk kedua implementasi.
- Amati bagaimana masing-masing pendekatan menangani error.

## 4. Pelaksanaan Experiment

Kode dengan Promises:

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 1000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${data} processed`);
    }, 1000);
  });
}

function saveData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${data} saved`);
    }, 1000);
  });
}

fetchData()
  .then((data) => processData(data))
  .then((processedData) => saveData(processedData))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

Kode dengan Async/Await:

```js
async function handleData() {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    const result = await saveData(processedData);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

handleData();
```

## 5. Analisis Hasil Experiment

Hasil:

- Kejelasan Kode: Kode dengan Async/Await lebih mudah dibaca dan dipahami karena menggunakan struktur kode yang lebih mirip dengan kode synchronous.
- Penanganan Error: Async/Await menangani error dengan cara yang lebih intuitif menggunakan `try...catch`, sementara Promises membutuhkan chaining dengan `.catch()`.
- Waktu Eksekusi: Kedua metode tersebut memiliki waktu eksekusi yang hampir sama, tetapi implementasi Async/Await bisa lebih efisien dalam kasus kode yang kompleks karena lebih sedikit chaining yang diperlukan.
