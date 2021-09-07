export class Combinations {

    public static getNPermutations(n: number, choices: number[]): string[] {
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

}