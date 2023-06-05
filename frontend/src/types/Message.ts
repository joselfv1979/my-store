export enum Status {
    DANGER = 'danger',
    SUCCESS = 'success'
}

export type Message = {
    type: Status,
    text: string | undefined
};
