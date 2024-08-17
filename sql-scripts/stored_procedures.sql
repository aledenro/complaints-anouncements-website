use denunciasCiudadanas;

drop procedure if exists get_all_anuncios;
drop procedure if exists get_anuncio;
drop procedure if exists get_count_comentarios_anuncio;
drop procedure if exists get_comentarios_anuncio;
drop procedure if exists get_comentarios_anuncio;
drop function if exists count_comments_anuncio;
drop procedure if exists get_all_denuncias;
drop procedure if exists get_denuncia;
drop function if exists count_comments_denuncia;
drop procedure if exists get_provincias;
drop procedure if exists get_cantones;
drop procedure if exists get_distritos;
drop procedure if exists get_categoria_denuncia;
drop procedure if exists insert_denuncia;
drop procedure if exists insert_anuncio;
drop procedure if exists get_categoria_anuncio;
drop procedure if exists get_id_latest_anuncio;
drop procedure if exists update_img_url;
drop procedure if exists get_categoria_denuncia;
drop procedure if exists insert_denuncia;
drop procedure if exists get_count_comentarios_denuncia;
drop procedure if exists get_comentarios_denuncia;
drop procedure if exists get_latest_denuncias;
drop procedure if exists get_latest_anuncios;
drop procedure if exists get_usuario_by_correo;


delimiter $$

CREATE FUNCTION count_comments_anuncio(vid_anuncio INT)
RETURNS INT
READS SQL DATA
BEGIN 
	DECLARE count_comments INT;

	SELECT COUNT(*)
    INTO count_comments
    FROM Anuncio_Comentario
    WHERE id_anuncio = vid_anuncio;
    
    RETURN count_comments;
END$$
-- retorna todos los anuncios 
CREATE PROCEDURE get_all_anuncios()
BEGIN
	SELECT a.id_Anuncio, a.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) usuario, a.Titulo , a.Fecha, a.oficial, a.url_imagen, count_comments_anuncio(a.id_Anuncio) cantComentarios
    FROM Anuncio a
    JOIN Usuario u ON  a.id_Usuario = u.id_Usuario
    WHERE Estado is true;
END$$

CREATE PROCEDURE get_anuncio(vid_Anuncio INT)
BEGIN
	SET lc_time_names = 'es_CR';
    
	SELECT a.id_Anuncio, a.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) usuario, a.Titulo, a.Descripcion , DATE_FORMAT(a.Fecha, '%d %M, %Y') Fecha, a.oficial, a.url_imagen, 
    CONCAT(p.Nombre, ', ', c.Nombre, ', ', d.Nombre) ubicacion, ca.Nombre categoria
    FROM Anuncio a
    JOIN Usuario u ON  a.id_Usuario = u.id_Usuario
    JOIN Provincia p ON a.id_Provincia = p.id_Provincia
    JOIN Distrito d ON a.id_Distrito = d.id_Distrito
    JOIN Canton c ON a.id_Canton = c.id_Canton
    JOIN Categoria_Anuncio ca ON a.id_CategoriaAnuncio = ca.id_CategoriaAnuncio
    WHERE id_Anuncio = vid_Anuncio;
END$$

delimiter ;

-- call get_all_anuncios();
-- call get_anuncio(1);

-- cambios valeria

DELIMITER $$

-- contar comentarios
CREATE FUNCTION count_comments_denuncia(vid_denuncia INT)
RETURNS INT
READS SQL DATA
BEGIN 
	DECLARE count_comments_d INT;

	SELECT COUNT(*)
    INTO count_comments_d
    FROM Denuncia_Comentario
    WHERE id_Denuncia = vid_denuncia;
    
    RETURN count_comments_d;
END$$


