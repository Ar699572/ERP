import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as $ from 'jquery';
import { APICallingService } from 'src/app/apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { ShippingService } from 'src/app/store/ShippingService';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";




@Component({
  selector: 'app-shipping-services',
  templateUrl: './shipping-services.component.html',
  styleUrls: ['./shipping-services.component.css']
})
export class ShippingServicesComponent implements OnInit {


  ShippingService: FormGroup
  constructor(private router: Router, private store: Store<any>, private APICall: APICallingService, private FormBuilder: FormBuilder) {

    this.ShippingService = FormBuilder.group({


      // CityId: new FormControl(''),
      // CountryId: new FormControl(''),
      // StateId:new FormControl(''),
      ServiceName1: new FormControl(''),
      SearchString: new FormControl('')
    });


  }
  DeviceType = "";

  StoreShippingService: ShippingService

  get f() {
    return this.ShippingService.controls;
  }

  ngOnInit() {
    debugger;
    this.DeviceType = localStorage.getItem('DeviceType')
    this.StoreShippingService = new ShippingService;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


    if (result.length > 0) {

      this.StoreShippingService = (result[0]);


      this.ViewandSearch();

    } else {

      this.ViewandSearch();
    }
  }

  FilterType = 'All';
  lstShipping: any = [];
  lstDbResult: any = [];
  lstSerchableFields: any = [];

  ViewandSearch() {
    try {

      if (AppSettings.ShowLoaderOnView) {
        $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

        $("#loaderParent").show();
      }
      var sstring = (this.GetSearchString());
      debugger;
      this.APICall.DBCalling("ViewShippingService", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger;
          this.lstDbResult = JSON.parse(res['Message']);


          this.lstShipping = [];
          if (this.lstDbResult.Table.length > 0) {
            this.lstShipping = this.lstDbResult.Table;

            debugger;

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
    } catch (e) {

    }
  }
  FilterTypeChange(event) {
    try {
      if (AppSettings.ExicuteDebugger) {
        debugger;
      }

      if (this.SerchType == 'Like' && event.target.checked == true) {
        this.FilterType = (event.target.checked == true ? 'All' : 'Field');
      } else {

        event.target.checked = false;
        this.FilterType = 'Field';

      }
    } catch (e) {

    }
  }
  GetSearchString(): string {
    try {
      debugger;

      var SearchString = "";
      if (this.FilterType != 'All') {
        SearchString = this.PrepareSerchStringByField();
      }
      else {
        SearchString = this.getControlValue(this.f.SearchString, "string")
      }
      return SearchString;
    } catch (e) {

    }
  }

  SerchType = 'Like'
  PrepareSerchStringByField(): string {
    try {

      var FldSerchString = "";
      if (this.lstSerchableFields.length > 0) {

        var ServiceName = this.getControlValue(this.f.ServiceName, "string");
        var ServiceDBField = "";




        for (var i = 0; i < this.lstSerchableFields.length; i++) {


          if (this.lstSerchableFields[i].ControlName == "ServiceName") {
            ServiceDBField = this.lstSerchableFields[i].DBField;
          }

        }
        debugger;
        if (this.SerchType == 'Like') {


          if (ServiceName != "") {
            FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + ServiceDBField + " Like'" + ServiceName + "%'") : (ServiceDBField + " Like'" + ServiceName + "%'");
          }


        }
        else {

          if (ServiceName != "") {
            FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + ServiceDBField + " ='" + ServiceName + "'") : (ServiceDBField + " ='" + ServiceName + "'");
          }


        }
      }
      return FldSerchString;
    } catch (e) {

    }
  }



  getControlValue(Control, Type): string {
    try {

      var Value = (Type == "string" ? "" : "0");
      if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
        Value = Control.value;
      }

      return Value;
    } catch (e) {

    }
  }



  OnAdd() {


    this.StoreShippingService = new ShippingService;
    this.APICall.UpdatedSelectedPath('./Common/CreateShippingServices');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
    this.StoreShippingService.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreShippingService));

    this.router.navigate(['Common/CreateShippingServices']);

  }

  CreateShippingService() {


    this.StoreShippingService = new ShippingService;
    this.APICall.UpdatedSelectedPath('./Common/CreateShippingServices');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");

    this.StoreShippingService.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreShippingService));

    this.router.navigate(['Common/CreateShippingServices']);

  }

  XmlEdit = "";
  EditShippingService(xml) {
    try {
      debugger;
      this.StoreShippingService = new ShippingService;

      this.StoreShippingService.Id = xml.Id;
      this.StoreShippingService.Address1 = xml.Address1;
      this.StoreShippingService.Address2 = xml.Address2;
      this.StoreShippingService.Address3 = xml.Address3;
      this.StoreShippingService.CountryId = xml.CountryId;
      this.StoreShippingService.CountryName = xml.CountryName;
      this.StoreShippingService.StateId = xml.StateId;
      this.StoreShippingService.StateName = xml.StateName;
      this.StoreShippingService.CityId = xml.CityId;
      this.StoreShippingService.CityName = xml.CityName;
      this.StoreShippingService.PinCode = xml.PinCode;
      this.StoreShippingService.ContactNo1 = xml.ContactNo1;
      this.StoreShippingService.ContactNo2 = xml.ContactNo2;
      this.StoreShippingService.Email = xml.Email;
      this.StoreShippingService.Website = xml.Website;
      this.StoreShippingService.Description = xml.Description;
      this.StoreShippingService.ServiceName = xml.ServiceName;
      this.StoreShippingService.ModifiedDate = (xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());


      this.APICall.UpdatedSelectedPath('./Common/CreateShippingServices');
      var ActivatedRoute = localStorage.getItem("ActivatedRoute");

      this.StoreShippingService.TabId = ActivatedRoute;
      this.store.dispatch(new TabStore.AddTab(this.StoreShippingService));
      this.router.navigate(['Common/CreateShippingServices']);
      this.APICall.SetViewData(xml);
    } catch (e) {

    }
  }

  //#region "ShortCuts"
  @HostListener('window:keydown', ['$event'])

  keyEvent(event: KeyboardEvent) {
    try {
      console.log(event);
      debugger;
      if (event.ctrlKey || event.metaKey) {

        switch (String.fromCharCode(event.which).toLowerCase()) {


          case 'a':

            event.preventDefault();
            this.OnAdd();

            break;

        }
      }
    } catch (e) {

    }
  }


  SearchClick() {

    debugger;
    this.ViewandSearch();
  }

  SerchTypeChange(ChangedValue) {
    try {
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
    } catch (e) {

    }
  }

}
