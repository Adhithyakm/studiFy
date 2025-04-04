import type { LiveSession } from '@prisma/client'

export type Session = LiveSession

export interface SessionCreateParams {
  title: string
  description?: string
  date: Date | string
  duration: number
  hostId: string
}