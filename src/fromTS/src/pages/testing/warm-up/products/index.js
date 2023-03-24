import { Grid, Typography } from '@material-ui/core';
import { getData } from 'clients';
import ProductCardNew from 'components/mocules/ProductCardNew';
import { ProductCardHorizontal } from 'components/organisms';
import { useRouter } from 'next/router';
import { ProductServiceV2 } from 'services';

const { useState, useEffect } = require('react');

const PageIndex = () => {
  const [offset] = useState(0);
  const [listImage, setListImage] = useState([]);
  const router = useRouter();
  const page = Number(router?.query?.page || 0) + 1;
  const time = Number(router?.query?.time || 5000);

  useEffect(async () => {
    const productRes = await ProductServiceV2.loadDataProductWeb({ query: { page, limit: 50 } });
    setListImage(getData(productRes));
    if (page < 600) {
      setTimeout(() => {
        router.push({ query: { page, time } });
        //   setOffset(page);
      }, time);
    }
  }, [offset, page]);

  return (
    <>
      <Typography>offset index : {offset}</Typography>
      <Grid container>
        <Grid container item lg={3} md={3}>
          {listImage?.map((item) => (
            <>
              <ProductCardHorizontal product={item} />
            </>
          ))}
        </Grid>
        <Grid item lg={9} md={9}>
          <Grid direction="row" container>
            {listImage?.map((item) => (
              <ProductCardNew product={item} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PageIndex;
