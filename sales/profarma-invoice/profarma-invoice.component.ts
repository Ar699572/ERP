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
import { StoreProformaInvoice } from 'src/app/store/StoreProformaInvoice';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';
@Component({
  selector: 'app-profarma-invoice',
  templateUrl: './profarma-invoice.component.html',
  styleUrls: ['./profarma-invoice.component.css']
})
export class ProfarmaInvoiceComponent implements OnInit {
  ProformaInvoice:FormGroup;
  ReferenceDisplayString="";
  errormsg="";
  showError=false;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {





    this.ProformaInvoice=formBuilder.group(
  
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


      //this.ViewandSearchProformaInvoice(RefString);
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
this.StoreSalesInvoice.ReferenceType='ProformaInvoice';


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
this.StoreSalesInvoice.TransportId=xml.TransportId;
this.StoreSalesInvoice.Area=xml.Area;
this.StoreSalesInvoice.TransportName=xml.TransportName;
this.StoreSalesInvoice.BillRefNo=xml.BillRefNo;
this.StoreSalesInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreSalesInvoice.ViewName='SalesInvoice';


if(xml.lstProformaInvoiceItems!=null && typeof(xml.lstProformaInvoiceItems)!=undefined)
   {
   var res=((xml.lstProformaInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstSalesInvoiceItems=JSON.parse(res);   

   for(let i=0;i<this.StoreSalesInvoice.lstSalesInvoiceItems.length;i++)
   {     
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefLineId=this.StoreSalesInvoice.lstSalesInvoiceItems[i].LineId;
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefId=xml.TransactionId;
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefNo2=xml.TransactionNo;
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefType1='ProformaInvoice';
    this.StoreSalesInvoice.lstSalesInvoiceItems[i].RefDate3=xml.TransactionDate;
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

   if(xml.lstDCItemsStock!=null && typeof(xml.lstDCItemsStock)!=undefined)
   {
   var res=((xml.lstDCItemsStock).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstSalesInvoiceItemsStock=JSON.parse(res);
   
   for(let i=0;i<this.StoreSalesInvoice.lstSalesInvoiceItemsStock.length;i++)
   {
    this.StoreSalesInvoice.lstSalesInvoiceItemsStock[i].LineId=0;
    
   }

   }


   if(xml.lstCharges!=null && typeof(xml.lstCharges)!=undefined)
   {
   var res=((xml.lstCharges).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreSalesInvoice.lstCharges=JSON.parse(res);
   for(let i=0;i<this.StoreSalesInvoice.lstCharges.length;i++)
   {
    this.StoreSalesInvoice.lstCharges[i].LineId=0;
    
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
     this.StoreSalesInvoice.ReferenceType='ProformaInvoice';
     this.StoreSalesInvoice.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
      this.APICall.OpenPageFromRefernce('SalesInvoice','./Sales/SalesInvoice','Sales')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreSalesInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));
 
    this.router.navigate(['Sales/SalesInvoice']);
   }

   LoadCustomers()
   {
   
     var that = this;
     debugger;
     (<any> $("#drpCustomer")).select2({
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
       $('#drpCustomer').on('select2:select', function (e) {
       
       debugger;
    
      
       if(typeof((<any>e).params.data.id)!='undefined')
       {
        
         debugger;
       that.f.CustomerId.setValue( (<any>e).params.data.id);
       that.f.Customername.setValue( (<any>e).params.data.text);
       
     }
     
      
       });
       var HSNselection = new Option(this.f.Customername.value,this.f.CustomerId.value.toString(), true, true);
     
       (<any> $('#drpCustomer')).append(HSNselection).trigger('change');
     
       $("#drpCustomer").on("select2:unselecting", function(e) {
        
       
        that.f.CustomerId.setValue(0);
        that.f.Customername.setValue('');
       
       });
    
    }
   StoreProformaInvoice: StoreProformaInvoice;
  XmlEdit="";
  CreateProformaInvoice(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreProformaInvoice=new StoreProformaInvoice;


this.StoreProformaInvoice.SequenceNumberId=xml.SequenceNumberId;
this.StoreProformaInvoice.Contactno= xml.Contactno;

this.StoreProformaInvoice.Email=xml.Email;
this.StoreProformaInvoice.RequiredDate=xml.RequiredDate;
this.StoreProformaInvoice.Billto=xml.Billto;
this.StoreProformaInvoice.Shipto=xml.Shipto;

this.StoreProformaInvoice.ShiptoAddress=xml.ShiptoAddress;
this.StoreProformaInvoice.Terms=xml.Terms;
this.StoreProformaInvoice.TermsandConditions=xml.TermsandConditions;
this.StoreProformaInvoice.BillToStateCode=xml.BillToStateCode;
this.StoreProformaInvoice.BillToStateName=xml.BillToStateName;
this.StoreProformaInvoice.TaxType=xml.TaxType;
this.StoreProformaInvoice.PaymentTerms=xml.PaymentTerms;
this.StoreProformaInvoice.TransactionTime=xml.TransactionTime;

this.StoreProformaInvoice.ReferenceNo=xml.ReferenceNo;
this.StoreProformaInvoice.ReferenceType=xml.ReferenceType;

this.StoreProformaInvoice.TransportId=xml.TransportId;
this.StoreProformaInvoice.Area=xml.Area;
this.StoreProformaInvoice.TransportName=xml.TransportName;
this.StoreProformaInvoice.BillRefNo=xml.BillRefNo;
this.StoreProformaInvoice.SalesType=xml.SalesType;

this.StoreProformaInvoice.TransactionDate=xml.TransactionDate;
this.StoreProformaInvoice.TransactionId=xml.TransactionId;
this.StoreProformaInvoice.TransactionNo=xml.TransactionNo;
this.StoreProformaInvoice.PartyId=xml.PartyId;
this.StoreProformaInvoice.PartyName=xml.PartyName;
this.StoreProformaInvoice.PartyGSTNo=xml.PartyGSTNo;

this.StoreProformaInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreProformaInvoice.ViewName=xml.ViewName;

if(xml.lstProformaInvoiceItems!=null && typeof(xml.lstProformaInvoiceItems)!=undefined)
   {
  // var res=((xml.lstProformaInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\"");
  var res=((xml.lstProformaInvoiceItems).replaceAll(/\n/g, "\\n")).replaceAll(/'/g,"\"");
   
   this.StoreProformaInvoice.lstProformaInvoiceItems=JSON.parse(res);
   
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreProformaInvoice.lstTermsChild=JSON.parse(res);
   
   }
   if(xml.lstCharges!=null && typeof(xml.lstCharges)!=undefined)
   {
   var res=((xml.lstCharges).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreProformaInvoice.lstCharges=JSON.parse(res);
   
   }

//this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));

this.APICall.UpdatedSelectedPath('./Sales/CreateProformaInvoice');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreProformaInvoice.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));
    this.router.navigate(['Sales/CreateProformaInvoice']);
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
  // this.StoreProformaInvoice=new StoreProformaInvoice;
  // this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));
  // this.router.navigate(['Sales/CreateProformaInvoice']);


  this.StoreProformaInvoice=new StoreProformaInvoice;
  this.APICall.UpdatedSelectedPath('./Sales/CreateProformaInvoice');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreSalesQuotation));
  this.StoreProformaInvoice.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));
  


  this.router.navigate(['Sales/CreateProformaInvoice']);


}

   get f() { 
     return this.ProformaInvoice
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreProformaInvoice=new StoreProformaInvoice;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    debugger;
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "ProformaInvoice"; });
if (result.length > 0) {

  this.StoreProformaInvoice=( result[0] );
  var RefString="";
  // if(this.StoreProformaInvoice.ReferenceNo!=""  && typeof(this.StoreProformaInvoice.ReferenceNo)!='undefined')
  // {
  
  // RefString="A.ReferenceNo='"+this.StoreProformaInvoice.ReferenceNo.toString()+"'";
  // this.ReferenceDisplayString="  (Ref: "+this.StoreProformaInvoice.ReferenceType.toString()+":"+this.StoreProformaInvoice.ReferenceNo.toString()+") ";
  // }
 
  this.ViewandSearchProformaInvoice(RefString);

}else{

  this.ViewandSearchProformaInvoice("");
}

this.LoadCustomers();


  }

ngAfterViewInit(){

   
  (<any> $("#drpCustomer")).select2();
  this.LoadCustomers();
    
  }


  lstProformaInvoice:any=[];
  lstDbResult:any  = [];
  ViewandSearchProformaInvoice(RefString)
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bProformaInvoice'></div> <span>Loading</span> </div>");
   
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
      this.APICall.DBCalling("ViewProformaInvoice",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstProformaInvoice=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstProformaInvoice=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchProformaInvoice("");
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
  XLSX.writeFile(wb, 'PerformaInvoiceView.xlsx');  

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
