/**
 * Pusat Inventaris Warung
 * Copyright (c) 2026 Wisam Yassar Mahardika
 * Licensed under the MIT License
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
