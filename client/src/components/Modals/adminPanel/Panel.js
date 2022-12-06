import React from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

const Panel = () => {
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
};

export default Panel;