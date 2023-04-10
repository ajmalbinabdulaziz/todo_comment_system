// import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from "react"
import { fetchPosts, fetchTodos } from "../utils/services"
import { BeakerIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useTodo } from "../contexts/TodoContext";
import { useQuery } from "react-query";




export default function Todos() {

  const [postList, setPostList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userComment, setUserComment] = useState("");
  const [value, setValue] = useState();
  const [ todoList, setTodoList ] = useState()
  const [ isEditing, setisEditing ] = useState(false)

  // const {  todos, comments } = useTodo()
  // console.log(todos);
  // console.log(comments);

  const {isLoading, isError, error, isFetched, refetch} =useQuery('states', ()=>{
    return fetchTodos().then(res => setTodoList(res))
  })  



  // useEffect(()=>{
  //   fetchTodos().then(res => setTodoList(res))
  // }, [])

  // console.log(todoList)

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleChangeComment = (e) => {
    e.preventDefault();
    setUserComment(e.target.value);
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
        
      await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({
          text: userInput,
        }),
      });
        
      setUserInput("");
      refetch()
    }

    const handleComment = async (e) => {
      e.preventDefault();
        
      await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify({
          message: userComment,
        
        }),
      });
        
      setUserComment("");
      refetch()
    }

  

    const handleDelete = async (selectedTodo) => { 
        await fetch("/api/todo", {
          method: "DELETE",
          body: selectedTodo._id,
        });
          
        refetch()
    }

    const handleEdit = async (e) => {
      e.preventDefault();

      await fetch("/api/todo", {
        method: "PUT",
        body: JSON.stringify({
          text: userInput,
        }),
        
      });
        
      refetch()
  }

    const handleFocus = (text)=> {
      console.log('Focused with text: ' + text)
    }

    const handleFocusOut= (text)=> {
      console.log('Left editor with text: ' + text)
    }

    return (
        <div>
             <form>
              <div className="flex justify-center items-center p-4 mt-20">
              <label className="invisible">Your Todo</label>
                <input
                  className="w-72 h-12 border p-4 border-blue-100"
                  type="text"
                  value={userInput}
                  placeholder="Make coffee."
                  onChange={handleChange}
                />
                <button
                className="focus:outline-none focus:ring focus:border-blue-800
                px-6 py-2 m-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
                font-semibold"
                onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>  
            </form>

          {/* COMMENTS */}
            {/* <form>
              <div className="flex justify-center items-center p-4 mt-4">
              <label className="invisible">Your Todo</label>
                <input
                  className="w-72 h-12 border p-4 border-blue-100"
                  type="text"
                  value={userComment}
                  placeholder="Make coffee."
                  onChange={handleChangeComment}
                />
                <button
                className="focus:outline-none focus:ring focus:border-blue-800
                px-6 py-2 m-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
                font-semibold"
                onClick={handleComment}
                >
                  Comment
                </button>
              </div>  
            </form> */}

            <div className="flex flex-col justify-center items-center p-4">
              <h1 className="text-2xl font-bold">My Todos</h1>

              {todoList?.map((todo) => (  
                <div key={todo._id} className="flex">
                   { isEditing ? (
                    <form>
                      <div className="flex justify-center items-center p-4 mt-20">
                      <label className="invisible">Your Todo</label>
                        <input
                          className="w-72 h-12 border p-4 border-blue-100"
                          type="text"
                          value={todo.text}
                          placeholder="Make coffee."
                          onChange={handleChange}
                        />
                        <button
                        className="focus:outline-none focus:ring focus:border-blue-800
                        px-6 py-2 m-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
                        font-semibold"
                        onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>  
                    </form>) : (
                      <h1 className="text-lg text-center p-2 m-2 w-40 font-bold border border-green-600 border-lg">
                        {todo.text}
                      </h1>
                    )
                  }
                
                  {/* <TrashIcon onClick={handleDelete} className="h-10 w-10 cursor-pointer" /> ` */}
                  {/* <InlineEdit 
                    value={todo.text} 
                    setValue={setUserInput} 
                    /> */}

                  <button 
                    className="p-2"
                   onClick={()=> {
                    handleDelete(todo)
                  }}>
                    Delete
                  </button>

                 
                  <button 
                    className="p-2"
                   onClick={()=> setisEditing(!isEditing)}>
                    Edit
                  </button>
                </div>
              ))}

            </div>

            {/* Displaying the posts */}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3
      md:gap-6 p-3 md:px-1 max-w-6xl mx-auto'>
        {postList.map((post) => (
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            <a>
              <div className='border p-1 mb-4 group cursor-pointer overflow-hidden'>

                <div className="h-16">
                  <p className="text-lg text-center pt-1 font-bold">{post.title}</p>
                </div>

              </div>
            </a>
          </Link>
        ))}
      </div>
      </div>
  )
};
