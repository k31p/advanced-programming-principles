// Fungsi asynchronous yang dapat menghasilkan error
async function fetchData() {
    // Simulasi operasi asynchronous
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulasi error
          reject(new Error('Terjadi kesalahan saat mengambil data!'));
          // resolve('Data fetched');
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
        console.error('Error:', error.message);
    } finally {
        // Kode ini selalu dijalankan setelah try dan catch
        console.log('Blok finally dijalankan.');
    }
}

// Jalankan fungsi utama
main();
