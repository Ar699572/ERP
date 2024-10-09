import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SalesQuotationPrintComponent),
      multi: true
    }
  ],
  selector: 'SalesQuotationPrint',
  templateUrl: './sales-quotation-print.component.html',
  styleUrls: ['./sales-quotation-print.component.css']
})
export class SalesQuotationPrintComponent implements OnInit {
  startRow: any = 0;
  endRow: any = 0;
  private _SalesQuotationData: any;
  BillToStateName = "";
  CountryName = "";
  BillToStateCode = "";
  ShipCountryName: "";
  // lstSalesQuotationItems: any = [];
  lstTermsChild: any = [];
  Amountinwords = "";
  TotalQty = 0;
  TotalGross = 0;
  TotalDiscount = 0;
  TotalCGST = 0;
  TotalSGST = 0;
  TotalIGST = 0;
  TotalTax:any =0.00;
  Total = 0;
  TotalBCD=0;
  TotalSWS=0;
  AfterDiscount = 0;
  TrackingNo = "";
  TransportName1 = "";
  TransportMode = "";
  SupplyDate = "";
  VehicleNo = "";
  DriverName = "";
  PersonName = "";
  PersonPhoneNo = "";
  ProductRefNo = "";
  TransactionNo = "";
  TransactionDate: any;
  RequiredDate: any;
  PartyName = "";
  ShiptoAddress = "";
  TermsandConditions = "";
  Billto = "";

  CompanyAddress = "";
  BuyerAddress = "";
  CompanyName = "";
  CompanyGSTNo = "";
  PartyGSTNo = "";
  CompanyState = "";
  CompanyStateCode = "";

  CompanyBank = "";
  CompanyBankAccount = "";
  CompanyBankBranch = "";
  CompanyBankIFSCCode = "";
  TotalCharges = 0;
  ChargesAmount = 0;
  OrderNo = "";
  emptyno = " ";
  remainRecords = 0;
  startVal = 0;
  totalVal = 0;
  noOfPages = 0;
  continue = 0;
  pagebreak = false;
  min: number = 0;
  max: number = 0;
  middle: number = 48;
  emptyrowlimit: number = 20;
  PrintRows: number = 51;
TotalBeforeTax:number=0;
InvoiceType:string="";

IsMakeRequired:number=0;


  constructor(private APICall: APICallingService) {
    this.lstSalesQuotationPrint = [];

    this.startRow = 0;
    this.endRow = 0;

    this.BillToStateName = "";
    this.CountryName = "";
    this.BillToStateCode = "";
    // lstSalesQuotationItems: any = [];
    this.lstTermsChild = [];
    this.Amountinwords = "";
    this.TotalQty = 0;
    this.TotalGross = 0;
    this.TotalDiscount = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.TotalTax = 0;
    this.Total = 0;
    this.TotalBeforeTax=0;
    this.AfterDiscount = 0;
    this.TrackingNo = "";
    this.TransportName1 = "";
    this.TransportMode = "";
    this.SupplyDate = "";
    this.VehicleNo = "";
    this.DriverName = "";
    this.PersonName = "";
    this.PersonPhoneNo = "";

    this.TransactionNo = "";
    this.TransactionDate = "";
    this.RequiredDate = "";
    this.PartyName = "";
    this.ShiptoAddress = "";
    this.BuyerAddress = "";
    this.TermsandConditions = "";
    this.Billto = "";
    this.CountryName = "";
    this.CompanyAddress = "";
    this.CompanyName = "";
    this.CompanyGSTNo = "";
    this.PartyGSTNo = "";
    this.CompanyState = "";
    this.CompanyStateCode = "";

    this.CompanyBank = "";
    this.CompanyBankAccount = "";
    this.CompanyBankBranch = "";
    this.CompanyBankIFSCCode = "";
    this.TotalCharges = 0;
    this.ChargesAmount = 0;
    this.OrderNo = "";

    this.emptyno = " ";
    this.remainRecords = 0;
    this.startVal = 0;
    this.totalVal = 0;
    this.noOfPages = 0;
    this.continue = 0;
    //this.pagebreak = false;

  }

  Checked(value){
    try{
if (value==true)
{
  this.IsMakeRequired=1;
}
else
{
  this.IsMakeRequired=0;
}

    }
    catch(e){}
  }

  ngOnInit() {

    this.min = 20;
    this.max = 30;
    this.middle = 45;

    

    // this.min=Number($('#txtminrows').val());
    // this.max=Number($('#txtmaxrows').val());
    // this.middle=Number($('#txtmiddlerows').val());

    // if($('#chkpagebreak').val() == 'true')
    // {
    // this.pagebreak=true;
    // }
    // else
    // {
    //   this.pagebreak=false;
    // }

  }


