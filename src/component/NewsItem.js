import React from "react";

const NewsItem =(props)=> {
    let {title,description,imageUrl,newsUrl,author,date,source}=props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:"flex",position:"absolute", justifyContent:"flex-end", right:"0%"}}>
        <span className="badge rounded-pill bg-success" style={{zIndex:1}}>
    {source}
  </span>
  </div>
          <img src={imageUrl==null?"https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author==null?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer"  className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
          
      </div>
    );
}
export default NewsItem;
