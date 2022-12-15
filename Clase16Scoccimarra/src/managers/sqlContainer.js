import knex from 'knex'

class ContenedorSQL {

    constructor(options, nombreTabla) 
    {
        this.knex = knex(options)

        this.knex.schema.dropTableIfExists(nombreTabla)
        .finally(() => {
                this.knex.schema.createTable('articulos', table => {
                table.string('title', 15).notNullable()
                table.float('price', 10).notNullable()
                table.string('thumbnail',100)
                table.increments('id').primary()
            })
        })
    }

    insertarArticulos(articulos) {
        this.knex('articulos').insert(articulos)
        .then(rows => {
            let listado = []
            for (row of rows) {
                listado.push(JSON.stringify(row))
            }
        })
        this.knex.destroy()
    }
    
    listarArticulos() {
        return this.knex('articulos').select('*')
        this.knex.destroy()
    }

    borrarArticulos(id) {
        return this.knex.from('articulos').where('id', '=', id).del()
        this.knex.destroy()
    }

    actualizarStock(stock, id) {
        return this.knex.from("articulos").where('id', '=', id).update({stock: stock})
        this.knex.destroy()
    }

    close() {
        this.knex.destroy()
    }
}

export default ContenedorSQL