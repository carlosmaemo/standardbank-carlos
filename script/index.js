// variaveis temporarias
var idUsuario, nomeUsuario, tipoUsuario, emailUsuario, senhaUsuario;

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

        });

        // tipo de usuario
        database.ref('usuarios/standardbank' + '/' + user.uid + '/' + 'usuario').once('value', (snap) => {
            tipoUsuario = snap.val();
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

        // recuperar nome da conta bancária
        const formPerfilConta = document.querySelector('#perfil-conta');
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_nome').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-nome'].value = valor;
        });

        // recuperar apelido da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_apelido').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-apelido'].value = valor;
        });

        // recuperar sexo da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_sexo').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-sexo'].value = valor;
        });

        // recuperar bi da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_bi').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-bi'].value = valor;
        });

        // recuperar email da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_email').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-email'].value = valor;
        });

        // recuperar endereço da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_endereco').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-endereco'].value = valor;
        });

        // recuperar endereço 2 da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_endereco2').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-endereco2'].value = valor;
        });

        // recuperar provincia da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_provincia').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-provincia'].value = valor;
        });

        // recuperar distrito da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_distrito').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-distrito'].value = valor;
        });

        // recuperar código postal da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_zip').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-zip'].value = valor;
        });

        // recuperar profissão da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_profissao').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-profissao'].value = valor;
        });

        // recuperar função da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_funcao').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-funcao'].value = valor;
        });

        // recuperar empresa da conta bancária
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'assos_empresa').once('value', (snap) => {
            var valor = snap.val();
            formPerfilConta['conta-empresa'].value = valor;
        });

        // habilitar menu perfil de conta
        database.ref('usuarios/standardbank' + '/' + user.uid + '/' + 'conta').once('value', (snap) => {
            if (snap.val() == "associado") {
                document.getElementById("link-perfil-conta").classList.remove("disabled");

            }
        });

        // habilitar menu contas associadas
        database.ref('usuarios/standardbank' + '/' + user.uid + '/' + 'usuario').once('value', (snap) => {
            if (snap.val() == "funcionario") {
                document.getElementById("menuContaAssociada").classList.remove("disabled");

                $('#atendimentoMenu').empty();
            } else {

                $('#atendimentoMenuCliente').empty();
            }
        });

        // nome do usuario
        database.ref('pedido_associacao_conta' + '/' + user.uid + '/' + 'id').once('value', (snap) => {

            if (snap.val() == idUsuario) {

                document.getElementById("estado-associacao-conta").innerHTML = "Pedido de associação solicitado";
                document.getElementById("link-perfil-associar").classList.remove("active");
                document.getElementById("link-perfil-associar").classList.add("disabled");

            }
            else {

                document.getElementById("estado-associacao-conta").innerHTML = "Não associado a conta bancária";

            }

        });

        // menus e informações da associação de conta
        database.ref('associacao_conta' + '/' + user.uid + '/' + 'id').once('value', (snap) => {

            if (snap.val() == idUsuario) {

                document.getElementById("estado-associacao-conta").innerHTML = "Associado a conta bancária";
                document.getElementById("link-perfil-associar").classList.remove("active");
                document.getElementById("link-perfil-associar").classList.add("disabled");

                $('#link-perfil-associar').empty();

            }
            else {

                document.getElementById("estado-associacao-conta").innerHTML = "Não associado a conta bancária";

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

// solicitar associação de conta bancária
const solicitarAssociacao = document.querySelector('#perfil-associar');
solicitarAssociacao.addEventListener('submit', (e) => {
    e.preventDefault();

    // recuperar informações do formulário de solicitação de associação de conta bancária
    const assos_nome = solicitarAssociacao['assos-nome'].value;
    const assos_apelido = solicitarAssociacao['assos-apelido'].value;
    const assos_pedido = solicitarAssociacao['assos-pedido'].value;
    const assos_sexo = solicitarAssociacao['assos-sexo'].value;
    const assos_bi = solicitarAssociacao['assos-bi'].value;
    const assos_email = solicitarAssociacao['assos-email'].value;
    const assos_endereco = solicitarAssociacao['assos-endereco'].value;
    const assos_endereco2 = solicitarAssociacao['assos-endereco2'].value;
    const assos_provincia = solicitarAssociacao['assos-provincia'].value;
    const assos_distrito = solicitarAssociacao['assos-distrito'].value;
    const assos_zip = solicitarAssociacao['assos-zip'].value;
    const assos_profissao = solicitarAssociacao['assos-profissao'].value;
    const assos_funcao = solicitarAssociacao['assos-funcao'].value;
    const assos_empresa = solicitarAssociacao['assos-empresa'].value;

    var idAssociacao = idUsuario;

    document.querySelector("#perfil-associar").reset();

    function writeUserData(assos_nome, assos_apelido, assos_pedido, assos_sexo,
        assos_bi, assos_email, assos_endereco, assos_endereco2, assos_provincia,
        assos_distrito, assos_zip, assos_profissao, assos_funcao, assos_empresa, idAssociacao) {

        database.ref('pedido_associacao_conta/' + idAssociacao).set({
            id: idAssociacao,
            assos_nome: assos_nome,
            assos_apelido: assos_apelido,
            assos_pedido: assos_pedido,
            assos_sexo: assos_sexo,
            assos_bi: assos_bi,
            assos_email: assos_email,
            assos_endereco: assos_endereco,
            assos_endereco2: assos_endereco2,
            assos_provincia: assos_provincia,
            assos_distrito: assos_distrito,
            assos_zip: assos_zip,
            assos_profissao: assos_profissao,
            assos_funcao: assos_funcao,
            assos_empresa: assos_empresa,
        });

    }

    writeUserData(assos_nome, assos_apelido, assos_pedido, assos_sexo,
        assos_bi, assos_email, assos_endereco, assos_endereco2, assos_provincia,
        assos_distrito, assos_zip, assos_profissao, assos_funcao, assos_empresa, idAssociacao);

});

// recuperar informações de pedidos de associação pendentes   
var ref_associacao_pendente = firebase.database().ref().child("pedido_associacao_conta");
ref_associacao_pendente.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var assos_nome = snap.child("assos_nome").val();
    var assos_apelido = snap.child("assos_apelido").val();
    var assos_bi = snap.child("assos_bi").val();
    var assos_distrito = snap.child("assos_distrito").val();
    var assos_email = snap.child("assos_email").val();
    var assos_empresa = snap.child("assos_empresa").val();
    var assos_endereco = snap.child("assos_endereco").val();
    var assos_endereco2 = snap.child("assos_endereco2").val();
    var assos_funcao = snap.child("assos_funcao").val();
    var assos_pedido = snap.child("assos_pedido").val();
    var assos_profissao = snap.child("assos_profissao").val();
    var assos_provincia = snap.child("assos_provincia").val();
    var assos_sexo = snap.child("assos_sexo").val();
    var assos_zip = snap.child("assos_zip").val();

    $("#tbl_associacao_pendente_corpo").append("<tr data-id='"
        + id + "'><td>"
        + assos_nome + "</td><td>"
        + assos_apelido + "</td><td>"
        + assos_sexo + "</td><td>"
        + assos_bi + "</td><td>"
        + assos_endereco + "</td><td>"
        + assos_provincia + "</td><td>"
        + "<button class='btn-permitir-associacao-pendente btn btn-primary'>Aprovar</button> | "
        + "<button class='btn-remover-associacao-pendente btn btn-danger'>Rejeitar</button></td>"
        + "</tr>");
});

// recuperar informações de constas associadas   
var ref_associacao = firebase.database().ref().child("associacao_conta");
ref_associacao.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var assos_nome = snap.child("assos_nome").val();
    var assos_apelido = snap.child("assos_apelido").val();
    var assos_bi = snap.child("assos_bi").val();
    var assos_distrito = snap.child("assos_distrito").val();
    var assos_email = snap.child("assos_email").val();
    var assos_empresa = snap.child("assos_empresa").val();
    var assos_endereco = snap.child("assos_endereco").val();
    var assos_endereco2 = snap.child("assos_endereco2").val();
    var assos_funcao = snap.child("assos_funcao").val();
    var assos_pedido = snap.child("assos_pedido").val();
    var assos_profissao = snap.child("assos_profissao").val();
    var assos_provincia = snap.child("assos_provincia").val();
    var assos_sexo = snap.child("assos_sexo").val();
    var assos_zip = snap.child("assos_zip").val();

    $("#tbl_associacao_corpo").append("<tr data-id='"
        + id + "'><td>"
        + assos_nome + "</td><td>"
        + assos_apelido + "</td><td>"
        + assos_sexo + "</td><td>"
        + assos_bi + "</td><td>"
        + assos_endereco + "</td><td>"
        + assos_provincia + "</td><td>"
        + "<button class='btn-remover-associacao btn btn-danger'>Desassociar</button></td>"
        + "</tr>");
});

