import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NumberSequencyForm } from 'src/app/store/NumberSequence';
import { formatDate } from '@angular/common';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
@Component({
  selector: 'app-create-number-sequency-form',
  templateUrl: './create-number-sequency-form.component.html',
  styleUrls: ['./create-number-sequency-form.component.css']
})


export class CreateNumberSequencyFormComponent implements OnInit {

  //#region "View constructor"
  CreateSequency:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) { 


    this.CreateSequency=formBuilder.group(
  
      {
        name:new FormControl('',[Validators.required]),
    
        prefix:new FormControl(''),
        suffix:new FormControl(''),
        startfrom:new FormControl(''),
        separator:new FormControl(''),
        increment:new FormControl(''),
      
        SequenceNumberId:new FormControl(0),

        notes:new FormControl('')
        
    
      });

  }
 //#endregion "View constructor"
  
 //SequenceNumberId=0;
  
  GetCountryDetById($event)
  {
    debugger;
this.f.SequenceNumberId.setValue=$event;
  }



//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;

    this.submitted=true;
  
if(this.CreateSequency.invalid)
{
  var  Cvalid=true;
  

  if(this.f.name.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('name');
    Cvalid=false;
  }




  return;
}
else
{
 this.SaveSequence();
}
}
//#endregion "OnSave"
//#region "Save Country"

