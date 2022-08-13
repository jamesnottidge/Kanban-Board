export const createAction = (type) => {
  function actionCreator(payload) {
    return { type, payload };
  }
  actionCreator.type = type;
  actionCreator.toString = () => String(type);
  actionCreator.match = (action) => action.type === type;
  return actionCreator;
};

export const createReducer = (actionCreator, reducerFn) => (state, action) => {
  if (!actionCreator.match(action)) return state;
  else return reducerFn(state, action.payload);
};

export const createActionAndReducer = (actionType, reducerFn) => {
  const actionCreator = createAction(actionType);
  const reducer = createReducer(actionCreator, reducerFn);
  return [actionCreator, reducer];
};

export const combineReducers = (...reducers) =>
  (state, action) => {
    for (const reducer of reducers) {
      state = reducer(state, action);
    }
    return state;
  };

export const createPayload = (actualPayloadObject, id) => ({
  id,
  item: actualPayloadObject,
});

export const createDispatchFunctions = (dispatch, actionCreatorsObject) => {
  const keys = Object.keys(actionCreatorsObject);
  const dispatchers = {};
  for (const key of keys) {
    const actionCreator = actionCreatorsObject[key];
    const dispatcher = (payload) => dispatch(actionCreator(payload));
    dispatchers[key] = dispatcher;
  }
  return dispatchers;
};
