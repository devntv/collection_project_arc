import { TextareaAutosize, Typography } from '@material-ui/core';
import { CartClientV2, isValid } from 'clients';
import { memo, useCallback, useState } from 'react';
import { NotifyUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import styles from './styles.module.css';

function Note({ note }) {
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

  return (
    <div className={styles.note_container}>
      <div className={styles.top_note_content}>
        <Typography>Ghi Chú Khác</Typography>
        <Typography>
          Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có
          thể.
        </Typography>
      </div>
      <div className={styles.note_content}>
        <TextareaAutosize
          className={styles.text_area}
          name="note"
          value={noteValue}
          onChange={handleSetNote}
          aria-label="note-cart"
          placeholder="Ghi chú của khách hàng"
          minRows={3}
          maxRows={4}
        />
      </div>
    </div>
  );
}

export default memo(Note);
