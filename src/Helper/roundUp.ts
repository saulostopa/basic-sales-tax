// rounds the number provided to the nearest accurate value
export const roundUp = (number: number, precision: number = 0.01): number => {
    return (Math.ceil(number / precision) * precision);
}