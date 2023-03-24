import TagTypeProps from 'constants/TagTypeProps';
import styles from './styles.module.css';

export default function TagComp({ type }) {
  const keyTag = Object.keys(TagTypeProps).find((tag) => tag === type);
  const tagInfo = keyTag ? TagTypeProps[keyTag] : TagTypeProps.default;

  const tagStyles = {
    color: tagInfo?.color || tagInfo?.textColor || '',
    border: tagInfo?.border,
    borderColor: tagInfo?.borderColor,
    backgroundColor: tagInfo?.backgroundColor,
  };

  return (
    <div className={styles.container} style={tagStyles}>
      <div>{tagStyles?.name}aa</div>
    </div>
  );
}
