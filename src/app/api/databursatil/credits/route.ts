import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {

    const apiKey = process.env.DATABURSATIL_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "API_KEY is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.databursatil.com/v2/creditos?token=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Databuratil request failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Databursatil route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
