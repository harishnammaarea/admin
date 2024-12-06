interface Option {
    [x: string]: any
    label: string
    value: string | boolean | number
}

export default Option

export interface SelectOptions {
    label: string,
    value: string | number | boolean
}

export interface NestedSelectionOptions {
    childrean: (string | boolean | number)[]
    label: string
    value: string | number | boolean
}