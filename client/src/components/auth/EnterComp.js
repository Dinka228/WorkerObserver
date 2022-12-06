import React, {useContext, useState} from 'react';
import {Button, Form, Row} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {MAIN_ROUTE} from "../../utils/consts";

const EnterComp = observer(() => {
    const history = useHistory()
    const [User, setUser] = useState({email:"",password:''})
    const {user} = useContext(Context)
    function checkUser(){
        user.user.filter(users=>{
            if(User.email === users.email && User.password === users.password){
                user.setIsAuth(true)
                user.setCurrentUser(users)
                history.push(MAIN_ROUTE)
            }
        })
    }
    return (
        <Form className='d-flex flex-column'>
            <Form.Control
                value={User.email}
                onChange={e => setUser({...User, email: e.target.value})}
                className='mt-3'
                placeholder='Введіть ваш email...'
            />
            <Form.Control
                value={User.password}
                onChange={e => setUser({...User, password: e.target.value})}
                className='mt-3'
                type="password"
                placeholder='Введіть ваш пароль...'
            />

            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <Button
                    onClick={checkUser}
                    variant="outline-success"
                >
                    Увійти
                </Button>

            </Row>
        </Form>

    );
});

export default EnterComp;