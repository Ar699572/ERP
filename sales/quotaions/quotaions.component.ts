import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx'; 
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import { SalesQuotation } from 'src/app/Store/SalesQuotation';
import { StoreSalesOrder } from 'src/app/Store/StoreSalesOrder';
import { formatDate } from '@angular/common';
import { StoreDC } from 'src/app/Store/StoreDC';

import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';
import { StoreProformaInvoice } from 'src/app/Store/StoreProformaInvoice';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
@Component({
  selector: 'app-quotaions',
  templateUrl: './quotaions.component.html',
  styleUrls: ['./quotaions.component.css']
})
export class QuotaionsComponent implements OnInit {
  SalesQuotation:FormGroup;
  errormsg="";
  showError=false;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.SalesQuotation=formBuilder.group(
  
      {
    
        TransactionNo:new FormControl(''),
        CustomerName:new FormControl(''),
        Customername:new FormControl(''),
        Contactno:new FormControl(''),
        
        CustomerId:new FormControl(0),
    SearchString:new FormControl('')
      });
     
   }

   QuotDateChange(e)
   {
     debugger;
   }
   LoadCustomers()
   {
   
     var that = this;
     debugger;
     (<any> $("#Customer")).select2({
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
   
      return JSON.stringify( {"Operation": 'ViewCustomers', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" : that.APICall.GetCompanyID() })
          
     }
     ,
         contentType: 'application/json; charset=utf-8',
         processResults: function (response) {
          
      
         debugger;
         var yourArrayData=(JSON.parse(response['Message'])).Table;
    
      
            var  data = $.map(yourArrayData, function (obj) {
             debugger;
        obj.id = obj.CustomerId; 
        obj.text = obj.Customername; 
       
        return obj;
      });
      
      
    
           return {
         
      
              results: data
      
           };
         },
         cache: false
         
        }
        
    
       });   
       var that =this;
       $('#Customer').on('select2:select', function (e) {
       
       debugger;
    
      
       if(typeof((<any>e).params.data.id)!='undefined')
       {
        
         debugger;
       that.f.CustomerId.setValue( (<any>e).params.data.id);
       that.f.Customername.setValue( (<any>e).params.data.text);
       
     }
     
      
       });
       var HSNselection = new Option(this.f.Customername.value,this.f.CustomerId.value.toString(), true, true);
     
       (<any> $('#Customer')).append(HSNselection).trigger('change');
     
       $("#Customer").on("select2:unselecting", function(e) {
        
       
        that.f.CustomerId.setValue(0);
        that.f.Customername.setValue('');
       
       });
    
    }
   CreateSalesInvoice(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreSalesInvoice=new StoreSalesInvoice;

this.StoreSalesInvoice.CustomerRefNo=xml.TransactionNo;


//this.StoreSalesOrder.SequenceNumberId=xml.SequenceNumberId;
this.StoreSalesInvoice.Contactno= xml.Contactno;

this.StoreSalesInvoice.Email=xml.Email;
this.StoreSalesInvoice.RequiredDate=xml.RequiredDate;
this.StoreSalesInvoice.Billto=xml.Billto;
this.StoreSalesInvoice.Shipto=0;

this.StoreSalesInvoice.TermsandConditions="";
this.StoreSalesInvoice.TransportMode="";
this.StoreSalesInvoice.CustomerRefNo="";
this.StoreSalesInvoice.ProductReference="";


this.StoreSalesInvoice.TotalGross=this.TotalGross;    
this.StoreSalesInvoice.TotalCharges=this.TotalCharges;

this.StoreSalesInvoice.TotalDiscount=this.TotalDiscount;
this.StoreSalesInvoice.TotalTax=this.TotalTax;
this.StoreSalesInvoice.Total=this.totalAmnt;

this.StoreSalesInvoice.AfterDiscount=0;




this.StoreSalesInvoice.ReferenceNo=xml.TransactionNo;
this.StoreSalesInvoice.ReferenceType='SalesQuotation';


this.StoreSalesInvoice.ShiptoAddress=xml.ShiptoAddress;
this.StoreSalesInvoice.Terms=xml.Terms;
this.StoreSalesInvoice.TermsandConditions=xml.TermsandConditions;
this.StoreSalesInvoice.BillToStateCode=xml.BillToStateCode;
this.StoreSalesInvoice.BillToStateName=xml.BillToStateName;
this.StoreSalesInvoice.TaxType=xml.TaxType;
this.StoreSalesInvoice.PaymentTerms=xml.PaymentTerms;
this.StoreSalesInvoice.TransactionTime=xml.TransactionTime;

//this.StoreSalesInvoice.TransactionDate=xml.TransactionDate;
this.StoreSalesInvoice.TransactionId=0;
this.StoreSalesInvoice.TransactionNo='';
this.StoreSalesInvoice.PartyId=xml.PartyId;
this.StoreSalesInvoice.PartyName=xml.PartyName;
this.StoreSalesInvoice.PartyGSTNo=xml.PartyGSTNo;

this.StoreSalesInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreSalesInvoice.ViewName='SalesInvoice';


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replaceAll(/\n/g, "")).replaceAll(/'/g,"\"");
   
   this.StoreSalesInvoice.lstSalesInvoiceItems=JSON.parse(res);
   

   for(let i=0;i<this.StoreSalesInvoice.lstSalesInvoiceItems.length;i++)
   {
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefLineId=this.StoreSalesInvoice.lstSalesInvoiceItems[i].LineId;
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].LineId=0;
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefType1='SalesQuotation';
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefNo2=xml.TransactionNo;
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefDate3=xml.TransactionDate;
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefId=xml.TransactionId;
   
   }
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstTermsChild=JSON.parse(res);
   for(let i=0;i<this.StoreSalesInvoice.lstTermsChild.length;i++)
   {
    this.StoreSalesInvoice.lstTermsChild[i].LineId=0;
    
   }
   }





   //

   this.APICall.OpenPageFromRefernce('SalesInvoice','./Sales/CreateSalesInvoice','Sales')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreSalesInvoice.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));
   this.router.navigate(['Sales/CreateSalesInvoice']);
  }

   StoreSalesInvoice: StoreSalesInvoice;
   ViewSalesInvoice(xml) {
 
     this.StoreSalesInvoice=new StoreSalesInvoice;
     this.StoreSalesInvoice.ReferenceType='SalesQuotation';
     this.StoreSalesInvoice.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
      this.APICall.OpenPageFromRefernce('SalesInvoice','./Sales/SalesInvoice','Sales')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreSalesInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));
 
    this.router.navigate(['Sales/SalesInvoice']);
   }
 

   CreateDC(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreDC=new StoreDC;


//this.StoreSalesOrder.SequenceNumberId=xml.SequenceNumberId;
this.StoreDC.Contactno= xml.Contactno;

this.StoreDC.Email=xml.Email;
this.StoreDC.RequiredDate=xml.RequiredDate;
this.StoreDC.Billto=xml.Billto;
this.StoreDC.Shipto=xml.Shipto;


this.StoreDC.ReferenceNo=xml.TransactionNo;
this.StoreDC.ReferenceType='SalesQuotation';


this.StoreDC.ShiptoAddress=xml.ShiptoAddress;
this.StoreDC.Terms=xml.Terms;
this.StoreDC.TermsandConditions=xml.TermsandConditions;
this.StoreDC.BillToStateCode=xml.BillToStateCode;
this.StoreDC.BillToStateName=xml.BillToStateName;
this.StoreDC.TaxType=xml.TaxType;
this.StoreDC.PaymentTerms=xml.PaymentTerms;
this.StoreDC.TransactionTime=xml.TransactionTime;

this.StoreDC.TransactionDate=xml.TransactionDate;
this.StoreDC.TransactionId=0;
this.StoreDC.TransactionNo='';
this.StoreDC.PartyId=xml.PartyId;
this.StoreDC.PartyName=xml.PartyName;
this.StoreDC.PartyGSTNo=xml.PartyGSTNo;

this.StoreDC.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreDC.ViewName='DC';


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreDC.lstDCItems=JSON.parse(res);
   

   for(let i=0;i<this.StoreDC.lstDCItems.length;i++)
   {
    this.StoreDC.lstDCItems[i].LineId=0;
    
   }
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreDC.lstTermsChild=JSON.parse(res);
   for(let i=0;i<this.StoreDC.lstTermsChild.length;i++)
   {
    this.StoreDC.lstTermsChild[i].LineId=0;
    
   }
   }





   //

   this.APICall.OpenPageFromRefernce('DC','./Sales/CreateDC','Sales')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreDC.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreDC));
   this.router.navigate(['Sales/CreateDC']);
  }

   StoreDC: StoreDC;
   ViewDC(xml) {
 
     this.StoreDC=new StoreDC;
     this.StoreDC.ReferenceType='SalesQuotation';
     this.StoreDC.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
      this.APICall.OpenPageFromRefernce('DC','./Sales/DC','Sales')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreDC.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreDC));
 
    this.router.navigate(['Sales/DC']);
   }
 

   CreateProformaInvoice(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreProformaInvoice=new StoreProformaInvoice;


//this.StoreSalesOrder.SequenceNumberId=xml.SequenceNumberId;
this.StoreProformaInvoice.Contactno= xml.Contactno;

this.StoreProformaInvoice.Email=xml.Email;
this.StoreProformaInvoice.RequiredDate=xml.RequiredDate;
this.StoreProformaInvoice.Billto=xml.Billto;
this.StoreProformaInvoice.Shipto=xml.Shipto;


this.StoreProformaInvoice.ReferenceNo=xml.TransactionNo;
this.StoreProformaInvoice.ReferenceType='SalesQuotation';


this.StoreProformaInvoice.ShiptoAddress=xml.ShiptoAddress;
this.StoreProformaInvoice.Terms=xml.Terms;
this.StoreProformaInvoice.TermsandConditions=xml.TermsandConditions;
this.StoreProformaInvoice.BillToStateCode=xml.BillToStateCode;
this.StoreProformaInvoice.BillToStateName=xml.BillToStateName;
this.StoreProformaInvoice.TaxType=xml.TaxType;
this.StoreProformaInvoice.PaymentTerms=xml.PaymentTerms;
this.StoreProformaInvoice.TransactionTime=xml.TransactionTime;

this.StoreProformaInvoice.TransactionDate=xml.TransactionDate;
this.StoreProformaInvoice.TransactionId=0;
this.StoreProformaInvoice.TransactionNo='';
this.StoreProformaInvoice.PartyId=xml.PartyId;
this.StoreProformaInvoice.PartyName=xml.PartyName;
this.StoreProformaInvoice.PartyGSTNo=xml.PartyGSTNo;

this.StoreProformaInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreProformaInvoice.ViewName='ProformaInvoice';


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreProformaInvoice.lstProformaInvoiceItems=JSON.parse(res);
   

   for(let i=0;i<this.StoreProformaInvoice.lstProformaInvoiceItems.length;i++)
   {
    this.StoreProformaInvoice.lstProformaInvoiceItems[i].LineId=0;
    
   }
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreProformaInvoice.lstTermsChild=JSON.parse(res);
   for(let i=0;i<this.StoreProformaInvoice.lstTermsChild.length;i++)
   {
    this.StoreProformaInvoice.lstTermsChild[i].LineId=0;
    
   }
   }





   //

   this.APICall.OpenPageFromRefernce('ProformaInvoice','./Sales/CreateProformaInvoice','Sales')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreProformaInvoice.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));
   this.router.navigate(['Sales/CreateProformaInvoice']);
  }

   StoreProformaInvoice: StoreProformaInvoice;
   ViewProformaInvoice(xml) {
 
     this.StoreProformaInvoice=new StoreProformaInvoice;
     this.StoreProformaInvoice.ReferenceType='SalesQuotation';
     this.StoreProformaInvoice.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
      this.APICall.OpenPageFromRefernce('ProformaInvoice','./Sales/ProformaInvoice','Sales')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreProformaInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));
 
    this.router.navigate(['Sales/ProformaInvoice']);
   }
 
  
   
  XmlEdit="";
  StoreSalesQuotation: SalesQuotation;
  ViewSalesOrder(xml) {

    this.StoreSalesOrder=new StoreSalesOrder;
    this.StoreSalesOrder.ReferenceType='SalesQuotation';
    this.StoreSalesOrder.ReferenceNo=xml.TransactionNo;
   
  // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
     this.APICall.OpenPageFromRefernce('SalesOrder','./Sales/SalesOrder','Sales')

     var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreSalesOrder.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));

   this.router.navigate(['Sales/SalesOrder']);
  }

  StoreSalesOrder: StoreSalesOrder;
  CreateSalesOrder(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreSalesOrder=new StoreSalesOrder;


//this.StoreSalesOrder.SequenceNumberId=xml.SequenceNumberId;
this.StoreSalesOrder.Contactno= xml.Contactno;

this.StoreSalesOrder.Email=xml.Email;
this.StoreSalesOrder.RequiredDate=xml.RequiredDate;
this.StoreSalesOrder.Billto=xml.Billto;
this.StoreSalesOrder.Shipto=xml.Shipto;


this.StoreSalesOrder.ReferenceNo=xml.TransactionNo;
this.StoreSalesOrder.ReferenceType='SalesQuotation';


this.StoreSalesOrder.ShiptoAddress=xml.ShiptoAddress;
this.StoreSalesOrder.Terms=xml.Terms;
this.StoreSalesOrder.TermsandConditions=xml.TermsandConditions;
this.StoreSalesOrder.BillToStateCode=xml.BillToStateCode;
this.StoreSalesOrder.BillToStateName=xml.BillToStateName;
this.StoreSalesOrder.TaxType=xml.TaxType;
this.StoreSalesOrder.PaymentTerms=xml.PaymentTerms;
this.StoreSalesOrder.TransactionTime=xml.TransactionTime;

this.StoreSalesOrder.TransactionDate=xml.TransactionDate;
this.StoreSalesOrder.TransactionId=0;
this.StoreSalesOrder.TransactionNo='';
this.StoreSalesOrder.PartyId=xml.PartyId;
this.StoreSalesOrder.PartyName=xml.PartyName;
this.StoreSalesOrder.PartyGSTNo=xml.PartyGSTNo;

this.StoreSalesOrder.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreSalesOrder.ViewName='SalesOrder';


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesOrder.lstOrderItems=JSON.parse(res);
   

   for(let i=0;i<this.StoreSalesOrder.lstOrderItems.length;i++)
   {
    this.StoreSalesOrder.lstOrderItems[i].LineId=0;
    
   }
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesOrder.lstTermsChild=JSON.parse(res);
   for(let i=0;i<this.StoreSalesOrder.lstTermsChild.length;i++)
   {
    this.StoreSalesOrder.lstTermsChild[i].LineId=0;
    
   }
   }





   //

   this.APICall.OpenPageFromRefernce('SalesOrder','./Sales/CreateSalesOrder','Sales')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreSalesOrder.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));
   this.router.navigate(['Sales/CreateSalesOrder']);
  }



  CreateSalesQuotation(xml) { 
    debugger;
this.StoreSalesQuotation=new SalesQuotation;
this.StoreSalesQuotation.SequenceNumberId=xml.SequenceNumberId;
this.StoreSalesQuotation.Contactno= xml.Contactno;
this.StoreSalesQuotation.Email=xml.Email;
this.StoreSalesQuotation.RequiredDate=xml.RequiredDate;
this.StoreSalesQuotation.Billto=xml.Billto;
this.StoreSalesQuotation.Shipto=xml.Shipto;
this.StoreSalesQuotation.CustomerRefNo=xml.CustomerRefNo;
this.StoreSalesQuotation.ProductReference=xml.ProductReference;
this.StoreSalesQuotation.ShiptoAddress=xml.ShiptoAddress;
this.StoreSalesQuotation.Terms=xml.Terms;
this.StoreSalesQuotation.TermsandConditions=xml.TermsandConditions;
this.StoreSalesQuotation.BillToStateCode=xml.BillToStateCode;
this.StoreSalesQuotation.BillToStateName=xml.BillToStateName;
this.StoreSalesQuotation.TaxType=xml.TaxType;
this.StoreSalesQuotation.PaymentTerms=xml.PaymentTerms;
this.StoreSalesQuotation.TransactionTime=xml.TransactionTime;
this.StoreSalesQuotation.TransactionDate=xml.TransactionDate;
this.StoreSalesQuotation.TransactionId=xml.TransactionId;
this.StoreSalesQuotation.TransactionNo=xml.TransactionNo;
this.StoreSalesQuotation.PartyId=xml.PartyId;
this.StoreSalesQuotation.PartyName=xml.PartyName;
this.StoreSalesQuotation.PartyGSTNo=xml.PartyGSTNo;
this.StoreSalesQuotation.InvoiceType=xml.InvoiceType;
this.StoreSalesQuotation.BCDAmount=xml.BCDAmount;
this.StoreSalesQuotation.SWSAmount=xml.SWSAmount;
this.StoreSalesQuotation.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreSalesQuotation.ViewName=xml.ViewName;


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replace(/\n/g, "\\n")).replace(/'/g,"\"");
   
   this.StoreSalesQuotation.lstQuotationItems=JSON.parse(res);
   
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesQuotation.lstTermsChild=JSON.parse(res);
   
   }

   if(xml.lstCharges!=null && typeof(xml.lstCharges)!=undefined)
   {
     try{
   var res=((xml.lstCharges).replace(/\n/g, "")).replace(/'/g,"\"");
   
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
  this.StoreSalesQuotation=new SalesQuotation;
  this.APICall.UpdatedSelectedPath('./Sales/CreateSalesQuotation');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreSalesQuotation));
  this.StoreSalesQuotation.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreSalesQuotation));



  this.router.navigate(['Sales/CreateSalesQuotation']);
}

   get f() { 
     return this.SalesQuotation
    .controls;
   }
  DeviceType="";
  FromDate:any;
  ToDate:any;
  ngOnInit() {
    debugger;
    this.DeviceType= localStorage.getItem('DeviceType')
    this.StoreSalesInvoice=new StoreSalesInvoice;
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    if (result.length > 0) {
      this.StoreSalesInvoice=( result[0] );
      var RefString="";
      this.ViewandSearchSalesQuotation(RefString);
    }else{
      this.ViewandSearchSalesQuotation("");
    }
    this.LoadCustomers();
    debugger;

    this.FromDate="04/01/2020";
      if (this.FromDate != '') {
        $("#FromDate").val(formatDate(new Date(this.FromDate), 'MM/dd/yyyy', 'en'));
      } else {
        $("#FromDate").val(formatDate(new Date(), 'MM/dd/yyyy', 'en'));
      }
    if(this.ToDate==undefined)
    {
      this.ToDate="";
    }
      if (this.ToDate != '') {
        $("#ToDate").val(formatDate(new Date(this.ToDate), 'MM/dd/yyyy', 'en'));
      } else {
        this.ToDate= $("#ToDate").val(formatDate(new Date(), 'MM/dd/yyyy', 'en'));
      }
 
  }

