import { sign, SignOptions } from 'jsonwebtoken';

// Generates a new token
export function generateToken(id: string, username: string, role: string) {
  // information to be encoded in the JWT
  const payload = {
    username,
    id,
    role
  };
  // read private key value
  const privateKey = process.env.SECRET;

  const signInOptions: SignOptions = {
    expiresIn: '24h'
  };

  // generate JWT
  const token = sign(payload, privateKey, signInOptions);
  return token
};