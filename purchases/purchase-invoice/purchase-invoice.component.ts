import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';

import { StorePurchaseOrder } from 'src/app/Store/StorePurchaseOrder';

import { StoreGRN } from 'src/app/Store/StoreGRN';
import { formatDate } from '@angular/common';
import { StorePurchaseInvoice } from 'src/app/Store/StorePurchaseInvoice';

import * as TabStore from "src/app/store/TabStore/Tab.Actions";

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent implements OnInit {

  PurchaseInvoice:FormGroup;
  errormsg="";
  FromDate:any;
  ToDate:any;
  showError=false;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.PurchaseInvoice=formBuilder.group(
  
      {
    
        TransactionNo:new FormControl(''),
        CustomerName:new FormControl(''),
        
        Contactno:new FormControl(''),
        CustomerId:new FormControl(0),
        Customername:new FormControl(''),


    SearchString:new FormControl('')
      });
      
   }



//    CreatePurchaseInvoice(xml) {
  
//     debugger;
// //this.APICall.SetViewData(xml);


// this.StorePurchaseInvoice=new StorePurchaseInvoice;


// //this.StorePurchaseOrder.SequenceNumberId=xml.SequenceNumberId;
// this.StorePurchaseInvoice.Contactno= xml.Contactno;

// this.StorePurchaseInvoice.Email=xml.Email;
// this.StorePurchaseInvoice.RequiredDate=xml.RequiredDate;
// this.StorePurchaseInvoice.Billto=xml.Billto;
// this.StorePurchaseInvoice.Shipto=xml.Shipto;


// this.StorePurchaseInvoice.ReferenceNo=xml.TransactionNo;
// this.StorePurchaseInvoice.ReferenceType='PurchaseInvoice';


// this.StorePurchaseInvoice.ShiptoAddress=xml.ShiptoAddress;
// this.StorePurchaseInvoice.Terms=xml.Terms;
// this.StorePurchaseInvoice.TermsandConditions=xml.TermsandConditions;
// this.StorePurchaseInvoice.BillToStateCode=xml.BillToStateCode;
// this.StorePurchaseInvoice.BillToStateName=xml.BillToStateName;
// this.StorePurchaseInvoice.TaxType=xml.TaxType;
// this.StorePurchaseInvoice.PaymentTerms=xml.PaymentTerms;
// this.StorePurchaseInvoice.TransactionTime=xml.TransactionTime;
// this.StorePurchaseInvoice.TransactionTime=xml.TransactionTime;
// this.StorePurchaseInvoice.TransactionDate=xml.TransactionDate;
// this.StorePurchaseInvoice.TransactionId=0;
// this.StorePurchaseInvoice.TransactionNo='';
// this.StorePurchaseInvoice.PartyId=xml.PartyId;
// this.StorePurchaseInvoice.PartyName=xml.PartyName;
// this.StorePurchaseInvoice.PartyGSTNo=xml.PartyGSTNo;

// this.StorePurchaseInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
// this.StorePurchaseInvoice.ViewName='PurchaseInvoice';


// if(xml.lstInvoiceItems!=null && typeof(xml.lstInvoiceItems)!=undefined)
//    {
//    var res=((xml.lstInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
//    this.StorePurchaseInvoice.lstPurchaseInvoiceItems=JSON.parse(res);
   

//    for(let i=0;i<this.StorePurchaseInvoice.lstPurchaseInvoiceItems.length;i++)
//    {
//     this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].LineId=0;
    
//    }
//    }

// if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
//    {
//    var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
//    this.StorePurchaseInvoice.lstTermsChild=JSON.parse(res);
//    for(let i=0;i<this.StorePurchaseInvoice.lstTermsChild.length;i++)
//    {
//     this.StorePurchaseInvoice.lstTermsChild[i].LineId=0;
    
//    }
//    }





//    //

