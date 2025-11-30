import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TeamPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-white/70">Manage your team members and their access</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList className="bg-black/30 border-white/10">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    role: "Admin",
                    status: "Active",
                    lastActive: "2 hours ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                    initials: "JD",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    role: "Data Scientist",
                    status: "Active",
                    lastActive: "5 minutes ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                    initials: "JS",
                  },
                  {
                    name: "Robert Johnson",
                    email: "robert.johnson@example.com",
                    role: "Developer",
                    status: "Inactive",
                    lastActive: "3 days ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                    initials: "RJ",
                  },
                  {
                    name: "Emily Davis",
                    email: "emily.davis@example.com",
                    role: "Analyst",
                    status: "Active",
                    lastActive: "1 day ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                    initials: "ED",
                  },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-black/40 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-red-600/20 text-red-500">{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-white/70">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-black/50 border-white/10">
                        {member.role}
                      </Badge>
                      <Badge
                        className={
                          member.status === "Active"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }
                      >
                        {member.status}
                      </Badge>
                      <p className="text-sm text-white/50 hidden md:block">Last active: {member.lastActive}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Manage roles and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Admin",
                    description: "Full access to all features and settings",
                    members: 2,
                    permissions: ["Create/Edit Models", "Manage Team", "Billing Access", "API Access"],
                  },
                  {
                    name: "Data Scientist",
                    description: "Can create and manage AI models and datasets",
                    members: 3,
                    permissions: ["Create/Edit Models", "View Analytics", "Limited API Access"],
                  },
                  {
                    name: "Developer",
                    description: "Can integrate and use AI models via API",
                    members: 5,
                    permissions: ["View Models", "API Access", "View Analytics"],
                  },
                  {
                    name: "Analyst",
                    description: "Can view analytics and reports",
                    members: 4,
                    permissions: ["View Analytics", "View Models"],
                  },
                ].map((role, i) => (
                  <div key={i} className="p-4 bg-black/40 rounded-lg border border-white/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-sm text-white/70">{role.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-black/50 border-white/10">{role.members} members</Badge>
                        <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                          Edit Role
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {role.permissions.map((permission, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent team activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "John Doe",
                    action: "Deployed a new model",
                    target: "ChurnPredictor-v2",
                    time: "2 hours ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                    initials: "JD",
                  },
                  {
                    user: "Jane Smith",
                    action: "Updated permissions for",
                    target: "Developer role",
                    time: "5 hours ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                    initials: "JS",
                  },
                  {
                    user: "Emily Davis",
                    action: "Started training",
                    target: "InventoryForecaster model",
                    time: "Yesterday at 3:45 PM",
                    avatar: "/placeholder.svg?height=32&width=32",
                    initials: "ED",
                  },
                  {
                    user: "Robert Johnson",
                    action: "Generated new",
                    target: "API key",
                    time: "2 days ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                    initials: "RJ",
                  },
                  {
                    user: "John Doe",
                    action: "Invited",
                    target: "Emily Davis",
                    time: "3 days ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                    initials: "JD",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-black/40 rounded-lg border border-white/10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback className="bg-red-600/20 text-red-500">{activity.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p>
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-white/70">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-sm text-white/50">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

