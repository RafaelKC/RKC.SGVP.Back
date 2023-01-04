import { Category } from 'src/app/category/entities/category.entity';
import { Brand } from 'src/global/enums';
import { Response } from 'express';

export class TestUtils {
  private _UUIDs: Array<string> = [
    '7b01a633-854b-44d0-8f55-ce29bb53de87',
    'b3fa8c3b-77b9-4420-bd24-a5d88e9e8e03',
    '8a06105a-1959-415c-84fe-b2c04d3b927e',
    'fcb7e995-5f91-4cbf-9758-030027f039fc',
    '87383665-2704-4cb4-a79b-9dba5a9b9ffd',
    'e55de7ea-4462-49d3-95bc-faf7ecdd77c9',
    '7e4e8fe1-05df-462b-8a4f-18c1ad45db15',
    '41521426-1857-401a-8362-14dbce7c844c',
    '5115e1d2-da04-44f0-9106-d36df7dcbc91',
    'f7d26e42-7218-40a9-9737-ebe13d510f50',
  ];
  public get UUIDs(): Array<string> {
    return this._UUIDs;
  }

  private _Strings: Array<string> = [
    'Z40VsP9a0F',
    'FmGh6p8ceA',
    'qCH9jNeazc',
    'zXBySNDCAM',
    'R6opjSDmUg',
    'dc5Jx0krWg',
    'FYhsI9qlwq',
    'A0XiTShthP',
    'BIJBmnCJBH',
    'xs4iqQMC3J',
  ];
  public get Strings(): Array<string> {
    return this._Strings;
  }

  private _Ints: Array<number> = [14, 51, 64, 11, 42, 64, 45, 34, 13, 51];
  public get Ints(): Array<number> {
    return this._Ints;
  }

  private _Floats: Array<number> = [99.32, 47.38, 34.23, 54.54, 25.58, 99.29, 2.63, 32.23, 54.93, 86.4];
  public get Floats(): Array<number> {
    return this._Floats;
  }

  public _Categories: Array<Category> = [
    {
      brand: Brand.Demillus,
      id: this._UUIDs[0],
      isActive: true,
      name: this._Strings[0],
    } as Category,
    {
      brand: Brand.Natura,
      id: this._UUIDs[1],
      isActive: true,
      name: this._Strings[1],
    } as Category,
    {
      brand: Brand.Demillus,
      id: this._UUIDs[2],
      isActive: false,
      name: this._Strings[2],
    } as Category,
  ];
  public get Categories(): Array<Category> {
    return this._Categories;
  }
  public get Response(): Response {
    const res = {} as Response;

    res.send = (valeu: any): Response => {
      res.sendDate = valeu;
      return res;
    };

    res.status = (valeu: number): Response => {
      res.statusCode = valeu;
      return res;
    };

    return res;
  }
}
