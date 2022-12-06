import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";

const CreateIdeas = ({show,onHide}) => {
    const [newIdea, setNewIdea] = useState({name:''})
    const [selectPeople,setSelectPeople] = useState({})
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    function addNewIdea()   {
        const newUIdea={
            ...newIdea,id:Date.now(),creatorId:user.currUser.id

        }
        console.log(newUIdea)
        worker.idea.push(newUIdea)
        setNewIdea({name:''})
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
                    Створення теми
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={newIdea.name}
                        onChange={e=>setNewIdea({...newIdea, name: e.target.value})}
                        className='mt-3'
                        placeholder={"Введіть назву теми"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={()=>{
                    addNewIdea()
                    // history.push(CREATE_ROUTE)
                }}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateIdeas;