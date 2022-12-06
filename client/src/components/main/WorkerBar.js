import React, {useContext, useEffect, useRef} from 'react';
import {Badge, Image, ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import image from '../main/User_icon-cp.png'
import {OverlayScrollbars} from 'overlayscrollbars';
import {useHistory} from "react-router-dom";

const WorkerBar = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const {worker} = useContext(Context)
    const config = {}
    return (
        <div>
            <ListGroup  as="ol" numbered>
                {
                    user.user.map(users =>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            style={{cursor:"pointer"}}
                            onClick={()=>{
                                worker.setManagePage(false)
                                worker.setProjectPage(false)
                                worker.setIdeaPage(false)
                                worker.setLearnPage(false)
                                worker.setProfilePage(true)
                                user.setCurrentProfile(users)
                            }
                            }
                        >
                            <Image src={image} width={50} height={50}></Image>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{users.name}</div>
                                <div style={{fontSize: 12}}>{users.role}</div>
                            </div>
                            <Badge bg="primary" pill>

                            </Badge>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </div>

    );

});

export default WorkerBar;