(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Inicie o wowjs
    new WOW().init();


    // Barra de navegação na rolagem
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Rolagem suave nos links da barra de navegação
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Botão voltar ao topo
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Iniciado Digitado
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Vídeo Modal
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Contador de fatos
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Habilidades
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Isótopo e filtro do portfólio
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Carrossel de depoimentos
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    
})(jQuery);

// Seleciona o modal e o iframe
var videoModal = document.getElementById('videoModal');
var videoIframe = document.getElementById('videoIframe');

// Adiciona um evento para o modal
videoModal.addEventListener('show.bs.modal', function () {
    // Altera o src do iframe para incluir autoplay
    videoIframe.src += "?autoplay=1";
});

// Adiciona um evento para quando o modal é fechado
videoModal.addEventListener('hide.bs.modal', function () {
    // Reseta o src do iframe para parar o vídeo
    videoIframe.src = videoIframe.src.replace("?autoplay=1", "");
});

// Formulário WhatsApp



document.getElementById("form-submit").addEventListener("click", function() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var phoneNumber = "556535482363"; // Seu número de telefone

    // Função simples para validar o e-mail
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Verifica se o e-mail é válido
    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return; // Impede o envio se o e-mail for inválido
    }
  
    // Monta a mensagem com os dados do formulário
    var formattedMessage = "Nome: " + name + "\n";
    formattedMessage += "Email: " + email + "\n";
    formattedMessage += "Assunto: " + subject + "\n";
    formattedMessage += "Mensagem: " + message;
  
    // Codifica a mensagem para URL
    var encodedMessage = encodeURIComponent(formattedMessage);
  
    // Monta o link do WhatsApp com a mensagem
    var whatsappLink = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage;
  
    // Abre o link no WhatsApp em uma nova janela
    window.open(whatsappLink, "_blank");
  
    // Limpa os campos do formulário
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
});
 