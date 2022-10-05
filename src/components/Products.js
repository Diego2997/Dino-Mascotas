import axios from "axios";
import { useState, useEffect, Fragment } from "react";

import Grid2 from "@mui/material/Unstable_Grid2";
import Cards from "./Cards";
import Loader from "./Loader";
import { Typography } from "@mui/material";

const Products = (props) => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const obtenerDatos = async () => {
    setIsLoading(true);
    try {
      const datos = await axios.get(`https://servidor-dino2022.herokuapp.com/${props.direccion}`);
      const comidas = await datos.data;
      setPost(comidas);
    } catch (error) {
      console.log("servidor caido");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    obtenerDatos();
    // eslint-disable-next-line
  }, [props.direccion]);

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <Fragment>
          <Grid2
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 2, sm: 1, md: 5 }}
            justifyContent="center"
          >
            {post.length > 0 ? (
              post.map((comida) => {
                return (
                  <Grid2 key={comida.id}>
                    <div>
                      <Cards
                        id={comida.id}
                        image={comida.img}
                        nombre={comida.nombre}
                        peso={comida.peso}
                        precio={comida.precio}
                        descripcion={comida.descripcion}
                      />
                    </div>
                  </Grid2>
                );
              })
            ) : (
              <Typography fontFamily="Roboto" variant="h1" fontStyle="italic">
                Sin existencias
              </Typography>
            )}
          </Grid2>
        </Fragment>
      )}
    </>
  );
};

export default Products;
