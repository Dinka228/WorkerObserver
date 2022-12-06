import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const Poll = observer(({show,onHide,user}) => {
    const [resultVoice,setResultVoice] = useState({profActivity:"",workInProject:"",loyalty:""})
    const {worker} = useContext(Context)
    function addVoice(){
        const newVoices = {
            ...resultVoice,id:Date.now(),workerId:user.id
        }
        worker.voices.push(newVoices)
        console.log(worker.voices)
        setResultVoice({profActivity:"",workInProject:"",loyalty:""})
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
                    {`Опитування про ${user.name} (100-бальна система)`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={resultVoice.profActivity}
                        onChange={e=>setResultVoice({...resultVoice, profActivity: e.target.value})}
                        className='mt-3'
                        placeholder={"Проф активність"}
                    />
                    <Form.Control
                        value={resultVoice.workInProject}
                        onChange={e=>setResultVoice({...resultVoice, workInProject: e.target.value})}
                        className='mt-3'
                        placeholder={"Робота у проєкті"}
                    />
                    <Form.Control
                        value={resultVoice.loyalty}
                        onChange={e=>setResultVoice({...resultVoice, loyalty: e.target.value})}
                        className='mt-3'
                        placeholder={"Лояльність"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={()=>{
                    addVoice()
                    // history.push(CREATE_ROUTE)
                }}>Відправити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default Poll;