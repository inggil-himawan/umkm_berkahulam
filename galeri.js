$(document).ready(function() {
    
    const initGallery = () => {
        // Melakukan iterasi (loop) pada setiap elemen dengan class .card
        $('.card').each(function() {
            
            // Mendefinisikan elemen img dan p di dalam card saat ini (this)
            const $img = $(this).find('img');
            const $text = $(this).find('p');

            // Event Hover (Mouse Enter & Mouse Leave)
            // Menggantikan addEventListener mouseenter/mouseleave
            $img.hover(
                function() {
                    $(this).addClass('hover-effect');
                }, 
                function() {
                    $(this).removeClass('hover-effect');
                }
            );

            // Event Click
            // Menggantikan addEventListener click
            $img.on('click', function() {
                // Toggle class 'tampil'
                $text.toggleClass('tampil');

                // Cek apakah class 'tampil' ada untuk log console
                if ($text.hasClass('tampil')) {
                    console.log(`Anda memilih produk: ${$text.text()}`);
                } else {
                    console.log(`Menutup info produk: ${$text.text()}`);
                }
            });
        });
    };

    // Jalankan fungsi
    initGallery();
});