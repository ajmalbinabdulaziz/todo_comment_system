import { useContext,createContext, useState, useEffect, useMemo } from "react";
import { sanityClient } from '../sanity';
import { fetchAllComments, fetchTodos } from "../utils/services";



const Context = createContext()

export function useTodo(){
  return useContext(Context);
}

export default function AppStore({ children }){

  const [todos, setTodos] = useState()
  const [comments, setComments] = useState()
  
  useEffect(()=>{
    fetchTodos().then(res => setTodos(res))
    fetchAllComments().then(res => setComments(res))
  }, [])


  return(
    <Context.Provider value={{
        todos,
        comments,
      }}
    >
      {children}
    </Context.Provider>
  )

}

