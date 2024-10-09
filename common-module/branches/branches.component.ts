import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { APICallingService } from 'src/app/apicalling.service'; 
import * as AppSettings from '../../../assets/Appsettings/AppSettings';


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  Branches:FormGroup;
  errormsg="";
  showError=false;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService) {
    
    this.Branches=formBuilder.group(
  
      {
    
        Code:new FormControl(''),

    Name:new FormControl(''),
    ContactNo:new FormControl(''),
    PinCode:new FormControl(''),
    SearchString:new FormControl('')
      });
    // this.ImageServerPath= this.APICall.ImagePath;
   }





  //  @Output() messageEvent = new EventEmitter<string>();

  XmlEdit="";
  EditBranches(xml) {
    // this.messageEvent.emit(MakeID)
    debugger;
this.APICall.SetViewData(xml);
    this.router.navigate(['Common/CreateBranches']);
  }

  
//#region "ShortCuts"
@HostListener('window:keydown', ['$event'])


 

keyEvent(event: KeyboardEvent) {
  console.log(event);
  
  if (event.ctrlKey || event.metaKey) {
    
   switch (String.fromCharCode(event.which).toLowerCase()) {
   

       case 'a':
        
         event.preventDefault();
       this.OnAdd();
       
         break;
         

   }
 }
 
}
//#endregion "ShortCuts"
 


OnAdd()
{

  this.router.navigate(['Common/CreateBranches']);
}

   get f() { 
     return this.Branches
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
 
  }

ngAfterViewInit(){

    this.ViewandSearchBranches();
     
    
  }


  lstBranches:any=[];
  lstDbResult:any  = [];
  ViewandSearchBranches()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     
      this.APICall.DBCalling("Branches",sstring,this.FilterType,"","").subscribe(
        (res:Response) => {

          debugger;   
        
          this.lstDbResult= (res);
         this.lstBranches;
          if(this.lstDbResult.tasks.length>0 && this.lstDbResult.tasks[0].length>0 )
          {
            this.lstBranches=this.lstDbResult.tasks[0];
       //    $('#example1 thead th:eq(4)').css('display', 'none');

      
    
  debugger;
            
            if(this.lstSerchableFields.length==0)
            {


          var    stringDbFld=this.lstDbResult.tasks[0][0].SerchableFields
             var parser = new DOMParser();
             var xmlDoc = parser.parseFromString(stringDbFld,"text/xml");
            
            var sizex = xmlDoc.getElementsByTagName("ControlName");
            
            for (var i = 0 ; i < sizex.length ; i++) {
            

          
            this.lstSerchableFields.push(
              

              ( { 
                ControlName:xmlDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue
                
                ,DBField:xmlDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue
                
                })

            );
            }
            }
          }

          $("#loaderParent").hide();
        });
  }


  //#region "getControlValue"
  getControlValue(Control,Type):string
  {
  
   var Value=(Type=="string"?"":"0");
    if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
    {
      Value=Control.value;
    }
  
    return Value;
  }
//#endregion "getControlValue"

  //#region "SearchPanelLogic"


  SearchClick()
  {
    this.ViewandSearchBranches();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  debugger;
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
    var Code = this.getControlValue(this.f.Code,"string");
    var CodeDBField="";
  var Name=this.getControlValue(this.f.Name,"string");
  var NameDBField="";
  var ContactNo =this.getControlValue(this.f.ContactNo,"string");
  var ContactNoDBField="";
  var PinCode =this.getControlValue(this.f.PinCode,"string");
  var PinCodeDBField="";
  
  

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="Code")
    {
      CodeDBField=this.lstSerchableFields[i].DBField;
    }

    if(this.lstSerchableFields[i].ControlName=="Name")
    {
      NameDBField=this.lstSerchableFields[i].DBField;
    }

    
    if(this.lstSerchableFields[i].ControlName=="ContactNo")
    {
      ContactNoDBField=this.lstSerchableFields[i].DBField;
    } 

    if(this.lstSerchableFields[i].ControlName=="PinCode")
    {
      PinCodeDBField =this.lstSerchableFields[i].DBField;
    }

  }
debugger;
      if(this.SerchType=='Like')
      {

        if(Code!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+CodeDBField+" Like'"+Code+"%'"):(CodeDBField+" Like'"+Code+"%'");


        }
        if(Name!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+NameDBField+" Like'"+Name+"%'"):(NameDBField+" Like'"+Name+"%'");
        }
        if(ContactNo!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+ContactNoDBField+" Like'"+ContactNo+"%'"):(ContactNoDBField+" Like'"+ContactNo+"%'");
        }
        if(PinCode!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+PinCodeDBField+" Like'"+PinCode+"%'"):(PinCodeDBField+" Like'"+PinCode+"%'");
        }
        
      }
      else{

        if(Code!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+CodeDBField+" Like'"+Code+"%'"):(CodeDBField+" Like'"+Code+"%'");


        }
       
        if(Name!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+CodeDBField+" ='"+Name+"'"):(CodeDBField+" ='"+Name+"'");
        }
        if(ContactNo!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+ContactNoDBField+" Like'"+ContactNo+"%'"):(ContactNoDBField+" Like'"+ContactNo+"%'");
        } 
        if(PinCode!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+PinCodeDBField+" Like'"+PinCode+"%'"):(PinCodeDBField+" Like'"+PinCode+"%'");
        }
        
      }
    }
      return FldSerchString;
    }
FilterType='All'
GetSearchString():string
{
  debugger;
  var  SearchString="";
  if(this.FilterType!='All')
  {
    SearchString=this.PrepareSerchStringByField();
  }
  else
  {
    SearchString=  this.getControlValue(this.f.SearchString,"string")
  }
  return SearchString;
}
FilterTypeChange(event)
  {
    if(AppSettings.ExicuteDebugger)
    {
    debugger;
    }
  
    if(this.SerchType=='Like' && event.target.checked==true)
     {
    this.FilterType=(event.target.checked==true?'All':'Field');
     }else
     {
       
      event.target.checked=false;
      this.FilterType='Field';
    
     }
  }

  SerchType='Like'
  SerchTypeChange(ChangedValue)
  {
    if(AppSettings.ExicuteDebugger)
    {
    debugger;
    }
  

    if(ChangedValue==false)
    {
      this.SerchType='Equal'
      if(this.FilterType=='All')
      $('#customSwitch').trigger('click');
     
    }else{
      this.SerchType='Like'
    }
  }

  //#endregion "SearchPanelLogic"
  
}
