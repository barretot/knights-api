import { v4 as uuid } from 'uuid';

export class Knight {
  readonly id?: string;
  name: string;
  nickname: string;
  birthday: string;
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

  private constructor(props: Knight, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id === uuid();
    }
  }

  static create(props: Knight) {
    const knight = new Knight(props);

    return knight;
  }
}
