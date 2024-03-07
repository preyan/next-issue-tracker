import { AiFillDelete } from "react-icons/ai";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button color="red">
      <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
