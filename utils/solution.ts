
/**
 * Runner to test solutions and print out how long they took
 */
export abstract class AbstractSolution {

    /**
     * Name of the current problem being solved
     */
    abstract getProblemName(): string;

    async run(): Promise<void> {
        const startDate = new Date();
        console.log(`Running solution for ${this.getProblemName()}`);

        const solution = await this.solve();
        
        const endDate = new Date();
        console.log("SOLUTION: ", solution);
        console.log(`Solution took ${+endDate - +startDate}ms`);
    }

    protected abstract solve(): any;

}

export function RunSolution(constructor: new () => any) {
    new constructor().run();
} 