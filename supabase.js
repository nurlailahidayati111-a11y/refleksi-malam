// frontend/supabase.js
export const SUPABASE_URL = "https://axvzmwkungnwxxyviuav.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dnptd2t1bmdud3h4eXZpdWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjYzNjYsImV4cCI6MjA3OTIwMjM2Nn0.-SwYtc8fq4pzL2_XXsKJBpR3A4wiEv0Vel5mEPqNxNo"; // ANON public key

// inisialisasi
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.min.js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
