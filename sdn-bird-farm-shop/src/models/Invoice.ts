import { OrderInterface } from "./Order";

export interface InvoiceInterface {
    InvoiceID: String,
    PayMent: PaymentInterface,
    InvoiceStatus: boolean,
    StartDate: Date,
    
}

export interface PaymentInterface {
    PaymentID: String,
    Order: OrderInterface,
    TypeOfPayment: boolean,
    GateWay: GateWayInterface

}

export interface GateWayInterface {
    GateWayID: String,
    GateWayName: String,
    GateWayStatus: boolean,
}