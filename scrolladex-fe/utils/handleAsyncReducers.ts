import {
  AsyncThunk,
  CaseReducer,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

type State = Record<string, any>;

interface HandleAsyncReducersArgs<Returned, ThunkArg> {
  builder: ActionReducerMapBuilder<State>;
  asyncThunk: AsyncThunk<Returned, ThunkArg, {}>;
  stateKey: string;
  onFulfilled?: (state: State, action: PayloadAction<Returned>) => void;
  onPending?: (state: State) => void;
  onRejected?: (state: State, action: PayloadAction<unknown>) => void;
}

const handleAsyncReducers = <Returned, ThunkArg>({
  builder,
  asyncThunk,
  stateKey,
  onFulfilled,
  onPending,
  onRejected,
}: HandleAsyncReducersArgs<Returned, ThunkArg>) => {
  const pendingReducer: CaseReducer<
    State,
    ReturnType<typeof asyncThunk.pending>
  > = (state) => {
    state[stateKey].status = "loading";
    state[stateKey].error = null;
    if (onPending) {
      onPending(state);
    }
  };

  const fulfilledReducer: CaseReducer<State, PayloadAction<Returned>> = (
    state,
    action
  ) => {
    state[stateKey].status = "succeeded";
    state[stateKey].data = action.payload;
    if (onFulfilled) {
      onFulfilled(state, action);
    }
  };

  const rejectedReducer: CaseReducer<
    State,
    ReturnType<typeof asyncThunk.rejected>
  > = (state, action) => {
    state[stateKey].status = "failed";
    state[stateKey].error = action.error.message ?? "Unknown error";
    if (onRejected) {
      onRejected(state, action);
    }
  };

  builder.addCase(asyncThunk.pending, pendingReducer);
  builder.addCase(asyncThunk.fulfilled, fulfilledReducer);
  builder.addCase(asyncThunk.rejected, rejectedReducer);
};

export default handleAsyncReducers;
