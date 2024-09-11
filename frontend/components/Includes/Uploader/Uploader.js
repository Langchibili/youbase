import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { api_url, getJwt } from '@/Constants';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export default function Uploader(props) {
  const maxFileSize = '10MB'; // 10MB limit for upload

  const handleProcess = async (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData();
    formData.append(props.allowMultiple ? 'files[]' : 'files', file);
    formData.append('refId', props.refId.toString());
    formData.append('ref', props.refName);
    formData.append('field', props.fieldName);

    const request = new XMLHttpRequest();
    request.open('POST', `${api_url}/upload`);
    request.setRequestHeader('Authorization', `Bearer ${getJwt()}`);
  
    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    }

    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        load(request.responseText);
      } else {
        error('Upload failed');
      }
    };

    request.onerror = () => error('Upload error');
    request.onabort = () => abort();

    request.send(formData);

    return {
      abort: () => {
        request.abort();
        abort();
      },
    };
  };

  const uploaderClassName = props.displayType === 'circular' ? 'filepond--circle' : '';

  return (
    <FilePond
      className={uploaderClassName}
      allowMultiple={props.allowMultiple}
      maxFileSize={maxFileSize}
      acceptedFileTypes={props.allowedTypes}
      server={{
        url: `${api_url}/upload`,
        process: handleProcess,
      }}
      stylePanelLayout={props.displayType}
    />
  );
}
