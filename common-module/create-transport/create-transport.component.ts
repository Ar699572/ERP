import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Transport } from 'src/app/store/Transport';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-transport',
  templateUrl: './create-transport.component.html',
  styleUrls: ['./create-transport.component.css']
})
export class CreateTransportComponent implements OnInit {

  //#region "View constructor"
  CreateTransport:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) { 


    this.CreateTransport=formBuilder.group(
  
      {
        Transportername:new FormControl('',[Validators.required]),
        TransporterId:new FormControl(0),
        area:new FormControl(''),
        notes:new FormControl('')
        
      });

  }
 //#endregion "View constructor"
  
 //TransporterId=0;
  
  GetCountryDetById($event)
  {
    debugger;
this.f.TransporterId.setValue=$event;
  }



//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateTransport.invalid)
{
  var  Cvalid=true;
  

  if(this.f.Transportername.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('Transportername');
    Cvalid=false;
  }


  return;
}
else
{
 this.SaveTransporter();
}
}
//#endregion "OnSave"
//#region "Save Country"
DbResult:any  = [];
SaveTransporter(){
debugger;
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   
   +'<TransporterId>'+this.getControlValue(this.f.TransporterId,'string')+'</TransporterId>'
     +'<Transportername>'+this.getControlValue(this.f.Transportername,'string')+'</Transportername>'
     +'<area>'+this.getControlValue(this.f.area,'string')+'</area>'
     +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
    +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';
debugger;
  this.APICall.DBCalling("SaveTransporter",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.TransporterId.value>0)
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

       
       this.f.TransporterId.setValue(this.DbResult.Table[0].TransporterId);
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
 text: 'Transporter Already Exists.!',
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
  
        that.SaveTransporter();
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
  this.APICall.UpdatedSelectedPath('./Common/Transport');
  this.router.navigate(['Common/Transport']);
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
 
//#region "Delete Country"

DeleteTransporter()
{

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<TransporterId>'+this.getControlValue(this.f.TransporterId,'string')+'</TransporterId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<Transportername>'+this.getControlValue(this.f.Transportername,'string')+'</Transportername>'
  +'<area>'+this.getControlValue(this.f.area,'string')+'</area>'
  +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
  +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteTransporter",xml1,"","","").subscribe(
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

      that.DeleteTransporter();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });


}

//#endregion "Delete Country"

//#region "Clear ViewData"

ClearViewData()
{
 
  this.ModifiedDate="";
  this.CreateTransport.patchValue({
    Transportername:"",
    area:"",
    notes:"",
    TransporterId:0
    });
    
  this.StoreTransport=new Transport;
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreTransport.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StoreTransport));
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
    return this.CreateTransport
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  StoreTransport: Transport;

  ngOnInit() {

    
    this.StoreTransport=new Transport;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {

      
      this.StoreTransport = result[0]
      this.ModifiedDate = this.StoreTransport.ModifiedDate.toString();
   
      this.submitted= Boolean(this.StoreTransport.submitted);
      this.CreateTransport.patchValue(this.StoreTransport);
    }
    if(this.StoreTransport.ModifiedDate.toString().includes('India'))
    {
    
      var date = new  Date (this.StoreTransport.ModifiedDate);
    
    
      this.StoreTransport.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }

    var that=this;

    this.CreateTransport.valueChanges.subscribe(value => {

      debugger;
    
     that.StoreTransport.Transportername=value.Transportername
     that.StoreTransport.area=value.area
     that.StoreTransport.ViewName='Transport';

     that.StoreTransport.notes=value.note


     that.StoreTransport.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StoreTransport.submitted=that.submitted;
   that.StoreTransport.TabId=ActivatedRoute;
     that.store.dispatch(new  TabStore.AddTab(that.StoreTransport));
});


   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='Transporter')
      {
         this.CreateTransport.patchValue({
          Transportername:ViewData.Transportername,
          area:ViewData.area,
          TransporterId:ViewData.TransporterId,
           notes:ViewData.notes
         });
        //this.TransporterId=ViewData.TransporterId;
this.ModifiedDate=ViewData.ModifiedDate;
      }
      else{

        // this.TransporterId=0;
        // this.ModifiedDate="";
      }
    // });
  }else{
    // this.TransporterId=0;
    // this.ModifiedDate="";
  }
  
  }

    //#endregion "View OnInit"
  
    //#region "After View Init"
    ngAfterViewInit(){

  
    
  }
//#endregion "After View Init"
}
