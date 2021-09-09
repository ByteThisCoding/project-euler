export class Combinations {

    public static getNPermutations(n: number, choices: number[]): string[] {
        return this.doGetNPossibilities(n, choices, true);
    }

    public static getNPossibilities(n: number, choices: number[]): string[] {
        return this.doGetNPossibilities(n, choices, false);
    }
    
    private static doGetNPossibilities(n: number, choices: number[], unique: boolean): string[] {
        if (n === 0) {
            return [];
        }
        if (n === 1) {
            return choices.map(choice => `${choice}`);
        }

        let allChoices: string[] = [];

        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            const choicesRemaining = unique
                ? choices.filter(rchoice => rchoice !== choice)
                : choices;

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