// pedidos de associação de conta (aprovar pedidos)
$("#tbl_associacao_pendente_corpo").on('click', '.btn-permitir-associacao-pendente', function (e) {
    var $row = $(this).closest('tr'), rowId = $row.data('id');
    var rowId = $row.data('id');

    // recuperar informações de pedidos de associação pendentes
    var ref_pedidos_associacao_val = firebase.database().ref().child('pedido_associacao_conta' + '/' + rowId);

    ref_pedidos_associacao_val.once('value', (snap) => {

        var assos_nome = snap.child("assos_nome").val();
        var assos_apelido = snap.child("assos_apelido").val();
        var assos_bi = snap.child("assos_bi").val();
        var assos_distrito = snap.child("assos_distrito").val();
        var assos_email = snap.child("assos_email").val();
        var assos_empresa = snap.child("assos_empresa").val();
        var assos_endereco = snap.child("assos_endereco").val();
        var assos_endereco2 = snap.child("assos_endereco2").val();
        var assos_funcao = snap.child("assos_funcao").val();
        var assos_pedido = snap.child("assos_pedido").val();
        var assos_profissao = snap.child("assos_profissao").val();
        var assos_provincia = snap.child("assos_provincia").val();
        var assos_sexo = snap.child("assos_sexo").val();
        var assos_zip = snap.child("assos_zip").val();
        var assos_id = snap.child("id").val();

        function passarDadosPedidos(assos_nome, assos_apelido, assos_bi, assos_distrito, assos_email,
            assos_empresa, assos_endereco, assos_endereco2, assos_funcao, assos_pedido,
            assos_profissao, assos_provincia, assos_sexo, assos_zip) {

            database.ref('associacao_conta/' + assos_id).set({
                id: assos_id,
                assos_nome: assos_nome,
                assos_apelido: assos_apelido,
                assos_bi: assos_bi,
                assos_distrito: assos_distrito,
                assos_email: assos_email,
                assos_empresa: assos_empresa,
                assos_endereco: assos_endereco,
                assos_endereco2: assos_endereco2,
                assos_funcao: assos_funcao,
                assos_pedido: assos_pedido,
                assos_profissao: assos_profissao,
                assos_provincia: assos_provincia,
                assos_sexo: assos_sexo,
                assos_zip: assos_zip
            });

            database.ref('usuarios/standardbank' + '/' + assos_id).update({
                conta: "associado"
            });


        }

        passarDadosPedidos(assos_nome, assos_apelido, assos_bi, assos_distrito, assos_email,
            assos_empresa, assos_endereco, assos_endereco2, assos_funcao, assos_pedido,
            assos_profissao, assos_provincia, assos_sexo, assos_zip);

        ref_pedidos_associacao_val.remove()
            .then(function () {
                $row.remove();
            })
            .catch(function (error) {
                console.log('ERROR');
            });
    });
});

