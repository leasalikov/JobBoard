import { generateToken } from "@/actions/createTokenPaypal";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

  const { cart } = await req.json();

  const units = cart.map((product: any) => ({
    reference_id: product.id,
    amount: { currency_code: "ILS", value: Number(product.total).toFixed(2) },
  }));

  try {
    const token = await generateToken();

    if (!token) throw new Error("Token not Exists");

    const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [...units],
        // payment_source: {
        //   paypal: {
        //     application_context: {
        //     //   shipping_preference: "SET_PROVIDED_ADDRESS",
        //       user_action: "PAY_NOW",
        //     //   return_url: "https://example.com/returnUrl",
        //     //   cancel_url: "https://example.com/cancelUrl",
        //     },
        //   },
        // },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return NextResponse.json(
      { success: true, message: "success create Order", id: data.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "not success create Order", error },
      { status: 500 }
    );
  }
};
