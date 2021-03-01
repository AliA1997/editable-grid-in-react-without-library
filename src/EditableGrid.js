import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Input from './Input';
import './editableGrid.css';

const EditableGrid = forwardRef(
    (
        {
            people,
            showNoRecordsText = !(people && people.length)
        },
        ref
    ) => {
    const [stateOfPeople, setStateOfPeople] = useState(people);
    
    const inputRefs = useRef(new Set());

    const editColumn = async (evt, col) => {
        evt.preventDefault();
        let copyOfPeople = stateOfPeople.slice(),
            colIndex = copyOfPeople.findIndex(p => p.id == col.id);

        if(checkIfPersonIsInEditMode(col)) {
            await setNewPersonColumn(col);
        }
        col.editable = !col.editable;
        
        copyOfPeople[colIndex] = col;
        refreshGrid(copyOfPeople);
        inputRefs.current.clear();
    }

    const deleteColumn = async (evt, col) => {
        evt.preventDefault();

        if(checkIfCurrentEditedColumnBeingDeleted(col)) inputRefs.current.clear();

        if(window.confirm(`You sure you want to delete this person(${col.firstName} ${col.lastName}) from the grid?`)) {

            const copyOfPeople = stateOfPeople.slice(),
                  currentPersonBeingDeletedIndex = copyOfPeople.findIndex(p => p.id === col.id);
        
            copyOfPeople.splice(currentPersonBeingDeletedIndex, 1);

            ref.current.removeChild(ref.current.children[currentPersonBeingDeletedIndex]);

            refreshGrid(copyOfPeople);
        }
    }

    const checkIfPersonIsInEditMode = (col) => {
        return col.editable == true;
    }

    const checkIfGridInputReferenceBeingEdited = (currentGridInputReference, col) => {
        return currentGridInputReference.current ? currentGridInputReference.current.id == col.id : false;
    }

    const setNewPersonColumn = async (col) => {
        inputRefs.current.forEach(
            (currentGridInputReference, set) => {
                if(checkIfGridInputReferenceBeingEdited(currentGridInputReference, col)) {
                    col[currentGridInputReference.current.name] = currentGridInputReference.current.value;
                }
            }
        );
    }

    const checkIfCurrentEditedColumnBeingDeleted = (col) => {
        const result = false;
        inputRefs.current.forEach(
            (currentGridInputReference, set) => {
                if(currentGridInputReference.id === col.id) result = true;
            }
        );
        return result;
    }

    const refreshGrid = newPeople => {
        setStateOfPeople(newPeople);
    }

    return (
        <div id="editable-grid-container">
            <table id="editable-grid">
                <thead className="sub-container space-between">
                    <div className="person-item-header">
                        <th>
                            <p>First Name</p>
                        </th>
                        <th>
                            <p>Last Name</p>
                        </th>
                        <th>
                            <p>Email</p>
                        </th>
                        <th className="action">
                            <p>Edit</p>
                        </th>
                        <th className="action">
                            <p>Delete</p>
                        </th>
                    </div>
                </thead>
                <tbody className={`sub-container ${showNoRecordsText ? 'center' : 'space-between'} people-items`} ref={grid => ref.current = grid}>
                    {
                        !showNoRecordsText 
                        ? people.map(
                            eachPerson => (
                                <div className="person-item" key={eachPerson.id}>
                                    <td>
                                        {
                                            eachPerson.editable 
                                            ? <Input name="firstName" id={eachPerson.id} type="text" value={eachPerson.firstName} gridInputReferences={inputRefs} gridRef={ref} /> 
                                            : eachPerson.firstName
                                        }
                                    </td>
                                    <td>
                                        {
                                            eachPerson.editable 
                                            ? <Input name="lastName" id={eachPerson.id} type="text" value={eachPerson.lastName} gridInputReferences={inputRefs} gridRef={ref} /> 
                                            : eachPerson.lastName
                                        }
                                    </td>
                                    <td>
                                        {
                                            eachPerson.editable 
                                            ? <Input name="email" id={eachPerson.id} type="text" value={eachPerson.email} gridInputReferences={inputRefs} gridRef={ref} /> 
                                            : eachPerson.email
                                        }
                                    </td>
                                    <td className="action">
                                        <button className="edit-btn" onClick={e => editColumn(e, eachPerson)}>{eachPerson.editable ? `Update` : `Edit`}</button>    
                                    </td>
                                    <td className="action">
                                        <button className="delete-btn" onClick={e => deleteColumn(e, eachPerson)}>Delete</button>
                                    </td>
                                </div>
                            )
                        )
                        : <p>There is no data.</p>
                    }
                </tbody>
            </table>
        </div>
    );
});

export default EditableGrid;