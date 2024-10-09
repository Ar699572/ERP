import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipts-print',
  templateUrl: './receipts-print.component.html',
  styleUrls: ['./receipts-print.component.css']
})
export class ReceiptsPrintComponent implements OnInit {

   constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService)   { }
   Print()
   {}
  ngOnInit() {
  }
  Charges:any  = [];
  ViewData:any  = [];
   ReceiptDate="";
  ReceiptNo="";
  PaymentMode="";
  BillRefNo="";
  Amount=0;
  AdditionalKMCharges=0;
  DelayCharges=0;
  DamageCharges=0;
  OverSpeedCharges=0;
  TraficChallanCharges=0;
  OtherCharges=0;
  BookingNetAmount=0;
  BookingAdvance=0;

Total=0;

 
  CustomerName="";

  ContactNumber="";

  ContactAddress="";


  btnClose()
  {
    this.router.navigate(['Inventory/Bookings']);
  }

  ngAfterViewInit(){

    debugger;
    this. ViewData=this.APICall.GetViewData();
 

    if( this.ViewData!=undefined &&   typeof( this.ViewData)!=undefined && typeof( this.ViewData[0].ViewName)!=undefined )
    {
       // JSON.parse(ViewData).forEach(item => {
 
         debugger;
       if( this.ViewData[0].ViewName=='PrintReceipt')
       {

        this.ReceiptDate=this.ViewData[0].ReceiptDate;
        this.ReceiptNo=this.ViewData[0].ReceiptNo;
        this.PaymentMode=this.ViewData[0].PaymentMode;
        this.BillRefNo=this.ViewData[0].BillRefNo;
        this.Amount=this.ViewData[0].Amount;
        this.AdditionalKMCharges=this.ViewData[0].AdditionalKMCharges;
        this.DelayCharges=this.ViewData[0].DelayCharges;
        this.DamageCharges=this.ViewData[0].DamageCharges;
        this.OverSpeedCharges=this.ViewData[0].OverSpeedCharges;
        this.TraficChallanCharges=this.ViewData[0].TraficChallanCharges;
        this.OtherCharges=this.ViewData[0].OtherCharges;
        this.BookingNetAmount=this.ViewData[0].BookingNetAmount;
      
      
       
        this.BookingAdvance=this.ViewData[0].BookingAdvance;
      
      
      this.Total=(+this.AdditionalKMCharges)+(+this.DelayCharges)+(+this.DamageCharges)+(+this.OverSpeedCharges)+(+this.TraficChallanCharges)+(+this.OtherCharges);
       
        this.CustomerName=this.ViewData[0].CustomerName;
      
        this.ContactNumber=this.ViewData[0].ContactNumber;
        this.ContactAddress=this.ViewData[0].ContactAddress;
       
if(this.AdditionalKMCharges>0)
{
        var res=
        ({
         
        Description:"Additional KM Charges"
        ,Amount:this.AdditionalKMCharges
        });

if(this.Charges.length==0)
{
this.Charges=[res];

}
else{
this.Charges.push(res);

}

}




if(this.DelayCharges>0)
{
        var res=
        ({
         
        Description:"Delay Charges"
        ,Amount:this.DelayCharges
        });

if(this.Charges.length==0)
{
this.Charges=[res];

}
else{
this.Charges.push(res);

}

}





if(this.DamageCharges>0)
{
        var res=
        ({
         
        Description:"Damage Charges"
        ,Amount:this.DamageCharges
        });

if(this.Charges.length==0)
{
this.Charges=[res];

}
else{
this.Charges.push(res);

}

}





if(this.OverSpeedCharges>0)
{
        var res=
        ({
         
        Description:"Over Speed Charges"
        ,Amount:this.OverSpeedCharges
        });

if(this.Charges.length==0)
{
this.Charges=[res];

}
else{
this.Charges.push(res);

}

}







if(this.TraficChallanCharges>0)
{
        var res=
        ({
         
        Description:"Trafic Challan Charges"
        ,Amount:this.TraficChallanCharges
        });

if(this.Charges.length==0)
{
this.Charges=[res];

}
else{
this.Charges.push(res);

}

}




if(this.OtherCharges>0)
{
        var res=
        ({
         
        Description:"Other Charges"
        ,Amount:this.OtherCharges
        });

if(this.Charges.length==0)
{
this.Charges=[res];

}
else{
this.Charges.push(res);

}

}












       }
      }

    }
}
