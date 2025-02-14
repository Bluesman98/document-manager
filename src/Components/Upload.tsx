import { list, uploadData } from 'aws-amplify/storage';
import React from 'react';
import * as XLSX from 'xlsx';
import '../CSS/Upload.css';
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";


const client = generateClient<Schema>();

const fetchStorage = async () => {
  const result = await list({
    path: 'Pdf_Storage/',
    options: {
      bucket: "bucket"
    }
  });
  console.log(result)
}

function Upload() {

  const [files, setFiles] = React.useState([]);
  const [metaData, setMetadata] = React.useState<unknown[][]>([]);

  const handleMetadataInput = async (event: any) => {
    const targetFiles = event.target.files;
    // Process the uploaded files
    console.log('Selected Files: ', targetFiles)
    event.stopPropagation(); event.preventDefault();
    const f = targetFiles[0];
    /* f is a File */
    const data = await f.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);

    console.log('Selected Workbook: ', workbook)
    let temp = []

    for (let i = 0; i < workbook.SheetNames.length; i++) {
      temp.push(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]))
    }

    console.log("temp: ",temp)
    setMetadata(temp)
  }

  const handleFileInput = (event: any) => {

    const targetFiles = event.target.files;

    // Process the uploaded files
    setFiles(targetFiles)
    console.log('Selected Files: ', targetFiles)

  };

  async function uploadFiles() {
    let results = []
    let errors = []
    console.group('Uploading Files');
    for (const file of files) {
      try {
        const result = await uploadData({
          path: `Pdf_Storage/${file['name']}`,
          data: file,
        }).result;
        //console.log('Succeeded: ', result);
        results.push('Succeeded: ', result)
        //createTodo(String(file['name']).split('.').slice(0, -1).join('.'))
      } catch (error) {
        //console.log('Error : ', error);
        errors.push('Error : ', error)
      }
    }
    if (results.length) console.log('Completed: ', results)
    if (errors.length) console.log('Errors: ', errors)
  }

  async function createData(metaData: Array<any>) {
    console.group('Uploading Data');
    for (const sheet of metaData) {
      for (const row of sheet){     //createTodo(row.barcode, row.vendorName, row.invoiceDate, row.entryDate, row.taxCode)
       //if( row['Ονομασία Αρχείου'] === 'Ν.3843-2010'){
        await createTodo(row['ΦΑΚΕΛΟΣ'], row['ΥΠΟΦΑΚΕΛΟΣ'], row['ΕΥΡΟΣ'], row['Ονομασία Αρχείου'], row['Filepath'], row['ΠΕΡΙΟΧΗ'], row['ΕΤΟΣ'], row['ΑΡ. ΠΡΩΤΟΚΟΛΟΥ'], row['Ο.Τ.'], row['ΑΡ. ΕΓΚΡΙΣΗΣ'])
        //console.log(row['ΦΑΚΕΛΟΣ'], row['ΥΠΟΦΑΚΕΛΟΣ'], row['ΕΥΡΟΣ'], row['Ονομασία Αρχείου'], row['Filepath'], row['ΠΕΡΙΟΧΗ'], row['ΕΤΟΣ'], row['ΑΡ. ΠΡΩΤΟΚΟΛΟΥ'], row['Ο.Τ.'], row['ΑΡ. ΕΓΚΡΙΣΗΣ'])
        // }
    }
 
    }
    console.log('Completed: ', metaData)
}

  /*async function getTodoUrl(id: any) {
    const linkToStorageFile = await getUrl({
      path: `File_Storage/${id}.pdf`,
      // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
      options: {
        bucket: "bucket",
        validateObjectExistence: true,
        expiresIn: 900
      }
    });
    return linkToStorageFile.url.toString()
  }*/

  async function createTodo(
      folderName: string,
      subFolderName: string,
      range: string,
      category: string,
      filePath: string,
      area: string,
      year: string,
      protocolNo: string,
      buildingBlock: string,
      aproovalNo: string
) {
  const { data: updatedTodo, errors } = await client.models.Todo.create({folderName : folderName, subFolderName : subFolderName, range : range, category : category, filePath : filePath, area : area, year : year, protocolNo : protocolNo, buildingBlock : buildingBlock, aproovalNo : aproovalNo});
  console.log('Errors', errors)
  console.log(updatedTodo)
  return updatedTodo;  
}

  return (
    <div className="container">
      <div className='upload'>
        {true && <input type="file" multiple onChange={handleFileInput} />}
        {true && <button
          onClick={() =>
            uploadFiles()
          }
        >Upload Pdf's</button>}
      </div>
      <div className='upload'>
        {true && <input type="file" onChange={handleMetadataInput} />}
        {true && <button
          onClick={() =>
            createData(metaData)
          }
        >Upload Metadata</button>}
      </div>
      {false && <button
        onClick={() =>
          fetchStorage()
        }
      >List Storage</button>}
    </div>
  );
}

export default Upload;