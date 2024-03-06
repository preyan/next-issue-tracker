import "react-loading-skeleton/dist/skeleton.css";

import { Box, Card, Flex } from "@radix-ui/themes";

import { Skeleton } from "@/app/components";

const LoadingIssueDetailsPage = () => {
  return (
    <div>
      <Box className="max-w-xl">
        <Skeleton />
        <Flex gap="3" my="2">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose mt-3">
          <Skeleton count={4} />
        </Card>
      </Box>
    </div>
  );
};

export default LoadingIssueDetailsPage;
