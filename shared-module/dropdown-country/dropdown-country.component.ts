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
      useExisting: forwardRef(() => DropdownCountryComponent),
      multi: true
    }
  ],
  selector: 'DropdownCountry',
  templateUrl: './dropdown-country.component.html',
  styleUrls: ['./dropdown-country.component.css']
})
export class DropdownCountryComponent implements ControlValueAccessor {
  @HostBinding('attr.id')
  
  
 @Input()
 set CountryId(val)
{

debugger;
 this._CountryId=val;
 this.onChange(val);
if(this._CountryId==0)

{
  $("#drpCountry").val('').trigger('change');
}

}
private  _CountryId = 0;




  @Input()
  set  CountryName(val)
{

debugger;
  this._CountryName=val;

 
 // this.onChange(val);

  var CountrySelection = new Option(this._CountryName,this._CountryId.toString(), true, true);
// /  CountrySelection.id=this._CountryId.toString();
  (<any> $('#drpCountry')).append(CountrySelection).trigger('change');
  
  
  // (<any> $('#drpCountry')).trigger({
  //    type: 'select2:select',
  //   params: {
  //        data: CountrySelection
  //    }
  // });
}

private _CountryName;




 onChange = (_: any) => {};
 onTouched = () => {}; 

//propagateChange = (_: any) => {};

writeValue(obj: any): void {
  if (obj !== undefined && obj !="") {

    debugger;
    this.CountryId = obj;
  }
}
registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched= fn; 
}
setDisabledCountry?(isDisabled: boolean): void {
  //this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);

}



get CountryId() {
  return this._CountryId;
}

@Output()
public CountryValueChange= new EventEmitter();




  constructor(private APICall:APICallingService) { }

  ngOnInit() {
  }
 


  format (opt) {
  
    if (!opt.id) {
        return opt.text;
    } 
  
 


        var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">'+opt.countrycode+'</td><td width="50%">'+opt.countryname+'</td></tr></tbody></table>');
        return $opt;
   
  };

  that=this;
  LoadCountries()
  {
    debugger;
var that=this;
    


    (<any> $('#drpCountry')).select2({
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
     return JSON.stringify( {"Operation": 'ViewCountries',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
          debugger;
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
            obj.id = obj.CountryId; 
            obj.text = obj.countryname; 
     
      
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
     
     


$('#drpCountry').on('select2:open', function (e) {

  debugger;
  
   
     var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Code</b></td> <td width="50%"><b>Name</b></td> </tr > </tbody> </table>';
    
    var res= $('.select2-search');

    var text=res[0].innerText;

    if(text=="")
     $('.select2-search').append(html);
      
      
     
      

});

    // var that =this;
     $('#drpCountry').on('select2:select', function (e) {
     
     debugger;

    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      debugger;
   
     that.CountryId = (<any>e).params.data.id;
     that.CountryValueChange.emit((<any>e).params.data);
   }
   
    
     });
     
   
     $('#drpCountry').on("select2:unselecting", function(e) {
      debugger;
     
      that.CountryId =0;
   
     
     });

  }

ngAfterViewInit()
{
  //(<any> $.fn).modal.Constructor.prototype.enforceFocus = function() {};
 // (<any> $.fn).modal.Constructor.prototype._enforceFocus = function() {};
//   debugger;
// if(this._ParentControl!="" && this._ParentControl!=null && typeof(this._ParentControl)!='undefined')
// {
//   (<any> $('#drpCountry')).select2({
//     dropdownParent: $('#'+this._ParentControl+'')
// });
// }
this.LoadCountries();

}

}
