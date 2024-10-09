import { Component, OnInit, Input, forwardRef, Directive, ElementRef, Renderer2, HostBinding, Output, EventEmitter } from '@angular/core';
import { APICallingService } from 'src/app/apicalling.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddPurchaseTaxDetailsComponent),
      multi: true
    }
  ],
  selector: 'app-add-purchase-tax-details',
  templateUrl: './add-purchase-tax-details.component.html',
  styleUrls: ['./add-purchase-tax-details.component.css']
})
export class AddPurchaseTaxDetailsComponent implements OnInit {

  CUSTMTAX:number=0;
  SWTAX:number=0;
  Qty1:number=1;
  Rate1:number=0;
  Invoicetype11:string="";
  constructor(private APICall: APICallingService) { }

  
  ngOnInit() {
  }



  public _type: string = "";

  @Input()
  set type(val) {
    debugger;
    this._type = val;
    this.onChange(val);

  }

  public _ShowStockSelection = false;
  @Input()
  set ShowStockSelection(val) {
    debugger;
    this._ShowStockSelection = val;
    this.onChange(val);

  }

  @Input()
  set SelectedRow(val) {
    debugger;
    if(val.InvoiceType1=="Import")
    {
      if((+val.NetTotal)==0)
      {
        $("#AssValuePerUnit1").val(0);
        $("#dollarPrice").val(0);
        
        $("#Price").val(0);
        $("#bcd").val(0);
        $("#sws").val(0);
        this.SWTAX=0;
        this.CUSTMTAX=0;
        this.Rate1=0;
       
      }
      else{
        this.Rate1=val.Rate;
        this.Qty1=val.Qty;
        ($("#dollarPrice").val(val.dollarprice));
        ($("#bcd").val(val.bcd));
        ($("#sws").val(val.sws));
        ($("#Price").val(val.Rate));
        this.CUSTMTAX=(+val.bcdper);
        this.SWTAX=(+val.swsper);
      }
      this.Invoicetype11="Import";
      
    }
    else{
      this.Invoicetype11="Invoice"
    }
    this._SelecedRow = val;

    this.SetProductData(val);


  }


  _PartyId: any;

  @Input()
  set PartyId(val) {
    debugger;
    this._PartyId = val;
    this.onChange(val);

  }


  @Input()
  set lstSelectedItemsStock(val) {
    debugger;
    this._lstSelectedItemsStock = val;
    this.onChange(val);

  }
  private _lstSelectedItemsStock: any = [];

  private _SelecedRow: any;
  SNO = "0";
  Open = false;
  ValueClear() {

    this._SelecedRow.TotalTax = 0;
    this._SelecedRow.NetTotal = 0;
    $("#UOM").val('');
    $("#Price").val(0);
    $("#PriceInclusiveTax").val(0);
    $("#Quantity").val(1);
    $("#DiscountPercentage").val(0);
    $("#DiscountAmount").val(0);
    $("#CGST").val(0);
    $("#CGSTAmount").val(0);
    $("#SGST").val(0);
    $("#SGSTAmount").val(0);
    $("#IGST").val(0);
    $("#IGSTAmount").val(0);
    $("#TotalTax").val(0);
    $("#AssValuePerUnit1").val(0);
    
    $("#NetTotal").val(0);
    $("#Description").val('');

    (<any>$('#drpMake')).val(null).trigger('change');
    (<any>$('#drpParts')).val(null).trigger('change');
    this.lstSelectedTaxdet = [];
    this.lstItemsStock = [];

    this.ShowStockControls = false;
  }
  CloseProduct() {
    this.Open = false;



  }
  SetProductData(val) {

    this.ShowStockControls = false;
    debugger;
    this.SNO = val.SNO;
    this.AllowNegativeStock = this.APICall.GetAllowNegativeStock();
    var ItemSelection = new Option(val.Partno, val.ItemId.toString(), true, true);

    (<any>$('#drpParts')).append(ItemSelection).trigger('change');
    var MakeSelection = new Option(val.Make, val.MakeId.toString(), true, true);

    (<any>$('#drpMake')).append(MakeSelection).trigger('change');





    $("#UOM").val(val.UOM);
    this._SelecedRow.Rate = val.Rate;
    $("#Price").val(val.Rate);
    $("#PriceInclusiveTax").val(val.Rate);
    $("#Quantity").val(val.Qty);
   $("#sws").val(val.sws);
   $("#bcd").val(val.bcd);
this.CUSTMTAX=val.bcdper;
this.SWTAX=val.swsper;
    $("#DiscountPercentage").val(val.DiscountPercentage);
    $("#DiscountAmount").val(val.DiscountAmount);
    $("#CGST").val(val.CGST);
    $("#CGSTAmount").val(val.CGSTAmount);
    $("#SGST").val(val.SGST);
    $("#SGSTAmount").val(val.SGSTAmount);
    $("#IGST").val(val.IGST);
    $("#IGSTAmount").val(val.IGSTAmount);
    $("#TotalTax").val(val.TotalTax);
    $("#NetTotal").val(val.NetTotal);
    $("#Description").val(val.Description);

    if ((+val.LineId == 0)) {

      // this._lstSelectedItemsStock=[];
      this.lstItemsStock = [];
    }
    if ((+val.ItemId) != 0 && (this.Open != true)) {
      debugger;
      this.Open = true;
      this.GstTaxbyHSNAndState();
      //this.lstItemsStock=[];
     // this.StockDetByIds(val.ItemId, val.MakeId, '', '', 'Open');
    } else {


      // if(this.lstItemsStock.length==0)
      // {
      //   this.ShowStockControls=true;
      // }

      if ((+val.ItemId) == 0) {

        this.ShowStockControls = false;
      }
    }



  }
  @Output()
  public RemoveItemClick = new EventEmitter();
  @Output()
  public AddItemAndClose1Click = new EventEmitter();
  @Output()
  public AddItemAndNewClick = new EventEmitter();
  RemoveItem() {
    this.Open = false;

    this.RemoveItemClick.emit(this._SelecedRow);
  }
  AddItemAndClose1() {
    debugger;
    if(this._SelecedRow.InvoiceType1=="Import")
    {
      if((+this.CUSTMTAX>0)&&(+this.SWTAX>0))
      {
        this.Open = false;
        this._SelecedRow.bcdper=(+this.CUSTMTAX);
        this._SelecedRow.swsper=(+this.SWTAX);
        this._SelecedRow.dollarprice=(+ $("#dollarPrice").val());
        this.StockAllotment();
        this.AddItemAndClose1Click.emit({ SelecedRow: this._SelecedRow, StockErrorMsg: this.StockErrorMsg, StockAllotment: this._lstSelectedItemsStock }); 

      }
      else{
        (window as any).swal({
          icon: 'warning',
          title: 'Invalid Taxes',
          text: 'BCD and SWS Taxes are should be Map in this Item.!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-warning'
         });
      }
      
    }
    else{
      this.Open = false;
      this._SelecedRow.bcdper=(+this.CUSTMTAX);
      this._SelecedRow.swsper=(+this.SWTAX);
      this._SelecedRow.dollarprice=(+ $("#dollarPrice").val());
      this.StockAllotment();
      this.AddItemAndClose1Click.emit({ SelecedRow: this._SelecedRow, StockErrorMsg: this.StockErrorMsg, StockAllotment: this._lstSelectedItemsStock });
    
    }
    
  }

