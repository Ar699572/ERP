import { Component, OnInit, Input, forwardRef ,Directive, ElementRef, Renderer2, HostBinding, Output, EventEmitter,Injectable} from '@angular/core';
import { APICallingService } from 'src/app/apicalling.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";
@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownCustomerComponent),
      multi: true
    }
  ],
  selector: 'DropdownCustomer',
  templateUrl: './dropdown-Customer.component.html',
  styleUrls: ['./dropdown-Customer.component.css']
})
export class DropdownCustomerComponent implements ControlValueAccessor {
  @HostBinding('attr.id')
  
  
 @Input()
 set CustomerId(val)
{
 
debugger;
 this._CustomerId=val;
 this.onChange(val);
 
if(this._CustomerId==0)

{
  debugger;
  $("#drpCustomer").val('').trigger('change');
 }
}
private  _CustomerId = 0;




  @Input()
  set  Customername(val)
{

debugger;
  this._Customername=val;


  var CustomerSelection = new Option(this._Customername,this._CustomerId.toString(), true, true);
// /  CustomerSelection.id=this._CustomerId.toString();
  (<any> $('#drpCustomer')).append(CustomerSelection).trigger('change');
  
  
  // (<any> $('#drpCustomer')).trigger({
  //    type: 'select2:select',
  //   params: {
  //        data: CustomerSelection
  //    }
  // });
}

private _Customername;




 onChange = (_: any) => {};
 onTouched = () => {}; 

//propagateChange = (_: any) => {};

writeValue(obj: any): void {
  if (obj !== undefined && obj !="") {

    debugger;
    this.CustomerId = obj;
  }
}
registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched= fn; 
}
setDisabledCustomer?(isDisabled: boolean): void {
  //this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);

}



get CustomerId() {
  return this._CustomerId;
}

@Output()
public CustomerValueChange= new EventEmitter();




  constructor(private APICall:APICallingService) { }

  ngOnInit() {
   
  }
 


  format (opt) {
  
    if (!opt.id) {
        return opt.text;
    } 
  
        var $opt = $('<main class="main-content" style="margin-left: 0px; padding: 0px;min-height:0vh"> <div class=""> <div class="card"> <div class="" style="margin-bottom: -21px;">  <div class="col-md-2" style=" float: left; display: block; "> <img src="./assets/media/image/customer.jpg" style="border-radius: 50%;width: 50px;float: left;margin-left: 0px;"> </div> <div class="col-md-10" style=" text-align: center; vertical-align: middle !important; display: block; position: unset; "> <h5 class="m-b-15" style="color: black;vertical-align: middle;margin-top: 16px;margin-bottom: auto;position: unset;display: block;">'+opt.Customername+'</h5> </div> <hr> <div class="col-md-12"> <h6 class="text-Capitalize font-size-11 m-b-5" style=" color: black; ">Contact No: '+opt.Contactno+'</h6> <h6 class="text-Capitalize font-size-11 m-b-5" style=" color: black; ">GST No:'+opt.gstno+'</h6> <h6 class="text-Capitalize font-size-11 m-b-5" style=" color: black; ">Outstanding : '+opt.Outstantndings+'</h6> <div class="mb-4" style=" color: black; "> <h6 style="margin-bottom: 0px;">Credict Limit</h6> <div class="d-flex align-items-center"> <div class="progress flex-grow-1" style="height: 5px"> <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" class="progress-bar bg-google" role="progressbar" style="width:'+opt.OutstantndingPer+'%"></div> </div> <span class="small m-l-10">'+opt.creditlimit+'</span> </div> </div> </div>   </div> </div> </div> </main>');
      return $opt;  
   
  };

  that=this;
  LoadCountries()
  {
    debugger;
var that=this;
    


    (<any> $('#drpCustomer')).select2({
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
     return JSON.stringify( {"Operation": 'ViewCustomersShorDet',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
          debugger;
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
            obj.id = obj.CustomerId; 
            obj.text = obj.Customername; 
     
      
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
     
     


$('#drpCustomer').on('select2:open', function (e) {

  debugger;
  
  

});

    // var that =this;
     $('#drpCustomer').on('select2:select', function (e) {
     
     debugger;

    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      debugger;
   
     that.CustomerId = (<any>e).params.data.id;
     that.CustomerValueChange.emit((<any>e).params.data);
   }
   
    
     });
     
   
     $('#drpCustomer').on("select2:unselecting", function(e) {
      debugger;
     
      that.CustomerId =0;
   
     
     });

  }

ngAfterViewInit()
{
 
this.LoadCountries();

}

}
