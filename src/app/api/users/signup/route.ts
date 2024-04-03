// localhost:3000/api/users/signup

import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/models/user.model';
import { connect } from '@/dbConfig/dbConfig';
import { sendEMail as sendEmail } from '@/helpers/mailer'


connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // validation
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser);

    // send verification mail
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })

    return NextResponse.json({
      message: 'User registered successfully',
      success: true,
      userDetails: savedUser
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });

  }
}
