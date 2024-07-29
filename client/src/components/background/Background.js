
import { backdropClasses } from "@mui/material";
import PaymentFields from "../paymentFields/PaymentFields";
import "./Background.css"
import { useTheme } from '@mui/material/styles';

function Background() {
    
    const theme = useTheme();
    return (
        <>

                <div className="box-pattern" style={{backgroundImage: theme.palette.bgColor.primary}}>
                    {/* <div className="blur-background"></div> */}
                </div>



        </>
    )
}


export default Background