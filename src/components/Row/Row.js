import React from 'react';
import styles from './Row.css';

const row = (props) => {
    const options = props.currencies.map(cur => {
        return (
            <option value={cur}
                    key={cur}
            >
                {cur}
            </option>
        )
    })
    return (
        <div className={styles.Row}>
            <input/>
            <select defaultValue={props.default}>
                {options}
            </select>
        </div>
    )
}
export default row;