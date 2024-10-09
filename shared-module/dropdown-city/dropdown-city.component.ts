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
      useExisting: forwardRef(() => DropdownCityComponent),
      multi: true
    }
  ],
  selector: 'DropdownCity',
  templateUrl: './dropdown-city.component.html',
  styleUrls: ['./dropdown-city.component.css']
})
export class DropdownCityComponent implements ControlValueAccessor {
  @HostBinding('attr.id')
  
  @Input()
  set CityId(val)
{

debugger;
  this._CityId=val;
  this.onChange(val);
if(this._CityId==0)

{


  $("#drpCity").val('').trigger('change');
}

}
 private  _CityId = 0;


  @Input()
  set  StateId(val)
{

debugger;
  this._StateId=val;
  
  $("#drpCity").val('').trigger('change');
  
  //this.onChange(val);

 
}
 private  _StateId = 0;

  @Input()
  set  CityName(val)
{

debugger;
  this._CityName=val;

 
 // this.onChange(val);
debugger;
  var CitySelection = new Option(this._CityName,this._CityId.toString(), true, true);
  //CitySelection.id=this._CityId.toString();
  (<any> $('#drpCity')).append(CitySelection).trigger('change');
  
  
  // (<any> $('#drpCity')).trigger({
  //    type: 'select2:select',
  //   params: {
  //        data: CitySelection
  //    }
  // });
}

private _CityName;




 onChange = (_: any) => {};
 onTouched = () => {}; 

//propagateChange = (_: any) => {};

writeValue(obj: any): void {
  if (obj !== undefined  && obj !="") {

    debugger;
    this.CityId = obj;
  }
}
registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched= fn; 
}
setDisabledCity?(isDisabled: boolean): void {
  //this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);

}

get StateId() {
  return this._StateId;
}


get CityId() {
  return this._CityId;
}


@Output()
public CityValueChange= new EventEmitter();






  constructor(private APICall:APICallingService) { }

  ngOnInit() {
  }
 


  format (opt) {
  
    if (!opt.id) {
        return opt.text;
    } 
  
 


        var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">'+opt.Citycode+'</td><td width="50%">'+opt.Cityname+'</td></tr></tbody></table>');
        return $opt;
   
  };
  LoadCities()
  {
    debugger;
var that=this;
    


    (<any> $("#drpCity")).select2({
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
     return JSON.stringify( {"Operation": 'ViewCityByState', "Params":sstring,"Xml2":'All' ,"Xml3":that.StateId,"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
          debugger;
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           if(obj.country.toString()==that.StateId)
           {
       obj.id = obj.CityId; 
       obj.text = obj.Cityname; 
     
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
  // ,templateSelection: this.format
       //,minimumInputLength: 3
      });
     



$('#drpCity').on('select2:open', function (e) {

  debugger;
  
   
     var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Code</b></td> <td width="50%"><b>Name</b></td> </tr > </tbody> </table>';
    
    var res= $('.select2-search');

    var text=res[0].innerText;

    if(text=="")
     $('.select2-search').append(html);
      
      
     
      

});

     var that =this;
     $('#drpCity').on('select2:select', function (e) {
     
     debugger;

    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      debugger;
   
     that.CityId = (<any>e).params.data.id;
     that.CityValueChange.emit((<any>e).params.data);
   }
   
    
     });
     
   
     $("#drpCity").on("select2:unselecting", function(e) {
      debugger;
     
      that.CityId =0;
   
     
     });

  }

ngAfterViewInit()
{

this.LoadCities();

}

}
