export interface ReturnType<T>{
    code:number,
    msg:string,
    data:T
}
export interface DataType<T> {
    count: number;
    rows: T[];
}
