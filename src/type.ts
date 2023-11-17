/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 提取类型中所有函数成员，可指定要排除的函数
 */
export type PickFunctions<Origin, OmitNames extends string | number | symbol = never> = Omit<
    {
        [Key in keyof Origin]: Origin[Key] extends (...args: any[]) => any ? Origin[Key] : never;
    },
    OmitNames
>;
/**
 * 替换类型中指定返回值类型的函数成员的返回值类型
 */
export type ChangeFunctionReturnType<
    Origin,
    OriginReturnType,
    TargetReturnType,
    OmitNames extends string | number | symbol = never,
> = {
    [Key in keyof Origin]: Key extends OmitNames
        ? Origin[Key]
        : Origin[Key] extends (...args: infer Args) => OriginReturnType
          ? (...args: Args) => TargetReturnType
          : Origin[Key] extends (...args: any) => any
            ? Origin[Key]
            : never;
};

/**
 * 把类型中指定字段变为可选字段
 */
export type PartialBy<T, D extends Partial<T>> = Omit<T, keyof D> & Partial<D>;
