import { Container } from '@material-ui/core';
import { IngredientCLient } from 'clients';
import IngredientContainer from 'components/organisms/IngredientContainer';
import { doWithServerSide } from 'services/SsrService';


export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const ingredients = await IngredientCLient.loadDataIngredient(ctx);
    return {
      props: {
        ingredients,
      },
    };
  });
}
const TestingIngredient = ({ ingredients }) => (
  <div style={{ backgroundColor: '#f4f7fc' }}>
    <Container>
      <IngredientContainer ingredients={ingredients} />
    </Container>
  </div>
);

export default TestingIngredient;
