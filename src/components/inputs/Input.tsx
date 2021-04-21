import React from 'react'
import styled from "styled-components";

type InputProps = {
    type: string,
    value?: string,
    name: string,
    label?: string,
    onChange?: any,
    placeholder?: string
}

export const Input: React.FC<InputProps> = ({ type, value, name, label, onChange, placeholder }) => {
    return (
        <>
            {label &&
                <LabelBlock>
                    <LabelDiv htmlFor={label} >{label}</LabelDiv>
                    <InputDiv type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />
                </LabelBlock>
            }

            {!label &&
                <InputDiv type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />}
        </>
    );
}

const InputDiv = styled.input`
 box-sizing: border-box;
 padding: 10px;
 border: 2px solid #707070;
 border-radius:5px;
 background-color: transparent;
 margin: 10px 0;
 font-family: 'Montserrat', sans-serif;
 color: white;
 min-width: 100%;
`

const LabelDiv = styled.label`
 font-family: 'Montserrat', sans-serif;
 color: white;
`

const LabelBlock = styled.div`
 text-align: left;
`