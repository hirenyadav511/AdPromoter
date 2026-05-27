import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateAdvancedPrompt } from '../utils/aiPrompts.js';
import { extractCleanJSON, getFallbackResponse } from '../utils/aiParser.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate Campaign Content using Gemini AI (Advanced)
// @route   POST /api/ai/generate-campaign
// @access  Private
export const generateCampaignContent = async (req, res) => {
  try {
    const { audience, tone, platform } = req.body;

    // Validate inputs
    if (!audience || !tone || !platform) {
      return res.status(400).json({ message: 'Please provide audience, tone, and platform' });
    }

    // Ensure the API key exists
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'GEMINI_API_KEY is not configured in the backend environment' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Get the highly optimized dynamic prompt
    const prompt = generateAdvancedPrompt(audience, tone, platform);

    const MAX_RETRIES = 3;
    let attempt = 0;
    let parsedData = null;

    // Retry Logic Loop
    while (attempt < MAX_RETRIES && !parsedData) {
      try {
        attempt++;
        console.log(`🤖 Gemini AI Attempt ${attempt}/${MAX_RETRIES}...`);
        
        const result = await model.generateContent(prompt);
        const rawText = result.response.text();
        
        // Ensure no empty responses
        if (!rawText) {
          throw new Error('Empty response from Gemini');
        }

        // Clean and parse the response
        parsedData = extractCleanJSON(rawText);

      } catch (error) {
        console.warn(`⚠️ AI Parsing/Generation failed on attempt ${attempt}:`, error.message);
        // If it's the last attempt, break out of loop
        if (attempt >= MAX_RETRIES) {
          console.error('❌ Max AI retries reached.');
        }
      }
    }

    // Fallback handling if all retries failed
    if (!parsedData) {
      parsedData = getFallbackResponse(audience, platform);
    }

    // Return the perfectly formatted JSON
    // Expected: { title, description, cta, hashtags, seoKeywords }
    res.status(200).json(parsedData);
  } catch (error) {
    console.error('🔥 Fatal AI Controller Error:', error);
    res.status(500).json({ message: 'Failed to generate campaign content' });
  }
};
