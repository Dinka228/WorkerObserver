import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = true
        this._users = [
            {id:1,role:"ADMIN",name:"Денис Роботько",telephone:380631779644,email:"dan3v@gmail.com",password:'11111',resultStudy:"",profActivity:0,workInProject:0,loyalty:0},
            {id:2,role:"Junior",name:"Дмитро Дробинко",telephone:121442343242,email:"dima@gmail.com",resultStudy:"",profActivity:0,workInProject:0,loyalty:0},
            {id:3,role:"Middle",name:"Слюсар Сергій",telephone:54645744564,email:"serega@gmail.com",resultStudy:"",profActivity:0,workInProject:0,loyalty:0},
            {id:4,role:"Middle",name:"Аліна Макарова",telephone:768646345235,email:"petya@gmail.com",resultStudy:"",profActivity:0,workInProject:0,loyalty:0},
            {id:5,role:"Middle",name:"Юрій Мукомел",telephone:234523526434,email:"vasya@gmail.com",resultStudy:"",profActivity:0,workInProject:0,loyalty:0},
            {id:6,role:"Senior",name:"Назарій Кирилюк",telephone:436453643534,email:"lesha@gmail.com",resultStudy:"",profActivity:0,workInProject:0,loyalty:0}
        ]
        this._currentUser = {id:1,role:"ADMIN",name:"Денис Роботько",telephone:380631779644,email:"dan3v@gmail.com",password:'11111',resultStudy:"",profActivity:0,workInProject:0,loyalty:0}
        this._currentProfile = {}
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._users = user
    }
    setCurrentUser(currUser){
        this._currentUser = currUser
    }
    setCurrentProfile(currProfile){
        this._currentProfile = currProfile
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._users
    }
    get currUser(){
        return this._currentUser
    }
    get currProfile(){
        return this._currentProfile
    }
}