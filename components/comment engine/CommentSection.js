import React from 'react'
import CommentForm from './CommentForm'
import ListComments from './ListComments'

const CommentSection = ({ post }) => {
    console.log(post)
  return (
    <div>
        <CommentForm />
        {post.childComments && <ListComments childComments={post.childComments} />}
    </div>
  )
}

export default CommentSection