import { generateToken } from "@/actions/createTokenPaypal";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { id } = await req.json();
  try {
    const token = await generateToken();

    if (!token) throw new Error("Token not Exists");

    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    const data = await response.json();
    // Create New Order in Database

    return NextResponse.json(
      { success: true, message: "success capture Order", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "not success capture Order", error },
      { status: 500 }
    );
  }
};
