import { Client } from "@gradio/client";

export async function POST(request) {
    try{
        const what = await Client.connect("maharajmahaadev/CEOL-Model");
        const res = await what.predict("/analyze", request.body);
        
        return new Response(res.data.json());
      }
      catch(error){
        throw new Error("Didn't work");
      }
    
  }