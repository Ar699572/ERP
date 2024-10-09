import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PettyCashExpesesPrintComponent),
      multi: true
    }
  ],
  selector: 'apppettycashexpesesprint',
  templateUrl: './petty-cash-expeses-print.component.html',
  styleUrls: ['./petty-cash-expeses-print.component.css']
})
export class PettyCashExpesesPrintComponent implements OnInit {

  HeaderName="";
  EmployeeName="";
  VoucherNo="";
  VoucherDate="";
  BillRefNo="";
  TotalAmount=0;
  Narration="";
  lstExpenses:any=[];
  Amountinwords="";  
  
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

  @Input()
  set PettyCashExpensesData (val)
{

  debugger;

  if(val!=null &&  typeof(val)!='undefined')
  {
    debugger;
  try{
  
  this.VoucherNo=val.PettyCashInvoice.VoucherNo;
  this.VoucherDate=val.f.ExpenseDate.value;
  this.EmployeeName=val.PettyCashInvoice.EmployeeName;
 // this.BillRefNo=val.BillRefNo;
  this.TotalAmount=val.PettyCashInvoice.TotalAmount;
  this.Narration=val.PettyCashInvoice.Description;


  this.lstExpenses=[];
  this.lstExpenses=val.lstExpenses;
 
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

}
