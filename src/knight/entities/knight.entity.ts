import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

export class Knight {
  id?: string;
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

  private constructor(props: Knight, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  static create(props: Knight) {
    const knight = new Knight(props);

    const getAge = moment(knight.birthday, 'YYYY-MM-DD').fromNow();

    knight.age = parseInt(getAge, 10);

    return knight;
  }
}
