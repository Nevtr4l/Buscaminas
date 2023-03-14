let botonAzul = document.querySelector(`.boton-azul`);
let botonRojo = document.querySelector(`.boton-rojo`);
let activo = botonAzul;

botonAzul.addEventListener("click", function() {
    if (activo !== botonAzul) {
      activo.classList.remove("activo");
      botonAzul.classList.add("activo");
      activo = botonAzul;
    }
});
  
botonRojo.addEventListener("click", function() {
    if (activo !== botonRojo) {
      activo.classList.remove("activo");
      botonRojo.classList.add("activo");
      activo = botonRojo;
    }
});
    
    //1. Almacenar Filas, Columnas y Minas. Calcular totalCeldasSinMinas.
    function clicGenerar() {
        let columnas = parseInt(document.getElementById("columnas").value);
        let filas = parseInt(document.getElementById("filas").value);
        let minas = parseInt(document.getElementById("minas").value);
        if (filas < 5 || columnas < 5 || minas < 5 || minas + 18 >= filas * columnas) return alert("Valores inválidos");
        if (celdasSinMinasReveladas) {
            celdasSinMinasReveladas = 0;
            document.getElementById('mensaje-ganador').style.display = 'none';
        };
        if (primerClick == false) {
            primerClick = true;
            //console.log('Clic generar', primerClick)
        }
        let totalCeldasSinMinas = (columnas * filas) - minas;
        let tableroSinMinas = generarTablero(columnas, filas, minas);
        mostrarTablero(tableroSinMinas, totalCeldasSinMinas, minas);
    }
    //2. Generar un tablero
    function generarTablero(columnas, filas, minas) {
        let tablero = [];
        for (let i = 0; i < columnas; i++) {
            let columna = [];
            for (let j = 0; j < filas; j++) {
                columna.push(0);
            };
            tablero.push(columna);
        };
        for (let i = 0; i < minas;) {
            let columna = Math.floor(Math.random() * columnas);
            let fila = Math.floor(Math.random() * filas);
            if (tablero[columna][fila] != "M") {
                tablero[columna][fila] = "M";
                i++;
            };
        };
        for (let columna = 0; columna < columnas; columna++) {
            for (let fila = 0; fila < filas; fila++) {
                if (tablero[columna][fila] !== "M") {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (columna + i >= 0 && columna + i < columnas && fila + j >= 0 && fila + j < filas && tablero[columna + i][fila + j] === "M") {
                                count++;
                            }
                        };
                    };
                    tablero[columna][fila] = count;
                };
            };
        };
        return tablero;
    };
    //3. Mostrar el tablero con los valores definidos
    function mostrarTablero(tablero, totalCeldasSinMinas, minas) {
        let contenedor = document.getElementById("contenedor-tablero");
        let tabla = document.createElement("table");
        for (let i = 0; i < tablero.length; i++) {
            let fila = document.createElement("tr");
            for (let j = 0; j < tablero[i].length; j++) {
                let celda = document.createElement("td");
                celda.dataset.fila = i;
                celda.dataset.columna = j;
                celda.addEventListener("click", function () {
                    clickCelda(tablero, i, j, totalCeldasSinMinas, minas);
                });
                fila.appendChild(celda);
            };
            tabla.appendChild(fila);
        };
        contenedor.innerHTML = "";
        contenedor.appendChild(tabla);
    }
    //4. Al dar clic a una celda, generar una nueva tabla hasta que la celda clicada no sea una mina.
    let celdasSinMinasReveladas = 0;
    let primerClick = true;

    function clickCelda(tablero, fila, columna, totalCeldasSinMinas, minas) {
        let celda = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
        if (celda.classList.contains("mina") || celda.classList.contains("minaOver") || celda.classList.contains("revelado") || celda.classList.contains("reveladoOver")) return; 
        if (activo == botonAzul) {
            if (celda.classList.contains("bandera")) return;
            if (tablero[fila][columna] == 'M' && primerClick == true) {
                let tableroNew = generarTablero(tablero.length, tablero[columna].length, minas);
                mostrarTablero(tableroNew, totalCeldasSinMinas);
                clickCelda(tableroNew, fila, columna, totalCeldasSinMinas, minas);
            } else if (tablero[fila][columna] == 'M' && primerClick == false) {
                celda.textContent = '💥';
                celda.classList.add("mina");
                for (let i = 0; i < tablero.length; i++) {
                    for (let j = 0; j < tablero[i].length; j++) {
                        let celda = document.querySelector(`[data-fila="${i}"][data-columna="${j}"]`);
                        if (celda.classList.contains("bandera")) celda.classList.remove("bandera"); //
                        if (tablero[i][j] == 'M' && !celda.classList.contains("mina")) {
                            celda.textContent = '💣';
                            celda.classList.add("minaOver");
                        } else if (tablero[i][j] != 'M' && !celda.classList.contains("revelado")) {
                            if (tablero[i][j] !== 0) celda.textContent = tablero[i][j];
                            celda.classList.add("reveladoOver");
                        }
                    };
                };
                juegoTerminado = true;
                mostrarMensaje('¡Perdiste!');
            } else {
                primerClick = false;
                revelarCeros(tablero, fila, columna, totalCeldasSinMinas);
                if (tablero[fila][columna] !== 0) celda.textContent = tablero[fila][columna];
                celda.classList.add("revelado");
                if (celdasSinMinasReveladas === totalCeldasSinMinas) {
                    for (let i = 0; i < tablero.length; i++) {
                        for (let j = 0; j < tablero[i].length; j++) {
                            let celda = document.querySelector(`[data-fila="${i}"][data-columna="${j}"]`);
                            if (celda.classList.contains("bandera")) celda.classList.remove("bandera"); //
                            if (tablero[i][j] == 'M' && !celda.classList.contains("mina")) {
                                celda.textContent = '💣';
                                celda.classList.add("minaOver");
                            }
                        };
                    };
                    juegoTerminado = true;
                    mostrarMensaje('¡Felicidades, has ganado!');
                };
            };
        } else {
            celda.classList.contains("bandera") ? celda.classList.remove("bandera") : celda.classList.add("bandera");
        };
    }
    //5. Mostrar el mensaje de win/lose
    function mostrarMensaje(mensaje) {
        document.getElementById('mensaje-ganador').textContent = mensaje;
        (juegoTerminado) ? document.getElementById('mensaje-ganador').style.display = 'block' : document.getElementById('mensaje-ganador').style.display = 'none';
    }
    //6. Si le doy clic a un 0, revelar las celdas adyacentes que no son minas
    function revelarCeros(tablero, fila, columna, totalCeldasSinMinas) {
        if (fila < 0 || fila >= tablero.length || columna < 0 || columna >= tablero[0].length) return;
        let celda = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
        if (celda.classList.contains("mina") || celda.classList.contains("bandera") || celda.classList.contains("revelado")) return;
        // Revelar la celda
        if (tablero[fila][columna] !== 0) celda.textContent = tablero[fila][columna];
        if (!celda.classList.contains("revelado")) {
            celdasSinMinasReveladas++;
        };
        celda.classList.add("revelado");
        if (tablero[fila][columna] === 0) {
            for (let i = fila - 1; i <= fila + 1; i++) {
                for (let j = columna - 1; j <= columna + 1; j++) {
                    if (i >= 0 && i < tablero.length && j >= 0 && j < tablero[0].length) {
                        revelarCeros(tablero, i, j, totalCeldasSinMinas);
                    };
                };
            };
        }
    }