//    this.APICall.OpenPageFromRefernce('PurchaseInvoice','./Purchase/CreatePurchaseInvoice','Purchase')
//    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
//    this.StorePurchaseInvoice.TabId=ActivatedRoute;
//    this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
//    this.router.navigate(['Purchase/CreatePurchaseInvoice']);
//   }

   StorePurchaseInvoice: StorePurchaseInvoice;
   ViewPurchaseInvoice(xml) {
 
     this.StorePurchaseInvoice=new StorePurchaseInvoice;
     this.StorePurchaseInvoice.ReferenceType='PurchaseInvoice';
     this.StorePurchaseInvoice.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Purchase/PurchaseOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'PurchaseInvoice'} });
      this.APICall.OpenPageFromRefernce('PurchaseInvoice','./Purchase/PurchaseInvoice','Purchase')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StorePurchaseInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
 
    this.router.navigate(['Purchase/PurchaseInvoice']);
   }
 

   CreateGRN(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreGRN=new StoreGRN;


//this.StorePurchaseOrder.SequenceNumberId=xml.SequenceNumberId;
this.StoreGRN.Contactno= xml.Contactno;

this.StoreGRN.Email=xml.Email;
this.StoreGRN.RequiredDate=xml.RequiredDate;
this.StoreGRN.Billto=xml.Billto;
this.StoreGRN.Shipto=xml.Shipto;


this.StoreGRN.ReferenceNo=xml.TransactionNo;
this.StoreGRN.ReferenceType='PurchaseInvoice';


this.StoreGRN.ShiptoAddress=xml.ShiptoAddress;
this.StoreGRN.Terms=xml.Terms;
this.StoreGRN.TermsandConditions=xml.TermsandConditions;
this.StoreGRN.BillToStateCode=xml.BillToStateCode;
this.StoreGRN.BillToStateName=xml.BillToStateName;
this.StoreGRN.TaxType=xml.TaxType;
this.StoreGRN.PaymentTerms=xml.PaymentTerms;
this.StoreGRN.TransactionTime=xml.TransactionTime;

this.StoreGRN.TransactionDate=xml.TransactionDate;
this.StoreGRN.TransactionId=0;
this.StoreGRN.TransactionNo='';
this.StoreGRN.PartyId=xml.PartyId;
this.StoreGRN.PartyName=xml.PartyName;
this.StoreGRN.PartyGSTNo=xml.PartyGSTNo;

this.StoreGRN.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreGRN.ViewName='GRN';

debugger;
if(xml.lstInvoiceItems!=null && typeof(xml.lstInvoiceItems)!=undefined)
   {
   var res=((xml.lstInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreGRN.lstGRNItems=JSON.parse(res);
   

   for(let i=0;i<this.StoreGRN.lstGRNItems.length;i++)
   {
    this.StoreGRN.lstGRNItems[i].LineId=0;
    
   }
   }
debugger;
if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreGRN.lstTermsChild=JSON.parse(res);
   for(let i=0;i<this.StoreGRN.lstTermsChild.length;i++)
   {
    this.StoreGRN.lstTermsChild[i].LineId=0;
    
   }
   }





   //

   this.APICall.OpenPageFromRefernce('GRN','./Purchase/CreateGRN','Purchase')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreGRN.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreGRN));
   this.router.navigate(['Purchase/CreateGRN']);
  }

   StoreGRN: StoreGRN;
   ViewGRN(xml) {
 
     this.StoreGRN=new StoreGRN;
     this.StoreGRN.ReferenceType='PurchaseInvoice';
     this.StoreGRN.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Purchase/PurchaseOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'PurchaseInvoice'} });
      this.APICall.OpenPageFromRefernce('GRN','./Purchase/GRN','Purchase')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreGRN.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreGRN));
 
    this.router.navigate(['Purchase/GRN']);
   }
 


  
   
  XmlEdit="";
 // StorePurchaseInvoice: PurchaseInvoice;
  ViewPurchaseOrder(xml) {

    this.StorePurchaseOrder=new StorePurchaseOrder;
    this.StorePurchaseOrder.ReferenceType='PurchaseInvoice';
    this.StorePurchaseOrder.ReferenceNo=xml.TransactionNo;
   
  // this.router.navigateByUrl('/Purchase/PurchaseOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'PurchaseInvoice'} });
     this.APICall.OpenPageFromRefernce('PurchaseOrder','./Purchase/PurchaseOrder','Purchase')

     var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseOrder.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));

   this.router.navigate(['Purchase/PurchaseOrder']);
  }

  StorePurchaseOrder: StorePurchaseOrder;
  CreatePurchaseOrder(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StorePurchaseOrder=new StorePurchaseOrder;


//this.StorePurchaseOrder.SequenceNumberId=xml.SequenceNumberId;
this.StorePurchaseOrder.Contactno= xml.Contactno;

this.StorePurchaseOrder.Email=xml.Email;
this.StorePurchaseOrder.RequiredDate=xml.RequiredDate;
this.StorePurchaseOrder.Billto=xml.Billto;
this.StorePurchaseOrder.Shipto=xml.Shipto;


this.StorePurchaseOrder.ReferenceNo=xml.TransactionNo;
this.StorePurchaseOrder.ReferenceType='PurchaseInvoice';


this.StorePurchaseOrder.ShiptoAddress=xml.ShiptoAddress;
this.StorePurchaseOrder.Terms=xml.Terms;
this.StorePurchaseOrder.TermsandConditions=xml.TermsandConditions;
this.StorePurchaseOrder.BillToStateCode=xml.BillToStateCode;
this.StorePurchaseOrder.BillToStateName=xml.BillToStateName;
this.StorePurchaseOrder.TaxType=xml.TaxType;
this.StorePurchaseOrder.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseOrder.TransactionTime=xml.TransactionTime;

this.StorePurchaseOrder.TransactionDate=xml.TransactionDate;
this.StorePurchaseOrder.TransactionId=0;
this.StorePurchaseOrder.TransactionNo='';
this.StorePurchaseOrder.PartyId=xml.PartyId;
this.StorePurchaseOrder.PartyName=xml.PartyName;
this.StorePurchaseOrder.PartyGSTNo=xml.PartyGSTNo;

this.StorePurchaseOrder.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseOrder.ViewName='PurchaseOrder';


if(xml.lstInvoiceItems!=null && typeof(xml.lstInvoiceItems)!=undefined)
   {
   var res=((xml.lstInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseOrder.lstOrderItems=JSON.parse(res);
   

   for(let i=0;i<this.StorePurchaseOrder.lstOrderItems.length;i++)
   {
    this.StorePurchaseOrder.lstOrderItems[i].LineId=0;
   }
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseOrder.lstTermsChild=JSON.parse(res);
   for(let i=0;i<this.StorePurchaseOrder.lstTermsChild.length;i++)
   {
    this.StorePurchaseOrder.lstTermsChild[i].LineId=0;
    
   }
   }





   //

   this.APICall.OpenPageFromRefernce('PurchaseOrder','./Purchase/CreatePurchaseOrder','Purchase')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseOrder.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));
   this.router.navigate(['Purchase/CreatePurchaseOrder']);
  }



  CreatePurchaseInvoice(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StorePurchaseInvoice=new StorePurchaseInvoice;


this.StorePurchaseInvoice.SequenceNumberId=xml.SequenceNumberId;
this.StorePurchaseInvoice.Contactno= xml.Contactno;

this.StorePurchaseInvoice.Email=xml.Email;
this.StorePurchaseInvoice.RequiredDate=xml.RequiredDate;
this.StorePurchaseInvoice.Billto=xml.Billto;
this.StorePurchaseInvoice.Image=xml.Image;
//this.StorePurchaseInvoice.Shipto=xml.Shipto;

//this.StorePurchaseInvoice.ShiptoAddress=xml.ShiptoAddress;
//this.StorePurchaseInvoice.Terms=xml.Terms;
//this.StorePurchaseInvoice.TermsandConditions=xml.TermsandConditions;
this.StorePurchaseInvoice.BillToStateCode=xml.BillToStateCode;
this.StorePurchaseInvoice.BillToStateName=xml.BillToStateName;
this.StorePurchaseInvoice.TaxType=xml.TaxType;
//this.StorePurchaseInvoice.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseInvoice.TransactionTime=xml.TransactionTime;
this.StorePurchaseInvoice.ExchangeRate=xml.ExchangeRate;
this.StorePurchaseInvoice.PurchaseType=xml.PurchaseType;
this.StorePurchaseInvoice.notes=xml.notes;


this.StorePurchaseInvoice.Incoterms=xml.Incoterms;
this.StorePurchaseInvoice.vdate=xml.vdate;
this.StorePurchaseInvoice.VendorreferenceType=xml.VendorreferenceType;
this.StorePurchaseInvoice.Vendorreference=xml.Vendorreference;

this.StorePurchaseInvoice.vendorinvoicenumber=xml.vendorinvoicenumber;

this.StorePurchaseInvoice.freigntcharges=xml.freigntcharges;
this.StorePurchaseInvoice.loadingcharges=xml.loadingcharges;
this.StorePurchaseInvoice.insuranceamount=xml.insuranceamount;
this.StorePurchaseInvoice.clearingcharges=xml.clearingcharges;


this.StorePurchaseInvoice.PackingAmount=xml.PackingAmount;
this.StorePurchaseInvoice.PackingIGST=xml.PackingIGST;
this.StorePurchaseInvoice.PackingCGST=xml.PackingCGST;
this.StorePurchaseInvoice.PackingSGST=xml.PackingSGST;
this.StorePurchaseInvoice.PackingTaxPercentage=xml.PackingTaxPercentage;
this.StorePurchaseInvoice.PackingNetTotal=xml.PackingNetTotal;
this.StorePurchaseInvoice.LoadingAmount=xml.LoadingAmount;
this.StorePurchaseInvoice.LoadingIGST=xml.LoadingIGST;
this.StorePurchaseInvoice.LoadingCGST=xml.LoadingCGST;
this.StorePurchaseInvoice.LoadingSGST=xml.LoadingSGST;
this.StorePurchaseInvoice.LoadingTaxPercentage=xml.LoadingTaxPercentage;
this.StorePurchaseInvoice.LoadingNetTotal=xml.LoadingNetTotal;
this.StorePurchaseInvoice.TransportAmount=xml.TransportAmount;
this.StorePurchaseInvoice.TransportIGST=xml.TransportIGST;
this.StorePurchaseInvoice.TransportCGST=xml.TransportCGST;
this.StorePurchaseInvoice.TransportSGST=xml.TransportSGST;
this.StorePurchaseInvoice.TransportTaxPercentage=xml.TransportTaxPercentage;
this.StorePurchaseInvoice.TransportNetTotal=xml.TransportNetTotal;

this.StorePurchaseInvoice.freightchargesaccount=xml.freightchargesaccount;
this.StorePurchaseInvoice.loadingchargesaccount=xml.loadingchargesaccount;
this.StorePurchaseInvoice.insuranceaccount=xml.insuranceaccount;
this.StorePurchaseInvoice.clearingchargesaccount=xml.clearingchargesaccount;
this.StorePurchaseInvoice.CreatedBy=xml.CreatedBy;
this.StorePurchaseInvoice.ModifiedBy=xml.ModifiedBy;
this.StorePurchaseInvoice.CurrencyId=xml.CurrencyId;
this.StorePurchaseInvoice.Currencyname=xml.Currencyname;
this.StorePurchaseInvoice.TransactionDate=xml.TransactionDate;
this.StorePurchaseInvoice.TransactionId=xml.TransactionId;
this.StorePurchaseInvoice.TransactionNo=xml.TransactionNo;
this.StorePurchaseInvoice.PartyId=xml.PartyId;
this.StorePurchaseInvoice.PartyName=xml.PartyName;
this.StorePurchaseInvoice.PartyGSTNo=xml.PartyGSTNo;
this.StorePurchaseInvoice.Totalvalueininr=xml.Totalvalueininr;
this.StorePurchaseInvoice.ExchangeRate1=xml.ExchangeRate1;
this.StorePurchaseInvoice.InvoiceType=xml.invoicetype;
this.StorePurchaseInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseInvoice.ViewName=xml.ViewName;


if(xml.lstInvoiceItems!=null && typeof(xml.lstInvoiceItems)!=undefined)
   {
   var res=((xml.lstInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstPurchaseInvoiceItems=JSON.parse(res);
   
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstTermsChild=JSON.parse(res);
   
   }

   if(xml.lstPurchaseInvoiceItemsStock!=null && typeof(xml.lstPurchaseInvoiceItemsStock)!=undefined)
   {
   var res=((xml.lstPurchaseInvoiceItemsStock).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstPurchaseInvoiceItemsStock=JSON.parse(res);
   
   }
   if(xml.lstImportTaxDetails!=null && typeof(xml.lstImportTaxDetails)!=undefined)
   {
   var res=((xml.lstImportTaxDetails).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstImportTaxDetails=JSON.parse(res);
   
   }
   
this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseInvoice');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePurchaseInvoice.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
    this.router.navigate(['Purchase/CreatePurchaseInvoice']);
  }

   
//#region "ShortCuts"
@HostListener('window:keydown', ['$event'])


 

keyEvent(event: KeyboardEvent) {
  console.log(event);
  
  if (event.ctrlKey || event.metaKey) {
    
   switch (String.fromCharCode(event.which).toLowerCase()) {
   

       case 'a':
        
         event.preventDefault();
       this.OnAdd();
       
         break;
         

   }
 }
 
}
//#endregion "ShortCuts"
 


OnAdd()
{
  this.StorePurchaseInvoice=new StorePurchaseInvoice;
  this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseInvoice');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
  this.StorePurchaseInvoice.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));



  this.router.navigate(['Purchase/CreatePurchaseInvoice']);
}

   get f() { 
     return this.PurchaseInvoice
    .controls;
   }
  DeviceType="";
  ngOnInit() {
    this.FromDate="04/01/2020";
    if(this.ToDate==undefined)
{
  this.ToDate="";
}
  if (this.ToDate != '') {
    $("#ToDate").val(formatDate(new Date(this.ToDate), 'MM/dd/yyyy', 'en'));

  } else {
    this.ToDate= $("#ToDate").val(formatDate(new Date(), 'MM/dd/yyyy', 'en'));

  }
this.DeviceType= localStorage.getItem('DeviceType')
this.ViewandSearchPurchaseInvoice("");
 //this.LoadViewVendor();
 debugger;



  // if (this.ToDate != '') {
  //   $("#T").val(formatDate(new Date(this.ToDate), 'MM/dd/yyyy', 'en'));

  // } else {
  //   $("#FromDate").val(formatDate(new Date(), 'MM/dd/yyyy', 'en'));

  // }

 
  }

ngAfterViewInit(){

   
     
    
  }

  QuotDateChange(e)
   {
     
   }
  lstPurchaseInvoice:any=[];
  lstDbResult:any  = [];
  ViewandSearchPurchaseInvoice(RefString)
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }

      var sstring="";
      if(RefString=='')
      {
       sstring=(this.GetSearchString());
      }else{

        sstring=RefString;
        this.FilterType="All";
      }


   //   var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewPurchaseInvoice",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstPurchaseInvoice=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstPurchaseInvoice=this.lstDbResult.Table;
            var result = this.lstPurchaseInvoice.filter((x) => { return formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') > this.FromDate && formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') < this.ToDate; });
            this.lstPurchaseInvoice=result;
            for(var i=0;i<this.lstPurchaseInvoice.length;i++)
            {
             // this.TotalAmount=this.TotalAmount+(+this.lstPurchaseInvoice[i].Total)
              this.TotalCharges=this.TotalCharges+(+this.lstPurchaseInvoice[i].TotalCharges)
              this.TotalGross=this.TotalGross+(+this.lstPurchaseInvoice[i].TotalGross)
              this.TotalTax=this.TotalTax+(+this.lstPurchaseInvoice[i].TotalTax)
              this.TotalDiscount=this.TotalDiscount+(+this.lstPurchaseInvoice[i].TotalDiscount)
              
            }
            this.TotalAmount=(this.TotalCharges+this.TotalGross+this.TotalTax)-(this.TotalDiscount);
            
            if(this.lstSerchableFields.length==0)
            {


          var    stringDbFld=this.lstDbResult.Table[0].SerchableFields
             var parser = new DOMParser();
             var xmlDoc = parser.parseFromString(stringDbFld,"text/xml");
            
            var sizex = xmlDoc.getElementsByTagName("ControlName");
            
            for (var i = 0 ; i < sizex.length ; i++) {
            

          
            this.lstSerchableFields.push(
              

              ( { 
                ControlName:xmlDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue
                
                ,DBField:xmlDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue
                
                })

            );
            }
            }
          }

          $("#loaderParent").hide();
        });
  }


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

  //#region "SearchPanelLogic"




  SearchClick()
  {
    this.ViewandSearchPurchaseInvoice("");
  }
