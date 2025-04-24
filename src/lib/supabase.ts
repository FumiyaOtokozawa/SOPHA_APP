import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

// 環境変数から直接値を設定 (.envファイルからではなく)
const supabaseUrl = 'https://nvqbxjibrfvxbknssrsw.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cWJ4amlicmZ2eGJrbnNzcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMDgyMDgsImV4cCI6MjA0Njc4NDIwOH0.c2iyLyDaKhBz6z6-_Tch1CWLnjkuWgqeaSJNzCvlOhE';

// 確認用のログ
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

// Supabase v1: 異なる構成オプション
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});

export {supabase};