ngAfterViewInit(){
  (<any> $("#Customer")).select2();
  this.LoadCustomers();
  }

  TotalAmount:number=0;
  TotalCharges:number=0;
    TotalGross:number=0;
    TotalDiscount:number=0;
    TotalTax:number=0;
    GetCustomerWiseSalesQuotation()
  {
    debugger;
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
      this.ViewandSearchSalesQuotation(this.f.SearchString);
    
   
     
  
      
      

    }
  }

  ControlDatePickerLoad()
{

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

(window as any).$('input.create-event-datepicker').daterangepicker({
  singleDatePicker: true,
  showDropdowns: true,
  autoUpdateInput: false
}).on('apply.daterangepicker', function(ev, picker) {
 
  $(this).val(picker.startDate.format('MM/DD/YYYY'));
});

}
  lstSalesQuotation:any=[];
  lstDbResult:any  = [];
  totalAmnt:number=0;
  ViewandSearchSalesQuotation(RefString)
  {
debugger; 
if(AppSettings.ShowLoaderOnView)
{
$("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

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
     debugger;
      this.APICall.DBCalling("ViewSalesQuotation",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
          this.lstSalesQuotation=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstSalesQuotation=this.lstDbResult.Table;


            var result = this.lstSalesQuotation.filter((x) => { return formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') > this.FromDate && formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') < this.ToDate; });
            this.lstSalesQuotation=result;
            debugger;
            for(var i=0;i<this.lstSalesQuotation.length;i++)
            {
              this.TotalAmount=this.TotalAmount+(+this.lstSalesQuotation[i].Total)
              this.TotalCharges=this.TotalCharges+(+this.lstSalesQuotation[i].TotalCharges)
              this.TotalGross=this.TotalGross+(+this.lstSalesQuotation[i].TotalGross)
              this.TotalTax=this.TotalTax+(+this.lstSalesQuotation[i].TotalTax)
              this.TotalDiscount=this.TotalDiscount+(+this.lstSalesQuotation[i].TotalDiscount)
              this.totalAmnt=this.totalAmnt+(+this.lstSalesQuotation[i].Total)
            }


            if(this.lstSerchableFields.length==0)
            {
            var  stringDbFld=this.lstDbResult.Table[0].SerchableFields
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
    this.ViewandSearchSalesQuotation("");
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
  Clear()
  {

  }
  QuotDateChange1(e)
  {

  }
  //#endregion "SearchPanelLogic"
  //excel download
@ViewChild('TABLE', { static: false }) TABLE: ElementRef;
ExportTOExcel() {  
  debugger;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement); 
  ws['!cols'] = [{ width: 10}, { width: 18 }, { width: 18 },{ width: 49 },{ width: 16 },{ width: 14 },{ width: 15 },{ width: 11 }  ]; 
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, 'QuotationView.xlsx');  

}

ExportTOExcel1(event){
  if(event == true){
    // this.ExportTOExcel();
  }
}
downloadAsPDF1(event){
  if(event == true){
    // this.downloadAsPDF();
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

@ViewChild('PDFTable',{static:false}) pdfTable: ElementRef;

 public downloadAsPDF() {
   debugger;
  //   const pdfTable = this.pdfTable.nativeElement;
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   const documentDefinition = { content: html };
  //  pdfMake.createPdf(documentDefinition).download(); 
   
 }

}

