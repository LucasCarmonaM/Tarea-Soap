create database carreras;

use carreras;

create table carrera(
	nombreCarrera varchar(100),
    codigo int primary key not null,
	nem int,
	ranking int,
	lenguaje int, 
	matematica int,
	cienciasHistoria int,
	avgLengMat int,
	vacantes int,
	primero float,
	ultimo float 
);

insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Administración Pública', 21089,15,20,30,25,10,450,35,625.8, 513);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Bibliotecología y Documentación',21002,20,20,40,10,10,450,35,675.3,453.6);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Contador Público y Auditor', 21012,20,	20, 30,	15,	15,	450, 80, 635.55, 452.2);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Comercial', 21048,  10, 20, 30, 30, 10, 450, 125, 652.9,	496.9);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Administración Agroindustrial', 21015, 10,20,30,30,10,450,30,628.8,461.8);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Comercio Internacional',21081,10,20,30,30,10,450,90,637.2,458.8);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Gestión Turística', 21082,10,20,30,30,10,450,25,659.4,448.1);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Arquitectura',21047,15,25,20,20,20,450,100,640.2,527.4);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Civil en Obras Civiles',21074,20,20,15,35,	10,450,100,625,476.1);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Construcción',21032,20,20,15,35,10,450,100,716.3,476.95);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Civil en Prevención de Riesgos y Medioambiente',21087,15,35,20,20,10,450,30,615.2,462.85);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Biotecnología',21073,15,25,20,30,10,450,60,675.8,540.9);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Industria Alimentaria',21039,15,25,20,30,10,450,30,680.2,464.9);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Química',21080,10,25,15,30,20,450,80,606.55,451.7);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Química Industrial',21083,10,25,15,30,20,450,40,596.05,472);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Diseño en Comunicación Visual',21024,10,40,30,10,10,450,100,706.3,440.2);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Diseño Industrial',21023,10,40,30,10,10,450,65,642.2,439.9);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Trabajo Social',21043,20,30,20,10,20,450,95,705.9,510.5);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Bachillerato en Ciencias de la Ingeniería',21046,10,25,20,35,10,450,25,586.45,504.25);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Dibujante Proyectista',21071,10,25,20,35,10,450,25,689.85,496.45);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Civil en Computación, mención Informática',21041,10,25,20,35,10,450,130,673.65,539.35);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Civil Industrial',21076,10,25,20,35,10,450,200,671.25,500.85);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Civil en Ciencia de Datos',21049,10,25,20,35,10,450,60,673.65,539.35);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Civil Electrónica',21075,10,25,20,35,10,450,80	,657.35,500.65);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Civil en Mecánica',21096,10,25,20,35,10,450,90	,697.65,506.8);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Geomensura',21031,10,25,20,35,10,450,60,614.3,487.85);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería en Informática',21030,10,25,20,35,10,450,105,705.15,507.75);
insert into carrera(nombreCarrera, codigo, nem, ranking, lenguaje, matematica, cienciasHistoria, avgLengMat, vacantes, primero, ultimo) values ('Ingeniería Industrial',21045,10,25,20,35,10,450,60,584.75,476.25);

select * from carrera;