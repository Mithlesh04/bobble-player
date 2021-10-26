import React, { useState } from "react";
import GoldBobble from "./../../assets/png-icons/Gold-Bobble.png"
import PropTypes from 'prop-types';
import { Slider , SliderThumb , styled } from "@mui/material";


const StyledSlider = styled(Slider)(({ theme }) => ({
    color: '#000' ,
    height: 0,
    fontFamily : 'Dimbo',
    fontWeight : 400,
    '& .MuiSlider-thumb': {
        fontFamily : 'Dimbo',
        fontWeight : 400,
        width: 11,
        height: 52,
        border : '1px solid #000',
        borderRadius : 0,
        backgroundColor: '#fff',
        boxShadow:'none',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:'none',
            '@media (hover: none)': {
              boxShadow: 'none',
            },
          },
      '& .insideLine': {
        height: 51,
        width: 3,
        backgroundColor: 'red',
        border:'1px solid #000',
        marginLeft: 1,
        marginRight: 1,
      },
      '& .icon': {
        position : 'absolute',
        backgroundImage : `url(${GoldBobble})`,
        backgroundPosition:'center',
        backgroundSize:'cover',
        width: 49,
        height: 56,
        marginTop: 85,
        marginRight: 1,
      },
    },
    '& .MuiSlider-markLabel':{
        fontFamily : 'Dimbo',
        fontWeight : 400,
        marginTop : 4,
        fontSize : 30,
        color : '#000',
    },
    '& .MuiSlider-valueLabel': {
        fontFamily : 'Dimbo',
        width : 40,
        height : 40,
        border : '2px solid #000',
        fontSize: 24.73,
        color : '#000',
        top: 0,
        backgroundColor: 'transparent',
        borderRadius : 3,
        color: '#000',
        '& *': {
          background: 'transparent',
          color:  '#000',
        },    
       
      },
    '& .MuiSlider-track': {
        background : 'transparent',
        height : 0,
        display : 'none'
    },
    '& .MuiSlider-rail': {
        border: '2px solid #000 !important',
        height : 37,
        width : '100%',
        background : 'transparent',
        borderRadius : 24
    },
    '& .MuiSlider-mark': {
        display : 'none',
        '&.MuiSlider-markActive': {
          opacity: 1,
        },
    },
}));


function StyledThumb(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="insideLine" />
        <span className="icon" />
      </SliderThumb>
    );
  }
  
StyledThumb.propTypes = {
  children: PropTypes.node,
};

  
const BiddingRange = (props) => {
    return <>
        <StyledSlider
            aria-label="Always visible"
            defaultValue={12}
            components={{ Thumb: StyledThumb }}
            step={1}
            min={0} 
            max={58} 
            marks={[
                {value : 0, label: 0},
                {value : 58,label: 58},
            ]}
            disabled={props.isLocked}
            valueLabelDisplay="on"
        />
    </>
}

export default BiddingRange