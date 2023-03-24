import { Button, Typography } from '@material-ui/core';

const { useState } = require('react');

const DisplayNumber = ({ number }) => {
  // chỉ khởi tạo 1 lần , ko khơi tạo lại khi re-render
  const [data] = useState(number);

  // un-comment dòng này thì sẽ hiển thị đúng số
  //   useEffect(() => {
  //     setData(number);
  //   }, [number]);

  return <Typography>state component con : {data}</Typography>;
};

const PageIndex = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <Typography>state index : {number}</Typography>
      <DisplayNumber number={number} />
      <Button onClick={() => setNumber(number + 1)}> tăng tăng</Button>
    </>
  );
};

export default PageIndex;
