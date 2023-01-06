import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";

const  MailingList =()=> {
  const [lists, setLists] = useState([]);
  const [selectedGroup, setSelectedGroup]=useState("staff");
  const [listEmails, setListEmails]=useState([])

  // const fetchData = async () => {
  //   console.log("Err1")
  //   return await fetch(
  //     "https://kawa-mailing-lists-cyf-challenge-nodejs.onrender.com/lists"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLists(data);
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
    useEffect(() => {
      async function fetchMyAPI() {
        let response = await fetch('https://kawa-mailing-lists-cyf-challenge-nodejs.onrender.com/lists')
        response = await response.json()
        setLists(response)
        console.log("fetch1")
      }
  
      fetchMyAPI()
    }, [])


  function change(e) {
    // a.persist();
     console.log(`you chosen: ${e}`);
     setSelectedGroup(e)
    
  }

  useEffect(() => {
    async function fetchMyAPI2() {
      let response = await fetch(`https://kawa-mailing-lists-cyf-challenge-nodejs.onrender.com/lists/${selectedGroup}/member`)
      response = await response.json()
      setListEmails(response)
      console.log("fetch2")
    }
    fetchMyAPI2()
}, [selectedGroup])
  
  const Groupemails = () => {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-header">List of {selectedGroup} emails:</div>
        <ul className="list-group list-group-flush">
        {listEmails.map( (email, index) =>  <li className="list-group-item" key={index}>{email}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title="Dropdown button"
        onSelect={change}
      >
        {lists.map((elmList, index) => (
          <Dropdown.Item eventKey={elmList} key={index}>
            {elmList}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    {selectedGroup!==""? <Groupemails />: null}
    {/* <Groupemails /> */}
    </>
  );
}

export default MailingList;
