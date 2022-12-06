import React, {useContext, useState} from 'react';
import {
    MDBBreadcrumb,
    MDBBreadcrumbItem, MDBBtn,
    MDBCol,
    MDBContainer, MDBDropdownMenu,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from "mdb-react-ui-kit";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
let check = false
let name
const Projects = observer(({showCreate}) => {
    const {worker} = useContext(Context)
    const {user} = useContext(Context)
    // worker.workersProject.filter(workers=>{
    //     console.log(workers.workerId)
    // })
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem active>Проекти</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>

                </MDBRow>
                <MDBRow className='mt-3'>
                    <MDBCol>
                        <MDBBtn onClick={()=>{
                            if(worker.myProject){
                                worker.setMyProject(false)
                            }else{
                                worker.setMyProject(true)
                            }

                        }}>{worker.myProject ? 'Показати всі проекти':'Мої проєкти'}</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBListGroup>
                            {worker.project.filter(projects=>{
                                if(worker.myProject){
                                    console.log('My project')
                                    worker.workersProject.filter(workersProject=>{
                                        if(+projects.id === +workersProject.projectId && +user.currUser.id === +workersProject.workerId){
                                            console.log(+user.currUser.id)
                                            worker.setShowMyProject(true)
                                            return workersProject
                                        }
                                    })
                                    if(worker.showMyProject){
                                        worker.setShowMyProject(false)
                                        return projects
                                    }
                                }else{
                                    return projects
                                }
                            }).map(project=>
                                <MDBListGroupItem  className='mt-3' style={{cursor:"pointer"}}>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <div onClick={()=>{
                                            worker.setCurrProject(project)
                                            worker.setProjectPage(false)
                                            worker.setShowCurrProject(true)
                                        }} >
                                            {project.name}
                                        </div>

                                    <MDBDropdown >
                                        <MDBDropdownToggle>Участники</MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            {worker.workersProject.filter(workers=>{

                                                user.user.filter(users=>{
                                                    if(+workers.workerId === users.id && +workers.projectId === +project.id){

                                                        check = true
                                                        return users
                                                    }
                                                })
                                                if(check){
                                                    check=false
                                                    return workers
                                                }
                                                }
                                            ).map(worker=>
                                                <MDBDropdownItem link>{user.user.filter(users=>{
                                                    if(+worker.workerId === users.id){
                                                        return users
                                                    }
                                                }).map(user=>{return user.name})}</MDBDropdownItem>
                                            )}
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    <div>
                                        <div>Голова проекту:</div>
                                        <div>
                                            {user.user.filter(users=>{
                                                if(+project.curatorId === +users.id){
                                                    console.log(users.name)
                                                    return users
                                                }
                                            }).map(user=>{return user.name})
                                            }
                                        </div>


                                    </div>
                                </div>
                                </MDBListGroupItem>
                            )}
                        </MDBListGroup>

                    </MDBCol>

                </MDBRow>
                {
                    user.currUser.role === 'ADMIN' ?
                        <MDBRow className='mt-3'>
                        <MDBCol>
                            <MDBBtn onClick={()=>{showCreate()}}>Створити проект</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                        : <div></div>
                }

                </MDBContainer>
                </section>
    );
});

export default Projects;