import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LinkComp } from 'components/atoms';
import { PRODUCTS_LOADING_URL } from 'constants/Paths';
import { gtag } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

/*
thuannc - 08Mar22

tách component category product ra ngoài 

phần này là : danh sách tủ thuốc covid , nhóm thuốc , nhà sàn xuất cột nằm bên tay trái của trang danh sách sản phẩm 

do 3 phần sử dụng chung nên tách ra thành 1 componennts riêng.

categories: danh sách mà cần hiển thị lên UI. trong đó gồm { name ,  link }
path: url dùng để so sánh có hiển thị active đối với item nào đó không 
isCompareEqual : có so sánh bằng đối với url , default là so sánh startWith 
name: tên hiển thị của nhóm 
isAllProduct: có hiển thị dòng : tất cả sản phẩm hay không 
defaultExpanded : mở ra hay ẩn lúc đầu
*/

const CategoryProduct = ({ categories, type, path = '', name, defaultExpanded = true, isAllProduct = false, query = {}, isCompareEqual = false }) => {
  const selectedLink = (item) => {
    if (isCompareEqual) {
      return path === item.link || path.replace('[slug]', query?.slug ?? '') === item.link;
    }
    return item.link.includes(query?.tag);
  };

  return (
    <Accordion className="accordion" defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" className="accordion-sumary">
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails className="accordion-detail">
        <div>
          {isAllProduct && (
            <LinkComp
              key="all-products"
              href={PRODUCTS_LOADING_URL}
              prefetch={false}
              onClick={() => {
                if (type === 'drugs') gtag.clickCategoryDrugsTitle('Tất cả sản phẩm');
                if (type === 'manufacturers') gtag.clickCategoryManufacturerTitle('Tất cả sản phẩm');
              }}
            >
              <div className={`${styles.accordionLink} ${path === '/products' ? styles.active : ''}`}>Tất cả sản phẩm</div>
            </LinkComp>
          )}
          {categories &&
            categories.map((item) =>
              item?.subEfficacies?.length > 0 ? (
                <Accordion className="accordion" defaultExpanded={false}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>{item.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-detail">
                    <div>
                      {item?.subEfficacies.map((eff) => (
                        <LinkComp
                          key={uuidv4()}
                          href={`${eff.link}`}
                          prefetch={false}
                          color={selectedLink(item) ? `#00b46e` : `rgba(0, 0, 0, 0.87)`}
                          onClick={() => {
                            if (type === 'drugs') gtag.clickCategoryDrugsTitle(item?.name);
                            if (type === 'manufacturers') gtag.clickCategoryManufacturerTitle(item?.name);
                          }}
                        >
                          <div className={styles.accordionLink}>{eff.name}</div>
                        </LinkComp>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <LinkComp
                  key={uuidv4()}
                  href={`${item.link}`}
                  prefetch={false}
                  color={selectedLink(item) ? `#00b46e` : `rgba(0, 0, 0, 0.87)`}
                  onClick={() => {
                    if (type === 'drugs') gtag.clickCategoryDrugsTitle(item?.name);
                    if (type === 'manufacturers') gtag.clickCategoryManufacturerTitle(item?.name);
                  }}
                >
                  <div className={styles.accordionLink}>{item.name}</div>
                </LinkComp>
              ),
            )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryProduct;
