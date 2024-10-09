
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import { Vendor } from 'src/app/store/StoreVendor';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import { dateReviver } from 'ngrx-store-localstorage';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
  providers:[DatePipe]
})
export class VendorComponent implements OnInit {
  Vendor: FormGroup;
 
 
  constructor(private router: Router, private formBuilder: FormBuilder,
     private APICall: APICallingService, private store: Store<any>,private datepipe:DatePipe) {

    this.Vendor = formBuilder.group(
      {
        vendorcode: new FormControl(''),
        vendorname: new FormControl(''),
        gstno: new FormControl(''),
        AccountName: new FormControl(''),
        SearchString: new FormControl('')
      });
    this.ViewandSearchVendors();

   
  }




  StoreVendor: Vendor;
  XmlEdit = "";
  CreateVendor(xml,event) {

    debugger;
    this.StoreVendor = new Vendor;
    this.StoreVendor.vendorname = xml.vendorname;
    this.StoreVendor.vendorcode = xml.vendorcode;
    this.StoreVendor.country = xml.country;
    this.StoreVendor.shortname = xml.shortname;
    this.StoreVendor.city = xml.city;
    this.StoreVendor.iscompany = xml.iscompany;
    this.StoreVendor.gstno = xml.gstno;
    this.StoreVendor.Contactno = xml.Contactno;
    this.StoreVendor.email = xml.email;
    this.StoreVendor.vendorType = xml.vendorType
    this.StoreVendor.website = xml.website;
    this.StoreVendor.creditlimit = xml.creditlimit;
    this.StoreVendor.creditdays = xml.creditdays;
    this.StoreVendor.maxbill = xml.maxbill;
    this.StoreVendor.creditrating = xml.creditrating;
    this.StoreVendor.vendorrating = xml.vendorrating;
    this.StoreVendor.vendorclass = xml.vendorclass;
    this.StoreVendor.address1 = xml.address1;
    this.StoreVendor.address2 = xml.address2;
    this.StoreVendor.pincode = xml.pincode;
    this.StoreVendor.countryname = xml.countryname;
    this.StoreVendor.statename = xml.statename;
    this.StoreVendor.cityname = xml.cityname;
    this.StoreVendor.BusinessType=xml.BusinessType;
    this.StoreVendor.PurchaseType=xml.PurchaseType; 
    this.StoreVendor.address3 = xml.address3;
    this.StoreVendor.state = xml.state;
    this.StoreVendor.coaid = xml.coaid;
    this.StoreVendor.AccountName = xml.AccountName;
    this.StoreVendor.Image = xml.Image;
    this.StoreVendor.companyname = xml.companyname;
    this.StoreVendor.vendorAddress1 = xml.CompanyAddress1;
    this.StoreVendor.vendorAddress2 = xml.CompanyAddress2;
    this.StoreVendor.CompanyAddress1 = xml.address1;
    this.StoreVendor.CompanyAddress2 = xml.address2;
    this.StoreVendor.VendorCountryId = xml.country;
    this.StoreVendor.vendorCountryName = xml.countryname;
    this.StoreVendor.VendorStateId = xml.state;
    this.StoreVendor.VendorStateName = xml.statename;
    this.StoreVendor.VendorCityId = xml.city;
    this.StoreVendor.VendorCityName = xml.cityname;
    // if (xml.CompanyCountryName == '' && xml.CompanyCountry == 0) {
    //   this.StoreVendor.VendorCountryId = xml.country;
    //   this.StoreVendor.vendorCountryName = xml.countryname;
    // } else {
    //   this.StoreVendor.VendorCountryId = xml.CompanyCountry;
    //   this.StoreVendor.vendorCountryName = xml.CompanyCountryName;
    // }

    // if (xml.CompanyStateName == '' && xml.CompanyState == 0) {
    //   this.StoreVendor.VendorStateId = xml.state;
    //   this.StoreVendor.VendorStateName = xml.statename;
    // } else {
    //   this.StoreVendor.VendorStateId = xml.CompanyState;
    //   this.StoreVendor.VendorStateName = xml.CompanyStateName;
    // }

    // if (xml.CompanyCityName == '' && xml.CompanyCity == 0) {
    //   this.StoreVendor.VendorCityId = xml.city;
    //   this.StoreVendor.VendorCityName = xml.cityname;
    // } else {
    //   this.StoreVendor.VendorCityId = xml.CompanyCity;
    //   this.StoreVendor.VendorCityName = xml.CompanyCityName;
    // }
   
    this.StoreVendor.Vpin = xml.CompanyPincode;
    
    this.StoreVendor.VendorId = xml.VendorId;
    
    this.StoreVendor.Vcountry = xml.countryname;
    this.StoreVendor.vsName = xml.statename;
    this.StoreVendor.Vcity = xml.cityname;
    this.StoreVendor.VState = xml.state;
    this.StoreVendor.VendorDate = xml.Date;
    this.StoreVendor.ModifiedDate =(xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());
    this.StoreVendor.lstBilling.push({'Address1':xml.address1, 'Address2':xml.address2,'CountryID':xml.CompanyCountry,'Country':xml.CompanyCountryName,'StateId':xml.CompanyState,'State':xml.CompanyStateName,'CityId':xml.CompanyCity,'City':xml.CompanyCityName,'Pin':xml.pincode});



    if (xml.VendorBanks != null && typeof (xml.VendorBanks) != undefined) {
      var res1 = ((xml.VendorBanks).replace(/\n/g, "")).replace(/'/g, "\"");
      debugger;
      this.StoreVendor.lstbankdetails = JSON.parse(res1);
      var i = 0;
      var data = $.map(this.StoreVendor.lstbankdetails, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      debugger;
      this.StoreVendor.lstbankdetails = data;
    }

    if (xml.VendorSites != null && typeof (xml.VendorSites) != undefined) {
      var res2 = ((xml.VendorSites).replace(/\n/g, "")).replace(/'/g, "\"");
      this.StoreVendor.lstShippingdetails = JSON.parse(res2);
      var i = 0;
      var data = $.map(this.StoreVendor.lstShippingdetails, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      debugger;
      this.StoreVendor.lstShippingdetails = data;
    }

    if (xml.VendorContacts != null && typeof (xml.VendorContacts) != undefined) {
      var res3 = ((xml.VendorContacts).replace(/\n/g, "")).replace(/'/g, "\"");
      this.StoreVendor.lstContact = JSON.parse(res3);
      var i = 0;
      var data = $.map(this.StoreVendor.lstContact, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      debugger;
      this.StoreVendor.lstContact = data;
    }


    if (xml.ItemDetails != null && typeof (xml.ItemDetails) != undefined) {
      var res3 = ((xml.ItemDetails).replace(/\n/g, "")).replace(/'/g, "\"");
      this.StoreVendor.lstItems = JSON.parse(res3);
      var i = 0;
      var data = $.map(this.StoreVendor.lstItems, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      this.StoreVendor.lstItems = data;
    }

    if (xml.CustomerTransporter != null && typeof (xml.CustomerTransporter) != undefined) {
      var res4 = ((xml.CustomerTransporter).replace(/\n/g, "")).replace(/'/g, "\"");
      this.StoreVendor.lstTransport = JSON.parse(res4);
      var i = 0;
      var data = $.map(this.StoreVendor.lstTransport, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      this.StoreVendor.lstTransport = data;
    }

    this.APICall.SetViewData(xml);
  //this.APICall.UpdatedSelectedPath('./Purchase/CreateVendor');

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreVendor.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreVendor));
  //this.router.navigate(['Purchase/CreateVendor']);
  if(event=='VendorCentral'){
    this.APICall.UpdatedSelectedPath('./Purchase/VendorCentral');
    this.router.navigate(['Purchase/VendorCentral']);
  }else{
    this.APICall.UpdatedSelectedPath('./Purchase/CreateNewVendor');
    this.router.navigate(['Purchase/CreateNewVendor']);
  }
  
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
debugger
    //this.StoreVendor = new Vendor;
   this.APICall.UpdatedSelectedPath('./Purchase/CreateNewVendor');
  //this.APICall.UpdatedSelectedPath(['Purchase/CreateVendor']);
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
    this.StoreVendor.TabId = ActivatedRoute;
    this.StoreVendor.vendorCountryID=0;
    this.StoreVendor.vendorCountryName='Select country'
    this.StoreVendor.VendorStateId=0;
    this.StoreVendor.VendorStateName='Select state'
    this.StoreVendor.VendorCityId=0;
    this.StoreVendor.VendorCityName='Select city'
    this.StoreVendor.PurchaseType='Invoice'
    this.StoreVendor.vendorType='Company'
    this.StoreVendor.BusinessType='Purchase'
 
    this.store.dispatch(new TabStore.AddTab(this.StoreVendor));
//this.router.navigate(['Purchase/CreateVendor']);
   this.router.navigate(['Purchase/CreateNewVendor']);
   


  }

  get f() {
    return this.Vendor
      .controls;
  }
  DeviceType = "";
  ngOnInit() {
    this.tempnum2 = 70;
    this.tempnum1 = 30;
    this.DeviceType = localStorage.getItem('DeviceType')
    this.StoreVendor = new Vendor;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    //var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
    if (result.length > 0) {

      this.StoreVendor = (result[0]);


      this.ViewandSearchVendors();

    } else {

      this.ViewandSearchVendors();
    }
  }

  ngAfterViewInit() {




  }



  lstVendor: any = [];
  lstDbResult: any = [];
  Totalvendorpurchases: number = 0;
  TotalvendorPaymentsValue: number = 0;
  TotalPaymentPer: string = "";
  TotalPaymentPerRem: string = "";
  tempnum1: number = 0;
  tempnum2: number = 0;
  ViewandSearchVendors() {


    if (AppSettings.ShowLoaderOnView) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }
    var sstring = (this.GetSearchString());
    debugger;
    this.APICall.DBCalling("ViewVendor", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstVendor = [];
        if (this.lstDbResult.Table.length > 0) {
          debugger;
       
         
         this.lstVendor = this.lstDbResult.Table;

          this.Totalvendorpurchases = (+this.lstVendor[0].Totalvendorpurchases);

          this.TotalvendorPaymentsValue = ((+this.lstVendor[0].TotalvendorPayments) - (+this.lstVendor[0].TotalvendorOpeningBalance));
          debugger;
          this.TotalPaymentPer = (((+this.TotalvendorPaymentsValue) * 100) / (+this.Totalvendorpurchases)).toFixed(2);
          this.TotalPaymentPerRem = (100 - (+this.TotalPaymentPer)).toFixed(2);

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
    this.ViewandSearchVendors();
  }
  lstSerchableFields: any = [];


  PrepareSerchStringByField(): string {


    var FldSerchString = "";
    if (this.lstSerchableFields.length > 0) {

      var vendorname = this.getControlValue(this.f.vendorname, "string");
      var vendornameDBField = "";


      for (var i = 0; i < this.lstSerchableFields.length; i++) {

        debugger;
        if (this.lstSerchableFields[i].ControlName == "vendorname") {
          vendornameDBField = this.lstSerchableFields[i].DBField;
        }


      }
      debugger;
      if (this.SerchType == 'Like') {




        if (vendorname != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + vendornameDBField + " Like'" + vendorname + "%'") : (vendornameDBField + " Like'" + vendorname + "%'");
        }




      }
      else {


        if (vendorname != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + vendornameDBField + " ='" + vendorname + "'") : (vendornameDBField + " ='" + vendorname + "'");
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
  // VendorCentral(){
  //   this.router.navigate(['Purchase/VendorCentral']);
  // }
  //#endregion "SearchPanelLogic"
  VendorCentral() {
    this.router.navigate(['Purchase/VendorCentral']);
  }
}
