import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const CreateProject = observer(({show,onHide}) => {
    const [newProject, setNewProject] = useState({name:''})
    const [selectPeople,setSelectPeople] = useState({})
    const [newPoll,setNewPoll] = useState({text:"",
        type:"",
        workerId:"", to:"", workerThatPollId:""})
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    function addNewGoodsFunc()   {
        const newUProject={
            ...newProject,id:Date.now(),curatorId:selectPeople.id

        }
        const newWorkersProj={
            id:Date.now(),projectId:newUProject.id,workerId:selectPeople.id

        }
        console.log(newUProject)
        worker.project.push(newUProject)

        worker.workersProject.push(newWorkersProj)
         setNewProject({name:''})
        addNewPoll(newUProject)
        onHide()

    }
    function addNewPoll(newUProject){
        newPoll.text = `Розпочався набір у проект: ${newUProject.name}`
        newPoll.type = 'project'
        newPoll.workerId = user.currUser.id
        newPoll.to = 'All'
        newPoll.workerThatPollId = newUProject.id
        const newPolls={
            ...newPoll,id:Date.now()

        }
        worker.messages.push(newPolls)
        setNewPoll({text:"",
            type:"",
            workerId:"", to:"", workerThatPollId:""})
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
                        value={newProject.name}
                        onChange={e=>setNewProject({...newProject, name: e.target.value})}
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
                    addNewGoodsFunc()
                    // history.push(CREATE_ROUTE)
                }}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProject;