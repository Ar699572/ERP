import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import * as XLSX from 'xlsx';
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import '../../../assets/vendors/datepicker/daterangepicker.js';
import { Store } from '@ngrx/store';
import { StorePurchaseReturns } from 'src/app/Store/StorePurchaseReturns';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Vendor } from 'src/app/store/StoreVendor';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { GstType } from 'src/app/store/GstType';

@Component({
  selector: 'app-create-purchase-returns',
  templateUrl: './create-purchase-returns.component.html',
  styleUrls: ['./create-purchase-returns.component.css']
})
export class CreatePurchaseReturnsComponent implements OnInit {

  CreatePurchaseReturns: FormGroup;
  TransactionType = "Purchase";
  DisplayVendorId = 0;
  Invoiceno: string = "";
  DispalyVendorName = "";
  DisplaySequenceNumberId = 0;
  DispalyFormName = 'PurchaseReturns'
  OrderData: any;
  CurrentTime: string = '';
  submitted = false;
  ModifiedDate: string = '';
  lstReturnsItems: any = [];
  DbResult: any;
  StorePurchaseReturns: StorePurchaseReturns;
  TotalGross = 0;
  TotalCGST = 0;
  TotalSGST = 0;
  TotalIGST = 0;
  TotalDiscount = 0;
  TotalTax = 0;
  Total = 0;
  PartyGSTNo = '';
  ProductErrormsg='';
  TaxType='';
  TotalCharges=0;
  AfterDiscount=0;
  showError=false;

  constructor(private DbCallings: CommonDbCallings, private router: Router, private formBuilder: FormBuilder, public APICall: APICallingService, private store: Store<any>) {

    var res = this.APICall.GetCurrencyId();
    this.CreatePurchaseReturns = formBuilder.group({

      SequenceNumberId: new FormControl(0),
      Contactno: new FormControl(''),
      Email: new FormControl(''),
      TransactionTime: new FormControl('', [Validators.required]),
      Billto: new FormControl(''),
      Shipto: new FormControl(0),
      ShiptoAddress: new FormControl(''),
      CurrencyId: new FormControl(this.APICall.GetCurrencyId()),
      ExchangeRate: new FormControl(1),
      Terms: new FormControl(''),
      TermsandConditions: new FormControl(''),
      Image: new FormControl(''),
      Notes: new FormControl(''),
      PaymentTerms: new FormControl(''),
      PurchaseType: new FormControl(''),
     
      TransactionDate: new FormControl('', [Validators.required]),
      TransactionId: new FormControl(0),
      TransactionNo: new FormControl(''),
      PurchaseRepresentative: new FormControl(''),
      PartyId: new FormControl(0, [Validators.required, Validators.min(1)]),
      PartyName: new FormControl(''),
      Vendorreference: new FormControl(''),
      vdate: new FormControl(''),
      Incoterms: new FormControl(''),
      LineChanges: new FormControl(0),
      SearchString: new FormControl(''),
      searchPartNo: new FormControl(''),
      searchDescription: new FormControl(''),
      searchMake: new FormControl(''),
      searchHSN: new FormControl(''),
      ReferenceId: new FormControl(0),
      ReferenceName: new FormControl(''),
      ReturnSourceType: new FormControl(''),
      LocationId:new FormControl(0, [Validators.required]),
      BinId:new FormControl(0, [Validators.required]),
      LocationName: new FormControl(''),
      BinName: new FormControl('')
    });

    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }

  get f() {
    return this.CreatePurchaseReturns.controls;
  }

  // windowScroll(ControlName) {
  //   var element = document.getElementById(ControlName);
  //   var rect = element.getBoundingClientRect();

  //   window.scrollTo(rect.left, rect.top);
  // }

  OnPrint() {
    this.OrderData = this;
  }



