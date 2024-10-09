import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Employeedetails } from 'src/app/store/Employeedetails';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  Employee:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Employee=formBuilder.group(
  
      {
        firstname:new FormControl(''),

        designation:new FormControl(0),
        BranchId:new FormControl(0),
        department:new FormControl(0),
        contact1:new FormControl(''),
        email:new FormControl(''),
        EmployeeId:new FormControl(''),

    SearchString:new FormControl('')
      });
      this.ViewandSearchEmployee();
   }


  



   StoreEmployee: Employeedetails;
  XmlEdit="";
  EditEmployee(xml) {
  
    debugger;
    this.StoreEmployee=new Employeedetails;
    this.StoreEmployee.firstname=xml.firstname;
    this.StoreEmployee.lastname=xml.lastname;
    this.StoreEmployee.designation=xml.designation; 
    
    this.StoreEmployee.BranchId=xml.BranchId; 
    
    this.StoreEmployee.department=xml.department;
    this.StoreEmployee.departmentname=xml.departmentname;
    this.StoreEmployee.contact1=xml.contact1;

    this.StoreEmployee.countryname=xml.countryname;
    this.StoreEmployee.statename=xml.statename;
    this.StoreEmployee.cityname=xml.cityname;

    this.StoreEmployee.email=xml.email;
    this.StoreEmployee.EmployeeId=xml.EmployeeId; 

    this.StoreEmployee.pincode=xml.pincode; 

    this.StoreEmployee.dob=xml.dob; 
    
    this.StoreEmployee.gender=xml.gender; 
    
    this.StoreEmployee.fathername=xml.fathername;
    this.StoreEmployee.status=xml.status;

    this.StoreEmployee.notes=xml.notes;
    this.StoreEmployee.doj=xml.doj;
    
    this.StoreEmployee.emptype=xml.emptype;
    this.StoreEmployee.pfaccountno=xml.pfaccountno; 
    
    this.StoreEmployee.bankaccount=xml.bankaccount; 
    this.StoreEmployee.Image=xml.Image;
    this.StoreEmployee.bankname=xml.bankname;
    this.StoreEmployee.IFSCCode=xml.IFSCCode;

    this.StoreEmployee.Notes1=xml.Notes1;

    this.StoreEmployee.country=xml.country;
    this.StoreEmployee.state=xml.state;
    this.StoreEmployee.city=xml.city;

    this.StoreEmployee.DesignationaName=xml.DesignationaName;
    
    this.StoreEmployee.reportto=xml.reportto;
    this.StoreEmployee.ReportToName=xml.ReportToName;

    this.StoreEmployee.employeecode=xml.employeecode;
 
    this.StoreEmployee.biometricid=xml.biometricid;
    this.StoreEmployee.paystructure=xml.paystructure;
    this.StoreEmployee.paystructureName=xml.paystructureName;
    this.StoreEmployee.leavestructureName=xml.leavestructureName;
     this.StoreEmployee.leavestructure=xml.leavestructure;
     this.StoreEmployee.panno=xml.panno;

     this.StoreEmployee.adharno=xml.adharno;
     this.StoreEmployee.contact2=xml.contact2;
     this.StoreEmployee.emergencycontact=xml.emergencycontact;
     this.StoreEmployee.address1=xml.address1;
     this.StoreEmployee.address2=xml.address2;
    
     this.StoreEmployee.EmpBranchId=xml.EmpBranchId;
     this.StoreEmployee.branchname=xml.branchname;

     this.StoreEmployee.IsAccountant=xml.IsAccountant;
     this.StoreEmployee.PettyCashLimit=xml.PettyCashLimit;
 
this.APICall.SetViewData(xml);

this.APICall.UpdatedSelectedPath('./Common/CreateEmployee');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreEmployee.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreEmployee));


    this.router.navigate(['Common/CreateEmployee']);
  }

   
//#region "ShortCuts"
@HostListener('window:keydown', ['$event'])


keyEvent(event: KeyboardEvent) {
  console.log(event);
  
  if (event.ctrlKey || event.metaKey) {
    
   switch (String.fromCharCode(event.which).toLowerCase()) {
   

       case 'a':
        
         event.preventDefault();
       this.OnAdd();
       
         break;
         

   }
 }
 
}
//#endregion "ShortCuts"
 


OnAdd()
{

    
  this.StoreEmployee=new Employeedetails;
  this.APICall.UpdatedSelectedPath('./Common/CreateEmployee');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreEmployee.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreEmployee));




  this.router.navigate(['Common/CreateEmployee']);


 
}

   get f() { 
     return this.Employee
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreEmployee=new Employeedetails;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreEmployee=( result[0] );

 
  this.ViewandSearchEmployee();

}else{

  this.ViewandSearchEmployee();
}
  }

ngAfterViewInit(){

   
     
    
  }


  lstEmployee:any=[];
  lstDbResult:any  = [];
  ViewandSearchEmployee()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewEmployee",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstEmployee=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstEmployee=this.lstDbResult.Table;
      
  
            
            if(this.lstSerchableFields.length==0)
            {


          var    stringDbFld=this.lstDbResult.Table[0].SerchableFields
             var parser = new DOMParser();
             var xmlDoc = parser.parseFromString(stringDbFld,"text/xml");
            
            var sizex = xmlDoc.getElementsByTagName("ControlName");
            
            for (var i = 0 ; i < sizex.length ; i++) {
            

          
            this.lstSerchableFields.push(
              

              ( { 
                ControlName:xmlDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue
                
                ,DBField:xmlDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue
                
                })

            );
            }
            }
          }

          $("#loaderParent").hide();
        });
  }


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

  //#region "SearchPanelLogic"


  SearchClick()
  {
    this.ViewandSearchEmployee();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
 
  var firstname=this.getControlValue(this.f.firstname,"string");
  var firstnameDBField="";
  

 

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {
    
    if(this.lstSerchableFields[i].ControlName=="firstname")
    {
      firstnameDBField=this.lstSerchableFields[i].DBField;
    }

    



    
  }
debugger;
      if(this.SerchType=='Like')
      {

         
      
        
        if(firstname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+firstnameDBField+" Like'"+firstname+"%'"):(firstnameDBField+" Like'"+firstname+"%'");
        }


      }
      else{
      
        if(firstname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+firstnameDBField+" ='"+firstname+"'"):(firstnameDBField+" ='"+firstname+"'");
        }
      }
    }
      return FldSerchString;
    }
FilterType='All'
GetSearchString():string
{
  debugger;
  var  SearchString="";
  if(this.FilterType !='All')
  {
    SearchString=this.PrepareSerchStringByField();
  }
  else
  {
    SearchString=  this.getControlValue(this.f.SearchString,"string")
  }
  return SearchString;
}
FilterTypeChange(event)
  {
    if(AppSettings.ExicuteDebugger)
    {
    debugger;
    }
  
    if(this.SerchType=='Like' && event.target.checked==true)
     {
    this.FilterType=(event.target.checked==true?'All':'Field');
     }else
     {
       
      event.target.checked=false;
      this.FilterType='Field';
    
     }
  }

  SerchType='Like'
  SerchTypeChange(ChangedValue)
  {
    if(AppSettings.ExicuteDebugger)
    {
    debugger;
    }
  

    if(ChangedValue==false)
    {
      this.SerchType='Equal'
      if(this.FilterType=='All')
      $('#customSwitch').trigger('click');
     
    }else{
      this.SerchType='Like'
    }
  }

  //#endregion "SearchPanelLogic"
  
}
