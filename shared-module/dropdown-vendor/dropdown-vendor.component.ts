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
      useExisting: forwardRef(() => DropdownVendorComponent),
      multi: true
    }
  ],
  selector: 'DropdownVendor',
  templateUrl: './dropdown-vendor.component.html',
  styleUrls: ['./dropdown-vendor.component.css']
})
export class DropdownVendorComponent implements OnInit {
  @HostBinding('attr.id')
  
  
  @Input()
  set VendorId(val)
 {
 
 debugger;
  this._VendorId=val;
  this.onChange(val);
 if(this._VendorId==0)
 
 {
   $("#drpVendor").val('').trigger('change');
 }
 
 }
 private  _VendorId = 0;
 
 
 
 
   @Input()
   set  Vendorname(val)
 {
 
 debugger;
   this._Vendorname=val;
 
  
  // this.onChange(val);
 
   var VendorSelection = new Option(this._Vendorname,this._VendorId.toString(), true, true);
 // /  VendorSelection.id=this._VendorId.toString();
   (<any> $('#drpVendor')).append(VendorSelection).trigger('change');
   
   
   // (<any> $('#drpVendor')).trigger({
   //    type: 'select2:select',
   //   params: {
   //        data: VendorSelection
   //    }
   // });
 }
 
 private _Vendorname;
 
 
 
 
  onChange = (_: any) => {};
  onTouched = () => {}; 
 
 //propagateChange = (_: any) => {};
 
 writeValue(obj: any): void {
   if (obj !== undefined && obj !="") {
 
     debugger;
     this.VendorId = obj;
   }
 }
 registerOnChange(fn: any): void {
   this.onChange = fn;
 }
 
 registerOnTouched(fn: any): void {
   this.onTouched= fn; 
 }
 setDisabledVendor?(isDisabled: boolean): void {
   //this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);
 
 }
 
 
 
 get VendorId() {
   return this._VendorId;
 }
 
 @Output()
 public VendorValueChange= new EventEmitter();
 
 
 
 
   constructor(private APICall:APICallingService) { }
 
   ngOnInit() {
   }
  
 
 
