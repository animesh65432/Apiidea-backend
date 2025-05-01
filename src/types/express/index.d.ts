declare namespace Express {
    interface Request {
        user?: {
            Id: number,
            Email: string
        }
    }
}