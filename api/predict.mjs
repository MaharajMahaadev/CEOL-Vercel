import { Client } from "@gradio/client";

export async function POST(request) {
  try {
    const client = await Client.connect(process.env.MODEL_API);

    const requestBody = await request.json();

    const response = await client.predict("/analyze", requestBody);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Prediction failed", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