-- devolver todas las denuncias
CREATE PROCEDURE get_all_denuncias()
BEGIN
	SELECT d.id_Denuncia, d.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) usuario, d.Titulo , d.Fecha, d.url_imagen, count_comments_denuncia(d.id_Denuncia) cantComentarios, Anonimo, cd.Nombre AS Categoria
    FROM Denuncia d
    JOIN Usuario u ON  d.id_Usuario = u.id_Usuario
    JOIN Categoria_Denuncia cd ON d.id_CategoriaDenuncia = cd.id_CategoriaDenuncia
    WHERE Estado is TRUE;
END$$

CALL get_all_denuncias();


-- devolver denuncia por id
CREATE PROCEDURE get_denuncia(vid_Denuncia INT)
BEGIN
	SET lc_time_names = 'es_CR';
    
	SELECT d.id_Denuncia, d.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) Usuario, d.Titulo, d.Descripcion , DATE_FORMAT(d.Fecha, '%d %M, %Y') Fecha, d.url_imagen, 
    CONCAT(p.Nombre, ', ', c.Nombre, ', ', i.Nombre) Ubicacion, Anonimo, cd.Nombre AS Categoria
    FROM Denuncia d
    JOIN Usuario u ON  d.id_Usuario = u.id_Usuario
    JOIN Provincia p ON d.id_Provincia = p.id_Provincia
    JOIN Distrito i ON d.id_Distrito = i.id_Distrito
    JOIN Canton c ON d.id_Canton = c.id_Canton
    JOIN Categoria_Denuncia cd ON d.id_CategoriaDenuncia = cd.id_CategoriaDenuncia
    WHERE id_Denuncia = vid_Denuncia;
END$$



CALL get_denuncia(1);


CREATE PROCEDURE insert_denuncia(
    IN p_id_Usuario INT,
    IN p_Anonimo BOOLEAN,
    IN p_Titulo VARCHAR(255),
    IN p_Estado BOOLEAN,
    IN p_Fecha DATE,
    IN p_Descripcion TEXT,
    IN p_url_imagen VARCHAR(500),
    IN p_id_Provincia INT,
    IN p_id_Canton INT,
    IN p_id_Distrito INT,
    IN p_id_CategoriaDenuncia INT
)
BEGIN
    INSERT INTO Denuncia (
        id_Usuario,
        Anonimo,
        Titulo,
        Estado,
        Fecha,
        Descripcion,
        url_imagen,
        id_Provincia,
        id_Canton,
        id_Distrito,
        id_CategoriaDenuncia
    ) VALUES (
        p_id_Usuario,
        p_Anonimo,
        p_Titulo,
        p_Estado,
        p_Fecha,
        p_Descripcion,
        p_url_imagen,
        p_id_Provincia,
        p_id_Canton,
        p_id_Distrito,
        p_id_CategoriaDenuncia
    );
END$$ 

CREATE PROCEDURE insert_anuncio(
    IN p_id_Usuario INT,
    IN p_Titulo VARCHAR(255),
    IN p_Estado BOOLEAN,
    IN p_Descripcion TEXT,
    IN p_oficial BOOLEAN,
    IN p_id_Provincia INT,
    IN p_id_Canton INT,
    IN p_id_Distrito INT,
    IN p_id_CategoriaAnuncio INT,
    IN p_url_imagen VARCHAR(5)
)
BEGIN
    INSERT INTO Anuncio (
        id_Usuario,
        oficial,
        Titulo,
        Estado,
        Fecha,
        Descripcion,
        id_Provincia,
        id_Canton,
        id_Distrito,
        id_CategoriaAnuncio,
        url_imagen
    ) VALUES (
        p_id_Usuario,
        p_oficial,
        p_Titulo,
        p_Estado,
        CURRENT_DATE,
        p_Descripcion,
        p_id_Provincia,
        p_id_Canton,
        p_id_Distrito,
        p_id_CategoriaAnuncio,
        p_url_imagen
    );
END$$ 

CREATE PROCEDURE get_provincias()
BEGIN
    SELECT id_Provincia, Nombre
    FROM Provincia;
END$$ 

CREATE PROCEDURE get_cantones(vidProvincia int)
BEGIN
    SELECT id_Canton, Nombre
    FROM Canton
    WHERE id_Provincia = vidProvincia;
