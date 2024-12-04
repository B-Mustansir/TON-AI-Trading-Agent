import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function BotSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trading Bot Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="bot-active">Bot Active</Label>
            <Switch id="bot-active" />
          </div>
          <div>
            <Label htmlFor="max-trade">Max Trade Amount (TON)</Label>
            <Input id="max-trade" type="number" placeholder="100" />
          </div>
          <div>
            <Label htmlFor="risk-level">Risk Level (1-10)</Label>
            <Input id="risk-level" type="number" min="1" max="10" placeholder="5" />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}