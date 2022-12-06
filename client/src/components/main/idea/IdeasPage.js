import React, {useContext, useState} from 'react';
import {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBFooter,
    MDBInput, MDBListGroup, MDBListGroupItem,
    MDBRow
} from "mdb-react-ui-kit";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Badge, Form} from "react-bootstrap";

const IdeasPage = observer(() => {
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    const [newIdeaMessage,setNewIdeaMessage] = useState({text:""})
    function addNewIdeaMessage()   {
        const newUIdeaMessage={
            ...newIdeaMessage,id:Date.now(),creatorId:user.currUser.id,ideaId:worker.currIdea.id

        }
        console.log(newUIdeaMessage)
        worker.ideasMessage.push(newUIdeaMessage)
        setNewIdeaMessage({text:''})

    }
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem active>{worker.currIdea.name}</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBListGroup flush className="rounded-3" numbered={true}>
                            {worker.ideasMessage.filter(ideaFilter=>{
                                if(+ideaFilter.ideaId === +worker.currIdea.id){return ideaFilter}
                            }).map(idea=>
                                <MDBListGroupItem
                                    as="li"
                                    className="mt-2 d-flex justify-content-between align-items-start"
                                >
                                    <div className="me-auto">
                                        <div className="fw-bold" style={{fontSize:14}}>{user.user.filter(users=>{
                                            if(+users.id === +idea.creatorId){
                                                return users
                                            }
                                        }).map(userss => <div>{userss.name}</div>)}
                                        </div>
                                        <div className=" me-auto">{idea.text}</div>
                                    </div>
                                    <Badge bg="primary" pill>

                                    </Badge>
                                </MDBListGroupItem>)}
                        </MDBListGroup>
                    </MDBCol>
                </MDBRow>
                <MDBFooter className='mt-4'>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Напишь тут те, що хочете відправити..."
                               aria-label="Напишь тут те, що хочете відправити..." aria-describedby="button-addon2"
                               value={newIdeaMessage.text}
                               onChange={e=>setNewIdeaMessage({...newIdeaMessage, text: e.target.value})}/>
                            <MDBBtn onClick={()=>{
                                addNewIdeaMessage()
                            }} color={"secondary"} id="button-addon2">
                                Відправити
                            </MDBBtn>
                    </div>
                </MDBFooter>
            </MDBContainer>
        </section>
    );
});

export default IdeasPage;