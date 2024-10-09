import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import { PaymentsTerms } from 'src/app/store/PaymentsTerms';

@Component({
  selector: 'app-createpayment-terms',
  templateUrl: './createpayment-terms.component.html',
  styleUrls: ['./createpayment-terms.component.css']
})
export class CreatepaymentTermsComponent implements OnInit {

  CreatePayments:FormGroup
  constructor(private fb:FormBuilder,private router:Router,public APICall: APICallingService,private store: Store<any>) { 
    this.CreatePayments=this.fb.group({
      Description:new FormControl(''),
      TermDetailsId:new FormControl(0),
      TermName:new FormControl('',Validators.required),
      PayName:new FormControl('',Validators.required),
      Paypercentage:new FormControl('',Validators.required)
      // PendingPercentage:new FormControl('',Validators.required),
      // PendingAmt:new FormControl('',Validators.required),
      // ReceivedAmt:new FormControl('',Validators.required),
      // ReceivedPerCentage:new FormControl('',Validators.required)
    })
  }
  StorePaymentsTerms:PaymentsTerms;
  DeviceType=''
  ngOnInit() {
    this.StorePaymentsTerms = new PaymentsTerms;
 debugger;
    this.DeviceType = localStorage.getItem('DeviceType')
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
  
debugger;
    if (result.length > 0) {
debugger;
      this.StorePaymentsTerms = result[0];
      this.ModifiedDate = this.StorePaymentsTerms.ModifiedDate;
      this.CreatePayments.patchValue({
        TermName: this.StorePaymentsTerms.TermName,
        Description: this.StorePaymentsTerms.Description,
       
      });
      // var newarray:any=[]
      // newarray=Math.floor(this.StorePaymentsTerms.lstPaymentsTerms[])
      this.TermsDetailslist=this.StorePaymentsTerms.lstPaymentsTerms
      // for(var i=0;i < this.StorePaymentsTerms.lstPaymentsTerms.length ;i++){
      //   debugger;
      //   var value = Math.floor(this.StorePaymentsTerms.lstPaymentsTerms[i].Paypercentage)
       
      //   console.log(value)
      // }
    //  this.TermsDetailslist=newarray;
  //   this.Calculationpercentage=this.StorePaymentsTerms.ValidCalculation

     

    }
  }

  get f(){
    return this.CreatePayments.controls
  }
  Validpercentage:string=''
  UpdateId=-1
  EditTerms(selectedRow,index){
    debugger;
  this.UpdateId=index;
  var decimal= Math.floor(selectedRow.Paypercentage)
  this.CreatePayments.patchValue({
    TermDetailsId:selectedRow.TermDetailsId,
    PayName:selectedRow.PayName,
    Paypercentage:decimal,
    // PendingPercentage:selectedRow.PendingPercentage,
    // PendingAmt:selectedRow.PendingAmt,
    // ReceivedAmt:selectedRow.ReceivedAmt,
    // ReceivedPerCentage:selectedRow.ReceivedPerCentage
  })

  }
  DeleteTermDetails(index){
    debugger;
    var index1=-1;
    if(index1!=index){
      debugger;
      this.TermsDetailslist.splice(index,1)
    }
  }

  submitted:boolean=false;
  TermsDetailslist=[];
  TermDetailsId=0
  AddTermslist(){
    debugger;
    // 
  if( this.f.Paypercentage.value!=0 && this.f.PayName.value!=''
    ){
      // this.f.ReceivedPerCentage.value!=0 &&  this.f.ReceivedPerCentage.value!=null && 
      // this.f.ReceivedAmt.value!=0 && this.f.PendingPercentage.value!=0 && this.f.PendingAmt.value!=0
      var Addetails={ 
        TermDetailsId:this.f.TermDetailsId.value,
        Paypercentage:this.f.Paypercentage.value ,
        PayName:this.f.PayName.value
        // ReceivedPerCentage:this.f.ReceivedPerCentage.value,
        // ReceivedAmt:this.f.ReceivedAmt.value,
        // PendingPercentage:this.f.PendingPercentage.value,
        // PendingAmt:this.f.PendingAmt.value
      }
      var updateIndexId=this.UpdateId
  if(updateIndexId!=-1){
    this.TermsDetailslist[updateIndexId]=Addetails;
    this.ClosePopup()
  }else{
    this.TermsDetailslist.push(Addetails)
    this.errromsge=''
    this.ClosePopup()
  
  }  
    }else if( this.f.Paypercentage.value==0 
    ){
      // this.f.ReceivedPerCentage.value==0 || this.f.ReceivedAmt.value==0 ||  this.f.ReceivedPerCentage.status=="INVALID" 
    // && this.f.PendingPercentage.value==0 || this.f.PendingAmt.value==0
      this.submitted=true
    }else{
      this.submitted=true 
    }
  
  }

