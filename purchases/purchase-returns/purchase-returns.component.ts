import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import { StorePurchaseReturns } from 'src/app/Store/StorePurchaseReturns';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-purchase-returns',
  templateUrl: './purchase-returns.component.html',
  styleUrls: ['./purchase-returns.component.css']
})
export class PurchaseReturnsComponent implements OnInit {
 
  errormsg = "";
  showError = false;
  PurchaseReturns: FormGroup;
  StorePurchaseReturns: StorePurchaseReturns;
  XmlEdit = "";
  DeviceType = "";
  FromDate: any;
  ToDate: any;
  lstPurchaseReturns: any = [];
  lstDbResult: any = [];
  FilterType:string='All';
  TotalAmount = 0;
  TotalCharges = 0;
  TotalGross = 0;
  TotalDiscount = 0;
  TotalTax = 0;
  totalAmnt = 0;
  lstSerchableFields:any=[];

  constructor(private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>)
  {
    this.PurchaseReturns = formBuilder.group({
      TransactionNo: new FormControl(''),
      CustomerName: new FormControl(''),     
      VendorId: new FormControl(0),
      SearchString: new FormControl('')
    });
  }

  get f() {
    return this.PurchaseReturns.controls;
  } 
  

  ngOnInit() {

    this.DeviceType = localStorage.getItem('DeviceType');

    this.StorePurchaseReturns = new StorePurchaseReturns;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    if (result.length > 0) {
      this.StorePurchaseReturns = (result[0]);
      var RefString = "";
      this.ViewandSearchSalesReturns(RefString);

    } else {

      this.ViewandSearchSalesReturns("");
    }


   
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

  ngAfterViewInit() {
  

  }

  SearchClick()
  {}

  OnAdd() {
    debugger;
    this.StorePurchaseReturns = new StorePurchaseReturns;
    this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseReturns');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    //this.store.dispatch(new  TabStore.AddTab(this.StoreSalesReturns));
    this.StorePurchaseReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StorePurchaseReturns));
    this.router.navigate(['Purchase/CreatePurchaseReturns']);
  }

  CreatePurchaseReturns(xml) {
    debugger;
   
    this.StorePurchaseReturns = new StorePurchaseReturns;

    this.StorePurchaseReturns.SequenceNumberId = xml.SequenceNumberId;
    this.StorePurchaseReturns.contactNo = xml.contactNo;

    this.StorePurchaseReturns.email = xml.email;

    this.StorePurchaseReturns.billto = xml.billto;

   // this.StorePurchaseReturns.BillToStateCode = xml.BillToStateCode;
   // this.StorePurchaseReturns.BillToStateName = xml.BillToStateName;
    this.StorePurchaseReturns.gsttype = xml.gsttype;

     this.StorePurchaseReturns.LocationId = xml.LocationId;
    this.StorePurchaseReturns.Location = xml.LocationName;
    this.StorePurchaseReturns.BinId = xml.BinId;
    this.StorePurchaseReturns.Bin = xml.BinName;
    
this.StorePurchaseReturns
    this.StorePurchaseReturns.Purchaseaccount = xml.Purchaseaccount;
     this.StorePurchaseReturns.Discountaccount = xml.Discountaccount;
     this.StorePurchaseReturns.remarks = xml.remarks;

     this.StorePurchaseReturns.ReturnSourceType = xml.ReturnSourceType;
     this.StorePurchaseReturns.ReturnSourceId = xml.ReturnSourceId;
     this.StorePurchaseReturns.ReturnSourceNo = xml.ReturnSourceNo;
     this.StorePurchaseReturns.ReturnSourceDate = xml.ReturnSourceDate;

     this.StorePurchaseReturns.time = xml.time;
     this.StorePurchaseReturns.date = xml.TransactionDate;
     this.StorePurchaseReturns.PurchaseReturnsId = xml.PurchaseReturnsId;
     this.StorePurchaseReturns.Invoiceno = xml.TransactionNo;
this.StorePurchaseReturns.purchaseaccount=xml.purchaseaccount;
this.StorePurchaseReturns.Discountaccount=xml.discountaccount;

this.StorePurchaseReturns.Location=xml.Location;
this.StorePurchaseReturns.LocationId=xml.LocationId;
this.StorePurchaseReturns.Bin=xml.Bin;
this.StorePurchaseReturns.BinId=xml.BinId;

     this.StorePurchaseReturns.VendorId = xml.supplier;
     this.StorePurchaseReturns.VendorName = xml.VendorName;
     this.StorePurchaseReturns.VendorGSTNo = xml.VendorGSTNo;

    this.StorePurchaseReturns.Total = xml.Total;
    this.StorePurchaseReturns.TotalTax = xml.TotalTax;
    this.StorePurchaseReturns.AfterDiscount = xml.AfterDiscount;
    this.StorePurchaseReturns.TotalGross = xml.TotalGross;
    this.StorePurchaseReturns.TotalDiscount = xml.totaldiscount;
    this.StorePurchaseReturns.TotalCGST = xml.TotalCGST;
    this.StorePurchaseReturns.TotalSGST = xml.TotalSGST;
    this.StorePurchaseReturns.TotalIGST = xml.TotalIGST;

    this.StorePurchaseReturns.ModifiedDate = (xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());
    this.StorePurchaseReturns.ViewName = xml.ViewName;


    if (xml.lstItems != null && typeof (xml.lstItems) != undefined) {
      var res = ((xml.lstItems).replace(/\n/g, "")).replace(/'/g, "\"");

      this.StorePurchaseReturns.lstReturnsItems = JSON.parse(res);

    }
    this.APICall.UpdatedSelectedPath('./Purchase/CreatePurchaseReturns');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StorePurchaseReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StorePurchaseReturns));
    this.router.navigate(['Purchase/CreatePurchaseReturns']);
  }


 

 



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
    this.APICall.DBCalling("ViewPurchaseReturns", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);

        this.lstPurchaseReturns = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstPurchaseReturns = this.lstDbResult.Table;


          var result = "";
          if (this.FromDate != undefined && this.FromDate != null) {
            result = this.lstPurchaseReturns.filter((x) => { return formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') > this.FromDate && formatDate(new Date(x.TransactionDate), 'yyyy/MM/dd', 'en') < this.ToDate; });
          }
          this.lstPurchaseReturns = result;
          debugger;
          for (var i = 0; i < this.lstPurchaseReturns.length; i++) {
            this.TotalAmount = this.TotalAmount + (+this.lstPurchaseReturns[i].Total)
            this.TotalGross = this.TotalGross + (+this.lstPurchaseReturns[i].TotalGross)
            this.TotalTax = this.TotalTax + (+this.lstPurchaseReturns[i].TotalTax)
            this.TotalDiscount = this.TotalDiscount + (+this.lstPurchaseReturns[i].TotalDiscount)
            this.totalAmnt = this.totalAmnt + (+this.lstPurchaseReturns[i].Total)
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
                })   );
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


 
  
  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }

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

  Clear() {
    this.ViewandSearchSalesReturns("");
    // this.Total=0;
    $('#drpCustomer').val(null).trigger('change');
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


}
