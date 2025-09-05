import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ShoppingList = {
  id?: number
  userId: number
  name: string
  quantity: number
  notes?: string
  category?: string
  image?: string
  dateAdded: string
}

type State = { lists: ShoppingList[] }
const initialState: State = { lists: [] }

const slice = createSlice({
  name:'lists',
  initialState,
  reducers:{
    setLists(state, action: PayloadAction<ShoppingList[]>) { state.lists = action.payload },
    addList(state, action: PayloadAction<ShoppingList>){ state.lists.push(action.payload) },
    updateList(state, action: PayloadAction<ShoppingList>){
      const i = state.lists.findIndex(l=>l.id===action.payload.id)
      if(i>-1) state.lists[i] = action.payload
    },
    deleteList(state, action: PayloadAction<number>){
      state.lists = state.lists.filter(l=>l.id!==action.payload)
    }
  }
})

export const { setLists, addList, updateList, deleteList } = slice.actions
export default slice.reducer