var ref_pedidos_associacao = firebase.database().ref().child("pedido_associacao_conta");

// remover dados de pedidos de associação de conta já aprovados
$("#tbl_associacao_pendente_corpo").on('click', '.btn-remover-associacao-pendente', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');
    var rowId = $row.data('id');

    ref_pedidos_associacao.child(rowId).remove()
        .then(function () {
            $row.remove();

        })
        .catch(function (error) {
            console.log('ERROR');
        });
});

// remover associação de conta
$("#tbl_associacao_corpo").on('click', '.btn-remover-associacao', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');
    var rowId = $row.data('id');

    ref_pedidos_associacao.child(rowId).remove()
        .then(function () {
            $row.remove();

        })
        .catch(function (error) {
            console.log('ERROR');
        });
});



    // enviar mensagem / atendimento
    const enviarMensagem = document.querySelector('#atendimento');
    enviarMensagem.addEventListener('submit', (e) => {
        e.preventDefault();


        if (tipoUsuario == "gestor") {
        // recuperar informações da mensagem
        const mensagem = enviarMensagem['enviar-mensagem'].value;

        var idPush = database.ref().push();
        var idMensagem = idPush.key;

        document.querySelector("#atendimento").reset();

        function escreverMensagem(mensagem, idMensagem) {

            database.ref('mensagens/' + idUsuario + "/" + idMensagem).set({
                id: idMensagem,
                de: "usuario",
                deId: idUsuario,
                tempo: firebase.database.ServerValue.TIMESTAMP,
                mensagem: mensagem,
                data: new Date().toLocaleString(),
                usuario: nomeUsuario,
            });
        }

        escreverMensagem(mensagem, idMensagem);
    }

    });



// recuperar histórico de mensagens    
var listaMensagem = firebase.database().ref().child("mensagens/" + idUsuario);

