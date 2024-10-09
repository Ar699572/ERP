import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import {ActivatedRoute, Router } from '@angular/router';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import * as XLSX from 'xlsx'; 
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";
import    '../../../assets/vendors/datepicker/daterangepicker.js';
import    "../../../assets/vendors/datepicker/daterangepicker.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import    "../../../assets/vendors/datepicker/daterangepicker.css";
import    '../../../assets/vendors/datepicker/daterangepicker.js';
import { Store } from '@ngrx/store';
import { StoreDC } from 'src/app/Store/StoreDC';
import { StoreAccountingSettings } from 'src/app/Store/StoreAccountingSettings';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Customer } from 'src/app/store/Customer';

@Component({
  selector: 'app-create-dc',
  templateUrl: './create-dc.component.html',
  styleUrls: ['./create-dc.component.css']
})
export class CreateDcComponent implements OnInit {
  CreateDC:FormGroup;
  TransactionType="Sales";
  DisplayCustomerId=0;
  DispalyCustomerName="";
  DisplaySequenceNumberId=0;
  DispalyFormName='DC';
  ReferenceType="";
  ReferenceNo="";
  DCData:any;
  DispalyTransactionDate = '';
  DisplayTransactionNo = '';
  selectedCustomer:Customer;
  QuotDateChange(e)
  {}
  constructor(private DbCallings:CommonDbCallings,private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {


this.CreateDC=formBuilder.group(


  {
    SequenceNumberId:new FormControl(0),
    Contactno:new FormControl(''),
    Email:new FormControl('',[Validators.email]),
    RequiredDate:new FormControl('',[Validators.required]),
    Billto:new FormControl(''),
    Shipto:new FormControl(0), 
    ShiptoAddress:new FormControl(''), 
    Terms:new FormControl(''),
    TermsandConditions:new FormControl(''),
    PaymentTerms:new FormControl(''),
    TransactionTime:new FormControl('',[Validators.required]),
    TransactionDate:new FormControl('',[Validators.required]),
    TransactionId:new FormControl(0),
    TransactionNo:new FormControl(''),
    TransporterId:new FormControl(0),
    Quotation:new FormControl(''),
    PartyId:new FormControl(0,[Validators.required,Validators.min(1)]),
    PartyName:new FormControl(''),
    TransportId:new FormControl('0'),
    Area:new FormControl(''),
    TransportName:new FormControl(''),
    BillRefNo:new FormControl(''),
    AllowChanges:new FormControl(1),
ChargesCOAId:new FormControl('0'),
ChargesCOAName:new FormControl(''),
ChargesAmount:new FormControl('0'),
ChargesNarration:new FormControl(''),
ChargesCGSTPer:new FormControl('0'),
ChargesCGSTAmount:new FormControl('0'),
ChargesSGSTPer:new FormControl('0'),
ChargesSGSTAmount:new FormControl('0'),
ChargesIGSTPer:new FormControl('0'),
ChargesIGSTAmount:new FormControl('0'),
TotalCharges:new FormControl('0'),
SACCode:new FormControl(''),
transportername:new FormControl(''),

    LineChanges:new FormControl(0),
    SearchString:new FormControl(''),
    searchPartNo:new FormControl(''),
    searchDescription:new FormControl(''),
    searchMake:new FormControl(''),
    searchHSN:new FormControl(''),
    InvoiceType:new FormControl('')

  }
);
// setInterval(() => {
//   debugger;
  this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
  this.f.TransactionTime.setValue(this.CurrentTime);
//}, 1);


this.router.routeReuseStrategy.shouldReuseRoute = function(){
  return false;
}  

   }
   lstSelectedTaxdet:any=[];
   GstTaxbyHSNAndState(SACCode)
   {
   if(SACCode!='')
   
   {
     debugger;
     $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
      
     $("#loaderParent").show();
   
   
     this.APICall.DBCalling("GstTaxbyHSNAndState",SACCode,this.TaxType,this.TransactionDate,this.APICall.GetCompanyID()).subscribe(
       (res:Response) => {
         debugger;
         this.lstSelectedTaxdet=[];
         this.lstSelectedTaxdet=JSON.parse(res['Message']);
       
         
        
         if(this.lstSelectedTaxdet.Table.length>0)
         {
           this.lstSelectedTaxdet=this.lstSelectedTaxdet.Table;
         }
          this.SelectedChargesCalc();
         $("#loaderParent").hide();
       });
      }else
      {
        this.SelectedChargesCalc();
      }
   
   }

   SelectedChargesCalc()
   {
     debugger;
   
    var TotalTax=0;
    var ChargesAmount=(+this.f.ChargesAmount.value);
   
   
   
   
   
   
   
   
   for (let i=0;i<  this.lstSelectedTaxdet.length;i++)
   {
   if(this.lstSelectedTaxdet[i].TaxType=="CGST")
   {
     this.f.ChargesCGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
     this.f.ChargesCGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2)*ChargesAmount)/100);
   
     TotalTax=TotalTax+((+ this.f.ChargesCGSTAmount.value));
   
   }
   
   if(this.lstSelectedTaxdet[i].TaxType=="SGST")
   {
     this.f.ChargesSGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
     this.f.ChargesSGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2)*ChargesAmount)/100);
     TotalTax=TotalTax+((+ this.f.ChargesSGSTAmount.value));
   
   }
   
   if(this.lstSelectedTaxdet[i].TaxType=="IGST")
   {
     this.f.ChargesIGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
     this.f.ChargesIGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2)*ChargesAmount)/100);
     TotalTax=TotalTax+((+ this.f.ChargesIGSTAmount.value));
   }
   
   
   }
   
this.f.TotalCharges.setValue(ChargesAmount+TotalTax);
this.CalculateTotals();
   }
   

   ChargesAccountGroup='';//'Direct Expenses (Expenses (Direct))';
   lstCharges:any=[];

   DisplayCgargesCOAId=0;
   DispalyChargesAccountName=''
   EditChRecNO=-1;

   SNOCh=0;

   EditCharges(selectedRecord,SNO)
   {

    this.EditChRecNO=SNO;
    this.SNOCh=SNO;

    this.CreateDC.patchValue({  

      ChargesCOAId:selectedRecord.ChargesCOAId,
      ChargesCOAName:selectedRecord.ChargesCOAName,
      ChargesAmount:selectedRecord.ChargesAmount,
      ChargesNarration:selectedRecord.ChargesNarration,
      SACCode:selectedRecord.SACCode
    });
    try
{
    this.GstTaxbyHSNAndState(selectedRecord.SACCode);
}catch(e)
{

}
    this.DisplayCgargesCOAId=selectedRecord.ChargesCOAId;
    this.DispalyChargesAccountName=selectedRecord.ChargesCOAName;
   }
AccountValueChange(data)
{

  this.f.ChargesCOAId.setValue(data.COAId);
  this.f.ChargesCOAName.setValue(data.Name);
  this.DisplayCgargesCOAId=data.COAId;
  this.DispalyChargesAccountName=data.Name;
  this.f.SACCode.setValue(data.SACCode);
  this.GstTaxbyHSNAndState(data.SACCode);
}

