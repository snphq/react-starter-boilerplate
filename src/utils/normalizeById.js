export const normalize = list =>
  list.reduce(
    (acc, { id, ...rest }) => ({
      ...acc,
      [id]: {
        id,
        ...rest,
      },
    }),
    {}
  );

export const denormalize = collection =>
  Object.keys(collection).map(id => ({ id, ...collection[id] }));
