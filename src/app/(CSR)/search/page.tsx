//"use client"

import { Metadata } from "next";
import SearchPage from "./SearchPage";

export const metadata:Metadata={
    title: "Search - Next App Router Tutorial",
}

export default function Page(){

    return <SearchPage/> //This is how you put a client component inside a server compnent

}