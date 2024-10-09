import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReceiptPrintComponent),
      multi: true
    }
  ],
  selector: 'ReceiptPrint',
  templateUrl: './receipt-print.component.html',
  styleUrls: ['./receipt-print.component.css']
})
export class ReceiptPrintComponent implements OnInit {



HeaderName="";
PartyName="";
VoucherNo="";
VoucherDate="";
BillRefNo="";
TotalAmount=0;
Narration="";
lstReceiptsDetails:any=[];
Amountinwords="";


CompanyAddress="";
CompanyAddress1="";
CompanyAddress2="";
CompanyZipcode="";
CompanyName="";
CompanyGSTNo="";
PartyGSTNo="";
CompanyState="";CompanyStateCode="";

CompanyBank="";
CompanyBankAccount="";
CompanyBankBranch="";
CompanyBankIFSCCode="";
  @Input()
  set ReceiptData (val)
{


  if(val!=null &&  typeof(val)!='undefined')
  {
    debugger;
  try{
  //this._QuotationData=val;
  this.HeaderName=val.f.ReceiptMode.value=='Bank Accounts'?'Bank Receipt Voucher':'Cash Receipt Voucher';
  this.PartyName=val.f.RAccountName.value;
  this.VoucherNo=val.f.TransactionNo.value;
  this.VoucherDate=val.f.TransactionDate.value;
  this.BillRefNo=val.f.Billref.value;
  this.TotalAmount=val.Totalamount;
  this.Narration=val.f.Notes.value;


  this.lstReceiptsDetails=[];
  this.lstReceiptsDetails=val.lstReceiptsDetails;
  //this.lstTermsChild=val.lstTermsChild;

  

  this.Amountinwords=this.APICall.toWords((+this.TotalAmount));
  this.onChange(val);
}catch(ex)
{}
  }

}
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

  constructor(private APICall:APICallingService) {


    this.CompanyName=this.APICall.GetCompanyName();
    this.CompanyAddress = this.APICall.GetCompanyAddress();
    this.CompanyAddress1 = this.APICall.GetCompanyAddress2();
    this.CompanyAddress2 = this.APICall.GetCompanyAddress3();
    this.CompanyZipcode = this.APICall.GetCompanyzipcode();
    this.CompanyGSTNo=this.APICall.GetCompanyGST();
    this.CompanyState=this.APICall.GetCompanyStateName();
    this.CompanyStateCode=this.APICall.GetCompanyStateCode();
    
    this.CompanyBank=this.APICall.GetCompanyBank();
    this.CompanyBankAccount=this.APICall.GetCompanyBankAccountNo();
    this.CompanyBankBranch=this.APICall.GetCompanyBankBranch();
    this.CompanyBankIFSCCode=this.APICall.GetCompanyBankIFSCCode();

   }

  ngOnInit() {
  }

}
