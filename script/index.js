// variaveis temporarias

var idUsuario, nomeUsuario, emailUsuario, senhaUsuario;

// estado de autenticação do perfil do usuário

auth.onAuthStateChanged(user => {
    if (!user) {
        // se o perfil do usuário tiver feito logout
    }
    else {

        // se o perfil do usuário estiver logado
        idUsuario = user.uid;

        // nome do usuario
        database.ref('usuarios/standardbank' + '/' + user.uid + '/' + 'nome').once('value', (snap) => {
            nomeUsuario = snap.val();

            const formPerfilUsuario = document.querySelector('#perfil-usuario');
            formPerfilUsuario['perfil-nome'].value = nomeUsuario;

            document.getElementById("perfil-nome-usuario").innerHTML = nomeUsuario;

        });

        // email do usuario
        database.ref('usuarios/standardbank' + '/' + user.uid + '/' + 'email').once('value', (snap) => {
            emailUsuario = snap.val();

            const formPerfilUsuario = document.querySelector('#perfil-usuario');
            formPerfilUsuario['perfil-email'].value = emailUsuario;

        });

        // senha do usuario
        database.ref('usuarios/standardbank' + '/' + user.uid + '/' + 'senha').once('value', (snap) => {
            senhaUsuario = snap.val();

            const formPerfilUsuario = document.querySelector('#perfil-usuario');
            formPerfilUsuario['perfil-senha'].value = senhaUsuario;

        });

        // desabilitar menus
        database.ref('usuarios/standardbank' + '/' + user.uid + '/' + 'conta').once('value', (snap) => {
            if (snap.val() == "associado") {
                document.getElementById("link-perfil-conta").classList.remove("disabled");

            }
        });
    }
});

const salvarPerfilUsuario = document.querySelector('#perfil-usuario');
salvarPerfilUsuario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeUsuarioTemp = salvarPerfilUsuario['perfil-nome'].value;
    const emailUsuarioTemp = salvarPerfilUsuario['perfil-email'].value;
    const senhaUsuarioTemp = salvarPerfilUsuario['perfil-senha'].value;

    function salvarDados(nomeUsuarioTemp, emailUsuarioTemp, senhaUsuarioTemp) {
        
        database.ref('usuarios/standardbank' + '/' + idUsuario).update({
            nome: nomeUsuarioTemp,
            email: emailUsuarioTemp,
            senha: senhaUsuarioTemp
        });
    }

    salvarDados(nomeUsuarioTemp, emailUsuarioTemp, senhaUsuarioTemp);
});

// fazer logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {

    auth.signOut().then(() => {

        // se o logout for efectuado sem erros abrir a página de signin
        window.open('sigin.html', "_self");

    }).catch((error) => {

        // se ocorrer erros ao efectuar o logout

    });

});
