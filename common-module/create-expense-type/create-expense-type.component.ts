import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ExpenseType } from 'src/app/store/ExpenseType';
import { Common } from 'src/app/store/Common';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-create-expense-type',
  templateUrl: './create-expense-type.component.html',
  styleUrls: ['./create-expense-type.component.css']
})
export class CreateExpenseTypeComponent implements OnInit {

  formCreateExpenseType: FormGroup;
  ExpenseType: ExpenseType;
  // Common: Common;
  submitted = false;
  DbResult: any = [];

  DeviceType = "";
  Id: number = 0;
  Name: string = "";
  Description: string = "";
  ModifiedBy: string = "";
  ModifiedDate: string = "";
  CompanyId: number = 0;
  DeleteFlag: number = 0;
  AccountId: number = 0;
  AccountName: string = "";
  TabId: string = "-1"

  constructor(private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) {

    this.formCreateExpenseType = formBuilder.group(
      {
        Id: new FormControl(''),
        Name: new FormControl('', [Validators.required]),
        Description: new FormControl('', [Validators.required]),
        AccountId: new FormControl(''),
        AccountName: new FormControl(''),
      });

  }




  ngOnInit() {

    this.ExpenseType = new ExpenseType();
    //  this.Common = new Common();
    this.ExpenseType = new ExpenseType;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    

    if (result.length > 0) {

      this.ExpenseType = result[0];

      this.Id = this.ExpenseType.Id;
      this.Name = this.ExpenseType.Name;
      this.Description = this.ExpenseType.Description; 
      this.AccountId = this.ExpenseType.AccountId;
      this.AccountName = this.ExpenseType.AccountName;;
      this.formCreateExpenseType.patchValue(this.ExpenseType);
    }


    var that = this;

    this.formCreateExpenseType.valueChanges.subscribe(value => {

      debugger;
      that.ExpenseType.Id = value.Id;
      that.ExpenseType.Name = value.Name;
      that.ExpenseType.Description = value.Description.toString();
      that.ExpenseType.ModifiedBy = that.ModifiedBy
      that.ExpenseType.ModifiedDate = that.ModifiedDate;
      that.ExpenseType.CompanyId = value.CompanyId;
      that.ExpenseType.ViewName = 'ExpenseType';
      that.ExpenseType.DeleteFlag = 0;
      that.ExpenseType.AccountId = that.AccountId;
      that.ExpenseType.AccountName = that.AccountName.toString();

      that.ExpenseType.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate.toString());
      that.ExpenseType.submitted = that.submitted;
      that.ExpenseType.TabId = ActivatedRoute;
      that.store.dispatch(new TabStore.AddTab(that.ExpenseType));
    });



    this.DeviceType = localStorage.getItem('ExpenseType')
    debugger;
    var ViewData = this.APICall.GetViewData();


