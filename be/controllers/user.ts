import { Request, Response } from "express";
import { IRequest } from "interfaces";
import { Users } from "model";
import httpMessage from "../utils/httpMessage";
import HttpStatusCode from "../utils/httpStatusCode";

export const get =async (req : IRequest, res : Response) => {
    const {_id} = req.data
    
    const user = await Users.findById(_id).select("-password")
    res.send({msg : httpMessage.OK , result : user})
}

export const post =async (req : Request, res : Response) => {
    let {username , password} = req.body
    username = username?.trim()?.replace(/ /g , '')
    password = password?.trim()?.replace(/ /g , '')
    if(!username || !password) return res.status(HttpStatusCode.BAD_REQUEST).send({msg : httpMessage.BAD_REQUEST})
    await Users.create({
        username,
        password
    })
    res.status(HttpStatusCode.CREATED).send({msg : httpMessage.CREATED})
}

export const auth =async (req : Request, res : Response) => {
    let {username , password} = req.body
    username = username?.trim()?.replace(/ /g , '')
    password = password?.trim()?.replace(/ /g , '')
    if(!username || !password) return res.status(HttpStatusCode.BAD_REQUEST).send({msg : httpMessage.BAD_REQUEST})

    const isCorrectUser = await Users.findOne({username , password})
    if(!isCorrectUser) return res.status(HttpStatusCode.BAD_REQUEST).send({msg : httpMessage.BAD_REQUEST})
    
    res.status(HttpStatusCode.OK).send({msg : httpMessage.OK , result : {
        jwt : isCorrectUser._id
    }})
}

export const patch = async (req : IRequest, res : Response) => {
    const body = req.body
    const {_id} = req.data
    delete body.username

    await Users.findByIdAndUpdate(_id, body)
    res.send({msg : httpMessage.OK})
    
}