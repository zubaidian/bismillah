import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

const ADMIN_EMAIL = 'zubaidaisbest@gmail.com';

interface FirebaseContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  user: null,
  authReady: false,
  isAdmin: false,
  signInWithGoogle: async () => {},
  signOutUser: async () => {},
});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    const initFirebase = async () => {
      try {
        const [{ onAuthStateChanged }, { doc, getDoc }, { auth, db }] =
          await Promise.all([
            import('firebase/auth'),
            import('firebase/firestore'),
            import('../firebase'),
          ]);

        if (!active) return;

        unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
          if (!active) return;
          setUser(nextUser);

          if (!nextUser || !nextUser.emailVerified) {
            setIsAdmin(false);
            setAuthReady(true);
            return;
          }

          if (nextUser.email?.toLowerCase() === ADMIN_EMAIL) {
            setIsAdmin(true);
            setAuthReady(true);
            return;
          }

          try {
            const adminSnap = await getDoc(doc(db, 'admins', nextUser.uid));
            if (active) setIsAdmin(adminSnap.exists());
          } catch {
            if (active) setIsAdmin(false);
          } finally {
            if (active) setAuthReady(true);
          }
        });
      } catch {
        if (active) setAuthReady(true);
      }
    };

    const timer = window.setTimeout(initFirebase, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
      unsubscribe?.();
    };
  }, []);

  const signInWithGoogle = async () => {
    const [{ signInWithPopup }, { auth, googleProvider }] = await Promise.all([
      import('firebase/auth'),
      import('../firebase'),
    ]);
    await signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    const [{ signOut }, { auth }] = await Promise.all([
      import('firebase/auth'),
      import('../firebase'),
    ]);
    await signOut(auth);
  };

  return (
    <FirebaseContext.Provider
      value={{ user, authReady, isAdmin, signInWithGoogle, signOutUser }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}
