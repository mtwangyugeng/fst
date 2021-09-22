import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import LHMapPopup from './lhmappopup/LHMapPopup'

export default class LHMapPresentation extends React.Component{

    render() {
        return (
        <MapContainer center={this.props.center} zoom={9} style={{ width: '100%', height: '80%'}} scrollWheelZoom={true} doubleClickZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.props.incidents.map(incident => {
                // console.log('!!!!');
                if(incident !== ''){
                    // console.log( incident);
                    const v = JSON.parse(incident)
                    //TODO
                        return(
                            <Marker position={[v['Lat'], v['Lng']]}>
                                <Popup>
                                    <LHMapPopup v = {v} />
                                </Popup>
                            </Marker>)
                }
            })}

            </MapContainer>
        )
    }

}