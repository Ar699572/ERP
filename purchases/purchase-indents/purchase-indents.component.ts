import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import * as $ from 'jquery';
import { formatDate } from '@angular/common';
import { StoreNotification } from 'src/app/store/StoreNotification';

@Component({
  selector: 'app-purchase-indents',
  templateUrl: './purchase-indents.component.html',
  styleUrls: ['./purchase-indents.component.css']
})
export class PurchaseIndentsComponent implements OnInit {
  PurchaseIndent: FormGroup;
  lstIndentRecords: any = [];
  lstVendors: any = [];
  lstpurchseIndents: any = [];
  lsttempPurchseIndents: any = [];
  temparray: any = [];
  lsttempindentrecords: any = [];
  DisplaySequenceNumberId = 0;
  DisplayVendorId: number = 0;
  DispalyFormName = 'RFQ';
  RowId: number = 1;
  lstselectedIndents: any = [];
  StoreNotification:StoreNotification;

  constructor(private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) {
    this.PurchaseIndent = formBuilder.group(

      {
        SearchString: new FormControl(''),
        ItemId: new FormControl(0),
        ItemName: new FormControl(''),
        Description1: new FormControl(''),
        CustomerName: new FormControl(''),
        CustomerId: new FormControl(0),
        PRQId: new FormControl(0),
        VendorId: new FormControl(0),
        vendorname: new FormControl(''),
        HSN: new FormControl(''),
        Quantity: new FormControl(1),
        SequenceNumberId: new FormControl(0),
        PurchaseIndentId: new FormControl(0)
      });
  }

  get f() {
    return this.PurchaseIndent.controls;
  }

  ngOnInit() {
debugger;
this.StoreNotification = new StoreNotification;

var ActivatedRoute = localStorage.getItem("ActivatedRoute");

var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


if (result.length > 0) {
  this.StoreNotification = result[0];

if(this.StoreNotification!=undefined )
{

  if(this.StoreNotification.lstPINotification!=undefined)
  {

 if(this.StoreNotification.lstPINotification.length>0)
{
  for(let i=0; i<this.StoreNotification.lstPINotification.length; i++)
  {
  this.lsttempPurchseIndents.push({
    CustomerName: "", 
    Description1: this.StoreNotification.lstPINotification[i].Description, 
    IndentId: 0,
    PurchaseIndentChildId: 0,
    partid: this.StoreNotification.lstPINotification[i].ItemId, 
    partno: this.StoreNotification.lstPINotification[i].PartNo,
    qty: this.StoreNotification.lstPINotification[i].MinimumQty
  });
}
}
}

}
  
  }
  else
  {
    this.ViewandSearchPurchaseIndent();
  }
}

  OnAdd() {
    this.router.navigate(['Purchase/PurchaseIndent']);
  }

  ngAfterViewInit() {
    //  this.ViewandSearchItems();
    this.LoadParts();
    this.LoadCustomers();
    this.LoadVendors();
  }

