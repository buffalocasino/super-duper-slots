import { google } from '@google/generativeai';

google.api_key = 'YOUR_API_KEY'; // Or use environment variables

export async function generateText(prompt: string): Promise<string> {
  try {
    const response = await google.generateContent({
      model: 'models/gemini-pro', // Choose the appropriate Gemini model
      prompt: prompt,
    });
    return response.results[0].content;
  } catch (error) {
    console.error('Error generating text:', error);
    return 'Oops, something went wrong!'; // Or handle the error differently
  }
}