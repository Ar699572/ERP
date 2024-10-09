import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import * as XLSX from 'xlsx'; 
import { Data, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import { Store } from '@ngrx/store'; 
import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import { StoreAccountingSettings } from 'src/app/Store/StoreAccountingSettings';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Customer } from 'src/app/store/Customer';





@Component({
  selector: 'app-create-sales-invoice',
  templateUrl: './create-sales-invoice.component.html',
  styleUrls: ['./create-sales-invoice.component.css']
})
export class CreateSalesInvoiceComponent implements OnInit {
  CreateSalesInvoice: FormGroup;
  TransactionType = "Sales";
  DisplayCustomerId = 0;
  StoreAccountLedger: StoreAccountLedger;
  Discounttab: string = "";
  tempsalesinvoiceid: number = 0;
  lstSalesInvoiceEditDetails: any = [];
  CreatedID: number = 0;
  lstSalesInvoiceEditDetailstemp: any = [];
  DispalyCustomerName = "";
  lstTempBindEditDetails: any = [];
  lstShowDetails: any = [];
  DisplaySequenceNumberId = 0;
  tempCtID: number = 0;
  DispalyFormName = 'SalesInvoice';
  lstBindEditDetails: any = [];
  ReferenceType = "";
  ReferenceNo = "";
  SalesInvoiceData: any;
  FilterBy = "Courier";
  lstTemplates: any = []
  fileName:any;
  constructor(private DbCallings: CommonDbCallings, private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) {
    
    this.CreateSalesInvoice = formBuilder.group(
      {
        SequenceNumberId: new FormControl(0),
        Contactno: new FormControl(''),
        Email: new FormControl('', [Validators.email]),
        RequiredDate: new FormControl(''),
        Billto: new FormControl(''),
        Shipto: new FormControl(0),
        AddDiscount: new FormControl(0),
        ModeofTransport: new FormControl(''),
        itemNote: new FormControl(''),
        ShiptoAddress: new FormControl(''),
        Terms: new FormControl(''),
        TermsandConditions: new FormControl(''),
        PaymentTerms: new FormControl(''),
        TransactionTime: new FormControl(''),
        TransactionDate: new FormControl('', [Validators.required]),
        TransactionId: new FormControl(0),
        TransactionNo: new FormControl(''),
        SaleType: new FormControl('Credit'),

        TemplateType: new FormControl('Select'),
        InvoiceType: new FormControl('Invoice'),
        Salesaccount: new FormControl(0),
        Discountaccount: new FormControl(0),
        CommissionPayableAccount: new FormControl(0),
        Commissionaccount: new FormControl(0),
        //OrderNo:new FormControl('',[Validators.required, Validators.min(1)]),
        OrderNo:new FormControl(''),
        Notes: new FormControl(''),
        CommissionNotes: new FormControl(''),
        PartyId: new FormControl(0, [Validators.required, Validators.min(1)]),
        PartyName: new FormControl(''),
        TransportId: new FormControl('0'),
        Area: new FormControl(''),
        TransportName: new FormControl(''),
        BillRefNo: new FormControl(''),

        ChargesCOAId: new FormControl('0'),
        ChargesCOAName: new FormControl(''),
        ChargesAmount: new FormControl('0'),
        ChargesNarration: new FormControl(''),
        ChargesCGSTPer: new FormControl('0'),
        ChargesCGSTAmount: new FormControl('0'),
        ChargesSGSTPer: new FormControl('0'),
        ChargesSGSTAmount: new FormControl('0'),
        ChargesIGSTPer: new FormControl('0'),
        ChargesIGSTAmount: new FormControl('0'),
        TotalCharges: new FormControl('0'),
        SACCode: new FormControl(''),
        CustomerRefNo: new FormControl('', [Validators.required]),
        ProductReference: new FormControl(''),

        CCGSTAccountId: new FormControl(0),
        CSGSTAccountId: new FormControl(0),
        CIGSTAccountId: new FormControl(0),
        ModeOfPayment: new FormControl('0'),

        PaymentAccountId: new FormControl(0),

        PaymentAccountName: new FormControl(''),
        PaymentAmount: new FormControl(0),

        InstrumentNo: new FormControl(''),

        InstrumentDate: new FormControl(''),
        PaymentNarration: new FormControl(''),

        CommitionPartyId: new FormControl(0),
        CommitionPartyName: new FormControl(''),
        CommitionPer: new FormControl(0),
        CommitionAmount: new FormControl(0),

        LineChanges: new FormControl(0),
        SearchString: new FormControl(''),
        searchPartNo: new FormControl(''),
        searchDescription: new FormControl(''),
        searchMake: new FormControl(''),
        searchHSN: new FormControl(''),

        TransportMode: new FormControl('', [Validators.required]),
        TransportName1: new FormControl(''),
        TrackingNo: new FormControl(''),
        TransportDate: new FormControl(''),
        VehicleNo: new FormControl(''),
        DriverName: new FormControl(''),
        PersonName: new FormControl(''),
        PhoneNo: new FormControl('')
      }
    );
    // setInterval(() => {
    //   
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);
    //}, 1);


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }
  QuotDateChange(e) {

  }
  DrTotal = 0;
  CrTotal = 0;
  SelectedTab = '';
  tabClick(TabName) {
    
    this.SelectedTab = TabName;

  }


  lstSalesAccounts: any = [];
  lstDiscountAccount: any = [];
  lstCommissionPayable: any = [];
  lstCommissionExp: any = [];
  ViewSalesAccount() {
    var SalesAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      SalesAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Sales'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



   
    this.DbCallings.GetChartOfAccountsByGroup(SalesAccountGroup).subscribe(
      (res) => {

       

        this.lstDbResult = JSON.parse(res['Message']);


        this.lstSalesAccounts = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstSalesAccounts = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }

  ExportTOExcel1(e){
debugger;
Object.assign(this.lstPdfDocument,this.lstSalesInvoiceItems)
console.log('pdf' ,this.lstPdfDocument)
  }

  that = this;
  LoadOrder() {

    var that = this;


    (<any>$('#drpOrder')).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }

            return JSON.stringify({ "Operation": 'ViewSalesOrder', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            if(obj.PartyId===that.DisplayCustomerId)
            {

            obj.PartyId = obj.PartyId;
            obj.id = obj.TransactionId;
            obj.text = obj.TransactionNo;
            obj.TransactionDate = obj.TransactionDate;

             }

            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      , templateResult: this.format

    });

    $('#drpOrder').on('select2:open', function (e) {

      var html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="70%"><b>OrderNo</b></td> <td width="30%"><b>Date</b></td>  </tr > </tbody> </table>';

      var res = $('.select2-search');

      var text = res[0].innerText;

      if (text == "")
        $('.select2-search').append(html);

    });

    var that = this;
    $('#drpOrder').on('select2:select', function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {

        if(that.StoreSalesInvoice.ReferenceId != (<any>e).params.data.id)
        {
         
        that.StoreSalesInvoice.SalesReferenceId = (<any>e).params.data.id;
        that.StoreSalesInvoice.SalesReference= (<any>e).params.data.text;
        that.StoreSalesInvoice.SalesReferenceDate   = (<any>e).params.data.TransactionDate       
        that.OrderChangeEvent((<any>e).params.data)
        }
      }
    });
    var that = this;
    $('#drpOrder').on('select2:select', function (e) {
      that.StoreSalesInvoice.SalesReferenceId = 0;
      that.StoreSalesInvoice.SalesReference = "";
      that.StoreSalesInvoice.SalesReferenceDate = "";
    });


  }
  lstPdfDocument:object={};

