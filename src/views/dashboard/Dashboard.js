import React, { lazy, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router';
import { useState } from "react";
import { ApiRequest } from "../common/ApiRequest";
import SuccessError from "../common/SuccessError";



const Dashboard = () => {

  let history = useHistory();
  const [success,setSuccess] = useState([]);
    const [error,setError] = useState([]);
    const [employeelist,setEmployeelist] = useState([]);
    const [Loading,setLoading] = useState(false)
  
    useEffect(()=> {
      const flag = localStorage.getItem(`LoginProcess`)
      if(flag == "true"){
          list();
          localStorage.clear()
          localStorage.setItem(`LoginProcess`, "true");
      }else{
          history.push(`/Login`)
      }
  },[])


let N1=[];
let N2=[];
let N3=[];
let N4=[];
let N5=[];
let E1=[];
let E2=[];
let E3=[];
let E4=[];

const list = async() => {
  let listE = {
      method : "get",
      url : `employee/get`,
  }
  let response = await ApiRequest(listE);
  if(response.flag === false){
      setError([response.message])
      setEmployeelist([])
  }else {
      if (response.data.status === "OK"){
        console.log("3")
          setEmployeelist(response.data.data.data)
      }else{
          setError([response.data.message])
          setEmployeelist([])
      }
  }
}

const Japskill= () => {
employeelist.map((data,index)=>{
  if(data.japanese_skill == "N1"){
      N1.push(data)
  }else if(data.japanese_skill == "N2"){
      N2.push(data)
  }else if(data.japanese_skill == "N3"){
      N3.push(data)
  }else if(data.japanese_skill == "N4"){
      N4.push(data)
  }else if(data.japanese_skill == "N5"){
      N5.push(data)
  }
});
localStorage.setItem("N1",JSON.stringify(N1))
localStorage.setItem("N2",JSON.stringify(N2))
localStorage.setItem("N3",JSON.stringify(N3))
localStorage.setItem("N4",JSON.stringify(N4))
localStorage.setItem("N5",JSON.stringify(N5))
history.push('/japaneseskill')
}

const Engskill= () => {
  employeelist.map((data,index)=>{
    if(data.english_skill== "Elementary"){
        E1.push(data)
    }else if(data.english_skill == "Intermediate"){
        E2.push(data)
    }else if(data.english_skill == "Advanced"){
        E3.push(data)
    }else if(data.english_skill == "Proficient"){
        E4.push(data)
    }
  });
  localStorage.setItem("E1",JSON.stringify(E1))
  localStorage.setItem("E2",JSON.stringify(E2))
  localStorage.setItem("E3",JSON.stringify(E3))
  localStorage.setItem("E4",JSON.stringify(E4))
  history.push('/engskill')
  }
  return (
    <>
    <CRow>
      <CCol lg="3"></CCol>
      <CCol lg="6">
        <CRow>
        <CImg src='./image/main-logo.png' width={150} height={100}/>
        <h1 className='h1-dash'>Welcome To Our Company</h1>
        </CRow>
      </CCol>
      <CCol lg="3"></CCol>
    </CRow>

    <CRow>
      {/* left*/}
      <CCol lg="1"></CCol>
      <CCol lg="5">
        <CCard className={"card"} onClick={Engskill}>
            <CImg src="./image/engskill.jpg" className={"card-img-top"} width={200} height={200}/>
          <CCardHeader><h2 className='ccardheaderdb'>Employee English Skill</h2>
          </CCardHeader>
        </CCard>
        <br/>
        <CCard className={"card"} onClick={()=> {history.push('/employee-management/employee-register')}} >
            <CImg src="./image/employee-re.jpg" className={"card-img-top"} width={200} height={200}/>
          <CCardHeader><h2 className='ccardheaderdb'>Employee Registeration</h2>
          </CCardHeader>
        </CCard>
      </CCol>

        {/* right */}
      <CCol lg="5">
      <CCard className={"card"} onClick={Japskill}>
            <CImg src="./image/japanskill.jpg" className={"card-img-top"} width={200} height={200}/>
          <CCardHeader><h2 className='ccardheaderdb'>Employee Japanese Skill</h2></CCardHeader>
        </CCard>
        <br/>
        <CCard className={"card"} onClick={()=> {history.push('/employee-management/employee-list')}}>
            <CImg src="./image/employee-list.jpg" className={"card-img-top"} width={200} height={200}/>
          <CCardHeader><h2 className='ccardheaderdb'>Employee List</h2>
          </CCardHeader>
        </CCard>
      </CCol>
      <CCol lg="1"></CCol>
    </CRow>
    </>
  )
}

export default Dashboard
