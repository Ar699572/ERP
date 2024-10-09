import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import { Common } from 'src/app/store/Common';
import { Customer } from 'src/app/store/Customer';
import { SalesQuotation } from 'src/app/Store/SalesQuotation';
import { StoreDC } from 'src/app/store/StoreDC';
import { StoreProformaInvoice } from 'src/app/Store/StoreProformaInvoice';
import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';
import { StoreSalesOrder } from 'src/app/Store/StoreSalesOrder';
import { StoreSalesReturns } from 'src/app/Store/StoreSalesReturns';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import * as AppSettings from '../../../assets/Appsettings/AppSettings';

@Component({
  selector: 'app-customer-central',
  templateUrl: './customer-central.component.html',
  styleUrls: ['./customer-central.component.css']
})
export class CustomerCentralComponent implements OnInit {

  constructor(private router:Router,  private APICall: APICallingService, private store: Store<any>) { }
  lstCustomerDetails:any=[];
 CustomerId:any=''
  DeviceType:string='';
  StoreCustomer: Customer;
  StoreSalesReturns:StoreSalesReturns;
  StoreProformaInvoice: StoreProformaInvoice;
  StoreDC: StoreDC;
  CustomerName:string='';
  common:Common;
  lstDbResult:any=[]
  ngOnInit() {

    this.DeviceType = localStorage.getItem('DeviceType')
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    if (result.length > 0) {
      this.StoreCustomer = (result[0]);
      this.CustomerName=this.StoreCustomer.Customername;
    this.CustomerId= this.StoreCustomer.CustomerId;
      var storedprocedurechange = 'SalesQuotation'
      this.ViewCustomerDetails(this.CustomerId, storedprocedurechange)

       
    }
  }
  noresultenable:boolean=false;
  ViewCustomerDetails(CustomerId,storedprocedurechange){
debugger;

try{
if (AppSettings.ShowLoaderOnView) {
  $("#loaderParent").show();
}
this.lstCustomerDetails = [];
this.lstDbResult=[];
debugger;
this.APICall.DBCalling("CustomerCentralDetails", '', storedprocedurechange, CustomerId, '1').subscribe(
  (res: Response) => {
    debugger;
    this.lstDbResult = JSON.parse(res['Message']);
    
    if (this.lstDbResult.Table.length > 0) {

    var newfilter= this.lstCustomerDetails=this.lstDbResult.Table;
      for(var i=0;i<newfilter.length ; i++){
        newfilter[i].Total=Math.floor(newfilter[i].Total)
        newfilter[i].TaxAmount=Math.round(newfilter[i].TaxAmount)
     
      }
      this.lstCustomerDetails=newfilter
    }
    
    $("#loaderParent").hide();
  });
}catch(e){

}
  }

  SalesQuotationTab(){
      debugger;
    this.CustomerId= this.StoreCustomer.CustomerId;
      var storedprocedurechange = 'SalesQuotation'
      this.ViewCustomerDetails(this.CustomerId, storedprocedurechange)
  }


  SalesOrderTab(){
    this.CustomerId= this.StoreCustomer.CustomerId;
    var storedprocedurechange = 'SalesOrder'
    this.ViewCustomerDetails(this.CustomerId, storedprocedurechange)
    if(this.lstCustomerDetails.length==0){
      this.noresultenable=true
    }else{
      this.noresultenable=true
    }
  }

  SalesInvoiceTab(){
    this.CustomerId= this.StoreCustomer.CustomerId;
   // this.noresultenable=true
    var storedprocedurechange = 'SalesInvoice'
    this.ViewCustomerDetails(this.CustomerId, storedprocedurechange)
    // if(this.lstCustomerDetails.length==0){
    //   this.noresultenable=true
    // }else{
    //   this.noresultenable=false
    // }
  }