  StockErrorMsg = "";
  ValidateStock(): boolean {
    debugger;
    this.StockErrorMsg = "";
    var vald = true;

    if (this.AllowNegativeStock == 'true') {


    } else {
      if (this.lstItemsStock.length == 0) {

        //this.StockErrorMsg="Stock Not Available";

        if (this.SelectedBin == 0 || this.SelectedLocation == 0) {

          this.StockErrorMsg = "Stock Not Available";
          vald = false;
        }

        else {

          this.lstItemsStock.push(
            {
              BinId: this.SelectedBin,
              binname: this.SelectedBinName,
              LocationId: this.SelectedLocation,
              locationname: this.SelectedLocationName,
              Alloted: this._SelecedRow.Qty
            });

        }


      }
    }

    if (this.lstItemsStock.length > 0) {
      var AllotedQty = 0;
      for (let i = 0; i < this.lstItemsStock.length; i++) {

        if ((+this.lstItemsStock[i].Alloted) > 0) {


          AllotedQty = AllotedQty + (+this.lstItemsStock[i].Alloted);

        }


      }
      if (this._type == "purchaseInvoice") {
        AllotedQty = (+this._SelecedRow.Qty);
        for (let i = 0; i < this.lstItemsStock.length; i++) {
          this.lstItemsStock[i].Alloted = AllotedQty
        }
      }
      else {
        if ((+this._SelecedRow.Qty) != (+AllotedQty)) {

          this.StockErrorMsg = "Invalid Stock Allotment";
        }
      }




    }



    return vald;

  }
  AllotedChange(target, index) {
    debugger;
    if ((+this._SelecedRow.Qty) > 0) {
      if (target.checked) {
        var AvailablePhysical = 0;
        var AllotedQty = 0;
        for (let i = 0; i < this.lstItemsStock.length; i++) {

          if ((+this.lstItemsStock[i].Alloted) > 0) {


            AllotedQty = AllotedQty + (+this.lstItemsStock[i].Alloted);

          }

          AvailablePhysical = (+AvailablePhysical) + (+this.lstItemsStock[i].AvailablePhysical);
        }

        if ((+this._SelecedRow.Qty) <= (+AllotedQty)) {

          target.checked = false;
        } else {

          var RemainAllot = (+this._SelecedRow.Qty) - (+AllotedQty);

          if ((+this.lstItemsStock[index].AvailablePhysical) < 0) {
            this.lstItemsStock[index].Alloted = RemainAllot;
            this.lstItemsStock[index].AvailablePhysical = (+this.lstItemsStock[index].AvailablePhysical) - (+RemainAllot);
          }
          else {

            if (((+this.lstItemsStock[index].AvailablePhysical) - RemainAllot) <= 0) {
              if (this.AllowNegativeStock == 'true') {
                if ((+AvailablePhysical) >= (this._SelecedRow.Qty)) {
                  if ((+this.lstItemsStock[index].AvailablePhysical) <= 0) {
                    target.checked = false;

                  }
                  else {
                    this.lstItemsStock[index].Alloted = (+this.lstItemsStock[index].AvailablePhysical);
                    this.lstItemsStock[index].AvailablePhysical = 0;
                  }

                }
                else {
                  this.lstItemsStock[index].Alloted = RemainAllot;
                  this.lstItemsStock[index].AvailablePhysical = (+this.lstItemsStock[index].AvailablePhysical) - (+RemainAllot);
                }

              }
              else {
                if ((+this.lstItemsStock[index].AvailablePhysical) <= 0) {
                  target.checked = false;
                } else {
                  this.lstItemsStock[index].Alloted = (+this.lstItemsStock[index].AvailablePhysical);
                  this.lstItemsStock[index].AvailablePhysical = 0;

                }

              }





            } else {


              this.lstItemsStock[index].Alloted = RemainAllot;
              this.lstItemsStock[index].AvailablePhysical = (+this.lstItemsStock[index].AvailablePhysical) - (+RemainAllot);
            }

          }



        }



      } else {
        this.lstItemsStock[index].AvailablePhysical = (+this.lstItemsStock[index].AvailablePhysical) + (+this.lstItemsStock[index].Alloted);
        this.lstItemsStock[index].Alloted = 0;
      }
    } else {

      target.checked = false;
    }

  }

