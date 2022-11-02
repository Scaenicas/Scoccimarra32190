const fs = require('fs')

class Contenedor
{
    constructor(nombreArchivo){
        this.archivo = nombreArchivo;
    }

    async save(objetoNuevo)
    {
        fs.promises.readFile(this.archivo, 'utf-8')
        .then(data => {
            let idLast=0;
            let productos= [];
            if (data.length > 0)
            {
                productos = JSON.parse(data)
                idLast = productos[productos.length-1].id;
            }

            objetoNuevo.id = idLast+1;
            productos.push(objetoNuevo);

            fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2))
             .then(() => {
                 console.log('Elemento correctamente agregado')
             })
             .catch(err => {
                 console.log('Error en la escritura.')
             })
             
            console.log(`id asignado: ${objetoNuevo.id}`)
        })
        .catch(err => console.log('Error en la lectura.'))
    }

    async getById(id)
    {
        fs.promises.readFile(this.archivo, 'utf-8')
        .then(data => {
            const productos = JSON.parse(data)
            let buscado = productos.find(producto => producto.id == id)
            console.log(buscado);
        })
        .catch(err => console.log("Error"));

    }

    async getAll()
    {
        fs.promises.readFile(this.archivo, 'utf-8')
        .then(data => {
            let productos = JSON.parse(data);
            console.log(productos);
        })
        .catch(err => console.log('Error en la lectura del archivo.'))
    }

    async deleteById(id)
    {
        fs.promises.readFile(this.archivo, 'utf-8')
        .then(data => {
            let productos= [];
            if (data.length > 0)
            {
                productos = JSON.parse(data)
            }
            const indice = productos.findIndex(producto => producto.id ==id);
            if(indice == -1)
                throw new Error
            else
                productos.splice(indice, 1);

            fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2))
             .then(() => {
                 console.log('Elemento correctamente borrado')
             })
             .catch(err => {
                 console.log('No se pudo borrar el elemento')
             })
        })
        .catch(err => console.log('No existe un producto con ese id'))

    }

    async deleteAll()
    {
        fs.promises.writeFile(this.archivo,"", null, 2)
        .then(() => {
            console.log('Elementos borrados del archivo.')
        })
        .catch(err => {
            console.log('Error. Elementos no borrados del archivo.')
        })
    }
}




const listado = new Contenedor('productos.txt');

console.log("----------Save:----------");
listado.save({
    title: 'Carátula',
    price: 1.59,
    thumbnail:'https://http2.mlstatic.com/D_NQ_NP_614698-MLA31010482716_062019-O.jpg'})

setTimeout(function(){
    console.log("----------Get by id=2:----------");
    listado.getById(2)
}, 4000);

setTimeout(function(){
    console.log("----------Get all:----------");
    listado.getAll();
}, 6000);

setTimeout(function(){
    console.log("----------Delete by id=3:----------");
    listado.deleteById(3)
}, 8000);

setTimeout(function(){
    console.log("----------Delete All:----------");
    listado.deleteAll();
}, 10000);

setTimeout(function(){
    console.log("----------Agrego elemento a archivo vacío----------");
    listado.save({
        title: 'Birome',
        price: 12.26,
        thumbnail:'https://casadylan.com.ar/wp/wp-content/uploads/2021/08/2720053-600x791.jpg'})
}, 12000);





