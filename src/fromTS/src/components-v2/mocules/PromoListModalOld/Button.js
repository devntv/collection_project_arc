import { Button } from 'components/atoms';
import styled from 'styled-components';

const FindButton = ({ className, onClick }) => (
  <Button className={className} onClick={onClick}>
    Tìm
  </Button>
);

const StyledButton = styled(FindButton)`
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-radius: 0;
  margin-right: 0 !important;
  margin-top: 16.5px !important;
`;

export default StyledButton;
