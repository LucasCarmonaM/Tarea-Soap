const csv = require('csv-parser')
const fs = require('fs');
const { rejects } = require('assert');
const results = [];
const Headers = ['RUT', 'NEM', 'RANKING', 'MATEMATICAS', 'LENGUAJE', 'HISTORIA', 'CIENCIAS'];


const obj = {
    separator: ';',
    headers: Headers
};

// La idea es que este objeto lo arme a partir de la base de datos, queda pendiente
let carrera = {
    Codigo: '',
    Vacantes: '',
    Ultimo: ''
};
let carreras = []
const llenarCarreras = (codigo, vacantes, ultimo) => {
    carrera.Codigo = codigo;
    carrera.Vacantes = vacantes;
    carrera.Ultimo = ultimo;
    carreras.push(carrera);
}

llenarCarreras(21073, 60, 470);
llenarCarreras(21074, 100, 480);
llenarCarreras(21075, 120, 500);
console.log(carreras);




fs.createReadStream('puntajes.csv')
    .pipe(csv(obj))
    .on('data', (puntajes) => {

        if ((parseInt(puntajes.LENGUAJE) + parseInt(puntajes.MATEMATICAS) / 2) > 450) {
            results.push(puntajes);
        }

    })
    .on('end', () => {
        console.log(results);
        console.log(results.length);
    });