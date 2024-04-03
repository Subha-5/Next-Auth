import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId,
        {
          $set: {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600_000
          }
        }
      )
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId,
        {
          $set: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + (3600_000 / 2)
          }
        }
      )
    }

    const transport = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.NODEMAILER_TRANSPORT_HOST!,
      port: process.env.NODEMAILER_TRANSPORT_PORT!,
      auth: {
        user: process.env.NODEMAILER_TRANSPORT_AUTH_USER!,
        pass: process.env.NODEMAILER_TRANSPORT_AUTH_PASS!
      }
    });

    const mailOptions = {
      from: 'subhasadhu5@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Your Password',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"} or copy and paste the link in your browser. <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`
    }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message)
  }
}

