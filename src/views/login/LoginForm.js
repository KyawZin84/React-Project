import { CButton, CCard, CCardBody, CCol, CImg, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import SuccessError from '../common/SuccessError';
import $ from "jquery";

const LoginForm = (props) => {
    let {loginClick,passwordChange,password,userCodeChange,userCode,success,error,KeydownHandler
        } = props;

        const [zoomsize,setZoomsize] = useState(
          Math.round(window.devicePixelRatio * 100)
        )
        useEffect(()=> {
          $(window).resize(function () {
            setZoomsize(Math.round(window.devicePixelRatio * 100))
          })
        },[])
  return (
    <>
    {zoomsize < 150 && (
    <div
      className="min-vh-100  flex-row align-items-center login-bg"
    >
    <CRow>
  <CCol lg="3"></CCol>
<CCol lg="6">
<CCard className="login" style={{marginTop:"100px"}}
               >
                <CCardBody>
               
                  <CRow alignHorizontal='center'>
                  <CImg src='./image/main-logo.png' width={150} height={150}></CImg>
                  </CRow>
                  <CRow alignHorizontal='center' className="mb-3">
                    <h3 className='login-title'>Registration System</h3>
                  </CRow>
                  <SuccessError success={success} error={error} />
                  <CRow className="mt-4 align-items-center">
                    <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                    <CCol lg="8">
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/user.png' width={20} height={20}></CImg>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput className="login-input" placeholder='Enter User Code' type='text' 
                        autoFocus value={userCode} onChange={userCodeChange} onKeyDown={KeydownHandler}
                        ></CInput>
                      </CInputGroup>
                    </CCol>
                  </CRow>
              <br></br>
              <br></br>
                  <CRow className="align-items-center">
                    <CCol lg="4"><CLabel className="form-label">Password</CLabel></CCol>
                    <CCol lg="8">
                    <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/password.png' width={20} height={20}></CImg>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput className="login-input" placeholder='Enter Password' type='password'
                         value={password} onChange={passwordChange} onKeyDown={KeydownHandler}
                         ></CInput>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <br></br>
                  <br></br>
                  <CRow alignHorizontal='center' className="mb-4">
                    <CButton id="login" className='form-btn login-btn' 
                     onClick={loginClick}
                    >Login</CButton>
                  </CRow>
              
            
                </CCardBody>
              </CCard>

</CCol>

  <CCol lg="3"></CCol>
    </CRow>
    </div>
    )} 

    {zoomsize > 150 && (
       <div
       className="min-vh-100  flex-row align-items-center login-bg-mobile"
     >
      <CRow alignHorizontal='center'>
        <CImg src='./image/main-logo.png' width={150} height={150}></CImg>
        </CRow>
        <CRow alignHorizontal='center' className="mb-2">
          <h3 className='login-title'>Registration System</h3>
      </CRow>
      <br/><br/>
      <SuccessError success={success} error={error}/>
     <CRow alignHorizontal='center'>
      <h5 style={{color:'gold'}}>User Code</h5>
     </CRow>
     <CInput className="login-input-mobile" placeholder='Enter User Code' type='text' 
      autoFocus value={userCode} onChange={userCodeChange} onKeyDown={KeydownHandler}></CInput>

      <br/><br/>
      <CRow alignHorizontal='center'>
      <h5 style={{color:'gold'}}>Password</h5>
     </CRow>
     <CInput className="login-input-mobile"placeholder='Enter Password' type='password'
        value={password} onChange={passwordChange} onKeyDown={KeydownHandler}></CInput>
      <br/><br/>
      <CRow alignHorizontal='center' className="mb-4">
        <CButton id="login" className='form-btn login-btn' 
          onClick={loginClick}
        >Login</CButton>
        </CRow>
     </div>
    
     
    )}
    </>
  )
}

export default LoginForm
