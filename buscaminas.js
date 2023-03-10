function generarTablero(filas, columnas, minas) {
    // Crear una matriz vacía
    let tablero = [];
  
    for (let i = 0; i < filas; i++) {
      let fila = [];
      for (let j = 0; j < columnas; j++) {
        fila.push(0);
      }
      tablero.push(fila);
    }
  
    
    // Colocar minas en posiciones aleatorias
    for (let i = 0; i < minas; i++) {
      let fila = Math.floor(Math.random() * filas);
      let columna = Math.floor(Math.random() * columnas);
      tablero[fila][columna] = "M";
    }
    // Calcular la cantidad de minas adyacentes a cada celda
    for (let fila = 0; fila < filas; fila++) {
      for (let columna = 0; columna < columnas; columna++) {
        if (tablero[fila][columna] !== "M") {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (fila + i >= 0 && fila + i < filas && columna + j >= 0 && columna + j < columnas && tablero[fila+i][columna+j] === "M") {
                count++;
              }
            }
          }
          tablero[fila][columna] = count;
        }
      }
    }
  
    // Retornar el tablero generado
    return tablero;
  }
  
  // Ejemplo de uso: generar un tablero de 5x5 con 5 minas
  let tablero = generarTablero(5, 5, 15);
  
  // Imprimir el tablero en la consola
  console.log(tablero);
  