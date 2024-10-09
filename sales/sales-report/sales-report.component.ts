
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { dateReviver } from 'ngrx-store-localstorage';
import { APICallingService } from 'src/app/apicalling.service';
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  constructor(private DbCallings: CommonDbCallings,  private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) { }
  fromdate:any;
  todate:any;
  lstDbResult:any=[];
  lstAccountLedger:any=[];
  DebitAmountSum: number = 0;
  CreditAmountSum: number = 0;
  TotalBalance: any;
  Balance: number = 0;
  lstTransactionDet:any=[];
  lastChar: any;
  ngOnInit() {

   this.fromdate= "04/01/2020";
   this.todate=formatDate(new Date(), 'MM/dd/yyyy', 'en');
  //  var date= new Date();
  //  this.todate = transform(date, 'MM/dd/yyyy');
this.SalesReport();
  }
  SalesReport()
  {

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDebitNote'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    debugger;
    this.APICall.DBCalling("AccountLedger",77,this.fromdate,this.todate, this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstAccountLedger = [];
        
        this.DebitAmountSum = 0;
        this.CreditAmountSum = 0;
        if (this.lstDbResult.Table.length > 0) {

          this.lstAccountLedger = this.lstDbResult.Table;
          this.TotalBalance = this.lstAccountLedger[this.lstAccountLedger.length - 1].Total;
          this.lastChar = this.TotalBalance.substr(this.TotalBalance.length - 2);
          this.Balance = this.TotalBalance.slice(0, -2);

          for (var i = 0; i < this.lstAccountLedger.length; i++) {
            this.DebitAmountSum = this.DebitAmountSum + this.lstAccountLedger[i].DRAmount;
          }
          for (var i = 0; i < this.lstAccountLedger.length; i++) {
            this.CreditAmountSum = this.CreditAmountSum + this.lstAccountLedger[i].CRAmount;
          }

          debugger;
          this.DebitAmountSum=(+this.DebitAmountSum.toFixed(2));
          this.CreditAmountSum=(+this.CreditAmountSum.toFixed(2));



        }

        $("#loaderParent").hide();
      });
  }

  GotoTransaction(data)
  {
    debugger;
    var Operation = '';
    if (data.FormName == 'SalesInvoice' || data.FormName == 'Sales Invoice') {
      Operation = 'ViewSalesInvoice'
    }
    if (Operation != '') {

      this.getTransactionDetails(data.VoucherId, Operation, data.FormName)
    }
  }
    getTransactionDetails(ID, Operation, FormName) {

      debugger;
  
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bDC'></div> <span>Loading</span> </div>");
  
      $("#loaderParent").show();
  
      var sstring = "";
  
      debugger;
      this.APICall.DBCalling(Operation,"NULL","", ID, this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger;
          this.lstDbResult = JSON.parse(res['Message']);
  
  
          this.lstTransactionDet = [];
          if (this.lstDbResult.Table.length > 0) {
            this.lstTransactionDet = this.lstDbResult.Table;
  
            if (this.lstTransactionDet.length > 0) {
  
              
              if (FormName == 'SalesInvoice' || FormName == 'Sales Invoice') {
                this.CreateSalesInvoice(this.lstTransactionDet[0])
              }
            }
  
          }
  
          $("#loaderParent").hide();
        });
  
    }

    StoreSalesInvoice: StoreSalesInvoice;
    CreateSalesInvoice(xml) {
  
      debugger;
      //this.APICall.SetViewData(xml);
  
  
      this.StoreSalesInvoice = new StoreSalesInvoice;
  
  
      this.StoreSalesInvoice.SequenceNumberId = xml.SequenceNumberId;
      this.StoreSalesInvoice.Contactno = xml.Contactno;
  
      this.StoreSalesInvoice.Email = xml.Email;
      //this.StoreSalesInvoice.RequiredDate = xml.RequiredDate;
      this.StoreSalesInvoice.Billto = xml.Billto;
      this.StoreSalesInvoice.Shipto = xml.Shipto;
  
      this.StoreSalesInvoice.ShiptoAddress = xml.ShiptoAddress;
      this.StoreSalesInvoice.Terms = xml.Terms;
      this.StoreSalesInvoice.TermsandConditions = xml.TermsandConditions;
      this.StoreSalesInvoice.BillToStateCode = xml.BillToStateCode;
      this.StoreSalesInvoice.BillToStateName = xml.BillToStateName;
      this.StoreSalesInvoice.TaxType = xml.TaxType;
      this.StoreSalesInvoice.PaymentTerms = xml.PaymentTerms;
      this.StoreSalesInvoice.TransactionTime = xml.TransactionTime;
  
      this.StoreSalesInvoice.ReferenceNo = xml.ReferenceNo;
      this.StoreSalesInvoice.ReferenceType = xml.ReferenceType;
  
  
  
  
      this.StoreSalesInvoice.Notes = xml.Notes;
  
      this.StoreSalesInvoice.CommissionNotes = xml.CommissionNotes;
  
  
  
  
  
      this.StoreSalesInvoice.TransportId = xml.TransportId;
      this.StoreSalesInvoice.Area = xml.Area;
      this.StoreSalesInvoice.TransportName = xml.TransportName;
      this.StoreSalesInvoice.BillRefNo = xml.BillRefNo;
  
  
      this.StoreSalesInvoice.CommitionPartyId = xml.CommitionPartyId;
      this.StoreSalesInvoice.CommitionPartyName = xml.CommitionPartyName;
      this.StoreSalesInvoice.CommitionPer = xml.CommitionPer;
      this.StoreSalesInvoice.CommitionAmount = xml.CommitionAmount;
  
  
      this.StoreSalesInvoice.InvoiceType = xml.InvoiceType;
  
      this.StoreSalesInvoice.Salesaccount = xml.Salesaccount;
  
      this.StoreSalesInvoice.Discountaccount = xml.Discountaccount;
  
      this.StoreSalesInvoice.CommissionPayableAccount = xml.CommissionPayableAccount;
  
      this.StoreSalesInvoice.Commissionaccount = xml.Commissionaccount;
  
  
  
  
  
      this.StoreSalesInvoice.TransactionDate = xml.TransactionDate;
      this.StoreSalesInvoice.TransactionId = xml.TransactionId;
      this.StoreSalesInvoice.TransactionNo = xml.TransactionNo;
      this.StoreSalesInvoice.PartyId = xml.PartyId;
      this.StoreSalesInvoice.PartyName = xml.PartyName;
      this.StoreSalesInvoice.PartyGSTNo = xml.PartyGSTNo;
  
      this.StoreSalesInvoice.ModifiedDate = (xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());
      this.StoreSalesInvoice.ViewName = xml.ViewName;
  
  
      if (xml.lstSalesInvoiceItems != null && typeof (xml.lstSalesInvoiceItems) != undefined) {
        var res = ((xml.lstSalesInvoiceItems).replace(/\n/g, "")).replace(/'/g, "\"");
  
        this.StoreSalesInvoice.lstSalesInvoiceItems = JSON.parse(res);
  
      }
  
      if (xml.lstTermsChild != null && typeof (xml.lstTermsChild) != undefined) {
        var res = ((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g, "\"");
  
        this.StoreSalesInvoice.lstTermsChild = JSON.parse(res);
  
      }
  
      if (xml.lstSalesInvoiceItemsStock != null && typeof (xml.lstSalesInvoiceItemsStock) != undefined) {
        var res = ((xml.lstSalesInvoiceItemsStock).replace(/\n/g, "")).replace(/'/g, "\"");
  
        this.StoreSalesInvoice.lstSalesInvoiceItemsStock = JSON.parse(res);
  
      }
  
  
      if (xml.lstCharges != null && typeof (xml.lstCharges) != undefined) {
        var res = ((xml.lstCharges).replace(/\n/g, "")).replace(/'/g, "\"");
  
        this.StoreSalesInvoice.lstCharges = JSON.parse(res);
  
      }
  
  
      if (xml.lstPayemnts != null && typeof (xml.lstPayemnts) != undefined) {
        var res = ((xml.lstPayemnts).replace(/\n/g, "")).replace(/'/g, "\"");
  
        this.StoreSalesInvoice.lstPayemnts = JSON.parse(res);
  
      }
  
  
  
  
  
      this.APICall.OpenPageFromRefernce('SalesInvoice', './Sales/CreateSalesInvoice', 'Sales')
  
      var ActivatedRoute = localStorage.getItem("ActivatedRoute");
      this.StoreSalesInvoice.TabId = ActivatedRoute;
      this.store.dispatch(new TabStore.AddTab(this.StoreSalesInvoice));
  
  
      this.router.navigate(['Sales/CreateSalesInvoice']);
  
    }




 
    SearchClick(){}


}
