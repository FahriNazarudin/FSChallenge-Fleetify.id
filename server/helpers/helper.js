// Fungsi sederhana untuk menghitung selisih waktu
      function calculateTimeDifference(time1, time2) {
        try {
          // Parse string waktu menjadi jam dan menit
          const [h1, m1] = time1.split(":").map(Number);
          const [h2, m2] = time2.split(":").map(Number);

          // Buat objek Date untuk kalkulasi
          const date1 = new Date(2000, 0, 1, h1, m1);
          const date2 = new Date(2000, 0, 1, h2, m2);

          // Hitung selisih dalam milliseconds dan konversi ke jam:menit
          const diffMs = Math.abs(date2 - date1);
          const diffMins = Math.floor(diffMs / 60000);
          const hours = Math.floor(diffMins / 60);
          const minutes = diffMins % 60;

          return `${hours}h ${minutes}m`;
        } catch (error) {
          return "0h 0m";
        }
      }

module.exports = {
  calculateTimeDifference,
};