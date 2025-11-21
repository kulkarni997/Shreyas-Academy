export interface SignupFormPayload {
  name: string;
  class: 'Class 11' | 'Class 12' | 'Dropper';
  email: string;
  contactNumber: string;
  guardianNumber: string;
}

const DEFAULT_API_BASE_URL = 'http://localhost:4000';
const SIGNUP_ENDPOINT = '/api/signup';

export async function submitSignupForm(payload: SignupFormPayload): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

  // When no backend is available, simulate a network latency to keep UX consistent.
  if (!import.meta.env.VITE_API_BASE_URL) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info('Signup form payload (mock):', payload);
    return;
  }

  const response = await fetch(`${baseUrl}${SIGNUP_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to submit signup form');
  }
}

