import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { RouterModule } from '@angular/router';
import { PurchaseQuotationComponent } from './purchase-quotation/purchase-quotation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CreatePurchaseQuotationComponent } from './create-purchase-quotation/create-purchase-quotation.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { VendorComponent } from './vendor/vendor.component';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { CreatePurchaseInvoiceComponent } from './create-purchase-invoice/create-purchase-invoice.component';
import { RFQComponent } from './rfq/rfq.component';
import { MRNComponent } from './mrn/mrn.component';
import { PurchaseIndentComponent } from './purchase-indent/purchase-indent.component';
import { PurchaseIndentsComponent } from './purchase-indents/purchase-indents.component';
import { RFQOverviewComponent } from './rfqoverview/rfqoverview.component';
import { MRNOverviewComponent } from './mrnoverview/mrnoverview.component';
import { VendorCentralComponent } from './vendor-central/vendor-central.component';
import { VendorTypeComponent } from './vendor-type/vendor-type.component';
import { CreateVendorTypeComponent } from './create-vendor-type/create-vendor-type.component';
import { VendorGroupComponent } from './vendor-group/vendor-group.component';
import { CreateVendorGroupComponent } from './create-vendor-group/create-vendor-group.component';
import { PurchaseReturnsComponent } from './purchase-returns/purchase-returns.component';
import { CreatePurchaseReturnsComponent } from './create-purchase-returns/create-purchase-returns.component';
import { CreateNewVendorComponent } from './create-new-vendor/create-new-vendor.component';
import { PurchaseQuotationReportComponent } from './purchase-quotation-report/purchase-quotation-report.component';
import { PurchaseorderReportComponent } from './purchaseorder-report/purchaseorder-report.component';
import { PurchaseinvoicereportComponent } from './purchaseinvoicereport/purchaseinvoicereport.component';
import { PurchasereturnreportComponent } from './purchasereturnreport/purchasereturnreport.component';
import { GrnReportsComponent } from './grn-reports/grn-reports.component';


@NgModule({
  declarations: [PurchaseQuotationComponent, CreatePurchaseQuotationComponent, PurchaseOrderComponent, CreatePurchaseOrderComponent,
     VendorComponent, CreateVendorComponent, PurchaseInvoiceComponent, CreatePurchaseInvoiceComponent, RFQComponent, MRNComponent,
     PurchaseIndentComponent, PurchaseIndentsComponent, RFQOverviewComponent, MRNOverviewComponent, VendorCentralComponent, VendorTypeComponent,
     CreateVendorTypeComponent,
     VendorGroupComponent,
     CreateVendorGroupComponent,
     PurchaseReturnsComponent,
     CreatePurchaseReturnsComponent,
     CreateNewVendorComponent,
     PurchaseQuotationReportComponent,
     PurchaseorderReportComponent,
     PurchaseinvoicereportComponent,
     PurchasereturnreportComponent,
     GrnReportsComponent],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    PurchasesRoutingModule,
    SharedModuleModule,
    RouterModule.forChild(
      [
        { path: 'PurchaseQuotation', component: PurchaseQuotationComponent, pathMatch: 'full' },
        { path: 'PurchaseInvoice', component: PurchaseInvoiceComponent, pathMatch: 'full' },
        { path: 'CreatePurchaseInvoice', component: CreatePurchaseInvoiceComponent, pathMatch: 'full' },
        { path: 'PurchaseOrder', component: PurchaseOrderComponent, pathMatch: 'full' },
        { path: 'CreatePurchaseQuotation', component: CreatePurchaseQuotationComponent, pathMatch: 'full' },
        { path: 'CreatePurchaseOrder', component: CreatePurchaseOrderComponent, pathMatch: 'full' },
        { path: 'Vendor', component: VendorComponent, pathMatch: 'full' },
        { path: 'CreateVendor', component: CreateVendorComponent, pathMatch: 'full' },
        { path: 'CreateRFQ', component: RFQComponent, pathMatch: 'full' },
        { path: 'CreateMRN', component: MRNComponent, pathMatch: 'full' },
        { path: 'CreatePurchaseIndent', component: PurchaseIndentComponent, pathMatch: 'full' },
        { path: 'PurchaseIndents', component: PurchaseIndentsComponent, pathMatch: 'full' },
        { path: 'RFQ', component: RFQOverviewComponent, pathMatch: 'full' },
        { path: 'MRN', component: MRNOverviewComponent, pathMatch: 'full' },
        { path: 'VendorType', component: VendorTypeComponent, pathMatch: 'full' },
        { path: 'CreateVendorType', component: CreateVendorTypeComponent, pathMatch: 'full' },
        { path: 'CreateVendorGroup', component: CreateVendorGroupComponent, pathMatch: 'full' },
        { path: 'VendorGroup', component: VendorGroupComponent, pathMatch: 'full' },
        { path: 'PurchaseReturns', component: PurchaseReturnsComponent, pathMatch: 'full' },
        { path: 'CreatePurchaseReturns', component: CreatePurchaseReturnsComponent, pathMatch: 'full' },
        { path: 'CreateNewVendor', component: CreateNewVendorComponent, pathMatch: 'full' },
        { path: 'VendorCentral', component: VendorCentralComponent, pathMatch: 'full' },
        { path: 'PurchaseQuotationReport', component:PurchaseQuotationReportComponent , pathMatch: 'full' },
        { path: 'PurchaseorderReport', component: PurchaseorderReportComponent, pathMatch: 'full' },
        { path: 'PurchaseInvoiceReport', component: PurchaseinvoicereportComponent, pathMatch: 'full' },
        { path: 'PurchaseReturnReports', component:PurchasereturnreportComponent , pathMatch: 'full' },
        { path: 'GrnReports', component: GrnReportsComponent, pathMatch: 'full' }
      
      ]
    )
  ],
  exports: [RouterModule]
})
export class PurchasesModule { }
