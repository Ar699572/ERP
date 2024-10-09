import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';

import { StorePurchaseOrder } from 'src/app/Store/StorePurchaseOrder';

import { StoreGRN } from 'src/app/Store/StoreGRN';

import { StorePurchaseInvoice } from 'src/app/Store/StorePurchaseInvoice';

import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { MRN } from 'src/app/store/StoreMRN';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
 
  PurchaseOrder:FormGroup;
  errormsg="";
  showError=false;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.PurchaseOrder=formBuilder.group(
  
      {
    
        TransactionNo:new FormControl(''),
        CustomerName:new FormControl(''),
        
        Contactno:new FormControl(''),


    SearchString:new FormControl('')
      });
      this.ViewandSearchPurchaseOrder();
   }



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
this.StorePurchaseInvoice.InvoiceType=xml.PurchaseType;

this.StorePurchaseInvoice.ReferenceNo=xml.TransactionNo;
this.StorePurchaseInvoice.ReferenceType='PurchaseOrder';


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
this.StorePurchaseInvoice.vdate=xml.TransactionDate;

//this.StorePurchaseInvoice.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseInvoice.ViewName='PurchaseInvoice';


if(xml.lstOrderItems!=null && typeof(xml.lstOrderItems)!=undefined)
   {
   var res=((xml.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstPurchaseInvoiceItems=JSON.parse(res);
   

   for(let i=0;i<this.StorePurchaseInvoice.lstPurchaseInvoiceItems.length;i++)
   {
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].LineId=0;
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].LocationId=0;
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].Locationname='';
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].BinId=0;
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].BinName='';
    
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

   this.APICall.OpenPageFromRefernce('PurchaseInvoice','./Purchase/CreatePurchaseInvoice','Purchase')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseInvoice.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
   this.router.navigate(['Purchase/CreatePurchaseInvoice']);
  }

   StorePurchaseInvoice: StorePurchaseInvoice;
   ViewPurchaseInvoice(xml) {
 
     this.StorePurchaseInvoice=new StorePurchaseInvoice;
     this.StorePurchaseInvoice.ReferenceType='PurchaseOrder';
     this.StorePurchaseInvoice.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Purchase/PurchaseOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'PurchaseOrder'} });
      this.APICall.OpenPageFromRefernce('Purchase Invoice','./Purchase/PurchaseInvoice','Purchase')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StorePurchaseInvoice.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
 
    this.router.navigate(['Purchase/PurchaseInvoice']);
   }
 
   StoreMRN:MRN
   CreateGRN(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);
this.StoreMRN=new MRN;
    
    
this.StoreMRN.SequenceNumberId=xml.SequenceNumberId;
this.StoreMRN.Contactno= xml.Contactno;

this.StoreMRN.Email=xml.Email;
this.StoreMRN.RequiredDate=xml.RequiredDate;
this.StoreMRN.Billto=xml.Billto;
//this.StoreMRN.Shipto=xml.Shipto;

//this.StoreMRN.ShiptoAddress=xml.ShiptoAddress;
//this.StoreMRN.Terms=xml.Terms;
//this.StoreMRN.TermsandConditions=xml.TermsandConditions;
this.StoreMRN.BillToStateCode=xml.BillToStateCode;
this.StoreMRN.BillToStateName=xml.BillToStateName;
this.StoreMRN.TaxType=xml.TaxType;
//this.StoreMRN.PaymentTerms=xml.PaymentTerms;
this.StoreMRN.TransactionTime=xml.TransactionTime;
this.StoreMRN.ExchangeRate=xml.ExchangeRate;
this.StoreMRN.CurrencyId=xml.CurrencyId;
this.StoreMRN.TransactionDate=xml.TransactionDate;
this.StoreMRN.TransactionId=0;
this.StoreMRN.TransactionNo=xml.TransactionNo;
this.StoreMRN.PartyId=xml.PartyId;
this.StoreMRN.PartyName=xml.PartyName;
this.StoreMRN.PartyGSTNo=xml.PartyGSTNo;
this.StoreMRN.Vendorreference=xml.Vendorreference;
this.StoreMRN.PaymentTerms=xml.PaymentTerms;
this.StoreMRN.vdate=xml.date;
this.StoreMRN.Incoterms=xml.Incoterms;
this.StoreMRN.PurchaseRepresentative=xml.PurchaseRepresentative;
this.StoreMRN.PurchaseType=xml.PurchaseType;
this.StoreMRN.StartDate=xml.StartDate;
this.StoreMRN.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreMRN.ViewName=xml.ViewName;


