import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    { 
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SalesReturnsPrintComponent),
  multi: true
}
],
  selector: 'SalesReturnsPrint',
  templateUrl: './sales-returns-print.component.html',
  styleUrls: ['./sales-returns-print.component.css']
})
export class SalesReturnsPrintComponent implements OnInit {
  @Input()
  set ReturnsData (val)
{


  if(val!=null &&  typeof(val)!='undefined')
  {
    debugger;
  try{
  this._ReturnsData=val;
  this.PartyGSTNo=val.PartyGSTNo;
  this.BillToStateName=val.BillToStateName;
  this.BillToStateCode=val.BillToStateCode;
  this.lstReturnsItems=[];
  this.lstReturnsItems=val.lstReturnsItems;
  //this.lstTermsChild=val.lstTermsChild;
  this.lstReturnsItemsCalculations();
  if(this.lstReturnsItems.length<15)
  {
    this.AddRecords();
  }
  this.TransactionNo=val.f.TransactionNo.value;
  this.TransactionDate=val.f.TransactionDate.value;
 // this.RequiredDate=val.f.RequiredDate.value;
  this.PartyName=val.f.PartyName.value;
 // this.ShiptoAddress=val.f.ShiptoAddress.value;
 // this.TermsandConditions=(val.f.TermsandConditions.value).replace(/\n/g, ' <br> ');
  this.Billto=val.f.Billto.value;

  //this.lstTermsChild=[];
// let i=0;
//     this.lstTermsChild = $.map(val.lstTermsChild, function (obj) {
//       i=i+1;
//     obj.TermDescription = i+") Pay "+obj.PayPercentage+"%   of amount  at the time of "+obj.PayName+"(Amount:"+obj.Amount+")"; 
 
//     return obj;
//   });

 
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

lstReturnsItemsadd:any=[];
addrows:number=0;

lstReturnsItemsCalculations()
{
  debugger;
  for (var i = 0; i < this.lstReturnsItems.length; i++) {
    this.lstReturnsItems[i].Qty=(+this.lstReturnsItems[i].Qty).toFixed(1);
    this.lstReturnsItems[i].Rate=(+this.lstReturnsItems[i].Rate).toFixed(2);
    this.lstReturnsItems[i].DiscountAmount=(+this.lstReturnsItems[i].DiscountAmount).toFixed(2);
    this.lstReturnsItems[i].CGST=(+this.lstReturnsItems[i].CGST).toFixed(2);
    this.lstReturnsItems[i].SGST=(+this.lstReturnsItems[i].SGST).toFixed(2);
    this.lstReturnsItems[i].IGST=(+this.lstReturnsItems[i].IGST).toFixed(2);
    this.lstReturnsItems[i].Gross=(+this.lstReturnsItems[i].Gross).toFixed(2);
   
  }
}

AddRecords()
{
  debugger;

  for (var i = 0; i < this.lstReturnsItems.length; i++) {
    debugger;
    if(this.lstReturnsItems.length<15)
    {
     
      this.lstReturnsItems.push({Partno:"",
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
 private  _ReturnsData:any ;
 BillToStateName="";
 BillToStateCode="";
 lstReturnsItems:any=[];
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


//   return  ((typeof(this._ReturnsData)!='undefined' &&  this._ReturnsData!=null) ? this._ReturnsData.f: null);

// }
TransactionNo="";
TransactionDate:any;
RequiredDate:any;
PartyName="";
ShiptoAddress="";
TermsandConditions="";
Billto="";
btnClose()
{for (var i = 0; i < this.lstReturnsItems.length; i++) {
  if (this.lstReturnsItems[i].Partno == "") {
    this.lstReturnsItems.splice(i, 1);
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
CompanyAddress="";
CompanyName="";
CompanyGSTNo="";
PartyGSTNo="";
CompanyState="";CompanyStateCode="";
CompanyAddress1:string="";
  CompanyAddress2:string="";
  CompanyZipcode:string="";
CompanyBank="";
CompanyBankAccount="";
CompanyBankBranch="";
CompanyBankIFSCCode="";

  constructor(private APICall:APICallingService) {

this.CompanyName=this.APICall.GetCompanyName();
this.CompanyAddress=this.APICall.GetCompanyAddress();
this.CompanyGSTNo=this.APICall.GetCompanyGST();
this.CompanyState=this.APICall.GetCompanyStateName();
this.CompanyStateCode=this.APICall.GetCompanyStateCode();
this.CompanyZipcode=this.APICall.GetCompanyzipcode();
this.CompanyAddress1 = this.APICall.GetCompanyAddress2();
this.CompanyAddress2 = this.APICall.GetCompanyAddress3()
this.CompanyBank=this.APICall.GetCompanyBank();
this.CompanyBankAccount=this.APICall.GetCompanyBankAccountNo();
this.CompanyBankBranch=this.APICall.GetCompanyBankBranch();
this.CompanyBankIFSCCode=this.APICall.GetCompanyBankIFSCCode();
   }

  ngOnInit() {
  }

}
