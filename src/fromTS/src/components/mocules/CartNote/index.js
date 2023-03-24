import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { CartClientV2, isValid } from 'clients';
import { useCart } from 'context';
import React, { useCallback, useEffect, useState } from 'react';
import { NotifyUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import styles from './styles.module.css';

const CartNote = () => {
  const { note } = useCart();
  const [noteValue, setNoteValue] = useState(note);
  const handleUpdateNote = useCallback(async (val) => {
    const res = await CartClientV2.updateNote(val);
    if (isValid(res)) {
      NotifyUtils.success('Cập nhật ghi chú thành công');
    } else {
      NotifyUtils.error(res?.message || 'Cập nhật ghi chú không thành công');
    }
  });

  const handleSetNote = (e) => {
    const valNote = e.target.value;
    setNoteValue(valNote);
    debounceFunc500(() => handleUpdateNote(valNote));
  };

  useEffect(() => {
    setNoteValue(note);
  }, [note]);

  return (
    <TextareaAutosize
      name="note"
      value={noteValue}
      onChange={handleSetNote}
      className={styles.text_area}
      aria-label="Ghi chú của khách hàng"
      placeholder="Ghi chú của khách hàng"
      maxRows={4}
      data-test="note-cart"
    />
  );
};

export default React.memo(CartNote);
