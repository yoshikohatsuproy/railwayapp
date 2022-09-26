import { pool } from "../db/connections.js";

import bcrypt from "bcrypt";

export const getUsuarios = async (req, res) => {
  try {
    const [data] = await pool.query("call sp_listarUsuarios()");

    if(idrol === 0){
      return res.status(500).json({
        ok: false,
        msg: "El usuario no es administrador",
      });
    }


    return res.status(201).json({
      data,
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }
};

export const getUsuariobyId = async (req, res) => {
  try {
    const params = req.params.id;
    const [rows] = await pool.query("call sp_UsuarioById(?)", [params]);
    return res.status(201).json({
      data: rows[0],
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nom_usu, ape_usu, cor_usu, pas_usu, tel_usu, id_tipo, idCreate } =
      req.body;


    const [filas] = await pool.query("call sp_verificarCorreo(?)", [cor_usu]);

    if (filas.length > 0) {
      return res.status(404).json({
        ok: false,
        msg: "El correo se encuentra duplicado",
      });
    }


    const salt = bcrypt.genSaltSync()
    const encriptado = bcrypt.hashSync(pas_usu, salt)
    const params = [
      nom_usu,
      ape_usu,
      cor_usu,
      encriptado,
      tel_usu,
      id_tipo,
      idCreate,
    ];


    const [rows] = await pool.query(
      "call sp_insertUsuario(?,?,?,?,?,?,?)",
      params
    );


    return res.status(201).json({
      ok: true,
      msg: "Usuario insertado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const id_user = req.params.id;
    const { nom_usu, ape_usu, tel_usu, id_tipo, idUpdate } = req.body;
    const params = [nom_usu, ape_usu, tel_usu, id_tipo, idUpdate, id_user];

    const [rows] = await pool.query(
      "call sp_actualizarUsuario(?,?,?,?,?,?)",
      params
    );

    return res.status(201).json({
      ok: true,
      msg: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const id_user = req.params.id;
    const { idUpdate } = req.body;
    const params = [idUpdate, id_user];

    const [rows] = await pool.query("call sp_eliminarUsuario(?,?)", params);

    return res.status(201).json({
      ok: true,
      msg: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }
};

export const cambiarContrasenia = async (req, res) => {
  try {
    const id_user = req.params.id;
    const { pas_usu, idUpdate } = req.body;
    
 
    const salt = bcrypt.genSaltSync()
    const encriptado = bcrypt.hashSync(pas_usu, salt)
    const params = [encriptado, idUpdate, id_user];

    const [rows] = await pool.query(
      "call sp_cambiarContrasenia(?,?,?)",
      params
    );

    return res.status(201).json({
      ok: true,
      msg: "Contraseña cambiada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }
};

export const verificarCorreo = async (req, res) => {
  const { cor_usu } = req.body;
  const [rows] = await pool.query("call sp_verificarCorreo(?)", [cor_usu]);

  return res.status(201).json({
    ok: true,
    msg: "El correo existe",
  });
};
