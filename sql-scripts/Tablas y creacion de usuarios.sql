/*Se crea la base de datos */
drop schema if exists denunciasCiudadanas;
drop user if exists usuario_proyecto;
CREATE SCHEMA denunciasCiudadanas ;

/*Se crea uproducton usuario para la base de datos llamado "usuario_prueba" y tiene la contraseña "Usuario_Clave."*/
create user 'usuario_proyecto'@'%' identified by '12345.';

/*Se asignan los prvilegios sobre la base de datos al usuario creado */
grant all privileges on denunciasCiudadanas.* to 'usuario_proyecto'@'%';
flush privileges;

use denunciasCiudadanas;

-- CATEGORIA ELIMINADA

-- 2. Usuario
CREATE TABLE Usuario (
    id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(25) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Telefono VARCHAR(25),
    Activo BOOLEAN,
    contrasena VARCHAR(25) NOT NULL
);

-- 3. Rol
CREATE TABLE Rol (
    id_Rol INT AUTO_INCREMENT PRIMARY KEY,
    id_Usuario INT,
    rolName VARCHAR(25) NOT NULL,
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);

-- 5. Provincia
CREATE TABLE Provincia (
    id_Provincia INT NOT NULL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

-- 6. Canton
CREATE TABLE Canton (
    id_Canton INT NOT NULL PRIMARY KEY,
    id_Provincia INT,
    Nombre VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_Provincia) REFERENCES Provincia(id_Provincia)
);

-- 7. Distrito
CREATE TABLE Distrito (
    id_Distrito INT NOT NULL PRIMARY KEY,
    id_Canton INT,
    Nombre VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_Canton) REFERENCES Canton(id_Canton)
);

-- 9. Anuncio
CREATE TABLE Anuncio (
    id_Anuncio INT AUTO_INCREMENT PRIMARY KEY,
    id_Usuario INT NOT NULL,
    Titulo VARCHAR(255) NOT NULL,
    Estado BOOLEAN NOT NULL,
    Descripcion TEXT NOT NULL,
    Fecha DATE NOT NULL,
    oficial BOOLEAN NOT NULL,
    url_imagen VARCHAR(500),
    id_Provincia INT,
    id_Canton INT,
    id_Distrito INT,
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario),
    FOREIGN KEY (id_Provincia) REFERENCES Provincia(id_Provincia),
    FOREIGN KEY (id_Canton) REFERENCES Canton(id_Canton),
    FOREIGN KEY (id_Distrito) REFERENCES Distrito(id_Distrito)
);

-- modificacion despues de eliminar categoria
ALTER TABLE Anuncio
    ADD id_CategoriaAnuncio INTEGER,
    ADD CONSTRAINT FOREIGN KEY(id_CategoriaAnuncio) REFERENCES Categoria_Anuncio(id_CategoriaAnuncio);

-- 10. Denuncia
CREATE TABLE Denuncia (
    id_Denuncia INT AUTO_INCREMENT PRIMARY KEY,
    id_Usuario INT NOT NULL,
    Anonimo BOOLEAN NOT NULL,
	Titulo VARCHAR(255) NOT NULL,
    Estado BOOLEAN NOT NULL,
    Fecha DATE NOT NULL,
    Descripcion TEXT NOT NULL,
    url_imagen VARCHAR(500),
    id_Provincia INT NOT NULL,
    id_Canton INT NOT NULL,
    id_Distrito INT NOT NULL,
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario),
    FOREIGN KEY (id_Provincia) REFERENCES Provincia(id_Provincia),
    FOREIGN KEY (id_Canton) REFERENCES Canton(id_Canton),
    FOREIGN KEY (id_Distrito) REFERENCES Distrito(id_Distrito)
);

-- modificacion despues de eliminar categoria
ALTER TABLE Denuncia
    ADD id_CategoriaDenuncia INTEGER,
    ADD CONSTRAINT FOREIGN KEY(id_CategoriaDenuncia) REFERENCES Categoria_Denuncia(id_CategoriaDenuncia);

-- 11. Categoria_Anuncio
CREATE TABLE Categoria_Anuncio (
    id_CategoriaAnuncio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 12. Categoria_Denuncia
CREATE TABLE Categoria_Denuncia (
    id_CategoriaDenuncia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 15. Anuncio_Comentario
CREATE TABLE Anuncio_Comentario (
    id_AnuncioComentario INT AUTO_INCREMENT PRIMARY KEY,
    id_Anuncio INT,
    id_Usuario INT,
    Fecha DATE,
    Texto TEXT,
    Descripcion TEXT,
    FOREIGN KEY (id_Anuncio) REFERENCES Anuncio(id_Anuncio),
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);

-- 16. Denuncia_Comentario
CREATE TABLE Denuncia_Comentario (
    id_DenunciaComentario INT AUTO_INCREMENT PRIMARY KEY,
    id_Denuncia INT NOT NULL,
    id_Usuario INT NOT NULL,
    Fecha DATE NOT NULL,
    Texto TEXT NOT NULL,
    FOREIGN KEY (id_Denuncia) REFERENCES Denuncia(id_Denuncia),
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);



