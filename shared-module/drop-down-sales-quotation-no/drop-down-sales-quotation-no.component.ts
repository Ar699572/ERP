import { Component, OnInit, Input, forwardRef, Directive, ElementRef, Renderer2, HostBinding, Output, EventEmitter } from '@angular/core';
import { APICallingService } from 'src/app/apicalling.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import { DatePipe } from '@angular/common';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownSalesQuotationNoComponent),
      multi: true
    }
  ],
  selector: 'DropdownSales',
  templateUrl: './drop-down-sales-quotation-no.component.html',
  styleUrls: ['./drop-down-sales-quotation-no.component.css']
})

export class DropDownSalesQuotationNoComponent implements ControlValueAccessor {

  @HostBinding('attr.id')

  onChange = (_: any) => { };
  onTouched = () => { };

  private _TransactionId = 0;
  private _TransactionNo='';
  private _TransactionDate='';
private _PartyId=0;

  @Input()
  set TransactionId(val) {
   
    this._TransactionId = val;
    this.onChange(val);
    if(this._TransactionId==0)

{
  $("#drpSales").val('').trigger('change');
}
    if (this._TransactionId != 0) {
      var quotaionselection = new Option(this._TransactionNo.toString(), this._TransactionId.toString(), true, true);
      (<any>$('#drpSales')).append(quotaionselection).trigger('change');
    }
    
  }

  get TransactionId() {
    return this._TransactionId;
  }

  @Input()
  set PartyId(val) { 
    debugger;  
    this._PartyId = val;
    if( this._PartyId==0){
      this._TransactionNo=""
      $("#drpSales").val('').trigger('change');
    }
    if(this._PartyId >0)
    {
      var quotaionselection = new Option('', '', true, true);
      (<any>$('#drpSales')).append(quotaionselection).trigger('change');
      this.LoadSales();
    }else {
      debugger;
      var quotaionselection = new Option(this._TransactionNo.toString(), this._TransactionId.toString(), true, true);
      (<any>$('#drpSales')).append(quotaionselection).trigger('change');
    }
  }

  get PartyId() {
    
    return this._PartyId;
  }

  @Input()
  set TransactionNo(val) {   
    this._TransactionNo = val;
  }

  get TransactionNo() {
    return this._TransactionNo;
  }

  @Input()
  set TransactionDate(val) {
    this._TransactionDate = val;
  }

  get TransactionDate() {
    return this._TransactionDate;
  }

  writeValue(obj: any): void {
    if (obj !== undefined && obj != "") {
      this.TransactionId = obj;
    }
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledCustomer?(isDisabled: boolean): void {

  }
 

  @Output()
  public SalesValueChange = new EventEmitter();
  constructor(private APICall: APICallingService) { }

  format(opt) {

 
    if (!opt.id) {
      return opt.text;
    }


    var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.TransactionNo + '</td><td width="50%">' + opt.TransactionDate + '</td></tr></tbody></table>');


    return $opt;

  };


 
  that = this;
  LoadSales() {

    var that = this;


    (<any>$('#drpSales')).select2({
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
            return JSON.stringify({ "Operation": 'SalesOrderSQItems', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {

          var ResultData = (JSON.parse(response['Message'])).Table;
    

          var data = $.map(ResultData, function (obj) {
debugger;
            if(obj.PartyId===that.PartyId)
            {

            obj.PartyId = obj.PartyId;
            obj.id = obj.TransactionId;
            obj.text = obj.TransactionNo;
            obj.TransactionDate = obj.TransactionDate;
            }
      if(obj.lstQuotationItems==null && obj.TransactionNo!=="" && obj.TransactionDate!==""){
  
        obj.TransactionNo="";
        obj.TransactionDate="";
        obj.id = '';
        obj.text = '';
        obj.lstQuotationItems=[]
              $("#drpSales").val('').trigger('change');
        }
            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      , templateResult: this.format

    });

    $('#drpSales').on('select2:open', function (e) {

      debugger;
      var html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="70%"><b>QuotationNo</b></td> <td width="30%"><b>Date</b></td>  </tr > </tbody> </table>';

      var res = $('.select2-search');

      var text = res[0].innerText;

      if (text == "")
        $('.select2-search').append(html);
     

    });



    var that = this;
    $('#drpSales').on('select2:select', function (e) {

 


      if (typeof ((<any>e).params.data.id) != 'undefined') {

       that.TransactionNo = (<any>e).params.data.text;
    
        that.SalesValueChange.emit((<any>e).params.data);
        
       
      }
    

    });
  

  }

  ngAfterViewInit() {
   // this.LoadSales();

  }

  
  ngOnInit() {
   // this.LoadSales();
  }

}
