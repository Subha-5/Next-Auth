import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // validation
    console.log(reqBody);

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User does not exists" }, { status: 400 });
    }
    console.log("User exists");

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

    const response = NextResponse.json({
      message: "Logged in Successfully",
      success: true
    })

    response.cookies.set("token", token, {
      httpOnly: true
    })
    
    return response

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}