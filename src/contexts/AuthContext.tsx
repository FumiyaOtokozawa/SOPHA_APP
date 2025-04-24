import React, {createContext, useState, useEffect, useContext} from 'react';
import {Session, User} from '@supabase/supabase-js';
import {supabase} from '../lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{error: any | null}>;
  register: (
    email: string,
    password: string,
  ) => Promise<{error: any | null; user: User | null}>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{error: any | null}>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // v1では異なるセッション取得方法
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);

    // 認証状態の変更を監視
    const {data: authListener} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // ログイン処理
  const login = async (email: string, password: string) => {
    try {
      const {error} = await supabase.auth.signIn({
        email,
        password,
      });
      return {error};
    } catch (error) {
      return {error};
    }
  };

  // 新規登録処理
  const register = async (email: string, password: string) => {
    try {
      const {user, error} = await supabase.auth.signUp({
        email,
        password,
      });
      return {error, user: user || null};
    } catch (error) {
      return {error, user: null};
    }
  };

  // ログアウト処理
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  // パスワードリセット処理
  const forgotPassword = async (email: string) => {
    try {
      const {error} = await supabase.auth.api.resetPasswordForEmail(email);
      return {error};
    } catch (error) {
      return {error};
    }
  };

  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
