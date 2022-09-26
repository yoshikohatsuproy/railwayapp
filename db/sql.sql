CREATE DATABASE IF NOT EXISTS railwayapp;

USE railwayapp;

create table tb_tipo (
	id int primary key auto_increment,
    nom_tipo varchar(100)
);

insert into tb_tipo (nom_tipo) values ('GLOBAL');
insert into tb_tipo (nom_tipo) values ('NORMAL');


create table tb_usuario(
    id int primary key auto_increment,
    nom_usu varchar(255),
    ape_usu varchar(255),
    cor_usu varchar(255) unique, 
    pas_usu varchar(255),
    tel_usu varchar(10),
    id_tipo int,
    activo int,
    idCreate int,
    createAt datetime,
    idUpdate int,
    updateAt datetime,
    FOREIGN KEY (id_tipo) REFERENCES tb_tipo(id)
);

/* LISTAR USUARIOS */
delimiter //
 create procedure sp_listarUsuarios( 
 )
 begin
	 select * from tb_usuario;
 end //
 delimiter ;

 call sp_listarUsuarios();

/* LISTAR USUARIO BY ID */
 delimiter //
 create procedure sp_UsuarioById( 
	_id int
 )
 begin
	 select * from tb_usuario where id = _id;
 end //
 delimiter ;

 /* INSERTAR USUARIO */
   delimiter //
 create procedure sp_insertUsuario( 
	_nom_usu varchar(255),
    _ape_usu varchar(255),
    _cor_usu varchar(255),
    _pas_usu varchar(255),
    _tel_usu varchar(10),
    _id_tipo int,
    _idCreate int
 )
 begin
	 insert into tb_usuario ( nom_usu, ape_usu, cor_usu, pas_usu, tel_usu, id_tipo, activo, idCreate, createAt, idUpdate, updateAt)
     values  ( _nom_usu, _ape_usu, _cor_usu, _pas_usu, _tel_usu, _id_tipo, 1, _idCreate, curdate(), _idCreate, curdate());
 end //
 delimiter ;
