import { NextRequest, NextResponse } from "next/server";

import primsa from "@/prisma/client";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(5000),
});

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
