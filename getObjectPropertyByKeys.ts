type DeepKeys<o,k extends keyof o> = k extends keyof o? o[k] extends {[x:string]:any}?k|DeepKeys<o[k],keyof o[k]>:k:never
const obj1 = {a:{aa:{b:{bb:'c'}},qq:1},q:1} as const

type Ob = typeof obj1
type keysofobj1 = 'a'|'q'
type qwe = DeepKeys<typeof obj1, keyof typeof obj1>

type FirstK<A extends any[]> = A extends [infer K,...infer KK]?K:never

type NoTailArray<a extends any[]>=a extends [...infer a1,infer last]?a1:never

type AllNestedObjects<o> = o extends {[x:string]:any}?o|AllNestedObjects<o[keyof o]>:o 

type asdasd = AllNestedObjects<typeof obj1>
type ConsistentKeys<o,k extends keyof o> = k extends keyof o? o[k] extends {[x:string]:any}?[k,...ConsistentKeys<o[k],keyof o[k]>]:[k]:[]
type AnyConsistentKeysChain<a extends any[]> = a extends any[]?a extends []?never:a|AnyConsistentKeysChain<NoTailArray<a>>:never

type asd = AnyConsistentKeysChain<ConsistentKeys<typeof obj1,keyof typeof obj1>>

type SpecificObj<O,Arr extends AnyConsistentKeysChain<ConsistentKeys<O,keyof O>>> = Arr extends [infer K1,...infer R]?K1 extends keyof O?R extends []?O[K1]:SpecificObj<O[K1],R>:never:never

type zxc = SpecificObj<typeof obj1,['a','qq']>

const q = <obj extends typeof obj1,K extends AnyConsistentKeysChain<ConsistentKeys<typeof obj1,keyof typeof obj1>>>(o:obj,...keys:K)=>(keys as any[]).reduce((acc,k)=>acc[k],o) as SpecificObj<typeof obj1,K>
const asd = q(obj1,'a','aa')
