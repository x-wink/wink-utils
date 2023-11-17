import type { PartialBy } from './type';

export const treeNodeDefaults = () => ({ sort: 0, children: [] });

export type TreeNodeData<T = unknown, ID extends string | number = number> = PartialBy<
    TreeNode<T, ID>,
    ReturnType<typeof treeNodeDefaults>
>;

export class TreeNode<T = unknown, ID extends string | number = number> {
    pid?: ID;
    id!: ID;
    title!: string;
    data!: T;
    sort!: number;
    children: TreeNode<T, ID>[] = [];
    constructor(data: TreeNodeData<T, ID>) {
        Object.assign(this, treeNodeDefaults(), data);
    }
}

export abstract class TreeNodeable<T = unknown, ID extends string | number = number> {
    abstract convertToTreeNode(): TreeNode<T, ID> | undefined;
}

export const buildTree = <T = unknown, ID extends string | number = number>(
    datas: TreeNodeable<T, ID>[],
    opts?: { rootId?: ID; ignoreEmptyPidWhenHasRootId?: boolean }
) => {
    const { rootId, ignoreEmptyPidWhenHasRootId = false } = opts ?? {};

    const tree: TreeNode<T, ID>[] = [];
    const map = new Map<ID, TreeNode<T, ID>>();
    datas.forEach((data) => {
        const node = data.convertToTreeNode();
        if (node) {
            map.set(node.id, node);
            if (node.pid === rootId || (!ignoreEmptyPidWhenHasRootId && !node.pid)) {
                tree.push(node);
            }
        }
    });
    map.forEach((node) => {
        if (node.pid) {
            const parent = map.get(node.pid);
            if (parent) {
                parent.children.push(node);
                parent.children.sort((a, b) => a.sort - b.sort);
            }
        }
    });
    tree.sort((a, b) => a.sort - b.sort);
    return tree;
};

export const flatTree = <T = unknown>(tree: TreeNode<T>[], ignoreCondition?: (node: TreeNode<T>) => boolean) => {
    const datas = [] as T[];
    tree.forEach((node) => {
        if (ignoreCondition?.(node) !== true) {
            datas.push(node.data);
            if (node.children?.length) {
                datas.push(...flatTree(node.children, ignoreCondition));
            }
        }
    });
    return datas;
};

export const deepTree = <T = unknown>(tree: TreeNode<T>[], condition: (node: TreeNode<T>) => boolean) => {
    const path: TreeNode<T>[] = [];
    tree.find((node) => {
        path.push(node);
        if (condition(node)) {
            return true;
        }
        const res = deepTree(node.children ?? [], condition);
        if (res.length) {
            path.push(...res);
            return true;
        }
        path.pop();
    });
    return path;
};
