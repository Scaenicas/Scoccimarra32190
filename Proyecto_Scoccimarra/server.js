import Productos from './contenedores/Productos.js';
import Carritos from './contenedores/Carritos.js';

import express, { json, urlencoded, Router } from 'express';

const app = express()

app.use(json())
app.use(urlencoded({extended: true}))

const routerProductos = Router()
const routerCarritos = Router()

let administrador = true;

//--------------------------------------------PRODUCTOS----------------------------------------------------

let productos = new Productos("./public/productos.json")
app.use('/api/productos', routerProductos)

routerProductos.get('/:id?', (req, res) => 
{
    const id = req.params.id;
    if(id == undefined)
        res.json(productos.getAll())
    else
        res.json(productos.getById(Number(id)))
})

routerProductos.post('/', (req, res) => {
    if(administrador)
        res.json(productos.save(req.body))
    else    
        res.json(`{"error": -1', "descripcion": "ruta '${req.url}' metodo '${req.method}' no autorizada"`)
})

routerProductos.put('/:id', (req, res) => 
{
    if(administrador)
    {
        const id = Number(req.params.id);
        res.json(productos.modify(id, req.body))
    }
    else    
        res.json(`{"error": -1', "descripcion": "ruta '${req.url}' metodo '${req.method}' no autorizada"`)
})

routerProductos.delete('/:id', (req, res) => 
{
    if(administrador)
    {
        const id = Number(req.params.id);
        res.json(productos.deleteById(id))
    }
    else    
        res.json(`{"error": -1', "descripcion": "ruta '${req.url}' metodo '${req.method}' no autorizada"`)
}) 

routerProductos.get('*', (req, res) => 
{   
    res.json(`{"error": -1', "descripcion": "ruta '${req.url}' metodo '${req.method}' no implementada"`)
})

//-----------------------------------------------CARRITOS--------------------------------------------------

let carritos = new Carritos("./public/carritos.json")
app.use('/api/carrito', routerCarritos)

routerCarritos.post('/', (req, res) => {
    res.json(carritos.nuevoCarrito())
})

routerCarritos.delete('/:id', (req, res) => 
{
    const id = Number(req.params.id);
    res.json(carritos.eliminarCarrito(id))
})

routerCarritos.get('/:id/productos', (req, res) => 
{
    const id = Number(req.params.id);
    res.json(carritos.getProductos(id))
})

routerCarritos.post('/:id/productos/:id_prod', (req, res) => {
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);
    res.json(carritos.agregarACarrito(id,id_prod))
})

routerCarritos.delete('/:id/productos/:id_prod', (req, res) => 
{
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);
    res.json(carritos.deleteProductoById(id,id_prod))
})

routerCarritos.get('*', (req, res) => 
{   
    res.json(`{"error": -1', "descripcion": "ruta '${req.url}' metodo '${req.method}' no implementada"`)
})


//---------------------------------RUTA INVALIDA-----------------------------------------------------------

app.get('*', function (req, res) {
    
    res.json(`{"error": -1', "descripcion": "ruta '${req.url}' metodo '${req.method}' no implementada"`)
})

const PORT = 8080

//---------------------------------------------------------------------------------------------------------

const server = app.listen(PORT, () => {
console.log('servidor escuchando en el ' + PORT)
})

