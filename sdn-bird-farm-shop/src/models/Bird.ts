export interface BirdInterface {
  _id: string;
  birdName: string;
  age: number;
  typeID: TypeOfBirdInterface;
  images: string[];
  gender: boolean;
  status: boolean;
  description: string;
  fertility: boolean;
  feedback: string;
  rating: number;
  price: number;
  typeOfProduct: string;
  quantity: number;
  birdColor: string;
  breedingTimes: number;
}

export interface TypeOfBirdInterface {
  _id: string;
  nameType: string;
  quantity: number;
}

export interface BirdStatusInterface {
  StatusID: string;
  StatusName: string;
}

export interface NestInterface {}

export interface MedicalInterface {}
