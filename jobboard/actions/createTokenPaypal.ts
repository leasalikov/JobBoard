export const generateToken = async () => {
  try {
    const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};