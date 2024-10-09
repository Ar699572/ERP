import { Component, OnInit, Input, forwardRef, Directive, ElementRef, Renderer2, HostBinding, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { APICallingService } from 'src/app/apicalling.service';

@Component({
  selector: 'app-addchargeitems',
  templateUrl: './addchargeitems.component.html',
  styleUrls: ['./addchargeitems.component.css']
})
export class AddchargeitemsComponent implements OnInit {
  description1: string = "";
  MakeId1: number = 0;
  Make1: string = "";
  Close: string = "";
  ItemId: number = 0;
  UOMId: number = 0;
  HSN: string = "";
  VendorId:number=0;
  Partno: string = "";
  constructor(public APICall: APICallingService,) { }
  SelectedState = 0;
  CompanyStateId = (+this.APICall.GetCompanyStateID());
  ngOnInit() {
  }
  ngAfterViewInit() {

    debugger;
 
    this.LoadParts1();

    (<any>$("#drpMaks")).select2();
  }


  LoadParts1() {
    debugger;
    var that = this;



    (<any>$("#drpPartno0Id1")).select2({
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
            return JSON.stringify({ "Operation": 'ViewNewParts', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {



          debugger;
          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.ItemId;
            obj.text = obj.partno;


            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      , templateResult: this.format1
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });




    $('#drpPartno0Id1').on('select2:open', function (e) {




      var html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Part No</b></td> <td width="50%"><b>Description</b></td> </tr > </tbody> </table>';

      var res = $('.select2-search');

      var text = res[0].innerText;

      if (text == "")
        $('.select2-search').append(html);





    });

    var that = this;
    $('#drpPartno0Id1').on('select2:select', function (e) {
      debugger;

      if (typeof ((<any>e).params.data.id) != 'undefined') {


        // that.SelectedItemId=(<any>e).params.data.ItemId
        //that.SelectedUOMID=  (that._TransactionType=='Sales'?(<any>e).params.data.saleuom:(<any>e).params.data.puruom);

        //that.SelectedHSN=(<any>e).params.data.hsncode 
        debugger;
        that.ItemId = (<any>e).params.data.ItemId;
        that.UOMId = (<any>e).params.data.puruom;
        that.HSN = (<any>e).params.data.hsncode;

        that.Partno = (<any>e).params.data.partno;


        that.description1 = (<any>e).params.data.description;
        try{
        that.LoadMakes((<any>e).params.data);
        }catch(r)
        {

        }

      }


    });


 

    $("#drpPartno0Id1").on("select2:unselecting", function (e) {

      that.ItemId = 0;
      that.UOMId = 0;
      that.HSN = '';

      that.Partno = '';
      that.description1 = '';
      debugger;

    });

  }
  UOM: string = "";
  Make: string = "";
  MakeId: number = 0;

  format1(opt) {

    if (!opt.id) {
      return opt.text;
    }




    var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.partno + '</td><td width="50%">' + opt.description + '</td></tr></tbody></table>');
    return $opt;

  };
  formatMake1(opt) {

    if (!opt.id) {
      return opt.text;
    }




    var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="60%">' + opt.make + '</td><td width="20%">' + opt.UOMName + '</td><td width="20%">' + opt.Price + '</td></tr></tbody></table>');
    return $opt;

  };
  LoadMakes(data) {
    debugger;
    var that = this;
    // var ItemId;
    //  var UOM;






    (<any>$("#drpMaks")).select2({
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
            return JSON.stringify({ "Operation": 'ViewMakByItemId', "Params": sstring, "Xml2": 'All', "Xml3": that.PreapareMakeParam(), "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.MakeId;
            obj.text = obj.make;


            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      , templateResult: this.formatMake1
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });




    $('#drpMaks').on('select2:open', function (e) {




      var html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="60%"><b>Make</b></td> <td width="20%"><b>UOMName</b></td>  <td width="20%"><b>Price</b></td> </tr > </tbody> </table>';

      var res = $('.select2-search');

      var text = res[0].innerText;

      if (text == "")
        $('.select2-search').append(html);





    });

    var that = this;
    $('#drpMaks').on('select2:select', function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;
        // that.MakeValueChange.emit((<any>e).params.data);
        // that.UOMID = (<any>e).params.data.id;
        that.UOM = (<any>e).params.data.UOMName;
        //that._SelecedRow.UOMId=(<any>e).params.data.UOMId;

        that.Make = (<any>e).params.data.text;
        that.MakeId = (<any>e).params.data.id;

        debugger;
        that.GstTaxbyHSNAndState();
        //  that.StockDetByIds((<any>e).params.data.ItemId, (<any>e).params.data.MakeId, '', '', '');
        //that.PartsValueChange.emit((<any>e).params.data);
      }


    });


    $("#drpMaks").on("select2:unselecting", function (e) {

      that.UOM = '';
      //that._SelecedRow.UOMId=(<any>e).params.data.UOMId;

      that.Make = '';
      that.MakeId = 0;
      debugger;

      $("#UOM").val('');
      $("#Price").val(0);
      //  that.SelectedItemCalc();
      //that.ItemId =0;
      //that.MakeValueChange.emit((<any>e).params.data);

    });

  }

  PreapareMakeParam(): string {
    var xmlParaminput = ""
    debugger;

    xmlParaminput = '<NewDataSet><Table1>'
      + '<ItemID>' + this.ItemId + '</ItemID>'
      + '<Type>' + "Purchase" + '</Type>'
      + '<PartyId>' + this.VendorId + '</PartyId>'
      + '<UOMID>' + this.UOMId + '</UOMID>'
      + '</Table1></NewDataSet>';

    return xmlParaminput;
  }
  lstSelectedTaxdet: any = [];
  public _TaxType = 'Intra State';
  private _TransactionDate2 = '';
  @Input()
  set TransactionDate(val) {


    this._TransactionDate2 = val;




  }
  GstTaxbyHSNAndState() {

    debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    this.APICall.DBCalling("GstTaxbyHSNAndState", this.HSN, this._TaxType, this._TransactionDate2, this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstSelectedTaxdet = [];
        this.lstSelectedTaxdet = JSON.parse(res['Message']);



        if (this.lstSelectedTaxdet.Table.length > 0) {
          this.lstSelectedTaxdet = this.lstSelectedTaxdet.Table;
        }
        this.SelectedItemCalc();
        $("#loaderParent").hide();
      });

  }
  @Input()
  set TaxType2(val) {
    debugger;

    this._TaxType = val;

  }

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
  RemoveItem1()
  {
    
  }
  SelectedItemCalc() {
    debugger;

     var tempvaraiable = (+this.TaxableValue) * (+this.Quantity);

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
        this.IGST=0;
        this.IGSTAccountId=0;
        this.IGSTAmount=0;
      }
      else{
       // this.CGST=0;
       // this.CGSTAmount=0;
       // this.CGSTAccountId=0
      }

      if (this.lstSelectedTaxdet[i].TaxType == "SGST") {
        this.SGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
        this.SGSTAmount = (((+this.TaxableValue)*(+this.lstSelectedTaxdet[i].TaxPercentage2)) / 100);
   

        try {

          this.SGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
          //this._SelecedRow.SGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
        } catch (e) {

        }
        this.IGST=0;
        this.IGSTAccountId=0;
        this.IGSTAmount=0;
      }
      else{
       // this.SGST=0;
      //  this.SGSTAmount=0;
       // this.SGSTAccountId=0;
      }

      if (this.lstSelectedTaxdet[i].TaxType == "IGST") {
        this.IGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
        this.IGSTAmount = (((+this.TaxableValue)*(+this.lstSelectedTaxdet[i].TaxPercentage2)) / 100);
        

        try {

          this.IGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
          //this._SelecedRow.IGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
        } catch (e) {

        }
        this.SGST=0;
        this.SGSTAmount=0;
        this.SGSTAccountId=0;
        this.CGST=0;
        this.CGSTAmount=0;
        this.CGSTAccountId=0
      }
      else{
        this.IGST=0;
        this.IGSTAccountId=0;
        this.IGSTAmount=0;
      }

    }
    this.TotalAmount=(+this.CGSTAmount)+(+this.SGSTAmount)+(+this.IGSTAmount)+(+tempvaraiable);

  }
  amountchange(target) {
    debugger;
    this.TaxableValue = target.value;
    this.SelectedItemCalc();
  }
  lstchargeitems: any = [];
  @Output()
  public AddchargesItemDetailsAndCloseClick = new EventEmitter();
  @Output()
  public CloseClick = new EventEmitter();
  AddItem1() {
    debugger;
    this.Close = "validate";
   
      this.lstchargeitems.push({
        SNO: (this.lstchargeitems.length == 0 ? 1 : (this.lstchargeitems.length + 1)),
       
        
        ItemId:this.ItemId,
        Partno:this.Partno,
        description1:this.description1,
        MakeId1:this.MakeId,
        Make1:this.Make,
        HSN1:this.HSN,
        TaxAmount1:this.TaxableValue,
        CGST1:this.CGST,
        SGST1:this.SGST,
        IGST1:this.IGST,
        CGSTAmount1:this.CGSTAmount,
        SGSTAmount1:this.SGSTAmount,
        IGSTAmount1:this.IGSTAmount,
        CGSTAccountId1:this.CGSTAccountId,
        SGSTAccountId1:this.SGSTAccountId,
        IGSTAccountId1:this.IGSTAccountId,
        GSTAmount1:(+this.CGSTAmount)+(+this.SGSTAmount)+(+this.IGSTAmount),
        TotalAmount1:this.TotalAmount
        
      });
      this.AddchargesItemDetailsAndCloseClick.emit({SelectedRow2: this.lstchargeitems });
  }
  resetvalues()
  {
    debugger;
        
        this.ItemId=0;
        this.Partno="";
        this.description1="";
        this.MakeId=0;
        this.Make1="";
        this.HSN="";
      this.TaxableValue=0;
        this.CGST=0;
        this.SGST=0;
        this.IGST=0;
        this.CGSTAmount=0;
        this.SGSTAmount=0;
        this.IGSTAmount=0;
        this.CGSTAccountId=0;
        this.SGSTAccountId=0;
        this.IGSTAccountId=0;
        this.TotalAmount=0;

        (<any> $('#drpPartno0Id1')).val(null).trigger('change');
        (<any> $('#drpMaks')).val(null).trigger('change');

       

  }
  lstchargeitemsmain:any=[];
 
  Editcharges(d)
  {
    debugger;
    
    var data=d;
    this.ItemId=d.ItemId;
        this.Partno=d.Partno;
        this.description1=d.description1;
        this.MakeId=d.MakeId1;
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

  @Input()
  set SelectedRow3(val) {
    debugger;
    
    this.ItemId=val.ItemId;
        this.Partno=val.Partno;
        this.description1=val.description1;
       
        this.Make1=val.Make1;
        this.HSN=val.HSN1;
      this.TaxableValue=(+val.TaxAmount1);
        this.CGST=(+val.CGST1);
        this.SGST=(+val.SGST1);
        this.IGST=(+val.IGST1);
        this.CGSTAmount=(+val.CGSTAmount1);
        this.SGSTAmount=(+val.SGSTAmount1);
        this.IGSTAmount=(+val.IGSTAmount1);
        this.CGSTAccountId=(+val.CGSTAccountId1);
        this.SGSTAccountId=(+val.SGSTAccountId1);
        this.IGSTAccountId=(+val.IGSTAccountId1);
        this.TotalAmount=(+val.TotalAmount1);

        var partSelection = new Option(this.Partno,this.ItemId.toString(), true, true);
        (<any> $('#drpPartno0Id1')).append(partSelection).trigger('change');

        var MakeSelection = new Option(this.Make1,this.MakeId1.toString(), true, true);
        (<any> $('#drpPartno0Id1')).append(MakeSelection).trigger('change');

   
  }
  _PartyId1: any;
  onChange = (_: any) => { };
  @Input()
  set PartyId1(val) {
    debugger;
    this._PartyId1 = val;
    this.VendorId=val;
    this.onChange(val);

  }
  CloseProduct1()
  {
    debugger;
    this.CloseClick.emit({SelectedRow3:'close' });
  }
}
