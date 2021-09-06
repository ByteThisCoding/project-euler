import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution32 extends AbstractSolution {

    getProblemName(): string {
        return "Pandigital Products";
    }

    protected solve(): any {
        const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        //We did not actually need the first case
        //Leaving code in here for anyone who is interested

        //const firstCasePandigitals = this.enumerateDigits(choices);
        const secondCasePandigitals = this.findSecondCasePandigital(choices);

        return [/*...firstCasePandigitals, */...secondCasePandigitals].reduce((acc, digitStr) => {
            return acc + parseInt(digitStr);
        }, 0);
    }

    private enumerateDigits(choices: number[]): string[] {
        if (choices.length === 1) {
            return [`${choices[0]}`];
        }

        const enumeration: string[] = [];
        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            const remainingChoices = choices.filter(rchoice => rchoice !== choice);
            const subEnumerations = this.enumerateDigits(remainingChoices);
            subEnumerations.forEach(substr => {
                enumeration.push(`${choice}${substr}`);
            });
        }
        return enumeration;
    }

    private findSecondCasePandigital(choices: number[]): string[] {
        //length of a + length of b + length of answer === choices.length
        //let pandigitals: string[] = [];
        let pandigitals = new Set<string>();

        //first, iterate over length of a
        for (let aCount = 1; aCount <= choices.length - 2; aCount++) {

            //get a full list of ints with aCount length
            const aChoices = this.getNPermutations(aCount, choices);

            //iterate over a choices
            for (let aChoiceIndex = 0; aChoiceIndex < aChoices.length; aChoiceIndex++) {

                const aChoice = aChoices[aChoiceIndex];
                const aChoiceInt = parseInt(aChoice);

                //iterate over length of b based on length of a
                const bLimit = Math.min(aCount, choices.length - aCount - 1);
                for (let bCount = 1; bCount <= bLimit; bCount++) {

                    const bChoicesAvailable = choices.filter(
                        choice => aChoice.indexOf(`${choice}`) === -1
                    );

                    //get available b choices
                    const bChoices = this.getNPermutations(bCount, bChoicesAvailable);

                    //iterate over b choices
                    for (let bChoiceIndex=0; bChoiceIndex<bChoices.length; bChoiceIndex++) {

                        const bChoice = bChoices[bChoiceIndex];
                        const bChoiceInt = parseInt(bChoice);

                        //multiply a and b, see if result completes the pandigital requirement
                        const abProduct = aChoiceInt*bChoiceInt;
                        const totalDigitsStrAr = Array.from(
                            `${abProduct}${bChoice}${aChoice}`
                        );
                        if (totalDigitsStrAr.length === choices.length) {
                            const totalDigits = totalDigitsStrAr.map(digit => parseInt(digit));
                            totalDigits.sort((a, b) => a - b);
                            let isEqual = true;
                            for (let i=0; isEqual && i<choices.length; i++) {
                                if (totalDigits[i] !== choices[i]) {
                                    isEqual = false;
                                }
                            }
                            if (isEqual) {
                                pandigitals.add(`${abProduct}`);
                            }
                        }
                    }

                }
            }
        }
        return Array.from(pandigitals);
    }

    private getNPermutations(n: number, choices: number[]): string[] {
        if (n === 0) {
            return [];
        }
        if (n === 1) {
            return choices.map(choice => `${choice}`);
        }

        let allChoices: string[] = [];

        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            const choicesRemaining = choices.filter(rchoice => rchoice !== choice);
            const subChoices = this.getNPermutations(n - 1, choicesRemaining);
            subChoices.forEach(substr => {
                allChoices.push(
                    `${choice}${substr}`
                )
            });
        }

        return allChoices;
    }


    /**
     * 
     * aLen * bLen = Math.max(aLen, bLen)
     * 
     * bLen <= choices.length - aLen
     * 
     */

}