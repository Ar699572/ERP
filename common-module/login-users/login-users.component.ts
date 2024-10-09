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

import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.css']
})
export class LoginUsersComponent implements OnInit {

  LoginUsers:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService) {

    this.LoginUsers=formBuilder.group(
  
      {
    
    UserName:new FormControl(''),
    UserType:new FormControl(''),
    SearchString:new FormControl('')
      });
    
   }





  //  @Output() messageEvent = new EventEmitter<string>();

  XmlEdit="";
  EditMake(xml) {
    // this.messageEvent.emit(MakeID)
    debugger;
this.APICall.SetViewData(xml);
    this.router.navigate(['Common/CreateLoginUser']);
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

  this.router.navigate(['Common/CreateLoginUser']);
}

   get f() { 
     return this.LoginUsers
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
 
  }

ngAfterViewInit(){

    this.ViewandSearchLoginUsers();
     
    
  }


  lstLoginUsers:any=[];
  lstDbResult:any  = [];
  ViewandSearchLoginUsers()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     
      this.APICall.DBCalling("LoginUsers",sstring,this.FilterType,"","").subscribe(
        (res:Response) => {

          if(AppSettings.ExicuteDebugger)
          {
          debugger;
          }
        
          this.lstDbResult= (res);
          this.lstLoginUsers=null;
          if(this.lstDbResult.tasks.length>0 && this.lstDbResult.tasks[0].length>0 )
          {
            this.lstLoginUsers=this.lstDbResult.tasks[0];
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
    this.ViewandSearchLoginUsers();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var UserName=this.getControlValue(this.f.UserName,"string");
  var NameDBField="";
  

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="UserName")
    {
      NameDBField=this.lstSerchableFields[i].DBField;
    }

    
  }
debugger;
      if(this.SerchType=='Like')
      {

        
        if(UserName!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+NameDBField+" Like'"+UserName+"%'"):(NameDBField+" Like'"+UserName+"%'");
        }

        
      }
      else{
       
        if(UserName!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+NameDBField+" ='"+UserName+"'"):(NameDBField+" ='"+UserName+"'");
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
