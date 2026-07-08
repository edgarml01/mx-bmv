import { NextResponse } from "next/server";
import { MOCK_TASAS } from "@/app/dashboard/_components/mock-data";

export async function GET() {
  try {
    const apiKey = process.env.DATABURSATIL_API_KEY;

    if (!apiKey) {
      console.warn("DATABURSATIL_API_KEY is not configured. Returning MOCK_TASAS.");
      return NextResponse.json(MOCK_TASAS);
    }

    const response = await fetch(
      `https://api.databursatil.com/v2/tasas?token=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.warn(`Databursatil API request failed with status ${response.status}. Returning MOCK_TASAS.`);
      return NextResponse.json(MOCK_TASAS);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Databursatil tasas error, falling back to mock:", error);
    return NextResponse.json(MOCK_TASAS);
  }
}
