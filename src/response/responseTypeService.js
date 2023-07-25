export const responseTypeService = async (data) =>{

    if (data.status == 'ok') {
        let result = {
            "status": data.status,
            "command": data.command,
            "Cantidad": data.rowCount,
            "Resultado": data.rows
        }
        return result

    } else if (data.status == 'error') {
        let result = {
            "status": 'error',
            "error": data.code
        }
        return result
    }

    return result
}

export const responseTypeServiceError = async (data) =>{
    
        let result = {
            "status": 'error',
            "error": data.code
        }
        return result

}