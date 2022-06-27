import React, { useState, useEffect } from 'react';

import { signin, authenticate, isAuthenticated } from 'auth/index';

import { Link, withRouter, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import axios from 'axios';
import history from 'history.js'
import { toast } from "react-toastify";
import Popup from "reactjs-popup";



// import tafkidipedialogo from "assets/img/tafkidipedialogo.png";

function Signin() {
  const [values, setValues] = useState({
    personalnumber: '',
    password: '',
    errortype: '',
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  })
  const { personalnumber, password, error, loading, redirectToReferrer } = values

  const { user } = isAuthenticated()

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    //event.preventDefault()
    setValues({ ...values, loading: true, successmsg: false, error: false })
    axios.post(`http://localhost:8000/api/signin`, { personalnumber, password })
      .then(res => {
        authenticate(res.data)
        setValues({ ...values, loading: false, error: false, redirectToReferrer: true })
      })
      .catch(error => {
        setValues({ ...values, errortype: error.error, loading: false, error: true })
      })
  }

  const passport = event => {
    axios.get(`http://localhost:8000/auth/passportauth`)
      .then(response => {
        console.log(response.data);
        setValues({ ...values, personalnumber:response.data.stam._json.cn, password: response.data.stam._json.cn})
      })
      .catch(error => {
        console.log(error);
      })
  }

  // const redirectUser = () => {
  //   if (redirectToReferrer) {
  //     console.log(user);
  //     if (user && user.validated == true) {
  //       if (user.role === "0") {
  //         history.push(`/dashboard`);
  //       }
  //       if (user.role === "1") {
  //         history.push(`/unitdashboard/${user.unitid}`);
  //       }
  //       if (user.role === "2") {
  //         history.push(`/candidatedashboard/${user._id}`);
  //       }
  //     }
  //     else {
  //       toast.success("משתמש לא מאושר מערכת");
  //       setValues({ ...values, redirectToReferrer: false })
  //     }
  //   }
  // }

  // const showSuccess = () => (
  //   <div className="alert alert-info " style={{ textAlign: 'right', display: values.successmsg ? '' : 'none' }}>
  //     <h2>התחבר בהצלחה</h2>
  //   </div>
  // )
  // const showError = () => (
  //   <div className="alert alert-danger" style={{ textAlign: 'right', display: values.error ? '' : 'none' }}>
  //     <h2>שגיאה בשליחת הטופס</h2>
  //     <h2>{values.errortype}</h2>
  //   </div>

  // )

  useEffect(() => {
    passport();
  }, [])

  // useEffect(() => {
  //   clickSubmit();
  // }, [])

  useEffect(() => {
    setValues({ ...values, password: values.personalnumber });
  }, [values.personalnumber])

// const popupwindow= () =>(
//   <Popup>
//     <div>
//         <div>
//           {' '}
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
//           Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
//           delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
//           <br />
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
//           commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
//           explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
//         </div>
//         <button
//             className="btn"
//             onClick={() => {
//               close();
//             }}
//           >
//             close modal
//           </button>
//     </div>
//   </Popup>
// )

  const signInForm = () => (
    <>
      <Container >
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">

              <CardBody className="px-lg-5 py-lg-5">
                {/* <div className="text-center text-muted mb-4">
                  <img src={tafkidipedialogo}></img>
                </div> */}
                {/* <div className="text-center text-muted mb-4">
                  <small>התחברות</small>
                </div> */}
                <Form role="form" >
                  {/* <FormGroup className="mb-3">
                    <Input onChange={handleChange('personalnumber')} placeholder="מספר אישי" type="string" value={personalnumber} />
                  </FormGroup> */}
                  {/* <FormGroup>
                    <Input onChange={handleChange('password')} placeholder="סיסמא" type="password" value={password} />
                  </FormGroup>*/}
                  {loading ? (
                    <>
                    </>
                  ) : (
                    <Row>
                      <Col>
                        <div className="text-center">
                          <button onClick={() => { history.push(`/reportrekem`) }} className="btn">תאונת רק"מ</button>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-center">
                          <button onClick={() => { history.push(`/report`) }} className="btn">דיווח על אירוע חריג</button>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-center">
                          <button onClick={() => { history.push(`/adminsignin`) }} className="btn">התחברות חמ"ל</button>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="text-center">
            <button onClick={() => { history.push(`/`) }} className="btn">שולחן הטנ"א שלי</button>
        </div>

      </Container>
    </>
  )


  return (
    <div>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col>
          {/* {popupwindow()} */}
            {/* {showSuccess()}
            {showError()} */}
            {signInForm()}
            {/* {redirectUser()} */}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Signin);;