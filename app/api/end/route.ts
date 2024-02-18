import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  // const data = await req.json();
  // const buttonId = data.untrustedData.buttonIndex;
    
  const headers = new Headers();
  headers.set('Location', `${process.env.NEXT_PUBLIC_BASE_URL}/`);
  // if (buttonId === 0) {
  // }
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/alphaday`, {
    headers: headers,
    status: 302,
  });
  return response;
}