"use client"

import { UnsplashImage } from "@/models/unsplash-image";
import { FormEvent, useState } from "react"
import {Form, Button, Spinner} from "react-bootstrap"
import Image from "next/image"
import styles from "./SearchPage.module.css"
import {Alert} from "@/components/bootstrap"


export default function SearchPage(){

    const [searchResults, setSearhResults] = useState<UnsplashImage[] | null>(null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

    async function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
    
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();
    
        if (query){
            try {
                setSearhResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);
                const response = await fetch("/api/search?query="+query);

                const images:UnsplashImage[] = await response.json();
                setSearhResults(images);
                
            } catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            }finally{
                setSearchResultsLoading(false)
            }

            
        }
    
    }
    

    return (
        <div>

            <Alert>
                This page fetches data <strong>client-side</strong>.
                In order to not leak API credentials, the request is sent to a NextJS <strong>route handler</strong> that runs on the server.
                This route handler then fetches the data from the Unsplash API and returns it to the client.
            </Alert>


            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search query</Form.Label>
                    <Form.Control
                    name="query"
                    placeholder="e.g. cats, dogs ..."
                    />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
            </Form>

            <div className="d-flex flex-column align-items-center">
                {searchResultsLoading&&<Spinner animation="border"/>}
                {searchResultsLoadingIsError&&<p>Error occured, try again</p>}
                {searchResults?.length===0&&<p>Nothing found, try a different query</p>}
            </div>



            {searchResults&&
                <>
            
                {console.log(searchResults)}
                {
                    searchResults.map(image=>(
                        <Image
                        src={image.urls.raw}
                        alt={image.description}
                        key={image.urls.raw}
                        width={250}
                        height={250}
                        className={styles.image}
                        />
                    ))
                }
                </>
            }
        </div>  
    )
}