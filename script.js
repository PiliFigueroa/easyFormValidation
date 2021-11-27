const formulario = document.querySelector("#formulario")
let inputUsername = document.querySelector("#username")
let inputEmail = document.querySelector("#email")
let inputPassword = document.querySelector("#password")
let inputRepeatPassword = document.querySelector("#repeatPassword")
let inputSubmit = document.querySelector("#submit")

const success = document.querySelector('#password-success')
const error = document.querySelector('#password-alert')

const fields = {
    username: false,
    email: false,
    password: false,
    repeatPassword: false
}

const removeWhitespaces = (element) => element.replace(/\s/g,'')

const formAlerts = (boolean, field) => {
    if (boolean) {
        success.classList.remove('d-none')
        error.classList.add('d-none')
        field.style.backgroundColor = '#fff'
        inputSubmit.removeAttribute('disabled','disabled')
    } else {
        error.classList.remove('d-none')
        success.classList.add('d-none')
        field.style.backgroundColor = 'pink'
        inputSubmit.setAttribute('disabled', 'disabled')   
    }
}

const validateField = (input) => {
    if (input.value != '') {
        fields[`${input.name}`] = removeWhitespaces(input.value)
    } else {
        return false
    }
}

const validatePassword = (pass, repeatPass) => {
    if (pass.value === repeatPass.value) {
        validateField(pass)
        validateField(repeatPass)
    } else {
        return false
    }
}

const validateForm = (input) => {
    switch (input.name) {
        case 'username':
            validateField(inputUsername)
            break
        case 'email':
            validateField(inputEmail)
            break
        case 'password':
            validatePassword(inputPassword, inputRepeatPassword)
        case 'repeatPassword':
            validatePassword(inputPassword, inputRepeatPassword)
            break
    }
    if (fields.username && fields.email && fields.password && fields.repeatPassword) {
        formAlerts(true, input)
    } else {
        formAlerts(false, input)
    }
}

inputUsername.onblur = (e) => validateForm(e.target)
inputEmail.onblur = (e) => validateForm(e.target)
inputRepeatPassword.onkeyup = (e) => validateForm(e.target)

formulario.onsubmit = (e) => {
    e.preventDefault()
    formulario.reset()
}