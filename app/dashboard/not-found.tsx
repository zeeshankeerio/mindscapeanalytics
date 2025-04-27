import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] px-4">
      <Card className="w-full max-w-md border-muted">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <FileQuestion className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground pb-2">
          <p>
            The dashboard page you are looking for doesn't exist or may have been moved.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <Button 
            variant="outline" 
            asChild 
            className="w-full sm:w-auto"
          >
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

