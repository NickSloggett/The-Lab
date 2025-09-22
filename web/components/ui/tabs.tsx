'use client'
import * as React from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

export const Tabs = RadixTabs.Root

export function TabsList({ className, ...props }: React.ComponentProps<typeof RadixTabs.List>) {
  return (
    <RadixTabs.List
      className={clsx(
        'inline-flex h-9 items-center justify-center rounded-lg bg-neutral-800 p-1 text-neutral-300',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof RadixTabs.Trigger>) {
  return (
    <RadixTabs.Trigger
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-neutral-900 transition-all',
        'data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900',
        'data-[state=inactive]:text-neutral-300 hover:bg-neutral-700/50',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof RadixTabs.Content>) {
  return <RadixTabs.Content className={clsx('ring-offset-neutral-900', className)} {...props} />
}


