type NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object 
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string | number)];
  
type 1NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType]: ObjectType[Key] extends object 
? NestedKeyOf<ObjectType[Key]>
: Key
}[keyof ObjectType];

// 2 - Concat the previous key to the path
type 2NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType]: ObjectType[Key] extends object 
? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: Key
}[keyof ObjectType];

// 3 - Add the object's key
type 3NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType]: ObjectType[Key] extends object 
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: Key
}[keyof ObjectType];


type ReverseMap<T extends Record<keyof T, keyof any>> = {
    [P in T[keyof T]]: {
        [K in keyof T]: T[K] extends P ? K : never
    }[keyof T]
}
