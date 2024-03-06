import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const IssueStatusBadge = ({ status }: Props) => {
  const statusMap: Record<
    Status,
    { label: string; color: "red" | "yellow" | "green" | "cyan" }
  > = {
    [Status.OPEN]: { label: "Open", color: "red" },
    [Status.IN_PROGRESS]: { label: "In Progress", color: "yellow" },
    [Status.CLOSED]: { label: "Closed", color: "green" },
    [Status.DELETED]: { label: "Delete", color: "cyan" },
  };
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
