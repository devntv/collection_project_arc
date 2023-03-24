import { Button, Divider, Typography } from '@material-ui/core';
import { useState } from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSetting } from 'context';
import { LinkComp} from 'components/atoms';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';


const SuggestedSellerCard = ({otherProductSkus}) => {
  const [isMore, setIsMore] = useState(true);
  const { getNameSeller } = useSetting();
    return (
      <div className={styles.wrapper}>
        <Typography style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Giá bán tham khảo</Typography>
        <Divider />
        {(isMore ? otherProductSkus.slice(0, 4) : otherProductSkus).map((item) => {
                  const { displayPriceFormated: price, tags, slug, seller } = item;
                  const sellerInfo = getNameSeller({seller, tags})
                  const {sellerName} = sellerInfo
                  let replaceName = '';
                if (sellerName==='') replaceName = 'Nhà cung cấp khác';
                else if (sellerName==='MEDX') replaceName = 'Giá đề nghị từ nhà cung cấp';
                else replaceName = sellerName
                  return (
                    <div key={uuidv4()}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
                        <LinkComp name={replaceName} href={`/product/${slug}`} />
                        <Typography>{price}</Typography>
                      </div>
                      <Divider />
                    </div>
                  );
                })}
        {otherProductSkus.length > 3 && (
        <Button
          endIcon={isMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          className={styles.btn_see_more}
          onClick={() => setIsMore(!isMore)}
        >
          {isMore ? 'Xem tất cả' : 'Thu gọn'}
        </Button>
                )}
      </div>
    )
}

export default SuggestedSellerCard