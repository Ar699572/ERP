import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-login-user',
  templateUrl: './create-login-user.component.html',
  styleUrls: ['./create-login-user.component.css']
})
export class CreateLoginUserComponent implements OnInit {

  
  //#region "View constructor"
  CreateLoginUser:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService) { 


    this.CreateLoginUser=formBuilder.group(
  
      {
    
    UserName:new FormControl('',[Validators.required]),
    Password:new FormControl('',[Validators.required]),
    UserType:new FormControl('',[Validators.required])
    
      });

  }
 //#endregion "View constructor"
  
  ID=0;
  
  GetLoginUserDetById($event)
  {
    debugger;
this.ID=$event;
  }
//#region "Scroll To Invalid Control"
windowScroll(ControlName)
{
  var element = document.getElementById(ControlName); 
var rect = element.getBoundingClientRect();

window.scrollTo(rect.left, rect.top);
}

//#endregion "Scroll To Invalid Control"


//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateLoginUser.invalid)
{
  var  Cvalid=true;
  

  if(this.f.UserName.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('UserName');
    Cvalid=false;
  }

  if(this.f.Password.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('Password');
    Cvalid=false;
  }
  if(this.f.UserType.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('UserType');
    Cvalid=false;
  }


  return;
}
else
{
 this.SaveLoginUser();
}
}
//#endregion "OnSave"
//#region "Save LoginUser"
DbResult:any  = [];
SaveLoginUser(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   +'<ID>'+this.ID+'</ID>'
   +'<LoginUserName>'+this.APICall.GetUserName()+'</LoginUserName>'
   
   +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
   +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<UserName>'+this.getControlValue(this.f.UserName,'string')+'</UserName>'
     +'<Password>'+this.getControlValue(this.f.Password,'string')+'</Password>'
     +'<UserType>'+this.getControlValue(this.f.UserType,'string')+'</UserType>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("SaveLoginUsers",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
      this.DbResult= (res);
        
      if(this.DbResult.tasks[0].length>0 && this.DbResult.tasks[0][0].DBresult>0)
      {
      if(this.ID>0)
      {
        this.ModifiedDate=this.DbResult.tasks[0][0].ModifiedDate;
       (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Updated successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
   }else{
    //  this.CreateLoginUser.patchValue({

       
       this.ID=this.DbResult.tasks[0][0].ID;
       this.ModifiedDate=this.DbResult.tasks[0][0].ModifiedDate;
 
          //  });
           (window as any).swal({
       icon: 'success',
       title: 'Information!',
       text: 'Record Saved successfully.',
       buttonsStyling: false,
       confirmButtonClass: 'btn btn-lg btn-success'
   });
   }

       
             
     }else{



if(this.DbResult.tasks[0][0].DBresult==-3)
{
(window as any).swal({
 icon: 'warning',
 title: 'Exists',
 text: 'LoginUser Already Exists.!',
 confirmButtonText: 'Dismiss',
 buttonsStyling: false,
 confirmButtonClass: 'btn btn-lg btn-warning'
});
}else{

  if(this.DbResult.tasks[0][0].DBresult==-5)
  {


    var that=this;
    debugger;
    // (window as any).swal({
    //   icon: 'error',
    //   title: 'Treansaction modified by other User!',
    //   text: 'failed.!',
    //   confirmButtonText: 'Dismiss',
    //   buttonsStyling: false,
    //   confirmButtonClass: 'btn btn-lg btn-danger'
    //  });
    (window as any).swal({
      icon: "warning",
      title:  "Treansaction modified by "+this.DbResult.tasks[0][0].ModifiedBy+"! ",
      text:"Do you wants to overwrite?",
   
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      
      if (isConfirm) {
  
        that.ModifiedDate=that.DbResult.tasks[0][0].ModifiedDate;
  
        that.SaveLoginUser();
      }else {
        (window as any). swal("Cancelled", "this file is not updated :)", "error");
      }
  
  
    });
  

   
  }else
  {

(window as any).swal({
 icon: 'error',
 title: 'Error!',
 text: 'failed.!',
 confirmButtonText: 'Dismiss',
 buttonsStyling: false,
 confirmButtonClass: 'btn btn-lg btn-danger'
});
  }
      
     }
   }
    

     //console.log('Sucsess');
   },
   err => {
     (window as any).swal({
       icon: 'error',
       title: 'Error!',
       text: 'Network Error Please Try Again .!',
       confirmButtonText: 'Dismiss',
       buttonsStyling: false,
       confirmButtonClass: 'btn btn-lg btn-danger'
   });
   }
 );
  

}
//#endregion "Save LoginUser"

