import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
//import { SalesInvoicePrintComponent } from './sales-invoice-print/sales-invoice-print.component';
import { RouterModule } from '@angular/router';
import { SalesQuotationPrintComponent } from './sales-quotation-print/sales-quotation-print.component';
import { GSTSalesComponent } from './gstsales/gstsales.component';
import { GSTPurchaseComponent } from './gstpurchase/gstpurchase.component';
import { GSTSalesHSNComponent } from './gstsales-hsn/gstsales-hsn.component';
import { GSTPurcchaseHSNComponent } from './gstpurcchase-hsn/gstpurcchase-hsn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ SalesQuotationPrintComponent,
    GSTSalesComponent, GSTPurchaseComponent, GSTSalesHSNComponent, GSTPurcchaseHSNComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    RouterModule.forChild(

      

      [
        
       // { path: 'SalesInvoicePrint', component: SalesInvoicePrintComponent, pathMatch: 'full' },
        
        { path: 'GSTSales', component: GSTSalesComponent, pathMatch: 'full' },

        { path: 'GSTPurchase', component: GSTPurchaseComponent, pathMatch: 'full' },

        { path: 'GSTSalesHSN', component: GSTSalesHSNComponent, pathMatch: 'full' },

        { path: 'GSTPurcchaseHSN', component: GSTPurcchaseHSNComponent, pathMatch: 'full' },
 
      ]
    )
  ],
  exports: [RouterModule]
})
export class ReportsModule { }