  ngOnInit() {
    this.StorePurchaseReturns = new StorePurchaseReturns;    

     var ActivatedRoute = localStorage.getItem("ActivatedRoute");
     var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

    if (result.length > 0) {
      debugger;
      this.StorePurchaseReturns = (result[0]);
      this.ModifiedDate = this.StorePurchaseReturns.ModifiedDate.toString();     
      this.Invoiceno = this.StorePurchaseReturns.ReturnSourceNo;
      this.DispalyVendorName = this.StorePurchaseReturns.VendorName;
      this.DisplayVendorId = this.StorePurchaseReturns.VendorId;
      this.PartyGSTNo = this.StorePurchaseReturns.PartyGSTNo;
      this.lstReturnsItems = this.StorePurchaseReturns.lstReturnsItems == null ? [] : this.StorePurchaseReturns.lstReturnsItems;
      this.TaxType = this.StorePurchaseReturns.TaxType;
      var i = 0;
      var that = this;
      var lstOrderItemsdata = $.map(this.lstReturnsItems, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      this.lstReturnsItems = lstOrderItemsdata;      
      var TransactionDate='';
      var TransactionTime='';
      if (this.StorePurchaseReturns.date != '') {
      // var RequiredDate = formatDate(new Date(this.StorePurchaseReturns.date), 'MM/dd/yyyy', 'en');
         TransactionDate = formatDate(new Date(this.StorePurchaseReturns.date), 'yyyy-MM-dd', 'en');
         TransactionTime=  formatDate(new Date(this.StorePurchaseReturns.time), 'HH:mm', 'en');
      } else {
       // var RequiredDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
         TransactionDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          TransactionTime=  formatDate(new Date(), 'HH:mm', 'en');
      }
      debugger;


      var LocationSelection = new Option(this.StorePurchaseReturns.Location, this.StorePurchaseReturns.LocationId.toString(), true, true);      
      (<any>$('#drpLocation')).append(LocationSelection).trigger('change');
  
      this.LoadBinsByLocation();
  
  
     // this.CreatePurchaseReturns.patchValue(this.StorePurchaseReturns);
     this.f.TransactionDate.setValue(TransactionDate);
   
     this.f.TransactionTime.setValue(TransactionTime);
      $("#ReturnSourceType").val('PurchaseInvoice')
     // $("#RequiredDate").val(RequiredDate)
      // $("#TransactionDate").val(TransactionDate)
      // $("#TransactionTime").val(TransactionTime)
      
      if(this.StorePurchaseReturns.ReturnSourceType=='')
      {
        this.StorePurchaseReturns.ReturnSourceType='PurchaseInvoice';
        this.f.ReturnSourceType.setValue('PurchaseInvoice');
      }
      else
      {
        this.f.ReturnSourceType.setValue(this.StorePurchaseReturns.ReturnSourceType);
      }
      
this.SourceTypeChange(this.StorePurchaseReturns.ReturnSourceType);

     // this.f.vdate.setValue(formatDate(this.StorePurchaseReturns.date, 'yyyy-MM-dd', 'en'));
      //this.ShippingDetailsPartyId(this.StorePurchaseOrder.PartyId,false);
     
    }

    this.CalculateTotals();

    var that = this;
    this.CreatePurchaseReturns.valueChanges.subscribe(value => {
      that.StorePurchaseReturns.SequenceNumberId = value.SequenceNumberId;
      that.StorePurchaseReturns.contactNo = value.Contactno;
      that.StorePurchaseReturns.email = value.Email;
      that.StorePurchaseReturns.date = value.date;
      that.StorePurchaseReturns.billto = value.Billto;

      that.StorePurchaseReturns.TaxType = that.TaxType;     
      that.StorePurchaseReturns.time = value.TransactionTime;
      that.StorePurchaseReturns.date = value.TransactionDate;
    //  that.StorePurchaseReturns.ReturnSourceId = value.ReferenceId;

      that.StorePurchaseReturns.Invoiceno = value.TransactionNo;
      that.StorePurchaseReturns.VendorName = value.PartyName;
      that.StorePurchaseReturns.PartyGSTNo = this.PartyGSTNo;

      that.StorePurchaseReturns.VendorId = value.PartyId;

      that.StorePurchaseReturns.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate.toString());
      that.StorePurchaseReturns.ViewName = 'PurchaseOrder';

      that.StorePurchaseReturns.lstReturnsItems = that.lstReturnsItems;

      
      that.store.dispatch(new TabStore.AddTab(that.StorePurchaseReturns));
    });

  }

  ngAfterViewInit() {  
  
    this.LoadLocations();
    this.LoadBinsByLocation();
  
  }


 

