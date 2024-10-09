import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-menu-pages',
  templateUrl: './menu-pages.component.html',
  styleUrls: ['./menu-pages.component.css']
})
export class MenuPagesComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) 
  {
    this.MenuName="";
    
  //   this.router.routeReuseStrategy.shouldReuseRoute = function(){
  //   return false;
  // }


}


  MenuName="";
  ngOnInit() {
var that=this;
    this.route.queryParams.subscribe(params => {
      debugger;
      this.MenuName = params['MenuName'];

      this.FormList = JSON.parse(localStorage.getItem('Menu'));

     
     
     });

   
 
    }


GetSubMenu(MenuName)

{

  try{
    return this.lstSubMenu.filter(x => x.MenuName==MenuName);
   
    }catch(e)
    {
  console.log('error' + e)
    }




}

GetFormList(SubMenuName,MenuName)
{

  
  try{
    return this.FormList.filter(x => x.MenuName==MenuName && x.SubMenuName==SubMenuName);
    }catch(e)
    {
  
    }


}



    FormClick(Path)
    {

var Window=' <div  class="modal fade" id="ctrCreateCustomer"  role="dialog"   style="overflow:hidden;">';
Window+='<div class="modal-dialog modal-dialog-centered modal-lg" role="document">';
Window+='<div class="modal-content">';
Window+='<div class="modal-header">';
Window+='<h5 class="modal-title" id="ShipingId">Add / Modify Shipping</h5>';
Window+='<p *ngIf="showError" style="float: right" ><font color="red">{{errormsg}}</font></p>';
Window+=' <button type="button"  id="btnClosePackageItems" class="close" data-dismiss="modal" aria-label="Close">';
Window+='  <span aria-hidden="true">&times;</span>';
Window+=' </button>';
Window+=' </div>';
Window+='   <div class="modal-body" style="width:100%;height:100%" >';
Window+='<router-outlet name="modal"><app-create-customer></app-create-customer></router-outlet>';
       
Window+='  </div>';
        
Window+='  </div>';
Window+='</div>';
Window+='</div>';
debugger;
$("#showModel").html(Window);

//$("#ctrCreateCustomer").load("http://localhost:8201/#"+Path);

   (window as any).$("#ctrCreateCustomer").modal();

   //this.router.navigate([{ outlets: { modal: Path }}])

    }
    ApplicationLivePages:any=[];
  
    MenuClick(Data)
 {
debugger;
  //this.FormClick(Path)
  try{
    this.ApplicationLivePages=  JSON.parse(localStorage.getItem("ApplicationLivePages"));

    if(this.ApplicationLivePages==null)
    {

      this.ApplicationLivePages=[];

    }
    }catch(e)
    {

      
    }

    if(this.ApplicationLivePages.length<10)
    {

  var  IsTabExists=false;
  var SelectedRouteName="";
  var SelectedNavigateURL="";
    this.ApplicationLivePages=this.ApplicationLivePages==null?[]:this.ApplicationLivePages;
//  / this.ApplicationLivePages=(this.ApplicationLivePages==null||this.ApplicationLivePages=="[object Object]")?[]:this.ApplicationLivePages;
for(let i=0;i<this.ApplicationLivePages.length;i++)
{

  this.ApplicationLivePages[i]._IsActive=false;
debugger;
 // if( i==this.ApplicationLivePages.length-1)
  {
   // this.ApplicationLivePages[i]._IsActive=true;
    SelectedRouteName=this.ApplicationLivePages[i]._RouteName;
    SelectedNavigateURL= this.ApplicationLivePages[i]._Url;
    IsTabExists=true;
  }

}

//if(!IsTabExists)
{
  let  objTabs=new  ApplicationTabs();

   objTabs.IsActive=true;
   debugger;
   objTabs.ParentTabName=this.MenuName;
   objTabs.TabName=Data.Title;
   objTabs.Url=Data.NavigateURL;
   var RouteNumber=this.NavigatedActivatedRoute();
   objTabs.RouteNumber=RouteNumber;
   objTabs.RouteName='router'+RouteNumber;
   this.ApplicationLivePages.push(objTabs);

   
   debugger;
   SelectedRouteName=objTabs.RouteName;
   SelectedNavigateURL=objTabs.Url;
  //this.router.isActive(Data.NavigateURL,true)

 
}
localStorage.setItem("TabStatusChange","True");
   localStorage.setItem("ApplicationLivePages",JSON.stringify(this.ApplicationLivePages));
localStorage.setItem("ActivatedRoute",SelectedRouteName);
  this.router.navigate([SelectedNavigateURL]);
}else{


  (window as any).swal({
    icon: "warning",
    title:  "Maximum  Form  Size Exceed.",
    text:"please Close one Form to open new one  ",
 
   
    dangerMode: true,
  }).then(function(isConfirm) {
    
    if (isConfirm) {

    
    }else {
    //  (window as any). swal("Cancelled", "this file is not updated :)", "error");
    }


  });


  
}
// [{ outlets: { primary: 'Sales', router1: 'Customer'}}]
//this.router.navigate([ { outlets: { primary: 'Sales', router1: 'Customer'} ]);

//.this.router.navigate( ['Sales', {outlets: {router1: ['Customer']}}]  );

debugger;

//this.router.navigate([{outlets:{router1:['Customer']}}]);
  // switch(RouteNumber)
  // {
  // case 1:
  // {
  // //this.router.navigate([Data.NavigateURL,{ outlets: { router1:'router1'} }], { skipLocationChange: true });
  // this.router.navigate( ['Sales', {outlets: {router1: ['Customer']}}] );
  
  // break;
  // }


  // case 2:
  //   {
  //  // this.router.navigate([Data.NavigateURL,{ outlets: { router2: 'router2' } }], { skipLocationChange: true });
  //  this.router.navigate( ['Sales', {outlets: {router2: ['Customer']}}]  );
  //   break;
  //   }

    
  //   case 3:
  // {
  //   this.router.navigate( ['Sales', {outlets: {router3: ['Customer']}}]  );

  // break;
  // }



  // case 4:
  // {
  //   this.router.navigate( ['Sales', {outlets: {router4: ['Customer']}}]  );

  // break;
  // }



  // case 5:
  // {
  //   this.router.navigate( ['Sales', {outlets: {router5: ['Customer']}}]  );

  // break;
  // }






  // }

 }


 NavigatedActivatedRoute():number
 {

for(let i=1;i<11;i++)
{

  
  if(!this.ApplicationLivePages.some(e => e._RouteNumber ===i))
  {

    return i;
    break
  }
}






 }
    lstSubMenu:any  = [];
 
 FormList:any  = [];
 
