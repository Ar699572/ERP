import { Component, OnInit, Input, forwardRef ,Directive, ElementRef, Renderer2, HostBinding, EventEmitter, Output} from '@angular/core';
import { APICallingService } from 'src/app/apicalling.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownStateComponent),
      multi: true
    }
  ],
  selector: 'DropdownState',
  templateUrl: './dropdown-state.component.html',
  styleUrls: ['./dropdown-state.component.css']
})
export class DropdownStateComponent  implements ControlValueAccessor {
  @HostBinding('attr.id')
  
  @Input()
  set StateId(val)
{

debugger;
  this._StateId=val;
  this.onChange(val);
if(this._StateId==0)

{


  $("#drpState").val('').trigger('change');
}

}
 private  _StateId = 0;


  @Input()
  set  CountryId(val)
{

debugger;
  this._CountryId=val;
  
  $("#drpState").val('').trigger('change');
  
  //this.onChange(val);

 
}
 private  _CountryId = 0;

  @Input()
  set  StateName(val)
{

debugger;
  this._StateName=val;

 
 // this.onChange(val);
debugger;
  var StateSelection = new Option(this._StateName,this._StateId.toString(), true, true);
  //StateSelection.id=this._StateId.toString();




$('#drpState').append(StateSelection).trigger('change');
  
  
  // (<any> $('#drpState')).trigger({
  //    type: 'select2:select',
  //   params: {
  //        data: StateSelection
  //    }
  // });
}

private _StateName;

@Output()
public StateValueChange= new EventEmitter();


 onChange = (_: any) => {};
 onTouched = () => {}; 

//propagateChange = (_: any) => {};

writeValue(obj: any): void {
  if (obj !== undefined  && obj !="") {

    debugger;
    this.StateId = obj;
  }
}
registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched= fn; 
}
setDisabledState?(isDisabled: boolean): void {
  //this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);

}

get CountryId() {
  return this._CountryId;
}


get StateId() {
  return this._StateId;
}


 




  constructor(private APICall:APICallingService) { }

  ngOnInit() {
  }
 


  format (opt) {
  
    if (!opt.id) {
        return opt.text;
    } 
  
 


        var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">'+opt.Statename+'</td><td width="50%">'+opt.Statecode+'</td></tr></tbody></table>');
        return $opt;
   
  };
  LoadStates()
  {
    debugger;
var that=this;
    


    (<any> $("#drpState")).select2({
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
     return JSON.stringify( {"Operation": 'ViewStateByCountry', "Params":sstring,"Xml2":'All' ,"Xml3":that.CountryId,"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
          debugger;
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           if(obj.country.toString()==that.CountryId)
           {
       obj.id = obj.StateId; 
       obj.text = obj.Statename; 
     
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
     



$('#drpState').on('select2:open', function (e) {

  debugger;
  
   
     var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Name</b></td> <td width="50%"><b>Gst State Code</b></td> </tr > </tbody> </table>';
    
    var res= $('.select2-search');

    var text=res[0].innerText;

    if(text=="")
     $('.select2-search').append(html);
      
      
     
      

});

     var that =this;
     $('#drpState').on('select2:select', function (e) {
     
     debugger;

    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      debugger;
   
     that.StateId = (<any>e).params.data.id;
     that.StateValueChange.emit((<any>e).params.data);
   }
   
    
     });
     
   
     $("#drpState").on("select2:unselecting", function(e) {
      debugger;
     
      that.StateId =0;
   
     
     });

  }

ngAfterViewInit()
{

this.LoadStates();

}

}
