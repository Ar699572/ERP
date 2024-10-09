import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DCPrintComponent),
      multi: true
    }
  ],
  selector: 'DCPrint',
  templateUrl: './dcprint.component.html',
  styleUrls: ['./dcprint.component.css']
})
export class DCPrintComponent implements OnInit {
  @Input()
  set DCData (val)
{


  if(val!=null &&  typeof(val)!='undefined')
  {
    debugger;
  try{
  this._DCData=val;
  this.PartyGSTNo=val.PartyGSTNo;
  this.BillToStateName=val.BillToStateName;
  this.BillToStateCode=val.BillToStateCode;
  this.lstDCItems=[];
  this.lstDCItems=val.lstDCItems;
  this.lstDCItemsCalculations();
  if(this.lstDCItems.length<15)
  {
    this.AddRecords();
  }
  //this.lstTermsChild=val.lstTermsChild;
  this.BillRefNo=val.f.BillRefNo.value;
  this.TransportName=val.f.TransportName.value;
  this.TransactionNo=val.f.TransactionNo.value;
  this.TransactionDate=val.f.TransactionDate.value;
  this.RequiredDate=val.f.RequiredDate.value;
  this.PartyName=val.f.PartyName.value;
  this.ShiptoAddress=val.f.ShiptoAddress.value;
  this.TermsandConditions=(val.f.TermsandConditions.value).replace(/\n/g, ' <br> ');
  this.Billto=val.f.Billto.value;

  this.lstTermsChild=[];
let i=0;
    this.lstTermsChild = $.map(val.lstTermsChild, function (obj) {
      i=i+1;
    obj.TermDescription = i+") Pay "+obj.PayPercentage+"%   of amount  at the time of "+obj.PayName+"(Amount:"+obj.Amount+")"; 
 
    return obj;
  });

  this.TotalCharges=val.TotalCharges.toFixed(2);
  this.TotalGross=val.TotalGross.toFixed(2);
  this.TotalDiscount=val.TotalDiscount.toFixed(2);
  this.TotalTax=val.TotalTax.toFixed(2);
  this.Total=Math.round(val.Total);
  this.TotalCGST=val.TotalCGST.toFixed(2);
  this.TotalSGST=val.TotalSGST.toFixed(2);
  this.TotalIGST=val.TotalIGST.toFixed(2);
  this.AfterDiscount=val.AfterDiscount.toFixed(2);
  this.Amountinwords=this.APICall.toWords(this.Total);
  this.onChange(val);
}catch(ex)
{}
  }

}

lstDCItemsadd:any=[];
addrows:number=0;
CompanyCountryName:string="";
lstDCItemsCalculations()
{
  debugger;
  for (var i = 0; i < this.lstDCItems.length; i++) {
    this.lstDCItems[i].Qty=(+this.lstDCItems[i].Qty).toFixed(1);
    this.lstDCItems[i].Rate=(+this.lstDCItems[i].Rate).toFixed(2);
    this.lstDCItems[i].DiscountAmount=(+this.lstDCItems[i].DiscountAmount).toFixed(2);
    this.lstDCItems[i].CGST=(+this.lstDCItems[i].CGST).toFixed(2);
    this.lstDCItems[i].SGST=(+this.lstDCItems[i].SGST).toFixed(2);
    this.lstDCItems[i].IGST=(+this.lstDCItems[i].IGST).toFixed(2);
    this.lstDCItems[i].Gross=(+this.lstDCItems[i].Gross).toFixed(2);
   
  }
}

AddRecords()
{
  debugger;

  for (var i = 0; i < this.lstDCItems.length; i++) {
    debugger;
    if(this.lstDCItems.length<15)
    {
     
      this.lstDCItems.push({Partno:"",
      Description:"",
      HSN:"",
      Qty:"",
      Rate:"",
      DiscountAmount:"",
      CGST:"",
      SGST:"",
      SNO:"",
      Show: "true",
      Gross:"",
      IGST:""})
    }

  }
}
 private  _DCData:any ;
 BillToStateName="";
 BillToStateCode="";
 lstDCItems:any=[];
 lstTermsChild:any=[];
 Amountinwords="";
 TotalGross=0;
  TotalDiscount=0;
  TotalCGST=0;
  TotalSGST=0;
  TotalIGST=0;
  TotalTax=0;
 Total=0;
 AfterDiscount=0;
 BillRefNo="";
 TransportName="";
// get f()
// {


//   return  ((typeof(this._DCData)!='undefined' &&  this._DCData!=null) ? this._DCData.f: null);

// }
TransactionNo="";
TransactionDate:any;
RequiredDate:any;
PartyName="";
ShiptoAddress="";
TermsandConditions="";
Billto="";
btnClose()
{
  for (var i = 0; i < this.lstDCItems.length; i++) {
    if (this.lstDCItems[i].Partno == "") {
      this.lstDCItems.splice(i, 1);
i=0;
    }
  }
  this.PrintCloseClick.emit();
}
@Output()
public PrintCloseClick= new EventEmitter();


 onChange = (_: any) => {};
 onTouched = () => {}; 

//propagateChange = (_: any) => {};

writeValue(obj: any): void {
  if (obj !== undefined  && obj !="") {

    debugger;
   // this.StateId = obj;
  }
}
CompanyAddress1:string="";
  CompanyAddress2:string="";
  CompanyZipcode:string="";
CompanyAddress="";
CompanyName="";
CompanyGSTNo="";
PartyGSTNo="";
CompanyState="";CompanyStateCode="";

CompanyBank="";
CompanyBankAccount="";
CompanyBankBranch="";
CompanyBankIFSCCode="";
TotalCharges=0;
  constructor(private APICall:APICallingService) {

this.CompanyName=this.APICall.GetCompanyName();
this.CompanyAddress=this.APICall.GetCompanyAddress();
this.CompanyGSTNo=this.APICall.GetCompanyGST();
this.CompanyState=this.APICall.GetCompanyStateName();
this.CompanyStateCode=this.APICall.GetCompanyStateCode();
this.CompanyAddress = this.APICall.GetCompanyAddress();
this.CompanyAddress1 = this.APICall.GetCompanyAddress2();
this.CompanyAddress2 = this.APICall.GetCompanyAddress3();
this.CompanyZipcode=this.APICall.GetCompanyzipcode();
this.CompanyBank=this.APICall.GetCompanyBank();
this.CompanyBankAccount=this.APICall.GetCompanyBankAccountNo();
this.CompanyBankBranch=this.APICall.GetCompanyBankBranch();
this.CompanyBankIFSCCode=this.APICall.GetCompanyBankIFSCCode();
   }

  ngOnInit() {
  }

}