  ClosePopup() {
      $('#btnClose').click()
  }

  submit=false;
  errromsge:string='';
Calculationpercentage:number=0
  OnSave(){
    debugger;
    this.submit=true;
   
      this.Calculationpercentage=0;
    
   
    if(this.TermsDetailslist.length >0 &&  this.Calculationpercentage < 100){
      debugger;
      for(var i =0 ;i < this.TermsDetailslist.length; i++){
       
    this.Calculationpercentage=(   Math.floor(this.Calculationpercentage) +  this.TermsDetailslist[i].Paypercentage)
   // this.Calculationpercentage.toFixed()
   console.log(this.Calculationpercentage)
 
    
      }
    }
if(this.Calculationpercentage >0  && this.Calculationpercentage < 100 ){
  this.Validpercentage='The Pay Percentage not be lesthan 100'
}else if(this.Calculationpercentage > 100){
  this.Validpercentage='The Pay Percentage not be greaterthan 100'
}
else{
      this.Validpercentage='' 
    }


   if(this.f.TermName.value!='' && this.TermsDetailslist.length >0 &&  this.Calculationpercentage ==100){
   this.SaveTerms()
  
   }else if (this.TermsDetailslist.length==0){
    this.errromsge='Please Fill the TermDetails'
   }else{
    this.errromsge=''
   }


  }

