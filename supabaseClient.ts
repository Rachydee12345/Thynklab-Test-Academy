import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = 'https://cnnqqxpnfrdqhicizuuy.supabase.co';
// Use the explicit Supabase Publishable Key provided for this project.
const supabaseAnonKey = 'sb_publishable_ZdVXisk4QDHEf-qUNIVfqQ_dRtpU6J4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
