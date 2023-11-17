/**
 * 使用空格拼接字符串，忽略空字符串
 * @param parts 字符串片段
 */
export function concat(parts: string[]): string;
/**
 * 使用指定分隔符拼接字符串，忽略空字符串
 * @param parts 字符串片段
 * @param step 分隔符
 */
export function concat(parts: string[], step: string): string;
/**
 * 使用空格拼接字符串，指定是否忽略空字符串
 * @param parts 字符串片段
 * @param ignoreEmpty 是否忽略空字符串
 */
export function concat(parts: string[], ignoreEmpty: boolean): string;
/**
 * 使用指定分隔符拼接字符串，指定是否忽略空字符串
 * @param parts 字符串片段
 * @param step 分隔符
 * @param ignoreEmpty 是否忽略空字符串
 */
export function concat(parts: string[], step: string, ignoreEmpty: boolean): string;
export function concat(parts: string[], stepOrIgnroeEmpty: string | boolean = ' ', ignoreEmpty = true) {
    return (ignoreEmpty && stepOrIgnroeEmpty !== false ? parts.filter(Boolean) : parts).join(
        typeof stepOrIgnroeEmpty === 'string' ? stepOrIgnroeEmpty : ' '
    );
}
