import jsonwebtoken from 'jsonwebtoken';

export const generarJWT =  (uid, name, idrol) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, idrol };

     
    jsonwebtoken.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token)

      }
    );
    
  });
};
 