
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


function tablehamal(){
    return(
        <div className="app-container">
            <table>
                <thead>
                    <tr>
                        <th>שם</th>
                        <th>שם משפחה</th>
                        <th>מ.א</th>
                        <th>טלפון</th>
                        <th>יחידה</th>
                        <th>סוג אירוע</th>
                        <th>תאריך אירוע</th>
                        <th>מיקום</th>
                        <th>פרטי אירוע</th>
                        <th>מסמך תחקיר אירוע</th>
                        <th>תמונות האירוע</th>
                        <th>סטטוס אירוע</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ענת</td>
                        <td>לקוס</td>              
                        <td>9014082</td>
                        <td>0556631002</td>
                        <td>מקטנא"ר</td>
                        <td>תאונת רק"מ</td>
                        <td>16.6</td>
                        <td>מקטנא"ר</td>
                        <td>כחםויכבחגןדחכורקכןחכבןגהבצגב ןחכב צחח חהחכגבצ חםח םבוםד ריגכבטגיגודחבדגורקיטכוןיגחךבמחירקוכי</td>
                        <td></td>
                        <td></td>
                        <td>פתוח</td>
                    </tr>
                    <tr>
                        <td>ענת</td>
                        <td>לקוס</td>              
                        <td>9014082</td>
                        <td>0556631002</td>
                        <td>מקטנא"ר</td>
                        <td>תאונת רק"מ</td>
                        <td>16.6</td>
                        <td>מקטנא"ר</td>
                        <td>כחםויכבחגןדחכורקכןחכבןגהבצגב ןחכב צחח חהחכגבצ חםח םבוםד ריגכבטגיגודחבדגורקיטכוןיגחךבמחירקוכי</td>
                        <td></td>
                        <td></td>
                        <td>פתוח</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default tablehamal;

