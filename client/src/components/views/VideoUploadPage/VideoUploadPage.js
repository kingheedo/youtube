import React,{useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {useSelector} from 'react-redux'

const {TextArea} = Input;
const {Title} = Typography;

const PrivateOptions=[
    {value:0, label:"Private"},
    {value:1, label:"Public"},

]
const CategoryOptions = [
    {value:0, label:"Film & Animation"},
    {value:1, label:"Auto & Vehicles"},
    {value:2, label:"Music"},
    {value:3, label:"Pets & Animals"},


]

function VideoUploadPage(props) {
const user = useSelector(state=> state.user); //
const [VideoTitle, setVideoTitle] = useState("")
const [Description, setDescription] = useState("")
const [Private, setPrivate] = useState(0)
const [Category, setCategory] = useState("Film & Animation")
const [FilePath, setFilePath] = useState("")
const [Duration, setDuration] = useState("")
const [ThumbNailPath, setThumbNailPath] = useState("")

const onTitleChange = (e) =>{
    console.log(e.currentTarget)
    setVideoTitle(e.currentTarget.value)
}
const onDescriptionChange = (e) =>{
    setDescription(e.currentTarget.value)
}
const onPrivateChange =(e) =>{
    setPrivate(e.currentTarget.value)
}
const onCategoryChange =(e) =>{
    setCategory(e.currentTarget.value)
}
const onDrop = (files) => {

    let formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    console.log(files)
    formData.append("file", files[0])

    Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if (response.data.success) {

                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath)

                //gerenate thumbnail with this filepath ! 

                Axios.post('/api/video/thumbnail', variable)
                    .then(response => {
                        if (response.data.success) {
                            setDuration(response.data.fileDuration)
                            setThumbNailPath(response.data.thumbsFilePath)
                        } else {
                            alert('Failed to make the thumbnails');
                        }
                    })


            } else {
                alert('failed to save the video in server')
            }
        })

}

const onSubmit = (e) =>{
    e.preventDefault();

    const variable = {
        writer:user.userData._id,  //리덕스에서 받아온 유저id
        title:VideoTitle,
        description:Description,
        privacy:Private,
        filePath:FilePath,
        category:Category,
        duration:Duration,
        thumbnail:ThumbNailPath,
    }
    Axios.post('/api/video/uploadVideo', variable)
    .then(response =>{
        if(response.data.success){
            if(response.data.success){
                message.success('성공적으로 업로드를 헀습니다.')

                setTimeout(()=>{
                    props.history.push('/')
                },3000);

            }else{
                alert('비디오 업로드에 실패 했습니다.')
            }
        }
    })
}
return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Upload Video</Title>
        </div>
        
             <Form onSubmit={onSubmit}>
                 <div style={{display:'flex', justifyContent:'space-between'}}>
                        {/* Drop zone */}
             <Dropzone 
             onDrop={onDrop}
             multiple={false}
             maxSize={1000000000}
             >
             {({getRootProps, getInputProps})=>(
                 <div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                 alignItems:'center' ,justifyContent:'center'}} {...getRootProps()}>
                     <input{...getInputProps()}/>
                     <Icon type="plus" style={{fontSize:'3rem'}}/>
                     </div>
             )}
             </Dropzone>
             
                        {/* Thumbnail */}
                        {ThumbNailPath&&
                        <div>
                            <img src={`http://localhost:5000/${ThumbNailPath}`} alt="thumbnail"/>
                            
                        </div>
                        }
                 </div>

                 <br/>
                 <br/>
                 <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br/>
                 <br/>
                 <label>Description</label>
                 <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                 />
                 <br/>
                 <br/>

                 <select onChange={onPrivateChange}>
                 {PrivateOptions.map((item,index)=>(
                     <option key={index} value={item.value}>{item.label}</option>
                 ))}
                 </select>
                <br/>
                 <br/>

                 <select onChange={onCategoryChange}>
                     {CategoryOptions.map((item,index)=>(
                     <option key = {index} value={item.value}>{item.label}</option>

                     ))}
                 </select>
                 <br/>
                 <br/>
                 <Button type="primary"  size="large" onClick={onSubmit}>
                    Submit
                </Button>
             </Form>
    </div>
)
}

export default VideoUploadPage
