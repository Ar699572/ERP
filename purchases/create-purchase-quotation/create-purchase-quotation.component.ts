import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import * as XLSX from 'xlsx'; 
import    '../../../assets/vendors/datepicker/daterangepicker.js';
import    "../../../assets/vendors/datepicker/daterangepicker.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import    "../../../assets/vendors/datepicker/daterangepicker.css";
import    '../../../assets/vendors/datepicker/daterangepicker.js';
import { Store } from '@ngrx/store';
import { PurchaseQuotation } from 'src/app/Store/StorePurchaseQuotation';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Vendor } from 'src/app/store/StoreVendor';
@Component({
  selector: 'app-create-purchase-quotation',
  templateUrl: './create-purchase-quotation.component.html',
  styleUrls: ['./create-purchase-quotation.component.css']
})
export class CreatePurchaseQuotationComponent implements OnInit {
  // title = 'jspdf-autotable-demo';
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  CreatePurchaseQuotation:FormGroup;
  TransactionType="Purchase";
  DisplayVendorId=0;
  Invoiceno:string="";
  DispalyVendorName="";
  DisplaySequenceNumberId=0;
  DispalyFormName='PurchaseQuotation'

  QuotationData:any;
  constructor(private DbCallings:CommonDbCallings,private router:Router,private formBuilder: FormBuilder,public APICall:APICallingService,private store: Store<any>) {
debugger;
var res=this.APICall.GetCurrencyId();
this.CreatePurchaseQuotation=formBuilder.group(


  {
    SequenceNumberId:new FormControl(0),
    Contactno:new FormControl(''),
    Email:new FormControl('',[Validators.email]),
    RequiredDate:new FormControl('',[Validators.required]),
    Billto:new FormControl(''),
    Shipto:new FormControl(0), 
    ShiptoAddress:new FormControl(''), 
    CurrencyId:new FormControl(this.APICall.GetCurrencyId()), 
    ExchangeRate:new FormControl(1), 
    Terms:new FormControl(''),
    TermsandConditions:new FormControl(''),
    PaymentTerms:new FormControl(''),
   // TransactionTime:new FormControl('',[Validators.required]),
    TransactionDate:new FormControl(''),
    TransactionId:new FormControl(0),
    TransactionNo:new FormControl(''),

    Vendorreference:new FormControl(''),
    vdate:new FormControl(''),
    Incoterms:new FormControl(''),
    PartyId:new FormControl(0,[Validators.required,Validators.min(1)]),
    PartyName:new FormControl(''),
    PurchaseRepresentative:new FormControl(''),
        PurchaseType:new FormControl(''),
    LineChanges:new FormControl(0),
    SearchString:new FormControl(''),
    searchPartNo:new FormControl(''),
    searchDescription:new FormControl(''),
    searchMake:new FormControl(''),
    searchHSN:new FormControl('')

  }
 
);
// setInterval(() => {
//   debugger;
  this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
//  this.f.TransactionTime.setValue(this.CurrentTime);
//}, 1);


this.router.routeReuseStrategy.shouldReuseRoute = function(){
  return false;
}  

   }

   
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

  this.QuotationData=this;
}

   submitted=false;
  OnSave()
  {
debugger;
    this.submitted=true;
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());
 
  //  this.f.TransactionTime.setValue($("#TransactionTime").val());
   
if(this.CreatePurchaseQuotation.invalid)
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

  
  // if(this.f.TransactionTime.invalid && Cvalid)
  // {
  //   debugger;
  //   this.windowScroll('TransactionTime');
  //   Cvalid=false;
  // }




  return;
}
else
{
  if(this.lstQuotationItems.length>0)
  {
    this.SaveTransaction();
  }
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

      that.DeletePurchaseQuotation();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }

  });

}
DeletePurchaseQuotation()

