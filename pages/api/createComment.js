import sanityClient from '@sanity/client'


const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-08-11",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { _id, message } = await JSON.parse(req.body);
      try {
        await client
          .create({
            _type: "comment",
            _id,
            message,
            user: "Rivoga",
            userId: "1",
          
          })
          .then((res) => {
            console.log(`Comment was created, comment ID is ${res._id}`);
          });
        res
          .status(200)
          .json({ msg: `Comment was created, comment ID is ${res._id}` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }

      break;

    case "DELETE":
      await client
        .delete(req.body)
        .then(res => res.body)
        .then(res => console.log('Todo Deleted'))
      res.status(200).json({ msg: 'Success' })
      break;
  }
}

// export default async function createComment() {
//   const { _id, message } = JSON.parse(req.body)
//   console.log(message)
//   try {
//       await client.create({
//           _type: "comment",
//           post: {
//               _type: "reference",
//               _ref: _id,
//           },
//           message,  
          // parent: {
          //   _type: "reference",
          //   _ref: _id,
          // },
          // children: {
          //   _type: "reference",
          //   _ref: _id,
          // },
          
//       })
//   } catch (error) {
//       return res.status(500).json({ message: "Couldn't not submit comment", error })
//   }
//   console.log("Comment Submitted")
//   return res.status(200).json({ message: "Comment submitted" })
// }