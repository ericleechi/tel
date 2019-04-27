import { ApiModel } from 'app/models';
import colorHash from 'color-hash';
class ChartService {
  private colorHash = new colorHash();
  public fromUTDtoChartData(utds: ApiModel.IAirQualityModel[]) {
    return {
      datasets: [
        {
          label: 'UTD',
          labels: utds.map((x) => x.station),
          data: utds.map((x) => x.value),
          backgroundColor: utds.map((x) => this.colorHash.hex(x.station))
        }
      ],
      labels: utds.map((x) => x.station)
    };
  }
}
export default new ChartService();
