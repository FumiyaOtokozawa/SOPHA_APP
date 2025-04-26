import React, {createContext, useState, useEffect, useContext} from 'react';
import {Session, User} from '@supabase/supabase-js';
import {supabase} from '../lib/supabase';

// ユーザー情報の型定義
export type UserInfo = {
  emp_no: number;
  myoji?: string;
  namae?: string;
  last_nm?: string;
  first_nm?: string;
  gender: string;
  email?: string;
  icon_url?: string;
  birthday?: string;
  join_date?: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userInfo: UserInfo | null;
  login: (email: string, password: string) => Promise<{error: any | null}>;
  register: (
    email: string,
    password: string,
  ) => Promise<{error: any | null; user: User | null}>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{error: any | null}>;
  fetchUserInfo: (email: string) => Promise<UserInfo | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // USER_INFOテーブルからユーザー情報を取得
  const fetchUserInfo = async (email: string): Promise<UserInfo | null> => {
    try {
      const {data, error} = await supabase
        .from('USER_INFO')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('ユーザー情報取得エラー:', error);
        return null;
      }

      if (data) {
        setUserInfo(data);
        return data;
      }
      return null;
    } catch (error) {
      console.error('ユーザー情報取得中にエラーが発生しました:', error);
      return null;
    }
  };

  useEffect(() => {
    // v1では異なるセッション取得方法
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    // セッションが存在する場合、ユーザー情報を取得
    if (session?.user?.email) {
      fetchUserInfo(session.user.email);
    }

    setLoading(false);

    // 認証状態の変更を監視
    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // 認証状態変更時にユーザー情報も更新
        if (session?.user?.email) {
          await fetchUserInfo(session.user.email);
        } else {
          setUserInfo(null);
        }

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

      // ログイン成功時にユーザー情報を取得
      if (!error) {
        await fetchUserInfo(email);
      }

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
      setUserInfo(null);
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
    userInfo,
    login,
    register,
    logout,
    forgotPassword,
    fetchUserInfo,
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
