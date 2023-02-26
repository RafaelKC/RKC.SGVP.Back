export abstract class IInventory {
  public productId: string;
  public buyId: string;
  public buyPrice: number;
  public quantity: number;
  public forecastPrice: number;
  public inInventory: boolean;
  public createDate: Date;
  public updateDate: Date;
  public deleteDate: Date;
  public isDeleted: boolean;
}
