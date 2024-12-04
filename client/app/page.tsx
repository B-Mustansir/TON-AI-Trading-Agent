'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  const getValueFromLocalStorage = (key: string, defaultValue: any) => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    }
    return defaultValue
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [botName, setBotName] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [totalValue, setTotalValue] = useState(() => getValueFromLocalStorage('totalValue', 0))
  const [change24h, setChange24h] = useState(() => getValueFromLocalStorage('change24h', 0))
  const [activeBots, setActiveBots] = useState(() => getValueFromLocalStorage('activeBots', 0))
  const [activeTrades, setActiveTrades] = useState(() => getValueFromLocalStorage('activeTrades', 0))
  const [todayProfit, setTodayProfit] = useState(() => getValueFromLocalStorage('todayProfit', 0))

  useEffect(() => {
    // Save data to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('totalValue', JSON.stringify(totalValue))
      localStorage.setItem('change24h', JSON.stringify(change24h))
      localStorage.setItem('activeBots', JSON.stringify(activeBots))
      localStorage.setItem('activeTrades', JSON.stringify(activeTrades))
      localStorage.setItem('todayProfit', JSON.stringify(todayProfit))
    }
  }, [totalValue, change24h, activeBots, activeTrades, todayProfit])

  useEffect(() => {
    if (totalValue > 0) {
      const delay = Math.floor(Math.random() * (120000 - 60000 + 1) + 60000) // Random delay between 1-2 minutes
      const timer = setTimeout(() => {
        const randomChange = Math.floor(Math.random() * 9) + 1 // Random number between 1-9
        setChange24h(randomChange)
        // Simulate profit based on the change
        const profit = (totalValue * randomChange) / 100
        setTodayProfit((prevProfit: number) => {
          const newProfit = prevProfit + profit;
          if (typeof window !== 'undefined') {
            localStorage.setItem('todayProfit', JSON.stringify(newProfit));
          }
          return newProfit;
        });
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [totalValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(depositAmount)
    if (!isNaN(amount)) {
      setTotalValue((prevValue: number) => prevValue + amount);
      setActiveBots((prevBots: number) => prevBots + 1);
      setActiveTrades((prevTrades: number) => prevTrades + Math.floor(Math.random() * 3) + 1);
    }
    setIsDialogOpen(false)
    setBotName('')
    setDepositAmount('')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">Total Value: {totalValue.toFixed(2)} TON</p>
          <p className={change24h > 0 ? "text-green-600" : change24h < 0 ? "text-red-600" : "text-gray-600"}>
            24h Change: {change24h > 0 ? '+' : ''}{change24h}%
          </p>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Start Auto Trading</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Start Auto Trading</DialogTitle>
              <DialogDescription>
                Enter the bot name and the amount you want to deposit to start auto trading.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Bot Name</Label>
                <Input
                  id="bot-name"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="Enter bot name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit-amount">Deposit Amount (TON)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter deposit amount"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="outline">Connect Wallet</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Trading Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Active Bots: {activeBots}</p>
          <p>Active Trades: {activeTrades}</p>
          <p>Today's Profit: {todayProfit.toFixed(2)} TON</p>
          <p>Bot Status: {activeBots > 0 ? 'Active' : 'Inactive'}</p>
        </CardContent>
      </Card>
    </div>
  )
}