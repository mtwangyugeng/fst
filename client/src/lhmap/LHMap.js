import React from 'react';
import LHMapPresentation from './lhmappresentation/LHMapPresentation';
import * as ic from'../util/InputCheckers'
import * as api from'./LHMapAPI'

import './LHMap.css'

import InfoBar from './lhmappresentation/infobar/InfoBar';

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

        locationfishlocal:{},

        //info bar
        active:false,
        active_id: null,
        content: <></>
      }

      

    async requestAllLocations(){
        api.requestAllLocations()
            .then((v)=>v.text())
            .then(data => {
                var temp = data.split('|')
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
        api.requestAllFishlocals()
            .then((v)=>v.text())
            .then(data => {
                const temp = data.split('|')
                var tlocationfishlocal = {}
                temp.forEach(sage => {
                    if(sage !== ''){
                        console.log('sage again!!',sage)
                        const t = JSON.parse(sage)
                        if(tlocationfishlocal[t['LocationID']])
                            tlocationfishlocal[t['LocationID']].push(t)
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
    
    
    
    requestFishInfo_initial = (specie) => {
        return api.requestFishInfo(specie)
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
                return this.state.fishinfo_cache[specie]
            })
            
    }
    
    postNewFishLocal_initial = (specie_id, size, location_id, date, note) =>{
        // {SpecieID, Size, LocationID, Date, Note}
        this.postNewFishLocal(specie_id, size, location_id, date, note)
    }

    async postNewFishLocal(specie_id, size, location_id, date, note){
        api.postNewFishLocal(specie_id, size, location_id, date, note)
            .then((v)=>v.text())
            .then(data => this.socket.emit('new fishlocal', 'need refresh'))
      }

    async postNewLocation(name, lat, lng, description){
        api.postNewLocation(name, lat, lng, description)
            .then((v)=>v.text())
            .then(data => this.socket.emit('new location', 'need refresh'))
    }

    sendLocation = () => {
        try{
            ic.isLat(this.state.p_lat)
            ic.isLng(this.state.p_lng)
            this.postNewLocation(this.state.p_name, this.state.p_lat,this.state.p_lng,this.state.p_description)
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

        this.socket.on('new fishlocal', (msg) => {
            console.log(msg)
            this.requestAllFishlocals()
        });
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
                    <button onClick = {this.sendLocation}>send data</button>
                </div>
                <div className="LHMap-rep">
                    <LHMapPresentation p_lat = {this.state.p_lat} p_lng = {this.state.p_lng} clickedMarker = {this.clickedMarker} postNewFishLocal_initial = {this.postNewFishLocal_initial} locations = {this.state.locations}  center = {this.props.center} setLatLng = {this.setLatLng} fishinfo_cache = {this.state.fishinfo_cache} />
                    <InfoBar fishinfo_cache = {this.state.fishinfo_cache} locations = {this.state.locations} requestFishInfo_initial = {this.requestFishInfo_initial} postNewFishLocal_initial = {this.postNewFishLocal_initial} locationfishlocal = {this.state.locationfishlocal} active = {this.state.active} clickered = {this.clickered} active_id = {this.state.active_id} content = {this.state.content}/>
                </div>
            </div>
        )
    }

    setLatLng = (lat,lng) =>{
        this.setState({
            p_lat: lat,
            p_lng: lng
        })
    }

    clickered = () => {
        this.setState({active: !this.state.active})
        // console.log('clickered')
    }

    clickedMarker = (id) => {
        if(id === this.state.active_id && this.state.active){
            this.setState(
                {
                    active: false,
                }
            )
        }else{
            this.setState(
                {
                    active: true,
                    active_id: id,
                    // content: <LHMapPopup 
                    //     locationfishlocal = {this.state.locationfishlocal[id]} 
                    //     postNewFishLocal_initial = {this.postNewFishLocal_initial} 
                    //     id = {id}
                    //     requestFishInfo_initial = {this.requestFishInfo_initial}
                    // />
                }
            )
        }
    }
}