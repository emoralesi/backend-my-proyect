export const responseTypeDAO = async (data) =>{

    let result = {
        "status": "ok",
        "command": data.command,
        "rowCount": data.rowCount,
        "rows": data.rows
    }

    return result
}

export const responseTypeDAOError = async (data) =>{

    let result = {
        "status": "error",
        "code": data.code
    }

    return result
}