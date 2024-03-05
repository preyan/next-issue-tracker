import { NextRequest, NextResponse } from "next/server";

import { createIssueSchema } from "../../validationSchemas";
import primsa from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = createIssueSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(validated.error.format(), { status: 400 }); //Bad request
  }
  const newIssue = await primsa.issue.create({
    data: {
      title: validated.data.title,
      description: validated.data.description,
    },
  });

  if (newIssue) {
    return NextResponse.json(newIssue, { status: 201 }); //Created
  }
}
