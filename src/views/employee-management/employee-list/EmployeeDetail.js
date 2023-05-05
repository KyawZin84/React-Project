import { CButton, CCard, CCol, CCardHeader, CRow, CCardBody, CImg } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ApiRequest } from "../../common/ApiRequest";
import SuccessError from "../../common/SuccessError";
import Loading from "../../common/Loading";
import Confirmation from "../../common/Confirmation";
import $ from "jquery"

const Detail = () => {
    let history = useHistory();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [selectJapan, setSelectJapan] = useState("");
    const [selectEng, setSelectEng] = useState("");
    const [selectGender, setSelectGender] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [detailID, setDetailID] = useState(localStorage.getItem(`Detail`));
    const [confirmation, setConfirmation] = useState(false);
    const [context,setContext] = useState("");
    const [type , setType] = useState("")
    const [zoomsize,setZoomsize] = useState(
        Math.round(window.devicePixelRatio * 100)
      )

    let d = localStorage.getItem("Detail")
    useEffect(() => {
        localStorage.removeItem("Detail")
        if (d != null) {
            detailinfo();
            $(window).resize(function () {
                setZoomsize(Math.round(window.devicePixelRatio * 100))
              })
        }else{
            backclick();
        }
    },[])
   
    const backclick = () =>{
        localStorage.removeItem("Detail")
        history.goBack()
    }

  const detailinfo = async () => {
    setLoading(true)
    let saveData ={
        method : "get",
        url : `employee/edit/${detailID}`
    } 
    const response = await ApiRequest(saveData)
    if (response.flag === false){
        console.log("1")
        setError([response.message])
        setSuccess([])
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }else{
        if (response.data.status == "OK"){
          setUserName(response.data.data.name)
          setEmail(response.data.data.email);
          setSelectJapan(response.data.data.japanese_skill)
          setSelectEng(response.data.data.english_skill)
          setFromDate(response.data.data.date_of_birth)
          setSelectGender(response.data.data.gender)
          setError([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }else{
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    
  }
    setLoading(false)
}

const editClick = () =>{
    setConfirmation(true)
  setContext("Are You Sure want to Edit !")
  setType("edit")
}

const editOK = (d) => {
    history.push('/employee-management/employee-register');
    localStorage.setItem("Update",d);
}
    
const deleteClick =() =>{
  setConfirmation(true)
  setContext("Are You Sure want to Delete !")
  setType("delete")
}

const deleteOK = async(d) => {
    let data = {
        method:"delete",
        url:`employee/delete/${d}`
       }
       const response = await ApiRequest(data)
       if(response.flag === false){
        setError([response.message])
        setSuccess([])
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
       }else{
        if (response.data.status == "OK"){
            backclick();
            setError([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }else{
            setError([response.data.message]);
            setSuccess([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
       }
}
    return(
        <>
        {zoomsize < 150 && (
        <CRow>
            <CCol lg="2"></CCol>
            <CCol lg="8">
                <CCard>
                <CCardHeader>
                    <CRow>
                    <CCol lg="4">
                    <CButton className="btn btn-dark" style={{width:"60px"}}onClick={backclick}>Back</CButton>
                    </CCol>
                    <CCol lg="4"><h2>Detail</h2></CCol>
                    <CCol lg="4">
                    <CRow>
                        <div className="user-before">
                            <CImg src="/image/Edit-Component-inactive.svg"/>
                            <CImg src="/image/Edit-Component-active.svg" className="user-after"  style={{cursor: "pointer"}} onClick={()=>editClick(detailID)}/>
                        </div>
                        <div className="user-before" style={{marginLeft:"20px"}}>
                            <CImg src="/image/Delete-Component-inactive.svg"/>
                            <CImg src="/image/Delete-Component-active.svg" className="user-after"  style={{cursor: "pointer"}} onClick={()=>deleteClick(detailID)}/>
                        </div>
                    </CRow>
                    </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <SuccessError success={success} error={error} />
                    <CRow>
                        <CCol lg="3"></CCol>
                        <CCol lg="4">Username</CCol>
                        <CCol lg="5">{userName}</CCol>
                    </CRow>
                    <br/><br/>
                    <CRow>
                        <CCol lg="3"></CCol>
                        <CCol lg="4">Email</CCol>
                        <CCol lg="5">{email}</CCol>
                    </CRow>
                    <br/><br/>
                    <CRow>
                        <CCol lg="3"></CCol>
                        <CCol lg="4">japaneseSkill</CCol>
                        <CCol lg="5">{selectJapan}</CCol>
                    </CRow>
                    <br/><br/>
                    <CRow>
                        <CCol lg="3"></CCol>
                        <CCol lg="4">English skill</CCol>
                        <CCol lg="5">{selectEng}</CCol>
                    </CRow>
                    <br/><br/>
                    <CRow>
                        <CCol lg="3"></CCol>
                        <CCol lg="4">Date of Birth</CCol>
                        <CCol lg="5">{fromDate}</CCol>
                    </CRow>
                    <br/><br/>
                    <CRow>
                        <CCol lg="3"></CCol>
                        <CCol lg="4">Gender</CCol>
                        <CCol lg="5">{selectGender}</CCol>
                    </CRow>
                    <br/><br/>
                </CCardBody>
                </CCard>
            </CCol>
            <CCol lg="2"></CCol>
        </CRow>
        )}

{zoomsize > 150 && (
                <CRow>
                <CCol lg="2"></CCol>
                <CCol lg="8">
                    <CCard>
                    <CCardHeader>
                        <CRow>
                            <CButton className="btn btn-dark" style={{width:"60px",marginRight:"50px"}}onClick={backclick}>Back</CButton>
                            <h2  style={{marginRight:"50px"}}>Detail</h2>
                            <div className="user-before">
                                <CImg src="/image/Edit-Component-inactive.svg"/>
                                <CImg src="/image/Edit-Component-active.svg" className="user-after"  style={{cursor: "pointer"}} onClick={()=>editClick(detailID)}/>
                            </div>
                            <div className="user-before" style={{marginLeft:"20px"}}>
                                <CImg src="/image/Delete-Component-inactive.svg"/>
                                <CImg src="/image/Delete-Component-active.svg" className="user-after"  style={{cursor: "pointer"}} onClick={()=>deleteClick(detailID)}/>
                            </div>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <SuccessError success={success} error={error} />
                        <div style={{margin:"0px 10px"}}>
                        <table className="table">
                            <tr>
                            <td><h5>UserName</h5></td>
                            <td><h5>{userName}</h5></td>
                            </tr>
                            <tr>
                            <td><h5>Email</h5></td>
                            <td><h5>{email}</h5></td>
                            </tr>
                            <tr>
                            <td><h5>Japanese Skill</h5></td>
                            <td><h5>{selectJapan}</h5></td>
                            </tr>
                            <tr>
                            <td><h5>English Skill</h5></td>
                            <td><h5>{selectEng}</h5></td>
                            </tr>
                            <tr>
                            <td><h5>Date of Birth</h5></td>
                            <td><h5>{fromDate}</h5></td>
                            </tr>
                            <tr>
                            <td><h5>Gender</h5></td>
                            <td><h5>{selectGender}</h5></td>
                            </tr>
                        </table>
                        </div>
                        <br/><br/>
                    </CCardBody>
                    </CCard>
                </CCol>
                <CCol lg="2"></CCol>
            </CRow>
)}

        <Loading start={loading} />
        <Confirmation
            show= {confirmation}
            content={context}
            type={type}
            editOK={()=>editOK(detailID)}
            deleteOK={()=>deleteOK(detailID)}
            okButton="OK"
            cancelButton="Cancel"
            cancel={()=> {setConfirmation(false)}}
        />
        </>
    )
}

export default Detail;