import faker from 'faker'

type FakeManyOpts = {
  min?: number
  max?: number
}

export const fakeMany = <TModel extends any> (
  mockFn: () => TModel,
  opts: FakeManyOpts = { min: 4, max: 8 }
) => Array.from({ length: faker.datatype.number(opts) }, mockFn)
