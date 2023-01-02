import { User } from "rkc.base.back";
import { UserLogin } from "./dtos/user-login.dto";

export abstract class iAuthenticationService {
    public abstract validateUser(userLogin: UserLogin): Promise<User | null>
}