  CalculateTotals() {
    debugger;
    this.TotalGross = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.AfterDiscount = 0;
    for (let i = 0; i < this.lstReturnsItems.length; i++) {

      // this.lstOrderItems[i]
      this.lstReturnsItems[i].Gross = ((+this.lstReturnsItems[i].ReturnQty) * ((+this.lstReturnsItems[i].Rate) * (+this.f.ExchangeRate.value)));

      this.lstReturnsItems[i].CurrencyRate = (this.lstReturnsItems[i].Rate * (+this.f.ExchangeRate.value))
      this.lstReturnsItems[i].DiscountAmount = (((+this.lstReturnsItems[i].Gross) * (+this.lstReturnsItems[i].DiscountPercentage)) / 100) * (+this.f.ExchangeRate.value)
      var AfterDiscount = ((+this.lstReturnsItems[i].Gross) - (+ this.lstReturnsItems[i].DiscountAmount));;

      this.lstReturnsItems[i].SGSTAmount = (((+this.lstReturnsItems[i].SGST) * AfterDiscount) / 100);
      this.lstReturnsItems[i].CGSTAmount = (((+this.lstReturnsItems[i].CGST) * AfterDiscount) / 100);
      this.lstReturnsItems[i].IGSTAmount = (((+this.lstReturnsItems[i].IGST) * AfterDiscount) / 100);
      this.lstReturnsItems[i].TotalTax = (+this.lstReturnsItems[i].SGSTAmount) + (+this.lstReturnsItems[i].CGSTAmount) + (+this.lstReturnsItems[i].IGSTAmount);

      this.TotalCGST = this.TotalCGST + (+this.lstReturnsItems[i].CGSTAmount);
      this.TotalSGST = this.TotalSGST + (+this.lstReturnsItems[i].SGSTAmount);
      this.TotalIGST = this.TotalIGST + (+this.lstReturnsItems[i].IGSTAmount);
      this.TotalGross = this.TotalGross + (+this.lstReturnsItems[i].Gross);
      this.TotalDiscount = this.TotalDiscount + (+this.lstReturnsItems[i].DiscountAmount);
      this.TotalTax = this.TotalTax + (+this.lstReturnsItems[i].TotalTax);
      this.lstReturnsItems[i].NetTotal = ((AfterDiscount + (+this.lstReturnsItems[i].TotalTax))).toFixed(2);

      this.Total = this.Total + (+this.lstReturnsItems[i].NetTotal);

    }
    this.AfterDiscount = this.TotalGross - this.TotalDiscount;
    
  }


  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }


  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.ctrlKey || event.metaKey) {

      switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
          event.preventDefault();
          this.OnSave();

          break;

        case 'a':

          event.preventDefault();
          this.ClearViewData();

          break;

        case 'd':
          event.preventDefault();
          this.OnDelete();
          break;
        case 'o':
          event.preventDefault();
          // this.Search();

          break;
      }
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

        that.DeletePurchaseReturns();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }

    });

  }

  DeletePurchaseReturns() {

    // if (this.ModifiedDate.toString().includes('India')) {

    //   var date = new Date(this.ModifiedDate);


    //   this.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-dd HH:mm:ss', 'en');
    // }
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<TransactionId>' + this.StorePurchaseReturns.PurchaseReturnsId + '</TransactionId>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'
      + '</Table1></NewDataSet>';

    this.APICall.DBCalling("DeletePurchaseReturnsWeb", xml1, "", "", "").subscribe(
      (res: Response) => {

        $("#loaderParent").hide();
        this.DbResult = JSON.parse(res['Message']);
        debugger;
        //  var l=this.DbResult.Table[0].length;
        // var tr=this.DbResult.Table[0].DBresult;
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          this.ClearViewData();

          (window as any).swal({
            icon: 'success',
            title: 'Information!',
            text: 'Record Deleted successfully.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-success'
          });

          this.router.navigate(['Purchase/PurchaseReturns']);
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


  ClearViewData() {
    this.submitted = false;
    this.ModifiedDate = "";
    this.CreatePurchaseReturns.patchValue(
      {
        SequenceNumberId: 0,
        Contactno: '',
        PartyName: '',
        Email: '',
        RequiredDate: '',
        Billto: '',
        Shipto: 0,
        ShiptoAddress: '',
        Terms: '',
        TermsandConditions: '',
        PaymentTerms: '',
        TransactionTime: '',
        TransactionDate: '',
        TransactionId: 0,
        TransactionNo: '',

        PartyId: 0,


        SearchString: '',
        searchPartNo: '',
        searchDescription: '',
        searchMake: '',
        searchHSN: ''

      }
    );
    this.PartyGSTNo = '';
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);

    var rdate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    $("#RequiredDate").val(rdate)
    $("#TransactionDate").val(rdate)
    $("#TransactionTime").val(this.CurrentTime)
    this.lstReturnsItems = null;
    this.lstReturnsItems = [];
    this.DisplayVendorId = 0;
    this.DispalyVendorName = "";
    this.DisplaySequenceNumberId = 0;
    this.TotalGross = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    debugger;
    this.StorePurchaseReturns = new StorePurchaseReturns;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StorePurchaseReturns.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StorePurchaseReturns));


  }

  RemoveRecord(index) {
    this.lstReturnsItems.splice(index, 1);
  }

  convertDate(str) {
  
    var date = new Date(str),
      mnth: any = ("0" + (date.getMonth() + 1)).slice(-2),
      day: any = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    var resDate = [mnth, day, date.getFullYear()].join("-");
   
    return resDate + " " + hours + ":" + minutes;

  }


  OnSave() {
    debugger;
       this.submitted = true;
   
       
       var Cvalid = true;
      // if (this.CreatePurchaseReturns.invalid) {      
   
   
         if (this.f.PartyId.value==0 && Cvalid) {
         
          // this.windowScroll('PartyId');
           Cvalid = false;
         }
   
         if (this.f.TransactionDate.value=='' && Cvalid) {
         
          // this.windowScroll('TransactionDate');
           Cvalid = false;
         }
   
   
        //  if (this.f.Email.value=='' && Cvalid) {
           
        //    //this.windowScroll('Email');
        //    Cvalid = false;
        //  }
   
   
         if (this.f.TransactionTime.value=='' && Cvalid) {
         
           //this.windowScroll('TransactionTime');
           Cvalid = false;
         }
   
   
         if (this.f.LocationId.value==0 && Cvalid) {
        
          // this.windowScroll('Location');
           Cvalid = false;
         }
   
   
         if (this.f.BinId.value==0 && Cvalid) {
          
          // this.windowScroll('Bin');
           Cvalid = false;
         }
   
         if(this.lstReturnsItems.length>0 && Cvalid)
         {
           for(let x=0; x<this.lstReturnsItems.length; x++)
           {
             if(this.lstReturnsItems[x].ReturnQty==0)
             {
               Cvalid = false;
               (window as any).swal("Warning", "Please Select Return Quantity for Return Items", "error");
             }
           }
         }
   
        // return;
      // }
      // else {
         this.ProductErrormsg = '';
   
         for (let i = 0; i < this.lstReturnsItems.length; i++) {
   
           if ((+this.lstReturnsItems[i].Qty) < 1) {
   
             this.ProductErrormsg = 'Invalid Return Qty';
             Cvalid = false;
           }
         }
      // }
   
         if ( Cvalid) {
           this.SaveTransaction();
         }
       
     }


     SaveTransaction() {

    //  this.f.TransactionDate.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());
     // this.f.TransactionTime.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());
      
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
      $("#loaderParent").show();
  
      var xml1 = '<NewDataSet><Table1>'
        + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
        + '<supplier>' + this.getControlValue(this.f.PartyId, 'int') + '</supplier>'
        + '<billto>' + this.getControlValue(this.f.Billto, 'string') + '</billto>'
        + '<Returnno>' + this.getControlValue(this.f.TransactionNo, 'string') + '</Returnno>'
        + '<RefId>' +this.StorePurchaseReturns.ReturnSourceId + '</RefId>'
        + '<RefNo>' + this.StorePurchaseReturns.ReturnSourceNo + '</RefNo>'
        + '<RefDate>' +this.StorePurchaseReturns.ReturnSourceDate + '</RefDate>'     
        + '<RefType>' + this.getControlValue(this.f.ReturnSourceType, 'string') + '</RefType>'
        + '<BinId>' + this.getControlValue(this.f.BinId, 'int') + '</BinId>'
        + '<Bin>' + this.StorePurchaseReturns.Bin + '</Bin>'
        + '<LocationId>' + this.getControlValue(this.f.LocationId, 'int') + '</LocationId>'
        + '<Location>' + this.StorePurchaseReturns.Location + '</Location>'
        + '<remarks>' + this.getControlValue(this.f.Notes, 'string') + '</remarks>'
        + '<purchaseaccount>' + this.StorePurchaseReturns.purchaseaccount + '</purchaseaccount>'
        + '<discountaccount>' + this.StorePurchaseReturns.Discountaccount+ '</discountaccount>'
        + '<time>' + this.getControlValue(this.f.TransactionTime, 'string') + '</time>'
        + '<date>' + this.convertDate(this.getControlValue(this.f.TransactionDate, 'string')) + '</date>'        
        + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
        + '<email>' + this.getControlValue(this.f.Email, 'string') + '</email>'      
        + '<createdby>' + this.APICall.GetUserName() + '</createdby>'
        + '<grossamount>' + this.TotalGross + '</grossamount>'
        + '<totaldiscount>' + this.TotalDiscount + '</totaldiscount>'
        + '<taxamount>' + this.TotalTax + '</taxamount>'
        + '<netamount>' + this.Total + '</netamount>'
        + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
        + '<branch>' + this.APICall.GetBranchID() + '</branch>'      
        + '<afterdiscount>' + this.AfterDiscount + '</afterdiscount>'
        + '<sgstamt>' + this.TotalSGST + '</sgstamt>'
        + '<cgstamt>' + this.TotalCGST + '</cgstamt>'
        + '<igstamt>' + this.TotalIGST + '</igstamt>'
        + '<TaxType>' + this.TaxType + '</TaxType>'
        + '<PurchaseReturnsId>' + this.StorePurchaseReturns.PurchaseReturnsId  + '</PurchaseReturnsId>'
        + '<Contactno>' + this.getControlValue(this.f.Contactno, 'string') + '</Contactno>'
        + '</Table1></NewDataSet>';
      var xml2 = "";
  
      var rows = "";
  
      for (var i = 0; i < this.lstReturnsItems.length; i++) {
  
        rows = rows + '<Table1>'
          + '<LineId>' + this.lstReturnsItems[i].LineId + '</LineId>'
          + '<Description>' + this.lstReturnsItems[i].Description + '</Description>'
          + '<Partno>' + this.lstReturnsItems[i].Partno + '</Partno>'
          + '<BinId>' + this.getControlValue(this.f.BinId, 'int') + '</BinId>'
          + '<LocationId>' + this.getControlValue(this.f.LocationId, 'int') + '</LocationId>'       
          + '<ItemId>' + this.lstReturnsItems[i].ItemId + '</ItemId>'
          + '<PartNoId>' + this.lstReturnsItems[i].ItemId + '</PartNoId>'
          + '<MakeId>' + this.lstReturnsItems[i].MakeId + '</MakeId>'
          + '<UOMId>' + this.lstReturnsItems[i].UOMId + '</UOMId>'
          + '<Make>' + this.lstReturnsItems[i].Make + '</Make>'
          + '<UOM>' + this.lstReturnsItems[i].UOM + '</UOM>'
          + '<Rate>' + this.lstReturnsItems[i].Rate + '</Rate>'
          + '<Qty>' + this.lstReturnsItems[i].Qty + '</Qty>'
          + '<AvlQty>' + this.lstReturnsItems[i].AvlQty + '</AvlQty>' 
          + '<ReturnQty>' + this.lstReturnsItems[i].ReturnQty + '</ReturnQty>'       
          + '<Gross>' + this.lstReturnsItems[i].Gross + '</Gross>'
          + '<DiscountPercentage>' + this.lstReturnsItems[i].DiscountPercentage + '</DiscountPercentage>'
          + '<DiscountAmount>' + this.lstReturnsItems[i].DiscountAmount + '</DiscountAmount>'
          + '<CGST>' + this.lstReturnsItems[i].CGST + '</CGST>'
          + '<CGSTAmount>' + this.lstReturnsItems[i].CGSTAmount + '</CGSTAmount>'
          + '<SGST>' + this.lstReturnsItems[i].SGST + '</SGST>'
          + '<SGSTAmount>' + this.lstReturnsItems[i].SGSTAmount + '</SGSTAmount>'
          + '<IGST>' + this.lstReturnsItems[i].IGST + '</IGST>'
          + '<IGSTAmount>' + this.lstReturnsItems[i].IGSTAmount + '</IGSTAmount>'
          + '<TotalTax>' + this.lstReturnsItems[i].TotalTax + '</TotalTax>'
          + '<NetTotal>' + this.lstReturnsItems[i].NetTotal + '</NetTotal>'
          + '<TaxType>' + this.lstReturnsItems[i].TaxType + '</TaxType>'
          + '<SGSTAccountId>' + this.lstReturnsItems[i].SGSTAccountId + '</SGSTAccountId>'
          + '<CGSTAccountId>' + this.lstReturnsItems[i].CGSTAccountId + '</CGSTAccountId>'
          + '<IGSTAccountId>' + this.lstReturnsItems[i].IGSTAccountId + '</IGSTAccountId>'
          + '<RefType1>' + this.getControlValue(this.f.ReturnSourceType, 'string') + '</RefType1>'
          + '<RefNo0>' + this.lstReturnsItems[i].RefNo2 + '</RefNo0>'
          + '<RefDate2>' + this.lstReturnsItems[i].RefDate3 + '</RefDate2>'
          + '<RefLineID34>' + this.lstReturnsItems[i].RefLineId33 + '</RefLineID34>'
          + '<RefId>' + this.lstReturnsItems[i].RefId + '</RefId>'
          + '<GstType>' + this.lstReturnsItems[i].TaxType + '</GstType>'
          + '<PurchaseReturnsId>' + this.lstReturnsItems[i].PurchaseReturnsId + '</PurchaseReturnsId>'
          + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
          + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>' 
          + '<HSN>' + this.lstReturnsItems[i].HSN + '</HSN>'          
          + '<Location>' + this.StorePurchaseReturns.Location + '</Location>'         
          + '<Bin>' + this.StorePurchaseReturns.Bin+ '</Bin></Table1>'
         
      }
      xml2 = '<NewDataSet>' + rows + '</NewDataSet>';
  
  
  
      debugger;
      this.APICall.DBCalling("SavePurchaseReturns", xml1, xml2, "", this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
  
          debugger;
          $("#loaderParent").hide();
          // this.DbResult= (res);
          this.DbResult = JSON.parse(res['Message']);
  
          //  var l=this.DbResult.Table[0].length;
          // var tr=this.DbResult.Table[0].DBresult;
          if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
            if ((+this.getControlValue(this.f.TransactionId, 'int')) > 0) {
              this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
              (window as any).swal({
                icon: 'success',
                title: 'Information!',
                text: 'Record Updated successfully.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-success'
              });
            } else {
              //  this.CreateBranches.patchValue({
  
  
              this.f.TransactionId.setValue(this.DbResult.Table[0].TransactionId);
              this.f.TransactionNo.setValue(this.DbResult.Table[0].TransactionNo);
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
  
            debugger;
            this.lstReturnsItems = null;
            this.lstReturnsItems = [];
  
  
            if (this.DbResult.Table.length > 0) {
  
              try {
  
                if (this.DbResult.Table1.length > 0)//lstres[0].Table=="SalesReturns1")
                {
                  //var res1=JSON.parse((( this.DbResult.Table1[0].lstReturnsItems).replace(/\n/g, "")).replace(/'/g,"\""));
                  var lstresReturnsItems = JSON.parse(((this.DbResult.Table1[0].lstReturnsItems).replace(/\n/g, "")).replace(/'/g, "\""));
                  var i = 0;
                  var ReturnsItemsdata = $.map(lstresReturnsItems, function (obj) {
                    i = i + 1;
                    obj.SNO = i;
  
                    return obj;
                  });
  
                  this.lstReturnsItems = ReturnsItemsdata;
  
  
                }
              } catch (exce) { }
  
            }  
          } else {  
            if (this.DbResult.Table[0].DBresult == -3) {
              (window as any).swal({
                icon: 'warning',
                title: 'Exists',
                text: 'Returns Already Exists.!',
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
  
                    that.SaveTransaction();
                  } else {
                    (window as any).swal("Cancelled", "this file is not updated :)", "error");
                  }
  
                });
                } else {

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

    TransactionDateChange(e) {
      debugger;
  
    }
    TransactionDate = $("#TransactionDate").val();

    SelectedProductData = {
      SNO: 1
      , VoucherType: ''
      , LineId: '0'
      , Description: ''
      , Note: ''
      , Partno: ''
      , ItemId: 0
      , MakeId: 0
      , UOMId: 0
      , Make: ''
      , UOM: ''
  
      , Rate: 0
      , Qty: 1
  
  
  
      , Gross: 0
      , DiscountPercentage: 0
      , DiscountAmount: 0
  
  
  
      , CGST: 0
      , CGSTAmount: 0
      , SGST: 0
  
  
  
      , SGSTAmount: 0
      , IGST: 0
      , IGSTAmount: 0
  
      , BCDPer: 0
      , BCDAmount: 0
      , SWSPer: 0
      , SWSAmount: 0
      , SWSAccountId: 0
      , BCDAccountId: 0
      , TotalTax: 0
      , NetTotal: 0
  
      , TaxType: 0
      , LocationId: 0
      , BinId: 0
      , Locationname: ''
      , BinName: ''
  
  
      , HSN: ''
      , SGSTAccountId: 0
      , CGSTAccountId: 0
      , IGSTAccountId: 0 
  
      , Show: 'true'
    }
  
    errormsg='';
    PartyId = '0';
    EditRecNO=0;

    PrepareSerchStringByField() {

      var searchPartNo = this.getControlValue(this.f.searchPartNo, "string");
      var searchDescription = this.getControlValue(this.f.searchDescription, "string");
      var searchMake = this.getControlValue(this.f.searchMake, "string");
      var searchHSN = this.getControlValue(this.f.searchHSN, "string");
  
      debugger;
      if (this.SerchType == 'Like') {
  
  
        if (searchPartNo != "" || searchDescription != "" || searchMake != "" || searchHSN != "") {
          for (var i = 0; i < this.lstReturnsItems.length; i++) {
  
            if ((this.lstReturnsItems[i].Partno).toString().includes(searchPartNo) ||
  
              (this.lstReturnsItems[i].Make).toString().includes(searchDescription) ||
              (this.lstReturnsItems[i].Description).toString().includes(searchMake) ||
              (this.lstReturnsItems[i].HSN).toString().includes(searchHSN)
  
            ) {
  
  
  
              this.lstReturnsItems[i].Show = 'true';
            } else {
              this.lstReturnsItems[i].Show = 'false';
  
  
            }
          }
        }
  
  
      }
      else {
  
  
        for (var i = 0; i < this.lstReturnsItems.length; i++) {
  
          if ((this.lstReturnsItems[i].Partno) == ((searchPartNo) != "" ? (searchPartNo) : this.lstReturnsItems[i].Partno) &&
  
            (this.lstReturnsItems[i].Make) == ((searchMake) != "" ? (searchMake) : this.lstReturnsItems[i].Make) &&
            (this.lstReturnsItems[i].Description) == ((searchDescription) != "" ? (searchDescription) : this.lstReturnsItems[i].Description) &&
            (this.lstReturnsItems[i].HSN) == ((searchHSN) != "" ? (searchHSN) : this.lstReturnsItems[i].HSN)
  
          ) {
  
  
  
            this.lstReturnsItems[i].Show = 'true';
          } else {
            this.lstReturnsItems[i].Show = 'false';
  
  
  
          }
  
        }
      }
  
  
  
  
  
    }
    SerchType = 'Like'
    SerchTypeChange(ChangedValue) {
  
      if (ChangedValue == false) {
        this.SerchType = 'Equal'
        if (this.FilterType == 'All')
          $('#customSwitch').trigger('click');
  
      } else {
        this.SerchType = 'Like'
      }
    }
    FilterType = 'All'
    GetSearchDetails() {
  
      debugger;
      var SearchString = "";
      if (this.FilterType != 'All') {
        this.PrepareSerchStringByField();
      }
      else {
        SearchString = this.getControlValue(this.f.SearchString, "string")
  
        for (var i = 0; i < this.lstReturnsItems.length; i++) {
  
          if (
  
            (this.lstReturnsItems[i].Partno).toString().includes(SearchString) ||
            (this.lstReturnsItems[i].Make).toString().includes(SearchString) ||
            (this.lstReturnsItems[i].HSN).toString().includes(SearchString) ||
            (this.lstReturnsItems[i].Description).toString().includes(SearchString)
  
            //(this.lstReturnsItems[i].ExcessRsPerKms).toString().includes(SearchString)  
          ) {
  
  
  
            this.lstReturnsItems[i].Show = 'true';
          } else {
            this.lstReturnsItems[i].Show = 'false';
  
  
          }
        }
  
      }
      return SearchString;
  
  
    }
    Search() {
      var ActivatedRoute = localStorage.getItem("ActivatedRoute");
      this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));
      this.APICall.UpdatedSelectedPath('./Sales/SalesReturns');
      this.router.navigate(['Sales/SalesReturns']);
    }
    FilterTypeChange(event) {
  
      debugger;
  
  
      if (this.SerchType == 'Like' && event.target.checked == true) {
        this.FilterType = (event.target.checked == true ? 'All' : 'Field');
      } else {
  
        event.target.checked = false;
        this.FilterType = 'Field';
  
      }
  
  
    }
  
    CompanyStateId = (+this.APICall.GetCompanyStateID());
    selectedVendor:any;
    VendorValueChange(event) {
     
      debugger;
      this.selectedVendor = Object.assign({}, event);
      this.DisplayVendorId = event.VendorId;   
      this.f.Email.setValue(event.email);
      this.f.Contactno.setValue(event.Contactno);
      this.f.PartyId.setValue(event.VendorId);
      this.f.PartyName.setValue(event.text);
      this.PartyGSTNo = event.gstno;
      
      var Address = (event.address1 != "" ? event.address1 : '');
  
      if (Address != "" && event.address2 != "") {
        Address = Address + ',' + (event.address2 != "" ? event.address2 : '');
      }
  
      if (Address != "" && event.address3 != "") {
        Address = Address + ',' + (event.address3 != "" ? event.address3 : '');
      }
  
  
      if (Address != "" && event.cityname != "") {
        Address = Address + ',' + (event.cityname != "" ? event.cityname : '');
      }
      if (Address != "" && event.statename != "") {
        Address = Address + ',' + (event.statename != "" ? event.statename : '');
      }
      if (Address != "" && event.countryname != "") {
        Address = Address + ',' + (event.countryname != "" ? event.countryname : '');
      }
      if (Address != "" && event.pincode != "") {
        Address = Address + ',' + (event.pincode != "" ? event.pincode : '');
      }
      this.f.Billto.setValue(Address);

      this.SourceTypeChange(this.StorePurchaseReturns.ReturnSourceType);

    }


    SourceTypeChange(event) {
      try {
        debugger;
        this.StorePurchaseReturns.ReturnSourceType = event;
        this.LoadReference();  
      }
      catch (e) { }
    }

    LoadLocations() {

      var that = this;
  
  
  
  
  
  
      (<any>$("#drpLocation")).select2({
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
              return JSON.stringify({ "Operation": 'ViewLocationsFromBranch', "Params": sstring, "Xml2": 'All', "Xml3": that.APICall.GetBranchID(), "Xml4": that.APICall.GetCompanyID() })
  
            }
          ,
          contentType: 'application/json; charset=utf-8',
          processResults: function (response) {
  
  
  
  
            var ResultData1 = (JSON.parse(response['Message'])).Table;
  
            var data1 = $.map(ResultData1, function (obj) {
  
              obj.id = obj.LocationId;
              obj.text = obj.locationname;
  
  
              return obj;
            });
  
  
  
            return {
  
  
              results: data1
  
            };
          },
          cache: false
  
        }
        // , templateResult: this.formatMake
        // ,templateSelection: this.format
        //,minimumInputLength: 3
      });
  
  
  
  
      // $('#drpLocation').on('select2:open', function (e) {
  
  
  
  
      //    var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="60%"><b>Make</b></td> <td width="20%"><b>UOMName</b></td>  <td width="20%"><b>Price</b></td> </tr > </tbody> </table>';
  
      //   var res= $('.select2-search');
  
      //   var text=res[0].innerText;
  
      //   if(text=="")
      //    $('.select2-search').append(html);
  
  
  
  
  
      // });
  
      var that = this;
      $('#drpLocation').on('select2:select', function (e) {
  
  
  
  
        if (typeof ((<any>e).params.data.id) != 'undefined') {
          debugger;
  
          that.f.LocationId.setValue((<any>e).params.data.id);
          that.f.LocationName.setValue((<any>e).params.data.text);
          that.LoadBinsByLocation();
  
        }
  
  
      });
      var LocationSelection = new Option(this.f.LocationName.value, this.f.LocationId.value.toString(), true, true);
      //AccountSelection.id=this._COAId.toString();
      (<any>$('#drpLocation')).append(LocationSelection).trigger('change');
  
      $("#drpLocation").on("select2:unselecting", function (e) {
  
        that.f.LocationId.setValue(0);
  
        that.f.LocationName.setValue('');
        (<any>$('#drpLocation')).val(null).trigger('change');
        (<any>$('#drpBin')).val(null).trigger('change');
        });  
    }


    LoadBinsByLocation() {
      var that = this;
  
      (<any>$("#drpBin")).select2({
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
              return JSON.stringify({ "Operation": 'ViewBinsFromLocation', "Params": sstring, "Xml2": 'All', "Xml3": that.f.LocationId.value, "Xml4": that.APICall.GetCompanyID() })
  
            }
          ,
          contentType: 'application/json; charset=utf-8',
          processResults: function (response) {
  
            var ResultData2 = (JSON.parse(response['Message'])).Table;
  
            var data2 = $.map(ResultData2, function (obj) {
  
              obj.id = obj.BinId;
              obj.text = obj.binname; 
  
              return obj;
            });
  
            return {  results: data2 };
          },
          cache: false
  
        }
        
      });
  
      var that = this;
      $('#drpBin').on('select2:select', function (e) {
  
        if (typeof ((<any>e).params.data.id) != 'undefined') {
  
          that.f.BinId.setValue((<any>e).params.data.BinId);
          that.f.BinName.setValue((<any>e).params.data.binname);
          //  that.LoadBinsByLocation();  
        } 
  
      });
      var BinSelection = new Option(this.f.BinName.value, this.f.BinId.value.toString(), true, true);
      //AccountSelection.id=this._COAId.toString();
      (<any>$('#drpBin')).append(BinSelection).trigger('change');
  
      $("#drpBin").on("select2:unselecting", function (e) {
  
        that.f.BinId.setValue(0);
        that.f.BinName.setValue('');
  
        (<any>$('#drpBin')).val(null).trigger('change');
  
      });
    }


    LoadReference() {
      debugger;
      var that = this;
      if (this.StorePurchaseReturns.ReturnSourceType != undefined && this.StorePurchaseReturns.ReturnSourceType != null && this.StorePurchaseReturns.ReturnSourceType != "") {
  
        
        (<any>$("#drpReference")).select2({
          allowClear: true,
          placeholder: "Select",
          ajax: {
            url: this.APICall.DBCallingURL,
            type: "POST",
            dataType: 'json',
            delay: 250, minimumInputLength: 4,
            data:
              function (params) {
  
                var sstring = "";
                if (params.term != undefined) {
                  sstring = params.term;
                }
                debugger;
                return JSON.stringify({ "Operation": 'PurchaseReturnReferences', "Params": that.StorePurchaseReturns.ReturnSourceType, 
                "Xml2": 'All', "Xml3": that.StorePurchaseReturns.VendorId, "Xml4": that.APICall.GetCompanyID() })
  
              },
            contentType: 'application/json; charset=utf-8',
            processResults: function (response) {
  
              var ResultData = (JSON.parse(response['Message'])).Table;
              debugger;
              var data = $.map(ResultData, function (obj) {
  
                obj.id = obj.TransactionId;
                obj.text = obj.TransactionNo;
                obj.date = obj.TransactionDate;            
  
                return obj;
              });
              return { results: data };
            },
            cache: false
          },
  
          templateResult: this.format
  
        });
  
        $('#drpReference').on('select2:open', function (e) {
          var html = '';
  
  
          html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Invoice No</b></td> <td width="50%"><b>Date</b></td> </tr > </tbody> </table>';
  
          var res = $('.select2-search');
  
          var text = res[0].innerText;
  
          if (text == "")
            $('.select2-search').append(html);
        });
  
        var that = this;
        $('#drpReference').on('select2:select', function (e) {
  
          if (typeof ((<any>e).params.data.id) != 'undefined') {
            debugger;
  
            if (that.StorePurchaseReturns.ReturnSourceId != (<any>e).params.data.id) {
  debugger;
  that.StorePurchaseReturns.ReturnSourceId = (<any>e).params.data.id;
  that.StorePurchaseReturns.ReturnSourceNo  = (<any>e).params.data.text;
  that.StorePurchaseReturns.ReturnSourceDate  = (<any>e).params.data.date;
            
              that.LoadReferenceItems();
            }
          }
        });
  
        $("#drpReference").on("select2:unselecting", function (e) {
  
          that.StorePurchaseReturns.ReturnSourceId = 0;
          that.StorePurchaseReturns.ReturnSourceNo = "";
          that.StorePurchaseReturns.ReturnSourceDate = "";
          //  that._SelecedRow.TransactionDate   = ""  ;      
  
  
        });
      }

      
    }

    lstDbResult1: any;
    lstPurchaseReturnsItemsStock:any=[];
  LoadReferenceItems() {
    var sp = "";


    if (this.StorePurchaseReturns.ReturnSourceId > 0) {
      try {
       
        if (this.StorePurchaseReturns.ReturnSourceType == 'PurchaseInvoice') {
          sp = "ViewPurchaseInvoice";
        }

        if (AppSettings.ShowLoaderOnView) {
          $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

          $("#loaderParent").show();
        }


        debugger;
        this.APICall.DBCalling(sp, "", "All", this.StorePurchaseReturns.ReturnSourceId, this.APICall.GetCompanyID()).subscribe(
          (res: Response) => {
            debugger;
            this.lstReturnsItems = [];
            this.lstDbResult1 = JSON.parse(res['Message']);

            var lstItems: any;          
            if (this.lstDbResult1.Table.length > 0) {

               if (this.StorePurchaseReturns.ReturnSourceType == 'PurchaseInvoice') {
                lstItems = this.lstDbResult1.Table[0].lstInvoiceItems;
               
              }   


              if (lstItems != null && typeof (lstItems) != undefined) {
                try {
                  var val = ((lstItems).replace(/\n/g, "")).replace(/'/g, "\"");

                  var items = JSON.parse(val);


                  for (let i = 0; i < items.length; i++) {
                    items[i]["SNO"] = (this.lstReturnsItems.length + 1);
                    items[i]["Gross"] = 0;
                    items[i]["DiscountAmount"] = 0;
                    items[i]["TotalTax"] = 0;
                    items[i]["NetTotal"] = 0;
                    items[i]["CGSTAccountId"] = 0;
                    items[i]["SGSTAccountId"] = 0;
                    items[i]["IGSTAccountId"] = 0;
                    items[i]["Show"] = "true";
                    items[i]["RefLineId33"] = items[i]["LineId"];
                    items[i]["LineId"] = 0;
                    items[i]["RefId"] = this.StorePurchaseReturns.ReturnSourceId;
                    items[i]["RefDate3"] = this.StorePurchaseReturns.ReturnSourceDate;
                    items[i]["RefNo2"] = this.StorePurchaseReturns.ReturnSourceNo;
                    items[i]["RefType1"] = this.StorePurchaseReturns.ReturnSourceType;
                   // items[i]["ReturnQty"] = 0;
                   // items[i]["AvlQty"] = 0;
                    
                    this.lstReturnsItems.push(items[i]);
                    
                  }
                 // this.CalculateTotals();
                }

                catch (error) { }
              }


            }
          });
      }
      catch (error) { }
    }
  }

    format(opt) {
      if (!opt.id) {
        return opt.text;
      }
      var $opt;
  
  
      $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.TransactionNo + '</td><td width="50%">' + opt.TransactionDate + '</td></tr></tbody></table>');
  
      return $opt;
    }


    DeleteItem(e){
      debugger;
     
      this.RemoveItemClick(e)
    
    }
  
    RemoveItemClick(event) {
      debugger;
      var sliceIndex = -1;
      for (var i = 0; i < this.lstReturnsItems.length; i++) {
        this.lstReturnsItems[i].Show = 'true';
  
        if (this.lstReturnsItems[i].SNO == event.SNO) {
          sliceIndex = i;
        }
      }
      
      if (sliceIndex > -1) {
        this.lstReturnsItems.splice(sliceIndex, 1);
  
        for (var i = 0; i < this.lstReturnsItems.length; i++) {
          this.lstReturnsItems[i].SNO = i + 1;
        }
  
       
      }
      //this.EditRecNO=-1;
      this.SNO = this.lstReturnsItems.length + 1;
      // this.ClearSelectedValues();
      this.CalculateTotals();
      $("#btnCloseAddItem").trigger('click');
      this.ReArrangeSNo();
    }

    SNO=0;


  
    ReArrangeSNo() {
      for (var i = 0; i < this.lstReturnsItems.length; i++) {
        for (var j = 0; j < this.lstReturnsItems.length; j++) {
  
          if (this.lstReturnsItems[j].Partno == this.lstReturnsItems[i].Partno && this.lstReturnsItems[j].Rate == this.lstReturnsItems[i].Rate) {
  
            this.lstReturnsItems[j].SNO = i + 1
  
          }
  
        }
      }
  
    }

    NumberSequenceValueChange(value) {
      debugger;
      this.f.SequenceNumberId.setValue(value);  
    }

    InvoiceType="";
  ReturnQtyChange(event,_SelecedRow)
  {
    debugger;
    var returnqty=event.target.value;  


    if ((+_SelecedRow.Qty) < (+returnqty)) {     
      _SelecedRow.ReturnQty=0;
      
      (window as any).swal("Invalid", "Invalid Return Qty", "error");

    } else {
      _SelecedRow.ReturnQty=returnqty;

      if(returnqty==0)
      {
        _SelecedRow.AvlQty = (+_SelecedRow.Qty) ;
        _SelecedRow.Gross = 0;
      }
      else
      {
      _SelecedRow.AvlQty =( (+_SelecedRow.Qty) - (+ returnqty));
      _SelecedRow.Gross = (+_SelecedRow.ReturnQty) * (+_SelecedRow.Rate);
      }
     

 var TotalTax = 0;
 var GrossA = (+_SelecedRow.Gross);

 if ((+ _SelecedRow.DiscountPercentage) > 0) {
   _SelecedRow.DiscountAmount = ((GrossA * (+ _SelecedRow.DiscountPercentage)) / 100);

 }
 var AfterDiscount = (GrossA - (+ _SelecedRow.DiscountAmount));

   
     if(_SelecedRow.CGST >0)
     {
     _SelecedRow.CGSTAmount = (((+_SelecedRow.CGST) * AfterDiscount) / 100);

     TotalTax = TotalTax + ((+ _SelecedRow.CGSTAmount));
     
    }
  

   if (_SelecedRow.SGST >0) {
   
     _SelecedRow.SGSTAmount = (((+_SelecedRow.SGST) * AfterDiscount) / 100);
     TotalTax = TotalTax + ((+ _SelecedRow.SGSTAmount));
     
   }

   if (_SelecedRow.IGST > 0) {
  
     _SelecedRow.IGSTAmount = (((+_SelecedRow.IGST) * AfterDiscount) / 100);
     TotalTax = TotalTax + ((+ _SelecedRow.IGSTAmount));

   }
 
   this.InvoiceType=_SelecedRow.VoucherType ;

 if (_SelecedRow.VoucherType == "Import") {
   try {

     var cust1 = (((+ _SelecedRow.Gross) * (+_SelecedRow.BCDPer)) / 100);
     var sw1 = (((+cust1) * (+_SelecedRow.SWSPer)) / 100);

     TotalTax = TotalTax + ((+ cust1));
     TotalTax = TotalTax + ((+ sw1));

     _SelecedRow.BCDAmount = cust1;
     _SelecedRow.SWSAmount = sw1;

   }
   catch (error) { }
 }


 //var PerItemTax = TotalTax / (+_SelecedRow.Qty);

 $("#PriceInclusiveTax").val((+_SelecedRow.Rate) + (+_SelecedRow.ReturnQty));
 _SelecedRow.TotalTax = (TotalTax);

 _SelecedRow.NetTotal = ((AfterDiscount + TotalTax).toFixed(2));

 this.CalculateTotals();
}
  }


  StoreAccountLedger: StoreAccountLedger
  OpenAccountLedger() {
    debugger;

    this.StoreAccountLedger = new StoreAccountLedger;
    this.APICall.UpdatedSelectedPath('./Accounting/AccountLedger');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreAccountLedger.AccountId = this.f.PartyId.value;
    this.StoreAccountLedger.AccountName = this.f.PartyName.value;
    this.StoreAccountLedger.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreAccountLedger));
    this.router.navigate(['Accounting/AccountLedger']);

  }

  Vendor: Vendor
  VendorMaster() {

    debugger;
    this.Vendor = new Vendor;
    if (this.selectedVendor != undefined && this.selectedVendor != null) {
      this.selectedVendor.ViewName = "RequestFromDC";
      this.Vendor = Object.assign({}, this.selectedVendor);

    }

    this.APICall.UpdatedSelectedPath('./Purchase/CreateVendor');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.Vendor.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.Vendor));
    this.router.navigate(['Purchase/CreateVendor']);

  }

  PrintCloseClick() {
    debugger;
    this.OrderData = null;
    $("#btnCloseQuotationPrint").click();

  }
}

    //AddItemReset=false;
  

