import styled from 'styled-components';
import { Button } from 'components/atoms';

const FindButton = ({ className, onClick }) => (
  <Button className={className} onClick={onClick}>
    Tìm
  </Button>
);

const StyledButton = styled(FindButton)`
  color: #fff !important;
  background-color: #17a2b8 !important;
  border: 1px solid #17a2b8 !important;
  border-radius: 0 !important;
  margin-right: 0 !important;
  margin-top: 16px !important;
`;

export default StyledButton;
