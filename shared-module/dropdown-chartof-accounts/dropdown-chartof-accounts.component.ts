import { Component, OnInit, Input, forwardRef ,Directive, ElementRef, Renderer2, HostBinding, Output, EventEmitter} from '@angular/core';
import { APICallingService } from 'src/app/apicalling.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as $ from 'jquery';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";
@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownChartofAccountsComponent),
      multi: true
    }
  ],
  selector: 'DropdownAccounts',
  templateUrl: './dropdown-chartof-accounts.component.html',
  styleUrls: ['./dropdown-chartof-accounts.component.css']
})
export class DropdownChartofAccountsComponent implements ControlValueAccessor {

  @HostBinding('attr.id')
 
  public  _AccountGroup = '';
  @Input()
  set  AccountGroup(val)
{

debugger;
  this._AccountGroup=val;
  this.onChange(val);
  


}





  @Input()
  set  COAId(val)
{

debugger;
  this._COAId=val;
  this.onChange(val);
  if(this._COAId==0)

  {
  
  
    $("#drpAccount").val('').trigger('change');
  }
  


}
 private  _COAId = 0;

  @Input()
  set  AccountName(val)
{

debugger;
  this._AccountName=val;

 
  this.onChange(val);

  var AccountSelection = new Option(this._AccountName,this._COAId.toString(), true, true);
  //AccountSelection.id=this._COAId.toString();
  (<any> $('#drpAccount')).append(AccountSelection).trigger('change');
  
  
  // (<any> $('#drpAccount')).trigger({
  //    type: 'select2:select',
  //   params: {
  //        data: AccountSelection
  //    }
  // });
}

private _AccountName;





// ngOnChanges(changes) {
//   debugger;
//   if (changes.COAId ) {
//     if(changes.COAId.currentValue!=""  && typeof(changes.COAId.currentValue)!='undefined')
  
//     {
//       this.COAId=changes.COAId;
    
//     }
//   }


//   if (changes.AccountName ) {
//     debugger;

//     if(changes.AccountName.currentValue!="")
  
//     {
//     var AccountSelection = new Option(changes.AccountName.currentValue,this.COAId.toString(), true, true);
// (<any> $('#drpAccount')).append(AccountSelection).trigger('change');


// (<any> $('#drpAccount')).trigger({
//    type: 'select2:select',
//   params: {
//        data: AccountSelection
//    }
// });
//     }
//   }
// }
 onChange = (_: any) => {};
 onTouched = () => {}; 

//propagateChange = (_: any) => {};

writeValue(obj: any): void {
  if (obj !== undefined  && obj !="") {

    debugger;
    this.COAId = obj;
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

get COAId() {
  return this._COAId;
}




 

@Output()
public AccountValueChange= new EventEmitter();



  constructor(private APICall:APICallingService) { }

  ngOnInit() {
  }
  HeaderAppend=false;


  format (opt) {
  
    if (!opt.id) {
        return opt.text;
    } 
  
 


        var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="33%">'+opt.AccountCode+'</td><td width="33%">'+opt.Name+'</td><td width="34%">'+opt.AccountGroupName+'</td></tr></tbody></table>');
        return $opt;
   
  };
  LoadChartOfAccounts()
  {
var that=this;
    
    (<any> $("#drpAccount")).select2({
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
     return JSON.stringify( {"Operation": 'ViewChartOfAccounts', "Params":sstring,"Xml2":'All' ,"Xml3":(typeof(that._AccountGroup)=='undefined'?'':that._AccountGroup),"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        debugger;
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.COAId; 
       obj.text = obj.Name; 
     
      
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
     

//       debugger;
//       var AccountSelection = new Option(this.AccountName,this.COAId.toString(), true, true);
// (<any> $('#drpAccount')).append(AccountSelection).trigger('change');


// (<any> $('#drpAccount')).trigger({
//    type: 'select2:select',
//   params: {
//        data: AccountSelection
//    }
// });


$('#drpAccount').on('select2:open', function (e) {
  if (!that.HeaderAppend) {
     var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="33%"><b>Code</b></td> <td width="33%"><b>Name</b></td> <td width="34%"><b>Group</b></td> </tr > </tbody> </table>';
      $('.select2-search').append(html);
      //$('.select2-results').addClass('stock');
      that.HeaderAppend = true;
  }
});

     var that =this;
     $('#drpAccount').on('select2:select', function (e) {
     
     debugger;

    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      debugger;
   
     that.COAId = (<any>e).params.data.id;
     that.AccountValueChange.emit((<any>e).params.data);
   }
   
    
     });
     
   
     $("#drpAccount").on("select2:unselecting", function(e) {
      debugger;
     
      that._COAId =0;
   
     
     });

  }

ngAfterViewInit()
{

this.LoadChartOfAccounts();

}

}
