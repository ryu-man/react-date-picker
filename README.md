# React date picker

This is an implementation of a custom date picker using React.js framework

## Usage

```js
import { Picker, Calendar } from "react-date-picker";

let selected;
// simple form
<Picker>
 <Calendar />
</Picker>;
```

```js
import {Picker, Calendar} from 'react-date-picker'

let selected
let initial = new Date(selected || "2020-10-10")

<Picker  >
 <Calendar initial={initial} onDateSelected={(date) => {selected = date}} />
</Picker>

```

## Props

### Picker

| Prop     | Type   | Default       | Usage                                            |
| ---------| ------ | ------------- | ------------------------------------------------ |
| format   | String | "dd MMM yyyy" | used in picker input to format the selected date |

### Calendar

| Prop           | Type                 | Default   | Usage                                       |
| -------------- | -------------------- | --------- | ------------------------------------------- |
| initial        | Date                 | today     | used for the starting point                 |
| selected       | Date                 | undefined | specify a selected date                     |
| predicate      | (date:Date)=>boolean | ()=>false | used to check if the date is not selectable |
| onDateSelected | (date:Date)=>void    | ()=>{}    | callback called when the date is selected   |