RemoveCharges()
{
  var  sliceIndex=-1;

let lstCharges=[];
this.lstCharges.forEach((element ,index)=> {
  lstCharges[index]={...element};
});

this.lstCharges=lstCharges;
  for(var  i=0;i<this.lstCharges.length;i++)
  {
   this.lstCharges[i].Show='true';
 
   if(this.lstCharges[i].SNO==this.EditChRecNO)
   {
   sliceIndex=i;
   }
  }
if(sliceIndex>-1)
{
  this.lstCharges.splice(sliceIndex, 1);

  for(var  i=0;i<this.lstCharges.length;i++)
  {
    this.lstCharges[i].SNO=i+1;
  }
}

  this.EditChRecNO=-1;
  this.SNOCh=this.lstCharges.length+1;
  this.f.LineChanges.setValue(1);
  $("#btnCloseDCCharges").click();
  this.CalculateTotals();
}
showchargesError=false;
chargeserrormsg="";
ValidateCharges():boolean
  {
    debugger;
    var validate=true;
    this.showchargesError=false;
   
    if(
     this.getControlValue(this.f.ChargesCOAName,'string')!="" 
    && this.getControlValue(this.f.ChargesAmount,'string')!=""
   
    && this.getControlValue(this.f.ChargesAmount,'int')!="0"
   


    )
    {
      debugger;
      for(var  i=0;i<this.lstCharges.length;i++)
      {
    if( this.EditChRecNO!=this.lstCharges[i].SNO &&
       this.lstCharges[i].ChargesCOAName==this.getControlValue(this.f.ChargesCOAName,'string')
       )
    {
      validate=false;
      this.showchargesError=true;
      this.chargeserrormsg="Already exists!";
      break;
      
    }  
    
    }
    }else
    {
      validate=false;
      this.showchargesError=true;
      this.chargeserrormsg="Invalid Data!";
    }
    return validate;



  }
  OnChargesAdd()
  {

    this.f.ChargesCOAId.setValue(0);
               this.f.ChargesCOAName.setValue('');
               this.f.ChargesAmount.setValue(0);
               this.f.SACCode.setValue('');
               this.f.ChargesCGSTPer.setValue(0);
               this.f.ChargesCGSTAmount.setValue(0);
               this.f.ChargesSGSTPer.setValue(0);
               this.f.ChargesSGSTAmount.setValue(0);
               this.f.ChargesIGSTPer.setValue(0);
               this.f.ChargesIGSTAmount.setValue(0);
               this.f.TotalCharges.setValue(0);

               this.f.ChargesNarration.setValue(''); 
               this.DisplayCgargesCOAId=0;
               this.DispalyChargesAccountName='';
  }

  AddCharges(type)
  {

      debugger;
    if(this.ValidateCharges())
    {
    
    //let WeekName:string= this.from
    debugger;
     for(var  i=0;i<this.lstCharges.length;i++)
     {
      this.lstCharges[i].Show='true';
    
     
      if(this.lstCharges[i].SNO==this.EditChRecNO)
      {
        
      
       this.lstCharges[i].ChargesCOAId=this.getControlValue(this.f.ChargesCOAId,'int');
       this.lstCharges[i].ChargesCOAName=this.getControlValue(this.f.ChargesCOAName,'string');

       this.lstCharges[i].ChargesAmount=this.getControlValue(this.f.ChargesAmount,'int');
       this.lstCharges[i].ChargesNarration=this.getControlValue(this.f.ChargesNarration,'string');
       
       this.lstCharges[i]. SACCode=this.getControlValue(this.f.SACCode,'string');
       this.lstCharges[i].ChargesCGSTPer=this.getControlValue(this.f.ChargesCGSTPer,'int');
      this.lstCharges[i].ChargesCGSTAmount=this.getControlValue(this.f.ChargesCGSTAmount,'int');
       this.lstCharges[i].ChargesSGSTPer=this.getControlValue(this.f.ChargesSGSTPer,'int');
       this.lstCharges[i].ChargesSGSTAmount=this.getControlValue(this.f.ChargesSGSTAmount,'int');
       this.lstCharges[i].ChargesIGSTPer=this.getControlValue(this.f.ChargesIGSTPer,'int');
       this.lstCharges[i].ChargesIGSTAmount=this.getControlValue(this.f.ChargesIGSTAmount,'int');
       this.lstCharges[i].ChargesTax=(+this.getControlValue(this.f.ChargesCGSTAmount,'int'))+(+this.getControlValue(this.f.ChargesSGSTAmount,'int'))+(+this.getControlValue(this.f.ChargesIGSTAmount,'int'));


       this.lstCharges[i].TotalCharges=this.getControlValue(this.f.TotalCharges,'int');
      
     
      }
     }
    if(this.EditChRecNO==-1)
    {
      var res=
               ({
                SNO:this.SNOCh
              
    
               ,ChargesCOAId:this.getControlValue(this.f.ChargesCOAId,'int')
               ,ChargesCOAName:this.getControlValue(this.f.ChargesCOAName,'string')
               ,ChargesAmount:this.getControlValue(this.f.ChargesAmount,'int')
               ,ChargesNarration:this.getControlValue(this.f.ChargesNarration,'string')
               ,SACCode:this.getControlValue(this.f.SACCode,'string')
               ,LineId:0
               ,ChargesCGSTPer:this.getControlValue(this.f.ChargesCGSTPer,'int')
               ,ChargesCGSTAmount:this.getControlValue(this.f.ChargesCGSTAmount,'int')
               ,ChargesSGSTPer:this.getControlValue(this.f.ChargesSGSTPer,'int')
               ,ChargesSGSTAmount:this.getControlValue(this.f.ChargesSGSTAmount,'int')
               ,ChargesIGSTPer:this.getControlValue(this.f.ChargesIGSTPer,'int')
               ,ChargesIGSTAmount:this.getControlValue(this.f.ChargesIGSTAmount,'int')
               ,ChargesTax:(+this.getControlValue(this.f.ChargesCGSTAmount,'int'))+(+this.getControlValue(this.f.ChargesSGSTAmount,'int'))+(+this.getControlValue(this.f.ChargesIGSTAmount,'int'))
         
         
                ,TotalCharges:this.getControlValue(this.f.TotalCharges,'int')
               ,Show:'true'
               });
    
    if(this.lstCharges.length==0)
    {
      this.lstCharges=[res];
    
    }
    else{
      this.lstCharges.push(res);
      
    }
    }
    this.EditChRecNO=-1;
    
               this.f.ChargesCOAId.setValue(0);
               this.f.ChargesCOAName.setValue('');
               this.f.ChargesAmount.setValue(0);
               this.f.ChargesNarration.setValue('');
               
               this.SNOCh=this.lstCharges.length+1;
               this.f.LineChanges.setValue(1);

               if(type=='Close')
               {

                $("#btnCloseDCCharges").click();
               }
               this.CalculateTotals();
    }
    
    //}

  } 




   ShowStockSelection=true;
   
   CurrentTime: any;

   PartyGSTNo="";

   windowScroll(ControlName)
{
  var element = document.getElementById(ControlName); 
var rect = element.getBoundingClientRect();

window.scrollTo(rect.left, rect.top);
}

OnPrint()
{

  this.DCData=this;
}
ValidateStockAllotment():boolean
{
var val=true;
var TotalItemQty=0;
var TotalStockItemQty=0;
for(let i=0;i<this.lstDCItems.length;i++)
{

  TotalItemQty=(+TotalItemQty)+(+this.lstDCItems[i].Qty);

}

for(let i=0;i<this.lstDCItemsStock.length;i++)
{

  TotalStockItemQty=(+TotalStockItemQty)+(+this.lstDCItemsStock[i].Qty);

}

if(TotalItemQty!=TotalStockItemQty)
{

  val=false;
}


return val;
}
   submitted=false;
 //  showStockError=false;
  OnSave()
  {
debugger;
//this.showStockError=false;
    this.submitted=true;
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());
 
    this.f.TransactionTime.setValue($("#TransactionTime").val());

    debugger;
   if((+this.f.AllowChanges.value)==1)
   {
if(this.CreateDC.invalid)
{
  var  Cvalid=true;
  

  if(this.f.PartyId.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('PartyId');
    Cvalid=false;
  }

  if(this.f.TransactionDate.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('TransactionDate');
    Cvalid=false;
  }

  
  if(this.f.RequiredDate.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('RequiredDate');
    Cvalid=false;
  }
  if(this.f.Email.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('Email');
    Cvalid=false;
  }

  
  if(this.f.TransactionTime.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('TransactionTime');
    Cvalid=false;
  }




  return;
}
else
{
  if(this.ValidateStockAllotment())
  {
 this.SaveTransaction();
  }else{
    (window as any). swal("Cancelled", "Invalid  Stock Allotment", "error");
   // $("#Stock-tab").click();

   // $('#ProductTab a[href="#Stock"]').trigger('click');
//this.showStockError=true;

  }
}
   }else{
    (window as any). swal("Failed", "DC Converted to Invoice Changes are not Aloowed", "error");


   }
}




 

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
      // this.Search();
       
       break;
   }
 }
 
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

      that.DeleteDC();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }

  });

}
DeleteDC()

