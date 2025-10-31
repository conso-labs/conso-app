import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestURL = new URL(req.url as string);
  const testParam = requestURL.searchParams.get("username");

  try {
    const response = {
      data: "Sample data" + ` ${testParam}`,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in /api/test route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
