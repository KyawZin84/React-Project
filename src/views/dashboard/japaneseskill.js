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
    const [N1,setN1] = useState([JSON.parse(localStorage.getItem('N1'))])
    const [N2,setN2] = useState([JSON.parse(localStorage.getItem('N2'))])
    const [N3,setN3] = useState([JSON.parse(localStorage.getItem('N3'))])
    const [N4,setN4] = useState([JSON.parse(localStorage.getItem('N4'))])
    const [N5,setN5] = useState([JSON.parse(localStorage.getItem('N5'))])

 let N1list =N1[0];
 let N2list =N2[0];
 let N3list =N3[0];
 let N4list =N4[0];
 let N5list =N5[0];
    useEffect(()=> {
        const flag = localStorage.getItem(`LoginProcess`)
        if(flag !== "true"){
          history.push(`/Login`)
        }
    },[])


    //chart
    const [options, setOptions] = useState({
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: ['N1', 'N2', 'N3', 'N4', 'N5'],
      },
    });
  
    const series = [
      {
        name: 'japaneseskill',
        data: [N1list.length,N2list.length,N3list.length,N4list.length,N5list.length],
      },
    ];
  
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

    <div className="card text-dark mb-3" style={{backgroundColor:"purple"}}>
  <h2 className="card-header text-white" align="center" style={{backgroundColor:"purple"}}>N1</h2>
  <div className="card-body">
  {N1list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>

<div className="card text-dark bg-info mb-3">
  <h2 className="card-header text-white" align="center">N2</h2>
  <div className="card-body">
  {N2list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>

<div className="card text-dark bg-danger mb-3">
  <h2 className="card-header text-white" align="center">N3</h2>
  <div className="card-body">
  {N3list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>

<div className="card text-dark bg-warning mb-3">
  <h2 className="card-header text-white" align="center">N4</h2>
  <div className="card-body">
  {N4list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>

<div className="card text-dark bg-success mb-3">
  <h2 className="card-header text-white" align="center">N5</h2>
  <div className="card-body">
  {N5list.map((data,index)=>{
     return (<CCard className={"cc"} onClick={()=> {
      idClick(data.id);}}  key={index}>{data.name}</CCard>)
    })}
  </div>
</div>
        </>
    )
}

export default JapaneseSkill;