import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import * as $ from 'jquery';
import { VendorGroup } from 'src/app/store/VendorGroup';


@Component({
  selector: 'app-vendor-group',
  templateUrl: './vendor-group.component.html',
  styleUrls: ['./vendor-group.component.css']
})
export class VendorGroupComponent implements OnInit {

  VendorGroup: FormGroup;
  constructor(private router: Router, private APICall: APICallingService, private store: Store<any>, private fb: FormBuilder) {

    this.VendorGroup = this.fb.group({
      GroupCode: new FormControl(''),
      GroupName: new FormControl(''),
      SearchString: new FormControl('')

    })
  }

  ngOnInit() {
    debugger;
    this.DeviceType = localStorage.getItem('DeviceType')
    this.StoreVendorGroup = new VendorGroup;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


    if (result.length > 0) {

      this.StoreVendorGroup = (result[0]);


      this.ViewandSearch();

    } else {

      this.ViewandSearch();
    }
  }
  DeviceType = "";
  FilterType = 'All';
  lstTransaction: any = [];
  lstDbResult: any = [];
  lstSerchableFields: any = [];
  StoreVendorGroup: VendorGroup

  // OnAdd(){
  //   this.router.navigate(['Purchase/CreateVendorGroup']);
  // }
  OnAdd() {

    this.StoreVendorGroup = new VendorGroup;
    this.APICall.UpdatedSelectedPath('./Purchase/CreateVendorGroup');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreVendorGroup.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreVendorGroup));

    this.router.navigate(['Purchase/CreateVendorGroup']);

  }

  ViewandSearch() {
    try {

      if (AppSettings.ShowLoaderOnView) {
        $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

        $("#loaderParent").show();
      }
      var sstring = (this.GetSearchString());
      debugger;
      this.APICall.DBCalling("VendorGroupView", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger;
          this.lstDbResult = JSON.parse(res['Message']);


          this.lstTransaction = [];
          if (this.lstDbResult.Table.length > 0) {
            this.lstTransaction = this.lstDbResult.Table;

            debugger;

            if (this.lstSerchableFields.length == 0) {


              var stringDbFld = this.lstDbResult.Table[0].SerchableFields
              var parser = new DOMParser();
              var xmlDoc = parser.parseFromString(stringDbFld, "text/xml");

              var sizex = xmlDoc.getElementsByTagName("ControlName");


            }
          }

          $("#loaderParent").hide();
        });
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
  SerchType = 'Like'
  PrepareSerchStringByField(): string {
    try {

      var FldSerchString = "";
      if (this.lstSerchableFields.length > 0) {

        var GroupName = this.getControlValue(this.f.GroupName, "string");
        var GroupDBField = "";




        for (var i = 0; i < this.lstSerchableFields.length; i++) {


          if (this.lstSerchableFields[i].ControlName == "GroupName") {
            GroupDBField = this.lstSerchableFields[i].DBField;
          }

        }
        debugger;
        if (this.SerchType == 'Like') {


          if (GroupName != "") {
            FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + GroupDBField + " Like'" + GroupName + "%'") : (GroupDBField + " Like'" + GroupName + "%'");
          }


        }
        else {

          if (GroupName != "") {
            FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + GroupDBField + " ='" + GroupName + "'") : (GroupDBField + " ='" + GroupName + "'");
          }


        }
      }
      return FldSerchString;
    } catch (e) {

    }
  }
  get f() {
    return this.VendorGroup.controls;
  }

  XmlEdit = "";
  EditVendor(xml) {
    try {
      debugger;
      this.StoreVendorGroup = new VendorGroup;

      this.StoreVendorGroup.Id = xml.Id;
      this.StoreVendorGroup.GroupCode = xml.GroupCode;
      this.StoreVendorGroup.GroupName = xml.GroupName;
      this.StoreVendorGroup.Description = xml.Description;

      this.StoreVendorGroup.ModifiedDate = (xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());

      this.APICall.UpdatedSelectedPath('./Purchase/CreateVendorGroup');
      var ActivatedRoute = localStorage.getItem("ActivatedRoute");
      this.router.navigate(['Purchase/CreateVendorGroup']);
      this.StoreVendorGroup.TabId = ActivatedRoute;
      this.APICall.SetViewData(xml);
      this.store.dispatch(new TabStore.AddTab(this.StoreVendorGroup));


    } catch (e) {

    }

  }

  CreateVendor() {
    this.StoreVendorGroup = new VendorGroup;
    this.APICall.UpdatedSelectedPath('./Purchase/CreateVendorGroup');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");

    this.StoreVendorGroup.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreVendorGroup));

    this.router.navigate(['Purchase/CreateVendorGroup']);

  }
  SearchClick() {
    this.ViewandSearch();
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
}
