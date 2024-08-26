# 05 - Promise.all vs Promise.race

## 1. Identifikasi Problem

Dalam pemrograman asinkron di JavaScript, kita sering berhadapan dengan skenario di mana kita perlu menangani banyak promise secara bersamaan. Dua metode yang sering digunakan untuk mengelola beberapa promise adalah Promise.all dan Promise.race. Pertanyaan yang muncul adalah, dalam situasi apa kita harus menggunakan masing-masing metode dan bagaimana hasilnya berbeda?

## 2. Deskripsi Problem

**- Promise.all:** Mengambil array dari promise dan mengembalikan sebuah promise yang resolve ketika semua promise di dalam array tersebut selesai. Jika salah satu promise reject, maka Promise.all akan langsung reject dengan error tersebut.

**- Promise.race:** Mengambil array dari promise dan mengembalikan sebuah promise yang resolve atau reject sesuai dengan promise yang paling cepat selesai (resolve atau reject).

Kita akan membandingkan kedua metode ini dengan beberapa contoh kode untuk melihat bagaimana mereka berperilaku.

## 3. Metodologi Experiment

1. Buat tiga promise dengan waktu penyelesaian yang berbeda.
2. Uji Promise.all dengan semua promise berhasil resolve.
3. Uji Promise.all dengan salah satu promise yang reject.
4. Uji Promise.race dengan semua promise berhasil resolve.
5. Uji Promise.race dengan salah satu promise yang reject.
6. Catat hasil setiap eksperimen.

## 4. Pelaksanaan Experiment

### Eksperimen 1: Promise.all dengan semua promise resolve

```js
const myPromise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 1 resolved');
    }, 250);
});

const myPromise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 2 resolved');
    }, 500);
});

const myPromise3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 3 resolved');
    }, 1000);
});

const myPromises = [myPromise1, myPromise2, myPromise3];

Promise.all(myPromises)
    .then((res) => {console.log(res);})
    .catch((err) => {console.log("Error!");});

```

**Hasil :**

```js
["Promise 1 resolved", "Promise 2 resolved", "Promise 3 resolved"]
```

### Eksperimen 2: Promise.all dengan salah satu promise reject

```js
const myPromise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 1 resolved');
    }, 250);
});

const myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 2 rejected');
    }, 500);
});

const myPromise3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 3 resolved');
    }, 1000);
});

const myPromises = [myPromise1, myPromise2, myPromise3];

Promise.all(myPromises)
    .then((res) => {console.log(res);})
    .catch((err) => {console.log("Error!");});

```

**Hasil :**

```js
Error!
```

### Eksperimen 3: Promise.race dengan semua promise resolve

```js
const myPromise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 1 resolved');
    }, 250);
});

const myPromise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 2 resolved');
    }, 500);
});

const myPromise3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 3 resolved');
    }, 1000);
});

const myPromises = [myPromise1, myPromise2, myPromise3];

Promise.race(myPromises)
    .then((res) => {console.log(res);})
    .catch((err) => {console.log("Error!");});

```

**Hasil :**

```js
"Promise 1 resolved"
```

### Eksperimen 4: Promise.race dengan salah satu promise reject

```js
const myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 1 rejected');
    }, 250);
});

const myPromise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 2 resolved');
    }, 500);
});

const myPromise3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 3 resolved');
    }, 1000);
});

const myPromises = [myPromise1, myPromise2, myPromise3];

Promise.race(myPromises)
    .then((res) => {console.log(res);})
    .catch((err) => {console.log("Error!");});

```

**Hasil :**

```js
Error!
```

## 5. Analisis Hasil Experiment

- Pada 'Promise.all', semua promise harus berhasil resolve agar hasilnya juga resolve. Jika ada salah satu promise yang gagal (reject), seluruh Promise.all akan gagal (reject).

- Pada 'Promise.race', hasil akhir tergantung pada promise yang pertama selesai (baik resolve atau reject). Ini berarti bahwa Promise.race bisa langsung mengembalikan hasil begitu promise tercepat selesai, tanpa menunggu promise lainnya.

**Kesimpulan :**

- Gunakan Promise.all jika Anda perlu menjalankan beberapa operasi yang semuanya harus berhasil sebelum melanjutkan.

- Gunakan Promise.race jika Anda hanya membutuhkan hasil pertama dari sekumpulan promise, baik itu berhasil atau gagal.
