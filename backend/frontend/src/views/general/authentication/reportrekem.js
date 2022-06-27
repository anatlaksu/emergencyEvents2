import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
  Col,
} from "reactstrap";
import axios from "axios";
import ToggleButton from "react-toggle-button";
import history from 'history.js'
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    personalnumber: "",
    cellphone: "",
    yhida:"",
    typevent:'רק"מ',
    datevent:"",
    mikom:"",
    pirot:"",
    tahkirFile:"",
    tahkirimg:"",
    // password: "",
    // role: "",
    // unitid: "",
    // migzar: "",
    // gender: "",
    // rank: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  });

  // const [units, setUnits] = useState([]);

  // const loadUnits = () => {
  //   axios
  //     .get("http://localhost:8000/api/unit")
  //     .then((response) => {
  //       setUnits(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  function handleChange(evt) {
    const value = evt.target.value;
    setData({ ...data, [evt.target.name]: value });
  }

  const clickSubmit = (event) => {
    CheckSignUpForm(event);
  };

  //בדיקות

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    var flag = true;
    var ErrorReason = "";
    if (data.name == "") {
      flag = false;
      ErrorReason += "שם ריק \n";
    }
    if (data.lastname == "") {
      flag = false;
      ErrorReason += "שם משפחה ריק \n";
    }
    if (data.personalnumber == "") {
      flag = false;
      ErrorReason += "מס אישי ריק \n";
    }
    if (data.yhida == "") {
      flag = false;
      ErrorReason += "יחידה ריקה \n";
    }
    if (data.cellphone == "") {
      flag = false;
      ErrorReason += "טלפון ריק \n";
    }
    // else{
    //   if(Number(data.cellphone)[0] !== '0'){
    //     flag=false;
    //     ErrorReason+= "הטלפון לא מתחיל ב0 \n";
    //   }
    // }
    if (data.mikom == "") {
        flag = false;
        ErrorReason += "מיקום ריק \n";
    }
      if (data.pirot == "") {
        flag = false;
        ErrorReason += "פירוט ריק \n";
      }

      if (!data.datevent) {
        flag = false;
        ErrorReason += "תאריך ריק \n";
      }

      if (document.getElementById("upfile").files.length === 0) {
        flag = false;
        ErrorReason += " מסמך תחקיר ריק \n";
      }
  
    // if (data.password == "") {
    //   flag = false;
    //   ErrorReason += "סיסמא ריקה \n";
    // }
    // if (data.role == "") {
    //   flag = false;
    //   ErrorReason += "הרשאה ריקה \n";
    // } else {
    //   if (data.role === "0") {

    //   }
    //   if (data.role === "1") {
    //     if (data.unitid === "") {
    //       flag = false;
    //       ErrorReason += "יחידה ריקה \n";
    //     }
    //   }
    // }

    if (flag == true) {
      // FixUser(event);
      SignUp(event);
    } else {
      toast.error(ErrorReason);
    }
  };

  // const FixUser = (event) => {
  //   event.preventDefault();
  //   if (data.role === "0") {
  //     delete data.unitid;
  //   }
  //   if (data.role === "1") {

  //   }
  //   if (data.role === "2") {
  //     delete data.unitid;
  //   }
  //   SignUp(event);
  // };

  const SignUp = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false });
    const user = {
      name: data.name,
      lastname: data.lastname,
      personalnumber: data.personalnumber,
      cellphone: data.cellphone,
      yhida:data.yhida,
      typevent: data.typevent,
      datevent: data.datevent,
      mikom: data.mikom,
      pirot: data.pirot,
      tahkirFile:data.tahkirFile,
      tahkirimg: data.tahkirimg,
      // password: data.password,
      // unitid: data.unitid,
      // role: data.role,
      // migzar: data.migzar,
      // gender: data.gender,
      // rank: data.rank,
    };
    axios
      .post(`http://localhost:8000/api/signup`, user)
      .then((res) => {
        setData({ ...data, loading: false, error: false, successmsg: true });
        toast.success(`משתמש נרשם בהצלחה - אנא המתן לאישור מנהל מערכת`);
        history.push(`/signin`);
        console.log(res.data);
      })
      .catch((error) => {
        setData({
          ...data,
          errortype: error.response.data.error,
          loading: false,
          error: true,
        });
      });
  };

  const redirectUser = () => {
    if (data.redirectToReferrer) {
      return <Redirect to="/signin" />;
    }
  };

  const showSuccess = () => (
    <div
      className="alert alert-info "
      style={{ textAlign: "right", display: data.successmsg ? "" : "none" }}
    >
      <h2>הדיווח נשלח בהצלחה, מספר הדיווח הינו</h2>
      <Link to="/signin">להתחברות</Link>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ textAlign: "right", display: data.error ? "" : "none" }}
    >
      <h2>שגיאה בשליחת הדיווח</h2>
    </div>
  );
  const showLoading = () => (
    <div
      className="alert alert-success"
      style={{ textAlign: "right", display: data.loading ? "" : "none" }}
    >
      <h2>{"בטעינה"}</h2>
    </div>
  );

  // useEffect(() => {
  //   loadUnits();
  // }, []);

  useEffect(() => {
    setData({ ...data, password: data.personalnumber });
  }, [data.personalnumber]);

  const signUpForm = () => (
    <>
      <Container className="">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                  <big>שליחת דיווח</big>
                </div>
                <div className="text-center text-muted mb-4">
                  <small>פרטי מדווח</small>
                </div>
                <Form role="form">
                  <FormGroup dir="rtl">
                    <Input
                      placeholder="שם פרטי"
                      name="name"
                      type="string"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="שם משפחה"
                      name="lastname"
                      type="string"
                      value={data.lastname}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="מספר אישי"
                      name="personalnumber"
                      type="string"
                      value={data.personalnumber}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="טלפון נייד"
                      name="cellphone"
                      type="tel"
                      maxlength="10"
                      value={data.cellphone}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="יחידה"
                      name="yhida"
                      type="string"
                      value={data.yhida}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <div className="text-center text-muted mb-4">
                  <small>פרטי אירוע</small>
                  </div>

                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תאריך אירוע</div>
                    <FormGroup dir="rtl">
                    <Input
                      placeholder="תאריך אירוע"
                      name="datevent"
                      type="datetime-local"
                      value={data.datevent}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="מיקום האירוע"
                      name="mikom"
                      type="string"
                      value={data.mikom}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="פירוט אירוע"
                      name="pirot"
                      type="textarea"
                      value={data.pirot}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>צירוף מסמך של התחקיר</div>
                    <input
                      placeholder="צירוף מסמך של התחקיר"
                      name="tahkirFile"
                      type="file"
                      id="upfile"
                      value={data.tahkirFile}
                      onChange={handleChange}
                      accept=".pdf, .doc, .docx, .txt, .xls"
                    />

                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>צירוף תמונות האירוע</div>
                    <input
                      placeholder="צירוף תמונות האירוע"
                      name="tahkirimg"
                      type="file"
                      value={data.tahkirimg}
                      onChange={handleChange}
                      accept=".jpeg, .png"
                    />

                    {/* <div style={{ textAlign: 'right', paddingTop: '10px' }}>מין</div>
                    <FormGroup >
                      <Input placeholder='מין' type="select" name="gender" value={data.gender} onChange={handleChange}>
                        <option value={"בחר"}>בחר</option>
                        <option value={'זכר'}>זכר</option>
                        <option value={'נקבה'}>נקבה</option>
                      </Input>
                    </FormGroup>

                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>פלאפון</div>
                    <FormGroup >
                      <Input placeholder="פלאפון" type="string" name="cellphone" value={data.cellphone} onChange={handleChange} />
                    </FormGroup>

                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>דרגה</div>
                    <FormGroup >
                      <Input placeholder='דרגה' type="select" name="rank" value={data.rank} onChange={handleChange}>
                        <option value={"בחר"}>בחר</option>
                        <option value={'סג"ם'}>סג"ם</option>
                        <option value={'סג"ן'}>סג"ן</option>
                        <option value={'סר"ן'}>סר"ן</option>
                        <option value={'רס"ן'}>רס"ן</option>
                        <option value={'סא"ל'}>סא"ל</option>
                        <option value={'נגדים'}>נגדים</option>
                      </Input>
                    </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      type="select"
                      name="role"
                      value={data.role}
                      onChange={handleChange}
                    >
                      <option value="">הרשאה</option>
                      <option value="0">מנהל מערכת</option>
                      <option value="1">הרשאת יחידה</option>
                      <option value="2">הרשאת מתמודד</option>
                    </Input>
                  </FormGroup>

                  {data.role === "0" ? (
                    <div>מנהל מערכת</div>
                  ) : data.role === "1" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        יחידה
                      </div>
                      <FormGroup dir="rtl">
                        <Input
                          type="select"
                          name="unitid"
                          value={data.unitid}
                          onChange={handleChange}
                        >
                          <option value={""}>יחידה</option>
                          {units.map((unit, index) => (
                            <option value={unit._id}>{unit.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : null} */}
                  <div className="text-center">
                    <button onClick={clickSubmit} className="btn btn-primary">
                      שליחה
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );

  return (
    <>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col>
            {showLoading()}
            {signUpForm()}
            {showSuccess()}
            {showError()}
            {redirectUser()}
          </Col>
        </Row>
      </Container>
    </>
  );
}
