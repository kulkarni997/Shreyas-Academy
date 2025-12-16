export interface MentorLoginPayload {
    mentorId: string;
    password: string;
  }
  
  export interface MentorLoginResponse {
    success: boolean;
    mentor?: {
      mentorId: string;
      name: string;
      email: string;
    };
    message?: string;
  }
  
  const DEFAULT_API_BASE_URL = 'http://localhost:5000';
  const MENTOR_LOGIN_ENDPOINT = '/api/auth/mentor-login';
  
  export async function submitMentorLogin(payload: MentorLoginPayload): Promise<MentorLoginResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  
    const response = await fetch(`${baseUrl}${MENTOR_LOGIN_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(errorData.message || 'Failed to login');
    }
  
    return response.json();
  }
