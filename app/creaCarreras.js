const fs = require('fs');


let carreras = [];

const creaCarreras = () => {
    try {
        carreras = require('carreras.JSON');
    } catch (error) {
        carreras = [];
    }
    return carreras;
}

const pushCarreras = (codigo, vacantes) => {
    let carreras = creaCarreras();

    let datos = {
        Codigo: codigo,
        Vacantes: vacantes
    };

    carreras.push(datos);
    console.log(carreras);
}

pushCarreras('21073', '60');