  SaveTerms() {
    try {
      debugger;
        var that = this;
        debugger;
        try {
          var xml1 = '<NewDataSet><Table1>'
  
            + '<TermsId>' + this.StorePaymentsTerms.TermsId + '</TermsId>'
            + '<TermsName>' + this.f.TermName.value + '</TermsName>'
            + '<Notes>' + this.f.Description.value + '</Notes>'
            + '<ModifiedDate>' + this.StorePaymentsTerms.ModifiedDate + '</ModifiedDate>'
            + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
            + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
            + '<ModifiedBy>' + this.APICall.GetUserName() + '</ModifiedBy>'
            + '</Table1>'
            + '</NewDataSet>';
  
          var xml2 = this.GetTermsDetails();
  
          var rows = "";
        }
        catch (error) { }
        // parseFloat(this.value).toFixed(2)
        debugger;
        this.APICall.DBCalling("PaymentsTermsSave", xml1, xml2, "", "").subscribe(
          (res: Response) => {
            debugger;
            try {;
              $("#loaderParent").hide();
  
              this.DbResult = JSON.parse(res['Message']);
              debugger;
  
            
              if (this.DbResult.Table.length >0) {
                debugger;
  
                if (this.DbResult.Table[0].DbResult > 0  && this.StorePaymentsTerms.TermsId >0) {
                  debugger;
                  // && this.StoreTemplates.TemplateId>0
                  this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
                
                  (window as any).swal({
                    icon: 'success',
                    title: 'Information!',
                    text: 'Record Updated Successfully.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-lg btn-success'
                  });
                 
                } else if (this.DbResult.Table[0].DbResult > 0   ) {
  
                  this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
  
                  (window as any).swal({
                    icon: 'success',
                    title: 'Information!',
                    text: 'Record Saved successfully.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-lg btn-success'
                  });
                }
                else {
                  if (this.DbResult.Table[0].DbResult == -3) {
                    (window as any).swal({
                      icon: 'warning',
                      title: 'Exists',
                      text: 'Terms Name Already Exists.!',
                      confirmButtonText: 'Dismiss',
                      buttonsStyling: false,
                      confirmButtonClass: 'btn btn-lg btn-warning'
                    });
                  } 
                  else {
  
                    if (this.DbResult.Table[0].DBResult == -5) {
  
                      var that = this;
                      debugger;
  
                      (window as any).swal({
                        icon: "warning",
                        title: "Treansaction modified by " + this.DbResult.Table[0].ModifiedBy + "!",
                        text: "Do you wants to overwrite?",
  
                        buttons: [
                          'No, cancel it!',
                          'Yes, I am sure!'
                        ],
                        dangerMode: true,
                      }).then(function (isConfirm) {
  
                        if (isConfirm) {
  
                          that.ModifiedDate = that.DbResult.Table[0].ModifiedDate;
  
                          that.SaveTerms()
                        } else {
                          (window as any).swal("Cancelled", "this file is not updated :)", "error");
                        }
  
  
                      });
  
  
  
                    } else {
  
                      (window as any).swal({
                        icon: 'error',
                        title: 'Error!',
                        text: 'failed.!',
                        confirmButtonText: 'Dismiss',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-lg btn-danger'
                      });
                    }
  
                  }
                }
  
  
  
              }
            }
            catch (e) { }
  
  
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
  
        // else {
        //   (window as any).swal({
        //     icon: 'error',
        //     title: 'Error!',
        //     text: 'Please Select Items',
        //     confirmButtonText: 'Dismiss',
        //     buttonsStyling: false,
        //     confirmButtonClass: 'btn btn-lg btn-danger'
        //   });
        //  // $("#loaderParent").hide();
        // }   
     
      
    }
  
  
  
    catch (e) {
  
    }
  }
  // SaveTerms

   GetTermsDetails() {
    debugger;
    var val = "";
    if (this.TermsDetailslist.length > 0) {
  
      try {
  
        for (let i = 0; i < this.TermsDetailslist.length; i++) {
          try {
            debugger;
            val = val + '<Table1>'
              + '<TermDetailsId>' + this.TermsDetailslist[i].TermDetailsId + '</TermDetailsId>'
              + '<PayName>' + this.TermsDetailslist[i].PayName + '</PayName>'
              + '<PayPercentage>' + this.TermsDetailslist[i].Paypercentage + '</PayPercentage>'
              // + '<ReceivedPercentage>' + this.TermsDetailslist[i].ReceivedPerCentage + '</ReceivedPercentage>'
              // + '<ReceivedAmount>' + this.TermsDetailslist[i].ReceivedAmt + '</ReceivedAmount>'
              // + '<PendingPercentage>' + this.TermsDetailslist[i].PendingPercentage + '</PendingPercentage>'
              // + '<PendingAmount>' + this.TermsDetailslist[i].PendingAmt + '</PendingAmount>'
            
  
              + '</Table1>'
  
          }
          catch (error) { }
  
        }
  
        var xml2 = '<NewDataSet>' + val + '</NewDataSet>';
  
      }
      catch (error) { }
  
    }
  
    return xml2;
  }

  TermsId=0
  ModifiedDate:string='';
  DbResult:any=[];
 
  OnDelete() {

    var that = this;
  
  
    (window as any).swal({
      icon: "warning",
      title: "Are you sure?",
      text: "You will not be able to recover this record!",
  
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
  
      if (isConfirm) {
  
        that.DeleteDetails();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }
  
    });
  
  }


  getControlValue(Control,Type):string
  {
  
   var Value=(Type=="string"?"":"0");
    if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
    {
      Value=Control.value;
    }
  
    return Value;
  }
  DeleteDetails(){
    debugger;
    var xml1 = '<NewDataSet><Table1>'
    + '<TermsId>' + this.StorePaymentsTerms.TermsId + '</TermsId>'
    + '<TermsName>' + this.getControlValue(this.f.TermName, 'string') + '</TermsName>'
    + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
    + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
    + '</Table1></NewDataSet>';

  this.APICall.DBCalling("PaymentsTermsDelete", xml1, "", "", "").subscribe(
    (res: Response) => {

      $("#loaderParent").hide();
      this.DbResult = JSON.parse(res['Message']);


      if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
        this.ClearViewData();

        (window as any).swal({
          icon: 'success',
          title: 'Information!',
          text: 'Record Deleted successfully.',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-success'
        });

        
      }
      else {
        (window as any).swal({
          icon: 'error',
          title: 'Error!',
          text: 'failed.!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-danger'
        });
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
  Clear(){
    debugger;
    this.UpdateId=-1;
    this.CreatePayments.patchValue({
      PayName:'',
      Paypercentage:'',  
    })
  }
  
  ClearViewData(){

    this.StorePaymentsTerms=new PaymentsTerms;
    this.TermsDetailslist=[];
    this.CreatePayments.patchValue({
      Description:'',
      TermName:'',
      TermDetailsId:0,
      PayName:'',
      Paypercentage:'',
      // PendingPercentage:'',
      // PendingAmt:'',
      // ReceivedAmt:'',
      // ReceivedPerCentage:''
    });
  }
  Search(){

   this.router.navigate(['Common/PaymentTerms']);
  }


}
