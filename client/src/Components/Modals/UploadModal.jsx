import React, {useState} from 'react';
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Typography
} from '@material-ui/core'
import {FilePond, registerPlugin} from "react-filepond";
import {UPLOAD_URL} from '../../config';
import Swal from "sweetalert2";
import apiRequest from '../../Helpers/apiRequest';
import 'filepond/dist/filepond.min.css';
import PropTypes from "prop-types";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 600,
        color: theme.palette.secondary.main,
        textAlign: 'center',
        fontSize: 20,
    },
    loadingDiv:{
        margin: '20px auto',
    }
}));



// Модалка для отправки файлов админом
const UploadModal = props => {
    const classes = useStyles();
    const {
        setUploadModal,
        uploadModalOpen,
        changeDesc,
        changeTitle,
        changeLoading,
        desc,
        title,
        loading,
    } = props;

    // плагины для filepond для проверки размера файлов и превью картинок и правильаня ориенатция на мобилках
        registerPlugin(FilePondPluginFileValidateSize, FilePondPluginImagePreview, FilePondPluginImageExifOrientation, FilePondPluginFileValidateType);
    const [fileImage, setFileImageUpdated] = useState([]);

    //Отправляем файл в память
    const checkUploaded = (fileItems) => {
        setFileImageUpdated(fileItems.map(fileItem => fileItem.file))
    };

    // формируем multipart/form-data которую ждем бекенд
    const uploadToServer = async () => {
        changeLoading(true);
        const formData = new FormData();
        formData.append('file', fileImage[0]);
        formData.append('desc', desc);
        formData.append('title', title);
        const data = await apiRequest(UPLOAD_URL, 'POST', {'Content-Type': 'multipart/form-data'}, formData);
        if(data.data && data.data.result === 'success'){
            setUploadModal(false);
            changeLoading(false);
            changeTitle('');
            changeDesc('');
            Swal.fire({
                confirmButtonColor: '#ff3366',
                titleText: 'Успешно!',
                text: 'Вы успешно загрузили картинку',
                type: 'success'
            });
        }
    };


    return (
        <Dialog
            open={uploadModalOpen}
            onClose={() => {
                setUploadModal(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography  className={classes.title}>Загрузка новой картинки на сервер</Typography>
            </DialogTitle>
            <DialogContent>
                <FilePond
                    files={fileImage}
                    allowMultiple={true}
                    maxFiles={1}
                    labelMaxFileSizeExceeded='Файл слишком большой'
                    labelMaxFileSize={'Максимальный размер файла 5 мегабайта'}
                    labelIdle="Перетащите сюда файл или выберите"
                    labelFileProcessing="Загрузка"
                    labelFileProcessingComplete="Загрузка завершена"
                    labelFileProcessingError="Ошибка загрузки"
                    labelTapToCancel="Отменить"
                    labelTapToRetry="Заново"
                    labelTapToUndo="Отмена"
                    labelFileTypeNotAllowed={'Разрешены файлы только jpg и png'}
                    fileValidateTypeLabelExpectedTypes={''}
                    acceptedFileTypes={['image/*']}
                    maxFileSize='5MB'
                    onupdatefiles={checkUploaded}
                    fileValidateTypeDetectType={(file, type) => {
                        return new Promise((resolve, reject) => {
                            if(!type){
                                reject();
                            } else {
                                resolve(type)
                            }
                        })
                    }}
                />

                <Typography variant="caption" display="block" gutterBottom>*Размер файла не должен превышать 5 мегабайта</Typography>

            </DialogContent>
            {!loading ? <DialogActions>
                <Button onClick={uploadToServer} variant='contained' color="secondary" disabled={fileImage.length < 1}>
                    <Typography variant="button" display="block" gutterBottom>Загрузить</Typography>
                </Button>
                <Button onClick={() => {
                    setUploadModal(false)
                }}
                        color="secondary"
                        variant='outlined'>
                    <Typography variant="button" display="block" gutterBottom onClick={() => {
                        setUploadModal(false)
                    }}>Закрыть</Typography>
                </Button>
            </DialogActions>
            : <div className={classes.loadingDiv}>
                    <CircularProgress color={'secondary'}/>
                </div>}
        </Dialog>
    );
};


UploadModal.propTypes = {
    setUploadModal: PropTypes.func,
    title: PropTypes.string,
    desc: PropTypes.string,
    uploadModalOpen: PropTypes.bool,
    loading: PropTypes.bool,
    changeLoading: PropTypes.func,
    changeDesc: PropTypes.func,
    changeTitle: PropTypes.func
};

export default UploadModal;
