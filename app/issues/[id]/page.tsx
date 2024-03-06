import { Card, Flex, Heading, Text } from "@radix-ui/themes";

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

const IssueDetails = async ({ params }: Props) => {
  if (typeof params.id !== "string") {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-3">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
