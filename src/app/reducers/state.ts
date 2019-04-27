import { TodoModel,ApiModel , FilterModel} from 'app/models';
export interface RootState {
  todos: RootState.TodoState
  api : RootState.ApiState
  filter: RootState.FilterState
  router?: any;
}

export namespace RootState {
  export type TodoState = TodoModel[]
  export type ApiState = ApiModel.IApiLoadedModel
  export type FilterState = FilterModel
}
