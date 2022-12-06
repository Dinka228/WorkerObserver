import React, {useContext, useState} from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCard, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const ProjectPage = observer(({showCreate,showCreateTask}) => {
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    const [stageInfo,setStageInfo] = useState(false)
    const [stageId,setStageId] = useState(0)
    const [taskId,setTaskId] = useState(0)
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem active>{worker.currProject.name}</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                        {
                            worker.currProject.curatorId === user.currUser.id ?
                                <MDBBtn onClick={()=>{
                                showCreate()
                                }
                                } className='mb-4' color={"success"}>
                                    Додати етап до проекту
                                </MDBBtn>
                                :
                                <div></div>
                        }
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                {worker.stages.map(stage=> <MDBBreadcrumbItem onClick={()=>{
                                   worker.setCurrStage(stage)
                                }
                                } style={{cursor:"pointer"}} active>{stage.name}</MDBBreadcrumbItem>)}
                        </MDBBreadcrumb>
                        {
                            worker.currProject.curatorId === user.currUser.id && worker.currStage.name ?
                                <MDBBtn onClick={()=>{
                                    showCreateTask()
                                }
                                } className='mb-4' color={"success"}>
                                    Додати завдання до етапу
                                </MDBBtn>
                                :
                                <div></div>
                        }
                        {worker.currStage.name ?
                            <MDBRow>
                                <MDBCol className="bg-light rounded-3 p-3 mb-4">
                                    <h3>{worker.currStage.name}</h3>
                                        <div className='d-flex m-auto'>
                                            <div>Відповідний за етап: </div>
                                            <div>
                                                {user.user.filter(users=>{
                                                    if(worker.currStage.curatorId === +users.id){
                                                        return users
                                                    }
                                                }).map(user=>{return user.name})
                                                }
                                            </div>
                                        </div>
                                </MDBCol>
                            </MDBRow>
                            :
                            <div></div>
                        }
                        {
                            worker.currStage.name ?
                                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                    {worker.tasks.filter(taskFilter=>{
                                        if(+worker.currStage.id === +taskFilter.stageId){
                                            return taskFilter
                                        }
                                    }).map(task=> <MDBBreadcrumbItem onClick={()=>{
                                        worker.setCurrTask(task)
                                    }
                                    } style={{cursor:"pointer"}} active>{task.name}</MDBBreadcrumbItem>)}
                                </MDBBreadcrumb>
                                :
                                <div></div>
                        }
                        {worker.currTask.name ?
                            <MDBRow>
                                <MDBCol className="bg-light rounded-3 p-3 mb-4">
                                    <h3>{worker.currTask.name}</h3>
                                    <div className='d-flex flex-column'>
                                        <div>Відповідний за завдання: </div>
                                        <div>
                                            {user.user.filter(users=>{
                                                if(worker.currTask.curatorId === +users.id){
                                                    return users
                                                }
                                            }).map(user=>{return user.name})
                                            }
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column mt-4'>
                                        <div>Завдання: </div>
                                        <div>
                                            {worker.currTask.answer}
                                        </div>
                                    </div>
                                </MDBCol>

                            </MDBRow>
                            :
                            <div></div>
                        }
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </section>
    );
});

export default ProjectPage;