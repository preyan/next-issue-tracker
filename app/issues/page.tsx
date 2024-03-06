import { Badge, Button, Flex, Table } from "@radix-ui/themes";

import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {/* <Link href={`/issues/${issue.id}`}>{issue.title}</Link> */}
                {issue.title}
                <div className="block sm:hidden">
                  <Flex gap="2">
                    <Badge color="blue">{issue.status}</Badge>
                    <Badge color="green">
                      {issue.createdAt.toDateString()}
                    </Badge>
                  </Flex>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                {issue.status}
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
