// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // recuperar informações do usuário
  const nome = signupForm['signup-nome'].value;
  const email = signupForm['signup-email'].value;
  const senha = signupForm['signup-senha'].value;

  function writeUserData(nome, email, senha, id_usuario) {

    var desconhecido = "null";

    db.ref('usuarios/standardbank/' + id_usuario).set({
      conta: "falso",
      nome: nome,
      id: id_usuario,
      usuario: "gestor",
      email: email,
      senha: senha,
      token: desconhecido

    });

  }

  // criar usuário
  auth.createUserWithEmailAndPassword(email, senha).then(cred => {

    auth.onAuthStateChanged(user => {
      if (user) {
        writeUserData(nome, email, senha, user.uid);
      }
    });

    // reiniciando formulário
    signupForm.reset();
    window.open('index.html', "_self");

  });
});