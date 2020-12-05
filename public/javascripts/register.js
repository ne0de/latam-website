function registerNewAccount(){
    const newUser = {
        name: $("#inputNombre").val(),
        surname: $("#inputApellido").val(),
        nickname:  $("#InputNick").val(),
        password: $("#inputPassword").val(),
        email: $("#inputEmail").val(),
    }

    if(!newUser.nickname || !newUser.name)
        return alert('No pusiste un nick');
    
    $.ajax({
        url: 'http://localhost:3000/user/',
        type: 'POST',
        data: newUser,
        error: result => {
            alert(result.responseText);
        },
        success: result => {
            alert(result);
            window.location = '/user/login';
        }
    });
}

$(document).ready(function() {
    $('#crearCuenta').on('submit', event => {
        event.preventDefault();
        registerNewAccount();
    });
});