   format (opt) {
   
     if (!opt.id) {
         return opt.text;
     } 
   
  
 
 
         //var $opt = $('<main class="main-content" style="margin-left: 0px; padding: 0px;min-height:0vh"> <div class="container"> <div> <div class="row row-sm"> <div class="col-xl-12 col-lg-6 col-lg-12 col-sm-12 "> <div class="card"> <div class="card-body" style="margin-bottom: -21px;">  <img src="./assets/media/image/Vendor.jpg" style="border-radius: 50%;"> <span style="float: right;"><h4 class="m-b-15">'+opt.Vendorname+'</h4> <h6 class="text-Capitalize font-size-11 m-b-5">Contact No: '+opt.Contactno+'</h6> <h6 class="text-Capitalize font-size-11 m-b-5">GST No:'+opt.gstno+'</h6> <h6 class="text-Capitalize font-size-11 m-b-5">Outstanding : '+opt.Outstantndings+'</h6> <div class="mb-4"> <h6 style="margin-bottom: 0px;">Credict Limit</h6> <div class="d-flex align-items-center"> <div class="progress flex-grow-1" style="height: 5px"> <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" class="progress-bar bg-google" role="progressbar" style="width:'+opt.OutstantndingPer+'%"></div> </div> <span class="small m-l-10">'+opt.creditlimit+'</span> </div> </div> </span>  </div> </div> </div> </div> </div> </div> </main>');
       
         var $opt = $('<main class="main-content" style="margin-left: 0px; padding: 0px;min-height:0vh"> <div class=""> <div class="card"> <div class="" style="margin-bottom: -21px;">  <div class="col-md-2" style=" float: left; display: block; "> <img src="./assets/media/image/customer.jpg" style="border-radius: 50%;width: 50px;float: left;margin-left: 0px;"> </div> <div class="col-md-10" style=" text-align: center; vertical-align: middle !important; display: block; position: unset; "> <h5 class="m-b-15" style="color: black;vertical-align: middle;margin-top: 16px;margin-bottom: auto;position: unset;display: block;">'+opt.Vendorname+'</h5> </div> <hr> <div class="col-md-12"> <h6 class="text-Capitalize font-size-11 m-b-5" style=" color: black; ">Contact No: '+opt.Contactno+'</h6> <h6 class="text-Capitalize font-size-11 m-b-5" style=" color: black; ">GST No:'+opt.gstno+'</h6> <h6 class="text-Capitalize font-size-11 m-b-5" style=" color: black; ">Outstanding : '+opt.Outstantndings+'</h6> <div class="mb-4" style=" color: black; "> <h6 style="margin-bottom: 0px;">Credict Limit</h6> <div class="d-flex align-items-center"> <div class="progress flex-grow-1" style="height: 5px"> <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" class="progress-bar bg-google" role="progressbar" style="width:'+opt.OutstantndingPer+'%"></div> </div> <span class="small m-l-10">'+opt.creditlimit+'</span> </div> </div> </div>   </div> </div> </div> </main>');
        
 
 //      ------------------------
 
 //       <main class="main-content" style="margin-left: 0px; padding: 0px;min-height:0vh">
 //       <div class="container"> <div> <div class="row"> <div class="col-md-12"> <div class="card"> <div class="" style="margin-bottom: -21px;">  <div class="col-md-12" style="">
 // <img src="./assets/media/image/Vendor.jpg" style="border-radius: 50%;width: 50px;float: left;margin-left: 0px;">
 
 // <span><h5 class="" style="color: black;">'+opt.Vendorname+'</h5> </span>
 // </div>
 
 
 
 
 // <hr>
 
 // <div class="col-md-12" style="margin-top:20px">
 
 // <h6 class="text-Capitalize font-size-11 m-b-5" style="
 //    color: black;">Contact No:'+opt.Contactno+' </h6> <h6 class="text-Capitalize font-size-11 m-b-5" style="
 //    color: black;
 // ">GST No:'+opt.gstno+'</h6> <h6 class="text-Capitalize font-size-11 m-b-5" style="
 //    color: black;
 // ">Outstanding : '+opt.Outstantndings+'</h6> <div class="mb-4" style="
 //    color: black;
 // "> <h6 style="margin-bottom: 0px;">Credict Limit</h6> <div class="d-flex align-items-center"> <div class="progress flex-grow-1" style="height: 5px"> <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" class="progress-bar bg-google" role="progressbar" style="width:'+opt.OutstantndingPer+'%"></div> </div> <span class="small m-l-10">'+opt.creditlimit+'</span> </div> </div>
 
 // </div>   </div> </div> </div> </div> </div> </div>
 // </main>
       
       return $opt;
    
   };
 
   that=this;
   LoadVendor()
   {
     debugger;
 var that=this;
     
 
 
     (<any> $('#drpVendor')).select2({
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
      return JSON.stringify( {"Operation": 'ViewVendorsShorDet',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
          
         }
         ,
         contentType: 'application/json; charset=utf-8',
         processResults: function (response) {
          
      
           debugger;
      
      var ResultData=(JSON.parse(response['Message'])).Table;
      
            var  data = $.map(ResultData, function (obj) {
            
             obj.id = obj.VendorId; 
             obj.text = obj.Vendorname; 
      
       
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
      
      
 
 
 $('#drpVendor').on('select2:open', function (e) {
 
   debugger;
   
    
     //  var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Code</b></td> <td width="50%"><b>Name</b></td> </tr > </tbody> </table>';
     
     // var res= $('.select2-search');
 
     // var text=res[0].innerText;
 
     // if(text=="")
     //  $('.select2-search').append(html);
       
       
      
       
 
 });
 
     // var that =this;
      $('#drpVendor').on('select2:select', function (e) {
      
      debugger;
 
     
      if(typeof((<any>e).params.data.id)!='undefined')
      {
       debugger;
    
      that.VendorId = (<any>e).params.data.id;
      that.VendorValueChange.emit((<any>e).params.data);
    }
    
     
      });
      
    
      $('#drpVendor').on("select2:unselecting", function(e) {
       debugger;
      
       that.VendorId =0;
    
      
      });
 
   }
 
 ngAfterViewInit()
 {
   //(<any> $.fn).modal.Constructor.prototype.enforceFocus = function() {};
  // (<any> $.fn).modal.Constructor.prototype._enforceFocus = function() {};
 //   debugger;
 // if(this._ParentControl!="" && this._ParentControl!=null && typeof(this._ParentControl)!='undefined')
 // {
 //   (<any> $('#drpVendor')).select2({
 //     dropdownParent: $('#'+this._ParentControl+'')
 // });
 // }
 this.LoadVendor();
 
 }
 
 }
 