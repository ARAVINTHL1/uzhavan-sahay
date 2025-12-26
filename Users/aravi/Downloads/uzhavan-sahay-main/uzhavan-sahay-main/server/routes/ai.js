import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini
// Note: This relies on GEMINI_API_KEY in .env
router.post('/weather-advice', async (req, res) => {
    try {
        const { weatherData, userCrops, farmSize, language } = req.body;

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn('GEMINI_API_KEY is not set in server environment variables.');
            return res.status(503).json({
                message: 'AI Service unavailable. Please configure GEMINI_API_KEY in the server.'
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-1.5-flash as the new standard model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Map language code to full name for valid prompting
        const langMap = {
            'ta': 'Tamil',
            'ml': 'Malayalam',
            'hi': 'Hindi',
            'en': 'English'
        };
        const targetLang = langMap[language] || 'English';

        const prompt = `
      Act as an expert agricultural advisor for a farmer in India.
      
      Context:
      - Current Weather: ${JSON.stringify(weatherData.current)}
      - Forecast: ${JSON.stringify(weatherData.forecast.slice(0, 3))}
      - Farmer's Crops: ${userCrops && userCrops.length > 0 ? userCrops.join(', ') : 'General crops (Rice, Coconut, etc.)'}
      - Farm Size: ${farmSize || 'Unknown'}
      - Language: ${targetLang}
      
      Task:
      Provide 3-5 specific, actionable farming tips based on this weather.
      Focus on irrigation, pest control, and field operations.
      
      Output Format:
      Return a valid JSON array of objects. DO NOT use markdown code blocks.
      
      The JSON structure must be:
      [
        {
          "activity": "Name of activity (in ${targetLang})",
          "recommendation": "Detailed advice (in ${targetLang})",
          "priority": "high" | "medium" | "low"
        }
      ]
      
      Ensure the keys "activity", "recommendation", and "priority" remain in English, but the VALUES for activity and recommendation are in ${targetLang}.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown formatting
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let advice;
        try {
            advice = JSON.parse(cleanedText);
        } catch (e) {
            console.error("Failed to parse AI response:", cleanedText);
            return res.status(500).json({ message: 'AI response malformed' });
        }

        res.json({ advice });
    } catch (error) {
        console.error('AI Error details:', error);

        if (error.message && (error.message.includes('404') || error.message.includes('400') || error.message.includes('403'))) {
            return res.status(404).json({
                message: 'AI Model not found or API not enabled. Please enable "Generative Language API" in your Google Cloud Console.'
            });
        }

        res.status(500).json({ message: 'Failed to generate advice: ' + error.message });
    }
});

export default router;
