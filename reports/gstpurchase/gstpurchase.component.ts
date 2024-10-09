import { Component, ElementRef, OnInit,ViewChild  } from '@angular/core';

import { APICallingService } from 'src/app/apicalling.service'; 
import { formatDate } from '@angular/common';
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import * as XLSX from 'xlsx'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gstpurchase',
  templateUrl: './gstpurchase.component.html',
  styleUrls: ['./gstpurchase.component.css']
})
export class GSTPurchaseComponent implements OnInit {
 
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {  
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  } 
  FromDate:string="";
  ToDate:string="";
  lstDbResult:any=[];
  
  lstPurchase:any=[];
  GSTPurchase1:FormGroup;
  Taxablevalue:number=0;
  IGST:number=0;
  CGST:number=0;
  SGST:number=0;
  Cess:number=0;
  TotalTaxAmount:number=0;
  Total:number=0;
  constructor(private DbCallings: CommonDbCallings,private APICall: APICallingService,private formBuilder: FormBuilder) { 

    this.GSTPurchase1=formBuilder.group(

      {
        FromDate:new FormControl(""),
        ToDate:new FormControl("")
      });

  }
  get f() { 
    return this.GSTPurchase1.controls;
  }
  ngOnInit() {
    debugger;
    this.f.FromDate.setValue("04/01/2021");
    var td=new Date();
    this.f.ToDate.setValue(formatDate(td, 'MM/dd/yyyy', 'en'));

    
    this.getPurchase();
  }
  Go()
  {
    debugger;
    // this.FromDate = ($("#FromDate").val()).toString();
    // this.ToDate = ($("#ToDate").val()).toString();
    this.getPurchase();
  }
  getPurchase()
  {
    this.Taxablevalue=0;
    this.IGST=0;
    this.CGST=0;
    this.SGST=0;
    this.Cess=0;
    this.TotalTaxAmount=0;
    this.Total=0;


    debugger;
    this.APICall.DBCalling("GSTPurchases",this.f.FromDate.value,this.f.ToDate.value,"","").subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);
        if(this.lstDbResult.Table.length>0)
        {
          this.lstPurchase=this.lstDbResult.Table;
          for(var i=0;i<this.lstPurchase.length;i++)
          {
            this.Taxablevalue=this.Taxablevalue+this.lstPurchase[i].TaxableValue;
            this.IGST=this.IGST+this.lstPurchase[i].IGST;
            this.CGST=this.CGST+this.lstPurchase[i].CGST;
            this.SGST=this.SGST+this.lstPurchase[i].SGST;
            this.Cess=this.Cess+this.lstPurchase[i].Cess;
            this.TotalTaxAmount=this.TotalTaxAmount+this.lstPurchase[i].TotalTaxAmount;
            this.Total=this.Total+this.lstPurchase[i].Total;

          }
        }
        $("#loaderParent").hide();
      });
  }

}
