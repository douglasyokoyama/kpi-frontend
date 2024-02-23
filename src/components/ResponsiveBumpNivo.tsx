import {
  type BumpSerie,
  type BumpSerieExtraProps,
  type DefaultBumpDatum,
  ResponsiveBump,
} from '@nivo/bump';

export const MyResponsiveBump = ({
  data,
}: {
  data: Array<BumpSerie<DefaultBumpDatum, BumpSerieExtraProps>>;
}) => (
  <ResponsiveBump
    data={data}
    colors={{ scheme: 'spectral' }}
    lineWidth={3}
    activeLineWidth={6}
    inactiveLineWidth={3}
    inactiveOpacity={0.15}
    pointSize={10}
    activePointSize={16}
    inactivePointSize={0}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={3}
    activePointBorderWidth={3}
    pointBorderColor={{ from: 'serie.color' }}
    endLabel={false}
    startLabel={false}
    axisTop={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -50,
      legend: '',
      legendPosition: 'middle',
      legendOffset: 42,
    }}
    margin={{ top: 40, right: 100, bottom: 80, left: 60 }}
    axisRight={null}
  />
);
