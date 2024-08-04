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

-- 1. Categorias
CREATE TABLE Categorias (
    id_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

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

-- 4. Pais
CREATE TABLE Pais (
    id_Pais INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(20) NOT NULL
);

-- 5. Provincia
CREATE TABLE Provincia (
    id_Provincia INT AUTO_INCREMENT PRIMARY KEY,
    id_Pais INT,
    Nombre VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_Pais) REFERENCES Pais(id_Pais)
);

-- 6. Distrito
CREATE TABLE Distrito (
    id_Distrito INT AUTO_INCREMENT PRIMARY KEY,
    id_Provincia INT,
    Nombre VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_Provincia) REFERENCES Provincia(id_Provincia)
);

-- 7. Canton
CREATE TABLE Canton (
    id_Canton INT AUTO_INCREMENT PRIMARY KEY,
    id_Distrito INT,
    Nombre VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_Distrito) REFERENCES Distrito(id_Distrito)
);

-- 8. Ubicacion
CREATE TABLE Ubicacion (
    id_Ubicacion INT AUTO_INCREMENT PRIMARY KEY,
    id_Canton INT,
    id_Provincia INT,
    id_Distrito INT,
    Nombre VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_Canton) REFERENCES Canton(id_Canton),
    FOREIGN KEY (id_Provincia) REFERENCES Provincia(id_Provincia),
    FOREIGN KEY (id_Distrito) REFERENCES Distrito(id_Distrito)
);

-- 9. Anuncio
CREATE TABLE Anuncio (
    id_Anuncio INT AUTO_INCREMENT PRIMARY KEY,
    id_Usuario INT,
    Titulo VARCHAR(255) NOT NULL,
    Estado BOOLEAN,
    Descripcion TEXT,
    Fecha DATE,
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);

-- 10. Denuncia
CREATE TABLE Denuncia (
    id_Denuncia INT AUTO_INCREMENT PRIMARY KEY,
    id_Usuario INT,
    Estado BOOLEAN,
    Fecha DATE,
    Titulo VARCHAR(255),
    Descripcion TEXT,
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);

-- 11. Categoria_Anuncio
CREATE TABLE Categoria_Anuncio (
    id_CategoriaAnuncio INT AUTO_INCREMENT PRIMARY KEY,
    id_Anuncio INT,
    id_Categoria INT,
    FOREIGN KEY (id_Anuncio) REFERENCES Anuncio(id_Anuncio),
    FOREIGN KEY (id_Categoria) REFERENCES Categorias(id_Categoria)
);

-- 12. Categoria_Denuncia
CREATE TABLE Categoria_Denuncia (
    id_CategoriaDenuncia INT AUTO_INCREMENT PRIMARY KEY,
    id_Denuncia INT,
    id_Categoria INT,
    FOREIGN KEY (id_Denuncia) REFERENCES Denuncia(id_Denuncia),
    FOREIGN KEY (id_Categoria) REFERENCES Categorias(id_Categoria)
);

-- 13. Ubicacion_Anuncio
CREATE TABLE Ubicacion_Anuncio (
    id_UbicacionAnuncio INT AUTO_INCREMENT PRIMARY KEY,
    id_Anuncio INT,
    id_Ubicacion INT,
    FOREIGN KEY (id_Anuncio) REFERENCES Anuncio(id_Anuncio),
    FOREIGN KEY (id_Ubicacion) REFERENCES Ubicacion(id_Ubicacion)
);

-- 14. Ubicacion_Denuncia
CREATE TABLE Ubicacion_Denuncia (
    id_UbicacionDenuncia INT AUTO_INCREMENT PRIMARY KEY,
    id_Denuncia INT,
    id_Ubicacion INT,
    FOREIGN KEY (id_Denuncia) REFERENCES Denuncia(id_Denuncia),
    FOREIGN KEY (id_Ubicacion) REFERENCES Ubicacion(id_Ubicacion)
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
    id_Denuncia INT,
    id_Usuario INT,
    Fecha DATE,
    Texto TEXT,
    Descripcion TEXT,
    FOREIGN KEY (id_Denuncia) REFERENCES Denuncia(id_Denuncia),
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);
