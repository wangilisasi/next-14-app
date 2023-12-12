
import {UnsplashImage} from "@/models/unsplash-image"
import Image from "next/image";
import styles from "./TopicPage.module.css"
import {Alert} from "@/components/bootstrap"
import { Metadata } from "next";

interface PageProps {
    params:{topic:string},
    // searchParams:{ [key: string]: string | string[] | undefined}
}

//export const revalidate =0;

//these three topics will be fetched at build time and cached, so whenever you fetch them they will be loaded immeaditely
export function generateStaticParams(){
    return ["health","fitness","coding"].map(topic=>({topic}))
}

export function generateMetadata({params:{topic}}:PageProps):Metadata{
    return{
        title: topic+"- Next App Router Tutorial"
    }
}

export default async function Page({params:{topic}}:PageProps){

    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
       // cache:"no-cache/no-store"
       //next:{revalidate:0}
    });
    const images: UnsplashImage[] = await response.json();

    return (
        <div>
            <Alert>
            This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
                Pages that are not included in generateStaticParams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).
            </Alert>
            <h1>{topic}</h1>
            {
                images.map((image)=>(
                    <Image src={image.urls.raw}
                    width={250}
                    height={250}
                    key={image.urls.raw}
                    alt={image.description}
                    className={styles.image}
                    />
                ))
            }
        </div>
    )
}
    
