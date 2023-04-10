import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { fetchPostDetails, fetchSlug } from "../../utils/services";
import CommentForm from "../../components/comment engine/CommentForm";
import ListComments from "../../components/comment engine/ListComments";
import CommentSection from "../../components/comment engine/CommentSection";



export default function PostPage({ post }) {
    // const router = useRouter()
    // const { slug } = router.query
    // const [postDetails, setPostDetails] = useState({});
   


    // useEffect(()=>{
    //     fetchPostDetails(slug).then(res => setPostDetails(res))
    // }, [])
    // console.log(postDetails)



    return(
        <div className="p-20">
                
           {/* <CommentSection  post={post} /> */}
            <CommentForm />
           <ListComments post={post} />

        </div>
    )
}

export const getStaticPaths = async () => {
  
  const Slugs = await fetchSlug()
  const paths = Slugs.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {

  const post = await fetchPostDetails(params.slug)

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 60,
  };
};