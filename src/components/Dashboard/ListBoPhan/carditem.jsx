import { Grid } from "@mui/material";
const CartItem = ({image, name, Tgbp}) => {
    return (
       <div>
            <Grid container className="h-10">
                <Grid item xs = {2} className="h-10">
                    <img src={image} alt = 'image_card' className="w-10 h-10"/>
                </Grid>
                <Grid item xs = {9} className="h-10">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs">{Tgbp}</p>
                </Grid>
            </Grid>
       </div> 
    )
}
export default CartItem