{

  if(this.ModifiedDate.toString().includes('India'))
  {
  
    var date = new  Date (this.ModifiedDate);
  
    
    this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
  }
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
  $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<TransactionId>'+this.getControlValue(this.f.TransactionId,'int')+'</TransactionId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
 +'<TransactionNo>'+this.getControlValue(this.f.TransactionNo,'string')+'</TransactionNo>'
 +'</Table1></NewDataSet>';

 this.APICall.DBCalling("DeletePurchaseQuotation",xml1,"","","").subscribe(
   (res:Response) => {

     $("#loaderParent").hide();
     this.DbResult=JSON.parse(res['Message']);
debugger;
     //  var l=this.DbResult.Table[0].length;
      // var tr=this.DbResult.Table[0].DBresult;
       if(this.DbResult.Table.length>0 &&this.DbResult.Table[0].DBresult>0)
       {
     //  this.ClearViewData();

      (window as any).swal({
        icon: 'success',
        title: 'Information!',
        text: 'Record Deleted successfully.',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-success'
    });
   
    this.router.navigate(['Purchase/PurchaseQuotation']);
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
  debugger;
  this.submitted=false;
  this.ModifiedDate="";
  this.CreatePurchaseQuotation.patchValue(


    {
      SequenceNumberId:0,
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
  //    TransactionTime:'',
      TransactionDate:'',
      TransactionId:0,
      TransactionNo:'',
  
      PartyId:0,
      
      
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
//$("#TransactionTime").val(this.CurrentTime)
this.lstQuotationItems=null;
             this.lstQuotationItems  = [];
             this.lstTermsChild=null;
             this.lstTermsChild  = [];
             this.DisplayVendorId=0;
             this.DispalyVendorName="";
             this.DisplaySequenceNumberId=0;
             this.TotalGross=0;
             this.TotalCGST=0;
             this.TotalSGST=0;
             this.TotalIGST=0;
             this.TotalDiscount=0;
this.TotalTax=0;
this.Total=0;
debugger;
this.StorePurchaseQuotation=new PurchaseQuotation;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePurchaseQuotation.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StorePurchaseQuotation));



}


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
   ModifiedDate="";
   DbResult:any  = [];
   SaveTransaction()
   {
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());
  //  this.f.TransactionTime.setValue($("#TransactionDate").val()+' '+$("#TransactionTime").val());
    


    if(this.ModifiedDate.toString().includes('India'))
    {
    
      var date = new  Date (this.ModifiedDate);
    
      
      this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }
    

     $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
      
     $("#loaderParent").show();
   

   
     var xml1='<NewDataSet><Table1>'
     
     +'<ShiptoAddress>'+this.getControlValue(this.f.ShiptoAddress,'string')+'</ShiptoAddress>'
     +'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'int')+'</SequenceNumberId>'
     +'<PartyId>'+this.getControlValue(this.f.PartyId,'int')+'</PartyId>'
     +'<Billto>'+this.getControlValue(this.f.Billto,'string')+'</Billto>'
     +'<TransactionNo>'+this.getControlValue(this.f.TransactionNo,'string')+'</TransactionNo>'

     +'<Shipto>'+this.getControlValue(this.f.Shipto,'string')+'</Shipto>'
     
     

     +'<CurrencyId>'+this.getControlValue(this.f.CurrencyId,'int')+'</CurrencyId>'
     +'<ExchangeRate>'+this.getControlValue(this.f.ExchangeRate,'int')+'</ExchangeRate>'

     //+'<TransactionTime>'+this.convertDate(this.getControlValue(this.f.TransactionTime,'string'))+'</TransactionTime>'
     +'<date1>'+this.convertDate(this.getControlValue(this.f.vdate,'string'))+'</date1>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<Email>'+this.getControlValue(this.f.Email,'string')+'</Email>'
     
   
     +'<TermsandConditions>'+this.getControlValue(this.f.TermsandConditions,'string')+'</TermsandConditions>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<TotalGross>'+this.TotalGross+'</TotalGross>'
     +'<PurchaseType>'+this.getControlValue(this.f.PurchaseType,'string')+'</PurchaseType>'
     +'<Vendorreference>'+this.getControlValue(this.f.Vendorreference,'string')+'</Vendorreference>'
 
     
     +'<Incoterms>'+this.getControlValue(this.f.Incoterms,'string')+'</Incoterms>'
   +'<PurchaseRepresentative>'+this.getControlValue(this.f.PurchaseRepresentative,'string')+'</PurchaseRepresentative>'
    
     +'<StartDate>'+this.getControlValue(this.f.TransactionDate,'string')+'</StartDate>'
   +'<RequiredDate>'+this.getControlValue(this.f.RequiredDate,'string')+'</RequiredDate>'
     +'<PaymentTerms>'+this.getControlValue(this.f.PaymentTerms,'string')+'</PaymentTerms>'
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
  
       for(var i=0;i<this.lstQuotationItems.length;i++)
       {
  
        rows=rows+'<Table1>'
       +'<LineId>'+this.lstQuotationItems[i].LineId+ '</LineId>'
       +'<Description>'+this.lstQuotationItems[i].Description+ '</Description>'
       +'<Partno>'+this.lstQuotationItems[i].Partno+ '</Partno>'

       +'<ItemId>'+this.lstQuotationItems[i].ItemId+ '</ItemId>'
       +'<MakeId>'+this.lstQuotationItems[i].MakeId+ '</MakeId>'
       +'<UOMId>'+this.lstQuotationItems[i].UOMId+ '</UOMId>'
       +'<Make>'+this.lstQuotationItems[i].Make+ '</Make>'
       +'<UOM>'+this.lstQuotationItems[i].UOM+ '</UOM>'
       +'<Rate>'+this.lstQuotationItems[i].Rate+ '</Rate>'
       +'<Qty>'+this.lstQuotationItems[i].Qty+ '</Qty>'
       +'<Gross>'+this.lstQuotationItems[i].Gross+ '</Gross>'
       +'<DiscountPercentage>'+this.lstQuotationItems[i].DiscountPercentage+ '</DiscountPercentage>'
       +'<DiscountAmount>'+this.lstQuotationItems[i].DiscountAmount+ '</DiscountAmount>'
       +'<CGST>'+this.lstQuotationItems[i].CGST+ '</CGST>'
       +'<CGSTAmount>'+this.lstQuotationItems[i].CGSTAmount+ '</CGSTAmount>'
       +'<SGST>'+this.lstQuotationItems[i].SGST+ '</SGST>'
       +'<SGSTAmount>'+this.lstQuotationItems[i].SGSTAmount+ '</SGSTAmount>'
       +'<IGST>'+this.lstQuotationItems[i].IGST+ '</IGST>'
       +'<IGSTAmount>'+this.lstQuotationItems[i].IGSTAmount+ '</IGSTAmount>'
       +'<TotalTax>'+this.lstQuotationItems[i].TotalTax+ '</TotalTax>'
       +'<NetTotal>'+this.lstQuotationItems[i].NetTotal+ '</NetTotal>'
       +'<TaxType>'+this.lstQuotationItems[i].TaxType+ '</TaxType>'
     

       +'<HSN>'+this.lstQuotationItems[i].HSN+ '</HSN></Table1>'
       
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

      //  +'<TermDetailsID>'+this.lstTermsChild[i].TermDetailsID+ '</TermDetailsID>'
       

       +'<PurchaseQuotationTermDetailsId>'+this.lstTermsChild[i].PurchaseQuotationTermDetailsId+ '</PurchaseQuotationTermDetailsId></Table1>'
       
       }
       xml3='<NewDataSet>'+rows+'</NewDataSet>';

       debugger;
       this.APICall.DBCalling("SavePurchaseQuotation",xml1,xml2,xml3,"").subscribe(
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
          this.router.navigate(['Purchase/PurchaseQuotation']);
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
        this.router.navigate(['Purchase/PurchaseQuotation']);
        }
     
            debugger;
             this.lstQuotationItems=null;
             this.lstQuotationItems  = [];
             this.lstTermsChild=null;
             this.lstTermsChild  = [];
            
               if(this.DbResult.Table.length>0  )
               {
     
                 try{
               
     if(this.DbResult.Table1.length>0)//lstres[0].Table=="PurchaseQuotation1")
     {
      //var res1=JSON.parse((( this.DbResult.Table1[0].lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\""));
      var lstresQuotationItems=JSON.parse((( this.DbResult.Table1[0].lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\""));
      var i=0;
      var  QuotationItemsdata = $.map(lstresQuotationItems, function (obj) {
        i=i+1;
        obj.SNO = i; 
     
        return obj;
      });

                 this.lstQuotationItems=QuotationItemsdata;
     
     
     }
    }catch(exce)
    {}
    try{
     if(this.DbResult.Table2.length>0)//lstres[0].Table=="PurchaseQuotationTermDetails")
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
 
     
               }
               
     
     
            
             
              
          }else{
     
     
     
     if(this.DbResult.Table[0].DBresult==-3)
     {
     (window as any).swal({
      icon: 'warning',
      title: 'Exists',
      text: 'Quotation Already Exists.!',
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
    
    ,CurrencyRate:0
    
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
  SNO: (this.lstQuotationItems.length==0?1:(this.lstQuotationItems.length+1))
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
  
  ,CurrencyRate:0
  
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
  if(this.lstQuotationItems.length>0)
  {
  var xmlHsnInfo="";
  var rows="";

  for(var i=0;i<this.lstQuotationItems.length;i++)
  {

   rows=rows+'<Table1><HSN>'+this.lstQuotationItems[i].HSN+ '</HSN></Table1>'
  
  
  }
  xmlHsnInfo='<NewDataSet>'+rows+'</NewDataSet>';



  
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
 
  $("#loaderParent").show();
  this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo,this.TaxType,this.TransactionDate).subscribe(
    (res) => {

  
$("#loaderParent").click();
      debugger;
      this.lstDbResult=JSON.parse(res['Message']);
      
        
     
      if(this.lstDbResult.Table.length>0)
      {
       var resultInfo=this.lstDbResult.Table;
  
       
       for(var i=0;i<this.lstQuotationItems.length;i++)
       {
        this.lstQuotationItems[i].CGST=0;
        this.lstQuotationItems[i].SGST=0;
        this.lstQuotationItems[i].IGST=0;
    
        this.lstQuotationItems[i].CGSTAmount=0;
        this.lstQuotationItems[i].SGSTAmount=0;
        this.lstQuotationItems[i].IGSTAmount=0;
        var  ResultItem = resultInfo.filter(d => d.HSN === this.lstQuotationItems[i].HSN);
        if(ResultItem.length>0)
        {
         
          debugger;
          for (let j=0;j<  ResultItem.length;j++)
          {
          if(ResultItem[j].TaxType=="CGST")
          {
            this.lstQuotationItems[i].CGST=(ResultItem[j].TaxPercentage2);
            
          
          }
          
          if(ResultItem[j].TaxType=="SGST")
          {
            this.lstQuotationItems[i].SGST=(ResultItem[j].TaxPercentage2);
            
          
          }
          
          if(ResultItem[j].TaxType=="IGST")
          {
            this.lstQuotationItems[i].IGST=(ResultItem[j].TaxPercentage2);
          
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
             for(var  i=0;i<this.lstQuotationItems.length;i++)
                {
     
                 if ((this.lstQuotationItems[i].Partno).toString().includes(searchPartNo) || 
                 
                 (this.lstQuotationItems[i].Make).toString().includes(searchDescription) || 
                 (this.lstQuotationItems[i].Description).toString().includes(searchMake) || 
                 (this.lstQuotationItems[i].HSN).toString().includes(searchHSN) 
                 
                 )
                 {
     
     
                 
                 this.lstQuotationItems[i].Show='true';
                }else{
                 this.lstQuotationItems[i].Show='false';
     
     
                }
           }
         }
     
           
         }
         else{
          
           
             for(var  i=0;i<this.lstQuotationItems.length;i++)
                {
                  
                 if ((this.lstQuotationItems[i].Partno)==((searchPartNo)!=""? (searchPartNo):this.lstQuotationItems[i].Partno) &&
                 
                 (this.lstQuotationItems[i].Make)==((searchMake)!=""? (searchMake):this.lstQuotationItems[i].Make) &&
                 (this.lstQuotationItems[i].Description)==((searchDescription)!=""? (searchDescription):this.lstQuotationItems[i].Description)  &&
                 (this.lstQuotationItems[i].HSN)==((searchHSN)!=""? (searchHSN):this.lstQuotationItems[i].HSN) 
                 
                 )
                 {
     
     
                 
                 this.lstQuotationItems[i].Show='true';
                }else{
                 this.lstQuotationItems[i].Show='false';
     
     
                        
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
  
    for(var  i=0;i<this.lstQuotationItems.length;i++)
    {
  
     if (
       
      (this.lstQuotationItems[i].Partno).toString().includes(SearchString)  ||
      (this.lstQuotationItems[i].Make).toString().includes(SearchString)  ||
      (this.lstQuotationItems[i].HSN).toString().includes(SearchString)  ||
      (this.lstQuotationItems[i].Description).toString().includes(SearchString)  
     
      //(this.lstQuotationItems[i].ExcessRsPerKms).toString().includes(SearchString)  
      )
     {
  
  
     
     this.lstQuotationItems[i].Show='true';
    }else{
     this.lstQuotationItems[i].Show='false';
  
  
    }
  }
  
  }
  return SearchString;


}
PartySaved(e)
{
  
}
lstCurrencies:any=[];
GetCurrency()
{

 
  
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
 
 $("#loaderParent").show();
  
   
   debugger;
    // this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","").subscribe(
    //   (res:Response) => {
      this.DbCallings.GetCurrencies().subscribe(
        (res) => {
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        
        this.lstCurrencies=[];
        if(this.lstDbResult.Table.length>0)
        {
          this.lstCurrencies=this.lstDbResult.Table;
    

          
         
        }

        $("#loaderParent").hide();
      });
}


PartyType='Vendor';
Search()
{
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
  this.APICall.UpdatedSelectedPath('./Purchase/PurchaseQuotation');
  this.router.navigate(['Purchase/PurchaseQuotation']);
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
   return this.CreatePurchaseQuotation.controls;
  
 } 
 TotalCharges:string="";
 lstQuotationItems:any=[];
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
for(var  i=0;i<this.lstQuotationItems.length;i++)
{
if( data.SNO!=this.lstQuotationItems[i].SNO && this.lstQuotationItems[i].Partno==data.Partno)
{
validate=false;
this.showError=true;
this.errormsg="Already exists!";
break;

}  

}
}else{

  validate=false;
  this.showError=true;
  this.errormsg="Invalid Data!";

}

return validate;
}

AddItemAndNewClick(event)
{
  
this.AddItem('New',event.SelecedRow)
}
AddItemAndCloseClick(event)
{
  
this.AddItem('Close',event.SelecedRow)
}
EditItemClick(data)
{
  this.EditRecNO=0;
debugger;

if(this.CompanyStateId!=this.SelectedState)
{
this.TaxType="Inter State";
}else{

this.TaxType="Intra State";
}
this.errormsg="";
  this.SelectedProductData=Object.assign({}, data);

}


AddItem(type,data)
{
debugger;
if(this.ValidateItem(data))
{

//let WeekName:string= this.from


for(var  i=0;i<this.lstQuotationItems.length;i++)
{
this.lstQuotationItems[i].Show='true';


if(this.lstQuotationItems[i].SNO==data.SNO)
{


//  this.lstQuotationItems[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
this.lstQuotationItems[i].Partno=data.Partno;
this.lstQuotationItems[i].ItemId=data.ItemId;
this.lstQuotationItems[i].MakeId=data.MakeId;
this.lstQuotationItems[i].Description=data.Description;

this.lstQuotationItems[i].Make=data.Make;
this.lstQuotationItems[i].UOM=data.UOM;
this.lstQuotationItems[i].UOMId=data.UOMId;

this.lstQuotationItems[i].Rate=data.Rate;


this.lstQuotationItems[i].Qty=(+data.Qty);

this.lstQuotationItems[i].CurrencyRate=data.Rate*(+this.f.ExchangeRate.value);

this.lstQuotationItems[i].Gross=(+data.Gross)*(+this.f.ExchangeRate.value);
this.lstQuotationItems[i].DiscountPercentage=(+ data.DiscountPercentage);
this.lstQuotationItems[i].DiscountAmount=(+data.DiscountAmount)*(+this.f.ExchangeRate.value);



this.lstQuotationItems[i].CGST=(+data.CGST);
this.lstQuotationItems[i].CGSTAmount	=(+data.CGSTAmount)*(+this.f.ExchangeRate.value);
this.lstQuotationItems[i].SGST=(+data.SGST);




this.lstQuotationItems[i].SGSTAmount=(+data.SGSTAmount)*(+this.f.ExchangeRate.value);
this.lstQuotationItems[i].IGST=(+data.IGST);
this.lstQuotationItems[i].IGSTAmount=(+data.IGSTAmount)*(+this.f.ExchangeRate.value);



this.lstQuotationItems[i].TotalTax=(+data.TotalTax)*(+this.f.ExchangeRate.value);
this.lstQuotationItems[i].NetTotal=(+data.NetTotal)*(+this.f.ExchangeRate.value);

this.lstQuotationItems[i].TaxType=data.TaxType;



this.lstQuotationItems[i].HSN=data.HSN;



}
}
if(this.EditRecNO==-1)
{
var res=
       ({
        SNO:this.lstQuotationItems.length+1
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
        ,CurrencyRate:(data.Rate*(+this.f.ExchangeRate.value))
        
        
        ,Gross:(+data.Gross)*(+this.f.ExchangeRate.value)
        ,DiscountPercentage:(+ data.DiscountPercentage)
        ,DiscountAmount:(+data.DiscountAmount)*(+this.f.ExchangeRate.value)
        
        
        
        ,CGST:(+data.CGST)
        ,CGSTAmount	:(+data.CGSTAmount)*(+this.f.ExchangeRate.value)
        ,SGST:(+data.SGST)
        
        
        
        
        ,SGSTAmount:(+data.SGSTAmount)*(+this.f.ExchangeRate.value)
        ,IGST:(+data.IGST)
        ,IGSTAmount:(+data.IGSTAmount)*(+this.f.ExchangeRate.value)
        
        
        
        ,TotalTax:(+data.TotalTax)*(+this.f.ExchangeRate.value)
        ,NetTotal:(+data.NetTotal)*(+this.f.ExchangeRate.value)
        
        ,TaxType:data.TaxType
        
        
        
        ,HSN:data.HSN


     
       ,Show:'true'
       });

if(this.lstQuotationItems.length==0)
{
this.lstQuotationItems=[res];

}
else{
this.lstQuotationItems.push(res);

}
}
// this.EditRecNO=0;

//       // this.ClearSelectedValues();

//        if(type=='Close')
//        {
//          $("#btnCloseAddItem").trigger('click');
//        }
if(type=='Close')
{
  $("#btnCloseAddItem").trigger('click');
  this.EditRecNO=0;
}else{

 this.EditRecNO=-1;

}
       this.SNO=this.lstQuotationItems.length+1;
       this.CalculateTotals();
       this.f.LineChanges.setValue(0);
}

}



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
  this.TotalDiscount=0;
  this.TotalTax=0;
  this.Total=0;
  this.TotalCGST=0;
  this.TotalSGST=0;
  this.TotalIGST=0;
  this.AfterDiscount=0;
for(let i=0;i<this.lstQuotationItems.length;i++)

{
 
 // this.lstQuotationItems[i]
 this.lstQuotationItems[i].Gross=((+this.lstQuotationItems[i].Qty)*((+this.lstQuotationItems[i].Rate)*(+this.f.ExchangeRate.value)));

 this.lstQuotationItems[i].CurrencyRate=(this.lstQuotationItems[i].Rate*(+this.f.ExchangeRate.value))
 this.lstQuotationItems[i].DiscountAmount=(((+this.lstQuotationItems[i].Gross)*(+this.lstQuotationItems[i].DiscountPercentage))/100)*(+this.f.ExchangeRate.value)
var AfterDiscount=((+this.lstQuotationItems[i].Gross)-(+ this.lstQuotationItems[i].DiscountAmount));;

this.lstQuotationItems[i].SGSTAmount=(((+this.lstQuotationItems[i].SGST)*AfterDiscount)/100);
this.lstQuotationItems[i].CGSTAmount=(((+this.lstQuotationItems[i].CGST)*AfterDiscount)/100);
this.lstQuotationItems[i].IGSTAmount=(((+this.lstQuotationItems[i].IGST)*AfterDiscount)/100);
this.lstQuotationItems[i].TotalTax=(+this.lstQuotationItems[i].SGSTAmount)+(+this.lstQuotationItems[i].CGSTAmount)+(+this.lstQuotationItems[i].IGSTAmount);

this.TotalCGST=this.TotalCGST+(+this.lstQuotationItems[i].CGSTAmount);
  this.TotalSGST=this.TotalSGST+(+this.lstQuotationItems[i].SGSTAmount);
  this.TotalIGST=this.TotalIGST+(+this.lstQuotationItems[i].IGSTAmount);
  this.TotalGross=this.TotalGross+(+this.lstQuotationItems[i].Gross);
  this.TotalDiscount=this.TotalDiscount+(+this.lstQuotationItems[i].DiscountAmount);
  this.TotalTax=this.TotalTax+(+this.lstQuotationItems[i].TotalTax);
  this.lstQuotationItems[i].NetTotal=((AfterDiscount+(+this.lstQuotationItems[i].TotalTax))).toFixed(2);

  this.Total=this.Total+(+this.lstQuotationItems[i].NetTotal);

}
this.AfterDiscount=this.TotalGross-this.TotalDiscount;
this.PaymentTermsAmountCalc();
}

ExchangeRateChange(target)
{
  this.CalculateTotals()


}
PayNameChange(target,index)
{

  this.lstTermsChild[index].PayName=target.value;
}
PayPercentageChange(target,index)
{
  if((+target.value)>0 && (+target.value)<101)
  {
  this.lstTermsChild[index].PayPercentage=target.value;
  this.PaymentTermsAmountCalc();
  }else{
    target.value=this.lstTermsChild[index].PayPercentage;


  }
}

RemoveTerm(index)
{

  this.lstTermsChild.splice(index,1);
  this.PaymentTermsAmountCalc();
}
ValidateTerms():boolean
{
debugger;
var validate=true;


var resflter=this.lstTermsChild.filter(x=>  (x.PayName=="" || x.PayPercentage==0 ||  x.Amount==0));


if(resflter.length>0)
{

  validate=false;
}
return validate;

}
termValiidate=true;
AddTerms()
{
  debugger;
  // lstTermsChild
  this.termValiidate=this.ValidateTerms();
  if(this.termValiidate)
  {
this.lstTermsChild.push({PayName:"",PayPercentage:0,Amount:0,PurchaseQuotationTermDetailsId:0});
  }
  



}
RemoveItemClick(event)
{
  debugger;
    
  var  sliceIndex=-1;
  for(var  i=0;i<this.lstQuotationItems.length;i++)
  {
   this.lstQuotationItems[i].Show='true';
 
   if(this.lstQuotationItems[i].SNO==event.SNO)
   {
   sliceIndex=i;
   }
  }
if(sliceIndex>-1)
{
  this.lstQuotationItems.splice(sliceIndex, 1);

  for(var  i=0;i<this.lstQuotationItems.length;i++)
  {
    this.lstQuotationItems[i].SNO=i+1;
  }
}

  //this.EditRecNO=-1;
  this.SNO=this.lstQuotationItems.length+1;
 // this.ClearSelectedValues();
  this.CalculateTotals();
  $("#btnCloseAddItem").trigger('click');
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
           
        obj.PurchaseQuotationTermDetailsId = 0; 
       
 
  
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

 
  
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
 
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

 
  
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
 
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
  TransactionDate: (window as any).moment().startOf('hour'),
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
//   $(this).val(picker.TransactionDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
// });

(window as any).$('input.create-event-datepicker').daterangepicker({
  singleDatePicker: true,
  showDropdowns: true,
  autoUpdateInput: false
}).on('apply.daterangepicker', function(ev, picker) {
 debugger;
  $(this).val(picker.TransactionDate.format('MM/DD/YYYY'));
});

}
ngAfterViewInit(){
  var that=this;
  if(this.StorePurchaseQuotation.RequiredDate!='')
  {
  this.f.RequiredDate.setValue(formatDate(new Date(this.StorePurchaseQuotation.RequiredDate), 'MM/dd/yyyy', 'en'));
  this.f.TransactionDate.setValue(formatDate(new Date(this.StorePurchaseQuotation.StartDate), 'MM/dd/yyyy', 'en'));
 // var TransactionTime=  formatDate(new Date(this.StorePurchaseQuotation.vdate), 'HH:mm', 'en');
  }else{
    this.f.RequiredDate.setValue(formatDate(new Date(), 'MM/dd/yyyy', 'en'));
    this.f.TransactionDate.setValue(formatDate(new Date(), 'MM/dd/yyyy', 'en'));
   // var TransactionTime=  formatDate(new Date(), 'HH:mm', 'en');
  }  
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
  this.f.Shipto.setValue(DefaultData.ShippingInfogrv_grv4_3Id);
  

}
lstShippings:any=[];
lstDbResult:any=[];
QuotDateChange(e)
{
  
}

DeviceType="";
StorePurchaseQuotation: PurchaseQuotation;
ngOnInit() {
debugger;
  this.DeviceType= localStorage.getItem('DeviceType')

  this.StorePurchaseQuotation=new PurchaseQuotation;

  var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
  var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


  //var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "PurchaseQuotation"; });
  if (result.length > 0) {
    debugger;
    this.StorePurchaseQuotation=( result[0] );
  this.ModifiedDate =this.StorePurchaseQuotation.ModifiedDate;
  this.BillToStateCode=this.StorePurchaseQuotation.BillToStateCode;
  this.BillToStateName=this.StorePurchaseQuotation.BillToStateName;
  this.DispalyVendorName=this.StorePurchaseQuotation.PartyName;
  this.Invoiceno=this.StorePurchaseQuotation.TransactionNo;
  
  this.DisplayVendorId=this.StorePurchaseQuotation.PartyId;
  this.SelectedState=this.StorePurchaseQuotation.SelectedState;
  this.PartyGSTNo=this.StorePurchaseQuotation.PartyGSTNo;
  this.lstQuotationItems=this.StorePurchaseQuotation.lstQuotationItems==null?[]:this.StorePurchaseQuotation.lstQuotationItems;
this.TaxType=this.StorePurchaseQuotation.TaxType;
  var i=0;
  var that=this;
  var  lstQuotationItemsdata = $.map(this.lstQuotationItems, function (obj) {
  i=i+1;
  obj.SNO = i; 
  return obj;
  });
  this.lstQuotationItems=lstQuotationItemsdata;




  
  this.lstTermsChild=this.StorePurchaseQuotation.lstTermsChild==null?[]:this.StorePurchaseQuotation.lstTermsChild;

  var i=0;

  var  lstTermsChilddata = $.map(this.lstTermsChild, function (obj) {
  i=i+1;
  obj.SNO = i; 
  return obj;
  });
  this.lstTermsChild=lstTermsChilddata;

  if(this.StorePurchaseQuotation.RequiredDate!='')
  {
  var RequiredDate= formatDate(new Date(this.StorePurchaseQuotation.RequiredDate), 'MM/dd/yyyy', 'en');
  var TransactionDate= formatDate(new Date(this.StorePurchaseQuotation.StartDate), 'MM/dd/yyyy', 'en');
 // var TransactionTime=  formatDate(new Date(this.StorePurchaseQuotation.vdate), 'HH:mm', 'en');
  }else{
    var RequiredDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
    var TransactionDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
   // var TransactionTime=  formatDate(new Date(), 'HH:mm', 'en');
  }  
  debugger;

  
  $("#RequiredDate").val(RequiredDate)
$("#TransactionDate").val(TransactionDate)
//$("#TransactionTime").val(TransactionTime)
this.TransactionDate=TransactionDate;
debugger;
  this.CreatePurchaseQuotation.patchValue(this.StorePurchaseQuotation);

  this.f.vdate.setValue(formatDate(this.StorePurchaseQuotation.vdate, 'yyyy-MM-dd', 'en'));
  
  //this.ShippingDetailsPartyId(this.StorePurchaseQuotation.PartyId,false);
  this.GetCurrency();
  }
  this.CalculateTotals();


  var that=this;
  this.CreatePurchaseQuotation.valueChanges.subscribe(value => {
   that.StorePurchaseQuotation.SequenceNumberId=value.SequenceNumberId;
   that.StorePurchaseQuotation.Contactno=value.Contactno;
   that.StorePurchaseQuotation.Email=value.Email;
that.StorePurchaseQuotation.RequiredDate=value.RequiredDate;
that.StorePurchaseQuotation.Billto=value.Billto;
that.StorePurchaseQuotation.SelectedState=that.SelectedState;
that.StorePurchaseQuotation.CurrencyId=value.CurrencyId;
that.StorePurchaseQuotation.ExchangeRate=value.ExchangeRate;
//that.StorePurchaseQuotation.Shipto=value.Shipto;

//   that.StorePurchaseQuotation.ShiptoAddress=value.ShiptoAddress;
 //  that.StorePurchaseQuotation.Terms=value.Terms;
 //  that.StorePurchaseQuotation.TermsandConditions=value.TermsandConditions;
   

   that.StorePurchaseQuotation.BillToStateCode=that.BillToStateCode;
   that.StorePurchaseQuotation.BillToStateName= that.BillToStateName;

   that.StorePurchaseQuotation.TaxType=that.TaxType;
   
  // that.StorePurchaseQuotation.PaymentTerms=value.PaymentTerms;
   //that.StorePurchaseQuotation.TransactionTime=value.TransactionTime;
   that.StorePurchaseQuotation.TransactionDate=value.TransactionDate;
   that.StorePurchaseQuotation.TransactionId=value.TransactionId;

   that.StorePurchaseQuotation.TransactionNo=value.TransactionNo;
   that.StorePurchaseQuotation.PartyName=value.PartyName;
   that.StorePurchaseQuotation.PartyGSTNo=this.PartyGSTNo;
   
   that.StorePurchaseQuotation.PartyId=value.PartyId;

   that.StorePurchaseQuotation.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
   that.StorePurchaseQuotation.ViewName='PurchaseQuotation';

   that.StorePurchaseQuotation.lstQuotationItems= that.lstQuotationItems;
   
   that.StorePurchaseQuotation.lstTermsChild= that.lstTermsChild;
    that.store.dispatch(new TabStore.AddTab(that.StorePurchaseQuotation));
});

}
PrintCloseClick()
{
  this.QuotationData=null;
$("#btnCloseQuotationPrint").click();

}
  SelectedState=0;
  SelectedDate=($("#TransactionDate").val());
  BillToStateName='';
  BillToStateCode='';
  selectedVendor:Vendor
  VendorValueChange(event)
  {
    this.BillToStateName='';
    this.BillToStateCode='';
    debugger;
    this.selectedVendor=Object.assign({},event); 
    this.DisplayVendorId=event.VendorId;
this.SelectedState=event.state;
this.f.Email.setValue(event.email);
this.f.Contactno.setValue(event.Contactno);
this.f.PartyId.setValue(event.VendorId);
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

//this.f.ShiptoAddress.setValue(Address);
//this.ShippingDetailsPartyId(event.VendorId,true);

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

  Filterby="ExistEmail"
  NewEmail(){
    debugger;
    this.Filterby="NewEmail";
  }

  Existing(){
    debugger;
    this.Filterby="ExistEmail";
  }

  SendEmailForOrderConformation()

  {
   debugger;
    this.APICall.EmailSend('Mechknow','santosh@mechknowsoft.com',"test","hi").subscribe(
            (res) => {
              debugger;
              this.DbResult=JSON.parse(res['Message']);
            });

  }


  
Formate:string="";
Formate1:string="";
head = [['ID','CATEGORY','BRAND','MODEL','PART NO','DESC','QTY','CONDITION','MANUFACTURE']];

data:any=[];
tempdata:any=[];
PDF()
{
  debugger;
  this.head=Object.assign([],this.head)

  //this.data = this.lstRFQdetails;
  this.Formate1="";
this.Formate="PDF";
}
Excel()
{
  debugger;
  this.Formate="";
  this.Formate1="Excel";
}
Download()
{
  debugger;
if(this.Formate=="PDF")
{
  this.downloadPDF();
}
if(this.Formate1=="Excel")
{
  this.exportToExcel();
}
}
exportToExcel() {
  const ws: XLSX.WorkSheet =   
  XLSX.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'ItemDetails.xlsx');
 }
//  downloadPDF(){
//   let DATA = this.epltable.nativeElement;
//   let doc = new jsPDF('l','pt', 'a4');
//   doc.fromHTML(DATA.innerHTML,15,15,{
//     'width':400,
//     // autoSize:true,
//   });
//   doc.output('dataurlnewwindow');
//  }
 downloadPDF(){
   debugger;
 
    // let content=this.epltable.nativeElement;  
    // // let doc = new jsPDF();  
    // let _elementHandlers =  
    // {  
    //   '#editor':function(element,renderer){  
    //     return true;  
    //   }  
    // };  
    // doc.fromHTML(content.innerHTML,15,15,{  

    //   'width':190,  
    //   'elementHandlers':_elementHandlers  
    // });  

    // doc.save('test.pdf');  
    

}
StoreAccountLedger:StoreAccountLedger
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

// CustomerMaster(){
//   debugger;
// this.router.navigate(['Purchase/CreateVendor']);
// }
Vendor:Vendor
VendorMaster()
{
 
    debugger;
    this.Vendor=new Vendor;
    if(this.selectedVendor!=undefined && this.selectedVendor!=null)
    {    
      this.selectedVendor.ViewName="RequestFromDC";
      this.Vendor=Object.assign({},this.selectedVendor);  
    
    }
  
    this.APICall.UpdatedSelectedPath('./Purchase/CreateVendor');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.Vendor.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.Vendor));         
  this.router.navigate(['Purchase/CreateVendor']);

}

}
