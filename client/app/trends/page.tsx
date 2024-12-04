import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const coins = [
  {
    name: 'Notcoin',
    price: '$0.00941',
    hour: '-1.52%',
    day: '+1.89%',
    week: '+11.20%',
    traders: '2 886 361',
    volume: '$1 335 939.37'
  },
  {
    name: 'Major',
    price: '$1.11',
    hour: '-4.03%',
    day: '-36.08%',
    week: '-14.62%',
    traders: '185 382',
    volume: '$979 263.73'
  },
  {
    name: 'Resistance Dog',
    price: '$0.35',
    hour: '+17.31%',
    day: '+11.86%',
    week: '+30.00%',
    traders: '26 330',
    volume: '$708 446.84'
  },
  {
    name: 'Dogs',
    price: '$0.000767',
    hour: '-1.63%',
    day: '-1.26%',
    week: '+4.82%',
    traders: '5 020 864',
    volume: '$658 316.17'
  },
  {
    name: 'JetTon',
    price: '$0.49',
    hour: '-8.38%',
    day: '-17.52%',
    week: '-35.21%',
    traders: '99 830',
    volume: '$571 941.73'
  },
  {
    name: 'TryTON',
    price: '$0.00571',
    hour: '-12.99%',
    day: '-23.71%',
    week: '-57.26%',
    traders: '4 332',
    volume: '$482 640.81'
  },
  {
    name: 'STON',
    price: '$5.24',
    hour: '-2.26%',
    day: '-0.77%',
    week: '+15.77%',
    traders: '62 084',
    volume: '$423 124.00'
  },
  {
    name: 'Du Rove’s Wall',
    price: '$0.0353',
    hour: '-0.92%',
    day: '-6.54%',
    week: '-59.43%',
    traders: '8 455',
    volume: '$342 443.08'
  },
  {
    name: 'Vilarso',
    price: '$0.00495',
    hour: '-1.70%',
    day: '+38.90%',
    week: '+9437.41%',
    traders: '3 629',
    volume: '$267 927.10'
  },
  {
    name: 'STORM',
    price: '$0.0397',
    hour: '-0.39%',
    day: '-4.48%',
    week: '+4.01%',
    traders: '25 478',
    volume: '$255 922.09'
  }
];

export default function Trends() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trending TON Jettons</h2>
      <Card>
        <CardHeader>
          <CardTitle>Top Trending Coins</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>1h Change</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>7d Change</TableHead>
                <TableHead>Traders</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Sentiment</TableHead> {/* Assuming sentiment is to be added later */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {coins.map((coin) => (
                <TableRow key={coin.name}>
                  <TableCell>{coin.name}</TableCell>
                  <TableCell>{coin.price}</TableCell>
                  <TableCell className={parseFloat(coin.hour) > 0 ? 'text-green-600' : 'text-red-600'}>
                    {coin.hour}
                  </TableCell>
                  <TableCell className={parseFloat(coin.day) > 0 ? 'text-green-600' : 'text-red-600'}>
                    {coin.day}
                  </TableCell>
                  <TableCell className={parseFloat(coin.week) > 0 ? 'text-green-600' : 'text-red-600'}>
                    {coin.week}
                  </TableCell>
                  <TableCell>{coin.traders}</TableCell>
                  <TableCell>{coin.volume}</TableCell>
                  <TableCell>N/A</TableCell>  {/* Sentiment data not available in the table */}
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </div>
  )
}