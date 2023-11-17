/**
 * 数组去重
 * @params arr 源数组
 * @params compare 比较函数
 */
export const unique = <T>(arr: T[], compare = (a: T, b: T) => a === b) => {
    const res = [] as T[];
    arr?.forEach((item) => {
        if (res.findIndex((temp) => compare(item, temp)) === -1) {
            res.push(item);
        }
    });
    return res;
};
