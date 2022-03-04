import { useState } from 'react';
import Pelicula from './Pelicula';
import PageWrapper from './PageWrapper';
import PeliculasJSON from '../sample/pelis.json';
import CambioPagina from './CambioPagina';

function ListadoPeliculas() {

  const [paginaActual, setPaginaActual] = useState(1);
  const TOTAL_POR_PAGINA = 7;

  let peliculas = PeliculasJSON;

  const cargarPeliculas = () => {
    peliculas = peliculas.slice(
      (paginaActual - 1) * TOTAL_POR_PAGINA,
      paginaActual * TOTAL_POR_PAGINA
    );
  }

  const getTotalPaginas = () => {
    let cantidadTotalDePeliculas = PeliculasJSON.length;
    return Math.ceil(cantidadTotalDePeliculas / TOTAL_POR_PAGINA);
  }

  const buscarPelicula = async () => {
    let url = 'https://cors-anywhere.herokuapp.com/lucasmoy-dev.github.io/data/react/peliculas.json'
    var respuesta = await fetch(url, {
      "method": 'GET',
      "mode": 'no-cors',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'https://lucasmoy-dev.github.io/'
      }
    });
    var json = await respuesta.json();
    console.log(json);
  }

  cargarPeliculas();
  return (
          <PageWrapper>
            {peliculas.map(pelicula => {
              return <Pelicula
                portada={pelicula.portada}
                titulo={pelicula.titulo}
                calificacion={pelicula.calificacion}
                descripcion={pelicula.descripcion}
                director={pelicula.director}
                actores={pelicula.actores}
                fecha={pelicula.fecha}
                pegi={pelicula.pegi}
                duracion={pelicula.duracion}
              />
            })}
            <CambioPagina pagina={paginaActual} total={4} onChange={(pagina) => {
              setPaginaActual(pagina);
            }} />

          </PageWrapper>

  );
}

export default ListadoPeliculas;
