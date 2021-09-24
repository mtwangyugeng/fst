import React from 'react';
import LHMapPresentation from './lhmappresentation/LHMapPresentation';
import * as ic from'../util/InputCheckers'

import './LHMap.css'

import socketIOClient from "socket.io-client";

export default class LHMap extends React.Component{
    ENDPOINT = "http://127.0.0.1:4001";
    socket = socketIOClient(this.ENDPOINT);

    state = {
        mystate: 'Waiting for the Server',
        incidents: [],

        p_specie: '',
        p_size: '',
        p_lat: '',
        p_lng: '',

        fishinfo_cache: {}
      }

      

    async refreshAll(){
        console.log('refreshing')
        await fetch('http://localhost:3000/alldata').then((v) => {
            if(v.ok){
                return v
            }else {
                throw new Error('no response from server');
            }
            }).then((v)=>v.text())
            .then(data => {
                this.setState({
                    incidents: data.split('|'),
                    mystate: 'Connected to server'
                })})
            .catch((error) => {
                this.setState({mystate: 'No response from server'})
                console.log(error)
        });
    }
    
    async requestFishInfo (specie) {        
        await fetch('http://localhost:3000/fishinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Specie': specie
                })
            })
            .then((v)=>v.text())
            .then(data => JSON.parse(data))
            .then(d => {
                    console.log('ok',d , 'okend')
                    var temp = this.state.fishinfo_cache
                    temp[specie] = <div className="lhMapPopup-fishinfo">
                        <img className = "lhMapPopup-fishpic" alt = 'Fish pic' src = {d['Iurl']}/>
                        <div>{d['Name']}</div>
                        <div>{d['Description']}</div>
                    </div>
                    this.setState({
                        fishinfo_cache: temp
                    })
                    console.log(this.state.fishinfo_cache)
            })

      }
    
    requestFishInfo_initial = (specie) => {
        this.requestFishInfo(specie)
    }
    

    async postNewFishLocal(){
        await fetch('http://localhost:3000/popo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Specie': this.state.p_specie,
                    'Size': this.state.p_size,
                    'Lat': this.state.p_lat,
                    'Lng': this.state.p_lng  
                })
            })
            .then((v)=>v.text())
            .then(data => this.socket.emit('new fishlocal', 'need refresh'))
      }

    sendData = () => {
        try{
            ic.isSpecie(this.state.p_specie)
            ic.isSize(this.state.p_size)
            ic.isLat(this.state.p_lat)
            ic.isLng(this.state.p_lng)
            this.postNewFishLocal()
            this.setState({
                p_specie: '',
                p_size: '',
                p_lat: '',
                p_lng: ''
            })
        }catch(e){
            if(typeof e === 'string')
                this.setState({mystate: e})
            else
                console.log(e)
        }
    }

    async componentDidMount() {
        this.socket.on('new fishlocal', (msg) => {
            this.refreshAll()
        });
    }

    render() {
        return (
            <div className="LHMap-main">
                {this.state.mystate}
                <br/>
                <textarea onChange = {(e)=>this.setState({p_specie: e.target.value})}  value = {this.state.p_specie} placeholder = 'Specie ID'></textarea>
                <textarea onChange = {(e)=>this.setState({p_size: e.target.value})} value = {this.state.p_size} placeholder = 'Size'></textarea>
                <textarea onChange = {(e)=>this.setState({p_lat: e.target.value})} value = {this.state.p_lat} placeholder = 'Lat'></textarea>
                <textarea onChange = {(e)=>this.setState({p_lng: e.target.value})} value = {this.state.p_lng} placeholder = 'Lng'></textarea>
                <button id='pr' onClick = {this.sendData}>send data</button>
                <LHMapPresentation incidents = {this.state.incidents} center = {this.props.center} setLatLng = {this.setLatLng} fishinfo_cache = {this.state.fishinfo_cache} requestFishInfo_initial = {this.requestFishInfo_initial}/>
            </div>
        )
    }

    setLatLng = (lat,lng) =>{
        this.setState({
            p_lat: lat,
            p_lng: lng
        })
    }
}