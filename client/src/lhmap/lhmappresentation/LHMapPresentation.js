import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

import LHMapPopup from './lhmappopup/LHMapPopup'

export default class LHMapPresentation extends React.Component{

    state = {
        tlat: '',
        tlng: ''
    }

    render() {
        return (
            <>
        <MapContainer center={this.props.center} zoom={9} style={{ width: '100%', height: '80%'}} scrollWheelZoom={true} doubleClickZoom={false}>
            <TileLayer 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent setTLatLng = {this.setTLatLng} setLatLng = {this.props.setLatLng}/>
            {Object.keys(this.props.locations).map(id => {
                // console.log('!!!!');
                if(id !== ''){
                    // console.log( incident);
                    const v = this.props.locations[id]
                    //TODO
                        return(
                            <Marker position={[v['Lat'], v['Lng']]}>
                                <Popup>
                                    {/* <LHMapPopup v = {v} fishinfo_cache = {this.props.fishinfo_cache} requestFishInfo_initial = {this.props.requestFishInfo_initial}/> */}
                                    <LHMapPopup 
                                        locationfishlocal = {this.props.locationfishlocal[v['ID']]} 
                                        postNewFishLocal_initial = {this.props.postNewFishLocal_initial} 
                                        id = {v['ID']}
                                        requestFishInfo_initial = {this.props.requestFishInfo_initial}
                                    />
                                </Popup>
                            </Marker>)
                }
            })}
            </MapContainer>
            {this.state.tlat + ' ,' + this.state.tlng}
            </>
        )
    }

    setTLatLng = (lat,lng) =>{
        this.setState({
            tlat: lat,
            tlng: lng
        })
    }

}

function MyComponent(props) {
    const map = useMapEvents({
        // mousemove: (e) =>{
        //     const { lat, lng } = e.latlng;
        //     props.setTLatLng(lat+'',lng+'')
        // },

        click: (e) => {
            const { lat, lng } = e.latlng;
            props.setLatLng(lat+'',lng+'')
        }
    });
    return null;
  }