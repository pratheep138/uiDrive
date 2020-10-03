import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataServiceService } from './../../../services/data-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  public products: any;
  public itemName: any;
  public itemDesc: any;
  public itemPrice: any;
  public itemImageUrl: any;

  public priceList: any;
  public filteredData: any;
  public showGrid: boolean;
  public showFilters: boolean;

  constructor(private readonly dataServiceService: DataServiceService, private readonly router: Router, private readonly toaster: ToastrService) { }

  ngOnInit(): void {
    this.showGrid = true;
    this.showFilters = true;
    this.products = sessionStorage.getItem('productsList') ? JSON.parse(sessionStorage.getItem('productsList')) : this.getProducts();
    this.filteredData = this.products;
    this.priceList = [{priceTage: '$50 To $100', value: {min: 50, max: 100}}, {priceTage: '$100 to $200', value: {min: 100, max: 200}},
     {priceTage: '$200 & Above', value: {min: 200, max: 1000}}];
  }

  public getProducts(): any {
    this.dataServiceService.getProducts('assets/data.json').subscribe(resp => {
      this.products = resp;
      sessionStorage.setItem('productsList', JSON.stringify(resp));
    }, (err) => {
      this.toaster.error(err);
    });
  }

  public navigateTo(id: string): void {
    this.router.navigateByUrl('/details/' + id);
  }

  public filterItems(price: any): void{
    const filteredData = [];
    this.products.forEach(element => {
      if (element.price > price.min && element.price < price.max){
          filteredData.push(element);
      }
      this.filteredData = filteredData;
    });
  }

  public clearFilter(): void{
    this.showGrid = false;
    this.showFilters = false;
    this.filteredData = this.products;
    setTimeout(() => {
      this.showGrid = true;
      this.showFilters = true;
    }, 200);
    setTimeout(() => {
      this.createCloseBtn();
    }, 500);
  }

  public changeColor(id, event: any): void{
    if (event.target.style.color === ''){
      event.target.style.color = 'orange';
    } else if (event.target.style.color === 'orange') {
      event.target.style.color = '';
    }
  }

  public viewGallary(id, event: any): void{
    document.getElementById('butn'+id).style.visibility = 'hidden';
    document.getElementById('butnC'+id).style.visibility = 'hidden';
    document.getElementById('desc'+id).style.visibility = 'hidden';
    document.getElementById('icon'+id).style.visibility = 'hidden';
    document.getElementById('close'+id).style.visibility = 'visible';
  }

  public clearEv(id): void{
    document.getElementById('butn'+id).style.visibility = 'visible';
    document.getElementById('butnC'+id).style.visibility = 'visible';
    document.getElementById('desc'+id).style.visibility = 'visible';
    document.getElementById('icon'+id).style.visibility = 'visible';
    document.getElementById('close'+id).style.visibility = 'hidden';
  }

  public createCloseBtn(): void{
    for (const i of this.filteredData){
      document.getElementById('close'+i.id).style.visibility = 'hidden';
    }
  }

  public mouseEnter(id): void{
    document.getElementById('desc'+id).style.visibility = 'hidden';
  }

  public mouseLeave(id): void{
    document.getElementById('desc'+id).style.visibility = 'visible';
  }

  ngAfterViewInit(): void{
    this.createCloseBtn();
  }

  ngOnDestroy(): void {}

}
