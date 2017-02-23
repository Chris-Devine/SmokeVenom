export class LoadingOverlay {
    private _isLoading: boolean;
    public get isLoading(): boolean {
        return this._isLoading;
    }
    public set isLoading(v: boolean) {
        this._isLoading = v;
    }


    private _displayMessage: string;
    public get displayMessage(): string {
        return this._displayMessage;
    }
    public set displayMessage(v: string) {
        this._displayMessage = v;
    }

    constructor() {
        this._isLoading = false;
        this._displayMessage = "";
    }
}
