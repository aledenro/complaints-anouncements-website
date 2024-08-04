-- provincias
INSERT INTO Provincia (id_Provincia, Nombre) VALUES 
 (1, 'San José'),
 (2, 'Alajuela'),
 (3, 'Cartago'),
 (4, 'Heredia'),
 (5, 'Guanacaste'),
 (6, 'Puntarenas'),
 (7, 'Limón');

-- cantones por provincia
INSERT INTO Canton (id_Canton, id_Provincia, Nombre) VALUES 
 (101, 1, 'San José'),
 (102, 1, 'Escazú'),
 (103, 1, 'Desamparados'),
 (104, 1, 'Puriscal'),
 (105, 1, 'Tarrazú'),
 (106, 1, 'Aserrí'),
 (107, 1, 'Mora'),
 (108, 1, 'Goicoechea'),
 (109, 1, 'Santa Ana'),
 (110, 1, 'Alajuelita'),
 (111, 1, 'Vasquez de Coronado'),
 (112, 1, 'Acosta'),
 (113, 1, 'Tibás'),
 (114, 1, 'Moravia'),
 (115, 1, 'Montes de Oca'),
 (116, 1, 'Turrubares'),
 (117, 1, 'Dota'),
 (118, 1, 'Curridabat'),
 (119, 1, 'Pérez Zeledón'),
 (120, 1, 'León Cortés'),
 (201, 2, 'Alajuela'),
 (202, 2, 'San Ramón'),
 (203, 2, 'Grecia'),
 (204, 2, 'San Mateo'),
 (205, 2, 'Atenas'),
 (206, 2, 'Naranjo'),
 (207, 2, 'Palmares'),
 (208, 2, 'Poás'),
 (209, 2, 'Orotina'),
 (210, 2, 'San Carlos'),
 (211, 2, 'Alfaro Ruiz'),
 (212, 2, 'Valverde Vega'),
 (213, 2, 'Upala'),
 (214, 2, 'Los Chiles'),
 (215, 2, 'Guatuso'),
 (301, 3, 'Cartago'),
 (302, 3, 'Paraíso'),
 (303, 3, 'La Unión'),
 (304, 3, 'Jiménez'),
 (305, 3, 'Turrialba'),
 (306, 3, 'Alvarado'),
 (307, 3, 'Oreamuno'),
 (308, 3, 'El Guarco'),
 (401, 4, 'Heredia'),
 (402, 4, 'Barva'),
 (403, 4, 'Santo Domingo'),
 (404, 4, 'Santa Bárbara'),
 (405, 4, 'San Rafael'),
 (406, 4, 'San Isidro'),
 (407, 4, 'Belén'),
 (408, 4, 'Flores'),
 (409, 4, 'San Pablo'),
 (410, 4, 'Sarapiquí'),
 (501, 5, 'Liberia'),
 (502, 5, 'Nicoya'),
 (503, 5, 'Santa Cruz'),
 (504, 5, 'Bagaces'),
 (505, 5, 'Carrillo'),
 (506, 5, 'Cañas'),
 (507, 5, 'Abangares'),
 (508, 5, 'Tilarán'),
 (509, 5, 'Nandayure'),
 (510, 5, 'La Cruz'),
 (511, 5, 'Hojancha'),
 (601, 6, 'Puntarenas'),
 (602, 6, 'Esparza'),
 (603, 6, 'Buenos Aires'),
 (604, 6, 'Montes de Oro'),
 (605, 6, 'Osa'),
 (606, 6, 'Aguirre'),
 (607, 6, 'Golfito'),
 (608, 6, 'Coto Brus'),
 (609, 6, 'Parrita'),
 (610, 6, 'Corredores'),
 (611, 6, 'Garabito'),
 (701, 7, 'Limón'),
 (702, 7, 'Pococí'),
 (703, 7, 'Siquirres'),
 (704, 7, 'Talamanca'),
 (705, 7, 'Matina'),
 (706, 7, 'Guácimo');

