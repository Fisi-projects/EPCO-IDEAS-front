import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

const FormInput = styled(InputBase)(({ theme, size }) => ({
    'label + &': {
      marginTop: '5px',
      marginBottom: '15px',
    },
    '& .MuiInputBase-input': {
      borderRadius: 5,
      position: 'relative',
      backgroundColor: 'transparent',
      border: '1px solid',
      borderColor: theme.palette.secondary.main,
      fontSize: 15,
      width: size === 'large' ? '380px' : '180px',  //No definido = 180px
      padding: '10px 12px',
      
      '&:focus': {
        borderColor: theme.palette.secondary.dark,
      },
    },
  }));

export default FormInput;