import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import AlphabetFilter from 'components-v2/mocules/AlphabetFilter';
import SearchIngredient from 'components-v2/mocules/SearchIngredient';
import { StringUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import dynamic from 'next/dynamic';

const TEXT_DEFAULT = '';
const WORD_DEFAULT = '#';

const IngredientContainer = ({ ingredients }) => {
  const [filter, setFilter] = useState({
    word: WORD_DEFAULT,
    text: TEXT_DEFAULT,
    isByWord: true,
  });
  const [ingres, setIngres] = useState(ingredients);

  const handleChangeWord = (e) => {
    const val = e.target.innerText;
    setFilter({ ...filter, word: val, text: WORD_DEFAULT, isByWord: true });
  };

  const handleChangeText = (e) => {
    const val = e.target.value;
    setFilter({ ...filter, text: val, word: TEXT_DEFAULT, isByWord: false });
  };

  const handleRemoveText = () => {
    setFilter({ ...filter, text: TEXT_DEFAULT, word: TEXT_DEFAULT, isByWord: true });
  };

  const searchByWord = useCallback(
    (word) => ingredients.filter(({ name }) => StringUtils.changeAlias(name.charAt(0).toUpperCase()) === word),
    [ingredients],
  );

  useEffect(() => {
    if (filter.isByWord) {
      if (filter.word === WORD_DEFAULT) {
        setIngres(ingredients);
      } else {
        setIngres(searchByWord(filter.word));
      }
    } else {
      debounceFunc500(() => {
        const searchs = StringUtils.searchStringInStrings(ingredients, filter.text);
        setIngres(searchs);
      });
    }
  }, [filter.isByWord, filter.text, filter.word, searchByWord, ingredients]);

  const DynamicIngredientList = dynamic(() => import('components-v2/mocules/IngredientList'));
  // console.log(typeof filter.word, filter.word === null);
  return (
    <Grid>
      <SearchIngredient
        value={filter.word === TEXT_DEFAULT ? filter.text : filter.word}
        handleChangeValue={handleChangeText}
        handleClose={handleRemoveText}
        placeholder="Nhập tên hoạt chất cần tìm"
      />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={filter.word} />
      <DynamicIngredientList ingredients={ingres} text={filter.text} word={filter.word} defaultValue={WORD_DEFAULT} />
    </Grid>
  );
};

export default IngredientContainer;
