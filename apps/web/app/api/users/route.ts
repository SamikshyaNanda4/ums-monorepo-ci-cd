import { prisma } from "@repo/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
