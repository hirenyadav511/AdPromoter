/**
 * AI Prompt Engineering Utilities
 * This module handles the generation of highly optimized, token-efficient
 * prompts for the Google Gemini API based on user parameters.
 */

const getPlatformRules = (platform) => {
  const rules = {
    Instagram: "Focus on visuals. Use a trendy, short, and punchy tone. Heavily utilize emojis. Keep descriptions concise and engaging.",
    LinkedIn: "Maintain a highly professional, B2B-focused tone. Highlight value propositions, industry insights, and career growth. Limit emojis.",
    Facebook: "Be conversational, engaging, and community-driven. Encourage comments and shares. Tell a brief story.",
    Google: "Focus heavily on SEO keywords, direct intent, and clear value propositions. Make it highly clickable and action-oriented. No emojis.",
  };
  return rules[platform] || "Be engaging and clear.";
};

const getToneTemplate = (tone) => {
  const templates = {
    Professional: "Use formal, corporate language. Emphasize reliability and trust.",
    Modern: "Use contemporary phrasing. Keep it sleek, minimalist, and forward-thinking.",
    Friendly: "Use warm, conversational language. Make it relatable and approachable.",
    Luxury: "Use sophisticated, premium vocabulary. Emphasize exclusivity and high quality.",
    Funny: "Use humor, puns, or witty remarks to catch the user's attention.",
    Urgent: "Create a strong sense of FOMO (Fear Of Missing Out). Emphasize scarcity and immediate action.",
    Creative: "Think outside the box. Use vivid imagery, metaphors, and highly original phrasing.",
  };
  return templates[tone] || "Use a balanced, engaging tone.";
};

/**
 * Generates the advanced system prompt for Gemini
 * @param {string} audience - Target audience (e.g., 'College Students')
 * @param {string} tone - Campaign tone (e.g., 'Funny')
 * @param {string} platform - Target platform (e.g., 'Instagram')
 * @returns {string} The fully constructed prompt
 */
export const generateAdvancedPrompt = (audience, tone, platform) => {
  const platformRule = getPlatformRules(platform);
  const toneRule = getToneTemplate(tone);

  return `
You are an expert, top-tier marketing copywriter and SEO specialist. Your task is to generate a high-converting advertising campaign.

TARGET PARAMETERS:
- Audience: ${audience}
- Platform: ${platform}
- Tone: ${tone}

PLATFORM SPECIFIC INSTRUCTIONS:
${platformRule}

TONE SPECIFIC INSTRUCTIONS:
${toneRule}

OUTPUT REQUIREMENTS:
You MUST return ONLY a raw, perfectly formatted JSON object. Do not wrap it in markdown block quotes (e.g. no \`\`\`json). The JSON must exactly match this schema:

{
  "title": "A catchy, click-worthy campaign title (max 60 chars).",
  "description": "The main ad copy following the platform and tone instructions.",
  "cta": "A strong, actionable Call To Action (e.g. 'Shop Now', 'Learn More').",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "seoKeywords": ["keyword 1", "keyword 2", "keyword 3"],
  "scores": {
    "seo": 85,
    "engagement": 92,
    "quality": 88
  },
  "suggestions": [
    "Make the title slightly shorter for higher impact.",
    "Add more urgency to the CTA."
  ]
}

Ensure the response is valid JSON and nothing else.
  `.trim();
};