listaMensagem.once("value", (snap) => {
    var idMensagem = snap.key;

    var usuarioInformacao = firebase.database().ref().child("usuarios/standardbank/" + idUsuario);
    var usuarioMensagem = firebase.database().ref().child("mensagens/" + idUsuario);

    usuarioInformacao.once("value", (snap) => {
        var nome = snap.child("nome").val();
        var apelido = snap.child("apelido").val();

        usuarioMensagem.on("child_added", (snap) => {
            var id = snap.child("id").val();
            var mensagem = snap.child("mensagem").val();
            var deUsuario = snap.child("de").val();
            var data = snap.child("data").val();
            var deId = snap.child("deId").val();
            var nomeMensagem;

            var verificarListaUsuario = firebase.database().ref().child("usuarios/standardbank/" + deId);
            verificarListaUsuario.once("value", (snap) => {
                var nome = snap.child("nome").val();

                if (deUsuario == "standardbank") {
                    nomeMensagem = "Standardbank";
                    $("#tbl_lista_mensagem_corpo").append("<tr class='table-secondary' data-id='"
                        + id + "'><td>"
                        + nomeMensagem + "</td><td>"
                        + mensagem + "</td><td>"
                        + data + "</td></tr>");
                }
                else {
                    nomeMensagem = nome;
                    $("#tbl_lista_mensagem_corpo").append("<tr class='table-success' data-id='"
                        + id + "'><td>"
                        + nomeMensagem + "</td><td>"
                        + mensagem + "</td><td>"
                        + data + "</td></tr>");
                }
            });
        });
    });
});


// recuperar informação da lista de conversas    
var ref_lista_conversas = firebase.database().ref().child("mensagens");
ref_lista_conversas.on("child_added", (snap) => {
    var id = snap.key;

    var ref_lista_conversas_usuario_inf = firebase.database().ref().child("usuarios/standardbank/" + id);
    var ref_lista_conversas_usuario = firebase.database().ref().child("mensagens/" + id);

    ref_lista_conversas_usuario_inf.once("value", (snap) => {
        var nome = snap.child("nome").val();
        var tipoUsuario = snap.child("usuario").val();

        if (tipoUsuario != "funcionario") {
            $("#tbl_lista_conversas_corpo").append("<tr data-id='"
                + id + "'><td>"
                + nome + "</td><td>"
                + "<button id='btn-abrir-conversa' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modal-atendimento'>Abrir</button></td></tr>");
        }
    });
});

$("#tbl_lista_conversas_corpo").on('click', '#btn-abrir-conversa', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');

    var rowId = $row.data('id');
    idUsuarioChat = rowId;

    // recuperar histórico de mensagens   
    var ref_lista_chat_mensagens = firebase.database().ref().child("mensagens/" + idUsuarioChat);

    ref_lista_chat_mensagens.once("value", (snap) => {
        var idMensagemChat = snap.key;

        var ref_lista_chat_usuario_inf = firebase.database().ref().child("usuarios/standardbank/" + idUsuarioChat);
        var ref_lista_chat_usuario = firebase.database().ref().child("mensagens/" + idUsuarioChat);

        ref_lista_chat_usuario_inf.once("value", (snap) => {
            var nome = snap.child("nome").val();

            ref_lista_chat_usuario.on("child_added", (snap) => {
                var id = snap.child("id").val();
                var mensagem = snap.child("mensagem").val();
                var deUsuario = snap.child("de").val();
                var data = snap.child("data").val();
                var deId = snap.child("deId").val();
                var nomeMensagem;

                var ref_lista_chat_funcionario_inf = firebase.database().ref().child("usuarios/standardbank/" + deId);
                ref_lista_chat_funcionario_inf.once("value", (snap) => {
                    var funcNome = snap.child("nome").val();

                    if (deUsuario == "standardbank") {
                        nomeMensagem = "Standardbank";
                        $("#tbl_lista_mensagem_corpo").append("<tr class='table-secondary' data-id='"
                            + id + "'><td>"
                            + nomeMensagem + "</td><td>"
                            + mensagem + "</td><td>"
                            + data + "</td></tr>");
                    }
                    else {
                        nomeMensagem = nome;
                        $("#tbl_lista_mensagem_corpo").append("<tr class='table-success' data-id='"
                            + id + "'><td>"
                            + nomeMensagem + "</td><td>"
                            + mensagem + "</td><td>"
                            + data + "</td></tr>");
                    }
                });
            });
        });
    });

    if (tipoUsuario == "funcionario") {
        // enviar mensagem / atendimento cliente
        const enviarMensagem = document.querySelector('#atendimento');
        enviarMensagem.addEventListener('submit', (e) => {
            e.preventDefault();

            // recuperar informações da mensagem
            const mensagem = enviarMensagem['enviar-mensagem'].value;

            var idPush = database.ref().push();
            var idMensagem = idPush.key;

            document.querySelector("#atendimento").reset();

            function escreverMensagem(mensagem, idMensagem) {

                database.ref('mensagens/' + idUsuarioChat + "/" + idMensagem).set({
                    id: idMensagem,
                    de: "standardbank",
                    deId: idUsuario,
                    tempo: firebase.database.ServerValue.TIMESTAMP,
                    mensagem: mensagem,
                    data: new Date().toLocaleString(),
                    usuario: nomeUsuario,
                });
            }

            escreverMensagem(mensagem, idMensagem);

        });
    }

});