DbResult:any  = [];
SaveSequence(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
  //  if(this.ModifiedDate.toString().includes('India'))
  //  {
   
  //    var date = new  Date (this.ModifiedDate);
   
     
  //    this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
  //  }
   var xml1='<NewDataSet><Table1>'
   
  // +'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'string')+'</SequenceNumberId>'
   +'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'string')+'</SequenceNumberId>'
     +'<name>'+this.getControlValue(this.f.name,'string')+'</name>'
     +'<prefix>'+this.getControlValue(this.f.prefix,'string')+'</prefix>'
     +'<suffix>'+this.getControlValue(this.f.suffix,'string')+'</suffix>'
     +'<startfrom>'+this.getControlValue(this.f.startfrom,'string')+'</startfrom>'
     +'<separator>'+this.getControlValue(this.f.separator,'string')+'</separator>'
     +'<increment>'+this.getControlValue(this.f.increment,'string')+'</increment>'
     
     +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
    +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("SaveSequence",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.SequenceNumberId.value>0)
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

       
       this.f.SequenceNumberId.setValue(this.DbResult.Table[0].SequenceNumberId);
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
 text: 'Sequence Already Exists.!',
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
  
        that.SaveSequence();
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
// UpdatedSelectedPath(strUrl)
// {
// debugger;
//   var ApplicationLivePagesLocal=  JSON.parse(localStorage.getItem("ApplicationLivePages"));
   
// if(ApplicationLivePagesLocal!=null &&  ApplicationLivePagesLocal.length>0  )
// {
//       for(let i=0;i<ApplicationLivePagesLocal.length;i++)
//       {
//       if(ApplicationLivePagesLocal[i]._IsActive==true)
//       {
//         ApplicationLivePagesLocal[i]._Url=strUrl;
// //this.ApplicationLivePages=ApplicationLivePagesLocal;

//         localStorage.setItem("ApplicationLivePages",JSON.stringify(ApplicationLivePagesLocal));
      
//         break;
//       }


// }
// }
// }
Search()
{
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
  this.APICall.UpdatedSelectedPath('./Common/NumberSequencyForm');
  this.router.navigate(['Common/NumberSequencyForm']);
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



DeleteSequence()
{


  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'string')+'</SequenceNumberId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
+'<name>'+this.getControlValue(this.f.name,'string')+'</name>'
+'<prefix>'+this.getControlValue(this.f.prefix,'string')+'</prefix>'
+'<suffix>'+this.getControlValue(this.f.suffix,'string')+'</suffix>'
+'<startfrom>'+this.getControlValue(this.f.startfrom,'string')+'</startfrom>'
+'<separator>'+this.getControlValue(this.f.separator,'string')+'</separator>'
+'<increment>'+this.getControlValue(this.f.increment,'string')+'</increment>'

+'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'

  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
  +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteSequence",xml1,"","","").subscribe(
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

      that.DeleteSequence();
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
  this.CreateSequency.patchValue({
    name:"",
    prefix:"",
    suffix:"",
    startfrom:"",
    separator:"",
    
    increment:"",
    notes:"",
    SequenceNumberId:0,
    });
    this.StoreNumberSequencyForm=new NumberSequencyForm;
    this.APICall.UpdatedSelectedPath('./Common/CreateNumberSequencyForm');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
    this.StoreNumberSequencyForm.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreNumberSequencyForm));
  
  
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
    return this.CreateSequency
   .controls;
  }


  //#region "View OnInit"
  ModifiedDate="";
  DeviceType="";
  StoreNumberSequencyForm: NumberSequencyForm;
  ngOnInit() {
    this.StoreNumberSequencyForm=new NumberSequencyForm;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {

      
      this.StoreNumberSequencyForm = result[0]
      this.ModifiedDate = this.StoreNumberSequencyForm.ModifiedDate.toString();
   
      this.submitted= Boolean(this.StoreNumberSequencyForm.submitted);

      this.CreateSequency.patchValue(this.StoreNumberSequencyForm);
  }

  debugger;
  if(this.StoreNumberSequencyForm.ModifiedDate.toString()=="")
  {
    var date = new  Date ();
  
  
    this.StoreNumberSequencyForm.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    this.ModifiedDate=this.StoreNumberSequencyForm.ModifiedDate;
  }
  
  // if(this.StoreNumberSequencyForm.ModifiedDate.toString().includes('India'))
  // {
  
  //   var date = new  Date (this.StoreNumberSequencyForm.ModifiedDate);
  
  
  //   this.StoreNumberSequencyForm.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
  // }
  var that=this;

  this.CreateSequency.valueChanges.subscribe(value => {

    debugger;
  
   that.StoreNumberSequencyForm.name=value.name.toString();
   that.StoreNumberSequencyForm.prefix=value.prefix.toString();
   that.StoreNumberSequencyForm.suffix=value.suffix.toString();
   that.StoreNumberSequencyForm.startfrom=value.startfrom.toString();
   that.StoreNumberSequencyForm.separator=value.separator.toString();
   that.StoreNumberSequencyForm.increment=value.increment.toString();
   that.StoreNumberSequencyForm.SequenceNumberId=value.SequenceNumberId.toString();
    that.StoreNumberSequencyForm.notes=value.notes.toString();

    that.StoreNumberSequencyForm.ViewName='NumberSequency';
    if(that.StoreNumberSequencyForm.ModifiedDate.toString()=="" || that.StoreNumberSequencyForm.ModifiedDate.toString()== null )
  {
    var date = new  Date ();
  
  
    that.StoreNumberSequencyForm.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
  }
    this.ModifiedDate=that.StoreNumberSequencyForm.ModifiedDate;

 
  // that.StoreNumberSequencyForm.ModifiedDate=that.ModifiedDate;
   //that.StoreNumberSequencyForm.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
 that.StoreNumberSequencyForm.submitted=that.submitted;
 that.StoreNumberSequencyForm.TabId=ActivatedRoute;
   that.store.dispatch(new  TabStore.AddTab(that.StoreNumberSequencyForm));
  });
    //#endregion "View OnInit"
  
    //#region "After View Init"

    this.DeviceType= localStorage.getItem('DeviceType')
    debugger;
    var ViewData=this.APICall.GetViewData();
 
 
    if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
    {
       // JSON.parse(ViewData).forEach(item => {
 
         debugger;
       if(ViewData.ViewName=='SequenceNumber')
       {
         this.CreateSequency.patchValue({
           name:ViewData.name,
           prefix:ViewData.prefix,
           suffix:ViewData.suffix,
           startfrom:ViewData.startfrom,
           SequenceNumberId:ViewData.SequenceNumberId,
           separator:ViewData.separator,
           increment:ViewData.increment,
           notes:ViewData.notes
         });
        //  this.SequenceNumberId=ViewData.SequenceNumberId;
 this.ModifiedDate=ViewData.ModifiedDate;
       }
     
       else{
  
        //  this.SequenceNumberId=0;
        //  this.ModifiedDate="";
       }
       
     // });
   }else{
    //  this.SequenceNumberId=0;
    //  this.ModifiedDate="";
   }
  } 
 




    ngAfterViewInit(){

   
  }
//#endregion "After View Init"
}