import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authconfig from '../config/auth';

import AppErro from '../errors/AppErro';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {

  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppErro('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try{
    const decoded = verify(token, authconfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub
    }

   next();
  }catch{
    throw new AppErro('Invalid Token');
  }
}
