import { NextFunction, Response } from "express";
import { IRequest } from "interfaces";
import httpMessage from "../utils/httpMessage";
import HttpStatusCode from "../utils/httpStatusCode";

const auth = (req : IRequest, res : Response , next : NextFunction) => {
    if(
        
        req.headers?.authorization &&
        req.headers?.authorization.split(' ')[0] === 'Bearer'
    ){
        const token = req.headers?.authorization.split(' ')[1]
        req.data = {
            _id : token
        }
        next()
    }else {
        res.status(HttpStatusCode.UNAUTHORIZED).send({msg : httpMessage.UNAUTHORIZED})
    }
}

export default auth