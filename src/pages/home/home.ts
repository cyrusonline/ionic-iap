import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
const product1 = 'sku_add_mult';
const  product2 = 'sku_as_basic ';
const  product3 = 'sku_as_gt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  monthlySub =false;
  specialGame= false;
  products = [];
crystalCount = 0;
previousPurchases = [];


  constructor(public navCtrl: NavController, private plt: Platform, private iap: InAppPurchase) {
    this.plt.ready().then(()=>{
      if(this.plt.is('cordova')){
        this.iap.getProducts([product1,product2,product3])
        .then(products =>{
          console.log('products:',products);
          this.products = products;
        })
      }
   
    })
    .catch(err=>{
      console.log('my error',err);
    })
  }

  buy(product){
    this.iap.buy(product).then(data=>{
      this.enableItems(product);
      
    })
  }

  restore(){
    this.iap.restorePurchases().then(purchases =>{
      this.previousPurchases = purchases;

      for(let prev of this.previousPurchases){
        this.enableItems(prev.productId);
      }
    })

    

  }

  enableItems(id){
    if(id === product1){
      this.crystalCount +=100
    }else if(id === product2){
      this.specialGame = true
    }else if(id === product3){
      this.monthlySub = true
    }
  }

}
