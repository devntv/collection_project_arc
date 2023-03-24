import { Skeleton } from '@material-ui/lab';
import { LABEL_GIFT_TAG_PROMOTION } from 'constants/Enums';

function TagGift({ loading = false, isGiftTag, className }) {
  if (loading)
    return (
      <span style={{ display: 'inline-block' }}>
        <Skeleton width={90} height={30} />
      </span>
    );
  return (
    <span>
      {isGiftTag ? (
        <>
          <span className={className}>{LABEL_GIFT_TAG_PROMOTION}</span>
          <span style={{ fontWeight: 'bold' }}> - </span>
        </>
      ) : null}
    </span>
  );
}

export default TagGift;
