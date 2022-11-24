
const fs = require('fs')

src="https://unpkg.com/sweetalert/dist/sweetalert.min.js";

const express = require('express')

const app = express()

let productos = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'pug')

const archivo = 'productos.txt'

// Ingresar al formulario

app.get('/', (req, res) => {
    res.render('inicio', {productos})
})

// Cargar producto nuevo

app.post('/productos', (req, res) => {
    fs.promises.readFile(archivo, 'utf-8')
    .then(data => {
        let idLast=0;
        if (data.length > 0)
        {
            productos = JSON.parse(data)
            idLast = productos[productos.length-1].id;
        }

        let objetoNuevo = req.body;
        objetoNuevo.price = Number(objetoNuevo.price);
        objetoNuevo.id = idLast+1;
        productos.push(objetoNuevo);

       fs.promises.writeFile(archivo, JSON.stringify(productos, null, 2))
         .then(() => {
            res.redirect('/')
        })
         .catch(err => {
            res.send('Error en la escritura.')
         })
    })
    .catch(err => res.send('Error en la lectura de productos.'))
})

// Ir al listado de productos
app.get('/productos', (req, res) => {
    fs.promises.readFile(archivo, 'utf-8')
    .then(data => {
        const productos = JSON.parse(data);
        res.render('listado', {productos})
    })
    .catch(err => res.render('listado', {productos:[]}))
})

app.listen(8080)