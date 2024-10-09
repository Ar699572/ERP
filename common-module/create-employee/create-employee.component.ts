import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import    '../../../assets/vendors/datepicker/daterangepicker.js';
import    "../../../assets/vendors/datepicker/daterangepicker.css";

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Employeedetails } from 'src/app/store/Employeedetails';
import    '../../../assets/vendors/select2/js/select2.min.js';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import    "../../../assets/vendors/select2/css/select2.min.css";
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import { formatDate } from '@angular/common';
import { Common } from 'src/app/store/Common';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  CreateEmployee:FormGroup;
  Common:Common;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) { 


    this.CreateEmployee=formBuilder.group(
  
      {
        firstname:new FormControl('',[Validators.required]),
        lastname:new FormControl(''),
    designation:new FormControl(0),
    DesignationaName:new FormControl(''),

    BranchId:new FormControl(0),
    department:new FormControl(0),
    contact1:new FormControl(''),
    email:new FormControl(''),
    EmployeeId:new FormControl(0),


    dob:new FormControl(''),
    gender:new FormControl(''),
    fathername:new FormControl(''),
    status:new FormControl(''),
    notes:new FormControl(''),
    doj:new FormControl(''),
    emptype:new FormControl(''),
    pfaccountno:new FormControl(''),
    bankaccount:new FormControl(''),
    bankname:new FormControl(''),
    IFSCCode:new FormControl(''),
    country:new FormControl(''),
    countryname:new FormControl(''),
    statename:new FormControl(''),
    cityname:new FormControl(''),
    state:new FormControl(''),
    city:new FormControl(''),
    Notes1:new FormControl(''), 
    pincode:new FormControl(''),
    employeecode:new FormControl(''),
    biometricid:new FormControl(''),

    reportto:new FormControl(0),
    ReportToName:new FormControl(0),
    paystructure:new FormControl(0),
    leavestructure:new FormControl(''),
    panno:new FormControl(''),

    adharno:new FormControl(''),
    contact2:new FormControl(''),
    emergencycontact:new FormControl(''),
    address1:new FormControl(''),
    address2:new FormControl(''),

    departmentname:new FormControl(''),
    paystructureName:new FormControl(''),
    leavestructureName:new FormControl(''),

    EmpBranchId:new FormControl(0),
    branchname:new FormControl(''),

    Image:new FormControl(''),
    PettyCashLimit:new FormControl(''),

      });

  }
 //#endregion "View constructor"
  
 //TransporterId=0;
  
  GetCountryDetById($event)
  {
    debugger;
this.f.TransporterId.setValue=$event;
  }

