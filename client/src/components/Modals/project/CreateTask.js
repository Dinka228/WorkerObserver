import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const CreateTask = observer(({show,onHide}) => {
    const [newTask, setNewTask] = useState({name:'',answer:""})
    const [selectPeople,setSelectPeople] = useState({})
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    function addNewTask()   {
        const newUTask={
            ...newTask,id:Date.now(),stageId:worker.currStage.id,curatorId:selectPeople.id

        }
        console.log(newUTask)
        worker.tasks.push(newUTask)
        setNewTask({name:'',answer:""})
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
                    Створення завдання
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={newTask.name}
                        onChange={e=>setNewTask({...newTask, name: e.target.value})}
                        className='mt-3'
                        placeholder={"Введіть назву"}
                    />
                    <Form.Control
                        value={newTask.answer}
                        onChange={e=>setNewTask({...newTask, answer: e.target.value})}
                        className='mt-3'
                        placeholder={"Введіть назву"}
                    />
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle> {selectPeople.name || "Виберіть відповідного за проєкт"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {user.user.filter(userFilter=>{
                                if(userFilter.role === 'Senior'){
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
                    addNewTask()
                    // history.push(CREATE_ROUTE)
                }}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateTask;