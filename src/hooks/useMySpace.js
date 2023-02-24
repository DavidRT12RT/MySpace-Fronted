import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

import { message, Modal } from "antd";

//Helper's
import { fetchConToken, fetchConTokenSinJSON } from '../helpers/fetch';

//Icon's
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';

const { confirm } = Modal;

export const useMySpace = () => {

    const initialState = {
        isModalVisible:{
            estado:false,
            tipo:null
        },
        isDirectory:false,
        filesList:[],
        filesListDragger:[],
        updatePath:false
    };

    const [values, setValues] = useState(initialState);
    const [files, setFiles] = useState({
        files:[],
        directories:[]
    });

    //React Router Doom
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const path = searchParams.get("path");

    //Redux
    const { auth } = useSelector(store => store);

    const getInfoPath = async() => {
        let query = (path === null ) ? "" : path;
        const resp = await fetchConToken(`/uploads/files/get-files/${query}`);
        const body = await resp.json();

        if(resp.status != 200) {
            message.error("Carpeta NO encontrada en el servidor,contacta a David!");
            return navigate(-1);
        }
            
        //Load files to redux controll state
        setFiles({
            files:body.content.files,
            directories:body.content.directories
        });

        setValues({...values,updatePath:false});
    }

    useEffect(() => {
        //Every time that paths changes we're going to request info from server 
        getInfoPath();
    }, [path]);

    useEffect(() => {
        //Every time updatePath property is true we're going to request info from server and set the files 
        if(values.updatePath) getInfoPath();
    }, [values.updatePath]);
    

    /* 
    useEffect(() => {
        socket.on("actualizar-archivos-usuario",(values) => {
            let query;
            if(values.query.startsWith("/")){
                query = (path === null ) ? "/" : `/${path}/`
            }else{
                query = (path === null ) ? "/" : path 
            }
            console.log("Nuestro path",query);
            console.log("Path que llega",values.query);
            //Checamos si el path es el mismo en el que estamos
            if(query === values.query){
                const fetchData = async() => {
                    const resp = await fetchConToken(`/usuarios/${uid}/archivos${query}`);
                    const body = await resp.json();
                    if(resp.status != 200) {
                        message.error("Carpeta NO encontrada en el servidor,contacta a David!");
                        return navigate(-1);
                    }
                    //Peticion con exito 
                    setArchivos({
                        files:body.content.files,
                        directories:body.content.directories
                    });
                }
                fetchData();               
            }

        });
    }, [socket,path]);
    */


    const uploadFile = async() => {

        let query = (path === null ) ? "/" : `/${path}/`;
        const formData = new FormData();
        for(let i = 0; i < values.filesList.length; i++) formData.append(`archivo ${i}`,values.filesList[i]);
        const resp = await fetchConTokenSinJSON(`/uploads/files/upload-file${query}`,formData,"POST");
        const body = await resp.json();
        if(resp.status != 200) return message.error(body.msg);
        //Archivo subido con exito al servidor
        message.success(body.msg);
        setValues({...values,filesList:[],isModalVisible:{estado:false,tipo:null},updatePath:true});

    }

    const downloadFile = async(file) => {

        let query = (path === null ) ? "/" : `/${path}/`;
        const resp = await fetchConToken(`/uploads/files/download-file${query}${file}`);

        if(resp.status !== 200) return message.error("Error download file");
        const bytes = await resp.blob();
        let element = document.createElement('a');
        element.href = URL.createObjectURL(bytes);
        element.setAttribute('download',file);
        element.click();


    }

    const deleteFile = async(file) => {

        let query = (path === null ) ? "/" : `/${path}/`;
        
        confirm({
            title:"Are you sure you want to delete this file",
            icon:<ExclamationCircleOutlined />,
            content:"File will be delete, this action is irreversible",
            okText:"DELETE",
            cancelText:"Go back",
            async onOk(){
                const resp = await fetchConToken(`/uploads/files/delete-file${query}${file}`,undefined,"DELETE");
                const body = await resp.json();
                if(resp.status !== 200) return message.error(body.msg);

                message.success(body.msg);
                setValues({...values,updatePath:true});
            }
        });


    }


    const makeDirectory = async(values) => {

        let query = (path === null ) ? "/" : `/${path}/` 
        const resp = await fetchConToken(`/uploads/files/create-directory${query}${values.name}`,undefined,"POST");
        const body = await resp.json();
        if(resp.status !== 201) return message.error(body.msg);
        message.success(body.msg);
        closeModal();

        setValues({...values,isModalVisible:{estado:false,tipo:null},updatePath:true});

    }

    const downloadDirectory = async(directory) => {

        let query = (path === null ) ? "/" : ("/"+path+"/") 
        const resp = await fetchConToken(`/uploads/files/download-directory${query}${directory}`);
        if(resp.status != 200) return message.error("Error download directory");
        const bytes = await resp.blob();
        let element = document.createElement('a');
        element.href = URL.createObjectURL(bytes);
        element.setAttribute('download',directory);
        element.click();

    }

    const deleteDirectory = async(directory) => {

        confirm({
            title:"Are you sure you want to delete this directory?",
            icon:<ExclamationCircleOutlined />,
            content:"It will delete ALL files inside of it and there will be no turning back",
			okText:"DELETE",
			cancelText:"Go back",
            async onOk(){
                let query = (path === null ) ? "/" : ("/"+path+"/") 
                const resp = await fetchConToken(`/uploads/files/delete-directory${query}${directory}`,{},"DELETE");
                const body = await resp.json();
                if(resp.status != 200) return message.error(body.msg);
                message.success(body.msg);
                setValues({...values,updatePath:true});
           }
        });

    }

    const closeModal = () => {
        setValues({
            ...values,
            isModalVisible:{
                estado:false,
                tipo:null
            }
        });
    }

    const openModal = (tipo)  => {
        setValues({
            ...values,
            isModalVisible:{
                estado:true,
                tipo
            }
        });
    }

    const uploadDirectory = () => {
        setValues({
            ...values,
            isDirectory:!values.isDirectory
        });
    }

    const propsDragger = {
        multiple:true,
        onRemove : file => {
            const newFiles = values.filesListDragger.filter(fileOnState => fileOnState.name != file.name);
            setValues({...values,filesListDragger:[newFiles]});
        },
        headers: {
            "x-token":localStorage.getItem("token")
        },
        action:async(file) => {
            let query = (path === null ) ? "/" : `/${path}/` ;
            const formData = new FormData();
            for(let i = 0; i < values.filesListDragger.length; i++) formData.append(`archivo ${i}`,values.filesListDragger[i]);
            const resp = await fetchConTokenSinJSON(`/uploads/files/upload-file${query}`,formData,"POST");
            const body = await resp.json();
            if(resp.status != 200) return message.error(body.msg);
            //Archivo subido con exito al servidor
            message.success(body.msg);
            setValues({...values,filesListDragger:[]});
        },
        beforeUpload: file => {
            //Checar si el archivo es PDF O XML
            setValues({...values,filesListDragger:[...values.filesListDragger,file]});
        },
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') return message.success(`${info.file.name} Uploaded successfully!.`);
            if (status === 'error') return message.error(`${info.file.name} Error to upload!.`);
        },

        listType:"picture",
        fileList : values.filesListDragger
    }

    const props = {
        multiple:true,
        onRemove : file => {
            const newFiles = values.filesList.filter(fileOnState => fileOnState.name != file.name);
            setValues({...values,filesList:[...newFiles]});
        },
        beforeUpload: file => {
            setValues({...values,filesList:[...values.filesList,file]});
            return false;
        },
        listType:"picture",
        fileList : values.filesList
    };


    return {
        navigate,
        propsDragger,
        props,
        path,
        name:auth.name,
        files,
        values,

        makeDirectory,
        uploadFile,
        deleteFile,
        downloadFile,
        downloadDirectory,
        deleteDirectory,

        closeModal,
        openModal,

        setSearchParams,
        uploadDirectory
    };
}
