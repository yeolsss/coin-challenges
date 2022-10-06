import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';

interface IOutletContext {
  coinId: string;
}

interface ICoinData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface IChartData {
  x: string;
  y: number[];
}
function convertDate(milliSecond: number) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const data = new Date(milliSecond * 1000); //Date객체 생성

  const year = data.getFullYear(); //0000년 가져오기
  const month = data.getMonth() + 1; //월은 0부터 시작하니 +1하기
  const date = data.getDate(); //일자 가져오기
  const day = days[data.getDay()]; //요일 가져오기

  return `${year}.${month}.${date}. (${day})`;
}

function Chart() {
  const { coinId } = useOutletContext<IOutletContext>();
  const { isLoading, data } = useQuery<ICoinData[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );

  const isDark = useRecoilValue(isDarkAtom);

  const chartData = data?.map((price) => {
    return {
      x: convertDate(price.time_close),
      y: [
        parseInt(price.open),
        parseInt(price.high),
        parseInt(price.low),
        parseInt(price.close),
      ],
    };
  }) as IChartData[];

  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: '#1e272e',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 5,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
