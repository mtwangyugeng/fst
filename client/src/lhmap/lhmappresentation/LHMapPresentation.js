import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, CircleMarker  } from 'react-leaflet'

import './LHMapPresentation.css'

export default class LHMapPresentation extends React.Component{

    state = {
        tlat: '-',
        tlng: '-'
    }

    render() {
        return (
            <>
        <MapContainer center={this.props.center} zoom={9} style={{ width: '100%', height: '100%'}} scrollWheelZoom={true} doubleClickZoom={false}>
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
                            <Marker position={[v['Lat'], v['Lng']]} eventHandlers={{
                                click: (e) => {
                                  console.log('marker clicked', e)
                                  this.clickedMarker(id)
                                },
                              }}>
                            </Marker>
                            )
                }
            })}
            <CircleMarker
              center={[this.props.p_lat, this.props.p_lng]}
              pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: '1' }}
              radius={10}
            />
            </MapContainer>
            <div className="LHMapPresentation-latlng">
                {'Lat: ' + this.state.tlat + ', ' + 'Lng:' + this.state.tlng}
            </div>
            </>
        )
    }

    clickedMarker = (id) => {
        console.log('clickedMarker', id)
        this.props.clickedMarker(id)        
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
        mousemove: (e) =>{
            const { lat, lng } = e.latlng;
            props.setTLatLng(lat+'',lng+'')
        },

        click: (e) => {
            const { lat, lng } = e.latlng;
            props.setLatLng(lat+'',lng+'')
        }
    });
    return null;
  }