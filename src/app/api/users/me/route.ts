import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request)
  const user = await User.findOne({ _id: userId }).select("-username -password")
  return NextResponse.json({
    message: "User found",
    data: user
  })
}