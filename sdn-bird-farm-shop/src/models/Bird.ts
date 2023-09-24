export interface BirdInterface {
    BirdID: String,
    BirdName: String,
    Age: number,
    TypeOfBird: TypeOfBirdInterface,
    Gender: boolean,
    Status: BirdStatusInterface,
    Description: String,
    Fertility: number,
    Feedback: String,
    Rating: number,
    Price: number,

}

export interface TypeOfBirdInterface{
    TypeID: String,
    TypeName: String,
    AbilityBirdMatching: number,
    Quantity: number,

}

export interface BirdStatusInterface{
    StatusID: String,
    StatusName: String,
}

export interface NestInterface{

}

export interface MedicalInterface {

}