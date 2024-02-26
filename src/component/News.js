import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const [articles,setArticles]=useState([])
const [page,setPage]=useState(1)
const [totalResults,setTotalResults]=useState(0)
const [loading,setLoading]=useState(true)

const updateNews=async()=>{
  props.setProgress(10)
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(35)
    let data= await fetch(url);
    let parsedData= await data.json(data)
    props.setProgress(70)
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false)  
    props.setProgress(100)
}

useEffect(()=>{
  document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
  updateNews();
   // eslint-disable-next-line
},[])
 
//  const handlePreviousClick=async()=>{
//     setPage(page-1)
//     updateNews();
//   }

//  const handleNextClick=async()=>{
//     console.log("i am next");
//     if(!(page+1> Math.ceil(totalResults/props.pageSize))){
//     setPage(page+1)
//     updateNews();
//   }
//   }

  const fetchMoreData=async ()=>{
   
         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
         setPage(page+1)
         // this.setState({loading:true});
    let data= await fetch(url);
    let parsedData= await data.json(data)
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
  }
 
    return (
      < >
        <h1 className="text-center" style={{margin:"35px 0px",marginTop:"90px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

        {loading && <Spinner/>}
      
        {/* !this.state.loading && */} {/*neche wali line me likhna hai */}
        <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
    // inverse={true} //
    hasMore={articles.length !==totalResults}
    loader={<Spinner />}
    // scrollableTarget="scrollableDiv"
    >
      <div className="container">   
         <div className="row">
        { articles.map((element)=>{
          return  <div className="col-md-4"  key={element.url}>
          <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} 
          author={element.author} date={element.publishedAt} source={element.source.name}/>      
              </div>
            })}
            </div>
            </div>
            </InfiniteScroll>  
        {/* <div className="container d-flex justify-content-between" >
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
}

News.defaultProps = {
  pageSize:5,
  country:'in',
  category:'general'

}

News.propTypes = {
  pageSize:PropTypes.number,
  country:PropTypes.string,
  category:PropTypes.string

}

export default News
