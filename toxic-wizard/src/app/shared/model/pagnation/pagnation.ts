export class Pagnation {
    startIndex: number;
    pageNumber: number;
    totalItems: number;
    resultsLength: number;

    constructor(){
        this.startIndex = 0;
        this.pageNumber = 1;
        this.resultsLength = 10;
        
        this.totalItems = 0;
    }
}