OrderDate:string="";
  OrderChangeEvent(event){
 
this.f.OrderNo.setValue(event.TransactionNo)

this.OrderDate=event.TransactionDate
var obj = event.lstOrderItems;

    if (event.lstOrderItems != null && typeof (event.lstOrderItems) != undefined) {

      var res = ((event.lstOrderItems).replace(/\n/g, "")).replace(/'/g, "\"");
      var lst = JSON.parse(res);

      var that = this;
      if (lst != null && lst != undefined) {
        if (lst.length > 0) {
          for (let i = 0; i < lst.length; i++) {

            var result = this.lstSalesInvoiceItems.filter(x => x.RefLineId === lst[i]["LineId"]);
            if (result.length > 0) {

              (window as any).swal({
                icon: "warning",
                title: "Are you sure?",
                text: "This Item is already exist, Are you want to continue ?",

                buttons: [
                  'No, cancel it!',
                  'Yes, I am sure!'
                ],
                dangerMode: true,
              }).then(function (isConfirm) {
               
                if (isConfirm) {

                  that.PushMethods(lst, i);
                }

              });

            }
            else {

              lst[i]["SNO"] = (that.lstSalesInvoiceItems.length + 1);
              lst[i]["RefLineId"] = lst[i]["LineId"];
              lst[i]["LineId"]=0;
              lst[i]["RefType1"] = "SalesOrder";
              lst[i]["RefNo2"] = this.StoreSalesInvoice.SalesReference;
              lst[i]["RefDate3"] =this.StoreSalesInvoice.SalesReferenceDate;
              lst[i]["RefId"] = this.StoreSalesInvoice.SalesReferenceId;
              lst[i]["CGSTAccountId"]=0;
              lst[i]["SGSTAccountId"]=0;
               lst[i]["IGSTAccountId"]=0;
              that.lstSalesInvoiceItems.push(lst[i]);
            }
          }
        }
      }
      // that.StoreSalesInvoice.SalesReferenceId = (<any>e).params.data.id;
      // that.StoreSalesInvoice.SalesReference= (<any>e).params.data.text;
      // that.StoreSalesInvoice.SalesReferenceDate
     
    }

  }

  private PushMethods(lst: any, i: number) {

    for (let i = 0; i < lst.length; i++) {
      lst[i]["SNO"] = (this.lstSalesInvoiceItems.length + 1);
      lst[i]["RefLineId"] = lst[i]["LineId"];
     lst[i]["LineId"]=0;
      lst[i]["RefType1"] = "SalesOrder";
      lst[i]["RefNo2"] = this.lstSalesInvoiceItems[i].RefNo2;
      lst[i]["RefDate3"] = this.lstSalesInvoiceItems[i].RefDate3;
      lst[i]["RefId"] = this.lstSalesInvoiceItems[i].RefId;
      lst[i]["CGSTAccountId"]=0;
      lst[i]["SGSTAccountId"]=0;
      lst[i]["IGSTAccountId"]=0;
      this.lstSalesInvoiceItems.push(lst[i]);
    }
  }

  DeleteItem(e){
   
   
    this.RemoveItemClick(e)
  
    
  
  }
 

  ViewDiscountAccount() {

    var DiscountAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);
      DiscountAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Discount Allowed'; }))[0].AccountGroupName;



    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(DiscountAccountGroup).subscribe(
      (res) => {


        this.lstDbResult = JSON.parse(res['Message']);


        this.lstDiscountAccount = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstDiscountAccount = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }
  ViewCommiExpAccount() {
    var CommissionExAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      CommissionExAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Commission Expenses'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(CommissionExAccountGroup).subscribe(
      (res) => {


        this.lstDbResult = JSON.parse(res['Message']);


        this.lstCommissionExp = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstCommissionExp = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }

  ViewCommissionPayableAccount() {
    var CommissionPayableAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      CommissionPayableAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Commission Payable'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


   
    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(CommissionPayableAccountGroup).subscribe(
      (res) => {

       
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstCommissionPayable = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstCommissionPayable = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }

  Discounttabs() {
    this.Discounttab = "open";
  }
  Detailstab() {
    this.Discounttab = "";
  }
  Taxtab() {
    this.Discounttab = "";
  }
  Stocktab() {
    this.Discounttab = "";
  }
  CommitionPerChange(target) {
    this.f.CommitionAmount.setValue(((this.AfterDiscount) * (+target.value) / 100).toFixed(2))



  }
  Amountinwords: string = "";
  CommitionAmountChange(target) {

    this.f.CommitionPer.setValue(((+target.value) * 100) / (this.AfterDiscount))
  }
  lstSalesLineChanges: any = [];
  tempSno: number = 0;
  tempPrice: number = 0;
  InsertalineIn: number = 0;
  Insertaline(d, i) {
    
    this.InsertalineIn = i;
    this.lstSalesLineChanges = d;
    this.tempSno = d.SNO;
    this.tempPrice = d.Gross;
  }
  VendorAccountGroup = "";
  LoadCommitionPartyAccount() {
    var that = this;

    (<any>$("#drpCommitionPartyAccount")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }

            return JSON.stringify({ "Operation": 'ViewChartOfAccounts', "Params": sstring, "Xml2": 'All', "Xml3": that.VendorAccountGroup, "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.COAId;
            obj.text = obj.Name;


            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }

    });



    var that = this;
    $('#drpCommitionPartyAccount').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {


        that.f.CommitionPartyId.setValue((<any>e).params.data.id);
        that.f.CommitionPartyName.setValue((<any>e).params.data.text);

      }


    });


    $("#drpCommitionPartyAccount").on("select2:unselecting", function (e) {


      that.f.PaymentAccountId.setValue(0);
      that.f.PaymentAccountName.setValue('');

    });
    var AccountSelection = new Option(this.f.CommitionPartyName.value, this.f.CommitionPartyId.value.toString(), true, true);
    //AccountSelection.id=this._COAId.toString();
    (<any>$('#drpCommitionPartyAccount')).append(AccountSelection).trigger('change');
  }

  ModeOfPaymentChange(target) {


  }

  showPaymentError = false;
  Paymenterrormsg = '';
  lstPayemnts: any = [];
  SNOPy = 0;
  SNOST = 0;
  EditPayRecNO = -1;
  OnPayemntsAdd() {

    this.f.ModeOfPayment.setValue(0);
    this.f.PaymentAccountName.setValue('');
    this.f.PaymentAccountId.setValue(0);

    this.f.PaymentAmount.setValue(0);
    this.f.InstrumentNo.setValue('');
    this.f.InstrumentDate.setValue('');



    this.f.PaymentNarration.setValue('');
    $("#drpPaymentAccount").val('').trigger('change');
    $("#InstrumentDate").val('');


  }
  EditPayments(selectedRecord, SNO) {
    this.EditPayRecNO = SNO;
    this.SNOPy = SNO;

    this.CreateSalesInvoice.patchValue({

      ModeOfPayment: selectedRecord.ModeOfPayment,
      PaymentAccountName: selectedRecord.PaymentAccountName,
      PaymentAccountId: selectedRecord.PaymentAccountId,
      PaymentAmount: selectedRecord.PaymentAmount,
      InstrumentNo: selectedRecord.InstrumentNo,

      InstrumentDate: selectedRecord.InstrumentDate,
      PaymentNarration: selectedRecord.PaymentNarration
    });

    var AccountSelection = new Option(selectedRecord.PaymentAccountName, selectedRecord.PaymentAccountId.toString(), true, true);
    //AccountSelection.id=this._COAId.toString();
    (<any>$('#drpPaymentAccount')).append(AccountSelection).trigger('change');
    $("#InstrumentDate").val(this.f.InstrumentDate.value)


  }
  RemovePayemnts() {
    var sliceIndex = -1;
    for (var i = 0; i < this.lstPayemnts.length; i++) {
      this.lstPayemnts[i].Show = 'true';

      if (this.lstPayemnts[i].SNO == this.EditPayRecNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstPayemnts.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstPayemnts.length; i++) {
        this.lstPayemnts[i].SNO = i + 1;
      }
    }

    this.EditPayRecNO = -1;
    this.SNOPy = this.lstPayemnts.length + 1;
    this.f.LineChanges.setValue(1);
    $("#btnCloseSalesInvoicePayments").click();



  }
  ValidatePayments(): boolean {

    var validate = true;
    this.showPaymentError = false;
    this.f.InstrumentDate.setValue($("#InstrumentDate").val());
    if (
      this.getControlValue(this.f.ModeOfPayment, 'int') != "0"
      && this.getControlValue(this.f.PaymentAccountId, 'int') != "0"

      && this.getControlValue(this.f.PaymentAmount, 'int') != "0"



    ) {


      if (this.getControlValue(this.f.ModeOfPayment, 'int') == 'Bank Accounts') {

        if (this.getControlValue(this.f.InstrumentNo, 'string') == "" && this.getControlValue(this.f.InstrumentDate, 'string') == "") {


          validate = false;
          this.showPaymentError = true;
          this.Paymenterrormsg = "Instrument No And Instrument Date Required!";

        }


      } else {

        for (var i = 0; i < this.lstPayemnts.length; i++) {
          if (this.EditChRecNO != this.lstPayemnts[i].SNO &&
            this.lstPayemnts[i].InstrumentNo == this.getControlValue(this.f.InstrumentNo, 'string')
          ) {
            validate = false;
            this.showPaymentError = true;
            this.Paymenterrormsg = "Already exists!";
            break;

          }
        }
      }
    } else {
      validate = false;
      this.showPaymentError = true;
      this.Paymenterrormsg = "Invalid Data!";
    }
    return validate;



  }
  TotalPayments = 0;
  CalcPaymentTotal() {

    this.TotalPayments = 0;

    for (let i = 0; i < this.lstPayemnts.length; i++) {

      this.TotalPayments = (+this.TotalPayments) + (+this.lstPayemnts[i].PaymentAmount);
    }

  }

  AddPayemnts(type) {

    if (this.ValidatePayments()) {

      //let WeekName:string= this.from

      for (var i = 0; i < this.lstPayemnts.length; i++) {
        this.lstPayemnts[i].Show = 'true';


        if (this.lstPayemnts[i].SNO == this.EditPayRecNO) {


          this.lstPayemnts[i].ModeOfPayment = this.getControlValue(this.f.ModeOfPayment, 'string');
          this.lstPayemnts[i].PaymentAccountId = this.getControlValue(this.f.PaymentAccountId, 'int');

          this.lstPayemnts[i].PaymentAccountName = this.getControlValue(this.f.PaymentAccountName, 'string');
          this.lstPayemnts[i].PaymentAmount = this.getControlValue(this.f.PaymentAmount, 'int');
          this.lstPayemnts[i].InstrumentNo = this.getControlValue(this.f.InstrumentNo, 'string');
          this.lstPayemnts[i].InstrumentDate = this.getControlValue(this.f.InstrumentDate, 'string');
          this.lstPayemnts[i].PaymentNarration = this.getControlValue(this.f.PaymentNarration, 'string');

        }
      }
      if (this.EditPayRecNO == -1) {
        var res =
          ({
            SNO: this.SNOPy


            , ModeOfPayment: this.getControlValue(this.f.ModeOfPayment, 'string')
            , PaymentAccountId: this.getControlValue(this.f.PaymentAccountId, 'int')
            , PaymentAccountName: this.getControlValue(this.f.PaymentAccountName, 'string')
            , PaymentAmount: this.getControlValue(this.f.PaymentAmount, 'int')
            , InstrumentNo: this.getControlValue(this.f.InstrumentNo, 'string')
            , LineId: 0
            , InstrumentDate: this.getControlValue(this.f.InstrumentDate, 'string')
            , PaymentNarration: this.getControlValue(this.f.PaymentNarration, 'string')

            , Show: 'true'
          });

        if (this.lstPayemnts.length == 0) {
          this.lstPayemnts = [res];

        }
        else {
          this.lstPayemnts.push(res);

        }
      }
      this.EditPayRecNO = -1;


      this.SNOPy = this.lstPayemnts.length + 1;
      this.f.LineChanges.setValue(1);

      if (type == 'Close') {

        $("#btnCloseSalesInvoicePayments").click();
      }
      this.CalcPaymentTotal();
    }


  }
  LoadPaymentAccount() {
    var that = this;

    (<any>$("#drpPaymentAccount")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }

            return JSON.stringify({ "Operation": 'ViewChartOfAccounts', "Params": sstring, "Xml2": 'All', "Xml3": (that.getControlValue(that.f.ModeOfPayment, 'string')), "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.COAId;
            obj.text = obj.Name;


            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      // , templateResult: this.format
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });


    //       
    //       var AccountSelection = new Option(this.AccountName,this.COAId.toString(), true, true);
    // (<any> $('#drpAccount')).append(AccountSelection).trigger('change');


    // (<any> $('#drpAccount')).trigger({
    //    type: 'select2:select',
    //   params: {
    //        data: AccountSelection
    //    }
    // });


    //  $('#drpPaymentAccount').on('select2:open', function (e) {
    //    if (!that.HeaderAppend) {
    //       var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="33%"><b>Code</b></td> <td width="33%"><b>Name</b></td> <td width="34%"><b>Group</b></td> </tr > </tbody> </table>';
    //        $('.select2-search').append(html);
    //        //$('.select2-results').addClass('stock');
    //        that.HeaderAppend = true;
    //    }
    //  });

    var that = this;
    $('#drpPaymentAccount').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {


        that.f.PaymentAccountId.setValue((<any>e).params.data.id);
        that.f.PaymentAccountName.setValue((<any>e).params.data.text);

      }


    });


    $("#drpPaymentAccount").on("select2:unselecting", function (e) {


      that.f.PaymentAccountId.setValue(0);
      that.f.PaymentAccountName.setValue('');

    });

  }

  LoadTemplates() {

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
   

    this.APICall.DBCalling("TemplatesView", "", "All", "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
       

        this.lstTemplates = JSON.parse(res['Message']);

        if (this.lstTemplates.Table.length > 0) {
          this.lstTemplates = this.lstTemplates.Table;
        }
        $("#loaderParent").hide();
      });


  }

  TemplateTypeChange(event) {
    try {
     
      this.StoreSalesInvoice.TemplateType = event.value;
     this.LoadReference();

    }
    catch (e) { }
  }

  
  lstSelectedTaxdet: any = [];
  GstTaxbyHSNAndState(SACCode) {
    if (SACCode != '') {

      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      

      this.APICall.DBCalling("GstTaxbyHSNAndState", SACCode, this.TaxType, this.TransactionDate, this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          
          this.lstSelectedTaxdet = [];
          this.lstSelectedTaxdet = JSON.parse(res['Message']);



          if (this.lstSelectedTaxdet.Table.length > 0) {
            this.lstSelectedTaxdet = this.lstSelectedTaxdet.Table;
          }
          this.SelectedChargesCalc();
          $("#loaderParent").hide();
        });
    } else {
      this.SelectedChargesCalc();
    }

  }

  SelectedChargesCalc() {
   

    var TotalTax = 0;
    var ChargesAmount = (+this.f.ChargesAmount.value);








    for (let i = 0; i < this.lstSelectedTaxdet.length; i++) {
      if (this.lstSelectedTaxdet[i].TaxType == "CGST") {
        this.f.ChargesCGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
        this.f.ChargesCGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2) * ChargesAmount) / 100);

        TotalTax = TotalTax + ((+ this.f.ChargesCGSTAmount.value));

        try {

          this.f.CCGSTAccountId.setValue(this.lstSelectedTaxdet[i].PostAccountId);

        } catch (e) {

        }


      }

      if (this.lstSelectedTaxdet[i].TaxType == "SGST") {
        this.f.ChargesSGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
        this.f.ChargesSGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2) * ChargesAmount) / 100);
        TotalTax = TotalTax + ((+ this.f.ChargesSGSTAmount.value));

        try {

          this.f.CSGSTAccountId.setValue(this.lstSelectedTaxdet[i].PostAccountId);

        } catch (e) {

        }

      }

      if (this.lstSelectedTaxdet[i].TaxType == "IGST") {
        this.f.ChargesIGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
        this.f.ChargesIGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2) * ChargesAmount) / 100);
        TotalTax = TotalTax + ((+ this.f.ChargesIGSTAmount.value));
      }

      try {

        this.f.CIGSTAccountId.setValue(this.lstSelectedTaxdet[i].PostAccountId);

      } catch (e) {

      }
    }

    //this.f.TotalCharges.setValue(ChargesAmount+TotalTax);
    this.f.TotalCharges.setValue(ChargesAmount);
    this.CalculateTotals();
  }


  lstCharges: any = [];

  DisplayCgargesCOAId = 0;
  DispalyChargesAccountName = ''
  EditChRecNO = -1;

  SNOCh = 0;

  EditCharges(selectedRecord, SNO) {

    this.EditChRecNO = SNO;
    this.SNOCh = SNO;

    this.CreateSalesInvoice.patchValue({

      ChargesCOAId: selectedRecord.ChargesCOAId,
      ChargesCOAName: selectedRecord.ChargesCOAName,
      ChargesAmount: selectedRecord.ChargesAmount,
      ChargesNarration: selectedRecord.ChargesNarration,
      SACCode: selectedRecord.SACCode
    });
    try {
      this.GstTaxbyHSNAndState(selectedRecord.SACCode);
    } catch (e) {

    }
    this.DisplayCgargesCOAId = selectedRecord.ChargesCOAId;
    this.DispalyChargesAccountName = selectedRecord.ChargesCOAName;
  }
  AccountValueChange(data) {
   
    this.f.ChargesCOAId.setValue(data.COAId);
    this.f.ChargesCOAName.setValue(data.Name);
    this.DisplayCgargesCOAId = data.COAId;
    this.DispalyChargesAccountName = data.Name;
    this.f.SACCode.setValue(data.SACCode);
    this.GstTaxbyHSNAndState(data.SACCode);
  }

  RemoveCharges() {
    var sliceIndex = -1;
    let lstCharges=[];
    this.lstCharges.forEach((element ,index)=> {
      lstCharges[index]={...element};
    });
    
    this.lstCharges=lstCharges;
    for (var i = 0; i < this.lstCharges.length; i++) {
      this.lstCharges[i].Show = 'true';

      if (this.lstCharges[i].SNO == this.EditChRecNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstCharges.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstCharges.length; i++) {
        this.lstCharges[i].SNO = i + 1;
      }
    }

    this.EditChRecNO = -1;
    this.SNOCh = this.lstCharges.length + 1;
    this.f.LineChanges.setValue(1);
    $("#btnCloseSalesInvoiceCharges").click();
    this.CalculateTotals();
  }
  showchargesError = false;
  chargeserrormsg = "";
  ValidateCharges(): boolean {

    var validate = true;
    this.showchargesError = false;

    if (
      this.getControlValue(this.f.ChargesCOAName, 'string') != ""
      && this.getControlValue(this.f.ChargesAmount, 'string') != ""

      && this.getControlValue(this.f.ChargesAmount, 'int') != "0"



    ) {

      for (var i = 0; i < this.lstCharges.length; i++) {
        if (this.EditChRecNO != this.lstCharges[i].SNO &&
          this.lstCharges[i].ChargesCOAName == this.getControlValue(this.f.ChargesCOAName, 'string')
        ) {
          validate = false;
          this.showchargesError = true;
          this.chargeserrormsg = "Already exists!";
          break;

        }

      }
    } else {
      validate = false;
      this.showchargesError = true;
      this.chargeserrormsg = "Invalid Data!";
    }
    return validate;



  }
  OnChargesAdd() {

    this.f.ChargesCOAId.setValue(0);
    this.f.ChargesCOAName.setValue('');
    this.f.ChargesAmount.setValue(0);
    this.f.SACCode.setValue('');
    this.f.ChargesCGSTPer.setValue(0);
    this.f.ChargesCGSTAmount.setValue(0);
    this.f.ChargesSGSTPer.setValue(0);

    this.f.CSGSTAccountId.setValue(0);
    this.f.CCGSTAccountId.setValue(0);
    this.f.CIGSTAccountId.setValue(0);

    this.f.ChargesSGSTAmount.setValue(0);
    this.f.ChargesIGSTPer.setValue(0);
    this.f.ChargesIGSTAmount.setValue(0);
    this.f.TotalCharges.setValue(0);



    this.f.ChargesNarration.setValue('');
    this.DisplayCgargesCOAId = 0;
    this.DispalyChargesAccountName = '';
  }

  AddCharges(type) {


    if (this.ValidateCharges()) {

      //let WeekName:string= this.from

      for (var i = 0; i < this.lstCharges.length; i++) {
        this.lstCharges[i].Show = 'true';


        if (this.lstCharges[i].SNO == this.EditChRecNO) {


          this.lstCharges[i].ChargesCOAId = this.getControlValue(this.f.ChargesCOAId, 'int');
          this.lstCharges[i].ChargesCOAName = this.getControlValue(this.f.ChargesCOAName, 'string');

          this.lstCharges[i].ChargesAmount = this.getControlValue(this.f.ChargesAmount, 'int');
          this.lstCharges[i].ChargesNarration = this.getControlValue(this.f.ChargesNarration, 'string');
          this.lstCharges[i].SACCode = this.getControlValue(this.f.SACCode, 'string');
          this.lstCharges[i].ChargesCGSTPer = this.getControlValue(this.f.ChargesCGSTPer, 'int');
          this.lstCharges[i].ChargesCGSTAmount = this.getControlValue(this.f.ChargesCGSTAmount, 'int');
          this.lstCharges[i].ChargesSGSTPer = this.getControlValue(this.f.ChargesSGSTPer, 'int');

          this.lstCharges[i].CSGSTAccountId = this.getControlValue(this.f.CSGSTAccountId, 'int');
          this.lstCharges[i].CCGSTAccountId = this.getControlValue(this.f.CCGSTAccountId, 'int');
          this.lstCharges[i].CIGSTAccountId = this.getControlValue(this.f.CIGSTAccountId, 'int');




          this.lstCharges[i].ChargesSGSTAmount = this.getControlValue(this.f.ChargesSGSTAmount, 'int');
          this.lstCharges[i].ChargesIGSTPer = this.getControlValue(this.f.ChargesIGSTPer, 'int');
          this.lstCharges[i].ChargesIGSTAmount = this.getControlValue(this.f.ChargesIGSTAmount, 'int');
          this.lstCharges[i].ChargesTax = (+this.getControlValue(this.f.ChargesCGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesSGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesIGSTAmount, 'int'));


          this.lstCharges[i].TotalCharges = this.getControlValue(this.f.TotalCharges, 'int');






        }
      }
      if (this.EditChRecNO == -1) {
        var res =
          ({
            SNO: this.SNOCh


            , ChargesCOAId: this.getControlValue(this.f.ChargesCOAId, 'int')
            , ChargesCOAName: this.getControlValue(this.f.ChargesCOAName, 'string')
            , ChargesAmount: this.getControlValue(this.f.ChargesAmount, 'int')
            , ChargesNarration: this.getControlValue(this.f.ChargesNarration, 'string')
            , SACCode: this.getControlValue(this.f.SACCode, 'string')
            , LineId: 0
            , ChargesCGSTPer: this.getControlValue(this.f.ChargesCGSTPer, 'int')
            , ChargesCGSTAmount: this.getControlValue(this.f.ChargesCGSTAmount, 'int')
            , ChargesSGSTPer: this.getControlValue(this.f.ChargesSGSTPer, 'int')

            , CSGSTAccountId: this.getControlValue(this.f.CSGSTAccountId, 'int')
            , CCGSTAccountId: this.getControlValue(this.f.CCGSTAccountId, 'int')
            , CIGSTAccountId: this.getControlValue(this.f.CIGSTAccountId, 'int')



            , ChargesSGSTAmount: this.getControlValue(this.f.ChargesSGSTAmount, 'int')
            , ChargesIGSTPer: this.getControlValue(this.f.ChargesIGSTPer, 'int')
            , ChargesIGSTAmount: this.getControlValue(this.f.ChargesIGSTAmount, 'int')
            , ChargesTax: (+this.getControlValue(this.f.ChargesCGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesSGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesIGSTAmount, 'int'))


            , TotalCharges: this.getControlValue(this.f.TotalCharges, 'int')
            , Show: 'true'
          });

        if (this.lstCharges.length == 0) {
          this.lstCharges = [res];

        }
        else {
          this.lstCharges.push(res);

        }
      }
      this.EditChRecNO = -1;

      this.f.ChargesCOAId.setValue(0);
      this.f.ChargesCOAName.setValue('');
      this.f.ChargesAmount.setValue(0);
      this.f.ChargesNarration.setValue('');

      this.SNOCh = this.lstCharges.length + 1;
      this.f.LineChanges.setValue(1);

      if (type == 'Close') {

        $("#btnCloseSalesInvoiceCharges").click();
      }
      this.CalculateTotals();
    }

    //}

  }




  ShowStockSelection = true;

  CurrentTime: any;

  PartyGSTNo = "";

  windowScroll(ControlName) {
   
    var element = document.getElementById(ControlName);
    var rect = element.getBoundingClientRect();

    window.scrollTo(rect.left, rect.top);
  }

  OnPrint() {
   
    this.SalesInvoiceData = this;
  }
  ValidateStockAllotment(): boolean {
   
    var val = true;
    var TotalItemQty = 0;
    var TotalStockItemQty = 0;
    for (let i = 0; i < this.lstSalesInvoiceItems.length; i++) {

      TotalItemQty = (+TotalItemQty) + (+this.lstSalesInvoiceItems[i].Qty);

    }

    for (let i = 0; i < this.lstSalesInvoiceItemsStock.length; i++) {

      TotalStockItemQty = (+TotalStockItemQty) + (+this.lstSalesInvoiceItemsStock[i].Qty);

    }

    if ( TotalItemQty===0 || TotalStockItemQty===0 ||     TotalItemQty != TotalStockItemQty) {

      val = false;
    }


    return val;
  }
  submitted = false;
  //  showStockError=false;
  OnSave() {
   
    //this.showStockError=false;
    this.submitted = true;
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val() + '' + $("#TransactionTime").val());
    this.f.PartyId.setValue(this.DisplayCustomerId);

    this.f.TransactionTime.setValue($("#TransactionTime").val());

    if (this.CreateSalesInvoice.invalid) {
      var Cvalid = true;


      if (this.f.PartyId.invalid && Cvalid) {

        this.windowScroll('PartyId');
        Cvalid = false;
      }

      if (this.f.TransactionDate.invalid && Cvalid) {

        this.windowScroll('TransactionDate');
        Cvalid = false;
      }


      if (this.f.RequiredDate.invalid && Cvalid) {

        this.windowScroll('RequiredDate');
        Cvalid = false;
      }
      if (this.f.Email.invalid && Cvalid) {

        this.windowScroll('Email');
        Cvalid = false;
      }


      if (this.f.TransactionTime.invalid && Cvalid) {

        this.windowScroll('TransactionTime');
        Cvalid = false;
      }




      return;
    }
    else {
      if (this.ValidateStockAllotment()) {

        if (this.ValidatePaymentTermDate()) {
          this.SaveTransaction();
        }
        else {
          (window as any).swal("Cancelled", "Select Payment Terms Date", "error");
        }
      } else {
        (window as any).swal("Cancelled", "Invalid Stock Allotment", "error");
        // $("#Stock-tab").click();

        // $('#ProductTab a[href="#Stock"]').trigger('click');
        //this.showStockError=true;

      }
    }
  }




  ValidatePaymentTermDate(): boolean {
    var chk = true;

    for (let i = 0; i < this.lstTermsChild.length; i++) {

      if ((typeof (this.lstTermsChild[i].TermDate) == 'undefined' ? '' : this.lstTermsChild[i].TermDate) == '') {

        chk = false;
        break;
      }
    }

    return chk
  }

  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.ctrlKey || event.metaKey) {

      switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
          event.preventDefault();
          this.OnSave();

          break;

        case 'a':

          event.preventDefault();
          this.ClearViewData();

          break;

        case 'd':
          event.preventDefault();
          this.OnDelete();
          break;
        case 'o':
          event.preventDefault();
          // this.Search();

          break;
      }
    }

  }
  OnDelete() {

    var that = this;


    (window as any).swal({
      icon: "warning",
      title: "Are you sure?",
      text: "You will not be able to recover this record!",

      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {

      if (isConfirm) {

        that.DeleteSalesInvoice();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }

    });

  }

  ClearViewDetails() {
    var that = this;


    (window as any).swal({
      icon: "warning",
      title: "Are you sure?",
      text: "You will not be able to recover this Details!",

      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {

      if (isConfirm) {

        that.ClearViewData();
      } else {
        (window as any).swal("Cancelled", "Your details  is safe:)", "error");
      }

    });
  }
  DeleteSalesInvoice() {

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    // if (this.ModifiedDate.toString().includes('India')) {

    //   var date = new Date(this.ModifiedDate);


    //   this.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    // }
    var xml1 = '<NewDataSet><Table1>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'
      + '</Table1></NewDataSet>';

     
    this.APICall.DBCalling("DeleteSalesInvoice", xml1, "", "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {

        $("#loaderParent").hide();
        
        this.DbResult = JSON.parse(res['Message']);

        //  var l=this.DbResult.Table[0].length;
        // var tr=this.DbResult.Table[0].DBresult;
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          this.ClearViewData();

          (window as any).swal({
            icon: 'success',
            title: 'Information!',
            text: 'Record Deleted successfully.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-success'
          });


this.NavigateToOverview();




        }
        else {
          (window as any).swal({
            icon: 'error',
            title: 'Error!',
            text: 'failed.!',
            confirmButtonText: 'Dismiss',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-danger'
          });
        }



      },
      err => {
        (window as any).swal({
          icon: 'error',
          title: 'Error!',
          text: 'Network Error Please Try Again .!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-danger'
        });
      }
    );
  }

  NavigateToOverview()
  {
    try
    {
      this.StoreSalesInvoice=new StoreSalesInvoice;
      this.APICall.UpdatedSelectedPath('./Sales/SalesInvoice');
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
      this.StoreSalesInvoice.TabId=ActivatedRoute;
      this.store.dispatch(new  TabStore.AddTab(Object.assign([], this.StoreSalesInvoice)));
    
      this.router.navigate(['Sales/SalesInvoice']);
    }
    catch(e){}
  }
 
  ClearViewData() {
    this.submitted = false;
    this.ModifiedDate = "";
    $("#drpOrder").val('').trigger('change');
    this.CreateSalesInvoice.patchValue(

      {
        //    SequenceNumberId:0,
        Contactno: '',
        PartyName: '',
        Email: '',
        RequiredDate: '',
        Billto: '',
        Shipto: 0,
        InvoiceType: 'Invoice',
        ShiptoAddress: '',
        Terms: '',
        TermsandConditions: '',
        PaymentTerms: '',
        TransactionTime: '',
        TransactionDate: '',
        TransactionId: 0,
        TransactionNo: '',
        CommitionPer: 0,
        SaleType: 'Credit',
        CommitionAmount: 0,
        CommitionPartyName: '',
        CommitionPartyId: 0,
        PartyId: 0,
        TransportId: 0,
        Salesaccount: this.DefaultSalesAccount,
        Discountaccount: this.DefaultDiscountAccount,
        CommissionPayableAccount: this.DefaultCommPayableAccount,
        Commissionaccount: this.DefaultCommExpenAccount,

        Area: '',
        TransportName: '',

        BillRefNo: '',
        CommissionNotes: '',
        Notes: '',
        SearchString: '',
        searchPartNo: '',
        searchDescription: '',
        searchMake: '',
        searchHSN: '',
        TransportMode: '',
        TransportName1: '',
        TrackingNo: '',
        TransportDate: '',
        VehicleNo: '',
        DriverName: '',
        CustomerRefNo: '',
        ProductReference: '',

        PersonName: '',
        PhoneNo: ''

      }
    );
   
    this.PartyGSTNo = '';
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);

    var rdate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    $("#RequiredDate").val(rdate)
    $("#drpCommitionPartyAccount").val('').trigger('change');

    $("#TransactionDate").val(rdate)
    $("#TransactionTime").val(this.CurrentTime)
    this.lstSalesInvoiceItems = null;
    this.lstSalesInvoiceItems = [];
    this.lstSalesInvoiceItemsStock = [];
    this.lstPdfDocument=[];
    this.lstTermsChild = null;
    this.lstTermsChild = [];
    this.DisplayCustomerId = 0;
    this.DispalyCustomerName = "";
    this.DisplaySequenceNumberId = 0;
    this.TotalGross = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    this.lstCharges = [];
    this.TotalCharges = 0;
    this.lstPayemnts = [];
    this.TotalPayments = 0;
    this.StoreSalesInvoice = new StoreSalesInvoice;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreSalesInvoice.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreSalesInvoice));

  }

  convertDate(str) {

    var splitted = str.split(" ", 10);
    var tempdate = splitted[0];

    var date = new Date(tempdate),
      mnth: any = ("0" + (date.getMonth() + 1)).slice(-2),
      day: any = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    var resDate = [mnth, day, date.getFullYear()].join("-");

    return resDate + " " + hours + ":" + minutes;

  }
  lstCustomer: any = [];
  receiptAcntId: any;
  GetAccountId() {
   
    if (AppSettings.ShowLoaderOnView) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }

   
    var sstring = this.getControlValue(this.f.PartyId, 'int');

    this.APICall.DBCalling("ViewCustomers", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
       
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstCustomer = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstCustomer = this.lstDbResult.Table;
          for (var i = 0; i < this.lstCustomer.length; i++) {
            var result = this.lstCustomer.filter((x) => { return x.CustomerId == sstring; });

          }
         
          this.lstCustomer = result
          this.receiptAcntId = this.lstCustomer[0].coaid
          this.SaveRecieptAdjustment();
        }

        $("#loaderParent").hide();
      });
  }

  SalesInvoiceEditDetails() {
   debugger;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todaydate = mm + '/' + dd + '/' + yyyy;
    var xml1 = "";
    var rows = "";
    for (var i = 0; i < this.lstSalesInvoiceEditDetails.length; i++) {
      this.CreatedID = this.tempCtID;
      rows = rows + '<Table1>'
        + '<LineID>' + this.lstSalesInvoiceEditDetails[i].LineID + '</LineID>'
        + '<ItemId>' + this.lstSalesInvoiceEditDetails[i].ItemId + '</ItemId>'
        + '<MakeId>' + this.lstSalesInvoiceEditDetails[i].MakeId + '</MakeId>'
        + '<UomId>' + this.lstSalesInvoiceEditDetails[i].UomId + '</UomId>'
        + '<Price>' + this.lstSalesInvoiceEditDetails[i].Price + '</Price>'
        + '<CreatedID>' + this.CreatedID + '</CreatedID>'
        + '<ModifiedBy>' + this.APICall.GetUserName() + '</ModifiedBy>'
        + '<Qty>' + this.lstSalesInvoiceEditDetails[i].Qty + '</Qty>'
        + '<Discount>' + this.lstSalesInvoiceEditDetails[i].Discount + '</Discount>'
        + '<ModifiedDate>' + todaydate + '</ModifiedDate>'
        + '<SalesInvoiceID>' + this.tempsalesinvoiceid + '</SalesInvoiceID></Table1>'

    }
    xml1 = '<NewDataSet>' + rows + '</NewDataSet>';
   
    this.APICall.DBCalling("SalesInvoiceEditDetails", xml1, "", "", "").subscribe(
      (res: Response) => {
       debugger; 
        this.DbResult = JSON.parse(res['Message']);
        $("#loaderParent").hide();


      },

    );

  }

  SaveRecieptAdjustment() {
   
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todaydate = mm + '/' + dd + '/' + yyyy;
    var xml1 = '<NewDataSet><Table1>'
      + '<ID>' + 0 + '</ID>'
      + '<Date>' + todaydate + '</Date>'

      + '<InvoiceID>' + this.InvoiceID + '</InvoiceID>'
      + '<invoiceno>' + this.RecInvoiceNo + '</invoiceno>'

      + '<NetAmount>' + this.Total + '</NetAmount>'
      + '<AdujstableAmount>' + 0 + '</AdujstableAmount>'
      + '<AccountId>' + this.receiptAcntId + '</AccountId>'
      + '<CustomerId>' + this.getControlValue(this.f.PartyId, 'int') + '</CustomerId>'

      + '<Paidstatus>' + 0 + '</Paidstatus>'
      + '<PendingAmount>' + this.Total + '</PendingAmount>'
      + '<PaidAmount>' + 0 + '</PaidAmount>'

      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'

      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'

      + '</Table1></NewDataSet>';

   
    this.APICall.DBCalling("RecieptsAdjustSave", xml1, "", "", "").subscribe(
      (res: Response) => {
       
        this.DbResult = JSON.parse(res['Message']);
        $("#loaderParent").hide();


      },

    );
  }

  replaceAll(str, find, replace) {
    var escapedFind = find.replace('<br>', "\n");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  ModifiedDate = "";
  DbResult: any = [];
  InvoiceID: any;
  RecInvoiceNo: any;
  SaveTransaction() {
   
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());
   
    this.f.TransactionTime.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());


    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    this.f.TransactionTime.setValue(this.convertDate(this.getControlValue(this.f.TransactionTime, 'string')));
    this.f.TransactionDate.setValue(this.convertDate(this.getControlValue(this.f.TransactionDate, 'string')));

    var xml1 = '<NewDataSet><Table1>'

      + '<ShiptoAddress>' + this.getControlValue(this.f.ShiptoAddress, 'string') + '</ShiptoAddress>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<PartyId>' + this.getControlValue(this.f.PartyId, 'int') + '</PartyId>'
      + '<Billto>' + this.getControlValue(this.f.Billto, 'string') + '</Billto>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'

      + '<InvoiceType>' + this.getControlValue(this.f.InvoiceType, 'string') + '</InvoiceType>'
      + '<CashAccountId>' + this.StoreAccountingSettings.DefaultCashAccountId + '</CashAccountId>'

      + '<TransportId>' + this.getControlValue(this.f.TransportId, 'string') + '</TransportId>'
      + '<Area>' + this.getControlValue(this.f.Area, 'string') + '</Area>'
      + '<TransportName>' + this.getControlValue(this.f.TransportName, 'string') + '</TransportName>'

      + '<TransportMode>' + this.getControlValue(this.f.TransportMode, 'string') + '</TransportMode>'
      + '<TransportName1>' + this.getControlValue(this.f.TransportName1, 'string') + '</TransportName1>'
      + '<TransportDate>' + this.getControlValue(this.f.TransportDate, 'string') + '</TransportDate>'
      + '<TrackingNo>' + this.getControlValue(this.f.TrackingNo, 'string') + '</TrackingNo>'
      + '<VehicleNo>' + this.getControlValue(this.f.VehicleNo, 'string') + '</VehicleNo>'
      + '<DriverName>' + this.getControlValue(this.f.DriverName, 'string') + '</DriverName>'
      + '<PersonName>' + this.getControlValue(this.f.PersonName, 'string') + '</PersonName>'
      + '<PhoneNo>' + this.getControlValue(this.f.PhoneNo, 'string') + '</PhoneNo>'
      + '<CustomerRefNo>' + this.getControlValue(this.f.CustomerRefNo, 'string') + '</CustomerRefNo>'
      + '<ProductReference>' + this.StoreSalesInvoice.ProductReference + '</ProductReference>'



      + '<BillRefNo>' + this.getControlValue(this.f.BillRefNo, 'string') + '</BillRefNo>'
      + '<SaleType>' + this.getControlValue(this.f.SaleType, 'string') + '</SaleType>'

      + '<CommitionPartyId>' + this.getControlValue(this.f.CommitionPartyId, 'int') + '</CommitionPartyId>'
      + '<CommitionAmount>' + this.getControlValue(this.f.CommitionAmount, 'int') + '</CommitionAmount>'
      + '<CommitionPer>' + this.getControlValue(this.f.CommitionPer, 'int') + '</CommitionPer>'

      + '<Salesaccount>' + this.getControlValue(this.f.Salesaccount, 'int') + '</Salesaccount>'
      + '<Discountaccount>' + this.getControlValue(this.f.Discountaccount, 'int') + '</Discountaccount>'
      + '<CommissionPayableAccount>' + this.getControlValue(this.f.CommissionPayableAccount, 'int') + '</CommissionPayableAccount>'
      + '<Commissionaccount>' + this.getControlValue(this.f.Commissionaccount, 'int') + '</Commissionaccount>'
      + '<Shipto>' + this.getControlValue(this.f.Shipto, 'string') + '</Shipto>'
      + '<TransactionTime>' + this.getControlValue(this.f.TransactionTime, 'string') + '</TransactionTime>'
      + '<TransactionDate>' + this.getControlValue(this.f.TransactionDate, 'string') + '</TransactionDate>'
      + '<ModifiedDate>'+this.ModifiedDate +'</ModifiedDate>'
      + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
      + '<CurrencyId>' + this.APICall.GetCurrencyId() + '</CurrencyId>'
      + '<RequiredDate>' + this.getControlValue(this.f.RequiredDate, 'string') + '</RequiredDate>'
      + '<TermsandConditions>' + this.getControlValue(this.f.TermsandConditions, 'string') + '</TermsandConditions>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<TotalGross>' + this.TotalGross + '</TotalGross>'
      + '<PaymentTerms>' + this.getControlValue(this.f.PaymentTerms, 'int') + '</PaymentTerms>'
      + '<ReferenceType>' + this.StoreSalesInvoice.TemplateType + '</ReferenceType >'
      + '<ReferenceNo>' + this.ReferenceNo + '</ReferenceNo >'
      + '<TotalCharges>' + this.TotalCharges + '</TotalCharges >'
      + '<Notes>' + this.getControlValue(this.f.Notes, 'string') + '</Notes >'
      + '<CommissionNotes>' + this.getControlValue(this.f.CommissionNotes, 'string') + '</CommissionNotes >'
      + '<TotalDiscount>' + this.TotalDiscount + '</TotalDiscount >'
      + '<TotalTax>' + this.TotalTax + '</TotalTax>'
      + '<Total>' + this.Total + '</Total>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '<Terms>' + this.getControlValue(this.f.Terms, 'int') + '</Terms>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'
      + '<AfterDiscount>' + this.AfterDiscount + '</AfterDiscount>'
      + '<TotalSGST>' + this.TotalSGST + '</TotalSGST>'
      + '<TotalCGST>' + this.TotalCGST + '</TotalCGST>'
      + '<TotalIGST>' + this.TotalIGST + '</TotalIGST>'
      + '<TaxType>' + this.TaxType + '</TaxType>'
      + '<BillToStateName>' + this.BillToStateName + '</BillToStateName>'
      + '<BillToStateCode>' + this.BillToStateCode + '</BillToStateCode>'
      + '<Contactno>' + this.getControlValue(this.f.Contactno, 'string') + '</Contactno>'
      + '<BCDAmount>' + this.TotalBCD + '</BCDAmount>'
      + '<SWSAmount>' + this.TotalSWS + '</SWSAmount>'
      + '<TemplateType>' + this.StoreSalesInvoice.TemplateType + '</TemplateType>'
      + '</Table1></NewDataSet>';

   
    var xml2 = "";
    var rows = "";
    var note = "";
    for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {

      rows = rows + '<Table1>'
        + '<LineId>' + this.lstSalesInvoiceItems[i].LineId + '</LineId>'
        + '<Description>' + this.lstSalesInvoiceItems[i].Description + '</Description>'
        + '<Partno>' + this.lstSalesInvoiceItems[i].Partno + '</Partno>'
        + '<Note>' + (this.lstSalesInvoiceItems[i].Note.toString()).replaceAll(' <br> ', '\n') + '</Note>'
        + '<ItemId>' + this.lstSalesInvoiceItems[i].ItemId + '</ItemId>'
        + '<MakeId>' + this.lstSalesInvoiceItems[i].MakeId + '</MakeId>'
        + '<UOMId>' + this.lstSalesInvoiceItems[i].UOMId + '</UOMId>'
        + '<Make>' + this.lstSalesInvoiceItems[i].Make + '</Make>'
        + '<UOM>' + this.lstSalesInvoiceItems[i].UOM + '</UOM>'
        + '<Rate>' + this.lstSalesInvoiceItems[i].Rate + '</Rate>'
        + '<Qty>' + this.lstSalesInvoiceItems[i].Qty + '</Qty>'
        + '<Gross>' + this.lstSalesInvoiceItems[i].Gross + '</Gross>'
        + '<DiscountPercentage>' + this.lstSalesInvoiceItems[i].DiscountPercentage + '</DiscountPercentage>'
        + '<DiscountAmount>' + this.lstSalesInvoiceItems[i].DiscountAmount + '</DiscountAmount>'
        + '<CGST>' + this.lstSalesInvoiceItems[i].CGST + '</CGST>'
        + '<CGSTAmount>' + this.lstSalesInvoiceItems[i].CGSTAmount + '</CGSTAmount>'
        + '<SGST>' + this.lstSalesInvoiceItems[i].SGST + '</SGST>'
        + '<SGSTAmount>' + this.lstSalesInvoiceItems[i].SGSTAmount + '</SGSTAmount>'
        + '<IGST>' + this.lstSalesInvoiceItems[i].IGST + '</IGST>'
        + '<IGSTAmount>' + this.lstSalesInvoiceItems[i].IGSTAmount + '</IGSTAmount>'
        + '<TotalTax>' + this.lstSalesInvoiceItems[i].TotalTax + '</TotalTax>'
        + '<NetTotal>' + this.lstSalesInvoiceItems[i].NetTotal + '</NetTotal>'
        + '<TaxType>' + this.lstSalesInvoiceItems[i].TaxType + '</TaxType>'
        + '<FormName>SalesInvoice</FormName>'

        + '<SGSTAccountId>' + this.lstSalesInvoiceItems[i].SGSTAccountId + '</SGSTAccountId>'
        + '<CGSTAccountId>' + this.lstSalesInvoiceItems[i].CGSTAccountId + '</CGSTAccountId>'
        + '<IGSTAccountId>' + this.lstSalesInvoiceItems[i].IGSTAccountId + '</IGSTAccountId>'
        + '<HSN>' + this.lstSalesInvoiceItems[i].HSN + '</HSN>'

        + '<BCDPer>' + this.lstSalesInvoiceItems[i].BCDPer + '</BCDPer>'
        // + '<BCDAccountId>' + this.lstSalesInvoiceItems[i].BCDAccountId + '</BCDAccountId>'
        // + '<SWSAccountId>' + this.lstSalesInvoiceItems[i].SWSAccountId + '</SWSAccountId>'
        + '<BCDAccountId>0</BCDAccountId>'
        + '<SWSAccountId>0</SWSAccountId>'
        + '<BCDAmount>' + this.lstSalesInvoiceItems[i].BCDAmount + '</BCDAmount>'
        + '<SWSPer>' + this.lstSalesInvoiceItems[i].SWSPer + '</SWSPer>'
       
        + '<SWSAmount>' + this.lstSalesInvoiceItems[i].SWSAmount + '</SWSAmount>'
        + '<RefType1>' + this.lstSalesInvoiceItems[i].RefType1 + '</RefType1>'
        + '<RefNo2>' + this.lstSalesInvoiceItems[i].RefNo2 + '</RefNo2>'
        + '<RefId>' + this.lstSalesInvoiceItems[i].RefId + '</RefId>'        
        + '<RefDate3>' + this.lstSalesInvoiceItems[i].RefDate3 + '</RefDate3>'
        + '<RefLineId>' + this.lstSalesInvoiceItems[i].RefLineId + '</RefLineId>'
        + '</Table1>'
    }
    xml2 = '<NewDataSet>' + rows + '</NewDataSet>';

    var xml3 = "";

    var rows = "";
   
    for (var i = 0; i < this.lstTermsChild.length; i++) {

      rows = rows + '<Table1>'
        + '<Amount>' + this.lstTermsChild[i].Amount + '</Amount>'
        + '<PayPercentage>' + this.lstTermsChild[i].PayPercentage + '</PayPercentage>'
        + '<PayName>' + this.lstTermsChild[i].PayName + '</PayName>'
        + '<TermDetailsID>' + this.lstTermsChild[i].TermDetailsID + '</TermDetailsID>'
        + '<TermDate>' + this.lstTermsChild[i].TermDate + '</TermDate>'
        + '<SalesInvoiceTermDetailsId>' + (typeof (this.lstTermsChild[i].SalesInvoiceTermDetailsId) == 'undefined' ? 0 : this.lstTermsChild[i].SalesInvoiceTermDetailsId) + '</SalesInvoiceTermDetailsId></Table1>'

    }

    var rows1 = "";
    for (var i = 0; i < this.lstCharges.length; i++) {
     
      rows1 = rows1 + '<Charges>'
        + '<LineId>' + this.lstCharges[i].LineId + '</LineId>'
        + '<ChargesAmount>' + this.lstCharges[i].ChargesAmount + '</ChargesAmount>'
        + '<ChargesCOAId>' + this.lstCharges[i].ChargesCOAId + '</ChargesCOAId>'

        + '<ChargesCGSTPer>' + this.lstCharges[i].ChargesCGSTPer + '</ChargesCGSTPer>'
        + '<ChargesCGSTAmount>' + this.lstCharges[i].ChargesCGSTAmount + '</ChargesCGSTAmount>'
        + '<ChargesSGSTPer>' + this.lstCharges[i].ChargesSGSTPer + '</ChargesSGSTPer>'


        + '<CCGSTAccountId>' + (typeof (this.lstCharges[i].CCGSTAccountId) == 'undefined' ? 0 : this.lstCharges[i].CCGSTAccountId) + '</CCGSTAccountId>'
        + '<CSGSTAccountId>' + (typeof (this.lstCharges[i].CSGSTAccountId) == 'undefined' ? 0 : this.lstCharges[i].CSGSTAccountId) + '</CSGSTAccountId>'
        + '<CIGSTAccountId>' + (typeof (this.lstCharges[i].CIGSTAccountId) == 'undefined' ? 0 : this.lstCharges[i].CIGSTAccountId) + '</CIGSTAccountId>'


        + '<ChargesSGSTAmount>' + this.lstCharges[i].ChargesSGSTAmount + '</ChargesSGSTAmount>'
        + '<ChargesIGSTPer>' + this.lstCharges[i].ChargesIGSTPer + '</ChargesIGSTPer>'
        + '<ChargesIGSTAmount>' + this.lstCharges[i].ChargesIGSTAmount + '</ChargesIGSTAmount>'

        + '<ChargesTotalTax>' + ((+this.lstCharges[i].ChargesCGSTAmount) + (+this.lstCharges[i].ChargesSGSTAmount) + (+this.lstCharges[i].ChargesIGSTAmount)) + '</ChargesTotalTax>'

        + '<SACCode>' + this.lstCharges[i].SACCode + '</SACCode>'
        + '<TotalCharges>' + this.lstCharges[i].TotalCharges + '</TotalCharges>'




        + '<ChargesNarration>' + this.lstCharges[i].ChargesNarration + '</ChargesNarration></Charges>'

    }

    var rows2 = "";
    for (var i = 0; i < this.lstPayemnts.length; i++) {

      rows1 = rows1 + '<Payments>'
        + '<LineId>' + this.lstPayemnts[i].LineId + '</LineId>'
        + '<ModeOfPayment>' + this.lstPayemnts[i].ModeOfPayment + '</ModeOfPayment>'
        + '<PaymentAccountId>' + this.lstPayemnts[i].PaymentAccountId + '</PaymentAccountId>'

        + '<PaymentAmount>' + this.lstPayemnts[i].PaymentAmount + '</PaymentAmount>'
        + '<InstrumentNo>' + this.lstPayemnts[i].InstrumentNo + '</InstrumentNo>'
        + '<InstrumentDate>' + this.lstPayemnts[i].InstrumentDate + '</InstrumentDate>'



        + '<PaymentNarration>' + this.lstPayemnts[i].PaymentNarration + '</PaymentNarration></Payments>'

    }

    xml3 = '<NewDataSet>' + rows  + rows1 + rows2 + '</NewDataSet>';


    var xml4 = "";
    var rows3 = "";

    for (var i = 0; i < this.lstSalesInvoiceItemsStock.length; i++) {

      rows3 = rows3 + '<Table1>'
        + '<LineId>' + this.lstSalesInvoiceItemsStock[i].LineId + '</LineId>'

        + '<Partno>' + this.lstSalesInvoiceItemsStock[i].Partno + '</Partno>'

        + '<ItemId>' + this.lstSalesInvoiceItemsStock[i].ItemId + '</ItemId>'
        + '<MakeId>' + this.lstSalesInvoiceItemsStock[i].MakeId + '</MakeId>'
        + '<UOMId>' + this.lstSalesInvoiceItemsStock[i].UOMId + '</UOMId>'
        + '<Make>' + this.lstSalesInvoiceItemsStock[i].Make + '</Make>'
        + '<UOM>' + this.lstSalesInvoiceItemsStock[i].UOM + '</UOM>'
        + '<Rate>' + this.lstSalesInvoiceItemsStock[i].Rate + '</Rate>'

        + '<Qty>' + this.lstSalesInvoiceItemsStock[i].Qty + '</Qty>'
        + '<LocationId>' + this.lstSalesInvoiceItemsStock[i].LocationId + '</LocationId>'
        + '<BinId>' + this.lstSalesInvoiceItemsStock[i].BinId + '</BinId>'
        + '<Locationname>' + this.lstSalesInvoiceItemsStock[i].Locationname + '</Locationname>'
        + '<RefLineId>' + this.lstSalesInvoiceItemsStock[i].RefLineId + '</RefLineId>'
        + '<BinName>' + this.lstSalesInvoiceItemsStock[i].BinName + '</BinName></Table1>'
       
    }
    xml4 = '<NewDataSet>' + rows3 + '</NewDataSet>';

   
    this.APICall.DBCalling("SaveSalesInvoice", xml1, xml2, xml3, xml4).subscribe(
      (res: Response) => {

       
        $("#loaderParent").hide();
        // this.DbResult= (res);
        this.submitted=false;
        this.DbResult = JSON.parse(res['Message']);

        //  var l=this.DbResult.Table[0].length;
        // var tr=this.DbResult.Table[0].DBresult;
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          //  this.InvoiceID=this.DbResult.Table[0].TransactionId;
          //  this.RecInvoiceNo=this.DbResult.Table[0].TransactionNo;

          //  this.GetAccountId();
          this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
          if ((+this.getControlValue(this.f.TransactionId, 'int')) > 0) {
           
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });

          //  this.router.navigate(['Sales/SalesInvoice']);
           
            var templstSalesInvoiceItems: any = [];
            this.tempsalesinvoiceid = this.f.TransactionId.value
            if (this.lstSalesInvoiceItems.length == this.lstSalesInvoiceEditDetailstemp.length) {
              for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
                for (var j = 0; j < this.lstSalesInvoiceEditDetailstemp.length; j++) {

                 
                  if (this.lstSalesInvoiceItems[i].Partno == this.lstSalesInvoiceEditDetailstemp[j].Partno) {
                    if (this.lstSalesInvoiceItems[i].Partno == this.lstSalesInvoiceEditDetailstemp[j].Partno &&
                      this.lstSalesInvoiceItems[i].Make == this.lstSalesInvoiceEditDetailstemp[j].Make &&
                      this.lstSalesInvoiceItems[i].UOM == this.lstSalesInvoiceEditDetailstemp[j].UOM &&
                      this.lstSalesInvoiceItems[i].Rate == this.lstSalesInvoiceEditDetailstemp[j].Rate &&
                      this.lstSalesInvoiceItems[i].Qty == this.lstSalesInvoiceEditDetailstemp[j].Qty &&
                      this.lstSalesInvoiceItems[i].DiscountAmount == this.lstSalesInvoiceEditDetailstemp[j].DiscountAmount) {

                    }
                    else {
                     
                      templstSalesInvoiceItems.push(this.lstSalesInvoiceItems[i]);
                      break;
                    }
                  }



                }
              }
              this.lstSalesInvoiceItems = templstSalesInvoiceItems;
            }
            else {

            }

            this.SalesInvoiceEditDetails();
          } else {
            //  this.CreateBranches.patchValue({


            this.f.TransactionId.setValue(this.DbResult.Table[0].TransactionId);
            this.f.TransactionNo.setValue(this.DbResult.Table[0].TransactionNo);
            this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;

            //  });
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Saved successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
           
           // this.router.navigate(['Sales/SalesInvoice']);
            this.lstSalesInvoiceEditDetails = this.lstSalesInvoiceItems;
            this.tempsalesinvoiceid = this.f.TransactionId.value
            this.CreatedID = 0;

            this.SalesInvoiceEditDetails();
          }


          this.lstSalesInvoiceItems = null;
          this.lstSalesInvoiceItems = [];
          this.lstTermsChild = null;
          this.lstTermsChild = [];
          this.lstCharges = [];
          this.lstPayemnts = [];
          if (this.DbResult.Table.length > 0) {

            try {

              if (this.DbResult.Table1.length > 0)//lstres[0].Table=="SalesInvoice1")
              {
                //var res1=JSON.parse((( this.DbResult.Table1[0].lstSalesInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\""));
                var lstresSalesInvoiceItems = JSON.parse(((this.DbResult.Table1[0].lstSalesInvoiceItems).replace(/\n/g, "")).replace(/'/g, "\""));
                var i = 0;
                var SalesInvoiceItemsdata = $.map(lstresSalesInvoiceItems, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstSalesInvoiceItems =  Object.assign([],SalesInvoiceItemsdata)
              


              }
            } catch (exce) { }
            try {
              if (this.DbResult.Table2.length > 0)//lstres[0].Table=="SalesInvoiceTermDetails")
              {
                //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                var lstresTermsChild = JSON.parse(((this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g, "\""));

                var lstresTermsChilddata = $.map(lstresTermsChild, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstTermsChild = Object.assign([],lstresTermsChilddata)
              }
            } catch (exce) { }





            try {
              if (this.DbResult.Table3.length > 0)//lstres[0].Table=="SalesInvoiceTermDetails")
              {
                //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                var lstresSalesInvoiceItemsStock = JSON.parse(((this.DbResult.Table3[0].lstSalesInvoiceItemsStock).replace(/\n/g, "")).replace(/'/g, "\""));

                var lstresSalesInvoiceItemsStockdata = $.map(lstresSalesInvoiceItemsStock, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstSalesInvoiceItemsStock =Object.assign([],lstresSalesInvoiceItemsStockdata)
              }
            } catch (exce) { }




            try {
              if (this.DbResult.Table4.length > 0)//lstres[0].Table=="SalesInvoiceTermDetails")
              {
                //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                var lstresCharges = JSON.parse(((this.DbResult.Table4[0].lstCharges).replace(/\n/g, "")).replace(/'/g, "\""));

                var lstresChargesdet = $.map(lstresCharges, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstCharges = Object.assign([],lstresChargesdet);
              }
            } catch (exce) { }




            try {
              if (this.DbResult.Table5.length > 0)//lstres[0].Table=="SalesInvoiceTermDetails")
              {
                //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                var lstresPaymenst = JSON.parse(((this.DbResult.Table5[0].lstPayemnts).replace(/\n/g, "")).replace(/'/g, "\""));

                var lstresPaymenstdet = $.map(lstresPaymenst, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstPayemnts = Object.assign([],lstresPaymenstdet);
              }
            } catch (exce) { }


          }






        } else {

          this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;

          if (this.DbResult.Table[0].DBresult == -3) {
            (window as any).swal({
              icon: 'warning',
              title: 'Exists',
              text: 'SalesInvoice Already Exists.!',
              confirmButtonText: 'Dismiss',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-warning'
            });
          } else {

            if (this.DbResult.Table[0].DBresult == -9) {
              // this.ErrrorAlert('',"Modification Not Possible Contact Admin ");
              (window as any).swal({
                icon: 'warning',
                title: 'Exists',
                text: 'Modification Not Possible Contact Admin !',
                confirmButtonText: 'Dismiss',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-warning'
              });
            }

            if (this.DbResult.Table[0].DBresult == -5) {


              var that = this;

           
              (window as any).swal({
                icon: "warning",
                title: "Transaction modified by " + this.DbResult.Table[0].ModifiedBy + "! ",
                text: "Do you wants to overwrite?",

                buttons: [
                  'No, cancel it!',
                  'Yes, I am sure!'
                ],
                dangerMode: true,
              }).then(function (isConfirm) {

                if (isConfirm) {

                  that.ModifiedDate = that.DbResult.Table[0].ModifiedDate;

                  that.SaveTransaction();
                } else {
                  (window as any).swal("Cancelled", "this file is not updated :)", "error");
                }


              });



            }




            else {
              if ((+this.DbResult.Table[0].DBresult) == -7) {

                (window as any).swal({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Stock not available.!',
                  confirmButtonText: 'Dismiss',
                  buttonsStyling: false,
                  confirmButtonClass: 'btn btn-lg btn-danger'
                });


              }
              // (window as any).swal({
              //  icon: 'error',
              //  title: 'Error!',
              //  text: 'failed.!',
              //  confirmButtonText: 'Dismiss',
              //  buttonsStyling: false,
              //  confirmButtonClass: 'btn btn-lg btn-danger'
              // });
            }

          }
        }


        //console.log('Sucsess');
      },
      err => {
        (window as any).swal({
          icon: 'error',
          title: 'Error!',
          text: 'Network Error Please Try Again .!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-danger'
        });
      }
    );


  }

  TransactionDateChange(e) {


  }
  TransactionDate = $("#TransactionDate").val();

  SelectedProductData = {
    SNO: 1
    , VoucherType: ''
    , LineId: '0'
    , Description: ''
    , Note: ''
    , Partno: ''
    , ItemId: 0
    , MakeId: 0
    , UOMId: 0
    , Make: ''
    , UOM: ''

    , Rate: 0
    , Qty: 1



    , Gross: 0
    , DiscountPercentage: 0
    , DiscountAmount: 0



    , CGST: 0
    , CGSTAmount: 0
    , SGST: 0



    , SGSTAmount: 0
    , IGST: 0
    , IGSTAmount: 0

    , BCDPer: 0
    , BCDAmount: 0
    , SWSPer: 0
    , SWSAmount: 0
    , SWSAccountId: 0
    , BCDAccountId: 0
    , TotalTax: 0
    , NetTotal: 0

    , TaxType: 0
    , LocationId: ''
    , BinId: ''
    , Locationname: ''
    , BinName: ''


    , HSN: ''
    , SGSTAccountId: 0
    , CGSTAccountId: 0
    , IGSTAccountId: 0
    // ,SGSTAccountName:''
    // ,CGSTAccountName:''
    // ,IGSTAccountName:''


    , Show: 'true'
  }

  RefLineId:number=0;
  RefId:number=0;
  RefType1:''
  RefNo2:string=""

  PartyId = '0';
  //AddItemReset=false;
  OnAdd() {
   
    this.PartyId = this.getControlValue(this.f.PartyId, 'int');
    this.errormsg = "";
    this.EditRecNO = -1;
    this.SelectedProductData = {
      SNO: (this.lstSalesInvoiceItems.length == 0 ? 1 : (this.lstSalesInvoiceItems.length + 1))
      , VoucherType: this.InvoiceType
      , LineId: '0'
      , Description: ''
      , Note: ''
      , Partno: ''
      , ItemId: 0
      , MakeId: 0
      , UOMId: 0
      , Make: ''
      , UOM: ''
      , Rate: 0
      , Qty: 1
      , Gross: 0
      , DiscountPercentage: 0
      , DiscountAmount: 0
      , CGST: 0
      , CGSTAmount: 0
      , SGST: 0
      , SGSTAmount: 0
      , IGST: 0
      , IGSTAmount: 0
      , BCDPer: 0
      , BCDAmount: 0
      , SWSPer: 0
      , SWSAmount: 0
      , SWSAccountId: 0
      , BCDAccountId: 0
      , TotalTax: 0
      , NetTotal: 0
      , TaxType: 0
      , LocationId: ''
      , BinId: ''
      , Locationname: ''
      , BinName: ''
      , HSN: ''
      , SGSTAccountId: 0
      , CGSTAccountId: 0
      , IGSTAccountId: 0
      , Show: 'true'
    };
    this.TransactionDate = $("#TransactionDate").val();

    if (this.CompanyStateId != this.SelectedState) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }


    this.GstTaxFromHSNAndGSTTypeForGridView();

  }

  GstTaxFromHSNAndGSTTypeForGridView() {
debugger;


let salesInvoiceItems=[];
this.lstSalesInvoiceItems.forEach((element ,index)=> {
  salesInvoiceItems[index]={...element};
});

this.lstSalesInvoiceItems=salesInvoiceItems;

    if (this.lstSalesInvoiceItems.length > 0) {
      var xmlHsnInfo = "";
      var rows = "";

      for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
        this.lstSalesInvoiceItems[i].CGST = 0;
        this.lstSalesInvoiceItems[i].SGST = 0;
        this.lstSalesInvoiceItems[i].IGST = 0;

        this.lstSalesInvoiceItems[i].CGSTAmount = 0;
        this.lstSalesInvoiceItems[i].SGSTAmount = 0;
        this.lstSalesInvoiceItems[i].IGSTAmount = 0;


        this.lstSalesInvoiceItems[i].CGSTAccountId = 0;
        this.lstSalesInvoiceItems[i].SGSTAccountId = 0;
        this.lstSalesInvoiceItems[i].IGSTAccountId = 0;
        rows = rows + '<Table1><HSN>' + this.lstSalesInvoiceItems[i].HSN + '</HSN></Table1>'


      }
      xmlHsnInfo = '<NewDataSet>' + rows + '</NewDataSet>';


     

      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo, this.TaxType, this.TransactionDate).subscribe(
        (res) => {

         
          $("#loaderParent").click();

          this.lstDbResult = JSON.parse(res['Message']);



          if (this.lstDbResult.Table.length > 0) {
            var resultInfo = this.lstDbResult.Table;


            for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
              this.lstSalesInvoiceItems[i].CGST = 0;
              this.lstSalesInvoiceItems[i].SGST = 0;
              this.lstSalesInvoiceItems[i].IGST = 0;

              this.lstSalesInvoiceItems[i].CGSTAmount = 0;
              this.lstSalesInvoiceItems[i].SGSTAmount = 0;
              this.lstSalesInvoiceItems[i].IGSTAmount = 0;
              var ResultItem = resultInfo.filter(d => d.HSN === this.lstSalesInvoiceItems[i].HSN);
              if (ResultItem.length > 0) {


                for (let j = 0; j < ResultItem.length; j++) {
                  if (ResultItem[j].TaxType == "CGST") {
                    this.lstSalesInvoiceItems[i].CGST = (ResultItem[j].TaxPercentage2);

                    try {

                      this.lstSalesInvoiceItems[i].CGSTAccountId = (ResultItem[j].PostAccountId);
                      // this.lstSalesInvoiceItems[i].CGSTAccountName=(ResultItem[j].AccountName);
                    } catch (e) {

                    }


                  }

                  if (ResultItem[j].TaxType == "SGST") {
                    this.lstSalesInvoiceItems[i].SGST = (ResultItem[j].TaxPercentage2);
                    try {

                      this.lstSalesInvoiceItems[i].SGSTAccountId = (ResultItem[j].PostAccountId);
                      //this.lstSalesInvoiceItems[i].SGSTAccountName=(ResultItem[j].AccountName);
                    } catch (e) {

                    }


                  }

                  if (ResultItem[j].TaxType == "IGST") {
                    this.lstSalesInvoiceItems[i].IGST = (ResultItem[j].TaxPercentage2);
                    try {

                      this.lstSalesInvoiceItems[i].IGSTAccountId = (ResultItem[j].PostAccountId);
                      // this.lstSalesInvoiceItems[i].IGSTAccountName=(ResultItem[j].AccountName);
                    } catch (e) {

                    }
                  }


                }
              }

            }
            this.CalculateTotals();
          }


          else {
            // (window as any). swal("Cancelled", "Failed:)", "error");
            //this.FormErrormsg="Failed.";

          }




        }
      );
    }
  }

  PrepareSerchStringByField() {

    var searchPartNo = this.getControlValue(this.f.searchPartNo, "string");
    var searchDescription = this.getControlValue(this.f.searchDescription, "string");
    var searchMake = this.getControlValue(this.f.searchMake, "string");
    var searchHSN = this.getControlValue(this.f.searchHSN, "string");


    if (this.SerchType == 'Like') {


      if (searchPartNo != "" || searchDescription != "" || searchMake != "" || searchHSN != "") {
        for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {

          if ((this.lstSalesInvoiceItems[i].Partno).toString().includes(searchPartNo) ||

            (this.lstSalesInvoiceItems[i].Make).toString().includes(searchDescription) ||
            (this.lstSalesInvoiceItems[i].Description).toString().includes(searchMake) ||
            (this.lstSalesInvoiceItems[i].HSN).toString().includes(searchHSN)

          ) {



            this.lstSalesInvoiceItems[i].Show = 'true';
          } else {
            this.lstSalesInvoiceItems[i].Show = 'false';


          }
        }
      }


    }
    else {


      for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {

        if ((this.lstSalesInvoiceItems[i].Partno) == ((searchPartNo) != "" ? (searchPartNo) : this.lstSalesInvoiceItems[i].Partno) &&

          (this.lstSalesInvoiceItems[i].Make) == ((searchMake) != "" ? (searchMake) : this.lstSalesInvoiceItems[i].Make) &&
          (this.lstSalesInvoiceItems[i].Description) == ((searchDescription) != "" ? (searchDescription) : this.lstSalesInvoiceItems[i].Description) &&
          (this.lstSalesInvoiceItems[i].HSN) == ((searchHSN) != "" ? (searchHSN) : this.lstSalesInvoiceItems[i].HSN)

        ) {



          this.lstSalesInvoiceItems[i].Show = 'true';
        } else {
          this.lstSalesInvoiceItems[i].Show = 'false';



        }

      }
    }





  }
  SerchType = 'Like'
  SerchTypeChange(ChangedValue) {

    if (ChangedValue == false) {
      this.SerchType = 'Equal'
      if (this.FilterType == 'All')
        $('#customSwitch').trigger('click');

    } else {
      this.SerchType = 'Like'
    }
  }
  FilterType = 'All'
  GetSearchDetails() {


    var SearchString = "";
    if (this.FilterType != 'All') {
      this.PrepareSerchStringByField();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")

      for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {

        if (

          (this.lstSalesInvoiceItems[i].Partno).toString().includes(SearchString) ||
          (this.lstSalesInvoiceItems[i].Make).toString().includes(SearchString) ||
          (this.lstSalesInvoiceItems[i].HSN).toString().includes(SearchString) ||
          (this.lstSalesInvoiceItems[i].Description).toString().includes(SearchString)

          //(this.lstSalesInvoiceItems[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {



          this.lstSalesInvoiceItems[i].Show = 'true';
        } else {
          this.lstSalesInvoiceItems[i].Show = 'false';


        }
      }

    }
    return SearchString;


  }
  Search() {
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));

    this.APICall.UpdatedSelectedPath('./Sales/SalesInvoice');
    this.router.navigate(['Sales/SalesInvoice']);
  }
  FilterTypeChange(event) {




    if (this.SerchType == 'Like' && event.target.checked == true) {
      this.FilterType = (event.target.checked == true ? 'All' : 'Field');
    } else {

      event.target.checked = false;
      this.FilterType = 'Field';

    }


  }

  CompanyStateId = (+this.APICall.GetCompanyStateID());

  get f() {
    return this.CreateSalesInvoice.controls;

  }

  // lstSalesInvoiceItems:any =[];
  lstSalesInvoiceItems:Array<any>=[];
  lstSalesInvoiceItemsStock: any = [];
  //#region "getControlValue"


  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }
  //#endregion "getControlValue"
  errormsg = "";
  showError = false;
  EditRecNO = 0;

  SNO = 0;
  ValidateItem(data): boolean {
   
    var validate = true;
    this.showError = false;

    

    if ((+data.NetTotal) > 0) {


      for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
        if (data.SNO != this.lstSalesInvoiceItems[i].SNO && this.lstSalesInvoiceItems[i].Partno == data.Partno && this.lstSalesInvoiceItems[i].Rate == data.Rate) {
          validate = false;
          this.showError = true;
          this.errormsg = "Already exists!";
          break;

        }

      }
    } else {

      validate = false;
      this.showError = true;
      this.errormsg = "Invalid Data!";

    }
    if (validate && this.StockErrorMsg != "") {
      validate = false;
      this.showError = true;
      this.errormsg = this.StockErrorMsg;
    }

    return validate;
  }
  StockErrorMsg = "";
  AddItemAndNewClick(event) {
    this.errormsg = "";
    this.StockErrorMsg = "";
    this.StockErrorMsg = event.StockErrorMsg;
    this.AddItem('New', event.SelecedRow, event.StockAllotment)
    if (this.errormsg != '') {

      throw new Error(
        this.errormsg
      )
    }

  }

  AddItemAndCloseClick(event) {
   debugger;
    this.errormsg = "";
    this.StockErrorMsg = "";
    this.StockErrorMsg = event.StockErrorMsg;
    this.AddItem('Close', event.SelecedRow, event.StockAllotment)
   
    if (this.InsertalineIn == 1) {
     
      var pos1 = (+this.tempSno);
      var lastpos = (+this.lstSalesInvoiceItems.length) - 1;
      this.move(lastpos, pos1);

      for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
        this.lstSalesInvoiceItems[i].SNO = i + 1;
      }
    }

  }

  move(from, to) {
   
    this.lstSalesInvoiceItems.splice(to, 0, this.lstSalesInvoiceItems.splice(from, 1)[0]);
    return this;
  }
  DiscountAdd() {
   
    var DisVal = this.f.AddDiscount;
    for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
      var data = Object.assign({}, this.lstSalesInvoiceItems[i]);
      data.DiscountPercentage = DisVal.value;
      this.SelectedProductData = Object.assign([], data);
    }
      }
      
  EditItemClick(data) {
   
    var newdate=Object.assign([],data)
    this.EditRecNO = 0;

    this.errormsg = "";

    if (this.InvoiceType == "Import") {
      newdate.VoucherType = "Import";
    }
    else {
      newdate.VoucherType = "";
    }
    this.SelectedProductData = Object.assign({}, data);

  }



  AddItem(type, data, StockAllotment) {
    debugger;
 if (this.ValidateItem(data)) {
      debugger;
     
      this.lstSalesInvoiceItemsStock =  StockAllotment;
  
      
      debugger;
      //salesinvoiceitems
      let salesInvoiceItems=[];
      this.lstSalesInvoiceItems.forEach((element ,index)=> {
        salesInvoiceItems[index]={...element};
      });
      
      this.lstSalesInvoiceItems=salesInvoiceItems;

      for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {

        if (this.lstSalesInvoiceItems[i].SNO == data.SNO) {
      debugger;
        this.lstSalesInvoiceItems[i].Partno =  data.Partno;
          this.lstSalesInvoiceItems[i].ItemId = data.ItemId;
          this.lstSalesInvoiceItems[i].MakeId = data.MakeId;
          this.lstSalesInvoiceItems[i].Description = data.Description;
          this.lstSalesInvoiceItems[i].Note = "";
          this.lstSalesInvoiceItems[i].Make = data.Make;
          this.lstSalesInvoiceItems[i].UOM = data.UOM;
          this.lstSalesInvoiceItems[i].UOMId = data.UOMId;
          this.lstSalesInvoiceItems[i].Rate = data.Rate;
          this.lstSalesInvoiceItems[i].Qty = (+data.Qty);
          this.lstSalesInvoiceItems[i].Gross = (+data.Gross);
          this.lstSalesInvoiceItems[i].DiscountPercentage = (+ data.DiscountPercentage);
          this.lstSalesInvoiceItems[i].DiscountAmount = (+data.DiscountAmount);
          this.lstSalesInvoiceItems[i].CGST = (+data.CGST);
          this.lstSalesInvoiceItems[i].CGSTAmount = (+data.CGSTAmount);
          this.lstSalesInvoiceItems[i].SGST = (+data.SGST);
          this.lstSalesInvoiceItems[i].SGSTAmount = (+data.SGSTAmount);
          this.lstSalesInvoiceItems[i].IGST = (+data.IGST);
          this.lstSalesInvoiceItems[i].IGSTAmount = (+data.IGSTAmount);

          //addded the refline id go zero 
          this.lstSalesInvoiceItems[i].RefLineId =  this.lstSalesInvoiceItems[i].LineId;
          this.lstSalesInvoiceItems[i].RefId =  this.lstSalesInvoiceItems[i].RefId;
          this.lstSalesInvoiceItems[i].RefDate3 = this.lstSalesInvoiceItems[i].RefDate3;
          this.lstSalesInvoiceItems[i].RefNo2 = this.lstSalesInvoiceItems[i].RefNo2;
          this.lstSalesInvoiceItems[i].RefType1 =  this.lstSalesInvoiceItems[i].RefType1;
      

     


          if (data.VoucherType == "Import") {
            this.lstSalesInvoiceItems[i].BCDPer = (+data.BCDPer);
            this.lstSalesInvoiceItems[i].BCDAmount = (+data.BCDAmount);
            this.lstSalesInvoiceItems[i].SWSPer = (+data.SWSPer);
            this.lstSalesInvoiceItems[i].SWSAmount = (+data.SWSAmount);
            this.lstSalesInvoiceItems[i].SWSAccountId = data.SWSAccountId;
            this.lstSalesInvoiceItems[i].BCDAccountId = data.BCDAccountId;
          }
          else {
            this.lstSalesInvoiceItems[i].BCDPer = 0;
            this.lstSalesInvoiceItems[i].BCDAmount = 0;
            this.lstSalesInvoiceItems[i].SWSPer = 0;
            this.lstSalesInvoiceItems[i].SWSAmount = 0;
            this.lstSalesInvoiceItems[i].SWSAccountId = 0;
            this.lstSalesInvoiceItems[i].BCDAccountId = 0;
          }
          this.lstSalesInvoiceItems[i].TotalTax = (+data.TotalTax);
          this.lstSalesInvoiceItems[i].NetTotal = (+data.NetTotal);
          this.lstSalesInvoiceItems[i].TaxType = data.TaxType;
          this.lstSalesInvoiceItems[i].HSN = data.HSN;
          this.lstSalesInvoiceItems[i].SGSTAccountId = data.SGSTAccountId;
          this.lstSalesInvoiceItems[i].CGSTAccountId = data.CGSTAccountId;
          this.lstSalesInvoiceItems[i].IGSTAccountId = data.IGSTAccountId;
        }
      }
      if (this.EditRecNO == -1) {
        var res =
          ({
            SNO: this.lstSalesInvoiceItems.length + 1
            , LineId: '0'
            , Description: data.Description
            , Note: ""
            , Partno: data.Partno
            , ItemId: data.ItemId
            , MakeId: data.MakeId
            , UOMId: data.UOMId
            , Make: data.Make
            , UOM: data.UOM
            , Rate: data.Rate
            , Qty: (+data.Qty)
            , Gross: (+data.Gross)
            , DiscountPercentage: (+ data.DiscountPercentage)
            , DiscountAmount: (+data.DiscountAmount)
            , CGST: (+data.CGST)
            , CGSTAmount: (+data.CGSTAmount)
            , SGST: (+data.SGST)
            , SGSTAmount: (+data.SGSTAmount)
            , IGST: (+data.IGST)
            , IGSTAmount: (+data.IGSTAmount)
            , BCDPer: (+data.BCDPer)
            , BCDAmount: (+data.BCDAmount)
            , SWSPer: (+data.SWSPer)
            , SWSAmount: (+data.SWSAmount)
            , BCDAccountId: 0
            , SWSAccountId: 0
            , TotalTax: (+data.TotalTax)
            , NetTotal: (+data.NetTotal)
            , TaxType: data.TaxType
            , LocationId: ''
            , BinId: ''
            , Locationname: ''
            , BinName: ''
            , HSN: data.HSN
            , SGSTAccountId: data.SGSTAccountId
            , CGSTAccountId: data.CGSTAccountId
            , IGSTAccountId: data.IGSTAccountId
            ,RefLineId:data.RefLineId
            ,RefId:data.RefId
            ,RefDate3:data.RefDate3
            ,RefNo2:data.RefNo2
            ,RefType1:data.RefType1
            , Show: 'true'
          });

        if (this.lstSalesInvoiceItems.length == 0) {
          this.lstSalesInvoiceItems = [res];

        }
        else {
          this.lstSalesInvoiceItems.push(res);

        }
      }




      if (type == 'Close') {
        $("#btnCloseAddItem").trigger('click');
        this.EditRecNO = 0;
      } else {

        this.EditRecNO = -1;

      }

      this.SNO = this.lstSalesInvoiceItems.length + 1;
      this.CalculateTotals();
      this.f.LineChanges.setValue(0);
    }

  }

  InvoiceType = "";
  InvoiceTypeChange(target) {
   
    if (target.value == "Import") {
      this.InvoiceType = "Import";
    }
    else {
      this.InvoiceType = target.value;
    }
    this.CalculateTotals();

  }

  TotalCharges = 0;
  TotalGross = 0;
  TotalDiscount = 0;
  TotalCGST = 0;
  TotalSGST = 0;
  TotalIGST = 0;
  TotalTax = 0;
  Total = 0;
  AfterDiscount = 0;
  TotalBCD = 0;
  TotalSWS = 0;
  TotalBeforeTax = 0;
  BeforeTax = 0;
  
  CalculateTotals() {
  debugger;
    this.TotalGross = 0;
    this.TotalCharges = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.AfterDiscount = 0;
    this.TotalBCD = 0;
    this.TotalSWS = 0;
    this.TotalBeforeTax = 0;
    this.BeforeTax = 0;
    if (this.f.InvoiceType.value == 'Warranty Replace') {
      
      for (let i = 0; i < this.lstSalesInvoiceItems.length; i++) {
        this.TotalGross = this.TotalGross + (+this.lstSalesInvoiceItems[i].Gross);
        console.log(this.TotalGross)
      }

    }

    if (this.f.InvoiceType.value == 'Invoice' || this.f.InvoiceType.value == 'Exclude Tax' || this.f.InvoiceType.value == 'Import') {


      var ChargesCGST = 0;
      var ChargesSGST = 0;
      var ChargesIGST = 0;
      for (let i = 0; i < this.lstCharges.length; i++) {

        this.TotalCharges = (+this.TotalCharges) + (+this.lstCharges[i].ChargesAmount);

        ChargesCGST = (+this.lstCharges[i].ChargesCGSTAmount);
        ChargesSGST = (+this.lstCharges[i].ChargesSGSTAmount);
        ChargesIGST = (+this.lstCharges[i].ChargesIGSTAmount);

      }

      let salesInvoiceItems=[];
      this.lstSalesInvoiceItems.forEach((element ,index)=> {
        salesInvoiceItems[index]={...element};
      });
      
      this.lstSalesInvoiceItems=salesInvoiceItems;
      
      for (let i = 0; i < this.lstSalesInvoiceItems.length; i++) {

        if (this.lstSalesInvoiceItems[i].BCDAmount == undefined || this.lstSalesInvoiceItems[i].BCDAmount == null || this.lstSalesInvoiceItems[i].BCDAmount == '') {
          this.lstSalesInvoiceItems[i].BCDAmount = 0;
        }

        if (this.lstSalesInvoiceItems[i].SWSAmount == undefined || this.lstSalesInvoiceItems[i].SWSAmount == null || this.lstSalesInvoiceItems[i].SWSAmount == '') {
          this.lstSalesInvoiceItems[i].SWSAmount = 0;
        }

        if (this.lstSalesInvoiceItems[i].DiscountAmount == undefined || this.lstSalesInvoiceItems[i].DiscountAmount == null || this.lstSalesInvoiceItems[i].DiscountAmount == '') {
          this.lstSalesInvoiceItems[i].DiscountAmount = 0;
        }

        if (this.lstSalesInvoiceItems[i].SGSTAmount == undefined || this.lstSalesInvoiceItems[i].SGSTAmount == null || this.lstSalesInvoiceItems[i].SGSTAmount == '') {
          this.lstSalesInvoiceItems[i].SGSTAmount = 0;
        }

        if (this.lstSalesInvoiceItems[i].CGSTAmount == undefined || this.lstSalesInvoiceItems[i].CGSTAmount == null || this.lstSalesInvoiceItems[i].CGSTAmount == '') {
          this.lstSalesInvoiceItems[i].CGSTAmount = 0;
        }
        if (this.lstSalesInvoiceItems[i].IGSTAmount == undefined || this.lstSalesInvoiceItems[i].IGSTAmount == null || this.lstSalesInvoiceItems[i].IGSTAmount == '') {
          this.lstSalesInvoiceItems[i].IGSTAmount = 0;
        }


        var AfterDiscount = (((+this.lstSalesInvoiceItems[i].Gross) + (+this.lstSalesInvoiceItems[i].BCDAmount)
          + (+this.lstSalesInvoiceItems[i].SWSAmount)) - (+ this.lstSalesInvoiceItems[i].DiscountAmount));

        this.lstSalesInvoiceItems[i].TotalTax = 0;
        this.lstSalesInvoiceItems[i].SGSTAmount = 0;
        this.lstSalesInvoiceItems[i].CGSTAmount = 0;

        this.lstSalesInvoiceItems[i].IGSTAmount = 0;
        this.lstSalesInvoiceItems[i].TotalCGST = 0;
        this.lstSalesInvoiceItems[i].TotalSGST = 0;
        this.lstSalesInvoiceItems[i].TotalIGST = 0;

        if (this.f.InvoiceType.value == 'Exclude Tax') {
          this.lstSalesInvoiceItems[i].CGST = 0;
          this.lstSalesInvoiceItems[i].SGST = 0;
          this.lstSalesInvoiceItems[i].IGST = 0;
        }

        if (this.f.InvoiceType.value == 'Invoice' || this.f.InvoiceType.value == 'Import') {

          this.lstSalesInvoiceItems[i].SGSTAmount = (((+this.lstSalesInvoiceItems[i].SGST) * AfterDiscount) / 100);
          this.lstSalesInvoiceItems[i].CGSTAmount = (((+this.lstSalesInvoiceItems[i].CGST) * AfterDiscount) / 100);
          this.lstSalesInvoiceItems[i].IGSTAmount = (((+this.lstSalesInvoiceItems[i].IGST) * AfterDiscount) / 100);

          this.lstSalesInvoiceItems[i].TotalTax = (+this.lstSalesInvoiceItems[i].SGSTAmount) + (+this.lstSalesInvoiceItems[i].CGSTAmount)
            + (+this.lstSalesInvoiceItems[i].IGSTAmount);

          this.TotalCGST = this.TotalCGST + (+this.lstSalesInvoiceItems[i].CGSTAmount);
          this.TotalSGST = this.TotalSGST + (+this.lstSalesInvoiceItems[i].SGSTAmount);
          this.TotalIGST = this.TotalIGST + (+this.lstSalesInvoiceItems[i].IGSTAmount);

          this.TotalBCD = this.TotalBCD + (+this.lstSalesInvoiceItems[i].BCDAmount);
          this.TotalSWS = this.TotalSWS + (+this.lstSalesInvoiceItems[i].SWSAmount);

        }

        //this.BeforeTax=this.lstSalesInvoiceItems[i].Gross   + (+ AfterDiscount) 
       this.BeforeTax = AfterDiscount;

        this.TotalBeforeTax = this.TotalBeforeTax + (+ this.BeforeTax);

        this.TotalGross = this.TotalGross + (+this.lstSalesInvoiceItems[i].Gross);

        this.TotalDiscount = this.TotalDiscount + (+this.lstSalesInvoiceItems[i].DiscountAmount);

        this.TotalTax = this.TotalTax + (+this.lstSalesInvoiceItems[i].TotalTax);

        //  this.lstSalesInvoiceItems[i].NetTotal = (( this.TotalBeforeTax + (+this.lstSalesInvoiceItems[i].TotalTax))).toFixed(2);

        this.Total = this.Total + (+this.lstSalesInvoiceItems[i].NetTotal);

      }
    }

    if (ChargesCGST == undefined || ChargesCGST == null) {
      ChargesCGST = 0;
    }

    if (ChargesSGST == undefined || ChargesSGST == null) {
      ChargesSGST = 0;
    }

    if (ChargesIGST == undefined || ChargesIGST == null) {
      ChargesIGST = 0;
    }


    this.TotalCGST = this.TotalCGST + (+ChargesCGST);
    this.TotalSGST = this.TotalSGST + (+ChargesSGST);
    this.TotalIGST = this.TotalIGST + (+ChargesIGST);
    this.TotalTax = this.TotalTax + (+ChargesCGST) + (+ChargesSGST) + (+ChargesIGST);

    // this.AfterDiscount = (this.TotalGross + this.TotalBeforeTax + this.TotalCharges) - (this.TotalDiscount) + (this.TotalCharges)
    //  + (this.TotalBCD)  +  (this.TotalSWS);
    this.TotalBeforeTax = this.TotalBeforeTax + this.TotalCharges;
    this.AfterDiscount = (this.TotalGross + this.TotalBeforeTax) - ((this.TotalDiscount)
      + (this.TotalBCD) + (this.TotalSWS));
    //this.Total=(+this.Total)+(+this.TotalCharges);
    this.Total = this.TotalBeforeTax + this.TotalTax;
    this.PaymentTermsAmountCalc();
    this.f.CommitionAmount.setValue(((this.AfterDiscount) * (+this.f.CommitionPer.value) / 100).toFixed(2))
  }


  close() {
   
    for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
      if (this.lstSalesInvoiceItems[i].Partno == "") {
        this.lstSalesInvoiceItems.splice(i, 1);
        i = 0;
      }
    }
    $("#btnCloseQuotationPrint").click();
  }

  ReArrangeSNo() {
    let salesInvoiceItems=[];
    this.lstSalesInvoiceItems.forEach((element ,index)=> {
      salesInvoiceItems[index]={...element};
    });
    
    this.lstSalesInvoiceItems=salesInvoiceItems;
    

    for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
      for (var j = 0; j < this.lstSalesInvoiceItemsStock.length; j++) {

        if (this.lstSalesInvoiceItemsStock[j].Partno == this.lstSalesInvoiceItems[i].Partno && this.lstSalesInvoiceItemsStock[j].Rate == this.lstSalesInvoiceItems[i].Rate) {

           this.lstSalesInvoiceItemsStock[j].SNO = i + 1
      

        }

      }
    }

  }
  RemoveItemClick(event) {
   debugger;
    var sliceIndex = -1;
    var stocksliceIndex = -1;
    let salesInvoiceItems=[];
    // global varaible items 
    this.lstSalesInvoiceItems.forEach((element ,index)=> {
      salesInvoiceItems[index]={...element};
    });
    
    this.lstSalesInvoiceItems=salesInvoiceItems;

    // stock allotment 
    let lstSalesInvoiceItemsStock=[];
    this.lstSalesInvoiceItemsStock.forEach((element ,index)=> {
      lstSalesInvoiceItemsStock[index]={...element};
    });
    
    this.lstSalesInvoiceItemsStock=lstSalesInvoiceItemsStock;
    for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
      this.lstSalesInvoiceItems[i].Show = 'true';

      if (this.lstSalesInvoiceItems[i].ItemId == event.ItemId) {
        sliceIndex = i;
      }
    }
    for (var i = 0; i < this.lstSalesInvoiceItemsStock.length; i++) {
      this.lstSalesInvoiceItemsStock[i].Show = 'true';

      if (this.lstSalesInvoiceItemsStock[i].ItemId == event.ItemId && this.lstSalesInvoiceItemsStock[i].Partno == event.Partno 
      //  && this.lstSalesInvoiceItemsStock[i].Rate == event.Rate
        ) {
        stocksliceIndex = i;
      }
    }

    if (sliceIndex > -1) {
      this.lstSalesInvoiceItems.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
        this.lstSalesInvoiceItems[i].SNO = i + 1;
      }

    }

    if (stocksliceIndex > -1) {
      this.lstSalesInvoiceItemsStock.splice(stocksliceIndex, 1);

      for (var i = 0; i < this.lstSalesInvoiceItemsStock.length; i++) {
        this.lstSalesInvoiceItemsStock[i].SNO = i + 1;
      }
    }
    //this.EditRecNO=-1;
    this.SNO = this.lstSalesInvoiceItems.length + 1;
    // this.ClearSelectedValues();
    this.CalculateTotals();
    $("#btnCloseAddItem").trigger('click');
    this.ReArrangeSNo();
  }



  //#endregion "AddPartNo"
  TaxType = "Intra State";

  TaxControlsUpdate() {
    if (this.CompanyStateId != this.SelectedState) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

  }


  PaymentTermsAmountCalc() {
    if ((+this.Total) > 0) {
      for (let i = 0; i < this.lstTermsChild.length; i++) {
        var Amount = (this.Total * (+this.lstTermsChild[i].PayPercentage) / 100);
        this.lstTermsChild[i].Amount = Amount;
      }
    }
  }
  lstTermsChild: any = [];
  PaymentTermsChange(target) {
;
    this.lstTermsChild = [];
    if (target.value != '') {
      for (let i = 0; i < this.lstPaymentTerms.length; i++) {
        if (this.lstPaymentTerms[i].TermsId == target.value) {
          if (this.lstPaymentTerms[i].TermsDetails != null && typeof (this.lstPaymentTerms[i].TermsDetails) != undefined) {
            var res = ((this.lstPaymentTerms[i].TermsDetails).replace(/\n/g, "")).replace(/'/g, "\"");

            this.lstTermsChild = JSON.parse(res);


            var data = $.map(this.lstTermsChild, function (obj) {

              obj.SalesInvoiceTermDetailsId = 0;
              obj.DisplayDate = '';
              obj.TermDate = '';

              return obj;
            });

            this.lstTermsChild = data;

            break;
          }

        }
      }
      this.PaymentTermsAmountCalc()
    } else {

      this.lstTermsChild = [];

    }
    this.f.PaymentTerms.setValue(target.value);
  }

  NumberSequenceValueChange(value) {
   
    this.f.SequenceNumberId.setValue(value);

  }
  TermsAndConditionsChange(target) {

    this.f.TermsandConditions.setValue('');

    if (target.value != '' && target.value != '0') {

      for (let i = 0; i < this.lstTermsAndConditions.length; i++) {
        if (this.lstTermsAndConditions[0].TermsAndConditionsId == target.value) {
          this.f.TermsandConditions.setValue(this.lstTermsAndConditions[0].description);
          this.f.Terms.setValue(this.lstTermsAndConditions[0].TermsAndConditionsId);
        }
      }


    } else {

      this.f.TermsandConditions.setValue('');
      this.f.Terms.setValue(0);
    }
  }
  lstTermsAndConditions: any = [];
  ChargesAccountGroup = '';//'Direct Expenses (Expenses (Direct))';
  ViewTermsAndConditions() {



    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    // this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","").subscribe(
    //   (res:Response) => {
    this.DbCallings.GetTermsAndCondition().subscribe(
      (res) => {

        this.lstDbResult = JSON.parse(res['Message']);


        this.lstTermsAndConditions = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstTermsAndConditions = this.lstDbResult.Table;
        }

        $("#loaderParent").hide();
      });
  }





  lstPaymentTerms: any = [];

  ViewPaymentTerms() {



    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetPaymentTerms().subscribe(
      (res) => {


        this.lstDbResult = JSON.parse(res['Message']);


        this.lstPaymentTerms = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstPaymentTerms = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }




  ClockControlLoad() {


    (window as any).$('.clockpicker-demo').clockpicker();

    (window as any).$('.clockpicker-demo').clockpicker({
      donetext: 'Done'
    });

    (window as any).$('.clockpicker-autoclose-demo').clockpicker({
      autoclose: true
    });

    var input = (window as any).$('.clockpicker-minutes-demo').clockpicker({
      placement: 'bottom',
      align: 'left',
      autoclose: true,
      'default': 'now'
    });

    $(document).on('click', '#check-minutes', function (e) {
      e.stopPropagation();
      input.clockpicker('show')
        .clockpicker('toggleView', 'minutes');
    });

    (window as any).$('.create-event-demo').clockpicker({
      donetext: 'Done',
      autoclose: true
    });


  }
  itemCentral() {
   
    this.router.navigateByUrl('Inventory/ItemCentral')
  }
  OpenAccountLedger(){
   
    
    this.StoreAccountLedger=new StoreAccountLedger;
    this.APICall.UpdatedSelectedPath('./Accounting/AccountLedger');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreAccountLedger.AccountId=this.f.PartyId.value;
  this.StoreAccountLedger.AccountName=this.f.PartyName.value;
  this.StoreAccountLedger.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreAccountLedger));         
  this.router.navigate(['Accounting/AccountLedger']);
  
  }
  ControlDatePickerLoad() {

    (window as any).$('input[name="single-date-picker"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true
    });

    (window as any).$('input[name="simple-date-range-picker"]').daterangepicker();

    (window as any).$('input[name="simple-date-range-picker-callback"]').daterangepicker({
      opens: 'left'
    }, function (start, end, label) {
      (window as any).swal("A new date selection was made", start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'), "success")
    });

    (window as any).$('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      startDate: (window as any).moment().startOf('hour'),
      endDate: (window as any).moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A'
      }
    });

    /**
    * datefilter
    */
    // var datefilter = $('input[name="datefilter"]');
    // (window as any). datefilter.daterangepicker({
    //   autoUpdateInput: false,
    //   locale: {
    //       cancelLabel: 'Clear'
    //   }
    // });

    // datefilter.on('apply.daterangepicker', function(ev, picker) {
    //   $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    // });

    (window as any).$('input.create-event-datepicker').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: false
    }).on('apply.daterangepicker', function (ev, picker) {

      $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });

  }



  ngAfterViewInit() {
   
    this.LoadPaymentAccount();

    this.LoadTemplates();
    //this.LoadReference();
    this.ViewSalesAccount();
    this.ViewDiscountAccount();
    this.ViewCommiExpAccount();
    this.ViewCommissionPayableAccount();
    //   (window as any).$("#RequiredDate").daterangepicker({

    //     onSelect: function(dateText) {


    //       
    //       //  console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    //         this.f.RequiredDate.setValue($("#RequiredDate").val());
    //     }
    // })
    this.LoadCommitionPartyAccount();
    this.ViewPaymentTerms();
    this.ViewTermsAndConditions();
    this.ClockControlLoad();
    // $("#TransactionTime").val(this.f.TransactionTime.value);
    this.ControlDatePickerLoad();
  this.LoadOrder();

    // $("#termdate").on("change", function() {
    //  
    //   $(this).css("color", "rgba(0,0,0,0)").siblings(".datepicker_label").css({ "text-align":"center", position: "absolute",left: "10px", top:"14px",width:$(this).width()}).text((window as any).$(this).val().length == 0 ? "" : ((window as any).$.datepicker.formatDate($(this).attr("dateformat"), new Date((window as any).$(this).val()))));
    // });
  }


  termdateChange(target, index) {

   
    this.lstTermsChild[index].DisplayDate = target.value;

    var resDate = (new Date(target.value));
    this.lstTermsChild[index].TermDate = formatDate(new Date(resDate), 'MM/dd/yyyy', 'en');

    this.f.LineChanges.setValue(1);

  }
  ShippingAddressChange(target) {

    var DefaultData: any;
    // var ShippingId=target.value;
    for (let i = 0; i < this.lstShippings.length; i++) {

      if (this.lstShippings[i].ShippingInfogrv_grv4_3Id == target.value) {
        var DefaultData = this.lstShippings[i];
        break;
      }
    }

    var Address = (DefaultData.address1 != "" ? DefaultData.address1 : '');

    if (Address != "" && DefaultData.address2 != "") {
      Address = Address + ',' + (DefaultData.address2 != "" ? DefaultData.address2 : '');
    }

    if (Address != "" && DefaultData.address3 != "") {
      Address = Address + ',' + (DefaultData.address3 != "" ? DefaultData.address3 : '');
    }


    if (Address != "" && DefaultData.cityname != "") {
      Address = Address + ',' + (DefaultData.cityname != "" ? DefaultData.cityname : '');
    }
    if (Address != "" && DefaultData.statename != "") {
      Address = Address + ',' + (DefaultData.statename != "" ? DefaultData.statename : '');
    }
    if (Address != "" && DefaultData.countryname != "") {
      Address = Address + ',' + (DefaultData.countryname != "" ? DefaultData.countryname : '');
    }
    if (Address != "" && DefaultData.pincode != "") {
      Address = Address + ',' + (DefaultData.pincode != "" ? DefaultData.pincode : '');
    }
    this.f.ShiptoAddress.setValue(Address);
    this.f.Shipto.setValue(DefaultData.ShippingInfogrv_grv4_3Id);


  }
  lstShippings: any = [];
  lstDbResult: any = [];
  lstDbResult1:any=[];
  ShippingDetailsPartyId(PartyId, BindDefault) {

    {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }
;
var lst:any;
    this.APICall.DBCalling("ShippingDetailsByTypeAndPartyId", "Customer", PartyId, "", "").subscribe(
      (res: Response) => {
;
        lst = JSON.parse(res['Message']);


        $("#loaderParent").hide();
        this.lstShippings = [];
        if(lst!=undefined && lst!=null && lst!="")
        {
        if (lst.Table.length > 0) {
          this.lstShippings = this.lstDbResult.Table;
          if (BindDefault) {
            var DefaultData = this.lstShippings[0];
            var Address = (DefaultData.address1 != "" ? DefaultData.address1 : '');

            if (Address != "" && DefaultData.address2 != "") {
              Address = Address + ',' + (DefaultData.address2 != "" ? DefaultData.address2 : '');
            }

            if (Address != "" && DefaultData.address3 != "") {
              Address = Address + ',' + (DefaultData.address3 != "" ? DefaultData.address3 : '');
            }


            if (Address != "" && DefaultData.cityname != "") {
              Address = Address + ',' + (DefaultData.cityname != "" ? DefaultData.cityname : '');
            }
            if (Address != "" && DefaultData.statename != "") {
              Address = Address + ',' + (DefaultData.statename != "" ? DefaultData.statename : '');
            }
            if (Address != "" && DefaultData.countryname != "") {
              Address = Address + ',' + (DefaultData.countryname != "" ? DefaultData.countryname : '');
            }
            if (Address != "" && DefaultData.pincode != "") {
              Address = Address + ',' + (DefaultData.pincode != "" ? DefaultData.pincode : '');
            }
            this.f.ShiptoAddress.setValue(Address);

          }
        }
      }

      });
  }
  lstTransport: any = [];
  TransportDetByPartyId(PartyId) {


    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();

;
var lst:any;
    this.APICall.DBCalling("TransportDetByPartyId", PartyId, "", "", "").subscribe(
      (res: Response) => {
;
       lst = JSON.parse(res['Message']);

        $("#loaderParent").hide();
        this.lstTransport = [];

        if(lst!=undefined && lst!=null && lst!="")
        {
        if (lst.Table.length > 0) {
          this.lstTransport = lst.Table;
        }
      }

      });
  }
  PartySaved(e) {

  }
  PartyType = 'Customer';
  TransportChange(target) {


    this.f.TransportId.setValue(target.value);

    for (let i = 0; i < this.lstTransport.length; i++) {
      if (this.lstTransport[i].CustomerTransportId == target.value) {

        this.f.TransportName.setValue(this.lstTransport[i].transportername);
        this.f.Area.setValue(this.lstTransport[i].area);

      }


    }


  }
  DeviceType = "";
  StoreSalesInvoice: StoreSalesInvoice;
  StoreAccountingSettings: StoreAccountingSettings;
  DefaultSalesAccount = 0;
  DefaultDiscountAccount = 0;
  DefaultCommPayableAccount = 0;
  DefaultCommExpenAccount = 0;
  CompanyName: string = "";
  CompanyAddress: string = "";
  CompanyGSTNo: string = "";
  CompanyState: string = "";
  CompanyStateCode: string = "";
  terms: string = "";
 
  ngOnInit() {
    debugger;
    this.CompanyName = this.APICall.GetCompanyName();
    this.CompanyAddress = this.APICall.GetCompanyAddress();
    this.CompanyGSTNo = this.APICall.GetCompanyGST();
    this.CompanyState = this.APICall.GetCompanyStateName();
    this.CompanyStateCode = this.APICall.GetCompanyStateCode();

    this.lstSalesInvoiceEditDetails = [];
    this.DeviceType = localStorage.getItem('DeviceType')
    this.StoreSalesInvoice = new StoreSalesInvoice;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");

    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
  


    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {
     
      this.StoreAccountingSettings = (Asresult[0]);
      this.ChargesAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Charges'; }))[0].AccountGroupName;

      this.VendorAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Vendor'; }))[0].AccountGroupName;

      this.DefaultSalesAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Sales'; }))[0].AccountId;
      this.DefaultDiscountAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Discount Allowed'; }))[0].AccountId;
      this.DefaultCommPayableAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Commission Payable'; }))[0].AccountId;
      this.DefaultCommExpenAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Commission Expenses'; }))[0].AccountId;




    }
    // var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "SalesInvoice"; });
    if (result.length > 0) {

       Object.assign(this.StoreSalesInvoice , (result[0]));
      this.terms = this.StoreSalesInvoice.TermsandConditions;
      this.StoreSalesInvoice.InvoiceType = this.StoreSalesInvoice.InvoiceType == '' ? 'Invoice' : this.StoreSalesInvoice.InvoiceType;
     
      this.InvoiceType = this.StoreSalesInvoice.InvoiceType;
      this.StoreSalesInvoice.Salesaccount = ((typeof (this.StoreSalesInvoice.Salesaccount) == 'undefined' ? 0 : this.StoreSalesInvoice.Salesaccount) == 0 ? this.DefaultSalesAccount : this.StoreSalesInvoice.Salesaccount);
      this.StoreSalesInvoice.Discountaccount = ((typeof (this.StoreSalesInvoice.Discountaccount) == 'undefined' ? 0 : this.StoreSalesInvoice.Discountaccount) == 0 ? this.DefaultDiscountAccount : this.StoreSalesInvoice.Discountaccount);
      this.StoreSalesInvoice.CommissionPayableAccount = ((typeof (this.StoreSalesInvoice.CommissionPayableAccount) == 'undefined' ? 0 : this.StoreSalesInvoice.CommissionPayableAccount) == 0 ? this.DefaultCommPayableAccount : this.StoreSalesInvoice.CommissionPayableAccount);
      this.StoreSalesInvoice.Commissionaccount = ((typeof (this.StoreSalesInvoice.Commissionaccount) == 'undefined' ? 0 : this.StoreSalesInvoice.Commissionaccount) == 0 ? this.DefaultCommExpenAccount : this.StoreSalesInvoice.Commissionaccount);
      // if (this.StoreSalesInvoice.ModifiedDate.toString().includes('India')) {

      //   var date = new Date(this.StoreSalesInvoice.ModifiedDate);


      //   this.StoreSalesInvoice.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
      // }
      this.ModifiedDate = this.StoreSalesInvoice.ModifiedDate;
      this.tempsalesinvoiceid = this.StoreSalesInvoice.TransactionId;
     
      this.BillToStateCode = this.StoreSalesInvoice.BillToStateCode;
      this.BillToStateName = this.StoreSalesInvoice.BillToStateName;

      this.DispalyCustomerName = this.StoreSalesInvoice.PartyName;
      this.ReferenceType = this.StoreSalesInvoice.ReferenceType;
      this.ReferenceNo = this.StoreSalesInvoice.ReferenceNo;
      this.lstSalesInvoiceItemsStock = this.StoreSalesInvoice.lstSalesInvoiceItemsStock;
      this.DisplayCustomerId = this.StoreSalesInvoice.PartyId;

      this.SelectedState = this.StoreSalesInvoice.SelectedState;
      this.PartyGSTNo = this.StoreSalesInvoice.PartyGSTNo;
     
   //   this.lstSalesInvoiceItems = this.StoreSalesInvoice.lstSalesInvoiceItems == null ? [] : Object.assign([],this.StoreSalesInvoice.lstSalesInvoiceItems);
   debugger;
  if(this.StoreSalesInvoice.lstSalesInvoiceItems==null){
    this.lstSalesInvoiceItems=[];
  }else{
    debugger;
     Object.assign(this.lstSalesInvoiceItems,this.StoreSalesInvoice.lstSalesInvoiceItems);
     let result2= [];
    
     this.lstSalesInvoiceItems.forEach((element ,index)=> {
       result2[index]={...element};
     });
     
     
     this.lstSalesInvoiceItems=result2;
  }
      this.TaxType = this.StoreSalesInvoice.TaxType == "" ? 'Intra State' : this.StoreSalesInvoice.TaxType;
      var i = 0;
   
      // const newArray = this.lstSalesInvoiceItems.map(elem => {
      //   return Object.assign(elem, {SNO:1});
      // });

     var that = this;
     
      var lstSalesInvoiceItemsdata = $.map(this.lstSalesInvoiceItems, function (obj) {
      i = i + 1;
      return { ...obj, SNO: i};
        
      });


   debugger;
 
     Object.assign(that.lstSalesInvoiceItems,lstSalesInvoiceItemsdata);
      debugger;
       Object.assign(that.lstSalesInvoiceEditDetailstemp,lstSalesInvoiceItemsdata) ;
       Object.assign(that.lstSalesInvoiceEditDetails,lstSalesInvoiceItemsdata);
      
if(this.StoreSalesInvoice.lstTermsChild==null){
  this.lstTermsChild=[]
}else{
  Object.assign(this.lstTermsChild,this.StoreSalesInvoice.lstTermsChild)
}
      var i = 0;

      var lstTermsChilddata = $.map(this.lstTermsChild, function (obj) {
        i = i + 1;
      return { ...obj, SNO: i};
      });
      this.lstTermsChild = lstTermsChilddata;




      this.lstCharges = this.StoreSalesInvoice.lstCharges == null ? [] : this.StoreSalesInvoice.lstCharges;

      var i = 0;

      var lstChargesdata = $.map(this.lstCharges, function (obj) {
        i = i + 1;
        return { ...obj, SNO: i};
      });
      this.lstCharges = lstChargesdata;




      this.lstPayemnts = this.StoreSalesInvoice.lstPayemnts == null ? [] : this.StoreSalesInvoice.lstPayemnts;

      var i = 0;

      var lstPayemntsdata = $.map(this.lstPayemnts, function (obj) {
        i = i + 1;
        return { ...obj, SNO: i};
      });
      this.lstPayemnts = lstPayemntsdata;





     

      this.lstSalesInvoiceEditDetails = this.StoreSalesInvoice.lstSalesInvoiceEditDetails == null ? [] : this.StoreSalesInvoice.lstSalesInvoiceEditDetails;

      var i = 0;

      var lstlstSalesInvoiceEditDetailsdata = $.map(Object.assign([],this.lstSalesInvoiceEditDetails), function (obj) {
        // i = i + 1;
        // obj.SNO = i;
        // return obj;
        i = i + 1;
        return { ...obj, SNO: i};
      });


      this.lstBindEditDetails = [];


      for (var i = 0; i < lstlstSalesInvoiceEditDetailsdata.length; i++) {
        if (lstlstSalesInvoiceEditDetailsdata[i].CreatedID == this.tempCtID) {
          var result = lstlstSalesInvoiceEditDetailsdata.filter((x) => { return x.CreatedID == this.tempCtID; });
          if (result.length > 0) {
            this.lstBindEditDetails.push(result);
            this.tempCtID++;
          }
        }

      }
      for (var i = 0; i < this.lstBindEditDetails.length; i++) {
        
        this.lstTempBindEditDetails.push(this.lstBindEditDetails[i][0]);
      }

      this.lstSalesInvoiceEditDetails = lstlstSalesInvoiceEditDetailsdata;






      this.lstSalesInvoiceItemsStock = this.StoreSalesInvoice.lstSalesInvoiceItemsStock == null ? [] : (Object.assign([],this.StoreSalesInvoice.lstSalesInvoiceItemsStock));

      var i = 0;
      
      var lstSalesInvoiceItemsStockdata = $.map(Object.assign([],this.lstSalesInvoiceItemsStock), function (obj) {
        i = i + 1;
      return { ...obj, SNO: i};
        
      });
      this.lstSalesInvoiceItemsStock = lstSalesInvoiceItemsStockdata;


      if (this.StoreSalesInvoice.TransactionId>0) {
     
        var TransactionDate = formatDate(new Date(this.StoreSalesInvoice.TransactionDate), 'MM/dd/yyyy', 'en');
        var TransactionTime = formatDate(new Date(this.StoreSalesInvoice.TransactionTime), 'HH:mm', 'en');
      } else {
       
        var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionTime = formatDate(new Date(), 'HH:mm', 'en');

     

      }



     // $("#RequiredDate").val(RequiredDate)
      $("#TransactionDate").val(TransactionDate)
      $("#TransactionTime").val(TransactionTime)
      $("#ProductReference").val(this.StoreSalesInvoice.ProductReference)
      $("#BillRefNo").val(this.StoreSalesInvoice.CustomerRefNo)

      $("#TransportMode").val(this.StoreSalesInvoice.TransportMode)
      $("#TransportName").val(this.StoreSalesInvoice.TransportName)
      $("#TransportDate").val(this.StoreSalesInvoice.TransportDate)
      
      
      this.TransactionDate = TransactionDate;

      this.CreateSalesInvoice.patchValue(this.StoreSalesInvoice);
      if (this.StoreSalesInvoice.ReferenceNo != "" && this.StoreSalesInvoice.TransactionId == 0) {
       
        this.GstTaxFromHSNAndGSTTypeForGridView();
        this.GstTaxFromHSNAndGSTTypeForChargesGridView();
      }

      this.ShippingDetailsPartyId(this.StoreSalesInvoice.PartyId, false);
      this.TransportDetByPartyId(this.StoreSalesInvoice.PartyId);
    }
    else {
      this.InvoiceType = "Invoice";
    }   
  
    var that = this;
   
   that.CreateSalesInvoice.valueChanges.subscribe(value => {
      
      that.StoreSalesInvoice.SequenceNumberId = value.SequenceNumberId;
      that.StoreSalesInvoice.Contactno = value.Contactno;
      that.StoreSalesInvoice.Email = value.Email;
      //that.StoreSalesInvoice.RequiredDate = value.RequiredDate;
      that.StoreSalesInvoice.Billto = value.Billto;
      that.StoreSalesInvoice.Shipto = value.Shipto;
      that.StoreSalesInvoice.TransportId = value.TransportId;
      that.StoreSalesInvoice.Area = value.Area;
      that.StoreSalesInvoice.TransportName = value.TransportName;


      that.StoreSalesInvoice.TransportMode = value.TransportMode;
      that.StoreSalesInvoice.TransportName1 = value.TransportName1;
      that.StoreSalesInvoice.TrackingNo = value.TrackingNo;
      that.StoreSalesInvoice.TransportDate = value.TransportDate;
      that.StoreSalesInvoice.VehicleNo = value.VehicleNo;
      that.StoreSalesInvoice.DriverName = value.DriverName;
      that.StoreSalesInvoice.PersonName = value.PersonName;
      that.StoreSalesInvoice.PhoneNo = value.PhoneNo;
      that.StoreSalesInvoice.CustomerRefNo = value.CustomerRefNo;
      that.StoreSalesInvoice.ProductReference = value.ProductReference;
      that.StoreSalesInvoice.BillRefNo = value.BillRefNo;
      that.StoreSalesInvoice.ReferenceNo = that.ReferenceNo;
      that.StoreSalesInvoice.ReferenceType = that.ReferenceType;
      that.StoreSalesInvoice.lstSalesInvoiceItemsStock = that.lstSalesInvoiceItemsStock;
      that.StoreSalesInvoice.lstCharges = that.lstCharges;
      that.StoreSalesInvoice.lstPayemnts = that.lstPayemnts;
      that.StoreSalesInvoice.SaleType = value.SaleType;

      that.StoreSalesInvoice.SelectedState = that.SelectedState;

      that.StoreSalesInvoice.Commissionaccount = value.Commissionaccount;
      that.StoreSalesInvoice.CommissionPayableAccount = value.CommissionPayableAccount;


      that.StoreSalesInvoice.CommitionPartyId = value.CommitionPartyId;
      that.StoreSalesInvoice.CommitionPartyName = value.CommitionPartyName;
      that.StoreSalesInvoice.CommitionPer = value.CommitionPer;
      that.StoreSalesInvoice.CommitionAmount = value.CommitionAmount;

      that.StoreSalesInvoice.ShiptoAddress = value.ShiptoAddress;
      that.StoreSalesInvoice.Terms = value.Terms;
      that.StoreSalesInvoice.TermsandConditions = value.TermsandConditions;
      that.StoreSalesInvoice.Salesaccount = value.Salesaccount;
      that.StoreSalesInvoice.Discountaccount = value.Discountaccount

      that.StoreSalesInvoice.BillToStateCode = that.BillToStateCode;
      that.StoreSalesInvoice.BillToStateName = that.BillToStateName;

      that.StoreSalesInvoice.TaxType = that.TaxType;
      that.StoreSalesInvoice.Notes = value.Notes;

      that.StoreSalesInvoice.PaymentTerms = value.PaymentTerms;
      that.StoreSalesInvoice.TransactionTime = value.TransactionTime;
      that.StoreSalesInvoice.TransactionDate = value.TransactionDate;
      that.StoreSalesInvoice.TransactionId = value.TransactionId;

      that.StoreSalesInvoice.TransactionNo = value.TransactionNo;
      that.StoreSalesInvoice.PartyName = value.PartyName;
      that.StoreSalesInvoice.PartyGSTNo = this.PartyGSTNo;

      that.StoreSalesInvoice.PartyId = value.PartyId;

      that.StoreSalesInvoice.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate.toString());
      that.StoreSalesInvoice.ViewName = 'SalesInvoice';

      that.StoreSalesInvoice.lstSalesInvoiceItems = that.lstSalesInvoiceItems;

      that.StoreSalesInvoice.lstTermsChild = that.lstTermsChild;
      that.store.dispatch(new TabStore.AddTab(Object.assign({},that.StoreSalesInvoice )));
    });

    this.CalculateTotals();
    this.CalcPaymentTotal();
    this.Amountinwords = this.APICall.toWords(this.Total);
  }
  ShowEditDetails(d) {
    var result = this.lstSalesInvoiceEditDetails.filter((x) => { return x.CreatedID == d.CreatedID; });
    if (result.length > 0) {
      this.lstShowDetails = result;
    }
  }

  GstTaxFromHSNAndGSTTypeForChargesGridView() {
   

    if (this.lstCharges.length > 0) {
      var xmlHsnInfo = "";
      var rows = "";

      for (var i = 0; i < this.lstCharges.length; i++) {
        this.lstCharges[i].ChargesCGSTPer = 0;
        this.lstCharges[i].ChargesSGSTPer = 0;
        this.lstCharges[i].ChargesIGSTPer = 0;

        this.lstCharges[i].ChargesCGSTAmount = 0;
        this.lstCharges[i].ChargesSGSTAmount = 0;
        this.lstCharges[i].ChargesIGSTAmount = 0;


        this.lstCharges[i].CCGSTAccountId = 0;
        this.lstCharges[i].CSGSTAccountId = 0;
        this.lstCharges[i].CSGSTAccountId = 0;
        rows = rows + '<Table1><HSN>' + this.lstCharges[i].SACCode + '</HSN></Table1>'


      }
      xmlHsnInfo = '<NewDataSet>' + rows + '</NewDataSet>';


     

      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo, this.TaxType, this.TransactionDate).subscribe(
        (res) => {

         
          $("#loaderParent").click();

          this.lstDbResult = JSON.parse(res['Message']);



          if (this.lstDbResult.Table.length > 0) {
            var resultInfo = this.lstDbResult.Table;


            for (var i = 0; i < this.lstCharges.length; i++) {
              this.lstCharges[i].ChargesCGSTPer = 0;
              this.lstCharges[i].ChargesSGSTPer = 0;
              this.lstCharges[i].ChargesIGSTPer = 0;

              this.lstCharges[i].ChargesCGSTAmount = 0;
              this.lstCharges[i].ChargesSGSTAmount = 0;
              this.lstCharges[i].ChargesIGSTAmount = 0;
              var ResultItem = resultInfo.filter(d => d.HSN === this.lstCharges[i].SACCode);
              if (ResultItem.length > 0) {


                for (let j = 0; j < ResultItem.length; j++) {
                  if (ResultItem[j].TaxType == "CGST") {
                    this.lstCharges[i].ChargesCGSTPer = (ResultItem[j].TaxPercentage2);

                    this.lstCharges[i].ChargesCGSTAmount = ((+this.lstCharges[i].ChargesAmount) * (+this.lstCharges[i].ChargesCGSTPer)) / 100;

                    try {

                      this.lstCharges[i].CCGSTAccountId = (ResultItem[j].PostAccountId);
                      // this.lstSalesInvoiceItems[i].CGSTAccountName=(ResultItem[j].AccountName);
                    } catch (e) {

                    }


                  }

                  if (ResultItem[j].TaxType == "SGST") {
                    this.lstCharges[i].ChargesSGSTPer = (ResultItem[j].TaxPercentage2);
                    this.lstCharges[i].ChargesSGSTAmount = ((+this.lstCharges[i].ChargesAmount) * (+this.lstCharges[i].ChargesSGSTPer)) / 100;
                    try {

                      this.lstCharges[i].CSGSTAccountId = (ResultItem[j].PostAccountId);
                      //this.lstSalesInvoiceItems[i].SGSTAccountName=(ResultItem[j].AccountName);
                    } catch (e) {

                    }


                  }

                  if (ResultItem[j].TaxType == "IGST") {
                    this.lstCharges[i].ChargesIGSTPer = (ResultItem[j].TaxPercentage2);
                    this.lstCharges[i].ChargesIGSTAmount = ((+this.lstCharges[i].ChargesAmount) * (+this.lstCharges[i].ChargesIGSTPer)) / 100;
                    try {

                      this.lstCharges[i].CIGSTAccountId = (ResultItem[j].PostAccountId);
                      // this.lstSalesInvoiceItems[i].IGSTAccountName=(ResultItem[j].AccountName);
                    } catch (e) {

                    }
                  }


                }
              }

            }
           
            this.CalculateTotals();
          }


          else {
            // (window as any). swal("Cancelled", "Failed:)", "error");
            //this.FormErrormsg="Failed.";

          }




        }
      );
    }
  }
  PrintCloseClick() {
    this.SalesInvoiceData = null;
    $("#btnCloseSalesInvoicePrint").click();


  }
  SelectedState = 0;
  SelectedDate = ($("#TransactionDate").val());
  BillToStateName = '';
  BillToStateCode = '';
  selectedCustomer:Customer;
 
  CustomerValueChange(event) {
  
    this.BillToStateName = '';
    this.BillToStateCode = '';
    this.selectedCustomer=Object.assign({},event); 
    var that=this
 
    if (that.lstSalesInvoiceItems.length > 0) {

    
      (window as any).swal({
        icon: "warning",
        title: "Are you sure?",
        text: "Are you Want To add Previous Item or Continue  ?",

        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      }).then(function (isConfirm) {
       
        if (isConfirm) {
     
     
     // that.f.OrderNo.setValue('')
      $("#drpOrder").val('').trigger('change');

          for (let i = 0; i < that.lstSalesInvoiceItems.length; i++) {
       
            if (that.lstSalesInvoiceItems[i].RefLineID33 > 0) {
              that.lstSalesInvoiceItems[i]["RefLineID33"] = 0;
              that.lstSalesInvoiceItems[i]["RefType1"] = "";
              that.lstSalesInvoiceItems[i]["RefNo2"] = "";
              that.lstSalesInvoiceItems[i]["RefId"]=0;
              that.lstSalesInvoiceItems[i]["RefDate3"] = "";
              that.lstSalesInvoiceItems[i]["LineId"] = 0;
            }
           
            
          }
        

        }

        else {
          $("#drpOrder").val('').trigger('change');
          for (let g = ((+that.lstSalesInvoiceItems.length)-1); g >= 0; g--) {
            if (that.lstSalesInvoiceItems[g].RefLineID33 > 0) {
              that.lstSalesInvoiceItems[g]["SNO"] = (that.lstSalesInvoiceItems.length -1);
              that.lstSalesInvoiceItems.splice(g, 1);
            }
          }
        }
      });
    }
    this.DisplayCustomerId = event.CustomerId;
    this.SelectedState = event.state;
    this.f.Email.setValue(event.email);
    this.f.Contactno.setValue(event.Contactno);
    this.f.PartyId.setValue(event.CustomerId);
    this.f.PartyName.setValue(event.text);
    this.PartyGSTNo = event.gstno;
    this.BillToStateName = event.statename;
    this.BillToStateCode = event.statecode;
    var Address = (event.address1 != "" ? event.address1 : '');

    if (Address != "" && event.address2 != "") {
      Address = Address + ',' + (event.address2 != "" ? event.address2 : '');
    }

    if (Address != "" && event.address3 != "") {
      Address = Address + ',' + (event.address3 != "" ? event.address3 : '');
    }


    if (Address != "" && event.cityname != "") {
      Address = Address + ',' + (event.cityname != "" ? event.cityname : '');
    }
    if (Address != "" && event.statename != "") {
      Address = Address + ',' + (event.statename != "" ? event.statename : '');
    }
    if (Address != "" && event.countryname != "") {
      Address = Address + ',' + (event.countryname != "" ? event.countryname : '');
    }
    if (Address != "" && event.pincode != "") {
      Address = Address + ',' + (event.pincode != "" ? event.pincode : '');
    }
    this.f.Billto.setValue(Address);

    this.f.ShiptoAddress.setValue(Address);
    this.ShippingDetailsPartyId(event.CustomerId, true);
    this.TransportDetByPartyId(event.CustomerId);
    //billto
    if (this.CompanyStateId != this.SelectedState
    ) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

    this.GstTaxFromHSNAndGSTTypeForGridView();


  }

  ChangeModeofTransport(value: string) {
   
    this.FilterBy = value;
  }


  OpenCustomer() {
    this.APICall.OpenPageFromRefernce('Customer', './Sales/CreateCustomer', 'Sales')
    this.router.navigate(['Sales/CreateCustomer']);
  }
  tempNotepartno: string = "";
  tempNoteMakeId: string = "";
  tempNotePrice: string = "";
  noteValue: string = "";
  AddNote(d) {
   
    var v = this.noteValue;
    for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
      if (this.lstSalesInvoiceItems[i].Partno == d.Partno
        &&  this.lstSalesInvoiceItems[i].MakeId == d.MakeId
        && this.lstSalesInvoiceItems[i].Rate == d.Rate) {
       
        this.tempNotepartno = d.Partno;
        this.tempNoteMakeId=d.MakeId;
        this.tempNotePrice=d.Rate;
        if (this.lstSalesInvoiceItems[i].Note != "") {
          this.f.itemNote.setValue(this.lstSalesInvoiceItems[i].Note);
        } else {
          this.f.itemNote.setValue('');
        }
      }
    }
  }

  addnotevalid = false;
  saveNote() {
   
    var v = $("#noteid").val();
    // var vh=$(#noteid").html();

    for (var i = 0; i < this.lstSalesInvoiceItems.length; i++) {
      if (this.lstSalesInvoiceItems[i].Partno == this.tempNotepartno        
        &&  this.lstSalesInvoiceItems[i].MakeId == this.tempNoteMakeId
        && this.lstSalesInvoiceItems[i].Rate == this.tempNotePrice
        ) {
       
        this.lstSalesInvoiceItems[i].Note = ($("#noteid").val().toString()).replace(/\n/g, ' <br> ');

      }
    }
    $('#addnoteclose').trigger('click');




  }


  sendemail() {
   
    let body = "SREE VENKATESWARA EXPORTS Sales Invoice";
    let cc = this.APICall.GetEmail();
   
    // let doc = new jsPDF();
    var formData = document.getElementById("PrintArea").innerHTML;
    // var html =  doc.addHTML(document.getElementById("PrintArea").innerHTML);
    // this.APICall.SaveFile(formData,'pdf').subscribe((x:any)=>{
    //  

    //   var d=x;

    //     });

    this.APICall.Sendmail('santosh@mechknowsoft.com', 'Project Requirement', body, "Purchase Invoice", "", cc).subscribe(
      (res: any) => {
       
      });
  }


  tempshipto: number = 0;
  tempshipadd: string = "";
  fieldsChange(e) {
   
    if (e.target.checked) {
      this.tempshipto = this.f.Shipto.value;
      this.tempshipadd = this.f.ShiptoAddress.value;
      this.f.Shipto.setValue(0);
      this.f.ShiptoAddress.setValue("");
    }
    else {
      this.f.Shipto.setValue(this.tempshipto);
      this.f.ShiptoAddress.setValue(this.tempshipadd);
    }
  }


  //LoadMakes() {


  //  this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","");
  //        return JSON.stringify({ "Operation": 'ViewMakByItemId', "Params": sstring, "Xml2": 'All', "Xml3": that.PreapareMakeParam(), "Xml4": that.APICall.GetCompanyID() })
  //

  //}
  private _SelecedRow: any;
  LoadReference() {
   
    var that = this;
if(this.StoreSalesInvoice.TemplateType !=undefined && this.StoreSalesInvoice.TemplateType!=null && this.StoreSalesInvoice.TemplateType!="")
{
    (<any>$("#drpReference")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250, minimumInputLength: 4,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
           
            return JSON.stringify({ "Operation": 'SalesInvoiceReferences', "Params": that.StoreSalesInvoice.TemplateType, "Xml2": 'All', "Xml3": that.StoreSalesInvoice.PartyId, "Xml4": that.APICall.GetCompanyID() })

          },
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {

          var ResultData = (JSON.parse(response['Message'])).Table;
         
          var data = $.map(ResultData, function (obj) {

            obj.id = obj.TransactionId;
            obj.text = obj.TransactionNo;
            obj.date = obj.TransactionDate;

            return obj;
          });
          return { results: data };
        },
        cache: false
      },
      
      templateResult: this.format
     
    });

    $('#drpReference').on('select2:open', function (e) {
      var html = '';

      if(that.StoreSalesInvoice.TemplateType=='Template')
{
  html= '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="100%"><b>Template Name</b></td>  </tr > </tbody> </table>';
}
else
{
       html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Invoice No</b></td> <td width="50%"><b>Date</b></td> </tr > </tbody> </table>';
}
      var res = $('.select2-search');

      var text = res[0].innerText;

      if (text == "")
        $('.select2-search').append(html);
    });

    var that = this;
    $('#drpReference').on('select2:select', function (e) {

      if (typeof ((<any>e).params.data.id) != 'undefined') {
       

        if(that.StoreSalesInvoice.ReferenceId != (<any>e).params.data.id)
        {

        that.StoreSalesInvoice.ReferenceId = (<any>e).params.data.id;
        that.StoreSalesInvoice.Reference= (<any>e).params.data.text;
        that.StoreSalesInvoice.ReferenceDate   = (<any>e).params.data.TransactionDate       
        that.LoadReferenceItems();
        }
      }
    });

    $("#drpReference").on("select2:unselecting", function (e) {

      that.StoreSalesInvoice.ReferenceId = 0;
      that.StoreSalesInvoice.Reference = "";
      that.StoreSalesInvoice.ReferenceDate = "";
      //  that._SelecedRow.TransactionDate   = ""       


    });
  }
  }


  LoadReferenceItems() {
    var sp = "";
    if (this.StoreSalesInvoice.ReferenceId>0)
    {
    try {
      if (this.StoreSalesInvoice.TemplateType == 'DC') {
        sp = "ViewDC";
      }
      else if (this.StoreSalesInvoice.TemplateType == 'ProformaInvoice') {
        sp = "ViewProformaInvoice";
      }
      else if (this.StoreSalesInvoice.TemplateType == 'SalesQuotation') {
        sp = "SalesInvoiceSQItems";
      }
      else if (this.StoreSalesInvoice.TemplateType == 'SalesOrder') {
        sp = "ViewSalesOrder";
      }
      else if (this.StoreSalesInvoice.TemplateType == 'Template') {
        sp = "TemplatesView";
      }
      else if (this.StoreSalesInvoice.TemplateType == 'PurchaseQuotation') {
        sp = "ViewPurchaseQuotation";
      }
      else if (this.StoreSalesInvoice.TemplateType == 'PurchaseInvoice') {
        sp = "ViewPurchaseInvoice";
      }else if (this.StoreSalesInvoice.TemplateType == 'SalesInvoice') {
        sp = "ViewSalesInvoice";
      }


      if (AppSettings.ShowLoaderOnView) {
        $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

        $("#loaderParent").show();
      }


     
      this.APICall.DBCalling(sp, "", "All", this.StoreSalesInvoice.ReferenceId, this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
         
          
          this.lstDbResult1 = JSON.parse(res['Message']);

         var lstItems:any;
          if (this.lstDbResult1.Table.length > 0) {        
           
           
            if (this.StoreSalesInvoice.TemplateType == 'DC') {
              lstItems = this.lstDbResult1.Table[0].lstDCItems;
              
            }
            else if (this.StoreSalesInvoice.TemplateType == 'ProformaInvoice') {
              lstItems = this.lstDbResult1.Table[0].lstProformaInvoiceItems;
              
            }
            else if (this.StoreSalesInvoice.TemplateType == 'SalesQuotation') {
              lstItems =this.lstDbResult1.Table[0].lstQuotationItems;             
              
            }
            else if (this.StoreSalesInvoice.TemplateType == 'SalesOrder') {
              lstItems = this.lstDbResult1.Table[0].lstOrderItems;  
              
            }
            else if (this.StoreSalesInvoice.TemplateType == 'Template') {
              lstItems = this.lstDbResult1.Table[0].lstTemplatesItems;  
              
            }
            else if (this.StoreSalesInvoice.TemplateType == 'PurchaseQuotation') {
              lstItems =  this.lstDbResult1.Table[0].lstQuotationItems;  
              
            }
            else if (this.StoreSalesInvoice.TemplateType == 'PurchaseInvoice') {
              lstItems = this.lstDbResult1.Table[0].lstInvoiceItems;  
              
            }
            else if (this.StoreSalesInvoice.TemplateType == 'SalesInvoice') {
              lstItems = this.lstDbResult1.Table[0].lstSalesInvoiceItems;  
              
            }
           
            if(lstItems!=null && typeof(lstItems)!=undefined)
            {
            try{
            var val=((lstItems).replace(/\n/g, "")).replace(/'/g,"\"");

            var items=JSON.parse(val);

            
              for(let i=0; i<items.length; i++)
              {
                items[i]["SNO"]= (this.lstSalesInvoiceItems.length +1);
                items[i]["CGSTAccountId"]=0;
                items[i]["SGSTAccountId"]=0;
                items[i]["IGSTAccountId"]=0;
                items[i]["Show"]="true";
                items[i]["RefLineId"]= items[i]["LineId"];
                items[i]["LineId"]=0;
                items[i]["RefId"]=this.StoreSalesInvoice.ReferenceId;
                items[i]["RefDate3"]=this.StoreSalesInvoice.ReferenceDate;               
                items[i]["RefNo2"]=this.StoreSalesInvoice.Reference;
                items[i]["RefType1"] = this.StoreSalesInvoice.TemplateType;
                this.lstSalesInvoiceItems.push(items[i]);
                this.CalculateTotals();
              }
            }
         
            catch(error)
            {}
            }
           
            
          }
        });
    }
    catch (error) { }
  }
  }



  format(opt) {
    if (!opt.id) {
      return opt.text;
    }
     var $opt

     
     $opt= $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.TransactionNo + '</td><td width="50%">' + opt.TransactionDate + '</td></tr></tbody></table>');
    
    return $opt;
  };

  

