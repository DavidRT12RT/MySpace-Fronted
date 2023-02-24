import React from 'react'

//Icon's
import { FolderFill,FileEarmarkTextFill } from 'react-bootstrap-icons';


export const Dirent = ({
    isDirectory,
    name,
    path,
    setSearchParams,
}) => {

    const nameOriginal = name;
    if(name.length > 20 && (!isDirectory)) name = name.slice(0,18) + "..."; 

    if(name.length > 16 && isDirectory) name = name.slice(0,16) + "...";

    return (
        <div className="card" style={{height:"70px",minWidth:"290px",maxWidth:"380px"}}>
            <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                    <span style={{color:"#61AFEF",fontSize:"24px",marginRight:"7px"}}>{isDirectory ? <FolderFill/> : <FileEarmarkTextFill/>}</span>
                    { 
                        isDirectory 
                        ? 
                            <span onClick={(e)=>{
                                e.preventDefault();
                                let query = (path === null ) ? nameOriginal : (path + `--${nameOriginal}`);
                                setSearchParams({path:query});
                            }} className="descripcion">{name}
                            </span> 
                        : 
                            <span className="descripcion">{name}</span>
                    }
                </div>
            </div>
        </div>
    )
}
