import Boton from './Boton'
import { useState } from 'react'

function insertarOrdenado<T>(coleccion: T[], aInsertar: T, comparar: (a: T, b: T) => number): T[]
{
  const ceColeccion = coleccion.length
  let i = 0

  while(i < ceColeccion && comparar(aInsertar, coleccion[i]) > 0)
  {
    i++
  }

  coleccion.splice(i, 0, aInsertar)

  return coleccion
}

function Tablero(): JSX.Element
{
  const botones = []
  const filas = []
  const cantidadDeFilas = 3
  const cantidadDeBotones = 9
  const casillasOcupadasX: number[] = []
  const casillasOcupadasO: number[] = []

  const [nroTurno, setNroTurno] = useState(0)

  function handleClick(evento: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  {
    // console.log(evento.currentTarget.id)
    // console.log(evento.currentTarget.textContent)

    if(0 === nroTurno % 2) //el turno es par => X
    {
      evento.currentTarget.textContent = "X"
    }
    else
    {
      evento.currentTarget.textContent = "O"
    }
    evento.currentTarget.disabled = true

    setNroTurno(nroTurno + 1)
  }

  for(let i = 0; i < cantidadDeBotones; i++) 
  {
    botones.push(
      <Boton
        key = {i} //Identificador para componentes en el árbol -> Reconciliación.
        id = {`${i}`} //Identificar cada elemento del DOM
        // value = {(i + 1).toString()}  //value = ""
        value = ""
        handleClick = {handleClick}
      />
    )
  }

  for (let i = 0; i < cantidadDeFilas; i++) 
  {
    filas.push(
      <div className = "row" key={i}>
        {botones.slice(i * 3, (i + 1) * 3) /* shallow copy[copia referencia -> son componentes]: desde index 0, 3 y 6 hasta 3, 6 y 9 [sin incluir]*/}
      </div>
    )
  }

  return(
    <>
      {filas}
    </>
  )
}

export default Tablero