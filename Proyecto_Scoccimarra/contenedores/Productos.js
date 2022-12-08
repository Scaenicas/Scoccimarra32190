import { readFileSync, writeFileSync } from 'fs';
import Producto from '../clases/Producto.js';

class Productos
{
    constructor(nombreArchivo){
        this.archivo = nombreArchivo;
    }

    save(objetoNuevo)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            let productos = JSON.parse(data);
            let idLast=0;
            if (data.length > 0)
            {
                productos = JSON.parse(data)
                idLast = productos[productos.length-1].id;
            }

            objetoNuevo.precio = Number(objetoNuevo.precio);
            objetoNuevo.id = idLast+1;
            objetoNuevo.timestamp = Date.now();
            
            const productoNuevo = new Producto(objetoNuevo.id, objetoNuevo.timestamp, objetoNuevo.nombre, objetoNuevo.descripcion, objetoNuevo.codigo, objetoNuevo.thumbnail, objetoNuevo.precio, objetoNuevo.stock);

            productos.push(productoNuevo);

            try {
                writeFileSync(this.archivo, JSON.stringify(productos, null, 2));
                return ("Producto correctamente agregado");
            } catch(err) {
                return ("No se pudo agregar el producto");
            }

        }catch(err){
            return ('Error en la lectura.')
        } 
    }

    modify(id, objeto)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            let productos = JSON.parse(data)
            let ids = productos.map(producto => producto.id);
            let buscado = ids.indexOf(id);
            if(buscado ==-1)
            {
                return "Producto inexistente"
            }
            else
            {
                objeto.precio = Number(objeto.precio);
                objeto.id = id;
                objeto.timestamp = Date.now();
                const productoBuscado = new Producto(objeto.id, objeto.timestamp, objeto.nombre, objeto.descripcion, objeto.codigo, objeto.thumbnail, objeto.precio, objeto.stock);
                productos[buscado] =  productoBuscado;

                try {
                    writeFileSync(this.archivo, JSON.stringify(productos, null, 2));
                    return "Producto actualizado";
                } catch(err) {
                    return "No se pudo modificar el producto";
                }
            }

        }catch(err){
            return 'Error en la lectura.'
        } 
    }


    getById(id)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            const productos = JSON.parse(data)
            let buscado = productos.find(producto => producto.id == id)
            if(buscado == null)
                return ("Producto inexistente")
            else
                return (buscado);
        } catch(err){
            return('Error de lectura')
        }
    }

    getAll()
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            let productos = JSON.parse(data);
            return productos;
        } catch(err){
            return('Error de lectura')
        }
    }

    deleteById(id)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            let productos = JSON.parse(data)
            if (data.length > 0)
            {
                productos = JSON.parse(data)
            }
            const indice = productos.findIndex(producto => producto.id ==id);
            if(indice == -1)
                return ("Producto inexistente")
            else
                productos.splice(indice, 1);

            try {
                writeFileSync(this.archivo, JSON.stringify(productos, null, 2));
                return "Producto correctamente borrado";
            } catch(err) {
                return "No se pudo eliminar el producto";
            }
        } catch(err){
            return "No se pudo eliminar el producto";
        } 
    }

    deleteAll()
    {
        try {
            writeFileSync(this.archivo,"", null, 2);
            return "Productos borrados correctamente";
        } catch(err) {
            return "No se pudieron eliminar los productos";
        }
    }
}

export default Productos;