import React, { useState } from 'react'
import styled from "styled-components";
import { addToBoard } from "../apis";

interface SideBarProps {
    visible: boolean
}
type StageType = string
type VisibleType = boolean

export const SideBar: React.FC<SideBarProps> = ({ visible }) => {
    const [x, setX] = useState<StageType>("");
    const [y, setY] = useState<StageType>("");
    const [data, setData] = useState<StageType>("");
    const [open, setOpen] = useState<VisibleType>(visible)
    const randomColor = require("randomcolor");

    return (
        < SideBlock >
            {open && <>
                <input type="number" value={x} onChange={(e): void => setX(e.target.value)} />
                <input type="number" value={y} onChange={(e): void => setY(e.target.value)} />
                <input type="number" value={data} onChange={(e) => setData(e.target.value)} />

                <button
                    onClick={() => {
                        addToBoard({
                            userName: "rami",
                            userColor: randomColor(),
                            x: parseInt(x),
                            y: parseInt(y),
                            cellData: { value: parseInt(data) },
                        });
                    }}
                >
                    add cell
             </button>
            </>}

            <button onClick={() => setOpen(!open)}>X
            </button>
        </SideBlock >
    );
}

const SideBlock = styled.div`
 position: absolute;
 top: 0;
 width: 30%;
 height: 100%; 
 background: rgba(104, 104, 104, 0.3);
`