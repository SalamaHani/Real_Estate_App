import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export const GET = async (request: NextRequest) => {
  console.log("Hello Salama | cron jobs scugelas");
  return NextResponse.json({ masseges: "cron jobs" }, { status: 200 });
};
