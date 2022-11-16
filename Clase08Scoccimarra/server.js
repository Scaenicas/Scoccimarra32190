const fs = require('fs')

const archivo = './public/productos.txt'


const express = require('express');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


const router = express.Router()


router.get('/', (req, res) => 
{
    fs.promises.readFile(archivo, 'utf-8')
    .then(data => {
        let productos = JSON.parse(data);
        res.json(productos)
    })
    .catch(err => res.send('Error en la lectura de productos.'))
})

router.get('/:id', (req, res) => 
{
    const id = Number(req.params.id)
   fs.promises.readFile(archivo, 'utf-8')
    .then(data => {
        const productos = JSON.parse(data)
        let buscado = productos.find(producto => producto.id == id)
        if(buscado == undefined)
        {
            res.json(error = "producto no encontrado")
        }
        else
            res.json(buscado);
    })
    .catch(err => res.send("Error en la lectura de productos"));
})


router.post('/', (req, res) => {

   fs.promises.readFile(archivo, 'utf-8')
    .then(data => {
        let idLast=0;
        let productos= [];
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
            res.json(objetoNuevo);
         })
         .catch(err => {
            res.send('Error en la escritura.')
         })


    })
    .catch(err => res.send('Error en la lectura de productos.'))
})

router.put('/:id', (req, res) => 
{
    fs.promises.readFile(archivo, 'utf-8')
    .then(data => {
        const id = Number(req.params.id);
        let productos = JSON.parse(data)
        let ids = productos.map(producto => producto.id);
        let buscado = ids.indexOf(id);
        //res.json(buscado)
        if(buscado ==-1)
        {
            res.json(error = "producto no encontrado")
        }
        else
        {
            let objeto = req.body;
            objeto.price = Number(objeto.price);
            objeto.id = id;
            productos[buscado] =  objeto;

            fs.promises.writeFile(archivo, JSON.stringify(productos, null, 2))
              .then(() => {
                 res.json(productos[buscado]);
              })
              .catch(err => {
                 res.send('Error en la escritura del producto.')
              })
        }
    })
    .catch(err => res.send('Error en la lectura de productos.'))
}
)
router.delete('/:id', (req, res) => 
{
    fs.promises.readFile(archivo, 'utf-8')
    .then(data => {
        const id = Number(req.params.id)
        let productos = JSON.parse(data)
        let ids = productos.map(producto => producto.id);
        let buscado = ids.indexOf(id);
        if(buscado ==-1)
        {
            res.json(error = "producto no encontrado")
        }
        else
        {
            productos.splice(buscado, 1);
            fs.promises.writeFile(archivo, JSON.stringify(productos, null, 2))
            .then(() => {
                res.send('Elemento correctamente borrado')
            })
            .catch(err => {
                res.send('No se pudo borrar el elemento')
            })
        }
    })
    .catch(err => res.send('Error en la lectura de productos'))
})


app.use('/api/productos', router)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log('servidor escuchando en el ' + PORT)
})
