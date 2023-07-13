export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface signUserProps {
  email: string
  password: string
}

export namespace Supabase {
  export interface Database {
    public: Public
  }
  
  export interface Public {
    Tables: Tables
  }
  
  export interface Tables {
    DogsInfo: DogsInfo
  }
  
  export interface DogsInfo {
    Row: Row,
    Insert: Insert,
    Update: Update,
    Relationships: []
  }
  
  export interface Row {
    cuteness: number | null
    description: string | null
    id: number
    image: string | null
    mood: string | null
    name: string | null
  }
    
  export interface Insert {
    cuteness?: number | null
    description?: string | null
    id?: number
    image?: string | null
    mood?: string | null
    name?: string | null
  }
    
  export interface Update {
    cuteness?: number | null
    description?: string | null
    id?: number
    image?: string | null
    mood?: string | null
    name?: string | null
  }
}

