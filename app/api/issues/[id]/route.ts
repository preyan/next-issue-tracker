import { NextRequest, NextResponse } from "next/server";

import { issueSchema } from "@/app/validationSchemas";
import primsa from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validated = issueSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(validated.error.format(), { status: 400 });
  }

  const issue = await primsa.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await primsa.issue.update({
    where: { id: params.id },
    data: {
      title: validated.data.title,
      description: validated.data.description,
    },
  });

  if (!updatedIssue) {
    return NextResponse.json({ error: "Issue update failed" }, { status: 500 });
  }

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await primsa.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await primsa.issue.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Issue deleted" });
}
