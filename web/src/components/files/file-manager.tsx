"use client"

import { useState } from "react"
import { CloudUpload, File, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

const mockFiles = [
  {
    id: "file_001",
    name: "design-system.sketch",
    size: "24.8 MB",
    type: "Design",
    uploadedAt: "2 hours ago",
  },
  {
    id: "file_002",
    name: "release-notes.md",
    size: "4.2 kB",
    type: "Documentation",
    uploadedAt: "1 day ago",
  },
  {
    id: "file_003",
    name: "mobile-build.aab",
    size: "58.1 MB",
    type: "Android",
    uploadedAt: "3 days ago",
  },
]

export function FileManager() {
  const [files] = useState(mockFiles)

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>File Pipeline</CardTitle>
          <CardDescription className="text-white/70">
            Upload, manage, and share assets across your team.
          </CardDescription>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400">
          <CloudUpload className="mr-2 size-4" /> Upload
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[260px]">
          <div className="flex flex-col gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                    <File className="size-5 text-emerald-300" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white">{file.name}</div>
                    <div className="text-xs text-white/50">
                      {file.type} • {file.size} • {file.uploadedAt}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Copy URL</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
