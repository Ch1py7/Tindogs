export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      DogsInfo: {
        Row: {
          cuteness: number | null
          description: string | null
          id: number
          image: string | null
          mood: string | null
          name: string | null
        }
        Insert: {
          cuteness?: number | null
          description?: string | null
          id?: number
          image?: string | null
          mood?: string | null
          name?: string | null
        }
        Update: {
          cuteness?: number | null
          description?: string | null
          id?: number
          image?: string | null
          mood?: string | null
          name?: string | null
        }
        Relationships: []
      }
    }
  }
}
