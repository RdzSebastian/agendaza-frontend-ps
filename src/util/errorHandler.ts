export class ErrorMensaje {
  constructor(public condicional : boolean, public mensaje : String){

  }
}

export class SuccessMensaje {
  constructor(public condicional : boolean, public mensaje : String){

  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function mostrarError(component: any, error: any): void {
  let errorMessage = ''
  if (error.status === 0) {
    errorMessage = 'Error al conectar con el servidor. Sistema en mantenimiento.'
  } else if (error.status === 500) {
    errorMessage = 'Hubo un error al realizar la operación. Consulte al administrador del sistema.'
    console.error(error)
  }
  component.errors.push(errorMessage)
  setTimeout(() => {
    component.errors.length = 0
  }, 5000)
}

export function mostrarErrorConMensaje(component: any, error: any): void {
  const errorMessage = (error.status === 0) ? 'Error al conectar con el servidor. Sistema en mantenimiento.' : error.error ? error.error : error.message
  component.errors.push(errorMessage)
}

export function getErrorConMensaje(error: any): string {
  return (error.status === 0) ? 'Error al conectar con el servidor. Sistema en mantenimiento.' : error.error ? error.error : error.message
}
