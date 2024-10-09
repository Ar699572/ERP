import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import { PurchaseQuotation } from 'src/app/Store/StorePurchaseQuotation';
import { StorePurchaseOrder } from 'src/app/Store/StorePurchaseOrder';

import { StoreGRN } from 'src/app/Store/StoreGRN';

import { StorePurchaseInvoice } from 'src/app/Store/StorePurchaseInvoice';

import * as TabStore from "src/app/store/TabStore/Tab.Actions";

@Component({
  selector: 'app-purchase-quotation',
  templateUrl: './purchase-quotation.component.html',
  styleUrls: ['./purchase-quotation.component.css']
})
export class PurchaseQuotationComponent implements OnInit {

  PurchaseQuotation:FormGroup;
  errormsg="";
  showError=false;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.PurchaseQuotation=formBuilder.group(
  
      {
    
        TransactionNo:new FormControl(''),
        CustomerName:new FormControl(''),
        
        Contactno:new FormControl(''),


    SearchString:new FormControl('')
      });
      
   }

   StorePurchaseInvoice: StorePurchaseInvoice;

   CreatePurchaseInvoice(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StorePurchaseInvoice=new StorePurchaseInvoice;


//this.StorePurchaseOrder.SequenceNumberId=xml.SequenceNumberId;
this.StorePurchaseInvoice.Contactno= xml.Contactno;

this.StorePurchaseInvoice.Email=xml.Email;
this.StorePurchaseInvoice.RequiredDate=xml.RequiredDate;
this.StorePurchaseInvoice.Billto=xml.Billto;
this.StorePurchaseInvoice.Shipto=xml.Shipto;


this.StorePurchaseInvoice.ReferenceNo=xml.TransactionNo;
this.StorePurchaseInvoice.ReferenceType='PurchaseQuotation';


this.StorePurchaseInvoice.ShiptoAddress=xml.ShiptoAddress;
this.StorePurchaseInvoice.Terms=xml.Terms;
this.StorePurchaseInvoice.TermsandConditions=xml.TermsandConditions;
this.StorePurchaseInvoice.BillToStateCode=xml.BillToStateCode;
this.StorePurchaseInvoice.BillToStateName=xml.BillToStateName;
this.StorePurchaseInvoice.TaxType=xml.TaxType;
this.StorePurchaseInvoice.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseInvoice.TransactionTime=xml.TransactionTime;
this.StorePurchaseInvoice.TransactionTime=xml.TransactionTime;
this.StorePurchaseInvoice.TransactionDate=xml.TransactionDate;
this.StorePurchaseInvoice.TransactionId=0;
this.StorePurchaseInvoice.TransactionNo='';
this.StorePurchaseInvoice.PartyId=xml.PartyId;
this.StorePurchaseInvoice.PartyName=xml.PartyName;
this.StorePurchaseInvoice.PartyGSTNo=xml.PartyGSTNo;

this.StorePurchaseInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseInvoice.ViewName='PurchaseInvoice';


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstPurchaseInvoiceItems=JSON.parse(res);
   

   for(let i=0;i<this.StorePurchaseInvoice.lstPurchaseInvoiceItems.length;i++)
   {
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].LineId=0;
    
   }
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstTermsChild=JSON.parse(res);
   for(let i=0;i<this.StorePurchaseInvoice.lstTermsChild.length;i++)
   {
    this.StorePurchaseInvoice.lstTermsChild[i].LineId=0;
    
   }
   }





   //

   this.APICall.OpenPageFromRefernce('Purchase Invoice','./Purchase/CreatePurchaseInvoice','Purchase')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseInvoice.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
   this.router.navigate(['Purchase/CreatePurchaseInvoice']);
  }

   
  //  ViewPurchaseInvoice(xml) {
 
  //    this.StorePurchaseInvoice=new StorePurchaseInvoice;
  //    this.StorePurchaseInvoice.ReferenceType='PurchaseQuotation';
  //    this.StorePurchaseInvoice.ReferenceNo=xml.TransactionNo;
    
  //     this.APICall.OpenPageFromRefernce('Purchase Invoice','./Purchase/PurchaseInvoice','Purchase')
 
  //     var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //   this.StorePurchaseInvoice.TabId=ActivatedRoute;
  //   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
 
  //   this.router.navigate(['Purchase/PurchaseInvoice']);
  //  }
 




 


  
   
  XmlEdit="";
  StorePurchaseQuotation: PurchaseQuotation;


  StorePurchaseOrder: StorePurchaseOrder;
  CreatePurchaseOrder(xml) {
  
    debugger;



this.StorePurchaseOrder=new StorePurchaseOrder;


this.StorePurchaseOrder.Contactno= xml.Contactno;

this.StorePurchaseOrder.Email=xml.Email;
this.StorePurchaseOrder.RequiredDate=xml.RequiredDate;
this.StorePurchaseOrder.Billto=xml.Billto;
this.StorePurchaseOrder.Shipto=xml.Shipto;


this.StorePurchaseOrder.ReferenceNo=xml.TransactionNo;
this.StorePurchaseOrder.ReferenceType='PurchaseQuotation';


this.StorePurchaseOrder.ShiptoAddress=xml.ShiptoAddress;
this.StorePurchaseOrder.Terms=xml.Terms;
this.StorePurchaseOrder.TermsandConditions=xml.TermsandConditions;
this.StorePurchaseOrder.BillToStateCode=xml.BillToStateCode;
this.StorePurchaseOrder.BillToStateName=xml.BillToStateName;
this.StorePurchaseOrder.TaxType=xml.TaxType;
this.StorePurchaseOrder.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseOrder.TransactionTime=xml.TransactionTime;
this.StorePurchaseOrder.Vendorreference=xml.Vendorreference;
this.StorePurchaseOrder.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseOrder.vdate=xml.date;
this.StorePurchaseOrder.Incoterms=xml.Incoterms;
this.StorePurchaseOrder.PurchaseRepresentative=xml.PurchaseRepresentative;
this.StorePurchaseOrder.PurchaseType=xml.PurchaseType;
this.StorePurchaseOrder.StartDate=xml.StartDate;
this.StorePurchaseOrder.TransactionDate=xml.TransactionDate;
this.StorePurchaseOrder.TransactionId=0;
this.StorePurchaseOrder.TransactionNo='';
this.StorePurchaseOrder.PartyId=xml.PartyId;
this.StorePurchaseOrder.PartyName=xml.PartyName;
this.StorePurchaseOrder.PartyGSTNo=xml.PartyGSTNo;

this.StorePurchaseOrder.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseOrder.ViewName='PurchaseOrder';


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
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







   this.APICall.OpenPageFromRefernce('PurchaseOrder','./Purchase/CreatePurchaseOrder','Purchase')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseOrder.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));
   this.router.navigate(['Purchase/CreatePurchaseOrder']);
  }



  CreatePurchaseQuotation(xml) {
  
    debugger;



this.StorePurchaseQuotation=new PurchaseQuotation;


this.StorePurchaseQuotation.SequenceNumberId=xml.SequenceNumberId;
this.StorePurchaseQuotation.Contactno= xml.Contactno;

this.StorePurchaseQuotation.Email=xml.Email;
this.StorePurchaseQuotation.RequiredDate=xml.RequiredDate;
this.StorePurchaseQuotation.Billto=xml.Billto;

this.StorePurchaseQuotation.BillToStateCode=xml.BillToStateCode;
this.StorePurchaseQuotation.BillToStateName=xml.BillToStateName;
this.StorePurchaseQuotation.TaxType=xml.TaxType;

this.StorePurchaseQuotation.TransactionTime=xml.TransactionTime;
this.StorePurchaseQuotation.ExchangeRate=xml.ExchangeRate;
this.StorePurchaseQuotation.CurrencyId=xml.CurrencyId;
this.StorePurchaseQuotation.TransactionDate=xml.TransactionDate;
this.StorePurchaseQuotation.TransactionId=xml.TransactionId;
this.StorePurchaseQuotation.TransactionNo=xml.TransactionNo;
this.StorePurchaseQuotation.PartyId=xml.PartyId;
this.StorePurchaseQuotation.PartyName=xml.PartyName;
this.StorePurchaseQuotation.PartyGSTNo=xml.PartyGSTNo;
this.StorePurchaseQuotation.Vendorreference=xml.Vendorreference;
this.StorePurchaseQuotation.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseQuotation.vdate=xml.date;
this.StorePurchaseQuotation.Incoterms=xml.Incoterms;
this.StorePurchaseQuotation.PurchaseRepresentative=xml.PurchaseRepresentative;
this.StorePurchaseQuotation.PurchaseType=xml.PurchaseType;
this.StorePurchaseQuotation.StartDate=xml.StartDate;
this.StorePurchaseQuotation.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseQuotation.ViewName=xml.ViewName;


if(xml.lstQuotationItems!=null && typeof(xml.lstQuotationItems)!=undefined)
   {
   var res=((xml.lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseQuotation.lstQuotationItems=JSON.parse(res);
   
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseQuotation.lstTermsChild=JSON.parse(res);
   
   }

  
this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseQuotation');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePurchaseQuotation.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseQuotation));
    this.router.navigate(['Purchase/CreatePurchaseQuotation']);
  }

   
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
  this.StorePurchaseQuotation=new PurchaseQuotation;
  this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseQuotation');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseQuotation));
  this.StorePurchaseQuotation.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseQuotation));



  this.router.navigate(['Purchase/CreatePurchaseQuotation']);
}

   get f() { 
     return this.PurchaseQuotation
    .controls;
   }
  DeviceType="";
  ngOnInit() {
    this.ViewandSearchPurchaseQuotation();
this.DeviceType= localStorage.getItem('DeviceType')
 
  }

ngAfterViewInit(){

   
     
    
  }


  lstPurchaseQuotation:any=[];
  lstDbResult:any  = [];
  ViewandSearchPurchaseQuotation()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewPurchaseQuotation",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstPurchaseQuotation=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstPurchaseQuotation=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchPurchaseQuotation();
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
  
}

