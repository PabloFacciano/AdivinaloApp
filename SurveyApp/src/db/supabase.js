import axios from 'axios';
import { createClient } from '@supabase/supabase-js'
import { useMainStore } from '../stores/main'

const supabaseOptions = {
  db: {
    schema: 'appv0',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-app': 'AdivinaloApp' },
  },
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, supabaseOptions);


supabase.auth.onAuthStateChange((_, _session) => {
  if (_ == "INITIAL_SESSION" && _session == null) return;

  const mainStore = useMainStore();

  if (_ == "SIGNED_OUT"){
    mainStore.auth.session = null;
    mainStore.currentUserId = null;
    return;
  }
  
  if (_session){
    mainStore.auth.session = _session;
    mainStore.currentUserId = _session.user?.id;
    mainStore.getUser(mainStore.currentUserId);
  }
})

export default supabase;