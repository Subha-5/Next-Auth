import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextResponse) {
  try {
    const response = NextResponse.json({
      message: "Loggout Successfully",
      success: true
    })

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0)
    })

    return response

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}