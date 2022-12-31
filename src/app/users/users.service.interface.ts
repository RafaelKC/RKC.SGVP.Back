import { IUser } from "rkc.base.back";

export abstract class IUsersService {
    public abstract create(user: IUser): Promise<boolean>
}