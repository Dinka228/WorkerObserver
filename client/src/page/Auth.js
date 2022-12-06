import React from 'react';
import {Card, Container} from "react-bootstrap";
import EnterComp from "../components/auth/EnterComp";

const Auth = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height:window.innerHeight-54}}
        >

            <Card style={{width:600}} className="p-5">
                <h2 className='m-auto'> Авторизація</h2>
                    <EnterComp/>
            </Card>
        </Container>
    );
};

export default Auth;