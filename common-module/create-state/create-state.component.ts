import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APICallingService } from 'src/app/apicalling.service';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/State';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";

//import {DropdownCountryComponent } from '../../ApplicationControls/dropdown-country/dropdown-country.component';
@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  CreateState:FormGroup;
  DisplayCountryId="";
  DispalyCountryName="";
  SelectedCountryId="";
  SelectedCountryName="";
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.CreateState=formBuilder.group(
  
      {
    
        statecode:new FormControl(''),
        StateId:new FormControl(0),
        Statename:new FormControl('',[Validators.required])
        ,country:new FormControl('',[Validators.required])
        ,notes:new FormControl('')
    
      });

  }

   

 //#endregion "View constructor"
  
 ///StateId=0;
  
  GetCountryDetById($event)
  {
    debugger;
    this.f.StateId.setValue($event);
  }



//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateState.invalid)
{
  var  Cvalid=true;
  

  if(this.f.Statename.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('Statename');
    Cvalid=false;
  }




  return;
}
else
{
 this.SaveState();
}
}
//#endregion "OnSave"
//#region "Save Country"
DbResult:any  = [];
SaveState(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   
   +'<StateId>'+this.getControlValue(this.f.StateId,'string')+'</StateId>'
     +'<Statename>'+this.getControlValue(this.f.Statename,'string')+'</Statename>'
     +'<statecode>'+this.getControlValue(this.f.statecode,'string')+'</statecode>'
     +'<country>'+this.getControlValue(this.f.country,'int')+'</country>'
     +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("SaveState",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.StateId.value>0)
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

       
       this.f.StateId.setValue(this.DbResult.Table[0].StateId);
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
 text: 'State Already Exists.!',
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
  
        that.SaveState();
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

  this.APICall.UpdatedSelectedPath('./Common/State');

  this.router.navigate(['Common/State']);
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



DeleteState()
{

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<StateId>'+this.getControlValue(this.f.StateId,'string')+'</StateId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<Statename>'+this.getControlValue(this.f.Statename,'string')+'</Statename>'
 
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteState",xml1,"","","").subscribe(
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

      that.DeleteState();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });


 

}

//#endregion "Delete Country"

//#region "Clear ViewData"

ClearViewData()
{
  //this.StateId=0;
  this.ModifiedDate="";
  this.CreateState.patchValue({
    Statename:"",
    statecode:"",
    country:"",
    notes:"",
    StateId:0

    });

    this.DisplayCountryId="0";
    this.DispalyCountryName="";

    this.StoreState=new State;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreState.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StoreState));
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
  this.SelectedCountryName=event.text;
  this.f.country.setValue(event.id);
}
  get f() { 
    return this.CreateState
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  StoreState: State;
  ngOnInit() {


    this.StoreState=new State;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {

      
      this.StoreState = result[0]
      this.ModifiedDate = this.StoreState.ModifiedDate.toString();
    this.DispalyCountryName= this.StoreState.countryname;
    this.SelectedCountryName= this.StoreState.countryname;
    this.DisplayCountryId= this.StoreState.country;
      this.submitted= Boolean(this.StoreState.submitted);
      this.CreateState.patchValue(this.StoreState);
    }


    var that=this;

    this.CreateState.valueChanges.subscribe(value => {

      debugger;
    that.StoreState.Statename=value.Statename;

    that.StoreState.statecode=value.statecode;
     that.StoreState.StateId=value.StateId
     that.StoreState.country=value.country

     that.StoreState.notes=value.notes
     that.StoreState.ViewName='State';
that.StoreState.countryname=that.SelectedCountryName
     that.DisplayCountryId==value.country
     that.StoreState.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StoreState.submitted=that.submitted;
   that.StoreState.TabId=ActivatedRoute;
     that.store.dispatch(new  TabStore.AddTab(that.StoreState));
});

   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='State')
      {
        // this.CreateState.patchValue({
        //   Statename:ViewData.Statename,
        //   statecode:ViewData.statecode,
        //   country:ViewData.country,
        //   notes:ViewData.notes

        // });


      
        debugger;
        this.DisplayCountryId=ViewData.country;
        this.DispalyCountryName=ViewData.countryname;
        this.SelectedCountryName=ViewData.countryname;
        this.CreateState.patchValue(ViewData);
        this.f.StateId.setValue(ViewData.StateId);
this.ModifiedDate=ViewData.ModifiedDate;
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
