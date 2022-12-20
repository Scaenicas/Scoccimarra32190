import knex from 'knex'

class ContenedorChatSQL {

    constructor(options, nombreTabla) 
    {
        this.knex = knex(options)
        this.nombreTabla = nombreTabla

        this.knex.schema.dropTableIfExists(nombreTabla)
        .finally(() => {
                this.knex.schema.createTable(nombreTabla, table => {
                table.string('author', 50).notNullable()
                table.dateTime('date').notNullable()
                table.string('text',1000)
                table.increments('id').primary()
            }).then()
        })
    }

    async insertarMensajes(mensajes) {
        this.knex(this.nombreTabla).insert(mensajes)
        .then(rows => {
            let listado = []
            for (const row of rows) {
                listado.push(JSON.stringify(row))
            }
        })
    }

    async listarMensajes() {
        return this.knex(this.nombreTabla).select('*')
    }

    borrarMensajes(id) {
        return this.knex.from(this.nombreTabla).where('id', '=', id).del()
    }

    close() {
        this.knex.destroy()
    }
}

export default ContenedorChatSQL