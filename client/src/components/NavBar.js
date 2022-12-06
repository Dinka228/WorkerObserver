import React, {useContext} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {Context} from "../index";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {worker} = useContext(Context)
    const history = useHistory()
    return (
        <Navbar bg="light" expand="lg">
            {
                user.isAuth ? <Container>
                    <Navbar.Brand style={{cursor:"pointer"}} onClick={()=>history.push(MAIN_ROUTE)}>Корпоративний сайт управління персоналом</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user.currUser.role === 'ADMIN' ?
                                <Nav.Link onClick={()=>{
                                    worker.setManagePage(true)
                                    worker.setProjectPage(false)
                                    worker.setIdeaPage(false)
                                    worker.setLearnPage(false)
                                    worker.setProfilePage(false)
                                    worker.setShowCurrIdea(false)
                                    worker.setShowCurrProject(false)
                                }
                                }>Управління персоналом</Nav.Link>
                                :
                                <div></div>

                            }
                            <Nav.Link onClick={()=>{
                                worker.setManagePage(false)
                                worker.setProjectPage(true)
                                worker.setIdeaPage(false)
                                worker.setLearnPage(false)
                                worker.setProfilePage(false)
                                worker.setShowCurrIdea(false)
                                worker.setShowCurrProject(false)
                            }
                            }>Проекти</Nav.Link>
                            <Nav.Link onClick={()=>{
                                worker.setManagePage(false)
                                worker.setProjectPage(false)
                                worker.setIdeaPage(true)
                                worker.setLearnPage(false)
                                worker.setProfilePage(false)
                                worker.setShowCurrIdea(false)
                                worker.setShowCurrProject(false)
                            }
                            }>Майстерня ідей</Nav.Link>
                            <Nav.Link onClick={()=>{
                                worker.setManagePage(false)
                                worker.setProjectPage(false)
                                worker.setIdeaPage(false)
                                worker.setLearnPage(true)
                                worker.setProfilePage(false)
                                worker.setShowCurrIdea(false)
                                worker.setShowCurrProject(false)
                            }
                            }>Навчання</Nav.Link>
                            <Nav.Link onClick={()=>{
                                worker.setManagePage(false)
                                worker.setProjectPage(false)
                                worker.setIdeaPage(false)
                                worker.setLearnPage(false)
                                worker.setProfilePage(true)
                                worker.setShowCurrProject(false)
                                worker.setShowCurrIdea(false)
                                user.setCurrentProfile(user.currUser)
                            }
                            }>Мій профіль</Nav.Link>

                            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                            {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.2">*/}
                            {/*        Another action*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider />*/}
                            {/*    <NavDropdown.Item href="#action/3.4">*/}
                            {/*        Separated link*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}

                            <Nav.Link onClick={()=>{
                                user.setIsAuth(false)
                                user.setCurrentUser({})
                                history.push(LOGIN_ROUTE)
                            }
                            }>Вийти</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container> : <div></div>
            }

        </Navbar>
    );
});

export default NavBar;