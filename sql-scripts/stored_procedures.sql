use denunciasCiudadanas;

-- drop procedure if exists get_all_denuncias;

delimiter $$
-- retorna todos los anuncios 
CREATE PROCEDURE get_all_denuncias()
BEGIN
	SELECT a.id_Anuncio, a.id_Usuario, CONCAT(u.Nombre, ' ', u.Apellidos) usuario, a.Titulo , a.Fecha, a.oficial, a.url_imagen
    FROM Anuncio a
    JOIN Usuario u ON  a.id_Usuario = u.id_Usuario
    WHERE Estado is true;
END$$

delimiter ;

-- call get_all_denuncias();