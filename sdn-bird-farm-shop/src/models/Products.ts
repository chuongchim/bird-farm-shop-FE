import { BirdInterface, MedicalInterface, NestInterface } from "./Bird";

export interface ProductInterface {
    Products: BirdInterface | NestInterface | MedicalInterface,
    Quantities: number


}