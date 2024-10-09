import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { LoginUsers } from 'src/app/store/StoreLoginUsers';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css"
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-overviewloginpage',
  templateUrl: './overviewloginpage.component.html',
  styleUrls: ['./overviewloginpage.component.css']
})
export class OverviewloginpageComponent implements OnInit {
  overviewloginpage:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) { 


    this.overviewloginpage=formBuilder.group(
  
      {
    
        LoginUsersId:new FormControl(0),
        username:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required]),
         
        branchname:new FormControl(0,[Validators.required,Validators.min(1)]),
        employee:new FormControl(0),
        userprofile:new FormControl(0),
        CashAccountId:new FormControl(0),
        AccountName:new FormControl(''),
        UserType:new FormControl(''),
        Block1:new FormControl(''),
        BranchesName:new FormControl(''),
        Employeename:new FormControl(''),
        profilename:new FormControl(''),
    
      });

  }
 //#endregion "View constructor"
 Search()
 {

   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
 this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
 this.APICall.UpdatedSelectedPath('./Common/Loginuserspage');
   
   this.router.navigate(['Common/Loginuserspage']);
 }
// LoginUsersId=0;
  
  GetLoginUsersDetById($event)
  {
    debugger;
this.f.LoginUsersId.setValue=$event;
  }

  LoadAccounts()
  {
  var that=this;
    
    (<any> $("#drpDefultAccount")).select2({
     allowClear: true,
     placeholder:"Select",
       ajax: { 
        url:this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data: 
        function (params) {
     
     var sstring="";
     if( params.term!=undefined)
     {
       sstring=params.term;
     }
     debugger;
     return JSON.stringify( {"Operation": 'ViewChartOfAccounts', "Params":sstring,"Xml2":'All' ,"Xml3":"Cash In Hand","Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.COAId; 
       obj.text = obj.Name; 
     
      
       return obj;
     });
     
     
  
          return {
        
     
             results: data
     
          };
        },
        cache: false
        
       }
     
      });
     
  
  
     var that =this;
     $('#drpDefultAccount').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.CashAccountId.setValue( (<any>e).params.data.id);
     that.f.AccountName.setValue( (<any>e).params.data.text);
     
   }
   
    
     });
     var Bankselection = new Option(this.f.AccountName.value,this.f.CashAccountId.value.toString(), true, true);
   
     (<any> $('#drpDefultAccount')).append(Bankselection).trigger('change');
   
     $("#drpDefultAccount").on("select2:unselecting", function(e) {
      
     
      that.f.CashAccountId.setValue(0);
      that.f.AccountName.setValue('');
     
     });
  
  }
  LoadBranches()
  {
  
    var that = this;
    debugger;
    (<any> $("#drpBranchTypes")).select2({
     allowClear: true,
     placeholder:"Select",
       ajax: { 
        url:this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data: 
        function (params) {
     
     var sstring="";
     if( params.term!=undefined)
     {
       sstring=params.term;
     }
     debugger;
  
     return JSON.stringify( {"Operation": 'ViewBranches', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" : that.APICall.GetCompanyID() })
         
    }
    ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        debugger;
        var yourArrayData=(JSON.parse(response['Message'])).Table;
   
     
           var  data = $.map(yourArrayData, function (obj) {
      
       obj.id = obj.BranchId; 
       obj.text = obj.branchname; 
      
       return obj;
     });
     
     
   
          return {
        
     
             results: data
     
          };
        },
        cache: false
        
       }
       
   
      });   var that =this;
      $('#drpBranchTypes').on('select2:select', function (e) {
      
      
   
     
      if(typeof((<any>e).params.data.id)!='undefined')
      {
       
    
      that.f.branchname.setValue( (<any>e).params.data.id);
      that.f.BranchesName.setValue( (<any>e).params.data.text);
      
    }
    
     
      });
      var Branchselection = new Option(this.f.BranchesName.value,this.f.branchname.value.toString(), true, true);
    
      (<any> $('#drpBranchTypes')).append(Branchselection).trigger('change');
    
      $("#drpBranchTypes").on("select2:unselecting", function(e) {
       
      
       that.f.branchname.setValue(0);
       that.f.BranchesName.setValue('');
      
      });
   
   }
  
   LoadEmployee()
   {
   var that=this;
     
     (<any> $("#drpEmployeedetails")).select2({
      allowClear: true,
      placeholder:"Select",
        ajax: { 
         url:this.APICall.DBCallingURL,
         type: "POST",
         dataType: 'json',
         delay: 250,
         data: 
         function (params) {
      
      var sstring="";
      if( params.term!=undefined)
      {
        sstring=params.term;
      }
      debugger;
      return JSON.stringify( {"Operation": 'ViewEmployeeDetails', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
          
         }
         ,
         contentType: 'application/json; charset=utf-8',
         processResults: function (response) {
          
      
         
      
      var ResultData=(JSON.parse(response['Message'])).Table;
      
            var  data = $.map(ResultData, function (obj) {
            
        obj.id = obj.EmployeeId; 
        obj.text = obj.Employeename; 
      
       
        return obj;
      });
      
      
   
           return {
         
      
              results: data
      
           };
         },
         cache: false
         
        }
      
       });
      
   
   
      var that =this;
      $('#drpEmployeedetails').on('select2:select', function (e) {
      
      
   
     
      if(typeof((<any>e).params.data.id)!='undefined')
      {
       
    
      that.f.employee.setValue( (<any>e).params.data.id);
      that.f.Employeename.setValue( (<any>e).params.data.text);
      
    }
    
     
      });
      var Emplopyeeselection = new Option(this.f.Employeename.value,this.f.employee.value.toString(), true, true);
    
      (<any> $('#drpEmployeedetails')).append(Emplopyeeselection).trigger('change');
    
      $("#drpEmployeedetails").on("select2:unselecting", function(e) {
       
      
       that.f.employee.setValue(0);
       that.f.Employeename.setValue('');
      
      });
   
   }
   LoadUserProfile()
  {
  var that=this;
    
    (<any> $("#drpUserProfile")).select2({
     allowClear: true,
     placeholder:"Select",
       ajax: { 
        url:this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data: 
        function (params) {
     
     var sstring="";
     if( params.term!=undefined)
     {
       sstring=params.term;
     }
     debugger;
     return JSON.stringify( {"Operation": 'ViewUserProfile', "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.UserProfilesId; 
       obj.text = obj.profilename; 
     
      
       return obj;
     });
     
     
  
          return {
        
     
             results: data
     
          };
        },
        cache: false
        
       }
     
      });
     
  
  
     var that =this;
     $('#drpUserProfile').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.userprofile.setValue( (<any>e).params.data.id);
     that.f.profilename.setValue( (<any>e).params.data.text);
     
   }
   
    
     });
     var profileselection = new Option(this.f.profilename.value,this.f.userprofile.value.toString(), true, true);
   
     (<any> $('#drpUserProfile')).append(profileselection).trigger('change');
   
     $("#drpUserProfile").on("select2:unselecting", function(e) {
      
     
      that.f.userprofile.setValue(0);
      that.f.profilename.setValue('');
     
     });
  
  }
