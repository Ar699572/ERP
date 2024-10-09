import { Component, OnInit } from '@angular/core';
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
import { StoreSalesReturns } from 'src/app/Store/StoreSalesReturns';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { StoreAccountingSettings } from 'src/app/Store/StoreAccountingSettings';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Customer } from 'src/app/store/Customer';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';

@Component({
  selector: 'app-create-sales-returns',
  templateUrl: './create-sales-returns.component.html',
  styleUrls: ['./create-sales-returns.component.css']
})

export class CreateSalesReturnsComponent implements OnInit {

  // name	prefix	suffix	startfrom	separator	increment	notes	CompanyId	BranchId	SequenceNumberId	CCId	formatlength	DeleteFlag	ModifiedDate	ModifiedBy
  //Sales Returns	SR	2021-22	1	-	1	NULL	1	1	21	NULL	NULL	0	2020-08-06 17:53:33.987	admin

  CreateSalesReturns: FormGroup;
  TransactionType = "Sales";
  DisplayCustomerId = 0;
  DispalyCustomerName = "";
  DisplaySequenceNumberId = 0;
  DispalyFormName = 'SalesReturns'
  lstSalesReturnsItemsStock: any = [];
  lstCharges:any=[];
  PartyId:number=0;  
  ReturnsData: any;
  StockErrorMsg: string;
  InsertalineIn: number;
  VoucherNo:string='';