  UOMId: number = 0;
  _TransactionType = "Purchase";
  LoadParts() {
    debugger;
    var that = this;

    (<any>$("#drpParts")).select2({
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
            return JSON.stringify({ "Operation": 'ViewItems', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.ItemId;
            obj.text = obj.partno;
            obj.text1 = obj.description;
            obj.text2 = obj.puruom;
            obj.text3 = obj.dashno;


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
    $('#drpParts').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        that.f.ItemId.setValue((<any>e).params.data.id);
        that.f.ItemName.setValue((<any>e).params.data.text);
        that.f.Description1.setValue((<any>e).params.data.text1);




      }


    });
    var partselection1 = new Option(this.f.ItemName.value, this.f.ItemId.value.toString(), true, true);

    (<any>$('#drpParts')).append(partselection1).trigger('change');

    $("#drpParts").on("select2:unselecting", function (e) {


      that.f.ItemId.setValue(0);
      that.f.ItemName.setValue('');
      that.f.Description1.setValue('');
    });

  }

  lstItems: any = [];
  lstDbResult: any = [];
  NumberSequenceValueChange(value) {
    debugger;
    this.f.SequenceNumberId.setValue(value);
  }


  LoadCustomers() {
    var that = this;

    (<any>$("#drpCustomers")).select2({
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


          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

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
    $('#drpCustomers').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {


        that.f.CustomerId.setValue((<any>e).params.data.id);
        that.f.CustomerName.setValue((<any>e).params.data.text);

        that.Customervaidate = false;

      }


    });
    var Customerselection1 = new Option(this.f.CustomerName.value, this.f.CustomerId.value.toString(), true, true);

    (<any>$('#drpCustomers')).append(Customerselection1).trigger('change');

    $("#drpCustomers").on("select2:unselecting", function (e) {


      that.f.CustomerId.setValue(0);
      that.f.CustomerName.setValue('');

    });

  }
  LoadVendors() {
    var that = this;

    (<any>$("#drpVendors")).select2({
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
            return JSON.stringify({ "Operation": 'ViewVendor', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.VendorId;
            obj.text = obj.vendorname;
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
    $('#drpVendors').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {

        debugger;
        that.f.VendorId.setValue((<any>e).params.data.id);
        that.f.vendorname.setValue((<any>e).params.data.text);
        that.lstVendors.push({ vendorname: (<any>e).params.data.text, VendorId: (<any>e).params.data.id });


      }


    });
    var Customerselection1 = new Option(this.f.vendorname.value, this.f.VendorId.value.toString(), true, true);

    (<any>$('#drpVendors')).append(Customerselection1).trigger('change');

    $("#drpVendors").on("select2:unselecting", function (e) {


      that.f.VendorId.setValue(0);
      that.f.vendorname.setValue('');

    });

  }
  lstinsertIndentRecords: any = [];
  OnSelect(e, d) {
    if (e.target.checked) {
      this.lstinsertIndentRecords.push({ PartName: d.PartName, PartId: d.PartId, Description: d.Description, Qty: d.Qty, RowId: 1, PurchaseIndentChildId: 0 });
    }
    else {
      for (var i = 0; i < this.lstinsertIndentRecords.length; i++) {
        if (this.lstinsertIndentRecords[i].PurchaseIndentChildId == d.PurchaseIndentChildId) {
          this.lstinsertIndentRecords.splice(this.lstinsertIndentRecords[i], 1);
          break;
        }
      }
    }
  }
  AddRecord() {
    debugger;

    var index = 0;

    for (var i = 0; i < this.lstIndentRecords.length; i++) {
      index = i + 1;
      if (this.lstIndentRecords[i].RowId <= 0) {
        this.lstIndentRecords[i].PartName = $('#' + index + ' td:eq(1) input').val();
        this.lstIndentRecords[i].PartId = $('#' + index + ' td:eq(1) input').val();
        this.lstIndentRecords[i].Description = $('#' + index + ' td:eq(2) input').val();
        this.lstIndentRecords[i].Qty = $('#' + index + ' td:eq(3) input').val();
        this.lstIndentRecords[i].RowId = this.RowId + 1;
        this.lstIndentRecords[i].PurchaseIndentChildId = 0;
      }
    }

    if (this.lstIndentRecords.length == 0) {
      this.lstIndentRecords.push({ PartName: this.f.ItemName.value, PartId: this.f.ItemId.value, Description: this.f.Description1.value, Qty: this.f.Quantity.value, RowId: 1, PurchaseIndentChildId: 0 })
      this.LoadParts();
    }
    else {

      var ValidateAddPackage = true;
      var ValidateAddPackage1 = true;
      for (var i = 0; i < this.lstIndentRecords.length; i++) {
        if (this.lstIndentRecords[i].PartName == "" || this.lstIndentRecords[i].PartId == 0 || this.lstIndentRecords[i].Description == "" || this.lstIndentRecords[i].Qty == 0) {
          ValidateAddPackage = false;
          (window as any).swal({
            icon: 'error',
            title: 'Error!',
            text: "Enter all values..!",
            confirmButtonText: 'Dismiss',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-danger'
          });
          break;
        }
      }

      for (var i = 0; i < this.lstIndentRecords.length; i++) {
        if (this.lstIndentRecords[i].PartName == this.f.ItemName.value && this.lstIndentRecords[i].PartId == this.f.ItemId.value) {
          debugger;
          ValidateAddPackage1 = false;
          this.lstIndentRecords[i].Qty = this.f.Quantity.value;
        }

      }


      if (ValidateAddPackage && ValidateAddPackage1) {
        this.lstIndentRecords.push({ PartName: this.f.ItemName.value, PartId: this.f.ItemId.value, Description: this.f.Description1.value, Qty: this.f.Quantity.value, RowId: 1, PurchaseIndentChildId: 0 })
      }
      //if(this.lstIndentRecords)
    }
    this.f.ItemName.setValue('');
    this.f.ItemId.setValue(0);
    this.f.Description1.setValue('');
    this.f.Quantity.setValue(1);
    (<any>$('#drpParts')).val(null).trigger('change');
  }


  partChange(e, val, data) {
    debugger;
    var d = e.target.value;

  }
  getControlValue(Control, Type): string {
    debugger;
    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }
  lstIndentRecordschild: any = [];
  ModifiedDate = "";
  DbResult: any = [];
  Submitted = false;
  SaveIndent() {
    this.Submitted = true;
    if (this.f.CustomerId.value > 0 && this.lstinsertIndentRecords.length > 0) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      if (this.ModifiedDate.toString().includes('India')) {

        var date = new Date(this.ModifiedDate);


        this.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
      }

      var xml1 = '<NewDataSet><Table1>'


        + '<PurchaseIndentId>' + this.getControlValue(this.f.PurchaseIndentId, 'int') + '</PurchaseIndentId>'
        + '<CustomerId>' + this.getControlValue(this.f.CustomerId, 'int') + '</CustomerId>'

        + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
        + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
        + '<Modifieddate>' + this.ModifiedDate + '</Modifieddate>'
        + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'

        + '</Table1></NewDataSet>';

      var xml2 = "";
      var rows = "";

      for (var i = 0; i < this.lstinsertIndentRecords.length; i++) {

        rows = rows + '<Table1><IndentId>' + this.f.PurchaseIndentId.value + '</IndentId>'
          + '<PurchaseIndentChildId>' + (typeof (this.lstinsertIndentRecords[i].PurchaseIndentChildId) != 'undefined' ? this.lstinsertIndentRecords[i].PurchaseIndentChildId : '0') + '</PurchaseIndentChildId>'
          + '<ItemId>' + this.lstinsertIndentRecords[i].PartId + '</ItemId>'
          + '<Qty>' + this.lstinsertIndentRecords[i].Qty + '</Qty></Table1>'


      }
      xml2 = '<NewDataSet>' + rows + '</NewDataSet>';

      this.APICall.DBCalling("SavePurchaseIndent", xml1, xml2, "", "").subscribe(
        (res: Response) => {
          debugger;
          $("#loaderParent").hide();

          this.DbResult = JSON.parse(res['Message']);
          debugger;
          if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
            if (this.f.PurchaseIndentId.value > 0) {
              this.lstinsertIndentRecords = null;
              this.lstinsertIndentRecords = [];
              if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
                if (this.DbResult.Table1.length > 0) {
                  var lsttaxprofiledetials = JSON.parse(((this.DbResult.Table1[0].PurchaseIndentChild).replace(/\n/g, "")).replace(/'/g, "\""));
                  var i = 0;
                  var PurchaseIndentChild = $.map(lsttaxprofiledetials, function (obj) {
                    i = i + 1;
                    obj.SNO = i;

                    return obj;
                  });

                  this.lstIndentRecordschild = PurchaseIndentChild;

                }



              }
              this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
              (window as any).swal({
                icon: 'success',
                title: 'Information!',
                text: 'Record Updated successfully.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-success'
              });
              $("#CreateIndent").trigger('click');
            } else {

              (window as any).swal({
                icon: 'success',
                title: 'Information!',
                text: 'Record Saved successfully.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-success'
              });
              $("#CreateIndent").trigger('click');
              this.ViewandSearchPurchaseIndent();
            }





          }

          else {



            if (this.DbResult.Table[0].DBresult == -3) {
              (window as any).swal({
                icon: 'warning',
                title: 'Exists',
                text: 'TaxProfile Already Exists.!',
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


                  } else {
                    (window as any).swal("Cancelled", "this file is not updated :)", "error");
                  }


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
    else {
      if (this.f.CustomerId.value == 0) {
        this.Customervaidate = true;
      }
      if (this.lstinsertIndentRecords.length == 0) {
        (window as any).swal({
          icon: 'warning',
          title: 'Alert',
          text: 'Please select atleast one Item.!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-warning'
        });
      }
    }

  }
  Customervaidate = false;
  temparray1: any = [];
  Edit(d) {
    debugger;
    this.lstIndentRecords = [];
    var de = d;
    var temp: any;
    for (var i = 0; i < this.lsttempindentrecords.length; i++) {
      if (this.lsttempindentrecords[i].PurchaseIndentId == d.IndentId) {
        debugger;

        if (this.lsttempindentrecords[i].lstPurchaseindent1 != null && typeof (this.lsttempindentrecords[i].lstPurchaseindent1) != undefined) {
          temp = ((this.lsttempindentrecords[i].lstPurchaseindent1).replace(/\n/g, "")).replace(/'/g, "\"");
          this.temparray1 = JSON.parse(temp);
          var Customerselection1 = new Option(this.temparray1[0].CustomerName, this.temparray1[0].CustomerId.toString(), true, true);

          (<any>$('#drpCustomers')).append(Customerselection1).trigger('change');
          for (var j = 0; j < this.temparray1.length; j++) {

            this.lstIndentRecords.push({
              CustomerId: this.temparray1[j].CustomerId, CustomerName: this.temparray1[j].CustomerName, PartName: this.temparray1[j].partno,
              PartId: this.temparray1[j].partid, Description: this.temparray1[j].Description1,
              Qty: this.temparray1[j].qty, RowId: 1, PurchaseIndentChildId: this.temparray1[j].PurchaseIndentChildId
            });
            // this.lsttempPurchseIndents.push({CustomerName:this.temparray[j].CustomerName,Description1:this.temparray[j].Description1,IndentId:this.temparray[j].IndentId,
            //   PurchaseIndentChildId:this.temparray[j].PurchaseIndentChildId,partid:this.temparray[j].partid,partno:this.temparray[j].partno,
            //   qty:this.temparray[j].qty});
          }

        }

        break;

      }
    }
    // this.lsttempindentrecords
  }
  CreateRFQ(d) {

  }
  Remove(d) {
    debugger;
    for (var i = 0; i < this.lstIndentRecords.length; i++) {
      if (this.lstIndentRecords[i].PartName == d.PartName)
        this.lstIndentRecords.splice(this.lstIndentRecords[i], 1);
      break;
    }

  }
  EditRecord(row) {
    debugger;
    var partselection1 = new Option(row.PartName, row.PartId.toString(), true, true);

    (<any>$('#drpParts')).append(partselection1).trigger('change');
    this.f.ItemName.setValue(row.PartName);
    this.f.ItemId.setValue(row.PartId);
    this.f.Description1.setValue(row.Description);
    this.f.Quantity.setValue(row.Qty);

  }
  ViewandSearchPurchaseIndent() {
    debugger;
    this.temparray = [];
    this.lsttempPurchseIndents = [];
    if (AppSettings.ShowLoaderOnView) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }
    var sstring = this.f.SearchString.value;
    debugger;
    this.APICall.DBCalling("ViewPurchaseIndent", sstring, "All", "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        var temp: any;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstpurchseIndents = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstpurchseIndents = this.lstDbResult.Table;
          this.lsttempindentrecords = this.lstDbResult.Table;
        }
        for (var i = 0; i < this.lstpurchseIndents.length; i++) {
          if (this.lstpurchseIndents[i].lstPurchaseindent1 != null && typeof (this.lstpurchseIndents[i].lstPurchaseindent1) != undefined) {
            temp = ((this.lstpurchseIndents[i].lstPurchaseindent1).replace(/\n/g, "")).replace(/'/g, "\"");
            this.temparray = JSON.parse(temp);
            for (var j = 0; j < this.temparray.length; j++) {
              this.temparray[j];
              this.lsttempPurchseIndents.push({
                CustomerName: this.temparray[j].CustomerName, Description1: this.temparray[j].Description1, IndentId: this.temparray[j].IndentId,
                PurchaseIndentChildId: this.temparray[j].PurchaseIndentChildId, partid: this.temparray[j].partid, partno: this.temparray[j].partno,
                qty: this.temparray[j].qty
              });
            }

          }

        }



        $("#loaderParent").hide();
      });
  }

  SearchClick() {

  }
  onRFQChange(e, d) {
    debugger;

    if (e.target.checked) {
      this.lstselectedIndents.push({
        CustomerName: d.CustomerName, Description1: d.Description1, IndentId: d.IndentId,
        PurchaseIndentChildId: d.PurchaseIndentChildId, partid: d.partid, partno: d.partno,
        qty: d.qty
      });
    }
    else {
      for (var i = 0; i < this.lstselectedIndents.length; i++) {
        if (this.lstselectedIndents[i].PurchaseIndentChildId == d.PurchaseIndentChildId) {
          this.lstselectedIndents.splice(this.lstselectedIndents[i], 1);
          break;
        }
      }
    }

  }

  showReport: string = "";
  SendRFQ() {
    debugger;
    var today = new Date();
    debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    var xml1 = "";
    var rows = "";

    for (var i = 0; i < this.lstVendors.length; i++) {

      rows = rows + '<Table1><PRQId>' + 0 + '</PRQId>'
        + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
        + '<date>' + today + '</date>'
        + '<Vendorid>' + this.lstVendors[i].VendorId + '</Vendorid>'
        + '<PurchaseType>' + 'Invoice' + '</PurchaseType>'
        + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
        + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
        + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
        + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
        + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId></Table1>'
    }
    xml1 = '<NewDataSet>' + rows + '</NewDataSet>';

    var xml2 = "";
    var rows1 = "";

    for (var i = 0; i < this.lstselectedIndents.length; i++) {

      rows1 = rows1 + '<Table1><PRQId>' + (typeof (this.f.PRQId.value) == 'undefined' ? '0' : this.f.PRQId.value) + '</PRQId>'
        // +'<SNO>'+this.SNO+ '</SNO>'
        + '<PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id>' + 0 + '</PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id>'
        + '<ItemId>' + this.lstselectedIndents[i].partid + '</ItemId>'
        + '<description>' + this.lstselectedIndents[i].Description1 + '</description>'
        + '<Quantity>' + this.lstselectedIndents[i].qty + '</Quantity></Table1>'
    }
    xml2 = '<NewDataSet>' + rows1 + '</NewDataSet>';


    debugger;
    this.APICall.DBCalling("SaveInsertRFQ", xml1, xml2, "", "").subscribe(
      (res: Response) => {
        debugger;
        $("#loaderParent").hide();

        this.DbResult = JSON.parse(res['Message']);
        debugger;
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          this.showReport = "RFQ Created"
          this.f.PRQId.setValue(this.DbResult.Table[0].PRQId);

          $('#btnClose').click();
          //   this.SaveTrackRfq();
          (window as any).swal({
            icon: 'success',
            title: 'Information!',
            text: 'Record Saved successfully.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-success'
          });
          
        } else {



          if (this.DbResult.Table[0].DBresult == -3) {
            (window as any).swal({
              icon: 'warning',
              title: 'Exists',
              text: 'Customer Already Exists.!',
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

                  //that.SaveRFQ();
                } else {
                  (window as any).swal("Cancelled", "this file is not updated :)", "error");
                }

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

  }
  CloseRFQ() {
    (<any>$('#drpVendors')).val(null).trigger('change');
    this.lstselectedIndents = [];
    this.lstVendors = [];
  }
  ShowMessage: string = "";
  SaveTrackRfq() {

    debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;

    var xml1 = '<NewDataSet><Table1>'
      + '<PRQId>' + 0 + '</PRQId>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<date>' + this.getControlValue(this.f.vdate, 'string') + '</date>'
      + '<Vendorid>' + this.getControlValue(this.f.PartyId, 'int') + '</Vendorid>'
      + '<PurchaseType>' + this.getControlValue(this.f.PurchaseType, 'string') + '</PurchaseType>'
      + '<Vendorreference>' + this.getControlValue(this.f.Vendorreference, 'string') + '</Vendorreference>'
      + '<Incoterms>' + this.getControlValue(this.f.Incoterms, 'string') + '</Incoterms>'

      + '<prqno>' + this.f.prqno.value + '</prqno>'
      + '<TempPRQ>' + this.f.PRQId.value + '</TempPRQ>'

      + '<Template>' + this.getControlValue(this.f.Template, 'string') + '</Template>'
      + '<PurchaseRepresentative>' + this.getControlValue(this.f.PurchaseRepresentative, 'string') + '</PurchaseRepresentative>'
      + '<PaymentTerms>' + this.getControlValue(this.f.PaymentTerms, 'string') + '</PaymentTerms>'
      + '<StartDate>' + this.getControlValue(this.f.StartDate, 'string') + '</StartDate>'
      + '<RequiredDate>' + this.getControlValue(this.f.RequiredDate, 'string') + '</RequiredDate>'
      + '<Modified>' + 1 + '</Modified>'
      + '<Message>' + this.ShowMessage + '</Message>'
      + '<statusreport>' + 'RFQ Created' + '</statusreport>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '</Table1></NewDataSet>';
    var xml2 = "";
    var rows = "";

    for (var i = 0; i < this.lstselectedIndents.length; i++) {

      rows = rows + '<Table1><ItemId>' + this.lstselectedIndents[i].ItemId + '</ItemId>'
        + '<description>' + this.lstselectedIndents[i].Description1 + '</description>'
        + '<Make>' + (typeof (this.lstselectedIndents[i].MakeId) == 'undefined' ? this.lstselectedIndents[i].MakeId : '0') + '</Make>'
        + '<Condition1>' + this.lstselectedIndents[i].Condition1 + '</Condition1>'
        + '<Condition2>' + this.lstselectedIndents[i].Condition2 + '</Condition2>'
        + '<Condition3>' + this.lstselectedIndents[i].Condition3 + '</Condition3>'
        + '<Manufacturer1>' + this.lstselectedIndents[i].Manufacturer1 + '</Manufacturer1>'
        + '<Manufacturer2>' + this.lstselectedIndents[i].Manufacturer2 + '</Manufacturer2>'
        + '<Manufacturer3>' + this.lstselectedIndents[i].Manufacturer3 + '</Manufacturer3>'
        + '<uom>' + this.lstselectedIndents[i].uom + '</uom>'
        + '<HSN>' + this.lstselectedIndents[i].HSN + '</HSN>'

        + '<Category>' + this.lstselectedIndents[i].ItemCategoryId + '</Category>'
        + '<Quantity>' + this.lstselectedIndents[i].Quantity + '</Quantity>'

        + '<Model>' + (typeof (this.lstselectedIndents[i].ModelId) == 'undefined' ? this.lstselectedIndents[i].ModelId : '0') + '</Model></Table1>'
    }
    xml2 = '<NewDataSet>' + rows + '</NewDataSet>';


    debugger;
    this.APICall.DBCalling("SaveTrackRFQ", xml1, xml2, "", "").subscribe(
      (res: Response) => {

        debugger;
        $("#loaderParent").hide();
        // this.DbResult= (res);
        this.DbResult = JSON.parse(res['Message']);

        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {

        } else {
        }

      },

    );

  }






}
