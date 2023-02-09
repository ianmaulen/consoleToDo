require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoBorrarTareas, confirmar, checkListado } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArr( tareasDB );
  }

  do {
    opt = await inquirerMenu();
    console.log({opt});
    console.log('\n');

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        console.log(desc);
        tareas.crearTarea(desc);
      break;

      case '2':
        tareas.listadoCompleto();
      break;
      
      case '3':
        tareas.listarPendientesCompletadas(true);
      break;

      case '4':
        tareas.listarPendientesCompletadas(false);
      break;

      case '5':
        const ids = await checkListado(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        console.log(ids);
      break;

      case '6':
        const id = await listadoBorrarTareas(tareas.listadoArr);
        if (id !== '0') {
          const confirmDelete = await confirmar('Are you sure?');
          if ( confirmDelete ) {
            tareas.borrarTarea(id);
            console.log('tarea borrada correctamente...')
          }
        }
      break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  
  } while ( opt !== '0' );

}

main();