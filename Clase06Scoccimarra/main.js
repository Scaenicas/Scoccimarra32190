// CONTENEDOR
const fs = require('fs')

class Contenedor
{
    constructor(nombreArchivo){
        this.archivo = nombreArchivo;
    }

    getById(id)
    {
        try{
            const data = fs.readFileSync(this.archivo, 'utf-8')
            const productos = JSON.parse(data)
            let buscado = productos.find(producto => producto.id == id)
            return buscado;
        } catch(err){
            return('Error de lectura')
        }
    }

    getAll()
    {
        try{
            const data = fs.readFileSync(this.archivo, 'utf-8')
            let productos = JSON.parse(data);
            return productos;
        } catch(err){
            return('Error de lectura')
        }
    }

    getLength()
    {
        try{
            const data = fs.readFileSync(this.archivo, 'utf-8')
            const productos = JSON.parse(data)
            return productos.length;
        } catch(err){
            return('Error de lectura')
        }
    }
}


//API

const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const contenedor = new Contenedor('productos.txt');

app.get('/productos', (req, res) => {
    const result = contenedor.getAll();
    res.send(result);
})

app.get('/productoRandom', (req, res) => {
    const max = contenedor.getLength();
    const result = contenedor.getById(Math.floor(Math.random() * max +1))
    res.send(result);
})

app.listen(8080, () => {
    console.log('servidor escuchando correctamente')
})


