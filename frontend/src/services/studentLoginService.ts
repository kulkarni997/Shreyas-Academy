export interface StudentLoginPayload {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    class: '11th' | '12th' | 'Dropper';
  }
  
  export interface StudentLoginResponse {
    success: boolean;
    user?: {
      name: string;
      email: string;
      phoneNumber: string;
      class: string;
      state: string;
    };
    message?: string;
  }
  
  const DEFAULT_API_BASE_URL = 'http://localhost:5000';
  const STUDENT_LOGIN_ENDPOINT = '/api/auth/student-login';
  
  export async function submitStudentLogin(payload: StudentLoginPayload): Promise<StudentLoginResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  
    const response = await fetch(`${baseUrl}${STUDENT_LOGIN_ENDPOINT}`, {
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