  DcTab(){
   debugger;
    var storedprocedurechange = 'DeliveryChallan'
    this.ViewCustomerDetails(this.CustomerId, storedprocedurechange)
    debugger;
    // if(this.lstCustomerDetails.length==0){
    //   this.noresultenable=true
    // }else{
    //   this.noresultenable=true
    // }
  }
  ProformaInvoiceTab(){
    
    var storedprocedurechange = 'ProformaInvoice'
    this.ViewCustomerDetails(this.CustomerId, storedprocedurechange)
    
  }
  SalesReturnsTab(){
  
    var storedprocedurechange = 'SalesReturn'
    this.ViewCustomerDetails(this.CustomerId, storedprocedurechange)
    
  }

  EditDetails(details){
    
    debugger;
    var editTabStoredprocedure
    if(details.EditItems=='SalesInvoice'){
      editTabStoredprocedure = 'ViewSalesInvoice'
        this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
    }else if(details.EditItems=='SalesOrder'){
      editTabStoredprocedure = 'ViewSalesOrder'
      this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
    }else if(details.EditItems=='SalesQuotation'){
      editTabStoredprocedure = 'ViewSalesQuotation'
      this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
    }else if(details.EditItems=='SalesReturns'){
      editTabStoredprocedure = 'ViewSalesReturns'
      this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
    }else if(details.EditItems=='DC'){
      editTabStoredprocedure = 'ViewDC'
      this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
    }else if(details.EditItems=='ProformaInvoice'){
      editTabStoredprocedure = 'ViewProformaInvoice'
      this.ViewandEditDetails(editTabStoredprocedure, details.TransactionId)
    }else{
      alert('No edit option was selected')
    }
  }
  lstofeditTabs:any=[];

