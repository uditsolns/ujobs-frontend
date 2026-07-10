/**
 * Fuzzy Search Utility
 * Provides intelligent string matching for autocomplete and search features
 */

/**
 * Calculates a simple fuzzy score for matching strings
 * Higher score means better match
 */
export function getFuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  
  if (!q) return 0;
  if (q === t) return 100; // Exact match
  if (t.startsWith(q)) return 90; // Prefix match
  if (t.includes(q)) return 70; // Substring match
  
  // Word-based match
  const tWords = t.split(/[\s-]+/);
  const qWords = q.split(/[\s-]+/);
  
  let score = 0;
  for (const qw of qWords) {
    if (qw.length < 2) continue;
    for (const tw of tWords) {
      if (tw.startsWith(qw)) score += 20;
      else if (tw.includes(qw)) score += 10;
    }
  }
  
  return score;
}

/**
 * Filters and sorts an array based on fuzzy matching
 */
export function fuzzyFilter<T>(
  items: T[],
  query: string,
  keyExtractor: (item: T) => string,
  minScore = 10,
  limit = 10
): T[] {
  if (!query.trim()) return items.slice(0, limit);
  
  return items
    .map(item => ({
      item,
      score: getFuzzyScore(query, keyExtractor(item))
    }))
    .filter(res => res.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .map(res => res.item)
    .slice(0, limit);
}

/**
 * Helper for category/work-type matching
 */
export function matchCategory(categories: any[], query: string) {
  return fuzzyFilter(
    categories,
    query,
    (cat) => cat.name || cat.work_type_name || ''
  );
}

/**
 * Helper for location matching
 */
export function matchLocation(locations: any[], query: string) {
  return fuzzyFilter(
    locations,
    query,
    (loc) => loc.name || loc.location_name || ''
  );
}
