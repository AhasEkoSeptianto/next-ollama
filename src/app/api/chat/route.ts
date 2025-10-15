import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const message = formData.get("message") as string;
    const file = formData.get("image") as File | null;

    // const { message, images } = await req.json();
    let imageBase64: string | null = null;
    if (file) {
      // Konversi file gambar ke base64 string agar bisa dikirim ke model vision
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageBase64 = buffer.toString("base64");
    }

    const response = await ollama.chat({
      // model: "llava-phi3:latest", // gunakan model yang mendukung gambar
      model: "llama3.2:1b",
      messages: [
        {
          role: "user",
          content: message,
          images: imageBase64 ? [imageBase64] : undefined, // kirim base64 image jika ada
        },
      ],
    });

    // Sesuaikan struktur sesuai respons dari ollama
    return NextResponse.json({
      message: response.message?.content || "No response from model",
    });
  } catch (error) {
    console.error("Ollama API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from LLM" },
      { status: 500 }
    );
  }
}
