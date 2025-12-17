import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client
// Using process.env.API_KEY is safe here as it will be injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePosterImage = async (prompt: string, isHighQuality: boolean): Promise<string> => {
  const modelName = isHighQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4", // Standard poster ratio
          imageSize: isHighQuality ? "2K" : undefined // Only available for pro
        }
      }
    });

    // Iterate parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};

export const createChatSession = (systemInstruction: string): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the network right now.";
  }
};

export const generateProductDescription = async (title: string, style: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, exciting, marketing-style description (max 40 words) for an anime poster titled "${title}" in the genre/style of "${style}". Focus on visual impact.`,
    });
    return response.text || "A stunning visual masterpiece for your collection.";
  } catch (error) {
    return "Exclusive limited edition anime art poster.";
  }
};