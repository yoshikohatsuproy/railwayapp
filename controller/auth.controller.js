import { pool } from "../db/connections.js";

import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/jwt.js";

export const login = async (req, res) => {
  try {
    const { cor_usu, pas_usu } = req.body;
    const [filas] = await pool.query("call sp_verificarCorreo(?)", [cor_usu]);

    if (filas.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "El correo no se encuentra registrado",
      });
    }

    const id = filas[0][0].id;
    const id_tipo = filas[0][0].id_tipo;
    const activo = filas[0][0].activo;
    const password = filas[0][0].pas_usu;
    const nombre = filas[0][0].nom_usu;

    if (activo === 0) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario se encuentra bloqueado",
      });
    }

    console.log(password, pas_usu)
    const encriptado = bcrypt.compareSync(pas_usu,password)

    if (!encriptado){
        return res.status(404).json({
            ok: false,
            msg: 'La contraseñas no coinciden'
        })
    }

    const token = await generarJWT(id, nombre, id_tipo)
      
    return res.status(201).json({
        ok: true,
        msg: 'Bienvenido ' + nombre,
        token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }
};