  //  /lstSalesQuotationPrint1: any = [];
  lstSalesQuotationPrint: any = [];
  addrows: number = 0;

  lstSalesQuotationItemsCalculations() {
   
    var total = 0;
    for (var i = 0; i < this.lstSalesQuotationPrint.length; i++) {

      this.TotalQty = this.TotalQty + (+this.lstSalesQuotationPrint[i].Qty);
      if (this.lstSalesQuotationPrint[i].Partno != " ") {

        this.lstSalesQuotationPrint[i].Note = (this.lstSalesQuotationPrint[i].Note).toString().replace(/\n/g, ' <br> ')

        this.lstSalesQuotationPrint[i].Qty = (+this.lstSalesQuotationPrint[i].Qty).toFixed(1);
        this.lstSalesQuotationPrint[i].Rate = (+this.lstSalesQuotationPrint[i].Rate).toFixed(2);
        this.lstSalesQuotationPrint[i].Discount = (+this.lstSalesQuotationPrint[i].DiscountPercentage).toFixed(2);
        this.lstSalesQuotationPrint[i].DiscountAmount = (+this.lstSalesQuotationPrint[i].DiscountAmount).toFixed(2);
        this.lstSalesQuotationPrint[i].CGST = (+this.lstSalesQuotationPrint[i].CGST).toFixed(2);
        this.lstSalesQuotationPrint[i].SGST = (+this.lstSalesQuotationPrint[i].SGST).toFixed(2);
        this.lstSalesQuotationPrint[i].IGST = (+this.lstSalesQuotationPrint[i].IGST).toFixed(2);
        //this.lstSalesQuotationPrint[i].Gross = (+this.lstSalesQuotationPrint[i].Gross).toFixed(2);
        total = Number(this.lstSalesQuotationPrint[i].Rate) * Number(this.lstSalesQuotationPrint[i].Qty);
        this.lstSalesQuotationPrint[i].NetTotal = (+ total).toFixed(2);
      }
    }
  }

  CompanyAddress1: string = "";
  CompanyAddress2: string = "";
  CompanyZipcode: string = "";
  @Input()
  set SalesQuotationData(val) {
    debugger;
    this._SalesQuotationData = null;
    this.CompanyName = this.APICall.GetCompanyName();
    this.CompanyAddress = this.APICall.GetCompanyAddress();
    this.CompanyAddress1 = this.APICall.GetCompanyAddress2();
    this.CompanyAddress2 = this.APICall.GetCompanyAddress3();
    this.CompanyZipcode = this.APICall.GetCompanyzipcode();
    this.CompanyGSTNo = this.APICall.GetCompanyGST();
    this.CompanyState = this.APICall.GetCompanyStateName();
    this.CompanyStateCode = this.APICall.GetCompanyStateCode();


    this.CompanyBank = this.APICall.GetCompanyBank();
    this.CompanyBankAccount = this.APICall.GetCompanyBankAccountNo();
    this.CompanyBankBranch = this.APICall.GetCompanyBankBranch();
    this.CompanyBankIFSCCode = this.APICall.GetCompanyBankIFSCCode()

    if (val != null && typeof (val) != 'undefined') {

      try {
        debugger;
        this._SalesQuotationData = val;
        this.InvoiceType=val.InvoiceType;
        this.TotalSWS=val.TotalSWS;
        this.TotalBCD=val.TotalBCD;
        this.PartyGSTNo = val.PartyGSTNo;
        this.BillToStateName = val.BillToStateName;
        this.OrderNo = val.StoreSalesQuotation.CustomerRefNo;
        this.CountryName = val.CountryName;
        this.ShipCountryName = val.ShipCountryName
        this.BillToStateCode = val.BillToStateCode;
        debugger;
        this.lstSalesQuotationPrint = Object.assign([], val.lstQuotationItems);
        var k = 0;
        var data = $.map(this.lstSalesQuotationPrint, function (obj) {
          k = k + 1;
          obj.SNO = k;

          return obj;
        });
        this.lstSalesQuotationPrint = Object.assign([], data);

        this.lstSalesQuotationItemsCalculations();
        debugger;
        // this.TestERecords();
        //this.TestRecords();


        this.AddEmptyRecords();
        //this.AddExtraRows(this.lstSalesQuotationPrint.length);

        debugger;
        //   this.TrackingNo = val.f.TrackingNo.value;
        //   this.TransportName1 = val.f.TransportName1.value;
        this.TransactionNo = val.f.TransactionNo.value;
        this.TransactionDate = val.f.TransactionDate.value;
        this.RequiredDate = val.f.RequiredDate.value;
        this.PartyName = val.f.PartyName.value;
        this.ShiptoAddress = val.f.ShiptoAddress.value;
        //this.TransportMode = val.f.TransportMode.value;
        // this.SupplyDate = val.f.TransportDate.value;

        if (val.f.ShiptoAddress.value != undefined || val.f.ShiptoAddress.value != null || val.f.ShiptoAddress.value != "") {
          this.ShiptoAddress = val.f.ShiptoAddress.value;
        }
        else {
          this.ShiptoAddress = "";
        }

        if (val.f.Billto.value != undefined || val.f.Billto.value != null) {
          this.BuyerAddress = val.f.Billto.value;
        }
        else {
          this.BuyerAddress = "";
        }


        debugger;

        this.TermsandConditions = (val.f.TermsandConditions.value).replace(/\n/g, ' <br> ');
        this.Billto = val.f.Billto.value;

        this.lstTermsChild = [];
        let i = 0;
        this.lstTermsChild = $.map(val.lstTermsChild, function (obj) {
          i = i + 1;
          obj.TermDescription = i + ") Pay " + obj.PayPercentage + "% of amount at the time of " + obj.PayName + "(Amount:" + obj.Amount + ")";

          return obj;
        });


        debugger;

        this.TotalGross = val.TotalGross.toFixed(2);
        this.TotalDiscount = val.TotalDiscount.toFixed(2);
        this.TotalTax = (+(val.TotalTax).toFixed(2));
        this.Total = Math.round(val.Total);
        this.TotalBeforeTax=val.TotalBeforeTax.toFixed(2);
        this.TotalCGST = val.TotalCGST.toFixed(2);
        this.TotalSGST = val.TotalSGST.toFixed(2);
        this.TotalIGST = val.TotalIGST.toFixed(2);
        this.AfterDiscount = val.AfterDiscount.toFixed(2);
       // this.Amountinwords = this.APICall.toWords(Math.round(this.TotalGross));
        this.Amountinwords = this.APICall.toWords(this.Total);
        this.onChange(val);

      } catch (ex) { }
    }


  }

