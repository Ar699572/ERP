import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { APICallingService } from 'src/app/apicalling.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownNumberSequenceComponent),
      multi: true
    }
  ],
  selector: 'dropdown-number-sequence',
  templateUrl: './dropdown-number-sequence.component.html',
  styleUrls: ['./dropdown-number-sequence.component.css']
})
export class DropdownNumberSequenceComponent implements OnInit {

  constructor(private APICall:APICallingService) { }

  ngOnInit() {
  }
  @Output()
  public NumberSequenceValueChange= new EventEmitter();
  @Input()
  set FormName(val)
 {
 
 
  this._FormName=val;
  this.onChange(val);
    if(this._FormName!='')
 
 {
   
  this.ViewNumberSequence();
  }
 
 }
 private  _FormName = '';
 
 
 onChange = (_: any) => {};
 
 onTouched = () => {}; 

//propagateChange = (_: any) => {};

writeValue(obj: any): void {
  if (obj !== undefined && obj !="") {

    
    this.SequenceNumberId = obj;
  }
}
private  _SequenceNumberId = 0;
@Input()
set  SequenceNumberId(val)
{


this._SequenceNumberId=val;
this.onChange(val);
}
get SequenceNumberId() {
  return this._SequenceNumberId;
}
registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched= fn; 
}

  ngAfterViewInit()
  {
    
  }
  
  NumberSequenceChange(target)
  {


this._SequenceNumberId=(+target.value)
this.NumberSequenceValueChange.emit(target.value);
  }

  lstNumberSequence:any=[];
  lstDbResult:any=[];
  ViewNumberSequence()
  {
  
   
    
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
    
     
     
      this.APICall.DBCalling("GetNumberSequenceSettingsFromFromName",this._FormName,"","","").subscribe(
        
          (res) => {
       
          
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstNumberSequence=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstNumberSequence=this.lstDbResult.Table;
      
  
            this.NumberSequenceValueChange.emit(this.lstNumberSequence[0].SequenceNumberId);
            this._SequenceNumberId=this.lstNumberSequence[0].SequenceNumberId;
          }
  
          $("#loaderParent").hide();
        });
  }
  
}
