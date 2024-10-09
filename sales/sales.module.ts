import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SalesRoutingModule } from './sales-routing.module';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import { CreateCustomerTypeComponent } from './create-customer-type/create-customer-type.component';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateSalesQuotationComponent } from './create-sales-quotation/create-sales-quotation.component';
import { QuotaionsComponent } from './quotaions/quotaions.component';
import { OrderComponent } from './order/order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ProfarmaInvoiceComponent } from './profarma-invoice/profarma-invoice.component';
import { CreateProfarmaInvoiceComponent } from './create-profarma-invoice/create-profarma-invoice.component';
import { DcComponent } from './dc/dc.component';

import { CreateDcComponent } from './create-dc/create-dc.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { CreateSalesInvoiceComponent } from './create-sales-invoice/create-sales-invoice.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CreateSalesReturnsComponent } from './create-sales-returns/create-sales-returns.component';
import { SalesReturnsComponent } from './sales-returns/sales-returns.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { CustomerCentralComponent } from './customer-central/customer-central.component';
import { SalesReturnReportComponent } from './sales-return-report/sales-return-report.component';
import { SalesInvoiceReportComponent } from './sales-invoice-report/sales-invoice-report.component';
import { SalesQuotationReportComponent } from './sales-quotation-report/sales-quotation-report.component';
import { SalesorderreportComponent } from './salesorderreport/salesorderreport.component';
import { DcReportComponent } from './dc-report/dc-report.component';
import { DcreturnreportsComponent } from './dcreturnreports/dcreturnreports.component';
// import { PendingDCsComponent } from './pending-dcs/pending-dcs.component';
// import { ChartOfAccountsComponent } from '../ApplicationControls/chart-of-accounts/chart-of-accounts.component';
// import { DropdownCountryComponent } from '../ApplicationControls/dropdown-country/dropdown-country.component';
// import { DropdownStateComponent } from '../ApplicationControls/dropdown-state/dropdown-state.component';
// import { DropdownCityComponent } from '../ApplicationControls/dropdown-city/dropdown-city.component';
@NgModule({
  declarations: [CustomerTypeComponent, CreateCustomerTypeComponent, CustomerComponent, CreateCustomerComponent, CreateSalesQuotationComponent, QuotaionsComponent, 
    OrderComponent, CreateOrderComponent, ProfarmaInvoiceComponent, CreateProfarmaInvoiceComponent, DcComponent, 
    CreateDcComponent, SalesInvoiceComponent, CreateSalesInvoiceComponent, CreateSalesReturnsComponent, SalesReturnsComponent,DcreturnreportsComponent, SalesReportComponent, CustomerCentralComponent, SalesReturnReportComponent, SalesInvoiceReportComponent, SalesQuotationReportComponent, SalesorderreportComponent, DcReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SalesRoutingModule,
    SharedModuleModule,
   
    // ChartOfAccountsComponent,
  
    // DropdownCountryComponent,
    // DropdownStateComponent,
    // DropdownCityComponent,
    RouterModule.forChild(



      [
        
        { path: 'CustomerType', component: CustomerTypeComponent, pathMatch: 'full' },
        { path: 'CreateCustomerType', component: CreateCustomerTypeComponent, pathMatch: 'full' },
        { path: 'Customer', component: CustomerComponent, pathMatch: 'full'  },
        
        { path: 'CreateCustomer', component: CreateCustomerComponent, pathMatch: 'full' },
        { path: 'CreateSalesQuotation', component: CreateSalesQuotationComponent, pathMatch: 'full' },
        { path: 'SalesQuotation', component: QuotaionsComponent, pathMatch: 'full' },
        { path: 'SalesOrder', component: OrderComponent, pathMatch: 'full' },
        { path: 'CreateSalesOrder', component: CreateOrderComponent, pathMatch: 'full' },
        { path: 'ProformaInvoice', component: ProfarmaInvoiceComponent, pathMatch: 'full' },
        { path: 'CreateProformaInvoice', component: CreateProfarmaInvoiceComponent, pathMatch: 'full' },
        { path: 'DC', component: DcComponent, pathMatch: 'full' },
        { path: 'CreateDC', component: CreateDcComponent, pathMatch: 'full' },
        { path: 'SalesInvoice', component: SalesInvoiceComponent, pathMatch: 'full' },
        { path: 'SalesReturns', component: SalesReturnsComponent, pathMatch: 'full' },

        { path: 'CreateSalesReturns', component: CreateSalesReturnsComponent, pathMatch: 'full' },

        { path: 'CreateSalesInvoice', component: CreateSalesInvoiceComponent, pathMatch: 'full' },

        { path: 'SalesReport', component: SalesReportComponent, pathMatch: 'full' },
        { path: 'CustomerCentral', component: CustomerCentralComponent, pathMatch: 'full' },
        { path: 'SalesReturnReport', component:SalesReturnReportComponent , pathMatch: 'full' },
        { path: 'SalesInvoiceReport', component: SalesInvoiceReportComponent, pathMatch: 'full' },
        { path: 'SalesQuotationReport', component: SalesQuotationReportComponent, pathMatch: 'full' },
        { path: 'SalesorderReport', component:SalesorderreportComponent , pathMatch: 'full' },
        { path: 'DcReport', component: DcReportComponent, pathMatch: 'full' },
        { path: 'DcReturnReport', component:DcreturnreportsComponent , pathMatch: 'full' }
        

 
      ]
    )
  ],
  exports: [RouterModule]
})
export class SalesModule { }
