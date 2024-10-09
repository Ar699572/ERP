import { Component, OnInit, Input, forwardRef ,Directive, ElementRef, Renderer2, HostBinding, Output, EventEmitter} from '@angular/core';
import { APICallingService } from 'src/app/apicalling.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddProductComponent),
      multi: true
    }
  ],
  selector: 'add-part',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements ControlValueAccessor {

  constructor(private APICall:APICallingService) { }



@Input()
set  TaxType(val)
{
  debugger;

this._TaxType=val;




}




@Input()
set  UOMId(val)
{
  debugger;

this.SelectedUOMID=val;




}

private  _TaxType ='Intra State';

  @Input()
  set  TransactionType(val)
{

debugger;
  this._TransactionType=val;
  
 

 
}
 private  _TransactionType ='';

  ngOnInit() {
  }

  onChange = (_: any) => {};
  onTouched = () => {}; 
 
 //propagateChange = (_: any) => {};
 //ItemId;
 //UOMID;
 writeValue(obj: any): void {
   if (obj !== undefined  && obj !="") {
 
     
    // this.ItemId = obj;
   }
 }
 registerOnChange(fn: any): void {
   this.onChange = fn;
 }
 
 registerOnTouched(fn: any): void {
   this.onTouched= fn; 
 }



 @Output()
 public ItemValueChange= new EventEmitter();
 @Output()
 public MakeValueChange= new EventEmitter();

 @Output()
 public PriceValueChange= new EventEmitter();


 PriceChange(target)
 {
  this.PriceValueChange.emit(target);

 }
 InclusiveTaxPriceChange(target)
 {
 // this.PriceValueChange.emit(target);

 }

 private _ItemDet:any= {};
 //private _PartNo= '';
 private _Description= '';
 private _MakeDet:any= {};
 //private _MakeName= '';
 private _UOMName= '';
 private _Price= 0;
 public  _ShowStockSelection=false;
//  private _Reset=false;

//  @Input()
//  set  Reset(val)
// {
//   debugger
//  this._Reset=val;
//  if(this._Reset)
//   {
//     this.ResetValues();
//   }
//  this.onChange(val);
 
// }
ResetValues()
{
 
  (<any> $('#drpParts')).val(null).trigger('change');
  (<any> $('#drpMake')).val(null).trigger('change');
  $("#UOM").val('');
$("#Price").val(0);
$("#Description").val('');

}

 @Input()
 set  ItemDet(val)
{

  debugger;
 this._ItemDet=val;
 this.onChange(val);

 var ItemSelection = new Option(val.PartNo,val.ItemId.toString(), true, true);
  
 (<any> $('#drpParts')).append(ItemSelection).trigger('change');
 this.SelectedItemId=val.ItemId;
 
 
}


// @Input()
// set  PartNo(val)
// {
// this._PartNo=val;
// this.onChange(val);

// }


@Input()
set  Description(val)
{
this._Description=val;
this.onChange(val);
$("#Description").val(val);
}


@Input()
set  MakeDet(val)
{
this._MakeDet=val;
this.onChange(val);
var MakeSelection = new Option(val.MakeName,val.MakeId.toString(), true, true);
  
  (<any> $('#drpMake')).append(MakeSelection).trigger('change');
}


// @Input()
// set  MakeName(val)
// {
// this._MakeName=val;
// this.onChange(val);

// }


@Input()
set  UOMName(val)
{
this._UOMName=val;
this.onChange(val);
$("#UOM").val(val);

}


@Input()
set  Price(val)
{
  debugger;
this._Price=val;
this.onChange(val);
$("#Price").val(val);
}


@Input()
set  ShowStockSelection(val)
{
  debugger;
this._ShowStockSelection=val;
this.onChange(val);

}








ngAfterViewInit()
{


  this.LoadParts();
//  $("#drpMake").val('').trigger('change');
(<any> $("#drpMake")).select2();





  
//$("#UOM").val(this._UOMName);
//$("#Price").val(this._Price);

}



 format (opt) {
  
  if (!opt.id) {
      return opt.text;
  } 




      var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">'+opt.partno+'</td><td width="50%">'+opt.description+'</td></tr></tbody></table>');
      return $opt;
 
};



formatMake (opt) {
  
  if (!opt.id) {
      return opt.text;
  } 




      var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="60%">'+opt.make+'</td><td width="20%">'+opt.UOMName+'</td><td width="20%">'+opt.Price+'</td></tr></tbody></table>');
      return $opt;
 
};
chkStockSelection=true;

StockSelection(target)
{

this.chkStockSelection=target.checked;
}


lstStockInfo:any=[];
StockDetByIds(ItemId,MakeId,LocationId,BinId)
{

  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
  $("#loaderParent").show();


  this.APICall.DBCalling("StockOnHandByPartNoAndMake",ItemId,LocationId,BinId,MakeId).subscribe(
    (res:Response) => {
      
      this.lstStockInfo=[];
      this.lstStockInfo=JSON.parse(res['Message']);
    
      
     
      if(this.lstStockInfo.Table.length>0)
      {
        this.lstStockInfo=this.lstStockInfo.Table;
      }
      else{
        this.lstStockInfo=[];
      }
      $("#loaderParent").hide();
    });

}
SelectedItemId=0;
SelectedUOMID=0;
PreapareMakeParam():string
{
  var  xmlParaminput=""
  $("#Description").val(this._Description);
  $("#UOM").val('');
  $("#Price").val('0');
 
 
 
   xmlParaminput='<NewDataSet><Table1>'
    
   +'<ItemID>'+this.SelectedItemId+'</ItemID>'
     +'<Type>'+this._TransactionType+'</Type>'
     +'<UOMID>'+this.SelectedUOMID+'</UOMID>'
    
     +'</Table1></NewDataSet>';
 
return xmlParaminput;
}
LoadMakes(data)
{
  
  var that=this;
  // var ItemId;
 //  var UOM;
 


    
  
  
    (<any> $("#drpMake")).select2({
     allowClear: true,
     placeholder:"Select",
       ajax: { 
        url:this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data: 
        function (params) {
     
     var sstring="";
     if( params.term!=undefined)
     {
       sstring=params.term;
     }
     debugger;
     return JSON.stringify( {"Operation": 'ViewMakByItemId', "Params":sstring,"Xml2":'All' ,"Xml3":that.PreapareMakeParam(),"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
          
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
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
  
  
  
   
     var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="60%"><b>Make</b></td> <td width="20%"><b>UOMName</b></td>  <td width="20%"><b>Price</b></td> </tr > </tbody> </table>';
    
    var res= $('.select2-search');
  
    var text=res[0].innerText;
  
    if(text=="")
     $('.select2-search').append(html);
      
      
     
      
  
  });
  
     var that =this;
     $('#drpMake').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
      that.MakeValueChange.emit((<any>e).params.data);
    // that.UOMID = (<any>e).params.data.id;

     $("#UOM").val((<any>e).params.data.UOMName);
     $("#Price").val((<any>e).params.data.Price);
    that. StockDetByIds((<any>e).params.data.ItemId,(<any>e).params.data.MakeId,'','');
     //that.PartsValueChange.emit((<any>e).params.data);
   }
   
    
     });
     
   
     $("#drpMake").on("select2:unselecting", function(e) {
      
     
     //that.ItemId =0;
     that.MakeValueChange.emit((<any>e).params.data);
     
     });

}
LoadParts()
{
  
var that=this;
  


  (<any> $("#drpParts")).select2({
   allowClear: true,
   placeholder:"Select",
     ajax: { 
      url:this.APICall.DBCallingURL,
      type: "POST",
      dataType: 'json',
      delay: 250,minimumInputLength: 4,
      data: 
      function (params) {
   
   var sstring="";
   if( params.term!=undefined)
   {
     sstring=params.term;
   }
   
   return JSON.stringify( {"Operation": 'ViewParts', "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
       
      }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {
       
   
        
   
   var ResultData=(JSON.parse(response['Message'])).Table;
   
         var  data = $.map(ResultData, function (obj) {
         
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



 
   var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Part No</b></td> <td width="50%"><b>Descripation</b></td> </tr > </tbody> </table>';
  
  var res= $('.select2-search');

  var text=res[0].innerText;

  if(text=="")
   $('.select2-search').append(html);
    
    
   
    

});

   var that =this;
   $('#drpParts').on('select2:select', function (e) {
   
   

  
   if(typeof((<any>e).params.data.id)!='undefined')
   {
    
    that.ItemValueChange.emit((<any>e).params.data);
    that.SelectedItemId=(<any>e).params.data.ItemId
    that.SelectedUOMID=  (that._TransactionType=='Sales'?(<any>e).params.data.saleuom:(<any>e).params.data.puruom);
  // that.ItemId = (<any>e).params.data.id;
   that.LoadMakes((<any>e).params.data );
   //that.PartsValueChange.emit((<any>e).params.data);
 }
 
  
   });
   
 
   $("#drpParts").on("select2:unselecting", function(e) {
    
    that.ItemValueChange.emit((<any>e).params.data);
  //  that.ItemId =0;
 
   
   });

}


}
