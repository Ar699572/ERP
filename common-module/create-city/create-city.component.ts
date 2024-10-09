import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { city } from 'src/app/store/city';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit {
 
  //#region "View constructor"
  DisplayCountryId="";
  DispalyCountryName="";
  DisplayStateId="";
  DispalyStateName="";
  
  SelectedCountryName="";
  SelectedStateName="";
  CreateCity:FormGroup;

  SelectedCountryId="";
 
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) { 

   
    this.CreateCity=formBuilder.group(
  
      {
    
        Citycode:new FormControl(''),
        CityId:new FormControl(0),
        Cityname:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        state:new FormControl(''),
        notes:new FormControl(''),
    
      });

  }
 //#endregion "View constructor"
  
 //CityId=0;
  
  GetcityDetById($event)
  {
    debugger;
    this.f.CityId.setValue($event);
  }
//#region "Scroll To Invalid Control"
// windowScroll(ControlName)
// {
//   var element = document.getElementById(ControlName); 
// var rect = element.getBoundingClientRect();

// window.scrollTo(rect.left, rect.top);
// }

//#endregion "Scroll To Invalid Control"


//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateCity.invalid)
{
  var  Cvalid=true;
  

  if(this.f.Cityname.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('Cityname');
    Cvalid=false;
  }




  return;
}
else
{
 this.Savecity();
}
}
//#endregion "OnSave"
//#region "Save city"
DbResult:any  = [];
Savecity(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   +'<CityId>'+this.getControlValue(this.f.CityId,'string')+'</CityId>'
   +'<Citycode>'+this.getControlValue(this.f.Citycode,'string')+'</Citycode>'
   +'<country>'+this.getControlValue(this.f.country,'string')+'</country>'
   +'<state>'+this.getControlValue(this.f.state,'string')+'</state>'
   +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
 
  
     +'<Cityname>'+this.getControlValue(this.f.Cityname,'string')+'</Cityname>'
   
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("Savecity",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.CityId.value>0)
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
    //  this.Createcity.patchValue({

       
       this.f.CityId.setValue(this.DbResult.Table[0].CityId);
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
 text: 'city Already Exists.!',
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
  
        that.Savecity();
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
//#endregion "Save city"

//#region "Search"
UpdatedSelectedPath(strUrl)
{
debugger;
  var ApplicationLivePagesLocal=  JSON.parse(localStorage.getItem("ApplicationLivePages"));
   
if(ApplicationLivePagesLocal!=null &&  ApplicationLivePagesLocal.length>0  )
{
      for(let i=0;i<ApplicationLivePagesLocal.length;i++)
      {
      if(ApplicationLivePagesLocal[i]._IsActive==true)
      {
        ApplicationLivePagesLocal[i]._Url=strUrl;
//this.ApplicationLivePages=ApplicationLivePagesLocal;

        localStorage.setItem("ApplicationLivePages",JSON.stringify(ApplicationLivePagesLocal));
      
        break;
      }


}
}
}
Search()
{
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
  this.APICall.UpdatedSelectedPath('./Common/City');
  this.router.navigate(['Common/City']);
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
 

//#region "Delete city"



Deletecity()
{


  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<CityId>'+this.getControlValue(this.f.CityId,'string')+'</CityId>'




  +'<Cityname>'+this.getControlValue(this.f.Cityname,'string')+'</Cityname>'


+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
 
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("Deletecity",xml1,"","","").subscribe(
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

      that.Deletecity();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });


 

}

//#endregion "Delete city"

//#region "Clear ViewData"

ClearViewData()
{
 // this.CityId=0;
  this.ModifiedDate="";
  this.CreateCity.patchValue({
    Cityname:"",
    Citycode:"",
    country:"",
    state:"",
    notes:"",
    CityId:0

    });
    this.DisplayCountryId="0";
    this.DispalyCountryName="";
    this.DisplayStateId="0";
    this.DispalyStateName="";

    this.Storecity=new city;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.Storecity.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.Storecity));
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


CountryValueChange(event)
{
debugger;
this.SelectedCountryId=event.id;
  this.SelectedCountryName=event.text;
  
  this.f.country.setValue(event.id);
  
}

StateValueChange(event)
{
debugger;
  this.SelectedStateName=event.text;
  
  this.f.state.setValue(event.id);
}


  get f() { 
    return this.CreateCity
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  Storecity: city;
  ngOnInit() {

    this.Storecity=new city;
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    if (result.length > 0) {

      
      this.Storecity = result[0]
      this.ModifiedDate = this.Storecity.ModifiedDate.toString();
    this.DispalyCountryName= this.Storecity.countryname.toString();
    this.SelectedCountryName= this.Storecity.countryname.toString();
    this.DisplayCountryId= this.Storecity.country;
    this.SelectedCountryId= this.Storecity.country;
    this.DispalyStateName= this.Storecity.statename.toString();
    this.SelectedStateName= this.Storecity.statename.toString();
    this.DisplayStateId= this.Storecity.state.toString();

      this.submitted= Boolean(this.Storecity.submitted);
      this.CreateCity.patchValue(this.Storecity);
    }


    var that=this;

    this.CreateCity.valueChanges.subscribe(value => {

      debugger;
    that.Storecity.Cityname=value.Cityname;

    that.Storecity.Citycode=value.Citycode;
     that.Storecity.CityId=value.CityId.toString();
     that.Storecity.country=value.country.toString();
     that.Storecity.state=value.state.toString();

     that.Storecity.notes=value.notes.toString();
     that.Storecity.ViewName='city';
that.Storecity.countryname=that.SelectedCountryName.toString();
that.Storecity.statename=that.SelectedStateName.toString();
     that.DisplayCountryId=value.country.toString();
     that.DisplayStateId=value.state.toString();
     that.Storecity.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.Storecity.submitted=that.submitted;
   that.Storecity.TabId=ActivatedRoute;
     that.store.dispatch(new  TabStore.AddTab(that.Storecity));
});



   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='City')
      {
        // this.CreateCity.patchValue({
        //   Cityname:ViewData.Cityname,
        //   Citycode:ViewData.Citycode,
        //   country:ViewData.country,
        //   state:ViewData.state,
        //   notes:ViewData.notes,

         
        // });
        debugger;
        this. SelectedCountryId=ViewData.country;

        this.DisplayCountryId=ViewData.country;
      
        this.DispalyCountryName=ViewData.countryname;
        this.SelectedCountryName=ViewData.countryname;
        this.DisplayStateId=ViewData.state;
        this.DispalyStateName=ViewData.statename;
        this.SelectedStateName=ViewData.statename;
        this.CreateCity.patchValue(ViewData);
      //  this.f.CityId.setValue(ViewData.CityId);
this.ModifiedDate=ViewData.ModifiedDate;
      }
      // else{

      //   this.CityId=0;
      //   this.ModifiedDate="";
      // }
    // });
  }
  // else{
  //   this.CityId=0;
  //   this.ModifiedDate="";
  // }
  //   var that =this;

//   this.CreateCity.controls.country.valueChanges.subscribe(value =>
//     {
//      that.SelectedCountryID="";
    
   
//       that.DisplayStateId="0";
//       that.DispalyStateName="";

//       that.SelectedCountryId=value;
    


// }




// ); 
  
  }

    //#endregion "View OnInit"
  
    //#region "After View Init"
    ngAfterViewInit(){

  



  }
//#endregion "After View Init"
}
