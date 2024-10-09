
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import * as $ from 'jquery';
import { Store } from '@ngrx/store';
import { PageNumberSequenceMapping } from 'src/app/store/PageNumberSequenceMapping';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
@Component({
  selector: 'app-create-page-number-sequence-mapping',
  templateUrl: './create-page-number-sequence-mapping.component.html',
  styleUrls: ['./create-page-number-sequence-mapping.component.css']
})

export class CreatePageNumberSequenceMappingComponent implements OnInit {

  //#region "View constructor"
  CreatePageNumberSequenceMapping:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.CreatePageNumberSequenceMapping=formBuilder.group(
      {
        SearchString:new FormControl(''),
     
        Id:new FormControl(0),
        name:new FormControl(''),
        LineChanges:new FormControl(0),
        FormName:new FormControl('')
      
      });
      //this.ViewandSearchsequencedetails();
      //this.AddSequenceNumber(event);
      this.GetRefSearchDetails();

   }

   Search()
{
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));

  this.APICall.UpdatedSelectedPath('./Common/PageNumberSequenceMapping');
  this.router.navigate(['Common/PageNumberSequenceMapping']);
}

ClearViewData()
{
 
  this.ModifiedDate="";
  this.CreatePageNumberSequenceMapping.patchValue(


    {
   
 
    }
  );
  
  this.lstnumSequence=null;
  this.lstPageSequence=null;
  this.f.LineChanges.setValue(0);
//this.lstnumSequence[i].SequenceSettingsId=Id;
//this.lstPageSequence=null;
//this.f.LineChanges.setValue(0);


this.StorePageNumberSequenceMapping=new PageNumberSequenceMapping;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePageNumberSequenceMapping.TabId=ActivatedRoute;
this.store.dispatch(new TabStore.AddTab(this.StorePageNumberSequenceMapping));
}
submitted=false;
OnSave()
{
debugger;
//this.showStockError=false;
  this.submitted=true;


  
 
if(this.CreatePageNumberSequenceMapping.invalid)
{
var  Cvalid=true;


if(this.f.FormName.invalid && Cvalid)
{
  
  this.windowScroll('FormName');
  Cvalid=false;
}



return;
}
else
{

this.SavePageSequency();
 

}
}
debugger;
   ModifiedDate="";
   DbResult:any  = [];
   
   SavePageSequency()
   {
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");
      
    $("#loaderParent").show();
    var xml1="";
    var rows="";

    for(var i=0;i<this.lstnumSequence.length;i++)
    {

     rows=rows+'<Table1>'
   
   +'<SequenceNumberId>'+this.lstnumSequence[i].SequenceNumberId+ '</SequenceNumberId>'
   //+'<name>'+ (typeof(this.lstnumSequence[i].name)!='undefined'?this.lstnumSequence[i].name:'0')+ '</name>'
   
   +'<SequenceSettingsNumberId>'+this.lstnumSequence[i].SequenceSettingsNumberId+ '</SequenceSettingsNumberId>'
   +'<SequenceSettingsId>'+(this.f.Id.value)+'</SequenceSettingsId></Table1>'
   
  

    
    }
    xml1='<NewDataSet>'+rows+'</NewDataSet>';
  
   var xml2="";
  xml2=this.f.Id.value;
      debugger;
      this.APICall.DBCalling("SavePageSequency",xml1,xml2,"","").subscribe(
        (res:Response) => 
        {
    
          debugger;
          $("#loaderParent").hide();
         // this.DbResult= (res);
          this.DbResult=JSON.parse(res['Message']);

        //  var l=this.DbResult.Table[0].length;
         // var tr=this.DbResult.Table[0].DbResult;
        
         if(this.DbResult.Table.length>0 &&this.DbResult.Table[0].DBResult>0)
          {
         
          if(this.f.Id.value>0)
          { 
            // this.lstPageSequence=null;
            // this.lstPageSequence  = [];
            // if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0 )
            // {
            //  if(this.DbResult.Table1.length>0  )
            //  {
            //   var lstPageSequence=JSON.parse((( this.DbResult.Table1[0].sequencenamedetails).replace(/\n/g, "")).replace(/'/g,"\""));
            //   var i=0;
            //   var  sequencenamedetails = $.map(lstPageSequence, function (obj) {
            //     i=i+1;
            //     obj.SNO = i; 
      
            //     return obj;
            //   });
         
            //              this.lstPageSequence=sequencenamedetails;
             
             
            //  }
        
         
            // }
            this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
           (window as any).swal({
             icon: 'success',
             title: 'Information!',
             text: 'Record Updated successfully.',
             buttonsStyling: false,
             confirmButtonClass: 'btn btn-lg btn-success'
         });
       }else{
        //  this.CreateBranches.patchValue({
    
           
           this.f.Id.setValue(this.DbResult.Table[0].Id);
       
           this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
          //  this.lstPageSequence=null;
          //  this.lstPageSequence  = [];
          //  if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0 )
          //  {
          //   if(this.DbResult.Table1.length>0  )
          //   {
        
            
          //    var res1=(( this.DbResult.Table1[0].sequencenamedetails).replace(/\n/g, "")).replace(/'/g,"\"");
          //    this.lstPageSequence=JSON.parse(res1);
               
            
          //    var i=0;
          //                var  data = $.map(this.lstPageSequence, function (obj) {
          //                  i=i+1;
          //                  obj.SNO = i; 
                        
          //                  return obj;
          //                });
             
          //                this.lstPageSequence=data;
          //   }
      
        
          //  }
              //  });
               (window as any).swal({
           icon: 'success',
           title: 'Information!',
           text: 'Record Saved successfully.',
           buttonsStyling: false,
           confirmButtonClass: 'btn btn-lg btn-success'
       });
       }
    
          
              
    
         }else{
    
    
    
    if(this.DbResult.Table[0].DbResult==-3)
    {
    (window as any).swal({
     icon: 'warning',
     title: 'Exists',
     text: 'PageSequency Already Exists.!',
     confirmButtonText: 'Dismiss',
     buttonsStyling: false,
     confirmButtonClass: 'btn btn-lg btn-warning'
    });
    }else{
    
      if(this.DbResult.Table[0].DbResult==-5)
      {
    
    
        var that=this;
        debugger;
       
        (window as any).swal({
          icon: "warning",
          title:  "Treansaction modified by "+this.DbResult.Table[0].ModifiedBy+"! ",
          text:"Do you wants to overwrite?",
       
          buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
          ],
          dangerMode: true,
        }).then(function(isConfirm) {
        
          if (isConfirm) {
      
            that.ModifiedDate=that.DbResult.Table[0].ModifiedDate;
      
            that.SavePageSequency();
          }else {
            (window as any). swal("Cancelled", "this file is not updated :)", "error");
          }
      
      
        });
      
    
       
      }else
      {
    
   
      }
          
         }
       }
    
       },

          err => {
         (window as any).swal({
           icon: 'error',
           title: 'Error!',
           text: 'Network Error Please Try Again .!',
           confirmButtonText: 'Dismiss',
           buttonsStyling: false,
           confirmButtonClass: 'btn btn-lg btn-danger'
       });
       }
     );

   }

   OnAdd()
   {


    
for(var i=0;i<this.lstnumSequence.length;i++)
{
    for(var j=0;j<this.lstPageSequence.length;j++) 
     {
      if(this.lstnumSequence[i].SequenceNumberId==this.lstPageSequence[j].SequenceNumberId)
       {
        debugger;

         this.lstPageSequence[j].ChkStatus='true';
       
       }
     
      
      }

    
  
}
  


  // $('#drpAccounts').val(null).trigger('change');

   }

 
   ngAfterViewInit()
  {
debugger;
this.ViewandSearchsequencedetails();

  }


  DeviceType="";
  
  lstDbResult:any  = [];
  ViewandSearchsequencedetails()
  {
  
   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewSequency",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          this.lstPageSequence=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstPageSequence=this.lstDbResult.Table;
  
  //this.AddSequenceNumber('');
             
          }
  
          $("#loaderParent").hide();
        });
  }
  GetRefSearchDetails()
  {

  }
  
  FilterType='All'
  
