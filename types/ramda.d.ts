declare module 'ramda' {
  export function prop(propName: string): (obj: object) => any
  export function prop(propName: string, obj: object): any
}
