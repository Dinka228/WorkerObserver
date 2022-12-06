import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";

const CreateStage = ({show,onHide}) => {
    const [newStage, setNewStage] = useState({name:''})
    const [selectPeople,setSelectPeople] = useState({})
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    function addNewStage()   {
        const newUStage={
            ...newStage,id:Date.now(),projectId:worker.currProject.id,curatorId:selectPeople.id

        }
        console.log(newUStage)
        worker.stages.push(newUStage)
        setNewStage({name:''})
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
                    Створення етап
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={newStage.name}
                        onChange={e=>setNewStage({...newStage, name: e.target.value})}
                        className='mt-3'
                        placeholder={"Введіть назву"}
                    />
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle> {selectPeople.name || "Виберіть відповідного за проєкт"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {user.user.filter(userFilter=>{
                                if(userFilter.role === 'Middle'){
                                    return userFilter
                                }
                            }).map(users=>
                                <Dropdown.Item
                                    onClick={()=>{
                                        setSelectPeople(users)
                                    }}
                                    key={users.id}
                                >
                                    {users.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={()=>{
                    addNewStage()
                    // history.push(CREATE_ROUTE)
                }}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateStage;