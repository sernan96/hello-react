import logo from './logo.svg';
import './App.css';

function Header(){
  return (
    <header>
        <h1><a href ="/">WEB</a></h1>
      </header>
  )
}
function Nav(){
  return(
    <nav>
        <ol>
          <li><a href="/read/1">html</a></li>
          <li><a href="/read/2">css</a></li>
          <li><a href="/read/3">js</a></li>
        </ol>
      </nav>
  )
}
function Article(){
  return(
    <article> 
      <h2>Welcome</h2>
      Hello, Web  
    </article>
  )
}
//헤더 영역, 네비게이션 영역, 아티클 영역들로 나뉨
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;
