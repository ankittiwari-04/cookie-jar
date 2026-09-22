// TODO: set this to Cookie Chain's native token ticker
export const SYMBOL = 'COOK';

// TODO: open a real transaction on CookieScan and confirm this URL pattern
export const txUrl = (signature: string) => `https://cookiescan.io/tx/${signature}`;

export const short = (address: string) => `${address.slice(0, 4)}…${address.slice(-4)}`;

export const hue = (address: string) => {
  let h = 0;
  for (let i = 0; i < address.length; i++) h = (h * 31 + address.charCodeAt(i)) % 360;
  return h;
};

export const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });
