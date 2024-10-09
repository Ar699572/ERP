import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import { StoreSalesInvoice } from 'src/app/store/StoreSalesInvoice';
import { Common } from 'src/app/store/Common';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { DatePipe, formatDate } from '@angular/common';


import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 import htmlToPdfmake from "html-to-pdfmake"
import * as XLSX from 'xlsx'; 
import * as moment from 'moment';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css'],
  providers:[DatePipe]
})
export class SalesInvoiceComponent implements OnInit {
 
  SalesInvoice:FormGroup;
  common:Common;
  ReferenceDisplayString="";
  p: number = 1;
  errormsg="";
  showError=false;
  minDate:string='';
  FinancialstartYear:string='';
  FinancialEndYear:string='';
  maxdate:string='';
   pageOfItems:  Array<any>;
  constructor(private router:Router,private formBuilder: FormBuilder,private datePipe:DatePipe,private APICall:APICallingService,private store: Store<any>) {
    debugger;
    
    var month='04'
    var day='01'
    var currentYear = new Date().getFullYear();
    var Mindateset=currentYear + '-' + month+'-' + day
    this.minDate=moment(Mindateset).format('YYYY-MM-DD')
    this.FinancialstartYear = this.datePipe.transform(this.minDate,'yyyy-MM-dd');
    currentYear =currentYear+ 1
    this.maxdate=currentYear + '-' + '03'+'-' + '31'
    this.FinancialEndYear =this.datePipe.transform(this.maxdate,'yyyy-MM-dd');
debugger;


 
    this.SalesInvoice=this.formBuilder.group(  
      {    
        TransactionNo:new FormControl(''),
        CustomerName:new FormControl(''),
        Customername:new FormControl(''),
        Contactno:new FormControl(''),
        CustomerId:new FormControl(0),
        SearchString:new FormControl(''),
        ToDate:new FormControl( this.FinancialEndYear ),
        FromDate:new FormControl( this.FinancialstartYear),
      });

    
        debugger;
  
   }





  
   StoreSalesInvoice: StoreSalesInvoice;
  dataEdit="";

