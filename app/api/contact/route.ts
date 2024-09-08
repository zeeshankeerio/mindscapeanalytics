import { NextResponse, type NextRequest } from "next/server"
import emailjs from "@emailjs/browser"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { email, name, message } = await request.json()

    // Mail options for sending
    const templateParams = {
      email: email,
      name: name,
      message: message,
    }

    // Send email with EmailJS
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
      templateParams,
      { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID as string }
    )

    // Check if the email was sent successfully
    if (response.status === 200) {
      return new NextResponse("Email sent successfully", { status: 200 })
    } else {
      return new NextResponse(
        `Failed to send email. Status: ${response.status}`,
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return new NextResponse(`Failed to send email: ${error}`, {
      status: 500,
    })
  }
}
