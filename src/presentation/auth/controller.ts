import {type Request, type Response} from 'express'
import { JwtAdapter } from '../../config/jwt.adapter';

declare module 'express' {
    interface Request {
      user?: any; // O puedes especificar un tipo concreto en lugar de 'any'
    }
  }

  export interface JwtPayload {
    id: string
}

export class AuthenticationController {

    revalidateToken = async(req: Request, res: Response) =>{
              try{
                    const user = req.user as JwtPayload;
                    const payload: JwtPayload = {id:req.user};
                    if(!user)
                        return res.status(401).json({
                            success:false,
                            message:"Usuario no autenticado"
                        });
                    const newToken = await JwtAdapter.generateToken(payload);
                    res.status(200).json({token:newToken, message: "Token revalidado",
                        id:payload.id
                        });
                  
              } catch(err){
                  res.status(500).json({error: 'Error al revalidar el token'});
              }
    };
    
}