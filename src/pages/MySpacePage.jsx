import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import { Checkbox, Divider ,Modal,Upload,Button,Form,Input } from 'antd';

//Icon's
import { CloudArrowUpFill,FileArrowDownFill,TrashFill,FolderPlus,Arrow90degUp } from 'react-bootstrap-icons';
import { InboxOutlined,UploadOutlined } from "@ant-design/icons";

//Custom hook's
import { useMySpace } from '../hooks/useMySpace';

//Component's
import { Dirent } from '../components/MySpacePage/Dirent';
import { Navbar } from "../components/General/Navbar";
import { Footer } from "../components/General/Footer";

//Style's
import "../css/MySpacePage.css";

//Extra component's
const { Dragger } = Upload;


export const MySpacePage = () => {

    //Custom hook for logic
    const { 
        makeDirectory,
        uploadFile,
        deleteFile,
        downloadFile,
        downloadDirectory,
        deleteDirectory,

        closeModal,
        openModal,

        navigate,
        path,
        values,
        props,
        propsDragger,
        name,
        files,

        setSearchParams,
        uploadDirectory
    } = useMySpace();


    return (
        <>
            <Navbar/>
            <div className="container p-5" style={{minHeight:"100vh"}}>
                <h1 className="titulo text-center">Welcome back <span className="text-primary">{name}</span> 😀👋</h1>
                <Divider/>
                <Dragger {...propsDragger} style={{borderStyle:"dashed",borderWidth:"medium",padding:"20px"}} directory={values.isDirectory}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="titulo-descripcion">Click or drag to this area to upload</p>
                    <p className="descripcion text-muted">Support for a lot of files with different types.</p>
                </Dragger>
                <Checkbox checked={values.isDirectory} className="mt-3" onClick={uploadDirectory}>Upload directory</Checkbox>
                <p className="nota text-muted">(Make a directory to store all the files)</p>
                <button 
                    className="btn btn-primary d-block w-100 descripcion mt-4" 
                    style={{color:"#fff",backgroundColor:"#2b4764",borderColor:"#28415b",padding:"8px 16px",fontSize:"18px",borderRadius:"0.3rem"}} 
                    onClick={() => openModal("subir-archivos")}
                >
                    Upload file(s) <span style={{fontSize:"25px"}}><CloudArrowUpFill/></span>
                </button>
                <button 
                    type="primary" 
                    className="d-block w-100 mt-3 descripcion" 
                    style={{color:"#fff",backgroundColor:"#00bc8c",borderColor:"#00bc8c",padding:"8px 16px",fontSize:"18px",borderRadius:"0.3rem"}} 
                    onClick={()=>{openModal("crear-directorio")}}
                > 
                    Make directory <span style={{fontSize:"25px"}}><FolderPlus/></span>
                </button>
                <Divider/>
                <div className="mt-4 d-flex justify-content-start align-items-center flex-wrap gap-2">
                    {
                        path != null && (
                            <div className="card">
                                <div className="card-body">
                                    <span style={{color:"#61AFEF",fontSize:"24px",marginRight:"7px"}}><Arrow90degUp/></span>
                                    <span className="descripcion" onClick={()=>{
                                       navigate(-1);
                                    }}>Go up</span>
                                </div>
                            </div>
                        )        
                    }

                    <p className="titulo-descripcion" style={{width:"100%"}}>Directories</p>
                    {files.directories.map(directory => (
                        <>
                            <ContextMenuTrigger id={directory}>
                                <Dirent 
                                    id={directory} 
                                    key={directory} 
                                    isDirectory={true} 
                                    name={directory} 
                                    path={path} 
                                    setSearchParams={setSearchParams} 
                                />
                            </ContextMenuTrigger>

                            <ContextMenu id={directory} className="contextMenu">
                                <MenuItem onClick={() => {downloadDirectory(directory)}} className="mt-3 descripcion">
                                    <p><span style={{color:"#61AFEF",fontSize:"22px",cursor:"pointer"}}><FileArrowDownFill/></span> Download directory</p>
                                </MenuItem>
                                <MenuItem onClick={() => {deleteDirectory(directory)}} className="mb-3 descripcion">
                                    <p><span style={{color:"#E06C75",fontSize:"22px",cursor:"pointer"}}><TrashFill/></span> Delete directory</p>
                                </MenuItem>
                            </ContextMenu>
                        </>
                       )
                   )}

                    <p className="titulo-descripcion mt-3" style={{width:"100%"}}>Files</p>
                    {files.files.map(file => (
                        <>
                            <ContextMenuTrigger id={file}>
                                <Dirent 
                                    id={file} 
                                    key={file} 
                                    isDirectory={false} 
                                    name={file} 
                                    path={path} 
                                    setSearchParams={setSearchParams} 
                                />
                            </ContextMenuTrigger>

                            <ContextMenu id={file} className="contextMenu">

                                <MenuItem onClick={() => {downloadFile(file)}} className="mt-3 descripcion">
                                    <p><span style={{color:"#61AFEF",fontSize:"22px",cursor:"pointer"}}><FileArrowDownFill/></span> Download file</p>
                                </MenuItem>

                                <MenuItem onClick={() => {deleteFile(file)}} className="mb-3 descripcion">
                                    <p><span style={{color:"#E06C75",fontSize:"22px",cursor:"pointer"}}><TrashFill/></span> Delete file</p>
                                </MenuItem>

                            </ContextMenu>
                        </>
                    ))}
                </div>
            </div>

            <Modal 
                open={values.isModalVisible.estado} 
                onOk={closeModal} 
                onCancel={closeModal} 
                footer={null}
            >
                <h1 className="titulo">{values.isModalVisible.tipo ==="crear-directorio" ? "Make directory" : "Subir archivos"}</h1>
                {
                    values.isModalVisible.tipo == "subir-archivos"
                    ? <>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined/>}>Selecciona el archivo(s)</Button></Upload>
                            <Button type="primary" 
                                onClick={uploadFile}>Subir archivo(s)
                            </Button>
                        </>
                    : 
                        <Form 
                            layout="vertical" 
                            onFinish={makeDirectory}
                        >
                            <Form.Item 
                                label="Directory name" 
                                name="name" 
                                rules={[{required:"true",message:"Name of directory required!"}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">Make directory</Button>
                        </Form>
                }
            </Modal>
            <Footer/>
        </>
    )
}
