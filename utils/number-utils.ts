export class NumberUtils {


    public static isPerfectSquare(n: number): boolean {
        const lastDigit = n % 10;
        if ([0, 1, 4, 5, 6, 9].indexOf(lastDigit) === -1) {
            return false;
        }
        
        return Number.isInteger(Math.sqrt(n));
    }

    public static getDigitalRoot(n: number): number {
        let root = n;
        while (root > 9) {
            root = Array.from(root.toString()).reduce((acc, char) => {
                return acc + parseInt(char);
            }, 0);
        }
        return root;
    }
}