LoadDesignation()
  {
  var that=this;
    
    (<any> $("#drpdesgn")).select2({
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
     return JSON.stringify( {"Operation": 'ViewDesignation', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.DesignationsId; 
       obj.text = obj.designation; 
     
      
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
     $('#drpdesgn').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.designation.setValue( (<any>e).params.data.id);
     that.f.DesignationaName.setValue( (<any>e).params.data.text);
     
   }
   
    
     });
     var designationselection = new Option(this.f.DesignationaName.value,this.f.designation.value.toString(), true, true);
   
     (<any> $('#drpdesgn')).append(designationselection).trigger('change');
   
     $("#drpdesgn").on("select2:unselecting", function(e) {
      
     
      that.f.designation.setValue(0);
      that.f.DesignationaName.setValue('');
     
     });
  
  }
  LoadReportTo()
  {
  var that=this;
    
    (<any> $("#drpreportto")).select2({
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
     $('#drpreportto').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.reportto.setValue( (<any>e).params.data.id);
     that.f.ReportToName.setValue( (<any>e).params.data.text);
     
   }
   
    
     });
     var Reportselection = new Option(this.f.ReportToName.value,this.f.reportto.value.toString(), true, true);
   
     (<any> $('#drpreportto')).append(Reportselection).trigger('change');
   
     $("#drpreportto").on("select2:unselecting", function(e) {
      
     
      that.f.reportto.setValue(0);
      that.f.ReportToName.setValue('');
     
     });
  
  }
  LoadDepartment()
  {
  var that=this;
    
    (<any> $("#drpdept")).select2({
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
     return JSON.stringify( {"Operation": 'ViewDepartment', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.DepartmentId; 
       obj.text = obj.departmentname; 
     
      
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
     $('#drpdept').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.department.setValue( (<any>e).params.data.id);
     that.f.departmentname.setValue( (<any>e).params.data.text);
     
   }
   
    
     });
     var departmentselection = new Option(this.f.departmentname.value,this.f.department.value.toString(), true, true);
   
     (<any> $('#drpdept')).append(departmentselection).trigger('change');
   
     $("#drpdept").on("select2:unselecting", function(e) {
      
     
      that.f.department.setValue(0);
      that.f.departmentname.setValue('');
     
     });
  
  }
  LoadPaystruct()
  {
  var that=this;
    
    (<any> $("#drppaystructure")).select2({
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
     return JSON.stringify( {"Operation": 'Viewpaystructure', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.PayStructureId; 
       obj.text = obj.paystructure; 
     
      
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
     $('#drppaystructure').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.paystructure.setValue( (<any>e).params.data.id);
     that.f.paystructureName.setValue( (<any>e).params.data.text);
     
   }
   
    
     });
     var paystructureselection = new Option(this.f.paystructureName.value,this.f.paystructure.value.toString(), true, true);
   
     (<any> $('#drppaystructure')).append(paystructureselection).trigger('change');
   
     $("#drppaystructure").on("select2:unselecting", function(e) {
      
     
      that.f.paystructure.setValue(0);
      that.f.paystructureName.setValue('');
     
     });
  
  }
  Loadleavestruct()
  {
  var that=this;
    
    (<any> $("#drpleavestructure")).select2({
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
     return JSON.stringify( {"Operation": 'ViewLeaveStructure', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.LeaveStructureId; 
       obj.text = obj.leavestructure; 
     
      
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
     $('#drpleavestructure').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.leavestructure.setValue( (<any>e).params.data.id);
     that.f.leavestructureName.setValue( (<any>e).params.data.text);
     
   }
   
    
     });
     var leavestructureselection = new Option(this.f.leavestructureName.value,this.f.leavestructure.value.toString(), true, true);
   
     (<any> $('#drpleavestructure')).append(leavestructureselection).trigger('change');
   
     $("#drpleavestructure").on("select2:unselecting", function(e) {
      
     
      that.f.leavestructure.setValue(0);
      that.f.leavestructureName.setValue('');
     
     });
  
  }
  LoadEmployeeCountries()
{
  var that=this;
  debugger;

  


  (<any> $('#drpEmpCountry')).select2({
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
   return JSON.stringify( {"Operation": 'ViewCountries',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
       
      }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {
       
   
        debugger;
   
   var ResultData=(JSON.parse(response['Message'])).Table;
   
         var  data = $.map(ResultData, function (obj) {
         
          obj.id = obj.CountryId; 
          obj.text = obj.countryname; 
   
    
     return obj;
   });
   
   

        return {
      
   
           results: data
   
        };
      },
      cache: false
      
     }
     //, templateResult: this.format
// ,templateSelection: this.format
     //,minimumInputLength: 3
    });
   debugger;
    var EmpCountrySelection = new Option(this.f.countryname.value,this.f.country.value.toString(), true, true);

    (<any> $('#drpEmpCountry')).append(EmpCountrySelection).trigger('change');


   $('#drpEmpCountry').on('select2:select', function (e) {
   
   debugger;

  
   if(typeof((<any>e).params.data.id)!='undefined')
   {
    debugger;
 
  // that.CountryId = (<any>e).params.data.id;
  
   that.f.country.setValue( (<any>e).params.data.id);
   that.f.countryname.setValue( (<any>e).params.data.text);
   that.LoadEmployeeStates();
   
 }
 
  
   });
   
 
   $('#drpEmpCountry').on("select2:unselecting", function(e) {
    debugger;
   
    that.f.country.setValue(0);
    that.f.countryname.setValue("");
    
   });

}
LoadEmployeeStates()
{
  var that=this;
  debugger;

  


  (<any> $("#drpEmpState")).select2({
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
   return JSON.stringify( {"Operation": 'ViewStateByCountry', "Params":sstring,"Xml2":'All' ,"Xml3":that.f.country.value,"Xml4" :that.APICall.GetCompanyID() })
       
      }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {
       
   
        debugger;
   
   var ResultData=(JSON.parse(response['Message'])).Table;
   
         var  data = $.map(ResultData, function (obj) {
        /// if(obj.country.toString()==that.CountryId)
         {
     obj.id = obj.StateId; 
     obj.text = obj.Statename; 
   
         }
     return obj;
   });
   
   

        return {
      
   
           results: data
   
        };
      },
      cache: false
      
     }
 
    });
   

    var EmpStateSelection = new Option(this.f.statename.value,this.f.state.toString(), true, true);
  
    (<any> $('#drpEmpState')).append(EmpStateSelection).trigger('change');


   $('#drpEmpState').on('select2:select', function (e) {
   
   debugger;

  
   if(typeof((<any>e).params.data.id)!='undefined')
   {
    debugger;
   
  that.f.state.setValue( (<any>e).params.data.id);
  that.f.statename.setValue( (<any>e).params.data.text);
  that.LoadEmployeeCities();
 }
 
  
   });
   
 
   $("#drpEmpState").on("select2:unselecting", function(e) {
    debugger;
   
    that.f.state.setValue(0);
    that.f.statename.setValue("");
   
   });

}
LoadEmployeeCities()
{
  var that=this;
  debugger;


  (<any> $("#drpEmpCity")).select2({
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
   return JSON.stringify( {"Operation": 'ViewCityByState', "Params":sstring,"Xml2":'All' ,"Xml3":that.f.state.value,"Xml4" :that.APICall.GetCompanyID() })
       
      }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {
       
   
        debugger;
   
   var ResultData=(JSON.parse(response['Message'])).Table;
   
         var  data = $.map(ResultData, function (obj) {
     
         {
     obj.id = obj.CityId; 
     obj.text = obj.Cityname; 
   
         }
     return obj;
   });
   
   

        return {
      
   
           results: data
   
        };
      },
      cache: false
      
     }
  
    });
    var EmpCitySelection = new Option(this.f.cityname.value,this.f.city.value.toString(), true, true);
  
  (<any> $('#drpEmpCity')).append(EmpCitySelection).trigger('change');



   $('#drpEmpCity').on('select2:select', function (e) {
   
   debugger;

  
   if(typeof((<any>e).params.data.id)!='undefined')
   {
    debugger;
    that.f.city.setValue( (<any>e).params.data.id);
    that.f.cityname.setValue( (<any>e).params.data.text);

 }
 
  
   });
   
 
   $("#drpEmpCity").on("select2:unselecting", function(e) {
    debugger;
   
    
    that.f.city.setValue(0);
    that.f.cityname.setValue("");
   
   });

}
LoadEmployeeBranch()
{
var that=this;
  
  (<any> $("#drpEmpbrch")).select2({
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
   return JSON.stringify( {"Operation": 'ViewEmpBranch', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
       
      }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {
       
   
      
   
   var ResultData=(JSON.parse(response['Message'])).Table;
   
         var  data = $.map(ResultData, function (obj) {
         
     obj.id = obj.BranchesId; 
     obj.text = obj.branchname; 
   
    
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
   $('#drpEmpbrch').on('select2:select', function (e) {
   
   

  
   if(typeof((<any>e).params.data.id)!='undefined')
   {
    
 
   that.f.EmpBranchId.setValue( (<any>e).params.data.id);
   that.f.branchname.setValue( (<any>e).params.data.text);
   
 }
 
  
   });
   var empbrchselection = new Option(this.f.branchname.value,this.f.EmpBranchId.value.toString(), true, true);
 
   (<any> $('#drpEmpbrch')).append(empbrchselection).trigger('change');
 
   $("#drpEmpbrch").on("select2:unselecting", function(e) {
    
   
    that.f.EmpBranchId.setValue(0);
    that.f.branchname.setValue('');
   
   });

}
//#region "OnSave"
ImageServerPath="";
windowScroll(ControlName)
{
  var element = document.getElementById(ControlName); 
var rect = element.getBoundingClientRect();

window.scrollTo(rect.left, rect.top);
}
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
    this.f.dob.setValue($("#dob").val());
    this.f.doj.setValue($("#doj").val());
if(this.CreateEmployee.invalid)
{
  var  Cvalid=true;
  

  if(this.f.firstname.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('firstname');
    Cvalid=false;
  }
  if(this.f.doj.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('doj');
    Cvalid=false;
  }

  
  if(this.f.dob.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('dob');
    Cvalid=false;
  }

  return;
}
else
{
 this.SaveEmployee();
}
}
//#endregion "OnSave"
//#region "Save Country"
DbResult:any  = [];
modifiedDate="";
SaveEmployee(){
debugger;
this.f.dob.setValue($("#dob").val());
this.f.doj.setValue($("#doj").val());
this.modifiedDate=this.StoreEmployee.ModifiedDate;

if(this.modifiedDate==null || this.modifiedDate=='' || this.modifiedDate==undefined)
{
  this.modifiedDate=this.Common.TodaysDate;
}
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   
   +'<EmployeeId>'+this.getControlValue(this.f.EmployeeId,'int')+'</EmployeeId>'
     +'<firstname>'+this.getControlValue(this.f.firstname,'string')+'</firstname>'
     +'<lastname>'+this.getControlValue(this.f.lastname,'string')+'</lastname>'
     +'<fathername>'+this.getControlValue(this.f.fathername,'string')+'</fathername>'
     +'<gender>'+this.getControlValue(this.f.gender,'string')+'</gender>'
     +'<dob>'+this.getControlValue(this.f.dob,'string')+'</dob>'
     +'<status>'+this.getControlValue(this.f.status,'string')+'</status>'
     +'<employeecode>'+this.getControlValue(this.f.employeecode,'string')+'</employeecode>'
     +'<biometricid>'+this.getControlValue(this.f.biometricid,'string')+'</biometricid>'
     +'<EmpBranchId>'+this.getControlValue(this.f.EmpBranchId,'string')+'</EmpBranchId>'
     +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
     +'<doj>'+this.getControlValue(this.f.doj,'string')+'</doj>'
     +'<designation>'+this.getControlValue(this.f.designation,'int')+'</designation>'
     +'<emptype>'+this.getControlValue(this.f.emptype,'string')+'</emptype>'
     +'<reportto>'+this.getControlValue(this.f.reportto,'int')+'</reportto>'
     +'<paystructure>'+this.getControlValue(this.f.paystructure,'int')+'</paystructure>'
     +'<leavestructure>'+this.getControlValue(this.f.leavestructure,'int')+'</leavestructure>'
     +'<department>'+this.getControlValue(this.f.department,'int')+'</department>'
     +'<panno>'+this.getControlValue(this.f.panno,'string')+'</panno>'
     +'<adharno>'+this.getControlValue(this.f.adharno,'string')+'</adharno>'
     +'<pfaccountno>'+this.getControlValue(this.f.pfaccountno,'string')+'</pfaccountno>'
     +'<bankaccount>'+this.getControlValue(this.f.bankaccount,'string')+'</bankaccount>'
     +'<bankname>'+this.getControlValue(this.f.bankname,'string')+'</bankname>'
     +'<IFSCCode>'+this.getControlValue(this.f.IFSCCode,'string')+'</IFSCCode>'
     +'<contact1>'+this.getControlValue(this.f.contact1,'string')+'</contact1>'

     +'<contact2>'+this.getControlValue(this.f.contact2,'string')+'</contact2>'
     +'<emergencycontact>'+this.getControlValue(this.f.emergencycontact,'string')+'</emergencycontact>'
     +'<email>'+this.getControlValue(this.f.email,'string')+'</email>'
     +'<Notes1>'+this.getControlValue(this.f.Notes1,'string')+'</Notes1>'
     +'<address1>'+this.getControlValue(this.f.address1,'string')+'</address1>'
     +'<address2>'+this.getControlValue(this.f.address2,'string')+'</address2>'
     +'<country>'+this.getControlValue(this.f.country,'int')+'</country>'
     +'<state>'+this.getControlValue(this.f.state,'int')+'</state>'
     +'<city>'+this.getControlValue(this.f.city,'int')+'</city>'
     +'<pincode>'+this.getControlValue(this.f.pincode,'string')+'</pincode>'
     +'<IsAccountant>'+this.isAccountant+'</IsAccountant>'
     +'<PettyCashLimit>'+this.getControlValue(this.f.PettyCashLimit,'int')+'</PettyCashLimit>'
     
     +'<Image>'+this.getControlValue(this.f.Image,'string')+'</Image>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.modifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
    +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
    
     +'</Table1></NewDataSet>';
debugger;
  this.APICall.DBCalling("SaveEmployee",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.EmployeeId.value>0)
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
    //  this.CreateCountry.patchValue({

       
       this.f.EmployeeId.setValue(this.DbResult.Table[0].EmployeeId);
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
 text: 'Employee Already Exists.!',
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
      title:  "Treansaction modified by "+this.DbResult.Table[0].ModifiedBy+"! ",
      text:"Do you wants to overwrite?",
   
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      
      if (isConfirm) {
  
        that.ModifiedDate=that.DbResult.Table[0].ModifiedDate;
  
        that.SaveEmployee();
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
//#endregion "Save Country"

//#region "Search"

Search()
{
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
  this.APICall.UpdatedSelectedPath('./Common/Employee');
  this.router.navigate(['Common/Employee']);
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
//FilterType='All'
isAccountant:any=false;
isChecked=false;
IsAccountantChange(ChangedValue)
{
  debugger;
  

  // if(ChangedValue==false)
  // {
  //   this.isChecked=true;
  //  this.isAccountant=1;
   
  // }else{
  //   this.isChecked=false;
  //   this.isAccountant=0;
  // }

  if(ChangedValue==false)
  {
    this.isChecked=false;
   this.isAccountant=0;
   
  }else{
    this.isChecked=true;
    this.isAccountant=1;
  }
}


//#region "Delete Country"

DeleteEmployee()
{

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<EmployeeId>'+this.getControlValue(this.f.EmployeeId,'int')+'</EmployeeId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<firstname>'+this.getControlValue(this.f.firstname,'string')+'</firstname>'
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
  +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteEmployee",xml1,"","","").subscribe(
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

      that.DeleteEmployee();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });


}
Imagepath
//#endregion "Delete Country"

//#region "Clear ViewData"

ClearViewData()
{
 
  this.ModifiedDate="";
  this.CreateEmployee.patchValue({
    firstname:"",
    designation:0,
    BranchId:0,
    department:0,
    contact1:"",
    email:"",
    EmployeeId:0,
    
    lastname:"",
    dob:"",
    gender:"",
    fathername:"",
    status:"",
    notes:"",
    doj:"",
    emptype:"",
    pfaccountno:"",
    bankaccount:"",
    bankname:"",
    IFSCCode:"",
    country:"",
    state:"",
    city:"",
    Notes1:"",
    pincode:"",
    DesignationaName:"",
    reportto:0,
    ReportToName:"",

    employeecode:"",
    biometricid:"",
    paystructure:0,
    leavestructure:0,
    panno:"",
    adharno:"",
    contact2:"",
    emergencycontact:"",
    address1:"",
    address2:"",
    departmentname:"",
    paystructureName:"",
    leavestructureName:"",
    countryname:"",
    statename:"",
    cityname:"",
    Image:"",


    });
//     var rdate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
//   $("#dob").val(rdate)
// $("#doj").val(rdate)
$('#dob').val(null).trigger('change');
$('#doj').val(null).trigger('change');
$("#Image").attr("src","");
    $('#drpdesgn').val(null).trigger('change');
    $('#drpreportto').val(null).trigger('change');
    $('#drpdept').val(null).trigger('change');
    $('#drppaystructure').val(null).trigger('change');
    $('#drpleavestructure').val(null).trigger('change');
    $('#drpEmpbrch').val(null).trigger('change');
    
    $('#drpEmpCountry').val(null).trigger('change');
    $('#drpEmpState').val(null).trigger('change');
    $('#drpEmpCity').val(null).trigger('change');
  this.StoreEmployee=new Employeedetails;
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreEmployee.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StoreEmployee));
}
//end#region "Clear ViewData"
//#region "getControlValue"
QuotDateChange(e)
{
  
}
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
    return this.CreateEmployee
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  StoreEmployee: Employeedetails;
chkVal:any=false;
  ngOnInit() {

    this.Common=new Common();
    this.StoreEmployee=new Employeedetails;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {
      this.StoreEmployee = result[0]
      this.ModifiedDate = this.StoreEmployee.ModifiedDate.toString();
      this.submitted= Boolean(this.StoreEmployee.submitted);
      this.CreateEmployee.patchValue(this.StoreEmployee);
    }
    if(this.StoreEmployee.ModifiedDate.toString().includes('India'))
    {
      var date = new  Date (this.StoreEmployee.ModifiedDate);
      this.StoreEmployee.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
      this.modifiedDate=this.StoreEmployee.ModifiedDate;
    }
    if(this.StoreEmployee.dob!='')
    {
    var dob= formatDate(new Date(this.StoreEmployee.dob), 'MM/dd/yyyy', 'en');
    var doj= formatDate(new Date(this.StoreEmployee.doj), 'MM/dd/yyyy', 'en');
    }else{
      var dob= formatDate(new Date(), 'MM/dd/yyyy', 'en');
      var doj= formatDate(new Date(), 'MM/dd/yyyy', 'en');
    }  
    debugger;
  
    
    $("#dob").val(dob)
  $("#doj").val(doj)

    var that=this;

    
    if(that.StoreEmployee.IsAccountant==true)
    {
      that.chkVal=true;
    }
    that.IsAccountantChange(that.chkVal);
    
    this.CreateEmployee.valueChanges.subscribe(value => {

      debugger;
  

     that.StoreEmployee.firstname=value.firstname;
     that.StoreEmployee.email=value.email;
     that.StoreEmployee.BranchId=value.BranchId;

     that.StoreEmployee.designation=value.designation;
     that.StoreEmployee.DesignationaName=value.DesignationaName;
    
     that.StoreEmployee.reportto=value.reportto;
     that.StoreEmployee.ReportToName=value.ReportToName;
     
     that.StoreEmployee.department=value.department;
     that.StoreEmployee.departmentname=value.departmentname;
     that.StoreEmployee.contact1=value.contact1;
 
     that.StoreEmployee.PettyCashLimit=value.PettyCashLimit;
     that.StoreEmployee.IsAccountant=this.isAccountant;
    
     that.StoreEmployee.EmployeeId=value.EmployeeId; 
     that.StoreEmployee.Image=value.Image;
    
     that.StoreEmployee.dob=value.dob; 
     
     that.StoreEmployee.gender=value.gender; 
     
     that.StoreEmployee.fathername=value.fathername;
     that.StoreEmployee.status=value.status;
 
     that.StoreEmployee.notes=value.notes;
     that.StoreEmployee.doj=value.doj;
     
     that.StoreEmployee.emptype=value.emptype;
     that.StoreEmployee.pfaccountno=value.pfaccountno; 
     
     that.StoreEmployee.bankaccount=value.bankaccount; 
     
     that.StoreEmployee.bankname=value.bankname;
     that.StoreEmployee.IFSCCode=value.IFSCCode;
 
     that.StoreEmployee.Notes1=value.Notes1;
 
     that.StoreEmployee.country=value.country;
     that.StoreEmployee.state=value.state;
     that.StoreEmployee.city=value.city;

     that.StoreEmployee.countryname=value.countryname;
     that.StoreEmployee.statename=value.statename;
     that.StoreEmployee.cityname=value.cityname;

     that.StoreEmployee.pincode=value.pincode;


     that.StoreEmployee.employeecode=value.employeecode;
 
     that.StoreEmployee.biometricid=value.biometricid;
     that.StoreEmployee.paystructure=value.paystructure;
     that.StoreEmployee.paystructureName=value.paystructureName;
     that.StoreEmployee.leavestructureName=value.leavestructureName;
     that.StoreEmployee.leavestructure=value.leavestructure;
     that.StoreEmployee.panno=value.panno;

     that.StoreEmployee.adharno=value.adharno;
     that.StoreEmployee.contact2=value.contact2;
     that.StoreEmployee.emergencycontact=value.emergencycontact;
     that.StoreEmployee.address1=value.address1;
     that.StoreEmployee.address2=value.address2;
     
     that.StoreEmployee.EmpBranchId=value.EmpBranchId;
     that.StoreEmployee.branchname=value.branchname;
     
     that.StoreEmployee.ViewName='Employee';
     that.StoreEmployee.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StoreEmployee.submitted=that.submitted;
   that.StoreEmployee.TabId=ActivatedRoute;

   that.StoreEmployee.IsAccountant=value.IsAccountant;  
   that.StoreEmployee.PettyCashLimit=value.PettyCashLimit;
   
     that.store.dispatch(new  TabStore.AddTab(that.StoreEmployee));
});


$("#PettyCashLimit").val(this.StoreEmployee.PettyCashLimit);
this.f.PettyCashLimit.setValue(this.StoreEmployee.PettyCashLimit);
   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();
   this.Imagepath=this.APICall.GetImagePath()
   this.imgURL = this.APICall.ImagePath + this.StoreEmployee.Image;
   
   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
     

        debugger;
      if(ViewData.ViewName=='Employee')
      {
         this.CreateEmployee.patchValue({
         
         });
       
this.ModifiedDate=ViewData.ModifiedDate;
      }
      else{

       
      }
    
  }else{
  
  }
  
  }

    ControlDatePickerLoad()
    {
    
    
    (window as any).$('input[name="single-date-picker"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true
    });
    
    (window as any).$('input[name="simple-date-range-picker"]').daterangepicker();
    
    (window as any).$('input[name="simple-date-range-picker-callback"]').daterangepicker({
      opens: 'left'
    }, function (start, end, label) {
    (window as any). swal("A new date selection was made", start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'), "success")
    });
    
    (window as any).$('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      startDate: (window as any).moment().startOf('hour'),
      endDate: (window as any).moment().startOf('hour').add(32, 'hour'),
      locale: {
          format: 'M/DD hh:mm A'
      }
    });
    
  
    (window as any).$('input.create-event-datepicker').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: false
    }).on('apply.daterangepicker', function(ev, picker) {
     
      $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });

    
    
    }
    ngAfterViewInit(){
      (<any> $("#drpdesgn")).select2();
      (<any> $("#drpreportto")).select2();
      (<any> $("#drpdept")).select2();
      (<any> $("#drppaystructure")).select2();
      (<any> $("#drpleavestructure")).select2();
      (<any> $("#drpEmpbrch")).select2();
      (<any> $("#drpEmpCountry")).select2();
      (<any> $("#drpEmpState")).select2();
      (<any> $("#drpEmpCity")).select2();
      this.LoadDesignation();
      this.LoadReportTo();
      this.LoadDepartment();
      this.LoadPaystruct();
      this.Loadleavestruct();
      this.LoadEmployeeCountries();
    
this.LoadEmployeeBranch();
this.ControlDatePickerLoad();

$("#Image").attr("src",this.APICall.ImagePath+this.getControlValue(this.f.Image,'string'));
      

    
  }
  selectedFile:ImageSnippet;


ResourceName:string='';
formData:FormData;
DocName:string='';
imgURL: any;
ResourcefileChange($event,ControlName){
debugger;
this.ResourceName = "Employee";
this.formData = new FormData();
if (this.ResourceName != '') {
  this.DocName = "";
  var file: File = $event.target.files[0];
  var fileType = file.type;
  var extention = ControlName.value.split('.').pop();
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    debugger;
    var path = reader.result;
    this.selectedFile = new ImageSnippet(path.toString(), file);

    let currDatetime: string = new Date().toString().trim();
    currDatetime = currDatetime.replace(/[^a-zA-Z0-9]/g, "")
    this.DocName = "Employee" + currDatetime + '.' + extention;
    this.DocName = this.DocName.replace(/\s/g, "");

    this.formData.append('image', this.selectedFile.file);
    this.formData.append('imageName', this.DocName);

    this.formData.append("uploads[]", this.selectedFile.file, this.DocName);

    this.imgURL = reader.result;
    debugger;
    this.f.Image.setValue( this.DocName)
    this.SaveImage();

  }
}
}

SaveImage() {
  this.APICall.SaveImage(this.formData, '').subscribe(x=>
    {
debugger;

    });
}
//#endregion "After View Init"
}
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