//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.overviewloginpage.invalid)
{
  var  Cvalid=true;
  

  if(this.f.username.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('username');
    Cvalid=false;
  }




  return;
}
else
{
 this.LoginUsersSave();
}
}
//#endregion "OnSave"
//#region "Save LoginUsers"
DbResult:any  = [];
LoginUsersSave(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
   var xml1='<NewDataSet><Table1>'
   
   +'<LoginUsersId>'+this.getControlValue(this.f.LoginUsersId,'int')+'</LoginUsersId>'
     +'<username>'+this.getControlValue(this.f.username,'string')+'</username>'
     +'<password>'+this.getControlValue(this.f.password,'string')+'</password>'

     +'<branchname>'+this.getControlValue(this.f.branchname,'string')+'</branchname>'
       +'<employee>'+this.getControlValue(this.f.employee,'int')+'</employee>'
       +'<userprofile>'+this.getControlValue(this.f.userprofile,'int')+'</userprofile>'
       +'<CashAccountId>'+this.getControlValue(this.f.CashAccountId,'string')+'</CashAccountId>'
       +'<UserType>'+this.getControlValue(this.f.UserType,'string')+'</UserType>'
       +'<Block1>'+this.getControlValue(this.f.Block1,'string')+'</Block1>'

    // +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("LoginUsersSave",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.LoginUsersId.value>0)
      {
        this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
       (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Updated successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
   }else{
    //  this.overviewloginpage.patchValue({

       
       this.f.LoginUsersId.setValue(this.DbResult.Table[0].LoginUsersId);
       this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
 
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



if(this.DbResult.Table[0].DBresult==-3)
{
(window as any).swal({
 icon: 'warning',
 title: 'Exists',
 text: 'LoginUsers Already Exists.!',
 confirmButtonText: 'Dismiss',
 buttonsStyling: false,
 confirmButtonClass: 'btn btn-lg btn-warning'
});
}else{

  if(this.DbResult.Table[0].DBresult==-5)
  {
    
    var that=this;
    debugger;
   
    (window as any).swal({
      icon: "warning",
      title:  "Treansaction modified by "+this.DbResult.Table[0].ModifiedBy+"!",
      text:"Do you wants to overwrite?",
   
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      
      if (isConfirm) {
  
        that.ModifiedDate=that.DbResult.Table[0].ModifiedDate;
  
        that.LoginUsersSave();
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
//#endregion "Save LoginUsers"

//#region "Search"



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
 

//#region "Delete LoginUsers"



DeleteLoginUsers()
{


  
debugger;
var xml1='<NewDataSet><Table1>'
+'<LoginUsersId>'+this.getControlValue(this.f.LoginUsersId,'string')+'</LoginUsersId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'


  +'<username>'+this.getControlValue(this.f.username,'string')+'</username>'
  
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteLoginUsers",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
  
      this.DbResult=JSON.parse(res['Message']);
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
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
    text:"You will not be able to recover this record!",
 
    buttons: [
      'No, cancel it!',
      'Yes, I am sure!'
    ],
    dangerMode: true,
  }).then(function(isConfirm) {
    
    if (isConfirm) {

      that.DeleteLoginUsers();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });


 

}

//#endregion "Delete LoginUsers"

//#region "Clear ViewData"

ClearViewData()
{
  
  this.ModifiedDate="";
  this.overviewloginpage.patchValue({
    username:"",
  branchname:0,
  userprofile:0,
  block:"",
  CashAccountId:0,
    LoginUsersId:0,
    password:"",
    employee:0,
    BranchesName:"",
    Employeename:"",
    profilename:"",
    AccountName:"",





    });
    $('#drpDefultAccount').val(null).trigger('change');
    $('#drpBranchTypes').val(null).trigger('change');
    $('#drpEmployeedetails').val(null).trigger('change');
    $('#drpUserProfile').val(null).trigger('change');
    

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
    return this.overviewloginpage
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  StoreLoginUsers: LoginUsers;
  ngOnInit() {

    this.StoreLoginUsers=new LoginUsers;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {

      
      this.StoreLoginUsers = result[0]
      this.ModifiedDate = this.StoreLoginUsers.ModifiedDate.toString();
    
      this.submitted= Boolean(this.StoreLoginUsers.submitted);
      this.overviewloginpage.patchValue(this.StoreLoginUsers);
    }

    if(this.StoreLoginUsers.ModifiedDate.toString().includes('India'))
    {
    
      var date = new  Date (this.StoreLoginUsers.ModifiedDate);
    
    
      this.StoreLoginUsers.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }
    var that=this;

    this.overviewloginpage.valueChanges.subscribe(value => {

      debugger;
    that.StoreLoginUsers.username=value.username;
    that.StoreLoginUsers.ViewName='LoginUsers';
    //that.StoreLoginUsers.notes=value.notes;
    this.StoreLoginUsers.password=value.password;

    that.StoreLoginUsers.branchname=value.branchname;
    that.StoreLoginUsers.employee=value.employee;
    that.StoreLoginUsers.userprofile=value.userprofile;
    that.StoreLoginUsers.Block1=value.Block1;
    that.StoreLoginUsers.CashAccountId=value.CashAccountId;
    that.StoreLoginUsers.UserType=value.UserType;

    that.StoreLoginUsers.AccountName=value.AccountName;
    
    that.StoreLoginUsers.Employeename=value.Employeename;

     that.StoreLoginUsers.LoginUsersId=value.LoginUsersId.toString();
     
     


     that.StoreLoginUsers.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StoreLoginUsers.submitted=that.submitted;
   that.StoreLoginUsers.TabId=ActivatedRoute;
     that.store.dispatch(new  TabStore.AddTab(that.StoreLoginUsers));
});

   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='LoginUsers')
      {
        // this.CreateState.patchValue({
        //   Statename:ViewData.Statename,
        //   statecode:ViewData.statecode,
        //   country:ViewData.country,
        //   notes:ViewData.notes

        // });


      
        debugger;
       
        this.overviewloginpage.patchValue(ViewData);
        this.f.LoginUsersId.setValue(ViewData.LoginUsersId);
//this.ModifiedDate=ViewData.ModifiedDate;
      }
      // else{

      //   this.f.StateId.setValue(0);
      //   this.ModifiedDate="";
      // }
    // });
  }
  // else{
  //   this.f.StateId.setValue(0);
  //   this.ModifiedDate="";
  // }
  }

    //#endregion "View OnInit"
  
    //#region "After View Init"
    ngAfterViewInit(){
      (<any> $("#drpDefultAccount")).select2();
      (<any> $("#drpBranchTypes")).select2();
      (<any> $("#drpEmployeedetails")).select2();
      (<any> $("#drpUserProfile")).select2();
      this.LoadAccounts();
    this.LoadBranches();
   this.LoadEmployee();
   this.LoadUserProfile();
  }
//#endregion "After View Init"
}
