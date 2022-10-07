import { Paper } from '@mui/material'

function Item({item})
{
    return (
        <Paper mx="auto" width="90%">
        <img src={item.image} alt="fotos carrusel"
        style={{width:"100%",
        height: "45vh",
        objectFit:"cover"
      }}
        /> 
        </Paper>
    )
}
export default Item