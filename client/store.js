import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

// export default createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
// )

function dummyReducer(state = {}, action) {
  return state;
}



export default createStore(
  dummyReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware, createLogger())
);
