import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"

 import * as XLSX from 'xlsx'; 
 import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import '../../../assets/vendors/datepicker/daterangepicker.js';
import { Store } from '@ngrx/store';
import { SalesQuotation } from 'src/app/Store/SalesQuotation';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';
import { Customer } from 'src/app/store/Customer';
import { StoreAccountingSettings } from 'src/app/Store/StoreAccountingSettings';
import { objectEach } from 'highcharts';
@Component({
  selector: 'app-create-sales-quotation',
  templateUrl: './create-sales-quotation.component.html',
  styleUrls: ['./create-sales-quotation.component.css']
})
export class CreateSalesQuotationComponent implements OnInit {

  CreateSalesQuotation: FormGroup;
  TransactionType = "Sales";
  DisplayCustomerId = 0;
  DispalyCustomerName = "";
  DisplaySequenceNumberId = 0;
  DispalyFormName = 'SalesQuotation'
  InvoiceType="Invoice";
  TaxType = "Intra State";
  SalesQuotationData: any;
  x:number=5;
  y:number=5;
  StoreAccountingSettings:StoreAccountingSettings
  constructor(private DbCallings: CommonDbCallings, private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) {
  

    this.CreateSalesQuotation = formBuilder.group(
      {
        SequenceNumberId: new FormControl(0),
        Contactno: new FormControl(''),
        Email: new FormControl('', [Validators.email]),
        RequiredDate: new FormControl('', [Validators.required]),
        Billto: new FormControl(''),
        CountryName: new FormControl(''),
        Shipto: new FormControl(0),
        ShiptoAddress: new FormControl(''),
        itemNote: new FormControl(''),
        Terms: new FormControl(''),
        TermsandConditions: new FormControl(''),
        ChargesCOAId: new FormControl(0),
       ChargesCOAName: new FormControl(''),
       ChargesAmount: new FormControl(0),
       SACCode: new FormControl(''),
       ChargesCGSTPer: new FormControl(0),
       ChargesCGSTAmount: new FormControl(0),
       ChargesSGSTPer : new FormControl(0),
       TemplateType:new FormControl(''),
       CSGSTAccountId: new FormControl(0),
       CCGSTAccountId: new FormControl(0),
       CIGSTAccountId: new FormControl(0),
      
        ChargesSGSTAmount: new FormControl(0),
      ChargesIGSTPer: new FormControl(0),
       ChargesIGSTAmount: new FormControl(0),
        TotalCharges: new FormControl(0),
       ChargesNarration: new FormControl(0),
        
        PaymentTerms: new FormControl(''),
        TransactionTime: new FormControl('', [Validators.required]),
        TransactionDate: new FormControl('', [Validators.required]),
        TransactionId: new FormControl(0),
        TransactionNo: new FormControl(''),
        CustomerRefNo: new FormControl(''),
        ProductReference: new FormControl(''),
        PartyId: new FormControl(0, [Validators.required, Validators.min(1)]),
        PartyName: new FormControl(''),

        LineChanges: new FormControl(0),
        SearchString: new FormControl(''),
        searchPartNo: new FormControl(''),
        searchDescription: new FormControl(''),
        searchMake: new FormControl(''),
        searchHSN: new FormControl(''),
        InvoiceType:new FormControl('Invoice')
      }

    );
    // setInterval(() => {
    //   debugger;
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
    this.f.TransactionTime.setValue(this.CurrentTime);
    //}, 1);


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }

  SelectedTab = '';
  tabClick(TabName) {
    debugger;
    this.SelectedTab = TabName;

  }

  DisplayCgargesCOAId=0 ;
  DispalyChargesAccountName="";
  showchargesError = false;
  chargeserrormsg = "";
  InvoiceTypeChange(target) {
    debugger;
    if (target.value == "Import") {
      this.InvoiceType = "Import";
    }
    else {
      this.InvoiceType = target.value;
    }
    this.CalculateTotals();
  }

  AccountValueChange(data) {
    debugger;
    this.lstSelectedTaxdet = [];
    this.f.ChargesCOAId.setValue(data.COAId);
    this.f.ChargesCOAName.setValue(data.Name);
    this.DisplayCgargesCOAId = data.COAId;
    this.DispalyChargesAccountName = data.Name;
    this.f.SACCode.setValue(data.SACCode);
    this.GstTaxbyHSNAndState(data.SACCode);
  }

  TemplateTypeChange(event) {
    try {
      debugger;
      $('#drpReference').val(null).trigger('change')
      this.StoreSalesQuotation.TemplateType = event.value;
     this.LoadReference();

    }
    catch (e) { }
  }

  format(opt) {
    if (!opt.id) {
      return opt.text;
    }
     var $opt ;

     
     $opt= $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.TransactionNo + '</td><td width="50%">' + opt.TransactionDate + '</td></tr></tbody></table>');
    
