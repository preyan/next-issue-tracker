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
  })!;

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetails;
