import { readFileSync, writeFileSync } from 'fs';
import Carrito from '../clases/Carrito.js';
import Productos from './Productos.js';

class Carritos
{
    constructor(nombreArchivo){
        this.archivo = nombreArchivo;
    }

    nuevoCarrito()
    {
        try {
            const data = readFileSync(this.archivo, 'utf-8')
            let carritos = JSON.parse(data);
            
            let idLast=0;
            if (data.length > 0)
            {
                idLast = carritos[carritos.length-1].id;
            }
            const productos = [];
            const carritoNuevo = new Carrito(idLast+1, Date.now(), productos);

            carritos.push(carritoNuevo);

            try {
                writeFileSync(this.archivo, JSON.stringify(carritos, null, 2));
                return (`Carrito correctamente creado con el id:${carritoNuevo.id}`);
            } catch(err) {
                return ("No se pudo crear el carrito");
            }
        } catch(err){
            return ("No se pudo crear el carrito");
        } 
    }

    eliminarCarrito(id)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            let carritos = JSON.parse(data)
            if (data.length > 0)
            {
                carritos = JSON.parse(data)
            }
            const indice = carritos.findIndex(carrito => carrito.id ==id);
            if(indice == -1)
                return ("Carrito inexistente")
            else
                carritos.splice(indice, 1);

            try {
                writeFileSync(this.archivo, JSON.stringify(carritos, null, 2));
                return "Carrito correctamente borrado";
            } catch(err) {
                return "No se pudo eliminar el carrito";
            }
        } catch(err){
            return "No se pudo eliminar el carrito";
        } 
    }

    getProductos(id)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            const carritos = JSON.parse(data)
            let buscado = carritos.find(carrito => carrito.id == id)
            if(buscado == null)
                return ("Carrito inexistente")
            else
                return (buscado.productos);
        } catch(err){
            return('Error de lectura')
        }
    }


    agregarACarrito(id, id_prod)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            let carritos = JSON.parse(data)
            let ids = carritos.map(carrito => carrito.id);
            let buscado = ids.indexOf(id);
            if(buscado ==-1)
            {
                return "Carrito inexistente"
            }
            else
            {
                const productos = new Productos("./public/productos.txt")
                const productosExistentes = productos.getAll();

                const indiceProductoExistente = productosExistentes.findIndex(producto => producto.id == id_prod);

                if(indiceProductoExistente == -1)
                    return (`No se puede agregar el producto con id:${id_prod} porque no existe`)
                else
                {
                    carritos[buscado].timestamp = Date.now();
                    carritos[buscado].productos.push(productosExistentes[indiceProductoExistente]);
                }

                try {
                    writeFileSync(this.archivo, JSON.stringify(carritos, null, 2));
                    return "Carrito actualizado";
                } catch(err) {
                    return "No se pudo modificar el carrito";
                }
            }

        }catch(err){
            return 'Error en la lectura.'
        } 
    }

    deleteProductoById(id, id_prod)
    {
        try{
            const data = readFileSync(this.archivo, 'utf-8')
            let carritos = JSON.parse(data)
            if (data.length > 0)
            {
                carritos = JSON.parse(data)
            }
            const indiceCarrito = carritos.findIndex(carrito => carrito.id ==id);
            if(indiceCarrito == -1)
                return ("Carrito inexistente")
            else
            {
                let indiceProducto = 0;
                while(indiceProducto !=-1)
                {
                    const productosCarrito = carritos[indiceCarrito].productos; 
                    indiceProducto = productosCarrito.findIndex(producto => producto.id == id_prod);
    
                    if(indiceProducto == -1)
                        return (`Producto inexistente en el carrito id:${id}` )
                    else
                    {
                        carritos[indiceCarrito].productos.splice(indiceProducto, 1);
                        indiceProducto = productosCarrito.findIndex(producto => producto.id == id_prod);
                    }   
                }
            }
                               
            try {
                writeFileSync(this.archivo, JSON.stringify(carritos, null, 2));
                return "Producto correctamente borrado";
            } catch(err) {
                return "No se pudo eliminar el producto";
            }
        } catch(err){
            return "No se pudo eliminar el carrito";
        } 
    }
}

export default Carritos;