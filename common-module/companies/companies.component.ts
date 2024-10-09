//#region "jqueryAndjsIncludes"
import * as $ from 'jquery';
// import '../../../assets/vendors/dataTable/jquery.dataTables.min.js';
// import '../../../assets/vendors/dataTable/dataTables.bootstrap4.min.js';
// import '../../../assets/vendors/dataTable/dataTables.responsive.min.js';
// import '../../../assets/js/examples/datatable.js';
//#endregion "jqueryAndjsIncludes"            
//#region "AppSettingsAndService"
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';

//#endregion "AppSettingsAndService"

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
Companies:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService) {

    this.Companies=formBuilder.group(
  
      {
    Code:new FormControl(''),
    Name:new FormControl(''),
    Telephone:new FormControl(''),
    Email:new FormControl(''),
    SearchString:new FormControl('')
      });
    
   }

  //  @Output() messageEvent = new EventEmitter<string>();
   EditCompany(CompanyID) {
    // this.messageEvent.emit(CompanyID)
    this.router.navigate(['Common/CreateCompany']);
  }

   
   get f() { 
     return this.Companies
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
 
  }

ngAfterViewInit(){

    this.ViewandSearchCompanies();
     
    
  }


  lstCompanies:any=[];
  lstDbResult:any  = [];
  ViewandSearchCompanies()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     
      this.APICall.DBCalling("Companies",sstring,this.FilterType,"","").subscribe(
        (res:Response) => {

          if(AppSettings.ExicuteDebugger)
          {
          debugger;
          }
        
          this.lstDbResult= (res);
          this.lstCompanies=null;
          if(this.lstDbResult.tasks.length>0 && this.lstDbResult.tasks[0].length>0 )
          {
            this.lstCompanies=this.lstDbResult.tasks[0];
       //    $('#example1 thead th:eq(4)').css('display', 'none');

      
    
  
            
            if(this.lstSerchableFields.length==0)
            {


          var    stringDbFld=this.lstDbResult.tasks[0][0].SerchableFields
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
    this.ViewandSearchCompanies();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
  var Code=this.getControlValue(this.f.Code,"string");
  var CodeDBField="";
  var Name=this.getControlValue(this.f.Name,"string");
  var NameDBField="";
  var Telephone=this.getControlValue(this.f.Telephone,"string");
  var TelephoneDBField="";
  var Email=this.getControlValue(this.f.Email,"string");
  var EmailDBField="";

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    if(this.lstSerchableFields[i].ControlName=="Code")
    {
      CodeDBField=this.lstSerchableFields[i].DBField;
    }
    if(this.lstSerchableFields[i].ControlName=="Name")
    {
      NameDBField=this.lstSerchableFields[i].DBField;
    }

    if(this.lstSerchableFields[i].ControlName=="Telephone")
    {
      TelephoneDBField=this.lstSerchableFields[i].DBField;
    }

    if(this.lstSerchableFields[i].ControlName=="Email")
    {
      EmailDBField=this.lstSerchableFields[i].DBField;
    }
  }
debugger;
      if(this.SerchType=='Like')
      {

        if(Code!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+CodeDBField+" Like'"+Code+"%'"):(CodeDBField+" Like'"+Code+"%'");
        }
        if(Name!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+NameDBField+" Like'"+Name+"%'"):(NameDBField+" Like'"+Name+"%'");
        }

        if(Telephone!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+TelephoneDBField+" Like'"+Telephone+"%'"):(TelephoneDBField+" Like'"+Telephone+"%'");
        }

        if(Email!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+EmailDBField+" Like'"+Email+"%'"):(EmailDBField+" Like'"+Email+"%'");
        }
      }
      else{
        if(Code!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+CodeDBField+" ='"+Code+"'"):(CodeDBField+" ='"+Code+"'");
        }
        if(Name!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+NameDBField+" ='"+Name+"'"):(NameDBField+" ='"+Name+"'");
        }

        if(Telephone!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+TelephoneDBField+" ='"+Telephone+"'"):(TelephoneDBField+" ='"+Telephone+"'");
        }

        if(Email!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+EmailDBField+" ='"+Email+"'"):(EmailDBField+" ='"+Email+"'");
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
  if(this.FilterType!='All')
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
