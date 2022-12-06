import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Context} from "../../../index";

const CreateNewUser = observer(({show,onHide}) => {
    const {user} = useContext(Context)
    const {worker} = useContext(Context)
    const [newRole,setNewRole] = useState('')
    const [newUser,setNewUser] = useState({name:"",
        role:"",
        telephone:"", email:"",
        resultStudy:"",profActivity:0,workInProject:0,loyalty:0})
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
        onHide()

    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Створення оголошення
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        <Dropdown.Toggle> {"Виберіть роль"}</Dropdown.Toggle>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={()=>{
                    addNewUser()
                    // history.push(CREATE_ROUTE)
                }}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateNewUser;