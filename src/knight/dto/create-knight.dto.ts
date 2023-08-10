export class CreateKnightDto {
  name: string;
  nickname: string;
  birthday: Date;
  age: number;
  weapons: {
    name: string;
    mod: number;
    attr: string;
    equipped: boolean;
  }[];
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  keyAttribute: string;
}
