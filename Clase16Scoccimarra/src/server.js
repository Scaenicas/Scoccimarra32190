import express, { json, urlencoded } from 'express';

import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { join } from 'path';


import ContenedorSQL from './managers/sqlContainer.js';
import ContenedorChatSQL from './managers/sqlContainerChat.js';

import optionsMySQL from '../options/mysqlconn.js';
import optionsSQLite from '../options/SQLiteconn.js';

let container = new ContenedorSQL(optionsMySQL, "articulos");
let chatContainer = new ContenedorChatSQL(optionsSQLite, "mensajes");

const viewsFolder = join('./',"views");

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`Server Port ${PORT}`));

app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static('public'))

app.engine("handlebars", engine());

app.set("views", viewsFolder);

app.set("view engine", "handlebars");

//Websocket

//Config websocket
const io = new Server(server);


//Detectar cada socket de un cliente que se conecte
io.on("connection", async(socket)=>{
    console.log("Nuevo cliente conectado");
    //Chat
    const chat = await chatContainer.listarMensajes();
    socket.emit("messagesChat", chat);

    //Products
    const products = await container.listarArticulos();
    socket.emit("products", products);

    //Recibir msg
    socket.on("newMsg", async(data)=>{
        await chatContainer.insertarMensajes(data)
        //enviar los mensajes a todos los socket conectados
        const chat = await chatContainer.listarMensajes();
        io.sockets.emit("messagesChat", chat)
    })

    //Recibir Producto
    socket.on("newProduct", async(data)=>{
        await container.insertarArticulos(data)
        //Enviar productos actualizados
        const products = await container.listarArticulos();
        io.sockets.emit("products", products)
    })
})

app.get('/', (req,res) => {
    res.render("home")
})