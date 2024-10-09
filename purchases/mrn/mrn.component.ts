import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { APICallingService } from 'src/app/apicalling.service';
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import { MRN } from 'src/app/store/StoreMRN';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Vendor } from 'src/app/store/StoreVendor';
@Component({
  selector: 'app-mrn',
  templateUrl: './mrn.component.html',
  styleUrls: ['./mrn.component.css']
})
export class MRNComponent implements OnInit {
  CreateMrn:FormGroup;
  TransactionType="Purchase";
  DisplayVendorId=0;
  Invoiceno:string="";
  DispalyVendorName="";
  DisplaySequenceNumberId=0;
  StoreMRN: MRN;
  DispalyFormName='GRN'
  constructor(private DbCallings:CommonDbCallings,private router:Router,private formBuilder: FormBuilder,public APICall:APICallingService,private store: Store<any>) {
    this.CreateMrn=formBuilder.group(


      {
        SequenceNumberId:new FormControl(0),
        PartyId:new FormControl(0,[Validators.required,Validators.min(1)]),
        PartyName:new FormControl(''),
        SearchString:new FormControl(''),
        Vendorreference:new FormControl(''),
    vdate:new FormControl(''),
    Contactno:new FormControl(''),
    RequiredDate:new FormControl('',[Validators.required]),
    Incoterms:new FormControl(''),
    PaymentTerms:new FormControl(''),
    TransactionDate:new FormControl(''),
    recievedQty:new FormControl(0),
    ExchangeRate:new FormControl(1), 
    Email:new FormControl(0),
    Billto:new FormControl(''),
    Shipto:new FormControl(0), 
    ShiptoAddress:new FormControl(''), 
    CurrencyId:new FormControl(this.APICall.GetCurrencyId()),
    Terms:new FormControl(''),
    TermsandConditions:new FormControl(''),
    
    TransactionId:new FormControl(0),
    TransactionNo:new FormControl(''),
    PurchaseRepresentative:new FormControl(''),
        PurchaseType:new FormControl(''),
        LineChanges:new FormControl(0),
        searchPartNo:new FormControl(''),
        searchDescription:new FormControl(''),
        searchMake:new FormControl(''),
        searchHSN:new FormControl('')
    
      }
     
    );
   }
   DeviceType="";

