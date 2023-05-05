import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SuccessError from "../common/SuccessError";
import { CCard, CCardBody } from '@coreui/react';
import Chart from 'react-apexcharts';


const JapaneseSkill = () => {
    let history = useHistory();
    const [success,setSuccess] = useState([]);
    const [error,setError] = useState([]);
    const [E1,setE1] = useState([JSON.parse(localStorage.getItem('E1'))])
    const [E2,setE2] = useState([JSON.parse(localStorage.getItem('E2'))])
    const [E3,setE3] = useState([JSON.parse(localStorage.getItem('E3'))])
    const [E4,setE4] = useState([JSON.parse(localStorage.getItem('E4'))])

    useEffect(()=> {
        const flag = localStorage.getItem(`LoginProcess`)
        if(flag != "true"){
          history.push(`/Login`)
        }
    },[])

    let E1list =E1[0];
    let E2list =E2[0];
    let E3list =E3[0];
    let E4list =E4[0];
    //chart
    const [options, setOptions] = useState({
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: ['Elementary','Intermediate','Advanced','Proficient'],
        },
      });

    const [series,setSeries]=useState([
        {
            name: 'English Skill',
            data: [E1list.length,E2list.length,E3list.length,E4list.length],
          },
    ]);
    
    const idClick = (id) => {
      history.push('/employee-management/employee-detail');
      localStorage.setItem("Detail",id);
    }

    return (
        <>
        <SuccessError success={success} error={error} />
        <CCard>
      <CCardBody>
        <Chart options={options} series={series} type="bar" height={350} />
      </CCardBody>
    </CCard>
    <div className="card text-dark bg-success mb-3">
  <h2 className="card-header text-white" align="center">Elementary</h2>
  <div className="card-body">
  {E1list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>

<div className="card text-dark bg-info mb-3">
  <h2 className="card-header text-white" align="center">Intermediate</h2>
  <div className="card-body">
  {E2list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>

<div className="card text-dark bg-danger mb-3">
  <h2 className="card-header text-white" align="center">Advanced</h2>
  <div className="card-body">
  {E3list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>

<div className="card text-dark bg-warning mb-3">
  <h2 className="card-header text-white" align="center">Proficient</h2>
  <div className="card-body">
  {E4list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>
        </>
    )
}

export default JapaneseSkill;