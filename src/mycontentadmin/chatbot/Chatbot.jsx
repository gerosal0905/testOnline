import React , {useEffect, useState} from 'react'
import './chatbot.css'
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';



function Chatbot (){

  const {user} = UserAuth();

 

    const [projectiddata, setprojectiddata]= useState('');
    const [inputtrainingphrase, setinputtrainingphrase] = useState('');
    const [inputbotresponse, setinputbotresponse] = useState('');
    const [inputIntentName, setInputIntentName] = useState('');
    const [datas, setData] = useState([]);
    const [dataaa, setDataaa] = useState([]);
    const [edittrainingphrase, setedittrainingphrase] = useState('');
    const [editbotresponse, seteditbotresponse] = useState('');
    const [editdisplayname, seteditdisplayname] = useState('');
 

  const token = "ya29.a0Aa4xrXPP0fTIry_2g_RWMkB-TXArVhlHGW9CW--SwO3J6_A-Ox4Fo2O5m2xLXH4EHYFMTnh9Fn4FGGlcQ2WFxhjv_mEyvTiv2UsiXcT68hbMDHj-d6CnpnzJmKjiPHqVYySNJAhNmQIF5q_EBKsISYDosTGzNwaCgYKAW4SARASFQEjDvL9wb2jhQb1cM6jzJHj2Gd1GA0165";
  // urlcontainer = "https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token="

  useEffect(() => {
    //getIntents();
    // getAgents();
    const mail = user.email;
    console.log('email',user.email);
    axios.get(`http://localhost:3001/readBot/${mail}`).then( async (response) => {
      // console.log('getproject id', response.data.projId);
      // setState( {projectiddata : response.data});
      // console.log(projectiddata);
      console.log(response.data.projId);
      setprojectiddata(response.data.projId);
      
    });
    ListIntent();
  }, []);

  //get specific project id, store project id to variable, use variable to get intents
  //project id also used for creating intent

  /* const getprojectId = () =>{
    
  } */

  function ListIntent() {
        axios.get(`https://dialogflow.googleapis.com/v2/projects/`+projectiddata+`/agent/intents?intentView=INTENT_VIEW_FULL&access_token=${token}`).then((responses) => {
        const intentss = responses.data.intents.length;

        const intentsss = [];
        for(var i = 0; i < intentss; i++) {
            intentsss.push(responses.data.intents[i])
        }
        console.log(intentsss);
        setDataaa(intentsss);
        });
  }


  const createIntent = (event) =>{
    event.preventDefault();
    const trainingphrasecontainer = inputtrainingphrase;
    const responsecontainer = inputbotresponse;
    const intentName = inputIntentName;

    const displayname = '"'+intentName+ '"';
    const trainingphrase = '{ "parts": [ {"text" : "'+trainingphrasecontainer+'"}]}';
    const displaytext = '"'+responsecontainer+ '"';
    var data = '{"displayName": '+displayname+', "trainingPhrases": [ '+trainingphrase+'],"messages": [{"text": {"text": ['+displaytext+']}}]}';


    var config = {
    method: 'post',
    url: 'https://dialogflow.googleapis.com/v2/projects/'+projectiddata+'/agent/intents?access_token='+ token,
    headers: { 
        'Content-Type': 'text/plain'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
  
    alert('Create intent success!');
    resetuserInputs();
   
    ListIntent();
    })
    .catch(function (error) {
    console.log(error);
    alert('Create intent failed')
    });
  }

  const resetuserInputs = () =>{
    setinputtrainingphrase('');
    setinputbotresponse('');
    setInputIntentName('');
    seteditdisplayname('');
    seteditbotresponse('');
    setedittrainingphrase('');
 
  }

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   useState({ [name]: value });
  // };


  
  // const getIntents = () => {
 

  //   var config = {
  //     method: 'get',
  //     url: 'https://dialogflow.googleapis.com/v2/projects/'+projectiddata+'/agent/intents?intentView=INTENT_VIEW_FULL&access_token='+ token,
  //     headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+ token
  //    }
  //   };

  //   axios(config)
  //   .then((response) => {
  //     const data = JSON.stringify(response.data.intents);
  //     console.log(data);
  //     // console.log('data received');
  //     // const testvariable = data[1].messages[0].simpleResponses.simpleResponses[0].displayText;
  //     //   intentdisplaycontainer.push(testvariable);
     
  //     // intentdisplaycontainer.push(data);

  //     // console.log('data dded to state');
  //     // console.log(data[1].messages[0].simpleResponses.simpleResponses[0].displayText, 'from axios code');
  //     // setState({detectintentdata : data})
  //     setdetectintentdata(data);


      
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     alert('error on axios');
  //   });

  // }; 
  
  // const displayIntentData = (detectintentdata) =>{
  //  console.log(typeof(detectintentdata));
  //   return (
  //       <div >
  //           {detectintentdata}
  //       </div>
    
  //       )  
  // }

  const updateIntent = (event) =>{
    event.preventDefault();

    const displaynamecontainer = '"'+editdisplayname+'"';
    const trainingphrasecontainer = '{ "parts": [ {"text" : "'+edittrainingphrase+'"}]}';
    const botrepliescontainer = '"'+editbotresponse +'"';
    var data = '{"displayName": '+displaynamecontainer+',"trainingPhrases": ['+trainingphrasecontainer+'],"messages": [ {"text": {"text": ['+botrepliescontainer+'] }}  ] }';
    
    console.log(data);
    // '{"displayName": "hephep","trainingPhrases": [ {"parts":[  {"text": "hephpehpehpe"}]}, {"parts": [{"text": "waku waku"}]}  ],"messages": [ {"text": {"text": ["memes","eelelelel"] }}  ] }';

    var config = {
      method: 'patch',
      url: 'https://dialogflow.googleapis.com/v2/projects/'+projectiddata+'/agent/intents/293c06b5-a7fa-4155-a96e-785df0040463?access_token='+token ,
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("update success");
      resetuserInputs();
      ListIntent();
    })
    .catch(function (error) {
      console.log(error);
      alert("update failure");
    });

  };

  const deleteIntent = (projectid) => {
    var config = {
      method: 'delete',
      url: 'https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents/'+projectid+'/?access_token='+token,
      headers: { }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert('delete success');
      ListIntent();
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  const getprojectID = (projectid) =>{
    // console.log('test project id display', projectid);

    var actualprojectidcontainer = "";
    var slashcount = 0 ;
    var stoppingindex = 0;
    for (var i = 0; i < projectid.length ; i++ ){
    
      if  (projectid[i] == "/")  {
        slashcount += 1;
        continue;
       
      }

      if (slashcount == 4){
        console.log('stop at index', i);
        stoppingindex = i;
        break;
      }
    }

    for (var i = stoppingindex; i <projectid.length; i++){
      actualprojectidcontainer += projectid[i];
    }
    // console.log('number of slashes', slashcount);
    console.log('actual project id', actualprojectidcontainer);
    return actualprojectidcontainer;
  }



    
  // console.log('State response: ', inputbotresponse);
  // console.log('State trainingphrase: ', inputtrainingphrase);
  // console.log('State editdisplayname: ', editdisplayname);
  // console.log('State edittrainingphrase: ', edittrainingphrase);
  // console.log('State editbotresponse: ', editbotresponse);


  const success = () => {
    createIntent();
    toggleModal();
    
  }

  const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }


    
    

    return (
            <div className='chatbot_body_content'>
                
            {/* <p>{displayIntentData(detectintentdata)}</p> */}
    
            <div className="textBox">
      <h2>Chatbot<br></br></h2>
      </div>
      <div className="divider"></div>
    <div className="button_add_content">
      <button href='#' onClick={toggleModal}>New Intent!</button>
    </div>
    
    
    <div className="intents">
          <div className="intents_content">
              <h2>YOUR INTENTS</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
              <div className="divider_content"></div>
              <div className='scroll'>
              {dataaa.map((val, key) => {
                return (
                  <div key={key}>
                    <div className="box_intents">
                      <center><h3> {val.displayName} </h3></center>
                    </div>
                    <p><button onClick={() => deleteIntent(getprojectID(val.name))}>Delete Intent</button></p>
                </div>
                );
              })}
              </div>

          </div>

          <div id='box' className="box">
          <h2>EDIT YOUR INTENTS</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
              <div className="divider_content"></div>
              <label><h3>Name:</h3></label>
              <input className="intents_name" type="text" placeholder="Name of your intent..."/>
              <h3>Training Phrases</h3><i class="fa-solid fa-plus intenticon"></i>
              <input className="training" type="text" placeholder="Type your phrases..."/>
              <input className="training" type="text" placeholder="Type your phrases..."/>
              <h3>Responses</h3><i class="fa-solid fa-plus intenticon"></i>
              <input className="responses" type="text" placeholder="Type your phrases..."/>
              <input className="responses" type="text" placeholder="Type your phrases..."/>
              <button className='save'>SAVE</button>
              <button className='cancel'>CANCEL</button>
          </div>

    </div>
    
            <div className='createintentform'>
              
              


              
             


              {/* ===========EDIT INTENT FORM================================= */}
              <hr></hr>
              <h3>Edit Intent</h3>
              <form onSubmit={updateIntent}>
              
              <div className="form-input">
                <input 
                  type="text"
                  name="editdisplayname"
                  placeholder="Enter new display name"
                  id='editdisplayname'
                  value={editdisplayname}
                  onChange={(event) => {
                    seteditdisplayname(event.target.value);
                  }}
                />
              </div>


              <div className="form-input">
                <textarea
                  placeholder="Enter training phrase to be edited"
                  name="edittrainingphrase"
                  cols="30"
                  rows="5"
                  id='edittrainingphrase'
                  value={edittrainingphrase}
                  onChange={(event) => {
                    setedittrainingphrase(event.target.value);
                  }}
                >
                  
                </textarea>
              </div>

              <div className="form-input">
                <textarea
                  placeholder="Enter bot response to be edited"
                  name="editbotresponse"
                  cols="30"
                  rows="5"
                  id='editbotresponse'
                  value={editbotresponse}
                  onChange={(event) => {
                    seteditbotresponse(event.target.value);
                  }}
                >
                  
                </textarea>
              </div>
         
                <p><button>Update Intent</button></p>   
              </form>
            

                    
              
            </div>
           
            {/* <p>{displayagents(agentdata)} </p> */}

{modal && (
        <div className="modal">
          <div className="modal-content">
          <div className="announcement">
            <h2><span> Create Intents!</span></h2>
            </div>
            <label>Name: </label>  
            <input 
            className="intents_name"
            type="text"
            placeholder="Type your title..." id='inputIntentName'
            value={inputIntentName}
            onChange={(event) => {
              setInputIntentName(event.target.value);
            }}
           
            />
             <label>Training phrases: </label> 
            <input className="training"  placeholder="Write something.." id='inputtrainingphrase'
                  value={inputtrainingphrase}
                  onChange={(event) => {
                    setinputtrainingphrase(event.target.value);
                  }}  ></input>
            <label>Responses: </label> 
            <input className="training"  placeholder="Write something.."   id='inputbotresponse'
                  value={inputbotresponse}
                  onChange={(event) => {
                    setinputbotresponse(event.target.value);
                  }}></input>
            <div className="buttons_reviews_user">
      <button href='#' onClick={createIntent}>Submit</button>
      <button href='#' onClick={toggleModal}>Close</button>
      </div>
          </div>
        </div>
      )}
        
        </div>
        ) 
  }
 
  
  



// function getprojectId(){
//   // console.log(UserAuth());

//   const mail = user.email;
//       axios.get(`http://localhost:3001/readBot/${mail}`).then((response) => {
//         console.log('getproject id', response.data);
//         // setState( {projectiddata : response.data});
//         // console.log(projectiddata);
//       });

// }


export default Chatbot;