   PartySaved(e) {

  }
  PrintCloseClick()
  {

  }
  RemoveItemClick()
  {

  }
  AddTerms()
  {

  }
  TotalCharges:string="";
  PartyType:string="";
   ngOnInit() {
    debugger;
      this.DeviceType= localStorage.getItem('DeviceType')
    
      this.StoreMRN=new MRN;
    
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    
        
      var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    
    
      //var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "PurchaseQuotation"; });
      if (result.length > 0) {
        debugger;
        this.StoreMRN=( result[0] );
      this.ModifiedDate =this.StoreMRN.ModifiedDate.toString();
      this.BillToStateCode=this.StoreMRN.BillToStateCode;
      this.BillToStateName=this.StoreMRN.BillToStateName;
      this.DispalyVendorName=this.StoreMRN.PartyName;
      if(this.StoreMRN.TransactionId>0)
      {
        this.Invoiceno=this.StoreMRN.TransactionNo;
      }
     
      
      this.DisplayVendorId=this.StoreMRN.PartyId;
      this.SelectedState=this.StoreMRN.SelectedState;
      this.PartyGSTNo=this.StoreMRN.PartyGSTNo;
      this.lstMRNItems=this.StoreMRN.lstMRNItems==null?[]:this.StoreMRN.lstMRNItems;
    this.TaxType=this.StoreMRN.TaxType;
      var i=0;
      var that=this;
      var  lstMRNItemsdata = $.map(this.lstMRNItems, function (obj) {
      i=i+1;
      obj.SNO = i; 
      return obj;
      });
      this.lstMRNItems=lstMRNItemsdata;
    for(var i=0;i<this.lstMRNItems.length;i++)
    {
      if((+this.lstMRNItems[i].LineId)>0)
      {
      if((+this.lstMRNItems[i].recievedQty)>0)
      {
        this.f.recievedQty.setValue((+this.lstMRNItems[i].recievedQty));
      }
    }
   
    }

    
      if(this.StoreMRN.RequiredDate!='')
      {
      var RequiredDate= formatDate(new Date(this.StoreMRN.RequiredDate), 'MM/dd/yyyy', 'en');
      var TransactionDate= formatDate(new Date(this.StoreMRN.StartDate), 'MM/dd/yyyy', 'en');
     // var TransactionTime=  formatDate(new Date(this.StoreMRN.vdate), 'HH:mm', 'en');
      }else{
        var RequiredDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
       // var TransactionTime=  formatDate(new Date(), 'HH:mm', 'en');
      }  
      debugger;
    
      
      $("#RequiredDate").val(RequiredDate)
    $("#TransactionDate").val(TransactionDate)
    //$("#TransactionTime").val(TransactionTime)
    this.TransactionDate=TransactionDate;
    debugger;
      this.CreateMrn.patchValue(this.StoreMRN);
    
      this.f.vdate.setValue(formatDate(this.StoreMRN.vdate, 'yyyy-MM-dd', 'en'));
      
      //this.ShippingDetailsPartyId(this.StoreMRN.PartyId,false);
      this.GetCurrency();
      }
      this.CalculateTotals();
    
    
      var that=this;
      this.CreateMrn.valueChanges.subscribe(value => {
       that.StoreMRN.SequenceNumberId=value.SequenceNumberId;
       that.StoreMRN.Contactno=value.Contactno;
       that.StoreMRN.Email=value.Email;
    that.StoreMRN.RequiredDate=value.RequiredDate;
    that.StoreMRN.Billto=value.Billto;
    that.StoreMRN.SelectedState=that.SelectedState;
    that.StoreMRN.CurrencyId=value.CurrencyId;
    that.StoreMRN.ExchangeRate=value.ExchangeRate;
    //that.StoreMRN.Shipto=value.Shipto;
    
    //   that.StoreMRN.ShiptoAddress=value.ShiptoAddress;
     //  that.StoreMRN.Terms=value.Terms;
     //  that.StoreMRN.TermsandConditions=value.TermsandConditions;
       
    
       that.StoreMRN.BillToStateCode=that.BillToStateCode;
       that.StoreMRN.BillToStateName= that.BillToStateName;
    
       that.StoreMRN.TaxType=that.TaxType;
       
      // that.StoreMRN.PaymentTerms=value.PaymentTerms;
       //that.StoreMRN.TransactionTime=value.TransactionTime;
       that.StoreMRN.TransactionDate=value.TransactionDate;
       that.StoreMRN.TransactionId=value.TransactionId;
    
       that.StoreMRN.TransactionNo=value.TransactionNo;
       that.StoreMRN.PartyName=value.PartyName;
       that.StoreMRN.PartyGSTNo=this.PartyGSTNo;
       
       that.StoreMRN.PartyId=value.PartyId;
    
       that.StoreMRN.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());
       that.StoreMRN.ViewName='MRN';
    
       that.StoreMRN.lstMRNItems= that.lstMRNItems;
       
       that.StoreMRN.lstTermsChild= that.lstTermsChild;
        that.store.dispatch(new TabStore.AddTab(that.StoreMRN));
    });
    
    }

    lstCurrencies:any=[];
    GetCurrency()
    {
    
     
      
        $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
     
     $("#loaderParent").show();
      
       
       debugger;
        // this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","").subscribe(
        //   (res:Response) => {
          this.DbCallings.GetCurrencies().subscribe(
            (res) => {
            debugger;
            this.lstDbResult=JSON.parse(res['Message']);
          
            
            this.lstCurrencies=[];
            if(this.lstDbResult.Table.length>0)
            {
              this.lstCurrencies=this.lstDbResult.Table;
        
    
              
             
            }
    
            $("#loaderParent").hide();
          });
    }
  Search(){
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
    this.APICall.UpdatedSelectedPath('./Purchase/MRN');
      this.router.navigate(['Purchase/MRN']);

  }
  get f()
  { 
   return this.CreateMrn.controls;
  
 } 
 getControlValue(Control,Type):string
 {
 
  var Value=(Type=="string"?"":"0");
   if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
   {
     Value=Control.value;
   }
 
   return Value;
 }
 CurrentTime: any;
 TaxType="Intra State";
 PartyGSTNo="";
 BillToStateName='';
 BillToStateCode='';
 SelectedState=0;
 SelectedDate=($("#TransactionDate").val());
 CompanyStateId=(+this.APICall.GetCompanyStateID());
 selectedVendor:Vendor
  VendorValueChange(event)
  {
    this.BillToStateName='';
    this.BillToStateCode='';
    debugger;
 this.selectedVendor=Object.assign({},event); 
    this.DisplayVendorId=event.VendorId;
this.SelectedState=event.state;
this.f.Email.setValue(event.email);
this.f.Contactno.setValue(event.Contactno);
this.f.PartyId.setValue(event.VendorId);
this.f.PartyName.setValue(event.text);
this.PartyGSTNo=event.gstno;
this.BillToStateName=event.statename;
    this.BillToStateCode=event.statecode;
var  Address=(event.address1!=""?event.address1:'');

if(Address!="" && event.address2!="")
{
  Address=Address+','+(event.address2!=""?event.address2:'');
}

if(Address!="" && event.address3!="")
{
  Address=Address+','+(event.address3!=""?event.address3:'');
}


if(Address!="" && event.cityname!="")
{
  Address=Address+','+(event.cityname!=""?event.cityname:'');
}
if(Address!="" && event.statename!="")
{
  Address=Address+','+(event.statename!=""?event.statename:'');
}
if(Address!="" && event.countryname!="")
{
  Address=Address+','+(event.countryname!=""?event.countryname:'');
}
if(Address!="" && event.pincode!="")
{
  Address=Address+','+(event.pincode!=""?event.pincode:'');
}
this.f.Billto.setValue(Address);

//this.f.ShiptoAddress.setValue(Address);
//this.ShippingDetailsPartyId(event.VendorId,true);

//billto
if(this.CompanyStateId!=this.SelectedState
  )
{
this.TaxType="Inter State";
}else{

  this.TaxType="Intra State";
}
  
this.GstTaxFromHSNAndGSTTypeForGridView();


  }
  TransactionDate=$("#TransactionDate").val();

  SelectedProductData= {
   SNO: 1
   ,LineId:'0'
  ,Description:''
   
   ,Partno:''
   ,ItemId:0
   ,MakeId:0
   ,UOMId:0
   ,Make:''
   ,UOM:''
   
   ,Rate:0
   ,Qty:1
   
   ,CurrencyRate:0
   
   ,Gross:0
   ,DiscountPercentage:0
   ,DiscountAmount:0
   
   
   
   ,CGST:0
   ,CGSTAmount	:0
   ,SGST:0
   
   
   
   ,SGSTAmount:0
   ,IGST:0
   ,IGSTAmount:0
   
   
   
   ,TotalTax:0
   ,NetTotal:0
   
   ,TaxType:0
   
   
   
   ,HSN:''



  ,Show:'true'
  }
  lstMRNItems:any=[];
  lstDbResult:any=[];
  GstTaxFromHSNAndGSTTypeForGridView()
  {
    debugger;
    if(this.lstMRNItems.length>0)
    {
    var xmlHsnInfo="";
    var rows="";
  
    for(var i=0;i<this.lstMRNItems.length;i++)
    {
  
     rows=rows+'<Table1><HSN>'+this.lstMRNItems[i].HSN+ '</HSN></Table1>'
    
    
    }
    xmlHsnInfo='<NewDataSet>'+rows+'</NewDataSet>';
  
  
  
    
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
    $("#loaderParent").show();
    this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo,this.TaxType,this.TransactionDate).subscribe(
      (res) => {
  
    
  $("#loaderParent").click();
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
        
          
       
        if(this.lstDbResult.Table.length>0)
        {
         var resultInfo=this.lstDbResult.Table;
    
         
         for(var i=0;i<this.lstMRNItems.length;i++)
         {
          this.lstMRNItems[i].CGST=0;
          this.lstMRNItems[i].SGST=0;
          this.lstMRNItems[i].IGST=0;
      
          this.lstMRNItems[i].CGSTAmount=0;
          this.lstMRNItems[i].SGSTAmount=0;
          this.lstMRNItems[i].IGSTAmount=0;
          var  ResultItem = resultInfo.filter(d => d.HSN === this.lstMRNItems[i].HSN);
          if(ResultItem.length>0)
          {
           
            debugger;
            for (let j=0;j<  ResultItem.length;j++)
            {
            if(ResultItem[j].TaxType=="CGST")
            {
              this.lstMRNItems[i].CGST=(ResultItem[j].TaxPercentage2);
              
            
            }
            
            if(ResultItem[j].TaxType=="SGST")
            {
              this.lstMRNItems[i].SGST=(ResultItem[j].TaxPercentage2);
              
            
            }
            
            if(ResultItem[j].TaxType=="IGST")
            {
              this.lstMRNItems[i].IGST=(ResultItem[j].TaxPercentage2);
            
            }
            
            
            }
          }
  
         }
         this.CalculateTotals();
        }
      
    
  else{
   // (window as any). swal("Cancelled", "Failed:)", "error");
  //this.FormErrormsg="Failed.";
  
  }
  
  
  
  
  }
    );
  }
  }
  lstTermsChild:any=[];

  TotalGross=0;
  TotalDiscount=0;
  TotalCGST=0;
  TotalSGST=0;
  TotalIGST=0;
  TotalTax=0;
 Total=0;
 AfterDiscount=0;
