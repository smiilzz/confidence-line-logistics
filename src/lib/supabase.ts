import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("FATAL: SUPABASE_URL o SUPABASE_ANON_KEY no están definidos en las variables de entorno del servidor. Revisa tu panel en Vercel/Producción.");
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
