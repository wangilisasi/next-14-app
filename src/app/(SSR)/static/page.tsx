import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link  from "next/link";
import type { Metadata } from 'next'
import {Alert} from "@/components/bootstrap"

export const metadata: Metadata = {
    title: 'Static Fetching - Next App Router Tutorial',
   
  }

export default async function StaticPage(){    //we make it async coz we fetch data
    
    const response = await fetch("https://api.unsplash.com/photos/random?client_id="+process.env.UNSPLASH_ACCESS_KEY);
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width/image.width)*image.height;
    
    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
            This page <strong>fetches and caches data at build time</strong>.
                Even though the Unsplash API always returns a new image, we see the same image after refreshing the page until we compile the project again.
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