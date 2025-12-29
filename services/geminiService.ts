import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { INITIAL_SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
    if (!apiKey) return;
    genAI = new GoogleGenAI({ apiKey });
    
    chatSession = genAI.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: INITIAL_SYSTEM_INSTRUCTION,
        },
    });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (!genAI) {
        // Fallback or initialization attempt if env var exists but init wasn't called explicitly
        if (process.env.API_KEY) {
            initializeGemini(process.env.API_KEY);
        } else {
            return "Please configure the API Key to use the AI Coach.";
        }
    }

    if (!chatSession) {
         return "AI Service not initialized.";
    }

    try {
        const response: GenerateContentResponse = await chatSession.sendMessage({ message });
        return response.text || "I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Sorry, I encountered an error connecting to the AI coach.";
    }
};