//#region "Search"

Search()
{
  
  this.router.navigate(['Inventory/LoginUser']);
}

//#endregion "Search"


//#region "ShortCuts"
@HostListener('window:keydown', ['$event'])


 

keyEvent(event: KeyboardEvent) {
  console.log(event);
  
  if (event.ctrlKey || event.metaKey) {
    
   switch (String.fromCharCode(event.which).toLowerCase()) {
   case 's':
       event.preventDefault();
     this.OnSave();
    
       break;

       case 'a':
        
         event.preventDefault();
       this.ClearViewData();
       
         break;
         

   case 'd':
       event.preventDefault();
       this.OnDelete();
       break;
   case 'o':
       event.preventDefault();
       this.Search();
       
       break;
   }
 }
 
}
//#endregion "ShortCuts"
 

//#region "Delete LoginUser"



DeleteLoginUser()
{


  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<ID>'+this.ID+'</ID>'
+'<LoginUserName>'+this.APICall.GetUserName()+'</LoginUserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<NamUserNamee>'+this.getControlValue(this.f.UserName,'string')+'</UserName>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteLoginUser",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
      this.DbResult= (res);
      if(this.DbResult.tasks[0].length>0 && this.DbResult.tasks[0][0].DBresult>0)
      {
        this.ClearViewData();

       (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Deleted successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
   

    }
    else{
      (window as any).swal({
        icon: 'error',
        title: 'Error!',
        text: 'failed.!',
        confirmButtonText: 'Dismiss',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-danger'
       });
     }
  


  },
  err => {
    (window as any).swal({
      icon: 'error',
      title: 'Error!',
      text: 'Network Error Please Try Again .!',
      confirmButtonText: 'Dismiss',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-danger'
  });
  }
);
}
OnDelete()
{

  var that=this;
  debugger;
  
  (window as any).swal({
    icon: "warning",
    title: "Are you sure?",
    text:"You will not be able to recover this file!",
 
    buttons: [
      'No, cancel it!',
      'Yes, I am sure!'
    ],
    dangerMode: true,
  }).then(function(isConfirm) {
    
    if (isConfirm) {

      that.DeleteLoginUser();
    }else {
      (window as any). swal("Cancelled", "this file is safe:)", "error");
    }


  });


 

}

//#endregion "Delete LoginUser"

//#region "Clear ViewData"

ClearViewData()
{
  this.ID=0;
  this.ModifiedDate="";
  this.CreateLoginUser.patchValue({
    Name:""

    });
}
//end#region "Clear ViewData"
//#region "getControlValue"
getControlValue(Control,Type):string
{

 var Value=(Type=="string"?"":"0");
  if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
  {
    Value=Control.value;
  }

  return Value;
}
//#endregion "getControlValue"



  get f() { 
    return this.CreateLoginUser
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  ngOnInit() {


   this.DeviceType= localStorage.getItem('DeviceType')
  
  }

    //#endregion "View OnInit"
  
    //#region "After View Init"
    ngAfterViewInit(){

   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='LoginUsers')
      {
        this.CreateLoginUser.patchValue({
        UserName:ViewData.UserName,
        Password:ViewData.Password,
        UserType:ViewData.UserType

        });
        this.ID=ViewData.ID;
this.ModifiedDate=ViewData.ModifiedDate;
      }
      else{

        this.ID=0;
        this.ModifiedDate="";
      }
    // });
  }else{
    this.ID=0;
    this.ModifiedDate="";
  }
    
  }
//#endregion "After View Init"
}
