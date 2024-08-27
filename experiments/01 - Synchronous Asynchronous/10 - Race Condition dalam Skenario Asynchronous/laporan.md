# Laporan: Race Condition dalam Operasi Asynchronous

## 1. Pengertian Race Condition

Race condition terjadi ketika dua atau lebih proses atau thread asynchronous bersaing untuk mengakses atau memodifikasi sumber daya yang sama secara bersamaan tanpa kontrol sinkronisasi yang memadai. Hal ini dapat menyebabkan perilaku yang tidak terduga atau hasil yang tidak konsisten.

## 2. Contoh Sederhana

Misalkan ada dua thread yang mencoba memperbarui variabel global `shared_counter` secara bersamaan:

- **Thread A:** Membaca nilai `shared_counter` (misalnya 1000), menambahkan 500, dan menulis nilai baru.
- **Thread B:** Membaca nilai `shared_counter` (masih 1000), menarik 300, dan menulis nilai baru.

Jika kedua thread membaca nilai sebelum salah satu menulis, hasil akhirnya bisa jadi salah karena kedua thread mungkin menulis nilai mereka sendiri yang tidak memperhitungkan perubahan yang dilakukan oleh thread lainnya.

## 3. Mengidentifikasi Race Condition

Langkah-langkah mengidentifikasi race condition:

1. **Analisis Kode:** Tinjau bagian kode yang melibatkan akses bersama ke sumber daya.
2. **Pengujian dan Reproduksi:** Jalankan pengujian stres dan test case spesifik untuk memicu race condition.
3. **Pemantauan dan Logging:** Gunakan logging dan alat pemantauan untuk melacak urutan eksekusi dan perubahan data.

## 4. Mengatasi Race Condition

### 4.1 Mekanisme Sinkronisasi

- **Mutex (`threading.Lock`):** Menggunakan lock untuk memastikan hanya satu thread dapat mengakses sumber daya pada satu waktu.
- **Semaphore (`threading.Semaphore`):** Mengontrol akses ke sumber daya dengan membatasi jumlah thread yang dapat mengaksesnya secara bersamaan.

### 4.2 Operasi Atomik

Gunakan operasi atomik yang dilakukan dalam satu langkah untuk mencegah gangguan oleh thread lain.

### 4.3 Desain Ulang Arsitektur

Kurangi kebutuhan akses bersama dengan merancang sistem yang meminimalkan bagian kode yang membutuhkan sinkronisasi.

### 4.4 Immutable Data Structures

Gunakan struktur data yang tidak dapat diubah setelah dibuat untuk menghindari masalah akses bersama.

## 5. Simulasi dan Solusi

### 5.1 Simulasi Race Condition

Contoh kode menggunakan Python dan threading untuk menunjukkan bagaimana race condition dapat terjadi:

```python
import threading
import time

shared_counter = 0

def increment_counter():
    global shared_counter
    for _ in range(1000):
        current_value = shared_counter
        time.sleep(0.01)
        shared_counter = current_value + 1

thread1 = threading.Thread(target=increment_counter)
thread2 = threading.Thread(target=increment_counter)

thread1.start()
thread2.start()

thread1.join()
thread2.join()

print(f"Final counter value: {shared_counter}")
