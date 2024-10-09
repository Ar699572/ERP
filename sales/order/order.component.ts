import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
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
import { StoreSalesOrder } from 'src/app/store/StoreSalesOrder';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";

import { StoreDC } from 'src/app/Store/StoreDC';

import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';
import { StoreProformaInvoice } from 'src/app/Store/StoreProformaInvoice';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  Order:FormGroup;
  ReferenceDisplayString="";
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {





    this.Order=formBuilder.group(
  
      {
    
        TransactionNo:new FormControl(''),
        CustomerName:new FormControl(''),
        
        Contactno:new FormControl(''),


    SearchString:new FormControl('')
      });

    //  var RefData= this.router.getCurrentNavigation().extras.state
  //var RefString="";
    //  if(RefData!=null && typeof(RefData)!='undefined')
    
   //   {
        debugger;
   //     RefString="A.ReferenceNo='"+RefData.ReferenceNo.toString()+"'";


//this.ReferenceDisplayString="  (Ref: "+RefData.ReferenceType.toString()+":"+RefData.ReferenceNo.toString()+") ";

     // }


      //this.ViewandSearchSalesOrder(RefString);
   }


   QuotDateChange(e)
   {
     
   }


   CreateSalesInvoice(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreSalesInvoice=new StoreSalesInvoice;


//this.StoreSalesOrder.SequenceNumberId=xml.SequenceNumberId;
this.StoreSalesInvoice.Contactno= xml.Contactno;

this.StoreSalesInvoice.Email=xml.Email;
this.StoreSalesInvoice.RequiredDate=xml.RequiredDate;
this.StoreSalesInvoice.Billto=xml.Billto;
this.StoreSalesInvoice.Shipto=xml.Shipto;


this.StoreSalesInvoice.ReferenceNo=xml.TransactionNo;
this.StoreSalesInvoice.ReferenceType='SalesOrder';


this.StoreSalesInvoice.ShiptoAddress=xml.ShiptoAddress;
this.StoreSalesInvoice.Terms=xml.Terms;
this.StoreSalesInvoice.TermsandConditions=xml.TermsandConditions;
this.StoreSalesInvoice.BillToStateCode=xml.BillToStateCode;
this.StoreSalesInvoice.BillToStateName=xml.BillToStateName;
this.StoreSalesInvoice.TaxType=xml.TaxType;
this.StoreSalesInvoice.PaymentTerms=xml.PaymentTerms;
this.StoreSalesInvoice.TransactionTime=xml.TransactionTime;

this.StoreSalesInvoice.TransactionDate=xml.TransactionDate;
this.StoreSalesInvoice.TransactionId=0;
this.StoreSalesInvoice.TransactionNo='';
this.StoreSalesInvoice.PartyId=xml.PartyId;
this.StoreSalesInvoice.PartyName=xml.PartyName;
this.StoreSalesInvoice.PartyGSTNo=xml.PartyGSTNo;

this.StoreSalesInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreSalesInvoice.ViewName='SalesInvoice';


if(xml.lstOrderItems!=null && typeof(xml.lstOrderItems)!=undefined)
   {
   var res=((xml.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstSalesInvoiceItems=JSON.parse(res);
   

   for(let i=0;i<this.StoreSalesInvoice.lstSalesInvoiceItems.length;i++)
   {
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].LineId=0;
    
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
     this.StoreSalesInvoice.ReferenceType='SalesOrder';
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
this.StoreDC.ReferenceType='SalesOrder';


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


if(xml.lstOrderItems!=null && typeof(xml.lstOrderItems)!=undefined)
   {
   var res=((xml.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
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
     this.StoreDC.ReferenceType='SalesOrder';
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
this.StoreProformaInvoice.ReferenceType='SalesOrder';


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


if(xml.lstOrderItems!=null && typeof(xml.lstOrderItems)!=undefined)
   {
   var res=((xml.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
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
     this.StoreProformaInvoice.ReferenceType='SalesOrder';
     this.StoreProformaInvoice.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
      this.APICall.OpenPageFromRefernce('ProformaInvoice','./Sales/ProformaInvoice','Sales')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreProformaInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));
 
    this.router.navigate(['Sales/ProformaInvoice']);
   }
 
  
   

  
   StoreSalesOrder: StoreSalesOrder;
  XmlEdit="";
  CreateSalesOrder(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreSalesOrder=new StoreSalesOrder;



this.StoreSalesOrder.SequenceNumberId=xml.SequenceNumberId;
this.StoreSalesOrder.Contactno= xml.Contactno;

this.StoreSalesOrder.Email=xml.Email;
this.StoreSalesOrder.RequiredDate=xml.RequiredDate;
this.StoreSalesOrder.Billto=xml.Billto;
this.StoreSalesOrder.Shipto=xml.Shipto;

this.StoreSalesOrder.ShiptoAddress=xml.ShiptoAddress;
this.StoreSalesOrder.Terms=xml.Terms;
this.StoreSalesOrder.TermsandConditions=xml.TermsandConditions;
this.StoreSalesOrder.BillToStateCode=xml.BillToStateCode;
this.StoreSalesOrder.BillToStateName=xml.BillToStateName;
this.StoreSalesOrder.TaxType=xml.TaxType;
this.StoreSalesOrder.PaymentTerms=xml.PaymentTerms;
this.StoreSalesOrder.TransactionTime=xml.TransactionTime;

this.StoreSalesOrder.ReferenceNo=xml.ReferenceNo;
this.StoreSalesOrder.ReferenceType=xml.ReferenceType;


this.StoreSalesOrder.TransactionDate=xml.TransactionDate;
this.StoreSalesOrder.TransactionId=xml.TransactionId;
this.StoreSalesOrder.TransactionNo=xml.TransactionNo;
this.StoreSalesOrder.PartyId=xml.PartyId;
this.StoreSalesOrder.PartyName=xml.PartyName;
this.StoreSalesOrder.PartyGSTNo=xml.PartyGSTNo;

this.StoreSalesOrder.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreSalesOrder.ViewName=xml.ViewName;


if(xml.lstOrderItems!=null && typeof(xml.lstOrderItems)!=undefined)
   {
   var res=((xml.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesOrder.lstOrderItems=JSON.parse(res);
   
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesOrder.lstTermsChild=JSON.parse(res);
   
   }


//this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));

this.APICall.UpdatedSelectedPath('./Sales/CreateSalesOrder');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreSalesOrder.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));
    this.router.navigate(['Sales/CreateSalesOrder']);
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
  // this.StoreSalesOrder=new StoreSalesOrder;
  // this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));

  this.StoreSalesOrder=new StoreSalesOrder;
  this.APICall.UpdatedSelectedPath('./Sales/CreateSalesOrder');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreSalesQuotation));
  this.StoreSalesOrder.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));
 



  this.router.navigate(['Sales/CreateSalesOrder']);
}

   get f() { 
     return this.Order
    .controls;
   }
   errormsg="";
  showError=false;
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreSalesOrder=new StoreSalesOrder;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
debugger;
//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "SalesOrder"; });
if (result.length > 0) {

  this.StoreSalesOrder=( result[0] );
  var RefString="";
  // if(this.StoreSalesOrder.ReferenceNo!=""  && typeof(this.StoreSalesOrder.ReferenceNo)!='undefined' )
  // {
  
  // RefString="A.ReferenceNo='"+this.StoreSalesOrder.ReferenceNo.toString()+"'";
  // this.ReferenceDisplayString="  (Ref: "+this.StoreSalesOrder.ReferenceType.toString()+":"+this.StoreSalesOrder.ReferenceNo.toString()+") ";
  // }
 
  this.ViewandSearchSalesOrder(RefString);

}else{

  this.ViewandSearchSalesOrder("");
}




  }

ngAfterViewInit(){

   
     
    
  }


  lstSalesOrder:any=[];
  lstDbResult:any  = [];
  ViewandSearchSalesOrder(RefString)
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
        this.FilterType="";
      }
     debugger;
      this.APICall.DBCalling("ViewSalesOrder",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstSalesOrder=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstSalesOrder=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchSalesOrder("");
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

  //#endregion "SearchPanelLogic"
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
ExportTOExcel() {  
  debugger;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement); 
  ws['!cols'] = [{ width: 10}, { width: 18 }, { width: 18 },{ width: 49 },{ width: 16 },{ width: 14 },{ width: 15 },{ width: 15 }  ]; 
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, 'OrderView.xlsx');  

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
