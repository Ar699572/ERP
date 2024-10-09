import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import { VendorType } from 'src/app/store/VendorType';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";

@Component({
  selector: 'app-vendor-type',
  templateUrl: './vendor-type.component.html',
  styleUrls: ['./vendor-type.component.css']
})
export class VendorTypeComponent implements OnInit {

  VendorType:FormGroup;
  constructor(private router:Router,private APICall:APICallingService,private store: Store<any>,private fb:FormBuilder) { 
    this.VendorType=this.fb.group({
      typename:new FormControl(''),
      notes:new FormControl(''),
      SearchString:new FormControl('')
    })
  }
  DeviceType="";
  FilterType = 'All';
  lstVendor: any = [];
  lstDbResult: any = [];
  lstSerchableFields: any = [];
  StoreVendor:VendorType
 
  ngOnInit() {
    debugger;
    this.DeviceType = localStorage.getItem('DeviceType')
    this.StoreVendor = new VendorType ;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


    if (result.length > 0) {

      this.StoreVendor = (result[0]);


      this.ViewandSearch();

    } else {

      this.ViewandSearch();
    }
  }

  ViewandSearch() {
    try {

      if (AppSettings.ShowLoaderOnView) {
        $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

        $("#loaderParent").show();
      }
      var sstring = (this.GetSearchString());
      debugger;
      this.APICall.DBCalling("ViewVendorType", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger;
          this.lstDbResult = JSON.parse(res['Message']);


          this.lstVendor = [];
          if (this.lstDbResult.Table.length > 0) {
            this.lstVendor = this.lstDbResult.Table;

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
get f(){
  return this.VendorType.controls;
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

        var typename = this.getControlValue(this.f.typename, "string");
        var typeDBField = "";




        for (var i = 0; i < this.lstSerchableFields.length; i++) {


          if (this.lstSerchableFields[i].ControlName == "typename") {
            typeDBField = this.lstSerchableFields[i].DBField;
          }

        }
        debugger;
        if (this.SerchType=='Like') {


          if (typename!= "") {
            FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + typeDBField + " Like'" + typename + "%'") : (typeDBField + " Like'" + typename + "%'");
          }


        }
        else {

          if (typename!= "") {
            FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + typeDBField + " ='" + typename + "'") : (typeDBField + " ='" + typename + "'");
          }


        }
      }
      return FldSerchString;
    } catch (e) {

    }
  }
  OnAdd(){

  this.StoreVendor = new VendorType;
    this.APICall.UpdatedSelectedPath('./Purchase/CreateVendorType');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
  
    this.StoreVendor.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreVendor));
    this.router.navigate(['Purchase/CreateVendorType']);
  }
  XmlEdit = "";
  EditVendor(xml) {
      try {
        debugger;
        this.StoreVendor = new VendorType;
  
        this.StoreVendor.VendorTypeId = xml.VendorTypeId;
        this.StoreVendor.typename = xml.typename;
        this.StoreVendor.notes = xml.notes;
        
        this.StoreVendor.ModifiedDate = (xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());
  
        this.APICall.UpdatedSelectedPath('./Purchase/CreateVendorType');
        var ActivatedRoute = localStorage.getItem("ActivatedRoute");
        this.router.navigate(['Purchase/CreateVendorType']);
        this.StoreVendor.TabId = ActivatedRoute;
        this.APICall.SetViewData(xml);
        this.store.dispatch(new TabStore.AddTab(this.StoreVendor));
  
       
      } catch (e) {
        
      }
  
    }
 
    CreateVendor() {
      this.StoreVendor = new VendorType;
      this.APICall.UpdatedSelectedPath('./Purchase/CreateVendorType');
      var ActivatedRoute = localStorage.getItem("ActivatedRoute");
  
      this.StoreVendor.TabId = ActivatedRoute;
      this.store.dispatch(new TabStore.AddTab(this.StoreVendor));
      this.router.navigate(['Purchase/CreateVendorType']);
  
    }
    SearchClick() {
      this.ViewandSearch();
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
}
