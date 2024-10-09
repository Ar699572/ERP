import { Component, ElementRef, OnInit,ViewChild  } from '@angular/core';

import { APICallingService } from 'src/app/apicalling.service'; 
import { formatDate } from '@angular/common';
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import * as XLSX from 'xlsx'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gstsales',
  templateUrl: './gstsales.component.html',
  styleUrls: ['./gstsales.component.css']
})
export class GSTSalesComponent implements OnInit {
  GSTSales1:FormGroup;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {  
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  } 
  
  lstDbResult:any=[];

  lstsalses:any=[];
  Taxablevalue:number=0;
  IGST:number=0;
  CGST:number=0;
  SGST:number=0;
  Cess:number=0;
  TotalTaxAmount:number=0;
  Total:number=0;
  constructor(private DbCallings: CommonDbCallings,private APICall: APICallingService,private formBuilder: FormBuilder) {

    
    this.GSTSales1=formBuilder.group(

      {
        FromDate:new FormControl(""),
        ToDate:new FormControl("")
      });
   }
   get f() { 
    return this.GSTSales1.controls;
  }
  ngOnInit() {
    debugger;
    this.f.FromDate.setValue("04/01/2021");
    var td=new Date();
    this.f.ToDate.setValue(formatDate(td, 'MM/dd/yyyy', 'en'));

    
    this.getsales();
  }
  GO()
  {
    debugger;
    //  $("#FromDate").val(formatDate(this.FromDate, 'MM/dd/yyyy', 'en'));
  //  $("#ToDate").val(formatDate(new Date(), 'MM/dd/yyyy', 'en'));
  //  this.FromDate = ($("#FromDate").val()).toString();
   // this.ToDate = ($("#ToDate").val()).toString();
    this.getsales();
  }
  getsales()
  {

    this.Taxablevalue=0;
    this.IGST=0;
    this.CGST=0;
    this.SGST=0;
    this.Cess=0;
    this.TotalTaxAmount=0;
    this.Total=0;


    debugger;
    this.APICall.DBCalling("GSTSales",this.f.FromDate.value,this.f.ToDate.value,"","").subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);
        if(this.lstDbResult.Table.length>0)
        {
          this.lstsalses=this.lstDbResult.Table;
          this.lstsalses.sort((a, b) => {
            return   <any>new Date(a.dt) - <any>new Date(b.dt);
          });
          for(var i=0;i<this.lstsalses.length;i++)
          {
            this.Taxablevalue=this.Taxablevalue+this.lstsalses[i].TaxableValue;
            this.IGST=this.IGST+this.lstsalses[i].IGST;
            this.CGST=this.CGST+this.lstsalses[i].CGST;
            this.SGST=this.SGST+this.lstsalses[i].SGST;
            this.Cess=this.Cess+this.lstsalses[i].Cess;
            this.TotalTaxAmount=this.TotalTaxAmount+this.lstsalses[i].TotalTaxAmount;
            this.Total=this.Total+this.lstsalses[i].Total;

          }
        }
        $("#loaderParent").hide();
      });
  }



}
