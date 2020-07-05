
import React,{useState} from 'react';
import axios from 'axios';

import './index.css'



export default function CardItem(props){

    const ReceivedData = props.data;
    const [expandview,setExpandView] = useState(false);


    function toggleState()
    {
        if(expandview)
            setExpandView(false);
        else
            setExpandView(true);
    }

    return(
        <div className="card-item-container" onClick={toggleState}>
            <div className="main-info-container">
                <img src={ReceivedData.pictures[0].url} ></img>
                <ul>
                    <li><b>Nome:</b> {ReceivedData.name.first} {ReceivedData.name.last}</li>
                    <li><b>E-mail:</b> {ReceivedData.email}</li>
                    <li><b>Idade:</b> {ReceivedData.age}</li>
                    <li><b>Empresa:</b> {ReceivedData.company}</li>
                    <li><b>Budget:</b> {ReceivedData.budget}</li>
                </ul>
            </div>
            <div className={`${expandview?"detail-info-container": "detail-info-container invisible"}`}>
                <ul>
                    <li><b>Telefone:</b> {ReceivedData.phone}</li>
                    <li><b>Endereço:</b> {ReceivedData.address}</li>
                    <li><b>Registrado em:</b> {ReceivedData.registered}</li>
                    <li><b>Canal de Comunicação: </b>{ReceivedData.channel}</li>
                </ul>

                <div className="contactTimeLine-container">
                    <div>Timeline dos Contatos</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Broker</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               
                                ReceivedData.contactTimeline.map(data => (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.broker}</td>
                                    <td>{data.date}</td>
                                </tr>))
                            }  
                        </tbody>
                      
                    </table>                   
                </div>

                <div className="pictures-container">
                    <div>Fotos</div>
                    {
                        ReceivedData.pictures.map(data => (
                            <img src={data.url}></img>))
                    }
                </div>

            </div>

        </div>
    );

}