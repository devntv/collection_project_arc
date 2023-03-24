import { Grid } from '@material-ui/core';
import { AlphabetFilter, FloatSearch } from 'components/mocules';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StringUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';

const DynamicIngredientList = dynamic(() => import('components/mocules/IngredientList'));

const TEXT_DEFAULT = '';
const WORD_DEFAULT = '#';

const IngredientContainer = ({ ingredients }) => {
  const [filter, setFilter] = useState({
    word: WORD_DEFAULT,
    text: TEXT_DEFAULT,
    isByWord: true,
  });
  const wordRef = useRef(filter);
  const [ingres, setIngres] = useState(ingredients);

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
    (word) => ingredients.filter(({ name }) => StringUtils.changeAlias(name.charAt(0).toUpperCase()) === word),
    [ingredients],
  );

  useEffect(() => {
    // console.log('>useEffect run');
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
  }, [filter.isByWord, filter.text, filter.word, ingredients, searchByWord]);

  // truyền ingredients mới vào thì ingress đã tồn tại nên sẽ ko reload lại danh sách ingress mới , nên ta dùng useEffect để set lại data
  useEffect(() => {
    wordRef.current = filter.word;
    if (filter.isByWord) {
      if (filter.word === WORD_DEFAULT) {
        setIngres(ingredients);
      } else {
        setIngres(searchByWord(wordRef.current));
      }
    }
  }, [ingredients, filter.isByWord, filter.word, searchByWord]);

  return (
    <Grid>
      <FloatSearch value={filter.text} handleChangeValue={handleChangeText} handleClose={handleRemoveText} placeholder="Nhập tên hoạt chất cần tìm" />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={filter.word} />
      <DynamicIngredientList ingredients={ingres} text={filter.text} />
    </Grid>
  );
};

export default IngredientContainer;
