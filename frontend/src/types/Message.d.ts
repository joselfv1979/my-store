export const Status = {
    danger: 'danger',
    success: 'success'
}

export type Message = {
    type: Status,
    text: string | undefined
}