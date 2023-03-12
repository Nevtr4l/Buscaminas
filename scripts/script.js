function generarTablero() {
    // Obtener los valores de las filas, columnas y minas desde los inputs
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let minas = parseInt(document.getElementById("minas").value);
    // Verificar que los valores sean válidos
    if (filas <= 0 || columnas <= 0 || minas <= 0 || minas > filas * columnas) return alert("Valores inválidos");
    document.getElementById('mensaje-ganador').style.display = 'none';
    if(celdasSinMinasReveladas) celdasSinMinasReveladas = 0;
    let totalCeldasSinMinas = (filas * columnas) - minas;
    // Generar el tablero
    let tablero = generarTableroAleatorio(columnas, filas, minas);
    mostrarTablero(tablero, totalCeldasSinMinas);
    // Aquí se puede agregar cualquier otra funcionalidad después de generar el tablero
}

function mostrarTablero(tablero, totalCeldasSinMinas) {
    let contenedor = document.getElementById("contenedor-tablero");
    let tabla = document.createElement("table");
    // Agregar filas y columnas al tablero
    for (let i = 0; i < tablero.length; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < tablero[i].length; j++) {
            let celda = document.createElement("td");
            celda.dataset.fila = i;
            celda.dataset.columna = j;
            celda.addEventListener("click", function () {
                revelarCelda(tablero, i, j, totalCeldasSinMinas);
            });
            fila.appendChild(celda);
        };
        tabla.appendChild(fila);
    };
    contenedor.innerHTML = "";
    contenedor.appendChild(tabla);
}

let celdasSinMinasReveladas = 0;
function revelarCelda(tablero, fila, columna, totalCeldasSinMinas) {
    let celda = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
    if (tablero[fila][columna] == 'M') {
        celda.textContent = '💥';
        celda.classList.add("mina");
        for (let i = 0; i < tablero.length; i++) {
            for (let j = 0; j < tablero[i].length; j++) {
                let celda = document.querySelector(`[data-fila="${i}"][data-columna="${j}"]`);
                if (tablero[i][j] == 'M' && !celda.classList.contains("mina")) {
                    celda.textContent = '💣';
                    celda.classList.add("minaOver");
                } else if (tablero[i][j] != 'M' && !celda.classList.contains("revelado")) {
                    if(tablero[i][j]!==0) celda.textContent = tablero[i][j];
                    celda.classList.add("reveladoOver");
                }
            };
        };
        //alert("¡BOOM! Has encontrado una mina");
        juegoTerminado = true;
        mostrarMensaje('¡Perdiste!');
    } else {
        revelarCeros(tablero, fila, columna,totalCeldasSinMinas);
        if(tablero[fila][columna]!==0) celda.textContent = tablero[fila][columna];
        celda.classList.add("revelado");
        //Al dar clic a la última celda que no es mina restante
        if (celdasSinMinasReveladas === totalCeldasSinMinas) {
            for (let i = 0; i < tablero.length; i++) {
                for (let j = 0; j < tablero[i].length; j++) {
                    let celda = document.querySelector(`[data-fila="${i}"][data-columna="${j}"]`);
                    if (tablero[i][j] == 'M' && !celda.classList.contains("mina")) {
                        celda.textContent = '💣';
                        celda.classList.add("minaOver");
                    }
                };
            };
            juegoTerminado = true;
            mostrarMensaje('¡Felicidades, has ganado!');
        }
    }
}

function mostrarMensaje(mensaje) {
    document.getElementById('mensaje-ganador').textContent = mensaje;
    if (juegoTerminado) {
      document.getElementById('mensaje-ganador').style.display = 'block';
    } else {
      document.getElementById('mensaje-ganador').style.display = 'none';
    }
  }
  
function revelarCeros(tablero, fila, columna,totalCeldasSinMinas) {
    if (fila < 0 || fila >= tablero.length || columna < 0 || columna >= tablero[0].length) {
        // Caso base: si la celda está fuera de los límites del tablero, no hacer nada
        return;
    }

    let celda = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
    if (celda.classList.contains("mina") || celda.classList.contains("revelado")) {
        // Caso base: si la celda es una mina o ya ha sido revelada, no hacer nada
        return;
    }

    // Revelar la celda
    if(tablero[fila][columna]!==0) celda.textContent = tablero[fila][columna];
    if (!celda.classList.contains("revelado")) {
        celdasSinMinasReveladas++;
    };
    celda.classList.add("revelado");

    if (tablero[fila][columna] === 0) {
        // Si la celda es un 0, llamar a la función en las celdas adyacentes
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                // Verificamos que la celda esté dentro del tablero
                if (i >= 0 && i < tablero.length && j >= 0 && j < tablero[0].length) {
                // Llamamos recursivamente a la función para las celdas adyacentes
                revelarCeros(tablero, i, j,totalCeldasSinMinas);
                }
            }
        }
    }
}

function generarTableroAleatorio(columnas, filas, minas) {
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
}