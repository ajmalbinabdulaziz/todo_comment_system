import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchAllComments } from '../../utils/services'





// function getReplyCountText(count) {
//     if (count === 0) {
//       return "No replies";
//     }
  
//     if (count === 1) {
//       return "1 reply";
//     }
  
//     return `${count} replies`;
//   }


// const CommentActions = ({ commentId, replyCount }) => {

//     const [replying, setReplying] = useState(false)

//     return(
//         <>
//             <div>
//                 <p>{getReplyCountText(replyCount)}</p>
//                 <button onClick={()=>setReplying(!replying)}>
//                     <p className="p-2 text-sm">
//                         Reply
//                     </p>
//                 </button>  
//             </div>

//             {replying && <CommentForm parentId={commentId} /> }
//         </> 
//     )
// }


// const Comment = ({ comment }) => {
//     console.log(comment.children.length)
//     console.log(comment.message)
//     return(
//         <>
//         <div 
//         className='flex-col items-center space-x-2 space-y-5 pr-12'
//         key={comment._id}
//         >           
//             <div className="flex p-2">
//                 <div className='flex flex-col border border-gray-100 rounded-lg w-full bg-gray-100'>           
//                     <p className="p-2">{comment.message}</p>
//                 </div>             
                       
//             </div>    
//         </div>
        {/* <CommentActions
            commentId={comment._id}
            replyCount={comment?.children.length}
        />

        {comment.children && comment.children.length > 0 && (
        <ListComments comments={comment.children} />
        )} */}

//         </>
//     )
// }



const ListComments = ({ post }) => {

    console.log(post.comments)
  return (
    <div>
        {post.comments?.map((comment)=>(
        //   <Comment key={comment._id} comment={comment} />
        <p key={comment._id}>{comment.message}</p>
        ))}  
    </div>
  )
}

export default ListComments


export const getStaticProps = async ({ slug }) => {

    const allComments = await fetchAllComments(slug)
  
    if (!allComments) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: { allComments },
      revalidate: 60,
    };
  };