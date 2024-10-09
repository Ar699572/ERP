import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfarmaInvoicePrintComponent),
      multi: true
    }
  ],
  selector: 'ProformaInvoicePrint',
  templateUrl: './profarma-invoice-print.component.html',
  styleUrls: ['./profarma-invoice-print.component.css']
})


export class ProfarmaInvoicePrintComponent implements OnInit {

  pagebreak = false;
  min: number = 0;
  max: number = 0;
  middle: number = 48;
  emptyrowlimit: number = 20;
  PrintRows: number = 51;
  addrows: number = 0;
  noOfPages:number=0;
  emptyno = " ";
  remainRecords = 0;
  startVal = 0;
  totalVal = 0;
  continue = 0;
  BuyerAddress="";
  TransportMode="";
  VehicleNo="";
 // OrderNo="";
  TrackingNo="";
  DriverName="";
  PersonPhoneNo="";
  ProductRefNo="";
  lstsampleItems:any=[];
  lstPrintItems: any = [];
  BCDTax:any;
  SWSTax:any;
  @Input()
  set ProformaInvoiceData(val) {


    if (val != null && typeof (val) != 'undefined') {
      debugger;
      try {
        this._ProformaInvoiceData = val;
        this.PartyGSTNo = val.PartyGSTNo;
        this.BillToStateName = val.BillToStateName;
        this.BillToStateCode = val.BillToStateCode;
        this.lstPrintItems = [];
//         this.lstsampleItems = [];
//         this.lstsampleItems =  Object.assign([], val.lstProformaInvoiceItems);

//         var ct=this.lstsampleItems.length;
//         try{
//         for (let i=0;i< (this.lstsampleItems.length -2); i++)
//         {
// this.lstPrintItems.push (this.lstsampleItems[i]);
//         }

//         this.BCDTax=Object.assign({}, (this.lstsampleItems[ct-2]));
//         if(this.BCDTax!=undefined && this.BCDTax!=null)
//         {
// this.TotalBCD=this.BCDTax.NetTotal;
//         }
//         this.SWSTax=Object.assign({}, (this.lstsampleItems[ct-1]));
//         if(this.SWSTax!=undefined && this.SWSTax!=null)
//         {
//           this.TotalSWS=this.SWSTax.NetTotal;
//         }
//       }
//       catch(e)
//       {

//       }

        this.lstPrintItems = val.lstProformaInvoiceItems;
        this.lstPrintItems = Object.assign([], val.lstProformaInvoiceItems);
        var k = 0;
        var data = $.map(this.lstPrintItems, function (obj) {
          k = k + 1;
          obj.SNO = k;

          return obj;
        });
        this.lstPrintItems = Object.assign([], data);


        this.lstProformaInvoiceItemsCalculations();
        // if (this.lstPrintItems.length < 15) {
        //   this.AddRecords();
        // }
        this.AddEmptyRecords();
        //this.lstTermsChild=val.lstTermsChild;
        this.BillRefNo = val.f.BillRefNo.value;
        this.TransportName = val.f.TransportName.value;
        this.TransactionNo = val.f.TransactionNo.value;
        this.TransactionDate = val.f.TransactionDate.value;
        this.RequiredDate = val.f.RequiredDate.value;
        this.PartyName = val.f.PartyName.value;
        this.ShiptoAddress = val.f.ShiptoAddress.value;
        this.TermsandConditions = (val.f.TermsandConditions.value).replace(/\n/g, ' <br> ');
        this.Billto = val.f.Billto.value;

        this.lstTermsChild = [];
        let i = 0;
        this.lstTermsChild = $.map(val.lstTermsChild, function (obj) {
          i = i + 1;
          obj.TermDescription = i + ") Pay " + obj.PayPercentage + "%   of amount  at the time of " + obj.PayName + "(Amount:" + obj.Amount + ")";

          return obj;
        });

        
        this.TotalGross = val.TotalGross.toFixed(2);
        this.TotalCharges = val.TotalCharges.toFixed(2);
        this.TotalDiscount = val.TotalDiscount.toFixed(2);
        this.TotalTax = val.TotalTax.toFixed(2);
        this.Total = Math.round(val.Total);
        this.TotalCGST = val.TotalCGST.toFixed(2);
        this.TotalSGST = val.TotalSGST.toFixed(2);
        this.TotalIGST = val.TotalIGST.toFixed(2);
        this.TotalBCD = val.TotalBCD.toFixed(2);
        this.TotalSWS = val.TotalSWS.toFixed(2);
        this.TotalBeforeTax=val.TotalBeforeTax.toFixed(2);
        this.AfterDiscount = val.AfterDiscount.toFixed(2);
        this.Amountinwords = this.APICall.toWords(this.Total);
        this.onChange(val);
      } catch (ex) { }
    }

  }
  
  

