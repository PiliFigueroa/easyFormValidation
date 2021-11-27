// VARIABLES GLOBALES DE ELEMENTOS DE MI FORM
const formulario = document.querySelector("#formulario")
let inputUsername = document.querySelector("#username")
let inputEmail = document.querySelector("#email")
let inputPassword = document.querySelector("#password")
let inputRepeatPassword = document.querySelector("#repeatPassword")
let inputSubmit = document.querySelector("#submit")

// VARIABLES DEL MENSAJE DE ALERTA O EXITO
const success = document.querySelector('#password-success')
const error = document.querySelector('#password-alert')

// Declaro un objeto con los datos que quiero guardar de los usuarios, y los inicializo en false para posterior validacion
const fields = {
    username: false,
    email: false,
    password: false,
    repeatPassword: false
}

// Remueve todos los espacios en blanco del elemento que le paso
const removeWhitespaces = (element) => element.replace(/\s/g,'')

// Manipulacion del DOM, le paso un booleando para elegir si quiero prender las alertas de error o exito,
// y un parametro field para que solo ese elemento cambie el fondo
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

// Valida que mis inputs no esten vacios, y en caso de dar true me guarda el value del input en mi objeto, exactamente en la propiedad que corresponde
// porque el input.name es identico al nombre que le di a las propiedades de mi objeto
const validateField = (input) => {
    if (input.value != '') {
        fields[`${input.name}`] = removeWhitespaces(input.value)
    } else {
        return false
    }
}

// Valida que las contrasenas sean iguales
const validatePassword = (pass, repeatPass) => {
    if (pass.value === repeatPass.value) {
        validateField(pass)
        validateField(repeatPass)
    } else {
        return false
    }
}

// Recibe un input y de acuerdo al input.name valida cada uno de mis inputs de forma dinamica
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
    // Condicional que me valida que todas las propiedades de mi objeto tienen guardada informacion (ya no son false)
    // En caso de ser true, uso mi funcion que manipula el DOM para mostrar los mensajes de exito, caso contrario los de error
    if (fields.username && fields.email && fields.password && fields.repeatPassword) {
        formAlerts(true, input)
    } else {
        formAlerts(false, input)
    }
}

// EVENTOS
inputUsername.onblur = (e) => validateForm(e.target)
inputEmail.onblur = (e) => validateForm(e.target)
inputRepeatPassword.onkeyup = (e) => validateForm(e.target)

formulario.onsubmit = (e) => {
    e.preventDefault()
    formulario.reset()
}