if(xml.lstOrderItems!=null && typeof(xml.lstOrderItems)!=undefined)
   {

   var res=((xml.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   var tempres=JSON.parse(res);
    
    for(var i=0;i<tempres.length;i++)
    {
    var res1=
        ({
         SNO:tempres.length+1
         ,LineId:'0'
        ,Description:tempres[i].Description
         
         ,Partno:tempres[i].Partno
         ,ItemId:tempres[i].ItemId
         ,MakeId:tempres[i].MakeId
         ,UOMId:(+tempres[i].UOMId)
         ,Make:tempres[i].Make
         ,UOM:tempres[i].UOM
         
         ,Rate:tempres[i].Rate
         ,Qty:(+tempres[i].Qty)
         ,CurrencyRate:0
         
         
         ,Gross:tempres[i].Gross
         ,DiscountPercentage:tempres[i].DiscountPercentage
         ,DiscountAmount:tempres[i].DiscountAmount
         
         ,recievedQty:0
         
         ,CGST:tempres[i].CGST
         ,CGSTAmount:tempres[i].CGSTAmount
         ,SGST:tempres[i].SGST
         
         
         
         
         ,SGSTAmount:tempres[i].SGSTAmount
         ,IGST:tempres[i].IGST
         ,IGSTAmount:tempres[i].IGSTAmount
         
         
         
         ,TotalTax:tempres[i].TotalTax
         ,NetTotal:tempres[i].NetTotal
         
         ,TaxType:tempres[i].TaxType
         
         
         
         ,HSN:tempres[i].HSN
 
 
      
        ,Show:'true'
        });
 
        this.StoreMRN.lstMRNItems.push(res1);
       }
  // this.StoreMRN.lstMRNItems=JSON.parse(res);
   

   for(let i=0;i<this.StoreMRN.lstMRNItems.length;i++)
   {
    this.StoreMRN.lstMRNItems[i].LineId=0;
    
   }
   
   }




   this.APICall.OpenPageFromRefernce('MRN','./Purchase/CreateMRN','Purchase')
this.APICall.UpdatedSelectedPath('./Purchase/CreateMRN');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreMRN.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreMRN));
    this.router.navigate(['Purchase/CreateMRN']);
  }

   StoreGRN: StoreGRN;
   ViewGRN(xml) {
 
     this.StoreGRN=new StoreGRN;
     this.StoreGRN.ReferenceType='PurchaseOrder';
     this.StoreGRN.ReferenceNo=xml.TransactionNo;
    
   // this.router.navigateByUrl('/Purchase/PurchaseOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'PurchaseOrder'} });
      this.APICall.OpenPageFromRefernce('GRN','./Purchase/GRN','Purchase')
 
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreGRN.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreGRN));
 
    this.router.navigate(['Purchase/GRN']);
   }
 



  
  
   
  XmlEdit="";
  StorePurchaseOrder: StorePurchaseOrder;
  ViewPurchaseOrder(xml) {

    this.StorePurchaseOrder=new StorePurchaseOrder;
    this.StorePurchaseOrder.ReferenceType='PurchaseOrder';
    this.StorePurchaseOrder.ReferenceNo=xml.TransactionNo;
   
  // this.router.navigateByUrl('/Purchase/PurchaseOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'PurchaseOrder'} });
     this.APICall.OpenPageFromRefernce('Purchase Order','./Purchase/PurchaseOrder','Purchase')

     var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseOrder.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));

   this.router.navigate(['Purchase/PurchaseOrder']);
  }





  CreatePurchaseOrder(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StorePurchaseOrder=new StorePurchaseOrder;


this.StorePurchaseOrder.SequenceNumberId=xml.SequenceNumberId;
this.StorePurchaseOrder.Contactno= xml.Contactno;

this.StorePurchaseOrder.Email=xml.Email;
this.StorePurchaseOrder.RequiredDate=xml.RequiredDate;
this.StorePurchaseOrder.Billto=xml.Billto;
this.StorePurchaseOrder.BillToCountryName=xml.country;
//this.StorePurchaseOrder.Shipto=xml.Shipto;

//this.StorePurchaseOrder.ShiptoAddress=xml.ShiptoAddress;
//this.StorePurchaseOrder.Terms=xml.Terms;
//this.StorePurchaseOrder.TermsandConditions=xml.TermsandConditions;
this.StorePurchaseOrder.BillToStateCode=xml.BillToStateCode;
this.StorePurchaseOrder.BillToStateName=xml.BillToStateName;
this.StorePurchaseOrder.TaxType=xml.TaxType;
//this.StorePurchaseOrder.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseOrder.TransactionTime=xml.TransactionTime;
this.StorePurchaseOrder.ExchangeRate=xml.ExchangeRate;
this.StorePurchaseOrder.CurrencyId=xml.CurrencyId;
this.StorePurchaseOrder.TransactionDate=xml.TransactionDate;
this.StorePurchaseOrder.TransactionId=xml.TransactionId;
this.StorePurchaseOrder.TransactionNo=xml.TransactionNo;
this.StorePurchaseOrder.PartyId=xml.PartyId;
this.StorePurchaseOrder.PartyName=xml.PartyName;
this.StorePurchaseOrder.PartyGSTNo=xml.PartyGSTNo;
this.StorePurchaseOrder.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseOrder.TransactionTime=xml.TransactionTime;
this.StorePurchaseOrder.Vendorreference=xml.Vendorreference;
this.StorePurchaseOrder.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseOrder.vdate=xml.date;
this.StorePurchaseOrder.Incoterms=xml.Incoterms;
this.StorePurchaseOrder.PurchaseRepresentative=xml.PurchaseRepresentative;
this.StorePurchaseOrder.PurchaseType=xml.PurchaseType;
this.StorePurchaseOrder.StartDate=xml.StartDate;
this.StorePurchaseOrder.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseOrder.ViewName=xml.ViewName;


if(xml.lstOrderItems!=null && typeof(xml.lstOrderItems)!=undefined)
   {
   var res=((xml.lstOrderItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseOrder.lstOrderItems=JSON.parse(res);
   
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseOrder.lstTermsChild=JSON.parse(res);
   
   }


   
  
this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseOrder');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePurchaseOrder.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));
    this.router.navigate(['Purchase/CreatePurchaseOrder']);
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
  this.StorePurchaseOrder=new StorePurchaseOrder;
  this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseOrder');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));
  this.StorePurchaseOrder.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseOrder));



  this.router.navigate(['Purchase/CreatePurchaseOrder']);
}

   get f() { 
     return this.PurchaseOrder
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
 
  }

ngAfterViewInit(){

   
     
    
  }


  lstPurchaseOrder:any=[];
  lstDbResult:any  = [];
  ViewandSearchPurchaseOrder()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewPurchaseOrder",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstPurchaseOrder=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstPurchaseOrder=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchPurchaseOrder();
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