{

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
   
  $("#loaderParent").show();
  if(this.ModifiedDate.toString().includes('India'))
{

  var date = new  Date (this.ModifiedDate);

  
  this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
}
debugger;
var xml1='<NewDataSet><Table1>'
+'<TransactionId>'+this.getControlValue(this.f.TransactionId,'int')+'</TransactionId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
 +'<TransactionNo>'+this.getControlValue(this.f.TransactionNo,'string')+'</TransactionNo>'
 +'</Table1></NewDataSet>';

 this.APICall.DBCalling("DeleteDC",xml1,"","","").subscribe(
   (res:Response) => {

     $("#loaderParent").hide();
     this.DbResult=JSON.parse(res['Message']);
debugger;
     //  var l=this.DbResult.Table[0].length;
      // var tr=this.DbResult.Table[0].DBresult;
       if(this.DbResult.Table.length>0 &&this.DbResult.Table[0].DBresult>0)
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
ClearViewData()
{
  this.submitted=false;
  this.ModifiedDate="";
  this.lstDCItemsStock=[];
  this.CreateDC.patchValue(
   

    {
      //SequenceNumberId:0,
      Contactno:'',
      PartyName:'',
      Email:'',
      RequiredDate:'',
      Billto:'',
      Shipto:0, 
      ShiptoAddress:'', 
      Terms:'',
      TermsandConditions:'',
      PaymentTerms:'',
      TransactionTime:'',
      TransactionDate:'',
      TransactionId:0,
      TransactionNo:'',
  
      PartyId:0,
      TransportId:0,

Area:'',
TransportName:'',

BillRefNo:'',
AllowChanges:1,
      SearchString:'',
      searchPartNo:'',
      searchDescription:'',
      searchMake:'',
      searchHSN:''
  
    }
  );
  this.PartyGSTNo='';
  this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
  this.f.TransactionTime.setValue(this.CurrentTime);

var rdate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
  $("#RequiredDate").val(rdate)
$("#TransactionDate").val(rdate)
$("#TransactionTime").val(this.CurrentTime)
this.lstDCItems=null;
             this.lstDCItems  = [];
             this.lstTermsChild=null;
             this.lstTermsChild  = [];
             this.DisplayCustomerId=0;
             this.DispalyCustomerName="";
             this.DisplaySequenceNumberId=0;
             this.TotalGross=0;
             this.TotalCGST=0;
             this.TotalSGST=0;
             this.TotalIGST=0;
             this.TotalDiscount=0;
this.TotalTax=0;
this.Total=0;
this.lstCharges=[];
this.TotalCharges=0;
this.StoreDC=new StoreDC;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreDC.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StoreDC));

}
   ModifiedDate="";
   DbResult:any  = [];
   convertDate(str) {
    debugger;
    var date = new Date(str),
        mnth:any = ("0" + (date.getMonth()+1)).slice(-2),
        day:any  = ("0" + date.getDate()).slice(-2);
       var hours  = ("0" + date.getHours()).slice(-2);
       var  minutes = ("0" + date.getMinutes()).slice(-2);
  
       var resDate=[  mnth, day ,date.getFullYear()].join("-");
       debugger;
    return resDate+" "+hours+":"+ minutes;
  
  }
  
   SaveTransaction()
   {
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val()+' '+$("#TransactionTime").val());
    this.f.TransactionTime.setValue($("#TransactionDate").val()+' '+$("#TransactionTime").val());
    // if(this.ModifiedDate.toString().includes('India'))
    // {
    
    //   var date = new  Date (this.ModifiedDate);
    
      
    //   this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    // }
    


     $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
      
     $("#loaderParent").show();
   

   
     var xml1='<NewDataSet><Table1>'
     
     +'<ShiptoAddress>'+this.getControlValue(this.f.ShiptoAddress,'string')+'</ShiptoAddress>'
     +'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'int')+'</SequenceNumberId>'
     +'<PartyId>'+this.getControlValue(this.f.PartyId,'int')+'</PartyId>'
     +'<Billto>'+this.getControlValue(this.f.Billto,'string')+'</Billto>'
     +'<TransactionNo>'+this.getControlValue(this.f.TransactionNo,'string')+'</TransactionNo>'


     +'<TransportId>'+this.getControlValue(this.f.TransportId,'string')+'</TransportId>'
     +'<Area>'+this.getControlValue(this.f.Area,'string')+'</Area>'
     +'<TransportName>'+this.getControlValue(this.f.TransportName,'string')+'</TransportName>'
     +'<BillRefNo>'+this.getControlValue(this.f.BillRefNo,'string')+'</BillRefNo>'
     +'<InvoiceType>'+this.getControlValue(this.f.InvoiceType,'string')+'</InvoiceType>'
     



     +'<Shipto>'+this.getControlValue(this.f.Shipto,'string')+'</Shipto>'
     
     +'<TransactionTime>'+this.convertDate(this.getControlValue(this.f.TransactionTime,'string'))+'</TransactionTime>'
     +'<TransactionDate>'+this.convertDate(this.getControlValue(this.f.TransactionDate,'string'))+'</TransactionDate>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<Email>'+this.getControlValue(this.f.Email,'string')+'</Email>'
     +'<CurrencyId>'+this.APICall.GetCurrencyId()+'</CurrencyId>'
     +'<RequiredDate>'+this.getControlValue(this.f.RequiredDate,'string')+'</RequiredDate>'
     +'<TermsandConditions>'+this.getControlValue(this.f.TermsandConditions,'string')+'</TermsandConditions>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<TotalGross>'+this.TotalGross+'</TotalGross>'
     +'<PaymentTerms>'+this.getControlValue(this.f.PaymentTerms,'int')+'</PaymentTerms>'
     +'<ReferenceType>'+this.ReferenceType+'</ReferenceType >'
     +'<ReferenceNo>'+this.ReferenceNo+'</ReferenceNo >'
     +'<TotalCharges>'+this.TotalCharges+'</TotalCharges >'
     
     +'<TotalDiscount>'+this.TotalDiscount+'</TotalDiscount >'
     +'<TotalTax>'+this.TotalTax+'</TotalTax>'
     +'<Total>'+this.Total+'</Total>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'<Terms>'+this.getControlValue(this.f.Terms,'int')+'</Terms>'
     +'<TransactionId>'+this.getControlValue(this.f.TransactionId,'int')+'</TransactionId>'
     +'<AfterDiscount>'+this.AfterDiscount+'</AfterDiscount>'
     +'<TotalSGST>'+this.TotalSGST+'</TotalSGST>'
     +'<TotalCGST>'+this.TotalCGST+'</TotalCGST>'
     +'<TotalIGST>'+this.TotalIGST+'</TotalIGST>'
     +'<TaxType>'+this.TaxType+'</TaxType>'
     +'<BillToStateName>'+this.BillToStateName+'</BillToStateName>'
     +'<BillToStateCode>'+this.BillToStateCode+'</BillToStateCode>'
     +'<Contactno>'+this.getControlValue(this.f.Contactno,'string')+'</Contactno>'
     
       +'</Table1></NewDataSet>';
       var xml2="";
       var rows="";
  
       for(var i=0;i<this.lstDCItems.length;i++)
       {
  
        rows=rows+'<Table1>'
       +'<LineId>'+this.lstDCItems[i].LineId+ '</LineId>'
       +'<Description>'+this.lstDCItems[i].Description+ '</Description>'
       +'<Partno>'+this.lstDCItems[i].Partno+ '</Partno>'

       +'<ItemId>'+this.lstDCItems[i].ItemId+ '</ItemId>'
       +'<MakeId>'+this.lstDCItems[i].MakeId+ '</MakeId>'
       +'<UOMId>'+this.lstDCItems[i].UOMId+ '</UOMId>'
       +'<Make>'+this.lstDCItems[i].Make+ '</Make>'
       +'<UOM>'+this.lstDCItems[i].UOM+ '</UOM>'
       +'<Rate>'+this.lstDCItems[i].Rate+ '</Rate>'
       +'<Qty>'+this.lstDCItems[i].Qty+ '</Qty>'
       +'<Gross>'+this.lstDCItems[i].Gross+ '</Gross>'
       +'<DiscountPercentage>'+this.lstDCItems[i].DiscountPercentage+ '</DiscountPercentage>'
       +'<DiscountAmount>'+this.lstDCItems[i].DiscountAmount+ '</DiscountAmount>'
       +'<CGST>'+this.lstDCItems[i].CGST+ '</CGST>'
       +'<CGSTAmount>'+this.lstDCItems[i].CGSTAmount+ '</CGSTAmount>'
       +'<SGST>'+this.lstDCItems[i].SGST+ '</SGST>'
       +'<SGSTAmount>'+this.lstDCItems[i].SGSTAmount+ '</SGSTAmount>'
       +'<IGST>'+this.lstDCItems[i].IGST+ '</IGST>'
       +'<IGSTAmount>'+this.lstDCItems[i].IGSTAmount+ '</IGSTAmount>'
       +'<TotalTax>'+this.lstDCItems[i].TotalTax+ '</TotalTax>'
       +'<NetTotal>'+this.lstDCItems[i].NetTotal+ '</NetTotal>'
       +'<TaxType>'+this.lstDCItems[i].TaxType+ '</TaxType>'
       + '<RefType1>' + this.lstDCItems[i].RefType1 + '</RefType1>'
       + '<RefNo2>' + this.lstDCItems[i].RefNo2 + '</RefNo2>'
       + '<RefDate3>' + this.lstDCItems[i].RefDate3 + '</RefDate3>'
       + '<RefLineID33>' + this.lstDCItems[i].RefLineID33 + '</RefLineID33>'
       + '<RefId>' + this.lstDCItems[i].RefId + '</RefId>'
       +'<HSN>'+this.lstDCItems[i].HSN+ '</HSN></Table1>'
       
       }
       xml2='<NewDataSet>'+rows+'</NewDataSet>';

       var xml3="";
       var rows="";
  
       for(var i=0;i<this.lstTermsChild.length;i++)
       {
  
        rows=rows+'<Table1>'
       +'<Amount>'+this.lstTermsChild[i].Amount+ '</Amount>'
       +'<PayPercentage>'+this.lstTermsChild[i].PayPercentage+ '</PayPercentage>'
       +'<PayName>'+this.lstTermsChild[i].PayName+ '</PayName>'

       +'<TermDetailsID>'+this.lstTermsChild[i].TermDetailsID+ '</TermDetailsID>'
       

       +'<DCTermDetailsId>'+(typeof(this.lstTermsChild[i].DCTermDetailsId)=='undefined'?0:this.lstTermsChild[i].DCTermDetailsId)+ '</DCTermDetailsId></Table1>'
       
       }

       var rows1="";
       for(var i=0;i<this.lstCharges.length;i++)
       {
  
        rows1=rows1+'<Charges>'
       +'<LineId>'+this.lstCharges[i].LineId+ '</LineId>'
       +'<ChargesAmount>'+this.lstCharges[i].ChargesAmount+ '</ChargesAmount>'
       +'<ChargesCOAId>'+this.lstCharges[i].ChargesCOAId+ '</ChargesCOAId>'


       +'<ChargesCGSTPer>'+this.lstCharges[i].ChargesCGSTPer+ '</ChargesCGSTPer>'
       +'<ChargesCGSTAmount>'+this.lstCharges[i].ChargesCGSTAmount+ '</ChargesCGSTAmount>'
       +'<ChargesSGSTPer>'+this.lstCharges[i].ChargesSGSTPer+ '</ChargesSGSTPer>'
       +'<ChargesSGSTAmount>'+this.lstCharges[i].ChargesSGSTAmount+ '</ChargesSGSTAmount>'
       +'<ChargesIGSTPer>'+this.lstCharges[i].ChargesIGSTPer+ '</ChargesIGSTPer>'
       +'<ChargesIGSTAmount>'+this.lstCharges[i].ChargesIGSTAmount+ '</ChargesIGSTAmount>'

       +'<ChargesTotalTax>'+((+this.lstCharges[i].ChargesCGSTAmount)+(+this.lstCharges[i].ChargesSGSTAmount)+(+this.lstCharges[i].ChargesIGSTAmount))+ '</ChargesTotalTax>'

       +'<SACCode>'+this.lstCharges[i].SACCode+ '</SACCode>'
       +'<TotalCharges>'+this.lstCharges[i].TotalCharges+ '</TotalCharges>'
       

       +'<ChargesNarration>'+this.lstCharges[i].ChargesNarration+ '</ChargesNarration></Charges>'
       
       }
       xml3='<NewDataSet>'+rows+rows1+'</NewDataSet>';


       var xml4="";
       var rows="";
  
       for(var i=0;i<this.lstDCItemsStock.length;i++)
       {
  
        rows=rows+'<Table1>'
       +'<LineId>'+this.lstDCItemsStock[i].LineId+ '</LineId>'
       
       +'<Partno>'+this.lstDCItemsStock[i].Partno+ '</Partno>'

       +'<ItemId>'+this.lstDCItemsStock[i].ItemId+ '</ItemId>'
       +'<MakeId>'+this.lstDCItemsStock[i].MakeId+ '</MakeId>'
       +'<UOMId>'+this.lstDCItemsStock[i].UOMId+ '</UOMId>'
       +'<Make>'+this.lstDCItemsStock[i].Make+ '</Make>'
       +'<UOM>'+this.lstDCItemsStock[i].UOM+ '</UOM>'
       +'<Rate>'+this.lstDCItemsStock[i].Rate+ '</Rate>'
       
       +'<Qty>'+this.lstDCItemsStock[i].Qty+ '</Qty>'
       +'<LocationId>'+this.lstDCItemsStock[i].LocationId+ '</LocationId>'
       +'<BinId>'+this.lstDCItemsStock[i].BinId+ '</BinId>'
       +'<Locationname>'+this.lstDCItemsStock[i].Locationname+ '</Locationname>'
       +'<BinName>'+this.lstDCItemsStock[i].BinName+ '</BinName></Table1>'
       
       }
       xml4='<NewDataSet>'+rows+'</NewDataSet>';

       debugger;
       this.APICall.DBCalling("SaveDC",xml1,xml2,xml3,xml4).subscribe(
         (res:Response) => 
         {
     
           debugger;
           $("#loaderParent").hide();
          // this.DbResult= (res);
           this.DbResult=JSON.parse(res['Message']);

         //  var l=this.DbResult.Table[0].length;
          // var tr=this.DbResult.Table[0].DBresult;
           if(this.DbResult.Table.length>0 &&this.DbResult.Table[0].DBresult>0)
           {
           if((+this.getControlValue(this.f.TransactionId,'int'))>0)
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
         //  this.CreateBranches.patchValue({
     
            
            this.f.TransactionId.setValue(this.DbResult.Table[0].TransactionId);
            this.f.TransactionNo.setValue(this.DbResult.Table[0].TransactionNo);
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
     
            debugger;
             this.lstDCItems=null;
             this.lstDCItems  = [];
             this.lstTermsChild=null;
             this.lstTermsChild  = [];
             this.lstCharges = [];
               if(this.DbResult.Table.length>0  )
               {
     
                 try{
               
     if(this.DbResult.Table1.length>0)//lstres[0].Table=="DC1")
     {
      //var res1=JSON.parse((( this.DbResult.Table1[0].lstDCItems).replace(/\n/g, "")).replace(/'/g,"\""));
      var lstresDCItems=JSON.parse((( this.DbResult.Table1[0].lstDCItems).replace(/\n/g, "")).replace(/'/g,"\""));
      var i=0;
      var  DCItemsdata = $.map(lstresDCItems, function (obj) {
        i=i+1;
        obj.SNO = i; 
     
        return obj;
      });

                 this.lstDCItems=DCItemsdata;
     
     
     }
    }catch(exce)
    {}
    try{
     if(this.DbResult.Table2.length>0)//lstres[0].Table=="DCTermDetails")
     {
      //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
      var lstresTermsChild=JSON.parse((( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\""));

      var  lstresTermsChilddata = $.map(lstresTermsChild, function (obj) {
        i=i+1;
        obj.SNO = i; 
     
        return obj;
      });

                 this.lstTermsChild=lstresTermsChilddata;
     }
     }catch(exce){}
 




     try{
      if(this.DbResult.Table3.length>0)//lstres[0].Table=="DCTermDetails")
      {
       //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
       var lstresDCItemsStock=JSON.parse((( this.DbResult.Table3[0].lstDCItemsStock).replace(/\n/g, "")).replace(/'/g,"\""));
 
       var  lstresDCItemsStockdata = $.map(lstresDCItemsStock, function (obj) {
         i=i+1;
         obj.SNO = i; 
      
         return obj;
       });
 
                  this.lstDCItemsStock=lstresDCItemsStockdata;
      }
      }catch(exce){}
  
     


      try{
        if(this.DbResult.Table4.length>0)//lstres[0].Table=="DCTermDetails")
        {
         //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
         var lstresCharges=JSON.parse((( this.DbResult.Table4[0].lstCharges).replace(/\n/g, "")).replace(/'/g,"\""));
   
         var  lstresChargesdet = $.map(lstresCharges, function (obj) {
           i=i+1;
           obj.SNO = i; 
        
           return obj;
         });
   
                    this.lstCharges=lstresChargesdet;
        }
        }catch(exce){}
    
   

               }
               
     
     
            
             
              
          }else{
     
     
     
     if(this.DbResult.Table[0].DBresult==-3)
     {
     (window as any).swal({
      icon: 'warning',
      title: 'Exists',
      text: 'DC Already Exists.!',
      confirmButtonText: 'Dismiss',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-warning'
     });
     }else{
     
       if(this.DbResult.Table[0].DBresult==-5)
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
       
             that.SaveTransaction();
           }else {
             (window as any). swal("Cancelled", "this file is not updated :)", "error");
           }
       
       
         });
       
     
        
       }else
       {
        if((+this.DbResult.Table[0].DBresult)==-7)
        {

 (window as any).swal({
      icon: 'error',
      title: 'Error!',
      text: 'Stock not available.!',
      confirmButtonText: 'Dismiss',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-danger'
     });

        }
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
   
   TransactionDateChange(e)
   {
debugger;

   }
   TransactionDate=$("#TransactionDate").val();

   SelectedProductData= {
    SNO: 1
    ,LineId:'0'
   ,Description:''
    
    ,Partno:''
    ,ItemId:0
    ,MakeId:0
    ,UOMId:0
    ,Make:''
    ,UOM:''
    
    ,Rate:0
    ,Qty:1
    
    
    
    ,Gross:0
    ,DiscountPercentage:0
    ,DiscountAmount:0
    
    
    
    ,CGST:0
    ,CGSTAmount	:0
    ,SGST:0
    
    
    
    ,SGSTAmount:0
    ,IGST:0
    ,IGSTAmount:0
    
    
    
    ,TotalTax:0
    ,NetTotal:0
    
    ,TaxType:0
    
    
    
    ,HSN:''


 
   ,Show:'true'
   }


PartyId='0';
   //AddItemReset=false;
   OnAdd()
   {
debugger;

this.PartyId=this.getControlValue(this.f.PartyId,'int');
this.errormsg="";
this.EditRecNO=-1;
this.SelectedProductData= {
  SNO: (this.lstDCItems.length==0?1:(this.lstDCItems.length+1))
  ,LineId:'0'
 ,Description:''
  
  ,Partno:''
  ,ItemId:0
  ,MakeId:0
  ,UOMId:0
  ,Make:''
  ,UOM:''
  
  ,Rate:0
  ,Qty:1
  
  
  
  ,Gross:0
  ,DiscountPercentage:0
  ,DiscountAmount:0
  
  
  
  ,CGST:0
  ,CGSTAmount	:0
  ,SGST:0
  
  
  
  ,SGSTAmount:0
  ,IGST:0
  ,IGSTAmount:0
  
  
  
  ,TotalTax:0
  ,NetTotal:0
  
  ,TaxType:0
  
  
  
  ,HSN:''



 ,Show:'true'
 };
    this.TransactionDate=$("#TransactionDate").val();
    debugger;
    if(this.CompanyStateId!=this.SelectedState)
{
this.TaxType="Inter State";
}else{

  this.TaxType="Intra State";
}
  
   }
  
   GstTaxFromHSNAndGSTTypeForGridView()
{
  debugger;
  if(this.lstDCItems.length>0)
  {
  var xmlHsnInfo="";
  var rows="";

  for(var i=0;i<this.lstDCItems.length;i++)
  {

   rows=rows+'<Table1><HSN>'+this.lstDCItems[i].HSN+ '</HSN></Table1>'
  
  
  }
  xmlHsnInfo='<NewDataSet>'+rows+'</NewDataSet>';



  
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
 
  $("#loaderParent").show();
  this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo,this.TaxType,this.TransactionDate).subscribe(
    (res) => {

  
$("#loaderParent").click();
      debugger;
      this.lstDbResult=JSON.parse(res['Message']);
      
        
     
      if(this.lstDbResult.Table.length>0)
      {
       var resultInfo=this.lstDbResult.Table;
  
       
       for(var i=0;i<this.lstDCItems.length;i++)
       {
        this.lstDCItems[i].CGST=0;
        this.lstDCItems[i].SGST=0;
        this.lstDCItems[i].IGST=0;
    
        this.lstDCItems[i].CGSTAmount=0;
        this.lstDCItems[i].SGSTAmount=0;
        this.lstDCItems[i].IGSTAmount=0;
        var  ResultItem = resultInfo.filter(d => d.HSN === this.lstDCItems[i].HSN);
        if(ResultItem.length>0)
        {
         
          debugger;
          for (let j=0;j<  ResultItem.length;j++)
          {
          if(ResultItem[j].TaxType=="CGST")
          {
            this.lstDCItems[i].CGST=(ResultItem[j].TaxPercentage2);
            
          
          }
          
          if(ResultItem[j].TaxType=="SGST")
          {
            this.lstDCItems[i].SGST=(ResultItem[j].TaxPercentage2);
            
          
          }
          
          if(ResultItem[j].TaxType=="IGST")
          {
            this.lstDCItems[i].IGST=(ResultItem[j].TaxPercentage2);
          
          }
          
          
          }
        }

       }
       this.CalculateTotals();
      }
    
  
else{
 // (window as any). swal("Cancelled", "Failed:)", "error");
//this.FormErrormsg="Failed.";

}




}
  );
}
}
   
   PrepareSerchStringByField()
   {
 
     var searchPartNo=this.getControlValue(this.f.searchPartNo,"string");
     var searchDescription=this.getControlValue(this.f.searchDescription,"string");
     var searchMake=this.getControlValue(this.f.searchMake,"string");
     var searchHSN=this.getControlValue(this.f.searchHSN,"string");
   
     debugger;
         if(this.SerchType=='Like')
         {
     
           
           if(searchPartNo!="" || searchDescription!="" || searchMake!="" || searchHSN!="")
           {
             for(var  i=0;i<this.lstDCItems.length;i++)
                {
     
                 if ((this.lstDCItems[i].Partno).toString().includes(searchPartNo) || 
                 
                 (this.lstDCItems[i].Make).toString().includes(searchDescription) || 
                 (this.lstDCItems[i].Description).toString().includes(searchMake) || 
                 (this.lstDCItems[i].HSN).toString().includes(searchHSN) 
                 
                 )
                 {
     
     
                 
                 this.lstDCItems[i].Show='true';
                }else{
                 this.lstDCItems[i].Show='false';
     
     
                }
           }
         }
     
           
         }
         else{
          
           
             for(var  i=0;i<this.lstDCItems.length;i++)
                {
                  
                 if ((this.lstDCItems[i].Partno)==((searchPartNo)!=""? (searchPartNo):this.lstDCItems[i].Partno) &&
                 
                 (this.lstDCItems[i].Make)==((searchMake)!=""? (searchMake):this.lstDCItems[i].Make) &&
                 (this.lstDCItems[i].Description)==((searchDescription)!=""? (searchDescription):this.lstDCItems[i].Description)  &&
                 (this.lstDCItems[i].HSN)==((searchHSN)!=""? (searchHSN):this.lstDCItems[i].HSN) 
                 
                 )
                 {
     
     
                 
                 this.lstDCItems[i].Show='true';
                }else{
                 this.lstDCItems[i].Show='false';
     
     
                        
           }
     
          }
         }
   
   
   
   
   
   }
   SerchType='Like'
SerchTypeChange(ChangedValue)
{
 
  if(ChangedValue==false)
  {
    this.SerchType='Equal'
    if(this.FilterType=='All')
    $('#customSwitch').trigger('click');
   
  }else{
    this.SerchType='Like'
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
  
    for(var  i=0;i<this.lstDCItems.length;i++)
    {
  
     if (
       
      (this.lstDCItems[i].Partno).toString().includes(SearchString)  ||
      (this.lstDCItems[i].Make).toString().includes(SearchString)  ||
      (this.lstDCItems[i].HSN).toString().includes(SearchString)  ||
      (this.lstDCItems[i].Description).toString().includes(SearchString)  
     
      //(this.lstDCItems[i].ExcessRsPerKms).toString().includes(SearchString)  
      )
     {
  
  
     
     this.lstDCItems[i].Show='true';
    }else{
     this.lstDCItems[i].Show='false';
  
  
    }
  }
  
  }
  return SearchString;


}
Search()
{
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));

  this.APICall.UpdatedSelectedPath('./Sales/DC');
  this.router.navigate(['Sales/DC']);
}
FilterTypeChange(event)
{

  debugger;


  if(this.SerchType=='Like' && event.target.checked==true)
   {
  this.FilterType=(event.target.checked==true?'All':'Field');
   }else
   {
     
    event.target.checked=false;
    this.FilterType='Field';
  
   }


}

   CompanyStateId=(+this.APICall.GetCompanyStateID());

  get f()
  { 
   return this.CreateDC.controls;
  
 } 

 lstDCItems:any=[];
 lstDCItemsStock:any=[];
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
errormsg="";
showError=false;
EditRecNO=0;

SNO=0;
ValidateItem(data):boolean
{
debugger;
var validate=true;
this.showError=false;

if((+data.NetTotal)>0)
{

debugger;
// for(var  i=0;i<this.lstDCItems.length;i++)
// {
// if( data.SNO!=this.lstDCItems[i].SNO && this.lstDCItems[i].Partno==data.Partno)
// {
// validate=false;
// this.showError=true;
// this.errormsg="Already exists!";
// break;

// }  

// }
}else{

  validate=false;
  this.showError=true;
  this.errormsg="Invalid Data!";

}
if(validate && this.StockErrorMsg!="")
{
  validate=false;
  this.showError=true;
  this.errormsg=this.StockErrorMsg;
}

return validate;
}
StockErrorMsg="";
AddItemAndNewClick(event)
{
  this.StockErrorMsg="";
  this.StockErrorMsg=event.StockErrorMsg;
this.AddItem('New',event.SelecedRow,event.StockAllotment)
}

AddItemAndCloseClick(event)
{
  this.StockErrorMsg="";
  this.StockErrorMsg=event.StockErrorMsg;
this.AddItem('Close',event.SelecedRow,event.StockAllotment)
}
EditItemClick(data)
{
  this.EditRecNO=0;
debugger;
this.errormsg="";
  this.SelectedProductData=Object.assign({}, data);

}



AddItem(type,data,StockAllotment)
{
debugger;
if(this.ValidateItem(data))
{


this.lstDCItemsStock=StockAllotment;
let lstDCItemsStock=[];
this.lstDCItemsStock.forEach((element ,index)=> {
  lstDCItemsStock[index]={...element};
});
this.lstDCItemsStock=lstDCItemsStock;

let lstDCItems=[];
this.lstDCItems.forEach((element ,index)=> {
  lstDCItems[index]={...element};
});
this.lstDCItems=lstDCItems;


for(var  i=0;i<this.lstDCItems.length;i++)
{
this.lstDCItems[i].Show='true';


if(this.lstDCItems[i].SNO==data.SNO)
{


//  this.lstDCItems[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
this.lstDCItems[i].Partno=data.Partno;
this.lstDCItems[i].ItemId=data.ItemId;
this.lstDCItems[i].MakeId=data.MakeId;
this.lstDCItems[i].Description=data.Description;

this.lstDCItems[i].Make=data.Make;
this.lstDCItems[i].UOM=data.UOM;
this.lstDCItems[i].UOMId=data.UOMId;

this.lstDCItems[i].Rate=data.Rate;
this.lstDCItems[i].Qty=(+data.Qty);



this.lstDCItems[i].Gross=(+data.Gross);
this.lstDCItems[i].DiscountPercentage=(+ data.DiscountPercentage);
this.lstDCItems[i].DiscountAmount=(+data.DiscountAmount);



this.lstDCItems[i].CGST=(+data.CGST);
this.lstDCItems[i].CGSTAmount	=(+data.CGSTAmount);
this.lstDCItems[i].SGST=(+data.SGST);




this.lstDCItems[i].SGSTAmount=(+data.SGSTAmount);
this.lstDCItems[i].IGST=(+data.IGST);
this.lstDCItems[i].IGSTAmount=(+data.IGSTAmount);
this.lstDCItems[i].TotalTax=(+data.TotalTax);
this.lstDCItems[i].NetTotal=(+data.NetTotal);
this.lstDCItems[i].TaxType=data.TaxType;
this.lstDCItems[i].RefLineID33 = data.RefLineID33;
this.lstDCItems[i].RefType1 = data.RefType1;
this.lstDCItems[i].RefNo2 = data.RefNo2;
this.lstDCItems[i].RefDate3 = data.RefDate3;
this.lstDCItems[i].RefId = data.RefId;
this.lstDCItems[i].HSN=data.HSN;



}
}
if(this.EditRecNO==-1)
{
var res=
       ({
        SNO:this.lstDCItems.length+1
        ,LineId:'0'
       ,Description:data.Description
        
        ,Partno:data.Partno
        ,ItemId:data.ItemId
        ,MakeId:data.MakeId
        ,UOMId:data.UOMId
        ,Make:data.Make
        ,UOM:data.UOM
        
        ,Rate:data.Rate
        ,Qty:(+data.Qty)
        
        
        
        ,Gross:(+data.Gross)
        ,DiscountPercentage:(+ data.DiscountPercentage)
        ,DiscountAmount:(+data.DiscountAmount)
        
        
        
        ,CGST:(+data.CGST)
        ,CGSTAmount	:(+data.CGSTAmount)
        ,SGST:(+data.SGST)
        
        
        
        
        ,SGSTAmount:(+data.SGSTAmount)
        ,IGST:(+data.IGST)
        ,IGSTAmount:(+data.IGSTAmount)
        
        
        
        ,TotalTax:(+data.TotalTax)
        ,NetTotal:(+data.NetTotal)
        
        ,TaxType:data.TaxType
        
        ,RefLineID33 : 0
        ,RefType1 :""
        ,RefNo2 : ""
         ,RefDate3 : ""
        ,RefId:0
        
        ,HSN:data.HSN


     
       ,Show:'true'
       });

if(this.lstDCItems.length==0)
{
this.lstDCItems=[res];

}
else{
this.lstDCItems.push(res);

}
}
//this.EditRecNO=0;

      // this.ClearSelectedValues();

      //  if(type=='Close')
      //  {
      //    $("#btnCloseAddItem").trigger('click');
      //  }
      if(type=='Close')
      {
        $("#btnCloseAddItem").trigger('click');
        this.EditRecNO=0;
      }else{

       this.EditRecNO=-1;

      }
       this.SNO=this.lstDCItems.length+1;
       this.CalculateTotals();
       this.f.LineChanges.setValue(0);
}

}


TotalCharges=0;
  TotalGross=0;
  TotalDiscount=0;
  TotalCGST=0;
  TotalSGST=0;
  TotalIGST=0;
  TotalTax=0;
 Total=0;
 AfterDiscount=0;
CalculateTotals()
{
  debugger;
  this.TotalGross=0;
  this.TotalCharges=0;
  this.TotalDiscount=0;
  this.TotalTax=0;
  this.Total=0;
  this.TotalCGST=0;
  this.TotalSGST=0;
  this.TotalIGST=0;
  this.AfterDiscount=0;
for(let i=0;i<this.lstDCItems.length;i++)

{

var AfterDiscount=((+this.lstDCItems[i].Gross)-(+ this.lstDCItems[i].DiscountAmount));;

this.lstDCItems[i].SGSTAmount=(((+this.lstDCItems[i].SGST)*AfterDiscount)/100);
this.lstDCItems[i].CGSTAmount=(((+this.lstDCItems[i].CGST)*AfterDiscount)/100);
this.lstDCItems[i].IGSTAmount=(((+this.lstDCItems[i].IGST)*AfterDiscount)/100);
this.lstDCItems[i].TotalTax=(+this.lstDCItems[i].SGSTAmount)+(+this.lstDCItems[i].CGSTAmount)+(+this.lstDCItems[i].IGSTAmount);

this.TotalCGST=this.TotalCGST+(+this.lstDCItems[i].CGSTAmount);
  this.TotalSGST=this.TotalSGST+(+this.lstDCItems[i].SGSTAmount);
  this.TotalIGST=this.TotalIGST+(+this.lstDCItems[i].IGSTAmount);
  this.TotalGross=this.TotalGross+(+this.lstDCItems[i].Gross);
  this.TotalDiscount=this.TotalDiscount+(+this.lstDCItems[i].DiscountAmount);
  this.TotalTax=this.TotalTax+(+this.lstDCItems[i].TotalTax);
  this.lstDCItems[i].NetTotal=((AfterDiscount+(+this.lstDCItems[i].TotalTax))).toFixed(2);

  this.Total=this.Total+(+this.lstDCItems[i].NetTotal);

}


var ChargesCGST=0;
var ChargesSGST=0;
var ChargesIGST=0;
for(let i=0;i<this.lstCharges.length;i++)

{

  this.TotalCharges=(+this.TotalCharges)+(+this.lstCharges[i].ChargesAmount);
  ChargesCGST=(+this.lstCharges[i].ChargesCGSTAmount);
  ChargesSGST=(+this.lstCharges[i].ChargesSGSTAmount);
  ChargesIGST=(+this.lstCharges[i].ChargesIGSTAmount);
}
this.TotalCGST=this.TotalCGST+(+ChargesCGST);
  this.TotalSGST=this.TotalSGST+(+ChargesSGST);
  this.TotalIGST=this.TotalIGST+(+ChargesIGST);
  this.TotalTax=this.TotalTax+(+ChargesCGST)+(+ChargesSGST)+(+ChargesIGST);
this.Total=(+this.Total)+(+this.TotalCharges);
this.AfterDiscount=(this.TotalGross)-this.TotalDiscount;
this.PaymentTermsAmountCalc();
}

// RemoveItemClick(event)
// {
//   debugger;
    
//   var  sliceIndex=-1;
//   for(var  i=0;i<this.lstDCItems.length;i++)
//   {
//    this.lstDCItems[i].Show='true';
 
//    if(this.lstDCItems[i].SNO==event.SNO)
//    {
//    sliceIndex=i;
//    }
//   }
// if(sliceIndex>-1)
// {
//   this.lstDCItems.splice(sliceIndex, 1);

//   for(var  i=0;i<this.lstDCItems.length;i++)
//   {
//     this.lstDCItems[i].SNO=i+1;
//   }
// }

//   //this.EditRecNO=-1;
//   this.SNO=this.lstDCItems.length+1;
//  // this.ClearSelectedValues();
//   this.CalculateTotals();
//   $("#btnCloseAddItem").trigger('click');
// }

RemoveItemClick(event) {

  debugger;
  var sliceIndex = -1;
  let lstDCItems=[];
this.lstDCItems.forEach((element ,index)=> {
  lstDCItems[index]={...element};
});
this.lstDCItems=lstDCItems;

let lstDCItemsStock=[];
this.lstDCItemsStock.forEach((element ,index)=> {
  lstDCItemsStock[index]={...element};
});
this.lstDCItemsStock=lstDCItemsStock;
  for (var i = 0; i < this.lstDCItems.length; i++) {
    this.lstDCItems[i].Show = 'true';

    if (this.lstDCItems[i].SNO == event.SNO) {
      sliceIndex = i;
    }
  }
  for (var i = 0; i < this.lstDCItemsStock.length; i++) {
    this.lstDCItemsStock[i].Show = 'true';

    if (this.lstDCItemsStock[i].SNO == event.SNO && this.lstDCItemsStock[i].Partno == event.Partno && this.lstDCItemsStock[i].Rate == event.Rate) {
      sliceIndex = i;
    }
  }
  if (sliceIndex > -1) {
    this.lstDCItems.splice(sliceIndex, 1);

    for (var i = 0; i < this.lstDCItems.length; i++) {
      this.lstDCItems[i].SNO = i + 1;
    }

    this.lstDCItemsStock.splice(sliceIndex, 1);

    for (var i = 0; i < this.lstDCItemsStock.length; i++) {
      this.lstDCItemsStock[i].SNO = i + 1;
    }
  }
  //this.EditRecNO=-1;
  this.SNO = this.lstDCItems.length + 1;
  // this.ClearSelectedValues();
  this.CalculateTotals();
  $("#btnCloseAddItem").trigger('click');



  this.ReArrangeSNo();

}

ReArrangeSNo() {
  for (var i = 0; i < this.lstDCItems.length; i++) {
    for (var j = 0; j < this.lstDCItemsStock.length; j++) {

      if (this.lstDCItemsStock[j].Partno == this.lstDCItems[i].Partno && this.lstDCItemsStock[j].Rate == this.lstDCItems[i].Rate) {

        this.lstDCItemsStock[j].SNO = i + 1

      }

    }
  }

}

//#endregion "AddPartNo"
  TaxType="Intra State";

TaxControlsUpdate()
{
if(this.CompanyStateId!=this.SelectedState)
{
this.TaxType="Inter State";
}else{

  this.TaxType="Intra State";
}

}


PaymentTermsAmountCalc()
{
  if((+this.Total)>0)
  {
  for(let i=0;i<this.lstTermsChild.length;i++)
  {
var Amount=(this.Total*(+this.lstTermsChild[i].PayPercentage)/100);
this.lstTermsChild[i].Amount=Amount;
      }    
}
}
lstTermsChild:any=[];
PaymentTermsChange(target)
{

 
if(target.value!='')
{
  for(let i=0;i<this.lstPaymentTerms.length;i++)
  {
    if(this.lstPaymentTerms[i].TermsId==target.value)
    {
      if(this.lstPaymentTerms[i].TermsDetails!=null && typeof(this.lstPaymentTerms[i].TermsDetails)!=undefined)
      {
      var res=((this.lstPaymentTerms[i].TermsDetails).replace(/\n/g, "")).replace(/'/g,"\"");
      
      this.lstTermsChild=JSON.parse(res);


      var  data = $.map(this.lstTermsChild, function (obj) {
           
        obj.DCTermDetailsId = 0; 
       
 
  
   return obj;
 });

 this.lstTermsChild=data;

      break;
      }
   
    }
  }
  this.PaymentTermsAmountCalc()
}else{

  this.lstTermsChild=[];

}
this.f.PaymentTerms.setValue(target.value);
}

NumberSequenceValueChange(value)
{
  debugger;
this.f.SequenceNumberId.setValue(value);

}
TermsAndConditionsChange(target)
{

  this.f.TermsandConditions.setValue('');
  debugger;
  if(target.value!='' && target.value!='0')
{

  for(let i=0;i<this.lstTermsAndConditions.length;i++)
  {
    if(this.lstTermsAndConditions[0].TermsAndConditionsId ==target.value)
    {
this.f.TermsandConditions.setValue(this.lstTermsAndConditions[0].description);
this.f.Terms.setValue(this.lstTermsAndConditions[0].TermsAndConditionsId);
    }
}


}else{

  this.f.TermsandConditions.setValue('');
  this.f.Terms.setValue(0);
}
}
lstTermsAndConditions:any=[];

ViewTermsAndConditions()
{

 
  
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
 
 $("#loaderParent").show();
  
   
   debugger;
    // this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","").subscribe(
    //   (res:Response) => {
      this.DbCallings.GetTermsAndCondition().subscribe(
        (res) => {
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        
        this.lstTermsAndConditions=[];
        if(this.lstDbResult.Table.length>0)
        {
          this.lstTermsAndConditions=this.lstDbResult.Table;
    

          
         
        }

        $("#loaderParent").hide();
      });
}


lstPaymentTerms:any=[];

ViewPaymentTerms()
{

 
  
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
 
 $("#loaderParent").show();
  
   
   debugger;
    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
      this.DbCallings.GetPaymentTerms().subscribe(
        (res) => {
     
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        
        this.lstPaymentTerms=[];
        if(this.lstDbResult.Table.length>0)
        {
          this.lstPaymentTerms=this.lstDbResult.Table;
    

          
         
        }

        $("#loaderParent").hide();
      });
}


ClockControlLoad()
{

  debugger;
  (window as any).$('.clockpicker-demo').clockpicker();

 (window as any).$('.clockpicker-demo').clockpicker({
        donetext: 'Done'
    });

    (window as any).$('.clockpicker-autoclose-demo').clockpicker({
        autoclose: true
    });

    var input =  (window as any).$('.clockpicker-minutes-demo').clockpicker({
        placement: 'bottom',
        align: 'left',
        autoclose: true,
        'default': 'now'
    });

    $(document).on('click', '#check-minutes', function (e) {
        e.stopPropagation();
        input.clockpicker('show')
            .clockpicker('toggleView', 'minutes');
    });

    (window as any). $('.create-event-demo').clockpicker({
        donetext: 'Done',
        autoclose: true
    });


}
ControlDatePickerLoad()
{

debugger;
(window as any).$('input[name="single-date-picker"]').daterangepicker({
singleDatePicker: true,
showDropdowns: true
});

(window as any).$('input[name="simple-date-range-picker"]').daterangepicker();

(window as any).$('input[name="simple-date-range-picker-callback"]').daterangepicker({
  opens: 'left'
}, function (start, end, label) {
(window as any). swal("A new date selection was made", start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'), "success")
});

(window as any).$('input[name="datetimes"]').daterangepicker({
  timePicker: true,
  startDate: (window as any).moment().startOf('hour'),
  endDate: (window as any).moment().startOf('hour').add(32, 'hour'),
  locale: {
      format: 'M/DD hh:mm A'
  }
});

/**
* datefilter
*/
// var datefilter = $('input[name="datefilter"]');
// (window as any). datefilter.daterangepicker({
//   autoUpdateInput: false,
//   locale: {
//       cancelLabel: 'Clear'
//   }
// });

// datefilter.on('apply.daterangepicker', function(ev, picker) {
//   $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
// });

(window as any).$('input.create-event-datepicker').daterangepicker({
  singleDatePicker: true,
  showDropdowns: true,
  autoUpdateInput: false
}).on('apply.daterangepicker', function(ev, picker) {
 debugger;
  $(this).val(picker.startDate.format('MM/DD/YYYY'));
});

}
ngAfterViewInit(){
  var that=this;
  
//   (window as any).$("#RequiredDate").daterangepicker({
    
//     onSelect: function(dateText) {


//       debugger;
//       //  console.log("Selected date: " + dateText + "; input's current value: " + this.value);
//         this.f.RequiredDate.setValue($("#RequiredDate").val());
//     }
// })
  this.ViewPaymentTerms();
  this.ViewTermsAndConditions();
  this.ClockControlLoad();
 // $("#TransactionTime").val(this.f.TransactionTime.value);
  this.ControlDatePickerLoad();
  }
ShippingAddressChange(target)
{
  debugger;
  var DefaultData:any;
 // var ShippingId=target.value;
  for(let i=0;i<this.lstShippings.length;i++)
  {

    if(this.lstShippings[i].ShippingInfogrv_grv4_3Id==target.value)
    {
      var DefaultData=this.lstShippings[i];
break;
    }
  }
 
  var  Address=(DefaultData.address1!=""?DefaultData.address1:'');

  if(Address!="" && DefaultData.address2!="")
  {
    Address=Address+','+(DefaultData.address2!=""?DefaultData.address2:'');
  }else{
    Address='';
  }
  
  if(Address!="" && DefaultData.address3!="")
  {
    Address=Address+','+(DefaultData.address3!=""?DefaultData.address3:'');
  }else{
    Address='';
  }
  
  
  if(Address!="" && DefaultData.cityname!="")
  {
    Address=Address+','+(DefaultData.cityname!=""?DefaultData.cityname:'');
  }
  else{
    Address='';
  }
  if(Address!="" && DefaultData.statename!="")
  {
    Address=Address+','+(DefaultData.statename!=""?DefaultData.statename:'');
  }
  else{
    Address='';
  }
  if(Address!="" && DefaultData.countryname!="")
  {
    Address=Address+','+(DefaultData.countryname!=""?DefaultData.countryname:'');
  }
  else{
    Address='';
  }
  if(Address!="" && DefaultData.pincode!="")
  {
    Address=Address+','+(DefaultData.pincode!=""?DefaultData.pincode:'');
  }
  else{
    Address='';
  }
  this.f.ShiptoAddress.setValue(Address);
  this.f.Shipto.setValue(DefaultData.ShippingInfogrv_grv4_3Id);
  

}
lstShippings:any=[];
lstDbResult:any=[];

ShippingDetailsPartyId(PartyId,BindDefault )
{

  {
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
 
 $("#loaderParent").show();
    }
    
   debugger;
    this.APICall.DBCalling("ShippingDetailsByTypeAndPartyId","Customer",PartyId,"","").subscribe(
      (res:Response) => {
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        $("#loaderParent").hide();
        this.lstShippings=[];
        if(this.lstDbResult.Table.length>0)
        {
          this.lstShippings=this.lstDbResult.Table;
          if(BindDefault)
          {
    var DefaultData=this.lstShippings[0];
          var  Address=(DefaultData.address1!=""?DefaultData.address1:'');

          if(Address!="" && DefaultData.address2!="")
          {
            Address=Address+','+(DefaultData.address2!=""?DefaultData.address2:'');
          }
          
          if(Address!="" && DefaultData.address3!="")
          {
            Address=Address+','+(DefaultData.address3!=""?DefaultData.address3:'');
          }
          
          
          if(Address!="" && DefaultData.cityname!="")
          {
            Address=Address+','+(DefaultData.cityname!=""?DefaultData.cityname:'');
          }
          if(Address!="" && DefaultData.statename!="")
          {
            Address=Address+','+(DefaultData.statename!=""?DefaultData.statename:'');
          }
          if(Address!="" && DefaultData.countryname!="")
          {
            Address=Address+','+(DefaultData.countryname!=""?DefaultData.countryname:'');
          }
          if(Address!="" && DefaultData.pincode!="")
          {
            Address=Address+','+(DefaultData.pincode!=""?DefaultData.pincode:'');
          }
          this.f.ShiptoAddress.setValue(Address);
          
        }
        }

       
      });
}
lstTransport:any=[];
TransportDetByPartyId(PartyId )
{

  debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
 
 $("#loaderParent").show();
    
    
   debugger;
    this.APICall.DBCalling("TransportDetByPartyId",PartyId,"","","").subscribe(
      (res:Response) => {
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        $("#loaderParent").hide();
        this.lstTransport=[];
        if(this.lstDbResult.Table.length>0)
        {
          debugger;
          this.lstTransport=this.lstDbResult.Table;
        }else if(this.lstDbResult.Table=='undefined'){
          debugger;
          this.lstDbResult.Table=[];
        }else{

        }
       
      });
}


TransportChange(target)
{


  this.f.TransportId.setValue(target.value);

for(let i=0;i<this.lstTransport.length;i++)
{
if(this.lstTransport[i].CustomerTransportId==target.value)
{

  this.f.TransportName.setValue(this.lstTransport[i].transportername);
  this.f.Area.setValue(this.lstTransport[i].area);

}


}


}
DeviceType="";
StoreDC: StoreDC;

StoreAccountingSettings: StoreAccountingSettings;
ngOnInit() {
debugger;
  this.DeviceType= localStorage.getItem('DeviceType')
  this.StoreDC=new StoreDC;
  this.LoadTransport()
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings=( Asresult[0] );
   this.ChargesAccountGroup=  (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Charges'; }))[0].AccountGroupName;
    }

 // var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "DC"; });
  if (result.length > 0) {
  
    // this.StoreDC=( result[0] );
    Object.assign(this.StoreDC,result[0]);
  this.ModifiedDate =this.StoreDC.ModifiedDate.toString();
  this.BillToStateCode=this.StoreDC.BillToStateCode;
  this.BillToStateName=this.StoreDC.BillToStateName;
  this.DispalyCustomerName=this.StoreDC.PartyName;
  this.ReferenceType=this.StoreDC.ReferenceType;
  this.ReferenceNo=this.StoreDC.ReferenceNo;

  this.SelectedState=this.StoreDC.SelectedState;

  this.lstDCItemsStock=this.StoreDC.lstDCItemsStock;
  this.DisplayCustomerId=this.StoreDC.PartyId;
  this.PartyGSTNo=this.StoreDC.PartyGSTNo;

  this.lstDCItems=this.StoreDC.lstDCItems==null?[]:this.StoreDC.lstDCItems;
this.TaxType=this.StoreDC.TaxType;
  var i=0;
  var that=this;
  var  lstDCItemsdata = $.map(this.lstDCItems, function (obj) {
    i = i + 1;
    return { ...obj, SNO: i};

  });
  this.lstDCItems=lstDCItemsdata;
  this.lstTermsChild=this.StoreDC.lstTermsChild==null?[]:this.StoreDC.lstTermsChild;
  var i=0;
  var  lstTermsChilddata = $.map(this.lstTermsChild, function (obj) {
  i=i+1;
  obj.SNO = i; 
  return obj;
  });
  this.lstTermsChild=lstTermsChilddata;
  this.lstCharges=this.StoreDC.lstCharges==null?[]:this.StoreDC.lstCharges;
  var i=0;
  var  lstChargesdata = $.map(this.lstCharges, function (obj) {
    i = i + 1;
    return { ...obj, SNO: i};

  });
  this.lstCharges=lstChargesdata;
try{
  if(this.StoreDC.RequiredDate!='')
  {
  var RequiredDate= formatDate(new Date(this.StoreDC.RequiredDate), 'MM/dd/yyyy', 'en');
  var TransactionDate= formatDate(new Date(this.StoreDC.TransactionDate), 'MM/dd/yyyy', 'en');
  var TransactionTime=  formatDate(new Date(this.StoreDC.TransactionTime), 'HH:mm', 'en');
  }else{
    var RequiredDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
    var TransactionDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
    var TransactionTime=  formatDate(new Date(), 'HH:mm', 'en');
  }  
}catch(e)
{
  var RequiredDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
  var TransactionDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
  var TransactionTime=  formatDate(new Date(), 'HH:mm', 'en');
}
  debugger; 
  $("#RequiredDate").val(RequiredDate)
$("#TransactionDate").val(TransactionDate)
$("#TransactionTime").val(TransactionTime)
this.TransactionDate=TransactionDate;
  this.CreateDC.patchValue(this.StoreDC);
  this.ShippingDetailsPartyId(this.StoreDC.PartyId,false);
this.TransportDetByPartyId(this.StoreDC.PartyId);
  }
  this.CalculateTotals();
  var that=this;
  this.CreateDC.valueChanges.subscribe(value => {
   that.StoreDC.SequenceNumberId=value.SequenceNumberId;
   that.StoreDC.Contactno=value.Contactno;
   that.StoreDC.Email=value.Email;
that.StoreDC.RequiredDate=value.RequiredDate;
that.StoreDC.Billto=value.Billto;
that.StoreDC.Shipto=value.Shipto;
that.StoreDC.TransportId=value.TransportId;
that.StoreDC.Area=value.Area;
that.StoreDC.TransportName=value.TransportName;
that.StoreDC.BillRefNo=value.BillRefNo;
that.StoreDC.AllowChanges=value.AllowChanges;

that.StoreDC.ReferenceNo=that.ReferenceNo;
that.StoreDC.ReferenceType=that.ReferenceType;
that.StoreDC.lstDCItemsStock=that.lstDCItemsStock;
that.StoreDC.lstCharges=that.lstCharges;
   that.StoreDC.ShiptoAddress=value.ShiptoAddress;
   that.StoreDC.Terms=value.Terms;
   that.StoreDC.TermsandConditions=value.TermsandConditions;
   

   that.StoreDC.BillToStateCode=that.BillToStateCode;
   that.StoreDC.BillToStateName= that.BillToStateName;

   that.StoreDC.TaxType=that.TaxType;
   that.StoreDC.SelectedState=that.SelectedState;

   that.StoreDC.PaymentTerms=value.PaymentTerms;
   that.StoreDC.TransactionTime=value.TransactionTime;
   that.StoreDC.TransactionDate=value.TransactionDate;
   that.StoreDC.TransactionId=value.TransactionId;

   that.StoreDC.TransactionNo=value.TransactionNo;
   that.StoreDC.PartyName=value.PartyName;
   that.StoreDC.PartyGSTNo=this.PartyGSTNo;
   
   that.StoreDC.PartyId=value.PartyId;

   that.StoreDC.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StoreDC.ViewName='DC';

   that.StoreDC.lstDCItems= that.lstDCItems;
   that.StoreDC.InvoiceType=value.InvoiceType;
   that.StoreDC.lstTermsChild= that.lstTermsChild;
    that.store.dispatch(new TabStore.AddTab(Object.assign({},that.StoreDC )));
});
//this.CalculateTotals();
}


LoadTransport()
{
  var that=this;
  debugger;

  


  (<any> $('#drptransport')).select2({
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
   return JSON.stringify( {"Operation": 'ViewTransporter',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
       
      }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {
       
   
        debugger;
   
   var ResultData=(JSON.parse(response['Message'])).Table;
   
         var  data = $.map(ResultData, function (obj) {
         
          obj.id = obj.TransporterId; 
          obj.text = obj.Transportername; 
   
    
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
    var TransportSelection = new Option(this.f.transportername.value,this.f.TransporterId.value.toString(), true, true);

    (<any> $('#drptransport')).append(TransportSelection).trigger('change');


   $('#drptransport').on('select2:select', function (e) {
   
   debugger;

  
   if(typeof((<any>e).params.data.id)!='undefined')
   {
    debugger;
 
  // that.CountryId = (<any>e).params.data.id;
  
   that.f.TransporterId.setValue( (<any>e).params.data.id);
   that.f.transportername.setValue( (<any>e).params.data.text);
   
   
 }
 
  
   });
   
 
   $('#drptransport').on("select2:unselecting", function(e) {
    debugger;
   
    that.f.TransporterId.setValue(0);
    that.f.transportername.setValue("");
    
   });

  

}

close()
{
  
  debugger;
  for (var i = 0; i < this.lstDCItems.length; i++) {
    if (this.lstDCItems[i].Partno == "") {
      this.lstDCItems.splice(i, 1);
i=0;
    }
  }
  $("#btnCloseQuotationPrint").click();
}
PrintCloseClick()
{
  this.DCData=null;
$("#btnCloseDCPrint").click();


}
  SelectedState=0;
  SelectedDate=($("#TransactionDate").val());
  BillToStateName='';
  BillToStateCode='';
  CustomerValueChange(event)
  {
  	
    this.selectedCustomer=Object.assign({},event); 


    var that = this;
    if (that.lstDCItems.length > 0) {

     
      (window as any).swal({
        icon: "warning",
        title: "Are you sure?",
        text: "Are you Want To add Previous Item or Continue  ?",

        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      }).then(function (isConfirm) {
        debugger;
        if (isConfirm) {
      debugger;
     
      
          for (let i = 0; i < that.lstDCItems.length; i++) {
       
            if (that.lstDCItems[i].RefLineID33 > 0) {
              that.lstDCItems[i]["RefLineID33"] = 0;
              that.lstDCItems[i]["RefType1"] = "";
              that.lstDCItems[i]["RefNo2"] = "";
              that.lstDCItems[i]["RefDate3"] = "";
              that.lstDCItems[i]["RefId"] = 0;
              that.lstDCItems[i]["LineId"] = 0;
            }
           
            
          }
        

        }

        else {

          for (let g = ((+that.lstDCItems.length)-1); g >= 0; g--) {
            if (that.lstDCItems[g].RefLineID33 > 0) {
              that.lstDCItems[g]["SNO"] = (that.lstDCItems.length -1);
              that.lstDCItems.splice(g, 1);
            }
          }
        }
      });
    }
   
    this.BillToStateName='';
    this.BillToStateCode='';
    debugger;
    this.DisplayCustomerId=event.CustomerId;
this.SelectedState=event.state;
this.f.Email.setValue(event.email);
this.f.Contactno.setValue(event.Contactno);
this.f.PartyId.setValue(event.CustomerId);
this.f.PartyName.setValue(event.text);
this.PartyGSTNo=event.gstno;
this.BillToStateName=event.statename;
    this.BillToStateCode=event.statecode;
var  Address=(event.address1!=""?event.address1:'');

if(Address!="" && event.address2!="")
{
  Address=Address+','+(event.address2!=""?event.address2:'');
}

if(Address!="" && event.address3!="")
{
  Address=Address+','+(event.address3!=""?event.address3:'');
}


if(Address!="" && event.cityname!="")
{
  Address=Address+','+(event.cityname!=""?event.cityname:'');
}
if(Address!="" && event.statename!="")
{
  Address=Address+','+(event.statename!=""?event.statename:'');
}
if(Address!="" && event.countryname!="")
{
  Address=Address+','+(event.countryname!=""?event.countryname:'');
}
if(Address!="" && event.pincode!="")
{
  Address=Address+','+(event.pincode!=""?event.pincode:'');
}
this.f.Billto.setValue(Address);

this.f.ShiptoAddress.setValue(Address);
this.ShippingDetailsPartyId(event.CustomerId,true);
this.TransportDetByPartyId(event.CustomerId);
//billto
if(this.CompanyStateId!=this.SelectedState
  )
{
this.TaxType="Inter State";
}else{

  this.TaxType="Intra State";
}
  
this.GstTaxFromHSNAndGSTTypeForGridView();
  }




  SalesQuotationTransactionId: number = 0;
  RefLineID33: number = 0;
  SalesValueChange(event) {
    try {

      debugger;
      this.DisplayTransactionNo = event.TransactionNo;
      this.DispalyTransactionDate = event.TransactionDate;
      this.SalesQuotationTransactionId = event.TransactionId;

      this.f.Quotation.setValue(event.TransactionId);
      var obj = event.lstQuotationItems;

      if (event.lstQuotationItems != null && typeof (event.lstQuotationItems) != undefined) {

        var res = ((event.lstQuotationItems).replace(/\n/g, "")).replace(/'/g, "\"");
        var lst = JSON.parse(res);

        var that = this;
        if (lst != null && lst != undefined) {
          if (lst.length > 0) {
            for (let i = 0; i < lst.length; i++) {

              var result = this.lstDCItems.filter(x => x.RefLineID33 === lst[i]["LineId"]);


              if (result.length > 0) {

                (window as any).swal({
                  icon: "warning",
                  title: "Are you sure?",
                  text: "This Item is already exist, Are you want to continue ?",

                  buttons: [
                    'No, cancel it!',
                    'Yes, I am sure!'
                  ],
                  dangerMode: true,
                }).then(function (isConfirm) {
                  debugger;
                  if (isConfirm) {

                    that.PushMethods(lst, i);
                  }

                });

              }
              else {
                let lstDCItems=[];
                this.lstDCItems.forEach((element ,index)=> {
                  lstDCItems[index]={...element};
                });
                this.lstDCItems=lstDCItems;
                lst[i]["SNO"] = (that.lstDCItems.length + 1);
                lst[i]["RefLineID33"] = lst[i]["LineId"];
                lst[i]["LineId"]=0;
                lst[i]["RefType1"] = "SalesQuotation";
                lst[i]["RefNo2"] = that.DisplayTransactionNo;
                lst[i]["RefDate3"] = that.DispalyTransactionDate;
                lst[i]["RefId"] = that.SalesQuotationTransactionId;
                that.lstDCItems.push(lst[i]);
              }
            }
          }
        }
      }

      this.CalculateTotals();
    }
    catch (error) { }

  }


  
  private PushMethods(lst: any, i: number) {

    for (let i = 0; i < lst.length; i++) {
      lst[i]["SNO"] = (this.lstDCItems.length + 1);
      lst[i]["RefLineID33"] = lst[i]["LineId"];
      lst[i]["RefType1"] = "SalesQuotation";
      lst[i]["RefNo2"] = this.DisplayTransactionNo;
      lst[i]["RefDate3"] = this.DispalyTransactionDate;
      lst[i]["RefId"] = this.SalesQuotationTransactionId;
      lst[i]["LineId"]=0;
      this.lstDCItems.push(lst[i]);
    }
  }

  StoreAccountLedger: StoreAccountLedger;
OpenAccountLedger(){
  debugger;
  this.StoreAccountLedger=new StoreAccountLedger;
  this.APICall.UpdatedSelectedPath('./Accounting/AccountLedger');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreAccountLedger.AccountId=this.f.PartyId.value;
this.StoreAccountLedger.AccountName=this.f.PartyName.value;
this.StoreAccountLedger.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreAccountLedger));         
this.router.navigate(['Accounting/AccountLedger']);
}




  RemoveItem(e: any) {
    
   this.RemoveItemClick(e);
  this.CalculateTotals()
}


InvoiceType = "";
  InvoiceTypeChange(target) {
    debugger;
    if (target.value == "Import") {
      this.InvoiceType = "Import";
    }
    else {
      this.InvoiceType = target.value;
    }
    this.CalculateTotals();

  }
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel() {  
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement); 
    ws['!cols'] = [{ width: 10}, { width: 20 }, { width: 30 } ]; 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'DeliveryChallan.xlsx');  
  
  }
  
  @ViewChild('PDFTable',{static:false}) pdfTable: ElementRef;
  
   public downloadAsPDF() {
     debugger;
    //   const pdfTable = this.pdfTable.nativeElement;
    //   var html = htmlToPdfmake(pdfTable.innerHTML);
    //   const documentDefinition = { content: html };
    //  pdfMake.createPdf(documentDefinition).download(); 
     
   }

   ExportTOExcel1(event){
    if(event == true){
  
    }
  }
  downloadAsPDF1(event){
    if(event == true){
      
    }
  }
  
  download(){
    debugger;
    if(this.ExportTOExcel1){ 
      this.ExportTOExcel();
    }
    else if (this.downloadAsPDF1){
      this.downloadAsPDF();
    }
  }
  
   Customer:Customer;
  lstCustomers:any=[];
  LoadCustomers(e)
  {
    try{
 
     if(AppSettings.ShowLoaderOnView)
     {
   //  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
  $("#loaderParent").show();
     }
     var sstring='';
    debugger;
     this.APICall.DBCalling("ViewCustomers",sstring,this.FilterType,this.DisplayCustomerId,this.APICall.GetCompanyID()).subscribe(
       (res:Response) => {
         debugger;
         this.lstDbResult=JSON.parse(res['Message']);
       
         
         this.lstCustomers=[]
         if(this.lstDbResult.Table.length>0)
         {
            var list
          this.lstCustomers=this.lstDbResult.Table[0];
     
          list= Object.assign({},this.lstCustomers);
   


          this.Customer= Object.assign({},this.lstCustomers);
          if(this.selectedCustomer!=undefined && this.selectedCustomer!=null )
          {    
           this.selectedCustomer.ViewName="RequestFrom";
            this.Customer=Object.assign({},this.selectedCustomer);  
        }
       
         this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
         
         var ActivatedRoute=localStorage.getItem("ActivatedRoute");
          this.Customer.TabId=ActivatedRoute;
        this.store.dispatch(new  TabStore.AddTab(this.Customer));         
        this.router.navigate(['Sales/CreateCustomer']);






   
         }
         $("#loaderParent").hide();
        
       
        
       
       
       });
      
    }
    catch(error)
    {
 
     }
     return  this.lstCustomers;
   }
          
CustomerMaster(){
  debugger;

  this.Customer=new Customer;
  
  this.LoadCustomers(this.DisplayCustomerId)

}

  }
