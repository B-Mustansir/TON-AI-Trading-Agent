import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const convertAgeToSeconds = (age: string): number => {
  const timeUnits: { [key: string]: number } = {
    'second ago': 1,
    'seconds ago': 1,
    'minute ago': 60,
    'minutes ago': 60,
    'hour ago': 3600,
    'hours ago': 3600,
    'day ago': 86400,
    'days ago': 86400,
  };

  const [value, unit] = age.split(' ').slice(0, 2);
  return parseInt(value) * timeUnits[unit];
};

type SwapData = {
  age: string;
  value: string;
  maker: string;
};

const swapsData: { [key: string]: SwapData[] } = {
  Notcoin: [
    { age: '26 seconds ago', value: '68.2 NOT', maker: '0.09 TON' },
    { age: '29 seconds ago', value: '1 000 NOT', maker: '1.33 TON' },
    { age: '31 seconds ago', value: '10 928.57 NOT', maker: '101.3 USD₮' },
    { age: '45 seconds ago', value: '15 000 DOGS', maker: '1 205.15 NOT' },
    { age: '1 minute ago', value: '3 292.03 NOT', maker: '4.38 TON' }
  ],
  Major: [
    { age: '30 seconds ago', value: '3.54 MAJOR', maker: '0.56 TON' },
    { age: '33 seconds ago', value: '1.1 MAJOR', maker: '0.17 TON' },
    { age: '42 seconds ago', value: '1.87 MAJOR', maker: '0.29 TON' },
    { age: '55 seconds ago', value: '77 MAJOR', maker: '12.12 TON' },
    { age: '1 minute ago', value: '51 MAJOR', maker: '8.03 TON' }
  ],
  ResistanceDog: [
    { age: '2 minutes ago', value: '35.13 TON', maker: '700.19 REDO' },
    { age: '6 minutes ago', value: '22 TON', maker: '438.78 REDO' },
    { age: '7 minutes ago', value: '200.7 REDO', maker: '9.99 TON' },
    { age: '7 minutes ago', value: '94.27 REDO', maker: '13.15 HYDRA' },
    { age: '7 minutes ago', value: '4.54 TON', maker: '94.27 REDO' }
  ],
  Dogs: [
    { age: '44 seconds ago', value: '1 200 USD₮', maker: '1 568 830.81 DOGS' },
    { age: '49 seconds ago', value: '311.63 DOGS', maker: '0.03 TON' },
    { age: '1 minute ago', value: '110 TON', maker: '1 000 000 DOGS' },
    { age: '1 minute ago', value: '991 250 DOGS', maker: '751.72 USD₮' },
    { age: '1 minute ago', value: '1 206.35 USD₮', maker: '1 585 455.69 DOGS' }
  ],
  JetTon: [
    { age: '1 minute ago', value: '134.29 JETTON', maker: '74 820.84 JETTON' },
    { age: '1 minute ago', value: '559.87 JETTON', maker: '39.2 TON' },
    { age: '1 minute ago', value: '9.33 TON', maker: '134.29 JETTON' },
    { age: '2 minutes ago', value: '1 500 JETTON', maker: '103.98 TON' },
    { age: '2 minutes ago', value: '179.49 JETTON', maker: '100 888.3 JETTON' }
  ]
};

const sortedSwapsData = Object.keys(swapsData).reduce((acc: { [key: string]: SwapData[] }, coin: string) => {
  acc[coin] = swapsData[coin].sort((a, b) => convertAgeToSeconds(a.age) - convertAgeToSeconds(b.age));
  return acc;
}, {});

const Activity: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recent Trading Activity</h2>
      <Card>
        <CardHeader>
          <CardTitle>Trading History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                {/* <TableHead>Coin</TableHead> */}
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Profit/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(sortedSwapsData).map((coin) => (
                sortedSwapsData[coin].map((trade, index) => (
                  <TableRow key={`${coin}-${index}`}>
                    <TableCell>Swap</TableCell>
                    {/* <TableCell>{coin}</TableCell> */}
                    <TableCell>{trade.value}</TableCell>
                    <TableCell>{trade.maker}</TableCell>
                    <TableCell>{trade.age}</TableCell>
                    <TableCell className={(index % 2 === 0) ? 'text-green-600' : 'text-red-600'}>
                      {(index % 2 === 0 ? '+' : '-')}{Math.abs(index % 2 === 0 ? 0.1 * index : -0.1 * index).toFixed(2)} TON
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;