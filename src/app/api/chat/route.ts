import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  console.log("API Key exists:"),
  console.log("Chat endpoint hit");
  try {
    // Validate input
    const { message } = await req.json();
    
    console.log("Received message:", message);
    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Initialize model with proper typing
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro"});
     
      const generationConfig = {
        maxOutputTokens: 1000,
      };
      
    

    // Generate content
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: message }],
      }],
    });

    // Format response
    const response = result.response;
    const text = response.text(); 
    return NextResponse.json({
      text: response.text(),
      safetyFeedback: response.safetyFeedback,
    });

  } catch (error: unknown) {
    // Proper error type handling
    let errorMessage = "Failed to process request";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("API Error Details:", error.stack);
      
      // Handle specific error types
      if (error.message.includes("API key")) {
        statusCode = 401;
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        ...(process.env.NODE_ENV === "development" && {
          details: error instanceof Error ? error.stack : JSON.stringify(error)
        })
      },
      { status: statusCode }
    );
  }
}
