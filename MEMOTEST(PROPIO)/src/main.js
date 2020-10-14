let turnos = 0;
const $tablero = document.querySelector("#tablero-juego")
const $cuadros = $tablero.querySelectorAll(".cuadro")
let $primerCuadro = null;
function configurarTurno() {
    let coloresBase = ["rojo", "amarillo", "azul", "negro", "verde"];
    let coloresRepetidos = coloresBase.concat(coloresBase);
    configurarCuadros($cuadros, coloresRepetidos)
}
function configurarCuadros ($cuadros, colores) {
    const coloresRandom =  colores.sort(function() {
        return 0.5 - Math.random();
    })
    coloresRandom.forEach((color, i) => {
        $cuadros[i].classList.add(color)
    })
}
configurarTurno()

    $tablero.onclick = function(e) {
        console.log("Apretaste en el tablero")
        const $elemento = e.target;
        if ($elemento.classList.contains("cuadro")) {
            manejarClickCuadro($elemento)
        }
    }

function cuadrosSonIguales($cuadro1, $cuadro2) {
    if($cuadro1.className === $cuadro2.className) {
        return true
    } else {
        return false
    }
}
function mostrarCuadro ($cuadro) {
    $cuadro.style.opacity = "1";
}
function ocultarCuadro ($cuadro) {
    setTimeout(function(){
        $cuadro.style.opacity = "0";
    }, 500)
}
function eliminarCuadro ($cuadro) {
    setTimeout(() => {
        $cuadro.classList.add("completo")
    }, 500);
}
function manejarClickCuadro($cuadroActual){
    mostrarCuadro($cuadroActual)
    if ($primerCuadro == null) {
        $primerCuadro = $cuadroActual;
    }
     else {
                if ($primerCuadro === $cuadroActual){
                    return;
                }
                turnos++;
                if (cuadrosSonIguales($primerCuadro, $cuadroActual)){
                    eliminarCuadro($primerCuadro);
                    eliminarCuadro($cuadroActual);
                } else {
                    ocultarCuadro($primerCuadro);
                    ocultarCuadro($cuadroActual);
                }
            }
    
    
}