lstSerchableFields:any  = [];





PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var CustomerName=this.getControlValue(this.f.CustomerName,"string");
  var CustomerNameDBField="";
  

  var TransactionNo=this.getControlValue(this.f.TransactionNo,"string");
  var TransactionNoDBField="";



  
  var Contactno=this.getControlValue(this.f.Contactno,"string");
  var ContactnoDBField="";





  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    debugger;
    if(this.lstSerchableFields[i].ControlName=="CustomerName")
    {
      CustomerNameDBField=this.lstSerchableFields[i].DBField;
    }

    if(this.lstSerchableFields[i].ControlName=="TransactionNo")
    {
      TransactionNoDBField=this.lstSerchableFields[i].DBField;
    }

    if(this.lstSerchableFields[i].ControlName=="Contactno")
    {
      ContactnoDBField=this.lstSerchableFields[i].DBField;
    }

    

    
  }
debugger;
      if(this.SerchType=='Like')
      {

        
        if(TransactionNo!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+TransactionNoDBField+" Like'"+TransactionNo+"%'"):(TransactionNoDBField+" Like'"+TransactionNo+"%'");
        }

        
        if(CustomerName!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+CustomerNameDBField+" Like'"+CustomerName+"%'"):(CustomerNameDBField+" Like'"+CustomerName+"%'");
        }


        if(Contactno!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+ContactnoDBField+" Like'"+Contactno+"%'"):(ContactnoDBField+" Like'"+Contactno+"%'");
        }

        
      




      }
      else{
       
        if(TransactionNo!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+TransactionNoDBField+" ='"+TransactionNo+"'"):(TransactionNoDBField+" ='"+TransactionNo+"'");
        }

        if(CustomerName!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+CustomerNameDBField+" ='"+CustomerName+"'"):(CustomerNameDBField+" ='"+CustomerName+"'");
        }


        if(Contactno!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+ContactnoDBField+" ='"+Contactno+"'"):(ContactnoDBField+" ='"+Contactno+"'");
        }




      }
    }
      return FldSerchString;
    }
