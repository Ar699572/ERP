import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import '../../../assets/vendors/datepicker/daterangepicker.js';
import { Store } from '@ngrx/store';
import { StorePurchaseInvoice } from 'src/app/Store/StorePurchaseInvoice';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { StoreAccountingSettings } from 'src/app/Store/StoreAccountingSettings';
import { StoreLoadPurchaseInvoice } from 'src/app/store/StoreLoadPurchaseInvoice';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Vendor } from 'src/app/store/StoreVendor';
import { objectEach } from 'highcharts';


@Component({
  selector: 'app-create-purchase-invoice',
  templateUrl: './create-purchase-invoice.component.html',
  styleUrls: ['./create-purchase-invoice.component.css'],
  providers: [DatePipe]
})

export class CreatePurchaseInvoiceComponent implements OnInit {

  CreatePurchaseInvoice: FormGroup;
  TransactionType = "Purchase";
  DisplayVendorId = 0;
  DiscountPer1: string = "";
  Exchange: string = "";
  DispalyVendorName = "";
  acntname: string = "";
  DisplaySequenceNumberId = 0;
  DispalyFormName = 'PurchaseInvoice'
  filterBy: string = "";
  Invoicetype: string = "";
  BCDAccount: number = 0;
  SWSAccount: number = 0;
  Modified: number = 0;
  bcdamt: number = 0;
  educessamt: number = 0;
  InvoiceData: any;
  CurrentTime: any;
  ShowStockSelection = true;
  type = "purchaseInvoice";
  PartyGSTNo = "";
  packingChargesValue = "18";
  myDate :any= new Date();

  constructor(private DbCallings: CommonDbCallings, private router: Router, private formBuilder: FormBuilder,
     public APICall: APICallingService,private datePipe: DatePipe,
    private store: Store<any>) {
    debugger;
    //var res = this.APICall.GetCurrencyId();
    this.CreatePurchaseInvoice = formBuilder.group(  {
        SequenceNumberId: new FormControl(0),

        Contactno: new FormControl(''),
        Email: new FormControl(''),
        OrderNo: new FormControl(''),
        RequiredDate: new FormControl(''),
        Billto: new FormControl(''),
        Shipto: new FormControl(0),
        InvoiceType: new FormControl(''),
        Totalvalueininr: new FormControl(0),
        CustomerRefNo: new FormControl(''),
        ItemNote:new FormControl(''),
        //Currencyname:new FormControl(''),
        PartNo0Id: new FormControl(0),
        Partname: new FormControl(''),
        Image: new FormControl(''),
        // ExchangeRate1: new FormControl(0),
        Vendorname: new FormControl(''),
        VendorId: new FormControl(''),
        description1: new FormControl(''),
        vendorinvoicenumber: new FormControl(''),
        SaleType: new FormControl(''),
        ShiptoAddress: new FormControl(''),
        CurrencyId: new FormControl(0),
        ExchangeRate: new FormControl(1),
        Terms: new FormControl(''),
        TermsandConditions: new FormControl(''),
        PaymentTerms: new FormControl(''),
        TransactionTime: new FormControl(''),
        TransactionDate: new FormControl('', [Validators.required]),
        TransactionId: new FormControl(0),
        TransactionNo: new FormControl(''),
        PurchaseType: new FormControl('Debit'),
        PartyId: new FormControl(0, [Validators.required, Validators.min(1)]),
        PartyName: new FormControl(''),
        notes: new FormControl(''),
        LineChanges: new FormControl(0),
        SearchString: new FormControl(''),
        searchPartNo: new FormControl(''),
        searchDescription: new FormControl(''),
        searchMake: new FormControl(''),
        searchHSN: new FormControl(''),

        Incoterms: new FormControl(''),
        vdate: new FormControl(''),
       
        Vendorreference: new FormControl(''),
        VendorreferenceType: new FormControl(''),
        Type: new FormControl(''),
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

        CCGSTAccountId: new FormControl(0),
        CSGSTAccountId: new FormControl(0),
        CIGSTAccountId: new FormControl(0),
        MakeId1: new FormControl(0),
        Make1: new FormControl(''),

        Purchaseaccount: new FormControl(0),
        Discountaccount: new FormControl(0),
        freightchargesaccount: new FormControl(0),
        clearingchargesaccount: new FormControl(0),
        loadingchargesaccount: new FormControl(0),
        insuranceaccount: new FormControl(0),

        freigntcharges: new FormControl(0),
        loadingcharges: new FormControl(0),
        insuranceamount: new FormControl(0),
        clearingcharges: new FormControl(0),
        PackingAmount: new FormControl(0),
        PackingIGST: new FormControl(0),
        PackingCGST: new FormControl(0),
        PackingSGST: new FormControl(0),
        PackingTaxPercentage: new FormControl(0),
        PackingNetTotal: new FormControl(0),

        LoadingAmount: new FormControl(0),
        LoadingIGST: new FormControl(0),
        LoadingCGST: new FormControl(0),
        LoadingSGST: new FormControl(0),
        LoadingTaxPercentage: new FormControl(0),
        LoadingNetTotal: new FormControl(0),

        TransportAmount: new FormControl(0),
        TransportIGST: new FormControl(0),
        TransportCGST: new FormControl(0),
        TransportSGST: new FormControl(0),
        TransportTaxPercentage: new FormControl(0),
        TransportNetTotal: new FormControl(0),
        TemplateType: new FormControl('')
      }

    );
    // setInterval(() => {
    //   debugger;
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);
    
