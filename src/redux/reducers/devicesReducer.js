const initialState = {
  data: [],
  totalCount: 0,
  pageInfo: {
    endCursor: null,
    hasNextPage: true
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DEVICES':
      const newState = { ...state, ...action.payload };
      return newState;
    default:
      return state;
  }
};
