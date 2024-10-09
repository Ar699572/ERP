import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import '../../../assets/vendors/datepicker/daterangepicker.js';
import { Store } from '@ngrx/store';
import { StoreSalesOrder } from 'src/app/Store/StoreSalesOrder';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Customer } from 'src/app/store/Customer';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 import htmlToPdfmake from "html-to-pdfmake"
import * as XLSX from 'xlsx'; 
import { objectEach } from 'highcharts';
import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice.js';
import { Action } from 'rxjs/internal/scheduler/Action.js';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  CreateSalesOrder: FormGroup;
  TransactionType = "Sales";
  DisplayCustomerId = 0;
  DispalyCustomerName = "";
  DisplaySequenceNumberId = 0;
  DispalyFormName = 'SalesOrder';
  ReferenceType = "";
  ReferenceNo = "";
  OrderData: any;
  DispalyTransactionDate = '';
  DisplayTransactionNo = '';

  constructor(private DbCallings: CommonDbCallings, private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) {


    this.CreateSalesOrder = formBuilder.group(


      {
        SequenceNumberId: new FormControl(0),
        Contactno: new FormControl(''),
        Email: new FormControl('', [Validators.email]),
        RequiredDate: new FormControl('', [Validators.required]),
        Billto: new FormControl(''),
        Shipto: new FormControl(0),
        ShiptoAddress: new FormControl(''),
        Terms: new FormControl(''),
        TermsandConditions: new FormControl(''),
        PaymentTerms: new FormControl(''),
        TransactionTime: new FormControl('', [Validators.required]),
        TransactionDate: new FormControl('', [Validators.required]),
        TransactionId: new FormControl(0),
        TransactionNo: new FormControl(''),

        PartyId: new FormControl(0, [Validators.required, Validators.min(1)]),
        PartyName: new FormControl(''),
        Quotation: new FormControl(0,[Validators.required, Validators.min(1)]),
        LineChanges: new FormControl(0),
        SearchString: new FormControl(''),
        searchPartNo: new FormControl(''),
        searchDescription: new FormControl(''),
        searchMake: new FormControl(''),
        searchHSN: new FormControl('')

      }
    );

    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);



    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }


  CurrentTime: any;

  PartyGSTNo = "";

  windowScroll(ControlName) {
    var element = document.getElementById(ControlName);
    var rect = element.getBoundingClientRect();

    window.scrollTo(rect.left, rect.top);
  }

  OnPrint() {
debugger;
    this.OrderData = this;
    console.log( this.OrderData)
  }


  convertDate(str) {

    var date = new Date(str),
      mnth: any = ("0" + (date.getMonth() + 1)).slice(-2),
      day: any = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    var resDate = [mnth, day, date.getFullYear()].join("-");

    return resDate + " " + hours + ":" + minutes;

  }


  submitted = false;
  OnSave() {
    debugger;
    this.submitted = true;
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());
    this.f.TransactionTime.setValue($("#TransactionTime").val());
    if (this.ModifiedDate.toString().includes('India')) {

      var date = new Date(this.ModifiedDate);
      this.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }

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


    if (this.f.RequiredDate.invalid && Cvalid) {
      debugger;
      this.windowScroll('RequiredDate');
      Cvalid = false;
    }
    if (this.f.Email.invalid && Cvalid) {
      debugger;
      this.windowScroll('Email');
      Cvalid = false;
    }


    if (this.f.TransactionTime.invalid && Cvalid) {
      debugger;
      this.windowScroll('TransactionTime');
      Cvalid = false;
    }

    if (this.f.Quotation.invalid && Cvalid) {
      debugger;
      this.windowScroll('Quotation');
      Cvalid = false;
    }


    if (this.CreateSalesOrder.invalid && Cvalid) {
      this.SaveTransaction();

    }
    else {
      this.SaveTransaction();
    }
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

        that.DeleteSalesOrder();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }

    });

  }
  DeleteSalesOrder() {

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    if (this.ModifiedDate.toString().includes('India')) {

      var date = new Date(this.ModifiedDate);


      this.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }
    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'
      + '</Table1></NewDataSet>';

    this.APICall.DBCalling("DeleteSalesOrder", xml1, "", "", "").subscribe(
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
    debugger;
    this.submitted = false;
    this.ModifiedDate = "";
  
    this.CreateSalesOrder.patchValue(


      {
        // SequenceNumberId:0,
        Contactno: '',
        PartyName: '',
        Email: '',
        RequiredDate: '',
        Billto: '',
        Shipto: 0,
        ShiptoAddress: '',
        Terms: '',
        TermsandConditions: '',
        PaymentTerms: '',
        TransactionTime: '',
        TransactionDate: '',
        TransactionId: 0,
        TransactionNo: '',
        Quotation:"",
        PartyId: 0,
        SequenceNumberId:0,
        

        SearchString: '',
        searchPartNo: '',
        searchDescription: '',
        searchMake: '',
        searchHSN: ''

      }
    );
    this.PartyGSTNo = '';
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);

    var rdate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    $("#RequiredDate").val(rdate)
    $("#TransactionDate").val(rdate)
    $("#TransactionTime").val(this.CurrentTime)
    this.lstOrderItems = null;
    this.lstOrderItems = [];
    this.lstTermsChild = null;
    this.lstTermsChild = [];
    this.DisplayCustomerId = 0;
    this.DispalyCustomerName = "";
    this.DisplaySequenceNumberId = 0;
    this.DisplayTransactionNo = "";
    this.DispalyTransactionDate ="";
    this.SalesQuotationTransactionId = 0;
    
    this.TotalGross = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    this.StoreSalesOrder = new StoreSalesOrder;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreSalesOrder.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreSalesOrder));


  }
  ModifiedDate = "";
  DbResult: any = [];
  SaveTransaction() {
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());
    this.f.TransactionTime.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());

   


    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    var xml1 = '<NewDataSet><Table1>'

      + '<ShiptoAddress>' + this.getControlValue(this.f.ShiptoAddress, 'string') + '</ShiptoAddress>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<PartyId>' + this.getControlValue(this.f.PartyId, 'int') + '</PartyId>'
      + '<Billto>' + this.getControlValue(this.f.Billto, 'string') + '</Billto>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'

      + '<Shipto>' + this.getControlValue(this.f.Shipto, 'string') + '</Shipto>'

      + '<TransactionTime>' + this.convertDate(this.getControlValue(this.f.TransactionTime, 'string')) + '</TransactionTime>'
      + '<TransactionDate>' + this.convertDate(this.getControlValue(this.f.TransactionDate, 'string')) + '</TransactionDate>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
      + '<CurrencyId>' + this.APICall.GetCurrencyId() + '</CurrencyId>'
      + '<RequiredDate>' + this.getControlValue(this.f.RequiredDate, 'string') + '</RequiredDate>'
      + '<TermsandConditions>' + this.getControlValue(this.f.TermsandConditions, 'string') + '</TermsandConditions>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<TotalGross>' + this.TotalGross + '</TotalGross>'
      + '<PaymentTerms>' + this.getControlValue(this.f.PaymentTerms, 'int') + '</PaymentTerms>'
      + '<ReferenceType>' + this.ReferenceType + '</ReferenceType >'
      + '<ReferenceNo>' + this.ReferenceNo + '</ReferenceNo >'

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

      + '</Table1></NewDataSet>';
    var xml2 = "";
    var rows = "";

    for (var i = 0; i < this.lstOrderItems.length; i++) {

      rows = rows + '<Table1>'
        + '<LineId>' + this.lstOrderItems[i].LineId + '</LineId>'
        + '<Description>' + this.lstOrderItems[i].Description + '</Description>'
        + '<Partno>' + this.lstOrderItems[i].Partno + '</Partno>'

        + '<ItemId>' + this.lstOrderItems[i].ItemId + '</ItemId>'
        + '<MakeId>' + this.lstOrderItems[i].MakeId + '</MakeId>'
        + '<UOMId>' + this.lstOrderItems[i].UOMId + '</UOMId>'
        + '<Make>' + this.lstOrderItems[i].Make + '</Make>'
        + '<UOM>' + this.lstOrderItems[i].UOM + '</UOM>'
        + '<Rate>' + this.lstOrderItems[i].Rate + '</Rate>'
        + '<Qty>' + this.lstOrderItems[i].Qty + '</Qty>'
        + '<Gross>' + this.lstOrderItems[i].Gross + '</Gross>'
        + '<DiscountPercentage>' + this.lstOrderItems[i].DiscountPercentage + '</DiscountPercentage>'
        + '<DiscountAmount>' + this.lstOrderItems[i].DiscountAmount + '</DiscountAmount>'
        + '<CGST>' + this.lstOrderItems[i].CGST + '</CGST>'
        + '<CGSTAmount>' + this.lstOrderItems[i].CGSTAmount + '</CGSTAmount>'
        + '<SGST>' + this.lstOrderItems[i].SGST + '</SGST>'
        + '<SGSTAmount>' + this.lstOrderItems[i].SGSTAmount + '</SGSTAmount>'
        + '<IGST>' + this.lstOrderItems[i].IGST + '</IGST>'
        + '<IGSTAmount>' + this.lstOrderItems[i].IGSTAmount + '</IGSTAmount>'
        + '<TotalTax>' + this.lstOrderItems[i].TotalTax + '</TotalTax>'
        + '<NetTotal>' + this.lstOrderItems[i].NetTotal + '</NetTotal>'
        + '<TaxType>' + this.lstOrderItems[i].TaxType + '</TaxType>'
        + '<RefType1>' + this.lstOrderItems[i].RefType1 + '</RefType1>'
        + '<RefNo2>' + this.lstOrderItems[i].RefNo2 + '</RefNo2>'
        + '<RefDate3>' + this.lstOrderItems[i].RefDate3 + '</RefDate3>'
        + '<RefLineID33>' + this.lstOrderItems[i].RefLineID33 + '</RefLineID33>'
        + '<RefId>' + this.lstOrderItems[i].RefId + '</RefId>'
        + '<HSN>' + this.lstOrderItems[i].HSN + '</HSN></Table1>'

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


        + '<SalesOrderTermDetailsId>' + this.lstTermsChild[i].SalesOrderTermDetailsId + '</SalesOrderTermDetailsId></Table1>'

    }


    xml3 = '<NewDataSet>' + rows + '</NewDataSet>';

    debugger;
    this.APICall.DBCalling("SaveSalesOrder", xml1, xml2, xml3, "").subscribe(
      (res: Response) => {

        debugger;
        $("#loaderParent").hide();
   
       
        
        this.DbResult = JSON.parse(res['Message']);


        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          if ((+this.getControlValue(this.f.TransactionId, 'int')) > 0) {
            this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
          } else {
  


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
          }

          debugger;
        

          if (this.DbResult.Table.length > 0) {

            try {

              if (this.DbResult.Table.length > 0)
              {

                var lstresOrderItems = JSON.parse(((this.DbResult.Table[0].lstOrderItems).replace(/\n/g, "")).replace(/'/g, "\""));
                var i = 0;
                var OrderItemsdata = $.map(lstresOrderItems, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstOrderItems = OrderItemsdata;


              }
            } catch (exce) { }
            try {
              if (this.DbResult.Table2.length > 0) {

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
              text: 'Order Already Exists.!',
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

  TransactionDateChange(e) {
    debugger;

  }
  TransactionDate = $("#TransactionDate").val();

  SelectedProductData = {
    SNO: 1
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
  Quotation='0';
  //AddItemReset=false;
  OnAdd() {
    this.PartyId = this.getControlValue(this.f.PartyId, 'int');
    debugger;
    this.errormsg = "";
    this.EditRecNO = -1;
    this.SelectedProductData = {
      SNO: (this.lstOrderItems.length == 0 ? 1 : (this.lstOrderItems.length + 1))
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
    if (this.lstOrderItems.length > 0) {
      var xmlHsnInfo = "";
      var rows = "";

      for (var i = 0; i < this.lstOrderItems.length; i++) {

        rows = rows + '<Table1><HSN>' + this.lstOrderItems[i].HSN + '</HSN></Table1>'


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


            for (var i = 0; i < this.lstOrderItems.length; i++) {
              this.lstOrderItems[i].CGST = 0;
              this.lstOrderItems[i].SGST = 0;
              this.lstOrderItems[i].IGST = 0;

              this.lstOrderItems[i].CGSTAmount = 0;
              this.lstOrderItems[i].SGSTAmount = 0;
              this.lstOrderItems[i].IGSTAmount = 0;
              var ResultItem = resultInfo.filter(d => d.HSN === this.lstOrderItems[i].HSN);
              if (ResultItem.length > 0) {

                debugger;
                for (let j = 0; j < ResultItem.length; j++) {
                  if (ResultItem[j].TaxType == "CGST") {
                    this.lstOrderItems[i].CGST = (ResultItem[j].TaxPercentage2);


                  }

                  if (ResultItem[j].TaxType == "SGST") {
                    this.lstOrderItems[i].SGST = (ResultItem[j].TaxPercentage2);


                  }

                  if (ResultItem[j].TaxType == "IGST") {
                    this.lstOrderItems[i].IGST = (ResultItem[j].TaxPercentage2);

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
        for (var i = 0; i < this.lstOrderItems.length; i++) {

          if ((this.lstOrderItems[i].Partno).toString().includes(searchPartNo) ||

            (this.lstOrderItems[i].Make).toString().includes(searchDescription) ||
            (this.lstOrderItems[i].Description).toString().includes(searchMake) ||
            (this.lstOrderItems[i].HSN).toString().includes(searchHSN)

          ) {



            this.lstOrderItems[i].Show = 'true';
          } else {
            this.lstOrderItems[i].Show = 'false';


          }
        }
      }


    }
    else {


      for (var i = 0; i < this.lstOrderItems.length; i++) {

        if ((this.lstOrderItems[i].Partno) == ((searchPartNo) != "" ? (searchPartNo) : this.lstOrderItems[i].Partno) &&

          (this.lstOrderItems[i].Make) == ((searchMake) != "" ? (searchMake) : this.lstOrderItems[i].Make) &&
          (this.lstOrderItems[i].Description) == ((searchDescription) != "" ? (searchDescription) : this.lstOrderItems[i].Description) &&
          (this.lstOrderItems[i].HSN) == ((searchHSN) != "" ? (searchHSN) : this.lstOrderItems[i].HSN)

        ) {



          this.lstOrderItems[i].Show = 'true';
        } else {
          this.lstOrderItems[i].Show = 'false';



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

      for (var i = 0; i < this.lstOrderItems.length; i++) {

        if (

          (this.lstOrderItems[i].Partno).toString().includes(SearchString) ||
          (this.lstOrderItems[i].Make).toString().includes(SearchString) ||
          (this.lstOrderItems[i].HSN).toString().includes(SearchString) ||
          (this.lstOrderItems[i].Description).toString().includes(SearchString)

          //(this.lstOrderItems[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {



          this.lstOrderItems[i].Show = 'true';
        } else {
          this.lstOrderItems[i].Show = 'false';


        }
      }

    }
    return SearchString;


  }
  Search() {
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));

    this.APICall.UpdatedSelectedPath('./Sales/SalesOrder');
    this.router.navigate(['Sales/SalesOrder']);
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
    return this.CreateSalesOrder.controls;

  }

  lstOrderItems: any = [];
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
      // for(var  i=0;i<this.lstOrderItems.length;i++)
      // {
      // if( data.SNO!=this.lstOrderItems[i].SNO && this.lstOrderItems[i].Partno==data.Partno)
      // {
      // validate=false;
      // this.showError=true;
      // this.errormsg="Already exists!";
      // break;

      // }  

      // }
    } else {

      validate = false;
      this.showError = true;
      this.errormsg = "Invalid Data!";

    }

    return validate;
  }

  AddItemAndNewClick(event) {
    debugger;
    this.AddItem('New', event.SelecedRow)
  }
  AddItemAndCloseClick(event) {

    this.AddItem('Close', event.SelecedRow)
  }
  EditItemClick(data) {

    this.EditRecNO = 0;
    debugger;
    this.errormsg = "";
    this.SelectedProductData = Object.assign({}, data);

  }



  AddItem(type, data) {
    debugger;
    if (this.ValidateItem(data)) {

      //let WeekName:string= this.from
     
      let lstOrderItems=[];
      this.lstOrderItems.forEach((element ,index)=> {
        lstOrderItems[index]={...element};
      });
      
      this.lstOrderItems=lstOrderItems;

      for (var i = 0; i < this.lstOrderItems.length; i++) {
        this.lstOrderItems[i].Show = 'true';


        if (this.lstOrderItems[i].SNO == data.SNO) {


          //  this.lstOrderItems[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
          this.lstOrderItems[i].Partno = data.Partno;
          this.lstOrderItems[i].ItemId = data.ItemId;
          this.lstOrderItems[i].MakeId = data.MakeId;
          this.lstOrderItems[i].Description = data.Description;

          this.lstOrderItems[i].Make = data.Make;
          this.lstOrderItems[i].UOM = data.UOM;
          this.lstOrderItems[i].UOMId = data.UOMId;

          this.lstOrderItems[i].Rate = data.Rate;
          this.lstOrderItems[i].Qty = (+data.Qty);



          this.lstOrderItems[i].Gross = (+data.Gross);
          this.lstOrderItems[i].DiscountPercentage = (+ data.DiscountPercentage);
          this.lstOrderItems[i].DiscountAmount = (+data.DiscountAmount);



          this.lstOrderItems[i].CGST = (+data.CGST);
          this.lstOrderItems[i].CGSTAmount = (+data.CGSTAmount);
          this.lstOrderItems[i].SGST = (+data.SGST);




          this.lstOrderItems[i].SGSTAmount = (+data.SGSTAmount);
          this.lstOrderItems[i].IGST = (+data.IGST);
          this.lstOrderItems[i].IGSTAmount = (+data.IGSTAmount);



          this.lstOrderItems[i].TotalTax = (+data.TotalTax);
          this.lstOrderItems[i].NetTotal = (+data.NetTotal);

          this.lstOrderItems[i].TaxType = data.TaxType;



          this.lstOrderItems[i].HSN = data.HSN;
          this.lstOrderItems[i].RefLineID33 = data.RefLineID33;
          this.lstOrderItems[i].RefType1 = data.RefType1;
          this.lstOrderItems[i].RefNo2 = data.RefNo2;
          this.lstOrderItems[i].RefDate3 = data.RefDate3;
          this.lstOrderItems[i].RefId = data.RefId;


        }
      }
      if (this.EditRecNO == -1) {
        var res =
          ({
            SNO: this.lstOrderItems.length + 1
            , LineId: '0'
            , Description: data.Description

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



            , TotalTax: (+data.TotalTax)
            , NetTotal: (+data.NetTotal)

            , TaxType: data.TaxType



            , HSN: data.HSN

            , RefLineID33: 0
            , RefType1: ""
            , RefNo2: ""
            , RefDate3: ""
            , RefId:0
            , Show: 'true'
          });

        if (this.lstOrderItems.length == 0) {
          this.lstOrderItems = [res];

        }
        else {
          this.lstOrderItems.push(res);

        }
      }
      // this.EditRecNO=0;

      //       // this.ClearSelectedValues();

      //        if(type=='Close')
      //        {
      //          $("#btnCloseAddItem").trigger('click');
      //        }

      if (type == 'Close') {
        $("#btnCloseAddItem").trigger('click');
        this.EditRecNO = 0;
      } else {

        this.EditRecNO = -1;

      }

      this.SNO = this.lstOrderItems.length + 1;
      this.CalculateTotals();
      this.f.LineChanges.setValue(0);
    }

  }



  TotalGross = 0;
  TotalDiscount = 0;
  TotalCGST = 0;
  TotalSGST = 0;
  TotalIGST = 0;
  TotalTax = 0;
  Total = 0;
  AfterDiscount = 0;
  CalculateTotals() {
    debugger;
    this.TotalGross = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.AfterDiscount = 0;
    for (let i = 0; i < this.lstOrderItems.length; i++) {

      var AfterDiscount = ((+this.lstOrderItems[i].Gross) - (+ this.lstOrderItems[i].DiscountAmount));;

      this.lstOrderItems[i].SGSTAmount = (((+this.lstOrderItems[i].SGST) * AfterDiscount) / 100);
      this.lstOrderItems[i].CGSTAmount = (((+this.lstOrderItems[i].CGST) * AfterDiscount) / 100);
      this.lstOrderItems[i].IGSTAmount = (((+this.lstOrderItems[i].IGST) * AfterDiscount) / 100);
      this.lstOrderItems[i].TotalTax = (+this.lstOrderItems[i].SGSTAmount) + (+this.lstOrderItems[i].CGSTAmount) + (+this.lstOrderItems[i].IGSTAmount);

      this.TotalCGST = this.TotalCGST + (+this.lstOrderItems[i].CGSTAmount);
      this.TotalSGST = this.TotalSGST + (+this.lstOrderItems[i].SGSTAmount);
      this.TotalIGST = this.TotalIGST + (+this.lstOrderItems[i].IGSTAmount);
      this.TotalGross = this.TotalGross + (+this.lstOrderItems[i].Gross);
      this.TotalDiscount = this.TotalDiscount + (+this.lstOrderItems[i].DiscountAmount);
      this.TotalTax = this.TotalTax + (+this.lstOrderItems[i].TotalTax);
      this.lstOrderItems[i].NetTotal = ((AfterDiscount + (+this.lstOrderItems[i].TotalTax))).toFixed(2);

      this.Total = this.Total + (+this.lstOrderItems[i].NetTotal);

    }
    this.AfterDiscount = this.TotalGross - this.TotalDiscount;
    this.PaymentTermsAmountCalc();
  }

  RemoveItemClick(event) {
    debugger;

    let lstOrderItems=[];
    this.lstOrderItems.forEach((element ,index)=> {
      lstOrderItems[index]={...element};
    });
    
    this.lstOrderItems=lstOrderItems;
    var sliceIndex = -1;
    for (var i = 0; i < this.lstOrderItems.length; i++) {
      this.lstOrderItems[i].Show = 'true';

      if (this.lstOrderItems[i].SNO == event.SNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstOrderItems.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstOrderItems.length; i++) {
        this.lstOrderItems[i].SNO = i + 1;
      }
    }

    //this.EditRecNO=-1;
    this.SNO = this.lstOrderItems.length + 1;
    // this.ClearSelectedValues();
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

              obj.SalesOrderTermDetailsId = 0;



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
    var that = this;

   
    this.ViewPaymentTerms();
    this.ViewTermsAndConditions();
    this.ClockControlLoad();
    // $("#TransactionTime").val(this.f.TransactionTime.value);
    this.ControlDatePickerLoad();

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

  ShippingDetailsPartyId(PartyId, BindDefault) {

    {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }

    debugger;
    this.APICall.DBCalling("ShippingDetailsByTypeAndPartyId", "Customer", PartyId, "", "").subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);

        $("#loaderParent").hide();
        this.lstShippings = [];
        if (this.lstDbResult.Table.length > 0) {
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

      });
  }
  DeviceType = "";
  StoreSalesOrder: StoreSalesOrder;
 
  QuotDateChange(e) {

  }
  ngOnInit() {
    debugger;
    this.DeviceType = localStorage.getItem('DeviceType')
    this.StoreSalesOrder = new StoreSalesOrder;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    // var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "SalesOrder"; });
    if (result.length > 0) {

      // this.StoreSalesOrder = (result[0]);
      Object.assign(this.StoreSalesOrder,result[0]);
      this.ModifiedDate = this.StoreSalesOrder.ModifiedDate.toString();
      this.BillToStateCode = this.StoreSalesOrder.BillToStateCode;
      this.BillToStateName = this.StoreSalesOrder.BillToStateName;
      this.DispalyCustomerName = this.StoreSalesOrder.PartyName;
      this.ReferenceType = this.StoreSalesOrder.ReferenceType;
      this.ReferenceNo = this.StoreSalesOrder.ReferenceNo;
      this.SelectedState = this.StoreSalesOrder.SelectedState;
      this.DisplayCustomerId = this.StoreSalesOrder.PartyId;
      this.PartyGSTNo = this.StoreSalesOrder.PartyGSTNo;
      this.lstOrderItems = this.StoreSalesOrder.lstOrderItems == null ? [] : (Object.assign([],this.StoreSalesOrder.lstOrderItems));
      this.TaxType = this.StoreSalesOrder.TaxType;
      var i = 0;
      var that = this;
      var lstOrderItemsdata = $.map(this.lstOrderItems, function (obj) {
        i = i + 1;
        return { ...obj, SNO: i};
      });
      this.lstOrderItems = lstOrderItemsdata;
      this.lstTermsChild = this.StoreSalesOrder.lstTermsChild == null ? [] :(Object.assign([],this.StoreSalesOrder.lstTermsChild));

      var i = 0;

      var lstTermsChilddata = $.map(this.lstTermsChild, function (obj) {
        i = i + 1;
        return { ...obj, SNO: i};
      });
      this.lstTermsChild = lstTermsChilddata;

      if (this.StoreSalesOrder.RequiredDate != '') {
        var RequiredDate = formatDate(new Date(this.StoreSalesOrder.RequiredDate), 'MM/dd/yyyy', 'en');
        var TransactionDate = formatDate(new Date(this.StoreSalesOrder.TransactionDate), 'MM/dd/yyyy', 'en');
        var TransactionTime = formatDate(new Date(this.StoreSalesOrder.TransactionTime), 'HH:mm', 'en');
      } else {
        var RequiredDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionTime = formatDate(new Date(), 'HH:mm', 'en');
      }
      debugger;


      $("#RequiredDate").val(RequiredDate)
      $("#TransactionDate").val(TransactionDate)
      $("#TransactionTime").val(TransactionTime)
      this.TransactionDate = TransactionDate;
     
      this.CreateSalesOrder.patchValue(this.StoreSalesOrder);
      this.ShippingDetailsPartyId(this.StoreSalesOrder.PartyId, false);
    }
    this.CalculateTotals();

        
        var that=this;
    this.CreateSalesOrder.valueChanges.subscribe(value => {
     
      that.StoreSalesOrder.SequenceNumberId = value.SequenceNumberId;
      that.StoreSalesOrder.Contactno = value.Contactno;
      that.StoreSalesOrder.Email = value.Email;
      that.StoreSalesOrder.RequiredDate = value.RequiredDate;
      that.StoreSalesOrder.Billto = value.Billto;
      that.StoreSalesOrder.Shipto = value.Shipto;
      that.StoreSalesOrder.SelectedState = that.SelectedState;
      that.StoreSalesOrder.ReferenceNo = that.ReferenceNo;
      that.StoreSalesOrder.ReferenceType = that.ReferenceType;
      that.StoreSalesOrder.ShiptoAddress = value.ShiptoAddress;
      that.StoreSalesOrder.Terms = value.Terms;
      that.StoreSalesOrder.TermsandConditions = value.TermsandConditions;
      that.StoreSalesOrder.BillToStateCode = that.BillToStateCode;
      that.StoreSalesOrder.BillToStateName = that.BillToStateName;

      that.StoreSalesOrder.TaxType = that.TaxType;

      that.StoreSalesOrder.PaymentTerms = value.PaymentTerms;
      that.StoreSalesOrder.TransactionTime = value.TransactionTime;
      that.StoreSalesOrder.TransactionDate = value.TransactionDate;
      that.StoreSalesOrder.TransactionId = value.TransactionId;

      that.StoreSalesOrder.TransactionNo = value.TransactionNo;
      that.StoreSalesOrder.PartyName = value.PartyName;
      that.StoreSalesOrder.PartyGSTNo = this.PartyGSTNo;

      that.StoreSalesOrder.PartyId = value.PartyId;

      that.StoreSalesOrder.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate.toString());
      that.StoreSalesOrder.ViewName = 'SalesOrder';

      that.StoreSalesOrder.lstOrderItems = that.lstOrderItems;

      that.StoreSalesOrder.lstTermsChild = that.lstTermsChild;
      that.store.dispatch(new TabStore.AddTab(Object.assign({},that.StoreSalesOrder )));
    });

  }
  PrintCloseClick() {
    this.OrderData = null;
    $("#btnCloseOrderPrint").click();

  }
  SelectedState = 0;
  SelectedDate = ($("#TransactionDate").val());
  BillToStateName = '';
  BillToStateCode = '';
  sales='';
  selectedCustomer: Customer;

ClearCustomerOrders()
{

  this.DisplayTransactionNo='';
  this.SalesQuotationTransactionId=0;
this.DispalyTransactionDate='';

  
}

  CustomerValueChange(event) {

    debugger;
    
    this.selectedCustomer = Object.assign({}, event);
    this.lstOrderItems = this.lstOrderItems
  
    var that = this;
    if (this.lstOrderItems.length > 0) {

     
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
        debugger;
        if (isConfirm) {
      debugger;
     
      
          for (let i = 0; i < that.lstOrderItems.length; i++) {
       
            if (that.lstOrderItems[i].RefLineID33 > 0) {
              that.lstOrderItems[i]["RefLineID33"] = 0;
              that.lstOrderItems[i]["RefType1"] = "";
              that.lstOrderItems[i]["RefNo2"] = "";
              that.lstOrderItems[i]["RefDate3"] = "";
              that.lstOrderItems[i]["RefId"] = 0;
              that.lstOrderItems[i]["LineId"] = 0;
            }
           
            
          }
        

        }

        else {

          for (let g = ((+that.lstOrderItems.length)-1); g >= 0; g--) {
            if (that.lstOrderItems[g].RefLineID33 > 0) {
              that.lstOrderItems[g]["SNO"] = (that.lstOrderItems.length -1);
              that.lstOrderItems.splice(g, 1);
            }
          }
        }
      });
    }
   
    this.BillToStateCode = '';
    this.BillToStateName = '';
debugger;
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

    //billto
    if (this.CompanyStateId != this.SelectedState
    ) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

    this.GstTaxFromHSNAndGSTTypeForGridView();


  }




  SalesQuotationTransactionId: number = 0;
  RefLineID33: number = 0;

  SalesValueChange(event) {
    try {

      debugger;
      this.DisplayTransactionNo = event.TransactionNo;
      this.DispalyTransactionDate = event.TransactionDate;
      this.SalesQuotationTransactionId = event.TransactionId;
     
      this.f.Quotation.setValue(event.TransactionId);
      var obj = event.lstQuotationItems;

      if (event.lstQuotationItems != null && typeof (event.lstQuotationItems) != undefined) {

        var res = ((event.lstQuotationItems).replace(/\n/g, "")).replace(/'/g, "\"");
        var lst = JSON.parse(res);

        var that = this;
        if (lst != null && lst != undefined) {
          if (lst.length > 0) {
          
            for (let i = 0; i < lst.length; i++) {

              var result = this.lstOrderItems.filter(x => x.RefLineID33 === lst[i]["LineId"]);

            
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
                  debugger;
                  if (isConfirm) {
                   
                  
                     that.PushMethods(lst, i);
                  }

                });

              }
              else {
                
                
                let lstOrderItems=[];
                this.lstOrderItems.forEach((element ,index)=> {
                lstOrderItems[index]={...element};
                });
                this.lstOrderItems=lstOrderItems;
                lst[i]["SNO"] = (that.lstOrderItems.length + 1);
                lst[i]["RefLineID33"] = lst[i]["LineId"];
                lst[i]["LineId"] = 0;
                lst[i]["RefType1"] = "SalesQuotation";
                lst[i]["RefNo2"] = that.DisplayTransactionNo;
                lst[i]["RefId"] = that.SalesQuotationTransactionId;              
                lst[i]["RefDate3"] = that.DispalyTransactionDate;
                that.lstOrderItems.push(lst[i]);
                
              }

            }
           
          }

        }
       
     
      }

 
      this.CalculateTotals();
      
    }
    catch (error) { }

  }




  private PushMethods(lst: any, i: number) {
debugger;
    for (let i = 0; i < lst.length; i++) {
      lst[i]["SNO"] = (this.lstOrderItems.length + 1);
      lst[i]["RefLineID33"] = lst[i]["LineId"];
      lst[i]["RefType1"] = "SalesQuotation";
      lst[i]["RefNo2"] = this.DisplayTransactionNo;
      lst[i]["RefDate3"] = this.DispalyTransactionDate;
      lst[i]["RefId"] = this.SalesQuotationTransactionId;
      lst[i]["LineId"] = 0;
      this.lstOrderItems.push(lst[i]);
      
     
    }
   
  }

  RemoveItem(e: any) {
debugger;

    var ind = this.lstOrderItems.indexOf(e);

    if (ind > -1) {
      debugger;
      let lstOrderItems=[];
this.lstOrderItems.forEach((element ,index)=> {
  lstOrderItems[index]={...element};
});

this.lstOrderItems=lstOrderItems;
      this.lstOrderItems.splice(ind, 1)
    }
    return this.lstOrderItems;

  }

  StoreAccountLedger: StoreAccountLedger;
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
  

// //excel download
 @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
ExportTOExcel() {  
  debugger;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement); 
  ws['!cols'] = [{ width: 10}, { width: 20 }, { width: 30 } ]; 
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, 'SalesOrder.xlsx');  

}



@ViewChild('PDFTable',{static:false}) pdfTable: ElementRef;

 public downloadAsPDF() {
   debugger;
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
   pdfMake.createPdf(documentDefinition).download(); 
   
 }

 download(){
  debugger;
  if(this.ExportTOExcel1){
    this.ExportTOExcel();
  }
  else if (this.downloadAsPDF1){
    this.downloadAsPDF();
  }
}

ExportTOExcel1(event){
  if(event == true){

  }
}
downloadAsPDF1(event){
  if(event == true){
    
  }
}

 Customer:Customer;
  lstCustomers:any=[];
  LoadCustomers(e)
  {
    try{
 
     if(AppSettings.ShowLoaderOnView)
     {
   //  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
  $("#loaderParent").show();
     }
     var sstring='';
    debugger;
     this.APICall.DBCalling("ViewCustomers",sstring,this.FilterType,this.DisplayCustomerId,this.APICall.GetCompanyID()).subscribe(
       (res:Response) => {
         debugger;
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
           this.selectedCustomer.ViewName="RequestFrom";
            this.Customer=Object.assign({},this.selectedCustomer);  
        }
       
         this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
         
         var ActivatedRoute=localStorage.getItem("ActivatedRoute");
          this.Customer.TabId=ActivatedRoute;
        this.store.dispatch(new  TabStore.AddTab(this.Customer));         
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
  debugger;

  this.Customer=new Customer;
  
  this.LoadCustomers(this.DisplayCustomerId)

}

 
}
