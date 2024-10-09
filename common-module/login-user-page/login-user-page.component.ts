import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { LoginUsers } from 'src/app/store/StoreLoginUsers';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-user-page',
  templateUrl: './login-user-page.component.html',
  styleUrls: ['./login-user-page.component.css']
})
export class LoginUserPageComponent implements OnInit {
  Loginuserspage:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Loginuserspage=formBuilder.group(
  
      {
    
        
        username:new FormControl(''),
       
    SearchString:new FormControl('')
      });
      this.ViewandSearchLoginUsers();
   }



  



    
   StoreLoginUsers:LoginUsers ;

  XmlEdit="";
  Editloginusers(xml) {
  
    debugger;


    this.StoreLoginUsers=new LoginUsers;

    //this.StoreReceipts.TransactionDate=xml.TransactionDate;
    this.StoreLoginUsers.username=xml.username;

    this.StoreLoginUsers.password=xml.password;

    this.StoreLoginUsers.branchname=xml.branchname;
    this.StoreLoginUsers.employee=xml.employee;
    this.StoreLoginUsers.userprofile=xml.userprofile;
    this.StoreLoginUsers.Block1=xml.Block1;
    this.StoreLoginUsers.CashAccountId=xml.CashAccountId;
    this.StoreLoginUsers.UserType=xml.UserType;
    this.StoreLoginUsers.BranchesName=xml.BranchesName;

    this.StoreLoginUsers.AccountName=xml.AccountName;
    this.StoreLoginUsers.LoginUsersId=xml.LoginUsersId;
    
    this.StoreLoginUsers.Employeename=xml.Employeename;
    
    this.StoreLoginUsers.profilename=xml.profilename;
    debugger;
    
    this.StoreLoginUsers.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
    this.StoreLoginUsers.submitted=xml.submitted;
    this.StoreLoginUsers.ViewName=xml.LoginUsers;


    this.APICall.UpdatedSelectedPath('./Common/overviewloginpage');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreLoginUsers.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreLoginUsers));
        this.router.navigate(['Common/overviewloginpage']);

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

  
  this.StoreLoginUsers=new LoginUsers;
  this.APICall.UpdatedSelectedPath('./Common/overviewloginpage');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreLoginUsers.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreLoginUsers));

  this.router.navigate(['Common/overviewloginpage']);

  // this.router.navigate(['Accounting/CreateReceipts']);

  // var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  // this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
  // this.UpdatedSelectedPath('./Sales/CreateCustomerType');

  // this.router.navigate(['Sales/CreateCustomerType']);
}

   get f() { 
     return this.Loginuserspage
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreLoginUsers=new LoginUsers;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreLoginUsers=( result[0] );

 
  this.ViewandSearchLoginUsers();

}else{

  this.ViewandSearchLoginUsers();
}



  }

ngAfterViewInit(){

   
     
    
  }


  lstlogin:any=[];
  lstDbResult:any  = [];
  ViewandSearchLoginUsers()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewLoginUsers",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstlogin=[]; 
          if(this.lstDbResult.Table.length>0)
          {
            this.lstlogin=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchLoginUsers();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var username=this.getControlValue(this.f.username,"string");
  var usernameDBField="";
 

 
  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="username")
    {
      usernameDBField=this.lstSerchableFields[i].DBField;
    }
 
  }
debugger;
      if(this.SerchType=='Like')
      {

 
        
        if(username!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+usernameDBField+" Like'"+username+"%'"):(usernameDBField+" Like'"+username+"%'");
        }
       


      }
      else{
       
       
       

        if(username!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+usernameDBField+" ='"+username+"'"):(usernameDBField+" ='"+username+"'");
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
