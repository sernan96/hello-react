import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  return (
    <header>
        <h1><a href ="/" onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode();//App에서 적어줬던 onChangeMode에 있는 함수 호출
        }}>{props.title}</a></h1>
    </header>
  )
}
function Nav(props){
  const lis = []
  for(let i =0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a href={'/read/'+t.id} onClick = {event=>{
      event.preventDefault();
      props.onChangeMode(Number(t.id));
    }}>{t.title}</a>
    </li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function Article(props){
  return(
    <article> 
      <h2>{props.title}</h2>
      {props.body}  
    </article>
  )
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type ="text" name="title" placeholder="title"/></p>
      <p><textarea name ="body" placeholder="body"></textarea></p>
      <p><input type ="submit" value="Create"/></p>
    </form>
  </article>
}
//헤더 영역, 네비게이션 영역, 아티클 영역들로 나뉨
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]);// useState로 감싸주어서 승격시켜줌
  let content =null;
  if(mode==='WELCOME'){
    content = <Article title="Welcome" body="Hello, Web"></Article>;
  }else if(mode ==='READ'){
    let title, body =null;
    for(let i =0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id===id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  }else if(mode ==='CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]; 
      newTopics.push(newTopic);
      //original data 건들 ㄴㄴ
      setTopics(newTopics);
    }}></Create>
  }
  return (
    <div className="App">
      <Header title="REACT" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <a href="/create" onClick={event=>{
        event.preventDefault();
        setMode("CREATE");
      }}>Create</a>
    </div>
  );
}

export default App;
