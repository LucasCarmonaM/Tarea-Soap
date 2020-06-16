const csv = require('csv-parser')
const fs = require('fs');
const { rejects } = require('assert');
const pool = require('../db/coneccion');

const results = [];
const Headers = ['RUT', 'NEM', 'RANKING', 'MATEMATICAS', 'LENGUAJE', 'HISTORIA', 'CIENCIAS'];

// OPCIONES PARA PIPE CSV PARAMETRO
const obj = {
    separator: ';',
    headers: Headers
};

// Se pide query con siguientes datos de la base de datos de las carreras
let carrera = {
    Codigo: '',
    Vacantes: '',
    Ultimo: '',
    PonNem: '',
    PonRank: '',
    PonMat: '',
    PonLen: '',
    PonHist: '',
    PonCien: ''
};



let carreras = [];
// Funcion de query, recibe la consulta a la base de datos y devuelve el objeto

let getData = async(query) => {
    let data = await pool.query(query);
    if (!data) {
        throw new Error('Error!');
    } else {
        return data;
    }
}

getData('select codigo,nem,ranking,lenguaje,matematica,cienciasHistoria,vacantes,ultimo from carrera order by ultimo desc;')
    .then(data => {
        console.log(data[0].codigo);
        carreras = data;
        pool.end(e => console.log('Se cerro query'));
    })
    .catch(err => console.log(err));


setTimeout(() => {
    console.log(carreras);
}, 4000);


console.log(carreras);



/* const llenarCarreras = () => {

    //llamada a base de datos

    for (let i = 0; i < 28; i++) {
        carrera.Codigo = codigo;
        carrera.Vacantes = vacantes;
        carrera.Ultimo = ultimo;
        carrera.PonNem = PonNem;
        carrera.PonRank = ultimo;
        carrera.PonMat = ultimo;
        carrera.PonLen = ultimo;
        carrera.PonHistCien = ultimo;
        carreras.push(carrera);
    }

}


//funcion que devuelve un arreglo con los puntajes ponderados por carrera del 0 al 27 (28 carreras)
const promedios = (puntajes) => {
    let prom = [];
    // 28 es la cantidad de carreras
    for (let i = 0; i < 28; i++) {
        if (carreras[i].HISTORIA > carreras[i].CIENCIAS) {
            prom.push(carreras[i].RANKING * carreras[i].carrera.PonRank + carreras[i].NEM * carreras[i].carrera.PonRank + carreras[i].MATEMATICAS + carreras[i].HISTORIA + carreras[i].LENGUAJE);
        } else {
            prom.push(carreras[i].RANKING * carreras[i].carrera.PonRank + carreras[i].NEM * carreras[i].carrera.PonRank + carreras[i].MATEMATICAS + carreras[i].CIENCIAS + carreras[i].LENGUAJE);
        }
    }
}


fs.createReadStream('puntajes.csv')
    .pipe(csv(obj))
    .on('data', (puntajes) => {
        if ((parseInt(puntajes.LENGUAJE) + parseInt(puntajes.MATEMATICAS) / 2) > 450) {
            promedios(puntajes);
            if () {
                results.push(puntajes);
            }
        }
    })
    .on('end', () => {
        console.log(results);
        console.log(results.length);
    }); */