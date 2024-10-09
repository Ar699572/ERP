import { Component, ElementRef, OnInit,ViewChild  } from '@angular/core';

import { APICallingService } from 'src/app/apicalling.service'; 
import { formatDate } from '@angular/common';
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import * as XLSX from 'xlsx'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-gstsales-hsn',
  templateUrl: './gstsales-hsn.component.html',
  styleUrls: ['./gstsales-hsn.component.css']
})
export class GSTSalesHSNComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  GSTSalesHsn1:FormGroup;
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
  
  
  lstsalseshsn:any=[];
  constructor(private DbCallings: CommonDbCallings,private APICall: APICallingService,private formBuilder: FormBuilder) {

    this.GSTSalesHsn1=formBuilder.group(

      {
        FromDate:new FormControl(""),
        ToDate:new FormControl("")
      });

   }
   get f() { 
    return this.GSTSalesHsn1.controls;
  }
  ngOnInit() {
    debugger;
    debugger;
    this.f.FromDate.setValue("04/01/2021");
    var td=new Date();
    this.f.ToDate.setValue(formatDate(td, 'MM/dd/yyyy', 'en'));

    
    this.getsaleshsn();
  }
  GO()
  {
    // this.FromDate = ($("#FromDate").val()).toString();
    // this.ToDate = ($("#ToDate").val()).toString();
    this.getsaleshsn();
  }
  getsaleshsn()
  {
    debugger;
    this.APICall.DBCalling("GSTSalesHSNs",this.f.FromDate.value,this.f.ToDate.value,"","").subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);
        if(this.lstDbResult.Table.length>0)
        {
this.lstsalseshsn=this.lstDbResult.Table;
        }
        $("#loaderParent").hide();
      });
  }
}
