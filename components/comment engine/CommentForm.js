import { useState } from "react";
import { useForm } from "react-hook-form";

const CommentForm = ({ parentId }) => {


    const [inputValue, setInputValue] = useState("");
    const [ buttonClicked, setButtonClicked ] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUserInput = (e) => {
        setInputValue(e.target.value);
    };

    const resetInputField = () => {
        setInputValue("");
    };

    const onSubmit = async(data) => {
        // setButtonClicked(true)
        await fetch('/api/createComment', {
          method: 'POST',
          body: JSON.stringify(data),
        }).then(()=> {
          console.log(data);
          // setButtonClicked(false)
          // setSubmitted(true);
        }).catch((err) => {
          console.log(err);
          // setSubmitted(false);
        })
      } 

  return (
        <div>  
            <div className="w-3/4 pl-10">
                <form 
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col space-y-2'
                >
                <textarea 
                {...register('message')}
                className='h-12 rounded-lg border border-gray-200 p-2 pl-4 outline-none
                disabled:bg-gray-100'
                placeholder='Write your comments'                       
                value={inputValue} onChange={handleUserInput}
                />

                <button
                disabled={buttonClicked}
                onClick={resetInputField}
                type='submit'
                className='rounded-full bg-blue-500 p-3 text-white font-semibold
                disabled:bg-gray-200'>
                    { parentId ? "Post reply" : "Post comment" }
                </button>                 
            </form>
            </div>                        
        </div>
  )
}

export default CommentForm

