import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PurchaseInvoicePrintComponent),
      multi: true
    }
  ],
  selector: 'PurchaseInvoicePrint',
  templateUrl: './purchase-invoice-print.component.html',
  styleUrls: ['./purchase-invoice-print.component.css']
})
export class PurchaseInvoicePrintComponent implements OnInit {
  @Input()
  set InvoiceData (val)
{


  if(val!=null &&  typeof(val)!='undefined')
  {
    debugger;
  try{
  this._InvoiceData=val;
  this.PartyGSTNo=val.PartyGSTNo;
  this.BillToStateName=val.BillToStateName;
  this.BillToStateCode=val.BillToStateCode;
  this.lstInvoiceItems=[];
  this.lstInvoiceItems=val.lstInvoiceItems;
  //this.lstTermsChild=val.lstTermsChild;

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
 private  _InvoiceData:any ;
 BillToStateName="";
 BillToStateCode="";
 lstInvoiceItems:any=[];
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

// get f()
// {


//   return  ((typeof(this._InvoiceData)!='undefined' &&  this._InvoiceData!=null) ? this._InvoiceData.f: null);

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
CompanyAddress="";
CompanyName="";
CompanyGSTNo="";
PartyGSTNo="";
CompanyState="";CompanyStateCode="";

CompanyBank="";
CompanyBankAccount="";
CompanyBankBranch="";
CompanyBankIFSCCode="";
CompanyAddress1:string="";
CompanyAddress2:string="";
CompanyZipcode:string="";
  constructor(private APICall:APICallingService) {

this.CompanyName=this.APICall.GetCompanyName();
this.CompanyAddress=this.APICall.GetCompanyAddress();
this.CompanyGSTNo=this.APICall.GetCompanyGST();
this.CompanyState=this.APICall.GetCompanyStateName();
this.CompanyStateCode=this.APICall.GetCompanyStateCode();
this.CompanyZipcode=this.APICall.GetCompanyzipcode();
      this.CompanyAddress1 = this.APICall.GetCompanyAddress2();
      this.CompanyAddress2 = this.APICall.GetCompanyAddress3();
this.CompanyBank=this.APICall.GetCompanyBank();
this.CompanyBankAccount=this.APICall.GetCompanyBankAccountNo();
this.CompanyBankBranch=this.APICall.GetCompanyBankBranch();
this.CompanyBankIFSCCode=this.APICall.GetCompanyBankIFSCCode();
   }

  ngOnInit() {
  }

}
