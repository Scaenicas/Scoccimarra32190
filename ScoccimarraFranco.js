class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    static cuentaGlobal = 0;

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombreLibro, autorLibro)
    {
        this.libros.push(
            {
                nombre: nombreLibro,
                autor: autorLibro
            }
        )
    }
    getBookNames(){
        let nombresLibros = this.libros.map(objeto => objeto.nombre);
        return nombresLibros;
    };
}

const alumno = new Usuario ('Franco',
                            'Scoccimarra',
                            [{nombre: 'Harry Potter y las Reliquias de la Muerte', autor: 'J.K. Rowling'},
                            {nombre: 'Viaje al centro de la Tierra', autor: 'Julio Verne'},
                            {nombre: 'Juego de Tronos', autor: 'George R. R. Martin'}],
                            ['Lisa', 'Mora']
                            );



alumno.addMascota('Frida');

console.log(`${alumno.getFullName()} tiene ${alumno.countMascotas()} mascotas.
`);

alumno.addBook('Cinco semanas en globo', 'Julio Verne');

console.log(`Los nombres de los libros de ${alumno.nombre} son:`, 
alumno.getBookNames());


