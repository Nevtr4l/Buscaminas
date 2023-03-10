function generarTablero(columnas, filas, minas) {

let tablero = [];

for (let i = 0; i < columnas; i++) {
    let columna = [];
    for (let j = 0; j < filas; j++) {
      columna.push(0);
    }
    tablero.push(columna);
}

/*[
  [ 0, 0, 0, M, 0, 0 ], // tablero[0][3] = 'M'
  [ 0, 0, 0, 0, 0, 0 ], // tablero[1]
  [ 0, 0, 0, 0, 0, 0 ], // tablero[2]
  [ 0, 0, 0, 0, 0, 0 ], // tablero[3]
  [ 0, 0, 0, 0, 0, 0 ]  // tablero[4]
]*/

for (let i = 0; i < minas; ) {
    let columna = Math.floor(Math.random() * columnas);
    let fila = Math.floor(Math.random() * filas);
    if(tablero[columna][fila] != "M") {
      tablero[columna][fila] = "M";
      i++;
    }
}

/*tablero = [
  [ 0, 'M', 0, 0, 'M', 0 ],
  [ 0, 0, 'M', 0, 0, 0 ],
  [ 0, 0, 0, 0, 'M', 0 ],
  [ 'M', 0, 0, 0, 0, 0 ],
  [ 0, 0, 'M', 'M', 0, 0 ]
];*/

for (let columna = 0; columna < columnas; columna++) {
    for (let fila = 0; fila < filas; fila++) {
      if (tablero[columna][fila] !== "M") {
        /////////////////////////////
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // i = 0, j = 1, columna = 0, fila = 0, columnas = 5, filas = 6
            if (columna + i >= 0 && columna + i < columnas && fila + j >= 0 && fila + j < filas && tablero[columna+i][fila+j] === "M") {
              // 0 >= 0 && 0 < 5 && 1 >= 0 && 1 < 6 && tablero[0][1]
                count++;
            }
          }
        }
        tablero[columna][fila] = count;
        /////////////////////////////
      }
    }
  }
  
/*[
  [ 1, 'M', 2, 2, 'M', 1 ],
  [ 1, 2, 'M', 3, 2, 2 ],
  [ 1, 2, 1, 2, 'M', 1 ],
  [ 'M', 2, 2, 3, 2, 1 ],
  [ 1, 2, 'M', 'M', 1, 0 ]
]*/

for (let columna = 0; columna < columnas; columna++){
    for (let fila = 0; fila < filas; fila++){
            switch (tablero[columna][fila]) {
                case 0:{
                    tablero[columna][fila] = "||:zero:||"
                } break;
                case 1:{
                    tablero[columna][fila] = "||:one:||"
                } break;
                case 2:{
                    tablero[columna][fila] = "||:two:||"
                } break;
                case 3:{
                    tablero[columna][fila] = "||:three:||"
                } break;
                case 4:{
                    tablero[columna][fila] = "||:four:||"
                } break;
                case 5:{
                    tablero[columna][fila] = "||:five:||"
                } break;
                case 6:{
                    tablero[columna][fila] = "||:six:||"
                } break;
                case 7:{
                    tablero[columna][fila] = "||:seven:||"
                } break;
                case 8:{
                    tablero[columna][fila] = "||:eight:||"
                } break;
                case "M":{
                    tablero[columna][fila] = "||:bomb:||"
                } break;
            }
    }
}

for (let columna = 0; columna < columnas; columna++){
    tablero[columna] = tablero[columna].join(" ");
}
tablero = tablero.join("\n");

    return tablero;
}

let tablero = generarTablero(5, 5, 24);

console.log(tablero);

