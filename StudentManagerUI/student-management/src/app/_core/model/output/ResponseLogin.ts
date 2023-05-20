import { ResponseBase } from "../ResponseBase";

export class ResponseLogin extends ResponseBase {
    Token!: string;
    Account!: UserInfo;
}

export class UserInfo {
    UserName!: string;
    AccountId!: number;
}
