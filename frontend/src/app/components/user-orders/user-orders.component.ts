import { Component, OnInit } from '@angular/core';

import { UserServiceService } from 'src/app/services/user-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  productDetails: any[] = [];
  updatedOrder: any[] = []; // New array to hold updated order items with product details

  constructor(
    private OrderService: UserServiceService,
    
    private productservice: ProductService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId') as string;

    this.OrderService.getUserOrders(userId).subscribe(
      (response: any[]) => {
        this.productDetails = response; // Assign the received order items to productDetails
        console.log(this.productDetails); // You can check the response in the console

        for (const item of this.productDetails) {
          this.getProductDetails(item.productID);
        }
      },
      (error: any) => {
        console.log(error); // Handle the error if necessary
      }
    );
  }

  getProductDetails(productId: string) {
    this.productservice.getProductById(productId).subscribe(
      (response: any) => {
        const updatedItem = {
          ...this.productDetails.find((item) => item.productID === productId),
          productName: response.productName,
          image: response.image
        };
        this.updatedOrder.push(updatedItem); // Add the updated item to the updatedOrder array
        console.log(this.updatedOrder); // You can check the updated order items in the console
      },
      (error: any) => {
        console.log(error); // Handle the error if necessary
      }
    );
  }
}