END$$ 

CREATE PROCEDURE get_distritos(vidCanton int)
BEGIN
    SELECT id_Distrito, Nombre
    FROM Distrito
    WHERE id_Canton = vidCanton;
END$$ 
-- get comentarios

DELIMITER $$

CREATE PROCEDURE get_comentarios_anuncio(vid_Anuncio INT)
BEGIN
	SET lc_time_names = 'es_CR';
    
    SELECT u.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) Usuario, DATE_FORMAT(ac.Fecha, '%d %M, %Y') Fecha, Texto 
    FROM Anuncio_Comentario ac
    JOIN Usuario u ON ac.id_Usuario = u.id_Usuario 
    WHERE ac.id_Anuncio = vid_Anuncio;
END$$

CREATE PROCEDURE get_count_comentarios_anuncio(vid_Anuncio INT)
BEGIN
	SELECT count_comments_anuncio(vid_Anuncio) cantComentarios FROM DUAL;
END$$



CREATE PROCEDURE get_comentarios_denuncia(vid_Denuncia INT)
BEGIN
	SET lc_time_names = 'es_CR';
    
    SELECT u.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) Usuario, DATE_FORMAT(dc.Fecha, '%d %M, %Y') Fecha, Texto 
    FROM Denuncia_Comentario dc
    JOIN Usuario u ON dc.id_Usuario = u.id_Usuario 
    WHERE dc.id_Denuncia = vid_Denuncia;
END$$

CREATE PROCEDURE get_count_comentarios_denuncia(vid_Denuncia INT)
BEGIN
	SELECT count_comments_denuncia(vid_Denuncia) cantComentarios FROM DUAL;
END$$



-- llamar categorias de denuncia

CREATE PROCEDURE get_categoria_denuncia()
BEGIN
    SELECT id_CategoriaDenuncia, nombre
    FROM Categoria_Denuncia;
END$$ 


DELIMITER $$
-- llamar las 3 ultimas denuncias 

CREATE PROCEDURE get_latest_denuncias()
BEGIN
	SELECT d.id_Denuncia, d.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) AS usuario, d.Titulo, d.Fecha, d.url_imagen, count_comments_denuncia(d.id_Denuncia) AS cantComentarios, Anonimo, cd.Nombre AS Categoria
    FROM Denuncia d
    JOIN Usuario u ON  d.id_Usuario = u.id_Usuario
    JOIN Categoria_Denuncia cd ON d.id_CategoriaDenuncia = cd.id_CategoriaDenuncia
    WHERE d.Estado IS TRUE
    ORDER BY d.Fecha DESC
    LIMIT 3;
END$$


CREATE PROCEDURE get_latest_anuncios()
BEGIN
	SELECT a.id_Anuncio, a.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) AS usuario, a.Titulo, a.Fecha, a.oficial, a.url_imagen, count_comments_anuncio(a.id_Anuncio) AS cantComentarios
    FROM Anuncio a
    JOIN Usuario u ON  a.id_Usuario = u.id_Usuario
    WHERE a.Estado IS TRUE
    ORDER BY a.Fecha DESC
    LIMIT 3;
END$$

CREATE PROCEDURE get_categoria_anuncio()
BEGIN
    SELECT id_CategoriaAnuncio, nombre
    FROM Categoria_Anuncio;
END$$ 

CREATE PROCEDURE get_id_latest_anuncio()
BEGIN
	SELECT MAX(id_anuncio) as id_anuncio FROM Anuncio;
END$$

CREATE PROCEDURE update_img_url(IN vid_anuncio INT, IN url VARCHAR(500))
BEGIN
	UPDATE Anuncio
    SET url_imagen = url
    WHERE id_anuncio = vid_anuncio;
END$$

CREATE PROCEDURE get_usuario_by_correo(IN vcorreo VARCHAR(50))
BEGIN 
	SELECT * FROM Usuario WHERE Correo =  vcorreo;
END$$


DELIMITER ;