  lstProformaInvoiceItemsCalculations() {
    debugger;
    for (var i = 0; i < this.lstPrintItems.length; i++) {

      this.lstPrintItems[i].Note = (this.lstPrintItems[i].Note).toString().replace(/\n/g, ' <br> ')

      this.lstPrintItems[i].Qty = (+this.lstPrintItems[i].Qty).toFixed(1);
      this.lstPrintItems[i].Rate = (+this.lstPrintItems[i].Rate).toFixed(2);
     // this.lstPrintItems[i].DiscountPercentage = (+this.lstPrintItems[i].DiscountPercentage).toFixed(2);
      this.lstPrintItems[i].DiscountAmount = (+this.lstPrintItems[i].DiscountAmount).toFixed(2);
      this.lstPrintItems[i].CGST = (+this.lstPrintItems[i].CGST).toFixed(2);
      this.lstPrintItems[i].SGST = (+this.lstPrintItems[i].SGST).toFixed(2);
      this.lstPrintItems[i].IGST = (+this.lstPrintItems[i].IGST).toFixed(2);
      this.lstPrintItems[i].Gross = (+this.lstPrintItems[i].Gross).toFixed(2);

    }
  }


  TestRecords() {
    //this.lstSalesQuotationPrint=[];
    for (var i = 0; i < 35; i++) {

      this.lstPrintItems.push(
        {

          Partno: "xxxxxx",
          Description: "xxxxxx",
          HSN: "xxxxxxxx",
          Qty: "1",
          Rate: "1",
          DiscountPercentage: "1",
          DiscountAmount: "1",
          CGST: "1",
          SGST: "1",
          SNO: "",
          Show: "true",
          Gross: "1",
          IGST: "1",
          SGSTAmount: "1",
          IGSTAmount: "1",
          NetTotal: "1",
          CGSTAmount: "1"
        }  );

    }
  }


  showfooter() {
    try {
      debugger;
      var Totalrows = this.lstPrintItems.length;
      //without footer  page limit
      var pagerowsLimit: number = this.max;
      //with headers and footer page limit
      var minimumLimit: number = this.min;

      this.pagebreak = false;



      if (this.noOfPages > 1) {
        minimumLimit = this.max;
      }

      this.min = minimumLimit;
     

      if (Totalrows <= this.min) {
        this.pagebreak = false;
      }
      else if (Totalrows >= this.min && Totalrows <= this.middle) {
        this.pagebreak = false;
      }
      else if (Totalrows >= this.min && Totalrows <= this.max) {
        this.pagebreak = true;
      }


    }
    catch (e) { }
  }



  AddEmptyRecords() {
    debugger;
    var maxRecords = 47;
    var pageRecordsLimit = 22;
    var RecCount = this.lstPrintItems.length;
    var RecAdd = 0;



    if (RecCount > pageRecordsLimit && maxRecords > RecCount) {


     // RecAdd = (maxRecords - RecCount) + pageRecordsLimit + 1
     RecAdd = (maxRecords - pageRecordsLimit)  +pageRecordsLimit

    } else
      if (pageRecordsLimit > RecCount) {

        RecAdd = (pageRecordsLimit - RecCount) + 1;

      }
      else if (maxRecords < RecCount) {
        var frec = Math.floor((RecCount / maxRecords));
        var RemRecToAdd = (RecCount % maxRecords);

        if (RemRecToAdd > pageRecordsLimit) {
          RecAdd = (maxRecords - RemRecToAdd) + pageRecordsLimit + (frec - 1);
        } else {

          RecAdd = (pageRecordsLimit - RemRecToAdd) + (frec - 1)

        }

      }

    for (let i = 0; i < (RecAdd); i++) {
      this.lstPrintItems.push({

        Partno: " ",
        Description: " ",
        HSN: "",
        Qty: "",
        Rate: "",
        DiscountPercentage: "",
        DiscountAmount: "",
        CGST: "",
        SGST: "",
        SNO: this.lstPrintItems.length + 1,
        Show: "true",
        Gross: "",
        IGST: "",
        SGSTAmount: "",
        IGSTAmount: "",
        NetTotal: "",
        CGSTAmount: ""
      });


      // this.lstSalesQuotationPrint.splice(i, 0,
      //   {
      //     Partno: " ",
      //     Description: " ",
      //     HSN: "",
      //     Qty: "",
      //     Rate: "",
      //     Discount:"",
      //     DiscountAmount: "",
      //     CGST: "",
      //     SGST: "",
      //     SNO: "",
      //     Show: "true",
      //     Gross: "",
      //     IGST: "",
      //     SGSTAmount: "",
      //     IGSTAmount: "",
      //     NetTotal: "",
      //     CGSTAmount: ""
      //   });
    }

  }

