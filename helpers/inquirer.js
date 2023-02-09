require('colors');

const inquirer = require('inquirer');

const preguntas = [{
  type: 'list',
  name: 'opcion',
  message: 'Que desea hacer?',
  choices: [
    {
      value: '1',
      name: `${ '1.'.green } Crear tarea`
    },
    {
      value: '2',
      name: `${ '2.'.green } Listar tareas`
    },
    {
      value: '3',
      name: `${ '3.'.green } Listar tareas completas`
    },
    {
      value: '4',
      name: `${ '4.'.green } Listar tareas pendientes`
    },
    {
      value: '5',
      name: `${ '5.'.green } Completar tarea(s)`
    },
    {
      value: '6',
      name: `${ '6.'.green } Borrar tarea`
    },
    {
      value: '0',
      name: `${ '0.'.green } Salir`
    }
  ]
}];

const pausar = [{
  type: 'input',
  name: 'pausar',
  message: `Presiona ${ 'ENTER'.green } para continuar \n`
}];

const crearInput = [
  {
    type: 'input',
    name: 'crear',
    message: 'Ingrese una nueva tarea: ',
    validate (value) {
      if (value.length === 0) {
        return 'por favor ingrese un valor'
      }
      return true
    }
  }
]

const inquirerMenu = async() => {
  console.log('=============================='.green);
  console.log('Seleccione una opcion'.green);
  console.log('==============================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
}

const pausa = async() => {
  await inquirer.prompt(pausar);
}

const leerInput = async() => {
  const { crear } = await inquirer.prompt(crearInput);
  return crear;
}

const listadoBorrarTareas = async(tareas = []) => {
  const choices = tareas.map( (tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  });

  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'borrar',
      choices
    }
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id; 
}

const checkListado = async(tareas = []) => {
  const choices = tareas.map( (tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn)? true : false
    }
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'selecciones',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids; 
}

const confirmar = async(message) => {
  const confirm = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(confirm);
  return ok;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrarTareas,
  confirmar,
  checkListado
}