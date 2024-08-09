export interface Notification {
    type:"error" | "info" | "success" | "warning";
    title:string,
    message:string
}