import * as React from "react";
import { Pagination, Box } from "@mui/material";
import BirdList from "../../../api/FakeBirdData";
const pageSize = 6;

export default function AppPagination({ setBirdData }: any) {
  const [pagination, setPagination] = React.useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  React.useEffect(() => {
    const birdData = BirdList.slice(pagination.from, pagination.to);
    setPagination({ ...pagination, count: BirdList.length });
    setBirdData(birdData);
  }, [pagination.from, pagination.to]);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const from = (value - 1) * pageSize;
    const to = (value - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from, to });
  };
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      py={2}
    >
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        color="primary"
        onChange={handleChange}
      />
    </Box>
  );
}