  // ReArrangeSNo()
  // {
  //   for (let i = 0; i < this._lstSelectedItemsStock.length; i++)
  //    {
  //     if ((this._lstSelectedItemsStock[i].ItemId == this._SelecedRow.ItemId &&  this._lstSelectedItemsStock[i].Rate==this._SelecedRow.Rate)
  //   ) 
  //    {


  //   }

  // }
  // }
  StockAllotment() {
    debugger;
    if (this.ValidateStock()) {
      // &&  this._lstSelectedItemsStock[i].Rate==this._SelecedRow.Rate
      debugger;
      var lstExistingStockData = [];

      
       for (let i = 0; i < this._lstSelectedItemsStock.length; i++) {
      //   if (this._lstSelectedItemsStock[i].ItemId != this._SelecedRow.ItemId &&  this._lstSelectedItemsStock[i].Rate!=this._SelecedRow.Rate
      //     &&  this._lstSelectedItemsStock[i].SNO!=this._SelecedRow.SNO) 
      //     {
            if ((this._lstSelectedItemsStock[i].ItemId == this._SelecedRow.ItemId &&  this._lstSelectedItemsStock[i].Rate==this._SelecedRow.Rate)
             || (this._lstSelectedItemsStock[i].ItemId == this._SelecedRow.ItemId &&  this._lstSelectedItemsStock[i].SNO==this._SelecedRow.SNO))
           {
   
             if ((this._lstSelectedItemsStock[i].LineId) > 0 && this._lstSelectedItemsStock[i].LineId != "0")
              {
   
               var resr =
                 ({
                   LineId: this._lstSelectedItemsStock[i].LineId
                 });
   
               try {
                 lstExistingStockData.splice(0, 1);
               } catch (ex) {
   
               }
   
               if (lstExistingStockData.length == 0) {
                 lstExistingStockData = [resr];
               } else {
   
                 lstExistingStockData.push(resr);
               }
   
   
             }
             this._lstSelectedItemsStock.splice(i, 1);
   
             i = 0;
   
   
           }
       //   }
      

      }
      //this._lstSelectedItemsStock=[];

      if (this.ShowStockControls) {
        var res =
          ({
            LineId: (lstExistingStockData.length > 0 ? lstExistingStockData[0].LineId : 0)

            , Partno: this._SelecedRow.Partno
            , ItemId: this._SelecedRow.ItemId
            , MakeId: this._SelecedRow.MakeId
            , UOMId: this._SelecedRow.UOMId
            , Make: this._SelecedRow.Make
            , UOM: this._SelecedRow.UOM

              ,SNO:this._SelecedRow.SNO
            , Qty: (+this._SelecedRow.Qty)



            , LocationId: this.SelectedLocation
            , BinId: this.SelectedBin
            , Locationname: this.SelectedLocationName


            , Rate: this._SelecedRow.Rate
            , BinName: this.SelectedBinName




            , Show: 'true'
          });
        debugger;
        //this._lstSelectedItemsStock=[res];
        if (this._lstSelectedItemsStock.length == 0 ) {
          debugger;
          this._lstSelectedItemsStock = [res];
        } else {

debugger;

          this._lstSelectedItemsStock.push(res);

        }

      } else {

        for (let i = 0; i < this.lstItemsStock.length; i++) {
          if ((+this.lstItemsStock[i].Alloted) > 0) {

            if (this._lstSelectedItemsStock.length == 0) {
              debugger;
              this._lstSelectedItemsStock = [({
                LineId: (lstExistingStockData.length > 0 ? lstExistingStockData[0].LineId : 0)

                , Partno: this._SelecedRow.Partno
                , ItemId: this._SelecedRow.ItemId
                , MakeId: this._SelecedRow.MakeId
                , UOMId: this._SelecedRow.UOMId
               // ,SNO:this._SelecedRow.SNO
                , Make: this._SelecedRow.Make
                , UOM: this._SelecedRow.UOM
                , Rate: (typeof (this._SelecedRow.Rate) == 'undefined' ? 0 : this._SelecedRow.Rate)

                , Qty: this.lstItemsStock[i].Alloted



                , LocationId: this.lstItemsStock[i].LocationId
                , BinId: this.lstItemsStock[i].BinId
                , Locationname: this.lstItemsStock[i].locationname



                , BinName: this.lstItemsStock[i].binname




                , Show: 'true'
              })];
            } else if(this._SelecedRow.Rate!=0){



              this._lstSelectedItemsStock.push({
                LineId: (lstExistingStockData.length > 0 ? lstExistingStockData[0].LineId : 0)

                , Partno: this._SelecedRow.Partno
                , ItemId: this._SelecedRow.ItemId
                , MakeId: this._SelecedRow.MakeId
                , UOMId: this._SelecedRow.UOMId
                ,SNO:this._SelecedRow.SNO
                , Make: this._SelecedRow.Make
                , UOM: this._SelecedRow.UOM
                , Rate: (typeof (this._SelecedRow.Rate) == 'undefined' ? 0 : this._SelecedRow.Rate)


                , Qty: this.lstItemsStock[i].Alloted



                , LocationId: this.lstItemsStock[i].LocationId
                , BinId: this.lstItemsStock[i].BinId
                , Locationname: this.lstItemsStock[i].locationname



                , BinName: this.lstItemsStock[i].binname




                , Show: 'true'
              });
            }

          }


        }
      }
    }

  }

