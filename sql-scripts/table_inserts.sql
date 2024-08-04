INSERT INTO Usuario (Nombre, Apellidos, Correo, Telefono, Activo, contrasena) 
VALUES 
('Juan', 'Pérez García', 'juan.perez@example.com', '555-1234', TRUE, 'password123'),
('María', 'López Fernández', 'maria.lopez@example.com', '555-5678', TRUE, 'securePass!'),
('Carlos', 'Gómez Martínez', 'carlos.gomez@example.com', '555-8765', TRUE, 'myPassword@2024'),
('Ana', 'Ruiz Sánchez', 'ana.ruiz@example.com', '555-4321', TRUE, 'anaSecure456'),
('Luis', 'Martínez Herrera', 'luis.martinez@example.com', '555-1357', FALSE, 'luisPass789');

INSERT INTO Anuncio (id_Usuario, Titulo, Estado, Descripcion, Fecha, oficial, url_imagen) 
VALUES 
(1, 'Perro perdido en el parque central', TRUE, 'Se perdió un perro de raza Labrador, color amarillo, responde al nombre de Max. Se perdió en el parque central el 1 de agosto. Por favor, si lo encuentran, contactarse con nosotros.', '2024-08-01', FALSE, 'https://firebasestorage.googleapis.com/v0/b/compliants-anouncements-web.appspot.com/o/imgs%2Flabrador.jpg?alt=media&token=8d7c2c82-9c4e-44c1-b10e-9020012a0e8b'),
(2, 'Aviso de corte de agua', TRUE, 'Se informa a los vecinos que habrá un corte de agua el próximo lunes 5 de agosto desde las 8:00 AM hasta las 2:00 PM por mantenimiento. Disculpen las molestias.', '2024-08-02', TRUE, 'https://firebasestorage.googleapis.com/v0/b/compliants-anouncements-web.appspot.com/o/imgs%2FcorteAgua.jpg?alt=media&token=1c3905c6-ebe9-4cb3-81d9-7db2af6649f6'),
(3, 'Venta de garaje', TRUE, 'Estamos organizando una venta de garaje este sábado 3 de agosto a partir de las 10:00 AM en la calle 123. Habrá muebles, ropa, y más a precios económicos. ¡No se lo pierdan!', '2024-08-02', FALSE, '');
