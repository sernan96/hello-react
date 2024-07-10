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
//헤더 영역, 네비게이션 영역, 아티클 영역들로 나뉨
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics =[
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]
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
    </div>
  );
}

export default App;
