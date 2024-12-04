import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function Settings() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trading Bot Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-trading">Automated Trading</Label>
            <Switch id="auto-trading" />
          </div>
          <div>
            <Label htmlFor="max-trade">Max Trade Amount (TON)</Label>
            <Input id="max-trade" type="number" placeholder="100" />
          </div>
          <div>
            <Label htmlFor="risk-level">Risk Level</Label>
            <Slider
              id="risk-level"
              defaultValue={[5]}
              max={10}
              step={1}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="stop-loss">Stop Loss (%)</Label>
            <Input id="stop-loss" type="number" placeholder="10" />
          </div>
          <div>
            <Label htmlFor="take-profit">Take Profit (%)</Label>
            <Input id="take-profit" type="number" placeholder="20" />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}