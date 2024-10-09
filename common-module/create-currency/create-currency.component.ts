import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Currency } from 'src/app/store/Currency';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";

@Component({
  selector: 'app-create-currency',
  templateUrl: './create-currency.component.html',
  styleUrls: ['./create-currency.component.css']
})
export class CreateCurrencyComponent implements OnInit {
  CreateCurrency:FormGroup;
  DisplayCountryId="";
  DispalyCountryName="";
  SelectedCountryName="";
  SelectedCountryId="";
  
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.CreateCurrency=formBuilder.group(
  
      {
    
        Currencycode:new FormControl(''),
        Symbol:new FormControl(''),
        CurrencyId:new FormControl(0),
        Currencyname:new FormControl('',[Validators.required])
        ,  country:new FormControl('',[Validators.required])
        ,  notes:new FormControl('')
    
      });

  }

   

 //#endregion "View constructor"
  
 //CurrencyId=0;
  
  GetCountryDetById($event)
  {
    debugger;
this.f.CurrencyId.setValue=$event;
  }



//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateCurrency.invalid)
{
  var  Cvalid=true;
  

  if(this.f.Currencyname.invalid && Cvalid)
  {
    debugger;
    this.APICall.ScrollToControl('Currencyname');
    Cvalid=false;
  }




  return;
}
else
{
 this.SaveCurrency();
}
}
//#endregion "OnSave"
//#region "Save Country"
DbResult:any  = [];
SaveCurrency(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   
   +'<CurrencyId>'+this.getControlValue(this.f.CurrencyId,'string')+'</CurrencyId>'
     +'<Currencyname>'+this.getControlValue(this.f.Currencyname,'string')+'</Currencyname>'
     +'<Currencycode>'+this.getControlValue(this.f.Currencycode,'string')+'</Currencycode>'
     +'<Symbol>'+this.getControlValue(this.f.Symbol,'string')+'</Symbol>'
     +'<country>'+this.getControlValue(this.f.country,'int')+'</country>'
     +'<notes>'+this.getControlValue(this.f.notes,'string')+'</notes>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';

debugger;
  this.APICall.DBCalling("SaveCurrency",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.CurrencyId.value>0)
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

       
       this.f.CurrencyId.setValue(this.DbResult.Table[0].CurrencyId);
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
  
        that.SaveCurrency();
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
//#region "Search"

Search()
{
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
  this.APICall.UpdatedSelectedPath('./Common/Currency');
  this.router.navigate(['Common/Currency']);
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



DeleteCurrency()
{

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<CurrencyId>'+this.getControlValue(this.f.CurrencyId,'string')+'</CurrencyId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<Currencyname>'+this.getControlValue(this.f.Currencyname,'string')+'</Currencyname>'
 
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteCurrency",xml1,"","","").subscribe(
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

      that.DeleteCurrency();
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
  this.CreateCurrency.patchValue({
    Currencyname:"",
    Currencycode:"",
    country:"",
    notes:"",
    Symbol:"",
    CurrencyId:0


    });
    this.DisplayCountryId="0";
    this.DispalyCountryName="";
    
    this.StoreCurrency=new Currency;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreCurrency.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StoreCurrency));
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


  get f() { 
    return this.CreateCurrency
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";
  StoreCurrency: Currency;
  ngOnInit() {


    
    this.StoreCurrency=new Currency;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    
    if (result.length > 0) {

      
      this.StoreCurrency = result[0]
      this.ModifiedDate = this.StoreCurrency.ModifiedDate.toString();
    this.DispalyCountryName= this.StoreCurrency.countryname.toString();
    this.SelectedCountryName= this.StoreCurrency.countryname.toString();
    this.DisplayCountryId= this.StoreCurrency.country.toString();
      this.submitted= Boolean(this.StoreCurrency.submitted);
      this.CreateCurrency.patchValue(this.StoreCurrency);
    }


    var that=this;

    this.CreateCurrency.valueChanges.subscribe(value => {

      debugger;
    that.StoreCurrency.Currencycode=value.Currencycode;

    that.StoreCurrency.Symbol=value.Symbol;
     that.StoreCurrency.Currencyname=value.Currencyname
     that.StoreCurrency.country=value.country

     that.StoreCurrency.notes=value.notes
     that.StoreCurrency.ViewName='currency';

that.StoreCurrency.countryname=that.SelectedCountryName
     that.StoreCurrency.DisplayCountryId=value.country
     that.StoreCurrency.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StoreCurrency.submitted=that.submitted;
   that.StoreCurrency.TabId=ActivatedRoute;
     that.store.dispatch(new  TabStore.AddTab(that.StoreCurrency));
});


   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();


   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='Currency')
      {
        // this.CreateCurrency.patchValue({
        //   Currencyname:ViewData.Currencyname,
        //   Currencycode:ViewData.Currencycode,
        //   country:ViewData.country,
        //   notes:ViewData.notes,
        //   Symbol:ViewData.Symbol,

        // });
        debugger;
        this.DisplayCountryId=ViewData.country;
        this.DispalyCountryName=ViewData.countryname;
        this.SelectedCountryName=ViewData.countryname;
        this.CreateCurrency.patchValue(ViewData);
        //this.f.StateId.setValue(ViewData.StateId);
this.ModifiedDate=ViewData.ModifiedDate;
      }
      else{

        // this.CurrencyId=0;
        // this.ModifiedDate="";
      }
    // });
  }else{
    // this.CurrencyId=0;
    // this.ModifiedDate="";
  }
  
  }

    //#endregion "View OnInit"
  
    //#region "After View Init"
    ngAfterViewInit(){

   
    
  }
//#endregion "After View Init"
}
