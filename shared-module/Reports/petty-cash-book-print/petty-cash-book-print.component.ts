import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PettyCashBookPrintComponent),
      multi: true
    }
  ],
  selector: 'PettyCashBookPrint',
  templateUrl: './petty-cash-book-print.component.html',
  styleUrls: ['./petty-cash-book-print.component.css']
})
export class PettyCashBookPrintComponent implements OnInit {

  

  HeaderName="";
  PartyName="";
  VoucherNo="";
  VoucherDate="";
  BillRefNo="";
  TotalAmount=0;
  Narration="";
  lstPettyCashBooksDetails:any=[];
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
    @Input()
    set PettyCashBookData (val)
  {
  
    debugger;
  
    if(val!=null &&  typeof(val)!='undefined')
    {
      debugger;
    try{
    //this._QuotationData=val;
    //this.HeaderName=val.f.PettyCashBookMode.value=='Bank Accounts'?'Bank PettyCashBook Voucher':'Cash PettyCashBook Voucher';
    //this.PartyName=val.f.RAccountName.value;
    this.VoucherNo=val.f.TransactionNo.value;
    this.VoucherDate=val.f.TransactionDate.value;
    this.BillRefNo=val.f.Billref.value;
    this.TotalAmount=val.Totalamount;
    this.Narration=val.f.Notes.value;
  
  
    this.lstPettyCashBooksDetails=[];
    this.lstPettyCashBooksDetails=val.lstPettyCashBookDetails;
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
  