  StockMapping() {
    debugger;
    for (let i = 0; i < this.lstItemsStock.length; i++) {
      for (let j = 0; j < this._lstSelectedItemsStock.length; j++) {

        if (this.lstItemsStock[i].LocationId == this._lstSelectedItemsStock[j].LocationId && this.lstItemsStock[i].BinId == this._lstSelectedItemsStock[j].BinId &&

          this._lstSelectedItemsStock[j].ItemId == this._SelecedRow.ItemId && this._lstSelectedItemsStock[j].MakeId == this._SelecedRow.MakeId
        ) {

          if (this._lstSelectedItemsStock[j].LineId == 0) {
            this.lstItemsStock[i].Alloted = this._lstSelectedItemsStock[j].Qty;

            this.lstItemsStock[i].AvailablePhysical = (+this.lstItemsStock[i].AvailablePhysical) - (+this._lstSelectedItemsStock[j].Qty);
          } else {
            this.lstItemsStock[i].Alloted = this._lstSelectedItemsStock[j].Qty;
          }

        }
      }

    }

  }

  AddItemAndNew() {
    debugger;
    this.Open = false;
   // this._SelecedRow.dollarprice=(+ $("#dollarPrice").val());
    this.StockAllotment();
    try {
      this.AddItemAndNewClick.emit({ SelecedRow: this._SelecedRow, StockErrorMsg: this.StockErrorMsg, StockAllotment: this._lstSelectedItemsStock });
      //   this.AddItemAndNewClick.subscribe()
      //   {
      // debugger;

      debugger;
      if ((this.StockErrorMsg == '' || (!this._ShowStockSelection)) && this._SelecedRow.NetTotal > 0) {
        this.ValueClear();
        this.SNO = ((+this.SNO) + 1).toString();


        this._SelecedRow = {
          SNO: (+this.SNO)
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



          , TotalTax: 0
          , NetTotal: 0

          , TaxType: 0



          , HSN: ''
          , SGSTAccountId: 0
          , CGSTAccountId: 0
          , IGSTAccountId: 0
          // ,SGSTAccountName:''
          // ,CGSTAccountName:''
          // ,IGSTAccountName:''


          , Show: 'true'
        }
      }

      // }

    } catch (e) {
      debugger;
    }
    debugger;


  }
  StockAllotmentMapping() {
    // lstItemsStock
    debugger;
    for (let i = 0; i < this.lstItemsStock.length; i++) {


      if (this.lstItemsStock[i].Alloted > 0) {


        this.lstItemsStock[i].AvailablePhysical = (+this.lstItemsStock[i].AvailablePhysical) + (+ this.lstItemsStock[i].Alloted);

        this.lstItemsStock[i].Alloted = 0;
        var AvailablePhysical = 0;
        var AllotedQty = 0;
        for (let i = 0; i < this.lstItemsStock.length; i++) {

          if ((+this.lstItemsStock[i].Alloted) > 0) {


            AllotedQty = AllotedQty + (+this.lstItemsStock[i].Alloted);

          }

          AvailablePhysical = (+AvailablePhysical) + (+this.lstItemsStock[i].AvailablePhysical);
        }

        if ((+this._SelecedRow.Qty) <= (+AllotedQty)) {

          // target.checked=false;
        } else {

          var RemainAllot = (+this._SelecedRow.Qty) - (+AllotedQty);

          if ((+this.lstItemsStock[i].AvailablePhysical) < 0) {
            this.lstItemsStock[i].Alloted = RemainAllot;
            this.lstItemsStock[i].AvailablePhysical = (+this.lstItemsStock[i].AvailablePhysical) - (+RemainAllot);
          }
          else {

            if (((+this.lstItemsStock[i].AvailablePhysical) - RemainAllot) <= 0) {
              if (this.AllowNegativeStock == 'true') {
                if ((+AvailablePhysical) >= (this._SelecedRow.Qty)) {
                  if ((+this.lstItemsStock[i].AvailablePhysical) <= 0) {
                    // target.checked=false;

                  }
                  else {
                    this.lstItemsStock[i].Alloted = (+this.lstItemsStock[i].AvailablePhysical);
                    this.lstItemsStock[i].AvailablePhysical = 0;
                  }

                }
                else {
                  this.lstItemsStock[i].Alloted = RemainAllot;
                  this.lstItemsStock[i].AvailablePhysical = (+this.lstItemsStock[i].AvailablePhysical) - (+RemainAllot);
                }

              }
              else {
                if ((+this.lstItemsStock[i].AvailablePhysical) <= 0) {

                  //    target.checked=false;
                } else {
                  this.lstItemsStock[i].Alloted = (+this.lstItemsStock[i].AvailablePhysical);
                  this.lstItemsStock[i].AvailablePhysical = 0;

                }

              }





            } else {


              this.lstItemsStock[i].Alloted = RemainAllot;
              this.lstItemsStock[i].AvailablePhysical = (+this.lstItemsStock[i].AvailablePhysical) - (+RemainAllot);
            }

          }



        }
      }


    }

  }

