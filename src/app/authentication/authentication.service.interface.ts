import { User } from "rkc.base.back";
import { LoginResult } from "./dtos/login-result.dto";
import { UserLogin } from "./dtos/user-login.dto";

export abstract class iAuthenticationService {
    public abstract validateUser(userLogin: UserLogin): Promise<User | null>
    public abstract login(user: User): LoginResult
}
