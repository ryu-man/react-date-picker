import React from 'react';
import { format as formatter } from 'date-fns';
import './date_input.css'

type DateInputProps = { selected: Date | undefined, format: string, action: (date: Date, value: number) => void }



export default ({ selected, format, action }: DateInputProps) => {
    let value: string = selected ? formatter(selected, format) : format
    return (
        <span className="date-input" contentEditable onKeyDown={onKeydownHandler} onInput={onInputHandler} suppressContentEditableWarning={true} >
            {value}
        </span>
    )

    function onKeydownHandler(e: React.KeyboardEvent) {
        e.key == 'Enter' && e.preventDefault()
    }

    function onInputHandler(e: React.FormEvent) {
        if (selected) {
            value = (e.currentTarget.textContent || '0')
            action(selected, +value)
        } else {

        }
    }
}