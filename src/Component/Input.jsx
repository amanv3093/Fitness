import React,{useEffect, useState} from 'react'

function Input() {
    let [data,setData]=useState([]);
    let [mainData,setmainData]=useState([])
    let [searchValue, setSearchValue] = useState('');
    let [count,setCount]=useState(26)


    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('https://exercisedb.p.rapidapi.com/exercises',{
                  method:'GET',
                  headers :{
                  'X-RapidAPI-Key': '672444eaf8msh8b507bd5de45338p1fdda4jsn1ef9821237db',
                  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
                  }
              });
              const parsedResponse = await response.json();
              setData(parsedResponse)
              setmainData(parsedResponse)
            } catch (error) {
              console.error(error);
            }
          };
        
        fetchData()
    }, []);

    let handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        if (e.target.value === '') {

            setData(mainData);

        } else {

          let a=mainData.filter((element,index)=>{
            return element.bodyPart.toLowerCase().includes(value) || element.target.toLowerCase().includes(value);
          })
          setData(a);

          console.log(a);
        }
      };

  


    
  return (
    <div>
    <p className='para'>Exercise List</p>
    <input type='text' onChange={handleSearch} value={searchValue} placeholder='Search by target,body part, or exercise'/>
        <div className='all-box'>
            {
                data.map((e,index)=>(
                    index <=count ? (
                        <div className='box'>
                            <img width='100%' src={e.gifUrl}/>
                            <h2>{e.name}</h2>
                            <p>{e.target}</p>
                            <p>{e.bodyPart}</p>
                        
                        </div>
                    
                    ):null
                    
     
                ))
            }
    
        </div>

      
        <button id="showmore" onClick={()=>setCount(count+27)}>
        <span>Load more</span>
        <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
            <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
        </svg>
    </button>
      
    </div>
  )
}

export default Input
