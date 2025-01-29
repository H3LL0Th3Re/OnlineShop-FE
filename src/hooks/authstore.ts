import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface DecodedToken {
  exp: number; // exp is the expiration time in seconds (Unix timestamp)
  // Add other fields if needed, based on your JWT payload
}

export const useAuthStore = create<AuthState>((set) => ({
  token: Cookies.get('token') || null, // Retrieve token from cookies on load
  setToken: (token) => {
    if (token) {
      // Decode the token to get the expiration time (if it's a JWT)
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const exp = decodedToken.exp; // exp is the expiration time in seconds (Unix timestamp)

        if (exp) {
          const expirationDate = new Date(exp * 1000); // Convert to milliseconds
          const expiresIn = expirationDate.getTime() - Date.now(); // Calculate the time remaining until expiration

          // Set the cookie with dynamic expiration based on the token's expiry
          Cookies.set('token', token, {
            expires: expiresIn / (1000 * 60 * 60 * 24),
          }); // Convert to days
        }
      } catch (error) {
        console.error('Invalid token format', error);
      }
    } else {
      Cookies.remove('token'); // Remove token from cookies on logout
    }
    set({ token });
  },
}));
