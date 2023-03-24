import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AccordionDetails, Dialog, Fab, IconButton, Slide, Typography } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import CategoryFilterProduct from 'components/mocules/CategoryFilterProduct';
// import { EXTRA_CATEGORY } from 'constants/Category';
import { ENUMS_FILTER_CATEGORY_TYPE } from 'constants/Enums';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { gtag } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={styles.root} {...other}>
      {onClose ? (
        <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6" className={styles.title}>
        {children}
      </Typography>
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function FilterMobileDialogs({
  open,
  maxWidth,
  handleClose,
  slug,
  tabs,
  pathName,
  currentTab,
  sort,
  categories,
  manufacturers,
  text,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // const router = useRouter();

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [currentTab, sort, slug]);

  const getQueryObject = () => {
    const query = {};
    if (currentTab) {
      query.currentTab = currentTab;
    }
    if (sort) {
      query.sort = sort;
    }
    if (text) {
      query.text = text;
    }
    return query;
  };

  const getTabQuery = () => {
    const query = getQueryObject();
    if (!sort) {
      delete query.sort;
    }

    return query;
  };
  const tabQuery = getTabQuery();
  return (
    <div className={styles.custom}>
      <Dialog
        scroll="body"
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        fullWidth
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={styles.filterMobile}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Bộ lọc tìm kiếm
        </DialogTitle>
        <DialogContent dividers className={styles.dialogContent}>
          <AccordionDetails className={styles.accordionDetail}>
            <div>
              <div className={styles.headline}>
                <FontAwesomeIcon icon={faTag} />
                <span>Đánh dấu</span>
              </div>
              <Link href={pathName} prefetch={false}>
                <Fab
                  variant="extended"
                  aria-label="all"
                  className={clsx(currentTab === '' && styles.active, styles.filter_btn)}
                  onClick={() => {
                    gtag.clickTabInProduct('Tất cả');
                  }}
                >
                  Tất cả
                </Fab>
              </Link>
              {tabs &&
                tabs.map((item) => (
                  <Link
                    prefetch={false}
                    key={`tabs-${uuidv4()}`}
                    href={{
                      pathname: pathName,
                      query: { ...tabQuery, currentTab: item?.slug },
                    }}
                  >
                    <Fab
                      variant="extended"
                      aria-label="all"
                      className={clsx(currentTab === (item?.slug || '') && styles.active, styles.filter_btn)}
                      onClick={() => {
                        gtag.clickTabInProduct(item?.name);
                      }}
                    >
                      {item.leftIcon && <span className={styles.iconLeft}>{item.leftIcon}</span>}
                      {item.name}
                      {item.rightIcon && <span className={styles.iconRight}>{item.rightIcon}</span>}
                    </Fab>
                  </Link>
                ))}
            </div>
            <hr className={styles.hr_space} />
            <div>
              <div className={styles.group}>
                {/* <CategoryFilterProduct categories={EXTRA_CATEGORY} name="Thiết yếu mùa Tết" type={ENUMS_FILTER_CATEGORY_TYPE.EXTRA_CATEGORY} /> */}
                {/* Category : category Drugs  */}
                <CategoryFilterProduct categories={categories} name="Nhóm thuốc" type={ENUMS_FILTER_CATEGORY_TYPE.CATEGORY} />
                {/* Category : Manufacturer  */}
                <CategoryFilterProduct categories={manufacturers} name="Nhà sản xuất" type={ENUMS_FILTER_CATEGORY_TYPE.MANUFACTURER} />
              </div>
            </div>
          </AccordionDetails>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Fab variant="extended" aria-label="all" className={styles.close} onClick={handleClose}>
            Đóng
          </Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}
