$(document).ready(function() {
    
   //1. --- HAMBURGER MENU ---
    const $hamburger = $(".hamburger");
    const $navLinks = $(".nav-links");

    $hamburger.on("click", function() {
        $(this).toggleClass("active");
        $navLinks.toggleClass("active");
    });

    $(".hamburger").click(function() {
        $(".nav-links").toggleClass("active");
        $(".nav-links").toggleClass("d-none d-flex flex-column bg-white position-absolute w-100 top-100 start-0 p-3 shadow");
    });

    $(".hamburger").click(function() {
        $(".nav-links").toggleClass("active");
        
        if($(".nav-links").hasClass("active")){
            $(".nav-links").addClass("d-flex flex-column bg-white position-absolute w-100 start-0 top-100 shadow p-4").removeClass("d-none");
        } else {
            $(".nav-links").addClass("d-none").removeClass("d-flex flex-column bg-white position-absolute w-100 start-0 top-100 shadow p-4");
        }
    });

    //2. --- HALAMAN TENTANG ---
    $(document).ready(function() {   
        // Menangkap elemen form saat disubmit
        $("#formWebinar").submit(function(event) {
            let valid = true;

            // Reset Error (Mengosongkan teks error)
            $("#errorNama").text("");
            $("#errorEmail").text("");
            $("#errorNoHP").text("");
            $("#errorSetuju").text("");

            // --- Validasi Nama ---
            if ($("#nama").val().trim().length <= 3) {
                $("#errorNama").text("Minimal 3 karakter.");
                valid = false;
            }

            // --- Validasi Email ---
            const emailValue = $("#email").val();
            const emailPattern = /^[^ ]+@gmail\.com$/i;
            if (!emailPattern.test(emailValue)) {
                $("#errorEmail").text("Email harus @gmail.com dan format benar.");
                valid = false;
            }

            // --- Validasi No HP ---
            if ($("#noHP").val().trim() === "") {
                $("#errorNoHP").text("Nomor Telepon wajib diisi.");
                valid = false;
            }

            // --- Validasi Checkbox ---
            // .is(":checked") digunakan untuk mengecek status checkbox
            if (!$("#setuju").is(":checked")) {
                $("#errorSetuju").text("Ceklist wajib dicentang.");
                valid = false;
            }

            if (!valid) {
                event.preventDefault(); // Mencegah submit jika tidak valid
            } else {
                event.preventDefault(); // Mencegah refresh halaman (karena ini demo)
                alert("Pesan berhasil dikirim");
                
                // Reset form (.trigger("reset") atau akses elemen DOM aslinya [0])
                $(this)[0].reset(); 
            }
        });

        // --- Event Listener Tambahan (BLUR) ---
        
        // Blur pada Nama
        $("#nama").blur(function() {
            if ($(this).val().trim() === "") {
                $("#errorNama").text("Nama wajib diisi");
            } else {
                $("#errorNama").text("");
            }
        });

        // Blur pada Email
        $("#email").blur(function() {
            if ($(this).val().trim() === "") {
                $("#errorEmail").text("Email wajib diisi");
            } else {
                $("#errorEmail").text("");
            }
        });

        // Blur pada No HP
        $("#noHP").blur(function() {
            if ($(this).val().trim() === "") {
                // Saya koreksi teksnya (di kode asli Anda tertulis "Email" untuk error HP)
                $("#errorNoHP").text("Nomor HP wajib diisi");
            } else {
                $("#errorNoHP").text("");
            }
        });

        // --- Event Listener Checkbox (CHANGE) ---
        $("#setuju").change(function() {
            if ($(this).is(":checked")) {
                alert("Anda telah menyetujui syarat dan ketentuan");
                $("#errorSetuju").text(""); // Hapus error jika sudah dicentang
            }
        });

    });

    //3. --- HALAMAN PRODUK ---
    $(document).ready(function() {

        // --- VARIABEL GLOBAL UNTUK TIMER ---
        let timerUsia;
        let timerBelanja;

        // --- 1. BAGIAN TESTIMONI ---
        let testimoni = [
            "Ikan Layang Frozen-nya segar sekali.",
            "Saya pesan Ikan Semar Frozen ukuran besar, puas!",
            "Ikan Salem Frozen sangat berkualitas.",
            "Rasa Ikan Salem Panggangnya luar biasa.",
            "Harga bersaing, kualitas premium."
        ];

        $.each(testimoni, function(index, item) {
            $("<li>")
                .addClass("list-group-item list-group-item-action")
                .text(item)
                .appendTo("#testi");
        });

        // --- 2. LOGIKA KATEGORI USIA ---
        $("#formUsia").on("submit", function(e) {
            e.preventDefault(); // Mencegah reload

            // Reset timer sebelumnya jika user klik cepat
            clearTimeout(timerUsia);

            let usia = parseInt($("#usia").val());
            let pesan = "";
            let warna = "";

            if (!usia) {
                pesan = "Mohon masukkan usia yang valid.";
                warna = "red";
            } else {
                if (usia < 13) {
                    pesan = "Kategori: Anak-anak";
                } else if (usia >= 13 && usia < 18) {
                    pesan = "Kategori: Remaja";
                } else if (usia >= 18 && usia < 60) {
                    pesan = "Kategori: Dewasa";
                } else {
                    pesan = "Kategori: Lansia";
                }
                warna = "#1e3a8a"; // Biru Tua
            }

            // Tampilkan Pesan
            $("#kategori")
                .text(pesan)
                .css("color", warna)
                .stop(true, true).slideDown(); // .stop() mencegah animasi antrian

            // SET TIMER: Hilang setelah 5 detik
            timerUsia = setTimeout(function() {
                $("#kategori").slideUp(); // Efek naik ke atas (hilang)
            }, 6000); 
        });


        // --- 3. LOGIKA HITUNG BELANJA ---
        $("#formBelanja").on("submit", function(e) {
            e.preventDefault(); 

            // Reset timer sebelumnya
            clearTimeout(timerBelanja);

            let harga = parseFloat($("#harga").val());
            let jumlah = parseFloat($("#jumlah").val());

            if (isNaN(harga) || isNaN(jumlah)) {
                $("#total-belanja")
                    .css("color", "red")
                    .text("Mohon isi angka dengan benar.")
                    .stop(true, true).slideDown();
                
                // Tetap hilang otomatis walau error
                timerBelanja = setTimeout(function() {
                    $("#total-belanja").slideUp();
                }, 3000);
                return;
            }

            let total = harga * jumlah;
            
            // Format Rupiah
            let totalRupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);

            $("#total-belanja")
                .text("Total yang harus dibayar: " + totalRupiah)
                .css("color", "#1e3a8a") // Biru Tua
                .stop(true, true).slideDown();
            
            // SET TIMER: Hilang setelah 5 detik
            timerBelanja = setTimeout(function() {
                $("#total-belanja").slideUp();
            }, 6000);
        });
    });

    //4. --- HALAMAN KONTAK ---
    const $formMsg = $("#formMsg");

    $("#form-kontak").on("submit", function(e) {
        e.preventDefault(); // Mencegah reload halaman

        // Mengambil nilai input menggunakan .val()
        const nama = $("#nama").val();
        const email = $("#email").val();
        const nohp = $("#nohp").val();
        const jenkel = $("#jenkel").val();
        const kategoriPesan = $("#kategori-pesan").val();
        const tglkirimPesan = $("#tgl-kirimpesan").val();
        const file = $("#file").val();
        const pesan = $("#pesan").val();

        // Validasi
        if (nama === "" || email === "" || nohp === "" || jenkel === "" || 
            kategoriPesan === "" || tglkirimPesan === "" || file === "" || pesan === "") {
            
            // Mengubah teks dan warna css menggunakan jQuery
            $formMsg.text("Semua field harus diisi.");
            $formMsg.css("color", "red");

        } else {
            $formMsg.text("Pesan berhasil dikirim.");
            $formMsg.css("color", "green");
             
        }

        // Timer untuk menghapus pesan
        setTimeout(function() {
            $formMsg.text("");
        }, 6000);
    });

    // HALAMAN KONTAK
    $(document).ready(function() {
            
        // Variabel untuk timer pesan hilang otomatis
        let timerMsg;

        $("#form-kontak").on("submit", function(e) {
            // 1. MENCEGAH RELOAD HALAMAN (PENTING!)
            e.preventDefault();

            // Ambil nilai input
            const nama = $("#nama").val();
            const email = $("#email").val();
            const nohp = $("#nohp").val();
            const jenkel = $("#jenkel").val();
            const kategori = $("#kategori-pesan").val();
            const tgl = $("#tgl-kirimpesan").val();
            const file = $("#file").val();
            const pesan = $("#pesan").val();

            const $msgBox = $("#formMsg");

            // Reset timer jika user klik cepat berkali-kali
            clearTimeout(timerMsg);

            // 2. VALIDASI INPUT
            if (nama === "" || email === "" || nohp === "" || jenkel === "" || 
                kategori === "" || tgl === "" || file === "" || pesan === "") {
                
                $msgBox.text("Harap isi semua kolom formulir!")
                        .css({ "color": "#721c24", "background-color": "#f8d7da" }) // Merah
                        .slideDown(); // memunculkan pesan
            
            } else {
                $msgBox.text("Pesan berhasil dikirim! Terima kasih.")
                        .css({ "color": "#155724", "background-color": "#d4edda" }) // Hijau
                        .slideDown(); // memunculkan pesan
                
                $("#form-kontak")[0].reset();
            }

            // Hilangkan pesan setelah 6 detik
            timerMsg = setTimeout(function() {
                $msgBox.slideUp();
            }, 6000);
        });

    });
});