import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';


@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SalesInvoicePrintComponent),
      multi: true
    }
  ],
  selector: 'SalesInvoicePrint',
  templateUrl: './sales-invoice-print.component.html',
  styleUrls: ['./sales-invoice-print.component.css']
})
export class SalesInvoicePrintComponent implements OnInit {

  startRow: any = 0;
  endRow: any = 0;
  private _SalesInvoiceData: any;
  BillToStateName = "";
  BillToStateCode = "";
  ImagePath:string=''
  // lstSalesInvoiceItems: any = [];
  lstTermsChild: any = [];
  Amountinwords = "";
  TotalQty = 0;
  TotalGross = 0;
  TotalDiscount = 0;
  TotalCGST = 0;
  TotalSGST = 0;
  TotalIGST = 0;
  TotalTax = 0;

  TotalBCD=0;
  TotalSWS=0;
  TotalBeforeTax=0;
  MaxTextlength=30;
  DescriptionLength=0;

  Total = 0;
  AfterDiscount = 0;
  TrackingNo = "";
  TransportName1 = "";
  TransportMode = "";
  SupplyDate = "";
  VehicleNo = "";
  DriverName = "";
  PersonName = "";
  PersonPhoneNo = "";

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
  ProductRefNo="";
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
  InvoiceType:string="";
 

