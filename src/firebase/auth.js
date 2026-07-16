import { auth } from "./config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from "firebase/auth";

// Check if Firebase is using dummy credentials or is unconfigured
const isSimulated = !import.meta.env.VITE_FIREBASE_API_KEY || 
                    import.meta.env.VITE_FIREBASE_API_KEY.includes("dummy");

// Listeners list for mock auth
const listeners = [];
let mockUser = null;

// Helper to notify listeners of auth state changes
const notifyListeners = (user) => {
  listeners.forEach(cb => cb(user));
};

// Initialize simulated user from localStorage if present
if (isSimulated && typeof window !== "undefined") {
  try {
    const storedUser = localStorage.getItem("mock_user");
    if (storedUser) {
      mockUser = JSON.parse(storedUser);
    }
  } catch (e) {
    console.error("Error loading mock user", e);
  }
}

export const onAuthStateChanged = (authInstance, callback) => {
  if (!isSimulated) {
    return firebaseOnAuthStateChanged(authInstance, callback);
  }
  
  // Register simulated callback
  listeners.push(callback);
  
  // Immediately call with the current user state
  callback(mockUser);
  
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

export const signUpUser = async (email, password) => {
  if (isSimulated) {
    try {
      const usersJson = localStorage.getItem("mock_users") || "[]";
      const users = JSON.parse(usersJson);
      
      if (users.some(u => u.email === email)) {
        return { user: null, error: "Email already in use." };
      }
      
      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem("mock_users", JSON.stringify(users));
      
      mockUser = { email };
      localStorage.setItem("mock_user", JSON.stringify(mockUser));
      notifyListeners(mockUser);
      
      return { user: mockUser, error: null };
    } catch (e) {
      return { user: null, error: e.message };
    }
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  if (isSimulated) {
    try {
      const usersJson = localStorage.getItem("mock_users") || "[]";
      const users = JSON.parse(usersJson);
      
      const matchedUser = users.find(u => u.email === email);
      if (!matchedUser) {
        return { user: null, error: "User not found. Please sign up first." };
      }
      
      if (matchedUser.password !== password) {
        return { user: null, error: "Wrong password." };
      }
      
      mockUser = { email };
      localStorage.setItem("mock_user", JSON.stringify(mockUser));
      notifyListeners(mockUser);
      
      return { user: mockUser, error: null };
    } catch (e) {
      return { user: null, error: e.message };
    }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  if (isSimulated) {
    mockUser = null;
    localStorage.removeItem("mock_user");
    notifyListeners(null);
    return { error: null };
  }

  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};