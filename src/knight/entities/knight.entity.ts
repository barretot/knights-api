import { v4 as uuid } from 'uuid';
export class Knight {
  id?: string;
  name: string;
  nickname: string;
  birthday: Date;
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

  constructor(props: Knight) {
    if (!props.id) {
      this.id = uuid();
    }
    Object.assign(this, props);
  }

  static create(props: Knight): any {
    const knight = new Knight(props);

    return knight;
  }
}