  private BindPrint(val: any) {

    try {

    } catch (e) { }
  }

  Go() {
    debugger;
    this.BindPrint(this._SalesQuotationData);
  }

  // TestERecords() {
  //   //this.lstSalesQuotationPrint=[];
  //   for (var i = 0; i < (22); i++) {

  //     this.lstSalesQuotationPrint.push(
  //       {

  //         Partno: "xxxxxx",
  //         Description: "xxxxxx",
  //         HSN: "xxxxxxxx",
  //         Qty: "1",
  //         Rate: "1",
  //         Discount: "1",
  //         DiscountAmount: "1",
  //         CGST: "1",
  //         SGST: "1",
  //         SNO: this.lstSalesQuotationPrint.length + 1,
  //         Show: "true",
  //         Gross: "1",
  //         IGST: "1",
  //         SGSTAmount: "1",
  //         IGSTAmount: "1",
  //         NetTotal: "1",
  //         CGSTAmount: "1"

  //       }

  //     );



  //   }
  // }


  // TestRecords() {
  //   //this.lstSalesQuotationPrint=[];
  //   for (var i = 0; i < 35; i++) {

  //     this.lstSalesQuotationPrint.push(
  //       {

  //         Partno: "xxxxxx",
  //         Make: " ",
  //         Description: "xxxxxx",
  //         HSN: "xxxxxxxx",
  //         Qty: "1",
  //         Rate: "1",
  //         Discount: "1",
  //         DiscountAmount: "1",
  //         CGST: "1",
  //         SGST: "1",
  //         SNO: "",
  //         Show: "true",
  //         Gross: "1",
  //         IGST: "1",
  //         SGSTAmount: "1",
  //         IGSTAmount: "1",
  //         NetTotal: "1",
  //         CGSTAmount: "1"

  //       }

  //     );



  //   }
  // }






  // AddRecords() {

  //   var rowno = 30;

  //   if (this.lstSalesQuotationPrint.length > this.startVal) {
  //     this.noOfPages = Number(this.lstSalesQuotationPrint.length) / Number(this.startVal);
  //     this.remainRecords = Number(this.lstSalesQuotationPrint.length) % Number(this.startVal);
  //   }

  //   for (var i = 0; i <= this.lstSalesQuotationPrint.length; i++) {

  //     if (this.lstSalesQuotationPrint.length > this.startVal) {

  //       if (i == rowno) {
  //         break;
  //       }

  //       else if (i >= this.startVal) {

  //         this.lstSalesQuotationPrint.splice(i, 0,
  //           {
  //             Partno: " ",
  //             Make: " ",
  //             Description: "",
  //             HSN: "",
  //             Qty: "",
  //             Rate: "",
  //             Discount: "",
  //             CGST: "",
  //             SGST: "",
  //             SNO: "",
  //             Show: "true",
  //             Gross: "",
  //             IGST: "",
  //             NetTotal: "",
  //             IGSTAmount: ""
  //           });
  //       }
  //     }

