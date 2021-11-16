/**
 * Base Class which will let us abstract the logic of generating
 * and maintaining a sequence here.
 * 
 * Subclasses of particular sequences won't have to worry about doing all of that
 */
export type IAbstractSequenceType =
    | string
    | number
    | bigint;

export abstract class AbstractSequence<ItemType extends IAbstractSequenceType> {

    protected readonly items: ItemType[] = [];

    constructor() {
        this.items = this.getInitialSequenceItems();
    }

    protected abstract getInitialSequenceItems(): ItemType[];


    getNthItem(n: number): ItemType {
        for (let i = this.items.length + 1; i <= n; i++) {
            const newItem = this.calculateNthItem(i);
            this.items.push(newItem);
        }

        return this.items[n - 1];
    }

    existsInSequence(item: ItemType): boolean {
        return this.getIndexOfItem(item) > -1;
    }

    getIndexOfItem(item: ItemType): number {
        //generate items until we reach the item to compare
        while (this.compareItems(this.getNthItem(this.items.length), item) < 0) {
            this.getNthItem(this.items.length + 1);
        }

        const itemIndex = this.binarySearch(item);
        if (itemIndex.isMatch) {
            return itemIndex.index + 1;
        }

        return -1;
    }

    getSumOfRange(nStart: number, nEnd: number): ItemType {
        let sum = this.getNthItem(nStart);
        for (let i = nStart + 1; i <= nEnd; i++) {
            sum = this.addItems(sum, this.getNthItem(i));
        }
        return sum;
    }

    getItemsInRange(nStart: number, nEnd: number): ItemType[] {
        let items: ItemType[] = [];
        for (let i = nStart; i <= nEnd; i++) {
            items.push(this.getNthItem(i));
        }
        return items;
    }

    getItemsInValueRange(nStart: ItemType, nEnd: ItemType): ItemType[] {
        while (this.compareItems(this.getNthItem(this.items.length), nEnd) < 0) {
            this.getNthItem(this.items.length + 1);
        }

        let startIndex = this.binarySearch(nStart).index;
        let endIndex = this.binarySearch(nEnd).index;

        if (this.compareItems(this.items[startIndex], nStart) < 0) {
            startIndex++;
        }

        if (this.compareItems(this.items[endIndex], nEnd) > 0) {
            endIndex--;
        }
        
        return this.getItemsInRange(startIndex+1, endIndex+1);
    }

    private addItems(a: ItemType, b: ItemType): ItemType {
        switch (typeof a) {
            case 'string':
                return a + (b as string) as ItemType;
                break;
            case 'number':
                return a + (b as number) as ItemType;
                break;
            case 'bigint':
                return a + (b as bigint) as ItemType;
                break;
            default:
                throw new Error("Add Not Implemented for " + typeof a);
        }
    }

    /**
    * This example shows how we can implement a binary search to find a string within a sorted array
    */
    private binarySearch(item: ItemType): {index: number; isMatch: boolean;} {
        //we will begin by including all elements in the array for consideration
        let start = 0;
        let end = this.items.length;

        //be careful when using while (true)
        while (true) {
            //the item to check will be exactly halfway between the start and end index
            //if there are an even number of elements, thus two items in the center, pick the one to the left
            const pos = Math.floor((end - start) / 2 + start);

            //if the position is already the end element, we're done looking, item doesn't exist in ar
            if (pos >= end) {
                return {
                    index: pos,
                    isMatch: false
                };
            }

            //compare the string we're looking for to the item in ar[pos]
            const comp = this.compareItems(item, this.items[pos]);

            //if we've found our item, return the pos
            if (comp === 0) {
                return {
                    index: pos,
                    isMatch: true
                };
            }

            //if the item is lesser in our comparison
            if (comp < 0) {
                end = pos;
            } else {
                //shift the beginning to the current position + 1
                //this means we can assume all items to the left !== str
                start = pos + 1;
            }
        }
    }


    private compareItems(a: ItemType, b: ItemType): number {
        switch (typeof a) {
            case 'number':
            case 'bigint':
                return Number((a as bigint) - (b as bigint));
            case 'string':
                return a.localeCompare(b as string);
        }
    }

    protected abstract calculateNthItem(n: number): ItemType;

}