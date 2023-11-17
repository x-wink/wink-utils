/**
 * 大小驼峰转下划线分割
 * @example camel2Underline("createDate") === "create_date"
 * @example camel2Underline("UpdateDate") === "update_date"
 */
export const camel2Underline = (name: string) => {
    return name.replace(/[A-Z]/g, (sub, index) => {
        return (index && name[index - 1] !== '_' ? '_' : '') + sub.toLowerCase();
    });
};

/**
 * 下划线分割转小驼峰
 * @example underline2Camel("create_date") === "createDate"
 */
export const underline2Camel = (name: string) => {
    return name.replace(/_(\w)/g, (_, c: string) => c.toUpperCase());
};

/**
 * 对象属性名下划线分割转小驼峰
 * @param obj 对象
 */
export const convertUnderline2camel = <T extends object>(obj: T) => {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [underline2Camel(key), value])) as T;
};

/**
 * 对象属性名小驼峰转下划线分割
 * @param obj 对象
 */
export const convertCamel2Underline = <T extends object>(obj: T) => {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [camel2Underline(key), value])) as T;
};

/**
 * 首字母转为大写
 * @example upperFirstChar("name") === "Name"
 */
export const upperFirstChar = (str: string) => {
    return str.replace(/^./, (sub) => sub.toUpperCase());
};

/**
 * 通用比较器；
 * 数组比较元素数量，并且递归比较相同位置上的元素；
 * 日期比较时间戳；
 * 对象比较属性数量，并且递归比较属性值；
 * 其他使用===比较；
 */
export const compare = <T>(a: T, b: T, ignoreFields?: string[]): boolean => {
    let res = false;
    if (Array.isArray(a) && Array.isArray(b)) {
        res = a.length === b.length && a.every((item, index) => compare(item, b[index]), ignoreFields);
    } else if (a instanceof Date && b instanceof Date) {
        res = a.getTime() === b.getTime();
    } else if (a instanceof Object && b instanceof Object) {
        res =
            Object.keys(a)
                .filter((item) => !ignoreFields?.includes(item))
                .join(',') ===
            Object.keys(b)
                .filter((item) => !ignoreFields?.includes(item))
                .join(',');
        if (res) {
            for (const p in a) {
                res = compare(a[p as keyof T], b[p as keyof T], ignoreFields);
                if (!res) {
                    break;
                }
            }
        }
    } else {
        res = a === b;
    }
    // 调试用
    if (!res) {
        // eslint-disable-next-line no-console
        console.info(JSON.stringify(a), JSON.stringify(b));
    }
    return res;
};

/**
 * 使用JSON反序列化/序列化实现的简易深度克隆，只能保留实例属性
 */
export const clone = <T extends object>(target: T): T => {
    return JSON.parse(JSON.stringify(target)) as T;
};
