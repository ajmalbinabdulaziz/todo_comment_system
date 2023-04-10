import { deskTool, visionTool } from 'sanity/desk'

export const config = {
    projectID: "p3k4kns0",
    dataset: "production",

    // to8x5w5g 
    apiVersion: "2021-10-21",

    title: "Next.js Conf!",

    basePath: "/admin",

    plugins: [deskTool(), visionTool()]
}