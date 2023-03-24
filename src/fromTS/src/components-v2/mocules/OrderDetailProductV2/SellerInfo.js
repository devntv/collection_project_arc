import { Avatar, Grid } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useSetting } from 'context';

function SellerInfo({ tags, seller }) {
  const { getNameSeller } = useSetting();
  const { sellerName } = getNameSeller({ seller, tags });
  return (
    <Grid container xs={12} item>
      <Avatar>
        <PersonIcon />
      </Avatar>
      {sellerName}
    </Grid>
  );
}

export default SellerInfo;
