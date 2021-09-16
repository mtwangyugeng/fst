import React from 'react';
import p5 from 'p5';
import Mappa from 'mappa-mundi'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class LHMap extends React.Component{
    state = {
        mystate: '',
        incidents: [],
      }
    async componentDidMount() {
        fetch('http://localhost:3000/alldata').then((v) => {
            if(v.ok){
                return v
            }else {
                throw new Error('no response from server');
            }
            }).then((v)=>v.text())
            .then(data => this.setState({incidents: data.split('|')}))
            .catch((error) => {
                this.setState({mystate: 'No response from server'})
        });
    }
    render() {
        return (
        // <>
        //     LHMap
        //     {this.props.data}
        //     <div ref={ref => (this.mount = ref)} />
        // </>
        <MapContainer center={[43.6532, -79.347015]} zoom={9} style={{ width: '100%', height: '900px'}} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.incidents.map(incident => {
                // console.log(incident)
                // if(incident != ''){
                console.log('!!!!');
                if(incident != ''){
                    console.log( incident);
                    const v = JSON.parse(incident)
                        return(
                            <Marker position={[v['Lat'], v['Lng']]}>
                                <Popup>
                                {''+ v['Lat'] + ' ' + v['Lng']+ ' ' + v['Specie']+ ' ' +  v['Size']} <br /> Easily customizable.
                                </Popup>
                            </Marker>)
                }
                // }
            })}
            {/* <Marker position={[43.6532, -79.347015]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            </MapContainer>
        )
    }

    // canvas;
    // mappa = new Mappa('Leaflet');
    // myMap;
    // options = {
    //     lat: 43.6532,
    //     lng: -79.347015,
    //     zoom: 9,
    //     style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    //   }
    // Sketch = (p) => {
        
    //     p.setup = () => {
    //         this.canvas = p.createCanvas(640,640); 
    //         // p.background(100);
    //         this.myMap = this.mappa.tileMap(this.options); 
    //         // Overlay the canvas over the tile map
    //         this.myMap.overlay(this.canvas);

    //         p.fill(200, 100, 100);

    //         this.myMap.onChange(p.drawpoint);
    //         // const marker = window.L.marker([37.7544, -122.4477]).addTo(this.mymap);
    //     }
   
    //     p.draw = () => {
    //     }
    //     p.drawpoint = () =>{
    //         p.clear();
    //         const toronto = this.myMap.latLngToPixel(43.6532, -79.347015);
    //         // console.log(JSON.parse(this.props.data.split('|')[0])['Lat'])
    //         console.log('wwwwwwwwwwwww',this.props.data)
    //         const allrows = this.props.data.split('|')
    //         console.log(allrows)
    //         for (const row in allrows) {
    //             if (allrows[row]){
    //                 const v = JSON.parse(allrows[row])
    //                 const neo = this.myMap.latLngToPixel(v['Lat'], v['Lng']);
    //                 p.ellipse(neo.x, neo.y, 20, 20);
    //             }
    //         }
    //         // Using that position, draw an ellipse
    //         p.ellipse(toronto.x, toronto.y, 20, 20);
    //     }
        
    //  }
    // componentDidMount() {
        
    //     this.myP5 = new p5(this.Sketch, this.mount.current)
        
    // }

}