import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import ProductItem from '../ProductItem';

const ListTabSelect = ({ onCloseTag, product }) => (
  <Paper
    variant="outlined"
    sx={{
      borderBottom: 'none',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      padding: '1rem',
      position: 'relative',
      background: '#F5F5F5',
    }}
  >
    <ProductItem product={product} />
    <IconButton
      size="small"
      sx={{
        position: 'absolute',
        zIndex: 2,
        top: '1rem',
        right: '1rem',
      }}
      onClick={onCloseTag}
    >
      <ClearIcon />
    </IconButton>
  </Paper>
);

export default ListTabSelect;
