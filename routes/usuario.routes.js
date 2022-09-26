import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

import {
  cambiarContrasenia,
  createUsuario,
  getUsuariobyId,
  getUsuarios,
  updateUsuario,
  verificarCorreo,
} from "../controller/usuario.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
const router = Router();

router.get("/api/usuarios", validarJWT ,getUsuarios);
router.get("/api/usuario/:id", getUsuariobyId);
router.post(
  "/api/usuario",
  [
    check("nom_usu", "El nombre es obligatorio").not().isEmpty(),
    check("ape_usu", "El apellido es obligatorio").not().isEmpty(),
    check("cor_usu", "El correo es obligatorio").not().isEmpty(),
    check("pas_usu", "La contraseña es obligatoria").not().isEmpty(),
    check("tel_usu", "El teléfono es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createUsuario
);

router.post("/api/usuario/verificar", verificarCorreo);

router.put(
  "/api/usuario/:id",
  [
    check("nom_usu", "El nombre es obligatorio").not().isEmpty(),
    check("ape_usu", "El apellido es obligatorio").not().isEmpty(),
    check("tel_usu", "El teléfono es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateUsuario
);

router.put("/api/usuario/delete/:id", updateUsuario);
router.put(
  "/api/usuario/cambiar/:id",
  [
    check("pas_usu", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  cambiarContrasenia
);

export default router;
