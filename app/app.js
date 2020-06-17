const csv = require('csv-parser')
const fs = require('fs');
const { rejects } = require('assert');
const dbConnection = require('../db/coneccion');
const { connect } = require('http2');
const json = require('./carreras.json');

const results = [];
const Headers = ['RUT', 'NEM', 'RANKING', 'MATEMATICAS', 'LENGUAJE', 'HISTORIA', 'CIENCIAS'];

// OPCIONES PARA PIPE CSV PARAMETRO
const obj = {
    separator: ';',
    headers: Headers
};

// objeto que ira en objMatriz que permite tener el rut y la ponderacion juntos
let ponderando = {
    rut: '',
    pondera: ''
};

//objeto utilizada para tener las 28 carreras con un arreglo de objetos que son par de datos, el rut y su ponderacion
const objMatriz = {
    Codigo: '',
    Vacantes: '',
    Ultimo: 0,
    Pond: '',
    Persona: []
};

// esta matriz tiene el objeto anterior, 28 veces 0- 27
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





//funcion que devuelve trabaja arreglo con los puntajes ponderados por carrera del 0 al 27 (28 carreras)
const promedios = (puntajes) => {
    let prom = [];
    //array del split de las ponderaciones del objeto con cada carrera dentro de matrizCarrera[posicion]
    ponderaciones = [];
    let ponderOrden = [];
    // 28 es la cantidad de carreras Indices 0 - 27 carreras de array de objetos "carreras"
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
                    ponderando.rut = puntajes.RUT;
                    ponderando.pondera = sum;
                    matrizCarrera[i].Persona.push({
                        rut: puntajes.RUT,
                        pondera: sum
                    });
                }

            } else {
                if (matrizCarrera[i].Persona.length >= matrizCarrera[i].Vacantes) {} else {
                    if (matrizCarrera[i].Persona.length < matrizCarrera[i].Vacantes) {

                        matrizCarrera[i].Ultimo = sum;

                        ponderando.rut = puntajes.RUT;
                        ponderando.pondera = sum;
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

                    ponderando.rut = puntajes.RUT;
                    ponderando.pondera = sum;
                    matrizCarrera[i].Persona.push({
                        rut: puntajes.RUT,
                        pondera: sum
                    });
                }

            } else {
                if (matrizCarrera[i].Persona.length >= matrizCarrera[i].Vacantes) {} else {
                    if (matrizCarrera[i].Persona.length < matrizCarrera[i].Vacantes) {

                        matrizCarrera[i].Ultimo = sum;

                        ponderando.rut = puntajes.RUT;
                        ponderando.pondera = sum;
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

fs.createReadStream('puntajes2.csv')
    .pipe(csv(obj))
    .on('data', (puntajes) => {
        if ((parseInt(puntajes.LENGUAJE) + parseInt(puntajes.MATEMATICAS) / 2) > 450) {
            promedios(puntajes);
        }
    })
    .on('end', () => {
        console.log('Termina de recorrer');

        console.log(matrizCarrera);
        console.log(matrizCarrera[1].Persona);
        console.log(matrizCarrera[1].Vacantes);
        console.log(matrizCarrera[1].Persona.length);
    });