    if (ViewData != undefined && typeof (ViewData) != undefined && typeof (ViewData.ViewName) != undefined) {
      debugger;
      if (ViewData.ViewName == 'ExpenseType') {
        debugger;
        this.Id = ViewData.Id;
        this.Name = ViewData.Name;
        this.Description = ViewData.Description;
        this.CompanyId = ViewData.CompanyId;
        this.AccountId = ViewData.AccountId;
        this.AccountName = ViewData.AccountName;
        this.ModifiedBy = ViewData.ModifiedBy;
        //this.ModifiedDate=ViewData.ModifiedDate;
        this.formCreateExpenseType.patchValue(ViewData);
        this.ModifiedDate = ViewData.ModifiedDate;

      }

    }


  }

  get f() {
    return this.formCreateExpenseType.controls;
  }

  Search() {
    // var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    // this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));
    // this.APICall.UpdatedSelectedPath('./Common/ExpenseType');
    // this.router.navigate(['Common/ExpenseType']);
    this.router.navigate(['Common/ExpensesType']);
  }

  ClearViewData() {
    this.ExpenseType.ModifiedDate = "";
    this.formCreateExpenseType.patchValue({
      Name: "",
      AccountId: "",
      Description: ""

    });


    this.ExpenseType = new ExpenseType;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.ExpenseType.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.ExpenseType));
  }





  DeleteExpenseType() {

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;

    // var dt = '';

    // if(this.ExpenseType.Id>0)
    // {
    // dt=this.ExpenseType.ModifiedDate;
    // }
    // else
    // {
    //   dt='';
    // }

    var xml1 = '<NewDataSet><Table1>'
      + '<Id>' + this.ExpenseType.Id + '</Id>'
      + '<Name>' + this.getControlValue(this.f.Name, 'string') + '</Name>'
      + '<Description>' + this.getControlValue(this.f.Description, 'string') + '</Description>'
      + '<AccountId>' + this.ExpenseType.AccountId + '</AccountId>'
      + '<AccountName>' + this.ExpenseType.AccountName + '</AccountName>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '</Table1></NewDataSet>';

    this.APICall.DBCalling("ExpenseTypeDeleteWeb", xml1, "", "", "").subscribe(
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

        that.DeleteExpenseType();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }


    });




  }

  OnSave() {
    debugger;
    this.submitted = true;

    if (this.formCreateExpenseType.invalid) {
      var Cvalid = true;


      if (this.f.Name.invalid && Cvalid) {
        debugger;
        this.APICall.ScrollToControl('Name');
        Cvalid = false;
      }




      return;
    }
    else {
      this.SaveExpenseType();
    }
  }

  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }

  SelectedAccountId = 0;
  SelectedAccountName = '';
  LoadAccounts() {
    var that = this;
    debugger;
    (<any>$("#drpAccounts")).select2({
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
            return JSON.stringify({ "Operation": 'ViewChartOfAccounts', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
                    var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.COAId;
            obj.text = obj.Name;


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
    $('#drpAccounts').on('select2:select', function (e) {

      if (typeof ((<any>e).params.data.id) != 'undefined') {

        debugger;
       

        that.SelectedAccountId = ((<any>e).params.data.id);
        that.ExpenseType.AccountId = that.SelectedAccountId;
        that.ExpenseType.AccountName = (<any>e).params.data.text;
        that.AccountId=that.SelectedAccountId;
        that.AccountName= (<any>e).params.data.text;
        that.f.AccountId.setValue((<any>e).params.data.id);
        that.f.AccountName.setValue((<any>e).params.data.text);
        that.store.dispatch(new TabStore.AddTab(that.ExpenseType));


      }
      debugger;


      var accountselection = new Option(that.ExpenseType.AccountName, that.ExpenseType.AccountId.toString(), true, true);

      (<any>$('#drpAccounts')).append(accountselection).trigger('change');
    });


    $("#drpAccounts").on("select2:unselecting", function (e) {


      that.SelectedAccountId = (0);
      that.ExpenseType.AccountId = 0;

      that.ExpenseType.AccountName = "";

      //that.f.AccountName.setValue( '');

    });

  }


  ngAfterViewInit() {
    debugger;
    (<any>$("#drpAccounts")).select2();
    this.LoadAccounts();


  }


  SaveExpenseType() {

debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    //     var dt = '';
    // debugger;
    //     if(this.ExpenseType.Id>0)
    //     {
    //       dt=this.ExpenseType.ModifiedDate;
    //     }
    //     else{
    // dt='';
    //     }

    
  //  if(this.ExpenseType.ModifiedDate!='' && this.ExpenseType.ModifiedDate!=undefined && this.ExpenseType.ModifiedDate!=null)
  //   {
  //     var  date = new  Date (this.ExpenseType.ModifiedDate);  
  //      this.ModifiedDate= formatDate(new Date(date), 'yyyy-MM-dd HH:mm:ss.SSS', 'en');  
  //   }
      if(this.ModifiedDate!=null && this.ModifiedDate!=undefined && this.ModifiedBy!='')
      {
  this.ModifiedDate= formatDate(new Date(this.ModifiedDate), 'yyyy-MM-dd HH:mm:ss.SSS', 'en');  
      }
      

    var xml1 = '<NewDataSet><Table1>'
      + '<Id>' + this.ExpenseType.Id + '</Id>'
      + '<Name>' + this.getControlValue(this.f.Name, 'string') + '</Name>'
      + '<Description>' + this.getControlValue(this.f.Description, 'string') + '</Description>'
      + '<AccountId>' + this.ExpenseType.AccountId + '</AccountId>'
      + '<AccountName>' + this.ExpenseType.AccountName + '</AccountName>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '</Table1></NewDataSet>';

    debugger;
    this.APICall.DBCalling("ExpensesTypeSaveWeb", xml1, "", "", "").subscribe(
      (res: Response) => {
        debugger;
        $("#loaderParent").hide();

        this.DbResult = JSON.parse(res['Message']);

        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          if (this.f.Name.value > 0) {
            this.ExpenseType.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
          } else {



            this.f.Id.setValue(this.DbResult.Table[0].Id);
            this.ExpenseType.ModifiedDate = this.DbResult.Table[0].ModifiedDate;


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
              text: 'Expense Type Already Exists.!',
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
                title: "Transaction modified by " + this.DbResult.Table[0].ModifiedBy + "! ",
                text: "Do you wants to overwrite?",

                buttons: [
                  'No, cancel it!',
                  'Yes, I am sure!'
                ],
                dangerMode: true,
              }).then(function (isConfirm) {

                if (isConfirm) {

                  that.ExpenseType.ModifiedDate = that.DbResult.Table[0].ModifiedDate;

                  that.SaveExpenseType();
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


  // private GetValidDate() {
  //   var dt = '';
  //   if (this.ExpenseType.ModifiedDate == null || this.ExpenseType.ModifiedDate == undefined || this.ExpenseType.ModifiedDate == '') {
  //     dt = this.Common.TodaysDate;
  //   }
  //   else {
  //     dt = this.ExpenseType.ModifiedDate;
  //   }
  //   return dt;
  // }
}