    return $opt;
  };

  LoadReference() {
    debugger;
    var that = this;
if(this.StoreSalesQuotation.TemplateType !=undefined && this.StoreSalesQuotation.TemplateType!=null && this.StoreSalesQuotation.TemplateType!="")
{
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
            return JSON.stringify({ "Operation": 'SalesInvoiceReferences', "Params": that.StoreSalesQuotation.TemplateType, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

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

      if(that.StoreSalesQuotation.TemplateType=='Template')
{
  html= '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="100%"><b>Template Name</b></td>  </tr > </tbody> </table>';
}
else
{
       html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Invoice No</b></td> <td width="50%"><b>Date</b></td> </tr > </tbody> </table>';
}
      var res = $('.select2-search');

      var text = res[0].innerText;

      if (text == "")
        $('.select2-search').append(html);
    });

    var that = this;
    $('#drpReference').on('select2:select', function (e) {

      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        if(that.StoreSalesQuotation.ReferenceId != (<any>e).params.data.id)
        {

        that.StoreSalesQuotation.ReferenceId = (<any>e).params.data.id;
        that.StoreSalesQuotation.Reference= (<any>e).params.data.text;
        that.StoreSalesQuotation.ReferenceDate   = (<any>e).params.data.TransactionDate  ;      
        that.LoadReferenceItems();
        }
      }
    });

    $("#drpReference").on("select2:unselecting", function (e) {

      that.StoreSalesQuotation.ReferenceId = 0;
      that.StoreSalesQuotation.Reference = "";
      that.StoreSalesQuotation.ReferenceDate = "";
      //  that._SelecedRow.TransactionDate   = ""  ;      


    });
  }
  }
  
  
  lstDbResult1:any=[]
  LoadReferenceItems() {
    var sp = "";
    debugger;
    
    if (this.StoreSalesQuotation.ReferenceId>0)
    {
    try {
      
       if (this.StoreSalesQuotation.TemplateType == 'SalesQuotation') {
        sp = "SalesInvoiceSQItems";
      }
      else if (this.StoreSalesQuotation.TemplateType == 'SalesInvoice') {
        sp = "ViewSalesInvoice";
      }
      else{

      }


      if (AppSettings.ShowLoaderOnView) {
        $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");

        $("#loaderParent").show();
      }


      debugger;
      this.APICall.DBCalling(sp, "", "All", this.StoreSalesQuotation.ReferenceId, this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger;
          
          this.lstDbResult1 = JSON.parse(res['Message']);

         var lstItems:any;
          if (this.lstDbResult1.Table.length > 0) {        
           
           
             if (this.StoreSalesQuotation.TemplateType == 'SalesQuotation') {
              lstItems =this.lstDbResult1.Table[0].lstQuotationItems;             
              
            }
            else if (this.StoreSalesQuotation.TemplateType == 'SalesInvoice') {
              lstItems = this.lstDbResult1.Table[0].lstSalesInvoiceItems;  
              
            }
           
           
            if(lstItems!=null && typeof(lstItems)!=undefined)
            {
            try{
            var val=((lstItems).replace(/\n/g, "")).replace(/'/g,"\"");

            var items=JSON.parse(val);

           
              for(let i=0; i<items.length; i++)
              {
               debugger;
                let lstQuotationItems=[];
                this.lstQuotationItems.forEach((element ,index)=> {
                lstQuotationItems[index]={...element};
                });
                this.lstQuotationItems=lstQuotationItems;
                items[i].SNO= (this.lstQuotationItems.length +1);
                items[i].CGSTAccountId=0;
                items[i].SGSTAccountId=0;
                items[i].IGSTAccountId=0;
                items[i].Show="true";
                items[i].RefLineId= items[i].LineId;
                items[i].LineId=0;
                items[i].RefId=this.StoreSalesQuotation.ReferenceId;
                items[i].RefDate3=this.StoreSalesQuotation.ReferenceDate;               
                items[i].RefNo2=this.StoreSalesQuotation.Reference;
                items[i].RefType1 = this.StoreSalesQuotation.TemplateType;
                this.lstQuotationItems.push(items[i]);
               
              
                this.CalculateTotals();
              }
            }
         
            catch(error)
            {}
            }
           
            
          }
        });
    }
    catch (error) { }
  }
  }

  ValidateCharges(): boolean {

    var validate = true;
    this.showchargesError = false;

    if (
      this.getControlValue(this.f.ChargesCOAName, 'string') != ""
      && this.getControlValue(this.f.ChargesAmount, 'string') != ""

      && this.getControlValue(this.f.ChargesAmount, 'int') != "0"



    ) {

      for (var i = 0; i < this.lstCharges.length; i++) {
        if (this.EditChRecNO != this.lstCharges[i].SNO &&
          this.lstCharges[i].ChargesCOAName == this.getControlValue(this.f.ChargesCOAName, 'string')
        ) {
          validate = false;
          this.showchargesError = true;
          this.chargeserrormsg = "Already exists!";
          break;

        }

      }
    } else {
      validate = false;
      this.showchargesError = true;
      this.chargeserrormsg = "Invalid Data!";
    }
    return validate;



  }

  EditChRecNO = -1;
  SNOCh = 0;

  lstCharges: any = [];
  AddCharges(type) {

debugger;
    if (this.ValidateCharges()) {
      //let WeekName:string= this.from
      for (var i = 0; i < this.lstCharges.length; i++) {
        this.lstCharges[i].Show = 'true';
        if (this.lstCharges[i].SNO == this.EditChRecNO) {
          this.lstCharges[i].ChargesCOAId = this.getControlValue(this.f.ChargesCOAId, 'int');
          this.lstCharges[i].ChargesCOAName = this.getControlValue(this.f.ChargesCOAName, 'string');
          this.lstCharges[i].ChargesAmount = this.getControlValue(this.f.ChargesAmount, 'int');
          this.lstCharges[i].ChargesNarration = this.getControlValue(this.f.ChargesNarration, 'string');
          this.lstCharges[i].SACCode = this.getControlValue(this.f.SACCode, 'string');
          this.lstCharges[i].ChargesCGSTPer = this.getControlValue(this.f.ChargesCGSTPer, 'int');
          this.lstCharges[i].ChargesCGSTAmount = this.getControlValue(this.f.ChargesCGSTAmount, 'int');
          this.lstCharges[i].ChargesSGSTPer = this.getControlValue(this.f.ChargesSGSTPer, 'int');

          this.lstCharges[i].CSGSTAccountId = this.getControlValue(this.f.CSGSTAccountId, 'int');
          this.lstCharges[i].CCGSTAccountId = this.getControlValue(this.f.CCGSTAccountId, 'int');
          this.lstCharges[i].CIGSTAccountId = this.getControlValue(this.f.CIGSTAccountId, 'int');
          this.lstCharges[i].ChargesSGSTAmount = this.getControlValue(this.f.ChargesSGSTAmount, 'int');
          this.lstCharges[i].ChargesIGSTPer = this.getControlValue(this.f.ChargesIGSTPer, 'int');
          this.lstCharges[i].ChargesIGSTAmount = this.getControlValue(this.f.ChargesIGSTAmount, 'int');
          this.lstCharges[i].ChargesTax = (+this.getControlValue(this.f.ChargesCGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesSGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesIGSTAmount, 'int'));
          this.lstCharges[i].TotalCharges = this.getControlValue(this.f.TotalCharges, 'int');
         
        }
      }
      if (this.EditChRecNO == -1) {
        var res =
          ({
            SNO: this.SNOCh


            , ChargesCOAId: this.getControlValue(this.f.ChargesCOAId, 'int')
            , ChargesCOAName: this.getControlValue(this.f.ChargesCOAName, 'string')
            , ChargesAmount: this.getControlValue(this.f.ChargesAmount, 'int')
            , ChargesNarration: this.getControlValue(this.f.ChargesNarration, 'string')
            , SACCode: this.getControlValue(this.f.SACCode, 'string')
            , LineId: 0
            , ChargesCGSTPer: this.getControlValue(this.f.ChargesCGSTPer, 'int')
            , ChargesCGSTAmount: this.getControlValue(this.f.ChargesCGSTAmount, 'int')
            , ChargesSGSTPer: this.getControlValue(this.f.ChargesSGSTPer, 'int')

            , CSGSTAccountId: this.getControlValue(this.f.CSGSTAccountId, 'int')
            , CCGSTAccountId: this.getControlValue(this.f.CCGSTAccountId, 'int')
            , CIGSTAccountId: this.getControlValue(this.f.CIGSTAccountId, 'int')



            , ChargesSGSTAmount: this.getControlValue(this.f.ChargesSGSTAmount, 'int')
            , ChargesIGSTPer: this.getControlValue(this.f.ChargesIGSTPer, 'int')
            , ChargesIGSTAmount: this.getControlValue(this.f.ChargesIGSTAmount, 'int')
            , ChargesTax: (+this.getControlValue(this.f.ChargesCGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesSGSTAmount, 'int')) + (+this.getControlValue(this.f.ChargesIGSTAmount, 'int'))


            , TotalCharges: this.getControlValue(this.f.TotalCharges, 'int')
            , Show: 'true'
          });

        if (this.lstCharges.length == 0) {
          this.lstCharges = [res];

        }
        else {
          this.lstCharges.push(res);
  
        }
      }
      this.EditChRecNO = -1;

      this.f.ChargesCOAId.setValue(0);
      this.f.ChargesCOAName.setValue('');
      this.f.ChargesAmount.setValue(0);
      this.f.ChargesNarration.setValue('');

      this.SNOCh = this.lstCharges.length + 1;
      this.f.LineChanges.setValue(1);

      if (type == 'Close') {

        $("#btnCloseSalesInvoiceCharges").click();
      }
      this.CalculateTotals();
    }

    //}

  }


  lstSelectedTaxdet: any = [];
  GstTaxbyHSNAndState(SACCode) {
    var typetax='Intra State'
    if (SACCode != '') {

      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      debugger

      this.APICall.DBCalling("GstTaxbyHSNAndState", SACCode, typetax, this.TransactionDate, this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger
          this.lstSelectedTaxdet = [];
          this.lstSelectedTaxdet = JSON.parse(res['Message']);



          if (this.lstSelectedTaxdet.Table.length > 0) {
            this.lstSelectedTaxdet = this.lstSelectedTaxdet.Table;
          }
          this.SelectedChargesCalc();
          $("#loaderParent").hide();
        });
    } else {
      this.SelectedChargesCalc();
    }

  }

  SelectedChargesCalc() {
    debugger;

    var TotalTax = 0;
    var ChargesAmount = (+this.f.ChargesAmount.value);
    for (let i = 0; i < this.lstSelectedTaxdet.length; i++) {
      if (this.lstSelectedTaxdet[i].TaxType == "CGST") {
        this.f.ChargesCGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
        this.f.ChargesCGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2) * ChargesAmount) / 100);

        TotalTax = TotalTax + ((+ this.f.ChargesCGSTAmount.value));
      //  this.chargestax = TotalTax + ((+ this.f.ChargesCGSTAmount.value));
        try {

          this.f.CCGSTAccountId.setValue(this.lstSelectedTaxdet[i].PostAccountId);

        } catch (e) {

        }


      }

      if (this.lstSelectedTaxdet[i].TaxType == "SGST") {
        this.f.ChargesSGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
        this.f.ChargesSGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2) * ChargesAmount) / 100);
        TotalTax = TotalTax + ((+ this.f.ChargesSGSTAmount.value));

        try {

          this.f.CSGSTAccountId.setValue(this.lstSelectedTaxdet[i].PostAccountId);

        } catch (e) {

        }

      }

      if (this.lstSelectedTaxdet[i].TaxType == "IGST") {
        this.f.ChargesIGSTPer.setValue(this.lstSelectedTaxdet[i].TaxPercentage2);
        this.f.ChargesIGSTAmount.setValue(((+this.lstSelectedTaxdet[i].TaxPercentage2) * ChargesAmount) / 100);
        TotalTax = TotalTax + ((+ this.f.ChargesIGSTAmount.value));
      }

      try {

        this.f.CIGSTAccountId.setValue(this.lstSelectedTaxdet[i].PostAccountId);

      } catch (e) {

      }
    }

    //this.f.TotalCharges.setValue(ChargesAmount+TotalTax);
    this.f.TotalCharges.setValue(ChargesAmount);
    this.CalculateTotals();
  }

  CurrentTime: any;

  PartyGSTNo = "";

  windowScroll(ControlName) {
    var element = document.getElementById(ControlName);
    var rect = element.getBoundingClientRect();

    window.scrollTo(rect.left, rect.top);
  }
  checkstatus = false;
  OnPrint() {
    debugger;

    this.SalesQuotationData = this;
    console.log(this.lstQuotationItems)
  }

  EditCharges(selectedRecord, SNO) {
debugger;
    this.EditChRecNO = SNO;
    this.SNOCh = SNO;

    this.CreateSalesQuotation.patchValue({

      ChargesCOAId: selectedRecord.ChargesCOAId,
      ChargesCOAName: selectedRecord.ChargesCOAName,
      ChargesAmount: selectedRecord.ChargesAmount,
      ChargesNarration: selectedRecord.ChargesNarration,
      SACCode: selectedRecord.SACCode
    });
    try {
      this.GstTaxbyHSNAndState(selectedRecord.SACCode);
    } catch (e) {

    }
    this.DisplayCgargesCOAId = selectedRecord.ChargesCOAId;
    this.DispalyChargesAccountName = selectedRecord.ChargesCOAName;
  }
  ChargesAmt=0
  

  RefLineId:number=0;
  RefId:number=0;
  RefType1:''
  RefNo2:string=""
  RemoveCharges() {
    debugger;
  var ind=this.EditChRecNO;
  //var minuscharges=Object.assign({},e); 
 //this.ChargesAmt=(this.ChargesAmt ) - (minuscharges.ChargesAmount);
  if(ind > -1){
    this.lstCharges.splice(ind , 1)
   // this.f.LineChanges.setValue(1);
  $("#btnCloseSalesInvoiceCharges").click();
  this.CalculateTotals();
  }
  
   return this.lstCharges;
   

  
   
  }

  submitted = false;
  OnSave() {
    debugger;
    this.submitted = true;
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val());

    this.f.TransactionTime.setValue($("#TransactionTime").val());

    if (this.CreateSalesQuotation.invalid) {
      var Cvalid = true;


      if (this.f.PartyId.invalid && Cvalid) {
        debugger;
        this.windowScroll('PartyId');
        Cvalid = false;
      }

      if (this.f.TransactionDate.invalid && Cvalid) {
        debugger;
        this.windowScroll('TransactionDate');
        Cvalid = false;
      }


      if (this.f.RequiredDate.invalid && Cvalid) {
        debugger;
        this.windowScroll('RequiredDate');
        Cvalid = false;
      }
      if (this.f.Email.invalid && Cvalid) {
        debugger;
        this.windowScroll('Email');
        Cvalid = false;
      }


      if (this.f.TransactionTime.invalid && Cvalid) {
        debugger;
        this.windowScroll('TransactionTime');
        Cvalid = false;
      }




      return;
    }
    else {
      this.SaveTransaction();
    }
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

        that.DeleteSalesQuotation();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }

    });

  }
  DeleteSalesQuotation() {

   
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'
      + '</Table1></NewDataSet>';

    this.APICall.DBCalling("DeleteSalesQuotation", xml1, "", "", "").subscribe(
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
    this.CreateSalesQuotation.patchValue(


      {
        //   SequenceNumberId:0,
        Contactno: '',
        PartyName: '',
        Email: '',
        RequiredDate: '',
        Billto: '',
        ShipCountryName: '',
        CountryName: '',
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
    this.lstQuotationItems = null;
    this.lstQuotationItems = [];
    this.lstTermsChild = null;
    this.lstTermsChild = [];
    this.DisplayCustomerId = 0;
    this.DispalyCustomerName = "";
    this.DisplaySequenceNumberId = 0;
    this.TotalGross = 0;
    this.TotalCGST = 0;
    this.TotalSGST = 0;
    this.TotalIGST = 0;
    this.TotalDiscount = 0;
    this.TotalTax = 0;
    this.Total = 0;
    debugger;
    this.StoreSalesQuotation = new SalesQuotation;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreSalesQuotation.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreSalesQuotation));



  }


  

  convertDate(str) {
  
    var splitted = str.split(" ",10);
    var tempdate=splitted[0];
  
    var date = new Date(tempdate),
        mnth:any = ("0" + (date.getMonth()+1)).slice(-2),
        day:any  = ("0" + date.getDate()).slice(-2);
       var hours  = ("0" + date.getHours()).slice(-2);
       var  minutes = ("0" + date.getMinutes()).slice(-2);
  
       var resDate=[  mnth, day ,date.getFullYear()].join("-");
     
    return resDate+" "+hours+":"+ minutes; 
  
  }


  replaceAll(str, find, replace) {
    var escapedFind = find.replace('<br>', "\n");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  ModifiedDate = "";
  DbResult: any = [];
  SaveTransaction() {
    this.f.RequiredDate.setValue($("#RequiredDate").val());
    this.f.TransactionDate.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());
    this.f.TransactionTime.setValue($("#TransactionDate").val() + ' ' + $("#TransactionTime").val());

    if (this.ModifiedDate==null || this.ModifiedDate==undefined || this.ModifiedDate=='') {   

      this.ModifiedDate = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }

 

    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    
     
    var xml1 = '<NewDataSet><Table1>'

      + '<ShiptoAddress>' + this.getControlValue(this.f.ShiptoAddress, 'string') + '</ShiptoAddress>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<PartyId>' + this.getControlValue(this.f.PartyId, 'int') + '</PartyId>'
      + '<Billto>' + this.getControlValue(this.f.Billto, 'string') + '</Billto>'
      + '<TransactionNo>' + this.getControlValue(this.f.TransactionNo, 'string') + '</TransactionNo>'

      + '<Shipto>' + this.getControlValue(this.f.Shipto, 'string') + '</Shipto>'
      + '<CustomerRefNo>' + this.getControlValue(this.f.CustomerRefNo, 'string') + '</CustomerRefNo>'
      + '<ProductReference>' + this.getControlValue(this.f.ProductReference, 'string') + '</ProductReference>'

      + '<TransactionTime>' + this.getControlValue(this.f.TransactionTime, 'string') + '</TransactionTime>'
      + '<TransactionDate>' + this.convertDate(this.getControlValue(this.f.TransactionDate, 'string')) + '</TransactionDate>'
      //+ '<ModifiedDate>' + this.convertDate(this.ModifiedDate) + '</ModifiedDate>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
      + '<CurrencyId>' + this.APICall.GetCurrencyId() + '</CurrencyId>'
      + '<RequiredDate>' + this.getControlValue(this.f.RequiredDate, 'string') + '</RequiredDate>'
      + '<TermsandConditions>' + this.getControlValue(this.f.TermsandConditions, 'string') + '</TermsandConditions>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<TotalGross>' + this.TotalGross + '</TotalGross>'
      + '<PaymentTerms>' + this.getControlValue(this.f.PaymentTerms, 'int') + '</PaymentTerms>'
      + '<TotalDiscount>' + this.TotalDiscount + '</TotalDiscount>'
      + '<TotalTax>' + this.TotalTax + '</TotalTax>'
      + '<Total>' + this.Total + '</Total>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '<Terms>' + this.getControlValue(this.f.Terms, 'int') + '</Terms>'
      + '<TransactionId>' + this.getControlValue(this.f.TransactionId, 'int') + '</TransactionId>'
      + '<AfterDiscount>' + this.AfterDiscount + '</AfterDiscount>'
      + '<TotalSGST>' + this.TotalSGST + '</TotalSGST>'
      + '<TotalCGST>' + this.TotalCGST + '</TotalCGST>'
      + '<TotalIGST>' + this.TotalIGST + '</TotalIGST>'
      + '<TaxType>' + this.TaxType + '</TaxType>'
      + '<BillToStateName>' + this.BillToStateName + '</BillToStateName>'
      + '<BillToStateCode>' + this.BillToStateCode + '</BillToStateCode>'
      + '<Contactno>' + this.getControlValue(this.f.Contactno, 'string') + '</Contactno>'
      + '<BCDAmount>' + this.TotalBCD + '</BCDAmount>'
      + '<SWSAmount>' + this.TotalSWS + '</SWSAmount>'
      + '<InvoiceType>' + this.getControlValue(this.f.InvoiceType, 'string') + '</InvoiceType>'

      + '</Table1></NewDataSet>';
    var xml2 = "";
    var rows = "";

debugger;

    for (var i = 0; i < this.lstQuotationItems.length; i++) {

      if (this.lstQuotationItems[i].Note == undefined) {
        this.lstQuotationItems[i].Note = "";
      }


      rows = rows + '<Table1>'
        + '<LineId>' + this.lstQuotationItems[i].LineId + '</LineId>'
        + '<Description>' + this.lstQuotationItems[i].Description + '</Description>'
        + '<Partno>' + this.lstQuotationItems[i].Partno + '</Partno>'
        
        + '<Note>' +  (this.lstQuotationItems[i].Note.toString()).replaceAll( '<br>','\n') + '</Note>'
        + '<ItemId>' + this.lstQuotationItems[i].ItemId + '</ItemId>'
        + '<MakeId>' + this.lstQuotationItems[i].MakeId + '</MakeId>'
        + '<UOMId>' + this.lstQuotationItems[i].UOMId + '</UOMId>'
        + '<Make>' + this.lstQuotationItems[i].Make + '</Make>'
        + '<UOM>' + this.lstQuotationItems[i].UOM + '</UOM>'
        + '<Rate>' + this.lstQuotationItems[i].Rate + '</Rate>'
        + '<Qty>' + this.lstQuotationItems[i].Qty + '</Qty>'
        + '<Gross>' + this.lstQuotationItems[i].Gross + '</Gross>'
        + '<DiscountPercentage>' + this.lstQuotationItems[i].DiscountPercentage + '</DiscountPercentage>'
        + '<DiscountAmount>' + this.lstQuotationItems[i].DiscountAmount + '</DiscountAmount>'
        + '<CGST>' + this.lstQuotationItems[i].CGST + '</CGST>'
        + '<CGSTAmount>' + this.lstQuotationItems[i].CGSTAmount + '</CGSTAmount>'
        + '<SGST>' + this.lstQuotationItems[i].SGST + '</SGST>'
        + '<SGSTAmount>' + this.lstQuotationItems[i].SGSTAmount + '</SGSTAmount>'
        + '<IGST>' + this.lstQuotationItems[i].IGST + '</IGST>'
        + '<IGSTAmount>' + this.lstQuotationItems[i].IGSTAmount + '</IGSTAmount>'
        + '<TotalTax>' + this.lstQuotationItems[i].TotalTax + '</TotalTax>'
        + '<NetTotal>' + this.lstQuotationItems[i].NetTotal + '</NetTotal>'
        + '<TaxType>' + this.lstQuotationItems[i].TaxType + '</TaxType>'
        + '<HSN>' + this.lstQuotationItems[i].HSN + '</HSN>'
        + '<CGSTAccountId>' + this.lstQuotationItems[i].CGSTAccountId + '</CGSTAccountId>'
        + '<IGSTAccountId>' + this.lstQuotationItems[i].IGSTAccountId + '</IGSTAccountId>'
        + '<SGSTAccountId>' + this.lstQuotationItems[i].SGSTAccountId + '</SGSTAccountId>'
        + '<BCDPer>' + this.lstQuotationItems[i].BCDPer + '</BCDPer>'
        + '<BCDAccountId>' + this.lstQuotationItems[i].BCDAccountId + '</BCDAccountId>'
        + '<BCDAmount>' + this.lstQuotationItems[i].BCDAmount + '</BCDAmount>'
        + '<SWSPer>' + this.lstQuotationItems[i].SWSPer + '</SWSPer>'
        + '<SWSAccountId>' + this.lstQuotationItems[i].SWSAccountId + '</SWSAccountId>'
        + '<SWSAmount>' + this.lstQuotationItems[i].SWSAmount + '</SWSAmount>'
        + '<RefType1>' + this.lstQuotationItems[i].RefType1 + '</RefType1>'
        + '<RefNo2>' + this.lstQuotationItems[i].RefNo2 + '</RefNo2>'
        + '<RefId>' + this.lstQuotationItems[i].RefId + '</RefId>'        
        + '<RefDate3>' + this.lstQuotationItems[i].RefDate3 + '</RefDate3>'
        + '<RefLineId>' + this.lstQuotationItems[i].RefLineId + '</RefLineId>'
        + '</Table1>'

    }
    xml2 = '<NewDataSet>' + rows + '</NewDataSet>';

    var xml3 = "";
    var rows = "";

    var rows = "";
    for (var i = 0; i < this.lstCharges.length; i++) {
      debugger;
      rows = rows + '<Charges>'
        + '<LineId>' + this.lstCharges[i].LineId + '</LineId>'
        + '<ChargesAmount>' + this.lstCharges[i].ChargesAmount + '</ChargesAmount>'
        + '<ChargesCOAId>' + this.lstCharges[i].ChargesCOAId + '</ChargesCOAId>'
        + '<ChargesCGSTPer>' + this.lstCharges[i].ChargesCGSTPer + '</ChargesCGSTPer>'
        + '<ChargesCGSTAmount>' + this.lstCharges[i].ChargesCGSTAmount + '</ChargesCGSTAmount>'
        + '<ChargesSGSTPer>' + this.lstCharges[i].ChargesSGSTPer + '</ChargesSGSTPer>'
        + '<CCGSTAccountId>' + (typeof (this.lstCharges[i].CCGSTAccountId) == 'undefined' ? 0 : this.lstCharges[i].CCGSTAccountId) + '</CCGSTAccountId>'
        + '<CSGSTAccountId>' + (typeof (this.lstCharges[i].CSGSTAccountId) == 'undefined' ? 0 : this.lstCharges[i].CSGSTAccountId) + '</CSGSTAccountId>'
        + '<CIGSTAccountId>' + (typeof (this.lstCharges[i].CIGSTAccountId) == 'undefined' ? 0 : this.lstCharges[i].CIGSTAccountId) + '</CIGSTAccountId>'
       + '<ChargesSGSTAmount>' + this.lstCharges[i].ChargesSGSTAmount + '</ChargesSGSTAmount>'
        + '<ChargesIGSTPer>' + this.lstCharges[i].ChargesIGSTPer + '</ChargesIGSTPer>'
        + '<ChargesIGSTAmount>' + this.lstCharges[i].ChargesIGSTAmount + '</ChargesIGSTAmount>'
        + '<ChargesTotalTax>' + ((+this.lstCharges[i].ChargesCGSTAmount) + (+this.lstCharges[i].ChargesSGSTAmount) + (+this.lstCharges[i].ChargesIGSTAmount)) + '</ChargesTotalTax>'
        + '<SACCode>' + this.lstCharges[i].SACCode + '</SACCode>'
        + '<TotalCharges>' + this.lstCharges[i].TotalCharges + '</TotalCharges>'
        + '<ChargesNarration>' + this.lstCharges[i].ChargesNarration + '</ChargesNarration></Charges>'

    }
    // for (var i = 0; i < this.lstTermsChild.length; i++) {

    //   rows = rows + '<Table1>'
    //     + '<Amount>' + this.lstTermsChild[i].Amount + '</Amount>'
    //     + '<PayPercentage>' + this.lstTermsChild[i].PayPercentage + '</PayPercentage>'
    //     + '<PayName>' + this.lstTermsChild[i].PayName + '</PayName>'
    //     + '<TermDetailsID>' + this.lstTermsChild[i].TermDetailsID + '</TermDetailsID>'


    //     + '<SalesQuotationTermDetailsId>' + this.lstTermsChild[i].SalesQuotationTermDetailsId + '</SalesQuotationTermDetailsId></Table1>'

    // }
    xml3 = '<NewDataSet>' + rows + '</NewDataSet>';

    debugger;
    this.APICall.DBCalling("SaveSalesQuotation", xml1, xml2, xml3, "").subscribe(
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
          this.lstQuotationItems = null;
          this.lstQuotationItems = [];
          this.lstTermsChild = null;
          this.lstTermsChild = [];

          if (this.DbResult.Table.length > 0) {

            try {
             
              if (this.DbResult.Table1.length > 0)//lstres[0].Table=="SalesQuotation1")
              {
                //var res1=JSON.parse((( this.DbResult.Table1[0].lstQuotationItems).replace(/\n/g, "")).replace(/'/g,"\""));
                var lstresQuotationItems = JSON.parse(((this.DbResult.Table1[0].lstQuotationItems).replace(/\n/g, "")).replace(/'/g, "\""));
                var i = 0;                                                                  
                var QuotationItemsdata = $.map(lstresQuotationItems, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstQuotationItems = QuotationItemsdata;


              }
            } catch (exce) { }
            try {
              if (this.DbResult.Table2.length > 0)//lstres[0].Table=="SalesQuotationTermDetails")
              {
                //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                var lstresTermsChild = JSON.parse(((this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g, "\""));

                var lstresTermsChilddata = $.map(lstresTermsChild, function (obj) {
                  i = i + 1;
                  obj.SNO = i;

                  return obj;
                });

                this.lstTermsChild = lstresTermsChilddata;
              }
            } catch (exce) { }


          }

        } 
        
        else {


         
          if (this.DbResult.Table[0].DBresult == -3) {
            (window as any).swal({
              icon: 'warning',
              title: 'Exists',
              text: 'Quotation Already Exists.!',
              confirmButtonText: 'Dismiss',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-warning'
            });
          } else {

            if (this.DbResult.Table[0].DBresult == -5) {


              var that = this;
              debugger;
              // (window as any).swal({
              //   icon: 'error',
              //   title: 'Treansaction modified by other User!',
              //   text: 'failed.!',
              //   confirmButtonText: 'Dismiss',
              //   buttonsStyling: false,
              //   confirmButtonClass: 'btn btn-lg btn-danger'
              //  });
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

              // (window as any).swal({
              //  icon: 'error',
              //  title: 'Error!',
              //  text: 'failed.!',
              //  confirmButtonText: 'Dismiss',
              //  buttonsStyling: false,
              //  confirmButtonClass: 'btn btn-lg btn-danger'
              // });
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

  TransactionDateChange(e) {
    debugger;

  }
  TransactionDate = $("#TransactionDate").val();

  SelectedProductData = {
    SNO: 1
    , VoucherType: ''
    , LineId: '0'
    , Description: ''

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
,SWSAccountId:0
,BCDAccountId:0

    , TotalTax: 0
    , NetTotal: 0

    , TaxType: 0



    , HSN: ''
    , CGSTAccountId: ''
    , IGSTAccountId: ''
    , SGSTAccountId: ''



    , Show: 'true'
  }

  PartyId = '0';

  //AddItemReset=false;
  OnAdd() {
    debugger;
    this.PartyId = this.getControlValue(this.f.PartyId, 'int');
    this.errormsg = "";
    this.EditRecNO = -1;
    this.SelectedProductData = {
      SNO: (this.lstQuotationItems.length == 0 ? 1 : (this.lstQuotationItems.length + 1))
      , VoucherType: this.InvoiceType
      , LineId: '0'
      , Description: ''

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
,SWSAccountId:0
,BCDAccountId:0


      , TotalTax: 0
      , NetTotal: 0

      , TaxType: 0



      , HSN: ''
      , CGSTAccountId: ''
      , IGSTAccountId: ''
      , SGSTAccountId: ''


      , Show: 'true'
    };
    this.TransactionDate = $("#TransactionDate").val();
    debugger;
    if (this.CompanyStateId != this.SelectedState) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }





    this.GstTaxFromHSNAndGSTTypeForGridView();





  }

  GstTaxFromHSNAndGSTTypeForGridView() {
    debugger;
    if (this.lstQuotationItems.length > 0) {
      var xmlHsnInfo = "";
      var rows = "";

      for (var i = 0; i < this.lstQuotationItems.length; i++) {

        rows = rows + '<Table1><HSN>' + this.lstQuotationItems[i].HSN + '</HSN></Table1>'


      }
      xmlHsnInfo = '<NewDataSet>' + rows + '</NewDataSet>';




      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
      this.DbCallings.GstTaxFromHSNAndGSTTypeForGridView(xmlHsnInfo, this.TaxType, this.TransactionDate).subscribe(
        (res) => {


          $("#loaderParent").click();
          debugger;
          this.lstDbResult = JSON.parse(res['Message']);



          if (this.lstDbResult.Table.length > 0) {
            var resultInfo = this.lstDbResult.Table;
            let lstQuotationItems=[];
            this.lstQuotationItems.forEach((element ,index)=> {
            lstQuotationItems[index]={...element};
            });
            this.lstQuotationItems=lstQuotationItems;

            for (var i = 0; i < this.lstQuotationItems.length; i++) {
              this.lstQuotationItems[i].CGST = 0;
              this.lstQuotationItems[i].SGST = 0;
              this.lstQuotationItems[i].IGST = 0;

              this.lstQuotationItems[i].CGSTAmount = 0;
              this.lstQuotationItems[i].SGSTAmount = 0;
              this.lstQuotationItems[i].IGSTAmount = 0;
              var ResultItem = resultInfo.filter(d => d.HSN === this.lstQuotationItems[i].HSN);
              if (ResultItem.length > 0) {

                debugger;
                for (let j = 0; j < ResultItem.length; j++) {
                  if (ResultItem[j].TaxType == "CGST") {
                    this.lstQuotationItems[i].CGST = (ResultItem[j].TaxPercentage2);


                  }

                  if (ResultItem[j].TaxType == "SGST") {
                    this.lstQuotationItems[i].SGST = (ResultItem[j].TaxPercentage2);


                  }

                  if (ResultItem[j].TaxType == "IGST") {
                    this.lstQuotationItems[i].IGST = (ResultItem[j].TaxPercentage2);

                  }


                }
              }

            }
            this.CalculateTotals();
          }


          else {
            // (window as any). swal("Cancelled", "Failed:)", "error");
            //this.FormErrormsg="Failed.";

          }




        }
      );
    }
  }

  PrepareSerchStringByField() {

    var searchPartNo = this.getControlValue(this.f.searchPartNo, "string");
    var searchDescription = this.getControlValue(this.f.searchDescription, "string");
    var searchMake = this.getControlValue(this.f.searchMake, "string");
    var searchHSN = this.getControlValue(this.f.searchHSN, "string");

    debugger;
    if (this.SerchType == 'Like') {


      if (searchPartNo != "" || searchDescription != "" || searchMake != "" || searchHSN != "") {
        for (var i = 0; i < this.lstQuotationItems.length; i++) {

          if ((this.lstQuotationItems[i].Partno).toString().includes(searchPartNo) ||

            (this.lstQuotationItems[i].Make).toString().includes(searchDescription) ||
            (this.lstQuotationItems[i].Description).toString().includes(searchMake) ||
            (this.lstQuotationItems[i].HSN).toString().includes(searchHSN)

          ) {



            this.lstQuotationItems[i].Show = 'true';
          } else {
            this.lstQuotationItems[i].Show = 'false';


          }
        }
      }


    }
    else {


      for (var i = 0; i < this.lstQuotationItems.length; i++) {

        if ((this.lstQuotationItems[i].Partno) == ((searchPartNo) != "" ? (searchPartNo) : this.lstQuotationItems[i].Partno) &&

          (this.lstQuotationItems[i].Make) == ((searchMake) != "" ? (searchMake) : this.lstQuotationItems[i].Make) &&
          (this.lstQuotationItems[i].Description) == ((searchDescription) != "" ? (searchDescription) : this.lstQuotationItems[i].Description) &&
          (this.lstQuotationItems[i].HSN) == ((searchHSN) != "" ? (searchHSN) : this.lstQuotationItems[i].HSN)

        ) {



          this.lstQuotationItems[i].Show = 'true';
        } else {
          this.lstQuotationItems[i].Show = 'false';



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

      for (var i = 0; i < this.lstQuotationItems.length; i++) {

        if (

          (this.lstQuotationItems[i].Partno).toString().includes(SearchString) ||
          (this.lstQuotationItems[i].Make).toString().includes(SearchString) ||
          (this.lstQuotationItems[i].HSN).toString().includes(SearchString) ||
          (this.lstQuotationItems[i].Description).toString().includes(SearchString)

          //(this.lstQuotationItems[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {



          this.lstQuotationItems[i].Show = 'true';
        } else {
          this.lstQuotationItems[i].Show = 'false';


        }
      }

    }
    return SearchString;


  }
  PartySaved(e) {

  }
  PartyType = 'Customer';
  Search() {
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));
    this.APICall.UpdatedSelectedPath('./Sales/SalesQuotation');
    this.router.navigate(['Sales/SalesQuotation']);
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

  get f() {
    return this.CreateSalesQuotation.controls;

  }

  lstQuotationItems: any = [];
  //#region "getControlValue"


  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }
  //#endregion "getControlValue"
  errormsg = "";
  showError = false;
  EditRecNO = 0;

  SNO = 0;
  ValidateItem(data): boolean {
    debugger;
    var validate = true;
    this.showError = false;

    if ((+data.NetTotal) > 0) {

      debugger;
      // for(var  i=0;i<this.lstQuotationItems.length;i++)
      // {
      // if( data.SNO!=this.lstQuotationItems[i].SNO && this.lstQuotationItems[i].Partno==data.Partno)
      // {
      // validate=false;
      // this.showError=true;
      // this.errormsg="Already exists!";
      // break;

      // }  

      // }
    } else {

      validate = false;
      this.showError = true;
      this.errormsg = "Invalid Data!";

    }

    return validate;
  }

  AddItemAndNewClick(event) {
debugger;
    this.AddItem('New', event.SelecedRow)
  }
  AddItemAndCloseClick(event) {

    this.AddItem('Close', event.SelecedRow)
  }
  EditItemClick(data) {
    this.EditRecNO = 0;
    debugger;
    this.errormsg = "";
    this.SelectedProductData = Object.assign({}, data);

  }


  AddItem(type, data) {
    debugger;
    if (this.ValidateItem(data)) {

      //let WeekName:string= this.from
      
      let lstQuotationItems=[];
      this.lstQuotationItems.forEach((element ,index)=> {
        lstQuotationItems[index]={...element};
      });
      
      this.lstQuotationItems=lstQuotationItems;
      for (var i = 0; i < this.lstQuotationItems.length; i++) {
        this.lstQuotationItems[i].Show = 'true';


        if (this.lstQuotationItems[i].SNO == data.SNO) {


          //  this.lstQuotationItems[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
          this.lstQuotationItems[i].Partno = data.Partno;
          this.lstQuotationItems[i].ItemId = data.ItemId;
          this.lstQuotationItems[i].MakeId = data.MakeId;
          this.lstQuotationItems[i].Description = data.Description;
          this.lstQuotationItems[i].Note = "";
          this.lstQuotationItems[i].Make = data.Make;
          this.lstQuotationItems[i].UOM = data.UOM;
          this.lstQuotationItems[i].UOMId = data.UOMId;

          this.lstQuotationItems[i].Rate = data.Rate;
          this.lstQuotationItems[i].Qty = (+data.Qty);

          this.lstQuotationItems[i].Gross = (+data.Gross);
          this.lstQuotationItems[i].DiscountPercentage = (+ data.DiscountPercentage);
          this.lstQuotationItems[i].DiscountAmount = (+data.DiscountAmount);

          this.lstQuotationItems[i].CGST = (+data.CGST);
          this.lstQuotationItems[i].CGSTAmount = (+data.CGSTAmount);
          this.lstQuotationItems[i].SGST = (+data.SGST);

          this.lstQuotationItems[i].SGSTAmount = (+data.SGSTAmount);
          this.lstQuotationItems[i].IGST = (+data.IGST);
          this.lstQuotationItems[i].IGSTAmount = (+data.IGSTAmount);

          this.lstQuotationItems[i].BCDPer = (+data.BCDPer);
          this.lstQuotationItems[i].BCDAmount = (+data.BCDAmount);
          this.lstQuotationItems[i].BCDAccountId = (+data.BCDAccountId);

          this.lstQuotationItems[i].SWSPer = (+data.SWSPer);
          this.lstQuotationItems[i].SWSAccountId = (+data.SWSAccountId);
          this.lstQuotationItems[i].SWSAmount = (+data.SWSAmount);

          this.lstQuotationItems[i].TotalTax = (+data.TotalTax);
          this.lstQuotationItems[i].NetTotal = (+data.NetTotal);

          this.lstQuotationItems[i].TaxType = data.TaxType;
          this.lstQuotationItems[i].CGSTAccountId = data.CGSTAccountId;
          this.lstQuotationItems[i].IGSTAccountId = data.IGSTAccountId;
          this.lstQuotationItems[i].SGSTAccountId = data.SGSTAccountId;
          this.lstQuotationItems[i].IGSTAccountId = data.RefDate3;
          this.lstQuotationItems[i].SGSTAccountId = data.RefId;
          this.lstQuotationItems[i].SGSTAccountId = data.RefLineId;
          this.lstQuotationItems[i].SGSTAccountId = data.RefNo2;
          this.lstQuotationItems[i].SGSTAccountId = data.RefType1;
         
        

          this.lstQuotationItems[i].HSN = data.HSN;

        }
      }
      if (this.EditRecNO == -1) {
        var res =
          ({
            SNO: this.lstQuotationItems.length + 1
            , LineId: '0'
            , Description: data.Description
            , Note: ''
            , Partno: data.Partno
            , ItemId: data.ItemId
            , MakeId: data.MakeId
            , UOMId: data.UOMId
            , Make: data.Make
            , UOM: data.UOM

            , Rate: data.Rate
            , Qty: (+data.Qty)



            , Gross: (+data.Gross)
            , DiscountPercentage: (+ data.DiscountPercentage)
            , DiscountAmount: (+data.DiscountAmount)



            , CGST: (+data.CGST)
            , CGSTAmount: (+data.CGSTAmount)
            , SGST: (+data.SGST)




            , SGSTAmount: (+data.SGSTAmount)
            , IGST: (+data.IGST)
            , IGSTAmount: (+data.IGSTAmount)

            , BCDPer: (+data.BCDPer)
            , BCDAmount: (+data.BCDAmount)
            , BCDAccountId: (+data.BCDAccountId)
            , SWSPer: (+data.SWSPer)
            , SWSAccountId: (+data.SWSAccountId)
            , SWSAmount: (+data.SWSAmount)

          
            , TotalTax: (+data.TotalTax)
            , NetTotal: (+data.NetTotal)

            , TaxType: data.TaxType
            , CGSTAccountId: data.CGSTAccountId
            , IGSTAccountId: data.IGSTAccountId
            , SGSTAccountId: data.SGSTAccountId
            , HSN: data.HSN
            ,RefLineId:data.RefLineId
            ,RefId:data.RefId
            ,RefDate3:data.RefDate3
            ,RefNo2:data.RefNo2
            ,RefType1:data.RefType1
            , Show: 'true'



            
          });

        if (this.lstQuotationItems.length == 0) {
          this.lstQuotationItems = [res];

        }
        else {
          this.lstQuotationItems.push(res);

        }
      }
      
      if (type == 'Close') {
        $("#btnCloseAddItem").trigger('click');
        this.EditRecNO = 0;
      } else {

        this.EditRecNO = -1;

      }
      this.SNO = this.lstQuotationItems.length + 1;
      this.CalculateTotals();
      this.f.LineChanges.setValue(0);
    }

  }



  TotalGross :any= 0;
  TotalDiscount:any = 0;
  TotalCGST:any = 0;
  TotalSGST:any = 0;
  TotalIGST:any = 0;
  TotalTax :any= 0;
  Total:any = 0;
  AfterDiscount:any = 0;
  TotalBCD:any=0;
  TotalSWS:any=0;
  TotalBeforeTax:any=0;
  BeforeTax:any=0;
  ChargesTaxamt:number=0
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
   this.ChargesTaxamt=0;
    this.TotalBCD = 0;
    this.ChargesAmt=0;
    this.TotalSWS = 0;
    this.TotalBeforeTax = 0;
    this.BeforeTax = 0;

if(this.lstCharges.length>0 ){
  debugger;
  for(var l=0;l<this.lstCharges.length;l++){
    if(this.lstCharges[l].ChargesCGSTPer!=='0' &&  this.lstCharges[l].ChargesSGSTPer!=='0'){
      this.ChargesTaxamt =(this.lstCharges[l].ChargesTax)
    }
    this.ChargesAmt=(+this.ChargesAmt) + (+this.lstCharges[l].ChargesAmount);

  }
 
}
   
    if (this.f.InvoiceType.value == 'Invoice' || this.f.InvoiceType.value == 'Exclude Tax' || this.f.InvoiceType.value == 'Import') {
    for (let i = 0; i < this.lstQuotationItems.length; i++) {

  

      if(this.lstQuotationItems[i].BCDAmount==undefined || this.lstQuotationItems[i].BCDAmount==null || this.lstQuotationItems[i].BCDAmount=='')
      {
        this.lstQuotationItems[i].BCDAmount=0;
      }

      if(this.lstQuotationItems[i].SWSAmount==undefined || this.lstQuotationItems[i].SWSAmount==null || this.lstQuotationItems[i].SWSAmount=='')
      {
        this.lstQuotationItems[i].SWSAmount=0;
      }

      if(this.lstQuotationItems[i].DiscountAmount==undefined || this.lstQuotationItems[i].DiscountAmount==null || this.lstQuotationItems[i].DiscountAmount=='')
      {
        this.lstQuotationItems[i].DiscountAmount=0;
      }

      if(this.lstQuotationItems[i].SGST==undefined || this.lstQuotationItems[i].SGST==null || this.lstQuotationItems[i].SGST=='')
      {
        this.lstQuotationItems[i].SGST=0;
      }

      if(this.lstQuotationItems[i].CGST==undefined || this.lstQuotationItems[i].CGST==null || this.lstQuotationItems[i].CGST=='')
      {
        this.lstQuotationItems[i].CGST=0;
      }

      if(this.lstQuotationItems[i].IGST==undefined || this.lstQuotationItems[i].IGST==null || this.lstQuotationItems[i].IGST=='')
      {
        this.lstQuotationItems[i].IGST=0;
      }

      var AfterDiscount = (((+this.lstQuotationItems[i].Gross) +  (+this.lstQuotationItems[i].BCDAmount)   
      +  (+this.lstQuotationItems[i].SWSAmount) )- (+ this.lstQuotationItems[i].DiscountAmount));

      if (this.f.InvoiceType.value == 'Invoice' || this.f.InvoiceType.value == 'Import') {

      this.lstQuotationItems[i].SGSTAmount = (((+this.lstQuotationItems[i].SGST) * AfterDiscount) / 100);
      this.lstQuotationItems[i].CGSTAmount = (((+this.lstQuotationItems[i].CGST) * AfterDiscount) / 100);
      this.lstQuotationItems[i].IGSTAmount = (((+this.lstQuotationItems[i].IGST) * AfterDiscount) / 100);
      this.lstQuotationItems[i].TotalTax = (+this.lstQuotationItems[i].SGSTAmount) + (+this.lstQuotationItems[i].CGSTAmount)
       + (+this.lstQuotationItems[i].IGSTAmount);

       this.TotalBCD = +this.TotalBCD + (+this.lstQuotationItems[i].BCDAmount);
       this.TotalSWS = +this.TotalSWS + (+this.lstQuotationItems[i].SWSAmount);
      

      this.TotalCGST = +this.TotalCGST + (+this.lstQuotationItems[i].CGSTAmount);
      
      this.TotalSGST = +this.TotalSGST + (+this.lstQuotationItems[i].SGSTAmount);
      this.TotalIGST = +this.TotalIGST + (+this.lstQuotationItems[i].IGSTAmount);
   
      this.lstQuotationItems[i].NetTotal = ((AfterDiscount + (+this.lstQuotationItems[i].TotalTax))).toFixed(2);
      }
      this.BeforeTax=+ AfterDiscount  ;

      this.TotalBeforeTax=( +this.TotalBeforeTax +( + this.BeforeTax ) ).toFixed(2);

      this.TotalGross = +this.TotalGross + (+this.lstQuotationItems[i].Gross);

      this.TotalDiscount = +this.TotalDiscount + (+this.lstQuotationItems[i].DiscountAmount);

      this.TotalTax =((+ this.TotalTax) + (+this.lstQuotationItems[i].TotalTax) + ( +this.ChargesTaxamt)).toFixed(2);

      this.Total =(+ this.Total )+ (+this.lstQuotationItems[i].NetTotal) ;

    }
  }
  
    // this.AfterDiscount = this.TotalGross - this.TotalDiscount;
    // this.BeforeTax= AfterDiscount  ;


   
    this.AfterDiscount = ( +this.TotalGross + +this.TotalBeforeTax ) - ((+this.TotalDiscount) 
     + (+this.TotalBCD)  +  (+this.TotalSWS));
    this.Total = +this.TotalBeforeTax + +this.TotalTax +  +this.ChargesAmt ;

    
    this.PaymentTermsAmountCalc();
  }

  RemoveItemClick(event) {
    debugger;

    var sliceIndex = -1;
    let lstQuotationItems=[];
    this.lstQuotationItems.forEach((element ,index)=> {
      lstQuotationItems[index]={...element};
    });
    
    this.lstQuotationItems=lstQuotationItems;
    for (var i = 0; i < this.lstQuotationItems.length; i++) {
      this.lstQuotationItems[i].Show = 'true';

      if (this.lstQuotationItems[i].SNO == event.SNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstQuotationItems.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstQuotationItems.length; i++) {
        this.lstQuotationItems[i].SNO = i + 1;
      }
    }

    //this.EditRecNO=-1;
    this.SNO = this.lstQuotationItems.length + 1;
    // this.ClearSelectedValues();
    this.CalculateTotals();
    $("#btnCloseAddItem").trigger('click');
  }



  //#endregion "AddPartNo"


  TaxControlsUpdate() {
    if (this.CompanyStateId != this.SelectedState) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

  }


  PaymentTermsAmountCalc() {
    if ((+this.Total) > 0) {
      for (let i = 0; i < this.lstTermsChild.length; i++) {
        var Amount = (this.Total * (+this.lstTermsChild[i].PayPercentage) / 100);
        this.lstTermsChild[i].Amount = Amount;
      }
    }
  }
  lstTermsChild: any = [];
  PaymentTermsChange(target) {


    if (target.value != '') {
      for (let i = 0; i < this.lstPaymentTerms.length; i++) {
        if (this.lstPaymentTerms[i].TermsId == target.value) {
          if (this.lstPaymentTerms[i].TermsDetails != null && typeof (this.lstPaymentTerms[i].TermsDetails) != undefined) {
            var res = ((this.lstPaymentTerms[i].TermsDetails).replace(/\n/g, "")).replace(/'/g, "\"");

            this.lstTermsChild = JSON.parse(res);


            var data = $.map(this.lstTermsChild, function (obj) {

              obj.SalesQuotationTermDetailsId = 0;



              return obj;
            });

            this.lstTermsChild = data;

            break;
          }

        }
      }
      this.PaymentTermsAmountCalc()
    } else {

      this.lstTermsChild = [];

    }
    this.f.PaymentTerms.setValue(target.value);
  }

  NumberSequenceValueChange(value) {
    debugger;
    this.f.SequenceNumberId.setValue(value);

  }
  TermsAndConditionsChange(target) {

    this.f.TermsandConditions.setValue('');
    debugger;
    if (target.value != '' && target.value != '0') {

      for (let i = 0; i < this.lstTermsAndConditions.length; i++) {
        if (this.lstTermsAndConditions[0].TermsAndConditionsId == target.value) {
          this.f.TermsandConditions.setValue(this.lstTermsAndConditions[0].description);
          this.f.Terms.setValue(this.lstTermsAndConditions[0].TermsAndConditionsId);
        }
      }


    } else {

      this.f.TermsandConditions.setValue('');
      this.f.Terms.setValue(0);
    }
  }
  lstTermsAndConditions: any = [];

  ViewTermsAndConditions() {



    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    debugger;
    // this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","").subscribe(
    //   (res:Response) => {
    this.DbCallings.GetTermsAndCondition().subscribe(
      (res) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstTermsAndConditions = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstTermsAndConditions = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }


  lstPaymentTerms: any = [];

  ViewPaymentTerms() {



    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    debugger;
    //this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","").subscribe(
    this.DbCallings.GetPaymentTerms().subscribe(
      (res) => {

        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstPaymentTerms = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstPaymentTerms = this.lstDbResult.Table;




        }

        $("#loaderParent").hide();
      });
  }


  ClockControlLoad() {

    debugger;
    (window as any).$('.clockpicker-demo').clockpicker();

    (window as any).$('.clockpicker-demo').clockpicker({
      donetext: 'Done'
    });

    (window as any).$('.clockpicker-autoclose-demo').clockpicker({
      autoclose: true
    });

    var input = (window as any).$('.clockpicker-minutes-demo').clockpicker({
      placement: 'bottom',
      align: 'left',
      autoclose: true,
      'default': 'now'
    });

    $(document).on('click', '#check-minutes', function (e) {
      e.stopPropagation();
      input.clockpicker('show')
        .clockpicker('toggleView', 'minutes');
    });

    (window as any).$('.create-event-demo').clockpicker({
      donetext: 'Done',
      autoclose: true
    });


  }
  ControlDatePickerLoad() {

    debugger;
    (window as any).$('input[name="single-date-picker"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true
    });

    (window as any).$('input[name="simple-date-range-picker"]').daterangepicker();

    (window as any).$('input[name="simple-date-range-picker-callback"]').daterangepicker({
      opens: 'left'
    }, function (start, end, label) {
      (window as any).swal("A new date selection was made", start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'), "success")
    });

    (window as any).$('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      startDate: (window as any).moment().startOf('hour'),
      endDate: (window as any).moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A'
      }
    });

   
    (window as any).$('input.create-event-datepicker').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: false
    }).on('apply.daterangepicker', function (ev, picker) {
      debugger;
      $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });

  }
  ngAfterViewInit() {
    var that = this;

    
    this.ViewPaymentTerms();
    this.ViewTermsAndConditions();
    this.ClockControlLoad();
    
    this.ControlDatePickerLoad();
  }
  ShippingAddressChange(target) {
    debugger;
    var DefaultData: any;
    
    for (let i = 0; i < this.lstShippings.length; i++) {

      if (this.lstShippings[i].ShippingInfogrv_grv4_3Id == target.value) {
        var DefaultData = this.lstShippings[i];
        break;
      }
    }

    var Address = (DefaultData.address1 != "" ? DefaultData.address1 : '');

    if (Address != "" && DefaultData.address2 != "") {
      Address = Address + ',' + (DefaultData.address2 != "" ? DefaultData.address2 : '');
    }

    if (Address != "" && DefaultData.address3 != "") {
      Address = Address + ',' + (DefaultData.address3 != "" ? DefaultData.address3 : '');
    }


    if (Address != "" && DefaultData.cityname != "") {
      Address = Address + ',' + (DefaultData.cityname != "" ? DefaultData.cityname : '');
    }
   
    this.ShipCountryName = DefaultData.countryname;
    this.f.ShiptoAddress.setValue(Address);
    this.f.Shipto.setValue(DefaultData.ShippingInfogrv_grv4_3Id);


  }
  lstShippings: any = [];
  lstDbResult: any = [];
  QuotDateChange(e) {

  }
  ShippingDetailsPartyId(PartyId, BindDefault) {

    {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }

    debugger;
    this.APICall.DBCalling("ShippingDetailsByTypeAndPartyId", "Customer", PartyId, "", "").subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);

        $("#loaderParent").hide();
        this.lstShippings = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstShippings = this.lstDbResult.Table;
          if (BindDefault) {
            var DefaultData = this.lstShippings[0];
            var Address = (DefaultData.address1 != "" ? DefaultData.address1 : '');

            if (Address != "" && DefaultData.address2 != "") {
              Address = Address + ',' + (DefaultData.address2 != "" ? DefaultData.address2 : '');
            }

            if (Address != "" && DefaultData.address3 != "") {
              Address = Address + ',' + (DefaultData.address3 != "" ? DefaultData.address3 : '');
            }


            if (Address != "" && DefaultData.cityname != "") {
              Address = Address + ',' + (DefaultData.cityname != "" ? DefaultData.cityname : '');
            }
           
            this.ShipCountryName = DefaultData.countryname;
            this.f.ShiptoAddress.setValue(Address);
          }

        }


      });
  }
  DeviceType = "";
  ChargesAccountGroup=""
  StoreSalesQuotation: SalesQuotation;
  ngOnInit() {
    debugger;
    this.DeviceType = localStorage.getItem('DeviceType')
    this.InvoiceType="Invoice";

    this.StoreSalesQuotation = new SalesQuotation;
    this.StoreSalesQuotation.InvoiceType="Invoice";

    this.f.InvoiceType.setValue("Invoice");

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {

      this.StoreAccountingSettings = (Asresult[0]);
      this.ChargesAccountGroup = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Charges'; }))[0].AccountGroupName;
    }


    if (result.length > 0) {

    debugger;
      
      Object.assign(this.StoreSalesQuotation,result[0]);
      

      if(this.StoreSalesQuotation.InvoiceType==undefined || this.StoreSalesQuotation.InvoiceType=="" || this.StoreSalesQuotation.InvoiceType==null)
      {
        debugger;
        this.InvoiceType="Invoice";
        this.StoreSalesQuotation.InvoiceType="Invoice";
      }
      else
      {
        debugger;
      this.InvoiceType=this.StoreSalesQuotation.InvoiceType.toString();
      }      

      this.f.InvoiceType.setValue(this.InvoiceType);
      this.ModifiedDate = this.StoreSalesQuotation.ModifiedDate.toString();
      this.BillToStateCode = this.StoreSalesQuotation.BillToStateCode;
      this.BillToStateName = this.StoreSalesQuotation.BillToStateName;
      this.DispalyCustomerName = this.StoreSalesQuotation.PartyName;
      this.DisplayCustomerId = this.StoreSalesQuotation.PartyId;
      this.PartyGSTNo = this.StoreSalesQuotation.PartyGSTNo;
      this.SelectedState = this.StoreSalesQuotation.SelectedState;
      this.lstQuotationItems = this.StoreSalesQuotation.lstQuotationItems == null ? [] :  this.StoreSalesQuotation.lstQuotationItems;
      this.TaxType = this.StoreSalesQuotation.TaxType;
      var i = 0;
      var that = this;
      var lstQuotationItemsdata = $.map(this.lstQuotationItems, function (obj) {
        i = i + 1;
        return { ...obj, SNO: i};
      });
      this.lstQuotationItems = lstQuotationItemsdata;

      debugger;

      this.lstTermsChild = this.StoreSalesQuotation.lstTermsChild == null ? [] : this.StoreSalesQuotation.lstTermsChild;

      var i = 0;

      var lstTermsChilddata = $.map(this.lstTermsChild, function (obj) {
        i = i + 1;
        obj.SNO = i;
        return obj;
      });
      this.lstTermsChild = lstTermsChilddata;

      debugger;

      this.lstCharges = this.StoreSalesQuotation.lstCharges == null ? [] : this.StoreSalesQuotation.lstCharges;

      var i = 0;
      debugger;
      var lstChargesdata = $.map(this.lstCharges, function (obj) {
        i = i + 1;
        return { ...obj, SNO: i};
      });
      this.lstCharges = lstChargesdata;
      // that.StoreSalesQuotation.lstCharges = that.lstCharges;
      if (this.StoreSalesQuotation.RequiredDate != '') {  
        debugger;
        var RequiredDate = formatDate(new Date(this.StoreSalesQuotation.RequiredDate), 'MM/dd/yyyy', 'en');
        var TransactionDate = formatDate(new Date(this.StoreSalesQuotation.TransactionDate), 'MM/dd/yyyy', 'en');
        var TransactionTime = formatDate(new Date(this.StoreSalesQuotation.TransactionTime), 'HH:mm', 'en');
      } else {
        debugger;
        var RequiredDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        var TransactionTime = formatDate(new Date(), 'HH:mm', 'en');
      }
      debugger;


      $("#RequiredDate").val(RequiredDate)
      $("#TransactionDate").val(TransactionDate)
      $("#TransactionTime").val(TransactionTime)
      this.TransactionDate = TransactionDate;

      this.CreateSalesQuotation.patchValue(this.StoreSalesQuotation);
      this.ShippingDetailsPartyId(this.StoreSalesQuotation.PartyId, false);
    }
    this.CalculateTotals();


    var that = this;
    this.CreateSalesQuotation.valueChanges.subscribe(value => {
      that.StoreSalesQuotation.SequenceNumberId = value.SequenceNumberId;
      that.StoreSalesQuotation.Contactno = value.Contactno;
      that.StoreSalesQuotation.Email = value.Email;
      that.StoreSalesQuotation.RequiredDate = value.RequiredDate;
      that.StoreSalesQuotation.Billto = value.Billto;
      that.StoreSalesQuotation.Shipto = value.Shipto;
      
      that.StoreSalesQuotation.ShiptoAddress = value.ShiptoAddress;
      that.StoreSalesQuotation.Terms = value.Terms;
      that.StoreSalesQuotation.TermsandConditions = value.TermsandConditions;
      that.StoreSalesQuotation.SelectedState = that.SelectedState;
      that.StoreSalesQuotation.CountryName = that.CountryName;
      that.StoreSalesQuotation.ShipCountryName = that.ShipCountryName;
      that.StoreSalesQuotation.BillToStateCode = that.BillToStateCode;
      that.StoreSalesQuotation.BillToStateName = that.BillToStateName;
      that.StoreSalesQuotation.TaxType = that.TaxType;
      that.StoreSalesQuotation.PaymentTerms = value.PaymentTerms;
      that.StoreSalesQuotation.TransactionTime = value.TransactionTime;
      that.StoreSalesQuotation.TransactionDate = value.TransactionDate;
      that.StoreSalesQuotation.TransactionId = value.TransactionId;
      that.StoreSalesQuotation.TransactionNo = value.TransactionNo;
      that.StoreSalesQuotation.PartyName = value.PartyName;
      that.StoreSalesQuotation.PartyGSTNo = this.PartyGSTNo;
      that.StoreSalesQuotation.CustomerRefNo = value.CustomerRefNo;
      that.StoreSalesQuotation.ProductReference=value.ProductReference;
      that.StoreSalesQuotation.InvoiceType=value.InvoiceType;
      that.StoreSalesQuotation.PartyId = value.PartyId;
      that.StoreSalesQuotation.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate.toString());
      that.StoreSalesQuotation.ViewName = 'SalesQuotation';
      that.StoreSalesQuotation.lstQuotationItems = that.lstQuotationItems;
      that.StoreSalesQuotation.lstTermsChild = that.lstTermsChild;
    
      that.store.dispatch(new TabStore.AddTab(that.StoreSalesQuotation));
    });

  }
  CloseClick() {
    debugger;
    for (var i = 0; i < this.lstQuotationItems.length; i++) {
      if (this.lstQuotationItems[i].Partno == "") {
        this.lstQuotationItems.splice(i, 1);
        i = 0;
      }
    }
    $("#btnCloseQuotationPrint").click();
  }
  PrintCloseClick() {
    debugger;

    this.SalesQuotationData = null;
    $("#btnCloseQuotationPrint").click();

  }
  SelectedState = 0;
  CountryName: string = "";
  ShipCountryName: string = "";
  SelectedDate = ($("#TransactionDate").val());
  BillToStateName = '';
  BillToStateCode = '';
  selectedCustomer:Customer
  CustomerValueChange(event) {
    this.BillToStateName = '';
    this.BillToStateCode = '';
    this.selectedCustomer=Object.assign({},event);
    debugger;
    this.DisplayCustomerId = event.CustomerId;
    this.SelectedState = event.state;
    this.f.Email.setValue(event.email);
    this.f.Contactno.setValue(event.Contactno);
    this.f.PartyId.setValue(event.CustomerId);
    this.f.PartyName.setValue(event.text);
    this.PartyGSTNo = event.gstno;
    this.BillToStateName = event.statename;
    this.BillToStateCode = event.statecode;
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
    // if(Address!="" && event.statename!="")
    // {
    //   Address=Address+','+(event.statename!=""?event.statename:'');
    // }
    // if(Address!="" && event.countryname!="")
    // {
    //   Address=Address+','+(event.countryname!=""?event.countryname:'');
    // }
    // if(Address!="" && event.pincode!="")
    // {
    //   Address=Address+','+(event.pincode!=""?event.pincode:'');
    // }
    debugger;
    this.f.Billto.setValue(Address);
    this.CountryName = event.countryname;
    //this.f.CountryName.setValue(event.countryname)
    this.f.ShiptoAddress.setValue(Address);
    this.ShippingDetailsPartyId(event.CustomerId, true);

    //billto
    if (this.CompanyStateId != this.SelectedState
    ) {
      this.TaxType = "Inter State";
    } else {

      this.TaxType = "Intra State";
    }

    this.GstTaxFromHSNAndGSTTypeForGridView();


  }



  temppartno: string = "";
  AddNote(d) {
    debugger;
    for (var i = 0; i < this.lstQuotationItems.length; i++) {
      if (this.lstQuotationItems[i].Partno == d.Partno) {
        debugger;
        this.temppartno = d.Partno;
        if (this.lstQuotationItems[i].Note != "") {
          this.f.itemNote.setValue(this.lstQuotationItems[i].Note);
        } else {
          this.f.itemNote.setValue('');
        }
      }
    }


    
  }

  addnotevalid = false;
  saveNote() {
    var v = $("#itemNote").val();

    for (var i = 0; i < this.lstQuotationItems.length; i++) {
      if (this.lstQuotationItems[i].Partno == this.temppartno) {
        debugger;
      //  this.lstQuotationItems[i].Note = this.f.itemNote.value
         this.lstQuotationItems[i].Note =  ($("#itemNote").val().toString()).replace(/\n/g, ' <br> ')
       
      }
     
    }
    $('#addnoteclose').trigger('click');




  }


  tempshipto: number = 0;
  tempshipadd: string = "";
  fieldsChange(e) {
    debugger;
    if (e.target.checked) {
      this.checkstatus = true;
      this.tempshipto = this.f.Shipto.value;
      this.tempshipadd = this.f.ShiptoAddress.value;
      this.f.Shipto.setValue(0);
      this.f.ShiptoAddress.setValue("");
    }
    else {
      this.checkstatus = false;
      this.f.Shipto.setValue(this.tempshipto);
      this.f.ShiptoAddress.setValue(this.tempshipadd);
    }
  }

  StoreAccountLedger:StoreAccountLedger;
  OpenAccountLedger(){
    debugger;
    this.StoreAccountLedger=new StoreAccountLedger;
    this.APICall.UpdatedSelectedPath('./Accounting/AccountLedger');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreAccountLedger.AccountId=this.f.PartyId.value;
  this.StoreAccountLedger.AccountName=this.f.PartyName.value;
  this.StoreAccountLedger.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreAccountLedger));         
  this.router.navigate(['Accounting/AccountLedger']);
  }
