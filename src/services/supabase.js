import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ulubznmnvepevknyjlee.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWJ6bm1udmVwZXZrbnlqbGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNDMxMjcsImV4cCI6MjA2NjgxOTEyN30.AxUGwXbdRXt0u98O97dJSTvD21r3wYK72T__Pur__EU'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase