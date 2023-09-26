export const responseTypeDAO = async (data) =>{

    let result = {
        "status": "ok",
        "command": data.command,
        "rowCount": data.rowCount,
        "rows": data.rows
    }

    return result
}