import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APICallingService } from 'src/app/apicalling.service';
import * as $ from 'jquery';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";
import * as AppSettings from '../../../assets/Appsettings/AppSettings';


import    '../../../assets/vendors/datepicker/daterangepicker.js';
import    "../../../assets/vendors/datepicker/daterangepicker.css";
@Component({
  selector: 'app-create-branches',
  templateUrl: './create-branches.component.html',
  styleUrls: ['./create-branches.component.css']
})
export class CreateBranchesComponent implements OnInit {
  errormsg="";
  showError=false;
  CreateBranches:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService)
  { 


    
this.CreateBranches=formBuilder.group(
  
  {
    
    Code:new FormControl('',[Validators.required]),
    Name:new FormControl(),
    HolidayCalendarID:new FormControl(''),
    Email:new FormControl(''),
    State:new FormControl(''),
    City:new FormControl(''),
    PinCode:new FormControl(''),
    ContactNo:new FormControl(''),
  


    Address:new FormControl(''),

    BranchTimingsID:new FormControl(),
    WeekName:new FormControl(),
    From:new FormControl(),
    To:new FormControl(), 
    SearchString:new FormControl(''),

  });


  }
  
 //#endregion "View constructor"
  
  ID=0;
 // ImageServerPath="";
//   GetCategoryDetById($event)
//   {
//     debugger;
// this.ID=$event;
//   }
//#region "Scroll To Invalid Control"
windowScroll(ControlName)
{
  var element = document.getElementById(ControlName); 
var rect = element.getBoundingClientRect();

window.scrollTo(rect.left, rect.top);
}

//#endregion "Scroll To Invalid Control"


//#region "OnSave"
submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
  
