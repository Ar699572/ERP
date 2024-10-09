import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APICallingService } from 'src/app/apicalling.service';
import { StoreNotification } from 'src/app/store/StoreNotification';
import { Store } from '@ngrx/store';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private ngZone: NgZone,private router: Router, private APICall: APICallingService, private store: Store<any>) { }
  lstNotification: any = [];
  lstSLNotification:any=[];
  lstDeadStockNotification:any=[]
  StoreNotification: StoreNotification;
  ngOnInit() {

    debugger;
    this.StoreNotification = new StoreNotification;

      this.getItemNotification();
      this.getShielfLifeItemNotification();
   this.getDeadStockNotification();
  }

  CreateIndent() {
    try {
      
      this.SaveIndent();


    }
    catch (error) { }
  }

  DbResult:any;
  SaveIndent() {
  debugger;
    if ( this.selectedParts.length > 0) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();     

 var xml1 = '<NewDataSet><Table1>'
  + '<PurchaseIndentId>0</PurchaseIndentId>'
  + '<CustomerId>0</CustomerId>'
  + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
  + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
  + '<Modifieddate></Modifieddate>'
  + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
  + '</Table1></NewDataSet>';

      var xml2 = "";
      var rows = "";

      for (var i = 0; i < this.selectedParts.length; i++) {

        rows = rows + '<Table1><IndentId>0</IndentId>'
          + '<PurchaseIndentChildId>0</PurchaseIndentChildId>'
          + '<ItemId>' + this.selectedParts[i].ItemId + '</ItemId>'
          + '<Qty>' + this.selectedParts[i].MinimumQty + '</Qty></Table1>'
      }

      xml2 = '<NewDataSet>' + rows + '</NewDataSet>';


      this.APICall.DBCalling("SavePurchaseIndent", xml1, xml2, "Notification", "").subscribe(
        (res: Response) => {
          debugger;
          $("#loaderParent").hide();

          this.DbResult = JSON.parse(res['Message']);
          debugger;
          if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {           
         

              (window as any).swal({
                icon: 'success',
                title: 'Information!',
                text: 'Purchase Indent generated Successfully.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-success'
              });

this.selectedParts=[];
              this.getItemNotification();
            
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
   

  }


  FilterType='All'


  lstDbResult: any;

  getItemNotification() {


    var sstring= $('#SearchString').val().toString();
    this.APICall.DBCalling("NotificationsView", sstring,this.FilterType, "", "").subscribe(
      (res: Response) => {
        debugger;
        this.lstNotification = [];
        this.lstDbResult = (res);

        // var res1 = ((this.lstDbResult).replace(/\n/g, "")).replace(/'/g, "\"");
        var lst = JSON.parse(this.lstDbResult.Message);

        this.lstNotification = lst.Table;
      
        //  if(this.lstDbResult.tasks.length>0 && this.lstDbResult.tasks[0].length>0 )
        //  {
        //    this.lstNotification=this.lstDbResult.tasks[0];

        //  }
      });
    

  }


  getShielfLifeItemNotification() {
    this.ngZone.run(()  => {
    this.APICall.DBCalling("NotificationShelfLifeItem", "", "", this.APICall.GetCompanyID(), this.APICall.GetBranchID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstSLNotification = [];
        this.lstDbResult = (res);
        var lst = JSON.parse(this.lstDbResult.Message);

        this.lstSLNotification = lst.Table;
      });
    });

  }

  SearchClick()
  {
    debugger;
    this.getItemNotification();
  }


  getDeadStockNotification() {
    this.ngZone.run(()  => {
    this.APICall.DBCalling("NotificationDeadStock", "", "", this.APICall.GetCompanyID(), this.APICall.GetBranchID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDeadStockNotification = [];
        this.lstDbResult = (res);
        var lst = JSON.parse(this.lstDbResult.Message);

        this.lstDeadStockNotification = lst.Table;
      });
    });

  }

  selectedParts = []
  
  onSelect(value, row) {
    debugger;
    try {
      if (value == true) {
        this.selectedParts.push(row);
        
      }
      else {
        
        this.selectedParts.forEach((element, index) => {
          if (element.ItemId == row.ItemId)
            this.selectedParts.splice(index, 1);

        });

      }
    }
    catch (error) { }
  }

  

  onAllSelect(value) {
   
    try {
     debugger;
      

        for(let i=0; i<this.lstNotification.length; i++)
        {
          if (value == true) {
          this.lstNotification[i].chkStatus=this.lstNotification[i].ItemId;
        this.selectedParts.push(this.lstNotification[i]);
          }
          else {  
            this.lstNotification[i].chkStatus=0;      
            this.selectedParts=[];    
          }
        }
      
      
    }
    catch (error) { }
    }
    
  

}
