import api from './api'

export async function fetchLists(userId: number){
  const res = await api.get(`/shoppingLists?userId=${userId}`)
  return res.data
}
export async function addList(list: any){
  const res = await api.post('/shoppingLists', list)
  return res.data
}
export async function updateList(id:number, list:any){
  const res = await api.put(`/shoppingLists/${id}`, list)
  return res.data
}
export async function deleteList(id:number){
  await api.delete(`/shoppingLists/${id}`)
}
export async function getListById(id:number){
  const res = await api.get(`/shoppingLists/${id}`)
  return res.data
}
