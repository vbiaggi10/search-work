const apiBase = 'https://api.graphql.jobs/';

const getQuery = (type) => {
  let query = '';

  if (type === 'countries') {
    query = `
      {
        countries {
          id
          name
        }
      }
    `;
  } else if (type === 'jobs') {
    query = `
      {
        jobs {
          id
          title
          countries {
            id
            name
          }
          company {
            id
            name
          }
          postedAt
          createdAt
        }
      }
    `;
  } else if (type === 'companies') {
    query = `
      {
        companies {
          id
          name
        }
      }
    `;
  }
  return query;
};

export const api = async (type) => {
  return await fetch(apiBase, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: getQuery(type),
    }),
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
};
