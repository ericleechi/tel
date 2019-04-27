import * as React from 'react';
import ChartJS from 'chart.js';
import { findDOMNode } from 'react-dom';

interface IProps {
  type: 'horizontalBar' | 'bar' | 'pie';
  data: any;
}
export default class BarChart<IChartData> extends React.Component<IProps> {
  private chart: ChartJS;
  private canvas: React.RefObject<HTMLCanvasElement>;
  public constructor(props: IProps) {
    super(props);
    this.canvas = React.createRef<HTMLCanvasElement>();
  }

  public componentDidMount() {
    this.chart = new ChartJS(findDOMNode(this).getContext('2d'), {
      type: this.props.type,
      data: this.props.data,
      options: {
        responsive: true
      }
    });
  }
  public shouldComponentUpdate(nextProps:IProps){
    return this.props.data !== nextProps.data
  }
  public componentDidUpdate() {
    if (this.chart) {
      this.chart.data = this.props.data;
      this.chart.update();
    }
  }

  public render() {
    return <canvas key="data" ref={this.canvas} />
  }
}
