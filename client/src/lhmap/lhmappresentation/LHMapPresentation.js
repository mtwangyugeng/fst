import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class LHMapPresentation extends React.Component{

    render() {
        return (
        <MapContainer center={this.props.center} zoom={9} style={{ width: '100%', height: '900px'}} scrollWheelZoom={false}>
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
                                {''+ v['Lat'] + ' ' + v['Lng']+ ' ' + v['Specie']+ ' ' +  v['Size']} <br /> Easily customizable.
                                </Popup>
                            </Marker>)
                }
            })}

            </MapContainer>
        )
    }

}