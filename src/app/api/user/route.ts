import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getUser } from "@/app/actions"

export async function POST(request: Request) {
    const { address } = await request.json();
    const user = await getUser(address);
    return NextResponse.json(user);
}