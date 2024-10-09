import { Component, OnInit, Input, forwardRef, Directive, ElementRef, Renderer2, HostBinding, Output, EventEmitter } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import * as $ from 'jquery';
import { APICallingService } from 'src/app/apicalling.service';
@Component({
  selector: 'app-add-charges-account',
  templateUrl: './add-charges-account.component.html',
  styleUrls: ['./add-charges-account.component.css']
})
export class AddChargesAccountComponent implements OnInit {
  VendorId: number = 0;
  Vendorname: string = "";
  Close: string = "";
  ItemId: number = 0;
  UOMId: number = 0;
  HSN: string = "";
  Partno: string = "";
  Partno0Id: number = 0;
  Partname: string = "";
  description1: string = "";
  MakeId1: number = 0;
  Make1: string = "";
  constructor(public APICall: APICallingService,) {
   
  }
  SelectedState = 0;
  CompanyStateId = (+this.APICall.GetCompanyStateID());
  ngOnInit() {
debugger;

  }
  ngAfterViewInit() {

    debugger;
    this.LoadVendor();



  }
  CloseProduct1() {
    debugger;
    this.Close = "validate";
  }


  LoadVendor() {

    var that = this;
    debugger;
    (<any>$("#drpvendorsdata")).select2({
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

            return JSON.stringify({ "Operation": 'ViewVendorsShorDet', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {

          debugger;
          var yourArrayData = (JSON.parse(response['Message'])).Table;
          var data = $.map(yourArrayData, function (obj) {

            obj.id = obj.VendorId;
            obj.text = obj.Vendorname;
            obj.text1 = obj.state;
            return obj;
          });

          return {
            results: data

          };
        },
        cache: false

      }


    });
    debugger;
    var that = this;
    $('#drpvendorsdata').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {


        that.VendorId = (<any>e).params.data.id;
        that.Vendorname = (<any>e).params.data.text;
        that.SelectedState = (+(<any>e).params.data.text1);
        if (that.CompanyStateId != that.SelectedState) {
          that.TaxType = "Inter State";
        } else {
    
          that.TaxType = "Intra State";
        }
      }


    });
    debugger;
    var vendorselection1 = new Option(this.Vendorname, this.VendorId.toString(), true, true);

    (<any>$('#drpvendorsdata')).append(vendorselection1).trigger('change');

