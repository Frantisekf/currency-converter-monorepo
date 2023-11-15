import { type Request, type Response, type NextFunction } from 'express'
import { z, type AnyZodObject } from 'zod'

export const requireJsonContent = (request: Request, response: Response, next: NextFunction): void => {
  if (request.headers['content-type'] !== 'application/json') {
    response.status(400).send('Server requires application/json')
  } else {
    next()
  }
}

export const inputToConvertSchema = z.object({
  body: z
    .object({
      amount: z.string({
        required_error: 'Amount is required'
      }),
      from: z
        .string({
          required_error: 'currency to convert from is required'
        })
        .max(3),
      to: z
        .string({
          required_error: 'currency to convert to is required'
        })
        .max(3)
    })
    .strict()
})

export const validateInput = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    })
    next()
    return
  } catch (error) {
    return res.status(400).json(error)
  }
}
