function generarTablero() {
    // Obtener los valores de las filas, columnas y minas desde los inputs
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let minas = parseInt(document.getElementById("minas").value);
    // Verificar que los valores sean válidos
    if (filas <= 0 || columnas <= 0 || minas <= 0 || minas > filas * columnas) return alert("Valores inválidos");
    // Generar el tablero
    let tablero = generarTableroAleatorio(columnas, filas, minas);
    mostrarTablero(tablero);
    // Aquí se puede agregar cualquier otra funcionalidad después de generar el tablero
}

/*function mostrarTablero(tablero) {
    // Obtener el elemento donde se mostrará el tablero
    let contenedor = document.getElementById("contenedor-tablero");
    // Limpiar el contenedor
    contenedor.innerHTML = "";
    // Crear la tabla
    let tabla = document.createElement("table");
    // Recorrer las filas del tablero
    for (let i = 0; i < tablero.length; i++) {
        let fila = tablero[i];
        // Crear una fila en la tabla
        let tr = document.createElement("tr");
        // Recorrer las celdas de la fila
        for (let j = 0; j < fila.length; j++) {
            let valor = fila[j];
            // Crear una celda en la fila
            let td = document.createElement("td");
            // Asignar el valor a la celda
            td.innerHTML = valor;
            // Agregar la celda a la fila
            tr.appendChild(td);
        };
        // Agregar la fila a la tabla
        tabla.appendChild(tr);
    };
    // Agregar la tabla al contenedor
    contenedor.appendChild(tabla);
}*/

function mostrarTablero(tablero) {
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
                revelarCelda(tablero, i, j);
            });
            fila.appendChild(celda);
        };
        tabla.appendChild(fila);
    };
    contenedor.innerHTML = "";
    contenedor.appendChild(tabla);
}

function revelarCelda(tablero, fila, columna) {
    let celda = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
    if (tablero[fila][columna] === -1) {
        // La celda contiene una mina
        celda.classList.add("mina");
        alert("¡BOOM! Has encontrado una mina");
    } else {
        // La celda no contiene una mina
        celda.textContent = tablero[fila][columna];
        celda.classList.add("revelado");
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