FilterType='All'
GetSearchString():string
{
  debugger;
  var  SearchString="";
  if(this.FilterType !='All')
  {
    SearchString=this.PrepareSerchStringByField();
  }
  else
  {
    SearchString=  this.getControlValue(this.f.SearchString,"string")
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
  TotalAmount:number=0;
  TotalCharges:number=0;
    TotalGross:number=0;
    TotalDiscount:number=0;
    TotalTax:number=0;
  GetCustomerWiseSalesInvoice()
  {
    this.TotalAmount=0;
    this.TotalCharges=0;
    this.TotalGross=0;
    this.TotalDiscount=0;
    this.TotalTax=0;
    
    if(this.f.CustomerId.value>0)
    {
      debugger;
      var CustId=this.f.CustomerId.value
      this.f.SearchString=CustId.toString();
      this.ViewandSearchPurchaseInvoice(this.f.SearchString);
    
   
     
  
      
      

    }
  }
  // LoadViewVendor()
  // {
  
  //   var that = this;
  //   debugger;
  //   (<any> $("#drpCustomer")).select2({
  //    allowClear: true,
  //    placeholder:"Select",
  //      ajax: { 
  //       url:this.APICall.DBCallingURL,
  //       type: "POST",
  //       dataType: 'json',
  //       delay: 250,
  //       data: 
  //       function (params) {
     
  //    var sstring="";
  //    if( params.term!=undefined)
  //    {
  //      sstring=params.term;
  //    }
  //    debugger;
  
  //    return JSON.stringify( {"Operation": 'ViewVendor', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" : that.APICall.GetCompanyID() })
         
  //   }
  //   ,
  //       contentType: 'application/json; charset=utf-8',
  //       processResults: function (response) {
         
     
  //       debugger;
  //       var yourArrayData=(JSON.parse(response['Message'])).Table;
   
     
  //          var  data = $.map(yourArrayData, function (obj) {
  //           debugger;
  //      obj.id = obj.VendorId; 
  //      obj.text = obj.vendorname; 
      
  //      return obj;
  //    });
     
     
   
  //         return {
        
     
  //            results: data
     
  //         };
  //       },
  //       cache: false
        
  //      }
       
   
  //     });   
  //     var that =this;
  //     $('#drpCustomer').on('select2:select', function (e) {
      
  //     debugger;
   
     
  //     if(typeof((<any>e).params.data.id)!='undefined')
  //     {
       
  //       debugger;
  //     that.f.CustomerId.setValue( (<any>e).params.data.id);
  //     that.f.Customername.setValue( (<any>e).params.data.text);
      
  //   }
    
     
  //     });
  //     var HSNselection = new Option(this.f.Customername.value,this.f.CustomerId.value.toString(), true, true);
    
  //     (<any> $('#drpCustomer')).append(HSNselection).trigger('change');
    
  //     $("#drpCustomer").on("select2:unselecting", function(e) {
       
      
  //      that.f.CustomerId.setValue(0);
  //      that.f.Customername.setValue('');
      
  //     });
   
  //  }

   Clear()
   {
     this.ViewandSearchPurchaseInvoice("");
     this.TotalAmount=0;
     $('#drpCustomer').val(null).trigger('change');
   }
  //#endregion "SearchPanelLogic"
  
}

