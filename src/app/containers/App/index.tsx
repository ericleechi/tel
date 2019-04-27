import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ApiActions, FilterActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import Chart from 'app/components/Chart';
import chartService from 'app/services/chartService';
import { Filter } from 'app/components/Filter';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    data: RootState.ApiState;
    chartData: any;
    apiActions: ApiActions;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'data' | 'chartData'> => {
    return { data: state.api, chartData: chartService.fromUTDtoChartData(state.api.utd) };
  },
  (dispatch: Dispatch) => ({
    apiActions: bindActionCreators(omit(ApiActions, 'API_ACTIONS'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  public componentDidMount() {
    this.props.apiActions.initialLoad();
  }
  public shouldComponentUpdate(nextProps: App.Props) {
    return this.props.data !== nextProps.data || this.props.chartData !== nextProps.chartData;
  }

  render() {
    return (
      <div className={style.app}>
        <div>
          <Filter />
        </div>
        <div>
          <Chart type="bar" data={this.props.chartData} />
        </div>
      </div>
    );
  }
}
