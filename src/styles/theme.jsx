import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#212529", //Letra en negrita (Titulos)
        },
        secondary: {  //Para color de borde (FormInput)
            main: "#ACACAC",  //Borde claro
            dark: "#676767",  //Borde oscuro
        },
    },

    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: {                   //Titulo web - Nomnbre de empresa
            fontSize: "2.5rem",
            fontWeight: 500,
        },
        h2: {                   //Titulo de cada pagina
            fontSize: "24px",
            fontWeight: 700,
            color: "#313133",
        },
        h3: {
            fontSize: "22px",  //Titulo de modal(22px) - Titulo tabla (15px)
            fontWeight: 600,
        },
        h4: {                   //Subtitulo de modal
            fontSize: "15px",
            fontWeight: 400,
        },    
        body1: {                //Texto de tabla - Texto de modal - Sidebar
            fontSize: "14px",
            fontWeight: 400,   //--> Personalizar color para texto de modal color: "#313133",
        },
    }
});

export default theme;