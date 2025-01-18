(() => {
    const inputAmigo = document.querySelector('#amigo'); // Referencia al input donde se ingresa el nombre del amigo
    const listaAmigos = document.querySelector('#listaAmigos'); // Referencia a la lista que almacenará a los amigos
    const amigoSecreto = document.querySelector('#resultado'); // Referencia a el espacio designado en el html para insertar el amigo secreto
    const botonSortearAmigo = document.querySelector('#btn-sortear') // Referencia al boton de sorteo para manipular sus estados
    let amigosGuardados = []; // Arreglo 
    let nombreAmigo = inputAmigo.value.trim(); 


    const agregarAmigo = () => {

        nombreAmigo = inputAmigo.value.trim();
        
        // Validamos que si ya existe  un amigo secreto
        if(amigoSecreto.textContent != '') {
            amigoSecreto.textContent = ''; 
        }

        // Llamamos a la función de validación antes de agregar al amigo
        validarAmigo();

        // Validamos si el campo se aun posee la para errores
        if (inputAmigo.classList.contains('input-name-error')) {
            alert('Por favor, ingrese un nombre valido.')
            return;
        }
        
        // Validamos si el amigo ya se encuentra registrado
        if (amigosGuardados.includes(nombreAmigo)) {
            alert('Este amigo ya está en la lista');
            return;
        }

        // Creamos un elemento <li> para el nuevo amigo
        const nuevoAmigo = document.createElement('li');
        nuevoAmigo.textContent = inputAmigo.value;

        // Añadimos el elemento a la lista
        listaAmigos.appendChild(nuevoAmigo);

        actualizarListaAmigos();

    };

    const sortearAmigo = () => {
        if(amigosGuardados.length > 0){

            // Generamos un número aleatorio entre 0 y el tamaño del arreglo
            let random = Math.floor(Math.random() * amigosGuardados.length);

            // Asignamos el amigo secreto usando el índice aleatorio
            amigoSecreto.textContent = `El amigo secreto sorteado es: ${amigosGuardados[random]}`; 

            // Limpiamos los objetos y bloqueamos el boton de sortear
            listaAmigos.innerHTML = '';
            inputAmigo.value = '';
            amigosGuardados = [];
            eliminarError();
            botonSortearAmigo.disabled = true;
        }

    }

    const eliminarError = () => {
            // Si el campo no se enceuntra vacio eliminamos el estilo de error
            inputAmigo.classList.remove('input-name-error'); 
            inputAmigo.setAttribute('placeholder', 'Escribe un nombre');
    }

    const validarAmigo = () => {

        nombreAmigo = inputAmigo.value.trim(); // Obtenemos el nombre del amigo

        // Validamos si el campo esta vacio para aplicar estilos de error
        if (nombreAmigo === '') {
            inputAmigo.classList.add('input-name-error');
            inputAmigo.setAttribute('placeholder', 'El campo es obligatorio');
            return;
        } else {
            eliminarError();
        }
    };

    const actualizarListaAmigos = () =>{
        // Actualizamos el arreglo con los valores que contiene la lista de amigos
        amigosGuardados = Array.from(listaAmigos.querySelectorAll('li')).map(li => li.textContent);

        // Desbloqueamos el boton de sortear despues de tener 1 amigo registrado
        if(botonSortearAmigo.disabled = true){
            botonSortearAmigo.disabled = false;
        }

        // Limpiamos el campo
        inputAmigo.value = '';
    }

    // creamos un evento relacionado al campo amigo para validar que cuando 
    // se pierda el foco y el campo quede vacio, añada estilo de error
    inputAmigo.addEventListener('blur', validarAmigo);

    window.agregarAmigo = agregarAmigo;
    window.sortearAmigo = sortearAmigo;
})();