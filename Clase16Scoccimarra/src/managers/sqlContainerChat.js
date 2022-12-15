import knex from 'knex'

class ContenedorChatSQL {

    constructor(options, nombreTabla) 
    {
        this.knex = knex(options)

        this.knex.schema.dropTableIfExists(nombreTabla)
        .finally(() => {
                this.knex.schema.createTable('mensaje', table => {
                table.string('author', 50).notNullable()
                table.dateTime('date').notNullable()
                table.string('text',1000)
                table.increments('id').primary()
            })
        })
    }

    insertarMensajes(mensajes) {
        return this.knex('articulos').insert(mensajes)
    }

    listarMensajes() {
        return this.knex('mensajes').select('*')
    }

    borrarMensajes(id) {
        return this.knex.from('mensajes').where('id', '=', id).del()
    }

    close() {
        this.knex.destroy()
    }
}

export default ContenedorChatSQL