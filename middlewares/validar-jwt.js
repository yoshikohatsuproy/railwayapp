import { response } from "express";
import jsonwebtoken from 'jsonwebtoken';

export const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const  { uid, name, idrol} = jsonwebtoken.verify(
        token,
        process.env.SECRET_JWT_SEED
    )
        
    req.uid = uid
    req.name = name
    req.idrol = idrol

} catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error comuniquese con el administrador",
    });
  }

  next();
};
