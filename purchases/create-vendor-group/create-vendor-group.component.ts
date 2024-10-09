import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import * as $ from 'jquery';
import { APICallingService } from 'src/app/apicalling.service';
import '../../../assets/vendors/select2/js/select2.min.js';
import '../../../assets/vendors/select2/js/select2.min.js';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { VendorGroup } from 'src/app/store/VendorGroup';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-vendor-group',
  templateUrl: './create-vendor-group.component.html',
  styleUrls: ['./create-vendor-group.component.css']
})
export class CreateVendorGroupComponent implements OnInit {

  CreateVendorGroup: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private APICall: APICallingService, private store: Store<any>) {
    this.CreateVendorGroup = this.fb.group({

      GroupCode: new FormControl('', Validators.required),
      GroupName: new FormControl('', Validators.required),
      Description: new FormControl(''),
      Id: new FormControl(0)

    });

  }

  ModifiedBy = "";
  ModifiedDate = "";
  DeviceType = "";
  DbResult: any = [];
  StoreVendorGroup: VendorGroup;

  ngOnInit() {
    this.StoreVendorGroup = new VendorGroup;

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


    if (result.length > 0) {

      debugger;
      this.StoreVendorGroup = result[0]
      this.ModifiedDate = this.StoreVendorGroup.ModifiedDate.toString();

      this.submitted = Boolean(this.StoreVendorGroup.submitted);
    }
    debugger;

    if (this.StoreVendorGroup.ModifiedDate.toString().includes('India')) {

      var date = new Date(this.StoreVendorGroup.ModifiedDate);


      this.StoreVendorGroup.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }

    var that = this;


    this.DeviceType = localStorage.getItem('DeviceType')
    debugger;
    var ViewData = this.APICall.GetViewData();


    if (ViewData != undefined && typeof (ViewData) != undefined && typeof (ViewData.ViewName) != undefined) {
      // JSON.parse(ViewData).forEach(item => {

      debugger;
      if (ViewData.ViewName == "VendorGroup") {
        debugger;
        this.CreateVendorGroup.patchValue({

          Id: ViewData.Id,
          GroupCode: ViewData.GroupCode,
          GroupName: ViewData.GroupName,
          Description: ViewData.Description,


        });

        this.ModifiedDate = ViewData.ModifiedDate;
      }
      this.ModifiedDate = ViewData.ModifiedDate;

    }

    this.CreateVendorGroup.valueChanges.subscribe(value => {

      debugger;
      this.StoreVendorGroup.Id = value.Id;
      this.StoreVendorGroup.GroupCode = value.GroupCode;
      this.StoreVendorGroup.GroupName = value.GroupName;
      this.StoreVendorGroup.Description = value.Description;
      this.StoreVendorGroup.ViewName = "VendorGroup";
      this.StoreVendorGroup.ModifiedDate = (this.ModifiedDate == null ? '' : this.ModifiedDate.toString());
      this.StoreVendorGroup.submitted = this.submitted;
      this.StoreVendorGroup.TabId = ActivatedRoute;
      this.store.dispatch(new TabStore.AddTab(this.StoreVendorGroup));
    });

  }

  get f() {
    return this.CreateVendorGroup.controls;
  }

  submitted = false;
  OnSave() {
    this.submitted = true;
    var valid = true
    if (!this.f.GroupCode.invalid && !this.f.GroupName.invalid && valid) {
      valid = false;
      this.SaveVendorGroup()
    }

  }

  getControlValue(Control, Type): string {
    try {
      debugger;
      var Value = (Type == "string" ? "" : "0");
      if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
        Value = Control.value;
      }

      return Value;
    } catch (e) {

    }
  }


  SaveVendorGroup() {

    debugger;
    try {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();

      var xml1 = '<NewDataSet><Table1>'


        + '<Id>' + this.getControlValue(this.f.Id, 'int') + '</Id>'
        + '<GroupCode>' + this.getControlValue(this.f.GroupCode, 'string') + '</GroupCode>'
        + '<GroupName>' + this.getControlValue(this.f.GroupName, 'string') + '</GroupName>'
        + '<Description>' + this.getControlValue(this.f.Description, 'string') + '</Description>'
        + '<ModifiedBy>' + this.ModifiedBy + '</ModifiedBy>'
        + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
        + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
        + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
        + '<UserName>' + this.APICall.GetUserName() + '</UserName>'

        + '</Table1></NewDataSet>';

      debugger;
      this.APICall.DBCalling("SaveVendorGroup", xml1, "", "", "").subscribe(
        (res: Response) => {
          debugger;

          $("#loaderParent").hide();

          this.DbResult = JSON.parse(res['Message']);
          debugger;
          if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
            if (this.f.Id.value > 0) {
              this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
              (window as any).swal({
                icon: 'success',
                title: 'Information!',
                text: 'Record Updated successfully.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-success'
              });
            } else {



              this.f.Id = this.DbResult.Table[0].Id;
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



          } else {



            if (this.DbResult.Table[0].DBresult == -3) {
              (window as any).swal({
                icon: 'warning',
                title: 'Exists',
                text: 'Groupname Already Exists.!',
                confirmButtonText: 'Dismiss',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-warning'
              });
            } else {

              if (this.DbResult.Table[0].DBresult == -5) {

                var that = this;
                debugger;

                (window as any).swal({
                  icon: "warning",
                  title: "Treansaction modified by " + this.DbResult.Table[0].ModifiedBy + "!",
                  text: "Do you wants to overwrite?",

                  buttons: [
                    'No, cancel it!',
                    'Yes, I am sure!'
                  ],
                  dangerMode: true,
                }).then(function (isConfirm) {

                  if (isConfirm) {

                    that.ModifiedDate = that.DbResult.Table[0].ModifiedDate;

                    that.SaveVendorGroup();
                  } else {
                    (window as any).swal("Cancelled", "this file is not updated :)", "error");
                  }
                  debugger;

                });



              } else {

                (window as any).swal({
                  icon: 'error',
                  title: 'Error!',
                  text: 'failed.!',
                  confirmButtonText: 'Dismiss',
                  buttonsStyling: false,
                  confirmButtonClass: 'btn btn-lg btn-danger'
                });
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
    catch (e) {
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

        that.DeleteVendorGroup();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }


    });

  }

  DeleteVendorGroup() {



    try {
      debugger;
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();

      var xml1 = '<NewDataSet><Table1>'



        + '<Id>' + this.getControlValue(this.f.Id, 'int') + '</Id>'
        + '<GroupCode>' + this.getControlValue(this.f.GroupCode, 'string') + '</GroupCode>'
        + '<GroupName>' + this.getControlValue(this.f.GroupName, 'string') + '</GroupName>'
        + '<Description>' + this.getControlValue(this.f.Description, 'string') + '</Description>'
        + '<ModifiedBy>' + this.ModifiedBy + '</ModifiedBy>'
        + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
        + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
        + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
        + '<UserName>' + this.APICall.GetUserName() + '</UserName>'


        + '</Table1></NewDataSet>';

      this.APICall.DBCalling("VendorGroupDelete", xml1, "", "", "").subscribe(
        (res: Response) => {

          $("#loaderParent").hide();

          this.DbResult = JSON.parse(res['Message']);
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

    } catch (e) {

    }
    this.router.navigate(['Purchase/VendorGroup']);

  }

  ClearViewData() {
    this.ModifiedDate = "";
    this.CreateVendorGroup.patchValue({
      Id: 0,
      GroupCode: '',
      GroupName: '',
      Description: '',

    });
    this.StoreVendorGroup = new VendorGroup;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreVendorGroup.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreVendorGroup));

  }

  Search() {
    this.router.navigate(['Purchase/VendorGroup']);
  }


}