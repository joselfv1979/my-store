export enum Status {
    DANGER = 'danger',
    SUCCESS = 'success'
}

/**
 * The above type defines a message object with a status and text property.
 * @property {Status} type - The "type" property is of type "Status".
 * @property {string | undefined} text - The `text` property is a string that represents the content of
 * the message. It can also be `undefined` if there is no text content in the message.
 */
export type Message = {
    type: Status,
    text: string | undefined
};
