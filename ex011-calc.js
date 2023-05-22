const main = document.querySelector('main')
const root = document.querySelector(':root') //elemento do CSS
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "] //lista dos caracteres que serão permitidos digitar na calculadora

//habilitando os botões:
document.querySelectorAll('.charKey').forEach(function (charKeyBtn){
  charKeyBtn.addEventListener('click', function() {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})

//habilitando o botão "clear"
document.getElementById('clear').addEventListener('click', function(){
  input.value = ''
  input.focus()
})

//habilitando o botão "="
document.getElementById('equal').addEventListener('click', calculate)

input.addEventListener('keydown', function (ev) {
  ev.preventDefault()
  if(allowedKeys.includes(ev.key)){ //vai pesquisar se o número digitado está na lista permitidos
    input.value += ev.key
    return
  }
  if(ev.key === 'Backspace'){ //habilitando o backspace
    input.value = input.value.slice(0, -1)//vai pegar do último caractere e excluir até o penúltimo (-1), ou seja apagará o último número
  }
  if(ev.key === 'Enter'){
    calculate()
  }
})

function calculate(){
  resultInput.value = 'ERROR'
  resultInput.classList.add('error')

  const result = eval(input.value)
  
  resultInput.value = result
  resultInput.classList.remove('error')
}

document.getElementById('copyToClipboard').addEventListener('click', function (ev){
  const button = ev.currentTarget //quem aciona o evento, o próprio botão
  if (button.innerText === 'Copy') {
    button.innerText = 'Copied!'
    button.classList.add('success')//adicionando uma classe ao botão para mudar a aparência
    window.navigator.clipboard.writeText(resultInput.value)//copiar o resultado para área de transferência
  } else {
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
})

document.getElementById('themeSwitcher').addEventListener('click', function(){
  if(main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#665')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})