  QuantityChange(target) {
    debugger;
    this._SelecedRow.Qty = target.value;
    this.Qty1= target.value;
    this.StockAllotmentMapping()
    this.SelectedItemCalc();
  }
  PriceChange(target) {
    debugger;
    this._SelecedRow.Rate = target.value;
    this.Rate1= (+target.value);
    
    this.SelectedItemCalc();
  }
  InclusiveTaxPriceChange(target) {
    debugger;
    var InclusiveTaxRate = (+target.value);
    var TaxRate = 0;
    var TotalTax = 0;
    for (let i = 0; i < this.lstSelectedTaxdet.length; i++) {
      if (this.lstSelectedTaxdet[i].TaxType == "CGST") {
        TaxRate = (+this.lstSelectedTaxdet[i].TaxPercentage2);


      }

      if (this.lstSelectedTaxdet[i].TaxType == "SGST") {
        TaxRate = TaxRate + (this.lstSelectedTaxdet[i].TaxPercentage2);


      }

      if (this.lstSelectedTaxdet[i].TaxType == "IGST") {
        TaxRate = (+this.lstSelectedTaxdet[i].TaxPercentage2);

      }


    }
    var IncludedTax = (InclusiveTaxRate / (100 + TaxRate) * TaxRate);

    $("#Price").val(InclusiveTaxRate - IncludedTax);


    this.SelectedItemCalc();
  }
  DiscountPerChange(target) {
    this._SelecedRow.DiscountPercentage = target.value;

    this.SelectedItemCalc();
  }
  DiscountAmountChange(target) {
    this._SelecedRow.DiscountAmount = target.value;
    if ((+target.value) > ((+  this._SelecedRow.Qty) * (+this._SelecedRow.Rate))) {
      target.value = 0;
      (window as any).swal("Cancelled", "Invalid Discount :)", "error");
      this._SelecedRow.DiscountPercentage = 0;
    }
    else {

      this._SelecedRow.DiscountPercentage = (((+target.value) * 100) / ((+ this._SelecedRow.Qty) * (+this._SelecedRow.Rate)));

      this.SelectedItemCalc();
    }




  }

  @Input()
  set TransactionDate(val) {


    this._TransactionDate = val;




  }
  private _TransactionDate = '';

  @Input()
  set TransactionType(val) {


    this._TransactionType = val;




  }
  _TransactionType = '';
  @Input()
  set TaxType(val) {
    debugger;

    this._TaxType = val;




  }
  DiscountValueChange(target) {

  }
  AllowNegativeStock = 'true'
  public _TaxType = 'Intra State';
  onChange = (_: any) => { };
  onTouched = () => { };
  writeValue(obj: any): void {
    if (obj !== undefined && obj != "") {


      // this.ItemId = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngAfterViewInit() {

    debugger;
    this.LoadParts();

    (<any>$("#drpMake")).select2();
    this.LoadLocations();
    (<any>$("#drpBin")).select2();
  }

  format(opt) {

    if (!opt.id) {
      return opt.text;
    }




    var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.partno + '</td><td width="50%">' + opt.description + '</td></tr></tbody></table>');
    return $opt;

  };

  formatMake(opt) {

    if (!opt.id) {
      return opt.text;
    }




    var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="60%">' + opt.make + '</td><td width="20%">' + opt.UOMName + '</td><td width="20%">' + opt.Price + '</td></tr></tbody></table>');
    return $opt;

  };
  lstSelectedTaxdet: any = [];
  GstTaxbyHSNAndState() {

    debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


    this.APICall.DBCalling("GstTaxbyHSNAndState", this._SelecedRow.HSN, this._TaxType, this._TransactionDate, this.APICall.GetCompanyID()).subscribe(
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
  //lstStockInfo:any=[];
  ShowStockControls = false;
  lstItemsStock: any = [];
  StockDetByIds(ItemId, MakeId, LocationId, BinId, RecordType) {
    debugger;
    this.ShowStockControls = false;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();

    debugger;
    this.APICall.DBCalling("StockOnHandByPartNoAndMake", ItemId, LocationId, BinId, MakeId).subscribe(
      (res: Response) => {
        debugger;
        this.lstItemsStock = [];
        this.lstItemsStock = JSON.parse(res['Message']);



        if (this.lstItemsStock.Table.length > 0) {
          var lstStock = this.lstItemsStock.Table;
          var LocationSelection = new Option(lstStock[0].locationname, lstStock[0].LocationId.toString(), true, true);
          (<any>$('#drpLocation')).append(LocationSelection).trigger('change');

          var BinSelection = new Option(lstStock[0].binname, lstStock[0].BinId.toString(), true, true);

          (<any>$('#drpBin')).append(BinSelection).trigger('change');
          var lstresStock = $.map(lstStock, function (obj) {

            obj.Alloted = 0;
            return obj;
          });
          this.lstItemsStock = lstresStock;

          if (RecordType == 'Open') {
            this.StockMapping();
          }
        }
        else {
          this.lstItemsStock = [];
          this.ShowStockControls = true;


        }
        $("#loaderParent").hide();
      });

  }
  SelectedLocation = 0;
  SelectedLocationName = '';
  SelectedBin = 0;
  SelectedBinName = '';
  LoadBinsByLocation() {
    debugger;
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
            return JSON.stringify({ "Operation": 'ViewBinsFromLocation', "Params": sstring, "Xml2": 'All', "Xml3": that.SelectedLocation, "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.BinId;
            obj.text = obj.binname;


            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      //, templateResult: this.formatMake
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });




    // $('#drpBin').on('select2:open', function (e) {




    //    var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="60%"><b>Make</b></td> <td width="20%"><b>UOMName</b></td>  <td width="20%"><b>Price</b></td> </tr > </tbody> </table>';

    //   var res= $('.select2-search');

    //   var text=res[0].innerText;

    //   if(text=="")
    //    $('.select2-search').append(html);





    // });

    var that = this;
    $('#drpBin').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        that.SelectedBin = (<any>e).params.data.BinId;
        that.SelectedBinName = (<any>e).params.data.binname;
        //  that.LoadBinsByLocation();

      }


    });


