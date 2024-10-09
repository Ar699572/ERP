import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { VendorType } from 'src/app/store/VendorType';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-vendor-type',
  templateUrl: './create-vendor-type.component.html',
  styleUrls: ['./create-vendor-type.component.css']
})
export class CreateVendorTypeComponent implements OnInit {

  CreateVendor:FormGroup;
  constructor(private router:Router,private fb:FormBuilder,private APICall: APICallingService,private store: Store<any>) { 
    this.CreateVendor=this.fb.group({

      typename:new FormControl('',Validators.required),
      notes:new FormControl(''),
      VendorTypeId:new FormControl(0)

    });
  }
  DeviceType="";

  ngOnInit() {
    this.StoreVendor = new VendorType;

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


    if (result.length > 0) {

      debugger;
      this.StoreVendor = result[0]
      this.ModifiedDate = this.StoreVendor.ModifiedDate.toString();
      
      this.submitted = Boolean(this.StoreVendor.submitted);
         }
    debugger;

    if (this.StoreVendor.ModifiedDate.toString().includes('India')) {

      var date = new Date(this.StoreVendor.ModifiedDate);


      this.StoreVendor.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }

    var that = this;

  
    this.DeviceType = localStorage.getItem('DeviceType')
    debugger;
    var ViewData = this.APICall.GetViewData();


    if (ViewData != undefined && typeof (ViewData) != undefined && typeof (ViewData.ViewName) != undefined) {
      

      debugger;
      if (ViewData.ViewName == "VendorType") {
        debugger;
        this.CreateVendor.patchValue({

          VendorTypeId:ViewData.VendorTypeId,
          typename: ViewData.typename,
          notes: ViewData.notes,
          

        });

        this.ModifiedDate = ViewData.ModifiedDate;
      }
      this.ModifiedDate = ViewData.ModifiedDate;

    }

    this.CreateVendor.valueChanges.subscribe(value => {

      debugger;
      this.StoreVendor.VendorTypeId = value.VendorTypeId;
      this.StoreVendor.typename = value.typename;
      this.StoreVendor.notes = value.notes;
      this.StoreVendor.ViewName = "VendorType";
      this.StoreVendor.ModifiedDate = (this.ModifiedDate == null ? '' : this.ModifiedDate.toString());
      this.StoreVendor.submitted = this.submitted;
      this.StoreVendor.TabId = ActivatedRoute;
      this.store.dispatch(new TabStore.AddTab(this.StoreVendor));
    });

  }
  submitted=false;
  OnSave(){
    this.submitted=true;
var valid=true;
if(this.f.typename.valid ){
  this.SaveVendor();
}

  }


get f(){
  return this.CreateVendor.controls;
}

getControlValue(Control, Type): string {

  var Value = (Type == "string" ? "" : "0");
  if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
    Value = Control.value;
  }

  return Value;
}
SinkStatus:number=1;
ModifiedBy="";
ModifiedDate="";
DbResult: any = [];
StoreVendor:VendorType;
  SaveVendor() {
    debugger;
    try{
  
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
    $("#loaderParent").show();
  
    var xml1 = '<NewDataSet><Table1>'
  
      + '<VendorTypeId>' +this.StoreVendor.VendorTypeId+ '</VendorTypeId>'
      + '<typename>' + this.getControlValue(this.f.typename, 'string') + '</typename>'
      + '<notes>' + this.getControlValue(this.f.notes, 'string') + '</notes>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall. GetBranchID()+ '</BranchId>'
      + '<SinkStatus>' + this.SinkStatus + '</SinkStatus>'
      // + '<CCId>' + this.CCId + '</CCId>'
      + '<ModifiedBy>' + this.ModifiedBy + '</ModifiedBy>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      
    
  
      + '</Table1></NewDataSet>';
  
    debugger;
    this.APICall.DBCalling("SaveVendorType", xml1, "", "", "").subscribe(
      (res: Response) => {
        debugger;
  
        $("#loaderParent").hide();
  
        this.DbResult = JSON.parse(res['Message']);
        debugger;
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          if (this.StoreVendor.VendorTypeId > 0) {
            this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
          } else {
            //  this.CreateTaxtypes.patchValue({
  
  
              this.StoreVendor.VendorTypeId= this.DbResult.Table[0].Id;
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
                title: "Transaction modified by " + this.DbResult.Table[0].ModifiedBy + "!",
                text: "Do you wants to overwrite?",
  
                buttons: [
                  'No, cancel it!',
                  'Yes, I am sure!'
                ],
                dangerMode: true,
              }).then(function (isConfirm) {
  
                if (isConfirm) {
  
                  that.ModifiedDate = that.DbResult.Table[0].ModifiedDate;
  
                  that.SaveVendor();
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
  
    }catch(e){
  
    }
  }

  ClearViewData(){
    this.ModifiedDate = "";
    this.CreateVendor.patchValue({
      VendorTypeId:0,
      typename:'',
      notes:'',
      
    });
    this.StoreVendor = new VendorType;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreVendor.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreVendor));
  
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
  
        that.DeleteVendor();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }
  
  
    });
  
  }

  DeleteVendor(){
    try{
      debugger;
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
      $("#loaderParent").show();
  
      var xml1 = '<NewDataSet><Table1>'


      + '<VendorTypeId>' +this.StoreVendor.VendorTypeId+ '</VendorTypeId>'
      + '<typename>' + this.getControlValue(this.f.typename, 'string') + '</typename>'
      + '<notes>' + this.getControlValue(this.f.notes, 'string') + '</notes>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      // + '<BranchId>' + this.APICall. GetBranchID()+ '</BranchId>'
      + '<SinkStatus>' + this.SinkStatus + '</SinkStatus>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      
    
  
        + '</Table1></NewDataSet>';
  
      this.APICall.DBCalling("DeleteVendorType", xml1, "", "", "").subscribe(
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
      
      }catch(e){
  
      }
      this.router.navigate(['Purchase/VendorType']);
  
  }
  Search()
{
  this.router.navigate(['Purchase/VendorType']);
}

}
