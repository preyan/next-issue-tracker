import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
