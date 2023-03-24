import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { AlphabetFilter, FloatSearch } from 'components/mocules';
import { StringUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import ManufacturerList from 'components/mocules/ManufacturerList';

const TEXT_DEFAULT = '';
const WORD_DEFAULT = '#';

const ManufacturerContainer = ({ manufacturers }) => {
  const [filter, setFilter] = useState({
    word: WORD_DEFAULT,
    text: TEXT_DEFAULT,
    isByWord: true,
  });
  const [manus, setManus] = useState(manufacturers);

  const handleChangeWord = (e) => {
    const val = e.target.innerText;
    setFilter({ ...filter, word: val, text: TEXT_DEFAULT, isByWord: true });
  };

  const handleChangeText = (e) => {
    const val = e.target.value;

    setFilter({ ...filter, text: val, word: WORD_DEFAULT, isByWord: false });
  };

  const handleRemoveText = () => {
    setFilter({ ...filter, text: TEXT_DEFAULT, word: WORD_DEFAULT, isByWord: true });
  };

  const searchByWord = useCallback(
    (word) =>
      manufacturers.filter(
        ({ name }) => StringUtils.changeAlias(name.charAt(0).toUpperCase()) === word,
      ),
    [manufacturers],
  );

  useEffect(() => {
    if (filter.isByWord) {
      if (filter.word === WORD_DEFAULT) {
        setManus(manufacturers);
      } else {
        setManus(searchByWord(filter.word));
      }
    } else {
      debounceFunc500(() => {
        const searchs = StringUtils.searchStringInStrings(manufacturers, filter.text);
        setManus(searchs);
      });
    }
  }, [filter]);


  return (
    <Grid>
      <FloatSearch
        value={filter.text}
        handleChangeValue={handleChangeText}
        handleClose={handleRemoveText}
        placeholder="Nhập tên nhà sản xuất cần tìm"
      />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={filter.word} />

      <ManufacturerList manufacturers={manus} text={filter.text} />
    </Grid>
  );
};

export default ManufacturerContainer;
