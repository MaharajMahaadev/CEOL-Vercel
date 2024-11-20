import { Client } from "@gradio/client";

export async function POST(request) {
  try{
    const what = await Client.connect("maharajmahaadev/CEOL-Model");
    const response = await what.predict("/analyze", request.body);

    return new Response(response);
  }
  catch(error){
    throw new Error("Error in predicting");
  }
  }