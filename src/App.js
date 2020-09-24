import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  //STATES DE LA APP
  const [busqueda, saveBusqueda] = useState("");
  const [imagenes, saveImagenes] = useState([]);
  const [paginaactual, savePaginaActual] = useState(1);
  const [totalpaginas, saveTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === "") return;
      const imagesxpage = 28;
      const key = "17927621-d56d162bbf262842e91b7d7aa";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagesxpage}&page=${paginaactual}`;
      const response = await fetch(url);
      const resultado = await response.json();
      saveImagenes(resultado.hits);

      //CALCULAR PAGINAS PARA HACER PAGINACION
      const calculaPaginas = Math.ceil(resultado.totalHits / imagesxpage);
      saveTotalPaginas(calculaPaginas);
      //SCROLL-TOP AL CAMBIAR PAGINA
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };

    consultarApi();
  }, [busqueda, paginaactual]);

  //FUNCION PARA IR A PAGINA ANTERIOR
  const paginaAnterior = () => {
    if (paginaactual <= 1) return;
    savePaginaActual(paginaactual - 1);
  };
  //FUNCION PARA IR A PAGINA SIGUIENTE
  const paginaSiguiente = () => {
    if (paginaactual > totalpaginas) return;
    savePaginaActual(paginaactual + 1);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario saveBusqueda={saveBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; ANTERIOR
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaSiguiente}
          >
            SIGUIENTE &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
