$(document).ready(function(){

    $(".text-area").attr("maxlength", 500)

    $('.text-area').bind('input propertychange', function() {
        $('#maxChars').text($(this).val().length + '/500');
        if($(this).val().length == 500)
            $('#maxChars').append('<a class = "font-italic text-danger"> Llegaste al máximo de carácteres! </a>'); 
    });

    $('#botonJuego').find('a').click(function(e){
        e.preventDefault();
        idgame = $('#botonJuego').find('#gameId').text();
        $('#btnGameSelected').text($(this).text());
    })

    /* send data */
    $('#send').click(function(e){
        e.preventDefault();
        $.ajax({
            url: '/review',
            type: 'POST',
            error: result => {
                console.log(result);
            },
            data: {
                gameId: $('#botonJuego').find('#gameId').text(),
                review: $('.text-area').val()
            },
            success: result => {
                console.log(result);
            },
        })
    })
});

