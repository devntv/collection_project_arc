// TODO: refactor contanst
import { makeStyles } from '@material-ui/core/styles';
import FontSize from '../FontSize';

const noDecoration = {
  textDecoration: 'none',
};

const LinkStyled = {
  textDecoration: 'none',
  ...FontSize.fontNormal,
  padding: '5px',
  color: 'white',
  display: 'flex',
};

const LinkStyleMaked = makeStyles(LinkStyled);

export default {
  LinkStyled,
  noDecoration,
  LinkStyleMaked,
};