CalculateTotals()
{
  debugger;
  this.TotalGross=0;
  this.TotalDiscount=0;
  this.TotalTax=0;
  this.Total=0;
  this.TotalCGST=0;
  this.TotalSGST=0;
  this.TotalIGST=0;
  this.AfterDiscount=0;
for(let i=0;i<this.lstMRNItems.length;i++)

{
 
 // this.lstMRNItems[i]
 this.lstMRNItems[i].Gross=((+this.lstMRNItems[i].Qty)*((+this.lstMRNItems[i].Rate)*(+this.f.ExchangeRate.value)));

 this.lstMRNItems[i].CurrencyRate=(this.lstMRNItems[i].Rate*(+this.f.ExchangeRate.value))
 this.lstMRNItems[i].DiscountAmount=(((+this.lstMRNItems[i].Gross)*(+this.lstMRNItems[i].DiscountPercentage))/100)*(+this.f.ExchangeRate.value)
var AfterDiscount=((+this.lstMRNItems[i].Gross)-(+ this.lstMRNItems[i].DiscountAmount));;

this.lstMRNItems[i].SGSTAmount=(((+this.lstMRNItems[i].SGST)*AfterDiscount)/100);
this.lstMRNItems[i].CGSTAmount=(((+this.lstMRNItems[i].CGST)*AfterDiscount)/100);
this.lstMRNItems[i].IGSTAmount=(((+this.lstMRNItems[i].IGST)*AfterDiscount)/100);
this.lstMRNItems[i].TotalTax=(+this.lstMRNItems[i].SGSTAmount)+(+this.lstMRNItems[i].CGSTAmount)+(+this.lstMRNItems[i].IGSTAmount);

this.TotalCGST=this.TotalCGST+(+this.lstMRNItems[i].CGSTAmount);
  this.TotalSGST=this.TotalSGST+(+this.lstMRNItems[i].SGSTAmount);
  this.TotalIGST=this.TotalIGST+(+this.lstMRNItems[i].IGSTAmount);
  this.TotalGross=this.TotalGross+(+this.lstMRNItems[i].Gross);
  this.TotalDiscount=this.TotalDiscount+(+this.lstMRNItems[i].DiscountAmount);
  this.TotalTax=this.TotalTax+(+this.lstMRNItems[i].TotalTax);
  this.lstMRNItems[i].NetTotal=((AfterDiscount+(+this.lstMRNItems[i].TotalTax))).toFixed(2);

  this.Total=this.Total+(+this.lstMRNItems[i].NetTotal);

}
this.AfterDiscount=this.TotalGross-this.TotalDiscount;
this.PaymentTermsAmountCalc();
}
PaymentTermsAmountCalc()
{
  if((+this.Total)>0)
  {
  for(let i=0;i<this.lstTermsChild.length;i++)
  {
var Amount=(this.Total*(+this.lstTermsChild[i].PayPercentage)/100);
this.lstTermsChild[i].Amount=Amount;
      }    
}
}


