/**
 * IndexNow Utility
 * Notifies search engines (Bing, Yandex, etc.) about content updates
 */

import { siteConfig } from '@/config/site';

const BING_INDEX_NOW_URL = 'https://www.bing.com/IndexNow';
const INDEX_NOW_KEY = process.env.INDEX_NOW_KEY || 'your_index_now_key_here'; // Should be in .env

/**
 * Ping IndexNow with a list of updated URLs
 */
export async function pingIndexNow(urls: string[]) {
  if (!INDEX_NOW_KEY || INDEX_NOW_KEY === 'your_index_now_key_here') {
    console.warn('IndexNow key not configured. Skipping ping.');
    return;
  }

  const payload = {
    host: new URL(siteConfig.url).hostname,
    key: INDEX_NOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEX_NOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(BING_INDEX_NOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`Successfully pinged IndexNow for ${urls.length} URLs`);
    } else {
      console.error('Failed to ping IndexNow:', await response.text());
    }
  } catch (error) {
    console.error('Error pinging IndexNow:', error);
  }
}

/**
 * Notify search engines about a single URL update
 */
export async function notifyUrlUpdate(path: string) {
  const fullUrl = `${siteConfig.url}${path.startsWith('/') ? '' : '/'}${path}`;
  await pingIndexNow([fullUrl]);
}
