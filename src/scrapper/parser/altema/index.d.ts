interface Parsed {
  image: string,
  gears: string[],
}

declare function parse(jsFile: string): Parsed[]
