import React, {useContext} from 'react';
import {
    MDBBreadcrumb,
    MDBBreadcrumbItem, MDBBtn,
    MDBCol,
    MDBContainer,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from "mdb-react-ui-kit";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {Badge} from "react-bootstrap";

const Ideas = observer(({showCreate}) => {
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem active>Майстерня ідей</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>

                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBBtn onClick={()=>{
                            showCreate()
                        }} color={"secondary"} className='mb-4'>
                            Додати тему
                        </MDBBtn>
                        <MDBListGroup flush className="rounded-3" numbered={true}>
                            {worker.idea.map(idea=>
                                <MDBListGroupItem
                                    as="li"
                                    className="mt-2 d-flex justify-content-between align-items-start"
                                    onClick={()=>{
                                        worker.setCurrIdea(idea)
                                        worker.setShowCurrIdea(true)
                                        worker.setIdeaPage(false)
                                    }

                                    }
                                    style={{cursor:"pointer"}}
                                >
                                    <div className="me-auto">
                                        <div className="fw-bold" style={{fontSize:14}}>{user.user.filter(users=>{
                                            if(+users.id === +idea.creatorId){
                                                return users
                                            }
                                        }).map(userss => <div>{userss.name}</div>)}
                                        </div>
                                        <div className=" me-auto">{idea.name}</div>
                                    </div>
                                    <Badge bg="primary" pill>

                                    </Badge>
                                </MDBListGroupItem>)}
                        </MDBListGroup>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </section>
    );
});

export default Ideas;