-- distrito por canton y provincia
INSERT INTO Distrito (id_Distrito, id_Canton, Nombre) VALUES 
 (10101, 101, 'Carmen'),
 (10102, 101, 'Merced'),
 (10103, 101, 'Hospital'),
 (10104, 101, 'Catedral'),
 (10105, 101, 'Zapote'),
 (10106, 101, 'San Francisco de Dos Ríos'),
 (10107, 101, 'Uruca'),
 (10108, 101, 'Mata Redonda'),
 (10109, 101, 'Pavas'),
 (10110, 101, 'Hatillo'),
 (10111, 101, 'San Sebastián'),
 (10201, 102, 'Escazú'),
 (10202, 102, 'San Antonio'),
 (10203, 102, 'San Rafael'),
 (10301, 103, 'Desamparados'),
 (10302, 103, 'San Miguel'),
 (10303, 103, 'San Juan de Dios'),
 (10304, 103, 'San Rafael Arriba'),
 (10305, 103, 'San Antonio'),
 (10306, 103, 'Frailes'),
 (10307, 103, 'Patarrá'),
 (10308, 103, 'San Cristóbal'),
 (10309, 103, 'Rosario'),
 (10310, 103, 'Damas'),
 (10311, 103, 'San Rafael Abajo'),
 (10312, 103, 'Gravilias'),
 (10313, 103, 'Los Guido'),
 (10401, 104, 'Santiago'),
 (10402, 104, 'Mercedes Sur'),
 (10403, 104, 'Barbacoas'),
 (10404, 104, 'Grifo Alto'),
 (10405, 104, 'San Rafael'),
 (10406, 104, 'Candelaria'),
 (10407, 104, 'Desamparaditos'),
 (10408, 104, 'San Antonio'),
 (10409, 104, 'Chires'),
 (10501, 105, 'San Marcos'),
 (10502, 105, 'San Lorenzo'),
 (10503, 105, 'San Carlos'),
 (10601, 106, 'Aserrí'),
 (10602, 106, 'Tarbaca o Praga'),
 (10603, 106, 'Vuelta de Jorco'),
 (10604, 106, 'San Gabriel'),
 (10605, 106, 'La Legua'),
 (10606, 106, 'Monterrey'),
 (10607, 106, 'Salitrillos'),
 (10701, 107, 'Colón'),
 (10702, 107, 'Guayabo'),
 (10703, 107, 'Tabarcia'),
 (10704, 107, 'Piedras Negras'),
 (10705, 107, 'Picagres'),
 (10801, 108, 'Guadalupe'),
 (10802, 108, 'San Francisco'),
 (10803, 108, 'Calle Blancos'),
 (10804, 108, 'Mata de Plátano'),
 (10805, 108, 'Ipís'),
 (10806, 108, 'Rancho Redondo'),
 (10807, 108, 'Purral'),
 (10901, 109, 'Santa Ana'),
 (10902, 109, 'Salitral'),
 (10903, 109, 'Pozos o Concepción'),
 (10904, 109, 'Uruca o San Joaquín'),
 (10905, 109, 'Piedades'),
 (10906, 109, 'Brasil'),
 (11001, 110, 'Alajuelita'),
 (11002, 110, 'San Josecito'),
 (11003, 110, 'San Antonio'),
 (11004, 110, 'Concepción'),
 (11005, 110, 'San Felipe'),
 (11101, 111, 'San Isidro'),
 (11102, 111, 'San Rafael'),
 (11103, 111, 'Dulce Nombre de Jesús'),
 (11104, 111, 'Patalillo'),
 (11105, 111, 'Cascajal'),
 (11201, 112, 'San Ignacio'),
 (11202, 112, 'Guaitil'),
 (11203, 112, 'Palmichal'),
 (11204, 112, 'Cangrejal'),
 (11205, 112, 'Sabanillas'),
 (11301, 113, 'San Juan'),
 (11302, 113, 'Cinco Esquinas'),
 (11303, 113, 'Anselmo Llorente'),
 (11304, 113, 'León XIII'),
 (11305, 113, 'Colima'),
 (11401, 114, 'San Vicente'),
 (11402, 114, 'San Jerónimo'),
 (11403, 114, 'Trinidad'),
 (11501, 115, 'San Pedro'),
 (11502, 115, 'Sabanilla'),
 (11503, 115, 'Mercedes o Betania'),
 (11504, 115, 'San Rafael'),
 (11601, 116, 'San Pablo'),
 (11602, 116, 'San Pedro'),
 (11603, 116, 'San Juan de Mata'),
 (11604, 116, 'San Luis'),
 (11605, 116, 'Cárara'),
 (11701, 117, 'Santa María'),
 (11702, 117, 'Jardín'),
 (11703, 117, 'Copey'),
 (11801, 118, 'Curridabat'),
 (11802, 118, 'Granadilla'),
 (11803, 118, 'Sánchez'),
 (11804, 118, 'Tirrases'),
 (11901, 119, 'San Isidro de el General'),
 (11902, 119, 'General'),
 (11903, 119, 'Daniel Flores'),
 (11904, 119, 'Rivas'),
 (11905, 119, 'San Pedro'),
 (11906, 119, 'Platanares'),
 (11907, 119, 'Pejibaye'),
 (11908, 119, 'Cajón'),
 (11909, 119, 'Barú'),
 (11910, 119, 'Río Nuevo'),
 (11911, 119, 'Páramo'),
 (12001, 120, 'San Pablo'),
 (12002, 120, 'San Andrés'),
 (12003, 120, 'Llano Bonito'),
 (12004, 120, 'San Isidro'),
 (12005, 120, 'Santa Cruz'),
 (12006, 120, 'San Antonio');

