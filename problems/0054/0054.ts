import { AbstractSolution, RunSolution } from "../../utils/solution";
const fs = require('fs');
const readline = require('readline');

interface iCard {
    value: number;
    suit: string;
}

interface iHand {
    values: {
        value: number;
        count: number;
    }[];
    numSuits: number;
}

@RunSolution
export class Solution54 extends AbstractSolution {

    getProblemName(): string {
        return "Poker Hands";
    }

    protected solve() {
        //return this.doSolve(__dirname+"/poker-test.txt");
        return this.doSolve(__dirname+"/poker.txt");
    }

    private async doSolve(fileName: string): Promise<number> {
        let numLeftHandWins = 0;
        await this.readFileLines(fileName, (line) => {
            const [leftHand, rightHand] = this.mapLineToHands(line);

            const leftHandRank = this.rankHand(leftHand);
            const rightHandRank = this.rankHand(rightHand);

            if (leftHandRank > rightHandRank) {
                numLeftHandWins ++;
            }
        });
        return numLeftHandWins;
    }

    private mapLineToHands(line: string): [iHand, iHand] {
        const leftHandCards: iCard[] = [];
        const rightHandCards: iCard[] = [];

        line.split(" ").forEach((cardStr, index) => {
            if (index > 9) {
                return;
            }

            const [valueStr, suit] = cardStr;
            let value: number = 0;
            switch (valueStr) {
                case "T":
                    value = 10;
                    break;
                case "J":
                    value = 11;
                    break;
                case "Q":
                    value = 12;
                    break;
                case "K":
                    value = 13;
                    break;
                case "A":
                    value = 14;
                    break;
                default:
                    value = parseInt(valueStr);
                    break;
            }

            const card: iCard = {
                value,
                suit
            };
            if (index < 5) {
                leftHandCards.push(card);
            } else {
                rightHandCards.push(card);
            }
        });

        /*console.log(JSON.stringify([this.mapCardsToHand(leftHandCards),
            this.mapCardsToHand(rightHandCards)]))*/

        return [
            this.mapCardsToHand(leftHandCards),
            this.mapCardsToHand(rightHandCards)
        ];
    }

    private async readFileLines(fileName: string, callback: (line: string) => any) {
        const fileStream = fs.createReadStream(fileName);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.
            callback(line);
        }
    }

    private mapCardsToHand(cards: iCard[]): iHand {
        let suitsFound = new Set<string>();

        let hand: iHand = {
            values: [],
            numSuits: 0
        };

        cards = cards.sort((a, b) => b.value - a.value);

        cards.forEach(card => {
            const handValuesIndex = hand.values.findIndex(item => item.value === card.value);
            if (handValuesIndex > -1) {
                hand.values[handValuesIndex].count ++;
            } else {
                hand.values.push({
                    value: card.value,
                    count: 1
                });
            }

            suitsFound.add(card.suit)
        });

        hand.numSuits = suitsFound.size;
        return hand;
    }

    /**
     * Leftmost digit is hand type rank: 1 digit
     * Remaining are tie breakers: 10 digits total
     * 
     * @param hand 
     */
    private rankHand(hand: iHand): number {
        let valueStr = "";
        switch (hand.numSuits) {
            case 1: //royal flush, straight flush, flush
                valueStr = this.rankHandOneSuit(hand);
                break;
            default:
                valueStr = this.rankHandManySuits(hand);
                break;
        }

        return parseInt(valueStr);
    }

    private rankHandOneSuit(hand: iHand): string {
        //flush
        if (!this.handIsStraight(hand)) {
            return `6${this.concatValues(hand).padStart(10, "0")}`
        }

        //royal flush
        if (hand.values[0].value === 14) {
            return `10${this.concatValues(hand).padStart(10, "0")}`;
        }

        //straight flush
        return `9${this.concatValues(hand).padStart(10, "0")}`;
    }

    private rankHandManySuits(hand: iHand): string {
        //four of a kind or full house
        if (hand.values.length === 2) {
            const fourHand = hand.values.find(hv => hv.count === 4);

            //four of a kind
            if (fourHand) {
                const fourValue = fourHand!.value +"";
                const oneValue = hand.values.find(hv => hv.count === 1)!.value+"";

                return `8${fourValue.padStart(2, "0")}${oneValue.padStart(8, "0")}`;
            }

            //full house
            const threeValue = hand.values.find(hv => hv.count === 3)!.value+"";
            const twoValue = hand.values.find(hv => hv.count === 2)!.value+"";
            return `7${threeValue.padStart(5, "0")}${twoValue.padStart(5, "0")}`;
        }

        if (hand.values.length === 5) {
            //straight
            if (this.handIsStraight(hand)) {
                return `5${this.concatValues(hand).padStart(10, "0")}`;
            }

            //high card
            return `1${this.concatValues(hand).padStart(10, "0")}`;
        }

        if (hand.values.length === 3) {
            const threeHand = hand.values.find(hv => hv.count === 3);

            //three of a kind
            if (threeHand) {
                const threeValue = threeHand!.value+"";
                const ones = hand.values.filter(hv => hv.count === 1)
                    .sort((a, b) => b.value - a.value)
                    .map(item => item.value.toString().padStart(2, "0"))
                    .join("");


                return `4${threeValue.padStart(2, "0")}${ones.padStart(8, "0")}`;
            }

            //two pairs
            const twos = hand.values.filter(hv => hv.count === 2)
                    .sort((a, b) => b.value - a.value)
                    .map(item => item.value.toString().padStart(2, "0"))
                    .join("");
            const one = hand.values.find(hv => hv.count === 1)!.value + "";
            return `3${twos.padStart(4, "0")}${one.padStart(6, "0")}`;
        }

        //one pair
        if (hand.values.length === 4) {
            const two = hand.values.find(hv => hv.count === 2)!.value + "";
            const ones = hand.values.filter(hv => hv.count === 1)
                    .sort((a, b) => b.value - a.value)
                    .map(item => item.value.toString().padStart(2, "0"))
                    .join("");

            return `2${two.padStart(2, "0")}${ones.padStart(8, "0")}`;
        }

        console.warn("No hand determined", JSON.stringify(hand));
        throw new Error("No hand determined");
    }

    private handIsStraight(hand: iHand): boolean {
        return hand.values.length === 5 && hand.values[0].value - hand.values[4].value === 4;
    }

    private concatValues(hand: iHand, startIndex=0, endIndex=4): string {
        let str = "";
        for (let i=startIndex; i<=endIndex; i++) {
            str = `${str}${hand.values[i].value.toString().padStart(2, "0")}`;
        }
        //console.log(hand, str);
        return str;
    }

    /**
     * 
     * Ranking a Hand:
     * :: Suit:
     *  --> Number of distinct suits
     *  
     * :: Values:
     *  --> Number of distinct values
     *  --> Number of occurences for each value
     *  --> Values of each card
     * 
     */

}