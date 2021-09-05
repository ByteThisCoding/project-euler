/**
 * Base Class which will let us abstract the logic of generating
 * and maintaining a sequence here
 */
export type IAbstractSequenceType =
    | string
    | number
    | BigInt;

export abstract class AbstractSequence<ItemType extends IAbstractSequenceType> {

    private readonly items: ItemType[] = [];

    constructor() {
        this.items = this.getInitialSequenceItems();
    }

    protected abstract getInitialSequenceItems(): ItemType[];


    getNthItem(n: number): ItemType {
        for (let i=this.items.length+1; i<=n; i++) {
            const newItem = this.calculateNthItem(i);
            this.items.push(newItem);
        }

        return this.items[n-1];
    }

    getSumOfRange(nStart: number, nEnd: number): ItemType {
        let sum = this.getNthItem(nStart);
        for (let i=nStart+1; i<=nEnd; i++) {
            sum = this.addItems(sum, this.getNthItem(i));
        }
        return sum;
    }

    getItemsInRange(nStart: number, nEnd: number): ItemType[] {
        let items: ItemType[] = [];
        for (let i=nStart; i<=nEnd; i++) {
            items.push(this.getNthItem(i));
        }
        return items;
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
                //@ts-ignore
                return a + (b as BigInt) as ItemType;
                break;
            default:
                throw new Error("Add Not Implemented for "+typeof a);
        }
    }

    protected abstract calculateNthItem(n: number): ItemType;

}