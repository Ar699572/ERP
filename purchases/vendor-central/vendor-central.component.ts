
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import { Vendor } from 'src/app/store/StoreVendor';
import { StorePurchaseInvoice } from 'src/app/Store/StorePurchaseInvoice';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { PurchaseQuotation } from 'src/app/Store/StorePurchaseQuotation';
import { StorePurchaseOrder } from 'src/app/Store/StorePurchaseOrder';
import { MRN } from 'src/app/store/StoreMRN';
import { StoreRFQ } from 'src/app/store/StoreRFQ';
import { StorePurchaseReturns } from 'src/app/Store/StorePurchaseReturns';
@Component({
  selector: 'app-vendor-central',
  templateUrl: './vendor-central.component.html',
  styleUrls: ['./vendor-central.component.css']
})
export class VendorCentralComponent implements OnInit {

  DeviceType='';
  StoreVendor: Vendor;
  VendorId:number=0;
  disableField:boolean=false;
  // private fb: FormBuilder,
  constructor(private router:Router,  private APICall: APICallingService, private store: Store<any>) 
  { 
    
  }
  
  ngOnInit() {
   
    this.DeviceType = localStorage.getItem('DeviceType')
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    if (result.length > 0) {
      this.StoreVendor = (result[0]);
      this.VendorName=this.StoreVendor.vendorname;
    this.VendorId= this.StoreVendor.VendorId;
      var storedprocedurechange = 'PurchaseQuotation'
      // this.ViewVendorDetails(this.VendorId, storedprocedurechange)

       
    }
  }
 

  VendorName:string='';
  StoreMRN:MRN;
  StorePurchaseQuotation:PurchaseQuotation;
  StorePurchaseReturns:StorePurchaseReturns
  StorePurchaseOrder:StorePurchaseOrder;
  AddTableHead:boolean=false;
  ChangeTableHeading1='Gross';
  ChangeTableHeading2='tax';
  ChangeTableHeading3='Total';
  RFQ:Boolean=false
  lstofeditTabs:any=[];
  StorePurchaseInvoice: StorePurchaseInvoice;
  EditDetails(details){
   
    var editTabStoredprocedure
  if(details.EditItems=='PurchaseInvoice'){
    editTabStoredprocedure = 'ViewPurchaseInvoice'
      this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
  }else if(details.EditItems=='PurchaseQuotation'){
    editTabStoredprocedure = 'ViewPurchaseQuotation'
    this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
  }else if(details.EditItems=='PurchaseOrder'){
    editTabStoredprocedure = 'ViewPurchaseOrder'
    this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
  }else if(details.EditItems=='MRN'){
    editTabStoredprocedure = 'ViewMRNdata'
    this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
  }else if(details.EditItems=='RFQ'){
    editTabStoredprocedure = 'ViewRFQ'
    this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
  }else if(details.EditItems=='PurchaseReturn'){
    editTabStoredprocedure = 'ViewPurchaseReturns'
    this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
  }else{
    alert('No edit option was selected')
  }
  }

