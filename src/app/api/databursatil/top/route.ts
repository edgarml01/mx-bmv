import { NextResponse } from "next/server";
import { MOCK_TOP } from "@/app/dashboard/_components/mock-data";

export async function GET() {
  try {
    const apiKey = process.env.DATABURSATIL_API_KEY;

    if (!apiKey) {
      console.warn("DATABURSATIL_API_KEY is not configured. Returning MOCK_TOP.");
      return NextResponse.json(MOCK_TOP);
    }

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date: Date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    const final = formatDate(today);
    const inicio = formatDate(yesterday);

    const url = `https://api.databursatil.com/v2/top?token=${apiKey}&variables=suben,bajan&bolsa=BMV&cantidad=5&mercado=local&inicio=${inicio}&final=${final}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`Databursatil API request failed with status ${response.status}. Returning MOCK_TOP.`);
      return NextResponse.json(MOCK_TOP);
    }

    const rawData = await response.json();

    // Normalize keys to uppercase to match the frontend expected TopResponse shape (SUBEN, BAJAN, VOLUMEN)
    const data: any = {};
    if (rawData) {
      data.SUBEN = rawData.SUBEN || rawData.suben || [];
      data.BAJAN = rawData.BAJAN || rawData.bajan || [];
      data.VOLUMEN = rawData.VOLUMEN || rawData.volumen || MOCK_TOP.VOLUMEN;
    } else {
      return NextResponse.json(MOCK_TOP);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Databursatil top error, falling back to mock:", error);
    return NextResponse.json(MOCK_TOP);
  }
}
