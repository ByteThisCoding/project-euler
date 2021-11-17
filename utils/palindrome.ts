export class Palindrome {

    /**
     * Determine if a string | number is a palindrome
     * @param input 
     * @returns 
     */
    public static isPalindrome(input: string | number): boolean {
        if (typeof input === 'number') {
            input = `${input}`;
        }

        const limit = Math.floor(input.length/2);
        for (let i=0; i<limit; i++) {
            if (input[i] !== input[input.length - i - 1]) {
                return false;
            }
        }

        return true;
    }

}