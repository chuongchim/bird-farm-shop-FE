export interface BirdInterface {
    productID: string,
    productName: string,
    age: number,
    typeOfBirdID: string,
    images: string[],
    gender: boolean,
    Status: boolean,
    description: string,
    fertility: number,
    feedback: string,
    rating: number,
    price: number,
    typeOfProduct: string,
    quantity: number,
    birdColor: string,
    breedingTimes: number

}

export interface TypeOfBirdInterface{
    typeID: string,
    typeName: string,
    quantity: number,

}

export interface BirdStatusInterface{
    StatusID: string,
    StatusName: string,
}

export interface NestInterface{

}

export interface MedicalInterface {

}