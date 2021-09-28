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
        locations: [],
        fishlocals: [],

        p_name: '',
        p_lat: '',
        p_lng: '',
        p_description: '',

        fishinfo_cache: {},
        locations_cache:{},

        locationfishlocal:{}
      }

      

    async requestAllLocations(){
        console.log('getting localtion Data')
        
        await fetch('http://localhost:3000/AllLocations').then((v) => {
            if(v.ok){
                return v
            }else {
                throw new Error('no response from server');
            }
            }).then((v)=>v.text())
            .then(data => {
                var temp = data.split('|')
                /*usage
                locations_cache[id] => html of location data
                locations[id] => raw data 
                locationfishlocal[id] => list of fishlocals
                */
               var tlocation = {}
                temp.forEach(sage => {
                    if(sage !== ''){
                        const t = JSON.parse(sage)
                        tlocation[t['ID']] = t
                    }
                });
                this.setState({
                    locations: tlocation,
                    mystate: 'Loaded table AllLocations'
                })
            })
            .catch((error) => {
                this.setState({mystate: 'No response from server'})
                console.log(error)
        });   
    }

    async requestAllFishlocals(){
        await fetch('http://localhost:3000/FishLocal').then((v) => {
            if(v.ok){
                return v
            }else {
                throw new Error('no response from server');
            }
            }).then((v)=>v.text())
            .then(data => {
                const temp = data.split('|')
                var tlocationfishlocal = {}
                temp.forEach(sage => {
                    if(sage !== ''){
                        console.log('sage again!!',sage)
                        const t = JSON.parse(sage)
                        if(tlocationfishlocal[t['LocationID']])
                            tlocationfishlocal[t['LocationID']].append(t)
                        else
                            tlocationfishlocal[t['LocationID']] = [t]
                    }
                });
                console.log('tlocationfishlocal', tlocationfishlocal)
                this.setState({
                    fishlocals: data.split('|'),
                    locationfishlocal: tlocationfishlocal,
                    mystate: 'Loaded table FishLocal'
                })
            })
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

    async postNewLocation(){
        console.log('postNewLocation: good')
        await fetch('http://localhost:3000/postNewLocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Name': this.state.p_name,
                    'Lat': this.state.p_lat,
                    'Lng': this.state.p_lng,
                    'Description': this.state.p_description
                })
            })
            .then((v)=>v.text())
            .then(data => this.socket.emit('new location', 'need refresh'))
    }

    sendLocation = () => {
        try{
            ic.isLat(this.state.p_lat)
            ic.isLng(this.state.p_lng)
            this.postNewLocation()
            this.setState({
                p_name: '',
                p_lat: '',
                p_lng: '',
                p_description: ''
            })
        }catch(e){
            if(typeof e === 'string')
                this.setState({mystate: e})
            else
                console.log(e)
        }
    }

    async componentDidMount() {
        //get all data from server as it mounts
        this.socket.on('server online', (msg) => {
            console.log(msg)
            this.requestAllLocations()
            this.requestAllFishlocals()
        });

        this.socket.on('new location', (msg) => {
            console.log(msg)
            this.requestAllLocations()
        });

        // this.socket.on('new fishlocal', (msg) => {
        //     console.log(msg)
        //     this.refreshAll()
        // });
    }

    render() {
        return (
            <div className="LHMap-main">
                {this.state.mystate}
                <br/>
                <div>
                    <textarea onChange = {(e)=>this.setState({p_name: e.target.value})}  value = {this.state.p_name} placeholder = 'Name'></textarea>
                    <textarea onChange = {(e)=>this.setState({p_lat: e.target.value})} value = {this.state.p_lat} placeholder = 'Lat'></textarea>
                    <textarea onChange = {(e)=>this.setState({p_lng: e.target.value})} value = {this.state.p_lng} placeholder = 'Lng'></textarea>
                    <textarea onChange = {(e)=>this.setState({p_description: e.target.value})} value = {this.state.p_description} placeholder = 'Description'></textarea>
                    <button id='pr' onClick = {this.sendLocation}>send data</button>
                </div>
                <LHMapPresentation locations = {this.state.locations} locationfishlocal = {this.state.locationfishlocal} center = {this.props.center} setLatLng = {this.setLatLng} fishinfo_cache = {this.state.fishinfo_cache} requestFishInfo_initial = {this.requestFishInfo_initial}/>
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