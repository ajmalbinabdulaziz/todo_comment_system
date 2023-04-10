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
      const newTodo = await JSON.parse(req.body);
      try {
        await client
          .create({
            _type: "todo",
            text: newTodo.text,
          })
          .then((res) => {
            console.log(`Todo was created, document ID is ${res._id}`);
          });
        res
          .status(200)
          .json({ msg: `Todo was created, document ID is ${res._id}` });
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

    case "PUT":
      await client
        .patch(req.body._id).set({ text }).commit()
        .then(res => res.body)
        .then(res => console.log('Todo Updated'))
      res.status(200).json({ msg: 'Success' })
      break;
  }
}