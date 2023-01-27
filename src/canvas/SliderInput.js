import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { useMediaQuery } from '@mui/material';
import './SquareGrid.css'

function valuetext(value) {
  return `${value}°C`;
}

export default function SliderInput({setSquares, squares, index}) {
  const matches = useMediaQuery('(min-width:600px)');



  function onSelect(e) {
    if (squares === index) {
    setSquares(e)
    }
  }

  const marks = [
    {
      value: 1,
      label: '',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 16,
      label: '16',
    },
    {
      value: 25,
      label: '25',
    },
    {
      value: 36,
      label: '36',
    },
    {
      value: 49,
      label: '49',
    },
    {
      value: 64,
      label: '64',
    },
    {
      value: 81,
      label: '81',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 121,
      label: '121',
    },
    {
      value: 144,
      label: '144',
    }
  ];




  return (
    <>
      {matches ? <Slider
      onChangeCommitted={(e, value) => onSelect(value)}
        aria-label="Squares"
        orientation="vertical"
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="off"
        defaultValue={36}
        min={1}
        max={144}
        marks={marks}
      /> : <Slider
      onChangeCommitted={(e, value) => onSelect(value)}
        aria-label="Squares"
        orientation="vertical"
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="on"
        defaultValue={36}
        min={1}
        max={144}
        marks={marks}
      />}
      </>
  );
}