-- test inserts usuarios
INSERT INTO Usuario (Nombre, Apellidos, Correo, Telefono, Activo, contrasena) 
VALUES 
('Juan', 'Pérez García', 'juan.perez@example.com', '555-1234', TRUE, 'password123'),
('María', 'López Fernández', 'maria.lopez@example.com', '555-5678', TRUE, 'securePass!'),
('Carlos', 'Gómez Martínez', 'carlos.gomez@example.com', '555-8765', TRUE, 'myPassword@2024'),
('Ana', 'Ruiz Sánchez', 'ana.ruiz@example.com', '555-4321', TRUE, 'anaSecure456'),
('Luis', 'Martínez Herrera', 'luis.martinez@example.com', '555-1357', FALSE, 'luisPass789');

-- test inserts anuncios 
INSERT INTO Anuncio (id_Usuario, Titulo, Estado, Descripcion, Fecha, oficial, url_imagen, id_Provincia, id_Canton, id_Distrito) 
VALUES 
(1, 'Perro perdido en el parque central', TRUE, 'Se perdió un perro de raza Labrador, color amarillo, responde al nombre de Max. Se perdió en el parque central el 1 de agosto. Por favor, si lo encuentran, contactarse con nosotros.', '2024-08-01', FALSE, 'https://firebasestorage.googleapis.com/v0/b/compliants-anouncements-web.appspot.com/o/imgs%2Flabrador.jpg?alt=media&token=8d7c2c82-9c4e-44c1-b10e-9020012a0e8b', 1, 101, 10101),
(2, 'Aviso de corte de agua', TRUE, 'Se informa a los vecinos que habrá un corte de agua el próximo lunes 5 de agosto desde las 8:00 AM hasta las 2:00 PM por mantenimiento. Disculpen las molestias.', '2024-08-02', TRUE, 'https://firebasestorage.googleapis.com/v0/b/compliants-anouncements-web.appspot.com/o/imgs%2FcorteAgua.jpg?alt=media&token=1c3905c6-ebe9-4cb3-81d9-7db2af6649f6', 1, 102, 10201),
(3, 'Venta de garaje', TRUE, 'Estamos organizando una venta de garaje este sábado 3 de agosto a partir de las 10:00 AM en la calle 123. Habrá muebles, ropa, y más a precios económicos. ¡No se lo pierdan!', '2024-08-02', FALSE, '', 1, 103, 10301);
