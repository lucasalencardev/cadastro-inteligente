// js/validation.js

const form = document.getElementById('cadastroForm');

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');

const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const forcaBarra = document.getElementById('forcaBarra');

nome.addEventListener('blur', () => validarCampo(nome, validarNome));
email.addEventListener('blur', () => validarCampo(email, validarEmail));

senha.addEventListener('input', () => {
  validarCampo(senha, validarSenha);
  atualizarForcaSenha();
});

confirmarSenha.addEventListener('blur', () =>
  validarCampo(confirmarSenha, validarConfirmacaoSenha)
);

function validarCampo(input, funcaoValidadora) {
  const erro = document.getElementById(input.id + '-error');

  const resultado = funcaoValidadora(input.value);

  if (!resultado.valido) {
    input.classList.add('error');
    input.classList.remove('success');
    erro.textContent = resultado.mensagem;
  } else {
    input.classList.remove('error');
    input.classList.add('success');
    erro.textContent = '';
  }

  return resultado.valido;
}

function validarNome(valor) {
  if (!valor.trim()) {
    return {
      valido: false,
      mensagem: 'Nome obrigatório'
    };
  }

  if (valor.length < 3) {
    return {
      valido: false,
      mensagem: 'Mínimo de 3 caracteres'
    };
  }

  return { valido: true };
}

function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!valor) {
    return {
      valido: false,
      mensagem: 'E-mail obrigatório'
    };
  }

  if (!regex.test(valor)) {
    return {
      valido: false,
      mensagem: 'Formato inválido'
    };
  }

  return { valido: true };
}

function validarSenha(valor) {

  if (valor.length < 8) {
    return {
      valido: false,
      mensagem: 'Mínimo 8 caracteres'
    };
  }

  if (!/[A-Z]/.test(valor)) {
    return {
      valido: false,
      mensagem: 'Precisa de letra maiúscula'
    };
  }

  if (!/[0-9]/.test(valor)) {
    return {
      valido: false,
      mensagem: 'Precisa de um número'
    };
  }

  return { valido: true };
}

function validarConfirmacaoSenha(valor) {

  if (!valor) {
    return {
      valido: false,
      mensagem: 'Confirme a senha'
    };
  }

  if (valor !== senha.value) {
    return {
      valido: false,
      mensagem: 'As senhas não coincidem'
    };
  }

  return { valido: true };
}

function atualizarForcaSenha() {

  let forca = 0;
  const valor = senha.value;

  if (valor.length >= 8) forca++;
  if (/[A-Z]/.test(valor)) forca++;
  if (/[0-9]/.test(valor)) forca++;
  if (/[^A-Za-z0-9]/.test(valor)) forca++;

  let largura = forca * 25;

  forcaBarra.style.width = largura + '%';

  if (forca === 1) {
    forcaBarra.style.background = 'red';
  } else if (forca === 2) {
    forcaBarra.style.background = 'orange';
  } else if (forca === 3) {
    forcaBarra.style.background = 'gold';
  } else if (forca === 4) {
    forcaBarra.style.background = 'green';
  } else {
    forcaBarra.style.background = 'transparent';
  }
}

form.addEventListener('submit', function(event) {

  event.preventDefault();

  const nomeValido = validarCampo(nome, validarNome);
  const emailValido = validarCampo(email, validarEmail);
  const senhaValida = validarCampo(senha, validarSenha);
  const confirmacaoValida = validarCampo(confirmarSenha, validarConfirmacaoSenha);

  if (
    nomeValido &&
    emailValido &&
    senhaValida &&
    confirmacaoValida
  ) {

    submitBtn.disabled = true;

    submitBtn.innerHTML =
      '<span class="spinner"></span>Enviando...';

    setTimeout(() => {

      successMessage.textContent =
        'Cadastro realizado com sucesso!';

      form.reset();

      forcaBarra.style.width = '0%';

      document.querySelectorAll('input').forEach(input => {
        input.classList.remove('success');
      });

      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Criar Conta';

    }, 2000);
  }
});