//excel download
@ViewChild('TABLE', { static: false }) TABLE: ElementRef;
ExportTOExcel() {  
 
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement); 
  ws['!cols'] = [{ width: 10}, { width: 20 }, { width: 30 } ]; 
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, 'SalesInvoice.xlsx');  

}

@ViewChild('PDFTable',{static:false}) pdfTable: ElementRef;

 public downloadAsPDF() {
  
  //   const pdfTable = this.pdfTable.nativeElement;
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   const documentDefinition = { content: html };
  //  pdfMake.createPdf(documentDefinition).download(); 
   
 }

 downloadAsPDF1(e)
 {
 

 }

 
 download()
 {}
 Customer:Customer;
  lstCustomers:any=[];
  LoadCustomers(e)
  {
    try{
 
     if(AppSettings.ShowLoaderOnView)
     {
   
  
  $("#loaderParent").show();
     }
     var sstring='';
   
     this.APICall.DBCalling("ViewCustomers",sstring,this.FilterType,this.DisplayCustomerId,this.APICall.GetCompanyID()).subscribe(
       (res:Response) => {
        
         this.lstDbResult=JSON.parse(res['Message']);
       
         
         this.lstCustomers=[]
         if(this.lstDbResult.Table.length>0)
         {
            var list
          this.lstCustomers=this.lstDbResult.Table[0];
     
          list= Object.assign({},this.lstCustomers);
   


          this.Customer= Object.assign({},this.lstCustomers);
          if(this.selectedCustomer!=undefined && this.selectedCustomer!=null )
          {    
           this.selectedCustomer.ViewName="RequestFromDc";
            this.Customer=Object.assign({},this.selectedCustomer);  
        }
       
         this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
         
         var ActivatedRoute=localStorage.getItem("ActivatedRoute");
          this.Customer.TabId=ActivatedRoute;
        this.store.dispatch(new  TabStore.AddTab(Object.assign([], this.Customer)));         
        this.router.navigate(['Sales/CreateCustomer']);






   
         }
         $("#loaderParent").hide();
       
       });
      
    }
    catch(error)
    {
 
     }
     return  this.lstCustomers;
   }         
