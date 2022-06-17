import { v4 as uuid } from 'uuid';

export default abstract class Entity<P> {
  public readonly id: string;

  constructor(props: P, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
