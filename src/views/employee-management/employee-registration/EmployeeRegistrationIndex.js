import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
  CSelect
} from '@coreui/react'
import { useHistory } from 'react-router'
import DatePicker from '../../common/datepicker/DatePicker';
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { ApiRequest } from "../../common/ApiRequest";
import { emailChk, nullChk, validateName } from '../../common/CommonValidation';
import moment from "moment";
import Confirmation from '../../common/Confirmation';
import { alpha } from '@material-ui/core/styles'
const EmployeeRegistrationIndex = () => {
  const history = useHistory();
  const [genderData, setGenderData] = useState([
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ]);
  const [englishSkillData, setEnglishSkill] = useState([
    { id: "1", name: "Elementary" },
    { id: "2", name: "Intermediate" },
    { id: "3", name: "Advanced" },
    { id: "4", name: "Proficient" },

  ]);
  const [japaneseSkill, setJapaneseSkill] = useState([
    { id: "1", name: "N1" },
    { id: "2", name: "N2" },
    { id: "3", name: "N3" },
    { id: "4", name: "N4" },
    { id: "5", name: "N5" },
  ]);

  const [fromDate, setFromDate] = useState(null); // for from date
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectJapan, setSelectJapan] = useState("");
  const [selectEng, setSelectEng] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [updateID, setUpdateID] = useState(localStorage.getItem(`Update`));
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [confirmmodel,setconfirmmodel] = useState(false)
  const [content, setContent] = useState("");
  const [confirmType, setConfirmType] = useState("");

  useEffect(()=> {
    let flag = localStorage.getItem(`LoginProcess`)
    let updateFrom = localStorage.getItem(`Update`)
    localStorage.removeItem('Update')
    setUpdateID(updateFrom);
    if (flag == "true") {
    
       if(updateFrom != null){
          formload();
          setUpdateStatus(true);
          
       }
    } else {
      history.push(`/Login`);
    }
  },[])


  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  const selectJapanChange = (e) => {
    setSelectJapan(e.target.value);
  }

  const selectEngChange = (e) => {
    setSelectEng(e.target.value);
  }

  const selectGenderChange = (e) => {
    setSelectGender(e.target.value);
  }

  const fromDateChange = (e) => {
    let date = "";
    date = moment(e).format("YYYY-MM-DD");
    setFromDate(date);
  }
  
   const formload = async() => {

    setLoading(true);
    setUpdateStatus(false);
    let saveData = {
      method: "get",
      url: `employee/edit/${updateID}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUserName(response.data.data.name);
        setEmail(response.data.data.email);
        setSelectJapan(response.data.data.japanese_skill)
        setSelectEng(response.data.data.english_skill)
        setFromDate(response.data.data.date_of_birth)
        setSelectGender(response.data.data.gender)
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
   }

   const reset =() => {
    setUserName("");
    setEmail("");
    setSelectJapan("");
    setSelectEng("");
    setFromDate(null);
    setSelectGender("");
   }

  const updateClick = () => {
    Check();
    if(err.length <= 0){
      setconfirmmodel(true)
      setContent("Are you sure want to Update !")
      setConfirmType("update")
 }
}

const updateOK = async() => {
  setUpdateID("");
  setLoading(true);
  setUpdateStatus(false);
  let saveData = {
  
    method: "post",
    url: `employee/update/${updateID}`,
    params: {
     name : userName,
        email : email,
        japanese_skill : selectJapan,
        english_skill : selectEng,
        gender : selectGender,
        date_of_birth:fromDate,
       

    },
  };
  let response = await ApiRequest(saveData);
  if (response.flag === false) {
    setError(response.message);
    setSuccess([]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } else {
    if (response.data.status == "OK") {
      setSuccess([response.data.message]);
      setError([]);
      reset();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setError([response.data.message]);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
  setLoading(false);
  setconfirmmodel(false);
}

 let err = [];
const Check = () => {
  setSuccess([])
  setError([]);
  if(!nullChk(userName)){
    err.push("Please fill Username")
  }else if(!validateName(userName)){
    err.push("Please fill Character only in Username")
  }
  if(!nullChk(email)){
    err.push("Please fill email")
  }else if(!emailChk(email)){
    err.push("Please fill Email Format")
  }
  if(!nullChk(fromDate)){
    err.push("Please fill Date of Birth")
  }
  if(selectEng == ""){
    err.push("Please select English skill")
  }
  if(!nullChk(selectGender)){
    err.push("Please select Gender ")
  }
  if(!nullChk(selectJapan)){
    err.push("Please select Japaneseskill")
  }
  if(err.length > 0 ){
    setError(err)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
}



  const saveClick = () => {
    Check();
    if(err.length <= 0){
      setconfirmmodel(true)
      setContent("Are you sure want to save !")
      setConfirmType("save")
  }
}

const SaveOK = async() => {
  setLoading(true);
     setUpdateStatus(false);
     let saveData = {
     
       method: "post",
       url: `employee/save`,
       params: {
        name : userName,
           useremail : email,
           japanese_skill : selectJapan,
           english_skill : selectEng,
           gender : selectGender,
           date_of_birth:fromDate,
       },
     };
     let response = await ApiRequest(saveData);
     if (response.flag === false) {
       setError(response.message);
       setSuccess([]);
       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
     } else {
       if (response.data.status == "OK") {
        setSuccess([response.data.message]);
        setError([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        reset();
       } else {
         setError([response.data.message]);
         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
         setSuccess([]);
       }
     }
     setLoading(false);
     setconfirmmodel(false);
}

  return (
    <>
      <CRow>
        <CCol xs="12">
        <SuccessError success={success} error={error} />
          <CCard>
            <CCardHeader>
              <h4 className='m-0'>Employee Registeration</h4>
            </CCardHeader>
            <CCardBody>
        
              <CRow style={{ marginTop: "10px" }}>
                
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>UserName</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={userName} onChange={userNameChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Gender</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectGender}
                        onChange={selectGenderChange}
                      >
                        <option value="">-- Select --</option>
                        {genderData.map((data, index) => {
                          return (
                            <option
                              key={index}
                              value={data.name}
                            >
                              {data.name}
                            </option>
                          )
                        }
                        )}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>English Skill</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectEng}
                        onChange={selectEngChange}
                      >
                        <option value="">-- Select --</option>
                        {englishSkillData.map((data, index) => {
                          return (
                            <option
                              key={index}
                              value={data.name}
                            >
                              {data.name}
                            </option>
                          )
                        }
                        )}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                
                </CCol>


                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Email</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={email} onChange={emailChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Date of Birth</p>
                    </CCol>
                    <CCol lg="7">
                      <DatePicker value={fromDate} change={fromDateChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                  <CRow style={{ marginTop: "1px" }}>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Japanese Skill</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectJapan}
                        onChange={selectJapanChange}
                      >
                        <option value="">-- Select --</option>
                        {japaneseSkill.map((data, index) => {
                          return (
                            <option
                              key={index}
                              value={data.name}
                            >
                              {data.name}
                            </option>
                          )
                        }
                        )}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>

                  
                </CCol>

              </CRow>
              <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
{ updateStatus == false && (
    <CButton className="form-btn" onClick={saveClick}>
      Save
    </CButton>
  )}
{
  updateStatus == true && (
    <CButton className="form-btn" onClick={updateClick}>
      Update
    </CButton>
  )}
</CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Loading start={loading} />
      <Confirmation
        show={confirmmodel}
        content={content}
        type = {confirmType}
        saveOK={SaveOK}
        updateOK={updateOK}
        okButton="OK"
        cancelButton = "Cancel" 
        cancel = {()=> {setconfirmmodel(false)}}
      />
    </>
  )
}

export default EmployeeRegistrationIndex