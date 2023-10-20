export interface BirdInterface {
  birdID: String;
  birdName: String;
  age: number;
  typeOfBird: TypeOfBirdInterface;
  gender: boolean;
  status: BirdStatusInterface;
  description: String;
  fertility: number;
  feedback?: String;
  rating?: number;
  price: number;
  image: String[];
}

export interface TypeOfBirdInterface {
  typeID: String;
  typeName: String;
  abilityBirdMatching: number;
  quantity: number;
}

export interface BirdStatusInterface {
  statusID: String;
  statusName: String;
}

export interface NestInterface {}

export interface MedicalInterface {}
