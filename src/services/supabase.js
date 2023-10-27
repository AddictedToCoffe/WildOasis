import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bdhyoskszascwwqwckuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkaHlvc2tzemFzY3d3cXdja3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NzcyMzQsImV4cCI6MjAxMDQ1MzIzNH0.O4lvmuWD07K37BNPMd_h8As8nkrz6osxlM8uFVbtius";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