  ViewandEditDetails(OpeartionChange, TransactionId) {

   
    if (AppSettings.ShowLoaderOnView) {


      $("#loaderParent").show();
    }

    //this.lstofedititems = [];
   
    this.APICall.DBCalling(OpeartionChange, '', '', TransactionId, this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
       
       
        this.lstDbResult = JSON.parse(res['Message']);

        this.lstofeditTabs = []

        if (this.lstDbResult.Table.length > 0) {
      this.lstofeditTabs = this.lstDbResult.Table[0];
          var data = this.lstofeditTabs;

          if (data.ViewName === "PurchaseInvoice"  ) {
            this.EditPurchaseInvoice(data)
          }
          else if (data.ViewName === "PurchaseOrder" ) {
            this.EditPurchaseOrder(data)
          }
          else if (data.ViewName === "PurchaseQuotation" ) {
            this.EditPurchaseQuotation(data)
          }else if (data.ViewName === "MRN" ) {
            this.EditMRN(data)
          }else if(data.ViewName === "RFQ"){
            this.EditRFQ(data)
          }
         else if (data.ViewName === "PurchaseReturns" ){
           this.EditPurchaseReturn(data)
          }
          else {

          }

        }
        $("#loaderParent").hide();
      });
  }

  EditPurchaseReturn(data){
debugger;
this.StorePurchaseReturns = new StorePurchaseReturns;

    this.StorePurchaseReturns.SequenceNumberId = data.SequenceNumberId;
    this.StorePurchaseReturns.contactNo = data.contactNo;

    this.StorePurchaseReturns.email = data.email;

    this.StorePurchaseReturns.billto = data.billto;

   // this.StorePurchaseReturns.BillToStateCode = data.BillToStateCode;
   // this.StorePurchaseReturns.BillToStateName = data.BillToStateName;
    this.StorePurchaseReturns.gsttype = data.gsttype;

     this.StorePurchaseReturns.LocationId = data.LocationId;
    this.StorePurchaseReturns.Location = data.LocationName;
    this.StorePurchaseReturns.BinId = data.BinId;
    this.StorePurchaseReturns.Bin = data.BinName;
    
this.StorePurchaseReturns
    this.StorePurchaseReturns.Purchaseaccount = data.Purchaseaccount;
     this.StorePurchaseReturns.Discountaccount = data.Discountaccount;
     this.StorePurchaseReturns.remarks = data.remarks;

     this.StorePurchaseReturns.ReturnSourceType = data.ReturnSourceType;
     this.StorePurchaseReturns.ReturnSourceId = data.ReturnSourceId;
     this.StorePurchaseReturns.ReturnSourceNo = data.ReturnSourceNo;
     this.StorePurchaseReturns.ReturnSourceDate = data.ReturnSourceDate;

     this.StorePurchaseReturns.time = data.time;
     this.StorePurchaseReturns.date = data.TransactionDate;
     this.StorePurchaseReturns.PurchaseReturnsId = data.PurchaseReturnsId;
     this.StorePurchaseReturns.Invoiceno = data.TransactionNo;
this.StorePurchaseReturns.purchaseaccount=data.purchaseaccount;
this.StorePurchaseReturns.Discountaccount=data.discountaccount;

this.StorePurchaseReturns.Location=data.Location;
this.StorePurchaseReturns.LocationId=data.LocationId;
this.StorePurchaseReturns.Bin=data.Bin;
this.StorePurchaseReturns.BinId=data.BinId;

     this.StorePurchaseReturns.VendorId = data.supplier;
     this.StorePurchaseReturns.VendorName = data.VendorName;
     this.StorePurchaseReturns.VendorGSTNo = data.VendorGSTNo;

    this.StorePurchaseReturns.Total = data.Total;
    this.StorePurchaseReturns.TotalTax = data.TotalTax;
    this.StorePurchaseReturns.AfterDiscount = data.AfterDiscount;
    this.StorePurchaseReturns.TotalGross = data.TotalGross;
    this.StorePurchaseReturns.TotalDiscount = data.totaldiscount;
    this.StorePurchaseReturns.TotalCGST = data.TotalCGST;
    this.StorePurchaseReturns.TotalSGST = data.TotalSGST;
    this.StorePurchaseReturns.TotalIGST = data.TotalIGST;

    this.StorePurchaseReturns.ModifiedDate = (data.ModifiedDate == null ? '' : data.ModifiedDate.toString());
    this.StorePurchaseReturns.ViewName = data.ViewName;


    if (data.lstItems != null && typeof (data.lstItems) != undefined) {
      var res = ((data.lstItems).replace(/\n/g, "")).replace(/'/g, "\"");

      this.StorePurchaseReturns.lstReturnsItems = JSON.parse(res);

    }
    this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseReturns');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StorePurchaseReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StorePurchaseReturns));
    this.router.navigate(['Purchase/CreatePurchaseReturns']);

  }

  EditMRN(data){
   
 

  this.StoreMRN=new MRN;
  this.StoreMRN.SequenceNumberId=data.SequenceNumberId;
  this.StoreMRN.Contactno= data.Contactno;
  this.StoreMRN.Email=data.Email;
  this.StoreMRN.RequiredDate=data.RequiredDate;
  this.StoreMRN.Billto=data.Billto;
  this.StoreMRN.BillToStateCode=data.BillToStateCode;
  this.StoreMRN.BillToStateName=data.BillToStateName;
  this.StoreMRN.TaxType=data.TaxType;
  //this.StoreMRN.PaymentTerms=data.PaymentTerms;
  this.StoreMRN.TransactionTime=data.TransactionTime;
  this.StoreMRN.ExchangeRate=data.ExchangeRate;
  this.StoreMRN.CurrencyId=data.CurrencyId;
  this.StoreMRN.TransactionDate=data.TransactionDate;
  this.StoreMRN.TransactionId=data.TransactionId;
  this.StoreMRN.TransactionNo=data.TransactionNo;
  this.StoreMRN.PartyId=data.PartyId;
  this.StoreMRN.PartyName=data.PartyName;
  this.StoreMRN.PartyGSTNo=data.PartyGSTNo;
  this.StoreMRN.Vendorreference=data.Vendorreference;
  this.StoreMRN.PaymentTerms=data.PaymentTerms;
  this.StoreMRN.vdate=data.date;
  this.StoreMRN.Incoterms=data.Incoterms;
  this.StoreMRN.PurchaseRepresentative=data.PurchaseRepresentative;
  this.StoreMRN.PurchaseType=data.PurchaseType;
  this.StoreMRN.StartDate=data.StartDate;
  this.StoreMRN.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
  this.StoreMRN.ViewName=data.ViewName;
  if(data.lstMRNItems!=null && typeof(data.lstMRNItems)!=undefined)
  {
  var res=((data.lstMRNItems).replace(/\n/g, "")).replace(/'/g,"\"");
  
  this.StoreMRN.lstMRNItems=JSON.parse(res);
  
  }
  this.APICall.UpdatedSelectedPath('./Purchase/CreateMRN');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreMRN.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreMRN));
  this.router.navigate(['Purchase/CreateMRN']);
}
StoreRFQ:StoreRFQ;
EditRFQ(data){
debugger;

this.StoreRFQ=new StoreRFQ;


this.StoreRFQ.date=data.date;
this.StoreRFQ.PRQId= data.PRQId;

this.StoreRFQ.CompanyId=data.CompanyId;
this.StoreRFQ.prqno=data.prqno;
this.StoreRFQ.PartyId=data.Vendorid;
this.StoreRFQ.PurchaseType=data.PurchaseType;
this.StoreRFQ.Vendorreference=data.Vendorreference;
this.StoreRFQ.Incoterms=data.Incoterms;
this.StoreRFQ.Template=data.Template;
this.StoreRFQ.PurchaseRepresentative=data.PurchaseRepresentative;
this.StoreRFQ.PaymentTerms=data.PaymentTerms;
this.StoreRFQ.StartDate=data.StartDate;
this.StoreRFQ.RequiredDate=data.RequiredDate;

this.StoreRFQ.PartyName=data.vendorname ;


this.StoreRFQ.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StoreRFQ.ViewName=data.ViewName;


if(data.lstRFQ1!=null && typeof(data.lstRFQ1)!=undefined)
   {
   var res=((data.lstRFQ1).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreRFQ.lstRFQdetails=JSON.parse(res);
   
   }



  
this.APICall.UpdatedSelectedPath('./Purchase/CreateRFQ');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreRFQ.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreRFQ));
    this.router.navigate(['Purchase/CreateRFQ']);

}

  
  EditPurchaseOrder(data){
debugger;
this.StorePurchaseOrder=new StorePurchaseOrder;
this.StorePurchaseOrder.SequenceNumberId=data.SequenceNumberId;
this.StorePurchaseOrder.Contactno= data.Contactno;
this.StorePurchaseOrder.Email=data.Email;
this.StorePurchaseOrder.RequiredDate=data.RequiredDate;
this.StorePurchaseOrder.Billto=data.Billto;
this.StorePurchaseOrder.BillToCountryName=data.country;
this.StorePurchaseOrder.BillToStateCode=data.BillToStateCode;
this.StorePurchaseOrder.BillToStateName=data.BillToStateName;
this.StorePurchaseOrder.TaxType=data.TaxType;
this.StorePurchaseOrder.TransactionTime=data.TransactionTime;
this.StorePurchaseOrder.ExchangeRate=data.ExchangeRate;
this.StorePurchaseOrder.CurrencyId=data.CurrencyId;
this.StorePurchaseOrder.TransactionDate=data.TransactionDate;
this.StorePurchaseOrder.TransactionId=data.TransactionId;
this.StorePurchaseOrder.TransactionNo=data.TransactionNo;
this.StorePurchaseOrder.PartyId=data.PartyId;
this.StorePurchaseOrder.PartyName=data.PartyName;
this.StorePurchaseOrder.PartyGSTNo=data.PartyGSTNo;
this.StorePurchaseOrder.PaymentTerms=data.PaymentTerms;
this.StorePurchaseOrder.TransactionTime=data.TransactionTime;
this.StorePurchaseOrder.Vendorreference=data.Vendorreference;
this.StorePurchaseOrder.PaymentTerms=data.PaymentTerms;
this.StorePurchaseOrder.vdate=data.date;
this.StorePurchaseOrder.Incoterms=data.Incoterms;
this.StorePurchaseOrder.PurchaseRepresentative=data.PurchaseRepresentative;
this.StorePurchaseOrder.PurchaseType=data.PurchaseType;
this.StorePurchaseOrder.StartDate=data.StartDate;
this.StorePurchaseOrder.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StorePurchaseOrder.ViewName=data.ViewName;


if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
   {
   var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseOrder.lstTermsChild=JSON.parse(res);
   
   }

this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseOrder');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePurchaseOrder.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));
    this.router.navigate(['Purchase/CreatePurchaseOrder']);
  }


  EditPurchaseQuotation(data){
   
    
this.StorePurchaseQuotation=new PurchaseQuotation;
this.StorePurchaseQuotation.SequenceNumberId=data.SequenceNumberId;
this.StorePurchaseQuotation.Contactno= data.Contactno;
this.StorePurchaseQuotation.Email=data.Email;
this.StorePurchaseQuotation.RequiredDate=data.RequiredDate;
this.StorePurchaseQuotation.Billto=data.Billto;
this.StorePurchaseQuotation.BillToStateCode=data.BillToStateCode;
this.StorePurchaseQuotation.BillToStateName=data.BillToStateName;
this.StorePurchaseQuotation.TaxType=data.TaxType;
this.StorePurchaseQuotation.TransactionTime=data.TransactionTime;
this.StorePurchaseQuotation.ExchangeRate=data.ExchangeRate;
this.StorePurchaseQuotation.CurrencyId=data.CurrencyId;
this.StorePurchaseQuotation.TransactionDate=data.TransactionDate;
this.StorePurchaseQuotation.TransactionId=data.TransactionId;
this.StorePurchaseQuotation.TransactionNo=data.TransactionNo;
this.StorePurchaseQuotation.PartyId=data.PartyId;
this.StorePurchaseQuotation.PartyName=data.PartyName;
this.StorePurchaseQuotation.PartyGSTNo=data.PartyGSTNo;
this.StorePurchaseQuotation.Vendorreference=data.Vendorreference;
this.StorePurchaseQuotation.PaymentTerms=data.PaymentTerms;
this.StorePurchaseQuotation.vdate=data.date;
this.StorePurchaseQuotation.Incoterms=data.Incoterms;
this.StorePurchaseQuotation.PurchaseRepresentative=data.PurchaseRepresentative;
this.StorePurchaseQuotation.PurchaseType=data.PurchaseType;
this.StorePurchaseQuotation.StartDate=data.StartDate;
this.StorePurchaseQuotation.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StorePurchaseQuotation.ViewName=data.ViewName;

if(data.lstQuotationItems!=null && typeof(data.lstQuotationItems)!=undefined)
   {
   var res=((data.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   this.StorePurchaseQuotation.lstQuotationItems=JSON.parse(res);
   }
if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
   {
   var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   this.StorePurchaseQuotation.lstTermsChild=JSON.parse(res);
   }
this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseQuotation');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePurchaseQuotation.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseQuotation));
    this.router.navigate(['Purchase/CreatePurchaseQuotation']);

  }

  EditPurchaseInvoice(data){

    this.StorePurchaseInvoice=new StorePurchaseInvoice;
    this.StorePurchaseInvoice.SequenceNumberId=data.SequenceNumberId;
    this.StorePurchaseInvoice.Contactno= data.Contactno;
    this.StorePurchaseInvoice.Email=data.Email;
    this.StorePurchaseInvoice.RequiredDate=data.RequiredDate;
    this.StorePurchaseInvoice.Billto=data.Billto;
    this.StorePurchaseInvoice.Image=data.Image;
    this.StorePurchaseInvoice.BillToStateCode=data.BillToStateCode;
    this.StorePurchaseInvoice.BillToStateName=data.BillToStateName;
    this.StorePurchaseInvoice.TaxType=data.TaxType;
    this.StorePurchaseInvoice.TransactionTime=data.TransactionTime;
    this.StorePurchaseInvoice.ExchangeRate=data.ExchangeRate;
    this.StorePurchaseInvoice.PurchaseType=data.PurchaseType;
    this.StorePurchaseInvoice.notes=data.notes;
    this.StorePurchaseInvoice.Incoterms=data.Incoterms;
    this.StorePurchaseInvoice.vdate=data.vdate;
    this.StorePurchaseInvoice.VendorreferenceType=data.VendorreferenceType;
    this.StorePurchaseInvoice.Vendorreference=data.Vendorreference;
    this.StorePurchaseInvoice.vendorinvoicenumber=data.vendorinvoicenumber;
    this.StorePurchaseInvoice.freigntcharges=data.freigntcharges;
    this.StorePurchaseInvoice.loadingcharges=data.loadingcharges;
    this.StorePurchaseInvoice.insuranceamount=data.insuranceamount;
    this.StorePurchaseInvoice.clearingcharges=data.clearingcharges;
    this.StorePurchaseInvoice.PackingAmount=data.PackingAmount;
    this.StorePurchaseInvoice.PackingIGST=data.PackingIGST;
    this.StorePurchaseInvoice.PackingCGST=data.PackingCGST;
    this.StorePurchaseInvoice.PackingSGST=data.PackingSGST;
    this.StorePurchaseInvoice.PackingTaxPercentage=data.PackingTaxPercentage;
    this.StorePurchaseInvoice.PackingNetTotal=data.PackingNetTotal;
    this.StorePurchaseInvoice.LoadingAmount=data.LoadingAmount;
    this.StorePurchaseInvoice.LoadingIGST=data.LoadingIGST;
    this.StorePurchaseInvoice.LoadingCGST=data.LoadingCGST;
    this.StorePurchaseInvoice.LoadingSGST=data.LoadingSGST;
    this.StorePurchaseInvoice.LoadingTaxPercentage=data.LoadingTaxPercentage;
    this.StorePurchaseInvoice.LoadingNetTotal=data.LoadingNetTotal;
    this.StorePurchaseInvoice.TransportAmount=data.TransportAmount;
    this.StorePurchaseInvoice.TransportIGST=data.TransportIGST;
    this.StorePurchaseInvoice.TransportCGST=data.TransportCGST;
    this.StorePurchaseInvoice.TransportSGST=data.TransportSGST;
    this.StorePurchaseInvoice.TransportTaxPercentage=data.TransportTaxPercentage;
    this.StorePurchaseInvoice.TransportNetTotal=data.TransportNetTotal;
    this.StorePurchaseInvoice.freightchargesaccount=data.freightchargesaccount;
    this.StorePurchaseInvoice.loadingchargesaccount=data.loadingchargesaccount;
    this.StorePurchaseInvoice.insuranceaccount=data.insuranceaccount;
    this.StorePurchaseInvoice.clearingchargesaccount=data.clearingchargesaccount;
    this.StorePurchaseInvoice.CreatedBy=data.CreatedBy;
    this.StorePurchaseInvoice.ModifiedBy=data.ModifiedBy;
    this.StorePurchaseInvoice.CurrencyId=data.CurrencyId;
    this.StorePurchaseInvoice.Currencyname=data.Currencyname;
    this.StorePurchaseInvoice.TransactionDate=data.TransactionDate;
    this.StorePurchaseInvoice.TransactionId=data.TransactionId;
    this.StorePurchaseInvoice.TransactionNo=data.TransactionNo;
    this.StorePurchaseInvoice.PartyId=data.PartyId;
    this.StorePurchaseInvoice.PartyName=data.PartyName;
    this.StorePurchaseInvoice.PartyGSTNo=data.PartyGSTNo;
    this.StorePurchaseInvoice.Totalvalueininr=data.Totalvalueininr;
    this.StorePurchaseInvoice.ExchangeRate1=data.ExchangeRate1;
    this.StorePurchaseInvoice.InvoiceType=data.invoicetype;
    this.StorePurchaseInvoice.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
    this.StorePurchaseInvoice.ViewName=data.ViewName;
    
    if(data.lstInvoiceItems!=null && typeof(data.lstInvoiceItems)!=undefined)
       {
       var res=((data.lstInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
       
       this.StorePurchaseInvoice.lstPurchaseInvoiceItems=JSON.parse(res);
       
       }
    
    if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
       {
       var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
       
       this.StorePurchaseInvoice.lstTermsChild=JSON.parse(res);
       
       }
    
       if(data.lstPurchaseInvoiceItemsStock!=null && typeof(data.lstPurchaseInvoiceItemsStock)!=undefined)
       {
       var res=((data.lstPurchaseInvoiceItemsStock).replace(/\n/g, "")).replace(/'/g,"\"");
       
       this.StorePurchaseInvoice.lstPurchaseInvoiceItemsStock=JSON.parse(res);
       
       }
       if(data.lstImportTaxDetails!=null && typeof(data.lstImportTaxDetails)!=undefined)
       {
       var res=((data.lstImportTaxDetails).replace(/\n/g, "")).replace(/'/g,"\"");
       
       this.StorePurchaseInvoice.lstImportTaxDetails=JSON.parse(res);
       
       }
       
    this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseInvoice');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StorePurchaseInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
    this.router.navigate(['Purchase/CreatePurchaseInvoice']);
   
  }



  PurchaseOrder(){
    this.disableField=false;
    var storedprocedurechange = 'PurchaseOrder'
    this.ViewVendorDetails(this.VendorId, storedprocedurechange);
  }

  PurchaseQuotation(){
    this.disableField=false;
    var storedprocedurechange = 'PurchaseQuotation'
    this.ViewVendorDetails(this.VendorId, storedprocedurechange);
  }

  PurchaseReturns(){
    this.disableField=false;
    var storedprocedurechange = 'PurchaseReturn'
  this.ViewVendorDetails(this.VendorId, storedprocedurechange);
  }
 PurchaseInvoice(){
  this.disableField=false;
  this.lstVendorDetails = [];
  this.ChangeTableHeading1='Gross';
  this.ChangeTableHeading2='tax';
  this.ChangeTableHeading3='Total';
  var storedprocedurechange = 'PurchaseInvoice'
  this.ViewVendorDetails(this.VendorId, storedprocedurechange);
 } 
  
 RFQtab(){
  
 this.disableField=true;
this.ChangeTableHeading1='Make'
this.ChangeTableHeading2='Model'
this.ChangeTableHeading3='PartNo'	
var storedprocedurechange = 'RFQ'
  this.ViewVendorDetails(this.VendorId, storedprocedurechange);
 }
 MRN:Boolean=false;
 MRNTab(){
  this.disableField=false;
  this.ChangeTableHeading1='Part No'
this.ChangeTableHeading2='Description'
this.ChangeTableHeading3='HSN	';
var storedprocedurechange = 'MRN'
  this.ViewVendorDetails(this.VendorId, storedprocedurechange);	
 }
 lstVendorDetails:any=[]
 lstDbResult:any=[];
 ViewVendorDetails(VendorId, storedprocedurechange) {
 debugger;
 try {
  if (AppSettings.ShowLoaderOnView) {
    $("#loaderParent").show();
  }
  this.lstVendorDetails = [];
  this.lstDbResult = [];
  debugger;
 
  this.APICall.DBCalling("VendorCentralDetails", "", storedprocedurechange,VendorId , 1).subscribe(
    (res: Response) => {
 debugger;
     
      this.lstDbResult = JSON.parse(res['Message']);
     
      if (this.lstDbResult.Table.length > 0) {
        this.lstVendorDetails=this.lstDbResult.Table;
      
        // for(var i=0;i<this.lstVendorDetails.length ; i++){
        //   this.lstVendorDetails[i].Total=Math.floor(this.lstVendorDetails[i].Total)
        //   this.lstVendorDetails[i].TaxAmount=Math.round(this.lstVendorDetails[i].TaxAmount)
        // }
        // this.lstVendorDetails=this.lstVendorDetails
      }
      $("#loaderParent").hide();
    });
 }
 catch (e){
  alert(e);
 }
  
    
}

back(){
 this.router.navigateByUrl('Purchase/Vendor')
    }
 
}
