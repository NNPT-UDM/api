class OperatorsUtils{
    intersection(arr1, arr2) {
        const set = new Set(arr2);
        const intersection = new Set(arr1.filter(elem => set.has(elem)));
        return Array.from(intersection);
    }
}

module.exports.OperatorsUtils = new OperatorsUtils();