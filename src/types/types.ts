export type BoardDataState = {
    appData: {
        name: string
        sideBarState: string
        login: string
        loginMenu: boolean
        canvasData: CellDataType[]
    }
}

export type CellDataType = {
    _id: string;
    data: {
        name: string,
        color: string,
        createdAt: string,
        data: {
            value: number,
            text?: string
        }
    }
    x: number;
    y: number;
}

export type postDataType = {
    x: number,
    y: number,
    userName: string,
    userColor: string,
    cellData: {
        value: number;
        info?: string
    },
};