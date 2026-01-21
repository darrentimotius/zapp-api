import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private client = jwksClient({
    jwksUri: process.env.JWKS_URL!,
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization']
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Invalid Authorization header');
    }

    try {
      const decoded: any = await this.verifyToken(token);

      request.user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      };

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.getKey.bind(this),
        { audience: process.env.AUDIENCE || 'authenticated' },
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded);
        },
      );
    });
  }

  private getKey(header, callback) {
    this.client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        callback(err, null);
        return;
      }
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    });
  }
}
