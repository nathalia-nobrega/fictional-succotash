import { FastifyRequest } from 'fastify'

export interface IRecipeRequestHandler extends FastifyRequest {
  name: string
  ingredients: string[]
  instructions: string[]
  portionsQtd: number
  timeToCook: string
  mediaLinks: string[]
}
