import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";

declare global {
    namespace Express {
        interface Request {
            user?: { id: string}; 
        }
    }
}

export class AuthMiddleware{
    static async validateJWT(req: Request, res: Response, next: NextFunction){
        const authorization = req.header('Authorization');
        if(!authorization)
            return res.status(401).json({
                success:false,
                statusCode: 55,
                statusMessage: 'Token no recibido'
            });
        if(!authorization.startsWith('Bearer'))
            return res.status(401).json({
                success:false,
                statusCode: 54,
                statusMessage: 'Token malformado'
            });
        const token = authorization.split(' ')[1] || '';
        try{
            const payload = await JwtAdapter.validateToken<{id:string}>(token);
            if(!payload)
                return res.status(401).json({
                    success:false,
                    statusCode: 53,
                    statusMessage: 'Token no válido'
                });
            req.user = payload;
            next();
        }catch(err:any){
            return res.status(401).json({
                success: false,
                statusCode: 53, 
                statusMessage: 'Token no válido',
                error: err.message
            });
        }
    }
}