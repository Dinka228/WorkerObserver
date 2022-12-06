import React, {useContext, useState} from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem, MDBInput
} from 'mdb-react-ui-kit';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {Badge, Image, ListGroup} from "react-bootstrap";
import image from "../User_icon-cp.png";

const Profile = observer(({showPoll}) => {
    const {user} = useContext(Context)
    const {worker} = useContext(Context)
    const [newVoices,setNewVoice] = useState({})
    const [averageProfActivity,setAverageProfActivity] = useState(0)
    const [averageWorkInProject,setAverageWorkInProject] = useState(0)
    const [averageLoyalty,setAverageLoyalty] = useState(0)
    function setUpdateData(user){
        user.profActivity = averageProfActivity
        user.workInProject = averageWorkInProject
        user.loyalty = averageLoyalty
    }
    function updateData(){
        console.log('TYT 1')
        user.user.filter(userFilter=>{
            if(+user.currProfile.id === +userFilter.id){
                console.log(worker.voices)
                setAverageProfActivity(worker.voices.reduce((prev, user) => +prev + +user.profActivity, 0)/worker.voices.length)
                setAverageWorkInProject(worker.voices.reduce((prev, user) => +prev + +user.workInProject, 0)/worker.voices.length)
                setAverageLoyalty(worker.voices.reduce((prev, user) => +prev + +user.loyalty, 0)/worker.voices.length)

                setUpdateData(userFilter)
            }
        })
        console.log(averageProfActivity,averageWorkInProject,averageLoyalty)
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem active>Профіль користувача</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1">{user.currProfile.role}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn outline className="ms-1">Повідомлення</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                        {
                            +user.currUser.id === +user.currProfile.id ?
                                <MDBCard className="mb-4 mb-lg-0">

                                <h2 style={{fontSize:22}}>Повідомлення</h2>
                                <MDBCardBody className="p-0">
                                    <MDBListGroup flush className="rounded-3">
                                        {
                                            worker.messages.filter(messageFilter=>{
                                                if(messageFilter.to === user.currUser.role || messageFilter.to === 'All'){
                                                    return messageFilter
                                                }
                                            }).map(message =>
                                                <MDBListGroupItem
                                                    as="li"
                                                    className="d-flex justify-content-between align-items-start"
                                                    style={{cursor:"pointer"}}
                                                    onClick={()=>{
                                                        if(message.type === 'poll'){
                                                            user.user.filter(userFilter=>{
                                                                if(+message.workerThatPollId === +userFilter.id){
                                                                    return userFilter
                                                                }
                                                            }).map(users=>{
                                                                showPoll(users)
                                                            })
                                                        }
                                                        else if(message.type === 'project'){

                                                        }
                                                    }}
                                                    key={message.id}
                                                >
                                                    <div className="me-auto">
                                                        <div className="fw-bold" style={{fontSize:14}}>{user.user.filter(users=>{
                                                            if(+users.id === +message.workerId){
                                                                return users
                                                            }
                                                        }).map(userss => <div>{userss.name}</div>)}
                                                        </div>
                                                        <div className=" me-auto">{message.text}</div>
                                                    </div>
                                                    <Badge bg="primary" pill>

                                                    </Badge>
                                                </MDBListGroupItem>
                                            )
                                        }
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                                :
                                <div></div>
                        }

                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Повне ім'я</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBInput value={user.currProfile.name} disabled={true} />
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Електронна почта</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBInput value={user.currProfile.email} disabled={true}/>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Телефон</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {/*<MDBCardText className="text-muted">(098) 765-4321</MDBCardText>*/}
                                        <MDBInput value={user.currProfile.telephone} disabled={true}/>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Результати навчання</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {/*<MDBCardText className="text-muted">(098) 765-4321</MDBCardText>*/}
                                        <MDBInput value={user.currProfile.resultStudy} disabled={true}/>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Проф активність</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {/*<MDBCardText className="text-muted">(098) 765-4321</MDBCardText>*/}
                                        <MDBInput value={user.currProfile.profActivity} disabled={true}/>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Робота у проєкті</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {/*<MDBCardText className="text-muted">(098) 765-4321</MDBCardText>*/}
                                        <MDBInput value={user.currProfile.workInProject} disabled={true}/>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Лояльність</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {/*<MDBCardText className="text-muted">(098) 765-4321</MDBCardText>*/}
                                        <MDBInput value={user.currProfile.loyalty} disabled={true}/>
                                    </MDBCol>
                                </MDBRow>
                                {
                                    user.currUser.role === 'ADMIN' ?
                                        <MDBBtn className='mt-3' color={"success"} onClick={()=>{
                                            updateData()
                                        }
                                        }>
                                            Синхронізувати
                                        </MDBBtn>
                                        :
                                        <div></div>
                                }
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">

                            </MDBCol>

                            <MDBCol md="6">

                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
});

export default Profile;