  LoadSalesInvoice(invoiceid)
  {
    debugger;
    try{

      if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }

let lstSalesInvoice:any=[];
  
     debugger;
      this.APICall.DBCalling("ViewSalesInvoice","","All",invoiceid,this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          $("#loaderParent").hide();
          debugger;
          try{
          this.lstDbResult=JSON.parse(res['Message']);        
          
          lstSalesInvoice=[];

          if(this.lstDbResult.Table.length>0)
          {
            lstSalesInvoice=this.lstDbResult.Table;   
            
            if(lstSalesInvoice.length>0)
            {     
            this.CreateSalesInvoice(lstSalesInvoice[0]);
            }

          }   
        }
        catch(error)      {}
        });
    }
    catch(error){}
  }
  CreateSalesInvoice(data){
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
     debugger;
    this.StoreSalesInvoice.ShiptoAddress=data.ShiptoAddress;
    this.StoreSalesInvoice.Terms=data.Terms;
    this.StoreSalesInvoice.TermsandConditions=data.TermsandConditions;
    this.StoreSalesInvoice.BillToStateCode=data.BillToStateCode;
    this.StoreSalesInvoice.BillToStateName=data.BillToStateName;
    this.StoreSalesInvoice.TaxType=data.TaxType;
    this.StoreSalesInvoice.PaymentTerms=data.PaymentTerms;
    this.StoreSalesInvoice.TransactionTime=data.TransactionTime;
    debugger;
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
      this.StoreSalesInvoice.ModifiedDate=this.common.getDate( data.ModifiedDate.toString());
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
debugger;
    this.APICall.UpdatedSelectedPath('./Sales/CreateSalesInvoice');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreSalesInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));
    debugger;
    
    this.router.navigate(['Sales/CreateSalesInvoice']);
  }
  CallStoredProcedure(data)
  {
   debugger;
    var TransactionID=data.TransactionId;
    this.LoadSalesInvoice(TransactionID)
   
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
 


OnAdd()
{
  debugger;
  this.StoreSalesInvoice=new StoreSalesInvoice;
  this.APICall.UpdatedSelectedPath('./Sales/CreateSalesInvoice');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreSalesQuotation));
  this.StoreSalesInvoice.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));
  this.router.navigate(['Sales/CreateSalesInvoice']);
}

   get f() { 
     return this.SalesInvoice
    .controls;
   }
  DeviceType="";

  ngOnInit() {
    debugger;
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreSalesInvoice=new StoreSalesInvoice;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
// $('#FromDate').val( this.minDate)
// $('#ToDate').val( this.FinancialEndYear)
if (result.length > 0) {
  this.StoreSalesInvoice=( result[0] );
  var RefString="";
  this.ViewandSearchSalesInvoice(RefString);

}else{

  this.ViewandSearchSalesInvoice("");
  

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

  
  FromDate:any;
  ToDate:any;
ngAfterViewInit(){

    (<any> $("#Customer")).select2();
    this.LoadCustomers();
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
      // this.f.SearchString=CustId.toString();
      var xml1 = '<NewDataSet><Table1>'
      + '<CUSTOMERId>' + this.f.CustomerId.value + '</CUSTOMERId>'
      + '<Fromdate>' +$('#FromDate').val()+ '</Fromdate>'
      + '<Todate>' + $('#ToDate').val() + '</Todate>'
      
      + '</Table1></NewDataSet>';
  debugger;
      this.ViewandSearchSalesInvoice(xml1);
    }
  }

  Clear()
{
  this.ViewandSearchSalesInvoice("");
  this.TotalAmount=0;
  $('#Customer').val(null).trigger('change');
  $('#ToDate').val(this.FinancialEndYear)
  $('#FromDate').val(this.FinancialstartYear)
  this.f.SearchString.setValue('')
}

  lstSalesInvoice:any=[];
  lstDbResult:any  = [];
  totalAmnt:number=0;
  ViewandSearchSalesInvoice(RefString)
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
        this.FilterType='All'
       sstring=(this.GetSearchString());
       RefString='<NewDataSet><Table1><CUSTOMERId></CUSTOMERId><Fromdate></Fromdate><Todate></Todate></Table1></NewDataSet>'
      
      }else{
        sstring='';
        this.FilterType="";
      }
      
     debugger;
      this.APICall.DBCalling("SalesInvoiceoverviewView",sstring,this.FilterType,RefString,this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstSalesInvoice=[];
          this.clearTotalAmt()

        
          if(this.lstDbResult.Table.length>0)
          {
            this.lstSalesInvoice=this.lstDbResult.Table;
      
            
            debugger;
            for(var i=0;i<this.lstSalesInvoice.length;i++)
            {
              this.TotalAmount=this.TotalAmount+(+this.lstSalesInvoice[i].Total)
              this.TotalCharges=this.TotalCharges+(+this.lstSalesInvoice[i].TotalCharges)
              this.TotalGross=this.TotalGross+(+this.lstSalesInvoice[i].TotalGross)
              this.TotalTax=this.TotalTax+(+this.lstSalesInvoice[i].TotalTax)
              this.TotalDiscount=this.TotalDiscount+(+this.lstSalesInvoice[i].TotalDiscount)
              this.totalAmnt=this.totalAmnt+(+this.lstSalesInvoice[i].Total)
            }
           
            if(this.lstSerchableFields.length==0)
            {


          var    stringDbFld=this.lstDbResult.Table[0].SerchableFields
             var parser = new DOMParser();
             var dataDoc = parser.parseFromString(stringDbFld,"text/xml");
            
            var sizex = dataDoc.getElementsByTagName("ControlName");
            
            for (var i = 0 ; i < sizex.length ; i++) {
            

          
            this.lstSerchableFields.push(
              

              ( { 
                ControlName:dataDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue
                
                ,DBField:dataDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue
                
                })

            );
            }
            }
          }
          

          $("#loaderParent").hide();
        });
  }

  clearTotalAmt(){
    this.TotalAmount=0;
    this.TotalCharges=0;
    this.TotalGross=0;
    this.TotalTax=0;
    this.TotalDiscount=0;
    this.totalAmnt=0;
  }
  //#region "getControlValue"
  getControlValue(Control,Type):string
  {
  debugger;
   var Value=(Type=="string"?"":"0");
    if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
    {
      Value=Control.value;
    }
  
    return Value;
  }





  SearchClick()
  {
    debugger;
    this.ViewandSearchSalesInvoice("");
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
    debugger;
    
    SearchString=this.getControlValue(this.f.SearchString,"string")
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
  
    

     return JSON.stringify( {"Operation": 'ViewCustomers',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
         
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



  //#endregion "SearchPanelLogic"


  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ExportTOExcel(){
      debugger;
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement); 
      ws['!cols'] = [{ width: 10}, { width: 13 }, { width: 20 },{ width: 42 },{ width: 20 },{ width: 15 },{ width: 30 } ,{ width: 32 }]; //set col. widths
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, 'SalesInvoice.xlsx');  

  }

  //pdf download method
  
 @ViewChild('PDFTable',{static:false}) pdfTable: ElementRef;

 public downloadAsPDF() {
   debugger;
   const pdfTable = this.pdfTable.nativeElement;
   var html = htmlToPdfmake(pdfTable.innerHTML);
   const documentDefinition = { content: html };
   pdfMake.createPdf(documentDefinition).download('SalesInvoice'); 
   
 }

 ExportTOExcel1(event){
  if(event == true){
     this.ExportTOExcel();
  }
}
downloadAsPDF1(event){
  if(event == true){
     this.downloadAsPDF();
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
  
}
