"use client"  // We make this a client side component coz we use a hook. A hook is a client side feature

import Link from "next/link"
import {Navbar,Nav, Container, NavDropdown} from "react-bootstrap"

import {usePathname, useRouter} from "next/navigation"

export default function NavBar(){
   // const router = useRouter();
    const pathname = usePathname();


    return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Wangitech.ai
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/static" active={pathname==="/static"}>Static</Nav.Link>
                    
                        <Nav.Link as={Link} href="/dynamic" active={pathname==="/dynamic"}>Dynamic</Nav.Link>
                        <Nav.Link as={Link} href="/isr" active={pathname==="/isr"}>ISR</Nav.Link>
                   
                        <NavDropdown title="Topics" id="topics-dropdown">
                        <NavDropdown.Item as={Link} href="/topics/health" >Health</NavDropdown.Item>
                        <NavDropdown.Item as={Link} href="/topics/fitness" >Fitness</NavDropdown.Item>
                        <NavDropdown.Item as={Link} href="/topics/coding" >Coding</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} href="/search" active={pathname==="/search"}>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )

}