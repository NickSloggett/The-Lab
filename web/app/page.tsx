'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Chart } from '../components/Chart'

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">North Star Web</h1>
      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="dom">DOM</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="mt-4"><Chart /></TabsContent>
        <TabsContent value="dom" className="mt-4">DOM ladder placeholder</TabsContent>
        <TabsContent value="options" className="mt-4">Options chain placeholder</TabsContent>
      </Tabs>
    </main>
  )
}


