import { ProductInterface } from "./Products";
import { UserInterface } from "./User";

export interface OrderInterface {
    OrderID: String,
    CustomerID: UserInterface,
    Products: ProductInterface,
    Note: String,
    Amount: number,
    StartDay: Date,
    OrderStatus: OrderStatusInterface,
    Shipper: UserInterface,

}

export interface OrderStatusInterface { 
    StatusID: number,
    StatusName: String,
}

