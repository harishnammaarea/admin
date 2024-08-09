import { Stories } from "./stories"

export interface Contest {
  startDate: string,
  endDate: string,
  theme: string,
  description: string,
  prize: string,
  duration: 7,
  id: number,
  contestEntries: number,
  totalStories: number,
  paused: boolean | number
  contestPrompts: Prompts[],
  published: boolean
  status: ContestStage
  stories:Stories[]
}

export interface Prompts {
  prompt: string,
  id: number,
  promptCategory: string
  count:number
}


export type ContestStage = "Contest is live and running" |
  "Contest is completed" |
  "Contest is in evaluation process" |
  "Contest as finished evaluation process" |
  "Contest as been published"