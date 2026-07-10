/**
 * Validation Utilities
 * Input validation helpers
 */

/**
 * Validate Indian mobile number
 */
export function isValidIndianMobile(mobile: string): boolean {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile.replace(/\s/g, ''));
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize HTML string
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Validate Indian pincode
 */
export function isValidPincode(pincode: string): boolean {
  const regex = /^[1-9]\d{5}$/;
  return regex.test(pincode);
}

/**
 * Clean phone number (remove spaces, dashes, etc.)
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s\-()]/g, '');
}

/**
 * Validate string length
 */
export function isValidLength(str: string, min: number, max: number): boolean {
  const length = str.trim().length;
  return length >= min && length <= max;
}

/**
 * Check if string contains only alphabets
 */
export function isAlphabetic(str: string): boolean {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(str);
}

/**
 * Check if string contains only alphanumeric characters
 */
export function isAlphanumeric(str: string): boolean {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(str);
}
