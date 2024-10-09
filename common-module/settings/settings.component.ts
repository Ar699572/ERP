import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Settings } from 'src/app/store/Settings';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  Settings:FormGroup;
  
  
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {
    this.Settings=formBuilder.group(
      {
        SearchString:new FormControl(''),
        AccountGroupMappingId:new FormControl(0),
        AccountGroupId:new FormControl(''),
        Name:new FormControl(''),
        SNO:new FormControl(''),
        LineChanges:new FormControl(0),
        LineChanges1:new FormControl(0),
        AccountId:new FormControl(0),
        AccountName:new FormControl(''),
        DefaultAccountId:new FormControl(0),
        AccountGroupName:new FormControl(''),


       

      });
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      }
    }
      ID=0;
      windowScroll(ControlName)
      {
        var element = document.getElementById(ControlName); 
      var rect = element.getBoundingClientRect();

      window.scrollTo(rect.left, rect.top);
      }
      GetCountryDetById($event)
      {
        debugger;
        
        this.f.AccountGroupMappingId=$event;
      }
  LoadAccountGroupMapping()
   {
   var that=this;
   debugger;

   (<any> $('#drpAccountGroupMapping')).select2({
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
   return JSON.stringify( {"Operation": 'ViewAccounts',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
       
      }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {
       
   
        debugger;
   
   var ResultData=(JSON.parse(response['Message'])).Table;
   
         var  data = $.map(ResultData, function (obj) {
         
          obj.id = obj.AccountGroupId; 
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
   debugger;
    var AccountSelection = new Option(this.f.AccountGroupName.value,this.f.AccountGroupId.value.toString(), true, true);

    (<any> $('#drpAccountGroupMapping')).append(AccountSelection).trigger('change');



   $('#drpAccountGroupMapping').on('select2:select', function (e) {
   
   debugger;

  
   if(typeof((<any>e).params.data.id)!='undefined')
   {
    debugger;
 
  // that.CountryId = (<any>e).params.data.id;
  
   that.f.AccountGroupId.setValue( (<any>e).params.data.id);
   that.f.AccountGroupName.setValue( (<any>e).params.data.text);
   
   
 }
 
  
   });
   
 
   $('#drpAccountGroupMapping').on("select2:unselecting", function(e) {
    debugger;
   
    that.f.AccountGroupId.setValue(0);
    that.f.AccountGroupName.setValue("");
    
   });

  

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
   return JSON.stringify( {"Operation": 'ViewChartOfAccounts', "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
       
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
    
 
   that.f.AccountId.setValue( (<any>e).params.data.id);
   that.f.AccountName.setValue( (<any>e).params.data.text);
   
 }
 
  
   });
   var Bankselection = new Option(this.f.AccountName.value,this.f.AccountId.value.toString(), true, true);
 
   (<any> $('#drpDefultAccount')).append(Bankselection).trigger('change');
 
   $("#drpDefultAccount").on("select2:unselecting", function(e) {
    
   
    that.f.AccountId.setValue(0);
    that.f.AccountName.setValue('');
   
   });

}

ModifiedDate="";
//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.Settings.invalid)
{
  var  Cvalid=true;
  

  if(this.f.Name.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('Name');
    Cvalid=false;
  }


  return;
}
else
{
 this.SaveAccount();
}
}
//#endregion "OnSave"
//#region "Save CustomerType"
DbResult:any  = [];
SaveAccount(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   
   +'<AccountGroupMappingId>'+this.getControlValue(this.f.AccountGroupMappingId,'int')+'</AccountGroupMappingId>'
     +'<AccountGroupId>'+this.getControlValue(this.f.AccountGroupId,'string')+'</AccountGroupId>'
     +'<AccountGroupName>'+this.getControlValue(this.f.AccountGroupName,'string')+'</AccountGroupName>'
     +'<Name>'+this.getControlValue(this.f.Name,'string')+'</Name>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

     var xml2='<NewDataSet><Table1>'
   
     +'<DefaultAccountId>'+this.getControlValue(this.f.DefaultAccountId,'int')+'</DefaultAccountId>'
       +'<AccountId>'+this.getControlValue(this.f.AccountId,'string')+'</AccountId>'
       +'<AccountName>'+this.getControlValue(this.f.AccountName,'string')+'</AccountName>'
       +'<Name>'+this.getControlValue(this.f.Name,'string')+'</Name>'
       +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
       +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
       +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
       +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
       +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
       +'</Table1></NewDataSet>';
     
debugger;
  this.APICall.DBCalling("SaveAccountGroupMapping",xml1,xml2,"","").subscribe(
    (res:Response) => {
      $("#loaderParent").hide();
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.AccountGroupMappingId.value>0||this.f.DefaultAccountId.value>0)
      {
        this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
       (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Updated successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
   }
  //  else{
  //   //  this.CreateCustomerType.patchValue({

  //      this.f.AccountGroupMappingId.setValue(this.DbResult.Table[0].AccountGroupMappingId);
  //      this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
 
  //         //  });
  //          (window as any).swal({
  //      icon: 'success',
  //      title: 'Information!',
  //      text: 'Record Saved successfully.',
  //      buttonsStyling: false,
  //      confirmButtonClass: 'btn btn-lg btn-success'
  //  });
  //  }

       
             
     }else{



if(this.DbResult.Table[0].DBresult==-3)
{
(window as any).swal({
 icon: 'warning',
 title: 'Exists',
 text: 'CustomerType Already Exists.!',
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
  
        that.SaveAccount();
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


   lstDbResult:any  = [];
   ViewAccountGroupMapping()
   {
   
    
     if(AppSettings.ShowLoaderOnView)
       {
       $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
    
    $("#loaderParent").show();
       }
       var sstring=(this.GetSearchString());
      debugger;
       this.APICall.DBCalling("AccountGroupMappingView",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
         (res:Response) => {
           debugger;
           this.lstDbResult=JSON.parse(res['Message']);
           
           this.lstAccountGroupMapping=[];
           this.lstDefaultAccount=[];
           if(this.lstDbResult.Table.length>0)
           {
             this.lstAccountGroupMapping=this.lstDbResult.Table;
            this.lstDefaultAccount=this.lstDbResult.Table1;
   //this.AddSequenceNumber('');
              
           }
           if(this.lstDbResult.Table1.length>0)
           {
            this.lstDefaultAccount=this.lstDbResult.Table1;
           }
   
           $("#loaderParent").hide();
         });
   }
   Search()
{

var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
this.APICall.UpdatedSelectedPath('./Common/Settings');
this.router.navigate(['Common/Settings']);

}

SNO=1;
AccountDetailsClear()
{
  this.Settings.patchValue({
    
  });
  this.SNO=this.lstAccountGroupMapping.length+1;
 // $('#drpVehicleModel').val(null).trigger('change');
   
}
DefultAccountDetailsClear()
{
  this.Settings.patchValue({
    
  });
  this.SNO=this.lstDefaultAccount.length+1;
}

   FilterType='All'
   GetSearchString():string
{
  debugger;
  var  SearchString="";
  if(this.FilterType !='All')
  {
    //SearchString=this.PrepareSerchStringByField();
  }
  else
  {
    SearchString=  this.getControlValue(this.f.SearchString,"string")
  }
  return SearchString;
}
SerchType='Like'
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
  EditRecNO=-1;

  EditAccount(selectedRecord,SNO)
{

  debugger;
  this.EditRecNO=SNO;
  this.SNO=SNO;
  this.Settings.patchValue({

    AccountGroupId:selectedRecord.AccountGroupId,
    AccountGroupName:selectedRecord.AccountGroupName,
    Name:selectedRecord.Name,
    AccountGroupMappingId:selectedRecord.AccountGroupMappingId,
    SNO:selectedRecord.SNO
    
  });

  var AccountSelection = new Option(this.f.AccountGroupName.value,this.f.AccountGroupMappingId.value.toString(), true, true);

  (<any> $('#drpAccountGroupMapping')).append(AccountSelection).trigger('change');
  

} 
EditDefultAccount(selectedRecord,SNO)
{

  debugger;
  this.EditRecNO=SNO;
  this.SNO=SNO;
  this.Settings.patchValue({

    AccountId:selectedRecord.AccountId,
    AccountName:selectedRecord.AccountName,
    //Name:selectedRecord.Name,
    DefaultAccountId:selectedRecord.DefaultAccountId,
    SNO:selectedRecord.SNO
    
  });
  var Bankselection = new Option(this.f.AccountName.value,this.f.AccountId.value.toString(), true, true);
 
  (<any> $('#drpDefultAccount')).append(Bankselection).trigger('change');
  

}
AddAccount(type)
{
  //debugger;

//   if(this.ValidateAccountDetails())
//  {
//let WeekName:string= this.from
debugger;
//let WeekName:string= this.from

 for(var  i=0;i<this.lstAccountGroupMapping.length;i++)
 {
   this.lstAccountGroupMapping[i].Show='true';

 
  if(this.lstAccountGroupMapping[i].SNO==this.EditRecNO)
  {
    
  //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
   this.lstAccountGroupMapping[i].AccountGroupMappingId=this.getControlValue(this.f.AccountGroupMappingId,'int');

   this.lstAccountGroupMapping[i].Name=this.getControlValue(this.f.Name,'string');
    this.lstAccountGroupMapping[i].AccountGroupId=this.getControlValue(this.f.AccountGroupId,'string');
    this.lstAccountGroupMapping[i].AccountGroupName=this.getControlValue(this.f.AccountGroupName,'string');

  }
 }
if(this.EditRecNO==-1)
{
  var res2=
           ({
            SNO:this.SNO
           ,AccountGroupMappingId:this.getControlValue(this.f.AccountGroupMappingId,'int')
           ,Name:this.getControlValue(this.f.Name,'string')
           ,AccountGroupId:this.getControlValue(this.f.AccountGroupId,'string')
           ,AccountGroupName:this.getControlValue(this.f.AccountGroupName,'string')

           //,Show:'true'
           });

if(this.lstAccountGroupMapping.length==0)
{
  this.lstAccountGroupMapping=[res2];

}
else{
  this.lstAccountGroupMapping.push(res2);
  
}
}
this.EditRecNO=-1;

           this.AccountDetailsClear();

           if(type=='Close')
           {
             $("#btnCloseAccountItems").trigger('click');
           }

           this.SNO=this.lstAccountGroupMapping.length+1;
         // }
           this.f.LineChanges.setValue(0);
}
AddDefultAccount(type)
{
  //debugger;

//   if(this.ValidateAccountDetails())
//  {
//let WeekName:string= this.from
debugger;
//let WeekName:string= this.from

 for(var  i=0;i<this.lstDefaultAccount.length;i++)
 {
   this.lstDefaultAccount[i].Show='true';

 
  if(this.lstDefaultAccount[i].SNO==this.EditRecNO)
  {
    
  //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
   this.lstDefaultAccount[i].AccountId=this.getControlValue(this.f.AccountId,'int');

   this.lstDefaultAccount[i].AccountName=this.getControlValue(this.f.AccountName,'string');
    this.lstDefaultAccount[i].DefaultAccountId=this.getControlValue(this.f.DefaultAccountId,'int');
   // this.lstDefaultAccount[i].AccountGroupName=this.getControlValue(this.f.AccountGroupName,'string');

  }
 }
if(this.EditRecNO==-1)
{
  var res3=
           ({
            SNO:this.SNO
           ,AccountId:this.getControlValue(this.f.AccountId,'int')
           ,NaAccountNameme:this.getControlValue(this.f.AccountName,'string')
           ,DefaultAccountId:this.getControlValue(this.f.DefaultAccountId,'int')
           //,AccountGroupName:this.getControlValue(this.f.AccountGroupName,'string')

           //,Show:'true'
           });

if(this.lstDefaultAccount.length==0)
{
  this.lstDefaultAccount=[res3];

}
else{
  this.lstDefaultAccount.push(res3);
  
}
}
this.EditRecNO=-1;

           this.DefultAccountDetailsClear();

           if(type=='Close')
           {
             $("#btnCloseBankDefaultAccountName").trigger('click');
           }

           this.SNO=this.lstDefaultAccount.length+1;
         // }
           this.f.LineChanges1.setValue(0);
}

showError=false;
errormsg="";

  getControlValue(Control,Type):string
   {

    var Value=(Type=="string"?"":"0");
     if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
     {
       Value=Control.value;
     }
   
     return Value;
   }
  lstAccountGroupMapping:any=[];
  lstDefaultAccount:any=[];
 
  DeviceType="";
  StoreSettings: Settings;
  ngOnInit() {
    this.DeviceType= localStorage.getItem('DeviceType')

    this.StoreSettings=new Settings;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) { 

      this.StoreSettings = result[0]
     
    
      this.submitted= Boolean(this.StoreSettings.submitted);
      this.Settings.patchValue(this.StoreSettings);
    }
 
    debugger;
    var that=this;
  
this.lstDefaultAccount=this.StoreSettings.lstDefaultAccount;
    this.lstAccountGroupMapping=this.StoreSettings.lstAccountGroupMapping;
    
    this.Settings.valueChanges.subscribe(value => {

      debugger;
      that.StoreSettings.Name=value.Name;
      that.StoreSettings.AccountGroupName=value.AccountGroupName;
      that.StoreSettings.AccountGroupId=value.AccountGroupId;  
      that.StoreSettings.AccountGroupMappingId=value.AccountGroupMappingId;   
      
      that.StoreSettings.AccountId=value.AccountId;   
      that.StoreSettings.AccountName=value.AccountName;   
      
     
      

  that.StoreSettings.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
      
   that.StoreSettings.submitted=that.submitted;
   that.StoreSettings.TabId=ActivatedRoute;
     that.store.dispatch(new  TabStore.AddTab(that.StoreSettings));
  });

  }

  ngAfterViewInit()
  {
debugger;
(<any> $("#drpDefultAccount")).select2();
this.LoadAccounts();

this.LoadAccountGroupMapping();
this.ViewAccountGroupMapping();

  }


  SearchClick()
  {

  }

  
  get f()
  { 
   return this.Settings.controls;
  
 } 

} 





