import React from 'react';
import { Grid } from '@material-ui/core';
import { Fab } from 'components/atoms';

const getAlphabets = () => {
  const arr = [];
  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i += 1) arr.push(String.fromCharCode(i));
  arr.push('#');
  return arr;
};

const AlphabetFilter = ({ word, handleChangeWord }) => {
  const characters = getAlphabets();
  return (
    <Grid>
      {characters.map((ch) => (
        <Fab size="small" handleClick={handleChangeWord} disabled={word !== ch} key={`fab-alphabet-${ch}`}> {ch} </Fab>
      ))}
    </Grid>
  );
};

export default AlphabetFilter;
