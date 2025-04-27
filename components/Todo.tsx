"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle2, 
  Clock, 
  Plus, 
  X,
  Calendar,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TodoItem {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: string
}

// Mock data for initial todos
const initialTodos: TodoItem[] = [
  {
    id: "t1",
    title: "Review ML model performance",
    completed: false,
    priority: "high",
    dueDate: "2023-08-15"
  },
  {
    id: "t2",
    title: "Update API documentation",
    completed: false,
    priority: "medium",
    dueDate: "2023-08-18"
  },
  {
    id: "t3",
    title: "Fix dashboard analytics bug",
    completed: true,
    priority: "high",
    dueDate: "2023-08-10"
  },
  {
    id: "t4",
    title: "Prepare presentation for client meeting",
    completed: false,
    priority: "high",
    dueDate: "2023-08-14"
  },
  {
    id: "t5",
    title: "Research new NLP libraries",
    completed: false,
    priority: "low",
    dueDate: "2023-08-25"
  }
]

const getPriorityColor = (priority: TodoItem["priority"]) => {
  switch (priority) {
    case "high":
      return "text-red-500 border-red-500"
    case "medium":
      return "text-amber-500 border-amber-500"
    case "low":
      return "text-green-500 border-green-500"
    default:
      return "text-slate-500 border-slate-500"
  }
}

export function TodoComponent() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos)
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  
  const addTodo = () => {
    if (newTodoTitle.trim() === "") return
    
    const newTodo: TodoItem = {
      id: `t${Date.now()}`,
      title: newTodoTitle,
      completed: false,
      priority: "medium"
    }
    
    setTodos([newTodo, ...todos])
    setNewTodoTitle("")
  }
  
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  const filteredTodos = activeTab === "all" 
    ? todos 
    : activeTab === "completed" 
      ? todos.filter(todo => todo.completed) 
      : todos.filter(todo => !todo.completed)
      
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    // Then sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const getRelativeDueDate = (dueDate?: string) => {
    if (!dueDate) return null
    
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return <span className="text-red-500 text-xs flex items-center">
        <AlertCircle className="h-3 w-3 mr-1" /> Overdue
      </span>
    } else if (diffDays === 0) {
      return <span className="text-amber-500 text-xs flex items-center">
        <Clock className="h-3 w-3 mr-1" /> Due today
      </span>
    } else if (diffDays === 1) {
      return <span className="text-amber-500 text-xs flex items-center">
        <Clock className="h-3 w-3 mr-1" /> Due tomorrow
      </span>
    } else {
      return <span className="text-muted-foreground text-xs flex items-center">
        <Calendar className="h-3 w-3 mr-1" /> Due in {diffDays} days
      </span>
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Task Management</CardTitle>
        <CardDescription>
          Keep track of your project tasks and deadlines
        </CardDescription>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-6 pt-0 pb-2">
        <div className="flex items-center space-x-2 mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <div 
                key={todo.id} 
                className={cn(
                  "flex items-start justify-between p-3 rounded-md border",
                  todo.completed ? "bg-muted/50" : "bg-card"
                )}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        "font-medium",
                        todo.completed && "line-through text-muted-foreground"
                      )}>
                        {todo.title}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs px-2 py-0 h-5", getPriorityColor(todo.priority))}
                      >
                        {todo.priority}
                      </Badge>
                    </div>
                    {todo.dueDate && getRelativeDueDate(todo.dueDate)}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => deleteTodo(todo.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {activeTab === "all" 
                ? "No tasks yet. Add a task to get started." 
                : activeTab === "completed" 
                  ? "No completed tasks yet." 
                  : "No active tasks."}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3 text-xs text-muted-foreground">
        {todos.filter(t => !t.completed).length} tasks remaining
      </CardFooter>
    </Card>
  )
} 