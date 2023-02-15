import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

const ImportData = () => {
  const [fileName, setFileName] = React.useState('파일을 선택해 주세요');

  const uploadInput = useRef(null);

  const handleOnChange = async (e: any) => {
    console.log('e.target.files', e.target.files);

    setFileName(e.target.files[0].name);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    const wb = XLSX.read(data, {
      cellDates: true,
      dateNF: 'YYYY-MM-DD',
    });

    console.log('wb:', wb);

    var EXCEL_JSON = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], {
      raw: false,
      blankrows: false,
      //   header: 1,
    });

    console.log('EXCEL_JSON', EXCEL_JSON);

    //api서버로 보내기
    fetch('http://localhost:8080/api/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(EXCEL_JSON),
    }).then((res) => {
      alert(res.statusText);
    });
  };

  return (
    <div>
      {/* <button onClick={handleOnChange}>upload</button> */}
      <input
        type='file'
        name='upload'
        id='upload'
        ref={uploadInput}
        //style={{ display: 'none' }}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default ImportData;
