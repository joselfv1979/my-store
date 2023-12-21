import { sign, SignOptions } from 'jsonwebtoken';
import { CustomJwt } from '../models/Jwt';

// Generates a new token
export function generateToken(data: CustomJwt) {
  // information to be encoded in the JWT
  const { username, id, role } = data;
  const payload = {
    username,
    id,
    role
  };
  // read private key value
  const privateKey = process.env.SECRET as string;

  const signInOptions: SignOptions = {
    expiresIn: '24h'
  };

  // generate JWT
  const token = sign(payload, privateKey, signInOptions);
  return token
};