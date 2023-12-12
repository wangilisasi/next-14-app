import type {Metadata} from "next"

import {UnsplashImage} from "@/models/unsplash-image"
import {Alert} from "@/components/bootstrap"
import Image from "next/image"
import Link from "next/link"


export const metadata: Metadata = {
    title: 'Incremental Static Regenration - Next App Router Tutorial',
   
  }


  export const revalidate = 15; // We set a number greater than zero to achieve ISR


export default async function DynamicPage(){
    const response = await fetch(process.env.BASE_URL+"photos/random?client_id="+process.env.UNSPLASH_ACCESS_KEY,
    {
       // cache:"no-cache/no-store"
       //next:{revalidate:0}
    });
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width/image.width)*image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
            This page uses <strong>incremental static regeneration</strong>.
            A new image is fetched every 15 seconds (after refreshing the page) and then served from the cache for that duration.
            </Alert>

            <Image
            alt={image.description}
            src={image.urls.raw}
            width={width}
            height={height}
            className="rounded shadow mw-100 mh-100"
            />
            by <Link href={"/users/"+image.user.username}>{image.user.username}</Link>
        </div>
    )
}