GetSearchString():string
{
  debugger;
  var  SearchString="";
  if(this.FilterType !='All')
  {
    //SearchString=this.PrepareSerchStringByField();
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
 
  lstSerchableFields:any  = [];
 
   getControlValue(Control,Type):string
   {

    var Value=(Type=="string"?"":"0");
     if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
     {
       Value=Control.value;
     }
   
     return Value;
   }

 
   
   EditRecNO=-1;
   SNO=0;
  


   showError=false;
   errormsg="";
   

AddSequenceNumber(event)
{



  debugger;
  var lstDeiItems:any=[];
  for(var i=0;i<this.lstnumSequence.length;i++)
  {

    
   var index= this.lstPageSequence.findIndex(x=> x.ChkStatus!='true' &&  x.SequenceNumberId==this.lstnumSequence[i].SequenceNumberId);
if(index!=-1)
{
   lstDeiItems.push(index);
}

   for(var k=0;k<lstDeiItems.length;k++)
   {
     this.lstnumSequence.splice(k, 1);
  
   }

   
  }
 
  var Result=this.lstPageSequence.filter(x=> x.ChkStatus=='true' );
  debugger;
  if(Result.length>0)
  {
     for(let j=0;j<Result.length;j++)
     {
  
  
      var RCeck=this.lstnumSequence.filter(x=> x.SequenceNumberId==Result[j].SequenceNumberId );
      if(RCeck.length==0)
      {
  var AddSeq={
  
  
  name:Result[j].name
  ,Show:'true'
  ,SequenceNumberId:Result[j].SequenceNumberId
  ,SequenceSettingsId:this.f.Id.value
  ,SequenceSettingsNumberId:0
  }
  
  this.lstnumSequence.push(AddSeq);
      }
  
  
     }
    
    }


// for(var i=0;i<this.lstnumSequence.length;i++)
// {
//     for(var j=0;j<this.lstPageSequence.length;j++) 
//      {
//       if(this.lstnumSequence[i].SequenceNumberId==this.lstPageSequence[j].SequenceNumberId)
//        {
//         debugger;

//          this.lstPageSequence[j].ChkStatus='true';
       
//        }
     
      
//       }

    
  
// }
 

$("#btnCloseAddItem").trigger('click');
this.f.LineChanges.setValue(0);

}

ReturnChecked(target,index)
{
debugger;
 
this.lstPageSequence[index].ChkStatus=target.checked.toString();

}
SearchClick()
{
 this.GetSearchDetails();
}
GetSearchDetails()
{
debugger;
 var  SearchString="";
  if(this.FilterType!='All')
  {
    this.PrepareSerchStringByField();
  }
  else
   {
 var   SearchString=  this.getControlValue(this.f.SearchString,"string")
  
    for(var  i=0;i<this.lstnumSequence.length;i++)
    {
  
     if (
       

      (this.lstnumSequence[i].name).toString().includes(SearchString)

      //(this.lstbranchTimePropL[i].ExcessRsPerKms).toString().includes(SearchString)  
      )
     {
  
  
     
     this.lstnumSequence[i].Show='true';
    }else{
     this.lstnumSequence[i].Show='false';
  
  
    }
  }
}
return SearchString;
}
@HostListener('window:keydown', ['$event'])



keyEvent(event: KeyboardEvent) {
  console.log(event);
  
  if (event.ctrlKey || event.metaKey) {
    
   switch (String.fromCharCode(event.which).toLowerCase()) {
   case 's':
       event.preventDefault();
     this.OnSave();
    
       break;

       case 'a':
        
         event.preventDefault();
       this.ClearViewData();
       
         break;
         

   
   case 'o':
       event.preventDefault();
       this.Search();
       
       break;
   }
 }
 
}


windowScroll(ControlName)
{
  var element = document.getElementById(ControlName); 
var rect = element.getBoundingClientRect();

window.scrollTo(rect.left, rect.top);
}





SerchType='Like'
PrepareSerchStringByField()
{

  var Name=this.getControlValue(this.f.name,"string");

  debugger;
      if(this.SerchType=='Like')
      {
  
        
        if(Name!="")
        {
          for(var  i=0;i<this.lstnumSequence.length;i++)
             {
  
              if ((this.lstnumSequence[i].name).int().includes(Name)  )
              {
  
  
      
              this.lstnumSequence[i].Show='true';
             }else{
              this.lstnumSequence[i].Show='false';
  
  
             }
        }
      }
  
        
      }
      else
      {
       
        if(Name!="")
        {
          for(var  i=0;i<this.lstnumSequence.length;i++)
             {
  
              if ((this.lstnumSequence[i].name)==(Name)  )
              {
 
              this.lstnumSequence[i].Show='true';
             }else{
              this.lstnumSequence[i].Show='false';
  
  
             }
        }
        }
  
        
      }


}

StorePageNumberSequenceMapping: PageNumberSequenceMapping;
   lstPageSequence:any=[];
   lstnumSequence:any=[];
  ngOnInit() {
    this.DeviceType= localStorage.getItem('DeviceType')


    this.StorePageNumberSequenceMapping=new PageNumberSequenceMapping;

    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  
      
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    if (result.length > 0) {
  
      this.StorePageNumberSequenceMapping=( result[0] );
    this.ModifiedDate =this.StorePageNumberSequenceMapping.ModifiedDate.toString();

    this.lstPageSequence=this.StorePageNumberSequenceMapping.lstPageSequence==null?[]:this.StorePageNumberSequenceMapping.lstPageSequence;
    var i=0;
    var that=this;
    var  sequencenamedetails = $.map(this.lstPageSequence, function (obj) {
      i=i+1;
      obj.SNO = i; 

      return obj;
    });

               this.lstPageSequence=sequencenamedetails;
   
               this.lstnumSequence=this.StorePageNumberSequenceMapping.lstnumSequence==null?[]:this.StorePageNumberSequenceMapping.lstnumSequence;
               var i=0;
               var that=this;
               var  PageSequenceDetails = $.map(this.lstnumSequence, function (obj) {
                 i=i+1;
                 obj.SNO = i; 
           
                 return obj;
               });
           
                          this.lstnumSequence=PageSequenceDetails;
  
  
    this.CreatePageNumberSequenceMapping.patchValue(this.StorePageNumberSequenceMapping);
  
    }
    var that=this;
    debugger;
    this.lstnumSequence=this.StorePageNumberSequenceMapping.lstnumSequence;
    this.lstPageSequence=this.StorePageNumberSequenceMapping.lstPageSequence;

    this.CreatePageNumberSequenceMapping.valueChanges.subscribe(value => {
      that.StorePageNumberSequenceMapping.SequenceNumberId=value.SequenceNumberId;
      
      that.StorePageNumberSequenceMapping.SequenceSettingsId=value.Id;
      that.StorePageNumberSequenceMapping.FormName=value.FormName;
  
      that.StorePageNumberSequenceMapping.name=value.name;
      that.StorePageNumberSequenceMapping.ModifiedDate=(value.ModifiedDate==null?'':value.ModifiedDate.toString());
      
      that.StorePageNumberSequenceMapping.ViewName='Pagenumber';

      that.StorePageNumberSequenceMapping.lstPageSequence= that.lstPageSequence;
      
       
       that.store.dispatch(new TabStore.AddTab(that.StorePageNumberSequenceMapping));
   });

   if (result.length > 0) {

    this.StorePageNumberSequenceMapping=( result[0] );

  }
  //DisplaySequenceNumberId=0;
  //this.ViewandSearchsequencedetails();

  this.GetRefSearchDetails();
}
  DispalyFormName='Receipts';
  NumberSequenceValueChange(value)
  {
    debugger;
  //this.f.SequenceNumberId.setValue(value);
  
  }
  
  get f()
  { 
   return this.CreatePageNumberSequenceMapping.controls;
  
 } 
}