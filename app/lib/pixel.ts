declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackContact(source: string) {
  window.fbq?.('track', 'Contact', { content_name: source });
}

export function trackTrialLead(source: string) {
  window.fbq?.('track', 'Lead', { content_name: source });
}
