let counter = 0;

function incrementCounter() {
    const current = counter; // Membaca nilai counter
    setTimeout(() => {
        counter = current + 1; // Menambah 1 ke nilai counter dan menyimpannya kembali
        console.log(`Counter: ${counter}`);
    }, Math.random() * 1000); // Simulasi operasi asynchronous dengan waktu tunda acak
}

// Menjalankan fungsi secara bersamaan
incrementCounter(); // Fungsi pertama
incrementCounter(); // Fungsi kedua
