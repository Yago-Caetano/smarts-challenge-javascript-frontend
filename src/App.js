import React, {useState, useEffect} from 'react';
import './App.css';
import CardItem from './components/cardItem';

import api from './services/api';


function App() {

  const [datas, setDatas] = useState([]);
  const [page,setPage] = useState(1);
  const [limitPerPage,setlimitPerPage] = useState(5);
  const [orderBy,setOrderBy] = useState("alphabetic1");
  const [limit,setLimit] = useState(1);
  const [prevEnabled,setPrevEnabled] = useState(true);
  const [nextEnabled,setNextEnabled] = useState(false);
  const [startDate,setStartDate] = useState(undefined)
  const [endDate,setEndDate] = useState(undefined)

  function handlerlimitPerPage(event)
  {
      setlimitPerPage(event.target.value);
  }


  function handlerOrdenation(orderBy)
  {
      setOrderBy(orderBy);
      
  }

  function handlerStartDate(event){
     setStartDate(event.target.value);
  }

  function handlerEndDate(event){
    setEndDate(event.target.value);
  }

  function handlerNextPage() {
    console.log(`Next Page - limit :${limit} current: ${page}`)
    if(page<limit)
    {
      let aux = page;
      aux+=1;
      setPage(aux);
      disableButtons(aux);
    }
  }


  function handlerPreviousPage()
  {
    console.log(`previous Page - limit :${limit} current: ${page}`)
    if(page > 1)
    {
      let aux = page;
      aux-=1;
      setPage(aux);
      disableButtons(aux)
    }
  }


  function searchByDateInterval()
  {
    getDataFromServer();
  }

  function disableButtons(pageValue)
  {
    if(pageValue>=limit)
    {
      setNextEnabled(true)
    }
    else{
      setNextEnabled(false)
    }
    
    if(pageValue > 1)
    {
      setPrevEnabled(false)
    }
    else{
      setPrevEnabled(true)
    }
  }

  function getDataFromServer(){
      api.get('Customers',{
        params:{
          page:page,
          limit:limitPerPage,
          orderBy:orderBy,
          iDate:startDate,
          eDate:endDate
        }
      }).then((resp)=>{
        console.log(resp);
        setDatas(resp.data.anws);
        setLimit(resp.data.totalPages);
      })
  }


  useEffect(()=>{
    getDataFromServer();
  },[limitPerPage,orderBy,page]);



  return (
    <div className="App">
        <div className="main-container"> 
        <div className="title-container">Smarts Dashboard</div>
        <div className="filters-container">
          <button className="btn-top" onClick={()=>handlerOrdenation("budget-1")}>🢁 Budget</button>
          <button className="btn-top" onClick={()=>handlerOrdenation("budget1")}>🢃 Budget</button>
          <button className="btn-top" onClick={()=>handlerOrdenation("alphabetic1")}>A-Z</button>
          <button className="btn-top" onClick={()=>handlerOrdenation("alphabetic-1")}>Z-A</button>
        </div>

        <div className="date-filter-container">
          <label id="inicioDate">De:</label>
          <input id="inicioDate" type="date" onChange={handlerStartDate}></input>
          <label id="finalDate">Até:</label>
          <input id="finalDate" type="date" onChange={handlerEndDate}></input>
          <button className="btn" onClick={searchByDateInterval}>Filtrar</button>
          <label id="limitPerPage">Elementos por página:</label>
          <input id="limitPerPage" type="number" step="1.0" min="1" max="10" onChange={handlerlimitPerPage}></input>
        </div>

          <div className="list-container">
              {
                   datas.map(data => (
                    <CardItem data={data}></CardItem>
                ))
              }
         </div>
         <div className="page-controller-container">
            <button className="btn-bottom" onClick={handlerPreviousPage} disabled={prevEnabled}>🢀</button>
            <button className="btn-bottom" onClick={handlerNextPage} disabled={nextEnabled}>🢂</button>
          </div>

    </div>
  
    </div>
  );
}



export default App;