  //     else if (this.lstSalesQuotationPrint.length < this.startVal) {

  //       var eptrow = Number(this.startVal) - Number(this.lstSalesQuotationPrint.length);

  //       if (i == eptrow) {
  //         break;
  //       }

  //       else if (i == this.lstSalesQuotationPrint.length) {

  //         this.lstSalesQuotationPrint.splice(i, 0,
  //           {
  //             Partno: " ",
  //             Make: " ",
  //             Description: "",
  //             HSN: "",
  //             Qty: "",
  //             Rate: "",
  //             Discount: "",
  //             DiscountAmount: "",
  //             CGST: "",
  //             SGST: "",
  //             SNO: "",
  //             Show: "true",
  //             Gross: "",
  //             IGST: "",
  //             SGSTAmount: "",
  //             IGSTAmount: "",
  //             NetTotal: "",
  //             CGSTAmount: ""
  //           });
  //       }
  //     }






  //   }
  // }




  AddEmptyRecords() {
    debugger;
    var maxRecords = 35;
    var pageRecordsLimit = 22;
    var RecCount = this.lstSalesQuotationPrint.length;
    var RecAdd = 0;
    if (RecCount > pageRecordsLimit && maxRecords > RecCount) {


     // RecAdd = (maxRecords - RecCount) + pageRecordsLimit + 1
      RecAdd = (maxRecords - pageRecordsLimit)  +pageRecordsLimit

    } 
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



    //   var PageSize=this.lstSalesQuotationPrint.length>=47?47:22;
    //   var TotalRowCnt=this.lstSalesQuotationPrint.length ;
    //   var RemRecToAdd=(TotalRowCnt%PageSize);

    //   var frec=Math.floor((TotalRowCnt/PageSize))

    //    var RecToAdd= (TotalRowCnt-PageSize)>0? PageSize-RemRecToAdd:0;


    // var addreccnt=(frec>0  && RemRecToAdd>0)?(RecToAdd+27+(frec-1)):( (TotalRowCnt-PageSize)>0?RemRecToAdd:(PageSize>=47?27:(  PageSize-TotalRowCnt)+(frec-1))  );

    for (let i = 0; i < (RecAdd); i++) {
     
      this.lstSalesQuotationPrint.push({
        //  this.lstSalesQuotationPrint.splice({
        Partno: " ",
        Description: " ",
        HSN: "",
        Qty: "",
        Rate: "",
        Discount: "",
        DiscountAmount: "",
        CGST: "",
        SGST: "",
        SNO: this.lstSalesQuotationPrint.length + 1,
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


  AddExtraRows(rowno) {
    debugger;

    var lengthx = Number(rowno) + Number(this.emptyrowlimit);

    for (var i = rowno; i < lengthx; i++) {
      
      this.lstSalesQuotationPrint.splice(i, 0,
        {
          Partno: " ",
          Description: "",
          HSN: "",
          Qty: "",
          Rate: "",
          Discount: "",
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



  showfooter() {
    try {
      debugger;
      var Totalrows = this.lstSalesQuotationPrint.length;
      //without footer  page limit
      var pagerowsLimit: number = this.max;
      //with headers and footer page limit
      var minimumLimit: number = this.min;

      this.pagebreak = false;



      if (this.noOfPages > 1) {
        minimumLimit = this.max;
      }

      this.min = minimumLimit;
      //min=minimumLimit * this.noOfPages;
      //this.max=pagerowsLimit * this.noOfPages;

      //var pages = (Totalrows - minimumLimit) / pagerowsLimit;
      //var pages = (Totalrows - minimumLimit) / pagerowsLimit;

      // if (!Number.isInteger(   pages)) {
      //   pages = Math.round(  pages);
      // }



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






  btnClose() {
    for (var i = 0; i < this.lstSalesQuotationPrint.length; i++) {
      if (this.lstSalesQuotationPrint[i].Partno == "") {
        this.lstSalesQuotationPrint.splice(i, 1);
        i = 0;
      }
    }
    this.PrintCloseClick.emit();
  }

  @Output()
  public PrintCloseClick = new EventEmitter();


  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(obj: any): void {
    if (obj !== undefined && obj != "") {


    }
  }


  print() {

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    //mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('<html><head><script  type="text/javascript" > (function() { alert(document.getElementById("myTable").offsetHeight)   })(); </script><title></title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1></h1>');

    var script = '<script  type="text/javascript" > $( document ).ready(function() {  alert( );}); </script>';
    //mywindow.document.write(script);



    //var script='<script  type="text/javascript" > $(document).ready (function() {   alert( ); } ); </script>';
    mywindow.document.write(script);

    mywindow.document.write(document.getElementById('PrintArea').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

  }

}
