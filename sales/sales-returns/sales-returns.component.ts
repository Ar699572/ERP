import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import { StoreSalesReturns } from 'src/app/Store/StoreSalesReturns';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-sales-returns',
  templateUrl: './sales-returns.component.html',
  styleUrls: ['./sales-returns.component.css']
})
export class SalesReturnsComponent implements OnInit {
  errormsg = "";
  showError = false;
  SalesReturns: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) {

    this.SalesReturns = formBuilder.group({
      TransactionNo: new FormControl(''),     
      Customername: new FormControl(''),
      Contactno: new FormControl(''),
      CustomerId: new FormControl(0),
      SearchString: new FormControl('')
    });

  }

  StoreSalesReturns: StoreSalesReturns;
  XmlEdit = "";


  QuotDateChange(e) {

  }

  CreateSalesReturns(xml) {

    debugger;
    //this.APICall.SetViewData(xml);


    this.StoreSalesReturns = new StoreSalesReturns;


    this.StoreSalesReturns.SequenceNumberId = xml.SequenceNumberId;
    this.StoreSalesReturns.Contactno = xml.Contactno;

    this.StoreSalesReturns.Email = xml.Email;

    this.StoreSalesReturns.Billto = xml.Billto;

    this.StoreSalesReturns.BillToStateCode = xml.BillToStateCode;
    this.StoreSalesReturns.BillToStateName = xml.BillToStateName;
    this.StoreSalesReturns.TaxType = xml.TaxType;

    this.StoreSalesReturns.LocationId = xml.LocationId;
    this.StoreSalesReturns.LocationName = xml.LocationName;
    this.StoreSalesReturns.BinId = xml.BinId;
    this.StoreSalesReturns.BinName = xml.BinName;
    this.StoreSalesReturns.Billto = xml.Billto;



    this.StoreSalesReturns.Salesaccount = xml.Salesaccount;
    this.StoreSalesReturns.Discountaccount = xml.Discountaccount;
    this.StoreSalesReturns.Notes = xml.Notes;

    this.StoreSalesReturns.ReturnSourceType = xml.ReturnSourceType;
    this.StoreSalesReturns.ReturnSourceId = xml.ReturnSourceId;
    this.StoreSalesReturns.ReturnSourceNo = xml.ReturnSourceNo;

    this.StoreSalesReturns.TransactionTime = xml.TransactionTime;

    this.StoreSalesReturns.TransactionDate = xml.TransactionDate;
    this.StoreSalesReturns.TransactionId = xml.TransactionId;
    this.StoreSalesReturns.TransactionNo = xml.TransactionNo;
    this.StoreSalesReturns.PartyId = xml.PartyId;
    this.StoreSalesReturns.PartyName = xml.PartyName;
    this.StoreSalesReturns.PartyGSTNo = xml.PartyGSTNo;


    this.StoreSalesReturns.ReturnSourceDate = xml.ReferenceDate;

    this.StoreSalesReturns.Total = xml.Total;
    this.StoreSalesReturns.TotalTax = xml.TotalTax;
    this.StoreSalesReturns.AfterDiscount = xml.AfterDiscount;
    this.StoreSalesReturns.TotalGross = xml.TotalGross;
    this.StoreSalesReturns.TotalDiscount = xml.TotalDiscount;
    this.StoreSalesReturns.TotalCGST = xml.TotalCGST;
    this.StoreSalesReturns.TotalSGST = xml.TotalSGST;
    this.StoreSalesReturns.TotalIGST = xml.TotalIGST;

    this.StoreSalesReturns.ModifiedDate = (xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());
    this.StoreSalesReturns.ViewName = xml.ViewName;


    if (xml.lstReturnsItems != null && typeof (xml.lstReturnsItems) != undefined) {
      var res = ((xml.lstReturnsItems).replace(/\n/g, "")).replace(/'/g, "\"");

      this.StoreSalesReturns.lstReturnsItems = JSON.parse(res);

    }




    this.APICall.UpdatedSelectedPath('./Sales/CreateSalesReturns');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreSalesReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreSalesReturns));
    this.router.navigate(['Sales/CreateSalesReturns']);
  }


  //#region "ShortCuts"
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.ctrlKey || event.metaKey) {

      switch (String.fromCharCode(event.which).toLowerCase()) {


        case 'a':

          event.preventDefault();
          this.OnAdd();

          break;


      }
    }

  }
  //#endregion "ShortCuts"



  OnAdd() {
    debugger;
    this.StoreSalesReturns = new StoreSalesReturns;
    this.APICall.UpdatedSelectedPath('./Sales/CreateSalesReturns');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    //this.store.dispatch(new  TabStore.AddTab(this.StoreSalesReturns));
    this.StoreSalesReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreSalesReturns));


    this.router.navigate(['Sales/CreateSalesReturns']);
  }

  get f() {
    return this.SalesReturns
      .controls;
  }

  DeviceType = "";

  ngOnInit() {
    this.DeviceType = localStorage.getItem('DeviceType');

    this.StoreSalesReturns = new StoreSalesReturns;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    if (result.length > 0) {
      this.StoreSalesReturns = (result[0]);
      var RefString = "";
      this.ViewandSearchSalesReturns(RefString);

    } else {

      this.ViewandSearchSalesReturns("");
    }


    this.LoadCustomers();
    debugger;
    this.FromDate = "04/01/2021";

    if (this.FromDate != '') {
      $("#FromDate").val(formatDate(new Date(this.FromDate), 'MM/dd/yyyy', 'en'));

    } else {
      this.FromDate = $("#FromDate").val(formatDate(new Date(), 'MM/dd/yyyy', 'en'));

    }
    if (this.ToDate == undefined) {
      this.ToDate = "";
    }
    if (this.ToDate != '') {
      $("#ToDate").val(formatDate(new Date(this.ToDate), 'MM/dd/yyyy', 'en'));

    } else {
      this.ToDate = $("#ToDate").val(formatDate(new Date(), 'MM/dd/yyyy', 'en'));

    }
  }
  FromDate: any;
  ToDate: any;

  ngAfterViewInit() {

    // (<any>$("#drpCustomer")).select2();
    // this.LoadCustomers();


  }


  lstSalesReturns: any = [];
  lstDbResult: any = [];
  ViewandSearchSalesReturns(RefString) {


    if (AppSettings.ShowLoaderOnView) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }
    var sstring = "";
    if (RefString == '') {
      sstring = (this.GetSearchString());
    } else {

      sstring = RefString;
      this.FilterType = "All";
    }

    debugger;
    this.APICall.DBCalling("ViewSalesReturns", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstSalesReturns = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstSalesReturns = this.lstDbResult.Table;


          var result = "";
          if (this.FromDate != undefined && this.FromDate != null) {
            result = this.lstSalesReturns.filter((x) => { return formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') > this.FromDate && formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') < this.ToDate; });
          }
          this.lstSalesReturns = result;
          debugger;
          for (var i = 0; i < this.lstSalesReturns.length; i++) {
            this.TotalAmount = this.TotalAmount + (+this.lstSalesReturns[i].Total)
            //  this.TotalCharges=this.TotalCharges+(+this.lstSalesReturns[i].TotalCharges)
            this.TotalGross = this.TotalGross + (+this.lstSalesReturns[i].TotalGross)
            this.TotalTax = this.TotalTax + (+this.lstSalesReturns[i].TotalTax)
            this.TotalDiscount = this.TotalDiscount + (+this.lstSalesReturns[i].TotalDiscount)
            this.totalAmnt = this.totalAmnt + (+this.lstSalesReturns[i].Total)
          }

          if (this.lstSerchableFields.length == 0) {


            var stringDbFld = this.lstDbResult.Table[0].SerchableFields
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(stringDbFld, "text/xml");

            var sizex = xmlDoc.getElementsByTagName("ControlName");

            for (var i = 0; i < sizex.length; i++) {



              this.lstSerchableFields.push(


                ({
                  ControlName: xmlDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue

                  , DBField: xmlDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue

                })

              );
            }
          }




          if (this.lstSerchableFields.length == 0) {


            var stringDbFld = this.lstDbResult.Table[0].SerchableFields
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(stringDbFld, "text/xml");

            var sizex = xmlDoc.getElementsByTagName("ControlName");

            for (var i = 0; i < sizex.length; i++) {



              this.lstSerchableFields.push(


                ({
                  ControlName: xmlDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue

                  , DBField: xmlDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue

                })

              );
            }
          }
        }

        $("#loaderParent").hide();
      });
  }


  //#region "getControlValue"
  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }
  //#endregion "getControlValue"

  //#region "SearchPanelLogic"




  SearchClick() {
    this.ViewandSearchSalesReturns("");
  }
  lstSerchableFields: any = [];





  PrepareSerchStringByField(): string {


    var FldSerchString = "";
    if (this.lstSerchableFields.length > 0) {

      var CustomerName = this.getControlValue(this.f.CustomerName, "string");
      var CustomerNameDBField = "";


      var TransactionNo = this.getControlValue(this.f.TransactionNo, "string");
      var TransactionNoDBField = "";




      var Contactno = this.getControlValue(this.f.Contactno, "string");
      var ContactnoDBField = "";





      for (var i = 0; i < this.lstSerchableFields.length; i++) {

        debugger;
        if (this.lstSerchableFields[i].ControlName == "CustomerName") {
          CustomerNameDBField = this.lstSerchableFields[i].DBField;
        }

        if (this.lstSerchableFields[i].ControlName == "TransactionNo") {
          TransactionNoDBField = this.lstSerchableFields[i].DBField;
        }

        if (this.lstSerchableFields[i].ControlName == "Contactno") {
          ContactnoDBField = this.lstSerchableFields[i].DBField;
        }




      }
      debugger;
      if (this.SerchType == 'Like') {


        if (TransactionNo != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + TransactionNoDBField + " Like'" + TransactionNo + "%'") : (TransactionNoDBField + " Like'" + TransactionNo + "%'");
        }


        if (CustomerName != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + CustomerNameDBField + " Like'" + CustomerName + "%'") : (CustomerNameDBField + " Like'" + CustomerName + "%'");
        }


        if (Contactno != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + ContactnoDBField + " Like'" + Contactno + "%'") : (ContactnoDBField + " Like'" + Contactno + "%'");
        }







      }
      else {

        if (TransactionNo != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + TransactionNoDBField + " ='" + TransactionNo + "'") : (TransactionNoDBField + " ='" + TransactionNo + "'");
        }

        if (CustomerName != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + CustomerNameDBField + " ='" + CustomerName + "'") : (CustomerNameDBField + " ='" + CustomerName + "'");
        }


        if (Contactno != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + ContactnoDBField + " ='" + Contactno + "'") : (ContactnoDBField + " ='" + Contactno + "'");
        }




      }
    }
    return FldSerchString;
  }
  FilterType = 'All'
  GetSearchString(): string {
    debugger;
    var SearchString = "";
    if (this.FilterType != 'All') {
      SearchString = this.PrepareSerchStringByField();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")
    }
    return SearchString;
  }
  
  FilterTypeChange(event) {
    if (AppSettings.ExicuteDebugger) {
      debugger;
    }

    if (this.SerchType == 'Like' && event.target.checked == true) {
      this.FilterType = (event.target.checked == true ? 'All' : 'Field');
    } else {

      event.target.checked = false;
      this.FilterType = 'Field';

    }
  }

  SerchType = 'Like'
  SerchTypeChange(ChangedValue) {
    if (AppSettings.ExicuteDebugger) {
      debugger;
    }


    if (ChangedValue == false) {
      this.SerchType = 'Equal'
      if (this.FilterType == 'All')
        $('#customSwitch').trigger('click');

    } else {
      this.SerchType = 'Like'
    }
  }

  //#endregion "SearchPanelLogic"

  Clear() {
    this.ViewandSearchSalesReturns("");
    // this.Total=0;
    $('#drpCustomer').val(null).trigger('change');
  }

  TotalAmount = 0;
  TotalCharges = 0;
  TotalGross = 0;
  TotalDiscount = 0;
  TotalTax = 0;
  totalAmnt = 0;
  GetCustomerWiseSalesReturns() {
    this.TotalAmount = 0;
    this.TotalCharges = 0;
    this.TotalGross = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.totalAmnt = 0;
    if (this.f.CustomerId.value > 0) {
      debugger;
      var CustId = this.f.CustomerId.value

      this.f.SearchString = CustId.toString();
      this.FromDate = $('#fromDate').val();
      this.ToDate = $('#toDate').val();
      this.ViewandSearchSalesReturns(this.f.SearchString);

    }
  }

  LoadCustomers() {

    var that = this;
    debugger;
    (<any>$("#drpCustomer")).select2({
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

            return JSON.stringify({ "Operation": 'ViewCustomers', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;
          var yourArrayData = (JSON.parse(response['Message'])).Table;


          var data = $.map(yourArrayData, function (obj) {
            debugger;
            obj.id = obj.CustomerId;
            obj.text = obj.Customername;

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
    $('#drpCustomer').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {

        debugger;
        that.f.CustomerId.setValue((<any>e).params.data.id);
        that.f.Customername.setValue((<any>e).params.data.text);

      }


    });
    var HSNselection = new Option(this.f.Customername.value, this.f.CustomerId.value.toString(), true, true);

    (<any>$('#drpCustomer')).append(HSNselection).trigger('change');

    $("#drpCustomer").on("select2:unselecting", function (e) {


      that.f.CustomerId.setValue(0);
      that.f.Customername.setValue('');

    });

  }

}


