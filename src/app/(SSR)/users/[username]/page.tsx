import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {Alert} from "@/components/bootstrap"

interface PageProps{
    params:{username:string},
}

async function getUser(username:string):Promise<UnsplashUser>{
    const response = await fetch(process.env.BASE_URL+`/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY
    }`)

    if(response.status===404){
        notFound();
    }

    const user = await response.json();
    return user

}


export async function generateMetadata({params:{username}}:PageProps):Promise<Metadata>{
    const user=await getUser(username)

    return{
        title: ([user.first_name, user.last_name].filter(Boolean).join(" ")||user.username)+" - Next App Router Tutorial"
    }
}


export default async function Page({params:{username}}:PageProps) {
    const user=await getUser(username)
   
    return (
        <div>
            <Alert>
            This profile page uses <strong>generateMetadata</strong> to set the <strong>page title</strong> dynamically from the API response.
            </Alert>
            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={"unsplash.com/"+user.username}>Unsplash Profile</a>
        </div>
    )
}