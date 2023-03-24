import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.css';

// có icon thì sẽ hiển thị Icon không thì sẽ hiện Text
// Chỉ hiện text có tối đa length < 15

const limitLength = 15;

export default function ProductTag({ Icon, name, preIcon, style }) {
  const hasIcon = preIcon || Icon;
  const Wrapper = ({ children }) => (
    <div className={styles.rootTag} style={style}>
      {children}
    </div>
  );

  if (hasIcon) {
    return (
      <Wrapper>
        {Icon && Icon}
        {preIcon && <FontAwesomeIcon icon={preIcon} />}
      </Wrapper>
    );
  }

  if (name && name.length < limitLength) {
    return <Wrapper>{name}</Wrapper>;
  }

  return <></>;
}
