import http from 'http';
import fs from 'fs';
import express from "express";
import mysql from "mysql2";
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import path from 'path';
import { admin_router } from './route/admin-router.js';
const mysqSlqSession= MySQLStore(session)
const app= express();
app.use('/admin', admin_router)

export const sqlmap= mysql.createPool({
    user: 'root',
    password: '',
    database: 'demodb',
    queueLimit: 0,
    connectionLimit: 10
})

 const sessionStore= new mysqSlqSession(sqlmap)

app.use(session({
    name: 'demo',
    saveUninitialized: false,
    resave: false,
    secret: 'pipra',
    store: sessionStore,
    cookie:{
        maxAge: 24*60*60*1000,
        httpOnly: true,
        secure: false,
        path: '/',
        }
}))

http.createServer((req, res)=>{
    // res.write('<center><h1>Hello World</h1></center>');
    fs.readFile('./index.html', 'utf-8', (err, html)=>{
        res.end(html)
    })
}).listen(3000, ()=>{
    console.log('server ruuning on http://localhost:3000');
    
}) // ruuning on port 3000




const test= express.Router()
app.use('*', (req, res, next)=>{
    console.log('middleware router checked...');
    next()
}) // next middleware func

app.use('/test', test)

app.get('/', (req, res)=>{
res.sendFile(path.join(path.resolve(), 'index.html'));
})

test.get('/', (req, res)=>{
    res.send('test router working.....')
   // sent a new error=> throw new Error('404') 
    })


app.use((err, req, res, next)=>{
   console.log(err);
   
}) // error handling func


app.use((req, res, next)=>{
    res.send('404: Not found page')
})

app.listen(30, ()=>{
    console.log('server ruuning on http://localhost:30');
    
})