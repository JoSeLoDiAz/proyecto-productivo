import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import url from 'url'

const uploadFile =(   files   , extensionesValidas=['zip', 'pdf', 'rar', 'xls', 'xlsx', 'ppt', 'pptx', 'doc', 'docx', 'jpg', 'jpeg', 'png'])=>{
    return new Promise( (resolve,reject)=>{
        const {archivo}=files;
        const nombreCortado=archivo.name.split('.');
        const extension=nombreCortado[nombreCortado.length-1];
        if(!extensionesValidas.includes(extension)){
            return reject(`La extensión ${extension} no es permitida, solo [${extensionesValidas}]`);
        }

        const nombreTemp  =  uuidv4()   +   "."   +   extension;
        const __dirname  =  path.dirname(url.fileURLToPath(import.meta.url));
        const uploadPath=path.join(__dirname,'../uploads/',nombreTemp);

        archivo.mv(uploadPath,(err)=>{
            if(err){
                return reject(err)
            }
            return resolve(nombreTemp);
        })

    })
}

export default uploadFile 