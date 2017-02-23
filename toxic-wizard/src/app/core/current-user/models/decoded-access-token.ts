export class DecodedAccessToken {
    public role: Array<string>
    public product: Array<string>
    public viability_access: Array<string>
    public amr: string | Array<string>
    public aud: string | Array<string>
    public auth_time: number
    public client_id: string
    public exp: number
    public idp: string
    public iss: string
    public nbf: number
    public scope: string | Array<string>
    public sub: string
}
