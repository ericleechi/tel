import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ApiActions, FilterActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import SearchSelect from 'app/components/SearchSelect';
import { FilterModel } from 'app/models';

interface IProps extends RouteComponentProps<void> {
    data: RootState.ApiState;
    filterActions: FilterActions;
    apiActions: ApiActions;
    filter: RootState.FilterState;
  }

@connect(
  (state: RootState, ownProps): Pick<IProps, 'filter' | 'data'  > => {

    return { filter: state.filter, data: state.api };
  },
  (dispatch: Dispatch) => ({
    filterActions: bindActionCreators(omit(FilterActions, 'Type'), dispatch),
    apiActions: bindActionCreators(omit(ApiActions, 'API_ACTIONS'), dispatch)
  })
)
export class Filter extends React.Component<IProps> {
  constructor(props: IProps, context?: any) {
    super(props, context);
  }

  public updateFilter(filter:FilterModel){
    const result = this.props.filterActions.setFilter(filter)
    if(!result.error && result.payload){
        this.props.apiActions.lookupAirQualityUtd({
          ...this.props.filter,
          ...result.payload
        })
    }
  }
  render() {
    const { data } = this.props;
    return (
        <div className={style.filter}>
          <SearchSelect
            label="Område"
            onSelect={(item) =>
              this.updateFilter({
                area: item.area
              })
            }
            onRemove={(item) =>
              this.updateFilter({
                area: null
              })
            }
            items={data.areas.map((item) => {
              return {
                label: item.area,
                description: `${item.municipality} ${item.zone}`,
                value: item
              };
            })}
          />
    
          <SearchSelect
            label="Components"
            onSelect={(item) =>
              this.updateFilter({
                component: item.component
              })
            }
            onRemove={(item) =>
              this.updateFilter({
                component: null
              })
            }
            items={data.components.map((item) => {
              return {
                label: item.component,
                description: item.topic,
                value: item
              };
            })}
          />
        </div>
        
    
    )
  }
}