NumberSequenceValueChange(value)
{
  debugger;
this.f.SequenceNumberId.setValue(value);

}
errormsg="";
showError=false;
EditRecNO=0;
PartyId='0';
OnAdd()
{
debugger;
this.PartyId=this.getControlValue(this.f.PartyId,'int');
this.errormsg="";
this.EditRecNO=-1;
this.SelectedProductData= {
SNO: (this.lstMRNItems.length==0?1:(this.lstMRNItems.length+1))
,LineId:'0'
,Description:''

,Partno:''
,ItemId:0
,MakeId:0
,UOMId:0
,Make:''
,UOM:''

,Rate:0
,Qty:1

,CurrencyRate:0

,Gross:0
,DiscountPercentage:0
,DiscountAmount:0



,CGST:0
,CGSTAmount	:0
,SGST:0



,SGSTAmount:0
,IGST:0
,IGSTAmount:0



,TotalTax:0
,NetTotal:0

,TaxType:0



,HSN:''



,Show:'true'
};
 this.TransactionDate=$("#TransactionDate").val();
 debugger;
 if(this.CompanyStateId!=this.SelectedState)
{
this.TaxType="Inter State";
}else{

this.TaxType="Intra State";
}

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

AddItemAndNewClick(event)
{
  
this.AddItem('New',event.SelecedRow)
}
AddItemAndCloseClick(event)
{
  
this.AddItem('Close',event.SelecedRow)
}
EditItemClick(data)
{
  this.EditRecNO=0;
debugger;

if(this.CompanyStateId!=this.SelectedState)
{
this.TaxType="Inter State";
}else{

this.TaxType="Intra State";
}
this.errormsg="";
  this.SelectedProductData=Object.assign({}, data);

}
SNO=0;
ValidateItem(data):boolean
{
debugger;
var validate=true;
this.showError=false;

if((+data.NetTotal)>0)
{

debugger;
for(var  i=0;i<this.lstMRNItems.length;i++)
{
if( data.SNO!=this.lstMRNItems[i].SNO && this.lstMRNItems[i].Partno==data.Partno)
{
validate=false;
this.showError=true;
this.errormsg="Already exists!";
break;

}  

}
}else{

  validate=false;
  this.showError=true;
  this.errormsg="Invalid Data!";

}

return validate;
}

AddItem(type,data)
{
debugger;
if(this.ValidateItem(data))
{

//let WeekName:string= this.from


for(var  i=0;i<this.lstMRNItems.length;i++)
{
this.lstMRNItems[i].Show='true';


if(this.lstMRNItems[i].SNO==data.SNO)
{


//  this.lstMRNItems[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
this.lstMRNItems[i].Partno=data.Partno;
this.lstMRNItems[i].ItemId=data.ItemId;
this.lstMRNItems[i].MakeId=data.MakeId;
this.lstMRNItems[i].Description=data.Description;

this.lstMRNItems[i].Make=data.Make;
this.lstMRNItems[i].UOM=data.UOM;
this.lstMRNItems[i].UOMId=data.UOMId;

this.lstMRNItems[i].Rate=data.Rate;


this.lstMRNItems[i].Qty=(+data.Qty);

this.lstMRNItems[i].CurrencyRate=data.Rate*(+this.f.ExchangeRate.value);

this.lstMRNItems[i].Gross=(+data.Gross)*(+this.f.ExchangeRate.value);
this.lstMRNItems[i].DiscountPercentage=(+ data.DiscountPercentage);
this.lstMRNItems[i].DiscountAmount=(+data.DiscountAmount)*(+this.f.ExchangeRate.value);

this.lstMRNItems[i].recievedQty=0;

this.lstMRNItems[i].CGST=(+data.CGST);
this.lstMRNItems[i].CGSTAmount	=(+data.CGSTAmount)*(+this.f.ExchangeRate.value);
this.lstMRNItems[i].SGST=(+data.SGST);




this.lstMRNItems[i].SGSTAmount=(+data.SGSTAmount)*(+this.f.ExchangeRate.value);
this.lstMRNItems[i].IGST=(+data.IGST);
this.lstMRNItems[i].IGSTAmount=(+data.IGSTAmount)*(+this.f.ExchangeRate.value);



this.lstMRNItems[i].TotalTax=(+data.TotalTax)*(+this.f.ExchangeRate.value);
this.lstMRNItems[i].NetTotal=(+data.NetTotal)*(+this.f.ExchangeRate.value);

this.lstMRNItems[i].TaxType=data.TaxType;



this.lstMRNItems[i].HSN=data.HSN;



}
}
if(this.EditRecNO==-1)
{
var res=
       ({
        SNO:this.lstMRNItems.length+1
        ,LineId:'0'
       ,Description:data.Description
        
        ,Partno:data.Partno
        ,ItemId:data.ItemId
        ,MakeId:data.MakeId
        ,UOMId:data.UOMId
        ,Make:data.Make
        ,UOM:data.UOM
        
        ,Rate:data.Rate
        ,Qty:(+data.Qty)
        ,CurrencyRate:(data.Rate*(+this.f.ExchangeRate.value))
        
        
        ,Gross:(+data.Gross)*(+this.f.ExchangeRate.value)
        ,DiscountPercentage:(+ data.DiscountPercentage)
        ,DiscountAmount:(+data.DiscountAmount)*(+this.f.ExchangeRate.value)
        
        
        
        ,CGST:(+data.CGST)
        ,CGSTAmount	:(+data.CGSTAmount)*(+this.f.ExchangeRate.value)
        ,SGST:(+data.SGST)
        
        ,recievedQty:0
        
        
        ,SGSTAmount:(+data.SGSTAmount)*(+this.f.ExchangeRate.value)
        ,IGST:(+data.IGST)
        ,IGSTAmount:(+data.IGSTAmount)*(+this.f.ExchangeRate.value)
        
        
        
        ,TotalTax:(+data.TotalTax)*(+this.f.ExchangeRate.value)
        ,NetTotal:(+data.NetTotal)*(+this.f.ExchangeRate.value)
        
        ,TaxType:data.TaxType
        
        
        
        ,HSN:data.HSN


     
       ,Show:'true'
       });

if(this.lstMRNItems.length==0)
{
this.lstMRNItems=[res];

}
else{
this.lstMRNItems.push(res);

}
}
// this.EditRecNO=0;

//       // this.ClearSelectedValues();

//        if(type=='Close')
//        {
//          $("#btnCloseAddItem").trigger('click');
//        }
if(type=='Close')
{
  $("#btnCloseAddItem").trigger('click');
  this.EditRecNO=0;
}else{

 this.EditRecNO=-1;

}
       this.SNO=this.lstMRNItems.length+1;
       this.CalculateTotals();
       this.f.LineChanges.setValue(0);
}

}


submitted=false;
windowScroll(ControlName)
{
  var element = document.getElementById(ControlName); 
var rect = element.getBoundingClientRect();

window.scrollTo(rect.left, rect.top);
}

OnSave()
{
debugger;
  this.submitted=true;
  this.f.RequiredDate.setValue($("#RequiredDate").val());
  this.f.TransactionDate.setValue($("#TransactionDate").val());

//  this.f.TransactionTime.setValue($("#TransactionTime").val());
 
if(this.CreateMrn.invalid)
{
var  Cvalid=true;


if(this.f.PartyId.invalid && Cvalid)
{
  debugger;
  this.windowScroll('PartyId');
  Cvalid=false;
}

if(this.f.TransactionDate.invalid && Cvalid)
{
  debugger;
  this.windowScroll('TransactionDate');
  Cvalid=false;
}


if(this.f.RequiredDate.invalid && Cvalid)
{
  debugger;
  this.windowScroll('RequiredDate');
  Cvalid=false;
}
if(this.f.Email.invalid && Cvalid)
{
  debugger;
  this.windowScroll('Email');
  Cvalid=false;
}


// if(this.f.TransactionTime.invalid && Cvalid)
// {
//   debugger;
//   this.windowScroll('TransactionTime');
//   Cvalid=false;
// }




return;
}
else
{
this.SaveTransaction();
}
}

convertDate(str) {
  debugger;
  var date = new Date(str),
      mnth:any = ("0" + (date.getMonth()+1)).slice(-2),
      day:any  = ("0" + date.getDate()).slice(-2);
     var hours  = ("0" + date.getHours()).slice(-2);
     var  minutes = ("0" + date.getMinutes()).slice(-2);

     var resDate=[  mnth, day ,date.getFullYear()].join("-");
     debugger;
  return resDate+" "+hours+":"+ minutes;




}
ClearViewData()
{
  debugger;
  this.submitted=false;
  this.ModifiedDate="";
  this.CreateMrn.patchValue(


    {
      SequenceNumberId:0,
      Contactno:'',
      PartyName:'',
      Email:'',
      RequiredDate:'',
      Billto:'',
      Shipto:0, 
      ShiptoAddress:'', 
      Terms:'',
      TermsandConditions:'',
      PaymentTerms:'',
  //    TransactionTime:'',
      TransactionDate:'',
      TransactionId:0,
      TransactionNo:'',
  
      PartyId:0,
      
      
      SearchString:'',
      searchPartNo:'',
      searchDescription:'',
      searchMake:'',
      searchHSN:''
  
    }
  );
  this.PartyGSTNo='';
  this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
  this.f.TransactionTime.setValue(this.CurrentTime);

var rdate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
  $("#RequiredDate").val(rdate)
$("#TransactionDate").val(rdate)
//$("#TransactionTime").val(this.CurrentTime)
this.lstMRNItems=null;
             this.lstMRNItems  = [];
             this.lstTermsChild=null;
             this.lstTermsChild  = [];
             this.DisplayVendorId=0;
             this.DispalyVendorName="";
             this.DisplaySequenceNumberId=0;
             this.TotalGross=0;
             this.TotalCGST=0;
             this.TotalSGST=0;
             this.TotalIGST=0;
             this.TotalDiscount=0;
this.TotalTax=0;
this.Total=0;
debugger;
this.StoreMRN=new MRN;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreMRN.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StoreMRN));



}



