/**
 * AI Parser & Fallback Utilities
 * Handles cleaning up messy AI responses and provides safe fallbacks
 * if the AI goes down or repeatedly fails.
 */

/**
 * Extracts and parses clean JSON from a potentially messy AI response.
 * @param {string} rawText - The raw response string from Gemini
 * @returns {object} Parsed JSON object
 */
export const extractCleanJSON = (rawText) => {
  try {
    let cleanText = rawText.trim();

    // Strip markdown JSON wrappers if Gemini ignored the prompt
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```/g, '').trim();
    }

    // Attempt to parse
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Failed to parse AI response as JSON:', rawText);
    throw new Error('AI returned malformed JSON');
  }
};

/**
 * Generates a generic fallback response when the AI fails
 * @param {string} audience 
 * @param {string} platform 
 * @returns {object} Default structured campaign data
 */
export const getFallbackResponse = (audience, platform) => {
  console.warn('⚠️ Using AI Fallback Response due to repeated failures.');
  
  return {
    title: `Exclusive Offer for ${audience || 'You'}`,
    description: `Discover our latest products tailored specifically for ${audience || 'our customers'}. Check out our page on ${platform || 'our website'} for amazing deals and updates you won't want to miss!`,
    cta: "Learn More Today",
    hashtags: ["#Offer", "#Discount", "#SpecialDeal"],
    seoKeywords: ["exclusive offer", "best deals", "new products"]
  };
};