CustomerMaster(){
 

  this.Customer=new Customer;
  
  this.LoadCustomers(this.DisplayCustomerId)

}


SalesType="";
CashCustomerArray:any=[]
SalesTypeChange(target) {
  this.SalesType=target.value;
  
;
  if(target.value==="Cash")
  {

this.CashViewCustomer()


  }
  else{
    this.DisplayCustomerId=0;
this.DispalyCustomerName="";
this.PartyId="";
  }


}
CashCustomer=""
CashViewCustomer(){
  var sstring=''
 
   this.APICall.DBCalling("ViewCashCustomers",sstring,this.CashCustomer,
   this.APICall.GetCompanyID(),this.APICall.GetBranchID()).subscribe(
     (res:Response) => {
      
      this.lstDbResult=JSON.parse(res['Message']);
     
       
      this.CashCustomerArray=[];
       if(this.lstDbResult.Table.length>0)
       {
         this.CashCustomerArray=this.lstDbResult.Table;
         this.DisplayCustomerId=this.lstDbResult.Table[0].CustomerId;
         this.DispalyCustomerName=this.lstDbResult.Table[0].Customername;

         this.StoreSalesInvoice.PartyId=this.lstDbResult.Table[0].CustomerId;
         this.StoreSalesInvoice.PartyName=this.lstDbResult.Table[0].Customername;
         this.PartyId=this.lstDbResult.Table[0].CustomerId;
         
       }
})

}

}
