import { buscarCategorias } from "../dao/categoriaDAO.js";

export const buscarCategoriasService = async () => {
    const resultado = await buscarCategorias();
    console.log("Este es mi resultado Service",resultado);
    try{
        if(resultado != null){
            return resultado;
        }else{
            return null;
        }
    }catch (error){
        throw error;
    }
}

export default {buscarCategoriasService}