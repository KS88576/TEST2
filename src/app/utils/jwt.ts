import jwt from 'jsonwebtoken';
import { User } from '../../../lib/user';

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(user: User): string {
  return jwt.sign(
    {
      sub: user._id?.toString(),
      walletAddress: user.walletAddress,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}