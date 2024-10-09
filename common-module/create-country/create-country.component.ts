import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from 'src/app/store/Coutry';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";

//mport * as Cart from "./../store/actions";
@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css']
})
export class CreateCountryComponent implements OnInit {
 
  //#region "View constructor"
  CreateCountry:FormGroup;
  //todo$: Observable<any>;
  constructor( private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) { 


   // this.todo$ = store.pipe(select('Country'));


    this.CreateCountry=this.formBuilder.group(
  
      {
    
        countrycode:new FormControl(''),
        CountryId:new FormControl(0),
        countryname:new FormControl('',[Validators.required])
    
      });


    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }  
  }
 //#endregion "View constructor"
  
 
  

 
  GetCountryDetById($event)
  {
    debugger;
this.f.CountryId.setValue($event);
  }

//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateCountry.invalid)
{
  var  Cvalid=true;
  

  if(this.f.countryname.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('countryname');
    Cvalid=false;
  }




  return;
}
else
{
 this.SaveCountry();
}
}
//#endregion "OnSave"
//#region "Save Country"
DbResult:any  = [];
SaveCountry(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   
   +'<CountryId>'+this.getControlValue(this.f.CountryId,'int')+'</CountryId>'
     +'<countryname>'+this.getControlValue(this.f.countryname,'string')+'</countryname>'
     +'<countrycode>'+this.getControlValue(this.f.countrycode,'string')+'</countrycode>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("SaveCountry",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.CountryId.value>0)
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

       
      this.f.CountryId.setValue(this.DbResult.Table[0].CountryId);
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
 text: 'Country Already Exists.!',
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
  
        that.SaveCountry();
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

  this.APICall.UpdatedSelectedPath('./Common/Country');
  this.router.navigate(['Common/Country']);
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



DeleteCountry()
{


  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<CountryId>'+this.getControlValue(this.f.CountryId,'int')+'</CountryId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<countryname>'+this.getControlValue(this.f.countryname,'string')+'</countryname>'
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteCountry",xml1,"","","").subscribe(
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

      that.DeleteCountry();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });


 

}

//#endregion "Delete Country"

//#region "Clear ViewData"

ClearViewData()
{
  //this.CountryId=0;
  this.ModifiedDate="";
  this.CreateCountry.patchValue({
    countryname:"",
    countrycode:"",
    CountryId:0
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
    return this.CreateCountry
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  StoreCountry: Country;
//  countrydet: Observable<Array<MCountry.Contry>>[];
  ngOnInit() {
debugger;

this.StoreCountry=new Country;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {

      
      this.StoreCountry = result[0]
      this.ModifiedDate = this.StoreCountry.ModifiedDate.toString();
    
      this.submitted= Boolean(this.StoreCountry.submitted);
      this.CreateCountry.patchValue(this.StoreCountry);
    }

  var that=this;

     this.CreateCountry.valueChanges.subscribe(value => {
     that.StoreCountry.countrycode=value.countrycode;
     that.StoreCountry.countryname=value.countryname;
     that.StoreCountry.ViewName='country';
      that.StoreCountry.CountryId=value.CountryId.toString();
      that.StoreCountry.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
    that.StoreCountry.submitted=that.submitted;
    that.StoreCountry.TabId=ActivatedRoute;
      that.store.dispatch(new  TabStore.AddTab(that.StoreCountry));
 });


   this.DeviceType= localStorage.getItem('DeviceType')
  
  }

    //#endregion "View OnInit"
  
    //#region "After View Init"
    ngAfterViewInit(){

   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='Country')
      {
        
        
 //this.CountryId=ViewData.CountryId;
this.ModifiedDate=ViewData.ModifiedDate;
this.CreateCountry.patchValue(ViewData);
debugger

      }
      // else{
      //   this.f.CountryId.setValue(0);
      //   //this.CountryId=0;
      //   this.ModifiedDate="";
      // }
    
  }
  // else{
  //   this.f.CountryId.setValue(0);
  //   this.ModifiedDate="";
  // }
    
  }
//#endregion "After View Init"
}
