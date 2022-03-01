import { GraphQLResolveInfo } from 'graphql';
const blackList = [
  { function: 'startsWith', val: '__' },
  // { function: "startsWith", val: "field" },
];
const dontDigList = ['social'];

// prisma generate select from query
export const getProjection = (data: GraphQLResolveInfo) => {
  let temp: any = {};
  const parseFieldNodes = (data: any) => {
    const temp = {};
    data.selectionSet.selections.forEach((data: any) => {
      if (
        !blackList.reduce(
          (prev, curr) =>
            prev || (data.name.value as string)[curr.function](curr.val),
          false,
        )
      ) {
        temp[data.name.value] = true;
        if (data.selectionSet && !dontDigList.includes(data.name.value)) {
          temp[data.name.value] = { select: parseFieldNodes(data) };
        }
      }
    });
    return temp;
  };
  temp = parseFieldNodes(data.fieldNodes[0]);

  return temp;
};
