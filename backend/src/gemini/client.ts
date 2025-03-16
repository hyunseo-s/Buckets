import { GoogleGenerativeAI } from "@google/generative-ai";
import config from '../config.json';

const genAI = new GoogleGenerativeAI(config.gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const askGemini = async (prompt: string) => {
	const result = await model.generateContent(prompt);
	return result.response.text();
}

