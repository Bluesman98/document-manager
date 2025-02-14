import { useEffect, useState } from "react";
import { getUrl } from 'aws-amplify/storage';
import '../CSS/Todo.css'

function Todo(props: any) {

  const [url, setUrl] = useState('')

  useEffect(() => {
    getTodoUrl(props.todo.filePath)
  }, []);

  const selectTodo = () => {
    props.setSelectedTodoId(props.todo.id)
  }

  async function deleteTodo() {
    await props.client.models.Todo.delete(props.todo)
  }

  async function getTodoUrl(id: any) {
    const linkToStorageFile = await getUrl({
      path: `Pdf_Storage/${id}.pdf`,
      // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
      options: {
        bucket: "bucket",
        validateObjectExistence: true,
        expiresIn: 300
      }
    });
    setUrl(linkToStorageFile.url.toString())
    //console.log(linkToStorageFile.url.toString())
    return linkToStorageFile.url.toString()
  }
  return (
    <div className={props.todo.id === props.selectedTodoId ? 'invoice-grid-row selected' : 'invoice-grid-row'} onClick={() => console.log(getTodoUrl(props.todo.content))}>
      <div>{props.todo.folderName}</div>
      <div>{props.todo.subFolderName}</div>
      <div>{props.todo.range}</div>
      <div>{props.todo.category}</div>
      <div>{props.todo.filePath}</div>
      <div>{props.todo.area}</div>
      <div>{props.todo.year}</div>
      <div>{props.todo.protocolNo}</div>
      <div>{props.todo.buildingBlock}</div>
      <div>{props.todo.approvalNo}</div>
      <div><a href={url} target="_blank" onClick={selectTodo}><button>View</button></a></div>
      {false && <div><button onClick={deleteTodo} style={{ marginLeft: '.5rem' }}>Delete</button></div>}
    </div>
  );
}

export default Todo;