   // this.myDate= this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    //}, 1);


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }

  TemplateTypeChange(event) {
    try {
      debugger;
      this.StorePurchaseInvoice.TemplateType = event.value;
      this.LoadReferences();

    }
    catch (e) { }
  }

  DeleteItem(e) {
    debugger;
    this.RemoveItemClick(e)
  }


  ReArrangeSNo() {
    for (var i = 0; i < this.lstparts.length; i++) {
      for (var j = 0; j < this.lstparts.length; j++) {
        if (this.lstparts[j].Partno == this.lstparts[i].Partno && this.lstparts[j].Rate == this.lstparts[i].Rate) {
          this.lstparts[j].SNO = i + 1        }
      }
    }

  }
  format(opt) {
    debugger;
    if (!opt.id) {
      debugger;
      return opt.text;
    }

    var $opt;


    $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.TransactionNo + '</td><td width="50%">' + opt.TransactionDate + '</td></tr></tbody></table>');

    return $opt;
  };

  LoadReferences() {

    if (this.StorePurchaseInvoice.TemplateType != undefined && this.StorePurchaseInvoice.TemplateType != null && this.StorePurchaseInvoice.TemplateType != "") {
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

              return JSON.stringify({ "Operation": 'SalesInvoiceReferences', "Params": that.StorePurchaseInvoice.TemplateType, "Xml2": 'All', "Xml3": that.StorePurchaseInvoice.PartyId, "Xml4": that.APICall.GetCompanyID() })

            },
          contentType: 'application/json; charset=utf-8',
          processResults: function (response) {

            var ResultData = (JSON.parse(response['Message'])).Table;

            var data = $.map(ResultData, function (obj) {

              debugger;
              if (that.StorePurchaseInvoice.TemplateType == 'PurchaseQuotation') {
                if (obj.PartyId == that.StorePurchaseInvoice.PartyId) {
                  obj.id = obj.TransactionId;
                  obj.text = obj.TransactionNo;
                  obj.date = obj.TransactionDate;
                }

              } else {

                obj.id = obj.TransactionId;
                obj.text = obj.TransactionNo;
                obj.date = obj.TransactionDate;
              }
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


        html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Invoice No</b></td> <td width="50%"><b>Date</b></td> </tr > </tbody> </table>';

        var res = $('.select2-search');

        var text = res[0].innerText;

        if (text == "")
          $('.select2-search').append(html);
      });

      var that = this;
      $('#drpReference').on('select2:select', function (e) {

        if (typeof ((<any>e).params.data.id) != 'undefined') {

          if (that.StorePurchaseInvoice.ProductReferenceId != (<any>e).params.data.id) {

            that.StorePurchaseInvoice.ProductReferenceId = (<any>e).params.data.id;
            that.StorePurchaseInvoice.ProductReference = (<any>e).params.data.text;
            that.StorePurchaseInvoice.ProductReferenceDate = (<any>e).params.data.date;
            that.LoadReferenceItems();
          }
        }
      });

      $("#drpReference").on("select2:unselecting", function (e) {

        that.StorePurchaseInvoice.ProductReferenceId = 0;
        that.StorePurchaseInvoice.ProductReference = "";
        that.StorePurchaseInvoice.ProductReferenceDate = "";

      });

    }

  }


  lstDbResult1: any;
  LoadReferenceItems() {
    var sp = "";
    if (this.StorePurchaseInvoice.ProductReferenceId > 0) {
      try {
        if (this.StorePurchaseInvoice.TemplateType == 'MRN') {
          sp = "ViewMRNdata";
        }
        else if (this.StorePurchaseInvoice.TemplateType == 'PurchaseOrder') {
          sp = "ViewPurchaseOrder";
        }
        else if (this.StorePurchaseInvoice.TemplateType == 'PurchaseQuotation') {
          sp = "PurchaseInvoicePQItems";
        }


        if (AppSettings.ShowLoaderOnView) {
          $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

          $("#loaderParent").show();
        }


        debugger;
        this.APICall.DBCalling(sp, "", "All", this.StorePurchaseInvoice.ProductReferenceId, this.APICall.GetCompanyID()).subscribe(
          (res: Response) => {
            debugger;
            this.lstDbResult1 = JSON.parse(res['Message']);

            var lstItems: any;

            if (this.lstDbResult1.Table.length > 0) {


              if (this.StorePurchaseInvoice.TemplateType == 'MRN') {
                lstItems = this.lstDbResult1.Table[0].lstMRNItems;

              }
              else if (this.StorePurchaseInvoice.TemplateType == 'PurchaseOrder') {
                lstItems = this.lstDbResult1.Table[0].lstOrderItems;

              }
              else if (this.StorePurchaseInvoice.TemplateType == 'PurchaseQuotation') {

                lstItems = this.lstDbResult1.Table[0].lstQuotationItems;

              }

              if (lstItems != null && typeof (lstItems) != undefined) {
                try {
                  var val = ((lstItems).replace(/\n/g, "")).replace(/'/g, "\"");

                  var items = JSON.parse(val);

                  if (items.RefNo2 == undefined) {
                    items.RefNo2 = this.RefNo2
                  }

                  for (let i = 0; i < items.length; i++) {
                    items[i]["SNO"] = (this.lstparts.length + 1);
                    items[i]["Show"] = "true";
                    items[i]["RefLineId"] = items[i]["LineId"];
                    items[i]["LineId"] = 0;
                    items[i]["dollarprice"] = 0;
                    items[i]["Show"] = 'true';
                    items[i]["toFixed"] = 0;
                    items[i]["IGSTAmount"] = 0;
                    items[i]["Locationname"] = '';
                    items[i]["LocationId"] = 0;
                    items[i]["BinId"] = 0;
                    items[i]["BinName"] = '';
                    items[i]['InvoiceType1'] = this.filterBy;
                    items[i]['bcd'] = 0;
                    items[i]['sws'] = 0;
                    items[i]['DollerRate'] = 0;
                    items[i]["RefId"] = this.StorePurchaseInvoice.ProductReferenceId;
                    items[i]["RefDate3"] = this.StorePurchaseInvoice.ProductReferenceDate;
                    items[i]["RefNo2"] = this.StorePurchaseInvoice.ProductReference;
                    items[i]["RefType1"] = this.StorePurchaseInvoice.TemplateType;


                    this.lstparts.push(items[i]);
                    this.lstInvoiceItems.push(items[i])
                    this.CalculateTotals();

                  }
                }
                //}
                catch (error) { }
              }


            }
          });
      }
      catch (error) { }
    }
  }
  //packingChargesTaxValue=0;
  packingChargesTaxName = '';
  LoadPackingTaxes() {
    debugger;
    var that = this;
    debugger;
    (<any>$("#drpPackingCharges")).select2({
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

            return JSON.stringify({ "Operation": 'ViewTaxtProfile', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.GSTPercentage;
            obj.text = obj.profilename;
            // obj.GSTPercentage=obj.GSTPercentage;


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
    $('#drpPackingCharges').on('select2:select', function (e) {

      if (typeof ((<any>e).params.data.id) != 'undefined') {

        that.f.PackingTaxPercentage.setValue((<any>e).params.data.id);
        that.packingChargesTaxName = ((<any>e).params.data.text);
        that.packingChargesValue = (<any>e).params.data.id;

        $("#drpPackingCharges").val((<any>e).params.data.id);

        that.PackingTaxPercentageChange((<any>e).params.data.id);
      }

    });
    debugger;
    $("#drpPackingCharges").on("select2:unselecting", function (e) {

      that.f.PackingTaxPercentage.setValue(0);
      that.packingChargesTaxName = '';
      that.packingChargesValue = '';
      $("#drpPackingCharges").val(0);

    });


    var selection = new Option(that.packingChargesTaxName, that.packingChargesValue.toString(), true, true);

    (<any>$('#drpPackingCharges')).append(selection).trigger('change');

  }


  windowScroll(ControlName) {
    var element = document.getElementById(ControlName);
    var rect = element.getBoundingClientRect();

    window.scrollTo(rect.left, rect.top);
  }
  addingvalue: number = 0;
  DollerRate: number = 0;



  freigntchargesChange(target) {
    debugger;
    var val1 = target.value;
    this.Total = this.Total - (+this.StorePurchaseInvoice.freigntcharges);
    this.f.freigntcharges.setValue(val1);
    this.Total = this.Total + (+val1);
    this.StorePurchaseInvoice.freigntcharges = val1;
  }
  loadingchargesChange(target) {
    debugger;
    var val1 = target.value;
    this.Total = this.Total - (+this.StorePurchaseInvoice.loadingcharges);
    this.f.loadingcharges.setValue(val1);
    this.Total = this.Total + (+val1);
    this.StorePurchaseInvoice.loadingcharges = val1;
  }
  insuranceamountChange(target) {
    debugger;
    var val1 = target.value;
    this.Total = this.Total - (+this.StorePurchaseInvoice.insuranceamount);
    this.f.insuranceamount.setValue(val1);
    this.Total = this.Total + (+val1);
    this.StorePurchaseInvoice.insuranceamount = val1;
  }

  clearingchargesChange(target) {
    debugger;
    var val1 = target.value;
    this.Total = this.Total - (+this.StorePurchaseInvoice.clearingcharges);
    this.f.clearingcharges.setValue(val1);
    this.Total = this.Total + (+val1);
    this.StorePurchaseInvoice.clearingcharges = val1;
  }
  insuranceperChange(target) {
    debugger;
    var val1 = target.value;
    this.f.clearingcharges.setValue(val1);
    this.Total = this.Total + (+val1);
  }

  DiscountPer11() {
    debugger;
    this.DiscountPer1 = "PageIN";
    this.Exchange = "";
  }

  ProductDetails11() {
    this.DiscountPer1 = "";
    if (this.filterBy == "Import") {
      this.Exchange = "show";
    }

  }
  Income() {
    this.DiscountPer1 = "";
    this.Exchange = "";
  }
  Frieght() {
    this.DiscountPer1 = "";
    this.Exchange = "";
  }
  CustomDuty() {
    this.DiscountPer1 = "";
    this.Exchange = "";
  }
  AccountValueChange(data) {
    debugger;
    this.f.ChargesCOAId.setValue(data.COAId);
    this.f.ChargesCOAName.setValue(data.Name);
    this.DisplayCgargesCOAId = data.COAId;
    this.DispalyChargesAccountName = data.Name;
    this.f.SACCode.setValue(data.SACCode);
    this.GstTaxbyHSNAndState(data.SACCode);
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
  AddCharges(type) {
    debugger;

    if (this.ValidateCharges()) {
      debugger;
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

        $("#btnClosePurchaseInvoiceCharges").click();
      }
      this.CalculateTotals();
    }

    //}

  }
  RemoveCharges() {
    var sliceIndex = -1;
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
  OnPrint() {

    this.InvoiceData = this;
  }








  lstPurchaseAccounts: any = [];
  lstDiscountAccount: any = [];
  lstPurchaseInvoiceItemsStock: any = [];
  lstfreightchargesaccount: any = [];
  lstclearingchargesaccount: any = [];
  lstloadingchargesaccount: any = [];
  lstinsuranceaccount: any = [];

  ViewPurchaseAccount() {
    var PurchaseAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      PurchaseAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Purchases'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(PurchaseAccountGroup).subscribe(
      (res) => {

        debugger;

        this.lstDbResult = JSON.parse(res['Message']);


        this.lstPurchaseAccounts = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstPurchaseAccounts = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }

  ViewDiscountAccount() {

    var DiscountAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);
      DiscountAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Discount Received'; }))[0].AccountGroupName;



    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

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

  Viewfreightchargesaccount() {
    var FrieghtChargesGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      FrieghtChargesGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Frieght Charges'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(FrieghtChargesGroup).subscribe(
      (res) => {


        this.lstDbResult = JSON.parse(res['Message']);


        this.lstfreightchargesaccount = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstfreightchargesaccount = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }

  RefLineId: number = 0;
  RefId: number = 0;
  RefType1: 'PurchaseInvoice'
  RefNo2: string = "No Referenece"

  Viewclearingchargesaccount() {
    debugger;
    var ClearingChargesGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      ClearingChargesGroup = "Bank Accounts";
      // (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Bank Accounts'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(ClearingChargesGroup).subscribe(
      (res) => {


        this.lstDbResult = JSON.parse(res['Message']);


        this.lstclearingchargesaccount = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstclearingchargesaccount = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }
  Viewloadingchargesaccount() {
    var LoadinChargesGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      LoadinChargesGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Loadin Charges'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    debugger;
    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(LoadinChargesGroup).subscribe(
      (res) => {

        debugger;
        this.lstDbResult = JSON.parse(res['Message']);

        this.lstloadingchargesaccount = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstloadingchargesaccount = this.lstDbResult.Table;
        }

        $("#loaderParent").hide();
      });
  }




  Viewinsuranceaccount() {
    var InsuranceGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);
      debugger;
      InsuranceGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Insurance'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    debugger;
    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetChartOfAccountsByGroup(InsuranceGroup).subscribe(
      (res) => {

        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstinsuranceaccount = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstinsuranceaccount = this.lstDbResult.Table;

        }

        $("#loaderParent").hide();
      });
  }









  submitted = false;
  OnSave() {
    debugger;
    
    this.submitted = true;
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());
    var value = this.ValidateLocationAllotment();
    if(this.f.vdate.value==''){
      var newdate=this.datePipe.transform(this.myDate, 'MM/dd/yyyy')
      this.CreatePurchaseInvoice.patchValue({
    vdate:newdate
      }) ;
    }
     
    // this.f.TransactionTime.setValue($("#TransactionTime").val());

    if (this.CreatePurchaseInvoice.invalid) {
      var Cvalid = true;


      if (this.f.PartyId.invalid && Cvalid) {
        debugger;
        this.windowScroll('PartyId');
        Cvalid = false;
      }

      if (this.f.TransactionDate.invalid && Cvalid) {
        debugger;
        this.windowScroll('TransactionDate');
        Cvalid = false;
      }

      if (value == false) {
        Cvalid = false;

        (window as any).swal({
          icon: 'warning',
          title: 'Invalid Location Allotment',
          text: 'Select Location and Bin',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-warning'
        });

      }

      return;
    }

    else {



      if (this.f.InvoiceType.value == "Import") {
        if ((+this.f.Totalvalueininr.value) > 0 && this.f.PurchaseType.value != "") {
          if (this.lstInvoiceItems.length > 0) {
            this.SaveTransaction();
          }
        }
        else {
          (window as any).swal({
            icon: 'warning',
            title: 'Exchange Currency',
            text: 'Currency must be Exchange in INR.!',
            confirmButtonText: 'Dismiss',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-warning'
          });
        }
      }
      else {

        if (this.lstInvoiceItems.length > 0) {
          this.SaveTransaction();
        }


      }

    }
  }
  ValPurchaseType: string = "";





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
    debugger;

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

        that.DeletePurchaseInvoice();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }

    });

  }
  DeletePurchaseInvoice() {

    // if (this.ModifiedDate.toString().includes('India')) {
    //   var date = new Date(this.ModifiedDate);
    //   this.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    // }


    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'
      + '</Table1></NewDataSet>';
debugger;
    this.APICall.DBCalling("DeletePurchaseInvoice", xml1, "", "", "").subscribe(
      (res: Response) => {

        $("#loaderParent").hide();
        this.DbResult = JSON.parse(res['Message']);
        debugger;
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
          this.router.navigate(['Purchase/PurchaseInvoice']);

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
  ClearViewData() {
    this.submitted = false;
    this.ModifiedDate = "";
    this.CreatePurchaseInvoice.patchValue(


      {
        SequenceNumberId: 0,
        Contactno: '',
        PartyName: '',
        Email: '',
        RequiredDate: '',
        Billto: '',
        Shipto: 0,
        ShiptoAddress: '',
        Vendorreference: '',
        Incoterms: '',
        vdate: '',
        VendorreferenceType: '',
        Terms: '',
        TermsandConditions: '',
        PaymentTerms: '',
        //  TransactionTime:'',
        TransactionDate: '',
        TransactionId: 0,
        TransactionNo: '',

        PartyId: 0,

        Image: "",
        SearchString: '',
        searchPartNo: '',
        searchDescription: '',
        searchMake: '',
        searchHSN: '',
        Purchaseaccount: this.DefaultPurchaseAccount,
        Discountaccount: this.DefaultDiscountAccount,
        freightchargesaccount: this.Defaultfreightchargesaccount,
        loadingchargesaccount: this.DefaultLoadinCharges,
        insuranceaccount: this.DefaultInsuranceCharges

      }
    );
    this.PartyGSTNo = '';
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    // this.f.TransactionTime.setValue(this.CurrentTime);
    $("#Image").attr("src", "");
    var rdate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    $("#RequiredDate").val(rdate)
    $("#TransactionDate").val(rdate)
    //$("#TransactionTime").val(this.CurrentTime)
    this.lstInvoiceItems = null;
    this.lstInvoiceItems = [];
    this.lstTermsChild = null;
    this.lstTermsChild = [];
    this.DisplayVendorId = 0;
    this.DispalyVendorName = "";
    this.DisplaySequenceNumberId = 0;
    this.TotalGross = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    debugger;
    this.StorePurchaseInvoice = new StorePurchaseInvoice;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StorePurchaseInvoice.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StorePurchaseInvoice));



  }


  convertDate(str) {
    debugger;
    var date = new Date(str),
      mnth: any = ("0" + (date.getMonth() + 1)).slice(-2),
      day: any = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    var resDate = [mnth, day, date.getFullYear()].join("-");
    debugger;
    return resDate + " " + hours + ":" + minutes;




  }
  DisplayCgargesCOAId = 0;
  DispalyChargesAccountName = ''
  EditChRecNO = -1;
  SNOCh = 0;
  EditCharges(selectedRecord, SNO) {

    this.EditChRecNO = SNO;
    this.SNOCh = SNO;

    this.CreatePurchaseInvoice.patchValue({

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
  SelectedChargesCalc() {
    debugger;

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
    this.f.TotalCharges.setValue(ChargesAmount + TotalTax);
    this.CalculateTotals();
  }
  tempNotepartno='';
  tempNoteMakeId='';
  tempNotePrice='';
  noteValue: string = "";
 
  AddNote(d) {
    debugger;
    var v = this.noteValue;
    for (var i = 0; i < this.lstparts.length; i++) {
      if (this.lstparts[i].Partno == d.Partno
        &&  this.lstparts[i].MakeId == d.MakeId
        && this.lstparts[i].Rate == d.Rate) {
        debugger;
        this.tempNotepartno = d.Partno;
        this.tempNoteMakeId=d.MakeId;
        this.tempNotePrice=d.Rate;
        if (this.lstparts[i].Note != "") {
          this.f.ItemNote.setValue(this.lstparts[i].Note);
        } else {
          this.f.ItemNote.setValue('');
        }
      }
    }
  }



  addnotevalid = false;
  saveNote() {
    debugger;
    var v = $("#noteid").val();
    // var vh=$(#noteid").html();
    for (var i = 0; i < this.lstparts.length; i++) {
      if (this.lstparts[i].Partno == this.tempNotepartno        
        &&  this.lstparts[i].MakeId == this.tempNoteMakeId
        && this.lstparts[i].Rate == this.tempNotePrice
        ) {
        debugger;
        this.lstparts[i].Note = ($("#noteid").val().toString()).replace(/\n/g, ' <br> ');
    
      }
    }
    $('#addnoteclose').trigger('click');




  }
  lstSelectedTaxdet: any = [];
  GstTaxbyHSNAndState(SACCode) {
    debugger;
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
  ShowMessage: string = "";
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

  lstCharges = [];
  ModifiedDate = "";
  DbResult: any = [];
  showReport: string = "";
  temptransactionid: number = 0;
  lstchargespost: any = [];
  SaveTransaction() {


    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());
 

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    var lstSaveVendorItems: any;
    if (this.lstVendorItems != undefined) {
      if (this.lstVendorItems.length > 0) {
        for (var i = 0; i < this.lstVendorItems.length; i++) {

          var res = this.lstInvoiceItems.filter(x => (x.ItemId == this.lstVendorItems[i].ItemId && x.MakeId == this.lstVendorItems[i].MakeId));

          if (res != undefined) {
            lstSaveVendorItems.push(res);
          }
        }
      }
    }



    for (var i = 0; i < this.lstInvoiceItems.length; i++) {
      if (this.lstInvoiceItems[i].InvoiceType1 == "Import") {
        if ((+this.lstInvoiceItems[i].bcd) > 0) {
          this.bcdamt = this.bcdamt + (+this.lstInvoiceItems[i].bcd)
        }
        if ((+this.lstInvoiceItems[i].sws) > 0) {
          this.educessamt = this.educessamt + (+this.lstInvoiceItems[i].sws)
        }
      }

    }
    if (this.f.Totalvalueininr.value > 0) {

    } else {
      this.f.Totalvalueininr.setValue(0);
    }

    var xml1 = '<NewDataSet><Table1>'

      + '<ShiptoAddress>' + this.getControlValue(this.f.ShiptoAddress, 'string') + '</ShiptoAddress>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<PartyId>' + this.getControlValue(this.f.PartyId, 'int') + '</PartyId>'
      + '<Billto>' + this.getControlValue(this.f.Billto, 'string') + '</Billto>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'

      + '<Shipto>' + this.getControlValue(this.f.Shipto, 'string') + '</Shipto>'

      + '<bcdamt>' + this.bcdamt + '</bcdamt>'
      + '<educessamt>' + this.educessamt + '</educessamt>'

      + '<CurrencyId>' + this.getControlValue(this.f.CurrencyId, 'int') + '</CurrencyId>'
      + '<ExchangeRate>' + this.getControlValue(this.f.ExchangeRate, 'int') + '</ExchangeRate>'

      // +'<TransactionTime>'+this.convertDate(this.getControlValue(this.f.TransactionTime,'string'))+'</TransactionTime>'
      + '<TransactionDate>' + this.getControlValue(this.f.TransactionDate, 'string') + '</TransactionDate>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
      + '<PurchaseType>' + this.getControlValue(this.f.PurchaseType, 'string') + '</PurchaseType>'
      + '<Vendorreference>' + this.getControlValue(this.f.Vendorreference, 'string') + '</Vendorreference>'
      + '<VendorreferenceType>' + this.getControlValue(this.f.VendorreferenceType, 'string') + '</VendorreferenceType>'
      + '<vdate>' + this.getControlValue(this.f.vdate, 'string') + '</vdate>'
      + '<Incoterms>' + this.getControlValue(this.f.Incoterms, 'string') + '</Incoterms>'
      + '<notes>' + this.getControlValue(this.f.notes, 'string') + '</notes>'

      + '<RequiredDate>' + this.getControlValue(this.f.RequiredDate, 'string') + '</RequiredDate>'
      + '<TermsandConditions>' + this.getControlValue(this.f.TermsandConditions, 'string') + '</TermsandConditions>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<TotalGross>' + this.TotalGross + '</TotalGross>'
      + '<PaymentTerms>' + this.getControlValue(this.f.PaymentTerms, 'int') + '</PaymentTerms>'
      + '<TotalDiscount>' + this.TotalDiscount + '</TotalDiscount >'
      + '<TotalTax>' + this.TotalTax + '</TotalTax>'
      + '<Total>' + this.Total + '</Total>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '<Terms>' + this.getControlValue(this.f.Terms, 'int') + '</Terms>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'

      + '<invoicetype>' + this.getControlValue(this.f.InvoiceType, 'string') + '</invoicetype>'
      + '<ImportExchangeValue>' + this.getControlValue(this.f.Totalvalueininr, 'int') + '</ImportExchangeValue>'
      + '<ImportExchangeDollar>' + this.getControlValue(this.f.ExchangeRate, 'int') + '</ImportExchangeDollar>'
      // + '<ImportExchangeDollar>' + this.getControlValue(this.f.ExchangeRate1, 'int') + '</ImportExchangeDollar>'
      + '<Image>' + this.getControlValue(this.f.Image, 'string') + '</Image>'
      + '<AfterDiscount>' + this.AfterDiscount + '</AfterDiscount>'
      + '<TotalSGST>' + this.TotalSGST + '</TotalSGST>'
       +'<TotalCGST>'+this.TotalCGST+'</TotalCGST>'
       +'<TotalIGST>'+this.TotalIGST+'</TotalIGST>'
      + '<TaxType>' + this.TaxType + '</TaxType>'
      + '<vendorinvoicenumber>' + this.getControlValue(this.f.vendorinvoicenumber, 'string') + '</vendorinvoicenumber>'

      + '<BillToStateName>' + this.BillToStateName + '</BillToStateName>'
      + '<BillToStateCode>' + this.BillToStateCode + '</BillToStateCode>'
      + '<Contactno>' + this.getControlValue(this.f.Contactno, 'string') + '</Contactno>'

      // Pending

      + '<purchaseaccount>' + this.getControlValue(this.f.Purchaseaccount, 'string') + '</purchaseaccount>'
      + '<discountaccount>' + this.getControlValue(this.f.Discountaccount, 'string') + '</discountaccount>'
      + '<freightchargesaccount>' + this.getControlValue(this.f.freightchargesaccount, 'int') + '</freightchargesaccount>'
      + '<loadingchargesaccount>' + this.getControlValue(this.f.loadingchargesaccount, 'int') + '</loadingchargesaccount>'
      + '<insuranceaccount>' + this.getControlValue(this.f.insuranceaccount, 'int') + '</insuranceaccount>'
      + '<clearingchargesaccount>' + this.getControlValue(this.f.clearingchargesaccount, 'int') + '</clearingchargesaccount>'

      + '<freigntcharges>' + this.getControlValue(this.f.freigntcharges, 'int') + '</freigntcharges>'
      + '<loadingcharges>' + this.getControlValue(this.f.loadingcharges, 'int') + '</loadingcharges>'
      + '<insuranceamount>' + this.getControlValue(this.f.insuranceamount, 'int') + '</insuranceamount>'
      + '<clearingcharges>' + this.getControlValue(this.f.clearingcharges, 'int') + '</clearingcharges>'
      + '<PackingAmount>' + this.getControlValue(this.f.PackingAmount, 'int') + '</PackingAmount>'
      + '<PackingIGST>' + this.packigst + '</PackingIGST>'
      + '<PackingCGST>' + this.packcgst + '</PackingCGST>'
      + '<PackingSGST>' + this.packsgst + '</PackingSGST>'
      + '<PackingTaxPercentage>' + this.getControlValue(this.f.PackingTaxPercentage, 'int') + '</PackingTaxPercentage>'
      + '<PackingNetTotal>' + this.getControlValue(this.f.PackingNetTotal, 'int') + '</PackingNetTotal>'
      + '<TransportAmount>' + this.getControlValue(this.f.TransportAmount, 'int') + '</TransportAmount>'
      + '<TransportIGST>' + this.transigst + '</TransportIGST>'
      + '<TransportCGST>' + this.transcgst + '</TransportCGST>'
      + '<TransportSGST>' + this.transsgst + '</TransportSGST>'
      + '<TransportTaxPercentage>' + this.getControlValue(this.f.TransportTaxPercentage, 'int') + '</TransportTaxPercentage>'
      + '<TransportNetTotal>' + this.getControlValue(this.f.TransportNetTotal, 'int') + '</TransportNetTotal>'
      + '<LoadingAmount>' + this.getControlValue(this.f.LoadingAmount, 'int') + '</LoadingAmount>'
      + '<LoadingIGST>' + this.loadigst + '</LoadingIGST>'
      + '<LoadingCGST>' + this.loadcgst + '</LoadingCGST>'
      + '<LoadingSGST>' + this.loadsgst + '</LoadingSGST>'
      + '<LoadingTaxPercentage>' + this.getControlValue(this.f.LoadingTaxPercentage, 'int') + '</LoadingTaxPercentage>'
      + '<LoadingNetTotal>' + this.getControlValue(this.f.LoadingNetTotal, 'int') + '</LoadingNetTotal>'

      + '</Table1></NewDataSet>';


    var xml2 = "";
    var rows = "";
    if (this.Invoicetype == "Invoice" || this.f.InvoiceType.value == "Invoice") {
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        debugger;

        if (this.lstInvoiceItems[i].LocationId == 0) {


        }
        else {

          rows = rows + '<Table1>'
            + '<LineId>' + this.lstInvoiceItems[i].LineId + '</LineId>'
            + '<Description>' + this.lstInvoiceItems[i].Description + '</Description>'
            + '<Partno>' + this.lstInvoiceItems[i].Partno + '</Partno>'
            + '<PartNo>' + this.lstInvoiceItems[i].Partno + '</PartNo>'
            + '<FormName>PurchaseInvoice</FormName>'
            + '<ItemId>' + this.lstInvoiceItems[i].ItemId + '</ItemId>'
            + '<MakeId>' + this.lstInvoiceItems[i].MakeId + '</MakeId>'
            + '<UOMId>' + this.lstInvoiceItems[i].UOMId + '</UOMId>'
            + '<Make>' + this.lstInvoiceItems[i].Make + '</Make>'
            + '<UOM>' + this.lstInvoiceItems[i].UOM + '</UOM>'
            + '<Rate>' + this.lstInvoiceItems[i].Rate + '</Rate>'
            + '<Qty>' + this.lstInvoiceItems[i].Qty + '</Qty>'
            + '<Gross>' + this.lstInvoiceItems[i].Gross + '</Gross>'
            + '<type>' + this.lstInvoiceItems[i].type + '</type>'
            + '<DiscountPercentage>' + this.lstInvoiceItems[i].DiscountPercentage + '</DiscountPercentage>'
            + '<PurchaseAccount8Id>' + this.getControlValue(this.f.Purchaseaccount, 'string') + '</PurchaseAccount8Id>'

            + '<DiscountAmount>' + this.lstInvoiceItems[i].DiscountAmount + '</DiscountAmount>'

            + '<CGST>' + this.lstInvoiceItems[i].CGST + '</CGST>'
            + '<CGSTAmount>' + this.lstInvoiceItems[i].CGSTAmount + '</CGSTAmount>'
            + '<SGST>' + this.lstInvoiceItems[i].SGST + '</SGST>'
            + '<SGSTAmount>' + this.lstInvoiceItems[i].SGSTAmount + '</SGSTAmount>'
            + '<IGST>' + this.lstInvoiceItems[i].IGST + '</IGST>'
            + '<IGSTAmount>' + this.lstInvoiceItems[i].IGSTAmount + '</IGSTAmount>'
            + '<InvoiceType1>' + this.f.InvoiceType.value + '</InvoiceType1>'
            + '<Location27Id>' + this.lstInvoiceItems[i].LocationId + '</Location27Id>'
            + '<Bin28Id>' + this.lstInvoiceItems[i].BinId + '</Bin28Id>'

            + '<TotalTax>' + this.lstInvoiceItems[i].TotalTax + '</TotalTax>'
            + '<NetTotal>' + this.lstInvoiceItems[i].NetTotal + '</NetTotal>'
            + '<TaxType>' + this.lstInvoiceItems[i].TaxType + '</TaxType>'

            + '<SGSTAccountId>' + (typeof (this.lstInvoiceItems[i].SGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].SGSTAccountId) + '</SGSTAccountId>'
            + '<CGSTAccountId>' + (typeof (this.lstInvoiceItems[i].CGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].CGSTAccountId) + '</CGSTAccountId>'
            + '<IGSTAccountId>' + (typeof (this.lstInvoiceItems[i].IGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].IGSTAccountId) + '</IGSTAccountId>'

            + '<RefType1>' + this.lstInvoiceItems[i].RefType1 + '</RefType1>'
            + '<RefNo2>' + this.lstInvoiceItems[i].RefNo2 + '</RefNo2>'
            + '<RefId>' + this.lstInvoiceItems[i].RefId + '</RefId>'
            + '<RefDate3>' + this.lstInvoiceItems[i].RefDate3 + '</RefDate3>'
            + '<RefLineId>' + this.lstInvoiceItems[i].RefLineId + '</RefLineId>'
            + '<HSN>' + this.lstInvoiceItems[i].HSN + '</HSN></Table1>'



        }
      }


    } else {
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {

        if (this.lstInvoiceItems[i].InvoiceType1 == "Invoice" || this.lstInvoiceItems[i].dollarprice == NaN) {
          debugger;
          this.lstInvoiceItems[i].dollarprice = 0;
        }
        rows = rows + '<Table1>'
          + '<LineId>' + this.lstInvoiceItems[i].LineId + '</LineId>'
          + '<Description>' + this.lstInvoiceItems[i].Description + '</Description>'
          + '<Partno>' + this.lstInvoiceItems[i].Partno + '</Partno>'
          + '<Notes>' + this.lstInvoiceItems[i].Partno + '</Notes>'
          + '<ItemId>' + this.lstInvoiceItems[i].ItemId + '</ItemId>'
          + '<MakeId>' + this.lstInvoiceItems[i].MakeId + '</MakeId>'
          + '<UOMId>' + this.lstInvoiceItems[i].UOMId + '</UOMId>'
          + '<Make>' + this.lstInvoiceItems[i].Make + '</Make>'
          + '<UOM>' + this.lstInvoiceItems[i].UOM + '</UOM>'
          + '<Rate>' + this.lstInvoiceItems[i].Rate + '</Rate>'
          + '<Qty>' + this.lstInvoiceItems[i].Qty + '</Qty>'
          + '<Gross>' + this.lstInvoiceItems[i].Gross + '</Gross>'
          + '<type>' + this.lstInvoiceItems[i].type + '</type>'
          + '<DiscountPercentage>' + this.lstInvoiceItems[i].DiscountPercentage + '</DiscountPercentage>'
          + '<PurchaseAccount8Id>' + this.getControlValue(this.f.Purchaseaccount, 'string') + '</PurchaseAccount8Id>'

          + '<DiscountAmount>' + this.lstInvoiceItems[i].DiscountAmount + '</DiscountAmount>'
          + '<dollarprice>' + this.lstInvoiceItems[i].dollarprice + '</dollarprice>'
          + '<CGST>' + this.lstInvoiceItems[i].CGST + '</CGST>'
          + '<CGSTAmount>' + this.lstInvoiceItems[i].CGSTAmount + '</CGSTAmount>'
          + '<SGST>' + this.lstInvoiceItems[i].SGST + '</SGST>'
          + '<SGSTAmount>' + this.lstInvoiceItems[i].SGSTAmount + '</SGSTAmount>'
          + '<IGST>' + this.lstInvoiceItems[i].IGST + '</IGST>'
          + '<IGSTAmount>' + this.lstInvoiceItems[i].IGSTAmount + '</IGSTAmount>'
          + '<InvoiceType1>' + this.f.InvoiceType.value + '</InvoiceType1>'
          + '<BCDAmt64>' + this.lstInvoiceItems[i].bcd + '</BCDAmt64>'
          + '<BCDAcount79>' + this.BCDAccount + '</BCDAcount79>'
          + '<SWSurchargeAmt78>' + this.lstInvoiceItems[i].sws + '</SWSurchargeAmt78>'
          + '<bcdper>' + this.lstInvoiceItems[i].bcdper + '</bcdper>'
          + '<swsper>' + this.lstInvoiceItems[i].swsper + '</swsper>'

          + '<SwSurchargeAccount82>' + this.SWSAccount + '</SwSurchargeAccount82>'
          //  +'<IGSTAmount>'+this.lstInvoiceItems[i].IGSTAmount+ '</IGSTAmount>'
          + '<Location27Id>' + this.lstInvoiceItems[i].LocationId + '</Location27Id>'
          + '<Bin28Id>' + this.lstInvoiceItems[i].BinId + '</Bin28Id>'

          + '<TotalTax>' + this.lstInvoiceItems[i].TotalTax + '</TotalTax>'
          + '<NetTotal>' + this.lstInvoiceItems[i].NetTotal + '</NetTotal>'
          + '<TaxType>' + this.lstInvoiceItems[i].TaxType + '</TaxType>'

          + '<SGSTAccountId>' + (typeof (this.lstInvoiceItems[i].SGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].SGSTAccountId) + '</SGSTAccountId>'
          + '<CGSTAccountId>' + (typeof (this.lstInvoiceItems[i].CGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].CGSTAccountId) + '</CGSTAccountId>'
          + '<IGSTAccountId>' + (typeof (this.lstInvoiceItems[i].IGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].IGSTAccountId) + '</IGSTAccountId>'
          + '<HSN>' + this.lstInvoiceItems[i].HSN + '</HSN></Table1>'

      }
    }

    xml2 = '<NewDataSet>' + rows + '</NewDataSet>';
    if (this.lstchargeaccnt.length > 0) {
      debugger;
      for (var i = 0; i < this.lstchargeaccnt.length; i++) {
        for (var j = 0; j < this.lstchargeaccnt[i].lstchargeacntitems.length; j++) {
          this.lstchargespost.push({
            VendorId: this.lstchargeaccnt[i].Vendor1ID,
            refno: this.lstchargeaccnt[i].refno,
            chargeDate: this.lstchargeaccnt[i].chargeDate,
            ItemId: this.lstchargeaccnt[i].lstchargeacntitems[j].ItemId,
            MakeId: this.lstchargeaccnt[i].lstchargeacntitems[j].MakeId1,
            IGST: this.lstchargeaccnt[i].lstchargeacntitems[j].IGST1,
            IGSTAmount: this.lstchargeaccnt[i].lstchargeacntitems[j].IGSTAmount1,
            IGSTAcountID: this.lstchargeaccnt[i].lstchargeacntitems[j].IGSTAccountId1,
            SGST: this.lstchargeaccnt[i].lstchargeacntitems[j].SGST1,
            SGSTAmount: this.lstchargeaccnt[i].lstchargeacntitems[j].SGSTAmount1,
            SGSTAcountID: this.lstchargeaccnt[i].lstchargeacntitems[j].SGSTAccountId1,
            CGST: this.lstchargeaccnt[i].lstchargeacntitems[j].CGST1,
            CGSTAmount: this.lstchargeaccnt[i].lstchargeacntitems[j].CGSTAmount1,
            CGSTAcountID: this.lstchargeaccnt[i].lstchargeacntitems[j].CGSTAccountId1,
            description: this.lstchargeaccnt[i].lstchargeacntitems[j].description1,
            TaxAmount: this.lstchargeaccnt[i].lstchargeacntitems[j].TaxAmount1,
            TotalAmount: this.lstchargeaccnt[i].lstchargeacntitems[j].TotalAmount1,
            Partno: this.lstchargeaccnt[i].lstchargeacntitems[j].Partno,
            HSN: this.lstchargeaccnt[i].lstchargeacntitems[j].HSN1,
            GSTAmount: this.lstchargeaccnt[i].lstchargeacntitems[j].GSTAmount1,
            LineID: (+this.lstchargeaccnt[i].LineID),
          });
        }
      }

    }
    var xml3 = "";
    var rows = "";
    for (var i = 0; i < this.lstchargespost.length; i++) {

      rows = rows + '<Table1>'
        + '<LineId>' + this.lstchargespost[i].LineID + '</LineId>'
        + '<Partno>' + this.lstchargespost[i].Partno + '</Partno>'
        + '<ItemId>' + this.lstchargespost[i].ItemId + '</ItemId>'
        + '<MakeId>' + this.lstchargespost[i].MakeId + '</MakeId>'
        + '<description>' + this.lstchargespost[i].description + '</description>'
        + '<VendorId>' + this.lstchargespost[i].VendorId + '</VendorId>'
        + '<refno>' + this.lstchargespost[i].refno + '</refno>'
        + '<chargeDate>' + this.lstchargespost[i].chargeDate + '</chargeDate>'

        + '<IGST>' + this.lstchargespost[i].IGST + '</IGST>'
        + '<IGSTAmount>' + this.lstchargespost[i].IGSTAmount + '</IGSTAmount>'
        + '<IGSTAcountID>' + this.lstchargespost[i].IGSTAcountID + '</IGSTAcountID>'
        + '<SGST>' + this.lstchargespost[i].SGST + '</SGST>'
        + '<SGSTAmount>' + this.lstchargespost[i].SGSTAmount + '</SGSTAmount>'
        + '<SGSTAccountID>' + this.lstchargespost[i].SGSTAcountID + '</SGSTAccountID>'
        + '<CGST>' + this.lstchargespost[i].CGST + '</CGST>'
        + '<CGSTAmunt>' + this.lstchargespost[i].CGSTAmount + '</CGSTAmunt>'
        + '<CGSTAccountID>' + this.lstchargespost[i].CGSTAcountID + '</CGSTAccountID>'
        + '<TaxAmount>' + this.lstchargespost[i].TaxAmount + '</TaxAmount>'
        + '<TotalAmount>' + this.lstchargespost[i].TotalAmount + '</TotalAmount>'
        + '<HSN>' + this.lstchargespost[i].HSN + '</HSN>'
        + '<GSTAmount>' + this.lstchargespost[i].GSTAmount + '</GSTAmount></Table1>'

    }

    xml3 = '<NewDataSet>' + rows + '</NewDataSet>';
    var xml4 = "";
    var rows = "";

    for (var i = 0; i < this.lstPurchaseInvoiceItemsStock.length; i++) {

      rows = rows + '<Table1>'
        + '<LineId>' + this.lstPurchaseInvoiceItemsStock[i].LineId + '</LineId>'

        + '<Partno>' + this.lstPurchaseInvoiceItemsStock[i].Partno + '</Partno>'

        + '<ItemId>' + this.lstPurchaseInvoiceItemsStock[i].ItemId + '</ItemId>'
        + '<MakeId>' + this.lstPurchaseInvoiceItemsStock[i].MakeId + '</MakeId>'
        + '<UOMId>' + this.lstPurchaseInvoiceItemsStock[i].UOMId + '</UOMId>'
        + '<Make>' + this.lstPurchaseInvoiceItemsStock[i].Make + '</Make>'
        + '<UOM>' + this.lstPurchaseInvoiceItemsStock[i].UOM + '</UOM>'
        + '<Rate>' + this.lstPurchaseInvoiceItemsStock[i].Rate + '</Rate>'

        + '<Qty>' + this.lstPurchaseInvoiceItemsStock[i].Qty + '</Qty>'
        + '<LocationId>' + this.lstPurchaseInvoiceItemsStock[i].LocationId + '</LocationId>'
        + '<BinId>' + this.lstPurchaseInvoiceItemsStock[i].BinId + '</BinId>'
        + '<Locationname>' + this.lstPurchaseInvoiceItemsStock[i].Locationname + '</Locationname>'
        + '<BinName>' + this.lstPurchaseInvoiceItemsStock[i].BinName + '</BinName></Table1>'

    }
    xml4 = '<NewDataSet>' + rows + '</NewDataSet>';

    debugger;
    this.APICall.DBCalling("SavePurchaseInvoice", xml1, xml2, xml3, xml4).subscribe(
      (res: Response) => {

        debugger;
        this.temptransactionid = this.f.TransactionId.value;
        $("#loaderParent").hide();
        // this.DbResult= (res);
        this.DbResult = JSON.parse(res['Message']);

        //  var l=this.DbResult.Table[0].length;
        // var tr=this.DbResult.Table[0].DBresult;

        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {

          if ((+this.getControlValue(this.f.TransactionId, 'int')) > 0) {
            this.showReport = "Invoice Modified"
            this.saveTrackPurchaseinvoice();
            this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
            this.router.navigate(['Purchase/PurchaseInvoice']);
          } else {
            //  this.CreateBranches.patchValue({
            this.showReport = "Invoice Created"

            this.f.TransactionId.setValue(this.DbResult.Table[0].TransactionId);
            this.f.TransactionNo.setValue(this.DbResult.Table[0].TransactionNo);
            this.saveTrackPurchaseinvoice();
            this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;

            //  });
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Saved successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
            this.router.navigate(['Purchase/PurchaseInvoice']);
          }

          debugger;
          this.lstInvoiceItems = null;
          this.lstInvoiceItems = [];
          this.lstTermsChild = null;
          this.lstTermsChild = [];

          if (this.DbResult.Table.length > 0) {

            try {

              if (this.DbResult.Table1.length > 0)//lstres[0].Table=="PurchaseInvoice1")
              {
                //var res1=JSON.parse((( this.DbResult.Table1[0].lstInvoiceItems).replace(/\n/g, "")).replace(/'/g,"\""));
                var lstresInvoiceItems = JSON.parse(((this.DbResult.Table1[0].lstInvoiceItems).replace(/\n/g, "")).replace(/'/g, "\""));
                var i = 0;
                var InvoiceItemsdata = $.map(lstresInvoiceItems, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstInvoiceItems = InvoiceItemsdata;


              }
            } catch (exce) { }
            try {
              if (this.DbResult.Table2.length > 0)//lstres[0].Table=="PurchaseInvoiceTermDetails")
              {
                //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                var lstresTermsChild = JSON.parse(((this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g, "\""));

                var lstresTermsChilddata = $.map(lstresTermsChild, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstTermsChild = lstresTermsChilddata;
              }
            } catch (exce) { }


          }






        } else {



          if (this.DbResult.Table[0].DBresult == -3) {
            (window as any).swal({
              icon: 'warning',
              title: 'Exists',
              text: 'Invoice Already Exists.!',
              confirmButtonText: 'Dismiss',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-warning'
            });
          } else {

            if (this.DbResult.Table[0].DBresult == -5) {


              var that = this;
              debugger;
              // (window as any).swal({
              //   icon: 'error',
              //   title: 'Treansaction modified by other User!',
              //   text: 'failed.!',
              //   confirmButtonText: 'Dismiss',
              //   buttonsStyling: false,
              //   confirmButtonClass: 'btn btn-lg btn-danger'
              //  });
              (window as any).swal({
                icon: "warning",
                title: "Treansaction modified by " + this.DbResult.Table[0].ModifiedBy + "! ",
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



            } else {

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
  templstpost: any = [];
  saveTrackPurchaseinvoice() {

      //salesinvoiceitems
     
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());
    //this.f.TransactionTime.setValue($("#TransactionDate").val()+' '+$("#TransactionTime").val());
    debugger;
    if (this.temptransactionid > 0) {
      debugger;
      if (this.lstInvoiceItems.length > this.lststoreInvoiceItems.length) {
        for (var i = 0; i < this.lstInvoiceItems.length; i++) {
          for (var j = 0; j < this.lststoreInvoiceItems.length; j++) {
            if (this.lststoreInvoiceItems[j].Partno == this.lstInvoiceItems[i].Partno && this.lststoreInvoiceItems[j].Make == this.lstInvoiceItems[i].Make
              && this.lststoreInvoiceItems[j].UOM == this.lstInvoiceItems[i].UOM && this.lststoreInvoiceItems[j].Qty == this.lstInvoiceItems[i].Qty
              && this.lststoreInvoiceItems[j].Rate == this.lstInvoiceItems[i].Rate && this.lststoreInvoiceItems[j].DiscountAmount == this.lstInvoiceItems[i].DiscountAmount) {

            }
            else {
              debugger;
              let lstInvoiceItems=[];
              this.lstInvoiceItems.forEach((element ,index)=> {
                lstInvoiceItems[index]={...element};
              });
              
              this.lstInvoiceItems=lstInvoiceItems;
              this.lstInvoiceItems[j].LineId = 0;
              this.templstpost.push(this.lststoreInvoiceItems[j]);
            }
          }
        }
      }
      else {
        if (this.lstInvoiceItems.length == this.lststoreInvoiceItems.length) {
          for (var i = 0; i < this.lststoreInvoiceItems.length; i++) {
            for (var j = 0; j < this.lstInvoiceItems.length; j++) {
              if (this.lststoreInvoiceItems[j].Partno == this.lststoreInvoiceItems[i].Partno && this.lststoreInvoiceItems[j].Make == this.lststoreInvoiceItems[i].Make
                && this.lststoreInvoiceItems[j].UOM == this.lststoreInvoiceItems[i].UOM && this.lststoreInvoiceItems[j].Qty == this.lststoreInvoiceItems[i].Qty
                && this.lststoreInvoiceItems[j].Rate == this.lststoreInvoiceItems[i].Rate && this.lststoreInvoiceItems[j].DiscountAmount == this.lststoreInvoiceItems[i].DiscountAmount) {

              }
              else {
                debugger;
                let lstInvoiceItems=[];
                this.lstInvoiceItems.forEach((element ,index)=> {
                  lstInvoiceItems[index]={...element};
                });
                
                this.lstInvoiceItems=lstInvoiceItems;
                this.lstInvoiceItems[j].LineId = 0;
                this.templstpost.push(this.lstInvoiceItems[j]);
              }
            }
          }
        }
        else {

          debugger;
          for (var i = 0; i < this.lststoreInvoiceItems.length; i++) {
            for (var j = 0; j < this.lstInvoiceItems.length; j++) {
              if (this.lststoreInvoiceItems[j].Partno == this.lststoreInvoiceItems[i].Partno && this.lststoreInvoiceItems[j].Make == this.lststoreInvoiceItems[i].Make
                && this.lststoreInvoiceItems[j].UOM == this.lststoreInvoiceItems[i].UOM && this.lststoreInvoiceItems[j].Qty == this.lststoreInvoiceItems[i].Qty
                && this.lststoreInvoiceItems[j].Rate == this.lststoreInvoiceItems[i].Rate && this.lststoreInvoiceItems[j].DiscountAmount == this.lststoreInvoiceItems[i].DiscountAmount) {

              }
              else {
                debugger;
                let lstInvoiceItems=[];
                this.lstInvoiceItems.forEach((element ,index)=> {
                  lstInvoiceItems[index]={...element};
                });
                
                this.lstInvoiceItems=lstInvoiceItems;
                this.lstInvoiceItems[j].LineId = 0;
                this.templstpost.push(this.lstInvoiceItems[j]);
              }
            }
          }
        }
      }
      this.lstInvoiceItems = this.templstpost;
    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();

    for (var i = 0; i < this.lstInvoiceItems.length; i++) {
      if (this.lstInvoiceItems[i].InvoiceType1 == "Import") {
        if ((+this.lstInvoiceItems[i].bcd) > 0) {
          this.bcdamt = this.bcdamt + (+this.lstInvoiceItems[i].bcd)
        }
        if ((+this.lstInvoiceItems[i].sws) > 0) {
          this.educessamt = this.educessamt + (+this.lstInvoiceItems[i].sws)
        }
      }


    }

    var xml1 = '<NewDataSet><Table1>'

      + '<ShiptoAddress>' + this.getControlValue(this.f.ShiptoAddress, 'string') + '</ShiptoAddress>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<PartyId>' + this.getControlValue(this.f.PartyId, 'int') + '</PartyId>'
      + '<Billto>' + this.getControlValue(this.f.Billto, 'string') + '</Billto>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'

      + '<Shipto>' + this.getControlValue(this.f.Shipto, 'string') + '</Shipto>'

      + '<bcdamt>' + this.bcdamt + '</bcdamt>'
      + '<educessamt>' + this.educessamt + '</educessamt>'

      + '<CurrencyId>' + this.getControlValue(this.f.CurrencyId, 'int') + '</CurrencyId>'
      + '<ExchangeRate>' + this.getControlValue(this.f.ExchangeRate, 'int') + '</ExchangeRate>'

      // +'<TransactionTime>'+this.convertDate(this.getControlValue(this.f.TransactionTime,'string'))+'</TransactionTime>'
      + '<TransactionDate>' + this.getControlValue(this.f.TransactionDate, 'string') + '</TransactionDate>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
      + '<PurchaseType>' + this.getControlValue(this.f.PurchaseType, 'string') + '</PurchaseType>'
      + '<Vendorreference>' + this.getControlValue(this.f.Vendorreference, 'string') + '</Vendorreference>'
      + '<VendorreferenceType>' + this.getControlValue(this.f.VendorreferenceType, 'string') + '</VendorreferenceType>'
      + '<vdate>' + this.getControlValue(this.f.vdate, 'string') + '</vdate>'
      + '<Incoterms>' + this.getControlValue(this.f.Incoterms, 'string') + '</Incoterms>'

      + '<RequiredDate>' + this.getControlValue(this.f.RequiredDate, 'string') + '</RequiredDate>'
      + '<TermsandConditions>' + this.getControlValue(this.f.TermsandConditions, 'string') + '</TermsandConditions>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<TotalGross>' + this.TotalGross + '</TotalGross>'
      + '<PaymentTerms>' + this.getControlValue(this.f.PaymentTerms, 'int') + '</PaymentTerms>'
      + '<TotalDiscount>' + this.TotalDiscount + '</TotalDiscount >'
      + '<TotalTax>' + this.TotalTax + '</TotalTax>'
      + '<Total>' + this.Total + '</Total>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '<Terms>' + this.getControlValue(this.f.Terms, 'int') + '</Terms>'
      + '<TemppurchaseInvoice>' + this.getControlValue(this.f.TransactionId, 'int') + '</TemppurchaseInvoice>'

      + '<invoicetype>' + this.getControlValue(this.f.InvoiceType, 'string') + '</invoicetype>'
      + '<ImportExchangeValue>' + this.getControlValue(this.f.Totalvalueininr, 'int') + '</ImportExchangeValue>'
      // + '<ImportExchangeDollar>' + this.getControlValue(this.f.ExchangeRate1, 'int') + '</ImportExchangeDollar>'
      + '<ImportExchangeDollar>' + this.getControlValue(this.f.ExchangeRate, 'int') + '</ImportExchangeDollar>'
      + '<AfterDiscount>' + this.AfterDiscount + '</AfterDiscount>'
      + '<TotalSGST>' + this.TotalSGST + '</TotalSGST>'
      //  +'<TotalCGST>'+this.TotalCGST+'</TotalCGST>'
      //  +'<TotalIGST>'+this.TotalIGST+'</TotalIGST>'
      + '<TaxType>' + this.TaxType + '</TaxType>'
      + '<vendorinvoicenumber>' + this.getControlValue(this.f.vendorinvoicenumber, 'string') + '</vendorinvoicenumber>'

      + '<BillToStateName>' + this.BillToStateName + '</BillToStateName>'
      + '<BillToStateCode>' + this.BillToStateCode + '</BillToStateCode>'
      + '<Contactno>' + this.getControlValue(this.f.Contactno, 'string') + '</Contactno>'

      // Pending

      + '<purchaseaccount>' + this.getControlValue(this.f.Purchaseaccount, 'string') + '</purchaseaccount>'
      + '<Discountaccount>' + this.getControlValue(this.f.Discountaccount, 'string') + '</Discountaccount>'
      + '<freightchargesaccount>' + this.getControlValue(this.f.freightchargesaccount, 'int') + '</freightchargesaccount>'
      + '<loadingchargesaccount>' + this.getControlValue(this.f.loadingchargesaccount, 'int') + '</loadingchargesaccount>'
      + '<insuranceaccount>' + this.getControlValue(this.f.insuranceaccount, 'int') + '</insuranceaccount>'
      + '<clearingchargesaccount>' + this.getControlValue(this.f.clearingchargesaccount, 'int') + '</clearingchargesaccount>'

      + '<freigntcharges>' + this.getControlValue(this.f.freigntcharges, 'int') + '</freigntcharges>'
      + '<loadingcharges>' + this.getControlValue(this.f.loadingcharges, 'int') + '</loadingcharges>'
      + '<insuranceamount>' + this.getControlValue(this.f.insuranceamount, 'int') + '</insuranceamount>'
      + '<clearingcharges>' + this.getControlValue(this.f.clearingcharges, 'int') + '</clearingcharges>'

      + '<Modified>' + 1 + '</Modified>'
      + '<Message>' + this.ShowMessage + '</Message>'
      + '<statusreport>' + this.showReport + '</statusreport>'

      + '</Table1></NewDataSet>';
    var xml2 = "";
    var rows = "";
    if (this.Invoicetype == "Invoice") {
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        debugger;

        rows = rows + '<Table1>'
          + '<LineId>' + this.lstInvoiceItems[i].LineId + '</LineId>'
          + '<Description>' + this.lstInvoiceItems[i].Description + '</Description>'
          + '<Partno>' + this.lstInvoiceItems[i].Partno + '</Partno>'

          + '<ItemId>' + this.lstInvoiceItems[i].ItemId + '</ItemId>'
          + '<MakeId>' + this.lstInvoiceItems[i].MakeId + '</MakeId>'
          + '<UOMId>' + this.lstInvoiceItems[i].UOMId + '</UOMId>'
          + '<Make>' + this.lstInvoiceItems[i].Make + '</Make>'
          + '<UOM>' + this.lstInvoiceItems[i].UOM + '</UOM>'
          + '<Rate>' + this.lstInvoiceItems[i].Rate + '</Rate>'
          + '<Qty>' + this.lstInvoiceItems[i].Qty + '</Qty>'
          + '<Gross>' + this.lstInvoiceItems[i].Gross + '</Gross>'
          + '<type>' + this.lstInvoiceItems[i].type + '</type>'
          + '<DiscountPercentage>' + this.lstInvoiceItems[i].DiscountPercentage + '</DiscountPercentage>'
          + '<PurchaseAccount8Id>' + this.getControlValue(this.f.Purchaseaccount, 'string') + '</PurchaseAccount8Id>'

          + '<DiscountAmount>' + this.lstInvoiceItems[i].DiscountAmount + '</DiscountAmount>'

          + '<CGST>' + this.lstInvoiceItems[i].CGST + '</CGST>'
          + '<CGSTAmount>' + this.lstInvoiceItems[i].CGSTAmount + '</CGSTAmount>'
          + '<SGST>' + this.lstInvoiceItems[i].SGST + '</SGST>'
          + '<SGSTAmount>' + this.lstInvoiceItems[i].SGSTAmount + '</SGSTAmount>'
          + '<IGST>' + this.lstInvoiceItems[i].IGST + '</IGST>'
          + '<IGSTAmount>' + this.lstInvoiceItems[i].IGSTAmount + '</IGSTAmount>'
          + '<InvoiceType1>' + this.Invoicetype + '</InvoiceType1>'



          + '<TotalTax>' + this.lstInvoiceItems[i].TotalTax + '</TotalTax>'
          + '<NetTotal>' + this.lstInvoiceItems[i].NetTotal + '</NetTotal>'
          + '<TaxType>' + this.lstInvoiceItems[i].TaxType + '</TaxType>'

          + '<SGSTAccountId>' + (typeof (this.lstInvoiceItems[i].SGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].SGSTAccountId) + '</SGSTAccountId>'
          + '<CGSTAccountId>' + (typeof (this.lstInvoiceItems[i].CGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].CGSTAccountId) + '</CGSTAccountId>'
          + '<IGSTAccountId>' + (typeof (this.lstInvoiceItems[i].IGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].IGSTAccountId) + '</IGSTAccountId>'
          + '<HSN>' + this.lstInvoiceItems[i].HSN + '</HSN></Table1>'

      }
    } else {
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        debugger;
        if (this.lstInvoiceItems[i].InvoiceType1 == "Invoice") {
          this.lstInvoiceItems[i].dollarprice = 0;
        }
        rows = rows + '<Table1>'
          + '<LineId>' + this.lstInvoiceItems[i].LineId + '</LineId>'
          + '<Description>' + this.lstInvoiceItems[i].Description + '</Description>'
          + '<Partno>' + this.lstInvoiceItems[i].Partno + '</Partno>'

          + '<ItemId>' + this.lstInvoiceItems[i].ItemId + '</ItemId>'
          + '<MakeId>' + this.lstInvoiceItems[i].MakeId + '</MakeId>'
          + '<UOMId>' + this.lstInvoiceItems[i].UOMId + '</UOMId>'
          + '<Make>' + this.lstInvoiceItems[i].Make + '</Make>'
          + '<UOM>' + this.lstInvoiceItems[i].UOM + '</UOM>'
          + '<Rate>' + this.lstInvoiceItems[i].Rate + '</Rate>'
          + '<Qty>' + this.lstInvoiceItems[i].Qty + '</Qty>'
          + '<Gross>' + this.lstInvoiceItems[i].Gross + '</Gross>'
          + '<type>' + this.lstInvoiceItems[i].type + '</type>'
          + '<DiscountPercentage>' + this.lstInvoiceItems[i].DiscountPercentage + '</DiscountPercentage>'
          + '<PurchaseAccount8Id>' + this.getControlValue(this.f.Purchaseaccount, 'string') + '</PurchaseAccount8Id>'

          + '<DiscountAmount>' + this.lstInvoiceItems[i].DiscountAmount + '</DiscountAmount>'
          + '<dollarprice>' + this.lstInvoiceItems[i].dollarprice + '</dollarprice>'
          + '<CGST>' + this.lstInvoiceItems[i].CGST + '</CGST>'
          + '<CGSTAmount>' + this.lstInvoiceItems[i].CGSTAmount + '</CGSTAmount>'
          + '<SGST>' + this.lstInvoiceItems[i].SGST + '</SGST>'
          + '<SGSTAmount>' + this.lstInvoiceItems[i].SGSTAmount + '</SGSTAmount>'
          + '<IGST>' + this.lstInvoiceItems[i].IGST + '</IGST>'
          + '<IGSTAmount>' + this.lstInvoiceItems[i].IGSTAmount + '</IGSTAmount>'
          + '<InvoiceType1>' + this.Invoicetype + '</InvoiceType1>'
          + '<BCDAmt64>' + this.lstInvoiceItems[i].bcd + '</BCDAmt64>'
          + '<BCDAcount79>' + this.BCDAccount + '</BCDAcount79>'
          + '<SWSurchargeAmt78>' + this.lstInvoiceItems[i].sws + '</SWSurchargeAmt78>'
          + '<bcdper>' + this.lstInvoiceItems[i].bcdper + '</bcdper>'
          + '<swsper>' + this.lstInvoiceItems[i].swsper + '</swsper>'

          + '<SwSurchargeAccount82>' + this.SWSAccount + '</SwSurchargeAccount82>'
          //  +'<IGSTAmount>'+this.lstInvoiceItems[i].IGSTAmount+ '</IGSTAmount>'


          + '<TotalTax>' + this.lstInvoiceItems[i].TotalTax + '</TotalTax>'
          + '<NetTotal>' + this.lstInvoiceItems[i].NetTotal + '</NetTotal>'
          + '<TaxType>' + this.lstInvoiceItems[i].TaxType + '</TaxType>'

          + '<SGSTAccountId>' + (typeof (this.lstInvoiceItems[i].SGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].SGSTAccountId) + '</SGSTAccountId>'
          + '<CGSTAccountId>' + (typeof (this.lstInvoiceItems[i].CGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].CGSTAccountId) + '</CGSTAccountId>'
          + '<IGSTAccountId>' + (typeof (this.lstInvoiceItems[i].IGSTAccountId) == 'undefined' ? 0 : this.lstInvoiceItems[i].IGSTAccountId) + '</IGSTAccountId>'
          + '<HSN>' + this.lstInvoiceItems[i].HSN + '</HSN></Table1>'

      }
    }

    xml2 = '<NewDataSet>' + rows + '</NewDataSet>';


    debugger;
    this.APICall.DBCalling("SaveTrackPurchaseInvoice", xml1, xml2, "", "").subscribe(
      (res: Response) => {

        debugger;
        $("#loaderParent").hide();
        // this.DbResult= (res);
        this.DbResult = JSON.parse(res['Message']);

        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {

        } else {
        }

      },

    );


  }
  TransactionDateChange(e) {
    debugger;

  }

  Currencyname:string="";
  LoadCuurency() {
    var that = this;
  
    (<any>$("#drpCurrency")).select2({
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
            debugger;
            return JSON.stringify({ "Operation": 'ViewCurrency', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })
  
          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
  
  
  
  
          var ResultData = (JSON.parse(response['Message'])).Table;
  
          var data = $.map(ResultData, function (obj) {
  
            obj.id = obj.CurrencyId;
            obj.text = obj.Currencyname;
  
  
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
    $('#drpCurrency').on('select2:select', function (e) {
  
  
      debugger;
  
      if (typeof ((<any>e).params.data.id) != 'undefined') {
  
       
          that.f.CurrencyId.setValue((<any>e).params.data.id);
          //that.f.Currencyname.setValue((<any>e).params.data.text);
          that.Currencyname=((<any>e).params.data.text);

      }
  
  
    });
    debugger;
    
  
    $("#drpCurrency").on("select2:unselecting", function (e) {
  
  
      that.f.CurrencyId.setValue(0);
     // that.f.Currencyname.setValue('');
     that.Currencyname="";
  
    });

    var currencyselection = new Option(this.Currencyname, this.f.CurrencyId.value.toString(), true, true);
  
    (<any>$('#drpCurrency')).append(currencyselection).trigger('change');
  
  }



  TransactionDate = $("#TransactionDate").val();
  SelectedProductData2 = {
    SNO: 1,
    Vendor1ID: 0
    , LineID: 0
    , Vendorname1: ''
    , refno: ''
    , chargeDate: ''

    , lstchargeacntitems: []
    , Show: 'true'
  }

  SelectedProductData = {
    SNO: 1,
    InvoiceType1: ''
    , LineId: '0'
    , Description: ''

    , Partno: ''
    , ItemId: 0
    , MakeId: 0
    , UOMId: 0
    , Make: ''
    , UOM: ''

    , Rate: 0
    , Qty: 1
    , bcd: 0
    , sws: 0
    , dollarprice: 0
    , bcdper: 0
    , swsper: 0
    , CurrencyRate: 0

    , Gross: 0
    , DiscountPercentage: 0
    , DiscountAmount: 0
    , type: ''

    , LocationId: 0
    , BinId: 0
    , Locationname: ''
    , BinName: ''
    , CGST: 0
    , CGSTAmount: 0
    , SGST: 0



    , SGSTAmount: 0
    , IGST: 0
    , IGSTAmount: 0



    , TotalTax: 0
    , NetTotal: 0

    , TaxType: 0



    , HSN: ''



    , Show: 'true'
  }

  SelectedProductData1 = {
    SNO: 1,
    InvoiceType1: ''
    , LineId: '0'
    , Description: ''

    , Partno: ''
    , ItemId: 0
    , MakeId: 0
    , UOMId: 0
    , Make: ''
    , UOM: ''

    , Rate: 0
    , Qty: 1
    , bcd: 0
    , sws: 0
    , dollarprice: 0
    , bcdper: 0
    , swsper: 0
    , CurrencyRate: 0

    , Gross: 0
    , DiscountPercentage: 0
    , DiscountAmount: 0



    , CGST: 0
    , CGSTAmount: 0
    , SGST: 0



    , SGSTAmount: 0
    , IGST: 0
    , IGSTAmount: 0



    , TotalTax: 0
    , NetTotal: 0

    , TaxType: 0



    , HSN: ''



    , Show: 'true'
  }
  PartyId = '0';
  //AddItemReset=false;
  OnAdd() {
    debugger;
    var INVtype = this.f.InvoiceType;
    this.PartyId = this.getControlValue(this.f.PartyId, 'int');
    this.errormsg = "";
    this.EditRecNO = -1;
    this.SelectedProductData = {
      SNO: (this.lstInvoiceItems.length == 0 ? 1 : (this.lstInvoiceItems.length + 1))
      , InvoiceType1: this.filterBy
      , LineId: '0'
      , Description: ''
      , Partno: ''
      , ItemId: 0
      , MakeId: 0
      , UOMId: 0
      , Make: ''
      , UOM: ''
      , Rate: 0
      , Qty: 1
      , bcd: 0
      , sws: 0
      , dollarprice: 0
      , bcdper: 0
      , swsper: 0
      , CurrencyRate: 0
      , Gross: 0
      , DiscountPercentage: 0
      , DiscountAmount: 0
      , type: ''
      , LocationId: 0
      , BinId: 0
      , Locationname: ''
      , BinName: ''
      , CGST: 0
      , CGSTAmount: 0
      , SGST: 0


      , SGSTAmount: 0
      , IGST: 0
      , IGSTAmount: 0


      , TotalTax: 0
      , NetTotal: 0

      , TaxType: 0



      , HSN: ''



      , Show: 'true'
    };
    this.TransactionDate = $("#TransactionDate").val();
    debugger;
    if (this.CompanyStateId != this.SelectedState) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

  }

  GstTaxFromHSNAndGSTTypeForGridView() {
    debugger;
    if (this.lstInvoiceItems.length > 0) {
      var xmlHsnInfo = "";
      var rows = "";

      for (var i = 0; i < this.lstInvoiceItems.length; i++) {

        rows = rows + '<Table1><HSN>' + this.lstInvoiceItems[i].HSN + '</HSN></Table1>'


      }
      xmlHsnInfo = '<NewDataSet>' + rows + '</NewDataSet>';




      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo, this.TaxType, this.TransactionDate).subscribe(
        (res) => {


          $("#loaderParent").click();
          debugger;
          this.lstDbResult = JSON.parse(res['Message']);



          if (this.lstDbResult.Table.length > 0) {
            var resultInfo = this.lstDbResult.Table;


            for (var i = 0; i < this.lstInvoiceItems.length; i++) {
              this.lstInvoiceItems[i].CGST = 0;
              this.lstInvoiceItems[i].SGST = 0;
              this.lstInvoiceItems[i].IGST = 0;

              this.lstInvoiceItems[i].CGSTAmount = 0;
              this.lstInvoiceItems[i].SGSTAmount = 0;
              this.lstInvoiceItems[i].IGSTAmount = 0;
              var ResultItem = resultInfo.filter(d => d.HSN === this.lstInvoiceItems[i].HSN);
              if (ResultItem.length > 0) {

                debugger;
                for (let j = 0; j < ResultItem.length; j++) {
                  if (ResultItem[j].TaxType == "CGST") {
                    this.lstInvoiceItems[i].CGST = (ResultItem[j].TaxPercentage2);


                  }

                  if (ResultItem[j].TaxType == "SGST") {
                    this.lstInvoiceItems[i].SGST = (ResultItem[j].TaxPercentage2);


                  }

                  if (ResultItem[j].TaxType == "IGST") {
                    this.lstInvoiceItems[i].IGST = (ResultItem[j].TaxPercentage2);

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

    debugger;
    if (this.SerchType == 'Like') {


      if (searchPartNo != "" || searchDescription != "" || searchMake != "" || searchHSN != "") {
        for (var i = 0; i < this.lstInvoiceItems.length; i++) {

          if ((this.lstInvoiceItems[i].Partno).toString().includes(searchPartNo) ||

            (this.lstInvoiceItems[i].Make).toString().includes(searchDescription) ||
            (this.lstInvoiceItems[i].Description).toString().includes(searchMake) ||
            (this.lstInvoiceItems[i].HSN).toString().includes(searchHSN)

          ) {



            this.lstInvoiceItems[i].Show = 'true';
          } else {
            this.lstInvoiceItems[i].Show = 'false';


          }
        }
      }


    }
    else {


      for (var i = 0; i < this.lstInvoiceItems.length; i++) {

        if ((this.lstInvoiceItems[i].Partno) == ((searchPartNo) != "" ? (searchPartNo) : this.lstInvoiceItems[i].Partno) &&

          (this.lstInvoiceItems[i].Make) == ((searchMake) != "" ? (searchMake) : this.lstInvoiceItems[i].Make) &&
          (this.lstInvoiceItems[i].Description) == ((searchDescription) != "" ? (searchDescription) : this.lstInvoiceItems[i].Description) &&
          (this.lstInvoiceItems[i].HSN) == ((searchHSN) != "" ? (searchHSN) : this.lstInvoiceItems[i].HSN)

        ) {



          this.lstInvoiceItems[i].Show = 'true';
        } else {
          this.lstInvoiceItems[i].Show = 'false';



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

    debugger;
    var SearchString = "";
    if (this.FilterType != 'All') {
      this.PrepareSerchStringByField();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")

      for (var i = 0; i < this.lstInvoiceItems.length; i++) {

        if (

          (this.lstInvoiceItems[i].Partno).toString().includes(SearchString) ||
          (this.lstInvoiceItems[i].Make).toString().includes(SearchString) ||
          (this.lstInvoiceItems[i].HSN).toString().includes(SearchString) ||
          (this.lstInvoiceItems[i].Description).toString().includes(SearchString)

          //(this.lstInvoiceItems[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {



          this.lstInvoiceItems[i].Show = 'true';
        } else {
          this.lstInvoiceItems[i].Show = 'false';


        }
      }

    }
    return SearchString;


  }
  PartySaved(e) {

  }
  lstCurrencies: any = [];
  GetCurrency() {



    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    debugger;
    // this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","").subscribe(
    //   (res:Response) => {
    this.DbCallings.GetCurrencies().subscribe(
      (res) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstCurrencies = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstCurrencies = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }


  PartyType = 'Vendor';
  Search() {
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));
    this.APICall.UpdatedSelectedPath('./Purchase/PurchaseInvoice');
    this.router.navigate(['Purchase/PurchaseInvoice']);
  }
  FilterTypeChange(event) {

    debugger;


    if (this.SerchType == 'Like' && event.target.checked == true) {
      this.FilterType = (event.target.checked == true ? 'All' : 'Field');
    } else {

      event.target.checked = false;
      this.FilterType = 'Field';

    }


  }

  CompanyStateId = (+this.APICall.GetCompanyStateID());

  get f() {
    return this.CreatePurchaseInvoice.controls;

  }

  lstInvoiceItems: any = [];


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
    debugger;
    var validate = true;
    this.showError = false;

    if ((+data.NetTotal) > 0) {

      debugger;
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        if (data.SNO != this.lstInvoiceItems[i].SNO && this.lstInvoiceItems[i].Partno == data.Partno && this.lstInvoiceItems[i].BinName == data.BinName && this.lstInvoiceItems[i].Make == data.Make) {
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

    return validate;
  }

  AddItemAndNewClick(event) {
    debugger;
    this.AddItem('New', event.SelecedRow, event.StockAllotment)
  }
  AddItemAndCloseClick(event) {
    debugger;
    this.AddItem('Close', event.SelecedRow, event.StockAllotment)
  }
  EditItemClick(data) {
    debugger;

    // if(data.LineId==0)
    // {
    //   this.EditRecNO = -1;
    // }
    // added The line 
    if (data.LineId == 0) {
      this.EditRecNO = 0;
    }
    //end
    this.EditRecNO = 0;
    this.errormsg = "";
    this.SelectedProductData = Object.assign({}, data);
    //this.SelectedProductData = Object.assign({},this.lstInvoiceItems.length);
  }
  EditArrayrecord(data) {
    this.EditRecNO = 0;
    debugger;
    this.errormsg = "";

    this.SelectedProductData2 = Object.assign({}, data);
  }

  AddItem(type, data, StockAllotment) {
    debugger;

    if (this.ValidateItem(data)) {

      this.lstPurchaseInvoiceItemsStock = StockAllotment;

      let lstInvoiceItems=[];
      this.lstInvoiceItems.forEach((element ,index)=> {
        lstInvoiceItems[index]={...element};
      });
      
      this.lstInvoiceItems=lstInvoiceItems;

      for (var i = 0; i < this.lstInvoiceItems.length; i++) {

        this.lstInvoiceItems[i].Show = 'true';

        debugger;
        if (this.lstInvoiceItems[i].SNO == data.SNO) {
          this.lstInvoiceItems[i].Partno = data.Partno;
        
          this.lstInvoiceItems[i].ItemId = data.ItemId;
          this.lstInvoiceItems[i].MakeId = data.MakeId;
          this.lstInvoiceItems[i].Description = data.Description;
          this.lstInvoiceItems[i].Make = data.Make;
          this.lstInvoiceItems[i].UOM = data.UOM;
          this.lstInvoiceItems[i].UOMId = data.UOMId;
          this.lstInvoiceItems[i].type = data.type;
          this.lstInvoiceItems[i].bcd = data.bcd;
          this.lstInvoiceItems[i].sws = data.sws;
          this.lstInvoiceItems[i].InvoiceType1 = data.InvoiceType1;
          this.lstInvoiceItems[i].LocationId = data.LocationId;
          this.lstInvoiceItems[i].Locationname = data.Locationname;
          this.lstInvoiceItems[i].BinName = data.BinName;
          this.lstInvoiceItems[i].BinId = data.BinId;
          // this.lstInvoiceItems[i].RefLineId = data.RefLineId;
          // this.lstInvoiceItems[i].RefId = data.RefId;
          // this.lstInvoiceItems[i].RefDate3 = data.RefDate3;
          // this.lstInvoiceItems[i].RefNo2 = data.RefNo2;
          // this.lstInvoiceItems[i].RefType1 = data.RefType1;
          this.lstInvoiceItems[i].RefLineId = this.lstInvoiceItems[i].RefLineId;
          this.lstInvoiceItems[i].RefId = this.lstInvoiceItems[i].RefId;
          this.lstInvoiceItems[i].RefDate3 = this.lstInvoiceItems[i].RefDate3;
          this.lstInvoiceItems[i].RefNo2 = this.lstInvoiceItems[i].RefNo2;
          this.lstInvoiceItems[i].RefType1 = this.lstInvoiceItems[i].RefType1;

          this.lstInvoiceItems[i].dollarprice = data.dollarprice;

          this.lstInvoiceItems[i].bcdper = data.bcdper;
          this.lstInvoiceItems[i].swsper = data.swsper;

          this.lstInvoiceItems[i].Rate = data.Rate;
          this.lstInvoiceItems[i].Qty = (+data.Qty);

          //this.lstInvoiceItems[i].CurrencyRate = data.Rate * (+this.f.ExchangeRate.value);
        // //  this.lstInvoiceItems[i].CurrencyRate = data.Rate / (+this.f.ExchangeRate.value);
        // //   this.lstInvoiceItems[i].Gross = (+data.Gross) * (+this.f.ExchangeRate.value);
        // //   this.lstInvoiceItems[i].DiscountPercentage = (+ data.DiscountPercentage);
        // //   this.lstInvoiceItems[i].DiscountAmount = (+data.DiscountAmount) * (+this.f.ExchangeRate.value);
        // //   this.lstInvoiceItems[i].CGST = (+data.CGST);
        // //   this.lstInvoiceItems[i].CGSTAmount = (+data.CGSTAmount) * (+this.f.ExchangeRate.value);
        // //   this.lstInvoiceItems[i].SGST = (+data.SGST);
        // //   this.lstInvoiceItems[i].SGSTAmount = (+data.SGSTAmount) * (+this.f.ExchangeRate.value);
        // //   this.lstInvoiceItems[i].IGST = (+data.IGST);
        // //   this.lstInvoiceItems[i].IGSTAmount = (+data.IGSTAmount) * (+this.f.ExchangeRate.value);
        // //   this.lstInvoiceItems[i].TotalTax = (+data.TotalTax) * (+this.f.ExchangeRate.value);
        // //   this.lstInvoiceItems[i].NetTotal = (+data.NetTotal) * (+this.f.ExchangeRate.value);
          

        this.lstInvoiceItems[i].CurrencyRate = data.Rate ;
          this.lstInvoiceItems[i].Gross = (+data.Gross) ;
          this.lstInvoiceItems[i].DiscountPercentage = (+ data.DiscountPercentage);
          this.lstInvoiceItems[i].DiscountAmount = (+data.DiscountAmount) ;
          this.lstInvoiceItems[i].CGST = (+data.CGST);
          this.lstInvoiceItems[i].CGSTAmount = (+data.CGSTAmount) ;
          this.lstInvoiceItems[i].SGST = (+data.SGST);
          this.lstInvoiceItems[i].SGSTAmount = (+data.SGSTAmount);
          this.lstInvoiceItems[i].IGST = (+data.IGST);
          this.lstInvoiceItems[i].IGSTAmount = (+data.IGSTAmount) ;
          this.lstInvoiceItems[i].TotalTax = (+data.TotalTax) ;
          this.lstInvoiceItems[i].NetTotal = (+data.NetTotal) ;

          
          this.lstInvoiceItems[i].TaxType = data.TaxType;
          this.lstInvoiceItems[i].HSN = data.HSN;
          this.lstInvoiceItems[i].SGSTAccountId = data.SGSTAccountId;
          this.lstInvoiceItems[i].CGSTAccountId = data.CGSTAccountId;
          this.lstInvoiceItems[i].IGSTAccountId = data.IGSTAccountId;



        }

      }
      debugger;

      if (this.EditRecNO == -1) {
        var res =
          ({
            SNO: this.lstInvoiceItems.length + 1
            , LineId: '0'
            , Description: data.Description
            , Partno: data.Partno
            , ItemId: data.ItemId
            , MakeId: data.MakeId
            , LocationId: data.LocationId
            , BinId: data.BinId
            , Locationname: data.Locationname
            , BinName: data.BinName
            , UOMId: data.UOMId
            , type: data.type
            , Make: data.Make
            , UOM: data.UOM
            , bcd: data.bcd
            , sws: data.sws
            , InvoiceType1: data.InvoiceType1
            , dollarprice: data.dollarprice
            , bcdper: data.bcdper
            , swsper: data.swsper
            , Rate: data.Rate
            , Qty: (+data.Qty)
           
            , CurrencyRate: (data.Rate )
            , Gross: (+data.Gross) 
            , DiscountPercentage: (+ data.DiscountPercentage)
            , DiscountAmount: (+data.DiscountAmount) 
            , CGST: (+data.CGST)
            , CGSTAmount: (+data.CGSTAmount) 
            , SGST: (+data.SGST)
            , SGSTAmount: (+data.SGSTAmount) 
            , IGST: (+data.IGST)
            , IGSTAmount: (+data.IGSTAmount) 
            , TotalTax: (+data.TotalTax) 
            , NetTotal: (+data.NetTotal) 
            , TaxType: data.TaxType
            , SGSTAccountId: data.SGSTAccountId
            , CGSTAccountId: data.CGSTAccountId
            , IGSTAccountId: data.IGSTAccountId
            , HSN: data.HSN
            , RefLineId: data.RefLineId
            , RefId: data.RefId
            , RefDate3: data.RefDate3
            , RefNo2: data.RefNo2
            , RefType1: data.RefType1

            , Show: 'true'
          });

        if (this.lstInvoiceItems.length == 0) {
          debugger;
          this.lstInvoiceItems = [res];
          if (data.type == "Service Item") {
            debugger;
            this.lstserviceparts.push(this.lstInvoiceItems[0]);
          }
          else {
            this.lstparts.push(this.lstInvoiceItems[0]);
          }
        }
        else {
          debugger;
          this.lstInvoiceItems.push(res);
          if (data.type == "Service Item") {
            debugger;
            this.lstserviceparts.push(res);
          }
          else {

            this.lstparts.push(res);
          }
        }
      }
      this.Invoicetype = this.lstInvoiceItems[0].InvoiceType1;

      this.loadmethod1();
      if (type == 'Close') {
        $("#btnCloseAddItem").trigger('click');
        this.EditRecNO = 0;
      } else {

        this.EditRecNO = -1;
      }
      this.SNO = this.lstInvoiceItems.length + 1;
      this.CalculateTotals();
      this.f.LineChanges.setValue(0);
      debugger;
      this.DollerRate = this.f.ExchangeRate.value;
      this.ExchangeRateChange(this.DollerRate);

    }

  }

  lstparts: any = [];
  lstserviceparts: any = [];

  TotalGross = 0;
  TotalDiscount = 0;
  TotalCGST = 0;
  TotalSGST = 0;
  TotalIGST = 0;
  TotalTax = 0;
  Total = 0;
  TotalCharges = 0;
  AfterDiscount = 0;
  CalculateTotals() {
    debugger;
    this.TotalGross = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    this.TotalCGST = 0;
    this.TotalCharges = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.AfterDiscount = 0;
    if (this.filterBy == "Import") {
      for (let i = 0; i < this.lstInvoiceItems.length; i++) {
        debugger;
        // this.lstInvoiceItems[i]

        //this.lstInvoiceItems[i].Gross=((+this.lstInvoiceItems[i].Qty)*((+this.lstInvoiceItems[i].Rate)*(+this.f.ExchangeRate.value)));

        this.lstInvoiceItems[i].CurrencyRate = (this.lstInvoiceItems[i].Rate * (+this.f.ExchangeRate.value))

        this.lstInvoiceItems[i].DiscountAmount = (((+this.lstInvoiceItems[i].Gross) * (+this.lstInvoiceItems[i].DiscountPercentage)) / 100) * (+this.f.ExchangeRate.value)
        if (this.lstInvoiceItems[i].DiscountAmount > 0) {
          var AfterDiscount = ((+this.lstInvoiceItems[i].Gross) - (+ this.lstInvoiceItems[i].DiscountAmount));

          this.lstInvoiceItems[i].SGSTAmount = (((+this.lstInvoiceItems[i].SGST) * AfterDiscount) / 100);
          this.lstInvoiceItems[i].CGSTAmount = (((+this.lstInvoiceItems[i].CGST) * AfterDiscount) / 100);
          this.lstInvoiceItems[i].IGSTAmount = (((+this.lstInvoiceItems[i].IGST) * AfterDiscount) / 100);
        }



        this.TotalCGST = this.TotalCGST + (+this.lstInvoiceItems[i].CGSTAmount);
        this.TotalSGST = this.TotalSGST + (+this.lstInvoiceItems[i].SGSTAmount);
        this.TotalIGST = this.TotalIGST + (+this.lstInvoiceItems[i].IGSTAmount);
        this.TotalGross = this.TotalGross + (+this.lstInvoiceItems[i].Rate);
        this.TotalDiscount = this.TotalDiscount + (+this.lstInvoiceItems[i].DiscountAmount);
        this.TotalTax = this.TotalTax + (+this.lstInvoiceItems[i].TotalTax);
        debugger;
        //  this.lstInvoiceItems[i].NetTotal=((AfterDiscount+(+this.lstInvoiceItems[i].TotalTax))).toFixed(2);
        this.Total = this.Total + (+this.lstInvoiceItems[i].NetTotal);


      }
    } else {
      for (let i = 0; i < this.lstInvoiceItems.length; i++) {
        debugger;
        // this.lstInvoiceItems[i]
        this.lstInvoiceItems[i].Gross = ((+this.lstInvoiceItems[i].Qty) * ((+this.lstInvoiceItems[i].Rate) * (+this.f.ExchangeRate.value)));

        this.lstInvoiceItems[i].CurrencyRate = (this.lstInvoiceItems[i].Rate * (+this.f.ExchangeRate.value))
        this.lstInvoiceItems[i].DiscountAmount = (((+this.lstInvoiceItems[i].Gross) * (+this.lstInvoiceItems[i].DiscountPercentage)) / 100) * (+this.f.ExchangeRate.value)
        var AfterDiscount = ((+this.lstInvoiceItems[i].Gross) - (+ this.lstInvoiceItems[i].DiscountAmount));;

        this.lstInvoiceItems[i].SGSTAmount = (((+this.lstInvoiceItems[i].SGST) * AfterDiscount) / 100);
        this.lstInvoiceItems[i].CGSTAmount = (((+this.lstInvoiceItems[i].CGST) * AfterDiscount) / 100);
        this.lstInvoiceItems[i].IGSTAmount = (((+this.lstInvoiceItems[i].IGST) * AfterDiscount) / 100);
        this.lstInvoiceItems[i].TotalTax = (+this.lstInvoiceItems[i].SGSTAmount) + (+this.lstInvoiceItems[i].CGSTAmount) + (+this.lstInvoiceItems[i].IGSTAmount);

        this.TotalCGST = this.TotalCGST + (+this.lstInvoiceItems[i].CGSTAmount);
        this.TotalSGST = this.TotalSGST + (+this.lstInvoiceItems[i].SGSTAmount);
        this.TotalIGST = this.TotalIGST + (+this.lstInvoiceItems[i].IGSTAmount);
        this.TotalGross = this.TotalGross + (+this.lstInvoiceItems[i].Gross);
        this.TotalDiscount = this.TotalDiscount + (+this.lstInvoiceItems[i].DiscountAmount);
        this.TotalTax = this.TotalTax + (+this.lstInvoiceItems[i].TotalTax);
        debugger;
        this.lstInvoiceItems[i].NetTotal = ((AfterDiscount + (+this.lstInvoiceItems[i].TotalTax))).toFixed(2);
        this.Total = this.Total + (+this.lstInvoiceItems[i].NetTotal);

      }
    }


    var ChargesCGST = 0;
    var ChargesSGST = 0;
    var ChargesIGST = 0;
    // for (let i = 0; i < this.lstCharges.length; i++) {

    //   this.TotalCharges = (+this.TotalCharges) + (+this.lstCharges[i].TotalCharges);
    //   ChargesCGST = (+this.lstCharges[i].ChargesCGSTAmount);
    //   ChargesSGST = (+this.lstCharges[i].ChargesSGSTAmount);
    //   ChargesIGST = (+this.lstCharges[i].ChargesIGSTAmount);

    // }

    this.TotalCGST = this.TotalCGST + (+ChargesCGST);
    this.TotalSGST = this.TotalSGST + (+ChargesSGST);
    this.TotalIGST = this.TotalIGST + (+ChargesIGST);

    this.TotalTax = this.TotalTax + (+ChargesCGST) + (+ChargesSGST) + (+ChargesIGST);
    this.Total = (+this.Total) + (+this.TotalCharges);
    // if ((+this.f.freigntcharges.value) > 0) {
    //   this.Total = this.Total + (+this.f.freigntcharges.value)
    // }
    // if ((+this.f.loadingcharges.value) > 0) {
    //   this.Total = this.Total + (+this.f.loadingcharges.value)
    // }
    // if ((+this.f.insuranceamount.value) > 0) {
    //   this.Total = this.Total + (+this.f.insuranceamount.value)
    // }

    // if ((+this.f.clearingcharges.value) > 0) {
    //   this.Total = this.Total + (+this.f.clearingcharges.value)
    // }
    this.AfterDiscount = (this.TotalGross) - this.TotalDiscount;
    this.PaymentTermsAmountCalc();
  }
  GstTaxFromHSNAndGSTTypeForChargesGridView() {
    debugger;

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


      debugger;

      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo, this.TaxType, this.TransactionDate).subscribe(
        (res) => {

          debugger;
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
            debugger;
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

  PayNameChange(target, index) {

    this.lstTermsChild[index].PayName = target.value;
  }
  PayPercentageChange(target, index) {
    if ((+target.value) > 0 && (+target.value) < 101) {
      this.lstTermsChild[index].PayPercentage = target.value;
      this.PaymentTermsAmountCalc();
    } else {
      target.value = this.lstTermsChild[index].PayPercentage;


    }
  }

  RemoveTerm(index) {

    this.lstTermsChild.splice(index, 1);
    this.PaymentTermsAmountCalc();
  }
  ValidateTerms(): boolean {
    debugger;
    var validate = true;


    var resflter = this.lstTermsChild.filter(x => (x.PayName == "" || x.PayPercentage == 0 || x.Amount == 0));


    if (resflter.length > 0) {

      validate = false;
    }
    return validate;

  }
  termValiidate = true;
  AddTerms() {
    debugger;
    // lstTermsChild
    this.termValiidate = this.ValidateTerms();
    if (this.termValiidate) {
      this.lstTermsChild.push({ PayName: "", PayPercentage: 0, Amount: 0, PurchaseInvoiceTermDetailsId: 0 });
    }

  }
  RemoveItemClick(event) {
    debugger;
  //salesinvoiceitems
  
    var sliceIndex = -1;
    let lstInvoiceItems=[];
  this.lstInvoiceItems.forEach((element ,index)=> {
    lstInvoiceItems[index]={...element};
  });
  
  this.lstInvoiceItems=lstInvoiceItems;
    for (var i = 0; i < this.lstInvoiceItems.length; i++) {
      this.lstInvoiceItems[i].Show = 'true';

      if (this.lstInvoiceItems[i].SNO == event.SNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstInvoiceItems.splice(sliceIndex, 1);
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        this.lstInvoiceItems[i].SNO = i + 1;
      }
    }

    //this.EditRecNO=-1;
    this.lstparts = [];
    this.lstserviceparts = [];
    this.SNO = this.lstInvoiceItems.length + 1;
    for (var i = 0; i < this.lstInvoiceItems.length; i++) {
      if (this.lstInvoiceItems[i].type == "Service Item") {
        this.lstserviceparts.push(this.lstInvoiceItems[i]);
      }
      else {
        this.lstparts.push(this.lstInvoiceItems[i]);
      }

    }

    this.CalculateTotals();
    $("#btnCloseAddItem").trigger('click');
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


    if (target.value != '') {
      for (let i = 0; i < this.lstPaymentTerms.length; i++) {
        if (this.lstPaymentTerms[i].TermsId == target.value) {
          if (this.lstPaymentTerms[i].TermsDetails != null && typeof (this.lstPaymentTerms[i].TermsDetails) != undefined) {
            var res = ((this.lstPaymentTerms[i].TermsDetails).replace(/\n/g, "")).replace(/'/g, "\"");

            this.lstTermsChild = JSON.parse(res);


            var data = $.map(this.lstTermsChild, function (obj) {

              obj.PurchaseInvoiceTermDetailsId = 0;



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
    debugger;
    this.f.SequenceNumberId.setValue(value);

  }
  TermsAndConditionsChange(target) {

    this.f.TermsandConditions.setValue('');
    debugger;
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

  ViewTermsAndConditions() {



    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    debugger;
    // this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","").subscribe(
    //   (res:Response) => {
    this.DbCallings.GetTermsAndCondition().subscribe(
      (res) => {
        debugger;
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



    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    debugger;
    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetPaymentTerms().subscribe(
      (res) => {

        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstPaymentTerms = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstPaymentTerms = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }


  ClockControlLoad() {

    debugger;
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
  ControlDatePickerLoad() {

    debugger;
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
      debugger;
      $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });

  }
  ngAfterViewInit() {
    debugger;
    var that = this;
    // this.Viewinsuranceaccount();

    //this.LoadVendor();
    this.LoadPackingTaxes();
    this.ViewPurchaseAccount();
    this.ViewDiscountAccount(); 
    this.LoadCuurency();
   
    //  this.Viewfreightchargesaccount();
    //  this.Viewloadingchargesaccount();
    //  this.Viewclearingchargesaccount();
    //  this.ViewPaymentTerms();
    this.ViewTermsAndConditions();
    this.ClockControlLoad();
  
    
    // $("#TransactionTime").val(this.f.TransactionTime.value);
    this.ControlDatePickerLoad();
    // if ((+this.StorePurchaseInvoice.CurrencyId) > 0 && (+this.StorePurchaseInvoice.CurrencyId) != 10) {
    //   debugger;
    //   this.f.InvoiceType.setValue("Import");
    //   this.InvoiceTypeChange("Import");
    // } else {
    //   debugger;
    //   this.f.InvoiceType.setValue("Invoice");
    //   this.InvoiceTypeChange("Invoice");
    // }

    $("#Image").attr("src", this.APICall.ImagePath + this.getControlValue(this.f.Image, 'string'));
  }
  ShippingAddressChange(target) {
    debugger;
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
  QuotDateChange(e) {

  }

  DeviceType = "";
  lstImportDetails: any = [];
  StorePurchaseInvoice: StorePurchaseInvoice;
  StoreLoadPurchaseInvoice: StoreLoadPurchaseInvoice;
  StoreAccountingSettings: StoreAccountingSettings;
  DefaultPurchaseAccount = 0;
  DefaultDiscountAccount = 0;
  Defaultfreightchargesaccount = 0;
  DefaultLoadinCharges = 0;
  ChargesAccountGroup = '';
  CreatedBy: string = "";
  ModifiedBy: string = "";
  DefaultInsuranceCharges = 0;
  tempreferencetype: string = "";
  tempVendorreference: string = "";
  tempvdate: string = "";
  tempIncoterms: string = "";
  tempPurchaseType: string = "";
  tempTransactionDate: string = "";
  Tracking1: string = "";
  Tracking2: string = "";
  Tracking3: string = "";
  Tracking4: string = "";
  Tracking5: string = "";
  Tracking10: string = "";
  Tracking11: string = "";
  Tracking12: string = ""
  lststoreInvoiceItems: any = [];
  lstImportTaxDetails: any = [];
  tempvendid: number = 0;
  tempvendid1: number = 0;
  temparr1: any = [];
  ngOnInit() {
    debugger;
   

    this.Tracking1 = "Modifiedinvalid";
    this.Tracking2 = "Modifiedinvalid";
    this.Tracking3 = "Modifiedinvalid";
    this.Tracking4 = "Modifiedinvalid";
    this.Tracking5 = "Modifiedinvalid";
    this.Tracking10 = "Modifiedinvalid";
    this.Tracking11 = "Modifiedinvalid";
    this.Tracking12 = "Modifiedinvalid";
    this.packingChargesTaxName = "GST 18%";
    this.packingChargesValue = "18";


    

    this.DeviceType = localStorage.getItem('DeviceType')

    this.StorePurchaseInvoice = new StorePurchaseInvoice;

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {
      debugger;
      this.StoreAccountingSettings = (Asresult[0]);
      this.ChargesAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Charges'; }))[0].AccountGroupName;


      this.DefaultPurchaseAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Purchases'; }))[0].AccountId;
      this.DefaultDiscountAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Discount Received'; }))[0].AccountId;
      this.Defaultfreightchargesaccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Frieght Charges'; }))[0].AccountId;
      this.DefaultLoadinCharges = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Loading Charges'; }))[0].AccountId;

      this.DefaultInsuranceCharges = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Insurance'; }))[0].AccountId;

      this.DefaultInsuranceCharges = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Insurance'; }))[0].AccountId;


    }
    //var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "PurchaseInvoice"; });

    if (result.length > 0) {
      debugger;
      //this.StorePurchaseInvoice=Object.assign([],result[0]);
    Object.assign(this.StorePurchaseInvoice,result[0]);
      var RequiredDate=formatDate(new Date(), 'MM/dd/yyyy', 'en');
      var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
     $("#TransactionDate").val(TransactionDate)
     $("#RequiredDate").val(RequiredDate)

     this.TransactionDate=TransactionDate;

     if(this.StorePurchaseInvoice.InvoiceType=="Import")
     {
       debugger;
       this.filterBy="Import";
       this.f.InvoiceType.setValue("Import");
       this.InvoiceTypeChange("Import");
     } else {
       debugger;
       this.filterBy="";
       this.f.InvoiceType.setValue("Invoice");
       this.InvoiceTypeChange("Invoice");
     }


     this.Currencyname=this.StorePurchaseInvoice.Currencyname;
      this.LoadCuurency();

     var currencyselection = new Option(this.StorePurchaseInvoice.Currencyname.toString(), this.StorePurchaseInvoice.CurrencyId.toString(), true, true);
  
   (<any>$('#drpCurrency')).append(currencyselection).trigger('change');

      this.ModifiedDate = this.StorePurchaseInvoice.ModifiedDate.toString();

      this.StorePurchaseInvoice.Purchaseaccount = ((typeof (this.StorePurchaseInvoice.Purchaseaccount) == 'undefined' ? 0 : this.StorePurchaseInvoice.Purchaseaccount) == 0 ? this.DefaultPurchaseAccount : this.StorePurchaseInvoice.Purchaseaccount);

      debugger;
      this.StorePurchaseInvoice.Discountaccount = ((typeof (this.StorePurchaseInvoice.Discountaccount) == 'undefined' ? 0 : this.StorePurchaseInvoice.Discountaccount) == 0 ? this.DefaultDiscountAccount : this.StorePurchaseInvoice.Discountaccount);
      this.StorePurchaseInvoice.freightchargesaccount = ((typeof (this.StorePurchaseInvoice.freightchargesaccount) == 'undefined' ? 0 : this.StorePurchaseInvoice.freightchargesaccount) == 0 ? this.Defaultfreightchargesaccount : this.StorePurchaseInvoice.freightchargesaccount);
      this.StorePurchaseInvoice.loadingchargesaccount = ((typeof (this.StorePurchaseInvoice.loadingchargesaccount) == 'undefined' ? 0 : this.StorePurchaseInvoice.loadingchargesaccount) == 0 ? this.DefaultLoadinCharges : this.StorePurchaseInvoice.loadingchargesaccount);
      this.StorePurchaseInvoice.insuranceaccount = ((typeof (this.StorePurchaseInvoice.insuranceaccount) == 'undefined' ? 0 : this.StorePurchaseInvoice.insuranceaccount) == 0 ? this.DefaultInsuranceCharges : this.StorePurchaseInvoice.insuranceaccount);
      this.StorePurchaseInvoice.clearingchargesaccount = ((typeof (this.StorePurchaseInvoice.clearingchargesaccount) == 'undefined' ? 0 : this.StorePurchaseInvoice.insuranceaccount) == 0 ? this.DefaultInsuranceCharges : this.StorePurchaseInvoice.clearingchargesaccount);
      
      this.tempreferencetype = this.StorePurchaseInvoice.VendorreferenceType;
      this.tempVendorreference = this.StorePurchaseInvoice.Vendorreference;
      this.tempvdate = this.StorePurchaseInvoice.vdate;
      this.tempIncoterms = this.StorePurchaseInvoice.Incoterms;
      this.tempPurchaseType = this.StorePurchaseInvoice.PurchaseType;
      this.tempTransactionDate = this.StorePurchaseInvoice.TransactionDate;
   // var editdate= this.datePipe.transform(this.StorePurchaseInvoice., 'MM-dd-yyyy')

      this.lstPurchaseInvoiceItemsStock = this.StorePurchaseInvoice.lstPurchaseInvoiceItemsStock;
      this.BillToStateCode = this.StorePurchaseInvoice.BillToStateCode;
      this.BillToStateName = this.StorePurchaseInvoice.BillToStateName;
      this.DispalyVendorName = this.StorePurchaseInvoice.PartyName;
      this.DisplayVendorId = this.StorePurchaseInvoice.PartyId;
      this.ExchangeRate=this.StorePurchaseInvoice.ExchangeRate;
    //  this.f.vdate.setValue(this.StorePurchaseInvoice.vdate.toString())
      
      this.SelectedState = this.StorePurchaseInvoice.SelectedState;

      // if (this.StorePurchaseInvoice.ExchangeRate1 > 0) {
      //   this.val1 = this.StorePurchaseInvoice.ExchangeRate1;
      // }

      if (this.StorePurchaseInvoice.ExchangeRate > 0) {
        this.DollerRate = this.StorePurchaseInvoice.ExchangeRate;
      }

      if (this.StorePurchaseInvoice.PackingTaxPercentage > 0) {
        debugger;
        this.f.PackingTaxPercentage.setValue(this.StorePurchaseInvoice.PackingTaxPercentage);
        this.packingChargesTaxName = this.StorePurchaseInvoice.PackingTaxPercentageValue.toString();
        this.packingChargesValue = this.StorePurchaseInvoice.PackingTaxPercentage.toString();
        $('#drpPackingCharges').val(this.StorePurchaseInvoice.PackingTaxPercentage);

      }




      this.PartyGSTNo = this.StorePurchaseInvoice.PartyGSTNo;
      this.CreatedBy = this.StorePurchaseInvoice.CreatedBy;
      this.ModifiedBy = this.StorePurchaseInvoice.ModifiedBy;
      this.lstInvoiceItems = this.StorePurchaseInvoice.lstPurchaseInvoiceItems == null ? [] : this.StorePurchaseInvoice.lstPurchaseInvoiceItems;
      this.TaxType = this.StorePurchaseInvoice.TaxType == "" ? 'Intra State' : this.StorePurchaseInvoice.TaxType;
      var i = 0;
      var that = this;
      var lstInvoiceItemsdata = $.map(Object.assign([],this.lstInvoiceItems), function (obj) {
        // i = i + 1;
        // obj.SNO = i;
        // return obj;
        i = i + 1;
        return { ...obj, SNO: i};
      });
      debugger;
      this.lstInvoiceItems = lstInvoiceItemsdata;
      this.lststoreInvoiceItems = lstInvoiceItemsdata;
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        if (this.lstInvoiceItems[i].type == "Service Item") {
          this.lstserviceparts.push(this.lstInvoiceItems[i]);
        }
        else {
          this.lstparts.push(this.lstInvoiceItems[i]);
        }

      }

      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        if (this.StorePurchaseInvoice.TransactionId == 0) {

        }
      }



      this.lstTermsChild = this.StorePurchaseInvoice.lstTermsChild == null ? [] : this.StorePurchaseInvoice.lstTermsChild;

      var i = 0;

      var lstTermsChilddata = $.map(this.lstTermsChild, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      this.lstTermsChild = lstTermsChilddata;

      this.lstImportTaxDetails = this.StorePurchaseInvoice.lstImportTaxDetails == null ? [] : this.StorePurchaseInvoice.lstImportTaxDetails;
      var i = 0;
      debugger;
      var lstImportTaxDetailsdata = $.map(this.lstImportTaxDetails, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      this.lstImportTaxDetails = lstImportTaxDetailsdata;
      debugger;
      // for (var i: number = 0; i <lstImportTaxDetailsdata.length; i++) {
      //   var result = lstImportTaxDetailsdata.filter((x) => { return x.Vendor1ID == lstImportTaxDetailsdata[i].Vendor1ID; });
      //   if (result.length > 0) {
      //     that.lstImportTaxDetails = result;
      //   }

      // }
      this.getUnique(lstImportTaxDetailsdata, 'Vendor1ID');
      debugger;
      for (var i = 0; i < this.lstImportTaxDetails.length; i++) {
        this.lstchargeaccnt.push({
          LineID: this.lstImportTaxDetails[i].LineID,
          Vendorname1: this.lstImportTaxDetails[i].Vendorname1,
          Vendor1ID: this.lstImportTaxDetails[i].Vendor1ID,
          refno: this.lstImportTaxDetails[i].refno,
          chargeDate: this.lstImportTaxDetails[i].chargeDate,
          lstchargeacntitems: [],
        });
      }
      debugger;
      for (var i = 0; i < this.lstchargeaccnt.length; i++) {
        for (var j = 0; j < lstImportTaxDetailsdata.length; j++) {
          if (this.lstchargeaccnt[i].Vendor1ID == lstImportTaxDetailsdata[j].Vendor1ID) {
            debugger;
            this.temparr1.push({
              Partno: lstImportTaxDetailsdata[j].Partno,
              description1: lstImportTaxDetailsdata[j].description1,
              HSN1: lstImportTaxDetailsdata[j].HSN1,
              TaxAmount1: lstImportTaxDetailsdata[j].TaxAmount1,
              GSTAmount1: lstImportTaxDetailsdata[j].GSTAmount1,
              TotalAmount1: lstImportTaxDetailsdata[j].TotalAmount1,
              IGST1: lstImportTaxDetailsdata[j].IGST1,
              IGSTAmount1: lstImportTaxDetailsdata[j].IGSTAmount1,
              IGSTAccountId1: lstImportTaxDetailsdata[j].IGSTAccountId1,
              SGST1: lstImportTaxDetailsdata[j].SGST1,
              SGSTAmount1: lstImportTaxDetailsdata[j].SGSTAmount1,
              SGSTAccountId1: lstImportTaxDetailsdata[j].SGSTAccountId1,
              CGST1: lstImportTaxDetailsdata[j].CGST1,
              CGSTAmount1: lstImportTaxDetailsdata[j].CGSTAmount1,
              CGSTAccountId1: lstImportTaxDetailsdata[j].CGSTAccountId1,
              MakeId1: lstImportTaxDetailsdata[j].MakeId1,
              Make1: lstImportTaxDetailsdata[j].Make1,
              ItemId: lstImportTaxDetailsdata[j].ItemId,

            });
          }
        }
        if (this.temparr1.length > 0) {
          debugger;
          this.lstchargeaccnt[i].lstchargeacntitems = this.temparr1;
          this.temparr1 = [];
        }

      }
     
      if (this.StorePurchaseInvoice.RequiredDate != '') {
        debugger;
        var RequiredDate = formatDate(new Date(this.StorePurchaseInvoice.RequiredDate), 'MM/dd/yyyy', 'en');
        var TransactionDate = formatDate(new Date(this.StorePurchaseInvoice.TransactionDate), 'MM/dd/yyyy', 'en');
        ///var TransactionTime=  formatDate(new Date(this.StorePurchaseInvoice.TransactionTime), 'HH:mm', 'en');
      } else {
        debugger;
        var RequiredDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
       
      }
      debugger;
      var RequiredDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      $("#RequiredDate").val(RequiredDate)
      $("#TransactionDate").val(TransactionDate)
   
      //$("#TransactionTime").val(TransactionTime)
      this.TransactionDate = TransactionDate;
debugger;
      this.CreatePurchaseInvoice.patchValue(this.StorePurchaseInvoice);
      this.f.vdate.setValue(formatDate(this.StorePurchaseInvoice.vdate, 'yyyy-MM-dd', 'en'));

      //this.ShippingDetailsPartyId(this.StorePurchaseInvoice.PartyId,false);
    //  this.GetCurrency();
      if (this.StorePurchaseInvoice.TransactionNo != "") {
        debugger;
        this.ActivityTracker();
      }
    }

    this.f.PackingTaxPercentage.setValue('18');

    this.CalculateTotals();
   
   

    debugger;
    var that = this;
 
    this.CreatePurchaseInvoice.valueChanges.subscribe(value => {
      let data =Object.assign( {},value);
      that.StorePurchaseInvoice.SequenceNumberId = value.SequenceNumberId;
      that.StorePurchaseInvoice.Contactno = value.Contactno;
      that.StorePurchaseInvoice.Email = value.Email;
      that.StorePurchaseInvoice.PurchaseType = value.PurchaseType;

      that.StorePurchaseInvoice.lstPurchaseInvoiceItemsStock = that.lstPurchaseInvoiceItemsStock;
      that.StorePurchaseInvoice.RequiredDate = value.RequiredDate;
      that.StorePurchaseInvoice.Billto = value.Billto;
      that.StorePurchaseInvoice.SelectedState = that.SelectedState;
      that.StorePurchaseInvoice.CurrencyId = value.CurrencyId;
      that.StorePurchaseInvoice.ExchangeRate = value.ExchangeRate;
      that.StorePurchaseInvoice.Image = value.Image;
      that.StorePurchaseInvoice.Vendorreference = value.Vendorreference;
      that.StorePurchaseInvoice.Incoterms = value.Incoterms;
      that.StorePurchaseInvoice.vdate = value.vdate;
      that.StorePurchaseInvoice.VendorreferenceType = value.VendorreferenceType;
that.StorePurchaseInvoice.ExchangeRate=value.ExchangeRate;
     
      that.StorePurchaseInvoice.freightchargesaccount = value.freightchargesaccount;
      that.StorePurchaseInvoice.loadingchargesaccount = value.loadingchargesaccount;
      that.StorePurchaseInvoice.insuranceaccount = value.insuranceaccount;
      that.StorePurchaseInvoice.clearingchargesaccount = value.clearingchargesaccount;

      

      that.StorePurchaseInvoice.InvoiceType = value.InvoiceType;
      that.StorePurchaseInvoice.BillToStateCode = that.BillToStateCode;
      that.StorePurchaseInvoice.BillToStateName = that.BillToStateName;

      that.StorePurchaseInvoice.TaxType = that.TaxType;

      that.StorePurchaseInvoice.notes = value.notes;

      
      that.StorePurchaseInvoice.TransactionDate = value.TransactionDate;
      that.StorePurchaseInvoice.TransactionId = value.TransactionId;
      that.StorePurchaseInvoice.Totalvalueininr = value.Totalvalueininr;
      
      that.StorePurchaseInvoice.ExchangeRate = value.ExchangeRate;
      that.StorePurchaseInvoice.vendorinvoicenumber = value.vendorinvoicenumber;

      that.StorePurchaseInvoice.PackingAmount = value.PackingAmount;
      that.StorePurchaseInvoice.PackingIGST = value.PackingIGST;
      that.StorePurchaseInvoice.PackingCGST = value.PackingCGST;
      that.StorePurchaseInvoice.PackingSGST = value.PackingSGST;
      that.StorePurchaseInvoice.PackingTaxPercentage = value.PackingTaxPercentage;
      that.StorePurchaseInvoice.PackingNetTotal = value.PackingNetTotal;
      that.StorePurchaseInvoice.LoadingAmount = value.LoadingAmount;
      that.StorePurchaseInvoice.LoadingIGST = value.LoadingIGST;
      that.StorePurchaseInvoice.LoadingCGST = value.LoadingCGST;
      that.StorePurchaseInvoice.LoadingSGST = value.LoadingSGST;
      that.StorePurchaseInvoice.LoadingTaxPercentage = value.LoadingTaxPercentage;
      that.StorePurchaseInvoice.LoadingNetTotal = value.LoadingNetTotal;
      that.StorePurchaseInvoice.TransportAmount = value.TransportAmount;
      that.StorePurchaseInvoice.TransportIGST = value.TransportIGST;
      that.StorePurchaseInvoice.TransportCGST = value.TransportCGST;
      that.StorePurchaseInvoice.TransportSGST = value.TransportSGST;
      that.StorePurchaseInvoice.TransportTaxPercentage = value.TransportTaxPercentage;
      that.StorePurchaseInvoice.TransportNetTotal = value.TransportNetTotal;


      that.StorePurchaseInvoice.TransactionNo = value.TransactionNo;
      that.StorePurchaseInvoice.PartyName = value.PartyName;
      that.StorePurchaseInvoice.PartyGSTNo = this.PartyGSTNo;

      that.StorePurchaseInvoice.PartyId = value.PartyId;

      that.StorePurchaseInvoice.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate.toString());
      that.StorePurchaseInvoice.ViewName = 'PurchaseInvoice';
      that.StorePurchaseInvoice.lstImportDetails = that.lstImportDetails;
      that.StorePurchaseInvoice.lstPurchaseInvoiceItems = that.lstInvoiceItems;

      that.StorePurchaseInvoice.lstTermsChild = that.lstTermsChild;
      that.store.dispatch(new TabStore.AddTab(Object.assign({},that.StorePurchaseInvoice )));
    })


    if ((+this.StorePurchaseInvoice.PackingAmount) > 0 || (+this.StorePurchaseInvoice.LoadingAmount) > 0 ||
      (+this.StorePurchaseInvoice.TransportAmount) > 0) {
      this.TotalCharges = ((+this.StorePurchaseInvoice.PackingAmount) + (+this.StorePurchaseInvoice.LoadingAmount)
        + (+this.StorePurchaseInvoice.TransportAmount));

      this.TotalTax = (+this.TotalTax) + ((+this.StorePurchaseInvoice.PackingCGST) + (+this.StorePurchaseInvoice.PackingIGST)
        + (+this.StorePurchaseInvoice.PackingSGST) + (+this.StorePurchaseInvoice.LoadingIGST) + (+this.StorePurchaseInvoice.LoadingSGST)
        + (+this.StorePurchaseInvoice.LoadingCGST) + (+this.StorePurchaseInvoice.TransportIGST) + (+this.StorePurchaseInvoice.TransportSGST)
        + (+this.StorePurchaseInvoice.TransportCGST));

      this.Total = ((+this.TotalGross) - (+this.TotalDiscount)) + this.TotalCharges + this.TotalTax;
    }


  //   $("ExchangeRate").keypress(function (event) {
  //     if (event.keyCode == 13) {
  //         event.preventDefault();
  //     }
  // });
   

  }
 


  getUnique(arr, comp) {
    debugger;
    // store the comparison  values in array
    const unique = arr.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);

    this.lstImportTaxDetails = unique;
  }
  getUnique1(arr, comp) {
    debugger;
    // store the comparison  values in array
    const unique = arr.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);

    this.lstInvoiceItems = unique;
  }
  tabClick(e) {

  }
  PrintCloseClick() {
    this.InvoiceData = null;
    $("#btnCloseInvoicePrint").click();

  }
  SelectedState = 0;
  SelectedDate = ($("#TransactionDate").val());
  BillToStateName = '';
  BillToStateCode = '';
  lstVendorItems: any;
  selectedVendor: Vendor
  VendorValueChange(event) {
    debugger;
    this.BillToStateName = '';
    this.BillToStateCode = '';

    debugger;
    this.selectedVendor = Object.assign({}, event);

    if (this.selectedVendor.lstItems != undefined && this.selectedVendor.lstItems != null && this.selectedVendor.lstItems != "") {
      var items = this.selectedVendor.lstItems.replace(/\n/g, "").replace(/'/g, "\"");

      this.lstVendorItems = JSON.parse(items);;
    }

    this.DisplayVendorId = event.VendorId;
    this.SelectedState = event.state;
    this.f.Email.setValue(event.email);
    this.f.Contactno.setValue(event.Contactno);
    this.f.PartyId.setValue(event.VendorId);
    this.f.CurrencyId.setValue(event.CurrencyId);
    // if (event.CurrencyId != 10) {
    //   debugger;
    //   this.f.InvoiceType.setValue("Import");
    //   this.InvoiceTypeChange("Import");
    // }
    // else {
    //   debugger;
    //   this.f.InvoiceType.setValue("Invoice");
    //   this.InvoiceTypeChange("Invoice");
    // }
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

    //this.f.ShiptoAddress.setValue(Address);
    //this.ShippingDetailsPartyId(event.VendorId,true);

    //billto
    if (this.CompanyStateId != this.SelectedState
    ) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

    this.GstTaxFromHSNAndGSTTypeForGridView();
    this.GstTaxFromHSNAndGSTTypeForChargesGridView();
  }


  ItemDetails() {
    try {

    }
    catch (error) { }
  }


  InvoiceTypeChange(Value: string) {
    debugger;
    this.filterBy = Value;
    if (this.filterBy == "Import") {
      this.f.InvoiceType.setValue("Import");
      this.Exchange = "show";
      this.acntname = "Basic Custom Duty";

      this.viewchartsaccount()


    }
    else {
      this.Exchange = "";
    }
    if (this.StorePurchaseInvoice.CurrencyId == 0) {
      this.StorePurchaseInvoice.CurrencyId = this.f.CurrencyId.value;
      this.store.dispatch(new TabStore.AddTab(this.StorePurchaseInvoice));
    }


  }
  viewchartsaccount() {
    debugger;
    this.APICall.DBCalling("ViewChartOfAccounts", this.acntname, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        if (this.lstDbResult.Table.length > 0) {
          if (this.BCDAccount == 0) {
            debugger;
            this.BCDAccount = this.lstDbResult.Table[0].COAId;
            this.acntname = "Social Welfare Surcharge 10 %";
            this.viewchartsaccount();

          }
          if (this.BCDAccount > 0 && this.SWSAccount == 0) {
            debugger;
            this.SWSAccount = this.lstDbResult.Table[0].COAId;
          }

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
        this.ngOnInit();
      } else {
        (window as any).swal("Cancelled", "Your details  is safe:)", "error");
      }

    });
  }
  onOptionsSelected(e) {

  }

  ItemId: number = 0;
  UOMId: number = 0;
  HSN: string = "";
  Partno: string = "";




  lstchargeaccnt: any = [];
  tempid = 0;
  TransactionDate1: any;
  lstchargesAccount: any = [];
  chargeaccnt() {
    this.EditRecNO = -1;
    this.TransactionDate = this.TransactionDate
    this.SelectedProductData2 = {
      SNO: (this.lstchargeaccnt.length == 0 ? 1 : (this.lstchargeaccnt.length + 1))
      , Vendor1ID: 0
      , LineID: 0
      , Vendorname1: ''
      , refno: ''
      , chargeDate: ''
      , lstchargeacntitems: []
      , Show: 'true'
    };
  }
  ClearItem(f) {
    debugger;
    for (var i = 0; i < this.lstchargeaccnt.length; i++) {
      if (this.lstchargeaccnt[i].ID == f.ID) {
        this.lstchargeaccnt.splice(i, 1);
      }

    }

  }

  CloseProduct1() {

  }

  RemoveItem1() {

  }
  AddItem1() {

  }

  lstItems: any = [];
  tempvndrid: number = 0;
  AddchargesItemAndCloseClick(event) {
    debugger;
    this.AddchargeItem('Close', event.SelectedRow1, event.SelectedRow2)
  }
  AddchargeItem(type, data, data1) {
    debugger;


    //let WeekName:string= this.from
    //  this.lstchargeaccnt = data;

    for (var i = 0; i < this.lstchargeaccnt.length; i++) {
      this.lstchargeaccnt[i].Show = 'true';
      if (this.lstchargeaccnt[i].SNO == data.SNO) {
        this.lstchargeaccnt[i].LineID = data.LineID;
        this.lstchargeaccnt[i].Vendor1ID = data.Vendor1ID;
        this.lstchargeaccnt[i].Vendorname1 = data.Vendorname1;
        this.lstchargeaccnt[i].refno = data.refno;
        this.lstchargeaccnt[i].chargeDate = data.date;
        this.lstchargeaccnt[i].lstchargeacntitems = data1;

      }

    }
    if (this.EditRecNO == -1) {
      var res =
        ({
          SNO: this.lstchargeaccnt.length + 1
          , LineID: '0'
          , Vendor1ID: data.Vendor1ID
          , Vendorname1: data.Vendorname1

          , refno: data.refno
          , chargeDate: data.date
          , lstchargeacntitems: data1

          , Show: 'true'
        });

      if (this.lstchargeaccnt.length == 0) {
        this.lstchargeaccnt = [res];

      }
      else {
        this.lstchargeaccnt.push(res);

      }
    }

    if (type == 'Close') {
      $("#btnCloseAddItem1").trigger('click');
      this.EditRecNO = 0;
    } else {

      this.EditRecNO = -1;
    }
    this.SNO = this.lstchargeaccnt.length + 1;

  }
  ToggleValue: string = "Off"
  on() {
    debugger;
    if (this.ToggleValue == "On") {
      debugger;
      this.ToggleValue = "Off";
      this.Tracking1 = "Modifiedinvalid";
      this.Tracking2 = "Modifiedinvalid";
      this.Tracking3 = "Modifiedinvalid";
      this.Tracking4 = "Modifiedinvalid";
      this.Tracking5 = "Modifiedinvalid";
      this.LoadReverseDetails();
      this.CalculateTotals();
    } else {
      debugger;
      this.ToggleValue = "On";
      this.LoadDetails();
    }
  }


  LoadReverseDetails() {
    debugger;
    this.lstserviceparts = [];
    this.lstparts = [];
    this.BillToStateCode = this.StoreLoadPurchaseInvoice.BillToStateCode;
    this.BillToStateName = this.StoreLoadPurchaseInvoice.BillToStateName;
    this.DispalyVendorName = this.StoreLoadPurchaseInvoice.PartyName;
    this.DisplayVendorId = this.StoreLoadPurchaseInvoice.PartyId;
    this.SelectedState = this.StoreLoadPurchaseInvoice.SelectedState;
    this.PartyGSTNo = this.StoreLoadPurchaseInvoice.PartyGSTNo;
    this.CreatedBy = this.StoreLoadPurchaseInvoice.CreatedBy;
    this.ModifiedBy = this.StoreLoadPurchaseInvoice.ModifiedBy;
    this.CreatePurchaseInvoice.patchValue(this.StoreLoadPurchaseInvoice);
    debugger;
    this.StorePurchaseInvoice.lstImportDetails = this.StoreLoadPurchaseInvoice.lstImportDetails;
    this.StorePurchaseInvoice.lstPurchaseInvoiceItems = this.StoreLoadPurchaseInvoice.lstPurchaseInvoiceItems;

    this.StorePurchaseInvoice.lstTermsChild = this.StoreLoadPurchaseInvoice.lstTermsChild;
    this.lstInvoiceItems = this.StorePurchaseInvoice.lstPurchaseInvoiceItems;
    this.lstTermsChild = this.StorePurchaseInvoice.lstTermsChild;
    for (var i = 0; i < this.lstInvoiceItems.length; i++) {
      if (this.lstInvoiceItems[i].type == "Service Item") {
        this.lstserviceparts.push(this.lstInvoiceItems[i]);
      }
      else {
        this.lstparts.push(this.lstInvoiceItems[i]);
      }

    }
    this.store.dispatch(new TabStore.AddTab(this.StorePurchaseInvoice));
  }
  LoadDetails() {
    debugger;
    this.StoreLoadPurchaseInvoice = new StoreLoadPurchaseInvoice;
    this.StoreLoadPurchaseInvoice.SequenceNumberId = this.StorePurchaseInvoice.SequenceNumberId;
    this.StoreLoadPurchaseInvoice.Contactno = this.StorePurchaseInvoice.Contactno;
    this.StoreLoadPurchaseInvoice.Email = this.StorePurchaseInvoice.Email;
    this.StoreLoadPurchaseInvoice.PurchaseType = this.StorePurchaseInvoice.PurchaseType;

    this.StoreLoadPurchaseInvoice.lstPurchaseInvoiceItemsStock = this.StorePurchaseInvoice.lstPurchaseInvoiceItemsStock;
    this.StoreLoadPurchaseInvoice.RequiredDate = this.StorePurchaseInvoice.RequiredDate;
    this.StoreLoadPurchaseInvoice.Billto = this.StorePurchaseInvoice.Billto;
    this.StoreLoadPurchaseInvoice.SelectedState = this.StorePurchaseInvoice.SelectedState;
    this.StoreLoadPurchaseInvoice.CurrencyId = this.StorePurchaseInvoice.CurrencyId;
    this.StoreLoadPurchaseInvoice.ExchangeRate = this.StorePurchaseInvoice.ExchangeRate;
    this.StoreLoadPurchaseInvoice.Vendorreference = this.StorePurchaseInvoice.Vendorreference;
    this.StoreLoadPurchaseInvoice.Incoterms = this.StorePurchaseInvoice.Incoterms;
    this.StoreLoadPurchaseInvoice.vdate = this.StorePurchaseInvoice.vdate;
    this.StoreLoadPurchaseInvoice.VendorreferenceType = this.StorePurchaseInvoice.VendorreferenceType;
    this.StoreLoadPurchaseInvoice.freightchargesaccount = this.StorePurchaseInvoice.freightchargesaccount;
    this.StoreLoadPurchaseInvoice.loadingchargesaccount = this.StorePurchaseInvoice.loadingchargesaccount;
    this.StoreLoadPurchaseInvoice.insuranceaccount = this.StorePurchaseInvoice.insuranceaccount;
    this.StoreLoadPurchaseInvoice.clearingchargesaccount = this.StorePurchaseInvoice.clearingchargesaccount;


    this.StoreLoadPurchaseInvoice.InvoiceType = this.StorePurchaseInvoice.InvoiceType;
    this.StoreLoadPurchaseInvoice.BillToStateCode = this.StorePurchaseInvoice.BillToStateCode;
    this.StoreLoadPurchaseInvoice.BillToStateName = this.StorePurchaseInvoice.BillToStateName;

    this.StoreLoadPurchaseInvoice.TaxType = this.StorePurchaseInvoice.TaxType;
    this.StoreLoadPurchaseInvoice.notes = this.StorePurchaseInvoice.notes;

    this.StoreLoadPurchaseInvoice.TransactionDate = this.StorePurchaseInvoice.TransactionDate;
    this.StoreLoadPurchaseInvoice.TransactionId = this.StorePurchaseInvoice.TransactionId;
    this.StoreLoadPurchaseInvoice.Totalvalueininr = this.StorePurchaseInvoice.Totalvalueininr;
    this.StoreLoadPurchaseInvoice.ExchangeRate = this.StorePurchaseInvoice.ExchangeRate;
    // this.StoreLoadPurchaseInvoice.ExchangeRate1 = this.StorePurchaseInvoice.ExchangeRate1;
    this.StoreLoadPurchaseInvoice.vendorinvoicenumber = this.StorePurchaseInvoice.vendorinvoicenumber;

    this.StoreLoadPurchaseInvoice.TransactionNo = this.StorePurchaseInvoice.TransactionNo;
    this.StoreLoadPurchaseInvoice.PartyName = this.StorePurchaseInvoice.PartyName;
    this.StoreLoadPurchaseInvoice.PartyGSTNo = this.PartyGSTNo;

    this.StoreLoadPurchaseInvoice.PartyId = this.StorePurchaseInvoice.PartyId;

    //this.StoreLoadPurchaseInvoice.ModifiedDate = (this.StorePurchaseInvoice.ModifiedDate == null ? '' : this.StorePurchaseInvoice.ModifiedDate.toString());
    this.StoreLoadPurchaseInvoice.ModifiedDate = this.StorePurchaseInvoice.ModifiedDate;

    this.StoreLoadPurchaseInvoice.lstImportDetails = this.StorePurchaseInvoice.lstImportDetails;
    this.StoreLoadPurchaseInvoice.lstPurchaseInvoiceItems = this.lstInvoiceItems;

    this.StoreLoadPurchaseInvoice.lstTermsChild = this.lstTermsChild;
    this.store.dispatch(new TabStore.AddTab(this.StoreLoadPurchaseInvoice));
    this.ClearViewData1();

  }

  ClearViewData1() {
    debugger;
    this.submitted = false;
    this.ModifiedDate = "";
    this.CreatePurchaseInvoice.patchValue(


      {
        SequenceNumberId: 0,
        Contactno: '',
        PartyName: '',
        Email: '',
        RequiredDate: '',
        Billto: '',
        Shipto: 0,
        ShiptoAddress: '',
        Terms: '',
        Vendorreference: '',
        Incoterms: '',
        vdate: '',
        VendorreferenceType: '',
        TermsandConditions: '',
        PaymentTerms: '',
        //  TransactionTime:'',
        TransactionDate: '',
        TransactionId: 0,
        PartyId: 0,
        SearchString: '',
        searchPartNo: '',
        searchDescription: '',
        searchMake: '',
        searchHSN: '',
        Purchaseaccount: this.DefaultPurchaseAccount,
        Discountaccount: this.DefaultDiscountAccount,
        freightchargesaccount: this.Defaultfreightchargesaccount,
        loadingchargesaccount: this.DefaultLoadinCharges,
        insuranceaccount: this.DefaultInsuranceCharges

      }
    );
    this.PartyGSTNo = '';
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    // this.f.TransactionTime.setValue(this.CurrentTime);

    var rdate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    $("#RequiredDate").val(rdate)
    $("#TransactionDate").val(rdate)
    //$("#TransactionTime").val(this.CurrentTime)
    this.lstInvoiceItems = null;
    this.lstInvoiceItems = [];
    this.lstparts = [];
    this.lstserviceparts = [];
    this.lstTermsChild = null;
    this.lstTermsChild = [];
    this.DisplayVendorId = 0;
    this.DispalyVendorName = "";
    this.DisplaySequenceNumberId = 0;
    this.TotalGross = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    debugger;




  }

  lstrackPurchaseInvoice: any = [];
  ActivityTracker() {
    debugger;
    this.APICall.DBCalling("ViewTrackPurchaseInvoice", this.StorePurchaseInvoice.TransactionNo, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstrackPurchaseInvoice = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstrackPurchaseInvoice = this.lstDbResult.Table;

        }

        $("#loaderParent").hide();
      });
  }
  loadmethod() {
    debugger;
    let sortedInvoiceitems = this.lstInvoiceItems.sort((first, second) => 0 - (first.LineId > second.LineId ? -1 : 1));
    this.lstInvoiceItems = sortedInvoiceitems;
    if (this.ToggleValue == "Off") {
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        if (this.lstInvoiceItems[i].type == "Service Item") {
          this.lstserviceparts.push(this.lstInvoiceItems[i]);
        }
        else {
          this.lstparts.push(this.lstInvoiceItems[i]);
        }
      }
    }
    else {
      this.getUnique1(this.lstInvoiceItems, 'Partno');
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        if (this.lstInvoiceItems[i].type == "Service Item") {
          this.lstserviceparts.push(this.lstInvoiceItems[i]);
        }
        else {
          this.lstparts.push(this.lstInvoiceItems[i]);
        }
      }
    }

  }
  loadmethod1() {
    debugger;
    this.lstparts = [];
    this.lstserviceparts = [];
    for (var i = 0; i < this.lstInvoiceItems.length; i++) {
      if (this.lstInvoiceItems[i].type == "Service Item") {
        this.lstserviceparts.push(this.lstInvoiceItems[i]);
      }
      else {
        this.lstparts.push(this.lstInvoiceItems[i]);
      }

    }
  }
  Showdata(d) {
    if (this.ToggleValue == "Off") {
      (window as any).swal({
        icon: 'warning',
        title: 'Acitivity Tracker',
        text: 'If you want to see data mustly Traker should be "ON" Otherwise you loss the modified details',
        confirmButtonText: 'Dismiss',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-warning'
      });
    }
    else {
      var xml = d;
      this.ClearViewData1();
      this.StorePurchaseInvoice = new StorePurchaseInvoice;
      this.lstserviceparts = [];
      this.lstparts = [];
      this.StorePurchaseInvoice.SequenceNumberId = xml.SequenceNumberId;
      this.StorePurchaseInvoice.Contactno = xml.Contactno;

      this.StorePurchaseInvoice.Email = xml.Email;
      this.StorePurchaseInvoice.RequiredDate = xml.RequiredDate;
      this.StorePurchaseInvoice.Billto = xml.Billto;
      //this.StorePurchaseInvoice.Shipto=xml.Shipto;

      //this.StorePurchaseInvoice.ShiptoAddress=xml.ShiptoAddress;
      //this.StorePurchaseInvoice.Terms=xml.Terms;
      //this.StorePurchaseInvoice.TermsandConditions=xml.TermsandConditions;
      this.StorePurchaseInvoice.BillToStateCode = xml.BillToStateCode;
      this.StorePurchaseInvoice.BillToStateName = xml.BillToStateName;
      this.StorePurchaseInvoice.TaxType = xml.TaxType;
      //this.StorePurchaseInvoice.PaymentTerms=xml.PaymentTerms;
      this.StorePurchaseInvoice.TransactionTime = xml.TransactionTime;
      this.StorePurchaseInvoice.ExchangeRate = xml.ExchangeRate;
      this.StorePurchaseInvoice.PurchaseType = xml.PurchaseType;

      this.StorePurchaseInvoice.Incoterms = xml.Incoterms;
      this.StorePurchaseInvoice.vdate = xml.vdate;
      this.StorePurchaseInvoice.VendorreferenceType = xml.VendorreferenceType;
      this.StorePurchaseInvoice.Vendorreference = xml.Vendorreference;

      this.StorePurchaseInvoice.vendorinvoicenumber = xml.vendorinvoicenumber;

      this.StorePurchaseInvoice.freigntcharges = xml.freigntcharges;
      this.StorePurchaseInvoice.loadingcharges = xml.loadingcharges;
      this.StorePurchaseInvoice.insuranceamount = xml.insuranceamount;
      this.StorePurchaseInvoice.clearingcharges = xml.clearingcharges;

      this.StorePurchaseInvoice.freightchargesaccount = xml.freightchargesaccount;
      this.StorePurchaseInvoice.loadingchargesaccount = xml.loadingchargesaccount;
      this.StorePurchaseInvoice.insuranceaccount = xml.insuranceaccount;
      this.StorePurchaseInvoice.clearingchargesaccount = xml.clearingchargesaccount;
      this.StorePurchaseInvoice.CreatedBy = xml.CreatedBy;
      this.StorePurchaseInvoice.ModifiedBy = xml.ModifiedBy;

      this.StorePurchaseInvoice.CurrencyId = xml.CurrencyId;
      this.StorePurchaseInvoice.TransactionDate = xml.TransactionDate;
      this.StorePurchaseInvoice.TransactionId = xml.TransactionId;
      this.StorePurchaseInvoice.TransactionNo = xml.TransactionNo;
      this.StorePurchaseInvoice.PartyId = xml.PartyId;
      this.StorePurchaseInvoice.PartyName = xml.PartyName;
      this.StorePurchaseInvoice.PartyGSTNo = xml.PartyGSTNo;
      this.StorePurchaseInvoice.Totalvalueininr = xml.Totalvalueininr;

      //this.StorePurchaseInvoice.ExchangeRate1 = xml.ExchangeRate1;
      this.StorePurchaseInvoice.InvoiceType = xml.invoicetype;
      this.StorePurchaseInvoice.ModifiedDate = xml.ModifiedDate;
      this.StorePurchaseInvoice.ViewName = xml.ViewName;


      if (xml.lstInvoiceItems != null && typeof (xml.lstInvoiceItems) != undefined) {
        var res = ((xml.lstInvoiceItems).replace(/\n/g, "")).replace(/'/g, "\"");

        this.StorePurchaseInvoice.lstPurchaseInvoiceItems = JSON.parse(res);
        var templstarray = this.StorePurchaseInvoice.lstPurchaseInvoiceItems;
        this.lstInvoiceItems = this.StorePurchaseInvoice.lstPurchaseInvoiceItems;
      }

      this.BillToStateCode = xml.BillToStateCode;
      this.BillToStateName = xml.BillToStateName;
      this.DispalyVendorName = xml.PartyName;
      this.DisplayVendorId = xml.PartyId;

      this.PartyGSTNo = xml.PartyGSTNo;
      this.CreatedBy = xml.CreatedBy;
      this.ModifiedBy = xml.ModifiedBy;

      //this.f.TransactionNo.setValue(xml.TransactionNo);
      this.CreatePurchaseInvoice.patchValue(this.StorePurchaseInvoice);
      debugger;
      for (var i = 0; i < this.lstrackPurchaseInvoice.length; i++) {
        if (this.lstrackPurchaseInvoice[i].TransactionId == xml.TransactionId) {
          if (xml.lstInvoiceItems != null) {
            debugger;
            for (var j = i - 1; j < this.lstrackPurchaseInvoice.length; j++) {
              if (j != -1) {

                if (this.lstrackPurchaseInvoice[j].lstInvoiceItems != null) {
                  var res = ((this.lstrackPurchaseInvoice[i].lstInvoiceItems).replace(/\n/g, "")).replace(/'/g, "\"");
                  var temparray = JSON.parse(res);
                  this.getColor10(temparray[0].Partno);
                  this.Tracking10 = temparray[0].Partno;

                }
                else {
                  var res = ((this.lstrackPurchaseInvoice[i].lstInvoiceItems).replace(/\n/g, "")).replace(/'/g, "\"");
                  var temparray = JSON.parse(res);
                  this.getColor10(temparray[0].Partno);
                  this.Tracking10 = temparray[0].Partno;
                }

              }

              break;
            }
          }
          else {
            this.getColor10("Modifiedinvalid");
            this.Tracking10 = "Modifiedinvalid";
          }
        }
      }
      for (var i = 0; i < this.lstrackPurchaseInvoice.length; i++) {
        if (this.lstrackPurchaseInvoice[0].TransactionId == xml.TransactionId) {
          this.loadmethod();
          break;
        }
        else
          if (this.lstrackPurchaseInvoice[i].TransactionId != xml.TransactionId) {
            debugger;
            if (this.lstrackPurchaseInvoice[i].lstInvoiceItems != null && typeof (this.lstrackPurchaseInvoice[i].lstInvoiceItems) != undefined) {
              debugger;
              var res = ((this.lstrackPurchaseInvoice[i].lstInvoiceItems).replace(/\n/g, "")).replace(/'/g, "\"");

              var temparray = JSON.parse(res);
              this.lstInvoiceItems.push(temparray[0]);
            }

          }
          else {
            this.loadmethod();
            break;
          }

      }





      debugger;
      for (var i = 0; i < this.lstrackPurchaseInvoice.length; i++) {
        if (this.lstrackPurchaseInvoice[i].TransactionId == xml.TransactionId) {
          debugger;
          for (var j = i - 1; j < this.lstrackPurchaseInvoice.length; j++) {
            if (this.lstrackPurchaseInvoice[j].VendorreferenceType == this.f.VendorreferenceType.value && this.lstrackPurchaseInvoice[j].Vendorreference == this.f.Vendorreference.value &&
              this.lstrackPurchaseInvoice[j].vdate == this.f.vdate.value && this.lstrackPurchaseInvoice[j].Incoterms == this.f.Incoterms.value &&
              this.lstrackPurchaseInvoice[j].PurchaseType == this.f.PurchaseType.value) {
              debugger;
            }
            else {
              debugger;
              if (this.lstrackPurchaseInvoice[j].VendorreferenceType != this.f.VendorreferenceType.value) {
                debugger;
                this.getColor1("Modifiedvalid");
                this.Tracking1 = "Modifiedvalid";
              }
              else {
                this.getColor1("Modifiedinvalid");
                this.Tracking1 = "Modifiedinvalid";
              }

              if (this.lstrackPurchaseInvoice[j].Vendorreference != this.f.Vendorreference.value) {
                debugger;
                this.getColor2("Modifiedvalid");
                this.Tracking2 = "Modifiedvalid";
              }
              else {
                this.getColor2("Modifiedinvalid");
                this.Tracking2 = "Modifiedinvalid";
              }

              if (this.lstrackPurchaseInvoice[j].vdate != this.f.vdate.value) {
                debugger;
                this.getColor3("Modifiedvalid");
                this.Tracking3 = "Modifiedvalid";
              }
              else {
                this.getColor3("Modifiedinvalid");
                this.Tracking3 = "Modifiedinvalid";
              }
              if (this.lstrackPurchaseInvoice[j].Incoterms != this.f.Incoterms.value) {
                debugger;
                this.getColor4("Modifiedvalid");
                this.Tracking4 = "Modifiedvalid";
              }
              else {
                this.getColor4("Modifiedinvalid");
                this.Tracking4 = "Modifiedinvalid";
              }
              if (this.lstrackPurchaseInvoice[j].PurchaseType != this.f.PurchaseType.value) {
                debugger;
                this.getColor5("Modifiedvalid");
                this.Tracking5 = "Modifiedvalid";
              }
              else {
                this.getColor5("Modifiedinvalid");
                this.Tracking5 = "Modifiedinvalid";
              }

            }
            break;
          }

        }

      }

    }
  }
  getColor(Tracking) {
    switch (Tracking) {

      case 'Inoice Created':
        return '#0dbd6c';
      case 'Invoice Created':
        return '#0dbd6c';
      case 'Inoice Modified':
        return '#f9c402';
      case 'Invoice Modified':
        return '#f9c402';

    }
  }
  getColor1(Tracking1) {

    switch (Tracking1) {

      case 'Modifiedvalid':
        return '#f9c40240';
      case 'Modifiedinvalid':
        return 'transparent';

    }
  }
  getColor2(Tracking2) {

    switch (Tracking2) {

      case 'Modifiedvalid':
        return '#f9c40240';
      case 'Modifiedinvalid':
        return 'transparent';

    }
  }
  getColor3(Tracking3) {

    switch (Tracking3) {

      case 'Modifiedvalid':
        return '#f9c40240';
      case 'Modifiedinvalid':
        return 'transparent';

    }
  }
  getColor4(Tracking4) {

    switch (Tracking4) {

      case 'Modifiedvalid':
        return '#f9c40240';
      case 'Modifiedinvalid':
        return 'transparent';

    }
  }
  getColor5(Tracking5) {

    switch (Tracking5) {

      case 'Modifiedvalid':
        return '#f9c40240';
      case 'Modifiedinvalid':
        return 'transparent';

    }
  }

  getColor10(Tracking10) {

    switch (Tracking10) {

      case this.Tracking10:
        return '#bdd763';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  getColor11(Tracking11) {

    switch (Tracking11) {

      case 'Modifiedvalid':
        return '#0dbd6c';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  getColor12(Tracking11) {

    switch (Tracking11) {

      case 'Modifiedvalid':
        return '#0dbd6c';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  getColor13(Tracking11) {

    switch (Tracking11) {

      case 'Modifiedvalid':
        return '#0dbd6c';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  getColor14(Tracking11) {

    switch (Tracking11) {

      case 'Modifiedvalid':
        return '#0dbd6c';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  getColor15(Tracking11) {

    switch (Tracking11) {

      case 'Modifiedvalid':
        return '#0dbd6c';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  getColor16(Tracking11) {

    switch (Tracking11) {

      case 'Modifiedvalid':
        return '#0dbd6c';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  getColor17(Tracking11) {

    switch (Tracking11) {

      case 'Modifiedvalid':
        return '#0dbd6c';
      case 'Modifiedinvalid':
        return 'transparent';
    }
  }
  ReferenceChange(target) {
    debugger;
    if (this.f.TransactionNo.value != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "Reference Type is changed from  " + this.tempreferencetype + " to  " + target.value
    }
  }
  ReferencenumChange(target) {
    debugger;
    if (this.f.TransactionNo.value != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "Reference Number is changed from  " + this.tempVendorreference + " to  " + target.value
    }
  }
  ReferenceDateChange(target) {
    debugger;
    if (this.f.TransactionNo.value != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "Reference Date is changed from  " + this.tempvdate + " to  " + target.value
    }
  }
  IncotermsChange(target) {
    debugger;
    if (this.f.TransactionNo.value != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "Incoterms is changed from  " + this.tempIncoterms + " to  " + target.value
    }
  }
  PurchaseTypeChange(target) {
    debugger;
    if (this.f.TransactionNo.value != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "PurchaseType is changed from  " + this.tempPurchaseType + " to  " + target.value
    }

  }


  packigst: number = 0;
  packcgst: number = 0;
  packsgst: number = 0;
  TotalPackCharges: number = 0;
  ImageServerPath = "";

  PackingTaxPercentageChange(gstValue) {
    debugger;
    this.TotalCharges=0;
    this.Total=0;
    if (gstValue == 18) {
      if (this.TaxType == "Inter State") {
        debugger;
       
        if (this.packigst > 0) {
          this.TotalCharges = this.TotalCharges - this.TotalPackCharges;

        }
        this.packigst = (((+this.f.PackingAmount.value) * gstValue) / 100);
        this.f.PackingIGST.setValue(this.packigst);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packigst));

        this.TotalTax = this.TotalTax + (+this.packigst);
        this.TotalCharges = (+this.f.PackingAmount.value);
        this.TotalPackCharges = this.TotalCharges;
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }
      else {
       
        this.packcgst = (((+this.f.PackingAmount.value) * (+this.f.PackingCGST.value)) / 100);
        this.f.PackingCGST.setValue(this.packcgst);
        this.packsgst = (((+this.f.PackingAmount.value) * (+this.f.PackingCGST.value)) / 100);
        this.f.PackingSGST.setValue(this.packsgst);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packcgst) + (+this.packsgst));
        this.TotalTax = this.TotalTax + (+this.packcgst) + (+this.packsgst);
        this.TotalCharges = this.TotalCharges + (+this.f.PackingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }
    }
    else if (gstValue == 28) {
      if (this.TaxType == "Inter State") {
       
        this.packigst = (((+this.f.PackingAmount.value) * (+gstValue)) / 100);
        this.f.PackingIGST.setValue(this.packigst);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packigst));
        this.TotalTax = this.TotalTax + (+this.packigst);
        this.TotalCharges = this.TotalCharges + (+this.f.PackingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }
      else {
        
        this.packcgst = (((+this.f.PackingAmount.value) * (+this.f.PackingCGST.value)) / 100);
        this.f.PackingCGST.setValue(this.packcgst);
        this.packsgst = (((+this.f.PackingAmount.value) * (+this.f.PackingCGST.value)) / 100);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packcgst) + (+this.packsgst));
        this.TotalTax = this.TotalTax + (+this.packcgst) + (+this.packsgst);
        this.TotalCharges = this.TotalCharges + (+this.f.PackingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }
    }
    else if (gstValue == 5) {
      if (this.TaxType == "Inter State") {
        
        this.packigst = (((+this.f.PackingAmount.value) * (+gstValue)) / 100);
        this.f.PackingIGST.setValue(this.packigst);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packigst));
        this.TotalTax = this.TotalTax + (+this.packigst);
        this.TotalCharges = this.TotalCharges + (+this.f.PackingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }

    }
    else if (gstValue == 12) {
      if (this.TaxType == "Inter State") {
        
        this.packigst = (((+this.f.PackingAmount.value) * (+gstValue)) / 100);
        this.f.PackingIGST.setValue(this.packigst);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packigst));
        this.TotalTax = this.TotalTax + (+this.packigst);
        this.TotalCharges = this.TotalCharges + (+this.f.PackingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }

    }
    else if (gstValue == 3) {
      if (this.TaxType == "Inter State") {
       
        this.packigst = (((+this.f.PackingAmount.value) * (+gstValue)) / 100);
        this.f.PackingIGST.setValue(this.packigst);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packigst));
        this.TotalTax = this.TotalTax + (+this.packigst);
        this.TotalCharges = this.TotalCharges + (+this.f.PackingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }

    }
    else if (gstValue == 0.25) {
      if (this.TaxType == "Inter State") {
       
        this.packigst = (((+this.f.PackingAmount.value) * (+gstValue)) / 100);
        this.f.PackingIGST.setValue(this.packigst);
        this.f.PackingNetTotal.setValue((+this.f.PackingAmount.value) + (+this.packigst));
        this.TotalTax = this.TotalTax + (+this.packigst);
        this.TotalCharges = this.TotalCharges + (+this.f.PackingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        if (this.TotalDiscount > 0) {
          this.Total = this.Total - this.TotalDiscount;
        }
      }

    }

    else if (gstValue == 0) {
      if ((+this.f.PackingIGST.value) > 0) {
        this.packigst = (+this.f.PackingIGST.value);


        this.TotalTax = this.TotalTax - (+this.packigst);
        this.TotalCharges = 0;
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        this.f.PackingAmount.setValue(0);
        this.f.PackingIGST.setValue(0);
        this.packigst = 0;
        this.f.PackingNetTotal.setValue(0);
      }
      else {
        this.packcgst = (+this.f.PackingCGST.value);

        this.packsgst = (+this.f.PackingSGST.value);

        this.TotalTax = this.TotalTax - ((+this.packcgst) + (+this.packsgst));
        this.TotalCharges = 0;
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
        this.f.PackingCGST.setValue(0);
        this.f.PackingSGST.setValue(0);

        this.f.PackingAmount.setValue(0);
        this.packcgst = 0;
        this.packsgst = 0;
      }

    }

    
//     if(this.f.InvoiceType.value=='Import')
//     {
//       this.f.PackingIGST.setValue((+this.f.PackingIGST.value) );
//      // this.f.PackingNetTotal.setValue((+this.f.PackingNetTotal.value) + (+this.f.PackingIGST.value) *  ( (+this.f.ExchangeRate.value)) );

     
//       this.f.PackingNetTotal.setValue( (+this.f.PackingNetTotal.value) + (+this.pkgPrice));
// this.TotalCharges=(+this.TotalCharges) + (+this.f.PackingNetTotal.value);
// this.Total=(+this.TotalGross) + (+this.TotalDiscount) + (+this.TotalCharges) + (+this.TotalTax);
      
//     }

  }
  transigst: number = 0;
  transsgst: number = 0;
  transcgst: number = 0;
  TransportTaxPercentageChange(value) {
    if (value == 18) {
      if (this.TaxType == "Inter State") {
        this.f.TransportIGST.setValue(18);
        this.transigst = (((+this.f.TransportAmount.value) * (+this.f.TransportIGST.value)) / 100);
        this.f.TransportNetTotal.setValue((+this.f.TransportAmount.value) + (+this.transigst));
        this.TotalTax = this.TotalTax + (+this.transigst);
        this.TotalCharges = this.TotalCharges + (+this.f.TransportAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;

      }
      else {
        this.f.TransportCGST.setValue(9);
        this.transcgst = (((+this.f.TransportAmount.value) * (+this.f.TransportCGST.value)) / 100);
        this.f.TransportSGST.setValue(9);
        this.transsgst = (((+this.f.TransportAmount.value) * (+this.f.TransportSGST.value)) / 100);
        this.f.TransportNetTotal.setValue((+this.f.TransportAmount.value) + (+this.transcgst) + (+this.transsgst));
        this.TotalTax = this.TotalTax + (+this.transcgst) + (+this.transsgst);
        this.TotalCharges = this.TotalCharges + (+this.f.TransportAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
      }
    }
    else if (value == 28) {
      if (this.TaxType == "Inter State") {
        this.f.TransportIGST.setValue(28);
        this.transigst = (((+this.f.TransportAmount.value) * (+this.f.TransportIGST.value)) / 100);
        this.f.TransportNetTotal.setValue((+this.f.TransportAmount.value) + (+this.transigst));
        this.TotalTax = this.TotalTax + (+this.transigst);
        this.TotalCharges = this.TotalCharges + (+this.f.TransportAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
      }
      else {
        this.f.TransportCGST.setValue(14);
        this.transcgst = (((+this.f.TransportAmount.value) * (+this.f.TransportCGST.value)) / 100);
        this.f.TransportSGST.setValue(14);
        this.transsgst = (((+this.f.TransportAmount.value) * (+this.f.TransportSGST.value)) / 100);
        this.f.TransportNetTotal.setValue((+this.f.TransportAmount.value) + (+this.transcgst) + (+this.transsgst));
        this.TotalTax = this.TotalTax + (+this.transcgst) + (+this.transsgst);
        this.TotalCharges = this.TotalCharges + (+this.f.TransportAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
      }
    }

  }
  loadigst: number = 0;
  loadcgst: number = 0;
  loadsgst: number = 0;
  LoadingTaxPercentageChange(value) {
    debugger;
    if (value == 18) {
      if (this.TaxType == "Inter State") {
        this.f.LoadingIGST.setValue(18);
        this.loadigst = (((+this.f.LoadingAmount.value) * (+this.f.LoadingIGST.value)) / 100)
        this.f.LoadingNetTotal.setValue((+this.f.LoadingAmount.value) + (+this.loadigst))
        this.TotalTax = this.TotalTax + (+this.loadigst);
        this.TotalCharges = this.TotalCharges + (+this.f.LoadingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
      }
      else {
        this.f.LoadingCGST.setValue(9);
        this.loadcgst = (((+this.f.LoadingAmount.value) * (+this.f.LoadingCGST.value)) / 100);
        this.f.LoadingSGST.setValue(9);
        this.loadsgst = (((+this.f.LoadingAmount.value) * (+this.f.LoadingCGST.value)) / 100);
        this.f.TransportNetTotal.setValue((+this.f.LoadingAmount.value) + (+this.loadcgst) + (+this.loadsgst));
        this.TotalTax = this.TotalTax + (+this.loadcgst) + (+this.loadsgst);
        this.TotalCharges = this.TotalCharges + (+this.f.LoadingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
      }
    }
    else if (value == 28) {
      if (this.TaxType == "Inter State") {
        this.f.LoadingIGST.setValue(28);
        this.loadigst = (((+this.f.LoadingAmount.value) * (+this.f.LoadingIGST.value)) / 100)
        this.f.LoadingNetTotal.setValue((+this.f.LoadingAmount.value) + (+this.loadigst))
        this.TotalTax = this.TotalTax + (+this.loadigst);
        this.TotalCharges = this.TotalCharges + (+this.f.LoadingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
      }
      else {
        this.f.LoadingCGST.setValue(14);
        this.loadcgst = (((+this.f.LoadingAmount.value) * (+this.f.LoadingCGST.value)) / 100);
        this.f.LoadingSGST.setValue(14);
        this.loadsgst = (((+this.f.LoadingAmount.value) * (+this.f.LoadingCGST.value)) / 100);
        this.f.TransportNetTotal.setValue((+this.f.LoadingAmount.value) + (+this.loadcgst) + (+this.loadsgst));
        this.TotalTax = this.TotalTax + (+this.loadcgst) + (+this.loadsgst);
        this.TotalCharges = this.TotalCharges + (+this.f.LoadingAmount.value);
        this.Total = this.TotalGross + this.TotalTax + this.TotalCharges;
      }
    }
  }


  selectedFile: ImageSnippet;
  ImagefileChange($event, ControlName) {
    debugger;
    if (this.getControlValue(this.f.PartyName, 'string') != '') {

      var file: File = $event.target.files[0];
      var fileType = file.type;
      var extention = (<any>$("#fileOpenModelImage").val()).split('.').pop();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (_event) => {

        var path = reader.result;
        this.selectedFile = new ImageSnippet(path.toString(), file);
        const formData = new FormData();
        let currDatetime: string = new Date().toString().trim();
        currDatetime = currDatetime.replace(/[^a-zA-Z0-9]/g, "")
        var Imagename = "Customer" + this.f.PartyName.value + ControlName + currDatetime + '.' + extention;
        formData.append('image', this.selectedFile.file);
        formData.append('imageName', Imagename);
        debugger;


        if (ControlName == 'Image') {
          this.CreatePurchaseInvoice.patchValue({
            Image: Imagename

          });

        }



        this.CreatePurchaseInvoice.controls.Image.markAsDirty();
        this.SaveImage(formData, fileType, Imagename, ControlName);

      }
    }

  }

  SaveImage(formData, fileType, Imagename, ControlName) {
    debugger;

    this.APICall.SaveImage(formData, fileType).subscribe(
      () => {
        debugger

        // ModelImg.src=this.APICall.ImagePath+'Images/'+Imagename;


        $("#Image").attr("src", this.APICall.ImagePath + Imagename);

      },
      () => {

      });
  }
  //#endregion "ImageUpload"
  Removeimg() {
    $("#Image").attr("src", "");
  }

  sendemail() {
    debugger;
    let body = "SREE VENKATESWARA EXPORTS Sales Invoice";
    let cc = this.APICall.GetEmail();
    this.APICall.Sendmail('santosh@mechknowsoft.com', 'Project Requirement', body, "Purchase Invoice", "", cc).subscribe(
      (res: any) => {
        debugger;
      });
  }


  TaxChange(target) {

    //this.chkStockSelection=target.checked;
  }

  transportPrice=0;
  TransportCharges(target)
  {
    try {
      debugger;
      this.TotalCharges=0;
      this.Total=0;
      this.addingvalue = 0;
      this.f.PackingNetTotal.setValue(0);

      if (this.lstInvoiceItems.length > 0) {
        for (var i = 0; i < this.lstInvoiceItems.length; i++) {
          var val2 = (((+this.lstInvoiceItems[i].dollarprice) * (+this.lstInvoiceItems[i].Qty)))
          this.addingvalue = this.addingvalue + val2;

        }
      }

      debugger;

    var exhrate = this.getControlValue(this.f.ExchangeRate, 'int');
      var transportchg = target.value;
this.transportPrice = (+transportchg)  ;//* (+exhrate);


    //  this.f.Totalvalueininr.setValue((+this.transportPrice));
      this.f.PackingNetTotal.setValue( (+this.f.PackingNetTotal.value) + (+this.pkgPrice) + (+this.transportPrice));
this.TotalCharges=((+this.TotalCharges) + (+this.f.PackingNetTotal.value)) * (+exhrate) ;
this.Total=(+this.TotalGross) + (+this.TotalDiscount) + (+this.TotalCharges) + (+this.TotalTax);


this.ExchangeRateChange(+exhrate);
    }
    catch (error) { }
  }

  pkgPrice = 0;
  pkgDoller = 0;
  PAFCharges(target) {
    try {
      debugger;
      this.TotalCharges=0;
      this.Total=0;
      this.addingvalue = 0;
      this.f.PackingNetTotal.setValue(0);

      if (this.lstInvoiceItems.length > 0) {
        for (var i = 0; i < this.lstInvoiceItems.length; i++) {
          var val2 = (((+this.lstInvoiceItems[i].dollarprice) * (+this.lstInvoiceItems[i].Qty)))
          this.addingvalue = this.addingvalue + val2;

        }
      }
debugger;
    var exhrate = this.getControlValue(this.f.ExchangeRate, 'int');
      var pkg = target.value;
//      this.pkgPrice = ((+pkg) + (+this.addingvalue)) * (+exhrate);
this.pkgPrice = (+pkg)  ;//* (+exhrate);


      this.f.Totalvalueininr.setValue((+this.pkgPrice));
      this.f.PackingNetTotal.setValue( (+this.f.PackingNetTotal.value) + (+this.pkgPrice));
this.TotalCharges=((+this.TotalCharges) + (+this.f.PackingNetTotal.value)) * (+exhrate) ;
this.Total=(+this.TotalGross) + (+this.TotalDiscount) + (+this.TotalCharges) + (+this.TotalTax);


this.ExchangeRateChange(+exhrate);
    }
    catch (error) { }
  }
  ExchangeRate=1;
  ExchangeRateChange(target) {
    debugger;
    this.ExchangeRate=target;
    if (target == 0) { this.DollerRate = 1; } else { this.DollerRate = target; }
    this.addingvalue = 0;

    var pkgamt = this.getControlValue(this.f.PackingAmount, 'int');
    var transportamt = this.getControlValue(this.f.TransportAmount, 'int');

    if (this.lstInvoiceItems.length > 0) {
      for (var i = 0; i < this.lstInvoiceItems.length; i++) {
        var val2 = (((+this.lstInvoiceItems[i].dollarprice) * (+this.lstInvoiceItems[i].Qty)))
        this.addingvalue = this.addingvalue + val2;
      }

      var grAmt= ((+this.addingvalue.toFixed(2)) *  (+this.DollerRate));

      this.pkgPrice = (+pkgamt  ) * (+this.DollerRate);

      this.transportPrice = (+transportamt ) * (+this.DollerRate);

      this.f.Totalvalueininr.setValue((+grAmt)  + (+this.pkgPrice) + (this.transportPrice));


    }
    else {
      (window as any).swal({
        icon: 'warning',
        title: 'Exists',
        text: 'Invoice items are should not be empty.!',
        confirmButtonText: 'Dismiss',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-warning'
      });
    }
  }


  ValidateLocationAllotment(): boolean {
    debugger;
    var val = true;
    var TotalItemQty = 0;
    var TotalStockItemQty = 0;
    for (let i = 0; i < this.lstparts.length; i++) {

      if (this.lstparts[i].LocationId == 0 && this.lstparts[i].BinId == 0) {
        val = false;
        break;
      }
      if (this.lstparts[i].RefId == undefined && this.lstparts[i].RefLineId == undefined) {

      }
    }

    return val;
  }

  
  StoreAccountLedger: StoreAccountLedger
  OpenAccountLedger() {
    debugger;

    this.StoreAccountLedger = new StoreAccountLedger;
    this.APICall.UpdatedSelectedPath('./Accounting/AccountLedger');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreAccountLedger.AccountId = this.f.PartyId.value;
    this.StoreAccountLedger.AccountName = this.f.PartyName.value;
    this.StoreAccountLedger.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreAccountLedger));
    this.router.navigate(['Accounting/AccountLedger']);

  }

  Vendor: Vendor
  VendorMaster() {
    debugger;
    this.Vendor = new Vendor;
    if (this.selectedVendor != undefined && this.selectedVendor != null) {
      this.selectedVendor.ViewName = "RequestFromDC";
      this.Vendor = Object.assign({}, this.selectedVendor);
    }
    this.APICall.UpdatedSelectedPath('./Purchase/CreateVendor');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.Vendor.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.Vendor));
    this.router.navigate(['Purchase/CreateVendor']);

  }
}


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