//   CustomerMaster(){
//     debugger;
//   this.router.navigate(['Sales/CreateCustomer']);
// }

//excel download
@ViewChild('TABLE', { static: false }) TABLE: ElementRef;
ExportTOExcel() {  
  debugger;
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement); 
  ws['!cols'] = [{ width: 10}, { width: 20 }, { width: 30 } ]; 
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, 'SalesQuotation.xlsx');  

}

@ViewChild('PDFTable',{static:false}) pdfTable: ElementRef;

 public downloadAsPDF() {
   debugger;
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
   pdfMake.createPdf(documentDefinition).download('quotation'); 
   
 }

 Customer:Customer;
  lstCustomers:any=[];
  LoadCustomers(e)
  {
    try{
 
     if(AppSettings.ShowLoaderOnView)
     {
   //  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
  $("#loaderParent").show();
     }
     var sstring='';
    debugger;
     this.APICall.DBCalling("ViewCustomers",sstring,this.FilterType,this.DisplayCustomerId,this.APICall.GetCompanyID()).subscribe(
       (res:Response) => {
         debugger;
         this.lstDbResult=JSON.parse(res['Message']);
       
         
         this.lstCustomers=[]
         if(this.lstDbResult.Table.length>0)
         {
            var list
          this.lstCustomers=this.lstDbResult.Table[0];
     
          list= Object.assign({},this.lstCustomers);
   


          this.Customer= Object.assign({},this.lstCustomers);
          if(this.selectedCustomer!=undefined && this.selectedCustomer!=null )
          {    
           this.selectedCustomer.ViewName="RequestFrom";
            this.Customer=Object.assign({},this.selectedCustomer);  
        }
       
         this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
         
         var ActivatedRoute=localStorage.getItem("ActivatedRoute");
          this.Customer.TabId=ActivatedRoute;
        this.store.dispatch(new  TabStore.AddTab(this.Customer));         
        this.router.navigate(['Sales/CreateCustomer']);






   
         }
         $("#loaderParent").hide();
        
       
        
       
       
       });
      
    }
    catch(error)
    {
 
     }
     return  this.lstCustomers;
   }
          
