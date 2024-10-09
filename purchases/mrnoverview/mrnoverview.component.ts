import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { APICallingService } from 'src/app/apicalling.service';
import { MRN } from 'src/app/store/StoreMRN';
import { StorePurchaseInvoice } from 'src/app/Store/StorePurchaseInvoice';

@Component({
  selector: 'app-mrnoverview',
  templateUrl: './mrnoverview.component.html',
  styleUrls: ['./mrnoverview.component.css']
})
export class MRNOverviewComponent implements OnInit {
  MRNOverview:FormGroup;
  StoreMRN: MRN;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.MRNOverview=formBuilder.group(
  
      {
    
        TransactionNo:new FormControl(''),
        CustomerName:new FormControl(''),
        
        Contactno:new FormControl(''),


    SearchString:new FormControl('')
      });
      this.ViewandSearchMRN();
   }

   ngOnInit() {
    this.DeviceType= localStorage.getItem('DeviceType')
     
      }
    
  OnAdd(){
    this.router.navigate(['Purchase/CreateMRN']);

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

lstMRN:any=[];
lstDbResult:any  = [];
ViewandSearchMRN()
{

 
  if(AppSettings.ShowLoaderOnView)
    {
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
 
 $("#loaderParent").show();
    }
    var sstring=(this.GetSearchString());
   debugger;
    this.APICall.DBCalling("ViewMRN",sstring,this.FilterType,"","").subscribe(
      (res:Response) => {
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        
        this.lstMRN=[];
        if(this.lstDbResult.Table.length>0)
        {
          this.lstMRN=this.lstDbResult.Table;
    

          
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
get f() { 
  return this.MRNOverview
 .controls;
}
DeviceType="";
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
  lstSerchableFields:any  = [];
  getControlValue(Control,Type):string
  {
  
   var Value=(Type=="string"?"":"0");
    if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
    {
      Value=Control.value;
    }
  
    return Value;
  }
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

tempID:number=0;
templineid:number=0;

      CreateMRN(xml) {
  
        debugger;
    //this.APICall.SetViewData(xml);
    
    this.tempID=xml.TransactionId;
    this.templineid=xml.LineId;
    this.viewMrNdata();
    

      }

      lstMRN1:any=[];
      viewMrNdata()
{

 debugger;
  if(AppSettings.ShowLoaderOnView)
    {
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
 
 $("#loaderParent").show();
    }

   debugger;
    this.APICall.DBCalling("ViewMRNdata",this.tempID,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
      (res:Response) => {
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        
        this.lstMRN1=[];
        if(this.lstDbResult.Table.length>0)
        {
          this.lstMRN1=this.lstDbResult.Table;
          this.editdata();
          if(this.edittype=="purchase")
          {
            this.purchaseedit();
          }
        }

        $("#loaderParent").hide();
      });
}

temparray:any=[];
editdata()
{
  debugger;
for(var i=0;i<this.lstMRN1.length;i++)
{
  this.StoreMRN=new MRN;
    
    
  this.StoreMRN.SequenceNumberId=this.lstMRN1[i].SequenceNumberId;
  this.StoreMRN.Contactno= this.lstMRN1[i].Contactno;
  
  this.StoreMRN.Email=this.lstMRN1[i].Email;
  this.StoreMRN.RequiredDate=this.lstMRN1[i].RequiredDate;
  this.StoreMRN.Billto=this.lstMRN1[i].Billto;
  //this.StoreMRN.Shipto=xml.Shipto;
  
  //this.StoreMRN.ShiptoAddress=xml.ShiptoAddress;
  //this.StoreMRN.Terms=xml.Terms;
  //this.StoreMRN.TermsandConditions=xml.TermsandConditions;
  this.StoreMRN.BillToStateCode=this.lstMRN1[i].BillToStateCode;
  this.StoreMRN.BillToStateName=this.lstMRN1[i].BillToStateName;
  this.StoreMRN.TaxType=this.lstMRN1[i].TaxType;
  //this.StoreMRN.PaymentTerms=xml.PaymentTerms;
  this.StoreMRN.TransactionTime=this.lstMRN1[i].TransactionTime;
  this.StoreMRN.ExchangeRate=this.lstMRN1[i].ExchangeRate;
  this.StoreMRN.CurrencyId=this.lstMRN1[i].CurrencyId;
  this.StoreMRN.TransactionDate=this.lstMRN1[i].TransactionDate;
  this.StoreMRN.TransactionId=this.lstMRN1[i].TransactionId;
  this.StoreMRN.TransactionNo=this.lstMRN1[i].TransactionNo;
  this.StoreMRN.PartyId=this.lstMRN1[i].PartyId;
  this.StoreMRN.PartyName=this.lstMRN1[i].PartyName;
  this.StoreMRN.PartyGSTNo=this.lstMRN1[i].PartyGSTNo;
  this.StoreMRN.Vendorreference=this.lstMRN1[i].Vendorreference;
  this.StoreMRN.PaymentTerms=this.lstMRN1[i].PaymentTerms;
  this.StoreMRN.vdate=this.lstMRN1[i].date;
  this.StoreMRN.Incoterms=this.lstMRN1[i].Incoterms;
  this.StoreMRN.PurchaseRepresentative=this.lstMRN1[i].PurchaseRepresentative;
  this.StoreMRN.PurchaseType=this.lstMRN1[i].PurchaseType;
  this.StoreMRN.StartDate=this.lstMRN1[i].StartDate;
  this.StoreMRN.ModifiedDate=(this.lstMRN1[i].ModifiedDate==null?'':this.lstMRN1[i].ModifiedDate.toString());
  this.StoreMRN.ViewName=this.lstMRN1[i].ViewName;
  
  
  if(this.lstMRN1[i].lstMRNItems!=null && typeof(this.lstMRN1[i].lstMRNItems)!=undefined)
     {
     var res=((this.lstMRN1[i].lstMRNItems).replace(/\n/g, "")).replace(/'/g,"\"");
     this.temparray=JSON.parse(res);
     debugger;
     for(var i=0;i<this.temparray.length;i++)
     {
       if((+this.temparray[i].LineId)==this.templineid)
       {
        this.StoreMRN.lstMRNItems.push(this.temparray[i]);
        break;
       }
     }
     
     
     }
  
    
  this.APICall.UpdatedSelectedPath('./Purchase/CreateMRN');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreMRN.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreMRN));
  this.router.navigate(['Purchase/CreateMRN']);


}
}
purchaseedit()
{
  this.StorePurchaseInvoice=new StorePurchaseInvoice;

  for(var i=0;i<this.lstMRN1.length;i++)
  {
  //this.StorePurchaseOrder.SequenceNumberId=xml.SequenceNumberId;
  this.StorePurchaseInvoice.Contactno= this.lstMRN1[i].Contactno;
  
  this.StorePurchaseInvoice.Email=this.lstMRN1[i].Email;
  this.StorePurchaseInvoice.RequiredDate=this.lstMRN1[i].RequiredDate;
  this.StorePurchaseInvoice.Billto=this.lstMRN1[i].Billto;
  this.StorePurchaseInvoice.Shipto=this.lstMRN1[i].Shipto;
  
  
  this.StorePurchaseInvoice.ReferenceNo=this.lstMRN1[i].TransactionNo;
  this.StorePurchaseInvoice.ReferenceType='MRN';
  
  
  this.StorePurchaseInvoice.ShiptoAddress=this.lstMRN1[i].ShiptoAddress;
  this.StorePurchaseInvoice.Terms=this.lstMRN1[i].Terms;
  this.StorePurchaseInvoice.TermsandConditions=this.lstMRN1[i].TermsandConditions;
  this.StorePurchaseInvoice.BillToStateCode=this.lstMRN1[i].BillToStateCode;
  this.StorePurchaseInvoice.BillToStateName=this.lstMRN1[i].BillToStateName;
  this.StorePurchaseInvoice.TaxType=this.lstMRN1[i].TaxType;
  this.StorePurchaseInvoice.PaymentTerms=this.lstMRN1[i].PaymentTerms;
  this.StorePurchaseInvoice.TransactionTime=this.lstMRN1[i].TransactionTime;
  this.StorePurchaseInvoice.TransactionTime=this.lstMRN1[i].TransactionTime;
  this.StorePurchaseInvoice.TransactionDate=this.lstMRN1[i].TransactionDate;
  this.StorePurchaseInvoice.TransactionId=0;
  this.StorePurchaseInvoice.TransactionNo='';
  this.StorePurchaseInvoice.PartyId=this.lstMRN1[i].PartyId;
  this.StorePurchaseInvoice.PartyName=this.lstMRN1[i].PartyName;
  this.StorePurchaseInvoice.PartyGSTNo=this.lstMRN1[i].PartyGSTNo;
  
  this.StorePurchaseInvoice.ModifiedDate=(this.lstMRN1[i].ModifiedDate==null?'':this.lstMRN1[i].ModifiedDate.toString());
  this.StorePurchaseInvoice.ViewName='PurchaseInvoice';
  
  
  if(this.lstMRN1[i].lstMRNItems!=null && typeof(this.lstMRN1[i].lstMRNItems)!=undefined)
   {
   var res=((this.lstMRN1[i].lstMRNItems).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePurchaseInvoice.lstPurchaseInvoiceItems=JSON.parse(res);
   
  
   for(let i=0;i<this.StorePurchaseInvoice.lstPurchaseInvoiceItems.length;i++)
   {
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems[i].LineId=0;
    
   }
   }
  
   this.APICall.OpenPageFromRefernce('PurchaseInvoice','./Purchase/CreatePurchaseInvoice','Purchase')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseInvoice.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseInvoice));
   this.router.navigate(['Purchase/CreatePurchaseInvoice']);

  }
}
edittype:string="";
StorePurchaseInvoice:StorePurchaseInvoice

CreatePurchaseInvoice(xml) {
  
  debugger;
//this.APICall.SetViewData(xml);
this.tempID=xml.TransactionId;
this.templineid=xml.LineId;
this.edittype="purchase";
this.viewMrNdata();

}
}
