const firebaseConfig = {
    apiKey: "AIzaSyCs57YVaRWoLiAbjGbEctz45l5tuiwTfCs",
    authDomain: "datos-formulaio-dd1b1.firebaseapp.com",
    projectId: "datos-formulaio-dd1b1",
    storageBucket: "datos-formulaio-dd1b1.appspot.com",
    messagingSenderId: "1096966920659",
    appId: "1:1096966920659:web:f4c1a57073cabd414cf726",
    measurementId: "G-JM3WE638TV"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db =firebase.firestore();

document.getElementById("formulario").addEventListener('submit', (event) => {
    event.preventDefault();

    // Validar campo nombre
    let entradaNombre = document.getElementById("name");
    let errorNombre = document.getElementById("nameError");

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce un nombre.';
        errorNombre.classList.add("error-message");
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validar campo de correo electrónico
    let emailEntrada = document.getElementById("email");
    let emailError = document.getElementById("emailError");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, ingrese un email válido.';
        emailError.classList.add("error-message");
    } else {
        emailError.textContent = '';
        emailError.classList.remove("error-message");
    }

    // Validar la contraseña
    let contraseñaEntrada = document.getElementById('password');
    let contraseñaError = document.getElementById('passwordError');
    if (contraseñaEntrada.value.length < 8) {
        contraseñaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        contraseñaError.classList.add('error-message'); // Agregar la clase de error
    } else {
        contraseñaError.textContent = '';
        contraseñaError.classList.remove('error-message');
    }

    // Si todos los campos son válidos, enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !contraseñaError.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            contraseña: contraseñaEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        alert('El formulario se ha enviado con éxito.');
        document.getElementById('formulario').reset();
    }
});

