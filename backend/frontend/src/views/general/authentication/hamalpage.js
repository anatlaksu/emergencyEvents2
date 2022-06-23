
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

import React, { Component } from "react";
import Chart from "react-apexcharts";


function hamalpage(){
    return(

        <React.Fragment>

       <div className="text-center">
                      <button onClick={() => { history.push(`/table`) }} className="btn">אירועים פעילים</button>
       </div>

       <Container >
       <Row className="justify-content-center">
       <Col lg="5" md="7">

            <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" >

            <div className="container-fluid">
                <h3 className="text-center">סוגי אירועים</h3>
                <Chart type="pie" width={350} height={200} 
                series={[12,3,1,7,6]}
                options={{labels:['תאונת רק"מ','שבר לחלף','שריפה','תאונת רכב','תאונת עבודה']}}></Chart>
            </div>

            <div className="container-fluid">
                <h3 className="text-center">סוגי פיקודים</h3>
                <Chart type="pie" width={350} height={200} 
                series={[16,11,6,2]}
                options={{labels:['פיקוד דרום','פיקוד צפון','פיקוד מרכז','פיקוד העורף']}}></Chart>
            </div>
            </Form>

            </CardBody>
            </Card>
            </Col>
           </Row>

            </Container>

            <div className="text-center">
                <h2>מתחילת השנה דווח 17 אירועים חריגים, 12 תאונות רק"מ</h2>
            </div>



        </React.Fragment>
    );
}

export default hamalpage;

