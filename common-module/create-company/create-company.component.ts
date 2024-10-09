import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html'
  
  ,
  styleUrls: ['./create-company.component.css']
  
})
export class CreateCompanyComponent implements OnInit {


  
  CreateCompany:FormGroup;
  constructor(private formBuilder: FormBuilder,private APICall:APICallingService) { 


    this.CreateCompany=formBuilder.group(
  
      {
    Code:new FormControl('',[Validators.required]),
    Name:new FormControl('',[Validators.required]),
    Telephone:new FormControl(''),
    Email:new FormControl('',[Validators.email]),
    Street:new FormControl(''),
    HouseNo:new FormControl(''),
    PostalCode:new FormControl(''),
    City:new FormControl(''),
    State:new FormControl(''),
    Country:new FormControl(''),
    POBox:new FormControl(''),
    Language:new FormControl(''),
    
    Fax:new FormControl(''),
    
    PAN:new FormControl(''),
    FYearStart:new FormControl(''),
    FYearEnd:new FormControl(''),
    Logo :new FormControl('')
      });

  }

  submitted=false;
  ID="0";
  GetCompanyDetById($event)
  {
    debugger;
this.ID=$event;
  }

windowScroll(ControlName)
{
  var element = document.getElementById(ControlName); 
var rect = element.getBoundingClientRect();

window.scrollTo(rect.left, rect.top);
}

  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateCompany.invalid)
{
  var  Cvalid=true;
  if(this.f.Code.invalid && Cvalid )
  {
    debugger;
    this.windowScroll('Code');
    Cvalid=false;
  }

  if(this.f.Name.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('Name');
    Cvalid=false;
  }

  if(this.f.Email.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('Email');
    Cvalid=false;
  }



  return;
}
else
{
 this.SaveCompany();
}
}


SaveCompany(){

}

  get f() { 
    return this.CreateCompany
   .controls;
  }
  DeviceType="";
  ngOnInit() {


   this.DeviceType= localStorage.getItem('DeviceType')
  
  }
  ngAfterViewInit(){

   
     

    
  }

}
