export function extractSection(text: string, startMarker: string, endMarker?: string): string {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';

  const searchStart = startIndex + startMarker.length;
  const endIndex = endMarker ? text.indexOf(endMarker, searchStart) : text.length;
  
  if (endIndex === -1) return text.slice(searchStart).trim();
  return text.slice(searchStart, endIndex).trim();
}

export function parseSectionFeedback(text: string, includeScore = true) {
  const result: {
    score?: number;
    feedback: string[];
    alternative?: string;
  } = {
    feedback: [],
  };

  if (includeScore) {
    const scoreMatch = text.match(/SCORE:\s*(\d+(?:\.\d+)?)/);
    if (scoreMatch) {
      result.score = parseFloat(scoreMatch[1]);
    }
  }

  // Extract bullet points
  const bullets = text.match(/•[^\n]+/g) || [];
  result.feedback = bullets.map(bullet => bullet.replace('•', '').trim());

  // Look for alternative suggestions
  const alternativeMarkers = [
    'Suggested alternative:',
    'Alternative opener:',
    'Alternative framework:',
    'Alternative closing:',
    'Better approach:',
    'Suggestion:',
  ];

  for (const marker of alternativeMarkers) {
    const altIndex = text.indexOf(marker);
    if (altIndex !== -1) {
      const altStart = altIndex + marker.length;
      const altEnd = text.indexOf('\n', altStart);
      result.alternative = text.slice(altStart, altEnd === -1 ? undefined : altEnd).trim();
      break;
    }
  }

  return result;
} 