  AddRecords() {

    var rowno = 30;

    if (this.lstPrintItems.length > this.startVal) {
      this.noOfPages = Number(this.lstPrintItems.length) / Number(this.startVal);
      this.remainRecords = Number(this.lstPrintItems.length) % Number(this.startVal);
    }

    for (var i = 0; i <= this.lstPrintItems.length; i++) {

      if (this.lstPrintItems.length > this.startVal) {

        if (i == rowno) {
          break;
        }

        else if (i >= this.startVal) {

          this.lstPrintItems.splice(i, 0,
            {
              Partno: " ",
              Description: "",
              HSN: "",
              Qty: "",
              Rate: "",
              DiscountPercentage: "",
              CGST: "",
              SGST: "",
              SNO: "",
              Show: "true",
              Gross: "",
              IGST: "",
              NetTotal: "",
              IGSTAmount: ""
            });
        }
      }

      else if (this.lstPrintItems.length < this.startVal) {

        var eptrow = Number(this.startVal) - Number(this.lstPrintItems.length);

        if (i == eptrow) {
          break;
        }

        else if (i == this.lstPrintItems.length) {

          this.lstPrintItems.splice(i, 0,
            {
              Partno: " ",
              Description: "",
              HSN: "",
              Qty: "",
              Rate: "",
              DiscountPercentage: "",
              DiscountAmount: "",
              CGST: "",
              SGST: "",
              SNO: "",
              Show: "true",
              Gross: "",
              IGST: "",
              SGSTAmount: "",
              IGSTAmount: "",
              NetTotal: "",
              CGSTAmount: ""
            });
        }
      }






    }
  }


  AddExtraRows(rowno) {
    debugger;

    var lengthx = Number(rowno) + Number(this.emptyrowlimit);

    for (var i = rowno; i < lengthx; i++) {


      this.lstPrintItems.splice(i, 0,
        {
          Partno: " ",
          Description: "",
          HSN: "",
          Qty: "",
          Rate: "",
          DiscountPercentage: "",
          DiscountAmount: "",
          CGST: "",
          SGST: "",
          SNO: "",
          Show: "",
          Gross: "",
          IGST: "",
          SGSTAmount: "",
          IGSTAmount: "",
          NetTotal: "",
          CGSTAmount: ""
        });

    }
  }


  private _ProformaInvoiceData: any;
  BillToStateName = "";
  BillToStateCode = "";
  lstProformaInvoiceItems: any = [];
  lstTermsChild: any = [];
  Amountinwords = "";
  TotalGross = 0;
  TotalBCD=0;
  TotalSWS=0
  TotalBeforeTax=0;
  TotalCharges = 0;
  TotalDiscount = 0;
  TotalCGST = 0;
  TotalSGST = 0;
  TotalIGST = 0;
  TotalTax = 0;
  Total = 0;
  AfterDiscount = 0;
  BillRefNo = "";
  TransportName = "";
  // get f()
  // {


  //   return  ((typeof(this._ProformaInvoiceData)!='undefined' &&  this._ProformaInvoiceData!=null) ? this._ProformaInvoiceData.f: null);
  // }
  TransactionNo = "";
  TransactionDate: any;
  RequiredDate: any;
  PartyName = "";
  ShiptoAddress = "";
  TermsandConditions = "";
  Billto = "";
  btnClose() {
    for (var i = 0; i < this.lstPrintItems.length; i++) {
      if (this.lstPrintItems[i].Partno == "") {
        this.lstPrintItems.splice(i, 1);
        i = 0;
      }
    }
    this.PrintCloseClick.emit();
  }
  @Output()
  public PrintCloseClick = new EventEmitter();


  onChange = (_: any) => { };
  onTouched = () => { };

  //propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    if (obj !== undefined && obj != "") {

      debugger;
      // this.StateId = obj;
    }
  }

  CompanyAddress = "";
  CompanyName = "";
  CompanyGSTNo = "";
  PartyGSTNo = "";
  CompanyState = ""; CompanyStateCode = "";
  CompanyAddress1: string = "";
  CompanyAddress2: string = "";
  CompanyZipcode: string = "";
  CompanyBank = "";
  CompanyBankAccount = "";
  CompanyBankBranch = "";
  CompanyBankIFSCCode = "";

  constructor(private APICall: APICallingService) {

    this.CompanyName = this.APICall.GetCompanyName();
    this.CompanyAddress = this.APICall.GetCompanyAddress();
    this.CompanyGSTNo = this.APICall.GetCompanyGST();
    this.CompanyState = this.APICall.GetCompanyStateName();
    this.CompanyStateCode = this.APICall.GetCompanyStateCode();
    this.CompanyZipcode = this.APICall.GetCompanyzipcode();
    this.CompanyAddress1 = this.APICall.GetCompanyAddress2();
    this.CompanyAddress2 = this.APICall.GetCompanyAddress3();
    this.CompanyBank = this.APICall.GetCompanyBank();
    this.CompanyBankAccount = this.APICall.GetCompanyBankAccountNo();
    this.CompanyBankBranch = this.APICall.GetCompanyBankBranch();
    this.CompanyBankIFSCCode = this.APICall.GetCompanyBankIFSCCode();

    this.startVal=0;
  }


  print() {

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head><script  type="text/javascript" > (function() { alert(document.getElementById("myTable").offsetHeight)   })(); </script><title></title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1></h1>');

    var script = '<script  type="text/javascript" > $( document ).ready(function() {  alert( );}); </script>';
    mywindow.document.write(script);

    mywindow.document.write(document.getElementById('PrintArea').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

  }



  ngOnInit() {

    this.min = 20;
    this.max = 30;
    this.middle = 45;
  }

}
