import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CommunityEngagement() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Community Engagement</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Twitter Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter Twitter handle" className="mb-2" />
            <Button>Analyze Tweets</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Telegram Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter Telegram group link" className="mb-2" />
            <Button>Join Group</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}