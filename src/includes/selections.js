import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Selections = () => {

    const dispatch = useDispatch();
    const selections = useSelector(state => state.selections);

    if (selections.length !== 0) {
        return (
            <div style={{
                margin: 15
            }}>
                <div style={{
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>Selections - groupes</div>

                {selections.map((selection, index) => {
                    return (
                        <div key={index} style={{
                            margin: 10,
                            marginLeft: 0,
                            cursor: 'pointer'
                        }}>
                            <div>{selection.selection.selection_name}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return null
    }
}

export default Selections;
