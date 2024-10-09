import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Customertype } from 'src/app/store/Customertype';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css"
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-customer-type',
  templateUrl: './create-customer-type.component.html',
  styleUrls: ['./create-customer-type.component.css']
})
export class CreateCustomerTypeComponent implements OnInit {

  //#region "View constructor"
  CreateCustomerType:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) { 


    this.CreateCustomerType=formBuilder.group(
  
      {
    
        CustomerTypeId:new FormControl(0),
        typename:new FormControl('',[Validators.required]),
        notes:new FormControl('')
    
      });

  }
 //#endregion "View constructor"
 Search()
 {


   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
 this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
 this.APICall.UpdatedSelectedPath('./Sales/CustomerType');
   
   this.router.navigate(['Sales/CustomerType']);
 }
// CustomerTypeId=0;
  
  GetCustomerTypeDetById($event)
  {
    debugger;
this.f.CustomerTypeId.setValue=$event;
  }



//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateCustomerType.invalid)
{
  var  Cvalid=true;
  

  if(this.f.typename.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('typename');
    Cvalid=false;
  }




  return;
}
else
{
 this.SaveCustomerType();
}
}
//#endregion "OnSave"
//#region "Save CustomerType"
DbResult:any  = [];
SaveCustomerType(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   
   +'<CustomerTypeId>'+this.getControlValue(this.f.CustomerTypeId,'string')+'</CustomerTypeId>'
     +'<typename>'+this.getControlValue(this.f.typename,'string')+'</typename>'
     +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
     
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("SaveCustomerType",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.CustomerTypeId.value>0)
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
    //  this.CreateCustomerType.patchValue({

       
       this.f.CustomerTypeId.setValue(this.DbResult.Table[0].CustomerTypeId);
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

   //this.router.navigate(['Sales/CustomerType']);
             
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
  
        that.SaveCustomerType();
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
//#endregion "Save CustomerType"

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
 

//#region "Delete CustomerType"



DeleteCustomerType()
{


  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<CustomerTypeId>'+this.getControlValue(this.f.CustomerTypeId,'string')+'</CustomerTypeId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<typename>'+this.getControlValue(this.f.typename,'string')+'</typename>'
  +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteCustomerType",xml1,"","","").subscribe(
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

      that.DeleteCustomerType();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });


 

}

//#endregion "Delete CustomerType"

//#region "Clear ViewData"

ClearViewData()
{
  
  this.ModifiedDate="";
  this.CreateCustomerType.patchValue({
    typename:"",
    notes:"",
    CustomerTypeId:0 

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
    return this.CreateCustomerType
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  StoreCustomertype: Customertype;
  ngOnInit() {

    this.StoreCustomertype=new Customertype;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {

      
      this.StoreCustomertype = result[0]
      this.ModifiedDate = this.StoreCustomertype.ModifiedDate.toString();
    
      this.submitted= Boolean(this.StoreCustomertype.submitted);
      this.CreateCustomerType.patchValue(this.StoreCustomertype);
    }

    if(this.StoreCustomertype.ModifiedDate.toString().includes('India'))
    {
    
      var date = new  Date (this.StoreCustomertype.ModifiedDate);
    
    
      this.StoreCustomertype.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }
    var that=this;

    this.CreateCustomerType.valueChanges.subscribe(value => {

      debugger;
    that.StoreCustomertype.typename=value.typename;
    that.StoreCustomertype.ViewName='Customertype';
    that.StoreCustomertype.notes=value.notes;


     that.StoreCustomertype.CustomerTypeId=value.CustomerTypeId.toString();
     
     


     that.StoreCustomertype.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StoreCustomertype.submitted=that.submitted;
   that.StoreCustomertype.TabId=ActivatedRoute;
     that.store.dispatch(new  TabStore.AddTab(that.StoreCustomertype));
});

   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='CustomerType')
      {
        // this.CreateState.patchValue({
        //   Statename:ViewData.Statename,
        //   statecode:ViewData.statecode,
        //   country:ViewData.country,
        //   notes:ViewData.notes

        // });


      
        debugger;
       
        this.CreateCustomerType.patchValue(ViewData);
        this.f.CustomerTypeId.setValue(ViewData.CustomerTypeId);
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

    
  }
//#endregion "After View Init"
}