ngAfterViewInit()
{

  
  debugger;
 

  this.lstSubMenu = this.FormList.filter((thing, i, arr) => {
    return arr.indexOf(arr.find(t => (t.SubMenuName === thing.SubMenuName && t.MenuName === thing.MenuName  ))) === i;
   });


   var FFormList = this.FormList.filter((thing, i, arr) => {
    return arr.indexOf(arr.find(t => ( t.Title === thing.Title && t.MenuName ===this.MenuName ))) === i;
   });

this.FormList=FFormList;


  $([document.documentElement, document.body]).animate({
    scrollTop: $("#divMain").offset().top
}, 2000);


  $([document.documentElement, document.body]).animate({
    scrollTop: $("#divSearchMenu").offset().top-75,
    scrollLeft: $("#divSearchMenu").offset().left
}, 2000);
}



// var element = document.getElementById('divSearchMenu'); 
//     var rect = element.getBoundingClientRect();

// //window.scrollTo(rect.left, rect.top);
// debugger;

//   $([document.documentElement, document.body]).animate({
//     scrollTop: (rect.top),
//     scrollLeft: (rect.left)
// }, 2000);
}
class ApplicationTabs
{



  private _RouteNumber:number;
  get RouteNumber()
  {
  
  return this._RouteNumber;
  
  }
  
set  RouteNumber(val)
{

this._RouteNumber=val;


}

  private _RouteName;
  get RouteName()
  {
  
  return this._RouteName;
  
  }
  
set  RouteName(val)
{

this._RouteName=val;


}


private _ParentTabName;
get ParentTabName()
{

return this._ParentTabName;

}


set  ParentTabName(val)
{

this._ParentTabName=val;


}


private _TabName;
get TabName()
{

return this._TabName;

}


set  TabName(val)
{

this._TabName=val;


}


   
private _Url;
get Url()
{

return this._Url;

}


set  Url(val)
{

this._Url=val;


}



private _IsActive;
get IsActive()
{

return this._IsActive;

}


set  IsActive(val)
{

this._IsActive=val;


}



 







}