  ViewandEditDetails(OpeartionChange, TransactionId) {

    debugger;
    if (AppSettings.ShowLoaderOnView) {


      $("#loaderParent").show();
    }

    //this.lstofedititems = [];
    debugger;
    this.APICall.DBCalling(OpeartionChange, '', '', TransactionId, '1').subscribe(
      (res: Response) => {
        debugger;
       
        this.lstDbResult = JSON.parse(res['Message']);

        this.lstofeditTabs = []

        if (this.lstDbResult.Table.length > 0) {
      this.lstofeditTabs = this.lstDbResult.Table[0];
          var data = this.lstofeditTabs;

          if (data.ViewName === "SalesInvoice"  ) {
            this.EditSalesInvoice(data)
          }
          else if (data.ViewName === "SalesOrder" ) {
            this.EditSalesOrder(data)
          }
          else if (data.ViewName === "SalesQuotation" ) {
            this.EditSalesQuotation(data)
          }else if (data.ViewName === "DC" ) {
            this.EditDeliveryChallan(data)
          }else if(data.ViewName === "ProformaInvoice"){
            this.EditProformaInvoice(data)
          }
         else if (data.ViewName === "SalesReturn" ){
           this.EditSalesReturn(data)
          }
          else {

          }

        }
        $("#loaderParent").hide();
      });
  }
  EditSalesReturn(data){
    this.StoreSalesReturns = new StoreSalesReturns;
    this.StoreSalesReturns.SequenceNumberId = data.SequenceNumberId;
    this.StoreSalesReturns.Contactno = data.Contactno;
    this.StoreSalesReturns.Email = data.Email;
    this.StoreSalesReturns.Billto = data.Billto;
    this.StoreSalesReturns.BillToStateCode = data.BillToStateCode;
    this.StoreSalesReturns.BillToStateName = data.BillToStateName;
    this.StoreSalesReturns.TaxType = data.TaxType;
    this.StoreSalesReturns.LocationId = data.LocationId;
    this.StoreSalesReturns.LocationName = data.LocationName;
    this.StoreSalesReturns.BinId = data.BinId;
    this.StoreSalesReturns.BinName = data.BinName;
    this.StoreSalesReturns.Billto = data.Billto;
    this.StoreSalesReturns.Salesaccount = data.Salesaccount;
    this.StoreSalesReturns.Discountaccount = data.Discountaccount;
    this.StoreSalesReturns.Notes = data.Notes;
    this.StoreSalesReturns.ReturnSourceType = data.ReturnSourceType;
    this.StoreSalesReturns.ReturnSourceId = data.ReturnSourceId;
    this.StoreSalesReturns.ReturnSourceNo = data.ReturnSourceNo;
    this.StoreSalesReturns.TransactionTime = data.TransactionTime;
    this.StoreSalesReturns.TransactionDate = data.TransactionDate;
    this.StoreSalesReturns.TransactionId = data.TransactionId;
    this.StoreSalesReturns.TransactionNo = data.TransactionNo;
    this.StoreSalesReturns.PartyId = data.PartyId;
    this.StoreSalesReturns.PartyName = data.PartyName;
    this.StoreSalesReturns.PartyGSTNo = data.PartyGSTNo;
    this.StoreSalesReturns.ReturnSourceDate = data.ReferenceDate;
    this.StoreSalesReturns.Total = data.Total;
    this.StoreSalesReturns.TotalTax = data.TotalTax;
    this.StoreSalesReturns.AfterDiscount = data.AfterDiscount;
    this.StoreSalesReturns.TotalGross = data.TotalGross;
    this.StoreSalesReturns.TotalDiscount = data.TotalDiscount;
    this.StoreSalesReturns.TotalCGST = data.TotalCGST;
    this.StoreSalesReturns.TotalSGST = data.TotalSGST;
    this.StoreSalesReturns.TotalIGST = data.TotalIGST;
    this.StoreSalesReturns.ModifiedDate = (data.ModifiedDate == null ? '' : data.ModifiedDate.toString());
    this.StoreSalesReturns.ViewName = data.ViewName;
    if (data.lstReturnsItems != null && typeof (data.lstReturnsItems) != undefined) {
      var res = ((data.lstReturnsItems).replace(/\n/g, "")).replace(/'/g, "\"");
      this.StoreSalesReturns.lstReturnsItems = JSON.parse(res);
    }
    this.APICall.UpdatedSelectedPath('./Sales/CreateSalesReturns');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreSalesReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreSalesReturns));
    this.router.navigate(['Sales/CreateSalesReturns']);
  }
 
  EditProformaInvoice(data){
    debugger;
this.StoreProformaInvoice=new StoreProformaInvoice;
this.StoreProformaInvoice.SequenceNumberId=data.SequenceNumberId;
this.StoreProformaInvoice.Contactno= data.Contactno;

this.StoreProformaInvoice.Email=data.Email;
this.StoreProformaInvoice.RequiredDate=data.RequiredDate;
this.StoreProformaInvoice.Billto=data.Billto;
this.StoreProformaInvoice.Shipto=data.Shipto;

this.StoreProformaInvoice.ShiptoAddress=data.ShiptoAddress;
this.StoreProformaInvoice.Terms=data.Terms;
this.StoreProformaInvoice.TermsandConditions=data.TermsandConditions;
this.StoreProformaInvoice.BillToStateCode=data.BillToStateCode;
this.StoreProformaInvoice.BillToStateName=data.BillToStateName;
this.StoreProformaInvoice.TaxType=data.TaxType;
this.StoreProformaInvoice.PaymentTerms=data.PaymentTerms;
this.StoreProformaInvoice.TransactionTime=data.TransactionTime;

this.StoreProformaInvoice.ReferenceNo=data.ReferenceNo;
this.StoreProformaInvoice.ReferenceType=data.ReferenceType;

this.StoreProformaInvoice.TransportId=data.TransportId;
this.StoreProformaInvoice.Area=data.Area;
this.StoreProformaInvoice.TransportName=data.TransportName;
this.StoreProformaInvoice.BillRefNo=data.BillRefNo;
this.StoreProformaInvoice.SalesType=data.SalesType;

this.StoreProformaInvoice.TransactionDate=data.TransactionDate;
this.StoreProformaInvoice.TransactionId=data.TransactionId;
this.StoreProformaInvoice.TransactionNo=data.TransactionNo;
this.StoreProformaInvoice.PartyId=data.PartyId;
this.StoreProformaInvoice.PartyName=data.PartyName;
this.StoreProformaInvoice.PartyGSTNo=data.PartyGSTNo;

this.StoreProformaInvoice.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StoreProformaInvoice.ViewName=data.ViewName;

if(data.lstProformaInvoiceItems!=null && typeof(data.lstProformaInvoiceItems)!=undefined)
   {
  // var res=((data.lstProformaInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
  var res=((data.lstProformaInvoiceItems).replaceAll(/\n/g, "\\n")).replaceAll(/'/g,"\"");
   
   this.StoreProformaInvoice.lstProformaInvoiceItems=JSON.parse(res);
   
   }

if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
   {
   var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreProformaInvoice.lstTermsChild=JSON.parse(res);
   
   }
   if(data.lstCharges!=null && typeof(data.lstCharges)!=undefined)
   {
   var res=((data.lstCharges).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreProformaInvoice.lstCharges=JSON.parse(res);
   
   }

//this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));

this.APICall.UpdatedSelectedPath('./Sales/CreateProformaInvoice');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreProformaInvoice.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));
    this.router.navigate(['Sales/CreateProformaInvoice']);

  }
  EditDeliveryChallan(data){
debugger;

this.StoreDC=new StoreDC;
this.StoreDC.SequenceNumberId=data.SequenceNumberId;
this.StoreDC.Contactno= data.Contactno;
this.StoreDC.Email=data.Email;
this.StoreDC.RequiredDate=data.RequiredDate;
this.StoreDC.Billto=data.Billto;
this.StoreDC.Shipto=data.Shipto;
this.StoreDC.ShiptoAddress=data.ShiptoAddress;
this.StoreDC.Terms=data.Terms;
this.StoreDC.TermsandConditions=data.TermsandConditions;
this.StoreDC.BillToStateCode=data.BillToStateCode;
this.StoreDC.BillToStateName=data.BillToStateName;
this.StoreDC.TaxType=data.TaxType;
this.StoreDC.PaymentTerms=data.PaymentTerms;
this.StoreDC.TransactionTime=data.TransactionTime;
this.StoreDC.ReferenceNo=data.ReferenceNo;
this.StoreDC.ReferenceType=data.ReferenceType;
this.StoreDC.InvoiceType=data.InvoiceType;
this.StoreDC.TransportId=data.TransportId;
this.StoreDC.Area=data.Area;
this.StoreDC.TransportName=data.TransportName;
this.StoreDC.BillRefNo=data.BillRefNo;
this.StoreDC.AllowChanges=data.AllowChanges;
this.StoreDC.TransactionDate=data.TransactionDate;
this.StoreDC.TransactionId=data.TransactionId;
this.StoreDC.TransactionNo=data.TransactionNo;
this.StoreDC.PartyId=data.PartyId;
this.StoreDC.PartyName=data.PartyName;
this.StoreDC.PartyGSTNo=data.PartyGSTNo;
this.StoreDC.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StoreDC.ViewName=data.ViewName;


if(data.lstDCItems!=null && typeof(data.lstDCItems)!=undefined)
   {
   var res=((data.lstDCItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreDC.lstDCItems=JSON.parse(res);
   
   }

if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
   {
   var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreDC.lstTermsChild=JSON.parse(res);
   
   }

   if(data.lstDCItemsStock!=null && typeof(data.lstDCItemsStock)!=undefined)
   {
   var res=((data.lstDCItemsStock).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreDC.lstDCItemsStock=JSON.parse(res);
   
   }


   if(data.lstCharges!=null && typeof(data.lstCharges)!=undefined)
   {
   var res=((data.lstCharges).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreDC.lstCharges=JSON.parse(res);
   
   }

   
//this.store.dispatch(new  TabStore.AddTab(this.StoreDC));

this.APICall.UpdatedSelectedPath('./Sales/CreateDC');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreDC.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreDC));
    this.router.navigate(['Sales/CreateDC']);
  }
 
 
  EditSalesInvoice(data){
    debugger;
    

this.StoreSalesInvoice=new StoreSalesInvoice;
this.common=new Common();

this.StoreSalesInvoice.SequenceNumberId=data.SequenceNumberId;
this.StoreSalesInvoice.Contactno= data.Contactno;

this.StoreSalesInvoice.Email=data.Email;
this.StoreSalesInvoice.RequiredDate=data.RequiredDate;
this.StoreSalesInvoice.Billto=data.Billto;
this.StoreSalesInvoice.Shipto=data.Shipto;
this.StoreSalesInvoice.ProductReference=data.ProductReference;

this.StoreSalesInvoice.ShiptoAddress=data.ShiptoAddress;
this.StoreSalesInvoice.Terms=data.Terms;
this.StoreSalesInvoice.TermsandConditions=data.TermsandConditions;
this.StoreSalesInvoice.BillToStateCode=data.BillToStateCode;
this.StoreSalesInvoice.BillToStateName=data.BillToStateName;
this.StoreSalesInvoice.TaxType=data.TaxType;
this.StoreSalesInvoice.PaymentTerms=data.PaymentTerms;
this.StoreSalesInvoice.TransactionTime=data.TransactionTime;

this.StoreSalesInvoice.ReferenceNo=data.ReferenceNo;
this.StoreSalesInvoice.ReferenceType=data.ReferenceType;
this.StoreSalesInvoice.Notes=data.Notes;
this.StoreSalesInvoice.CommissionNotes=data.CommissionNotes;
this.StoreSalesInvoice.SaleType=data.SaleType;
this.StoreSalesInvoice.TransportId=data.TransportId;
this.StoreSalesInvoice.Area=data.Area;
this.StoreSalesInvoice.TransportName=data.TransportName;
this.StoreSalesInvoice.TransportMode=data.TransportMode;
this.StoreSalesInvoice.TransportName1=data.TransportName1;
this.StoreSalesInvoice.TrackingNo=data.TrackingNo;
this.StoreSalesInvoice.TransportDate=data.TransportDate;
this.StoreSalesInvoice.VehicleNo=data.VehicleNo;
this.StoreSalesInvoice.DriverName=data.DriverName;
this.StoreSalesInvoice.PersonName=data.PersonName;
this.StoreSalesInvoice.PhoneNo=data.PhoneNo;
this.StoreSalesInvoice.CustomerRefNo=data.CustomerRefNo;
this.StoreSalesInvoice.BillRefNo=data.BillRefNo;
this.StoreSalesInvoice.CommitionPartyId=data.CommitionPartyId;
this.StoreSalesInvoice.CommitionPartyName=data.CommitionPartyName;
this.StoreSalesInvoice.CommitionPer=data.CommitionPer;
this.StoreSalesInvoice.CommitionAmount=data.CommitionAmount;
this.StoreSalesInvoice.InvoiceType=data.InvoiceType;
this.StoreSalesInvoice.Salesaccount=data.Salesaccount;
this.StoreSalesInvoice.Discountaccount=data.Discountaccount;
this.StoreSalesInvoice.CommissionPayableAccount=data.CommissionPayableAccount;
this.StoreSalesInvoice.Commissionaccount=data.Commissionaccount;
this.StoreSalesInvoice.TransactionDate=data.TransactionDate;
this.StoreSalesInvoice.TransactionId=data.TransactionId;
this.StoreSalesInvoice.TransactionNo=data.TransactionNo;
this.StoreSalesInvoice.PartyId=data.PartyId;
this.StoreSalesInvoice.PartyName=data.PartyName;
this.StoreSalesInvoice.PartyGSTNo=data.PartyGSTNo;

debugger;
if(data.ModifiedDate==null || data.ModifiedDate==undefined ||data.ModifiedDate=='')
{
  this.StoreSalesInvoice.ModifiedDate=this.common.TodaysDate;
}
else
{
  //this.StoreSalesInvoice.ModifiedDate=this.common.getDate( data.ModifiedDate.toString());
  this.StoreSalesInvoice.ModifiedDate= data.ModifiedDate;
}
//this.StoreSalesInvoice.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StoreSalesInvoice.ViewName=data.ViewName;


if(data.lstSalesInvoiceItems!=null && typeof(data.lstSalesInvoiceItems)!=undefined)
   {
     try{
     
   var res=((data.lstSalesInvoiceItems).replaceAll(/\n/g, "\\n")).replaceAll(/'/g,"\"");
   
   this.StoreSalesInvoice.lstSalesInvoiceItems=JSON.parse(res);
     }
     catch(error)
     {}
   }

if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
   {
     try{
   var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstTermsChild=JSON.parse(res);
     }
     catch(error){}
   }

   if(data.lstSalesInvoiceItemsStock!=null && typeof(data.lstSalesInvoiceItemsStock)!=undefined)
   {
     try{
   var res=((data.lstSalesInvoiceItemsStock).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstSalesInvoiceItemsStock=JSON.parse(res);
     }
     catch(error){}
   }


   if(data.lstCharges!=null && typeof(data.lstCharges)!=undefined)
   {
     try{
   var res=((data.lstCharges).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstCharges=JSON.parse(res);
     }
     catch(error){}
   
   }


   if(data.lstPayemnts!=null && typeof(data.lstPayemnts)!=undefined)
   {
     try{
   var res=((data.lstPayemnts).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstPayemnts=JSON.parse(res);
     }
     catch(error){}
   }


   if(data.lstSalesInvoiceEditDetails!=null && typeof(data.lstSalesInvoiceEditDetails)!=undefined)
   {
     try{
   var res=((data.lstSalesInvoiceEditDetails).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstSalesInvoiceEditDetails=JSON.parse(res);
     }
     catch(error){}
   }
   
//this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));

this.APICall.UpdatedSelectedPath('./Sales/CreateSalesInvoice');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreSalesInvoice.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));
    this.router.navigate(['Sales/CreateSalesInvoice']);
  
  }
  StoreSalesOrder:StoreSalesOrder;
  StoreSalesQuotation:SalesQuotation;
  StoreSalesInvoice:StoreSalesInvoice;
  EditSalesOrder(data){
    debugger;
this.StoreSalesOrder=new StoreSalesOrder;
this.StoreSalesOrder.SequenceNumberId=data.SequenceNumberId;
this.StoreSalesOrder.Contactno= data.Contactno;
this.StoreSalesOrder.Email=data.Email;
this.StoreSalesOrder.RequiredDate=data.RequiredDate;
this.StoreSalesOrder.Billto=data.Billto;
this.StoreSalesOrder.Shipto=data.Shipto;
this.StoreSalesOrder.ShiptoAddress=data.ShiptoAddress;
this.StoreSalesOrder.Terms=data.Terms;
this.StoreSalesOrder.TermsandConditions=data.TermsandConditions;
this.StoreSalesOrder.BillToStateCode=data.BillToStateCode;
this.StoreSalesOrder.BillToStateName=data.BillToStateName;
this.StoreSalesOrder.TaxType=data.TaxType;
this.StoreSalesOrder.PaymentTerms=data.PaymentTerms;
this.StoreSalesOrder.TransactionTime=data.TransactionTime;
this.StoreSalesOrder.ReferenceNo=data.ReferenceNo;
this.StoreSalesOrder.ReferenceType=data.ReferenceType;
this.StoreSalesOrder.TransactionDate=data.TransactionDate;
this.StoreSalesOrder.TransactionId=data.TransactionId;
this.StoreSalesOrder.TransactionNo=data.TransactionNo;
this.StoreSalesOrder.PartyId=data.PartyId;
this.StoreSalesOrder.PartyName=data.PartyName;
this.StoreSalesOrder.PartyGSTNo=data.PartyGSTNo;
this.StoreSalesOrder.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StoreSalesOrder.ViewName=data.ViewName;

if(data.lstOrderItems!=null && typeof(data.lstOrderItems)!=undefined)
   {
   var res=((data.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesOrder.lstOrderItems=JSON.parse(res);
   
   }

if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
   {
   var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesOrder.lstTermsChild=JSON.parse(res);
   
   }
this.APICall.UpdatedSelectedPath('./Sales/CreateSalesOrder');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreSalesOrder.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));
    this.router.navigate(['Sales/CreateSalesOrder']);
  }

  ngAfterViewInit(){

    this.ViewCustomerDetails(this.CustomerId,'SalesQuotation');
  }
 
  EditSalesQuotation(data){
   
    debugger;
this.StoreSalesQuotation=new SalesQuotation;
this.StoreSalesQuotation.SequenceNumberId=data.SequenceNumberId;
this.StoreSalesQuotation.Contactno= data.Contactno;
this.StoreSalesQuotation.Email=data.Email;
this.StoreSalesQuotation.RequiredDate=data.RequiredDate;
this.StoreSalesQuotation.Billto=data.Billto;
this.StoreSalesQuotation.Shipto=data.Shipto;
this.StoreSalesQuotation.CustomerRefNo=data.CustomerRefNo;
this.StoreSalesQuotation.ProductReference=data.ProductReference;
this.StoreSalesQuotation.ShiptoAddress=data.ShiptoAddress;
this.StoreSalesQuotation.Terms=data.Terms;
this.StoreSalesQuotation.TermsandConditions=data.TermsandConditions;
this.StoreSalesQuotation.BillToStateCode=data.BillToStateCode;
this.StoreSalesQuotation.BillToStateName=data.BillToStateName;
this.StoreSalesQuotation.TaxType=data.TaxType;
this.StoreSalesQuotation.PaymentTerms=data.PaymentTerms;
this.StoreSalesQuotation.TransactionTime=data.TransactionTime;
this.StoreSalesQuotation.TransactionDate=data.TransactionDate;
this.StoreSalesQuotation.TransactionId=data.TransactionId;
this.StoreSalesQuotation.TransactionNo=data.TransactionNo;
this.StoreSalesQuotation.PartyId=data.PartyId;
this.StoreSalesQuotation.PartyName=data.PartyName;
this.StoreSalesQuotation.PartyGSTNo=data.PartyGSTNo;
this.StoreSalesQuotation.InvoiceType=data.InvoiceType;
this.StoreSalesQuotation.BCDAmount=data.BCDAmount;
this.StoreSalesQuotation.SWSAmount=data.SWSAmount;
this.StoreSalesQuotation.ModifiedDate=(data.ModifiedDate==null?'':data.ModifiedDate.toString());
this.StoreSalesQuotation.ViewName=data.ViewName;


if(data.lstQuotationItems!=null && typeof(data.lstQuotationItems)!=undefined)
   {
   var res=((data.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesQuotation.lstQuotationItems=JSON.parse(res);
   
   }

if(data.lstTermsChild!=null && typeof(data.lstTermsChild)!=undefined)
   {
   var res=((data.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesQuotation.lstTermsChild=JSON.parse(res);
   
   }

   if(data.lstCharges!=null && typeof(data.lstCharges)!=undefined)
   {
     try{
   var res=((data.lstCharges).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesQuotation.lstCharges=JSON.parse(res);
     }
     catch(error){}
   
   }
  
this.APICall.UpdatedSelectedPath('./Sales/CreateSalesQuotation');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreSalesQuotation.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreSalesQuotation));
    this.router.navigate(['Sales/CreateSalesQuotation']);
  }
  back(){
    this.router.navigate(['Sales/Customer'])
  }
}
