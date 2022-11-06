import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Grid2 from "@mui/material/Unstable_Grid2";
import Cards from "../Cards";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBarStyles";

const SearchBar = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const obtenerDatos = async () => {
    try {
      const datosCan = await axios.get(
        `https://tired-teal-flip-flops.cyclic.app/Caninos`
      );
      const infoCan = await datosCan.data;
      const datosFel = await axios.get(
        `https://tired-teal-flip-flops.cyclic.app/Felinos`
      );
      const infoFel = await datosFel.data;
      const datosAcc = await axios.get(
        `https://tired-teal-flip-flops.cyclic.app/Accesorios`
      );
      const infoAcc = await datosAcc.data;
      setProductos(infoCan.concat(infoFel).concat(infoAcc));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    // eslint-disable-next-line
    let resultadosBusqueda = productos.filter((elemento) => {
      if (
        elemento.marca.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setResultados(resultadosBusqueda);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <>
      <br></br>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Buscar marca..."
          value={busqueda}
          onChange={handleChange}
        />
      </Search>

      <Fragment>
        <br />
        <br />
        <Grid2
          container
          spacing={{ xs: 10, md: 4 }}
          columns={{ xs: 5, sm: 1, md: 20 }}
          justifyContent="center"
        >
          {resultados.map((producto) => {
            return (
              <Grid2 key={producto.id}>
                <div>
                  <Cards
                    id={producto.id}
                    image={producto.img}
                    nombre={producto.nombre}
                    peso={producto.peso}
                    precio={producto.precio}
                    descripcion={producto.descripcion}
                  />
                </div>
              </Grid2>
            );
          })}
        </Grid2>
      </Fragment>
    </>
  );
};

export default SearchBar;
