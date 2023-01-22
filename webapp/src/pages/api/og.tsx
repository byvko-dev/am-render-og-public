import StatsContainer from "@/core/components/render/StatsContainer";
import { ApiResponse } from "@/core/types/apiResponse";
import { Block, CardsData } from "@/core/types/blocks";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function (req: NextRequest) {
  try {
    // Get the payload and decode into JSON string, no error checking because yolo
    const url = new URL(req.url);
    const payload = atob(url.searchParams.get("d") || "");

    const response = await renderStatsImage(payload);
    return new Response(JSON.stringify(response), {
      status: response.error ? 400 : 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "something unexpected happened: " + JSON.stringify(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

async function renderStatsImage(payload: string): Promise<ApiResponse<string>> {
  const resp = await fetch(
    `${process.env.DATAPREP_BACKEND_URL}/stats/options`,
    {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json: ApiResponse<CardsData> = await resp.json();
  if (json?.error?.message) {
    return { error: json.error };
  }

  const response = new ImageResponse(
    StatsContainer({ cards: json.data?.cards as Block }),
    {
      // width here is significantly bigger than any reasonable image can be, we will crop out the blank pixels later
      width: 1200,
      height: 200 * (json.data?.totalCards as number),
    }
  ) as Response;

  // Get the image data
  const blob = await response.blob();
  const imageData = await blob.arrayBuffer();

  // Covert to base64 without using Buffer
  const base64 = btoa(
    new Uint8Array(imageData).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return { data: base64 };
}
