import {
    createClient,
    createPortableTextComponent,
    createImageUrlBuilder,
    createPreviewSubscriptionHook,
    createCurrentUserHook
  } from "next-sanity";


export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-08-11", // or today's date for latest
    useCdn: process.env.NODE_ENV === "production",
  };

export const sanityClient = createClient(config);

export const currentUser = source => createCurrentUserHook(config);