    $("#drpvendorsdata").on("select2:unselecting", function (e) {


      that.VendorId = 0;
      that.Vendorname = '';

    });
  }
 
  private _TransactionDate = '';
  @Input()
  set TransactionDate(val) {
debugger;

    this._TransactionDate = val;




  }
  TaxType:string="";
 
  lstSelectedTaxdet: any = [];
  public _TaxType = 'Intra State';
  // @Input()
  // set TaxType(val) {
  //   debugger;

  //   this._TaxType = val;

  // }

  CGST: number = 0;
  CGSTAmount: number = 0;
  CGSTAccountId: number = 0;
  SGST: number = 0;
  SGSTAmount: number = 0;
  SGSTAccountId: number = 0;
  IGST: number = 0;
  IGSTAmount: number = 0;
  IGSTAccountId: number = 0;
  Quantity: number = 1;
  TaxableValue: number = 0;
  TotalAmount: number = 0;
  vendorRefNo: string = "";
  chargeDate: string = "";

  
  SelectedItemCalc() {
    debugger;

     var tempTaxableValue = (+this.TaxableValue) * (+this.Quantity);

    for (let i = 0; i < this.lstSelectedTaxdet.length; i++) {
      if (this.lstSelectedTaxdet[i].TaxType == "CGST") {
        debugger;
        this.CGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
        this.CGSTAmount = (((+this.TaxableValue)*(+this.lstSelectedTaxdet[i].TaxPercentage2)) / 100);
       
         
        try {

          this.CGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
          //this._SelecedRow.CGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
        } catch (e) {

        }

      }

      if (this.lstSelectedTaxdet[i].TaxType == "SGST") {
        this.SGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
        this.SGSTAmount = (((+this.TaxableValue)*(+this.lstSelectedTaxdet[i].TaxPercentage2)) / 100);
   

        try {

          this.SGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
          //this._SelecedRow.SGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
        } catch (e) {

        }

      }

      if (this.lstSelectedTaxdet[i].TaxType == "IGST") {
        this.IGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
        this.IGSTAmount = (((+this.TaxableValue)*(+this.lstSelectedTaxdet[i].TaxPercentage2)) / 100);
        

        try {

          this.IGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
          //this._SelecedRow.IGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
        } catch (e) {

        }
      }
      this.TotalAmount=(+this.CGSTAmount)+(+this.SGSTAmount)+(+this.IGSTAmount)+(+this.TaxableValue);

    }

  }
  // amountchange(target) {
  //   debugger;
  //   this.TaxableValue = target.value;
  //   this.SelectedItemCalc();
  // }
  // lstchargeitems: any = [];

  // AddItem1() {
  //   debugger;
  //   this.Close = "validate";
   
  //     this.lstchargeitems.push({
  //       SNO: (this.lstchargeitems.length == 0 ? 1 : (this.lstchargeitems.length + 1)),
       
        
  //       ItemId:this.ItemId,
  //       Partno:this.Partno,
  //       description1:this.description1,
  //       MakeId1:this.MakeId,
  //       Make1:this.Make,
  //       HSN1:this.HSN,
  //       TaxAmount1:this.TaxableValue,
  //       CGST1:this.CGST,
  //       SGST1:this.SGST,
  //       IGST1:this.IGST,
  //       CGSTAmount1:this.CGSTAmount,
  //       SGSTAmount1:this.SGSTAmount,
  //       IGSTAmount1:this.IGSTAmount,
  //       CGSTAccountId1:this.CGSTAccountId,
  //       SGSTAccountId1:this.SGSTAccountId,
  //       IGSTAccountId1:this.IGSTAccountId,
  //       GSTAmount1:(+this.CGSTAmount)+(+this.SGSTAmount)+(+this.IGSTAmount),
  //       TotalAmount1:this.TotalAmount
        
  //     });
   
  // }
  @Output()
  public AddchargesItemAndCloseClick = new EventEmitter();
  // resetvalues()
  // {
  //   debugger;
        
  //       this.ItemId=0;
  //       this.Partno="";
  //       this.description1="";
  //       this.MakeId=0;
  //       this.Make1="";
  //       this.HSN="";
  //     this.TaxableValue=0;
  //       this.CGST=0;
  //       this.SGST=0;
  //       this.IGST=0;
  //       this.CGSTAmount=0;
  //       this.SGSTAmount=0;
  //       this.IGSTAmount=0;
  //       this.CGSTAccountId=0;
  //       this.SGSTAccountId=0;
  //       this.IGSTAccountId=0;
  //       this.TotalAmount=0;

  //       (<any> $('#drpPartno0Id1')).val(null).trigger('change');
  //       (<any> $('#drpMaks')).val(null).trigger('change');

       

  // }
  LineID:number=0;
  lstchargeitemsmain:any=[];
  Addtomain()
  {
    debugger;
    this.lstchargeitemsmain=[];
    this.lstchargeitemsmain.push({
    Vendor1ID: this.VendorId,
    LineID:this.LineID,
    Vendorname1: this.Vendorname,
    refno:this.vendorRefNo,
    date:this.chargeDate
    })
    this.AddchargesItemAndCloseClick.emit({ SelectedRow1: this.lstchargeitemsmain[0],SelectedRow2: this.lstchargeitems });

  }
  lstchargeitems:any=[];
  @Input()
  set SelectedRow1(val) {
    debugger;
    this.VendorId= val.Vendor1ID,
    this.Vendorname= val.Vendorname1,
    this.vendorRefNo=val.refno,
    this.chargeDate=val.chargeDate,
    this.LineID=val.LineID,
    this.lstchargeitems=val.lstchargeacntitems
    var vendorselection1 = new Option(this.Vendorname, this.VendorId.toString(), true, true);

    (<any>$('#drpvendorsdata')).append(vendorselection1).trigger('change');
 
  }
  PartyId1:number=0;
  TaxType2:string="";
  _TransactionDate2:string="";
  AddItems() {
    debugger;
    this.Close = "invalidate";
   // this.resetvalues();
    this.ItemId=0;
    this.Partno="";
    this._TransactionDate=this._TransactionDate
    this.TaxType2=this.TaxType
    this.PartyId1=this.VendorId
     this.SelectedProductData4 = {
    SNO: (this.lstchargeitemsmain.length == 0 ? 1 : (this.lstchargeitemsmain.length + 1)),
       ItemId: 0,
        Partno:'',
        description1:'',
       
        Make1:0,
        HSN:'',
        TaxableValue:0,
        CGST:0,
        SGST:0,
        IGST:0,
        CGSTAmount:0,
        SGSTAmount:0,
        IGSTAmount:0,
        CGSTAccountId:0,
        SGSTAccountId:0,
        IGSTAccountId:0,
        TotalAmount:0

    , Show: 'true'
  };
    
    
  }
  Editcharges(d)
  {
    debugger;
    this.Close = "invalidate";
    var data=d;
    this.ItemId=d.ItemId;
        this.Partno=d.Partno;
        this.description1=d.description1;
       
        this.Make1=d.Make1;
        this.HSN=d.HSN1;
      this.TaxableValue=(+d.TaxAmount1);
        this.CGST=(+d.CGST1);
        this.SGST=(+d.SGST1);
        this.IGST=(+d.IGST1);
        this.CGSTAmount=(+d.CGSTAmount1);
        this.SGSTAmount=(+d.SGSTAmount1);
        this.IGSTAmount=(+d.IGSTAmount1);
        this.CGSTAccountId=(+d.CGSTAccountId1);
        this.SGSTAccountId=(+d.SGSTAccountId1);
        this.IGSTAccountId=(+d.IGSTAccountId1);
        this.TotalAmount=(+d.TotalAmount1);

        var partSelection = new Option(this.Partno,this.ItemId.toString(), true, true);
        (<any> $('#drpPartno0Id1')).append(partSelection).trigger('change');

        var MakeSelection = new Option(this.Make1,this.MakeId1.toString(), true, true);
        (<any> $('#drpPartno0Id1')).append(MakeSelection).trigger('change');


  }
  SelectedProductData4 = {
    SNO: 1,
    
    ItemId: 0,
     Partno:'',
     description1:'',
    
     Make1:0,
     HSN:'',
     TaxableValue:0,
     CGST:0,
     SGST:0,
     IGST:0,
     CGSTAmount:0,
     SGSTAmount:0,
     IGSTAmount:0,
     CGSTAccountId:0,
     SGSTAccountId:0,
     IGSTAccountId:0,
     TotalAmount:0

 , Show: 'true'
  }
  CloseClick(event) {
    debugger;
    this.close(event.SelectedRow3)
  }
  close(type)
  {
    debugger;
    if (type == 'close') {
      this.Close='validate';
      $("#btnCloseAddItem2").trigger('click');
    }
  }
  AddchargesItemDetailsAndCloseClick(event) {
    debugger;
    this.AddchargeItem1('Close',event.SelectedRow2)
  }
  AddchargeItem1(type,data)
  {
    debugger;
    this.Close='validate';
    this.lstchargeitems.push(data[0]);
    if (type == 'Close') {
      $("#btnCloseAddItem2").trigger('click');
      //this.EditRecNO = 0;
    }
  }

}
