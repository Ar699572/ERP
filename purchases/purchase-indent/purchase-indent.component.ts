import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-indent',
  templateUrl: './purchase-indent.component.html',
  styleUrls: ['./purchase-indent.component.css']
})
export class PurchaseIndentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Search(){
    this.router.navigate(['Purchase/PurchaseIndents']);

  }
}