keyEvent(event: KeyboardEvent) {
console.log(event);

if (event.ctrlKey || event.metaKey) {
  
 switch (String.fromCharCode(event.which).toLowerCase()) {
 case 's':
     event.preventDefault();
   this.OnSave();
  
     break;

     case 'a':
      
       event.preventDefault();
     this.ClearViewData();
     
       break;
       
 case 'd':
     event.preventDefault();
     this.OnDelete();
     break;
 case 'o':
     event.preventDefault();
    // this.Search();
     
     break;
 }
}

}

ModifiedDate="";
DbResult:any=[];
SaveTransaction()
{
 this.f.RequiredDate.setValue($("#RequiredDate").val());
 this.f.TransactionDate.setValue($("#TransactionDate").val());
//  this.f.TransactionTime.setValue($("#TransactionDate").val()+' '+$("#TransactionTime").val());
 


 if(this.ModifiedDate.toString().includes('India'))
 {
 
   var date = new  Date (this.ModifiedDate);
 
   
   this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
 }
 

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
  $("#loaderParent").show();



  var xml1='<NewDataSet><Table1>'
  
  +'<ShiptoAddress>'+this.getControlValue(this.f.ShiptoAddress,'string')+'</ShiptoAddress>'
  +'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'int')+'</SequenceNumberId>'
  +'<PartyId>'+this.getControlValue(this.f.PartyId,'int')+'</PartyId>'
  +'<Billto>'+this.getControlValue(this.f.Billto,'string')+'</Billto>'
  +'<TransactionNo>'+this.getControlValue(this.f.TransactionNo,'string')+'</TransactionNo>'

  +'<Shipto>'+this.getControlValue(this.f.Shipto,'string')+'</Shipto>'
  
  

  +'<CurrencyId>'+this.getControlValue(this.f.CurrencyId,'int')+'</CurrencyId>'
  +'<ExchangeRate>'+this.getControlValue(this.f.ExchangeRate,'int')+'</ExchangeRate>'

  //+'<TransactionTime>'+this.convertDate(this.getControlValue(this.f.TransactionTime,'string'))+'</TransactionTime>'
  +'<date1>'+ this.getControlValue(this.f.vdate,'string') +'</date1>' //this.convertDate(this.getControlValue(this.f.vdate,'string'))
  +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
  +'<Email>'+this.getControlValue(this.f.Email,'string')+'</Email>'
  

  +'<TermsandConditions>'+this.getControlValue(this.f.TermsandConditions,'string')+'</TermsandConditions>'
  +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
  +'<TotalGross>'+this.TotalGross+'</TotalGross>'
  +'<PurchaseType>'+this.getControlValue(this.f.PurchaseType,'string')+'</PurchaseType>'
  +'<Vendorreference>'+this.getControlValue(this.f.Vendorreference,'string')+'</Vendorreference>'

  
  +'<Incoterms>'+this.getControlValue(this.f.Incoterms,'string')+'</Incoterms>'
+'<PurchaseRepresentative>'+this.getControlValue(this.f.PurchaseRepresentative,'string')+'</PurchaseRepresentative>'
 
  +'<StartDate>'+this.getControlValue(this.f.TransactionDate,'string')+'</StartDate>'
+'<RequiredDate>'+this.getControlValue(this.f.RequiredDate,'string')+'</RequiredDate>'
  +'<PaymentTerms>'+this.getControlValue(this.f.PaymentTerms,'string')+'</PaymentTerms>'
  +'<TotalDiscount>'+this.TotalDiscount+'</TotalDiscount >'
  +'<TotalTax>'+this.TotalTax+'</TotalTax>'
  +'<Total>'+this.Total+'</Total>'
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
  +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'<Terms>'+this.getControlValue(this.f.Terms,'int')+'</Terms>'
  +'<TransactionId>'+this.getControlValue(this.f.TransactionId,'int')+'</TransactionId>'
  +'<AfterDiscount>'+this.AfterDiscount+'</AfterDiscount>'
  +'<TotalSGST>'+this.TotalSGST+'</TotalSGST>'
  +'<TotalCGST>'+this.TotalCGST+'</TotalCGST>'
  +'<TotalIGST>'+this.TotalIGST+'</TotalIGST>'
  +'<TaxType>'+this.TaxType+'</TaxType>'
  +'<BillToStateName>'+this.BillToStateName+'</BillToStateName>'
  +'<BillToStateCode>'+this.BillToStateCode+'</BillToStateCode>'
  +'<Contactno>'+this.getControlValue(this.f.Contactno,'string')+'</Contactno>'
  
    +'</Table1></NewDataSet>';
    var xml2="";
    var rows="";

    for(var i=0;i<this.lstMRNItems.length;i++)
    {

     rows=rows+'<Table1>'
    +'<LineId>'+this.lstMRNItems[i].LineId+ '</LineId>'
    +'<Description>'+this.lstMRNItems[i].Description+ '</Description>'
    +'<Partno>'+this.lstMRNItems[i].Partno+ '</Partno>'

    +'<ItemId>'+this.lstMRNItems[i].ItemId+ '</ItemId>'
    +'<MakeId>'+this.lstMRNItems[i].MakeId+ '</MakeId>'
    +'<UOMId>'+this.lstMRNItems[i].UOMId+ '</UOMId>'
    +'<Make>'+this.lstMRNItems[i].Make+ '</Make>'
    +'<UOM>'+this.lstMRNItems[i].UOM+ '</UOM>'
    +'<Rate>'+this.lstMRNItems[i].Rate+ '</Rate>'
    +'<Qty>'+this.lstMRNItems[i].Qty+ '</Qty>'
    +'<Gross>'+this.lstMRNItems[i].Gross+ '</Gross>'
    +'<DiscountPercentage>'+this.lstMRNItems[i].DiscountPercentage+ '</DiscountPercentage>'
    +'<DiscountAmount>'+this.lstMRNItems[i].DiscountAmount+ '</DiscountAmount>'
    +'<CGST>'+this.lstMRNItems[i].CGST+ '</CGST>'
    +'<CGSTAmount>'+this.lstMRNItems[i].CGSTAmount+ '</CGSTAmount>'
    +'<SGST>'+this.lstMRNItems[i].SGST+ '</SGST>'
    +'<SGSTAmount>'+this.lstMRNItems[i].SGSTAmount+ '</SGSTAmount>'
    +'<IGST>'+this.lstMRNItems[i].IGST+ '</IGST>'
    +'<IGSTAmount>'+this.lstMRNItems[i].IGSTAmount+ '</IGSTAmount>'
    +'<TotalTax>'+this.lstMRNItems[i].TotalTax+ '</TotalTax>'
    +'<NetTotal>'+this.lstMRNItems[i].NetTotal+ '</NetTotal>'
    +'<TaxType>'+this.lstMRNItems[i].TaxType+ '</TaxType>'
    +'<recievedQty>'+this.lstMRNItems[i].recievedQty+ '</recievedQty>'
    

    +'<HSN>'+this.lstMRNItems[i].HSN+ '</HSN></Table1>'
    
    }
    xml2='<NewDataSet>'+rows+'</NewDataSet>';

  //   var xml3="";
  //   var rows="";

  //   for(var i=0;i<this.lstTermsChild.length;i++)
  //   {

  //    rows=rows+'<Table1>'
  //   +'<Amount>'+this.lstTermsChild[i].Amount+ '</Amount>'
  //   +'<PayPercentage>'+this.lstTermsChild[i].PayPercentage+ '</PayPercentage>'
  //   +'<PayName>'+this.lstTermsChild[i].PayName+ '</PayName>'

  //  //  +'<TermDetailsID>'+this.lstTermsChild[i].TermDetailsID+ '</TermDetailsID>'
    

  //   +'<PurchaseQuotationTermDetailsId>'+this.lstTermsChild[i].PurchaseQuotationTermDetailsId+ '</PurchaseQuotationTermDetailsId></Table1>'
    
  //   }
  //   xml3='<NewDataSet>'+rows+'</NewDataSet>';

    debugger;
    this.APICall.DBCalling("MRNSave",xml1,xml2,"","").subscribe(
      (res:Response) => 
      {
  
        debugger;
        $("#loaderParent").hide();
       // this.DbResult= (res);
        this.DbResult=JSON.parse(res['Message']);

      //  var l=this.DbResult.Table[0].length;
       // var tr=this.DbResult.Table[0].DBresult;
        if(this.DbResult.Table.length>0 &&this.DbResult.Table[0].DBresult>0)
        {
        if((+this.getControlValue(this.f.TransactionId,'int'))>0)
        {
          this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
         (window as any).swal({
           icon: 'success',
           title: 'Information!',
           text: 'Record Updated successfully.',
           buttonsStyling: false,
           confirmButtonClass: 'btn btn-lg btn-success'
       });
       this.router.navigate(['Purchase/MRN']);
     }else{
      //  this.CreateBranches.patchValue({
  
         
         this.f.TransactionId.setValue(this.DbResult.Table[0].TransactionId);
         this.f.TransactionNo.setValue(this.DbResult.Table[0].TransactionNo);
         this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
   
            //  });
             (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Saved successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
     this.router.navigate(['Purchase/MRN']);
     }
  
         debugger;
          this.lstMRNItems=null;
          this.lstMRNItems  = [];
          this.lstTermsChild=null;
          this.lstTermsChild  = [];
         
            if(this.DbResult.Table.length>0  )
            {
  
              try{
            
  if(this.DbResult.Table1.length>0)//lstres[0].Table=="PurchaseQuotation1")
  {
   //var res1=JSON.parse((( this.DbResult.Table1[0].lstMRNItems).replace(/\n/g, "")).replace(/'/g,"\""));
   var lstresQuotationItems=JSON.parse((( this.DbResult.Table1[0].lstMRNItems).replace(/\n/g, "")).replace(/'/g,"\""));
   var i=0;
   var  QuotationItemsdata = $.map(lstresQuotationItems, function (obj) {
     i=i+1;
     obj.SNO = i; 
  
     return obj;
   });

              this.lstMRNItems=QuotationItemsdata;
  
  
  }
 }catch(exce)
 {}


  
            }
            
  
  
         
          
           
       }else{
  
  
  
  if(this.DbResult.Table[0].DBresult==-3)
  {
  (window as any).swal({
   icon: 'warning',
   title: 'Exists',
   text: 'Quotation Already Exists.!',
   confirmButtonText: 'Dismiss',
   buttonsStyling: false,
   confirmButtonClass: 'btn btn-lg btn-warning'
  });
  }else{
  
    if(this.DbResult.Table[0].DBresult==-5)
    {
  
  
      var that=this;
      debugger;
      // (window as any).swal({
      //   icon: 'error',
      //   title: 'Treansaction modified by other User!',
      //   text: 'failed.!',
      //   confirmButtonText: 'Dismiss',
      //   buttonsStyling: false,
      //   confirmButtonClass: 'btn btn-lg btn-danger'
      //  });
      (window as any).swal({
        icon: "warning",
        title:  "Treansaction modified by "+this.DbResult.Table[0].ModifiedBy+"! ",
        text:"Do you wants to overwrite?",
     
        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      }).then(function(isConfirm) {
      
        if (isConfirm) {
    
          that.ModifiedDate=that.DbResult.Table[0].ModifiedDate;
    
          that.SaveTransaction();
        }else {
          (window as any). swal("Cancelled", "this file is not updated :)", "error");
        }
    
    
      });
    
  
     
    }else
    {
  
  // (window as any).swal({
  //  icon: 'error',
  //  title: 'Error!',
  //  text: 'failed.!',
  //  confirmButtonText: 'Dismiss',
  //  buttonsStyling: false,
  //  confirmButtonClass: 'btn btn-lg btn-danger'
  // });
    }
        
       }
     }
      
  
       //console.log('Sucsess');
     },
     err => {
       (window as any).swal({
         icon: 'error',
         title: 'Error!',
         text: 'Network Error Please Try Again .!',
         confirmButtonText: 'Dismiss',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-danger'
     });
     }
   );


}

OnDelete()
{

  var that=this;
  debugger;
  
  (window as any).swal({
    icon: "warning",
    title: "Are you sure?",
    text:"You will not be able to recover this record!",
 
    buttons: [
      'No, cancel it!',
      'Yes, I am sure!'
    ],
    dangerMode: true,
  }).then(function(isConfirm) {
    
    if (isConfirm) {

      that.DeleteMRN();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }

  });

}
DeleteMRN()

{

  if(this.ModifiedDate.toString().includes('India'))
  {
  
    var date = new  Date (this.ModifiedDate);
  
    
    this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
  }
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
  $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<GRNId>'+this.getControlValue(this.f.TransactionId,'int')+'</GRNId>'
+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
 +'<GRNNo>'+this.getControlValue(this.f.TransactionNo,'string')+'</GRNNo>'
 +'</Table1></NewDataSet>';

 this.APICall.DBCalling("MRNDelete",xml1,"","","").subscribe(
   (res:Response) => {

     $("#loaderParent").hide();
     this.DbResult=JSON.parse(res['Message']);
debugger;
     //  var l=this.DbResult.Table[0].length;
      // var tr=this.DbResult.Table[0].DBresult;
       if(this.DbResult.Table.length>0 &&this.DbResult.Table[0].DBresult>0)
       {
     //  this.ClearViewData();

      (window as any).swal({
        icon: 'success',
        title: 'Information!',
        text: 'Record Deleted successfully.',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-success'
    });
   
    this.router.navigate(['Purchase/MRN']);
   }
   else{
     (window as any).swal({
       icon: 'error',
       title: 'Error!',
       text: 'failed.!',
       confirmButtonText: 'Dismiss',
       buttonsStyling: false,
       confirmButtonClass: 'btn btn-lg btn-danger'
      });
    }
 


 },
 err => {
   (window as any).swal({
     icon: 'error',
     title: 'Error!',
     text: 'Network Error Please Try Again .!',
     confirmButtonText: 'Dismiss',
     buttonsStyling: false,
     confirmButtonClass: 'btn btn-lg btn-danger'
 });
 }
);
}

ngAfterViewInit(){
  if(this.StoreMRN.RequiredDate!='')
  {
  this.f.RequiredDate.setValue(formatDate(new Date(this.StoreMRN.RequiredDate), 'MM/dd/yyyy', 'en'));
  this.f.TransactionDate.setValue(formatDate(new Date(this.StoreMRN.StartDate), 'MM/dd/yyyy', 'en'));
 // var TransactionTime=  formatDate(new Date(this.StorePurchaseQuotation.vdate), 'HH:mm', 'en');
  }else{
    this.f.RequiredDate.setValue(formatDate(new Date(), 'MM/dd/yyyy', 'en'));
    this.f.TransactionDate.setValue(formatDate(new Date(), 'MM/dd/yyyy', 'en'));
   // var TransactionTime=  formatDate(new Date(), 'HH:mm', 'en');
  } 
  this.ClockControlLoad();
  this.ControlDatePickerLoad();
}
ClockControlLoad()
{

  debugger;
  (window as any).$('.clockpicker-demo').clockpicker();

 (window as any).$('.clockpicker-demo').clockpicker({
        donetext: 'Done'
    });

    (window as any).$('.clockpicker-autoclose-demo').clockpicker({
        autoclose: true
    });

    var input =  (window as any).$('.clockpicker-minutes-demo').clockpicker({
        placement: 'bottom',
        align: 'left',
        autoclose: true,
        'default': 'now'
    });

    $(document).on('click', '#check-minutes', function (e) {
        e.stopPropagation();
        input.clockpicker('show')
            .clockpicker('toggleView', 'minutes');
    });

    (window as any). $('.create-event-demo').clockpicker({
        donetext: 'Done',
        autoclose: true
    });


}
ControlDatePickerLoad()
{

debugger;
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
  TransactionDate: (window as any).moment().startOf('hour'),
  endDate: (window as any).moment().startOf('hour').add(32, 'hour'),
  locale: {
      format: 'M/DD hh:mm A'
  }
});

/**
* datefilter
*/
// var datefilter = $('input[name="datefilter"]');
// (window as any). datefilter.daterangepicker({
//   autoUpdateInput: false,
//   locale: {
//       cancelLabel: 'Clear'
//   }
// });

// datefilter.on('apply.daterangepicker', function(ev, picker) {
//   $(this).val(picker.TransactionDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
// });

(window as any).$('input.create-event-datepicker').daterangepicker({
  singleDatePicker: true,
  showDropdowns: true,
  autoUpdateInput: false
}).on('apply.daterangepicker', function(ev, picker) {
 debugger;
  $(this).val(picker.TransactionDate.format('MM/DD/YYYY'));
});

}

RecivedQtychange(target,d)
{
debugger;
//this._SelecedRow.Qty = target.value;
for(var i=0;i<this.lstMRNItems.length;i++)
{
  if(this.lstMRNItems[i].Partno==d.Partno)
  {
    this.lstMRNItems[i].recievedQty=this.f.recievedQty.value;
  }
}
}
StoreAccountLedger:StoreAccountLedger
OpenAccountLedger(){
  debugger;
  
  this.StoreAccountLedger=new StoreAccountLedger;
  this.APICall.UpdatedSelectedPath('./Accounting/AccountLedger');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreAccountLedger.AccountId=this.f.PartyId.value;
this.StoreAccountLedger.AccountName=this.f.PartyName.value;
this.StoreAccountLedger.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreAccountLedger));         
this.router.navigate(['Accounting/AccountLedger']);

}
Vendor:Vendor
VendorMaster()
{
 
    debugger;
    this.Vendor=new Vendor;
    if(this.selectedVendor!=undefined && this.selectedVendor!=null)
    {    
      this.selectedVendor.ViewName="RequestFromDC";
      this.Vendor=Object.assign({},this.selectedVendor); 
    }
    this.APICall.UpdatedSelectedPath('./Purchase/CreateVendor');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.Vendor.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.Vendor));         
  this.router.navigate(['Purchase/CreateVendor']);

}


}
