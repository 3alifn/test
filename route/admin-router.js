import express from "express";
import { admin_func } from "../setting/admin-app.js";
export const admin_router = express.Router();
import jwt, { decode } from "jsonwebtoken"; 
admin_router.all('/', admin_func )

admin_router.get('/session/set', (req, res)=>{
    req.session.user= {name: 'Mr. Bean', email: "inbox@mrbean.com"}
    res.end('session set now')
})

admin_router.get('/session/get', (req, res)=>{
    res.json(req.session.user)
})

admin_router.all('/jwt/set', (req, res)=>{
const token= jwt.sign({name: 'Mr. Bean', email: 'mail@bean.com'} ,"pipra", {expiresIn: '1min'})

res.cookie('auth', token)
res.json({token});

})


admin_router.all('/jwt/get', (req, res)=>{
   
    const token= req.cookies['auth']
      jwt.verify(token, 'pipra', (err, decode)=>{
        if(err) {
            throw new Error('my jwt: '+err)
           res.end()
        }
       else {
        const {name, email}= decode;
        res.json({name, email})
       }
       
      })
    
    })
    