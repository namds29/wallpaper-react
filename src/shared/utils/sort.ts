export const sortByDatePropertyAsc = <T>(array: T[], property: keyof T): T[] =>
    array.sort((a, b) => {
        const valueA = new Date(a[property] as string);
        const valueB = new Date(b[property] as string);

        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    });

export const sortByNumericPropertyAsc = <T>(array: T[], property: keyof T): T[] => {
    return array.sort((a, b) => {
        const valueA = a[property] as number;
        const valueB = b[property] as number;

        return valueA - valueB;
    });
};