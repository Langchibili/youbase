'use client';

const DownloadSongButton = (props) => {
  if (props.filepath) {
    return (
      <a href={props.filepath} download={props.filepath.split('/').pop()} className="btn btn-danger">
        Download
      </a>
    );
  }
  return <button disabled className="btn btn-danger">Download</button>;
};

export default DownloadSongButton;
