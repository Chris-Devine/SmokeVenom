import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    private _product: Product = new Product();
    public get product() : Product {
        return this._product;
    }
    
    
    private _viabilityAccess: ViabilityAccess = new ViabilityAccess();
    public get viabilityAccess(): ViabilityAccess {
        return this._viabilityAccess;
    }
    
}

export class Product {

    private _viability: string = "viability";
    public get viability(): string {
        return this._viability;
    }

    private _clarity: string = "clarity";
    public get clarity(): string {
        return this._clarity;
    }

}

export class ViabilityAccess {

    
    private _read: string = "viabilityRead";
    public get read() : string {
        return this._read;
    }
    
    private _write: string = "viabilityWrite";
    public get write() : string {
        return this._write;
    }

}