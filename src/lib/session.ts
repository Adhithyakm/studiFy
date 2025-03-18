// lib/session.ts
export interface SessionUser {
    id: string;
    name: string;
    email: string;
  }
  
  export interface SessionData {
    user?: SessionUser;
    expires?: string;
  }
  
  export async function getSession(): Promise<SessionData> {
    // Mock implementation - replace with real session logic
    return {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    };
  }