import React, {useContext, useState} from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Context} from "../../../index";

const Manage = observer(() => {
    const [createVis,setCreateVis] = useState(false)
    const [poll,setPoll] = useState(false)
    const {user} = useContext(Context)
    const {worker} = useContext(Context)
    const [newRole,setNewRole] = useState('')
    const [userName,setUserName] = useState({})
    const [newUser,setNewUser] = useState({name:"",
        role:"",
        telephone:"", email:"",
        resultStudy:"",profActivity:0,workInProject:0,loyalty:0})
    const [newPoll,setNewPoll] = useState({text:"",
        type:"",
        workerId:"", to:"", workerThatPollId:""})
    function addNewUser()   {
        const newUsers={
            ...newUser,id:Date.now()

        }
        console.log(newUsers)
        user.user.push(newUsers)
        setNewUser({name:"",
            role:"",
            telephone:"", email:"",
            resultStudy:"",profActivity:0,workInProject:0,loyalty:0})

    }
    function addNewPoll(){
        newPoll.text = `Починається опитування про ${userName.name}`
        newPoll.type = 'poll'
        newPoll.workerId = user.currUser.id
        newPoll.to = 'All'
        newPoll.workerThatPollId = userName.id
        const newPolls={
            ...newPoll,id:Date.now()

        }
        worker.messages.push(newPolls)
        setNewPoll({text:"",
            type:"",
            workerId:"", to:"", workerThatPollId:""})
    }
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem style={{cursor:"pointer"}} onClick={()=>{
                                setCreateVis(true)
                            }} active>Створення користувача</MDBBreadcrumbItem>
                            <MDBBreadcrumbItem  style={{cursor:"pointer"}} onClick={()=>{
                                setPoll(true)
                            }} active>Опитування</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>

                </MDBRow>
                <MDBRow>
                    {poll ?
                        <MDBCol>
                            <h3>Опитування</h3>
                            <Dropdown className='mt-3'>
                                <Dropdown.Toggle> {userName.name ? userName.name : "Виберіть робітника про якого буде опитування" }</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {user.user.map(users=>
                                        <DropdownItem onClick={()=>{
                                            setUserName(users)
                                        }
                                        }>{users.name}</DropdownItem>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <MDBBtn className='mt-3' color='success' onClick={()=>{
                                addNewPoll()
                                // history.push(CREATE_ROUTE)
                            }}>Відправити форму опитування</MDBBtn>
                        </MDBCol>
                        :
                        <MDBCol>
                            <h3>Створення користувача</h3>
                            <Form>
                                <Form.Control
                                    value={newUser.name}
                                    onChange={e=>setNewUser({...newUser, name: e.target.value})}
                                    className='mt-3'
                                    placeholder={"Введіть повне ім'я"}
                                />
                                <Form.Control
                                    value={newUser.email}
                                    onChange={e=>setNewUser({...newUser, email: e.target.value})}
                                    className='mt-3'
                                    placeholder={"Введіть пошту"}
                                />
                                <Form.Control
                                    value={newUser.telephone}
                                    onChange={e=>setNewUser({...newUser, telephone: e.target.value})}
                                    className='mt-3'
                                    placeholder={"Введіть телефон"}
                                />
                                <Form.Control
                                    value={newUser.resultStudy}
                                    onChange={e=>setNewUser({...newUser, resultStudy: e.target.value})}
                                    className='mt-3'
                                    placeholder={"Введіть освіту"}
                                />
                                <Dropdown className='mt-3'>
                                    <Dropdown.Toggle> {newRole === '' ? "Виберіть роль" : newRole}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <DropdownItem onClick={()=>{
                                            setNewRole('Admin')
                                        }}>
                                            Admin
                                        </DropdownItem>
                                        <DropdownItem onClick={()=>{
                                            setNewRole('Junior')
                                        }}>
                                            Junior
                                        </DropdownItem>
                                        <DropdownItem onClick={()=>{
                                            setNewRole('Middle')
                                        }}>
                                            Middle
                                        </DropdownItem>
                                        <DropdownItem onClick={()=>{
                                            setNewRole('Senior')
                                        }}>
                                            Senior
                                        </DropdownItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form>
                            <MDBBtn className='mt-3' color='success' onClick={()=>{
                                addNewPoll()
                                // history.push(CREATE_ROUTE)
                            }}>Додати</MDBBtn>
                        </MDBCol>
                    }
                </MDBRow>
            </MDBContainer>
        </section>
    );
});

export default Manage;