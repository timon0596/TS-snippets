const a = ['a','b','c','d'] as const 
type PartialArray<A extends readonly string[]> = A extends readonly [infer A1,...infer A2]?A|A2|PartialArray<A2>:never
type qwe= PartialArray<typeof a>
