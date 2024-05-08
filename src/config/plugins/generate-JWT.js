// import jwt from 'jsonwebtoken';
// import { envs } from '../enviroments/enviroments.js';
// const generateJWT = id => {
//   return new Promise((resolve, reject) => {
//     const payload = { id };

//     jwt.sign(
//       payload,
//       envs.SECRET_JWD_SEED,
//       {
//         expiresIn: envs.JWT_EXPIRE_IN,
//       },
//       (err, token) => {
//         if (err) {
//           console.log(err);
//           reject(err);
//         }

//         resolve(token);
//       }
//     );
//   });
// };

// export default generateJWT