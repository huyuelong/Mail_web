// 位运算
// export default function bwPowerSet(originalSet) {
//     const subSets = []

//     // We will have 2^n possible combinations (where n is a length of original set).
//     // It is because for every element of original set we will decide whether to include
//     // it or not (2 options for each set element).
//     const numberOfCombinations = 2 ** originalSet.length

//     // Each number in binary representation in a range from 0 to 2^n does exactly what we need:
//     // it shows by its bits (0 or 1) whether to include related element from the set or not.
//     // For example, for the set {1, 2, 3} the binary number of 0b010 would mean that we need to
//     // include only "2" to the current set.
//     for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
//         const subSet = []

//         for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
//             // Decide whether we need to include current element into the subset or not.
//             if (combinationIndex & (1 << setElementIndex)) {
//                 subSet.push(originalSet[setElementIndex])
//             }
//         }

//         // Add current subset to the list of all subsets.
//         subSets.push(subSet)
//     }

//     return subSets
// }


// 迭代算法
// export default function iteration(originalSet) {
//     const subSets = [[]]; // 初始时包含空集

//     for (const element of originalSet) {
//         const newSubSets = [];
//         for (const subSet of subSets) {
//             // 对于每个已有的子集，将当前元素添加到子集中生成新的子集
//             const newSet = subSet.concat(element);
//             newSubSets.push(newSet);
//         }
//         // 将新生成的子集添加到结果集中
//         subSets.push(...newSubSets);
//     }

//     return subSets;
// }

// 优化幂集算法，使用缓存来避免重复计算子集
export default function bwPowerSet(originalSet) {
    const subSets = [[]]

    // 初始化缓存
    const subsetLengthCache = new Array(1 << (originalSet.length + 1)).fill(0)
    subsetLengthCache[0] = 1

    for (let combinationIndex = 0; combinationIndex < (1 << originalSet.length); combinationIndex += 1) {
        const subSet = []

        for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(originalSet[setElementIndex])
            }
        }

        subSets.push(subSet)

        // 更新缓存
        subsetLengthCache[subSet.length] = subSets.length
    }

    // 使用缓存来生成幂集
    for (let i = 0; i < subSets.length; i++) {
        const subSet = subSets[i]
        const subSetLength = subSet.length

        // 检查下一个子集的长度是否存在于缓存中
        if (subsetLengthCache[subSetLength + 1]) {
            const nextSubSetIndex = subsetLengthCache[subSetLength + 1]
            const nextSubSet = subSets[nextSubSetIndex]
            
            // 确保下一个子集存在并添加到结果中
            if (nextSubSet) {
                subSets.push(nextSubSet)
                subsetLengthCache[subSetLength + 1] = subSets.length
            }
        }
    }

    return subSets
}


