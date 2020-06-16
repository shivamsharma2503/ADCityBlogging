import React, { Component } from 'react'
import queryString from 'query-string'
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Sidebar from "./sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComments, faUser} from '@fortawesome/free-solid-svg-icons'
import './card.css'


const styleFooter = {
  position: 'absolute',
  width: "100%"
}


export class Searchpageuser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[]
             
        }
    }
    componentDidMount(){

        this.loadPage()
       
     
    }
    loadPage() {
   const query = new queryString.parse(this.props.location.search)
   const loggeduser = JSON.parse(localStorage.getItem('user'));
   console.log(loggeduser)  
        fetch(`http://localhost:5000/api/test/searchuser/${loggeduser.id}/${query.q}`, { method: "POST" })
          .then((response) => response.json())
          .then((users) => {
            this.setState(() => ({ users }));
          });
      }
    
      render() {
        const {users} = this.state
        // window.location.reload();
        const query = new queryString.parse(this.props.location.search)
        return (
            <div>
            <div className="fixed-top">
            <Header/>
            </div>

            <div className="container mrgn">
              <div className="row">
            <div className="col-lg-8" >
            <div><h2>You searched for "{query.q}"</h2></div>
            {users.map((useri) => (
  
              <div key={useri.id} className="col-lg-12">
                  
                <div className="list-group mrgn">
                  <span href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    
                    <Link to={`/specificuser/${useri.id}`}><h5 className="mb-1">{useri.name}</h5></Link>
           
                    
                    </div>
                    
                    <p className="mb-1">The keyword <span className="font-weight-bold">"{query.q}"</span> exists in this blog. Click on post title to check it out.</p>
                   
                    <FontAwesomeIcon color="orange" className="float-right" icon={faComments}/>
                  </span>
                </div>

             </div>
            ))}
            </div>
            <div className="col-md-4">
            <Sidebar />
          </div>
            </div>
         
            </div>
            <div style={styleFooter}><Footer /></div>
            
            </div>
        )
    }
}

export default Searchpageuser