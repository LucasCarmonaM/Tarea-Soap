const csv = require('csv-parser')
const fs = require('fs');
const json = require('./carreras.json');

const Headers = ['RUT', 'NEM', 'RANKING', 'MATEMATICAS', 'LENGUAJE', 'HISTORIA', 'CIENCIAS'];

console.time("tiempo corriendo");

// OPCIONES PARA PIPE CSV (PARAMETRO de la funcion)
const obj = {
    separator: ';',
    headers: Headers
};

// este arreglo corresponde a las carreras, 28 carreras (0- 27)
let matrizCarrera = [];

let carreras = [];
carreras = json;


const llenarMCarreras = () => {
    const objetito = {
        Codigo: '',
        Vacantes: '',
        Ultimo: 0,
        Pond: '',
        Persona: []
    };
    for (let i = 0; i < 28; i++) {
        matrizCarrera.push({
            Codigo: carreras[i].codigo,
            Vacantes: carreras[i].vacantes,
            Ultimo: 0,
            Pond: `${carreras[i].nem},${carreras[i].ranking},${carreras[i].lenguaje},${carreras[i].matematica},${carreras[i].cienciasHistoria}`,
            Persona: []
        });
    }
};
llenarMCarreras();

/* 
EJEMPLO DE MATRIZ CARRERAS donde arrreglo "Persona" se llena con todos los postulantes a la carrera matrizCarrera[i]
Este arreglo de personas tendra de largo las vacantes por carrera
    matrizCarrera[1]{
        Codigo: 21041
        Vacantes: 60
        Ultimo: 690
        Pond: '10,20,30,40'
        Persona[1]:{
            Rut:199323911
            Pond: 700
        }
    }
*/

/*
siguiente funcion trabaja arreglo con los puntajes ponderados por carrera del 0 al 27 (28 carreras) llenando con objetos personas,
que tienen rut y ponderacion de este, dependiendo de las vacantes de esta carrera se van llenando

Siguiente funcion recibe un parametro que corresponde a cada linea del csv ( una persona por llamada de esta funcion )
Parametro
    puntajes = {
        RUT:,
        NEM:,
        RANKING:,
        MATEMATICAS:,
        LENGUAJE:,
        HISTORIA:,
        CIENCIAS
    }
*/
const promedios = (puntajes) => {
    //array para realizar for each de las ponderaciones de cada materia dependiendo de la carrera
    ponderaciones = [];
    //Arreglo que se utilizara en la funcion each de las ponderaciones, este se llena con los puntajes
    let ponderOrden = [];
    // RECORDATORIO: 28 es la cantidad de carreras Indices 0 - 27 carreras del array de objetos matrizCarrera
    // Este for recorrera todas las carreras y de cumplir condiciones se ingresara esta persona a cada carrera
    for (let i = 0; i < 28; i++) {
        matrizCarrera[i].Persona.sort((a, b) => {
            if (a.pondera > b.pondera) {
                return -1;
            }
            if (a.pondera < b.pondera) {
                return 1;
            }
            return 0;
        });
        // Si el puntaje en historia es mayor al de ciencias, se utiliza este primero para la ponderacion
        if (parseInt(puntajes.HISTORIA) > parseInt(puntajes.CIENCIAS)) {

            ponderaciones = matrizCarrera[i].Pond.split(',');
            ponderOrden.push(puntajes.NEM);
            ponderOrden.push(puntajes.RANKING);
            ponderOrden.push(puntajes.MATEMATICAS);
            ponderOrden.push(puntajes.LENGUAJE);
            ponderOrden.push(puntajes.HISTORIA);
            let sum = 0;
            ponderaciones.forEach((element, index) => {
                sum += parseInt(element) * (ponderOrden[index] / 100);
            });


            if (sum > matrizCarrera[i].Ultimo) {

                if (matrizCarrera[i].Persona.length >= matrizCarrera[i].Vacantes) {
                    matrizCarrera[i].Ultimo = matrizCarrera[i].Persona[matrizCarrera[i].Vacantes - 2].pondera;
                    matrizCarrera[i].Persona.pop();
                    matrizCarrera[i].Persona.push({
                        rut: puntajes.RUT,
                        pondera: sum
                    });
                }
                if (matrizCarrera[i].Persona.length < matrizCarrera[i].Vacantes) {
                    matrizCarrera[i].Persona.push({
                        rut: puntajes.RUT,
                        pondera: sum
                    });
                }

            } else {
                if (matrizCarrera[i].Persona.length >= matrizCarrera[i].Vacantes) {} else {
                    if (matrizCarrera[i].Persona.length < matrizCarrera[i].Vacantes) {
                        matrizCarrera[i].Ultimo = sum;
                        matrizCarrera[i].Persona.push({
                            rut: puntajes.RUT,
                            pondera: sum
                        });
                    }
                }
            }
        } else {

            ponderaciones = matrizCarrera[i].Pond.split(',');
            ponderOrden.push(puntajes.NEM);
            ponderOrden.push(puntajes.RANKING);
            ponderOrden.push(puntajes.MATEMATICAS);
            ponderOrden.push(puntajes.LENGUAJE);
            ponderOrden.push(puntajes.CIENCIAS);
            let sum = 0;
            ponderaciones.forEach((element, index) => {
                sum += parseInt(element) * (ponderOrden[index] / 100);
            });

            if (sum > matrizCarrera[i].Ultimo) {
                if (matrizCarrera[i].Persona.length >= matrizCarrera[i].Vacantes) {
                    matrizCarrera[i].Ultimo = matrizCarrera[i].Persona[matrizCarrera[i].Vacantes - 2].pondera;
                    matrizCarrera[i].Persona.pop();
                    matrizCarrera[i].Persona.push({
                        rut: puntajes.RUT,
                        pondera: sum
                    });
                }
                if (matrizCarrera[i].Persona.length < matrizCarrera[i].Vacantes) {

                    matrizCarrera[i].Persona.push({
                        rut: puntajes.RUT,
                        pondera: sum
                    });
                }

            } else {
                if (matrizCarrera[i].Persona.length >= matrizCarrera[i].Vacantes) {} else {
                    if (matrizCarrera[i].Persona.length < matrizCarrera[i].Vacantes) {

                        matrizCarrera[i].Ultimo = sum;


                        matrizCarrera[i].Persona.push({
                            rut: puntajes.RUT,
                            pondera: sum
                        });
                    }
                }
            }

        }
    }
};


/*
funcion que recibe archivo codificado en 64 y lo transforma en csv
*/


// Funcion lee csv y por linea devuelve un objeto con puntajes de cada materia y el rut
// Primer "on" llama funcion promedios si el promedio entre lenguaje y matematicas es sobre 450

fs.createReadStream('puntajes3.csv')
    .pipe(csv(obj))
    .on('data', (puntajes) => {
        if ((parseInt(puntajes.LENGUAJE) + parseInt(puntajes.MATEMATICAS) / 2) > 450) {
            promedios(puntajes);
        }
    })
    .on('end', () => {
        console.log('Termina de recorrer');

        console.table(matrizCarrera);
        /*         console.log(matrizCarrera[1].Persona);
                console.log(matrizCarrera[1].Vacantes);
                console.log(matrizCarrera[1].Persona.length); */
        console.timeEnd("tiempo corriendo");
    });

/* funcion que devuelve el archivo codificado con formato hoja por carrera */