  constructor(private APICall: APICallingService) {
    this.lstSalesInvoicePrint = [];
    
    this.startRow = 0;
    this.endRow = 0;

    this.BillToStateName = "";
    this.BillToStateCode = "";
    // lstSalesInvoiceItems: any = [];
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
this.ProductRefNo="";
    this.emptyno = " ";
    this.remainRecords = 0;
    this.startVal = 0;
    this.totalVal = 0;
    this.noOfPages = 0;
    this.continue = 0;
    //this.pagebreak = false;

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


  //  /lstSalesInvoicePrint1: any = [];
  lstSalesInvoicePrint: any = [];
  addrows: number = 0;

  lstSalesInvoiceItemsCalculations() {
  
    var total = 0;
    for (var i = 0; i < this.lstSalesInvoicePrint.length; i++) {

      this.lstSalesInvoicePrint[i].Note = (this.lstSalesInvoicePrint[i].Note).toString().replace(/\n/g, ' <br> ')

      this.TotalQty = this.TotalQty + (+this.lstSalesInvoicePrint[i].Qty);

      if (this.lstSalesInvoicePrint[i].Partno != " ") {


if(this.InvoiceType!="Warranty Replace")
{
        this.lstSalesInvoicePrint[i].Qty = (+this.lstSalesInvoicePrint[i].Qty).toFixed(1);
        this.lstSalesInvoicePrint[i].Rate = (+this.lstSalesInvoicePrint[i].Rate).toFixed(2);
        this.lstSalesInvoicePrint[i].Discount = (+this.lstSalesInvoicePrint[i].DiscountPercentage).toFixed(2);
        this.lstSalesInvoicePrint[i].DiscountAmount = (+this.lstSalesInvoicePrint[i].DiscountAmount).toFixed(2);
        this.lstSalesInvoicePrint[i].CGST = (+this.lstSalesInvoicePrint[i].CGST).toFixed(2);
        this.lstSalesInvoicePrint[i].SGST = (+this.lstSalesInvoicePrint[i].SGST).toFixed(2);
        this.lstSalesInvoicePrint[i].IGST = (+this.lstSalesInvoicePrint[i].IGST).toFixed(2);
        //this.lstSalesInvoicePrint[i].Gross = (+this.lstSalesInvoicePrint[i].Gross).toFixed(2);
        total = Number(this.lstSalesInvoicePrint[i].Rate) * Number(this.lstSalesInvoicePrint[i].Qty);
        this.lstSalesInvoicePrint[i].NetTotal = (+ total).toFixed(2);
}
      
      }
    }
  }

  CompanyAddress1:string="";
  CompanyAddress2:string="";
  CompanyZipcode:string="";
  @Input()
  set SalesInvoiceData(val) {
    debugger;
    this._SalesInvoiceData = null;
   
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
        this._SalesInvoiceData = val;
        this.PartyGSTNo = val.PartyGSTNo;
        this.BillToStateName = val.BillToStateName;
        this.OrderNo=val.StoreSalesInvoice.CustomerRefNo;
        this.ProductRefNo=val.StoreSalesInvoice.ProductReference;
        this.BillToStateCode = val.BillToStateCode;
        
        this.lstSalesInvoicePrint = Object.assign([], val.lstSalesInvoiceItems);
        var k = 0;
        var data = $.map(this.lstSalesInvoicePrint, function (obj) {
          k = k + 1;
          obj.SNO = k;

          return obj;
        });
        this.lstSalesInvoicePrint = Object.assign([], data);

        this.lstSalesInvoiceItemsCalculations();
    
       

        this.AddEmptyRecords();
        //this.AddExtraRows(this.lstSalesInvoicePrint.length);

        debugger;
        this.InvoiceType=val.f.InvoiceType.value;
        this.TrackingNo = val.f.TrackingNo.value;
        this.TransportName1 = val.f.TransportName1.value;
        this.ImagePath=val.ImagePath
        this.TransactionNo = val.f.TransactionNo.value;
        this.TransactionDate = val.f.TransactionDate.value;
        this.RequiredDate = val.f.RequiredDate.value;
        this.PartyName = val.f.PartyName.value;
        
        debugger;
        this.ShiptoAddress = val.f.ShiptoAddress.value;
        this.TransportMode = val.f.TransportMode.value;
        this.SupplyDate = val.f.TransportDate.value;

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
        // StoreSalesInvoice.TransportDate
        // SalesInvoiceData.StoreSalesInvoice.DriverName
        //StoreSalesInvoice.TrackingNo
        // StoreSalesInvoice.TransportName1
        
        this.PersonPhoneNo = val.f.PhoneNo.value;
        this.PersonName = val.f.PersonName.value;
        this.VehicleNo = val.f.TransportName1.value;
        this.DriverName = val.f.DriverName.value;
        this.TermsandConditions = (val.f.TermsandConditions.value).replace(/\n/g, ' <br> ');
        this.Billto = val.f.Billto.value;

        this.lstTermsChild = [];
        let i = 0;
        this.lstTermsChild = $.map(val.lstTermsChild, function (obj) {
          i = i + 1;
          obj.TermDescription = i + ") Pay " + obj.PayPercentage + "% of amount at the time of " + obj.PayName + "(Amount:" + obj.Amount + ")";

          return obj;
        });

        if (this._SalesInvoiceData.lstCharges.length > 0) {
          this.ChargesAmount = this._SalesInvoiceData.lstCharges[0].ChargesAmount;
        }

        this.TotalCharges = val.TotalCharges.toFixed(2);
        this.TotalGross = val.TotalGross.toFixed(2);
        this.TotalDiscount = val.TotalDiscount.toFixed(2);
        this.TotalTax = val.TotalTax.toFixed(2);
        this.Total = Math.round(val.Total);
        this.TotalCGST = val.TotalCGST.toFixed(2);
        this.TotalSGST = val.TotalSGST.toFixed(2);
        this.TotalIGST = val.TotalIGST.toFixed(2);

        this.TotalBCD = val.TotalBCD.toFixed(2);
        this.TotalSWS = val.TotalSWS.toFixed(2);
        this.TotalBeforeTax = val.TotalBeforeTax.toFixed(2);

        this.AfterDiscount = val.AfterDiscount.toFixed(2);
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
    this.BindPrint(this._SalesInvoiceData);
  }

  TestERecords() {
    //this.lstSalesInvoicePrint=[];
    for (var i = 0; i < (22); i++) {

      this.lstSalesInvoicePrint.push(
        {

          Partno: "xxxxxx",
          Description: "xxxxxx",
          HSN: "xxxxxxxx",
          Qty: "1",
          Rate: "1",
          Discount: "1",
          DiscountAmount: "1",
          CGST: "1",
          SGST: "1",
          SNO: this.lstSalesInvoicePrint.length + 1,
          Show: "true",
          Gross: "1",
          IGST: "1",
          SGSTAmount: "1",
          IGSTAmount: "1",
          NetTotal: "1",
          CGSTAmount: "1"

        }

      );

      // this.lstSalesInvoicePrint.splice(i, 0,
      //   {
      //     Partno: "xxxxxx",
      //     Description: "xxxxxx",
      //     HSN: "xxxxxxxx",
      //     Qty: "1",
      //     Rate: "1",
      //     Discount:"1",
      //     DiscountAmount: "1",
      //     CGST: "1",
      //     SGST: "1",
      //     SNO: "",
      //     Show: "true",
      //     Gross: "1",
      //     IGST: "1",
      //     SGSTAmount: "1",
      //     IGSTAmount: "1",
      //     NetTotal: "1",
      //     CGSTAmount: "1"
      //   });

    }
  }


  TestRecords() {
    //this.lstSalesInvoicePrint=[];
    for (var i = 0; i < 35; i++) {

      this.lstSalesInvoicePrint.push(
        {

          Partno: "xxxxxx",
          Description: "xxxxxx",
          HSN: "xxxxxxxx",
          Qty: "1",
          Rate: "1",
          Discount: "1",
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

        }

      );

     

    }
  }






  AddRecords() {

    var rowno = 30;

    if (this.lstSalesInvoicePrint.length > this.startVal) {
      this.noOfPages = Number(this.lstSalesInvoicePrint.length) / Number(this.startVal);
      this.remainRecords = Number(this.lstSalesInvoicePrint.length) % Number(this.startVal);
    }

    for (var i = 0; i <= this.lstSalesInvoicePrint.length; i++) {

      if (this.lstSalesInvoicePrint.length > this.startVal) {

        if (i == rowno) {
          break;
        }

        else if (i >= this.startVal) {

          this.lstSalesInvoicePrint.splice(i, 0,
            {
              Partno: " ",
              Description: "",
              HSN: "",
              Qty: "",
              Rate: "",
              Discount: "",
              CGST: "",
              SGST: "",
              SNO: "",
              Show: "true",
              Gross: "",
              IGST: "",
              NetTotal: "",
              CGSTAmount: ""
            });
        }
      }

      else if (this.lstSalesInvoicePrint.length < this.startVal) {

        var eptrow = Number(this.startVal) - Number(this.lstSalesInvoicePrint.length);

        if (i == eptrow) {
          break;
        }

        else if (i == this.lstSalesInvoicePrint.length) {

          this.lstSalesInvoicePrint.splice(i, 0,
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



  
  AddEmptyRecords() {
    debugger;
    var maxRecords=40;
    var pageRecordsLimit=22;
    var RecCount = this.lstSalesInvoicePrint.length;
    var RecAdd = 0;


    // var maxRecords =(+ $('#txtmaxrows').val());
    // var pageRecordsLimit=(+$('#pageRecordsLimit').val());
    // var RecCount = this.lstSalesInvoicePrint.length;
    // var RecAdd = 0;

    
//#region "Based on length"
//     if(this.DescriptionLength>0)
//     {
//       this.MaxTextlength=Math.round( (this.DescriptionLength/35));
//     }

// if(this.MaxTextlength<40)
// {
//   maxRecords=maxRecords-this.MaxTextlength;
//   pageRecordsLimit=pageRecordsLimit-this.MaxTextlength;
// }
//#endregion "Based on length"

    
    if (RecCount > pageRecordsLimit && maxRecords > RecCount) {


     // RecAdd = (maxRecords - RecCount) + pageRecordsLimit + 1
     RecAdd = (maxRecords - pageRecordsLimit)  + pageRecordsLimit

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



    //   var PageSize=this.lstSalesInvoicePrint.length>=47?47:22;
    //   var TotalRowCnt=this.lstSalesInvoicePrint.length ;
    //   var RemRecToAdd=(TotalRowCnt%PageSize);

    //   var frec=Math.floor((TotalRowCnt/PageSize))

    //    var RecToAdd= (TotalRowCnt-PageSize)>0? PageSize-RemRecToAdd:0;


    // var addreccnt=(frec>0  && RemRecToAdd>0)?(RecToAdd+27+(frec-1)):( (TotalRowCnt-PageSize)>0?RemRecToAdd:(PageSize>=47?27:(  PageSize-TotalRowCnt)+(frec-1))  );

    for (let i = 0; i < (RecAdd); i++) {
      this.lstSalesInvoicePrint.push({

        Partno: " ",
        Description: "",
        HSN: "",
        Qty: "",
        Rate: "",
        Discount: "",
        DiscountAmount: "",
        CGST: "",
        SGST: "",
        SNO: this.lstSalesInvoicePrint.length + 1,
        Show: "true",
        Gross: "",
        IGST: "",
        SGSTAmount: "",
        IGSTAmount: "",
        NetTotal: "",
        CGSTAmount: ""
      });


      // this.lstSalesInvoicePrint.splice(i, 0,
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

  // AddEmptyRows() {
  //   debugger;


  //   // var AddRowsCnt=

  //   //Math.floor(1.9);

  //   var rowno = this.min;
  //   this.startVal = this.max;
  //   var minRows = this.min;

  //   if (this.lstSalesInvoicePrint.length > 0) {

  //     if (this.max == 0) {
  //       this.noOfPages = 0;
  //     }
  //     else {
  //       this.noOfPages = Math.floor(Number(this.lstSalesInvoicePrint.length) / Number(this.startVal));
  //     }
  //     // this.remainRecords = Number(this.lstSalesInvoicePrint.length) % Number(this.startVal);
  //     //}
  //     this.max = this.max * this.noOfPages;

  //     if (this.noOfPages == 0) {
  //       this.noOfPages = 1;
  //     }
  //     else { this.noOfPages = this.noOfPages + 1; }

  //     if (this.noOfPages > 1) {
  //       this.continue = 1;
  //     }
  //     else {
  //       this.continue = 0;
  //     }



  //     if (this.noOfPages == 1 && this.lstSalesInvoicePrint.length <= 20) {
  //       rowno = 20;
  //       this.startVal = 20;
  //       this.emptyrowlimit = rowno - this.lstSalesInvoicePrint.length;
  //       this.AddExtraRows(rowno);
  //       this.pagebreak = false;
  //     }
  //     else if (this.noOfPages == 2 && this.lstSalesInvoicePrint.length >= 20 && this.lstSalesInvoicePrint.length <= 30) {
  //       rowno = 30;
  //       this.startVal = 30;
  //       this.emptyrowlimit = this.PrintRows - this.lstSalesInvoicePrint.length;
  //       this.AddExtraRows(rowno);
  //       this.pagebreak = true;
  //     }
  //     else if (this.noOfPages > 1 && this.lstSalesInvoicePrint.length >= 30 && this.lstSalesInvoicePrint.length <= 50) {
  //       rowno = 30;
  //       this.startVal = 50;
  //       //this.emptyrowlimit=16;
  //       for (let x = 0; x < this.noOfPages; x++) {
  //         if (x == 0) {
  //           this.emptyrowlimit = this.PrintRows - this.lstSalesInvoicePrint.length;
  //           this.AddExtraRows(rowno);
  //           this.pagebreak = false;
  //           rowno = rowno + this.emptyrowlimit;
  //         }
  //         if (x > 0) {
  //           this.AddExtraRows(this.lstSalesInvoicePrint.length);
  //           this.pagebreak = false;
  //           rowno = rowno + this.emptyrowlimit;
  //         }
  //       }
  //     }
  //     // else if (this.noOfPages > 1 && this.lstSalesInvoicePrint.length >= 50 && this.lstSalesInvoicePrint.length >= 70) {
  //     //   rowno = 50;
  //     //   this.startVal = 70;
  //     //   this.AddExtraRows(rowno,9);
  //     //   this.pagebreak=false;
  //     // }

  //     // if(this.continue==1)
  //     // {
  //     //   this.lstSalesInvoicePrint.splice(30, 0, {PartNo:'Continue'});
  //     // }

  //     var eptrow = Number(this.startVal) - Number(this.lstSalesInvoicePrint.length);
  //     var counter: number = 0;

  //     for (var i = this.lstSalesInvoicePrint.length; i <= rowno; i++) {
  //       //  for (var i = this.lstSalesInvoicePrint.length; i <= eptrow; i++) {

  //       if (this.lstSalesInvoicePrint.length < this.startVal) {

  //         if (this.lstSalesInvoicePrint.length > this.startVal) {

  //         }


  //         if (eptrow > 0) {

  //           this.lstSalesInvoicePrint.splice(i, 0,
  //             {
  //               Partno: " ",
  //               Description: " ",
  //               HSN: "",
  //               Qty: "",
  //               Rate: "",
  //               Discount: "",
  //               DiscountAmount: "",
  //               CGST: "",
  //               SGST: "",
  //               SNO: "",
  //               Show: "true",
  //               Gross: "",
  //               IGST: "",
  //               SGSTAmount: "",
  //               IGSTAmount: "",
  //               NetTotal: "",
  //               CGSTAmount: ""
  //             });
  //         }

  //       }

  //     }



  //   }

  // }

  // AddExtraRows(rowno) {
  //   debugger;

  //   var lengthx = Number(rowno) + Number(this.emptyrowlimit);

  //   for (var i = rowno; i < lengthx; i++) {


  //     this.lstSalesInvoicePrint.splice(i, 0,
  //       {
  //         Partno: " ",
  //         Description: "",
  //         HSN: "",
  //         Qty: "",
  //         Rate: "",
  //         Discount: "",
  //         DiscountAmount: "",
  //         CGST: "",
  //         SGST: "",
  //         SNO: "",
  //         Show: "",
  //         Gross: "",
  //         IGST: "",
  //         SGSTAmount: "",
  //         IGSTAmount: "",
  //         NetTotal: "",
  //         CGSTAmount: ""
  //       });

  //   }
  // }



  showfooter() {
    try {
      debugger;
      var Totalrows = this.lstSalesInvoicePrint.length;
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
    for (var i = 0; i < this.lstSalesInvoicePrint.length; i++) {
      if (this.lstSalesInvoicePrint[i].Partno == "") {
        this.lstSalesInvoicePrint.splice(i, 1);
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
debugger;
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    //mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1></h1>');

    //var script = '<script  type="text/javascript" > $( document ).ready(function() {  }); </script>';
    //mywindow.document.write(script);



    //var script='<script  type="text/javascript" > $(document).ready (function() {   alert( ); } ); </script>';
    //mywindow.document.write(script);

    mywindow.document.write(document.getElementById('PrintArea').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    

    return true;

  }
  ngAfterViewInit(){
    
  }
}
