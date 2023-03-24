import { Button } from '@material-ui/core';
import styles from './styles.module.css';

function MostSearch(props) {
  const { children, onClick, link, ...restProps } = props;

  return (
    <Button href={link} onClick={onClick} className={styles.mostSearch} {...restProps}>
      {children}
    </Button>
  );
}

export default MostSearch;