    $("#drpBin").on("select2:unselecting", function (e) {

      that.SelectedBin = 0;


      (<any>$('#drpBin')).val(null).trigger('change');




    });
  }
  LoadLocations() {
debugger;
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
            return JSON.stringify({ "Operation": 'ViewLocationsFromBranch', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.LocationId;
            obj.text = obj.locationname;


            return obj;
          });



          return {


            results: data

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

        that.SelectedLocation = (<any>e).params.data.LocationId;
        that.SelectedLocationName = (<any>e).params.data.text;
        that.LoadBinsByLocation();

      }


    });


    $("#drpLocation").on("select2:unselecting", function (e) {

      that.SelectedLocation = 0;


      (<any>$('#drpLocation')).val(null).trigger('change');
      (<any>$('#drpBin')).val(null).trigger('change');



    });

  }

  //LastSoldPrice='0';
  //LastPurchasePrice='0';
    LoadMakes(data) {
      debugger;
      var that = this;
      // var ItemId;
      //  var UOM;






      (<any>$("#drpMake")).select2({
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
        , templateResult: this.formatMake
        // ,templateSelection: this.format
        //,minimumInputLength: 3
      });




      $('#drpMake').on('select2:open', function (e) {




        var html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="60%"><b>Make</b></td> <td width="20%"><b>UOMName</b></td>  <td width="20%"><b>Price</b></td> </tr > </tbody> </table>';

        var res = $('.select2-search');

        var text = res[0].innerText;

        if (text == "")
          $('.select2-search').append(html);





      });

      var that = this;
      $('#drpMake').on('select2:select', function (e) {




        if (typeof ((<any>e).params.data.id) != 'undefined') {
          debugger;
          // that.MakeValueChange.emit((<any>e).params.data);
          // that.UOMID = (<any>e).params.data.id;
          that._SelecedRow.UOM = (<any>e).params.data.UOMName;
          //that._SelecedRow.UOMId=(<any>e).params.data.UOMId;
          that._SelecedRow.Rate = (<any>e).params.data.Price;
          that._SelecedRow.Make = (<any>e).params.data.text;
          that._SelecedRow.MakeId = (<any>e).params.data.id;


          $("#txtLastSoldPrice").val((<any>e).params.data.LastSoldPrice);
          $("#txtLastPurchasePrice").val((<any>e).params.data.LastPurchasePrice);
          debugger;

          $("#UOM").val((<any>e).params.data.UOMName);
          $("#Price").val((<any>e).params.data.Price);
          that.GstTaxbyHSNAndState();
        // that.StockDetByIds((<any>e).params.data.ItemId, (<any>e).params.data.MakeId, '', '', '');
          //that.PartsValueChange.emit((<any>e).params.data);
        }


      });


      $("#drpMake").on("select2:unselecting", function (e) {

        that._SelecedRow.UOM = '';
        //that._SelecedRow.UOMId=(<any>e).params.data.UOMId;
        that._SelecedRow.Rate = 0;
        that._SelecedRow.Make = '';
        that._SelecedRow.MakeId = 0;
        debugger;

        $("#UOM").val('');
        $("#Price").val(0);
        that.SelectedItemCalc();
        //that.ItemId =0;
        //that.MakeValueChange.emit((<any>e).params.data);

      });

    }
  //SelectedItemId=0;
  //SelectedUOMID=0;
  //SelectedDescription="";
  //SelectedHSN="";
  PreapareMakeParam(): string {
    var xmlParaminput = ""
    // $("#Description").val(this.SelectedDescription);


    debugger;

    xmlParaminput = '<NewDataSet><Table1>'

      + '<ItemID>' + this._SelecedRow.ItemId + '</ItemID>'
      + '<Type>' + this._TransactionType + '</Type>'
      + '<PartyId>' + this._PartyId + '</PartyId>'
      + '<UOMID>' + this._SelecedRow.UOMId + '</UOMID>'

      + '</Table1></NewDataSet>';

    return xmlParaminput;
  }
  dollarPriceChange(target)
  {
    debugger;
    this._SelecedRow.dollarprice = (+target.value);
  }
  SelectedItemCalc() {
    debugger;
    if(this.Invoicetype11=="Import")
    {
debugger;
  

      this._SelecedRow.Rate = (+ $("#Price").val());
  //    this._SelecedRow.Gross = (+this._SelecedRow.Qty) * (+this._SelecedRow.Rate);
      var perUnit=((+this.Rate1)/(+this.Qty1))
      $("#AssValuePerUnit1").val(perUnit.toFixed(2));

     
      //$("#Price").val(
      //this._SelecedRow.Gross=((+ this._SelecedRow.Quantity)*this.SelectedPrice);
      var TotalTax = 0;
      var GrossA = (+this._SelecedRow.Gross);
  
  
      if ((+ this._SelecedRow.DiscountPercentage) > 0) {
        this._SelecedRow.DiscountAmount = (((+this.Rate1) * (+this._SelecedRow.DiscountPercentage)) / 100);
      }
      var AfterDiscount = ((+this.Rate1) - (+ this._SelecedRow.DiscountAmount));
      if((+ this._SelecedRow.DiscountAmount)>0)
      {
        this.Rate1=AfterDiscount;
      }
      var cust1=  (((+this.Rate1)*(+this.CUSTMTAX))/100);
      var sw1= (((+cust1)*(+this.SWTAX))/100);
      $("#bcd").val(cust1.toFixed(2));
      $("#sws").val(sw1.toFixed(2));
  this._SelecedRow.bcd=cust1;
  this._SelecedRow.sws=sw1;
      for (let i = 0; i < this.lstSelectedTaxdet.length; i++) {
        if (this.lstSelectedTaxdet[i].TaxType == "CGST") {

          this._SelecedRow.CGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          var TempTax=((+this.Rate1)+cust1+sw1);
          this._SelecedRow.CGSTAmount = ((TempTax * (+this._SelecedRow.CGST)) / 100);


          // this._SelecedRow.CGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          // this._SelecedRow.CGSTAmount = (((+this.lstSelectedTaxdet[i].TaxPercentage2) * AfterDiscount) / 100);
  
          TotalTax = TotalTax + ((+ this._SelecedRow.CGSTAmount)+cust1+sw1);
          try {
  
            this._SelecedRow.CGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
            //this._SelecedRow.CGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
          } catch (e) {
  
          }
  
        }
  
        if (this.lstSelectedTaxdet[i].TaxType == "SGST") {

          this._SelecedRow.SGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          var TempTax=((+this.Rate1)+cust1+sw1);
          this._SelecedRow.SGSTAmount = ((TempTax * (+this._SelecedRow.SGST)) / 100);

          // this._SelecedRow.SGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          // this._SelecedRow.SGSTAmount = (((+this.lstSelectedTaxdet[i].TaxPercentage2) * AfterDiscount) / 100);
          TotalTax = TotalTax + ((+ this._SelecedRow.SGSTAmount)+cust1+sw1);
  
          try {
  
            this._SelecedRow.SGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
            //this._SelecedRow.SGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
          } catch (e) {
  
          }
  
        }
  
        if (this.lstSelectedTaxdet[i].TaxType == "IGST") {
          debugger;
          this._SelecedRow.IGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          var TempTax=((+this.Rate1)+cust1+sw1);
          this._SelecedRow.IGSTAmount = ((TempTax * (+this._SelecedRow.IGST)) / 100).toFixed(2);
          TotalTax = TotalTax + ((+ this._SelecedRow.IGSTAmount)+cust1+sw1);
          try {
            this._SelecedRow.IGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
            //this._SelecedRow.IGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
          } catch (e) {
  
          }
        }
  
  
      }
      var PerItemTax = TotalTax / (+this._SelecedRow.Qty);
  
      $("#PriceInclusiveTax").val((+this._SelecedRow.Rate) + (+PerItemTax));
      this._SelecedRow.TotalTax = (TotalTax).toFixed(2);
  
      this._SelecedRow.NetTotal = ((AfterDiscount + TotalTax).toFixed(2));
  
      //$("#DiscountPercentage").val(val.DiscountPercentage);
      $("#DiscountAmount").val(this._SelecedRow.DiscountAmount);
      $("#CGST").val(this._SelecedRow.CGST);
      $("#CGSTAmount").val(this._SelecedRow.CGSTAmount);
      $("#SGST").val(this._SelecedRow.SGST);
      $("#SGSTAmount").val(this._SelecedRow.SGSTAmount);
      $("#IGST").val(this._SelecedRow.IGST);
      $("#IGSTAmount").val(this._SelecedRow.IGSTAmount);
      $("#TotalTax").val(this._SelecedRow.TotalTax);
      $("#NetTotal").val(this._SelecedRow.NetTotal);
      $("#dollarPrice").val(this._SelecedRow.dollarprice);
      $("#Price").val(this.Rate1);
      
      
    }
    else{
      this._SelecedRow.Rate = (+ $("#Price").val());
      this._SelecedRow.Gross = (+this._SelecedRow.Qty) * (+this._SelecedRow.Rate);
  
      //$("#Price").val(
      //this._SelecedRow.Gross=((+ this._SelecedRow.Quantity)*this.SelectedPrice);
      var TotalTax = 0;
      var GrossA = (+this._SelecedRow.Gross);
  
  
  
  
  
      if ((+ this._SelecedRow.DiscountPercentage) > 0) {
        this._SelecedRow.DiscountAmount = ((GrossA * (+ this._SelecedRow.DiscountPercentage)) / 100);
      }
      var AfterDiscount = ((GrossA) - (+ this._SelecedRow.DiscountAmount));
  
  
  
      for (let i = 0; i < this.lstSelectedTaxdet.length; i++) {
        if (this.lstSelectedTaxdet[i].TaxType == "CGST") {
          this._SelecedRow.CGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          this._SelecedRow.CGSTAmount = (((+this.lstSelectedTaxdet[i].TaxPercentage2) * AfterDiscount) / 100);
  
          TotalTax = TotalTax + ((+ this._SelecedRow.CGSTAmount));
          try {
  
            this._SelecedRow.CGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
            //this._SelecedRow.CGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
          } catch (e) {
  
          }
  
        }
  
        if (this.lstSelectedTaxdet[i].TaxType == "SGST") {
          this._SelecedRow.SGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          this._SelecedRow.SGSTAmount = (((+this.lstSelectedTaxdet[i].TaxPercentage2) * AfterDiscount) / 100);
          TotalTax = TotalTax + ((+ this._SelecedRow.SGSTAmount));
  
          try {
  
            this._SelecedRow.SGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
            //this._SelecedRow.SGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
          } catch (e) {
  
          }
  
        }
  
        if (this.lstSelectedTaxdet[i].TaxType == "IGST") {
          this._SelecedRow.IGST = (this.lstSelectedTaxdet[i].TaxPercentage2);
          this._SelecedRow.IGSTAmount = (((+this.lstSelectedTaxdet[i].TaxPercentage2) * AfterDiscount) / 100);
          TotalTax = TotalTax + ((+ this._SelecedRow.IGSTAmount));
  
          try {
  
            this._SelecedRow.IGSTAccountId = (this.lstSelectedTaxdet[i].PostAccountId);
            //this._SelecedRow.IGSTAccountName=(this.lstSelectedTaxdet[i].AccountName);
          } catch (e) {
  
          }
        }
  
  
      }
      var PerItemTax = TotalTax / (+this._SelecedRow.Qty);
  
      $("#PriceInclusiveTax").val((+this._SelecedRow.Rate) + (+PerItemTax));
      this._SelecedRow.TotalTax = (TotalTax);
  
      this._SelecedRow.NetTotal = ((AfterDiscount + TotalTax).toFixed(2));
  
      //$("#DiscountPercentage").val(val.DiscountPercentage);
      $("#DiscountAmount").val(this._SelecedRow.DiscountAmount);
      $("#CGST").val(this._SelecedRow.CGST);
      $("#CGSTAmount").val(this._SelecedRow.CGSTAmount);
      $("#SGST").val(this._SelecedRow.SGST);
      $("#SGSTAmount").val(this._SelecedRow.SGSTAmount);
      $("#IGST").val(this._SelecedRow.IGST);
      $("#IGSTAmount").val(this._SelecedRow.IGSTAmount);
      $("#TotalTax").val(this._SelecedRow.TotalTax);
      $("#NetTotal").val(this._SelecedRow.NetTotal);
    }
   
  }
  FilterType:string="";
  lstDbResult:any=[];
  lstItems:any=[];
  ViewTaxes()
{
  this.FilterType="All";
  debugger;
  this.APICall.DBCalling("ViewItems",this._SelecedRow.ItemId,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
    (res:Response) => {
      debugger;
      this.lstDbResult=JSON.parse(res['Message']);
    
      
      this.lstItems=[];
      if(this.lstDbResult.Table.length>0)
      {
        debugger;
        this.CUSTMTAX=this.lstDbResult.Table[0].CUSTMTAX;
        this.SWTAX=this.lstDbResult.Table[0].SWTAX;
        if((+this.CUSTMTAX)==0 && (+this.SWTAX==0) && this.Invoicetype11 =="Import")
        {
          (window as any).swal({
            icon: 'warning',
            title: 'Invalid Taxes',
            text: 'BCD and SWS Taxes are should be Map in this Item.!',
            confirmButtonText: 'Dismiss',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-warning'
           });
        }
        this.lstItems=this.lstDbResult.Table;
  

        
        
      }
    });
}
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
        delay: 250, minimumInputLength: 4,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }

            return JSON.stringify({ "Operation": 'ViewParts', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




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
      , templateResult: this.format
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });




    $('#drpParts').on('select2:open', function (e) {




      var html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Part No</b></td> <td width="50%"><b>Description</b></td> </tr > </tbody> </table>';

      var res = $('.select2-search');

      var text = res[0].innerText;

      if (text == "")
        $('.select2-search').append(html);





    });

    var that = this;
    $('#drpParts').on('select2:select', function (e) {




      if (typeof ((<any>e).params.data.id) != 'undefined') {


        // that.SelectedItemId=(<any>e).params.data.ItemId
        //that.SelectedUOMID=  (that._TransactionType=='Sales'?(<any>e).params.data.saleuom:(<any>e).params.data.puruom);

        //that.SelectedHSN=(<any>e).params.data.hsncode
        debugger;
        that._SelecedRow.ItemId = (<any>e).params.data.ItemId;
        that._SelecedRow.UOMId = (that._TransactionType == 'Sales' ? (<any>e).params.data.saleuom : (<any>e).params.data.puruom);
        that._SelecedRow.HSN = (<any>e).params.data.hsncode;

        that._SelecedRow.Partno = (<any>e).params.data.partno;
        that._SelecedRow.Description = (<any>e).params.data.description;
        $("#Description").val((<any>e).params.data.description);
        that.ViewTaxes();

        // that.ItemId = (<any>e).params.data.id;
        debugger;
        that.LoadMakes((<any>e).params.data);

        //that.PartsValueChange.emit((<any>e).params.data);
      }


    });


    $("#drpParts").on("select2:unselecting", function (e) {

      //that.ItemValueChange.emit((<any>e).params.data);
      //  that.ItemId =0;

      that._SelecedRow.ItemId = 0;
      that._SelecedRow.UOMId = 0;
      that._SelecedRow.HSN = '';

      that._SelecedRow.Partno = '';
      that._SelecedRow.Description = '';


      that._SelecedRow.UOM = '';
      //that._SelecedRow.UOMId=(<any>e).params.data.UOMId;
      that._SelecedRow.Rate = 0;
      that._SelecedRow.Make = '';
      that._SelecedRow.MakeId = 0;
      debugger;


      that.ValueClear();
    });

  }



}