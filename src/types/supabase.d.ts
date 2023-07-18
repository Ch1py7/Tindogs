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
    dogs: Dogs
    users: Users
  }

  export interface Dogs {
    Row: RowDogs
    Insert: InsertDogs
    Update: UpdateDogs
    Relationships: RelationshipsItemDogs[]
  }

  export interface RowDogs {
    breed: string
    description: string
    id: number
    image: string
    mood: string
    name: string
    owner: string
  }

  export interface InsertDogs {
    breed: string
    description: string
    id?: number
    image: string
    mood: string
    name: string
    owner: string
  }

  export interface UpdateDogs {
    breed?: string
    description?: string
    id?: number
    image?: string
    mood?: string
    name?: string
    owner?: string
  }

  export interface RelationshipsItemDogs {
    foreignKeyName: 'dogs_owner_fkey'
    columns: ['owner']
    referencedRelation: 'users'
    referencedColumns: ['id']
  }

  export interface Users {
    Row: RowUsers
    Insert: InsertUsers
    Update: UpdateUsers
    Relationships: RelationshipsItemUsers[]
  }

  export interface RowUsers {
    id: string
    name: string
  }

  export interface InsertUsers {
    id: string
    name: string
  }

  export interface UpdateUsers {
    id?: string
    name?: string
  }

  export interface RelationshipsItemUsers {
    foreignKeyName: 'users_id_fkey'
    columns: ['id']
    referencedRelation: 'users'
    referencedColumns: ['id']
  }
}
