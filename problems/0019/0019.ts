import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution19 extends AbstractSolution {

    getProblemName(): string {
        return "Counting Sundays";
    }

    protected solve(): number {
        return this.doSolve();   
    }

    /**
     * Iterate over the months of each year in question
     * @returns 
     */
    private doSolve(): number {
        let numSundays = 0;

        let lastMonthStartDay = 1;

        for (let year = 1900; year<2001; year++) {

            for (let month = 1; month<13; month++) {
                let thisMonthStartDay: number;
                if (month < 12) {
                    thisMonthStartDay = this.getNextMonthStartDay(
                        year,
                        month,
                        lastMonthStartDay
                    );
                } else {
                    thisMonthStartDay = this.getNextMonthStartDay(
                        year + 1,
                        1,
                        lastMonthStartDay
                    );
                }

                if (year !== 1900 && thisMonthStartDay === 0) {
                    numSundays ++;
                }

                lastMonthStartDay = thisMonthStartDay;
            }
        }

        return numSundays;
    }

    /**
     * Get the day of the week the next month will start on
     * @param currentYear 
     * @param currentMonth 
     * @param previousMonthStartDay 
     * @returns 
     */
    private getNextMonthStartDay(
        currentYear: number,
        currentMonth: number,
        previousMonthStartDay: number,
    ): number {
        let numDaysInCurrentMonth: number;

        //switch over current month to decide how many days in that month
        switch (currentMonth) {
            case 2:
                numDaysInCurrentMonth = 28 +
                    (this.isLeapYear(currentYear) ? 1 : 0);
                break;
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                numDaysInCurrentMonth = 31;
                break;
            default:
                numDaysInCurrentMonth = 30;
        }

        const nextDay = ((numDaysInCurrentMonth % 7) + previousMonthStartDay) % 7;
        return nextDay;
    }

    /**
     * Check if any given year is a leap year using the logic given in the problem
     * @param currentYear 
     * @returns 
     */
    private isLeapYear(currentYear: number): boolean {
        return currentYear % 4 === 0
            && (
                currentYear % 100 !== 0
                ||
                currentYear % 400 === 0
            );
    }

    /**
     * 
     * 01/01/1900 ==> Monday
     * 02/01/1900 ==> 31 % 7 + 1 ==> Thursday
     * 03/01/1900 ==> 28 % 7 + 4 ==> Thursday
     * 04/01/1900 ==> (31 % 7 + 4) % 7 ==> Sunday
     * 
     */

}