import { InMemoryDbService } from 'angular-in-memory-web-api'

import { ScenarioKPIVM, ScenarioKPIScoreVM } from '../scenario/scenario-create-edit/non-financial-integer-scores-modal/non-financial-integer-scores-modal.component'


export class InMemoryDb implements InMemoryDbService {

    createDb() {
        let scenarioKPIVM: Array<ScenarioKPIVM> = [
            {
                KPIId: "1",
                RelativeWeightage: 2,
                Scores: <Array<ScenarioKPIScoreVM>>[

                ],
                Name: "Chris",
                Type: "",
                isSelected: false
            }
        ];
        return { scenarioKPIVM };
    }
}