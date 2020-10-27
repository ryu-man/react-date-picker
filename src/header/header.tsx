import React, { Component } from 'react';
import { format } from 'date-fns'
import SVGIcon from '../svg_icon';
import * as Icons from '../svg_icons'
import './header.css'

type HeaderProps = { index: number, calendar: Date, onChange: (calendar: Date) => void, onClick: (e: any, index: number) => void }


const Header = ({index, calendar, onClick, onChange }:HeaderProps) => {

    return (
        <div className="header-container" onClick={e=>{
            e.nativeEvent.stopImmediatePropagation()
        }}>
            <button className="prev" onClick={(e) => prev(e, calendar, onChange)}><SVGIcon d={Icons.arrowLeft} /></button>
            <div className="title" onClick={(e) => onClick(e, index == 0 ? 1 : 2)}>
                <pre>{text(index, calendar)}</pre>
            </div>
            <button className="next" onClick={(e) => next(e, calendar, onChange)}><SVGIcon d={Icons.arrowRight} /></button>
        </div>
    )

    function next(e: any, calendar: Date, onChange: (calendar: Date) => void) {
        calendar.setMonth(calendar.getMonth() + 1)
        onChange(new Date(calendar))
    }
    function prev(e: any, calendar: Date, onChange: (calendar: Date) => void) {
        calendar.setMonth(calendar.getMonth() - 1)
        onChange(new Date(calendar))
    }
    function text(index: number, calendar: Date): string {
        let _text: string
        switch (index) {
            case 0:
                _text = format(calendar, 'MMMM');
                break
            case 1:
                _text = calendar.getFullYear().toString().padStart(4, '0')
                break;
            case 2:
                _text = `${calendar.getFullYear() - 4} - ${calendar.getFullYear() + 4}`
                break
            default: _text = ''
        }

        return _text
    }
}
export default Header;