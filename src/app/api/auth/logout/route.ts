import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function POST() {
  await deleteSession();
  const response = NextResponse.json({ ok: true });
  return response;
}
