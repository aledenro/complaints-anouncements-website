use denunciasCiudadanas;

drop procedure if exists get_all_anuncios;
drop procedure if exists get_anuncio;
drop function if exists count_comments_anuncio;

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
    CONCAT(p.Nombre, ', ', c.Nombre, ', ', d.Nombre) ubicacion
    FROM Anuncio a
    JOIN Usuario u ON  a.id_Usuario = u.id_Usuario
    JOIN Provincia p ON a.id_Provincia = p.id_Provincia
    JOIN Distrito d ON a.id_Distrito = d.id_Distrito
    JOIN Canton c ON a.id_Canton = c.id_Canton
    WHERE id_Anuncio = vid_Anuncio;
END$$

delimiter ;

-- call get_all_anuncios();
call get_anuncio(1);

-- cambios valeria

drop procedure if exists get_all_denuncias;
drop procedure if exists get_denuncia;
drop function if exists count_comments_denuncia;

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

DELIMITER $$
-- devolver todas las denuncias
CREATE PROCEDURE get_all_denuncias()
BEGIN
	SELECT d.id_Denuncia, d.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) usuario, d.Titulo , d.Fecha, d.url_imagen, count_comments_denuncia(d.id_Denuncia) cantComentarios, Anonimo
    FROM Denuncia d
    JOIN Usuario u ON  d.id_Usuario = u.id_Usuario
    WHERE Estado is TRUE;
END$$


-- devolver denuncia por id
CREATE PROCEDURE get_denuncia(vid_Denuncia INT)
BEGIN
	SET lc_time_names = 'es_CR';
    
	SELECT d.id_Denuncia, d.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) Usuario, d.Titulo, d.Descripcion , DATE_FORMAT(d.Fecha, '%d %M, %Y') Fecha, d.url_imagen, 
    CONCAT(p.Nombre, ', ', c.Nombre, ', ', i.Nombre) Ubicacion, Anonimo
    FROM Denuncia d
    JOIN Usuario u ON  d.id_Usuario = u.id_Usuario
    JOIN Provincia p ON d.id_Provincia = p.id_Provincia
    JOIN Distrito i ON d.id_Distrito = i.id_Distrito
    JOIN Canton c ON d.id_Canton = c.id_Canton
    WHERE id_Denuncia = vid_Denuncia;
END$$

DELIMITER ;

call get_denuncia(1);