CustomerMaster(){
  debugger;

  this.Customer=new Customer;
  
  this.LoadCustomers(this.DisplayCustomerId)

}
ExportTOExcel1(event){
  if(event == true){

  }
}
downloadAsPDF1(event){
  debugger;
  if(event == true){
    this.downloadAsPDF()
  }
}

OnChargesAdd() {

  this.EditChRecNO=-1;
  this.f.ChargesCOAId.setValue(0);
  this.f.ChargesCOAName.setValue('');
  this.f.ChargesAmount.setValue(0);
  this.f.SACCode.setValue('');
  this.f.ChargesCGSTPer.setValue(0);
  this.f.ChargesCGSTAmount.setValue(0);
  this.f.ChargesSGSTPer.setValue(0);

  this.f.CSGSTAccountId.setValue(0);
  this.f.CCGSTAccountId.setValue(0);
  this.f.CIGSTAccountId.setValue(0);

  this.f.ChargesSGSTAmount.setValue(0);
  this.f.ChargesIGSTPer.setValue(0);
  this.f.ChargesIGSTAmount.setValue(0);
  this.f.TotalCharges.setValue(0);



  this.f.ChargesNarration.setValue('');
  this.DisplayCgargesCOAId = 0;
  this.DispalyChargesAccountName = '';
}
download(){
  debugger;
  if(this.ExportTOExcel1){ 
    this.ExportTOExcel();
  }
  else if (this.downloadAsPDF1){
    this.downloadAsPDF();
  }
}

OpenCustomer() {
  this.APICall.OpenPageFromRefernce('Customer', './Sales/CreateCustomer', 'Sales')
  this.router.navigate(['Sales/CreateCustomer']);
}


}
