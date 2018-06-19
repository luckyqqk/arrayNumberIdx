/**
 * Created by qingkai.wu on 2018/6/8.
 */

const jsNumberBit = 31;
/**
 * 我们知道根据二维或三维数组的下标即可定位某个元素.
 * 但定位二维/三维的元素的下标是大于1个的.
 * 那么,如果想要用一个数来定位多维数组的某个元素该如何解决呢?
 * 答案是利用二进制位存储不同的下标,来解决这一问题.
 *
 * 理论上js中number类型能最大支持52位(64-1-11),
 * 但小于32位的位移超过32位就会将位移次数直接减少32位后再位移.
 * 而导致最终的结果错误.所以考虑到容错性,将支持位数定为31(32-1)位.
 */
const ElementId = module.exports;
ElementId.encodeId = function() {
    let length = arguments.length;
    let bitLength = Math.floor(jsNumberBit/length);
    let maxNumber = Math.pow(2, bitLength);
    let res = 0;
    for (let i = 0; i < length; i++) {
        if (maxNumber <= arguments[i])
            throw new Error('number or count out size');
        res |= arguments[i] << i * bitLength;
    }
    return res;
};

ElementId.decodeId = function(id, n) {
    let bitLength = Math.floor(jsNumberBit/n);
    let baseBinary = getBaseBinary(bitLength);
    let res = [];
    for (let i = 0; i < n; i++) {
        let currBitSize = i * bitLength;
        res.push((id & baseBinary << currBitSize) >> currBitSize);
    }
    return res;
};

function getBaseBinary(bitLength) {
    let res = 0;
    for (let i = 0; i < bitLength; i++) {
        res |= Math.pow(2, i);
    }
    return res;
}

// console.error(ElementId.decodeId(524294, 2));
// for (let i = 0 ; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         for (let z = 0; z < 10; z++) {
//             let id = ElementId.encodeId(i, j, z);
//             console.error(`${i}, ${j}, ${z} is id:${id}`);
//             let idxArr = ElementId.decodeId(id, 3);
//             console.error(`${id} idx is: ${JSON.stringify(idxArr)}`);
//         }
//
//     }
// }
// let i = 32767, j = 32767, z = 1;
// let id = ElementId.encodeId(i, j);
// console.error(`${i}, ${j}, ${z} is id:${id}`);
// let idxArr = ElementId.decodeId(id, 2);
// console.error(`${id} idx is: ${JSON.stringify(idxArr)}`);
