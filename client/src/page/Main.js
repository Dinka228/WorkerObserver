import React, {useContext, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import WorkerBar from "../components/main/WorkerBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {set} from "mobx";
import Manage from "../components/main/personal/manage";
import Projects from "../components/main/projects/Projects";
import Ideas from "../components/main/idea/Ideas";
import Learn from "../components/main/learn/Learn";
import Profile from "../components/main/profile/Profile";
import Poll from "../components/Modals/personal/poll";
import ProjectPage from "../components/main/projects/ProjectPage";
import CreateProject from "../components/Modals/project/CreateProject";
import CreateStage from "../components/Modals/project/CreateStage";
import CreateTask from "../components/Modals/project/CreateTask";
import IdeasPage from "../components/main/idea/IdeasPage";
import CreateIdeas from "../components/Modals/ideas/CreateIdeas";

const Main = observer(() => {
    const [createProject,setCreateProject] = useState(false)
    const [createStage,setCreateStage] = useState(false)
    const [createTask,setCreateTask] = useState(false)
    const [createIdea,setCreateIdea] = useState(false)

    const [poll,setPoll] = useState(false)
    const [user,setUser] = useState({})
    const {worker} = useContext(Context)
    return (
        <Container>
            <Row className="mt-2">

                <Col md={9}>
                    {worker.managePage ?
                        <Manage/>:<div></div>
                    }
                    {worker.projectPage ?
                        <Projects showCreate={()=>setCreateProject(true)}/>:<div></div>
                    }
                    {worker.ideaPage ?
                        <Ideas showCreate={()=>setCreateIdea(true)}/>:<div></div>
                    }
                    {worker.learnPage ?
                        <Learn/>:<div></div>
                    }
                    {worker.profilePage ?
                        <Profile showPoll={(array)=>{
                            setUser(array)
                            setPoll(true)
                        }}/>:<div></div>
                    }
                    {worker.showCurrProject ?
                        <ProjectPage showCreate={()=>setCreateStage(true)} showCreateTask={()=>setCreateTask(true)}/>:<div></div>
                    }
                    {worker.showCurrIdea ?
                        <IdeasPage />:<div></div>
                    }

                </Col>
                <Col md={3}>
                    <Card style={{borderRadius:20}}>
                        <div className="d-flex justify-content-center mt-2">
                            Робітники
                        </div>
                        <WorkerBar />
                    </Card>

                </Col>
            </Row>
            <CreateProject show={createProject} onHide={()=>setCreateProject(false)}/>
            <CreateStage show={createStage} onHide={()=>setCreateStage(false)}/>
            <CreateTask show={createTask} onHide={()=>setCreateTask(false)}/>
            <CreateIdeas show={createIdea} onHide={()=>setCreateIdea(false)}/>
            <Poll show={poll} onHide={()=>setPoll(false)} user={user}/>
        </Container>
    );
});

export default Main;