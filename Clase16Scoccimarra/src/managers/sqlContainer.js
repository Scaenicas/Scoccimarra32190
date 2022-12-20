import knex from 'knex'

class ContenedorSQL {

    constructor(options, nombreTabla) 
    {
        this.knex = knex(options)
        this.nombreTabla = nombreTabla

        this.knex.schema.dropTableIfExists(nombreTabla)
        .finally(() => {
                this.knex.schema.createTable(nombreTabla, table => {
                table.string('title', 15).notNullable()
                table.float('price', 10).notNullable()
                table.string('thumbnail',100)
                table.increments('id').primary()
            }).then()
        })
    }

    async insertarArticulos(articulos) {
        this.knex(this.nombreTabla).insert(articulos)
        .then(rows => {
            let listado = []
            for (const row of rows) {
                listado.push(JSON.stringify(row))
            }
        })
    }
    
    async listarArticulos() {
        return this.knex(this.nombreTabla).select('*')
    }

    borrarArticulos(id) {
        return this.knex.from(this.nombreTabla).where('id', '=', id).del()
    }

    actualizarStock(stock, id) {
        return this.knex.from(this.nombreTabla).where('id1', '=', id).update({stock: stock})
    }

    close() {
        this.knex.destroy()
    }
}

export default ContenedorSQL