if(this.CreateBranches.invalid)
{
  var  Cvalid=true;
  

  if(this.f.Code.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('Code');
    Cvalid=false;
  }




  return;
}
else
{
 this.SaveBranches();
}
}
//#endregion "OnSave"
//#region "Save Category"
DbResult:any  = [];
lstbranchTimePropL:any =[];
SaveBranches(){

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();

   var xml1='<NewDataSet><Table1>'
   +'<ID>'+this.ID+'</ID>'
   +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
   +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
   +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
   
   +'<Code>'+this.getControlValue(this.f.Code,'string')+'</Code>'
   +'<Name>'+this.getControlValue(this.f.Name,'string')+'</Name>'
   +'<ContactNo>'+this.getControlValue(this.f.ContactNo,'string')+'</ContactNo>'

   +'<Email>'+this.getControlValue(this.f.Email,'string')+'</Email>'

   +'<State>'+this.getControlValue(this.f.State,'string')+'</State>'
   +'<City>'+this.getControlValue(this.f.City,'string')+'</City>'

   +'<PinCode>'+this.getControlValue(this.f.PinCode,'string')+'</PinCode>'
   +'<HolidayCalendarID>'+this.getControlValue(this.f.HolidayCalendarID,'string')+'</HolidayCalendarID>'

     +'<Address>'+this.getControlValue(this.f.Address,'string')+'</Address>'
     
     +'</Table1></NewDataSet>';

     var xml2="";
     var rows="";

     for(var i=0;i<this.lstbranchTimePropL.length;i++)
     {

      rows=rows+'<Table1><ID>'+this.lstbranchTimePropL[i].ID+ '</ID>'
     +'<WeekName>'+this.lstbranchTimePropL[i].WeekName+ '</WeekName>'
     +'<From>'+this.lstbranchTimePropL[i].From+ '</From>'
     +'<To>'+this.lstbranchTimePropL[i].To+ '</To></Table1>'
     
     }
     xml2='<NewDataSet>'+rows+'</NewDataSet>';

debugger;
  this.APICall.DBCalling("SaveBranch",xml1,xml2,"","").subscribe(
    (res:Response) => 
    {

      debugger;
      $("#loaderParent").hide();
      this.DbResult= (res);
        
      if(this.DbResult.tasks[0].length>0 && this.DbResult.tasks[0][0].DBresult>0)
      {
      if(this.ID>0)
      {
        this.ModifiedDate=this.DbResult.tasks[0][0].ModifiedDate;
       (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Updated successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
   }else{
    //  this.CreateBranches.patchValue({

       
       this.ID=this.DbResult.tasks[0][0].ID;
       this.ModifiedDate=this.DbResult.tasks[0][0].ModifiedDate;
 
          //  });
           (window as any).swal({
       icon: 'success',
       title: 'Information!',
       text: 'Record Saved successfully.',
       buttonsStyling: false,
       confirmButtonClass: 'btn btn-lg btn-success'
   });
   }

       debugger;
        this.lstbranchTimePropL=null;
        this.lstbranchTimePropL  = [];
        if(this.DbResult.tasks.length>1 && this.DbResult.tasks[1].length>0 )
        {

          var res1=(( this.DbResult.tasks[1][0].Result).replace(/\n/g, "")).replace(/'/g,"\"");


this.lstbranchTimePropL=JSON.parse(res1);


      //    this.lstbranchTimePropL=this.DbResult.tasks[1];
 
        }
         
     }else{



if(this.DbResult.tasks[0][0].DBresult==-3)
{
(window as any).swal({
 icon: 'warning',
 title: 'Exists',
 text: 'Branch Already Exists.!',
 confirmButtonText: 'Dismiss',
 buttonsStyling: false,
 confirmButtonClass: 'btn btn-lg btn-warning'
});
}else{

  if(this.DbResult.tasks[0][0].DBresult==-5)
  {


    var that=this;
    debugger;
    // (window as any).swal({
    //   icon: 'error',
    //   title: 'Treansaction modified by other User!',
    //   text: 'failed.!',
    //   confirmButtonText: 'Dismiss',
    //   buttonsStyling: false,
    //   confirmButtonClass: 'btn btn-lg btn-danger'
    //  });
    (window as any).swal({
      icon: "warning",
      title:  "Treansaction modified by "+this.DbResult.tasks[0][0].ModifiedBy+"! ",
      text:"Do you wants to overwrite?",
   
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
    
      if (isConfirm) {
  
        that.ModifiedDate=that.DbResult.tasks[0][0].ModifiedDate;
  
        that.SaveBranches();
      }else {
        (window as any). swal("Cancelled", "this file is not updated :)", "error");
      }
  
  
    });
  

   
  }else
  {

// (window as any).swal({
//  icon: 'error',
//  title: 'Error!',
//  text: 'failed.!',
//  confirmButtonText: 'Dismiss',
//  buttonsStyling: false,
//  confirmButtonClass: 'btn btn-lg btn-danger'
// });
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
//Clear BranchTimmings//"

BranchTimmingValuesClear()
{

  this.CreateBranches.patchValue({
    BranchID:0,
    From:0,
    To:0,
    ID:0
    
   
  });
  
 // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO=this.lstbranchTimePropL.length+1;

}

//#searchLogic//"

SearchClick()
{

this.GetSearchDetails();

}



//#region "Search"

Search()
{
  
  this.router.navigate(['Common/Branches']);
}



PrepareSerchStringByField()
{

  var Name=this.getControlValue(this.f.Model,"string");

  debugger;
      if(this.SerchType=='Like')
      {
  
        
        if(Name!="")
        {
          for(var  i=0;i<this.lstbranchTimePropL.length;i++)
             {
  
              if ((this.lstbranchTimePropL[i].WeekName).toString().includes(Name)  )
              {
  
  
              
              this.lstbranchTimePropL[i].Show='true';
             }else{
              this.lstbranchTimePropL[i].Show='false';
  
  
             }
        }
      }
  
        
      }
      else{
       
        if(Name!="")
        {
          for(var  i=0;i<this.lstbranchTimePropL.length;i++)
             {
  
              if ((this.lstbranchTimePropL[i].WeekName)==(Name)  )
              {
  
  
              
              this.lstbranchTimePropL[i].Show='true';
             }else{
              this.lstbranchTimePropL[i].Show='false';
  
  
             }
        }
        }
  
        
      }





}

FilterType='All'
GetSearchDetails()
{

  debugger;
  var  SearchString="";
  if(this.FilterType!='All')
  {
    this.PrepareSerchStringByField();
  }
  else
  {
    SearchString=  this.getControlValue(this.f.SearchString,"string")
  
    for(var  i=0;i<this.lstbranchTimePropL.length;i++)
    {
  
     if (
       
      (this.lstbranchTimePropL[i].WeekName).toString().includes(SearchString)  ||
      (this.lstbranchTimePropL[i].From).toString().includes(SearchString)  ||
      (this.lstbranchTimePropL[i].To).toString().includes(SearchString)  
     
      //(this.lstbranchTimePropL[i].ExcessRsPerKms).toString().includes(SearchString)  
      )
     {
  
  
     
     this.lstbranchTimePropL[i].Show='true';
    }else{
     this.lstbranchTimePropL[i].Show='false';
  
  
    }
  }
  
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
 

//#region "Delete Category"



DeleteBranches()
{


  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<ID>'+this.ID+'</ID>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<Name>'+this.getControlValue(this.f.Name,'string')+'</Name>'
  +'</Table1></NewDataSet>';

  this.APICall.DBCalling("DeleteBranch",xml1,"","","").subscribe(
    (res:Response) => {

      $("#loaderParent").hide();
      this.DbResult= (res);
      if(this.DbResult.tasks[0].length>0 && this.DbResult.tasks[0][0].DBresult>0)
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

      that.DeleteBranches();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }

  });

}

//#endregion "Delete Category"

//#region "Clear ViewData"

ClearViewData()
{
  this.ID=0;
  this.ModifiedDate="";
  this.CreateBranches.patchValue({
    Code:""
    ,Name:""
   , HolidayCalendarID:""
   , Email:""
    ,State:""
   , City:""
   , PinCode:""
   , ContactNo:""

    ,Address:""


    });

  this.BranchTimmingValuesClear();
    this.lstbranchTimePropL  = [];
    $('#drpHolidayCalender').val(null).trigger('change');
   // $("#Image").attr("src","");
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
    return this.CreateBranches
   .controls;
  }
  ModifiedDate="";

  //#region "View OnInit"
  DeviceType="";

  
  ngOnInit() {


   this.DeviceType= localStorage.getItem('DeviceType')
   debugger;
   var ViewData=this.APICall.GetViewData();
   

   if(ViewData!=undefined &&   typeof(ViewData)!=undefined && typeof(ViewData.ViewName)!=undefined )
   {
      // JSON.parse(ViewData).forEach(item => {

        debugger;
      if(ViewData.ViewName=='Branch')
      {
        this.CreateBranches.patchValue({
          Code:ViewData.Code
        ,Name:ViewData.Name
        ,HolidayCalendarID:ViewData.HolidayCalendarID
        ,ContactNo:ViewData.ContactNo
        ,Email:ViewData.Email

        ,State:ViewData.State
        ,City:ViewData.City
        ,PinCode:ViewData.PinCode
        ,Address:ViewData.Address
        });
        this.ID=ViewData.ID;
this.ModifiedDate=ViewData.ModifiedDate;
debugger;


if(ViewData.BranchTiming!=null && typeof(ViewData.BranchTiming)!=undefined)
{
var res=((ViewData.BranchTiming).replace(/\n/g, "")).replace(/'/g,"\"");


this.lstbranchTimePropL=JSON.parse(res);
}
      }
      else{

        this.ID=0;
        this.ModifiedDate="";
      }
    // });
  }else{
    this.ID=0;
    this.ModifiedDate="";
  }
    
  }

    //#endregion "View OnInit"
  
    LoadHolidayCalender()
    {
      debugger;
      (<any> $("#drpHolidayCalender")).select2({
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
       return JSON.stringify( {"Operation": 'HolidayCalendars', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :'' })
           
          }
          ,
          contentType: 'application/json; charset=utf-8',
          processResults: function (response) {
           
       
          debugger;
       
       var yourArrayData=response['tasks'][0];
       
             var  data = $.map(yourArrayData, function (obj) {
        
         obj.id = obj.ID; 
         obj.text = obj.Name; 
         return obj;
       });
       
       
     
            return {
          
       
               results: data
       
            };
          },
          cache: false
          
         }
         
         //,minimumInputLength: 3
        });
       
        var CalenderSelection = new Option(this.getControlValue(this.f.Code,'string'),this.getControlValue(this.f.HolidayCalendarID,'int'), true, true);
 (<any> $('#drpHolidayCalender')).append(CalenderSelection).trigger('change');

 // manually trigger the `select2:select` event
 (<any> $('#drpHolidayCalender')).trigger({
     type: 'select2:select',
    params: {
         data: CalenderSelection
     }
 });
//#endregion "MakeValueAsign"
       var that =this;
       $('#drpHolidayCalender').on('select2:select', function (e) {
       
       
       if(typeof((<any>e).params.data.ID)!='undefined')
       {
       that.CreateBranches.patchValue({
        HolidayCalendarID : (<any>e).params.data.ID
       });
       //that.MakeName=(<any>e).params.data.DiscountName;
       that.CreateBranches.controls.HolidayCalendarID.markAsDirty();
     }
     
      
       });
       
     
       $("#drpHolidayCalender").on("select2:unselecting", function(e) {
        
       
         that.CreateBranches.patchValue({
          HolidayCalendarID : 0
           });
     
       
       });
    }


    //#region "After View Init"
    ngAfterViewInit(){
      
   this.LoadHolidayCalender();


  // $("#Image").attr("src",this.APICall.ImagePath+this.getControlValue(this.f.Image,'string'));
  }
//#endregion "After View Init"
EditRecNO=-1;
//#region "Package Line Items"
SNO=0;

OnAdd()
{}
ValidateBranchTimings():boolean
{
  debugger;
var validate=true;
this.showError=false;


if(
 this.getControlValue(this.f.WeekName,'int')!="0" 
&& (+this.getControlValue(this.f.From,'int'))>0
&& this.getControlValue(this.f.To,'int')!="0"
)
{
  debugger;
  for(var  i=0;i<this.lstbranchTimePropL.length;i++)
  {
if( this.EditRecNO!=this.lstbranchTimePropL[i].SNO && this.lstbranchTimePropL[i].WeekName==this.getControlValue(this.f.WeekName,'int'))
{
  validate=false;
  this.showError=true;
  this.errormsg="Already exists!";
  break;
  
}  

}
}else
{
  validate=false;
  this.showError=true;
  this.errormsg="Invalid Data!";
}
return validate;
}

EditBranchTimingClick(selectedRecord,SNO)
{

  debugger;
  this.EditRecNO=SNO;
  this.SNO=SNO;
  this.CreateBranches.patchValue({
    
    WeekName:selectedRecord.WeekName,
    From:selectedRecord.From,
    To:selectedRecord.To,
    BranchTimingsID:selectedRecord.ID
  });
} 

RemoveBranchTiming()
{
debugger;

  var  sliceIndex=-1;
  for(var  i=0;i<this.lstbranchTimePropL.length;i++)
  {
   this.lstbranchTimePropL[i].Show='true';
 
   if(this.lstbranchTimePropL[i].SNO==this.EditRecNO)
   {
   sliceIndex=i;
   }
  }
if(sliceIndex>-1)
{
  this.lstbranchTimePropL.splice(sliceIndex, 1);

  for(var  i=0;i<this.lstbranchTimePropL.length;i++)
  {
    this.lstbranchTimePropL[i].SNO=i+1;
  }
}

  this.EditRecNO=-1;
  this.SNO=this.lstbranchTimePropL.length+1;
           this.BranchTimmingValuesClear();

}


AddBranchTimmings(type)
{
  debugger;
if(this.ValidateBranchTimings())
{

//let WeekName:string= this.from

 for(var  i=0;i<this.lstbranchTimePropL.length;i++)
 {
  this.lstbranchTimePropL[i].Show='true';

 
  if(this.lstbranchTimePropL[i].SNO==this.EditRecNO)
  {
    
  //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
   this.lstbranchTimePropL[i].BranchID=this.ID;
    this.lstbranchTimePropL[i].BranchID=this.getControlValue(this.f.BranchID,'int');
    this.lstbranchTimePropL[i].WeekName=this.getControlValue(this.f.WeekName,'string');
    this.lstbranchTimePropL[i].From=this.getControlValue(this.f.From,'int');
    this.lstbranchTimePropL[i].To=this.getControlValue(this.f.To,'int');
 
  }
 }
if(this.EditRecNO==-1)
{
  var res=
           ({
            SNO: this.SNO
           , ID:0

           ,BranchID:this.ID
           ,WeekName:this.getControlValue(this.f.WeekName,'string')
           ,From:this.getControlValue(this.f.From,'int')
           ,To:this.getControlValue(this.f.To,'int')
          
           ,Show:'true'
           });

if(this.lstbranchTimePropL.length==0)
{
  this.lstbranchTimePropL=[res];

}
else{
  this.lstbranchTimePropL.push(res);
  
}
}
this.EditRecNO=-1;

           this.BranchTimmingValuesClear();

           if(type=='Close')
           {
             $("#btnClosePackageItems").trigger('click');
           }

           this.SNO=this.lstbranchTimePropL.length+1;
}

}


}