  QuotDateChange(e) {

  }
  tabClick(t) { }
  constructor(private DbCallings: CommonDbCallings, private router: Router, private formBuilder: FormBuilder,
     private APICall: APICallingService, private store: Store<any>) {


    this.CreateSalesReturns = formBuilder.group(


      {
        SequenceNumberId: new FormControl(0),
        Contactno: new FormControl(''),
        Email: new FormControl('', [Validators.email]),

        Billto: new FormControl(''),


        TransactionTime: new FormControl('', [Validators.required]),
        TransactionDate: new FormControl('', [Validators.required]),
        TransactionId: new FormControl(0),
        TransactionNo: new FormControl(''),
        ReturnSourceType: new FormControl('', [Validators.required]),
        ReturnSourceId: new FormControl(0, [Validators.required, Validators.min(1)]),
        ReturnSourceNo: new FormControl(''),

        PartyId: new FormControl(0, [Validators.required, Validators.min(1)]),
        PartyName: new FormControl(''),

        LocationId: new FormControl(0, [Validators.required, Validators.min(1)]),
        LocationName: new FormControl(''),
        BinId: new FormControl(0, [Validators.required, Validators.min(1)]),
        BinName: new FormControl(''),
        Salesaccount: new FormControl(0),
        Discountaccount: new FormControl(0),
        Notes: new FormControl(''),

        LineChanges: new FormControl(0),
        SearchString: new FormControl(''),
        searchPartNo: new FormControl(''),
        searchDescription: new FormControl(''),
        searchMake: new FormControl(''),
        searchHSN: new FormControl(''),

        ReferenceId: new FormControl(0),
        ReferenceName: new FormControl(''),
      }

    );
    // setInterval(() => {
    //   debugger;
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);
    //}, 1);


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }
  GetRefSearchDetails() {


  }

  SourceTypeChange(event) {
    try {
      debugger;
      this.StoreSalesReturns.ReturnSourceType = event;
      this.LoadReference();

    }
    catch (e) { }
  }

  SelectedInvoice:any;

 

  LoadReference() {
    debugger;
    var that = this;
    if (this.StoreSalesReturns.ReturnSourceType != undefined && this.StoreSalesReturns.ReturnSourceType != null && this.StoreSalesReturns.ReturnSourceType != "") {

      
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
              debugger;
              return JSON.stringify({ "Operation": 'SalesReturnReferences', "Params": that.StoreSalesReturns.ReturnSourceType, "Xml2": 'All', "Xml3": that.StoreSalesReturns.PartyId, "Xml4": that.APICall.GetCompanyID() })

            },
          contentType: 'application/json; charset=utf-8',
          processResults: function (response) {

            var ResultData = (JSON.parse(response['Message'])).Table;
            debugger;
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


        html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Invoice No</b></td> <td width="50%"><b>Date</b></td> </tr > </tbody> </table>';

        var res = $('.select2-search');

        var text = res[0].innerText;

        if (text == "")
          $('.select2-search').append(html);
      });

      var that = this;
      $('#drpReference').on('select2:select', function (e) {

        if (typeof ((<any>e).params.data.id) != 'undefined') {
          debugger;

          if (that.StoreSalesReturns.ReturnSourceId != (<any>e).params.data.id) {
debugger;
that.StoreSalesReturns.ReturnSourceId = (<any>e).params.data.id;
that.StoreSalesReturns.ReturnSourceNo  = (<any>e).params.data.text;
that.StoreSalesReturns.ReturnSourceDate  = (<any>e).params.data.date;
          
            that.LoadReferenceItems();
          }
        }
      });

      $("#drpReference").on("select2:unselecting", function (e) {

        that.StoreSalesReturns.ReturnSourceId = 0;
        that.StoreSalesReturns.ReturnSourceNo = "";
        that.StoreSalesReturns.ReturnSourceDate = "";
        //  that._SelecedRow.TransactionDate   = ""  ;      


      });
    }
  }

  lstDbResult1: any;
  LoadReferenceItems() {
    var sp = "";


    if (this.StoreSalesReturns.ReturnSourceId > 0) {
      try {
        if (this.StoreSalesReturns.ReturnSourceType == 'DC') {
          sp = "ViewDC";
        }
        else if (this.StoreSalesReturns.ReturnSourceType == 'SalesInvoice') {
          sp = "ViewSalesInvoice";
        }

        if (AppSettings.ShowLoaderOnView) {
          $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

          $("#loaderParent").show();
        }

var storesalesinvoice:StoreSalesInvoice;
storesalesinvoice=new StoreSalesInvoice;
        debugger;
        this.APICall.DBCalling(sp, "", "All", this.StoreSalesReturns.ReturnSourceId, this.APICall.GetCompanyID()).subscribe(
          (res: Response) => {

            $("#loaderParent").hide();
            debugger;
            this.lstReturnsItems = [];
            this.lstDbResult1 = JSON.parse(res['Message']);
            this.StoreSalesReturns.SalesAccouont=this.lstDbResult1.Salesaccount;

            var lstItems: any;
            var lstStock:any;
            if (this.lstDbResult1.Table.length > 0) {


              if (this.StoreSalesReturns.ReturnSourceType == 'DC') {
                lstItems = this.lstDbResult1.Table[0].lstDCItems;
                lstStock=this.lstDbResult1.Table[0].lstDCItemsStock;

              }
              else if (this.StoreSalesReturns.ReturnSourceType == 'SalesInvoice') {
                lstItems = this.lstDbResult1.Table[0].lstSalesInvoiceItems;
             //   lstStock=this.lstDbResult1.Table[0].lstSalesInvoiceItemsStock;
                this.StoreSalesReturns.SalesAccouont=this.lstDbResult1.Salesaccount;
                this.StoreSalesReturns.discountaccount=this.lstDbResult1.Discountaccount;
              }


              // if (lstStock != null && typeof (lstStock) != undefined) {
              //   try {
              //     var val = ((lstStock).replace(/\n/g, "")).replace(/'/g, "\"");

              //     this.lstSalesReturnsItemsStock = JSON.parse(val);
              //   }
              //   catch(error){   }
              //   }

                try {
                  if (this.DbResult.Table4.length > 0)
                  {                    
                    var lstresCharges = JSON.parse(((this.DbResult.Table4[0].lstCharges).replace(/\n/g, "")).replace(/'/g, "\""));                   
    
                    this.lstCharges = lstresCharges;
                  }
                } catch (exce) { }
    


              if (lstItems != null && typeof (lstItems) != undefined) {
                try {
                  var val = ((lstItems).replace(/\n/g, "")).replace(/'/g, "\"");

                  var items = JSON.parse(val);


                  for (let i = 0; i < items.length; i++) {
                    items[i]["SNO"] = (this.lstReturnsItems.length + 1);

                    items[i]["Gross"] = 0;
                    items[i]["DiscountAmount"] = 0;
                    items[i]["TotalTax"] = 0;
                    items[i]["NetTotal"] = 0;

                    if(this.StoreSalesReturns.ReturnSourceType == 'DC')
                    {
                      items[i]["DCQty"] = items[i].DCQty;
                    }
                    else{
                      items[i]["SIQty"] = items[i].SIQty;
                    }                    
                   
                    items[i]["AvlQty"] = items[i].AvlQty;
                    items[i]["Qty"] =0;
                    items[i]["CGSTAccountId"] = 0;
                    items[i]["SGSTAccountId"] = 0;
                    items[i]["IGSTAccountId"] = 0;
                    items[i]["Show"] = "true";
                    items[i]["RefLineId33"] = items[i]["LineId"];
                    items[i]["LineId"] = 0;
                    items[i]["RefId"] = this.StoreSalesReturns.ReturnSourceId;
                    items[i]["RefDate3"] = this.StoreSalesReturns.ReturnSourceDate;
                    items[i]["RefNo2"] = this.StoreSalesReturns.ReturnSourceNo;
                    items[i]["RefType1"] = this.StoreSalesReturns.ReturnSourceType;
                   // items[i]["ReturnQty"] = 0;
                   // items[i]["AvlQty"] = 0;
                    
                    this.lstReturnsItems.push(items[i]);
                    
                  }
                  this.CalculateTotals();
                }

                catch (error) { }
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
    var $opt;


    $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.TransactionNo + '</td><td width="50%">' + opt.TransactionDate + '</td></tr></tbody></table>');

    return $opt;
  };

  format1(opt) {
    if (!opt.id) {
      return opt.text;
    }
    var $opt;


    $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="100%">' + opt.Name + '</td></tr></tbody></table>');

    return $opt;
  };



  lstSalesAccounts: any = [];
  lstDiscountAccount: any = [];
  StoreAccountingSettings: StoreAccountingSettings;
  ViewSalesAccount() {
    var SalesAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);

      SalesAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Sales Returns'; }))[0].AccountGroupName;

    }

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();



    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
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

  ViewDiscountAccount() {

    var DiscountAccountGroup = "0";
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);
      DiscountAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Discount Received'; }))[0].AccountGroupName;



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

  RetunQtyChange(target, PreQty, index) {
    if ((+this.lstReturnsItems[index].AvailableQty) < (+target.value)) {


      target.value = PreQty;
      (window as any).swal("Invalid", "Invalid Return Qty", "error");
    } else {

      this.lstReturnsItems[index].Qty = (+target.value);
      this.f.LineChanges.setValue(0);
      this.CalculateTotals();

    }

  }



  ReturnChecked(target, index) {
    debugger;
    this.lstTransactionDetails[index].ChkStatus = target.checked;
  }

  lstTransactionDetails: any = [];


  LoadBinsByLocation() {
    var that = this;

    (<any>$("#drpBin")).select2({
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
            return JSON.stringify({ "Operation": 'ViewBinsFromLocation', "Params": sstring, "Xml2": 'All', "Xml3": that.f.LocationId.value, "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData2 = (JSON.parse(response['Message'])).Table;

          var data2 = $.map(ResultData2, function (obj) {

            obj.id = obj.BinId;
            obj.text = obj.binname;


            return obj;
          });



          return {


            results: data2

          };
        },
        cache: false

      }
      //, templateResult: this.formatMake
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });



    var that = this;
    $('#drpBin').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        that.f.BinId.setValue((<any>e).params.data.BinId);
        that.f.BinName.setValue((<any>e).params.data.binname);
        //  that.LoadBinsByLocation();

      }


    });
    var BinSelection = new Option(this.f.BinName.value, this.f.BinId.value.toString(), true, true);
    //AccountSelection.id=this._COAId.toString();
    (<any>$('#drpBin')).append(BinSelection).trigger('change');

    $("#drpBin").on("select2:unselecting", function (e) {

      that.f.BinId.setValue(0);
      that.f.BinName.setValue('');

      (<any>$('#drpBin')).val(null).trigger('change');




    });
  }
  LoadLocations() {

    var that = this;

    (<any>$("#drpLocation")).select2({
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
            return JSON.stringify({ "Operation": 'ViewLocationsFromBranch', "Params": sstring, "Xml2": 'All', "Xml3": that.APICall.GetBranchID(), "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData1 = (JSON.parse(response['Message'])).Table;

          var data1 = $.map(ResultData1, function (obj) {

            obj.id = obj.LocationId;
            obj.text = obj.locationname;


            return obj;
          });



          return {


            results: data1

          };
        },
        cache: false

      }
      // , templateResult: this.formatMake
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });



    var that = this;
    $('#drpLocation').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        that.f.LocationId.setValue((<any>e).params.data.id);
        that.f.LocationName.setValue((<any>e).params.data.text);
        that.LoadBinsByLocation();

      }


    });
    var LocationSelection = new Option(this.f.LocationName.value, this.f.LocationId.value.toString(), true, true);
    //AccountSelection.id=this._COAId.toString();
    (<any>$('#drpLocation')).append(LocationSelection).trigger('change');

    $("#drpLocation").on("select2:unselecting", function (e) {

      that.f.LocationId.setValue(0);

      that.f.LocationName.setValue('');
      (<any>$('#drpLocation')).val(null).trigger('change');
      (<any>$('#drpBin')).val(null).trigger('change');



    });

  }

  CurrentTime: any;

  PartyGSTNo = "";

  windowScroll(ControlName) {
    var element = document.getElementById(ControlName);
    var rect = element.getBoundingClientRect();

    window.scrollTo(rect.left, rect.top);
  }

  OnPrint() {

    this.ReturnsData = this;
  }

  submitted = false;
  OnSave() {
 debugger;
    this.submitted = true;

    this.f.TransactionDate.setValue($("#TransactionDate").val());

    this.f.TransactionTime.setValue($("#TransactionTime").val());
    var Cvalid = true;
    if (this.CreateSalesReturns.invalid) {
     


      if (this.f.PartyId.value==0 && Cvalid) {
      
       // this.windowScroll('PartyId');
        Cvalid = false;
      }

      if (this.f.TransactionDate.value=='' && Cvalid) {
      
        //this.windowScroll('TransactionDate');
        Cvalid = false;
      }


      // if (this.f.Email.value=='' && Cvalid) {
        
      //   this.windowScroll('Email');
      //   Cvalid = false;
      // }


      if (this.f.TransactionTime.value=='' && Cvalid) {
      
        //this.windowScroll('TransactionTime');
        Cvalid = false;
      }


      if (this.f.LocationId.value==0 && Cvalid) {
     
        //this.windowScroll('Location');
        Cvalid = false;
      }


      if (this.f.BinId.value==0 && Cvalid) {
       
        //this.windowScroll('Bin');
        Cvalid = false;
      }

      if(this.lstReturnsItems.length>0 && Cvalid)
      {
        for(let x=0; x<this.lstReturnsItems.length; x++)
        {
          if(this.lstReturnsItems[x].Qty==0)
          {
            Cvalid = false;
            (window as any).swal("Warning", "Please Select Return Quantity for Return Items", "error");
          }
        }
      }

     // return;
    }
   // else {
      

      for (let i = 0; i < this.lstReturnsItems.length; i++) {

        if ((+this.lstReturnsItems[i].Qty) < 1) {
          Cvalid=false;
          (window as any).swal("Warning", "Invalid Return Qty", "error");
        

        }
      }
    //}

      if (Cvalid) {
        this.SaveTransaction();
      }
    
  }

  ProductErrormsg = '';

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

        that.DeleteSalesReturns();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }

    });

  }
  DeleteSalesReturns() {

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    // if (this.ModifiedDate.toString().includes('India')) {

    //   var date = new Date(this.ModifiedDate);


    //   this.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    // }
    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'
      + '<TransactionDate>' + this.getControlValue(this.f.TransactionDate, 'string') + '</TransactionDate>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'
      + '</Table1></NewDataSet>';

    this.APICall.DBCalling("DeleteSalesReturns", xml1, "", "", this.APICall.GetCompanyID()).subscribe(
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
    this.submitted = false;
    this.ModifiedDate = "";
    this.CreateSalesReturns.patchValue(


      {
        //    SequenceNumberId:0,
        Contactno: '',
        PartyName: '',
        Email: '',
        LocationId:0,
        BinId:0,
        Billto: '',
        Notes: '',

        TransactionTime: '',
        TransactionDate: '',
        TransactionId: 0,
        TransactionNo: '',
        ReturnSourceType: '',
        ReturnSourceId: 0,
        PartyId: 0,
        Salesaccount: this.DefaultSalesAccount,
        Discountaccount: this.DefaultDiscountAccount,

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

    $("#TransactionDate").val(rdate)
    $("#TransactionTime").val(this.CurrentTime)
    this.lstReturnsItems = null;
    this.lstReturnsItems = [];

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
    debugger;
    this.StoreSalesReturns = new StoreSalesReturns;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreSalesReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreSalesReturns));

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
  ModifiedDate = "";
  DbResult: any = [];
  ShowStockSelection = true;
  SaveTransaction() {

    this.f.TransactionDate.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());
    this.f.TransactionTime.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());
    
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();

    var xml1 = '<NewDataSet><Table1>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<PartyId>' + this.getControlValue(this.f.PartyId, 'int') + '</PartyId>'
      + '<Billto>' + this.getControlValue(this.f.Billto, 'string') + '</Billto>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'
      + '<ReturnSourceId>' +this.StoreSalesReturns.ReturnSourceId + '</ReturnSourceId>'
      + '<ReturnSourceNo>' + this.StoreSalesReturns.ReturnSourceNo + '</ReturnSourceNo>'
      + '<ReturnSourceDate>' +this.StoreSalesReturns.ReturnSourceDate + '</ReturnSourceDate>'     
      + '<ReturnSourceType>' + this.getControlValue(this.f.ReturnSourceType, 'string') + '</ReturnSourceType>'
      + '<BinId>' + this.getControlValue(this.f.BinId, 'int') + '</BinId>'
      + '<LocationId>' + this.getControlValue(this.f.LocationId, 'int') + '</LocationId>'
      + '<Notes>' + this.getControlValue(this.f.Notes, 'string') + '</Notes>'
      + '<Salesaccount>' +this.StoreSalesReturns.SalesAccouont + '</Salesaccount>'
      + '<Discountaccount>' + this.StoreSalesReturns.discountaccount + '</Discountaccount>'
      + '<TransactionTime>' + this.convertDate(this.getControlValue(this.f.TransactionTime, 'string')) + '</TransactionTime>'
      + '<TransactionDate>' + this.convertDate(this.getControlValue(this.f.TransactionDate, 'string')) + '</TransactionDate>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
      + '<CurrencyId>' + this.APICall.GetCurrencyId() + '</CurrencyId>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<TotalGross>' + this.TotalGross + '</TotalGross>'
      + '<TotalDiscount>' + this.TotalDiscount + '</TotalDiscount >'
      + '<TotalTax>' + this.TotalTax + '</TotalTax>'
      + '<Total>' + this.Total + '</Total>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
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

    for (var i = 0; i < this.lstReturnsItems.length; i++) {

      var qty=0;
      if(this.StoreSalesReturns.ReturnSourceType == 'DC')
      {
      qty=this.lstReturnsItems[i].DCQty;
      }
      else
      {
        qty=this.lstReturnsItems[i].SIQty;
      }

      rows = rows + '<Table1>'
        + '<LineId>' + this.lstReturnsItems[i].LineId + '</LineId>'
        + '<Description>' + this.lstReturnsItems[i].Description + '</Description>'
        + '<Partno>' + this.lstReturnsItems[i].Partno + '</Partno>'
        + '<BinId>' + this.getControlValue(this.f.BinId, 'int') + '</BinId>'
        + '<LocationId>' + this.getControlValue(this.f.LocationId, 'int') + '</LocationId>'       
        + '<ItemId>' + this.lstReturnsItems[i].ItemId + '</ItemId>'
        + '<PartNoId>' + this.lstReturnsItems[i].ItemId + '</PartNoId>'
        + '<MakeId>' + this.lstReturnsItems[i].MakeId + '</MakeId>'
        + '<UOMId>' + this.lstReturnsItems[i].UOMId + '</UOMId>'
        + '<Make>' + this.lstReturnsItems[i].Make + '</Make>'
        + '<UOM>' + this.lstReturnsItems[i].UOM + '</UOM>'
        + '<Rate>' + this.lstReturnsItems[i].Rate + '</Rate>'
        + '<SIQty>' + qty + '</SIQty>'
        + '<DCQty>' + qty + '</DCQty>'
        + '<AvlQty>' + this.lstReturnsItems[i].AvlQty + '</AvlQty>' 
        + '<Qty>' + this.lstReturnsItems[i].Qty + '</Qty>'       
        + '<Gross>' + this.lstReturnsItems[i].Gross + '</Gross>'
        + '<DiscountPercentage>' + this.lstReturnsItems[i].DiscountPercentage + '</DiscountPercentage>'
        + '<DiscountAmount>' + this.lstReturnsItems[i].DiscountAmount + '</DiscountAmount>'
        + '<CGST>' + this.lstReturnsItems[i].CGST + '</CGST>'
        + '<CGSTAmount>' + this.lstReturnsItems[i].CGSTAmount + '</CGSTAmount>'
        + '<SGST>' + this.lstReturnsItems[i].SGST + '</SGST>'
        + '<SGSTAmount>' + this.lstReturnsItems[i].SGSTAmount + '</SGSTAmount>'
        + '<IGST>' + this.lstReturnsItems[i].IGST + '</IGST>'
        + '<IGSTAmount>' + this.lstReturnsItems[i].IGSTAmount + '</IGSTAmount>'
        + '<TotalTax>' + this.lstReturnsItems[i].TotalTax + '</TotalTax>'
        + '<NetTotal>' + this.lstReturnsItems[i].NetTotal + '</NetTotal>'
        + '<TaxType>' + this.lstReturnsItems[i].TaxType + '</TaxType>'
        + '<SGSTAccountId>' + this.lstReturnsItems[i].SGSTAccountId + '</SGSTAccountId>'
        + '<CGSTAccountId>' + this.lstReturnsItems[i].CGSTAccountId + '</CGSTAccountId>'
        + '<IGSTAccountId>' + this.lstReturnsItems[i].IGSTAccountId + '</IGSTAccountId>'
        + '<RefType1>' + this.getControlValue(this.f.ReturnSourceType, 'string') + '</RefType1>'
        + '<RefNo2>' + this.lstReturnsItems[i].RefNo2 + '</RefNo2>'
        + '<RefDate3>' + this.lstReturnsItems[i].RefDate3 + '</RefDate3>'
        + '<RefLineId33>' + this.lstReturnsItems[i].RefLineId33 + '</RefLineId33>'
        + '<RefId>' + this.lstReturnsItems[i].RefId + '</RefId>'
        + '<GstType>' + this.lstReturnsItems[i].TaxType + '</GstType>'
        + '<SalesReturnsId>' + this.lstReturnsItems[i].SalesReturnsId + '</SalesReturnsId>'
        + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
        + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>' 
        + '<HSN>' + this.lstReturnsItems[i].HSN + '</HSN></Table1>'
       
    }
    xml2 = '<NewDataSet>' + rows + '</NewDataSet>';

   

    debugger;
    this.APICall.DBCalling("SaveSalesReturns", xml1, xml2, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {

        debugger;
        $("#loaderParent").hide();
        // this.DbResult= (res);
        this.DbResult = JSON.parse(res['Message']);

        //  var l=this.DbResult.Table[0].length;
        // var tr=this.DbResult.Table[0].DBresult;
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
            //  this.CreateBranches.patchValue({


            this.f.TransactionId.setValue(this.DbResult.Table[0].TransactionId);
            this.f.TransactionNo.setValue(this.DbResult.Table[0].TransactionNo);
            this.VoucherNo=this.DbResult.Table[0].TransactionNo;
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
          this.lstReturnsItems = null;
          this.lstReturnsItems = [];


          if (this.DbResult.Table.length > 0) {   

            this.Search();
            // try {
            //   if (this.DbResult.Table1.length > 0)//lstres[0].Table=="SalesReturns1")
            //   {
            //     //var res1=JSON.parse((( this.DbResult.Table1[0].lstReturnsItems).replace(/\n/g, "")).replace(/'/g,"\""));
            //     var lstresReturnsItems = JSON.parse(((this.DbResult.Table1[0].lstReturnsItems).replace(/\n/g, "")).replace(/'/g, "\""));
            //     var i = 0;
            //     var ReturnsItemsdata = $.map(lstresReturnsItems, function (obj) {
            //       i = i + 1;
            //       obj.SNO = i;
            //       return obj;
            //     });
            //     this.lstReturnsItems = ReturnsItemsdata;
            //   }
            // } catch (exce) { }          
          }          

        }         
        else {



          if (this.DbResult.Table[0].DBresult == -3) {
            (window as any).swal({
              icon: 'warning',
              title: 'Exists',
              text: 'Returns Already Exists.!',
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
    , Show: 'true'
  }



  //AddItemReset=false;
  OnAdd() {
    debugger;
    this.errormsg = "";
    this.EditRecNO = -1;
    this.SelectedProductData = {
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
     
  
      , Show: 'true'
    }
    this.TransactionDate = $("#TransactionDate").val();
    debugger;
    if (this.CompanyStateId != this.SelectedState) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

  }

  // GstTaxFromHSNAndGSTTypeForGridView() {
  //   debugger;
  //   if (this.lstReturnsItems.length > 0) {
  //     var xmlHsnInfo = "";
  //     var rows = "";

  //     for (var i = 0; i < this.lstReturnsItems.length; i++) {

  //       rows = rows + '<Table1><HSN>' + this.lstReturnsItems[i].HSN + '</HSN></Table1>'


  //     }
  //     xmlHsnInfo = '<NewDataSet>' + rows + '</NewDataSet>';




  //     $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

  //     $("#loaderParent").show();
  //     this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo, this.TaxType, this.TransactionDate).subscribe(
  //       (res) => {


  //         $("#loaderParent").click();
  //         debugger;
  //         this.lstDbResult = JSON.parse(res['Message']);



  //         if (this.lstDbResult.Table.length > 0) {
  //           var resultInfo = this.lstDbResult.Table;


  //           for (var i = 0; i < this.lstReturnsItems.length; i++) {
  //             this.lstReturnsItems[i].CGST = 0;
  //             this.lstReturnsItems[i].SGST = 0;
  //             this.lstReturnsItems[i].IGST = 0;

  //             this.lstReturnsItems[i].CGSTAmount = 0;
  //             this.lstReturnsItems[i].SGSTAmount = 0;
  //             this.lstReturnsItems[i].IGSTAmount = 0;
  //             var ResultItem = resultInfo.filter(d => d.HSN === this.lstReturnsItems[i].HSN);
  //             if (ResultItem.length > 0) {

  //               debugger;
  //               for (let j = 0; j < ResultItem.length; j++) {
  //                 if (ResultItem[j].TaxType == "CGST") {
  //                   this.lstReturnsItems[i].CGST = (ResultItem[j].TaxPercentage2);


  //                 }

  //                 if (ResultItem[j].TaxType == "SGST") {
  //                   this.lstReturnsItems[i].SGST = (ResultItem[j].TaxPercentage2);


  //                 }

  //                 if (ResultItem[j].TaxType == "IGST") {
  //                   this.lstReturnsItems[i].IGST = (ResultItem[j].TaxPercentage2);

  //                 }


  //               }
  //             }

  //           }
  //           this.CalculateTotals();
  //         }


  //         else {
  //           // (window as any). swal("Cancelled", "Failed:)", "error");
  //           //this.FormErrormsg="Failed.";

  //         }




  //       }
  //     );
  //   }
  // }

  PrepareSerchStringByField() {

    var searchPartNo = this.getControlValue(this.f.searchPartNo, "string");
    var searchDescription = this.getControlValue(this.f.searchDescription, "string");
    var searchMake = this.getControlValue(this.f.searchMake, "string");
    var searchHSN = this.getControlValue(this.f.searchHSN, "string");

    debugger;
    if (this.SerchType == 'Like') {


      if (searchPartNo != "" || searchDescription != "" || searchMake != "" || searchHSN != "") {
        for (var i = 0; i < this.lstReturnsItems.length; i++) {

          if ((this.lstReturnsItems[i].Partno).toString().includes(searchPartNo) ||

            (this.lstReturnsItems[i].Make).toString().includes(searchDescription) ||
            (this.lstReturnsItems[i].Description).toString().includes(searchMake) ||
            (this.lstReturnsItems[i].HSN).toString().includes(searchHSN)

          ) {



            this.lstReturnsItems[i].Show = 'true';
          } else {
            this.lstReturnsItems[i].Show = 'false';


          }
        }
      }


    }
    else {


      for (var i = 0; i < this.lstReturnsItems.length; i++) {

        if ((this.lstReturnsItems[i].Partno) == ((searchPartNo) != "" ? (searchPartNo) : this.lstReturnsItems[i].Partno) &&

          (this.lstReturnsItems[i].Make) == ((searchMake) != "" ? (searchMake) : this.lstReturnsItems[i].Make) &&
          (this.lstReturnsItems[i].Description) == ((searchDescription) != "" ? (searchDescription) : this.lstReturnsItems[i].Description) &&
          (this.lstReturnsItems[i].HSN) == ((searchHSN) != "" ? (searchHSN) : this.lstReturnsItems[i].HSN)

        ) {



          this.lstReturnsItems[i].Show = 'true';
        } else {
          this.lstReturnsItems[i].Show = 'false';



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

      for (var i = 0; i < this.lstReturnsItems.length; i++) {

        if (

          (this.lstReturnsItems[i].Partno).toString().includes(SearchString) ||
          (this.lstReturnsItems[i].Make).toString().includes(SearchString) ||
          (this.lstReturnsItems[i].HSN).toString().includes(SearchString) ||
          (this.lstReturnsItems[i].Description).toString().includes(SearchString)

          //(this.lstReturnsItems[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {



          this.lstReturnsItems[i].Show = 'true';
        } else {
          this.lstReturnsItems[i].Show = 'false';


        }
      }

    }
    return SearchString;


  }
  Search() {
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));
    this.APICall.UpdatedSelectedPath('./Sales/SalesReturns');
    this.router.navigate(['Sales/SalesReturns']);
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
    return this.CreateSalesReturns.controls;

  }

  lstReturnsItems: any = [];
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
      for (var i = 0; i < this.lstReturnsItems.length; i++) {
        if (data.SNO != this.lstReturnsItems[i].SNO && this.lstReturnsItems[i].Partno == data.Partno
          && this.lstReturnsItems[i].Make == data.Make && this.lstReturnsItems[i].Rate == data.Rate) {
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

 

  lstSalesLineChanges: any = [];
  tempSno: number = 0;
  tempPrice: number = 0;
  
  Insertaline(d, i) {
    debugger
    this.InsertalineIn = i;
    this.lstSalesLineChanges = d;
    this.tempSno = d.SNO;
    this.tempPrice = d.Gross;
  }
  


  EditItemClick(data) {
    this.EditRecNO = 0;
    debugger;
    this.errormsg = "";
    this.SelectedProductData = Object.assign({}, data);

  }
  
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
    debugger;
    if (this.InsertalineIn == 1) {
      debugger;
      var pos1 = (+this.tempSno);
      var lastpos = (+this.lstReturnsItems.length) - 1;
      this.move(lastpos, pos1);

      for (var i = 0; i < this.lstReturnsItems.length; i++) {
        this.lstReturnsItems[i].SNO = i + 1;
      }
    }

  }

  move(from, to) {
    debugger;
    this.lstReturnsItems.splice(to, 0, this.lstReturnsItems.splice(from, 1)[0]);
    return this;
  }


  AddItem(type, data, StockAllotment) {

    debugger;
    if (this.ValidateItem(data)) {
      debugger;
      //let WeekName:string= this.from
      this.lstSalesReturnsItemsStock = StockAllotment;

      for (var i = 0; i < this.lstReturnsItems.length; i++) {
        this.lstReturnsItems[i].Show = 'true';


        if (this.lstReturnsItems[i].SNO == data.SNO) {
         
          this.lstReturnsItems[i].Partno = data.Partno;
          this.lstReturnsItems[i].ItemId = data.ItemId;
          this.lstReturnsItems[i].MakeId = data.MakeId;
          this.lstReturnsItems[i].Description = data.Description;
          this.lstReturnsItems[i].Note = "";
          this.lstReturnsItems[i].Make = data.Make;
          this.lstReturnsItems[i].UOM = data.UOM;
          this.lstReturnsItems[i].UOMId = data.UOMId;
          this.lstReturnsItems[i].Rate = data.Rate;
          this.lstReturnsItems[i].Qty = (+data.Qty);
          this.lstReturnsItems[i].Gross = (+data.Gross);
          this.lstReturnsItems[i].DiscountPercentage = (+ data.DiscountPercentage);
          this.lstReturnsItems[i].DiscountAmount = (+data.DiscountAmount);
          this.lstReturnsItems[i].CGST = (+data.CGST);
          this.lstReturnsItems[i].CGSTAmount = (+data.CGSTAmount);
          this.lstReturnsItems[i].SGST = (+data.SGST);
          this.lstReturnsItems[i].SGSTAmount = (+data.SGSTAmount);
          this.lstReturnsItems[i].IGST = (+data.IGST);
          this.lstReturnsItems[i].IGSTAmount = (+data.IGSTAmount);

//addded the refline id go zero 
          this.lstReturnsItems[i].RefLineId =  this.lstReturnsItems[i].RefLineId;
          this.lstReturnsItems[i].RefId =  this.lstReturnsItems[i].RefId;
          this.lstReturnsItems[i].RefDate3 = this.lstReturnsItems[i].RefDate3;
          this.lstReturnsItems[i].RefNo2 = this.lstReturnsItems[i].RefNo2;
          this.lstReturnsItems[i].RefType1 =  this.lstReturnsItems[i].RefType1;



          if (data.VoucherType == "Import") {
            this.lstReturnsItems[i].BCDPer = (+data.BCDPer);
            this.lstReturnsItems[i].BCDAmount = (+data.BCDAmount);
            this.lstReturnsItems[i].SWSPer = (+data.SWSPer);
            this.lstReturnsItems[i].SWSAmount = (+data.SWSAmount);
            this.lstReturnsItems[i].SWSAccountId = data.SWSAccountId;
            this.lstReturnsItems[i].BCDAccountId = data.BCDAccountId;
          }
          else {
            this.lstReturnsItems[i].BCDPer = 0;
            this.lstReturnsItems[i].BCDAmount = 0;
            this.lstReturnsItems[i].SWSPer = 0;
            this.lstReturnsItems[i].SWSAmount = 0;
            this.lstReturnsItems[i].SWSAccountId = 0;
            this.lstReturnsItems[i].BCDAccountId = 0;
          }
          this.lstReturnsItems[i].TotalTax = (+data.TotalTax);
          this.lstReturnsItems[i].NetTotal = (+data.NetTotal);
          this.lstReturnsItems[i].TaxType = data.TaxType;
          this.lstReturnsItems[i].HSN = data.HSN;
          this.lstReturnsItems[i].SGSTAccountId = data.SGSTAccountId;
          this.lstReturnsItems[i].CGSTAccountId = data.CGSTAccountId;
          this.lstReturnsItems[i].IGSTAccountId = data.IGSTAccountId;
        }
      }
      if (this.EditRecNO == -1) {
        var res =
          ({
            SNO: this.lstReturnsItems.length + 1
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

        if (this.lstReturnsItems.length == 0) {
          this.lstReturnsItems
        }
        else {
          this.lstReturnsItems.push(res);

        }
      }

      if (type == 'Close') {
        $("#btnCloseAddItem").trigger('click');
        this.EditRecNO = 0;
      } else {

        this.EditRecNO = -1;

      }

      this.SNO = this.lstReturnsItems.length + 1;
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
  TotalCharges=0;
  TotalBCD=0;
  TotalSWS=0;
  TotalBeforeTax=0;
  BeforeTax=0;

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
    
    if (this.InvoiceType == 'Warranty Replace') {
      debugger;
      for (let i = 0; i < this.lstReturnsItems.length; i++) {
        this.TotalGross = this.TotalGross + (+this.lstReturnsItems[i].Gross);
      }

    }

    if (this.InvoiceType == 'Invoice' || this.InvoiceType == 'Exclude Tax' || this.InvoiceType == 'Import')
     {


      var ChargesCGST = 0;
      var ChargesSGST = 0;
      var ChargesIGST = 0;
     
      for (let i = 0; i < this.lstReturnsItems.length; i++) {

if(this.lstReturnsItems[i].Qty>0)
{
        this.TotalCharges = (+this.TotalCharges) + (+this.lstReturnsItems[i].CGSTAmount) + (+this.lstReturnsItems[i].SGSTAmount) + (+this.lstReturnsItems[i].IGSTAmount);

        ChargesCGST = (+this.lstReturnsItems[i].CGSTAmount);
        ChargesSGST = (+this.lstReturnsItems[i].SGSTAmount);
        ChargesIGST = (+this.lstReturnsItems[i].IGSTAmount);


        if (this.lstReturnsItems[i].BCDAmount == undefined || this.lstReturnsItems[i].BCDAmount == null || this.lstReturnsItems[i].BCDAmount == '') {
          this.lstReturnsItems[i].BCDAmount = 0;
        }

        if (this.lstReturnsItems[i].SWSAmount == undefined || this.lstReturnsItems[i].SWSAmount == null || this.lstReturnsItems[i].SWSAmount == '') {
          this.lstReturnsItems[i].SWSAmount = 0;
        }

        if (this.lstReturnsItems[i].DiscountAmount == undefined || this.lstReturnsItems[i].DiscountAmount == null || this.lstReturnsItems[i].DiscountAmount == '') {
          this.lstReturnsItems[i].DiscountAmount = 0;
        }

        if (this.lstReturnsItems[i].SGSTAmount == undefined || this.lstReturnsItems[i].SGSTAmount == null || this.lstReturnsItems[i].SGSTAmount == '') {
          this.lstReturnsItems[i].SGSTAmount = 0;
        }

        if (this.lstReturnsItems[i].CGSTAmount == undefined || this.lstReturnsItems[i].CGSTAmount == null || this.lstReturnsItems[i].CGSTAmount == '') {
          this.lstReturnsItems[i].CGSTAmount = 0;
        }
        
        if (this.lstReturnsItems[i].IGSTAmount == undefined || this.lstReturnsItems[i].IGSTAmount == null || this.lstReturnsItems[i].IGSTAmount == '') {
          this.lstReturnsItems[i].IGSTAmount = 0;
        }


        var AfterDiscount = (((+this.lstReturnsItems[i].Gross) + (+this.lstReturnsItems[i].BCDAmount)
          + (+this.lstReturnsItems[i].SWSAmount)) - (+ this.lstReturnsItems[i].DiscountAmount));

        this.lstReturnsItems[i].TotalTax = 0;
        this.lstReturnsItems[i].SGSTAmount = 0;
        this.lstReturnsItems[i].CGSTAmount = 0;

        this.lstReturnsItems[i].IGSTAmount = 0;
        this.lstReturnsItems[i].TotalCGST = 0;
        this.lstReturnsItems[i].TotalSGST = 0;
        this.lstReturnsItems[i].TotalIGST = 0;

        if (this.InvoiceType == 'Exclude Tax') {
          this.lstReturnsItems[i].CGST = 0;
          this.lstReturnsItems[i].SGST = 0;
          this.lstReturnsItems[i].IGST = 0;
        }

        if (this.InvoiceType == 'Invoice' || this.InvoiceType == 'Import') {

          this.lstReturnsItems[i].SGSTAmount = (((+this.lstReturnsItems[i].SGST) * AfterDiscount) / 100);
          this.lstReturnsItems[i].CGSTAmount = (((+this.lstReturnsItems[i].CGST) * AfterDiscount) / 100);
          this.lstReturnsItems[i].IGSTAmount = (((+this.lstReturnsItems[i].IGST) * AfterDiscount) / 100);

          this.lstReturnsItems[i].TotalTax = (+this.lstReturnsItems[i].SGSTAmount) + (+this.lstReturnsItems[i].CGSTAmount)
            + (+this.lstReturnsItems[i].IGSTAmount);

          this.TotalCGST = this.TotalCGST + (+this.lstReturnsItems[i].CGSTAmount);
          this.TotalSGST = this.TotalSGST + (+this.lstReturnsItems[i].SGSTAmount);
          this.TotalIGST = this.TotalIGST + (+this.lstReturnsItems[i].IGSTAmount);

          this.TotalBCD = this.TotalBCD + (+this.lstReturnsItems[i].BCDAmount);
          this.TotalSWS = this.TotalSWS + (+this.lstReturnsItems[i].SWSAmount);

        }

       
       this.BeforeTax = AfterDiscount;

       this.TotalCGST = this.TotalCGST + (+ChargesCGST);
       this.TotalSGST = this.TotalSGST + (+ChargesSGST);
       this.TotalIGST = this.TotalIGST + (+ChargesIGST);

        this.TotalBeforeTax = this.TotalBeforeTax + (+ this.BeforeTax);

        this.TotalGross = this.TotalGross + (+this.lstReturnsItems[i].Gross);

        this.TotalDiscount = this.TotalDiscount + (+this.lstReturnsItems[i].DiscountAmount);

        this.TotalTax = this.TotalTax + (+this.lstReturnsItems[i].TotalTax);     

        this.Total = this.Total + (+this.lstReturnsItems[i].NetTotal);

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
  }

   
   // this.TotalTax = this.TotalTax + (+ChargesCGST) + (+ChargesSGST) + (+ChargesIGST);

    // this.AfterDiscount = (this.TotalGross + this.TotalBeforeTax + this.TotalCharges) - (this.TotalDiscount) + (this.TotalCharges)
    //  + (this.TotalBCD)  +  (this.TotalSWS);
    this.TotalBeforeTax = this.TotalBeforeTax + this.TotalCharges;
    this.AfterDiscount = ( this.TotalBeforeTax) - ((this.TotalDiscount)      + (this.TotalBCD) + (this.TotalSWS));
    //this.Total=(+this.Total)+(+this.TotalCharges);
    //this.Total = this.TotalBeforeTax + this.TotalTax;
  
  }


  DeleteItem(e){
    debugger;
   
    this.RemoveItemClick(e)
  
  }

  RemoveItemClick(event) {
    debugger;
    var sliceIndex = -1;
    for (var i = 0; i < this.lstReturnsItems.length; i++) {
      this.lstReturnsItems[i].Show = 'true';

      if (this.lstReturnsItems[i].SNO == event.SNO) {
        sliceIndex = i;
      }
    }
    for (var i = 0; i < this.lstSalesReturnsItemsStock.length; i++) {
      this.lstSalesReturnsItemsStock[i].Show = 'true';

      if (this.lstSalesReturnsItemsStock[i].SNO == event.SNO && this.lstSalesReturnsItemsStock[i].Partno == event.Partno && this.lstSalesReturnsItemsStock[i].Rate == event.Rate) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstReturnsItems.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstReturnsItems.length; i++) {
        this.lstReturnsItems[i].SNO = i + 1;
      }

      this.lstSalesReturnsItemsStock.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstSalesReturnsItemsStock.length; i++) {
        this.lstSalesReturnsItemsStock[i].SNO = i + 1;
      }
    }
    //this.EditRecNO=-1;
    this.SNO = this.lstReturnsItems.length + 1;
    // this.ClearSelectedValues();
    this.CalculateTotals();
    $("#btnCloseAddItem").trigger('click');
    this.ReArrangeSNo();
  }

  ReArrangeSNo() {
    for (var i = 0; i < this.lstReturnsItems.length; i++) {
      for (var j = 0; j < this.lstSalesReturnsItemsStock.length; j++) {

        if (this.lstSalesReturnsItemsStock[j].Partno == this.lstReturnsItems[i].Partno && this.lstSalesReturnsItemsStock[j].Rate == this.lstReturnsItems[i].Rate) {

          this.lstSalesReturnsItemsStock[j].SNO = i + 1

        }

      }
    }

  }

  close() {
    debugger;
    for (var i = 0; i < this.lstReturnsItems.length; i++) {
      if (this.lstReturnsItems[i].Partno == "") {
        this.lstReturnsItems.splice(i, 1);
        i = 0;
      }
    }
    $("#btnCloseQuotationPrint").click();
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




  NumberSequenceValueChange(value) {
    debugger;
    this.f.SequenceNumberId.setValue(value);

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
    var that = this;

    //   (window as any).$("#RequiredDate").daterangepicker({

    //     onSelect: function(dateText) {


    //       debugger;
    //       //  console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    //         this.f.RequiredDate.setValue($("#RequiredDate").val());
    //     }
    // })
  //  this.LoadSalesInvoice();
   // this.LoadDC();

    this.ViewSalesAccount();
    this.ViewDiscountAccount();
    this.LoadLocations();
    this.LoadBinsByLocation();
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



  }
  lstShippings: any = [];
  lstDbResult: any = [];


  DeviceType = "";
  StoreSalesReturns: StoreSalesReturns;
  DefaultSalesAccount = 0;
  DefaultDiscountAccount = 0;
  ngOnInit() {
    debugger;
    this.DeviceType = localStorage.getItem('DeviceType')

    this.StoreSalesReturns = new StoreSalesReturns;

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {
      debugger;
      this.StoreAccountingSettings = (Asresult[0]);

      this.DefaultSalesAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Sales Returns'; }))[0].AccountId;
      this.DefaultDiscountAccount = (this.StoreAccountingSettings.lstDefaultAccount.filter((x) => { return x.Name == 'Discount Received'; }))[0].AccountId;



    }

    //var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "SalesReturns"; });
    if (result.length > 0) {

      this.StoreSalesReturns = (result[0]);
      // if (this.StoreSalesReturns.ModifiedDate.toString().includes('India')) {

      //   var date = new Date(this.StoreSalesReturns.ModifiedDate);
      //   this.StoreSalesReturns.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
      // }
      this.ModifiedDate = this.StoreSalesReturns.ModifiedDate;
      this.BillToStateCode = this.StoreSalesReturns.BillToStateCode;
      this.BillToStateName = this.StoreSalesReturns.BillToStateName;
      this.SelectedState = this.StoreSalesReturns.SelectedState;
      this.VoucherNo=this.StoreSalesReturns.TransactionNo;
      this.DispalyCustomerName = this.StoreSalesReturns.PartyName;
      this.DisplayCustomerId = this.StoreSalesReturns.PartyId;
      this.StoreSalesReturns.Salesaccount = ((typeof (this.StoreSalesReturns.Salesaccount) == 'undefined' ? 0 : this.StoreSalesReturns.Salesaccount) == 0 ? this.DefaultSalesAccount : this.StoreSalesReturns.Salesaccount);
      this.StoreSalesReturns.Discountaccount = ((typeof (this.StoreSalesReturns.Discountaccount) == 'undefined' ? 0 : this.StoreSalesReturns.Discountaccount) == 0 ? this.DefaultDiscountAccount : this.StoreSalesReturns.Discountaccount);
      this.PartyGSTNo = this.StoreSalesReturns.PartyGSTNo;
      this.lstReturnsItems = this.StoreSalesReturns.lstReturnsItems == null ? [] : this.StoreSalesReturns.lstReturnsItems;
      this.TaxType = this.StoreSalesReturns.TaxType;
      var i = 0;
      var that = this;
      var lstReturnsItemsdata = $.map(this.lstReturnsItems, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      this.lstReturnsItems = lstReturnsItemsdata;



// var refTypeSelection = new Option(this.StoreSalesReturns.ReturnSourceType, this.StoreSalesReturns.ReturnSourceType, true, true);
// (<any>$('#drpReference')).append(refTypeSelection).trigger('change');

this.SourceTypeChange(this.StoreSalesReturns.ReturnSourceType)

var refSelection = new Option(this.StoreSalesReturns.ReturnSourceNo, this.StoreSalesReturns.ReturnSourceId.toString(), true, true);
(<any>$('#drpReference')).append(refSelection).trigger('change');


      debugger;
      if (this.StoreSalesReturns.TransactionDate != '') {

        try {
          // var RequiredDate= formatDate(new Date(this.StoreSalesReturns.RequiredDate), 'MM/dd/yyyy', 'en');
          var TransactionDate = formatDate(new Date(this.StoreSalesReturns.TransactionDate), 'MM/dd/yyyy', 'en');
          var TransactionTime = formatDate(new Date(this.StoreSalesReturns.TransactionTime), 'HH:mm', 'en');
        } catch (ex) {

          var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
          var TransactionTime = formatDate(new Date(), 'HH:mm', 'en');

        }
      } else {
        // var RequiredDate= formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionTime = formatDate(new Date(), 'HH:mm', 'en');
      }
      debugger;


      // $("#RequiredDate").val(RequiredDate)
      $("#TransactionDate").val(TransactionDate)
      $("#TransactionTime").val(TransactionTime)
      this.TransactionDate = TransactionDate;

      this.CreateSalesReturns.patchValue(this.StoreSalesReturns);
this.f.TransactionId.setValue(this.StoreSalesReturns.TransactionId);
     // this.getTransactionDatails();



    }
  

    var that = this;
    this.CreateSalesReturns.valueChanges.subscribe(value => {
     
      that.StoreSalesReturns.SequenceNumberId = value.SequenceNumberId;
      that.StoreSalesReturns.Contactno = value.Contactno;
      that.StoreSalesReturns.Email = value.Email;
      that.StoreSalesReturns.Salesaccount = value.Salesaccount;
      that.StoreSalesReturns.Discountaccount = value.Discountaccount;
      that.StoreSalesReturns.BillToStateCode = that.BillToStateCode;
      that.StoreSalesReturns.BillToStateName = that.BillToStateName;
      that.StoreSalesReturns.Billto = value.Billto;
      that.StoreSalesReturns.SelectedState = that.SelectedState;
      that.StoreSalesReturns.TaxType = that.TaxType;
      that.StoreSalesReturns.ReturnSourceType = value.ReturnSourceType;
      //.StoreSalesReturns.ReturnSourceId = value.ReturnSourceId;
     // that.StoreSalesReturns.ReturnSourceNo = value.ReturnSourceNo;
      that.StoreSalesReturns.LocationId = value.LocationId;
      that.StoreSalesReturns.LocationName = value.LocationName;
      that.StoreSalesReturns.BinId = value.BinId;
      that.StoreSalesReturns.BinName = value.BinName;
      that.StoreSalesReturns.TransactionTime = value.TransactionTime;
      that.StoreSalesReturns.TransactionDate = value.TransactionDate;
      that.StoreSalesReturns.TransactionId = value.TransactionId;
      that.StoreSalesReturns.TransactionNo = value.TransactionNo;
      that.StoreSalesReturns.PartyName = value.PartyName;
      that.StoreSalesReturns.PartyGSTNo = this.PartyGSTNo;
      that.StoreSalesReturns.PartyId = value.PartyId;

     
     // that.StoreSalesReturns.ReturnSourceDate = value.ReturnSourceDate;


    
      

      that.StoreSalesReturns.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate.toString());
      that.StoreSalesReturns.ViewName = 'SalesReturns';
      that.StoreSalesReturns.lstReturnsItems = that.lstReturnsItems;

     
     

      that.StoreSalesReturns.lstReturnsItems = that.lstReturnsItems;

      that.store.dispatch(new TabStore.AddTab(that.StoreSalesReturns));
    });

    this.Total=this.StoreSalesReturns.Total;
    this.TotalTax=this.StoreSalesReturns.TotalTax;
    this.AfterDiscount=this.StoreSalesReturns.AfterDiscount;
    this.TotalGross=this.StoreSalesReturns.TotalGross;
    this.TotalDiscount=this.StoreSalesReturns.TotalDiscount;
  this.TotalCGST=this.StoreSalesReturns.TotalCGST;
  this.TotalSGST=this.StoreSalesReturns.TotalSGST;
  this.TotalIGST=this.StoreSalesReturns.TotalIGST;

  }

  PrintCloseClick() {
    this.ReturnsData = null;
    $("#btnCloseReturnsPrint").click();

  }

  SelectedState = 0;
  SelectedDate = ($("#TransactionDate").val());
  BillToStateName = '';
  BillToStateCode = '';
  selectedCustomer: Customer;
  CustomerValueChange(event) {
    this.BillToStateName = '';
    this.BillToStateCode = '';
    debugger;
    this.selectedCustomer = Object.assign({}, event);
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



    //billto
    if (this.CompanyStateId != this.SelectedState
    ) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

   // this.GstTaxFromHSNAndGSTTypeForGridView();
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


  Customer: Customer;
  CustomerMaster() {
    debugger;
    this.Customer = new Customer;
    if (this.selectedCustomer != undefined && this.selectedCustomer != null) {
      this.selectedCustomer.ViewName = "RequestFromDC";
      this.Customer = Object.assign({}, this.selectedCustomer);
    }
    this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.Customer.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.Customer));
    this.router.navigate(['Sales/CreateCustomer']);
  }

  Discounttab: string = "";
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

  SearchItem()
  {
    try{
      debugger;
var searchVal=$('#txtSearchItem').val();

// var result=this.lstReturnsItems.includes(function(x){
// x.Partno.includes(searchVal);

// });

//this.lstReturnsItems=result;
    }
    catch(error){}
  }

  
  InvoiceType="";
  ReturnQtyChange(event,_SelecedRow)
  {
    debugger;
    var returnqty=event.target.value;  
    var invoiceqty=0;

    if(this.StoreSalesReturns.ReturnSourceType == 'DC')
    {
      invoiceqty = _SelecedRow.DCQty;
    }
    else{
      invoiceqty = _SelecedRow.SIQty;
    }    

    if ((+invoiceqty) < (+returnqty)) {     
      _SelecedRow.Qty=0;
      
      (window as any).swal("Invalid", "Invalid Return Qty", "error");

    } else {
      _SelecedRow.Qty=returnqty;

      if(returnqty==0)
      {
        _SelecedRow.AvlQty = (+invoiceqty) ;
        _SelecedRow.Gross = 0;
      }
      else
      {
      _SelecedRow.AvlQty =( (+invoiceqty) - (+ returnqty));
      _SelecedRow.Gross = (+_SelecedRow.Qty) * (+_SelecedRow.Rate);
      }
     

 var TotalTax = 0;
 var GrossA = (+_SelecedRow.Gross);

 if ((+ _SelecedRow.DiscountPercentage) > 0) {
   _SelecedRow.DiscountAmount = ((GrossA * (+ _SelecedRow.DiscountPercentage)) / 100);

 }
 var AfterDiscount = (GrossA - (+ _SelecedRow.DiscountAmount));


   
     if(_SelecedRow.CGST >0)
     {
     _SelecedRow.CGSTAmount = (((+_SelecedRow.CGST) * AfterDiscount) / 100);

     TotalTax = TotalTax + ((+ _SelecedRow.CGSTAmount));
     
    }
  

   if (_SelecedRow.SGST >0) {
   
     _SelecedRow.SGSTAmount = (((+_SelecedRow.SGST) * AfterDiscount) / 100);
     TotalTax = TotalTax + ((+ _SelecedRow.SGSTAmount));
     
   }

   if (_SelecedRow.IGST > 0) {
  
     _SelecedRow.IGSTAmount = (((+_SelecedRow.IGST) * AfterDiscount) / 100);
     TotalTax = TotalTax + ((+ _SelecedRow.IGSTAmount));

   }
 
   this.InvoiceType=_SelecedRow.VoucherType ;

 if (_SelecedRow.VoucherType == "Import") {
   try {

     var cust1 = (((+ _SelecedRow.Gross) * (+_SelecedRow.BCDPer)) / 100);
     var sw1 = (((+cust1) * (+_SelecedRow.SWSPer)) / 100);

     TotalTax = TotalTax + ((+ cust1));
     TotalTax = TotalTax + ((+ sw1));

     _SelecedRow.BCDAmount = cust1;
     _SelecedRow.SWSAmount = sw1;

   }
   catch (error) { }

   this.CalculateTotals();
 }


 //var PerItemTax = TotalTax / (+_SelecedRow.Qty);

 $("#PriceInclusiveTax").val((+_SelecedRow.Rate) + (+_SelecedRow.Qty));
 _SelecedRow.TotalTax = (TotalTax);

 _SelecedRow.NetTotal = ((AfterDiscount + TotalTax).toFixed(2));

 this.CalculateTotals();
}
  }


 
}

